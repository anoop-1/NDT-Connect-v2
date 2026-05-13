/**
 * Cron job: Daily certification expiry alerts
 *
 * Scans each user's profileData.personnelQualifications and
 * profileData.certifications for upcoming expiries and emails the
 * user via the existing iRedMail transporter.
 *
 * Trigger windows (daysRemaining): 30, 14, 7, 3, 1, 0, -1
 * Throttle: skip cert if it was emailed within the last 7 days.
 *
 * Manual test (requires CRON_SECRET):
 *   curl -X GET https://ndt-connect.com/api/cron/cert-expiry-alerts \
 *     -H "Authorization: Bearer $CRON_SECRET"
 */

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { sendCertExpiryAlert } from '@/lib/email';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const TRIGGER_DAYS = new Set<number>([30, 14, 7, 3, 1, 0, -1]);
const THROTTLE_DAYS = 7;

function parseDate(d: unknown): Date | null {
    if (!d) return null;
    try {
        const dt = new Date(d as any);
        if (isNaN(dt.getTime())) return null;
        return dt;
    } catch {
        return null;
    }
}

function buildCertName(cert: any, kind: 'personnel' | 'company'): string {
    if (kind === 'personnel') {
        const body = cert?.certificationBody || '';
        const level = cert?.level || '';
        const combined = [body, level].filter(Boolean).join(' ');
        return combined || 'Personnel Qualification';
    }
    return cert?.name || 'Company Certification';
}

export async function GET(request: NextRequest) {
    try {
        // Vercel Cron sends Authorization: Bearer <CRON_SECRET>.
        // Enforce only if CRON_SECRET is configured (dev convenience).
        const cronSecret = process.env.CRON_SECRET;
        if (cronSecret) {
            const authHeader = request.headers.get('authorization') || '';
            if (authHeader !== `Bearer ${cronSecret}`) {
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    { status: 401 }
                );
            }
        }

        await dbConnect();

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ndt-connect.com';
        const dashboardUrl = `${baseUrl}/dashboard`;
        const now = new Date();

        // Find users that have at least one cert/qual entry.
        const users = await User.find({
            isActive: { $ne: false },
            $or: [
                { 'profileData.personnelQualifications.0': { $exists: true } },
                { 'profileData.certifications.0': { $exists: true } },
            ],
        });

        let processed = 0;
        let sent = 0;
        let skipped = 0;

        for (const user of users) {
            const profileData = user.profileData || {};
            const personnel: any[] = Array.isArray(profileData.personnelQualifications)
                ? profileData.personnelQualifications
                : [];
            const company: any[] = Array.isArray(profileData.certifications)
                ? profileData.certifications
                : [];

            const email: string | undefined = user.email;
            const recipientName: string = user.name || 'there';
            const companyName: string =
                profileData.companyName || user.name || 'Your organization';

            if (!email) {
                skipped += personnel.length + company.length;
                continue;
            }

            let userDirty = false;

            const handleList = async (
                list: any[],
                kind: 'personnel' | 'company',
                listPath: string
            ) => {
                for (let i = 0; i < list.length; i++) {
                    const entry = list[i];
                    if (!entry || typeof entry !== 'object') {
                        skipped++;
                        continue;
                    }
                    processed++;

                    const expiry = parseDate(entry.expiryDate);
                    if (!expiry) {
                        skipped++;
                        continue;
                    }

                    const daysRemaining = Math.floor(
                        (expiry.getTime() - now.getTime()) / MS_PER_DAY
                    );

                    if (!TRIGGER_DAYS.has(daysRemaining)) {
                        skipped++;
                        continue;
                    }

                    const lastNotified = parseDate(entry.lastNotifiedExpiry);
                    if (lastNotified) {
                        const sinceLast =
                            (now.getTime() - lastNotified.getTime()) / MS_PER_DAY;
                        if (sinceLast < THROTTLE_DAYS) {
                            skipped++;
                            continue;
                        }
                    }

                    const certName = buildCertName(entry, kind);
                    const personOrCompany =
                        kind === 'personnel'
                            ? recipientName
                            : companyName;

                    try {
                        await sendCertExpiryAlert({
                            to: email,
                            recipientName,
                            certType: kind,
                            personOrCompany,
                            certName,
                            expiryDate: expiry,
                            daysRemaining,
                            dashboardUrl,
                        });

                        entry.lastNotifiedExpiry = now;
                        list[i] = entry;
                        userDirty = true;
                        sent++;
                    } catch (err) {
                        console.error(
                            `Cert expiry email failed for user ${user._id} (${listPath}[${i}]):`,
                            err
                        );
                        skipped++;
                    }
                }
            };

            await handleList(personnel, 'personnel', 'profileData.personnelQualifications');
            await handleList(company, 'company', 'profileData.certifications');

            if (userDirty) {
                profileData.personnelQualifications = personnel;
                profileData.certifications = company;
                user.profileData = profileData;
                user.updatedAt = now;
                user.markModified('profileData');
                try {
                    await user.save();
                } catch (err) {
                    console.error(
                        `Failed to persist lastNotifiedExpiry for user ${user._id}:`,
                        err
                    );
                }
            }
        }

        return NextResponse.json({
            success: true,
            processed,
            sent,
            skipped,
            timestamp: now.toISOString(),
        });
    } catch (error: any) {
        console.error('Cert expiry cron failed:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Unknown error' },
            { status: 500 }
        );
    }
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
