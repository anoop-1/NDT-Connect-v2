import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { CalibrationAlert } from '@/lib/models/CalibrationAlert';
import { Equipment } from '@/lib/models/Equipment';
import { User } from '@/lib/models/User';
import { ObjectId } from 'mongodb';
import { sendCalibrationAlert } from '@/lib/email';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export async function GET() {
    try {
        await dbConnect();

        const alerts = await CalibrationAlert.find({ enabled: true });
        let sent = 0;
        let skipped = 0;

        for (const alert of alerts) {
            try {
                if (!alert.equipmentId || !ObjectId.isValid(alert.equipmentId)) {
                    skipped++;
                    continue;
                }

                const eq = await Equipment.findById(new ObjectId(alert.equipmentId));
                if (!eq || !eq.calibrationDueDate || eq.status === 'Retired') {
                    skipped++;
                    continue;
                }

                const now = new Date();
                const due = new Date(eq.calibrationDueDate);
                const daysRemaining = Math.floor((due.getTime() - now.getTime()) / MS_PER_DAY);
                const reminderDays = alert.reminderDays ?? 30;

                if (daysRemaining > reminderDays) {
                    skipped++;
                    continue;
                }

                if (alert.lastNotified) {
                    const sinceLast = (now.getTime() - new Date(alert.lastNotified).getTime()) / MS_PER_DAY;
                    if (sinceLast < 7) {
                        skipped++;
                        continue;
                    }
                }

                let emailTo = alert.emailTo;
                if (!emailTo && alert.userId) {
                    const u = await User.findById(alert.userId).select('email');
                    emailTo = u?.email;
                }
                if (!emailTo) {
                    skipped++;
                    continue;
                }

                await sendCalibrationAlert(
                    emailTo,
                    eq.name || alert.equipmentName || 'Equipment',
                    eq.serialNumber || '',
                    eq.calibrationDueDate,
                    daysRemaining
                );

                alert.lastNotified = now;
                alert.updatedAt = now;
                await alert.save();
                sent++;
            } catch (err) {
                console.error('Calibration alert send failed:', err);
                skipped++;
            }
        }

        return NextResponse.json({ success: true, sent, skipped, timestamp: new Date().toISOString() });
    } catch (error: any) {
        console.error('Calibration cron failed:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
