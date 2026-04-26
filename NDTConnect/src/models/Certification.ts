import mongoose, { Schema, type Model } from "mongoose";

export const CERTIFICATION_KINDS = ["personnel", "company"] as const;
export type CertificationKind = (typeof CERTIFICATION_KINDS)[number];

export interface CertificationDoc {
  _id: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  kind: CertificationKind;
  // personnel-only
  personName?: string;
  method?: string;
  level?: string;
  body?: string;
  // company-only
  certName?: string;
  // shared
  expiryDate: Date;
  issuedDate?: Date | null;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema = new Schema<CertificationDoc>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    kind: {
      type: String,
      enum: CERTIFICATION_KINDS,
      required: true,
      index: true,
    },
    personName: { type: String, default: "", trim: true },
    method: { type: String, default: "", trim: true },
    level: { type: String, default: "", trim: true },
    body: { type: String, default: "", trim: true },
    certName: { type: String, default: "", trim: true },
    expiryDate: { type: Date, required: true },
    issuedDate: { type: Date, default: null },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

CertificationSchema.index({ ownerId: 1, kind: 1, expiryDate: 1 });

const Certification: Model<CertificationDoc> =
  (mongoose.models.Certification as Model<CertificationDoc>) ||
  mongoose.model<CertificationDoc>("Certification", CertificationSchema);

export default Certification;
