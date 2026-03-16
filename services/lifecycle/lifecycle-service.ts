/**
 * Inspection Lifecycle Service
 * Manages inspection state machine and workflow
 */

import { eventOrchestrator } from '../../lib/events/event-orchestrator';
import { createEvent, InspectionEvent } from '../../lib/events/event-types';
import { publishToKafka } from '../../lib/kafka/kafka-service';

// Inspection states
export type InspectionState =
    | 'scheduled'
    | 'inspector_en_route'
    | 'inspector_arrived'
    | 'in_progress'
    | 'paused'
    | 'resumed'
    | 'data_collection'
    | 'report_pending'
    | 'report_submitted'
    | 'under_review'
    | 'completed'
    | 'cancelled'
    | 'failed';

// Valid state transitions
const STATE_TRANSITIONS: Record<InspectionState, InspectionState[]> = {
    scheduled: ['inspector_en_route', 'cancelled'],
    inspector_en_route: ['inspector_arrived', 'cancelled'],
    inspector_arrived: ['in_progress', 'cancelled'],
    in_progress: ['paused', 'data_collection', 'cancelled', 'failed'],
    paused: ['resumed', 'cancelled'],
    resumed: ['in_progress'],
    data_collection: ['report_pending'],
    report_pending: ['report_submitted'],
    report_submitted: ['under_review'],
    under_review: ['completed', 'report_pending'],
    completed: [],
    cancelled: [],
    failed: ['scheduled'],
};

export interface Inspection {
    id: string;
    jobId: string;
    inspectorId: string;
    clientId: string;
    assetId: string;
    serviceType: string;
    state: InspectionState;
    startTime?: Date;
    endTime?: Date;
    pausedTime?: number;
    findings: InspectionFinding[];
    measurements: InspectionMeasurement[];
    reportId?: string;
    metadata: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
}

export interface InspectionFinding {
    id: string;
    type: 'defect' | 'observation' | 'recommendation';
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    location: string;
    imageUrls: string[];
    createdAt: Date;
}

export interface InspectionMeasurement {
    id: string;
    parameter: string;
    value: number;
    unit: string;
    location: string;
    isWithinSpec: boolean;
    threshold?: { min?: number; max?: number };
    createdAt: Date;
}

/**
 * Inspection Lifecycle Service
 */
export class InspectionLifecycleService {
    private inspections = new Map<string, Inspection>();

    /**
     * Create new inspection
     */
    async createInspection(data: Omit<Inspection, 'id' | 'state' | 'findings' | 'measurements' | 'createdAt' | 'updatedAt'>): Promise<Inspection> {
        const inspection: Inspection = {
            ...data,
            id: `insp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            state: 'scheduled',
            findings: [],
            measurements: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.inspections.set(inspection.id, inspection);

        await this.publishStateChange(inspection, 'scheduled');

        return inspection;
    }

    /**
     * Transition inspection state
     */
    async transitionState(inspectionId: string, newState: InspectionState): Promise<Inspection> {
        const inspection = this.inspections.get(inspectionId);
        if (!inspection) {
            throw new Error(`Inspection ${inspectionId} not found`);
        }

        const allowedTransitions = STATE_TRANSITIONS[inspection.state];
        if (!allowedTransitions.includes(newState)) {
            throw new Error(
                `Invalid state transition: ${inspection.state} -> ${newState}. ` +
                `Allowed: ${allowedTransitions.join(', ')}`
            );
        }

        const previousState = inspection.state;
        inspection.state = newState;
        inspection.updatedAt = new Date();

        // Handle state-specific logic
        switch (newState) {
            case 'in_progress':
                if (!inspection.startTime) {
                    inspection.startTime = new Date();
                }
                break;
            case 'paused':
                inspection.pausedTime = Date.now();
                break;
            case 'completed':
                inspection.endTime = new Date();
                break;
        }

        await this.publishStateChange(inspection, newState, previousState);

        return inspection;
    }

    /**
     * Record finding during inspection
     */
    async recordFinding(
        inspectionId: string,
        finding: Omit<InspectionFinding, 'id' | 'createdAt'>
    ): Promise<InspectionFinding> {
        const inspection = this.inspections.get(inspectionId);
        if (!inspection) {
            throw new Error(`Inspection ${inspectionId} not found`);
        }

        const newFinding: InspectionFinding = {
            ...finding,
            id: `find_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
        };

        inspection.findings.push(newFinding);
        inspection.updatedAt = new Date();

        // Publish defect event if it's a defect
        if (finding.type === 'defect') {
            await eventOrchestrator.publish(
                createEvent('DEFECT_DETECTED' as any, {
                    defectId: newFinding.id,
                    inspectionId,
                    assetId: inspection.assetId,
                    defectType: finding.description,
                    severity: finding.severity,
                    location: finding.location,
                    measurements: {},
                    imageUrls: finding.imageUrls,
                })
            );
        }

        return newFinding;
    }

