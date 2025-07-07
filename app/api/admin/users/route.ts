
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import { User } from '../../../../lib/models/User';

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({ role: { $ne: 'admin' } }).lean();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
