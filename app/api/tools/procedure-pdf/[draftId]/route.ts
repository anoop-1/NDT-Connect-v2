import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/mongodb';
import { ProcedureDraft } from '@/lib/models/ProcedureDraft';

export const dynamic = 'force-dynamic';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-me'
);

interface RouteContext {
  params: { draftId: string };
}

/**
 * Download a saved ProcedureDraft as a file.
 *
 * Signed-in users only. The caller must own the draft (userId matches the
 * JWT subject).
 *
 * NOTE: @react-pdf/renderer is not installed at the moment, so this endpoint
 * currently serves a Markdown text file (text/markdown; charset=utf-8). Once
 * @react-pdf/renderer is added to dependencies, replace the body block with
 * a renderToStream pipeline — schema is already in place.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  // ── Auth: Bearer header or ndt-token cookie ─────────────────────────────
  const authHeader = request.headers.get('authorization');
  const cookieToken = request.cookies.get('ndt-token')?.value;
  const token = authHeader?.replace('Bearer ', '') ?? cookieToken;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let userId: string;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    userId = payload.userId as string;
    if (!userId) throw new Error('userId missing from token');
  } catch {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  // ── Load + authorise ────────────────────────────────────────────────────
  await dbConnect();
  const { draftId } = context.params;
  const draft = await ProcedureDraft.findById(draftId).catch(() => null);
  if (!draft) {
    return NextResponse.json({ message: 'Draft not found' }, { status: 404 });
  }
  if (!draft.userId || draft.userId !== userId) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  // ── Render ──────────────────────────────────────────────────────────────
  // Markdown fallback. When @react-pdf/renderer is wired in, swap this block
  // for a PDF stream and set content-type to application/pdf.
  const safeFilename = `ndt-procedure-${draftId}.md`;
  return new NextResponse(draft.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
