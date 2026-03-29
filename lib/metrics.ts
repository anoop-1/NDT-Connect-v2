// Metrics storage (in production, use prom-client library)
export const metrics = {
    http_requests_total: new Map<string, number>(),
    http_request_duration_seconds: new Map<string, number[]>(),
    active_connections: 0,
    events_published_total: 0,
    events_delivered_total: 0,
    kafka_messages_produced: 0,
    kafka_messages_consumed: 0,
    inspectors_online: 0,
    jobs_active: 0,
    inspections_in_progress: 0,
};

export function incrementHttpRequests(path: string): void {
    const current = metrics.http_requests_total.get(path) || 0;
    metrics.http_requests_total.set(path, current + 1);
}

export function setActiveConnections(count: number): void {
    metrics.active_connections = count;
}

export function incrementEventsPublished(): void {
    metrics.events_published_total++;
}

export function incrementEventsDelivered(): void {
    metrics.events_delivered_total++;
}

export function setInspectorsOnline(count: number): void {
    metrics.inspectors_online = count;
}

export function setJobsActive(count: number): void {
    metrics.jobs_active = count;
}

export function setInspectionsInProgress(count: number): void {
    metrics.inspections_in_progress = count;
}
