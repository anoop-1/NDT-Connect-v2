/**
 * Inspection Lifecycle Service Tests
 */

import { InspectionLifecycleService, InspectionState } from '../services/lifecycle/lifecycle-service';

// Mock event orchestrator
jest.mock('../lib/events/event-orchestrator', () => ({
    eventOrchestrator: {
        publish: jest.fn().mockResolvedValue(true),
    },
}));

// Mock Kafka
jest.mock('../lib/kafka/kafka-service', () => ({
    publishToKafka: jest.fn().mockResolvedValue(undefined),
}));

describe('Inspection Lifecycle Service', () => {
    let service: InspectionLifecycleService;

    beforeEach(() => {
        service = new InspectionLifecycleService();
    });

    describe('createInspection', () => {
        it('should create inspection with scheduled state', async () => {
            const inspection = await service.createInspection({
                jobId: 'job1',
                inspectorId: 'insp1',
                clientId: 'client1',
                assetId: 'asset1',
                serviceType: 'UT',
                metadata: {},
            });

            expect(inspection.id).toBeDefined();
            expect(inspection.state).toBe('scheduled');
            expect(inspection.jobId).toBe('job1');
            expect(inspection.findings).toEqual([]);
            expect(inspection.measurements).toEqual([]);
        });
    });

    describe('transitionState', () => {
        it('should allow valid state transitions', async () => {
            const inspection = await service.createInspection({
                jobId: 'job1',
                inspectorId: 'insp1',
                clientId: 'client1',
                assetId: 'asset1',
                serviceType: 'UT',
                metadata: {},
            });

            // scheduled -> inspector_en_route
            let updated = await service.transitionState(inspection.id, 'inspector_en_route');
            expect(updated.state).toBe('inspector_en_route');

            // inspector_en_route -> inspector_arrived
            updated = await service.transitionState(inspection.id, 'inspector_arrived');
            expect(updated.state).toBe('inspector_arrived');

            // inspector_arrived -> in_progress
            updated = await service.transitionState(inspection.id, 'in_progress');
            expect(updated.state).toBe('in_progress');
            expect(updated.startTime).toBeDefined();
        });

        it('should reject invalid state transitions', async () => {
            const inspection = await service.createInspection({
                jobId: 'job1',
                inspectorId: 'insp1',
                clientId: 'client1',
                assetId: 'asset1',
                serviceType: 'UT',
                metadata: {},
            });

            // scheduled cannot go directly to completed
            await expect(
                service.transitionState(inspection.id, 'completed')
            ).rejects.toThrow('Invalid state transition');
        });

        it('should throw for non-existent inspection', async () => {
            await expect(
                service.transitionState('non_existent', 'in_progress')
            ).rejects.toThrow('not found');
        });
    });

    describe('recordFinding', () => {
        it('should add finding to inspection', async () => {
            const inspection = await service.createInspection({
                jobId: 'job1',
                inspectorId: 'insp1',
                clientId: 'client1',
                assetId: 'asset1',
                serviceType: 'UT',
                metadata: {},
            });

            const finding = await service.recordFinding(inspection.id, {
                type: 'defect',
                severity: 'high',
                description: 'Corrosion detected',
                location: 'Weld joint A',
                imageUrls: ['http://example.com/img1.jpg'],
            });

            expect(finding.id).toBeDefined();
            expect(finding.type).toBe('defect');
            expect(finding.severity).toBe('high');

            const updated = service.getInspection(inspection.id);
            expect(updated?.findings.length).toBe(1);
        });
    });

    describe('recordMeasurement', () => {
        it('should add measurement with spec check', async () => {
            const inspection = await service.createInspection({
                jobId: 'job1',
                inspectorId: 'insp1',
                clientId: 'client1',
                assetId: 'asset1',
                serviceType: 'UT',
                metadata: {},
            });

            const measurement = await service.recordMeasurement(inspection.id, {
                parameter: 'Wall Thickness',
                value: 8.5,
                unit: 'mm',
                location: 'Point 1',
                threshold: { min: 6, max: 12 },
            });

            expect(measurement.isWithinSpec).toBe(true);
        });

        it('should flag out-of-spec measurements', async () => {
            const inspection = await service.createInspection({
                jobId: 'job1',
                inspectorId: 'insp1',
                clientId: 'client1',
                assetId: 'asset1',
                serviceType: 'UT',
                metadata: {},
            });

            const measurement = await service.recordMeasurement(inspection.id, {
                parameter: 'Wall Thickness',
                value: 4.5, // Below minimum
                unit: 'mm',
                location: 'Point 1',
                threshold: { min: 6, max: 12 },
            });

            expect(measurement.isWithinSpec).toBe(false);
        });
    });

    describe('getStatistics', () => {
        it('should return state counts', async () => {
            await service.createInspection({
                jobId: 'job1', inspectorId: 'insp1', clientId: 'client1',
                assetId: 'asset1', serviceType: 'UT', metadata: {},
            });
            await service.createInspection({
                jobId: 'job2', inspectorId: 'insp2', clientId: 'client2',
                assetId: 'asset2', serviceType: 'RT', metadata: {},
            });

            const stats = service.getStatistics();
            expect(stats.scheduled).toBe(2);
        });
    });
});
