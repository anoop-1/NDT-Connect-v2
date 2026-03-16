/**
 * Billing Service Tests
 */

import { BillingService } from '../services/billing/billing-service';

// Mock compliance service
jest.mock('../services/compliance/compliance-service', () => ({
    complianceService: {
        logAudit: jest.fn().mockResolvedValue(undefined),
    },
}));

describe('Billing Service', () => {
    let service: BillingService;

    beforeEach(() => {
        service = new BillingService();
    });

    describe('createTransaction', () => {
        it('should create transaction with breakdown', async () => {
            const txn = await service.createTransaction({
                jobId: 'job1',
                clientId: 'client1',
                providerId: 'provider1',
                inspectorId: 'insp1',
                baseAmount: 1000,
                currency: 'INR',
                description: 'Ultrasonic Testing',
            });

            expect(txn.id).toBeDefined();
            expect(txn.status).toBe('pending');
            expect(txn.breakdown).toBeDefined();
            expect(txn.breakdown.baseAmount).toBe(1000);
            expect(txn.breakdown.platformFee).toBe(100); // 10%
            expect(txn.breakdown.providerPayout).toBe(700); // 70% of base
            expect(txn.breakdown.inspectorPayout).toBe(300); // 30% of base
        });
    });

    describe('authorizePayment', () => {
        it('should authorize pending payment', async () => {
            const txn = await service.createTransaction({
                jobId: 'job1',
                clientId: 'client1',
                providerId: 'provider1',
                inspectorId: 'insp1',
                baseAmount: 1000,
                currency: 'INR',
                description: 'Test',
            });

            const result = await service.authorizePayment(txn.id);

            expect(result).toBe(true);
            expect(service.getTransaction(txn.id)?.status).toBe('authorized');
        });

        it('should return false for non-existent transaction', async () => {
            const result = await service.authorizePayment('non_existent');
            expect(result).toBe(false);
        });
    });

    describe('moveToEscrow', () => {
        it('should move authorized payment to escrow', async () => {
            const txn = await service.createTransaction({
                jobId: 'job1',
                clientId: 'client1',
                providerId: 'provider1',
                inspectorId: 'insp1',
                baseAmount: 1000,
                currency: 'INR',
                description: 'Test',
            });

            await service.authorizePayment(txn.id);
            const result = await service.moveToEscrow(txn.id);

            expect(result).toBe(true);
            expect(service.getTransaction(txn.id)?.status).toBe('in_escrow');
        });

        it('should fail if not authorized', async () => {
            const txn = await service.createTransaction({
                jobId: 'job1',
                clientId: 'client1',
                providerId: 'provider1',
                inspectorId: 'insp1',
                baseAmount: 1000,
                currency: 'INR',
                description: 'Test',
            });

            const result = await service.moveToEscrow(txn.id);
            expect(result).toBe(false);
        });
    });

    describe('releaseEscrow', () => {
        it('should release escrow and create payouts', async () => {
            const txn = await service.createTransaction({
                jobId: 'job1',
                clientId: 'client1',
                providerId: 'provider1',
                inspectorId: 'insp1',
                baseAmount: 1000,
                currency: 'INR',
                description: 'Test',
            });

            await service.authorizePayment(txn.id);
            await service.moveToEscrow(txn.id);
            const result = await service.releaseEscrow(txn.id);

            expect(result).toBe(true);
            expect(service.getTransaction(txn.id)?.status).toBe('released');
            expect(service.getTransaction(txn.id)?.escrowReleasedAt).toBeDefined();
        });
    });

    describe('processRefund', () => {
        it('should process refund', async () => {
            const txn = await service.createTransaction({
                jobId: 'job1',
                clientId: 'client1',
                providerId: 'provider1',
                inspectorId: 'insp1',
                baseAmount: 1000,
                currency: 'INR',
                description: 'Test',
            });

            const result = await service.processRefund(txn.id, 'Job cancelled');

            expect(result).toBe(true);
            expect(service.getTransaction(txn.id)?.status).toBe('refunded');
        });
    });

    describe('generateInvoice', () => {
        it('should generate invoice for transaction', async () => {
            const txn = await service.createTransaction({
                jobId: 'job1',
                clientId: 'client1',
                providerId: 'provider1',
                inspectorId: 'insp1',
                baseAmount: 1000,
                currency: 'INR',
                description: 'Ultrasonic Testing',
            });

            const invoice = await service.generateInvoice(txn.id);

            expect(invoice.id).toBeDefined();
            expect(invoice.invoiceNumber).toMatch(/^INV-\d+$/);
            expect(invoice.total).toBe(txn.amount);
            expect(invoice.items.length).toBe(2); // Base + Platform fee
        });
    });

    describe('getPlatformRevenue', () => {
        it('should calculate platform revenue from released transactions', async () => {
            const txn = await service.createTransaction({
                jobId: 'job1',
                clientId: 'client1',
                providerId: 'provider1',
                inspectorId: 'insp1',
                baseAmount: 1000,
                currency: 'INR',
                description: 'Test',
            });

            await service.authorizePayment(txn.id);
            await service.moveToEscrow(txn.id);
            await service.releaseEscrow(txn.id);

            const revenue = service.getPlatformRevenue();
            expect(revenue).toBe(100); // 10% of 1000
        });
    });
});
