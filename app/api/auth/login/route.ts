import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/auth-service';
import bcrypt from 'bcryptjs';

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
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password
        if (!user.password) {
            return NextResponse.json(
                { message: 'Account has no password set. Please contact support.' },
                { status: 401 }
            );
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Check if account is active
        if (user.isActive === false) {
            return NextResponse.json(
                { message: 'Your account has been deactivated. Please contact support.' },
                { status: 403 }
            );
        }

        // Check if email is verified (skip for admin)
        if (!user.verified && user.role !== 'admin') {
            return NextResponse.json(
                { message: 'Please verify your email before logging in. Check your inbox for the verification link.' },
                { status: 403 }
            );
        }

        // Remove sensitive fields from response
        const { password: _, verificationToken: __, ...safeUser } = user as any;

        // Map MongoDB _id to id for frontend compatibility
        const responseUser = {
            ...safeUser,
            id: safeUser._id?.toString() || safeUser.id,
        };

        return NextResponse.json(responseUser);
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'An error occurred during login. Please try again.' },
            { status: 500 }
        );
    }
}
