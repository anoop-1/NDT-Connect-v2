/**
 * Inspection Event Types
 * Event-driven architecture for real-time updates (Fireball-equivalent)
 */

// Base event structure
export interface BaseEvent {
    id: string;
    type: EventType;
    timestamp: number;
    version: number;
    source: string;
    correlationId?: string;
    metadata?: Record<string, unknown>;
}

// Event types for NDT Connect
export type EventType =
    // Job lifecycle events
    | 'JOB_CREATED'
    | 'JOB_ACCEPTED'
    | 'JOB_REJECTED'
    | 'JOB_CANCELLED'
    | 'JOB_ASSIGNED'

    // Inspector geo events
    | 'INSPECTOR_LOCATION_UPDATE'
    | 'INSPECTOR_GEOFENCE_ENTER'
    | 'INSPECTOR_GEOFENCE_EXIT'
    | 'INSPECTOR_AVAILABLE'
    | 'INSPECTOR_UNAVAILABLE'

    // Inspection lifecycle events
    | 'INSPECTION_STARTED'
    | 'INSPECTION_PAUSED'
    | 'INSPECTION_RESUMED'
    | 'INSPECTION_COMPLETED'
    | 'INSPECTION_ABORTED'

    // Defect and findings events
    | 'DEFECT_DETECTED'
    | 'RBI_THRESHOLD_BREACH'
    | 'MEASUREMENT_RECORDED'

    // Report events
    | 'REPORT_DRAFT_CREATED'
    | 'REPORT_SUBMITTED'
    | 'REPORT_REVISION_REQUESTED'
    | 'REPORT_APPROVED'

    // System events
    | 'ETA_UPDATE'
    | 'NOTIFICATION_SENT';

// Job Events
export interface JobCreatedEvent extends BaseEvent {
    type: 'JOB_CREATED';
    payload: {
        jobId: string;
        clientId: string;
        serviceType: string;
        location: { lat: number; lng: number; address: string };
        requestedDate: string;
        priority: 'normal' | 'urgent' | 'emergency';
        requirements: string[];
    };
}

export interface JobAcceptedEvent extends BaseEvent {
    type: 'JOB_ACCEPTED';
    payload: {
        jobId: string;
        inspectorId: string;
        inspectorName: string;
        estimatedArrival: string;
        etaMinutes: number;
    };
}

export interface JobRejectedEvent extends BaseEvent {
    type: 'JOB_REJECTED';
    payload: {
        jobId: string;
        inspectorId: string;
        reason: string;
    };
}

// Geo Events
export interface InspectorLocationEvent extends BaseEvent {
    type: 'INSPECTOR_LOCATION_UPDATE';
    payload: {
        inspectorId: string;
        location: { lat: number; lng: number };
        accuracy: number;
        speed: number;
        heading: number;
        h3Index: string;
    };
}

export interface GeofenceEvent extends BaseEvent {
    type: 'INSPECTOR_GEOFENCE_ENTER' | 'INSPECTOR_GEOFENCE_EXIT';
    payload: {
        inspectorId: string;
        jobId: string;
        assetId: string;
        timestamp: number;
    };
}

// Inspection Events
export interface InspectionStartedEvent extends BaseEvent {
    type: 'INSPECTION_STARTED';
    payload: {
        inspectionId: string;
        jobId: string;
        inspectorId: string;
        assetId: string;
        startTime: string;
        inspectionType: string;
    };
}

export interface InspectionCompletedEvent extends BaseEvent {
    type: 'INSPECTION_COMPLETED';
    payload: {
        inspectionId: string;
        jobId: string;
        endTime: string;
        duration: number;
        findingsCount: number;
        defectsCount: number;
        status: 'passed' | 'failed' | 'requires_review';
    };
}

// Defect Events
export interface DefectDetectedEvent extends BaseEvent {
    type: 'DEFECT_DETECTED';
    payload: {
        defectId: string;
        inspectionId: string;
        assetId: string;
        defectType: string;
        severity: 'low' | 'medium' | 'high' | 'critical';
        location: string;
        measurements: Record<string, number>;
        imageUrls?: string[];
    };
}

export interface RBIThresholdBreachEvent extends BaseEvent {
    type: 'RBI_THRESHOLD_BREACH';
    payload: {
        assetId: string;
        inspectionId: string;
        parameter: string;
        measuredValue: number;
        thresholdValue: number;
        breachType: 'warning' | 'critical';
        recommendedAction: string;
    };
}

// Report Events
export interface ReportSubmittedEvent extends BaseEvent {
    type: 'REPORT_SUBMITTED';
    payload: {
        reportId: string;
        inspectionId: string;
        jobId: string;
        submittedBy: string;
        reportUrl: string;
        reportType: string;
    };
}

// ETA Events
export interface ETAUpdateEvent extends BaseEvent {
    type: 'ETA_UPDATE';
    payload: {
        jobId: string;
        inspectorId: string;
        etaMinutes: number;
        confidence: number;
        distanceKm: number;
        updatedAt: string;
    };
}

// Union type of all events
export type InspectionEvent =
    | JobCreatedEvent
    | JobAcceptedEvent
    | JobRejectedEvent
    | InspectorLocationEvent
    | GeofenceEvent
    | InspectionStartedEvent
    | InspectionCompletedEvent
    | DefectDetectedEvent
    | RBIThresholdBreachEvent
    | ReportSubmittedEvent
    | ETAUpdateEvent;

// Event factory helper
export function createEvent<T extends InspectionEvent>(
    type: T['type'],
    payload: T['payload'],
    options: Partial<Omit<BaseEvent, 'type' | 'timestamp' | 'version'>> = {}
): T {
    return {
        id: options.id || generateEventId(),
        type,
        timestamp: Date.now(),
        version: 1,
        source: options.source || 'ndtconnect',
        correlationId: options.correlationId,
        metadata: options.metadata,
        payload,
    } as T;
}

function generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
