/**
 * Upstash Redis for Vercel Serverless
 * Replaces ioredis with REST-based Upstash client
 */

import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Initialize Upstash Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Rate limiter for API protection
const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
    analytics: true,
});

interface InspectorLocation {
    lat: number;
    lng: number;
    h3Index: string;
    status: string;
    timestamp: number;
}

const PREFIX = 'ndtconnect:';

/**
 * Upstash Redis Service for Vercel
 */
export const upstashRedis = {
    // Inspector Location Methods
    async setInspectorLocation(inspectorId: string, location: InspectorLocation): Promise<void> {
        const key = `${PREFIX}location:${inspectorId}`;
        await redis.setex(key, 300, JSON.stringify(location)); // 5 min TTL
    },

    async getInspectorLocation(inspectorId: string): Promise<InspectorLocation | null> {
        const key = `${PREFIX}location:${inspectorId}`;
        const data = await redis.get<string>(key);
        return data ? JSON.parse(data) : null;
    },

    async getAllInspectorLocations(): Promise<Map<string, InspectorLocation>> {
        const pattern = `${PREFIX}location:*`;
        const keys = await redis.keys(pattern);
        const locations = new Map<string, InspectorLocation>();

        for (const key of keys) {
            const inspectorId = key.replace(`${PREFIX}location:`, '');
            const data = await redis.get<string>(key);
            if (data) {
                locations.set(inspectorId, JSON.parse(data));
            }
        }

        return locations;
    },

    async removeInspectorLocation(inspectorId: string): Promise<void> {
        const key = `${PREFIX}location:${inspectorId}`;
        await redis.del(key);
    },

    // Session Methods
    async createSession(sessionId: string, data: object): Promise<void> {
        const key = `${PREFIX}session:${sessionId}`;
        await redis.setex(key, 86400, JSON.stringify(data)); // 24 hour TTL
    },

    async getSession<T>(sessionId: string): Promise<T | null> {
        const key = `${PREFIX}session:${sessionId}`;
        const data = await redis.get<string>(key);
        return data ? JSON.parse(data) : null;
    },

    async deleteSession(sessionId: string): Promise<void> {
        const key = `${PREFIX}session:${sessionId}`;
        await redis.del(key);
    },

    // Cache Methods
    async setCache<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
        await redis.setex(`${PREFIX}cache:${key}`, ttlSeconds, JSON.stringify(value));
    },

    async getCache<T>(key: string): Promise<T | null> {
        const data = await redis.get<string>(`${PREFIX}cache:${key}`);
        return data ? JSON.parse(data) : null;
    },

    async deleteCache(key: string): Promise<void> {
        await redis.del(`${PREFIX}cache:${key}`);
    },

    // Rate Limiting
    async checkRateLimit(identifier: string): Promise<{ success: boolean; limit: number; remaining: number }> {
        const result = await ratelimit.limit(identifier);
        return {
            success: result.success,
            limit: result.limit,
            remaining: result.remaining,
        };
    },

    // Event Queue (simple implementation for serverless)
    async pushEvent(queueName: string, event: object): Promise<void> {
        const key = `${PREFIX}queue:${queueName}`;
        await redis.lpush(key, JSON.stringify(event));
    },

    async popEvent<T>(queueName: string): Promise<T | null> {
        const key = `${PREFIX}queue:${queueName}`;
        const data = await redis.rpop<string>(key);
        return data ? JSON.parse(data) : null;
    },

    // Pub/Sub via polling (Vercel compatible)
    async publishMessage(channel: string, message: object): Promise<void> {
        const key = `${PREFIX}pubsub:${channel}`;
        const entry = {
            id: `msg_${Date.now()}`,
            message,
            timestamp: Date.now(),
        };
        await redis.lpush(key, JSON.stringify(entry));
        await redis.ltrim(key, 0, 99); // Keep last 100 messages
    },

    async getRecentMessages<T>(channel: string, sinceTimestamp?: number): Promise<T[]> {
        const key = `${PREFIX}pubsub:${channel}`;
        const messages = await redis.lrange<string>(key, 0, 99);

        return messages
            .map(m => JSON.parse(m))
            .filter(m => !sinceTimestamp || m.timestamp > sinceTimestamp)
            .map(m => m.message);
    },
};

export { redis, ratelimit };
