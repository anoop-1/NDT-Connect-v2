import { NextRequest, NextResponse } from 'next/server';
import { upstashRedis } from '@/lib/vercel/upstash-redis';
import { publishLocationUpdate, publishEvent, CHANNELS, EVENTS } from '@/lib/vercel/pusher-service';
import { geoToH3, H3_RESOLUTION } from '@/lib/geo/h3-service';

/**
 * Real-time location update endpoint for Vercel
 * Inspectors call this to update their location
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { inspectorId, lat, lng, accuracy, speed, heading } = body;

        if (!inspectorId || lat === undefined || lng === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields: inspectorId, lat, lng' },
                { status: 400 }
            );
        }

        // Calculate H3 index
        const h3Index = geoToH3({ lat, lng }, H3_RESOLUTION.NEIGHBORHOOD);

        // Store in Upstash Redis
        await upstashRedis.setInspectorLocation(inspectorId, {
            lat,
            lng,
            h3Index,
            status: 'available',
            timestamp: Date.now(),
        });

        // Publish to Pusher for real-time clients
        await publishLocationUpdate(inspectorId, { lat, lng, h3Index });

        return NextResponse.json({
            success: true,
            h3Index,
            timestamp: Date.now(),
        });
    } catch (error: any) {
        console.error('Location update error:', error);
        return NextResponse.json(
            { error: 'Failed to update location' },
            { status: 500 }
        );
    }
}

/**
 * GET - Get all active inspector locations
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const inspectorId = searchParams.get('inspectorId');

        if (inspectorId) {
            // Get specific inspector
            const location = await upstashRedis.getInspectorLocation(inspectorId);
            if (!location) {
                return NextResponse.json(
                    { error: 'Inspector not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json({ location });
        }

        // Get all active inspectors
        const locations = await upstashRedis.getAllInspectorLocations();
        const inspectors = Array.from(locations.entries()).map(([id, loc]) => ({
            inspectorId: id,
            ...loc,
        }));

        return NextResponse.json({
            inspectors,
            count: inspectors.length,
        });
    } catch (error: any) {
        console.error('Get locations error:', error);
        return NextResponse.json(
            { error: 'Failed to get locations' },
            { status: 500 }
        );
    }
}
