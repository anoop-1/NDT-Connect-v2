import dbConnect from './mongodb';
import UserModel from '@/models/User';
import type { User } from './types';

export async function getUserByEmail(email: string): Promise<User | null> {
  await dbConnect();
  const userDoc: any = await UserModel.findOne({ email }).lean();
  if (!userDoc) return null;
  return {
    id: userDoc._id?.toString() ?? '',
    email: userDoc.email,
    name: userDoc.name,
    role: userDoc.role,
    createdAt: userDoc.createdAt,
    updatedAt: userDoc.updatedAt,
    verified: userDoc.verified ?? false,
    verificationToken: userDoc.verificationToken ?? null,
  };
}

