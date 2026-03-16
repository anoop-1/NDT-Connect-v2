/**
 * Compliance Service Tests
 */

import { ComplianceService } from '../services/compliance/compliance-service';

// Mock Redis
jest.mock('../lib/redis/redis-service', () => ({
    getRedisClient: () => ({
        getInspectorLocation: jest.fn().mockResolvedValue({
            lat: 28.6139,
            lng: 77.209,
            status: 'available',
            timestamp: Date.now(),
        }),
    }),
}));

// Mock event orchestrator
jest.mock('../lib/events/event-orchestrator', () => ({
    eventOrchestrator: {
        publish: jest.fn().mockResolvedValue(true),
    },
}));

describe('Compliance Service', () => {
    let service: ComplianceService;

    beforeEach(() => {
        service = new ComplianceService();
    });

    describe('registerCertification', () => {
        it('should register new certification', async () => {
            const cert = await service.registerCertification({
                inspectorId: 'insp1',
                type: 'UT',
                body: 'ASNT',
                level: 'Level II',
                number: 'CERT-001',
                issuedDate: new Date(),
                expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            });

            expect(cert.id).toBeDefined();
            expect(cert.status).toBe('pending_verification');
        });
    });

    describe('verifyCertification', () => {
        it('should update certification status', async () => {
            const cert = await service.registerCertification({
                inspectorId: 'insp1',
                type: 'UT',
                body: 'ASNT',
                level: 'Level II',
                number: 'CERT-001',
                issuedDate: new Date(),
                expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            });

            await service.verifyCertification(cert.id, 'admin1', true);

            const certs = service.getCertifications('insp1');
            expect(certs.find(c => c.id === cert.id)?.status).toBe('active');
        });
    });

    describe('checkCompliance', () => {
        it('should return non-compliant if no certifications', async () => {
            const result = await service.checkCompliance('new_inspector');

            expect(result.overallStatus).toBe('non_compliant');
            expect(result.issues).toContain('No active certifications');
        });

        it('should return compliant with valid certifications', async () => {
            const cert = await service.registerCertification({
                inspectorId: 'insp1',
                type: 'UT',
                body: 'ASNT',
                level: 'Level II',
                number: 'CERT-001',
                issuedDate: new Date(),
                expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            });

            await service.verifyCertification(cert.id, 'admin1', true);

            const result = await service.checkCompliance('insp1');

            expect(result.checks.hasCertifications).toBe(true);
            expect(result.checks.certificationsValid).toBe(true);
        });
    });

    describe('canAcceptJobs', () => {
        it('should return allowed for compliant inspector', async () => {
            const cert = await service.registerCertification({
                inspectorId: 'insp1',
                type: 'UT',
                body: 'ASNT',
                level: 'Level II',
                number: 'CERT-001',
                issuedDate: new Date(),
                expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            });

            await service.verifyCertification(cert.id, 'admin1', true);

            const result = await service.canAcceptJobs('insp1');
            expect(result.allowed).toBe(true);
        });

        it('should return not allowed for non-compliant inspector', async () => {
            const result = await service.canAcceptJobs('non_certified_inspector');

            expect(result.allowed).toBe(false);
            expect(result.reason).toBeDefined();
        });
    });

    describe('getExpiringCertifications', () => {
        it('should find certifications expiring soon', async () => {
            const cert = await service.registerCertification({
                inspectorId: 'insp1',
                type: 'UT',
                body: 'ASNT',
                level: 'Level II',
                number: 'CERT-001',
                issuedDate: new Date(),
                expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
            });

            await service.verifyCertification(cert.id, 'admin1', true);

            const expiring = service.getExpiringCertifications(30);
            expect(expiring.length).toBeGreaterThan(0);
        });
    });

    describe('logAudit', () => {
        it('should record audit entries', async () => {
            await service.logAudit({
                eventType: 'TEST_EVENT',
                actorId: 'user1',
                actorType: 'inspector',
                targetType: 'test',
                targetId: 'test1',
                action: 'test_action',
                details: { foo: 'bar' },
            });

            const logs = service.getAuditLog();
            expect(logs.length).toBeGreaterThan(0);
            expect(logs[0].eventType).toBe('TEST_EVENT');
        });
    });
});
