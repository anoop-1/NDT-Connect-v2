import { NextRequest, NextResponse } from 'next/server';
import { generatePasswordResetToken } from '@/lib/auth-service';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        if (!email) return NextResponse.json({ message: 'Email is required' }, { status: 400 });

        // Always return success to prevent email enumeration
        await generatePasswordResetToken(email.toLowerCase().trim());

        return NextResponse.json({ message: 'If an account exists for that email, a password reset link has been sent.' });
    } catch (error: any) {
        console.error('Forgot password error:', error);
        return NextResponse.json({ message: 'Failed to process request' }, { status: 500 });
    }
}
