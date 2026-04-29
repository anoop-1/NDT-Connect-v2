import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';
import { getUserByEmail } from '@/lib/auth-service';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-change-me');

export async function POST(request: NextRequest) {
    try {
        const { refreshToken } = await request.json();
        if (!refreshToken) {
            return NextResponse.json({ message: 'Refresh token required' }, { status: 400 });
        }

        const { payload } = await jwtVerify(refreshToken, JWT_SECRET);
        const email = payload.email as string;
        const user = await getUserByEmail(email);

        if (!user || !user.isActive) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        const newToken = await new SignJWT({ userId: user._id?.toString(), email: user.email, role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        return NextResponse.json({ accessToken: newToken, refreshToken: newToken });
    } catch {
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }
}
