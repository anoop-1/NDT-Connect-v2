/**
 * Service Discovery using Consul-compatible interface
 * Enables microservices to register and discover each other
 */

interface ServiceInstance {
    id: string;
    name: string;
    address: string;
    port: number;
    tags: string[];
    meta: Record<string, string>;
    health: 'passing' | 'warning' | 'critical';
    lastHeartbeat: number;
}

interface ServiceCheck {
    interval: number; // ms
    timeout: number; // ms
    deregisterAfter: number; // ms
}

/**
 * Service Discovery Registry
 */
export class ServiceRegistry {
    private services = new Map<string, Map<string, ServiceInstance>>();
    private healthChecks = new Map<string, NodeJS.Timeout>();
    private readonly defaultCheck: ServiceCheck = {
        interval: 10000, // 10 seconds
        timeout: 5000, // 5 seconds
        deregisterAfter: 60000, // 1 minute
    };

    /**
     * Register a service instance
     */
    register(
        serviceName: string,
        instance: Omit<ServiceInstance, 'id' | 'health' | 'lastHeartbeat'>,
        check?: Partial<ServiceCheck>
    ): string {
        const instanceId = `${serviceName}-${instance.address}-${instance.port}`;

        const fullInstance: ServiceInstance = {
            ...instance,
            id: instanceId,
            name: serviceName,
            health: 'passing',
            lastHeartbeat: Date.now(),
        };

        if (!this.services.has(serviceName)) {
            this.services.set(serviceName, new Map());
        }
        this.services.get(serviceName)!.set(instanceId, fullInstance);

        // Start health check
        const checkConfig = { ...this.defaultCheck, ...check };
        this.startHealthCheck(instanceId, serviceName, checkConfig);

        console.log(`Service registered: ${instanceId}`);
        return instanceId;
    }

    /**
     * Deregister a service instance
     */
    deregister(instanceId: string): boolean {
        // Stop health check
        const checkTimer = this.healthChecks.get(instanceId);
        if (checkTimer) {
            clearInterval(checkTimer);
            this.healthChecks.delete(instanceId);
        }

        // Remove from registry
        for (const [serviceName, instances] of this.services) {
            if (instances.has(instanceId)) {
                instances.delete(instanceId);
                if (instances.size === 0) {
                    this.services.delete(serviceName);
                }
                console.log(`Service deregistered: ${instanceId}`);
                return true;
            }
        }

        return false;
    }

    /**
     * Get healthy instances of a service
     */
    getService(serviceName: string): ServiceInstance[] {
        const instances = this.services.get(serviceName);
        if (!instances) return [];

        return Array.from(instances.values()).filter(i => i.health === 'passing');
    }

    /**
     * Get all services
     */
    getAllServices(): Record<string, ServiceInstance[]> {
        const result: Record<string, ServiceInstance[]> = {};

        for (const [name, instances] of this.services) {
            result[name] = Array.from(instances.values());
        }

        return result;
    }

    /**
     * Get service instance by ID
     */
    getInstance(instanceId: string): ServiceInstance | undefined {
        for (const instances of this.services.values()) {
            if (instances.has(instanceId)) {
                return instances.get(instanceId);
            }
        }
        return undefined;
    }

    /**
     * Update heartbeat for an instance
     */
    heartbeat(instanceId: string): boolean {
        const instance = this.getInstance(instanceId);
        if (instance) {
            instance.lastHeartbeat = Date.now();
            instance.health = 'passing';
            return true;
        }
        return false;
    }

    /**
     * Load balance - get next instance using round-robin
     */
    private loadBalanceIndex = new Map<string, number>();

    getNextInstance(serviceName: string): ServiceInstance | undefined {
        const instances = this.getService(serviceName);
        if (instances.length === 0) return undefined;

        const currentIndex = this.loadBalanceIndex.get(serviceName) || 0;
        const nextIndex = (currentIndex + 1) % instances.length;
        this.loadBalanceIndex.set(serviceName, nextIndex);

        return instances[currentIndex];
    }

    /**
     * Watch for service changes
     */
    private watchers = new Map<string, Set<(instances: ServiceInstance[]) => void>>();

    watch(serviceName: string, callback: (instances: ServiceInstance[]) => void): () => void {
        if (!this.watchers.has(serviceName)) {
            this.watchers.set(serviceName, new Set());
        }
        this.watchers.get(serviceName)!.add(callback);

        // Initial callback
        callback(this.getService(serviceName));

        // Return unwatch function
        return () => {
            this.watchers.get(serviceName)?.delete(callback);
        };
    }

    // Private methods

    private startHealthCheck(
        instanceId: string,
        serviceName: string,
        check: ServiceCheck
    ): void {
        const timer = setInterval(() => {
            const instance = this.getInstance(instanceId);
            if (!instance) {
                clearInterval(timer);
                return;
            }

            const timeSinceHeartbeat = Date.now() - instance.lastHeartbeat;

            if (timeSinceHeartbeat > check.deregisterAfter) {
                // Deregister stale instance
                this.deregister(instanceId);
                this.notifyWatchers(serviceName);
            } else if (timeSinceHeartbeat > check.timeout) {
                // Mark as critical
                if (instance.health !== 'critical') {
                    instance.health = 'critical';
                    this.notifyWatchers(serviceName);
                }
            } else if (timeSinceHeartbeat > check.interval * 2) {
                // Mark as warning
                if (instance.health !== 'warning') {
                    instance.health = 'warning';
                    this.notifyWatchers(serviceName);
                }
            }
        }, check.interval);

        this.healthChecks.set(instanceId, timer);
    }

    private notifyWatchers(serviceName: string): void {
        const watchers = this.watchers.get(serviceName);
        if (watchers) {
            const instances = this.getService(serviceName);
            watchers.forEach(callback => callback(instances));
        }
    }

    /**
     * Cleanup all resources
     */
    shutdown(): void {
        for (const timer of this.healthChecks.values()) {
            clearInterval(timer);
        }
        this.healthChecks.clear();
        this.services.clear();
        this.watchers.clear();
    }
}

// Singleton instance
export const serviceRegistry = new ServiceRegistry();

// Pre-defined service names
export const SERVICES = {
    WEB: 'ndtconnect-web',
    DISPATCH: 'ndtconnect-dispatch',
    LIFECYCLE: 'ndtconnect-lifecycle',
    COMPLIANCE: 'ndtconnect-compliance',
    BILLING: 'ndtconnect-billing',
    EVENTS: 'ndtconnect-events',
} as const;
