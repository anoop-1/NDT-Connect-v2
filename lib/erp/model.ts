import mongoose, { Schema, model, models } from 'mongoose';

/** One collection for all ERP modules; every query is scoped by ownerId. */
const recordSchema = new Schema({
  ownerId: { type: String, required: true },
  module: { type: String, required: true },
  number: { type: String, required: true },
  status: { type: String, default: '' },
  title: { type: String, default: '' },          // denormalised display name for search + ref pickers
  data: { type: Schema.Types.Mixed, default: {} },
  totals: { type: Schema.Types.Mixed, default: null },
  source: { type: Schema.Types.Mixed, default: null }, // { module, id, number } when converted
  history: [{ at: Date, status: String, note: String }],
}, { timestamps: true, minimize: false });
recordSchema.index({ ownerId: 1, module: 1, updatedAt: -1 });
recordSchema.index({ ownerId: 1, module: 1, number: 1 }, { unique: true });

const counterSchema = new Schema({ _id: String, seq: { type: Number, default: 0 } });

/** Company profile + uploaded Word letterhead (header/footer kept, body generated). */
const profileSchema = new Schema({
  ownerId: { type: String, required: true, unique: true },
  companyName: String, address: String, email: String, phone: String, website: String, taxId: String,
  defaultCurrency: { type: String, default: 'USD' }, defaultTaxRate: { type: Number, default: 0 },
  defaultTerms: String, bankDetails: String,
  letterhead: { name: String, size: Number, uploadedAt: Date, data: Buffer },
}, { timestamps: true });

export const ErpRecord = models?.ErpRecord || model('ErpRecord', recordSchema, 'erp_records');
export const ErpCounter = models?.ErpCounter || model('ErpCounter', counterSchema, 'erp_counters');
export const ErpProfile = models?.ErpProfile || model('ErpProfile', profileSchema, 'erp_profiles');

export async function nextNumber(ownerId: string, prefix: string): Promise<string> {
  const year = new Date().getFullYear();
  const c: any = await ErpCounter.findOneAndUpdate(
    { _id: `${ownerId}:${prefix}:${year}` }, { $inc: { seq: 1 } }, { upsert: true, new: true });
  return `${prefix}-${year}-${String(c.seq).padStart(4, '0')}`;
}

export const isObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export function serialize(r: any) {
  const o = r.toObject ? r.toObject() : r;
  return { id: String(o._id), number: o.number, module: o.module, status: o.status, title: o.title, data: o.data ?? {},
    totals: o.totals, source: o.source, history: o.history ?? [], createdAt: o.createdAt, updatedAt: o.updatedAt };
}
