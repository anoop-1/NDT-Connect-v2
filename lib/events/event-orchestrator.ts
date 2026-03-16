/**
 * Event Orchestrator Service (Fireball-equivalent)
 * Pushes updates only when meaningful events occur
 * Handles idempotent delivery and back-pressure
 */

import { InspectionEvent, EventType, createEvent } from './event-types';

type EventHandler = (event: InspectionEvent) => void | Promise<void>;
type EventFilter = (event: InspectionEvent) => boolean;

interface Subscription {
    id: string;
    userId: string;
    eventTypes: EventType[];
    filter?: EventFilter;
    handler: EventHandler;
    createdAt: number;
}

interface DeliveryRecord {
    eventId: string;
    subscriptionId: string;
    deliveredAt: number;
    attempts: number;
}

/**
 * Event Orchestrator - manages subscriptions and event delivery
 */
export class EventOrchestrator {
    private subscriptions = new Map<string, Subscription>();
    private userSubscriptions = new Map<string, Set<string>>();
    private deliveryLog = new Map<string, DeliveryRecord>();
    private eventQueue: InspectionEvent[] = [];
    private processing = false;
    private readonly maxQueueSize = 10000;
    private readonly maxRetries = 3;
    private readonly deliveryTimeout = 5000;

    /**
     * Subscribe to events
     */
    subscribe(
        userId: string,
        eventTypes: EventType[],
        handler: EventHandler,
        filter?: EventFilter
    ): string {
        const subscriptionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const subscription: Subscription = {
            id: subscriptionId,
            userId,
            eventTypes,
            filter,
            handler,
            createdAt: Date.now(),
        };

        this.subscriptions.set(subscriptionId, subscription);

        if (!this.userSubscriptions.has(userId)) {
            this.userSubscriptions.set(userId, new Set());
        }
        this.userSubscriptions.get(userId)!.add(subscriptionId);

        return subscriptionId;
    }

    /**
     * Unsubscribe from events
     */
    unsubscribe(subscriptionId: string): boolean {
        const subscription = this.subscriptions.get(subscriptionId);
        if (!subscription) return false;

        this.subscriptions.delete(subscriptionId);
        this.userSubscriptions.get(subscription.userId)?.delete(subscriptionId);

        return true;
    }

    /**
     * Unsubscribe all for a user
     */
    unsubscribeUser(userId: string): void {
        const subs = this.userSubscriptions.get(userId);
        if (subs) {
            subs.forEach(id => this.subscriptions.delete(id));
            this.userSubscriptions.delete(userId);
        }
    }

    /**
     * Publish an event (with back-pressure handling)
     */
    async publish(event: InspectionEvent): Promise<boolean> {
        // Back-pressure: reject if queue is full
        if (this.eventQueue.length >= this.maxQueueSize) {
            console.warn(`Event queue full, dropping event: ${event.id}`);
            return false;
        }

        this.eventQueue.push(event);

        // Start processing if not already running
        if (!this.processing) {
            this.processQueue();
        }

        return true;
    }

    /**
     * Process event queue
     */
    private async processQueue(): Promise<void> {
        if (this.processing) return;
        this.processing = true;

        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.shift()!;
            await this.deliverEvent(event);
        }

        this.processing = false;
    }

    /**
     * Deliver event to matching subscribers (idempotent)
     */
    private async deliverEvent(event: InspectionEvent): Promise<void> {
        const matchingSubscriptions = this.findMatchingSubscriptions(event);

        const deliveryPromises = matchingSubscriptions.map(async (sub) => {
            const deliveryKey = `${event.id}:${sub.id}`;

            // Idempotency check
            if (this.deliveryLog.has(deliveryKey)) {
                return; // Already delivered
            }

            try {
                await Promise.race([
                    sub.handler(event),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Delivery timeout')), this.deliveryTimeout)
                    ),
                ]);

                // Record successful delivery
                this.deliveryLog.set(deliveryKey, {
                    eventId: event.id,
                    subscriptionId: sub.id,
                    deliveredAt: Date.now(),
                    attempts: 1,
                });
            } catch (error: any) {
                console.error(`Failed to deliver event ${event.id} to ${sub.id}:`, error);
                // Could implement retry logic here
            }
        });

        await Promise.allSettled(deliveryPromises);
    }

    /**
     * Find subscriptions matching an event
     */
    private findMatchingSubscriptions(event: InspectionEvent): Subscription[] {
        const matching: Subscription[] = [];

        for (const sub of this.subscriptions.values()) {
            if (!sub.eventTypes.includes(event.type)) continue;
            if (sub.filter && !sub.filter(event)) continue;
            matching.push(sub);
        }

        return matching;
    }

    /**
     * Get subscription count for a user
     */
    getSubscriptionCount(userId: string): number {
        return this.userSubscriptions.get(userId)?.size || 0;
    }

    /**
     * Clear old delivery records (memory management)
     */
    pruneDeliveryLog(maxAge: number = 3600000): void {
        const cutoff = Date.now() - maxAge;
        for (const [key, record] of this.deliveryLog) {
            if (record.deliveredAt < cutoff) {
                this.deliveryLog.delete(key);
            }
        }
    }
}

// Singleton instance
export const eventOrchestrator = new EventOrchestrator();

// Convenience methods for publishing specific events
export const EventPublisher = {
    jobCreated: (payload: Parameters<typeof createEvent>[1] & { jobId: string }) =>
        eventOrchestrator.publish(createEvent('JOB_CREATED' as any, payload)),

    jobAccepted: (jobId: string, inspectorId: string, inspectorName: string, etaMinutes: number) =>
        eventOrchestrator.publish(
            createEvent('JOB_ACCEPTED' as any, {
                jobId,
                inspectorId,
                inspectorName,
                estimatedArrival: new Date(Date.now() + etaMinutes * 60000).toISOString(),
                etaMinutes,
            })
        ),

    inspectionStarted: (inspectionId: string, jobId: string, inspectorId: string, assetId: string) =>
        eventOrchestrator.publish(
            createEvent('INSPECTION_STARTED' as any, {
                inspectionId,
                jobId,
                inspectorId,
                assetId,
                startTime: new Date().toISOString(),
                inspectionType: 'standard',
            })
        ),

    defectDetected: (
        defectId: string,
        inspectionId: string,
        assetId: string,
        defectType: string,
        severity: 'low' | 'medium' | 'high' | 'critical'
    ) =>
        eventOrchestrator.publish(
            createEvent('DEFECT_DETECTED' as any, {
                defectId,
                inspectionId,
                assetId,
                defectType,
                severity,
                location: '',
                measurements: {},
            })
        ),

    etaUpdate: (jobId: string, inspectorId: string, etaMinutes: number, confidence: number) =>
        eventOrchestrator.publish(
            createEvent('ETA_UPDATE' as any, {
                jobId,
                inspectorId,
                etaMinutes,
                confidence,
                distanceKm: 0,
                updatedAt: new Date().toISOString(),
            })
        ),
};
