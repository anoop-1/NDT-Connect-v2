/**
 * Dispatch & Matching Service
 * Handles inspector-job matching using H3 spatial indexing
 */

import { matchInspectorsToJob, geoToH3, estimateETA, H3_RESOLUTION, IndexedEntity, GeoLocation } from '../geo/h3-service';
import { eventOrchestrator, EventPublisher } from '../events/event-orchestrator';
import { createEvent, JobCreatedEvent, JobAcceptedEvent } from '../events/event-types';
import { getRedisClient } from '../redis/redis-service';

export interface Job {
    id: string;
    clientId: string;
    serviceType: string;
    location: GeoLocation & { address: string };
    requestedDate: Date;
    priority: 'normal' | 'urgent' | 'emergency';
    requirements: string[];
    status: 'pending' | 'assigned' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
    assignedInspectorId?: string;
    createdAt: Date;
}

export interface Inspector extends IndexedEntity {
    name: string;
    status: 'available' | 'busy' | 'offline';
    certifications: string[];
    serviceTypes: string[];
    rating: number;
    completedJobs: number;
    currentJobId?: string;
}

interface DispatchResult {
    success: boolean;
    jobId: string;
    assignedInspector?: Inspector;
    etaMinutes?: number;
    error?: string;
}

/**
 * Dispatch Service - matches inspectors to jobs
 */
export class DispatchService {
    private pendingJobs = new Map<string, Job>();
    private activeInspectors = new Map<string, Inspector>();

    /**
     * Register an inspector as available
     */
    async registerInspector(inspector: Inspector): Promise<void> {
        // Add H3 index for spatial queries
        inspector.h3Index = geoToH3(inspector, H3_RESOLUTION.NEIGHBORHOOD);
        this.activeInspectors.set(inspector.id, inspector);

        // Cache in Redis for distributed access
        const redis = getRedisClient();
        await redis.setInspectorLocation(inspector.id, {
            lat: inspector.lat,
            lng: inspector.lng,
            h3Index: inspector.h3Index,
            status: inspector.status,
            timestamp: Date.now(),
        });

        // Publish availability event
        await eventOrchestrator.publish(
            createEvent('INSPECTOR_AVAILABLE' as any, {
                inspectorId: inspector.id,
                location: { lat: inspector.lat, lng: inspector.lng },
                h3Index: inspector.h3Index,
            })
        );
    }

    /**
     * Update inspector location
     */
    async updateInspectorLocation(inspectorId: string, location: GeoLocation): Promise<void> {
        const inspector = this.activeInspectors.get(inspectorId);
        if (!inspector) return;

        inspector.lat = location.lat;
        inspector.lng = location.lng;
        inspector.h3Index = geoToH3(location, H3_RESOLUTION.NEIGHBORHOOD);

        // Update Redis cache
        const redis = getRedisClient();
        await redis.setInspectorLocation(inspectorId, {
            lat: location.lat,
            lng: location.lng,
            h3Index: inspector.h3Index,
            status: inspector.status,
            timestamp: Date.now(),
        });
    }

