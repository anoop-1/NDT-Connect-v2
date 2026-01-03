import { NextResponse } from 'next/server';
import { upstashRedis } from '@/lib/vercel/upstash-redis';

/**
 * Cron job: Cleanup stale data
 * Runs every 15 minutes via Vercel Cron
 */

export async function GET() {
    try {
        console.log('Running stale data cleanup...');

        // Get all inspector locations
        const locations = await upstashRedis.getAllInspectorLocations();
        const now = Date.now();
        const staleThreshold = 5 * 60 * 1000; // 5 minutes

        let cleanedCount = 0;

        for (const [inspectorId, location] of locations) {
            if (now - location.timestamp > staleThreshold) {
                await upstashRedis.removeInspectorLocation(inspectorId);
                cleanedCount++;
            }
        }

        console.log(`Cleanup complete: ${cleanedCount} stale entries removed`);

        return NextResponse.json({
            success: true,
            cleaned: cleanedCount,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Cleanup failed:', error);
        return NextResponse.json(
            { error: 'Cleanup failed' },
            { status: 500 }
        );
    }
}

export const dynamic = 'force-dynamic';
