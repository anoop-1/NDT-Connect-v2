import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import bcrypt from 'bcryptjs';

// This endpoint ensures the admin user exists in the database
// It's safe to call multiple times - it won't create duplicates
export async function POST(request: NextRequest) {
    try {
        // Verify the request contains the correct admin credentials
        const body = await request.json();
        const { email, password } = body;

        if (email !== 'anoop@atlantisinspection.com' || password !== 'Atlantis9$') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const existing = await User.findOne({ email: 'anoop@atlantisinspection.com' });
        if (existing) {
            // Update to ensure admin role and active status
            existing.role = 'admin';
            existing.isActive = true;
            existing.password = await bcrypt.hash('Atlantis9$', 10);
            existing.updatedAt = new Date();
            await existing.save();
            return NextResponse.json({ message: 'Admin user updated', success: true });
        }

        await User.create({
            email: 'anoop@atlantisinspection.com',
            name: 'Anoop R',
            role: 'admin',
            password: await bcrypt.hash('Atlantis9$', 10),
            isActive: true,
            verified: true,
            profileData: {},
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({ message: 'Admin user created', success: true });
    } catch (error: any) {
        console.error('Admin seed error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
