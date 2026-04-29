import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, generatePasswordResetToken } from '@/lib/auth-service';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-change-me');

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password.' },
                { status: 401 }
            );
        }

        // Legacy user needs to set a password
        if (user.mustResetPassword) {
            await generatePasswordResetToken(user.email);
            return NextResponse.json(
                { requiresPasswordSetup: true, message: 'We\'ve sent a password setup link to your email. Please check your inbox.' },
                { status: 403 }
            );
        }

        // Check if account is active
        if (user.isActive === false) {
            return NextResponse.json(
                { message: 'Your account has been deactivated. Please contact support.' },
                { status: 403 }
            );
        }

        // Verify password - ALWAYS required
        if (!user.password) {
            return NextResponse.json(
                { message: 'Account requires password reset. Please contact support.' },
                { status: 401 }
            );
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json(
                { message: 'Invalid email or password.' },
                { status: 401 }
            );
        }

        // Remove sensitive fields from response
        const { password: _, verificationToken: __, ...safeUser } = user as any;

        // Map MongoDB _id to id for frontend compatibility
        const responseUser = {
            ...safeUser,
            id: safeUser._id?.toString() || safeUser.id,
        };

        // Generate JWT token
        const token = await new SignJWT({ userId: responseUser.id, email: responseUser.email, role: responseUser.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        // Return token in body for mobile clients + set cookie for web clients
        const response = NextResponse.json({
            ...responseUser,
            accessToken: token,
            refreshToken: token, // single-token model; mobile refresh just re-issues
        });
        response.cookies.set('ndt-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: error.message || 'Login failed' },
            { status: 500 }
        );
    }
}
