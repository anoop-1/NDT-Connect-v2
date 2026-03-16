/**
 * Redis Caching Service
 * Real-time state management for inspector locations and session data
 */

import Redis from 'ioredis';

interface InspectorLocation {
    lat: number;
    lng: number;
    h3Index: string;
    status: string;
    timestamp: number;
}

interface SessionData {
    userId: string;
    role: string;
    subscriptions: string[];
    connectedAt: number;
}

/**
 * Redis Client Wrapper
 */
export class RedisService {
    private client: Redis;
    private subscriber: Redis;
    private readonly prefix = 'ndtconnect:';

    constructor(url?: string) {
        const redisUrl = url || process.env.REDIS_URL || 'redis://localhost:6379';

        this.client = new Redis(redisUrl, {
            maxRetriesPerRequest: 3,
        } as any);

        this.subscriber = new Redis(redisUrl);

        this.client.on('error', (err) => console.error('Redis client error:', err));
        this.subscriber.on('error', (err) => console.error('Redis subscriber error:', err));
    }

    // Inspector Location Methods

    /**
     * Set inspector location with TTL
     */
    async setInspectorLocation(inspectorId: string, location: InspectorLocation): Promise<void> {
        const key = `${this.prefix}location:${inspectorId}`;
        await this.client.setex(key, 300, JSON.stringify(location)); // 5 min TTL

        // Publish location update for subscribers
        await this.client.publish(
            `${this.prefix}location_updates`,
            JSON.stringify({ inspectorId, ...location })
        );
    }

    /**
     * Get inspector location
     */
    async getInspectorLocation(inspectorId: string): Promise<InspectorLocation | null> {
        const key = `${this.prefix}location:${inspectorId}`;
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Get all active inspector locations
     */
    async getAllInspectorLocations(): Promise<Map<string, InspectorLocation>> {
        const pattern = `${this.prefix}location:*`;
        const keys = await this.client.keys(pattern);
        const locations = new Map<string, InspectorLocation>();

        if (keys.length === 0) return locations;

        const values = await this.client.mget(keys);
        keys.forEach((key, index) => {
            const inspectorId = key.replace(`${this.prefix}location:`, '');
            const value = values[index];
            if (value) {
                locations.set(inspectorId, JSON.parse(value));
            }
        });

        return locations;
    }

    /**
     * Remove inspector location (offline)
     */
    async removeInspectorLocation(inspectorId: string): Promise<void> {
        const key = `${this.prefix}location:${inspectorId}`;
        await this.client.del(key);
    }

    // Session Methods

    /**
     * Create user session
     */
    async createSession(sessionId: string, data: SessionData): Promise<void> {
        const key = `${this.prefix}session:${sessionId}`;
        await this.client.setex(key, 86400, JSON.stringify(data)); // 24 hour TTL
    }

    /**
     * Get session
     */
    async getSession(sessionId: string): Promise<SessionData | null> {
        const key = `${this.prefix}session:${sessionId}`;
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Update session subscriptions
     */
    async updateSessionSubscriptions(sessionId: string, subscriptions: string[]): Promise<void> {
        const session = await this.getSession(sessionId);
        if (session) {
            session.subscriptions = subscriptions;
            await this.createSession(sessionId, session);
        }
    }

    /**
     * Delete session
     */
    async deleteSession(sessionId: string): Promise<void> {
        const key = `${this.prefix}session:${sessionId}`;
        await this.client.del(key);
    }

    // Cache Methods

    /**
     * Set cached value with TTL
     */
    async setCache<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
        await this.client.setex(`${this.prefix}cache:${key}`, ttlSeconds, JSON.stringify(value));
    }

    /**
     * Get cached value
     */
    async getCache<T>(key: string): Promise<T | null> {
        const data = await this.client.get(`${this.prefix}cache:${key}`);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Delete cached value
     */
    async deleteCache(key: string): Promise<void> {
        await this.client.del(`${this.prefix}cache:${key}`);
    }

    // Rate Limiting

    /**
     * Check rate limit
     */
    async checkRateLimit(key: string, maxRequests: number, windowSeconds: number): Promise<boolean> {
        const redisKey = `${this.prefix}ratelimit:${key}`;
        const current = await this.client.incr(redisKey);

        if (current === 1) {
            await this.client.expire(redisKey, windowSeconds);
        }

        return current <= maxRequests;
    }

    // Pub/Sub

    /**
     * Subscribe to channel
     */
    async subscribeToChannel(channel: string, handler: (message: string) => void): Promise<void> {
        await this.subscriber.subscribe(`${this.prefix}${channel}`);
        this.subscriber.on('message', (ch, message) => {
            if (ch === `${this.prefix}${channel}`) {
                handler(message);
            }
        });
    }

    /**
     * Publish to channel
     */
    async publishToChannel(channel: string, message: string): Promise<void> {
        await this.client.publish(`${this.prefix}${channel}`, message);
    }

    // Cleanup

    /**
     * Close connections
     */
    async disconnect(): Promise<void> {
        await this.client.quit();
        await this.subscriber.quit();
    }
}

// Singleton instance
let redisService: RedisService | null = null;

export function getRedisClient(): RedisService {
    if (!redisService) {
        redisService = new RedisService();
    }
    return redisService;
}
