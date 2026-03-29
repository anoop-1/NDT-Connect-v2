import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import { User } from '../../../lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Email not registered' },
        { status: 401 }
      );
    }

    if (!user.verified) {
      return NextResponse.json(
        { 
          error: 'Account not verified',
          message: 'Please check your email for the verification link'
        },
        { status: 403 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { 
          error: 'Account disabled',
          message: 'Your account has been disabled and would require admin priviledges to enable.'
        },
        { status: 403 }
      );
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const userData = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      verified: user.verified
    };

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    cookies().set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24
    });
    
    return NextResponse.json({ 
      message: 'Login successful',
      user: userData
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
