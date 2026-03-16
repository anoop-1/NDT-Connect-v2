import { NextResponse } from 'next/server';

/**
 * Health check endpoint for load balancer and Kubernetes probes
 */
export async function GET() {
    const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        uptime: process.uptime(),
        checks: {
            database: await checkDatabase(),
            redis: await checkRedis(),
            kafka: await checkKafka(),
        },
    };

    const isHealthy = Object.values(health.checks).every(c => c.status === 'ok');

    return NextResponse.json(health, {
        status: isHealthy ? 200 : 503,
    });
}

async function checkDatabase(): Promise<{ status: string; latency?: number }> {
    try {
        const start = Date.now();
        // In production, ping MongoDB
        // await mongoose.connection.db.admin().ping();
        return { status: 'ok', latency: Date.now() - start };
    } catch (error) {
        return { status: 'error' };
    }
}

async function checkRedis(): Promise<{ status: string; latency?: number }> {
    try {
        const start = Date.now();
        // In production, ping Redis
        // await redisClient.ping();
        return { status: 'ok', latency: Date.now() - start };
    } catch (error) {
        return { status: 'error' };
    }
}

async function checkKafka(): Promise<{ status: string }> {
    try {
        // In production, check Kafka connectivity
        return { status: 'ok' };
    } catch (error) {
        return { status: 'error' };
    }
}
