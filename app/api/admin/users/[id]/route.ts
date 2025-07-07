// app/api/admin/users/[id]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/mongodb';
import { User } from '../../../../../lib/models/User';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const deletedUser = await User.findByIdAndDelete(params.id).lean();

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
