// app/api/admin/users/[id]/status/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../../../../lib/mongodb';
import { User } from '../../../../../../lib/models/User';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { isActive } = await request.json();
    await dbConnect();

    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      { isActive },
      { new: true }
    ).lean();
    
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user status:', error);
    return NextResponse.json(
      { error: 'Failed to update user status' },
      { status: 500 }
    );
  }
}
