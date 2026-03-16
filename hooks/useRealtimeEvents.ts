'use client';

/**
 * React Hook for Real-Time Events
 * Uses Pusher for job and inspection updates
 */

import { useEffect, useState, useCallback } from 'react';
import { getPusherClient, CHANNELS, EVENTS } from '@/lib/vercel/pusher-client';

interface RealtimeEvent {
    type: string;
    data: any;
    timestamp: number;
}

interface UseRealtimeEventsOptions {
    channels?: string[];
    events?: string[];
    onEvent?: (event: RealtimeEvent) => void;
}

export function useRealtimeEvents(options: UseRealtimeEventsOptions = {}) {
    const [events, setEvents] = useState<RealtimeEvent[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        channels = [CHANNELS.JOBS, CHANNELS.INSPECTIONS],
        events: eventTypes = Object.values(EVENTS),
        onEvent,
    } = options;

    useEffect(() => {
        let pusher: ReturnType<typeof getPusherClient>;

        try {
            pusher = getPusherClient();
            const subscribedChannels: ReturnType<typeof pusher.subscribe>[] = [];

            channels.forEach((channelName) => {
                const channel = pusher.subscribe(channelName);
                subscribedChannels.push(channel);

                channel.bind('pusher:subscription_succeeded', () => {
                    setIsConnected(true);
                    setError(null);
                });

                eventTypes.forEach((eventType) => {
                    channel.bind(eventType, (data: any) => {
                        const event: RealtimeEvent = {
                            type: eventType,
                            data,
                            timestamp: data.timestamp || Date.now(),
                        };

                        setEvents((prev) => [event, ...prev].slice(0, 100)); // Keep last 100
                        onEvent?.(event);
                    });
                });
            });

            return () => {
                subscribedChannels.forEach((channel) => {
                    channel.unbind_all();
                });
                channels.forEach((channelName) => {
                    pusher.unsubscribe(channelName);
                });
            };
        } catch (err: any) {
            setError('Pusher not configured');
            return;
        }
    }, [channels.join(','), eventTypes.join(','), onEvent]);

    const publishEvent = useCallback(
        async (channel: string, event: string, data: object) => {
            try {
                const response = await fetch('/api/realtime/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ channel, event, data }),
                });
                return response.ok;
            } catch (err: any) {
                console.error('Failed to publish event:', err);
                return false;
            }
        },
        []
    );

    const clearEvents = useCallback(() => {
        setEvents([]);
    }, []);

    return {
        events,
        isConnected,
        error,
        publishEvent,
        clearEvents,
    };
}
