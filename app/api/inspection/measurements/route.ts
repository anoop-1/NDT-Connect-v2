import { NextRequest, NextResponse } from 'next/server';
import { inspectionLifecycleService } from '@/services/lifecycle/lifecycle-service';

/**
 * Record inspection measurements
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { inspectionId, parameter, value, unit, location, threshold } = body;

        if (!inspectionId || !parameter || value === undefined || !unit) {
            return NextResponse.json(
                { error: 'Missing required fields: inspectionId, parameter, value, unit' },
                { status: 400 }
            );
        }

        const measurement = await inspectionLifecycleService.recordMeasurement(inspectionId, {
            parameter,
            value,
            unit,
            location: location || '',
            threshold,
        });

        return NextResponse.json({
            success: true,
            measurement,
            withinSpec: measurement.isWithinSpec,
        });
    } catch (error) {
        console.error('Record measurement error:', error);
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
