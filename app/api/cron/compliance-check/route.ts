import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { sendCertificationExpiryAlert } from '@/lib/email';

/**
 * Cron job: Daily certification expiry check
 * Scans all providers/inspectors for certifications expiring within 30 days
 * Sends email alerts to affected users
 */

export async function GET() {
  try {
    console.log('Running daily certification expiry check...');
    await dbConnect();

    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Find all providers and inspectors
    const users = await User.find({
      role: { $in: ['provider', 'inspector'] },
      isActive: { $ne: false },
    }).lean();

    let alertsSent = 0;
    let usersChecked = 0;

    for (const user of users) {
      usersChecked++;
      const expiringItems: Array<{ type: 'personnel' | 'company'; name: string; level?: string; expiryDate: string }> = [];
      const profileData = user.profileData || {};

      // Check personnel qualifications
      const personnelQuals = profileData.personnelQualifications || user.personnelQualifications || [];
      for (const qual of personnelQuals) {
        if (qual.expiryDate) {
          const expiry = new Date(qual.expiryDate);
          if (expiry > now && expiry <= thirtyDaysFromNow) {
            expiringItems.push({
              type: 'personnel',
              name: qual.certificationBody || 'Unknown',
              level: qual.level,
              expiryDate: qual.expiryDate,
            });
          }
        }
      }

      // Check company certifications
      const companyCerts = profileData.certifications || user.certifications || [];
      for (const cert of companyCerts) {
        if (cert.expiryDate) {
          const expiry = new Date(cert.expiryDate);
          if (expiry > now && expiry <= thirtyDaysFromNow) {
            expiringItems.push({
              type: 'company',
              name: cert.name || 'Unknown',
              expiryDate: cert.expiryDate,
            });
          }
        }
      }

      // Send alert if there are expiring items
      if (expiringItems.length > 0) {
        try {
          await sendCertificationExpiryAlert(
            user.email,
            user.name || user.email,
            expiringItems
          );
          alertsSent++;
          console.log(`Sent expiry alert to ${user.email}: ${expiringItems.length} item(s)`);
        } catch (emailError: any) {
          console.error(`Failed to send alert to ${user.email}:`, emailError.message);
        }
      }
    }

    console.log(`Certification check complete: ${usersChecked} users checked, ${alertsSent} alerts sent`);

    return NextResponse.json({
      success: true,
      usersChecked,
      alertsSent,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Certification expiry check failed:', error);
    return NextResponse.json(
      { error: 'Certification expiry check failed' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
