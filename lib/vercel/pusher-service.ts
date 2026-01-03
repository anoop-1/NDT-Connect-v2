/**
 * Pusher Server - for API routes only
 * Uses dynamic import to avoid client-side bundling
 */

// Channel names
export const CHANNELS = {
    JOBS: 'jobs',
    INSPECTIONS: 'inspections',
    LOCATIONS: 'locations',
    NOTIFICATIONS: (userId: string) => `private-user-${userId}`,
} as const;

// Event types
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

/**
 * Get Pusher server instance (lazy loaded)
 */
async function getPusherServer() {
    const Pusher = (await import('pusher')).default;
    return new Pusher({
        appId: process.env.PUSHER_APP_ID || '',
        key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
        secret: process.env.PUSHER_SECRET || '',
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
        useTLS: true,
    });
}

/**
 * Publish event to Pusher channel
 */
export async function publishEvent(
    channel: string,
    event: string,
    data: object
): Promise<void> {
    try {
        const pusher = await getPusherServer();
        await pusher.trigger(channel, event, data);
    } catch (error) {
        console.error('Pusher publish error:', error);
    }
}

/**
 * Publish location update
 */
export async function publishLocationUpdate(
    inspectorId: string,
    location: { lat: number; lng: number; h3Index?: string }
): Promise<void> {
    await publishEvent(CHANNELS.LOCATIONS, EVENTS.LOCATION_UPDATE, {
        inspectorId,
        ...location,
        timestamp: Date.now(),
    });
}

/**
 * Send notification to specific user
 */
export async function sendNotification(
    userId: string,
    notification: {
        title: string;
        message: string;
        type: 'info' | 'success' | 'warning' | 'error';
        data?: object;
    }
): Promise<void> {
    await publishEvent(CHANNELS.NOTIFICATIONS(userId), EVENTS.NOTIFICATION, {
        ...notification,
        timestamp: Date.now(),
    });
}
