export interface InspectionEvent { type: string; data: any; timestamp: Date; }
export interface JobCreatedEvent extends InspectionEvent { type: 'job.created'; }
export interface JobAcceptedEvent extends InspectionEvent { type: 'job.accepted'; }
export function createEvent(type: string, data: any): InspectionEvent { return { type, data, timestamp: new Date() }; }