    /**
     * Record measurement during inspection
     */
    async recordMeasurement(
        inspectionId: string,
        measurement: Omit<InspectionMeasurement, 'id' | 'createdAt' | 'isWithinSpec'>
    ): Promise<InspectionMeasurement> {
        const inspection = this.inspections.get(inspectionId);
        if (!inspection) {
            throw new Error(`Inspection ${inspectionId} not found`);
        }

        // Check if within spec
        let isWithinSpec = true;
        if (measurement.threshold) {
            const { min, max } = measurement.threshold;
            if (min !== undefined && measurement.value < min) isWithinSpec = false;
            if (max !== undefined && measurement.value > max) isWithinSpec = false;
        }

        const newMeasurement: InspectionMeasurement = {
            ...measurement,
            id: `meas_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            isWithinSpec,
            createdAt: new Date(),
        };

        inspection.measurements.push(newMeasurement);
        inspection.updatedAt = new Date();

        // Publish RBI threshold breach if out of spec
        if (!isWithinSpec) {
            await eventOrchestrator.publish(
                createEvent('RBI_THRESHOLD_BREACH' as any, {
                    assetId: inspection.assetId,
                    inspectionId,
                    parameter: measurement.parameter,
                    measuredValue: measurement.value,
                    thresholdValue: measurement.threshold?.max || measurement.threshold?.min || 0,
                    breachType: 'warning',
                    recommendedAction: 'Further investigation required',
                })
            );
        }

        return newMeasurement;
    }

    /**
     * Get inspection by ID
     */
    getInspection(inspectionId: string): Inspection | undefined {
        return this.inspections.get(inspectionId);
    }

    /**
     * Get inspections by state
     */
    getInspectionsByState(state: InspectionState): Inspection[] {
        return Array.from(this.inspections.values()).filter(i => i.state === state);
    }

    /**
     * Get inspections for inspector
     */
    getInspectorInspections(inspectorId: string): Inspection[] {
        return Array.from(this.inspections.values()).filter(i => i.inspectorId === inspectorId);
    }

    /**
     * Get inspection statistics
     */
    getStatistics(): Record<string, number> {
        const stats: Record<string, number> = {};
        for (const inspection of this.inspections.values()) {
            stats[inspection.state] = (stats[inspection.state] || 0) + 1;
        }
        return stats;
    }

    // Private methods

    private async publishStateChange(
        inspection: Inspection,
        newState: InspectionState,
        previousState?: InspectionState
    ): Promise<void> {
        const eventType = this.getEventTypeForState(newState);
        if (!eventType) return;

        const event = createEvent(eventType as any, {
            inspectionId: inspection.id,
            jobId: inspection.jobId,
            inspectorId: inspection.inspectorId,
            assetId: inspection.assetId,
            previousState,
            newState,
            startTime: inspection.startTime?.toISOString() ?? '',
            endTime: inspection.endTime?.toISOString() ?? '',
            findingsCount: inspection.findings.length,
            defectsCount: inspection.findings.filter(f => f.type === 'defect').length,
        } as any);

        await eventOrchestrator.publish(event as any);

        try {
            await publishToKafka(event as any);
        } catch (error: any) {
            console.error('Failed to publish to Kafka:', error);
        }
    }

    private getEventTypeForState(state: InspectionState): string | null {
        const stateEventMap: Partial<Record<InspectionState, string>> = {
            in_progress: 'INSPECTION_STARTED',
            paused: 'INSPECTION_PAUSED',
            resumed: 'INSPECTION_RESUMED',
            completed: 'INSPECTION_COMPLETED',
            cancelled: 'INSPECTION_ABORTED',
        };
        return stateEventMap[state] || null;
    }
}

// Singleton instance
export const inspectionLifecycleService = new InspectionLifecycleService();
