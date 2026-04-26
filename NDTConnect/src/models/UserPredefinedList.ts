import mongoose, { Schema, type Model } from "mongoose";

export const PREDEFINED_LIST_KEYS = [
  "ndtMethods",
  "equipmentTypes",
  "personnelCertBodies",
  "personnelLevels",
  "companyCertifications",
] as const;
export type PredefinedListKey = (typeof PREDEFINED_LIST_KEYS)[number];

export interface UserPredefinedListDoc {
  _id: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  listKey: PredefinedListKey;
  items: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserPredefinedListSchema = new Schema<UserPredefinedListDoc>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listKey: {
      type: String,
      enum: PREDEFINED_LIST_KEYS,
      required: true,
    },
    items: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

// One document per (user, listKey) — replaces / adds against this row.
UserPredefinedListSchema.index({ ownerId: 1, listKey: 1 }, { unique: true });

const UserPredefinedList: Model<UserPredefinedListDoc> =
  (mongoose.models.UserPredefinedList as Model<UserPredefinedListDoc>) ||
  mongoose.model<UserPredefinedListDoc>(
    "UserPredefinedList",
    UserPredefinedListSchema,
  );

export default UserPredefinedList;
