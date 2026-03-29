import mongoose, { Schema, model, models } from 'mongoose';

const skillEntrySchema = new Schema({
  method: { type: String, required: true }, // e.g. "RT", "UT", "MT", "PT"
  methodFullName: { type: String, required: true },
  level: { type: String, enum: ['Trainee', 'Level I', 'Level II', 'Level III'], required: true },
  certificationBody: { type: String, default: '' },
  certificationNumber: { type: String, default: '' },
  expiryDate: { type: Date, default: null },
  yearsExperience: { type: Number, default: 0 },
  notes: { type: String, default: '' },
}, { _id: false });

const skillMatrixSchema = new Schema({
  userId: { type: String, required: true, unique: true, index: true },
  skills: [skillEntrySchema],
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const SkillMatrix = models?.SkillMatrix || model('SkillMatrix', skillMatrixSchema);
