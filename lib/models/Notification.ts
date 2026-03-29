import mongoose, { Schema, model, models } from 'mongoose';

const notificationSchema = new Schema({
  userId: { type: String, required: true, index: true },
  type: {
    type: String,
    enum: ['calibration_due', 'cert_expiring', 'new_request', 'request_update', 'system', 'admin'],
    required: true
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  link: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

export const Notification = models?.Notification || model('Notification', notificationSchema);
