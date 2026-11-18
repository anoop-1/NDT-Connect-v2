import { NextRequest, NextResponse } from 'next/server';
import { getErpUser, unauthorized, notFound, bad, serverError } from '@/lib/erp/auth';
import { ErpRecord, isObjectId } from '@/lib/erp/model';
import { renderDocx } from '@/lib/erp/docx';
import { ready, moduleOr404, resolveRefs, getProfile } from '@/lib/erp/service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { module: string; id: string } }) {
  const user = await getErpUser(req); if (!user) return unauthorized();
  const mod = moduleOr404(params.module); if (!mod?.docx) return notFound('Document');
  if (!isObjectId(params.id)) return notFound(mod.singular);
  try {
    await ready();
    const rec: any = await ErpRecord.findOne({ _id: params.id, ownerId: user.id, module: mod.key }).lean();
    if (!rec) return notFound(mod.singular);
    const [refs, profile] = await Promise.all([resolveRefs(user.id, mod, rec.data), getProfile(user.id)]);
    let buf: Buffer;
    try { buf = renderDocx({ mod, record: rec, refs, profile: profile?.toObject?.() ?? null }); }
    catch (e: any) { return bad(e?.message || 'Could not build the document'); }
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${rec.number}.docx"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) { return serverError(e); }
}
