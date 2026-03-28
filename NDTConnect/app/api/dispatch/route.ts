import { NextRequest, NextResponse } from 'next/server';
import { dispatchService } from '@/services/dispatch/dispatch-service';
import { complianceService } from '@/services/compliance/compliance-service';

/**
 * Dispatch API - Request inspector dispatch for a job
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            jobId,
            clientId,
            serviceType,
            location,
            requestedDate,
            priority = 'normal',
            requirements = [],
        } = body;

        // Validate required fields
        if (!jobId || !clientId || !serviceType || !location) {
            return NextResponse.json(
                { error: 'Missing required fields: jobId, clientId, serviceType, location' },
                { status: 400 }
            );
        }

        // Dispatch job
        const result = await dispatchService.dispatchJob({
            id: jobId,
            clientId,
            serviceType,
            location: {
                lat: location.lat,
                lng: location.lng,
                address: location.address || '',
            },
            requestedDate: new Date(requestedDate || Date.now()),
            priority,
            requirements,
            status: 'pending',
            createdAt: new Date(),
        });

        if (result.success) {
            return NextResponse.json({
                success: true,
                jobId: result.jobId,
                inspector: result.assignedInspector
                    ? {
                        id: result.assignedInspector.id,
                        name: result.assignedInspector.name,
                        rating: result.assignedInspector.rating,
                    }
                    : null,
                etaMinutes: result.etaMinutes,
            });
        } else {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 422 }
            );
        }
    } catch (error: any) {
        console.error('Dispatch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * GET - Get available inspectors for a location
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const lat = parseFloat(searchParams.get('lat') || '0');
        const lng = parseFloat(searchParams.get('lng') || '0');
        const serviceType = searchParams.get('serviceType') || undefined;
        const maxDistance = parseInt(searchParams.get('maxDistance') || '50', 10);

        if (!lat || !lng) {
            return NextResponse.json(
                { error: 'Missing required parameters: lat, lng' },
                { status: 400 }
            );
        }

        const inspectors = dispatchService.getAvailableInspectors(
            { lat, lng },
            serviceType,
            maxDistance
        );

        // Check compliance for each inspector
        const inspectorsWithCompliance = await Promise.all(
            inspectors.map(async (inspector) => {
                const compliance = await complianceService.canAcceptJobs(inspector.id);
                return {
                    id: inspector.id,
                    name: inspector.name,
                    rating: inspector.rating,
                    serviceTypes: inspector.serviceTypes,
                    certifications: inspector.certifications,
                    canAcceptJobs: compliance.allowed,
                    complianceIssue: compliance.reason,
                };
            })
        );

        return NextResponse.json({
            inspectors: inspectorsWithCompliance.filter(i => i.canAcceptJobs),
            total: inspectorsWithCompliance.filter(i => i.canAcceptJobs).length,
        });
    } catch (error: any) {
        console.error('Get inspectors error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
