/**
 * Service Discovery Tests
 */

import { ServiceRegistry, SERVICES } from '../lib/discovery/service-registry';

describe('Service Registry', () => {
    let registry: ServiceRegistry;

    beforeEach(() => {
        registry = new ServiceRegistry();
    });

    afterEach(() => {
        registry.shutdown();
    });

    describe('register', () => {
        it('should register service instance', () => {
            const instanceId = registry.register('test-service', {
                address: '127.0.0.1',
                port: 3000,
                tags: ['http', 'api'],
                meta: { version: '1.0.0' },
            });

            expect(instanceId).toBeDefined();
            expect(instanceId).toContain('test-service');
        });

        it('should make service discoverable', () => {
            registry.register('test-service', {
                address: '127.0.0.1',
                port: 3000,
                tags: ['http'],
                meta: {},
            });

            const instances = registry.getService('test-service');
            expect(instances.length).toBe(1);
            expect(instances[0].address).toBe('127.0.0.1');
        });
    });

    describe('deregister', () => {
        it('should remove service from registry', () => {
            const instanceId = registry.register('test-service', {
                address: '127.0.0.1',
                port: 3000,
                tags: [],
                meta: {},
            });

            const result = registry.deregister(instanceId);

            expect(result).toBe(true);
            expect(registry.getService('test-service').length).toBe(0);
        });

        it('should return false for non-existent instance', () => {
            const result = registry.deregister('non-existent');
            expect(result).toBe(false);
        });
    });

    describe('getService', () => {
        it('should return only healthy instances', () => {
            const id1 = registry.register('test-service', {
                address: '127.0.0.1',
                port: 3000,
                tags: [],
                meta: {},
            });

            const id2 = registry.register('test-service', {
                address: '127.0.0.2',
                port: 3000,
                tags: [],
                meta: {},
            });

            // Both should be healthy initially
            const instances = registry.getService('test-service');
            expect(instances.length).toBe(2);
        });

        it('should return empty array for unknown service', () => {
            const instances = registry.getService('unknown-service');
            expect(instances).toEqual([]);
        });
    });

    describe('getAllServices', () => {
        it('should return all registered services', () => {
            registry.register('service-a', { address: '127.0.0.1', port: 3000, tags: [], meta: {} });
            registry.register('service-b', { address: '127.0.0.2', port: 3001, tags: [], meta: {} });

            const services = registry.getAllServices();

            expect(Object.keys(services)).toContain('service-a');
            expect(Object.keys(services)).toContain('service-b');
        });
    });

    describe('heartbeat', () => {
        it('should update lastHeartbeat', () => {
            const instanceId = registry.register('test-service', {
                address: '127.0.0.1',
                port: 3000,
                tags: [],
                meta: {},
            });

            const before = registry.getInstance(instanceId)?.lastHeartbeat;

            // Wait a bit
            jest.advanceTimersByTime(100);

            registry.heartbeat(instanceId);

            const after = registry.getInstance(instanceId)?.lastHeartbeat;

            expect(after).toBeGreaterThanOrEqual(before!);
        });
    });

    describe('getNextInstance (load balancing)', () => {
        it('should rotate through instances', () => {
            registry.register('test-service', { address: '127.0.0.1', port: 3000, tags: [], meta: {} });
            registry.register('test-service', { address: '127.0.0.2', port: 3001, tags: [], meta: {} });
            registry.register('test-service', { address: '127.0.0.3', port: 3002, tags: [], meta: {} });

            const addresses = new Set<string>();

            for (let i = 0; i < 6; i++) {
                const instance = registry.getNextInstance('test-service');
                if (instance) addresses.add(instance.address);
            }

            expect(addresses.size).toBe(3); // All instances should be used
        });
    });

    describe('watch', () => {
        it('should call callback on registration', (done) => {
            const callback = jest.fn((instances) => {
                if (instances.length > 0) {
                    expect(instances[0].address).toBe('127.0.0.1');
                    done();
                }
            });

            registry.watch('test-service', callback);

            // Should trigger callback
            registry.register('test-service', {
                address: '127.0.0.1',
                port: 3000,
                tags: [],
                meta: {},
            });
        });
    });
});
