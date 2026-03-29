/**
 * Certification & Compliance Service
 * Zero "phantom inspectors" - validates certifications, availability, and geo-presence
 */

import { eventOrchestrator } from '../../lib/events/event-orchestrator';
import { createEvent } from '../../lib/events/event-types';
import { getRedisClient } from '../../lib/redis/redis-service';

export interface Certification {
    id: string;
    inspectorId: string;
    type: string;
    body: string; // ASNT, ISO, etc.
    level: string; // Level I, II, III
    number: string;
    issuedDate: Date;
    expiryDate: Date;
    verificationUrl?: string;
    status: 'active' | 'expired' | 'revoked' | 'pending_verification';
}

export interface ComplianceCheck {
    inspectorId: string;
    timestamp: Date;
    checks: {
        hasCertifications: boolean;
        certificationsValid: boolean;
        isAvailable: boolean;
        hasGeoPresence: boolean;
        passedBackgroundCheck: boolean;
        insuranceValid: boolean;
    };
    overallStatus: 'compliant' | 'non_compliant' | 'pending';
    issues: string[];
}

export interface AuditLogEntry {
    id: string;
    timestamp: Date;
    eventType: string;
    actorId: string;
    actorType: 'inspector' | 'client' | 'admin' | 'system';
    targetType: string;
    targetId: string;
    action: string;
    details: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
}

/**
 * Certification & Compliance Service
 */
export class ComplianceService {
    private certifications = new Map<string, Certification[]>();
    private auditLog: AuditLogEntry[] = [];
    private complianceCache = new Map<string, ComplianceCheck>();

