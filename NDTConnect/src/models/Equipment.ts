import mongoose, { Schema, type Model } from "mongoose";

export const EQUIPMENT_STATUSES = [
  "Active",
  "In Calibration",
  "Out of Service",
  "Retired",
] as const;
export type EquipmentStatus = (typeof EQUIPMENT_STATUSES)[number];

export interface EquipmentDoc {
  _id: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  name: string;
  type: string;
  manufacturer?: string;
  model?: string;
  serialNumber: string;
  calibrationDueDate?: Date | null;
  status: EquipmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EquipmentSchema = new Schema<EquipmentDoc>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    manufacturer: { type: String, default: "", trim: true },
    model: { type: String, default: "", trim: true },
    serialNumber: { type: String, required: true, trim: true },
    calibrationDueDate: { type: Date, default: null },
    status: {
      type: String,
      enum: EQUIPMENT_STATUSES,
      required: true,
      default: "Active",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

EquipmentSchema.index({ ownerId: 1, createdAt: -1 });

const Equipment: Model<EquipmentDoc> =
  (mongoose.models.Equipment as Model<EquipmentDoc>) ||
  mongoose.model<EquipmentDoc>("Equipment", EquipmentSchema);

export default Equipment;
