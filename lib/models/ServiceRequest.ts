// models/ServiceRequest.ts
import mongoose, { Schema, model, models } from 'mongoose';

const serviceRequestSchema = new Schema({
  clientId: {
    type: String,
    required: [true, 'Client ID is required'],
  },
  clientName: {
    type: String,
    default: null,
  },
  clientEmail: {
    type: String,
    default: null,
  },
  providerId: {
    type: String,
    default: null,
  },
  providerName: {
    type: String,
    default: null,
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  requestedDate: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  estimatedCost: {
    type: Number,
    default: null,
  },
  fileAttachmentUrl: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const ServiceRequest = models?.ServiceRequest || model('ServiceRequest', serviceRequestSchema);
