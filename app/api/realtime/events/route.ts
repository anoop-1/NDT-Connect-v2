import { NextRequest, NextResponse } from 'next/server';
import { upstashRedis } from '@/lib/vercel/upstash-redis';
import { publishEvent, CHANNELS, EVENTS } from '@/lib/vercel/pusher-service';

/**
 * Publish events to Pusher (for serverless environment)
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { channel, event, data, userId } = body;

        if (!channel || !event || !data) {
            return NextResponse.json(
                { error: 'Missing required fields: channel, event, data' },
                { status: 400 }
            );
        }

        // Rate limit check
        const identifier = userId || request.ip || 'anonymous';
        const { success, remaining } = await upstashRedis.checkRateLimit(identifier);

        if (!success) {
            return NextResponse.json(
                { error: 'Rate limit exceeded' },
                { status: 429, headers: { 'X-RateLimit-Remaining': remaining.toString() } }
            );
        }

        // Publish to Pusher
        await publishEvent(channel, event, {
            ...data,
            timestamp: Date.now(),
        });

        // Also store in Redis for persistence
        await upstashRedis.publishMessage(channel, { event, data });

        return NextResponse.json({
            success: true,
            timestamp: Date.now(),
        });
    } catch (error: any) {
        console.error('Publish event error:', error);
        return NextResponse.json(
            { error: 'Failed to publish event' },
            { status: 500 }
        );
    }
}

/**
 * GET - Poll for recent events (fallback for clients without Pusher)
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const channel = searchParams.get('channel');
        const since = searchParams.get('since');

        if (!channel) {
            return NextResponse.json(
                { error: 'Missing required parameter: channel' },
                { status: 400 }
            );
        }

        const sinceTimestamp = since ? parseInt(since, 10) : Date.now() - 60000; // Last 1 minute
        const messages = await upstashRedis.getRecentMessages(channel, sinceTimestamp);

        return NextResponse.json({
            messages,
            count: messages.length,
            timestamp: Date.now(),
        });
    } catch (error: any) {
        console.error('Get events error:', error);
        return NextResponse.json(
            { error: 'Failed to get events' },
            { status: 500 }
        );
    }
}
