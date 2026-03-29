import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/models/User';

// Get certifications for a user (from profileData)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const userId = request.nextUrl.searchParams.get('userId');
        if (!userId) return NextResponse.json({ message: 'userId is required' }, { status: 400 });

        const user = await User.findById(userId);
        if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        const profileData = user.profileData || {};
        return NextResponse.json({
            success: true,
            data: {
                personnelQualifications: profileData.personnelQualifications || [],
                companyCertifications: profileData.certifications || [],
            }
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// Update certifications for a user
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { userId, personnelQualifications, companyCertifications } = body;
        if (!userId) return NextResponse.json({ message: 'userId is required' }, { status: 400 });

        const user = await User.findById(userId);
        if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        const profileData = user.profileData || {};
        if (personnelQualifications !== undefined) profileData.personnelQualifications = personnelQualifications;
        if (companyCertifications !== undefined) profileData.certifications = companyCertifications;

        user.profileData = profileData;
        user.updatedAt = new Date();
        user.markModified('profileData');
        await user.save();

        return NextResponse.json({
            success: true,
            data: {
                personnelQualifications: profileData.personnelQualifications || [],
                companyCertifications: profileData.certifications || [],
            }
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
