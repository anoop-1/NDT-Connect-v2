import { NextRequest, NextResponse } from 'next/server';
import { inspectionLifecycleService } from '@/services/lifecycle/lifecycle-service';

/**
 * Record inspection findings
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { inspectionId, type, severity, description, location, imageUrls = [] } = body;

        if (!inspectionId || !type || !severity || !description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const finding = await inspectionLifecycleService.recordFinding(inspectionId, {
            type,
            severity,
            description,
            location: location || '',
            imageUrls,
        });

        return NextResponse.json({ success: true, finding });
    } catch (error) {
        console.error('Record finding error:', error);
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
