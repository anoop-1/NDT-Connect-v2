import { NextRequest, NextResponse } from 'next/server';
import { updateUser } from '@/lib/auth-service';

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body._id && !body.id) {
            return NextResponse.json(
                { message: 'User ID is required' },
                { status: 400 }
            );
        }

        await updateUser(body);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Update user error:', error);
        return NextResponse.json(
            { message: error.message || 'Update failed' },
            { status: 500 }
        );
    }
}
