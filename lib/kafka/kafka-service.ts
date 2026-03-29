/**
 * Kafka Event Producer and Consumer
 * Event streaming for NDTConnect real-time architecture
 */

import { Kafka, Producer, Consumer, EachMessagePayload, logLevel } from 'kafkajs';
import { InspectionEvent, EventType } from '../events/event-types';
import { eventOrchestrator } from '../events/event-orchestrator';

// Kafka topics for different event categories
export const KAFKA_TOPICS = {
    JOB_EVENTS: 'ndtconnect.jobs',
    LOCATION_EVENTS: 'ndtconnect.locations',
    INSPECTION_EVENTS: 'ndtconnect.inspections',
    DEFECT_EVENTS: 'ndtconnect.defects',
    REPORT_EVENTS: 'ndtconnect.reports',
    NOTIFICATION_EVENTS: 'ndtconnect.notifications',
    AUDIT_LOG: 'ndtconnect.audit',
} as const;

// Event type to topic mapping
const EVENT_TOPIC_MAP: Record<string, string> = {
    JOB_CREATED: KAFKA_TOPICS.JOB_EVENTS,
    JOB_ACCEPTED: KAFKA_TOPICS.JOB_EVENTS,
    JOB_REJECTED: KAFKA_TOPICS.JOB_EVENTS,
    JOB_CANCELLED: KAFKA_TOPICS.JOB_EVENTS,
    JOB_ASSIGNED: KAFKA_TOPICS.JOB_EVENTS,
    INSPECTOR_LOCATION_UPDATE: KAFKA_TOPICS.LOCATION_EVENTS,
    INSPECTOR_GEOFENCE_ENTER: KAFKA_TOPICS.LOCATION_EVENTS,
    INSPECTOR_GEOFENCE_EXIT: KAFKA_TOPICS.LOCATION_EVENTS,
    INSPECTION_STARTED: KAFKA_TOPICS.INSPECTION_EVENTS,
    INSPECTION_PAUSED: KAFKA_TOPICS.INSPECTION_EVENTS,
    INSPECTION_RESUMED: KAFKA_TOPICS.INSPECTION_EVENTS,
    INSPECTION_COMPLETED: KAFKA_TOPICS.INSPECTION_EVENTS,
    DEFECT_DETECTED: KAFKA_TOPICS.DEFECT_EVENTS,
    RBI_THRESHOLD_BREACH: KAFKA_TOPICS.DEFECT_EVENTS,
    REPORT_SUBMITTED: KAFKA_TOPICS.REPORT_EVENTS,
    REPORT_APPROVED: KAFKA_TOPICS.REPORT_EVENTS,
};

interface KafkaConfig {
    brokers: string[];
    clientId: string;
    groupId?: string;
}

/**
 * Kafka Event Streaming Service
 */
export class KafkaEventService {
    private kafka: Kafka;
    private producer: Producer | null = null;
    private consumers: Map<string, Consumer> = new Map();
    private isConnected = false;

    constructor(config: KafkaConfig) {
        this.kafka = new Kafka({
            clientId: config.clientId,
            brokers: config.brokers,
            logLevel: logLevel.WARN,
            retry: {
                initialRetryTime: 100,
                retries: 8,
            },
        });
    }

    /**
     * Connect producer
     */
    async connectProducer(): Promise<void> {
        if (this.producer) return;

        this.producer = this.kafka.producer({
            allowAutoTopicCreation: true,
            transactionTimeout: 30000,
        });

        await this.producer.connect();
        this.isConnected = true;
        console.log('Kafka producer connected');
    }

    /**
     * Disconnect producer
     */
    async disconnectProducer(): Promise<void> {
        if (this.producer) {
            await this.producer.disconnect();
            this.producer = null;
            this.isConnected = false;
        }
    }

    /**
     * Publish event to Kafka
     */
    async publishEvent(event: InspectionEvent): Promise<void> {
        if (!this.producer || !this.isConnected) {
            throw new Error('Kafka producer not connected');
        }

        const topic = EVENT_TOPIC_MAP[event.type] || KAFKA_TOPICS.AUDIT_LOG;

        await this.producer.send({
            topic,
            messages: [
                {
                    key: event.id,
                    value: JSON.stringify(event),
                    headers: {
                        eventType: event.type,
                        timestamp: event.timestamp.toString(),
                        version: event.version.toString(),
                    },
                },
            ],
        });

        // Also publish to audit log for compliance
        await this.producer.send({
            topic: KAFKA_TOPICS.AUDIT_LOG,
            messages: [
                {
                    key: event.id,
                    value: JSON.stringify({
                        ...event,
                        auditTimestamp: Date.now(),
                    }),
                },
            ],
        });
    }

    /**
     * Subscribe to topic with consumer
     */
    async subscribe(
        groupId: string,
        topics: string[],
        handler: (event: InspectionEvent) => Promise<void>
    ): Promise<void> {
        const consumer = this.kafka.consumer({ groupId });
        await consumer.connect();

        for (const topic of topics) {
            await consumer.subscribe({ topic, fromBeginning: false });
        }

        await consumer.run({
            eachMessage: async ({ message }: EachMessagePayload) => {
                if (!message.value) return;

                try {
                    const event = JSON.parse(message.value.toString()) as InspectionEvent;
                    await handler(event);
                } catch (error: any) {
                    console.error('Error processing Kafka message:', error);
                }
            },
        });

        this.consumers.set(groupId, consumer);
        console.log(`Kafka consumer ${groupId} subscribed to: ${topics.join(', ')}`);
    }

    /**
     * Disconnect all consumers
     */
    async disconnectConsumers(): Promise<void> {
        for (const [groupId, consumer] of this.consumers) {
            await consumer.disconnect();
            console.log(`Kafka consumer ${groupId} disconnected`);
        }
        this.consumers.clear();
    }

    /**
     * Disconnect all
     */
    async disconnect(): Promise<void> {
        await this.disconnectProducer();
        await this.disconnectConsumers();
    }
}

// Singleton instance
let kafkaService: KafkaEventService | null = null;

/**
 * Get or create Kafka service instance
 */
export function getKafkaService(): KafkaEventService {
    if (!kafkaService) {
        kafkaService = new KafkaEventService({
            brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
            clientId: 'ndtconnect-app',
        });
    }
    return kafkaService;
}

/**
 * Initialize Kafka with event orchestrator integration
 */
export async function initializeKafka(): Promise<void> {
    const kafka = getKafkaService();
    await kafka.connectProducer();

    // Subscribe to all job events and forward to orchestrator
    await kafka.subscribe(
        'ndtconnect-event-processor',
        [KAFKA_TOPICS.JOB_EVENTS, KAFKA_TOPICS.INSPECTION_EVENTS],
        async (event) => {
            // Forward to event orchestrator for WebSocket clients
            await eventOrchestrator.publish(event);
        }
    );

    console.log('Kafka initialized and integrated with event orchestrator');
}

/**
 * Publish event through Kafka
 */
export async function publishToKafka(event: InspectionEvent): Promise<void> {
    const kafka = getKafkaService();
    await kafka.publishEvent(event);
}
