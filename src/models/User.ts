import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['client', 'provider', 'admin', 'inspector'], required: true },
  name: { type: String, required: true },
  isDemo: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  profileImageUrl: { type: String, default: null },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);