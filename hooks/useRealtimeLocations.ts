'use client';

/**
 * React Hook for Real-Time Location Updates
 * Uses Pusher for Vercel-compatible real-time
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { getPusherClient, CHANNELS, EVENTS } from '@/lib/vercel/pusher-client';
import { GPSKalmanFilter } from '@/lib/geo/kalman-filter';

interface InspectorLocation {
    inspectorId: string;
    lat: number;
    lng: number;
    h3Index?: string;
    timestamp: number;
}

interface UseRealtimeLocationsOptions {
    onLocationUpdate?: (location: InspectorLocation) => void;
    smoothing?: boolean;
}

export function useRealtimeLocations(options: UseRealtimeLocationsOptions = {}) {
    const [locations, setLocations] = useState<Map<string, InspectorLocation>>(new Map());
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const filtersRef = useRef<Map<string, GPSKalmanFilter>>(new Map());

    const { onLocationUpdate, smoothing = true } = options;

    useEffect(() => {
        let pusher: ReturnType<typeof getPusherClient>;

        try {
            pusher = getPusherClient();
            const channel = pusher.subscribe(CHANNELS.LOCATIONS);

            channel.bind('pusher:subscription_succeeded', () => {
                setIsConnected(true);
                setError(null);
            });

            channel.bind('pusher:subscription_error', (err: any) => {
                setError('Failed to connect to real-time updates');
                setIsConnected(false);
            });

            channel.bind(EVENTS.LOCATION_UPDATE, (data: InspectorLocation) => {
                let processedLocation = data;

                // Apply Kalman filter for smooth tracking
                if (smoothing) {
                    if (!filtersRef.current.has(data.inspectorId)) {
                        filtersRef.current.set(data.inspectorId, new GPSKalmanFilter());
                    }
                    const filter = filtersRef.current.get(data.inspectorId)!;
                    const smoothed = filter.process({
                        lat: data.lat,
                        lng: data.lng,
                        timestamp: data.timestamp,
                    });
                    processedLocation = {
                        ...data,
                        lat: smoothed.lat,
                        lng: smoothed.lng,
                    };
                }

                setLocations((prev) => {
                    const next = new Map(prev);
                    next.set(data.inspectorId, processedLocation);
                    return next;
                });

                onLocationUpdate?.(processedLocation);
            });

            return () => {
                channel.unbind_all();
                pusher.unsubscribe(CHANNELS.LOCATIONS);
            };
        } catch (err) {
            setError('Pusher not configured');
            return;
        }
    }, [onLocationUpdate, smoothing]);

    // Fetch initial locations
    useEffect(() => {
        async function fetchLocations() {
            try {
                const response = await fetch('/api/realtime/location');
                if (response.ok) {
                    const data = await response.json();
                    const locationMap = new Map<string, InspectorLocation>();
                    data.inspectors?.forEach((loc: InspectorLocation) => {
                        locationMap.set(loc.inspectorId, loc);
                    });
                    setLocations(locationMap);
                }
            } catch (err) {
                console.error('Failed to fetch initial locations:', err);
            }
        }

        fetchLocations();
    }, []);

    const updateMyLocation = useCallback(
        async (lat: number, lng: number, inspectorId: string) => {
            try {
                const response = await fetch('/api/realtime/location', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ inspectorId, lat, lng }),
                });
                return response.ok;
            } catch (err) {
                console.error('Failed to update location:', err);
                return false;
            }
        },
        []
    );

    return {
        locations: Array.from(locations.values()),
        locationsMap: locations,
        isConnected,
        error,
        updateMyLocation,
    };
}
