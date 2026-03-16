/**
 * Kalman Filter Tests
 */

import {
    GPSKalmanFilter,
    InspectorPositionTracker,
    hasPositionChangedSignificantly,
    Position,
} from '../lib/geo/kalman-filter';

describe('GPS Kalman Filter', () => {
    let filter: GPSKalmanFilter;

    beforeEach(() => {
        filter = new GPSKalmanFilter();
    });

    describe('process', () => {
        it('should return smoothed position', () => {
            const input: Position = {
                lat: 28.6139,
                lng: 77.209,
                timestamp: Date.now(),
                accuracy: 10,
            };

            const result = filter.process(input);

            expect(result.lat).toBeDefined();
            expect(result.lng).toBeDefined();
            expect(result.timestamp).toBe(input.timestamp);
        });

        it('should smooth noisy GPS readings', () => {
            // Simulate GPS jitter
            const basePosition = { lat: 28.6139, lng: 77.209 };
            const readings = [
                { ...basePosition, lat: basePosition.lat + 0.0001 },
                { ...basePosition, lat: basePosition.lat - 0.0002 },
                { ...basePosition, lat: basePosition.lat + 0.00015 },
                { ...basePosition, lat: basePosition.lat - 0.00005 },
                basePosition,
            ];

            const results: Position[] = [];
            readings.forEach((r, i) => {
                results.push(filter.process({
                    lat: r.lat,
                    lng: r.lng,
                    timestamp: Date.now() + i * 1000,
                }));
            });

            // Smoothed values should have less variance
            const latVariance = results.reduce((sum, p) =>
                sum + Math.pow(p.lat - basePosition.lat, 2), 0) / results.length;

            const inputVariance = readings.reduce((sum, p) =>
                sum + Math.pow(p.lat - basePosition.lat, 2), 0) / readings.length;

            expect(latVariance).toBeLessThan(inputVariance);
        });
    });

    describe('predict', () => {
        it('should predict future position based on velocity', () => {
            // Process a moving inspector
            filter.process({ lat: 28.6139, lng: 77.209, timestamp: Date.now() });
            filter.process({ lat: 28.6140, lng: 77.210, timestamp: Date.now() + 1000 });

            const futureTime = Date.now() + 5000;
            const prediction = filter.predict(futureTime);

            expect(prediction).not.toBeNull();
            if (prediction) {
                expect(prediction.lat).toBeGreaterThan(28.6139);
                expect(prediction.accuracy).toBeGreaterThan(0);
            }
        });

        it('should return null if no previous position', () => {
            const prediction = filter.predict(Date.now() + 5000);
            expect(prediction).toBeNull();
        });

        it('should not predict too far ahead', () => {
            filter.process({ lat: 28.6139, lng: 77.209, timestamp: Date.now() });

            const wayFuture = Date.now() + 60000; // 60 seconds
            const prediction = filter.predict(wayFuture);

            expect(prediction).toBeNull();
        });
    });

    describe('getCurrentPosition', () => {
        it('should return current smoothed position', () => {
            filter.process({ lat: 28.6139, lng: 77.209, timestamp: Date.now() });

            const current = filter.getCurrentPosition();

            expect(current).not.toBeNull();
            expect(current?.lat).toBeCloseTo(28.6139, 3);
        });
    });

    describe('reset', () => {
        it('should clear filter state', () => {
            filter.process({ lat: 28.6139, lng: 77.209, timestamp: Date.now() });
            filter.reset();

            expect(filter.getCurrentPosition()).toBeNull();
        });
    });
});

describe('Inspector Position Tracker', () => {
    let tracker: InspectorPositionTracker;

    beforeEach(() => {
        tracker = new InspectorPositionTracker();
    });

    describe('updatePosition', () => {
        it('should track multiple inspectors', () => {
            tracker.updatePosition('insp1', { lat: 28.61, lng: 77.21, timestamp: Date.now() });
            tracker.updatePosition('insp2', { lat: 28.62, lng: 77.22, timestamp: Date.now() });

            const positions = tracker.getAllPositions();

            expect(positions.size).toBe(2);
            expect(positions.has('insp1')).toBe(true);
            expect(positions.has('insp2')).toBe(true);
        });
    });

    describe('removeInspector', () => {
        it('should remove inspector from tracking', () => {
            tracker.updatePosition('insp1', { lat: 28.61, lng: 77.21, timestamp: Date.now() });
            tracker.removeInspector('insp1');

            const positions = tracker.getAllPositions();
            expect(positions.has('insp1')).toBe(false);
        });
    });
});

describe('hasPositionChangedSignificantly', () => {
    it('should return true for significant movement', () => {
        const oldPos: Position = { lat: 28.6139, lng: 77.209, timestamp: Date.now() };
        const newPos: Position = { lat: 28.6149, lng: 77.210, timestamp: Date.now() }; // ~100m

        const result = hasPositionChangedSignificantly(oldPos, newPos, 5);
        expect(result).toBe(true);
    });

    it('should return false for minor GPS jitter', () => {
        const oldPos: Position = { lat: 28.6139, lng: 77.209, timestamp: Date.now() };
        const newPos: Position = { lat: 28.61391, lng: 77.20901, timestamp: Date.now() }; // ~1m

        const result = hasPositionChangedSignificantly(oldPos, newPos, 5);
        expect(result).toBe(false);
    });
});
