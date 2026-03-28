import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { CalibrationAlert } from '@/lib/models/CalibrationAlert';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const userId = request.nextUrl.searchParams.get('userId');
        if (!userId) return NextResponse.json({ message: 'userId is required' }, { status: 400 });
        const alerts = await CalibrationAlert.find({ userId });
        return NextResponse.json({ success: true, data: alerts.map(a => ({ ...a.toObject(), id: a._id.toString() })) });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { userId, equipmentId, equipmentName, reminderDays, enabled } = body;
        if (!userId || !equipmentId) return NextResponse.json({ message: 'userId and equipmentId are required' }, { status: 400 });

        // Upsert - update if exists, create if not
        const alert = await CalibrationAlert.findOneAndUpdate(
            { userId, equipmentId },
            { userId, equipmentId, equipmentName, reminderDays: reminderDays || 30, enabled: enabled !== false, updatedAt: new Date() },
            { upsert: true, new: true }
        );
        return NextResponse.json({ success: true, data: { ...alert.toObject(), id: alert._id.toString() } });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
