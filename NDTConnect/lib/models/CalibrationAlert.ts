import mongoose, { Schema, model, models } from 'mongoose';

const calibrationAlertSchema = new Schema({
  userId: { type: String, required: true, index: true },
  equipmentId: { type: String, required: true },
  equipmentName: { type: String, required: true },
  reminderDays: { type: Number, default: 30 },
  enabled: { type: Boolean, default: true },
  lastNotified: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const CalibrationAlert = models?.CalibrationAlert || model('CalibrationAlert', calibrationAlertSchema);
