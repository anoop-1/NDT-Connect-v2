'use client';

/**
 * Pusher Client - for React components
 */

import PusherClient from 'pusher-js';

// Re-export channel and event constants
export const CHANNELS = {
    JOBS: 'jobs',
    INSPECTIONS: 'inspections',
    LOCATIONS: 'locations',
    NOTIFICATIONS: (userId: string) => `private-user-${userId}`,
} as const;

export const EVENTS = {
    JOB_CREATED: 'job-created',
    JOB_ACCEPTED: 'job-accepted',
    JOB_UPDATED: 'job-updated',
    INSPECTION_STARTED: 'inspection-started',
    INSPECTION_UPDATED: 'inspection-updated',
    INSPECTION_COMPLETED: 'inspection-completed',
    LOCATION_UPDATE: 'location-update',
    ETA_UPDATE: 'eta-update',
    NOTIFICATION: 'notification',
} as const;

let pusherClient: PusherClient | null = null;

export function getPusherClient(): PusherClient {
    if (typeof window === 'undefined') {
        throw new Error('getPusherClient should only be called on client side');
    }

    if (!pusherClient) {
        const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
        const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2';

        if (!key) {
            console.warn('Pusher key not configured');
            // Return a mock client for development
            return {
                subscribe: () => ({
                    bind: () => { },
                    unbind: () => { },
                    unbind_all: () => { },
                }),
                unsubscribe: () => { },
            } as any;
        }

        pusherClient = new PusherClient(key, { cluster });
    }
    return pusherClient;
}

export function disconnectPusher(): void {
    if (pusherClient) {
        pusherClient.disconnect();
        pusherClient = null;
    }
}
