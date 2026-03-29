import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Equipment } from '@/lib/models/Equipment';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const userId = request.nextUrl.searchParams.get('userId');
        if (!userId) {
            return NextResponse.json({ message: 'userId is required' }, { status: 400 });
        }
        const equipment = await Equipment.find({ userId }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: equipment.map(e => ({ ...e.toObject(), id: e._id.toString() })) });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { userId, name, type, manufacturer, model: equipModel, serialNumber, calibrationDueDate, lastCalibrationDate, calibrationCertificateUrl, status, notes } = body;

        if (!userId || !name || !type || !serialNumber) {
            return NextResponse.json({ message: 'userId, name, type, and serialNumber are required' }, { status: 400 });
        }

        const equipment = await Equipment.create({
            userId, name, type, manufacturer, model: equipModel, serialNumber,
            calibrationDueDate: calibrationDueDate ? new Date(calibrationDueDate) : null,
            lastCalibrationDate: lastCalibrationDate ? new Date(lastCalibrationDate) : null,
            calibrationCertificateUrl,
            status: status || 'Active', notes
        });

        return NextResponse.json({ success: true, data: { ...equipment.toObject(), id: equipment._id.toString() } });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
