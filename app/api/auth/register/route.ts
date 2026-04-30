import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth-service';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-change-me');

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, role, name, password, profileData } = body;

        if (!email || !role || !name || !password) {
            return NextResponse.json(
                { message: 'Missing required fields: email, role, name, password' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { message: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        const user = await registerUser({
            email,
            role,
            name,
            password,
            profileData,
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Failed to create user' },
                { status: 500 }
            );
        }

        const safe: any = (user as any).toObject ? (user as any).toObject() : user;
        const responseUser = {
            ...safe,
            id: safe._id?.toString() || safe.id,
        };
        delete responseUser.password;
        delete responseUser.verificationToken;
        delete responseUser.resetPasswordToken;

        const token = await new SignJWT({ userId: responseUser.id, email: responseUser.email, role: responseUser.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        const response = NextResponse.json({
            ...responseUser,
            accessToken: token,
            refreshToken: token,
        });
        response.cookies.set('ndt-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
        return response;
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: error.message || 'Registration failed' },
            { status: 500 }
        );
    }
}
