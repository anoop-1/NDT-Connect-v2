import mongoose, { Schema, model, models } from 'mongoose';

/**
 * Sliding-window rate-limit counter.
 *  - scope: 'anon' | 'user' | 'global'
 *  - key:   IP-hash, userId, or fixed string ('global') depending on scope
 *  - requests: array of Date timestamps (one per consumed request)
 *  - updatedAt: TTL anchor (auto-expires the document 30 days after last write)
 */
const rateLimitSchema = new Schema({
  scope: {
    type: String,
    enum: ['anon', 'user', 'global', 'login'],
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  requests: {
    type: [Date],
    default: [],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound uniqueness — one document per (scope, key).
rateLimitSchema.index({ scope: 1, key: 1 }, { unique: true });
// TTL: drop docs 30 days after last update to keep collection bounded.
rateLimitSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

export const RateLimit = models?.RateLimit || model('RateLimit', rateLimitSchema);
