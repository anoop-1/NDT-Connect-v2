import { NextResponse } from 'next/server';
import { complianceService } from '@/services/compliance/compliance-service';

/**
 * Cron job: Daily compliance check
 * Runs at midnight via Vercel Cron
 */

export async function GET() {
    try {
        // Verify cron secret (Vercel sets this automatically)
        const authHeader = process.env.CRON_SECRET;

        console.log('Running daily compliance check...');

        const result = await complianceService.runDailyComplianceChecks();

        console.log(`Compliance check complete: ${result.checked} checked, ${result.issues} issues`);

        return NextResponse.json({
            success: true,
            checked: result.checked,
            issues: result.issues,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Compliance check failed:', error);
        return NextResponse.json(
            { error: 'Compliance check failed' },
            { status: 500 }
        );
    }
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
