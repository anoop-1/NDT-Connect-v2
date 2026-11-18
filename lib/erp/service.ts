import dbConnect from '@/lib/mongodb';
import { ErpRecord, ErpProfile, isObjectId } from './model';
import { MODULE_MAP, ModuleDef, computeTotals } from './modules';

export async function ready() { await dbConnect(); }

export function titleOf(mod: ModuleDef, data: Record<string, any>) {
  return String(data?.[mod.titleField] ?? '').slice(0, 200);
}

export function derived(mod: ModuleDef, data: Record<string, any>) {
  return mod.totals ? computeTotals(data) : null;
}

/** Resolve ref fields to { title, data } — only records owned by the same user. */
export async function resolveRefs(ownerId: string, mod: ModuleDef, data: Record<string, any>) {
  const refs: Record<string, { id: string; number: string; title: string; data: Record<string, any> } | undefined> = {};
  const ids = mod.fields.filter(f => f.type === 'ref' && data?.[f.name] && isObjectId(data[f.name])).map(f => data[f.name]);
  if (!ids.length) return refs;
  const docs: any[] = await ErpRecord.find({ ownerId, _id: { $in: ids } }).lean();
  const byId = new Map(docs.map(d => [String(d._id), d]));
  for (const f of mod.fields) {
    if (f.type !== 'ref') continue;
    const d = byId.get(String(data?.[f.name] ?? ''));
    if (d && d.module === f.ref) refs[f.name] = { id: String(d._id), number: d.number, title: d.title, data: d.data };
  }
  return refs;
}

export async function getProfile(ownerId: string) {
  return ErpProfile.findOne({ ownerId });
}

export function moduleOr404(key: string): ModuleDef | null { return MODULE_MAP[key] ?? null; }
