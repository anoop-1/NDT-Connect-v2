
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, getUserByEmail } from '../../../lib/auth-service';
import type { User } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  try {
    if (email) {
      const user = await getUserByEmail(email);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(user);
    }

    const users = await getAllUsers();
    
    const safeUsers = users.map((user: User) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      verified: user.verified
    }));

    return NextResponse.json({ 
      users: safeUsers,
      total: safeUsers.length 
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
