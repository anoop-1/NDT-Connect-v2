import mongoose, { Schema, model, models } from 'mongoose';

const equipmentSchema = new Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  manufacturer: { type: String, default: '' },
  model: { type: String, default: '' },
  serialNumber: { type: String, required: true },
  calibrationDueDate: { type: Date, default: null },
  lastCalibrationDate: { type: Date, default: null },
  calibrationCertificateUrl: { type: String, default: null },
  status: {
    type: String,
    enum: ['Active', 'In Calibration', 'Out of Service', 'Retired'],
    default: 'Active'
  },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Equipment = models?.Equipment || model('Equipment', equipmentSchema);
