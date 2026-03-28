import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { CalibrationAlert } from '@/lib/models/CalibrationAlert';
import { ObjectId } from 'mongodb';

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        await dbConnect();
        const body = await request.json();
        const { equipmentName, reminderDays, enabled } = body;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid alert ID' }, { status: 400 });
        }

        const alert = await CalibrationAlert.findByIdAndUpdate(
            new ObjectId(id),
            { equipmentName, reminderDays, enabled, updatedAt: new Date() },
            { new: true }
        );

        if (!alert) {
            return NextResponse.json({ message: 'Alert not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: { ...alert.toObject(), id: alert._id.toString() } });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        await dbConnect();

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid alert ID' }, { status: 400 });
        }

        const alert = await CalibrationAlert.findByIdAndDelete(new ObjectId(id));

        if (!alert) {
            return NextResponse.json({ message: 'Alert not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Alert deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
