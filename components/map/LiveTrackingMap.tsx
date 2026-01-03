'use client';

/**
 * Live Inspector Tracking Map Component
 * Mapbox GL JS with smooth marker animations and ETA display
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GPSKalmanFilter, Position, hasPositionChangedSignificantly } from '@/lib/geo/kalman-filter';
import { estimateETA } from '@/lib/geo/h3-service';

interface InspectorMarker {
    id: string;
    name: string;
    position: Position;
    status: 'available' | 'en_route' | 'on_site' | 'offline';
    imageUrl?: string;
}

interface LiveTrackingMapProps {
    mapboxToken: string;
    center?: [number, number];
    zoom?: number;
    inspectors?: InspectorMarker[];
    destination?: { lat: number; lng: number; name: string };
    onInspectorClick?: (inspectorId: string) => void;
    showETA?: boolean;
    className?: string;
}

const STATUS_COLORS = {
    available: '#22c55e',
    en_route: '#3b82f6',
    on_site: '#f59e0b',
    offline: '#6b7280',
};

export function LiveTrackingMap({
    mapboxToken,
    center = [0, 0],
    zoom = 12,
    inspectors = [],
    destination,
    onInspectorClick,
    showETA = true,
    className = '',
}: LiveTrackingMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markers = useRef<Map<string, mapboxgl.Marker>>(new Map());
    const filters = useRef<Map<string, GPSKalmanFilter>>(new Map());
    const [etaInfo, setEtaInfo] = useState<{ minutes: number; confidence: number } | null>(null);

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        mapboxgl.accessToken = mapboxToken;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: center,
            zoom: zoom,
            attributionControl: false,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, [mapboxToken, center, zoom]);

    // Create marker element
    const createMarkerElement = useCallback((inspector: InspectorMarker) => {
        const el = document.createElement('div');
        el.className = 'inspector-marker';
        el.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: ${STATUS_COLORS[inspector.status]};
      border: 3px solid white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: white;
      font-size: 14px;
      transition: transform 0.2s ease;
    `;
        el.innerHTML = inspector.name.charAt(0).toUpperCase();
        el.title = inspector.name;

        el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.2)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)';
        });

        if (onInspectorClick) {
            el.addEventListener('click', () => onInspectorClick(inspector.id));
        }

        return el;
    }, [onInspectorClick]);

    // Update inspector markers with smooth animation
    useEffect(() => {
        if (!map.current) return;

        inspectors.forEach((inspector) => {
            // Get or create Kalman filter for smooth tracking
            if (!filters.current.has(inspector.id)) {
                filters.current.set(inspector.id, new GPSKalmanFilter());
            }

            const filter = filters.current.get(inspector.id)!;
            const smoothedPosition = filter.process(inspector.position);

            const existingMarker = markers.current.get(inspector.id);

            if (existingMarker) {
                // Animate to new position (smooth movement)
                const currentPos = existingMarker.getLngLat();
                const shouldUpdate = hasPositionChangedSignificantly(
                    { lat: currentPos.lat, lng: currentPos.lng, timestamp: Date.now() },
                    smoothedPosition,
                    2 // 2 meter threshold
                );

                if (shouldUpdate) {
                    existingMarker.setLngLat([smoothedPosition.lng, smoothedPosition.lat]);
                }
            } else {
                // Create new marker
                const el = createMarkerElement(inspector);
                const marker = new mapboxgl.Marker({ element: el })
                    .setLngLat([smoothedPosition.lng, smoothedPosition.lat])
                    .addTo(map.current!);

                markers.current.set(inspector.id, marker);
            }

            // Calculate ETA if destination exists and inspector is en_route
            if (destination && inspector.status === 'en_route' && showETA) {
                const eta = estimateETA(
                    { lat: smoothedPosition.lat, lng: smoothedPosition.lng },
                    destination
                );
                setEtaInfo({ minutes: eta.etaMinutes, confidence: eta.confidence });
            }
        });

        // Remove markers for inspectors no longer in list
        const currentIds = new Set(inspectors.map((i) => i.id));
        for (const [id, marker] of markers.current) {
            if (!currentIds.has(id)) {
                marker.remove();
                markers.current.delete(id);
                filters.current.delete(id);
            }
        }
    }, [inspectors, destination, showETA, createMarkerElement]);

    // Add destination marker
    useEffect(() => {
        if (!map.current || !destination) return;

        const destMarker = new mapboxgl.Marker({ color: '#ef4444' })
            .setLngLat([destination.lng, destination.lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<strong>${destination.name}</strong>`))
            .addTo(map.current);

        return () => {
            destMarker.remove();
        };
    }, [destination]);

    return (
        <div className={`relative ${className}`}>
            <div ref={mapContainer} className="w-full h-full min-h-[400px] rounded-lg" />

            {/* ETA Overlay */}
            {showETA && etaInfo && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="text-sm text-gray-600">Estimated Arrival</div>
                    <div className="text-2xl font-bold text-blue-600">{etaInfo.minutes} min</div>
                    <div className="text-xs text-gray-500">
                        {Math.round(etaInfo.confidence * 100)}% confidence
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-xs font-medium mb-2">Inspector Status</div>
                <div className="space-y-1">
                    {Object.entries(STATUS_COLORS).map(([status, color]) => (
                        <div key={status} className="flex items-center gap-2 text-xs">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                            <span className="capitalize">{status.replace('_', ' ')}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LiveTrackingMap;
