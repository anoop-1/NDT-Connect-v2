/**
 * Event Orchestrator Tests
 */

import { EventOrchestrator } from '../lib/events/event-orchestrator';
import { createEvent, InspectionEvent, EventType } from '../lib/events/event-types';

describe('Event Orchestrator', () => {
    let orchestrator: EventOrchestrator;

    beforeEach(() => {
        orchestrator = new EventOrchestrator();
    });

    describe('subscribe', () => {
        it('should return a subscription ID', () => {
            const subId = orchestrator.subscribe(
                'user1',
                ['JOB_CREATED'],
                jest.fn()
            );

            expect(subId).toBeDefined();
            expect(typeof subId).toBe('string');
            expect(subId.startsWith('sub_')).toBe(true);
        });

        it('should track subscription count per user', () => {
            orchestrator.subscribe('user1', ['JOB_CREATED'], jest.fn());
            orchestrator.subscribe('user1', ['JOB_ACCEPTED'], jest.fn());
            orchestrator.subscribe('user2', ['JOB_CREATED'], jest.fn());

            expect(orchestrator.getSubscriptionCount('user1')).toBe(2);
            expect(orchestrator.getSubscriptionCount('user2')).toBe(1);
        });
    });

    describe('unsubscribe', () => {
        it('should remove subscription', () => {
            const subId = orchestrator.subscribe(
                'user1',
                ['JOB_CREATED'],
                jest.fn()
            );

            expect(orchestrator.getSubscriptionCount('user1')).toBe(1);

            const result = orchestrator.unsubscribe(subId);

            expect(result).toBe(true);
            expect(orchestrator.getSubscriptionCount('user1')).toBe(0);
        });

        it('should return false for non-existent subscription', () => {
            const result = orchestrator.unsubscribe('non_existent_sub');
            expect(result).toBe(false);
        });
    });

    describe('unsubscribeUser', () => {
        it('should remove all subscriptions for user', () => {
            orchestrator.subscribe('user1', ['JOB_CREATED'], jest.fn());
            orchestrator.subscribe('user1', ['JOB_ACCEPTED'], jest.fn());

            orchestrator.unsubscribeUser('user1');

            expect(orchestrator.getSubscriptionCount('user1')).toBe(0);
        });
    });

    describe('publish', () => {
        it('should publish event and return true', async () => {
            const event = createEvent('JOB_CREATED' as EventType, {
                jobId: 'job123',
                clientId: 'client1',
                serviceType: 'UT',
                location: { lat: 28.6, lng: 77.2, address: 'Test' },
                requestedDate: new Date().toISOString(),
                priority: 'normal',
                requirements: [],
            });

            const result = await orchestrator.publish(event as any);
            expect(result).toBe(true);
        });

        it('should deliver event to matching subscriber', async () => {
            const handler = jest.fn();

            orchestrator.subscribe('user1', ['JOB_CREATED'], handler);

            const event = createEvent('JOB_CREATED' as EventType, {
                jobId: 'job123',
                clientId: 'client1',
                serviceType: 'UT',
                location: { lat: 28.6, lng: 77.2, address: 'Test' },
                requestedDate: new Date().toISOString(),
                priority: 'normal',
                requirements: [],
            });

            await orchestrator.publish(event as any);

            // Wait for async delivery
            await new Promise(resolve => setTimeout(resolve, 100));

            expect(handler).toHaveBeenCalledWith(expect.objectContaining({
                type: 'JOB_CREATED',
            }));
        });

        it('should not deliver event to non-matching subscriber', async () => {
            const handler = jest.fn();

            orchestrator.subscribe('user1', ['JOB_ACCEPTED'], handler);

            const event = createEvent('JOB_CREATED' as EventType, {
                jobId: 'job123',
                clientId: 'client1',
                serviceType: 'UT',
                location: { lat: 28.6, lng: 77.2, address: 'Test' },
                requestedDate: new Date().toISOString(),
                priority: 'normal',
                requirements: [],
            });

            await orchestrator.publish(event as any);
            await new Promise(resolve => setTimeout(resolve, 100));

            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('createEvent', () => {
        it('should create event with required fields', () => {
            const event = createEvent('JOB_CREATED' as EventType, {
                jobId: 'job123',
                clientId: 'client1',
                serviceType: 'UT',
                location: { lat: 28.6, lng: 77.2, address: 'Test' },
                requestedDate: new Date().toISOString(),
                priority: 'normal',
                requirements: [],
            });

            expect(event.id).toBeDefined();
            expect(event.type).toBe('JOB_CREATED');
            expect(event.timestamp).toBeDefined();
            expect(event.version).toBe(1);
            expect(event.source).toBe('ndtconnect');
            expect(event.payload).toBeDefined();
        });
    });
});
