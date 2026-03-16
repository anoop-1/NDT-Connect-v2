import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth-service';

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

        return NextResponse.json(user);
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: error.message || 'Registration failed' },
            { status: 500 }
        );
    }
}
