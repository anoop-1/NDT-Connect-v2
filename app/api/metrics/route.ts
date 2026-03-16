import { NextResponse } from 'next/server';

/**
 * Prometheus metrics endpoint
 * Exposes application metrics in Prometheus format
 */

// Metrics storage (in production, use prom-client library)
const metrics = {
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

export async function GET() {
    const output = [
        '# HELP http_requests_total Total number of HTTP requests',
        '# TYPE http_requests_total counter',
        ...Array.from(metrics.http_requests_total.entries()).map(
            ([path, count]) => `http_requests_total{path="${path}"} ${count}`
        ),
        '',
        '# HELP active_connections Number of active WebSocket connections',
        '# TYPE active_connections gauge',
        `active_connections ${metrics.active_connections}`,
        '',
        '# HELP events_published_total Total events published to orchestrator',
        '# TYPE events_published_total counter',
        `events_published_total ${metrics.events_published_total}`,
        '',
        '# HELP events_delivered_total Total events delivered to subscribers',
        '# TYPE events_delivered_total counter',
        `events_delivered_total ${metrics.events_delivered_total}`,
        '',
        '# HELP kafka_messages_produced Total Kafka messages produced',
        '# TYPE kafka_messages_produced counter',
        `kafka_messages_produced ${metrics.kafka_messages_produced}`,
        '',
        '# HELP kafka_messages_consumed Total Kafka messages consumed',
        '# TYPE kafka_messages_consumed counter',
        `kafka_messages_consumed ${metrics.kafka_messages_consumed}`,
        '',
        '# HELP inspectors_online Current number of online inspectors',
        '# TYPE inspectors_online gauge',
        `inspectors_online ${metrics.inspectors_online}`,
        '',
        '# HELP jobs_active Current number of active jobs',
        '# TYPE jobs_active gauge',
        `jobs_active ${metrics.jobs_active}`,
        '',
        '# HELP inspections_in_progress Current number of inspections in progress',
        '# TYPE inspections_in_progress gauge',
        `inspections_in_progress ${metrics.inspections_in_progress}`,
        '',
        '# HELP nodejs_heap_size_used_bytes Node.js heap size used',
        '# TYPE nodejs_heap_size_used_bytes gauge',
        `nodejs_heap_size_used_bytes ${process.memoryUsage().heapUsed}`,
        '',
        '# HELP nodejs_heap_size_total_bytes Node.js total heap size',
        '# TYPE nodejs_heap_size_total_bytes gauge',
        `nodejs_heap_size_total_bytes ${process.memoryUsage().heapTotal}`,
        '',
        '# HELP process_uptime_seconds Process uptime in seconds',
        '# TYPE process_uptime_seconds gauge',
        `process_uptime_seconds ${process.uptime()}`,
    ].join('\n');

    return new NextResponse(output, {
        headers: {
            'Content-Type': 'text/plain; version=0.0.4; charset=utf-8',
        },
    });
}

// Helpers to update metrics

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
