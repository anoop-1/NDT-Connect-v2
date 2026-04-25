import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { location, serviceType, specialization } = body;

    const users = await User.find({
      role: { $in: ['provider', 'inspector'] },
      isActive: true,
    }).select('-password');

    const scored = users.map((user: any) => {
      let score = 0;
      const loc = (user.profileData?.location || '').toLowerCase();
      const servicesOffered: any[] = user.profileData?.servicesOffered || [];
      const serviceNames = servicesOffered.map((s: any) =>
        typeof s === 'string' ? s.toLowerCase() : (s?.name || '').toLowerCase()
      );
      const spec = (user.profileData?.specialization || '').toLowerCase();
      const rating: number = user.profileData?.rating || 4.0;

      if (location && loc.includes(location.toLowerCase())) score += 3;
      if (serviceType && serviceNames.some((s: string) => s.includes(serviceType.toLowerCase()))) score += 3;
      if (specialization && spec.includes(specialization.toLowerCase())) score += 2;
      if (user.profileData?.isVerified) score += 1;
      score += Math.min(2, Math.floor((rating - 4.0) / 0.5));

      return { user, score };
    });

    const top = scored
      .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
      .slice(0, 10);

    const recommendations = top.map(({ user }: { user: any }) => {
      const servicesOffered: any[] = user.profileData?.servicesOffered || [];
      const serviceNames = servicesOffered
        .slice(0, 3)
        .map((s: any) => (typeof s === 'string' ? s : s?.name || ''))
        .filter(Boolean);

      const descParts = [
        user.profileData?.description || 'Experienced NDT service provider.',
        user.profileData?.location ? `Location: ${user.profileData.location}` : '',
        serviceNames.length ? `Services: ${serviceNames.join(', ')}` : '',
      ].filter(Boolean);

      return {
        referenceId: user._id.toString(),
        providerName: user.profileData?.companyName || user.name || 'NDT Provider',
        description: descParts.join(' | '),
        rating: user.profileData?.rating || 4.0,
      };
    });

    return NextResponse.json({ success: true, data: recommendations });
  } catch (error: any) {
    console.error('Recommendations API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
