/**
 * Billing & Escrow Service
 * Handles payments, escrow, and financial transactions
 */

import { eventOrchestrator } from '../../lib/events/event-orchestrator';
import { createEvent } from '../../lib/events/event-types';
import { complianceService } from '../compliance/compliance-service';

export type TransactionStatus =
    | 'pending'
    | 'authorized'
    | 'captured'
    | 'in_escrow'
    | 'released'
    | 'refunded'
    | 'disputed'
    | 'failed';

export interface Transaction {
    id: string;
    jobId: string;
    clientId: string;
    providerId: string;
    inspectorId: string;
    amount: number;
    currency: string;
    status: TransactionStatus;
    description: string;
    breakdown: TransactionBreakdown;
    escrowReleasedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface TransactionBreakdown {
    baseAmount: number;
    platformFee: number;
    platformFeePercent: number;
    taxes: number;
    taxPercent: number;
    inspectorPayout: number;
    providerPayout: number;
}

export interface Invoice {
    id: string;
    transactionId: string;
    clientId: string;
    invoiceNumber: string;
    items: InvoiceItem[];
    subtotal: number;
    taxes: number;
    total: number;
    dueDate: Date;
    paidAt?: Date;
    status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
    pdfUrl?: string;
    createdAt: Date;
}

export interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface PayoutRequest {
    id: string;
    recipientId: string;
    recipientType: 'provider' | 'inspector';
    amount: number;
    currency: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    transactionIds: string[];
    bankDetails?: {
        accountNumber: string;
        routingNumber: string;
        bankName: string;
    };
    processedAt?: Date;
    createdAt: Date;
}

/**
 * Billing & Escrow Service
 */
export class BillingService {
    private transactions = new Map<string, Transaction>();
    private invoices = new Map<string, Invoice>();
    private payouts = new Map<string, PayoutRequest>();
    private invoiceCounter = 1000;

    // Platform fee configuration
    private readonly platformFeePercent = 10; // 10%
    private readonly taxPercent = 18; // GST

