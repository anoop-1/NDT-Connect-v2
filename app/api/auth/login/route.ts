import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, generatePasswordResetToken } from '@/lib/auth-service';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

import { JWT_SECRET } from '@/lib/jwt';
import { checkLoginRate, recordFailedLogin, clearLoginRate, hashIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
    // Per-IP brute-force throttle. Fails OPEN: a limiter error must never block login.
    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        'unknown';
    const ipHash = hashIp(ip, request.headers.get('user-agent'));
    try {
        const rate = await checkLoginRate(ipHash);
        if (!rate.allowed) {
            return NextResponse.json(
                { message: 'Too many login attempts. Try again in a few minutes.' },
                { status: 429, headers: { 'Retry-After': '900' } }
            );
        }
    } catch (e) {
        console.error('Login rate-limit check failed (allowing):', e);
    }

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
            await recordFailedLogin(ipHash).catch(() => {});
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
            await recordFailedLogin(ipHash).catch(() => {});
            return NextResponse.json(
                { message: 'Invalid email or password.' },
                { status: 401 }
            );
        }

        // Successful auth — reset the IP's failed-attempt counter.
        await clearLoginRate(ipHash).catch(() => {});

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
