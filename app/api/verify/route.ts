import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import { User } from '../../../lib/models/User';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  try {
    await dbConnect();
    
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    user.verified = true;
    user.verificationToken = null;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully!' });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Email verification failed' },
      { status: 500 }
    );
  }
}