    /**
     * Dispatch a job to the best available inspector
     */
    async dispatchJob(job: Job): Promise<DispatchResult> {
        // Store pending job
        this.pendingJobs.set(job.id, job);

        // Publish job created event
        await eventOrchestrator.publish(
            createEvent('JOB_CREATED' as any, {
                jobId: job.id,
                clientId: job.clientId,
                serviceType: job.serviceType,
                location: job.location,
                requestedDate: job.requestedDate.toISOString(),
                priority: job.priority,
                requirements: job.requirements,
            })
        );

        // Find available inspectors
        const availableInspectors = Array.from(this.activeInspectors.values())
            .filter(i => i.status === 'available')
            .filter(i => i.serviceTypes.includes(job.serviceType))
            .filter(i => this.meetsRequirements(i, job.requirements));

        if (availableInspectors.length === 0) {
            return {
                success: false,
                jobId: job.id,
                error: 'No available inspectors matching requirements',
            };
        }

        // Use H3 to find nearest inspectors
        const matches = matchInspectorsToJob(job.location, availableInspectors, {
            maxDistanceKm: this.getMaxDistanceByPriority(job.priority),
            maxResults: 5,
        });

        if (matches.length === 0) {
            return {
                success: false,
                jobId: job.id,
                error: 'No inspectors within acceptable distance',
            };
        }

        // Select best inspector (nearest + highest rating)
        const bestMatch = this.selectBestInspector(matches);
        const selectedInspector = bestMatch.entity;

        // Calculate ETA
        const eta = estimateETA(selectedInspector, job.location);

        // Assign job
        job.assignedInspectorId = selectedInspector.id;
        job.status = 'assigned';
        selectedInspector.status = 'busy';
        selectedInspector.currentJobId = job.id;

        // Publish job assigned event
        await EventPublisher.jobAccepted(
            job.id,
            selectedInspector.id,
            selectedInspector.name,
            eta.etaMinutes
        );

        return {
            success: true,
            jobId: job.id,
            assignedInspector: selectedInspector,
            etaMinutes: eta.etaMinutes,
        };
    }

    /**
     * Handle inspector response to job assignment
     */
    async handleInspectorResponse(
        jobId: string,
        inspectorId: string,
        accepted: boolean,
        rejectionReason?: string
    ): Promise<void> {
        const job = this.pendingJobs.get(jobId);
        if (!job) return;

        if (accepted) {
            job.status = 'accepted';
            await eventOrchestrator.publish(
                createEvent('JOB_ACCEPTED' as any, {
                    jobId,
                    inspectorId,
                    inspectorName: this.activeInspectors.get(inspectorId)?.name || '',
                    estimatedArrival: new Date(Date.now() + 30 * 60000).toISOString(),
                    etaMinutes: 30,
                })
            );
        } else {
            // Reject and try next inspector
            await eventOrchestrator.publish(
                createEvent('JOB_REJECTED' as any, {
                    jobId,
                    inspectorId,
                    reason: rejectionReason || 'Declined',
                })
            );

            // Try dispatching to another inspector
            const inspector = this.activeInspectors.get(inspectorId);
            if (inspector) {
                inspector.status = 'available';
                inspector.currentJobId = undefined;
            }

            // Re-dispatch (exclude rejected inspector)
            await this.dispatchJob(job);
        }
    }

    /**
     * Get available inspectors for a location
     */
    getAvailableInspectors(
        location: GeoLocation,
        serviceType?: string,
        maxDistance: number = 50
    ): Inspector[] {
        let inspectors = Array.from(this.activeInspectors.values())
            .filter(i => i.status === 'available');

        if (serviceType) {
            inspectors = inspectors.filter(i => i.serviceTypes.includes(serviceType));
        }

        const matches = matchInspectorsToJob(location, inspectors, {
            maxDistanceKm: maxDistance,
            maxResults: 20,
        });

        return matches.map(m => m.entity);
    }

    // Private helpers

    private meetsRequirements(inspector: Inspector, requirements: string[]): boolean {
        return requirements.every(req =>
            inspector.certifications.some(cert =>
                cert.toLowerCase().includes(req.toLowerCase())
            )
        );
    }

    private getMaxDistanceByPriority(priority: Job['priority']): number {
        switch (priority) {
            case 'emergency': return 100;
            case 'urgent': return 75;
            default: return 50;
        }
    }

    private selectBestInspector(
        matches: Array<{ entity: Inspector; distance: number }>
    ): { entity: Inspector; distance: number } {
        // Score based on distance (60%) and rating (40%)
        return matches.reduce((best, current) => {
            const bestScore = (1 / best.distance) * 0.6 + best.entity.rating * 0.08;
            const currentScore = (1 / current.distance) * 0.6 + current.entity.rating * 0.08;
            return currentScore > bestScore ? current : best;
        });
    }
}

// Singleton instance
export const dispatchService = new DispatchService();
