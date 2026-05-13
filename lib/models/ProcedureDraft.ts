import mongoose, { Schema, model, models } from 'mongoose';

/**
 * AI-generated NDT procedure draft.
 * Anonymous drafts expire after 7 days unless claimed by a signed-up user.
 */
const procedureDraftSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  params: {
    type: Schema.Types.Mixed,
    default: {},
  },
  ipHash: {
    type: String,
    default: null,
    index: true,
  },
  userId: {
    type: String,
    default: null,
    index: true,
  },
  source: {
    type: String,
    enum: ['groq_ai', 'template', 'template_fallback'],
    default: 'template',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
});

// TTL on expiresAt — Mongo will purge once the timestamp is reached.
procedureDraftSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const ProcedureDraft =
  models?.ProcedureDraft || model('ProcedureDraft', procedureDraftSchema);
