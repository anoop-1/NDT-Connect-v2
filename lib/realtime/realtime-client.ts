/**
 * Real-time Client for Browser
 * WebSocket-based real-time updates with reconnection and state sync
 */

import { InspectionEvent, EventType } from '../events/event-types';

type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'reconnecting';
type MessageHandler = (event: InspectionEvent) => void;

interface RealtimeClientOptions {
    url: string;
    reconnectDelayMs?: number;
    maxReconnectAttempts?: number;
    heartbeatIntervalMs?: number;
}

/**
 * WebSocket-based real-time client for browser
 */
export class RealtimeClient {
    private ws: WebSocket | null = null;
    private state: ConnectionState = 'disconnected';
    private reconnectAttempts = 0;
    private handlers = new Map<EventType, Set<MessageHandler>>();
    private globalHandlers = new Set<MessageHandler>();
    private pendingMessages: InspectionEvent[] = [];
    private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    private readonly options: Required<RealtimeClientOptions>;

    constructor(options: RealtimeClientOptions) {
        this.options = {
            url: options.url,
            reconnectDelayMs: options.reconnectDelayMs || 1000,
            maxReconnectAttempts: options.maxReconnectAttempts || 10,
            heartbeatIntervalMs: options.heartbeatIntervalMs || 30000,
        };
    }

    /**
     * Connect to real-time server
     */
    connect(authToken?: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.state === 'connected') {
                resolve();
                return;
            }

            this.state = 'connecting';
            const url = authToken ? `${this.options.url}?token=${authToken}` : this.options.url;

            try {
                this.ws = new WebSocket(url);

                this.ws.onopen = () => {
                    this.state = 'connected';
                    this.reconnectAttempts = 0;
                    this.startHeartbeat();
                    this.flushPendingMessages();
                    resolve();
                };

                this.ws.onmessage = (event) => {
                    this.handleMessage(event.data);
                };

                this.ws.onclose = () => {
                    this.state = 'disconnected';
                    this.stopHeartbeat();
                    this.scheduleReconnect();
                };

                this.ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    if (this.state === 'connecting') {
                        reject(error);
                    }
                };
            } catch (error) {
                this.state = 'disconnected';
                reject(error);
            }
        });
    }

    /**
     * Disconnect from server
     */
    disconnect(): void {
        this.clearTimers();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.state = 'disconnected';
    }

    /**
     * Subscribe to specific event types
     */
    on(eventType: EventType, handler: MessageHandler): () => void {
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, new Set());
        }
        this.handlers.get(eventType)!.add(handler);

        // Send subscription to server
        this.send({ type: 'subscribe', eventTypes: [eventType] });

        return () => {
            this.handlers.get(eventType)?.delete(handler);
        };
    }

    /**
     * Subscribe to all events
     */
    onAll(handler: MessageHandler): () => void {
        this.globalHandlers.add(handler);
        return () => {
            this.globalHandlers.delete(handler);
        };
    }

    /**
     * Send message to server
     */
    send(message: object): boolean {
        if (this.state !== 'connected' || !this.ws) {
            // Queue for later
            if ('type' in message && message.type !== 'ping') {
                this.pendingMessages.push(message as InspectionEvent);
            }
            return false;
        }

        try {
            this.ws.send(JSON.stringify(message));
            return true;
        } catch (error) {
            console.error('Failed to send message:', error);
            return false;
        }
    }

    /**
     * Get current connection state
     */
    getState(): ConnectionState {
        return this.state;
    }

    /**
     * Check if connected
     */
    isConnected(): boolean {
        return this.state === 'connected';
    }

    // Private methods

    private handleMessage(data: string): void {
        try {
            const event = JSON.parse(data) as InspectionEvent;

            // Notify global handlers
            this.globalHandlers.forEach((handler) => {
                try {
                    handler(event);
                } catch (error) {
                    console.error('Handler error:', error);
                }
            });

            // Notify type-specific handlers
            const typeHandlers = this.handlers.get(event.type);
            if (typeHandlers) {
                typeHandlers.forEach((handler) => {
                    try {
                        handler(event);
                    } catch (error) {
                        console.error('Handler error:', error);
                    }
                });
            }
        } catch (error) {
            console.error('Failed to parse message:', error);
        }
    }

    private scheduleReconnect(): void {
        if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
            console.error('Max reconnect attempts reached');
            return;
        }

        this.state = 'reconnecting';
        const delay = this.options.reconnectDelayMs * Math.pow(2, this.reconnectAttempts);

        this.reconnectTimer = setTimeout(() => {
            this.reconnectAttempts++;
            this.connect().catch(() => {
                console.log(`Reconnect attempt ${this.reconnectAttempts} failed`);
            });
        }, delay);
    }

    private startHeartbeat(): void {
        this.heartbeatTimer = setInterval(() => {
            this.send({ type: 'ping', timestamp: Date.now() });
        }, this.options.heartbeatIntervalMs);
    }

    private stopHeartbeat(): void {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }

    private clearTimers(): void {
        this.stopHeartbeat();
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    }

    private flushPendingMessages(): void {
        while (this.pendingMessages.length > 0) {
            const message = this.pendingMessages.shift()!;
            this.send(message);
        }
    }
}

// React hook for real-time client
export function createRealtimeClient(url: string): RealtimeClient {
    return new RealtimeClient({ url });
}
