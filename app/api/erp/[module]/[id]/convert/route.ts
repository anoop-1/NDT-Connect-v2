import { NextRequest, NextResponse } from 'next/server';
import { getErpUser, unauthorized, notFound, bad, serverError } from '@/lib/erp/auth';
import { ErpRecord, isObjectId, nextNumber, serialize } from '@/lib/erp/model';
import { MODULE_MAP, sanitize } from '@/lib/erp/modules';
import { ready, titleOf, derived, moduleOr404 } from '@/lib/erp/service';

export const dynamic = 'force-dynamic';

/** Quote -> Job / Invoice, Job -> Invoice. Copies matching fields and links back to the source. */
export async function POST(req: NextRequest, { params }: { params: { module: string; id: string } }) {
  const user = await getErpUser(req); if (!user) return unauthorized();
  const mod = moduleOr404(params.module); if (!mod) return notFound('Module');
  try {
    const { to } = await req.json().catch(() => ({}));
    const rule = mod.converts?.find(c => c.to === to);
    const target = MODULE_MAP[to];
    if (!rule || !target) return bad(`${mod.singular} cannot be converted to ${to}`);
    if (!isObjectId(params.id)) return notFound(mod.singular);
    await ready();
    const src: any = await ErpRecord.findOne({ _id: params.id, ownerId: user.id, module: mod.key });
    if (!src) return notFound(mod.singular);
    if (rule.whenStatus && !rule.whenStatus.includes(src.status)) return bad(`Set the ${mod.singular.toLowerCase()} to ${rule.whenStatus.join(' or ')} first`);

    const d = src.data || {}; const today = new Date().toISOString().slice(0, 10);
    const seed: Record<string, any> = { ...d };
    if (mod.key === 'quotations') seed.quotation = String(src._id);
    if (mod.key === 'jobs') { seed.job = String(src._id); seed.subject = d.title; }
    if (to === 'jobs') { seed.title = d.subject; seed.notes = [d.scope, d.reference && `Client ref: ${d.reference}`].filter(Boolean).join('\n\n'); seed.startDate = today; }
    if (to === 'invoices') {
      seed.issueDate = today; seed.amountPaid = 0;
      if (mod.key === 'jobs' && d.quotation && isObjectId(d.quotation)) {   // pull priced lines from the job's quote
        const q: any = await ErpRecord.findOne({ _id: d.quotation, ownerId: user.id, module: 'quotations' }).lean();
        if (q) Object.assign(seed, { lines: q.data.lines, taxRate: q.data.taxRate, discount: q.data.discount, currency: q.data.currency, quotation: String(q._id) });
      }
      if (!seed.lines?.length && d.budget) seed.lines = [{ description: d.title || 'Inspection services', qty: 1, unit: 'lot', rate: d.budget }];
    }
    const { data } = sanitize(target, seed);              // only target's fields survive; required-field gaps are left for the user
    const status = target.statuses?.[0] ?? '';
    const rec = await ErpRecord.create({
      ownerId: user.id, module: target.key, number: await nextNumber(user.id, target.prefix), status,
      title: titleOf(target, data), data, totals: derived(target, data),
      source: { module: mod.key, id: String(src._id), number: src.number },
      history: [{ at: new Date(), status, note: `Created from ${src.number}` }],
    });
    return NextResponse.json({ success: true, data: serialize(rec) }, { status: 201 });
  } catch (e) { return serverError(e); }
}
