import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/auth-service';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            );
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Verify password if provided
        if (password && user.password) {
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return NextResponse.json(
                    { message: 'Invalid password' },
                    { status: 401 }
                );
            }
        }

        // Remove password from response
        const { password: _, ...safeUser } = user as any;

        return NextResponse.json(safeUser);
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: error.message || 'Login failed' },
            { status: 500 }
        );
    }
}
