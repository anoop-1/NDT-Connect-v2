import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { SkillMatrix } from '@/lib/models/SkillMatrix';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const userId = request.nextUrl.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ message: 'userId is required' }, { status: 400 });
        }

        const skillMatrix = await SkillMatrix.findOne({ userId });

        if (!skillMatrix) {
            return NextResponse.json({
                success: true,
                data: { userId, skills: [], createdAt: new Date(), updatedAt: new Date() }
            });
        }

        return NextResponse.json({
            success: true,
            data: {
                userId: skillMatrix.userId,
                skills: skillMatrix.skills.map((skill: any) => ({
                    id: skill._id?.toString() || `${skill.method}-${Date.now()}`,
                    methodCode: skill.method,
                    methodName: skill.methodFullName,
                    level: skill.level,
                    certificationBody: skill.certificationBody,
                    certNumber: skill.certificationNumber,
                    expiryDate: skill.expiryDate ? new Date(skill.expiryDate).toISOString().split('T')[0] : '',
                    yearsExperience: skill.yearsExperience,
                })),
                createdAt: skillMatrix.createdAt,
                updatedAt: skillMatrix.updatedAt,
            }
        });
    } catch (error: any) {
        console.error('Error fetching skill matrix:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { userId, skills } = body;

        if (!userId || !skills) {
            return NextResponse.json({ message: 'userId and skills are required' }, { status: 400 });
        }

        // Transform incoming skills to match schema
        const transformedSkills = skills.map((skill: any) => ({
            method: skill.methodCode,
            methodFullName: skill.methodName,
            level: skill.level,
            certificationBody: skill.certificationBody || '',
            certificationNumber: skill.certNumber || '',
            expiryDate: skill.expiryDate ? new Date(skill.expiryDate) : null,
            yearsExperience: skill.yearsExperience || 0,
            notes: skill.notes || '',
        }));

        const skillMatrix = await SkillMatrix.findOneAndUpdate(
            { userId },
            {
                userId,
                skills: transformedSkills,
                updatedAt: new Date(),
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({
            success: true,
            data: {
                userId: skillMatrix.userId,
                skills: skillMatrix.skills.map((skill: any) => ({
                    id: skill._id?.toString() || `${skill.method}-${Date.now()}`,
                    methodCode: skill.method,
                    methodName: skill.methodFullName,
                    level: skill.level,
                    certificationBody: skill.certificationBody,
                    certNumber: skill.certificationNumber,
                    expiryDate: skill.expiryDate ? new Date(skill.expiryDate).toISOString().split('T')[0] : '',
                    yearsExperience: skill.yearsExperience,
                })),
                updatedAt: skillMatrix.updatedAt,
            },
        });
    } catch (error: any) {
        console.error('Error updating skill matrix:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
