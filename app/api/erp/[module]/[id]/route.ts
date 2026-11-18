import { NextRequest, NextResponse } from 'next/server';
import { getErpUser, unauthorized, notFound, bad, serverError } from '@/lib/erp/auth';
import { ErpRecord, isObjectId, serialize } from '@/lib/erp/model';
import { sanitize } from '@/lib/erp/modules';
import { ready, titleOf, derived, moduleOr404, resolveRefs } from '@/lib/erp/service';

export const dynamic = 'force-dynamic';
type P = { params: { module: string; id: string } };

async function load(req: NextRequest, params: P['params']) {
  const user = await getErpUser(req); if (!user) return { err: unauthorized() };
  const mod = moduleOr404(params.module); if (!mod) return { err: notFound('Module') };
  if (!isObjectId(params.id)) return { err: notFound(mod.singular) };
  await ready();
  const rec = await ErpRecord.findOne({ _id: params.id, ownerId: user.id, module: mod.key });
  if (!rec) return { err: notFound(mod.singular) };
  return { user, mod, rec };
}

export async function GET(req: NextRequest, { params }: P) {
  try {
    const r = await load(req, params); if ('err' in r) return r.err;
    const refs = await resolveRefs(r.user.id, r.mod, r.rec.data);
    return NextResponse.json({ success: true, data: { ...serialize(r.rec), refs } });
  } catch (e) { return serverError(e); }
}

export async function PUT(req: NextRequest, { params }: P) {
  try {
    const r = await load(req, params); if ('err' in r) return r.err;
    const body = await req.json().catch(() => ({}));
    const { data, errors } = sanitize(r.mod, body?.data ?? r.rec.data);
    if (errors.length) return bad(errors);
    const status = body?.status && r.mod.statuses?.includes(body.status) ? body.status : r.rec.status;
    if (status !== r.rec.status) r.rec.history.push({ at: new Date(), status, note: body?.note ? String(body.note).slice(0, 300) : '' });
    r.rec.set({ data, status, title: titleOf(r.mod, data), totals: derived(r.mod, data) });
    r.rec.markModified('data');
    await r.rec.save();
    return NextResponse.json({ success: true, data: serialize(r.rec) });
  } catch (e) { return serverError(e); }
}

export async function DELETE(req: NextRequest, { params }: P) {
  try {
    const r = await load(req, params); if ('err' in r) return r.err;
    await ErpRecord.deleteOne({ _id: r.rec._id, ownerId: r.user.id });
    return NextResponse.json({ success: true });
  } catch (e) { return serverError(e); }
}
