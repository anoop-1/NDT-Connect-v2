
import { NextRequest, NextResponse } from 'next/server';
import { registerUser, getUserByEmail } from '../../../lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, role, name, password, ...profileData } = body;

    if (!email || !role || !name || !password) {
      return NextResponse.json(
        { error: 'Email, role, and name are required' },
        { status: 400 }
      );
    }

    if (!['client', 'provider', 'inspector', 'admin'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role specified' },
        { status: 400 }
      );
    }

    if (role === 'client') {
      if (!profileData.companyName || !profileData.industry || !profileData.primaryLocation) {
        return NextResponse.json(
          { error: 'Client requires companyName, industry, and primaryLocation' },
          { status: 400 }
        );
      }
    } else if (role === 'provider') {
      if (!profileData.companyName || !profileData.location) {
        return NextResponse.json(
          { error: 'Provider requires companyName and location' },
          { status: 400 }
        );
      }
    } else if (role === 'inspector') {
      if (!profileData.association || !profileData.contactNumber) {
        return NextResponse.json(
          { error: 'Inspector requires association and contactNumber' },
          { status: 400 }
        );
      }
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const user = await registerUser({
      email,
      role,
      name,
      password,
      profileData
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'User registered successfully',
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
