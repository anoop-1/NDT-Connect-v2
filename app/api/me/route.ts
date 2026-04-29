import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getUserByEmail } from '@/lib/auth-service';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-change-me');

export async function GET(request: NextRequest) {
    try {
        // Support both cookie (web) and Bearer header (mobile)
        const authHeader = request.headers.get('authorization');
        const cookieToken = request.cookies.get('ndt-token')?.value;
        const token = authHeader?.replace('Bearer ', '') ?? cookieToken;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);
        const email = payload.email as string;
        const user = await getUserByEmail(email);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const { password: _, verificationToken: __, resetPasswordToken: ___, ...safeUser } = user as any;
        return NextResponse.json({
            ...safeUser,
            id: safeUser._id?.toString() || safeUser.id,
        });
    } catch {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}
