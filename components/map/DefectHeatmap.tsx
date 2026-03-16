'use client';

/**
 * Defect Density Heatmap Component
 * Visualizes corrosion/defect clusters using H3 hexagonal grid
 */

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { calculateHexagonDensity, getHexagonBoundary, H3_RESOLUTION, GeoLocation } from '@/lib/geo/h3-service';

interface DefectPoint extends GeoLocation {
    id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    defectType: string;
}

interface DefectHeatmapProps {
    mapboxToken: string;
    defects: DefectPoint[];
    center?: [number, number];
    zoom?: number;
    className?: string;
}

const SEVERITY_COLORS = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#f97316',
    critical: '#ef4444',
};

export function DefectHeatmap({
    mapboxToken,
    defects,
    center = [0, 0],
    zoom = 10,
    className = '',
}: DefectHeatmapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        mapboxgl.accessToken = mapboxToken;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: center,
            zoom: zoom,
        });

        map.current.on('load', () => {
            if (!map.current) return;

            // Calculate hexagon density
            const density = calculateHexagonDensity(defects, H3_RESOLUTION.DISTRICT);

            // Create GeoJSON features for hexagons
            const features = Array.from(density.entries()).map(([h3Index, data]) => {
                const boundary = getHexagonBoundary(h3Index);
                return {
                    type: 'Feature' as const,
                    properties: {
                        count: data.count,
                        intensity: Math.min(data.count / 10, 1), // Normalize
                    },
                    geometry: {
                        type: 'Polygon' as const,
                        coordinates: [boundary.map((p) => [p.lng, p.lat])],
                    },
                };
            });

            // Add hexagon layer
            map.current.addSource('defect-hexagons', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features,
                },
            });

            map.current.addLayer({
                id: 'hexagon-fill',
                type: 'fill',
                source: 'defect-hexagons',
                paint: {
                    'fill-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'intensity'],
                        0, 'rgba(34, 197, 94, 0.3)',
                        0.3, 'rgba(249, 115, 22, 0.5)',
                        0.7, 'rgba(239, 68, 68, 0.7)',
                        1, 'rgba(185, 28, 28, 0.9)',
                    ],
                    'fill-opacity': 0.7,
                },
            });

            map.current.addLayer({
                id: 'hexagon-outline',
                type: 'line',
                source: 'defect-hexagons',
                paint: {
                    'line-color': '#fff',
                    'line-width': 1,
                    'line-opacity': 0.3,
                },
            });

            // Add individual defect markers
            defects.forEach((defect) => {
                new mapboxgl.Marker({
                    color: SEVERITY_COLORS[defect.severity],
                    scale: 0.5,
                })
                    .setLngLat([defect.lng, defect.lat])
                    .setPopup(
                        new mapboxgl.Popup().setHTML(`
              <strong>${defect.defectType}</strong><br/>
              Severity: ${defect.severity}
            `)
                    )
                    .addTo(map.current!);
            });
        });

        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, [mapboxToken, defects, center, zoom]);

    return (
        <div className={`relative ${className}`}>
            <div ref={mapContainer} className="w-full h-full min-h-[400px] rounded-lg" />

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-xs font-medium mb-2">Defect Density</div>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(34, 197, 94, 0.5)' }} />
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(249, 115, 22, 0.6)' }} />
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(239, 68, 68, 0.8)' }} />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low</span>
                    <span>High</span>
                </div>
            </div>
        </div>
    );
}

export default DefectHeatmap;
