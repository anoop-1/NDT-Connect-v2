/**
 * gRPC Server Implementation
 * Bidirectional streaming for real-time inspection events
 */

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { eventOrchestrator, EventPublisher } from '../events/event-orchestrator';
import { InspectionEvent, EventType } from '../events/event-types';
import { matchInspectorsToJob, estimateETA, geoToH3, H3_RESOLUTION } from '../geo/h3-service';

const PROTO_PATH = path.join(__dirname, '../grpc/proto/inspection.proto');

// Load proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const inspectionProto = protoDescriptor.ndtconnect.inspection;

// Active streams for broadcasting
const activeStreams = new Map<string, grpc.ServerWritableStream<any, any>>();

/**
 * Subscribe to events - server streaming
 */
function subscribeEvents(
    call: grpc.ServerWritableStream<any, any>
): void {
    const subscription = call.request;
    const userId = subscription.user_id;
    const eventTypes = subscription.event_types as EventType[];

    console.log(`Client ${userId} subscribed to events: ${eventTypes.join(', ')}`);

    // Store stream for broadcasting
    activeStreams.set(userId, call);

    // Subscribe to event orchestrator
    const subscriptionId = eventOrchestrator.subscribe(
        userId,
        eventTypes,
        async (event: InspectionEvent) => {
            try {
                call.write({
                    id: event.id,
                    type: event.type,
                    timestamp: event.timestamp,
                    version: event.version,
                    source: event.source,
                    correlation_id: event.correlationId || '',
                    payload: Buffer.from(JSON.stringify((event as any).payload)),
                });
            } catch (error: any) {
                console.error(`Failed to send event to ${userId}:`, error);
            }
        }
    );

    // Handle client disconnect
    call.on('cancelled', () => {
        console.log(`Client ${userId} disconnected`);
        eventOrchestrator.unsubscribe(subscriptionId);
        activeStreams.delete(userId);
    });

    call.on('error', (error: any) => {
        console.error(`Stream error for ${userId}:`, error);
        eventOrchestrator.unsubscribe(subscriptionId);
        activeStreams.delete(userId);
    });
}

/**
 * Publish event from client
 */
function publishEvent(
    call: grpc.ServerUnaryCall<any, any>,
    callback: grpc.sendUnaryData<any>
): void {
    const event = call.request;

    try {
        const payload = JSON.parse(event.payload.toString());

        eventOrchestrator.publish({
            id: event.id,
            type: event.type as EventType,
            timestamp: event.timestamp,
            version: event.version,
            source: event.source,
            correlationId: event.correlation_id,
            payload,
        } as any);

        callback(null, { event_id: event.id, success: true, error: '' });
    } catch (error: any) {
        callback(null, {
            event_id: event.id,
            success: false,
            error: (error as Error).message,
        });
    }
}

/**
 * Bidirectional event stream
 */
function eventStream(
    call: grpc.ServerDuplexStream<any, any>
): void {
    const streamId = `stream_${Date.now()}`;
    console.log(`Bidirectional stream started: ${streamId}`);

    call.on('data', (event: any) => {
        try {
            const payload = JSON.parse(event.payload.toString());

            // Process incoming event
            eventOrchestrator.publish({
                id: event.id,
                type: event.type as EventType,
                timestamp: event.timestamp,
                version: event.version,
                source: event.source,
                correlationId: event.correlation_id,
                payload,
            } as any);

            // Echo acknowledgment
            call.write({
                id: `ack_${event.id}`,
                type: 'EVENT_ACK',
                timestamp: Date.now(),
                version: 1,
                source: 'server',
                payload: Buffer.from(JSON.stringify({ acknowledged: event.id })),
            });
        } catch (error: any) {
            console.error('Error processing event:', error);
        }
    });

    call.on('end', () => {
        console.log(`Stream ended: ${streamId}`);
        call.end();
    });

    call.on('error', (error) => {
        console.error(`Stream error: ${streamId}`, error);
    });
}

/**
 * Stream location updates
 */
function streamLocation(
    call: grpc.ServerDuplexStream<any, any>
): void {
    call.on('data', (update: any) => {
        // Publish location event
        EventPublisher.etaUpdate(
            '', // No job context
            update.inspector_id,
            0,
            1.0
        );

        // Acknowledge
        call.write({
            success: true,
            server_timestamp: Date.now(),
        });
    });

    call.on('end', () => {
        call.end();
    });
}

/**
 * Get nearby inspectors using H3
 */
function getNearbyInspectors(
    call: grpc.ServerUnaryCall<any, any>,
    callback: grpc.sendUnaryData<any>
): void {
    const request = call.request;

    // Mock inspector data - in production, fetch from database
    const mockInspectors = [
        {
            id: 'insp_1',
            name: 'John Smith',
            lat: request.lat + 0.01,
            lng: request.lng + 0.01,
            h3Index: geoToH3({ lat: request.lat + 0.01, lng: request.lng + 0.01 }, H3_RESOLUTION.NEIGHBORHOOD),
            h3Indexes: {},
            status: 'available',
            rating: 4.8,
            certifications: ['ASNT Level II', 'ISO 9712'],
        },
    ];

    const matches = matchInspectorsToJob(
        { lat: request.lat, lng: request.lng },
        mockInspectors,
        {
            maxDistanceKm: request.max_distance_km || 50,
            maxResults: request.max_results || 10,
        }
    );

    const inspectors = matches.map((match) => ({
        id: match.entity.id,
        name: match.entity.name,
        lat: match.entity.lat,
        lng: match.entity.lng,
        distance_km: match.distance,
        eta_minutes: Math.round(match.distance * 2), // Rough ETA estimate
        status: match.entity.status,
        rating: match.entity.rating,
        certifications: match.entity.certifications,
    }));

    callback(null, { inspectors });
}

/**
 * Get ETA for inspector
 */
function getETA(
    call: grpc.ServerUnaryCall<any, any>,
    callback: grpc.sendUnaryData<any>
): void {
    const request = call.request;

    // Mock inspector location - in production, fetch from Redis/database
    const inspectorLocation = { lat: request.destination_lat - 0.05, lng: request.destination_lng - 0.05 };
    const destination = { lat: request.destination_lat, lng: request.destination_lng };

    const eta = estimateETA(inspectorLocation, destination);

    callback(null, {
        eta_minutes: eta.etaMinutes,
        distance_km: eta.distanceKm,
        confidence: eta.confidence,
        route_polyline: '', // Would come from routing service
    });
}

/**
 * Start gRPC server
 */
export function startGrpcServer(port: number = 50051): grpc.Server {
    const server = new grpc.Server();

    // Add services
    server.addService(inspectionProto.InspectionEventService.service, {
        subscribeEvents,
        publishEvent,
        eventStream,
    });

    server.addService(inspectionProto.LocationService.service, {
        streamLocation,
        getNearbyInspectors,
        getETA,
    });

    server.bindAsync(
        `0.0.0.0:${port}`,
        grpc.ServerCredentials.createInsecure(),
        (error, boundPort) => {
            if (error) {
                console.error('Failed to start gRPC server:', error);
                return;
            }
            console.log(`gRPC server running on port ${boundPort}`);
        }
    );

    return server;
}

export { activeStreams };
