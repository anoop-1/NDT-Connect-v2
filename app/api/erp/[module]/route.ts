import { NextRequest, NextResponse } from 'next/server';
import { getErpUser, unauthorized, notFound, bad, serverError } from '@/lib/erp/auth';
import { ErpRecord, nextNumber, serialize } from '@/lib/erp/model';
import { sanitize } from '@/lib/erp/modules';
import { ready, titleOf, derived, moduleOr404 } from '@/lib/erp/service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { module: string } }) {
  const user = await getErpUser(req); if (!user) return unauthorized();
  const mod = moduleOr404(params.module); if (!mod) return notFound('Module');
  try {
    await ready();
    const sp = req.nextUrl.searchParams;
    const filter: any = { ownerId: user.id, module: mod.key };
    const status = sp.get('status'); if (status) filter.status = status;
    const q = sp.get('q')?.trim();
    if (q) {
      const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').slice(0, 80), 'i');
      filter.$or = [{ title: rx }, { number: rx }];
    }
    const limit = Math.min(Number(sp.get('limit')) || 500, 1000);
    const rows = await ErpRecord.find(filter).sort({ updatedAt: -1 }).limit(limit);
    return NextResponse.json({ success: true, data: rows.map(serialize) });
  } catch (e) { return serverError(e); }
}

export async function POST(req: NextRequest, { params }: { params: { module: string } }) {
  const user = await getErpUser(req); if (!user) return unauthorized();
  const mod = moduleOr404(params.module); if (!mod) return notFound('Module');
  try {
    await ready();
    const body = await req.json().catch(() => ({}));
    const { data, errors } = sanitize(mod, body?.data ?? {});
    if (errors.length) return bad(errors);
    const status = mod.statuses?.includes(body?.status) ? body.status : (mod.statuses?.[0] ?? '');
    const rec = await ErpRecord.create({
      ownerId: user.id, module: mod.key, number: await nextNumber(user.id, mod.prefix), status,
      title: titleOf(mod, data), data, totals: derived(mod, data), history: [{ at: new Date(), status, note: 'Created' }],
    });
    return NextResponse.json({ success: true, data: serialize(rec) }, { status: 201 });
  } catch (e) { return serverError(e); }
}
