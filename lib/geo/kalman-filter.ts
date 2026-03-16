/**
 * Kalman Filter for GPS Smoothing
 * Smooths GPS jitter and provides dead reckoning for inspector movement prediction
 */

export interface Position {
    lat: number;
    lng: number;
    timestamp: number;
    accuracy?: number; // GPS accuracy in meters
    speed?: number;    // m/s
    heading?: number;  // degrees from north
}

export interface KalmanState {
    lat: number;
    lng: number;
    velocityLat: number;
    velocityLng: number;
    accuracy: number;
}

/**
 * 1D Kalman Filter implementation
 */
class KalmanFilter1D {
    private q: number; // Process noise
    private r: number; // Measurement noise
    private x: number; // Estimated value
    private p: number; // Estimation error
    private k: number; // Kalman gain

    constructor(processNoise: number = 0.1, measurementNoise: number = 1, initialValue: number = 0) {
        this.q = processNoise;
        this.r = measurementNoise;
        this.x = initialValue;
        this.p = 1;
        this.k = 0;
    }

    update(measurement: number): number {
        // Prediction
        this.p = this.p + this.q;

        // Update
        this.k = this.p / (this.p + this.r);
        this.x = this.x + this.k * (measurement - this.x);
        this.p = (1 - this.k) * this.p;

        return this.x;
    }

    getValue(): number {
        return this.x;
    }
}

/**
 * GPS Kalman Filter for smooth location tracking
 * Eliminates GPS jitter and provides smooth marker movement
 */
export class GPSKalmanFilter {
    private latFilter: KalmanFilter1D;
    private lngFilter: KalmanFilter1D;
    private lastPosition: Position | null = null;
    private estimatedVelocity = { lat: 0, lng: 0 };
    private readonly minAccuracy = 10; // meters

    constructor(
        processNoise: number = 0.00001,
        measurementNoise: number = 0.00005
    ) {
        this.latFilter = new KalmanFilter1D(processNoise, measurementNoise);
        this.lngFilter = new KalmanFilter1D(processNoise, measurementNoise);
    }

    /**
     * Process a new GPS position and return smoothed coordinates
     */
    process(position: Position): Position {
        // Adjust measurement noise based on GPS accuracy
        const accuracy = position.accuracy || 50;
        const accuracyFactor = Math.max(accuracy / this.minAccuracy, 1);

        // Update velocity estimate
        if (this.lastPosition) {
            const dt = (position.timestamp - this.lastPosition.timestamp) / 1000;
            if (dt > 0 && dt < 30) { // Ignore stale readings
                this.estimatedVelocity = {
                    lat: (position.lat - this.lastPosition.lat) / dt,
                    lng: (position.lng - this.lastPosition.lng) / dt,
                };
            }
        }

        // Apply Kalman filter
        const smoothedLat = this.latFilter.update(position.lat);
        const smoothedLng = this.lngFilter.update(position.lng);

        this.lastPosition = position;

        return {
            lat: smoothedLat,
            lng: smoothedLng,
            timestamp: position.timestamp,
            accuracy: accuracy / accuracyFactor,
            speed: position.speed,
            heading: position.heading,
        };
    }

    /**
     * Predict position for dead reckoning during signal loss
     */
    predict(futureTimestamp: number): Position | null {
        if (!this.lastPosition) return null;

        const dt = (futureTimestamp - this.lastPosition.timestamp) / 1000;

        // Don't predict too far ahead (max 30 seconds)
        if (dt > 30) return null;

        // Use velocity-based extrapolation
        const predictedLat = this.latFilter.getValue() + this.estimatedVelocity.lat * dt;
        const predictedLng = this.lngFilter.getValue() + this.estimatedVelocity.lng * dt;

        // Increase uncertainty over time
        const uncertaintyGrowth = 1 + dt * 0.1;

        return {
            lat: predictedLat,
            lng: predictedLng,
            timestamp: futureTimestamp,
            accuracy: (this.lastPosition.accuracy || 50) * uncertaintyGrowth,
            speed: this.lastPosition.speed,
            heading: this.lastPosition.heading,
        };
    }

    /**
     * Get current smoothed position without new input
     */
    getCurrentPosition(): Position | null {
        if (!this.lastPosition) return null;

        return {
            lat: this.latFilter.getValue(),
            lng: this.lngFilter.getValue(),
            timestamp: this.lastPosition.timestamp,
            accuracy: this.lastPosition.accuracy,
            speed: this.lastPosition.speed,
            heading: this.lastPosition.heading,
        };
    }

    /**
     * Reset filter state (e.g., when inspector goes offline)
     */
    reset(): void {
        this.lastPosition = null;
        this.estimatedVelocity = { lat: 0, lng: 0 };
    }
}

/**
 * Inspector Position Tracker
 * Manages multiple inspector positions with smoothing and prediction
 */
export class InspectorPositionTracker {
    private filters = new Map<string, GPSKalmanFilter>();
    private readonly maxInactivityMs = 60000; // 1 minute

    /**
     * Update inspector position
     */
    updatePosition(inspectorId: string, position: Position): Position {
        if (!this.filters.has(inspectorId)) {
            this.filters.set(inspectorId, new GPSKalmanFilter());
        }

        return this.filters.get(inspectorId)!.process(position);
    }

    /**
     * Get predicted position for an inspector
     */
    getPredictedPosition(inspectorId: string, timestamp: number = Date.now()): Position | null {
        const filter = this.filters.get(inspectorId);
        if (!filter) return null;

        return filter.predict(timestamp);
    }

    /**
     * Get all active inspector positions
     */
    getAllPositions(currentTimestamp: number = Date.now()): Map<string, Position> {
        const positions = new Map<string, Position>();

        for (const [id, filter] of this.filters) {
            const pos = filter.getCurrentPosition();
            if (pos && currentTimestamp - pos.timestamp < this.maxInactivityMs) {
                positions.set(id, pos);
            }
        }

        return positions;
    }

    /**
     * Remove inactive inspector
     */
    removeInspector(inspectorId: string): void {
        this.filters.delete(inspectorId);
    }

    /**
     * Clean up stale inspectors
     */
    pruneInactive(currentTimestamp: number = Date.now()): string[] {
        const removed: string[] = [];

        for (const [id, filter] of this.filters) {
            const pos = filter.getCurrentPosition();
            if (!pos || currentTimestamp - pos.timestamp > this.maxInactivityMs) {
                this.filters.delete(id);
                removed.push(id);
            }
        }

        return removed;
    }
}

/**
 * Detect if position changed significantly (to trigger UI updates)
 */
export function hasPositionChangedSignificantly(
    oldPos: Position,
    newPos: Position,
    thresholdMeters: number = 5
): boolean {
    const R = 6371000; // Earth's radius in meters
    const dLat = (newPos.lat - oldPos.lat) * Math.PI / 180;
    const dLng = (newPos.lng - oldPos.lng) * Math.PI / 180;

    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(oldPos.lat * Math.PI / 180) *
        Math.cos(newPos.lat * Math.PI / 180) *
        Math.sin(dLng / 2) ** 2;

    const distance = 2 * R * Math.asin(Math.sqrt(a));

    return distance > thresholdMeters;
}
