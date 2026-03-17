import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ServiceRequest } from '@/lib/models/ServiceRequest';

/**
 * GET - Fetch service requests
 * Query params:
 *   clientId - fetch requests for a specific client
 *   providerId - fetch requests assigned to a specific provider
 *   status - filter by status (Pending, Confirmed, In Progress, Completed, Cancelled)
 *   includeOpen - if "true", include unassigned Pending requests (for providers browsing available jobs)
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const providerId = searchParams.get('providerId');
    const status = searchParams.get('status');
    const includeOpen = searchParams.get('includeOpen');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    if (clientId) {
      filter.clientId = clientId;
    }

    if (providerId) {
      if (includeOpen === 'true') {
        // Provider wants their assigned requests AND unassigned pending requests
        filter.$or = [
          { providerId },
          { providerId: null, status: 'Pending' },
          { providerId: { $exists: false }, status: 'Pending' },
        ];
      } else {
        filter.providerId = providerId;
      }
    }

    if (status) {
      filter.status = status;
    }

    const requests = await ServiceRequest.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: requests });
  } catch (error: unknown) {
    console.error('Error fetching service requests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch service requests' },
      { status: 500 }
    );
  }
}

/**
 * POST - Create a new service request
 * Body: { clientId, clientName, clientEmail, providerId, providerName,
 *         serviceType, location, description, requestedDate, estimatedCost, fileAttachmentUrl }
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    const {
      clientId,
      clientName,
      clientEmail,
      providerId,
      providerName,
      serviceType,
      location,
      description,
      requestedDate,
      estimatedCost,
      fileAttachmentUrl,
    } = body;

    // Validate required fields
    if (!clientId || !serviceType || !location || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: clientId, serviceType, location, description' },
        { status: 400 }
      );
    }

    const newRequest = await ServiceRequest.create({
      clientId,
      clientName: clientName || null,
      clientEmail: clientEmail || null,
      providerId: providerId || null,
      providerName: providerName || null,
      serviceType,
      location,
      description,
      requestedDate: requestedDate ? new Date(requestedDate) : null,
      estimatedCost: estimatedCost ?? null,
      fileAttachmentUrl: fileAttachmentUrl || null,
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const doc = newRequest.toObject();

    return NextResponse.json(
      {
        success: true,
        data: {
          id: doc._id.toString(),
          ...doc,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error creating service request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create service request' },
      { status: 500 }
    );
  }
}
