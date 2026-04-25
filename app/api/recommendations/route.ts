import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/models/User';

interface RecommendationInput {
    location?: string;
    serviceType?: string;
    specialization?: string;
    standard?: string;
    assetToBeInspected?: string;
}

function lc(v: any) {
    return typeof v === 'string' ? v.toLowerCase() : '';
}

function includesAny(haystack: any[], needle: string) {
    const n = needle.toLowerCase();
    return haystack.some((h) => {
        if (!h) return false;
        if (typeof h === 'string') return h.toLowerCase().includes(n);
        if (typeof h === 'object') {
            if (typeof h.name === 'string' && h.name.toLowerCase().includes(n)) return true;
            if (typeof h.code === 'string' && h.code.toLowerCase().includes(n)) return true;
        }
        return false;
    });
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body: RecommendationInput = await request.json();
        const { location = '', serviceType = '', specialization = '', standard = '', assetToBeInspected = '' } = body;

        const users = await User.find({
            role: { $in: ['provider', 'inspector'] },
            isActive: true,
        }).select('-password');

        const scored = users.map((u: any) => {
            const profile = u.profileData || {};
            const providerLocation = lc(profile.location);
            const providerSpec = lc(profile.specialization);
            const providerDesc = lc(profile.description);
            const services: any[] = profile.servicesOffered || [];
            const specializations: any[] = profile.specializations || (profile.specialization ? [profile.specialization] : []);
            const standards: any[] = profile.standards || profile.certifications || [];
            const assets: any[] = profile.assetsHandled || profile.assets || [];

            let score = 0;

            if (location && providerLocation.includes(location.toLowerCase())) score += 3;
            if (serviceType && (includesAny(services, serviceType) || providerSpec.includes(serviceType.toLowerCase()) || providerDesc.includes(serviceType.toLowerCase()))) score += 3;
            if (specialization && (includesAny(specializations, specialization) || providerSpec.includes(specialization.toLowerCase()))) score += 2;
            if (standard && includesAny(standards, standard)) score += 1;
            if (assetToBeInspected && (includesAny(assets, assetToBeInspected) || providerDesc.includes(assetToBeInspected.toLowerCase()))) score += 1;
            if (profile.isVerified) score += 1;

            const rating = typeof profile.rating === 'number' ? profile.rating : 4.0;
            if (rating >= 4.5) score += 2;
            else if (rating >= 4.0) score += 1;

            return {
                referenceId: u._id.toString(),
                providerName: profile.companyName || u.name || 'Unnamed Provider',
                description: profile.description || profile.specialization || 'NDT inspection service provider.',
                rating,
                location: profile.location || '',
                isVerified: !!profile.isVerified,
                _score: score,
            };
        });

        const top = scored
            .filter((r: any) => r._score > 0)
            .sort((a: any, b: any) => b._score - a._score)
            .slice(0, 10)
            .map(({ _score, ...r }: any) => r);

        return NextResponse.json({ success: true, data: top });
    } catch (error: any) {
        console.error('Recommendations error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
