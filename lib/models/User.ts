// models/User.ts
import mongoose, { Schema, model, models } from 'mongoose';

const baseUserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  role: {
    type: String,
    enum: ['client', 'provider', 'inspector', 'admin'],
    required: [true, 'Role is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  profileImageUrl: {
    type: String,
    default: null,
  },
  profileData: {
    type: Schema.Types.Mixed,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true,
  },  
});

export const User = models?.User || model('User', baseUserSchema);
