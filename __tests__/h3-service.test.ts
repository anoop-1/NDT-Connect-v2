/**
 * H3 Geo-Spatial Service Tests
 */

// Mock h3-js for testing
jest.mock('h3-js', () => ({
    latLngToCell: jest.fn((lat: number, lng: number, res: number) => `h3_${lat}_${lng}_${res}`),
    cellToLatLng: jest.fn((h3Index: string) => [0, 0]),
    gridDisk: jest.fn((h3Index: string, k: number) => [h3Index, 'neighbor1', 'neighbor2']),
    gridDistance: jest.fn(() => 1),
    cellToBoundary: jest.fn(() => [[0, 0], [0.1, 0], [0.1, 0.1], [0, 0.1]]),
    polygonToCells: jest.fn(() => ['cell1', 'cell2']),
}));

import {
    geoToH3,
    h3ToGeo,
    getKRingIndexes,
    findNearbyEntities,
    matchInspectorsToJob,
    estimateETA,
    calculateHexagonDensity,
    prioritizeInspections,
    H3_RESOLUTION,
    IndexedEntity,
} from '../lib/geo/h3-service';

describe('H3 Geo-Spatial Service', () => {
    describe('geoToH3', () => {
        it('should convert lat/lng to H3 index', () => {
            const result = geoToH3({ lat: 28.6139, lng: 77.209 }, H3_RESOLUTION.NEIGHBORHOOD);
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
        });
    });

    describe('getKRingIndexes', () => {
        it('should return array of H3 indexes', () => {
            const indexes = getKRingIndexes('center_h3', 2);
            expect(Array.isArray(indexes)).toBe(true);
            expect(indexes.length).toBeGreaterThan(0);
        });
    });

    describe('findNearbyEntities', () => {
        it('should find entities within K-ring', () => {
            const entities: IndexedEntity[] = [
                { id: '1', lat: 28.6140, lng: 77.2091, h3Index: 'h3_1' },
                { id: '2', lat: 28.6150, lng: 77.2100, h3Index: 'h3_2' },
            ];

            const results = findNearbyEntities(
                { lat: 28.6139, lng: 77.209 },
                entities,
                3
            );

            expect(Array.isArray(results)).toBe(true);
        });
    });

    describe('matchInspectorsToJob', () => {
        it('should match inspectors to job location', () => {
            const inspectors: IndexedEntity[] = [
                { id: 'insp1', lat: 28.63, lng: 77.22, h3Index: 'h3_1' },
                { id: 'insp2', lat: 28.65, lng: 77.25, h3Index: 'h3_2' },
            ];

            const matches = matchInspectorsToJob(
                { lat: 28.6139, lng: 77.209 },
                inspectors,
                { maxDistanceKm: 50, maxResults: 5 }
            );

            expect(Array.isArray(matches)).toBe(true);
        });
    });

    describe('estimateETA', () => {
        it('should calculate ETA between two points', () => {
            const eta = estimateETA(
                { lat: 28.6139, lng: 77.209 },
                { lat: 28.65, lng: 77.25 },
                40
            );

            expect(eta).toHaveProperty('distanceKm');
            expect(eta).toHaveProperty('etaMinutes');
            expect(eta).toHaveProperty('confidence');
            expect(eta.etaMinutes).toBeGreaterThanOrEqual(0);
            expect(eta.confidence).toBeGreaterThan(0);
            expect(eta.confidence).toBeLessThanOrEqual(1);
        });
    });

    describe('calculateHexagonDensity', () => {
        it('should calculate density per hexagon', () => {
            const points = [
                { lat: 28.6139, lng: 77.209 },
                { lat: 28.6140, lng: 77.210 },
                { lat: 28.65, lng: 77.25 },
            ];

            const density = calculateHexagonDensity(points);
            expect(density instanceof Map).toBe(true);
        });
    });

    describe('prioritizeInspections', () => {
        it('should prioritize inspections by risk score', () => {
            const assets = [
                {
                    assetId: 'asset1',
                    location: { lat: 28.6, lng: 77.2 },
                    riskScore: 80,
                    lastInspectionDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                    defectDensity: 0.5,
                },
                {
                    assetId: 'asset2',
                    location: { lat: 28.7, lng: 77.3 },
                    riskScore: 40,
                    lastInspectionDate: new Date(),
                    defectDensity: 0.1,
                },
            ];

            const prioritized = prioritizeInspections(assets, 10);
            expect(prioritized.length).toBeLessThanOrEqual(10);
            expect(prioritized[0].assetId).toBe('asset1'); // Higher risk first
        });
    });
});
