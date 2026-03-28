import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Equipment } from '@/lib/models/Equipment';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const body = await request.json();
        const updated = await Equipment.findByIdAndUpdate(
            params.id,
            { ...body, updatedAt: new Date() },
            { new: true }
        );
        if (!updated) return NextResponse.json({ message: 'Equipment not found' }, { status: 404 });
        return NextResponse.json({ success: true, data: { ...updated.toObject(), id: updated._id.toString() } });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const deleted = await Equipment.findByIdAndDelete(params.id);
        if (!deleted) return NextResponse.json({ message: 'Equipment not found' }, { status: 404 });
        return NextResponse.json({ success: true, message: 'Equipment deleted' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