    /**
     * Create transaction for job
     */
    async createTransaction(data: {
        jobId: string;
        clientId: string;
        providerId: string;
        inspectorId: string;
        baseAmount: number;
        currency: string;
        description: string;
    }): Promise<Transaction> {
        const breakdown = this.calculateBreakdown(data.baseAmount);

        const transaction: Transaction = {
            id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            jobId: data.jobId,
            clientId: data.clientId,
            providerId: data.providerId,
            inspectorId: data.inspectorId,
            amount: breakdown.baseAmount + breakdown.platformFee + breakdown.taxes,
            currency: data.currency,
            status: 'pending',
            description: data.description,
            breakdown,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.transactions.set(transaction.id, transaction);

        await complianceService.logAudit({
            eventType: 'TRANSACTION_CREATED',
            actorId: data.clientId,
            actorType: 'client',
            targetType: 'transaction',
            targetId: transaction.id,
            action: 'create',
            details: { amount: transaction.amount, jobId: data.jobId },
        });

        return transaction;
    }

    /**
     * Authorize payment (pre-auth)
     */
    async authorizePayment(transactionId: string): Promise<boolean> {
        const transaction = this.transactions.get(transactionId);
        if (!transaction) return false;

        // In production, integrate with Stripe/payment gateway
        transaction.status = 'authorized';
        transaction.updatedAt = new Date();

        return true;
    }

    /**
     * Move funds to escrow after job starts
     */
    async moveToEscrow(transactionId: string): Promise<boolean> {
        const transaction = this.transactions.get(transactionId);
        if (!transaction || transaction.status !== 'authorized') return false;

        transaction.status = 'in_escrow';
        transaction.updatedAt = new Date();

        await complianceService.logAudit({
            eventType: 'FUNDS_IN_ESCROW',
            actorId: 'system',
            actorType: 'system',
            targetType: 'transaction',
            targetId: transactionId,
            action: 'escrow',
            details: { amount: transaction.amount },
        });

        return true;
    }

    /**
     * Release escrow after job completion
     */
    async releaseEscrow(transactionId: string): Promise<boolean> {
        const transaction = this.transactions.get(transactionId);
        if (!transaction || transaction.status !== 'in_escrow') return false;

        transaction.status = 'released';
        transaction.escrowReleasedAt = new Date();
        transaction.updatedAt = new Date();

        // Create payout requests
        await this.createPayoutRequest(
            transaction.providerId,
            'provider',
            transaction.breakdown.providerPayout,
            transaction.currency,
            [transactionId]
        );

        await this.createPayoutRequest(
            transaction.inspectorId,
            'inspector',
            transaction.breakdown.inspectorPayout,
            transaction.currency,
            [transactionId]
        );

        await complianceService.logAudit({
            eventType: 'ESCROW_RELEASED',
            actorId: 'system',
            actorType: 'system',
            targetType: 'transaction',
            targetId: transactionId,
            action: 'release',
            details: {
                providerPayout: transaction.breakdown.providerPayout,
                inspectorPayout: transaction.breakdown.inspectorPayout,
            },
        });

        return true;
    }

    /**
     * Process refund
     */
    async processRefund(
        transactionId: string,
        reason: string,
        amount?: number
    ): Promise<boolean> {
        const transaction = this.transactions.get(transactionId);
        if (!transaction) return false;

        const refundAmount = amount || transaction.amount;
        transaction.status = 'refunded';
        transaction.updatedAt = new Date();

        await complianceService.logAudit({
            eventType: 'REFUND_PROCESSED',
            actorId: 'system',
            actorType: 'system',
            targetType: 'transaction',
            targetId: transactionId,
            action: 'refund',
            details: { refundAmount, reason },
        });

        return true;
    }

    /**
     * Generate invoice
     */
    async generateInvoice(transactionId: string): Promise<Invoice> {
        const transaction = this.transactions.get(transactionId);
        if (!transaction) {
            throw new Error(`Transaction ${transactionId} not found`);
        }

        this.invoiceCounter++;
        const invoice: Invoice = {
            id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            transactionId,
            clientId: transaction.clientId,
            invoiceNumber: `INV-${this.invoiceCounter}`,
            items: [
                {
                    description: transaction.description,
                    quantity: 1,
                    unitPrice: transaction.breakdown.baseAmount,
                    total: transaction.breakdown.baseAmount,
                },
                {
                    description: 'Platform Service Fee',
                    quantity: 1,
                    unitPrice: transaction.breakdown.platformFee,
                    total: transaction.breakdown.platformFee,
                },
            ],
            subtotal: transaction.breakdown.baseAmount + transaction.breakdown.platformFee,
            taxes: transaction.breakdown.taxes,
            total: transaction.amount,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            status: 'sent',
            createdAt: new Date(),
        };

        this.invoices.set(invoice.id, invoice);

        return invoice;
    }

    /**
     * Get transaction by ID
     */
    getTransaction(transactionId: string): Transaction | undefined {
        return this.transactions.get(transactionId);
    }

    /**
     * Get transactions for user
     */
    getTransactionsForUser(userId: string): Transaction[] {
        return Array.from(this.transactions.values()).filter(
            t => t.clientId === userId || t.providerId === userId || t.inspectorId === userId
        );
    }

    /**
     * Get pending payouts
     */
    getPendingPayouts(recipientId: string): PayoutRequest[] {
        return Array.from(this.payouts.values()).filter(
            p => p.recipientId === recipientId && p.status === 'pending'
        );
    }

    /**
     * Get platform revenue
     */
    getPlatformRevenue(startDate?: Date, endDate?: Date): number {
        let revenue = 0;
        for (const transaction of this.transactions.values()) {
            if (transaction.status === 'released') {
                if (startDate && transaction.createdAt < startDate) continue;
                if (endDate && transaction.createdAt > endDate) continue;
                revenue += transaction.breakdown.platformFee;
            }
        }
        return revenue;
    }

    // Private methods

    private calculateBreakdown(baseAmount: number): TransactionBreakdown {
        const platformFee = Math.round(baseAmount * (this.platformFeePercent / 100) * 100) / 100;
        const subtotal = baseAmount + platformFee;
        const taxes = Math.round(subtotal * (this.taxPercent / 100) * 100) / 100;

        // Provider gets 70%, Inspector gets 30% of base amount
        const netAmount = baseAmount;
        const providerPayout = Math.round(netAmount * 0.7 * 100) / 100;
        const inspectorPayout = Math.round(netAmount * 0.3 * 100) / 100;

        return {
            baseAmount,
            platformFee,
            platformFeePercent: this.platformFeePercent,
            taxes,
            taxPercent: this.taxPercent,
            providerPayout,
            inspectorPayout,
        };
    }

    private async createPayoutRequest(
        recipientId: string,
        recipientType: 'provider' | 'inspector',
        amount: number,
        currency: string,
        transactionIds: string[]
    ): Promise<PayoutRequest> {
        const payout: PayoutRequest = {
            id: `payout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            recipientId,
            recipientType,
            amount,
            currency,
            status: 'pending',
            transactionIds,
            createdAt: new Date(),
        };

        this.payouts.set(payout.id, payout);

        return payout;
    }
}

// Singleton instance
export const billingService = new BillingService();
