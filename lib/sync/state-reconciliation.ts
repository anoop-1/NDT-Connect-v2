/**
 * Client-side State Synchronization
 * Handles offline state and reconciliation when reconnecting
 */

import { InspectionEvent } from '../events/event-types';

interface SyncedEntity {
    id: string;
    data: unknown;
    version: number;
    lastSyncedAt: number;
    pendingChanges: unknown[];
}

type ConflictResolver<T> = (local: T, remote: T) => T;

/**
 * State Reconciliation Manager
 * Manages local state, pending changes, and sync with server
 */
export class StateReconciler<T extends { id: string; version?: number }> {
    private localState = new Map<string, SyncedEntity>();
    private pendingOperations: Array<{
        id: string;
        operation: 'create' | 'update' | 'delete';
        data: Partial<T>;
        timestamp: number;
    }> = [];
    private conflictResolver: ConflictResolver<T>;
    private lastSyncTimestamp = 0;

    constructor(conflictResolver?: ConflictResolver<T>) {
        this.conflictResolver = conflictResolver || ((_, remote) => remote);
    }

    /**
     * Update local state with new data
     */
    updateLocal(entity: T): void {
        const existing = this.localState.get(entity.id);

        this.localState.set(entity.id, {
            id: entity.id,
            data: entity,
            version: (entity.version || 0) + 1,
            lastSyncedAt: existing?.lastSyncedAt || 0,
            pendingChanges: [...(existing?.pendingChanges || []), entity],
        });
    }

    /**
     * Queue a pending operation for sync
     */
    queueOperation(
        id: string,
        operation: 'create' | 'update' | 'delete',
        data: Partial<T>
    ): void {
        this.pendingOperations.push({
            id,
            operation,
            data,
            timestamp: Date.now(),
        });
    }

    /**
     * Apply remote state update (from server)
     */
    applyRemoteUpdate(entity: T): T {
        const local = this.localState.get(entity.id);

        if (!local) {
            // No local version, just use remote
            this.localState.set(entity.id, {
                id: entity.id,
                data: entity,
                version: entity.version || 1,
                lastSyncedAt: Date.now(),
                pendingChanges: [],
            });
            return entity;
        }

        // Check for conflicts
        if (local.pendingChanges.length > 0) {
            // Resolve conflict
            const resolved = this.conflictResolver(local.data as T, entity);
            this.localState.set(entity.id, {
                id: entity.id,
                data: resolved,
                version: Math.max(local.version, entity.version || 0) + 1,
                lastSyncedAt: Date.now(),
                pendingChanges: [],
            });
            return resolved;
        }

        // No conflict, apply remote
        this.localState.set(entity.id, {
            id: entity.id,
            data: entity,
            version: entity.version || local.version,
            lastSyncedAt: Date.now(),
            pendingChanges: [],
        });
        return entity;
    }

    /**
     * Get current local state for an entity
     */
    getLocal(id: string): T | undefined {
        return this.localState.get(id)?.data as T | undefined;
    }

    /**
     * Get all entities with pending changes
     */
    getPendingChanges(): Array<{ id: string; data: T; version: number }> {
        const pending: Array<{ id: string; data: T; version: number }> = [];

        for (const [id, entity] of this.localState) {
            if (entity.pendingChanges.length > 0) {
                pending.push({
                    id,
                    data: entity.data as T,
                    version: entity.version,
                });
            }
        }

        return pending;
    }

    /**
     * Get pending operations queue
     */
    getPendingOperations(): typeof this.pendingOperations {
        return [...this.pendingOperations];
    }

    /**
     * Clear pending operations after successful sync
     */
    clearPendingOperations(): void {
        this.pendingOperations = [];
    }

    /**
     * Mark entity as synced
     */
    markSynced(id: string): void {
        const entity = this.localState.get(id);
        if (entity) {
            entity.lastSyncedAt = Date.now();
            entity.pendingChanges = [];
        }
    }

    /**
     * Check if there are pending changes
     */
    hasPendingChanges(): boolean {
        return this.pendingOperations.length > 0 ||
            Array.from(this.localState.values()).some(e => e.pendingChanges.length > 0);
    }

    /**
     * Handle event-based state updates
     */
    handleEvent(event: InspectionEvent): void {
        this.lastSyncTimestamp = Math.max(this.lastSyncTimestamp, event.timestamp);
        // Subclasses can override to handle specific event types
    }

    /**
     * Get last sync timestamp
     */
    getLastSyncTimestamp(): number {
        return this.lastSyncTimestamp;
    }

    /**
     * Persist state to localStorage (for offline support)
     */
    persistToStorage(key: string): void {
        if (typeof window === 'undefined') return;

        const state = {
            entities: Array.from(this.localState.entries()),
            pendingOperations: this.pendingOperations,
            lastSyncTimestamp: this.lastSyncTimestamp,
        };

        localStorage.setItem(key, JSON.stringify(state));
    }

    /**
     * Restore state from localStorage
     */
    restoreFromStorage(key: string): boolean {
        if (typeof window === 'undefined') return false;

        const stored = localStorage.getItem(key);
        if (!stored) return false;

        try {
            const state = JSON.parse(stored);
            this.localState = new Map(state.entities);
            this.pendingOperations = state.pendingOperations || [];
            this.lastSyncTimestamp = state.lastSyncTimestamp || 0;
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Clear all state
     */
    clear(): void {
        this.localState.clear();
        this.pendingOperations = [];
        this.lastSyncTimestamp = 0;
    }
}

/**
 * Offline Queue for operations during network outage
 */
export class OfflineQueue {
    private queue: Array<{
        id: string;
        action: () => Promise<unknown>;
        retries: number;
        createdAt: number;
    }> = [];
    private processing = false;
    private maxRetries = 3;

    /**
     * Add operation to queue
     */
    enqueue(id: string, action: () => Promise<unknown>): void {
        this.queue.push({
            id,
            action,
            retries: 0,
            createdAt: Date.now(),
        });
    }

    /**
     * Process queue when online
     */
    async processQueue(): Promise<{ succeeded: number; failed: number }> {
        if (this.processing || this.queue.length === 0) {
            return { succeeded: 0, failed: 0 };
        }

        this.processing = true;
        let succeeded = 0;
        let failed = 0;

        while (this.queue.length > 0) {
            const item = this.queue[0];

            try {
                await item.action();
                this.queue.shift();
                succeeded++;
            } catch (error) {
                item.retries++;
                if (item.retries >= this.maxRetries) {
                    this.queue.shift();
                    failed++;
                    console.error(`Operation ${item.id} failed after ${this.maxRetries} retries`);
                } else {
                    // Move to end of queue for retry
                    this.queue.push(this.queue.shift()!);
                    break; // Stop processing, will retry later
                }
            }
        }

        this.processing = false;
        return { succeeded, failed };
    }

    /**
     * Get queue size
     */
    size(): number {
        return this.queue.length;
    }

    /**
     * Clear queue
     */
    clear(): void {
        this.queue = [];
    }
}
