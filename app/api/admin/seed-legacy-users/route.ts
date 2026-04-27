import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const SEED_SECRET = process.env.ADMIN_SEED_SECRET || 'ndt-seed-2026-x7q9';

const LEGACY_USERS = [
  {
    email: 'td@ndt.net',
    name: 'NDT.net User',
    role: 'provider' as const,
  },
  {
    email: 'govind.w@onestopndt.com',
    name: 'Govind W',
    role: 'provider' as const,
  },
];

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!SEED_SECRET || authHeader !== `Bearer ${SEED_SECRET}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const results = [];
  for (const legacy of LEGACY_USERS) {
    const existing = await User.findOne({ email: legacy.email });
    if (existing) {
      results.push({ email: legacy.email, status: 'already_exists' });
      continue;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tempHash = await bcrypt.hash(crypto.randomUUID(), 10);

    await User.create({
      email: legacy.email,
      name: legacy.name,
      role: legacy.role,
      password: tempHash,
      verified: true,
      isActive: true,
      mustResetPassword: true,
      resetPasswordToken: resetToken,
      resetPasswordExpiry: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72h
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    results.push({ email: legacy.email, status: 'created' });
  }

  return NextResponse.json({ results });
}
