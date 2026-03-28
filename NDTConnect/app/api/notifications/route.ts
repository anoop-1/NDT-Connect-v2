import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Notification } from '@/lib/models/Notification';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const userId = request.nextUrl.searchParams.get('userId');
        if (!userId) return NextResponse.json({ message: 'userId is required' }, { status: 400 });

        const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20');
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(limit);
        const unreadCount = await Notification.countDocuments({ userId, read: false });

        return NextResponse.json({
            success: true,
            data: notifications.map(n => ({ ...n.toObject(), id: n._id.toString() })),
            unreadCount
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const notification = await Notification.create(body);
        return NextResponse.json({ success: true, data: { ...notification.toObject(), id: notification._id.toString() } });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// Mark notifications as read
export async function PATCH(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { userId, notificationIds } = body;

        if (notificationIds && notificationIds.length > 0) {
            await Notification.updateMany({ _id: { $in: notificationIds } }, { read: true });
        } else if (userId) {
            await Notification.updateMany({ userId, read: false }, { read: true });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
