import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { ServiceRequest } from "@/lib/models/ServiceRequest";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = params;
    const doc = await ServiceRequest.findById(id);

    if (!doc) {
      return NextResponse.json(
        { success: false, error: "Service request not found" },
        { status: 404 }
      );
    }

    const obj = doc.toObject();
    obj.id = obj._id.toString();
    delete obj._id;

    return NextResponse.json({ success: true, data: obj });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = params;
    const body = await req.json();

    const { status, providerId, providerName } = body;

    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (status !== undefined) updateData.status = status;
    if (providerId !== undefined) updateData.providerId = providerId;
    if (providerName !== undefined) updateData.providerName = providerName;

    const doc = await ServiceRequest.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return NextResponse.json(
        { success: false, error: "Service request not found" },
        { status: 404 }
      );
    }

    const obj = doc.toObject();
    obj.id = obj._id.toString();
    delete obj._id;

    return NextResponse.json({ success: true, data: obj });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
