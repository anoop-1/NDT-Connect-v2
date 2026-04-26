import mongoose, { Schema, type Model } from "mongoose";

export interface CalibrationAlertDoc {
  _id: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  equipmentId: mongoose.Types.ObjectId;
  emailTo: string;
  daysBefore: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CalibrationAlertSchema = new Schema<CalibrationAlertDoc>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    equipmentId: {
      type: Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
      index: true,
    },
    emailTo: { type: String, required: true, trim: true, lowercase: true },
    daysBefore: { type: Number, required: true, min: 1, max: 365, default: 30 },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true },
);

CalibrationAlertSchema.index({ ownerId: 1, equipmentId: 1 });

const CalibrationAlert: Model<CalibrationAlertDoc> =
  (mongoose.models.CalibrationAlert as Model<CalibrationAlertDoc>) ||
  mongoose.model<CalibrationAlertDoc>(
    "CalibrationAlert",
    CalibrationAlertSchema,
  );

export default CalibrationAlert;
