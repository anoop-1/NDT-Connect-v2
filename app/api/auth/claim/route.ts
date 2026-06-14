import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { JWT_SECRET } from '@/lib/jwt';

// Activate a pre-seeded provider stub via its claim token: set a password,
// mark claimed/active, auto-login. Powers the "claim your free listing" flow.
export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    if (!token || !password || String(password).length < 8) {
      return NextResponse.json(
        { message: 'A claim token and a password (min 8 chars) are required.' },
        { status: 400 }
      );
    }

    await dbConnect();
    const user = await User.findOne({ claimToken: token });
    if (!user) {
      return NextResponse.json({ message: 'This claim link is invalid or already used.' }, { status: 404 });
    }
    if (user.claimed) {
      return NextResponse.json({ message: 'This profile has already been claimed. Please log in.' }, { status: 409 });
    }

    user.password = await bcrypt.hash(password, 10);
    user.claimed = true;
    user.isActive = true;
    user.verified = true;
    user.mustResetPassword = false;
    user.claimToken = null;
    user.updatedAt = new Date();
    await user.save();

    const id = user._id?.toString();
    const jwt = await new SignJWT({ userId: id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    const res = NextResponse.json({
      id,
      email: user.email,
      name: user.name,
      role: user.role,
      accessToken: jwt,
    });
    res.cookies.set('ndt-token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return res;
  } catch (error: any) {
    console.error('Claim error:', error);
    return NextResponse.json({ message: error.message || 'Claim failed' }, { status: 500 });
  }
}
