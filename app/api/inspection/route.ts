import { NextRequest, NextResponse } from 'next/server';
import { inspectionLifecycleService } from '@/services/lifecycle/lifecycle-service';

/**
 * Inspection API - Manage inspection lifecycle
 */

// POST - Create new inspection
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const inspection = await inspectionLifecycleService.createInspection({
            jobId: body.jobId,
            inspectorId: body.inspectorId,
            clientId: body.clientId,
            assetId: body.assetId,
            serviceType: body.serviceType,
            metadata: body.metadata || {},
        });

        return NextResponse.json({ success: true, inspection });
    } catch (error) {
        console.error('Create inspection error:', error);
        return NextResponse.json(
            { error: 'Failed to create inspection' },
            { status: 500 }
        );
    }
}

// GET - Get inspection(s)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const inspectionId = searchParams.get('id');
        const state = searchParams.get('state');
        const inspectorId = searchParams.get('inspectorId');

        if (inspectionId) {
            const inspection = inspectionLifecycleService.getInspection(inspectionId);
            if (!inspection) {
                return NextResponse.json(
                    { error: 'Inspection not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json({ inspection });
        }

        if (state) {
            const inspections = inspectionLifecycleService.getInspectionsByState(state as any);
            return NextResponse.json({ inspections });
        }

        if (inspectorId) {
            const inspections = inspectionLifecycleService.getInspectorInspections(inspectorId);
            return NextResponse.json({ inspections });
        }

        // Return statistics
        const stats = inspectionLifecycleService.getStatistics();
        return NextResponse.json({ statistics: stats });
    } catch (error) {
        console.error('Get inspection error:', error);
        return NextResponse.json(
            { error: 'Failed to get inspection' },
            { status: 500 }
        );
    }
}

// PATCH - Update inspection state
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { inspectionId, newState } = body;

        if (!inspectionId || !newState) {
            return NextResponse.json(
                { error: 'Missing inspectionId or newState' },
                { status: 400 }
            );
        }

        const inspection = await inspectionLifecycleService.transitionState(
            inspectionId,
            newState
        );

        return NextResponse.json({ success: true, inspection });
    } catch (error) {
        const message = (error as Error).message;
        console.error('Update inspection error:', message);
        return NextResponse.json(
            { error: message },
            { status: 400 }
        );
    }
}