    /**
     * Register certification for inspector
     */
    async registerCertification(cert: Omit<Certification, 'id' | 'status'>): Promise<Certification> {
        const certification: Certification = {
            ...cert,
            id: `cert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            status: 'pending_verification',
        };

        const inspectorCerts = this.certifications.get(cert.inspectorId) || [];
        inspectorCerts.push(certification);
        this.certifications.set(cert.inspectorId, inspectorCerts);

        await this.logAudit({
            eventType: 'CERTIFICATION_REGISTERED',
            actorId: cert.inspectorId,
            actorType: 'inspector',
            targetType: 'certification',
            targetId: certification.id,
            action: 'register',
            details: { type: cert.type, body: cert.body, level: cert.level },
        });

        return certification;
    }

    /**
     * Verify certification (admin action)
     */
    async verifyCertification(certId: string, adminId: string, verified: boolean): Promise<void> {
        for (const [, certs] of this.certifications) {
            const cert = certs.find(c => c.id === certId);
            if (cert) {
                cert.status = verified ? 'active' : 'revoked';

                await this.logAudit({
                    eventType: 'CERTIFICATION_VERIFIED',
                    actorId: adminId,
                    actorType: 'admin',
                    targetType: 'certification',
                    targetId: certId,
                    action: verified ? 'approve' : 'reject',
                    details: { verified },
                });

                // Invalidate compliance cache
                this.complianceCache.delete(cert.inspectorId);
                break;
            }
        }
    }

    /**
     * Check inspector compliance - ensures no "phantom inspectors"
     */
    async checkCompliance(inspectorId: string): Promise<ComplianceCheck> {
        // Check cache first
        const cached = this.complianceCache.get(inspectorId);
        if (cached && Date.now() - cached.timestamp.getTime() < 300000) { // 5 min cache
            return cached;
        }

        const issues: string[] = [];
        const certs = this.certifications.get(inspectorId) || [];

        // Check certifications
        const activeCerts = certs.filter(c => c.status === 'active');
        const hasCertifications = activeCerts.length > 0;
        const certificationsValid = activeCerts.every(c => c.expiryDate > new Date());

        if (!hasCertifications) {
            issues.push('No active certifications');
        }
        if (!certificationsValid) {
            issues.push('One or more certifications expired');
        }

        // Check geo-presence via Redis
        const redis = getRedisClient();
        const location = await redis.getInspectorLocation(inspectorId);
        const hasGeoPresence = location !== null && Date.now() - location.timestamp < 300000; // 5 min

        if (!hasGeoPresence) {
            issues.push('No recent location update');
        }

        // Check availability
        const isAvailable = location?.status === 'available';
        if (!isAvailable && location) {
            issues.push('Inspector not marked as available');
        }

        // Mock checks for demo
        const passedBackgroundCheck = true;
        const insuranceValid = true;

        const check: ComplianceCheck = {
            inspectorId,
            timestamp: new Date(),
            checks: {
                hasCertifications,
                certificationsValid,
                isAvailable,
                hasGeoPresence,
                passedBackgroundCheck,
                insuranceValid,
            },
            overallStatus: issues.length === 0 ? 'compliant' : 'non_compliant',
            issues,
        };

        // Cache result
        this.complianceCache.set(inspectorId, check);

        return check;
    }

    /**
     * Check if inspector can accept jobs
     */
    async canAcceptJobs(inspectorId: string): Promise<{ allowed: boolean; reason?: string }> {
        const compliance = await this.checkCompliance(inspectorId);

        if (compliance.overallStatus !== 'compliant') {
            return {
                allowed: false,
                reason: `Compliance issues: ${compliance.issues.join(', ')}`,
            };
        }

        return { allowed: true };
    }

    /**
     * Get inspector certifications
     */
    getCertifications(inspectorId: string): Certification[] {
        return this.certifications.get(inspectorId) || [];
    }

    /**
     * Get expiring certifications (within days)
     */
    getExpiringCertifications(days: number = 30): Certification[] {
        const threshold = new Date();
        threshold.setDate(threshold.getDate() + days);

        const expiring: Certification[] = [];
        for (const certs of this.certifications.values()) {
            for (const cert of certs) {
                if (cert.status === 'active' && cert.expiryDate <= threshold) {
                    expiring.push(cert);
                }
            }
        }
        return expiring;
    }

    /**
     * Log audit entry
     */
    async logAudit(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void> {
        const logEntry: AuditLogEntry = {
            ...entry,
            id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
        };

        this.auditLog.push(logEntry);

        // Also publish to Kafka for immutable storage
        try {
            await eventOrchestrator.publish(
                createEvent('NOTIFICATION_SENT' as any, {
                    type: 'AUDIT_LOG',
                    entry: logEntry,
                } as any)
            );
        } catch (error: any) {
            console.error('Failed to publish audit log:', error);
        }
    }

    /**
     * Get audit log entries
     */
    getAuditLog(filters?: {
        inspectorId?: string;
        eventType?: string;
        startDate?: Date;
        endDate?: Date;
    }): AuditLogEntry[] {
        let entries = [...this.auditLog];

        if (filters?.inspectorId) {
            entries = entries.filter(e =>
                e.actorId === filters.inspectorId || e.targetId === filters.inspectorId
            );
        }
        if (filters?.eventType) {
            entries = entries.filter(e => e.eventType === filters.eventType);
        }
        if (filters?.startDate) {
            entries = entries.filter(e => e.timestamp >= filters.startDate!);
        }
        if (filters?.endDate) {
            entries = entries.filter(e => e.timestamp <= filters.endDate!);
        }

        return entries.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }

    /**
     * Run daily compliance checks
     */
    async runDailyComplianceChecks(): Promise<{ checked: number; issues: number }> {
        let checked = 0;
        let issues = 0;

        for (const inspectorId of this.certifications.keys()) {
            const result = await this.checkCompliance(inspectorId);
            checked++;
            if (result.overallStatus !== 'compliant') {
                issues++;
            }
        }

        await this.logAudit({
            eventType: 'DAILY_COMPLIANCE_CHECK',
            actorId: 'system',
            actorType: 'system',
            targetType: 'system',
            targetId: 'compliance_check',
            action: 'run',
            details: { checked, issues },
        });

        return { checked, issues };
    }
}

// Singleton instance
export const complianceService = new ComplianceService();
