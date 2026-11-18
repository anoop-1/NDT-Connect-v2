import { NextRequest, NextResponse } from 'next/server';
import PizZip from 'pizzip';
import { getErpUser, unauthorized, bad, serverError } from '@/lib/erp/auth';
import { ErpProfile } from '@/lib/erp/model';
import { ready } from '@/lib/erp/service';

export const dynamic = 'force-dynamic';
const MAX = 5 * 1024 * 1024;

/** Upload a Word (.docx) letterhead. Its header, footer and page setup are reused on every document. */
export async function POST(req: NextRequest) {
  const user = await getErpUser(req); if (!user) return unauthorized();
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof Blob)) return bad('Choose a .docx file');
    const name = (file as File).name || 'letterhead.docx';
    if (!/\.docx$/i.test(name)) return bad('Please upload a Word .docx file (not .doc or PDF)');
    if (file.size > MAX) return bad('Letterhead must be under 5 MB');
    const buf = Buffer.from(await file.arrayBuffer());
    try {
      const zip = new PizZip(buf);
      if (!zip.file('word/document.xml')) return bad('That file is not a valid Word document');
    } catch { return bad('That file is not a valid Word document'); }
    await ready();
    await ErpProfile.findOneAndUpdate({ ownerId: user.id },
      { $set: { letterhead: { name: name.slice(0, 200), size: file.size, uploadedAt: new Date(), data: buf } } }, { upsert: true });
    return NextResponse.json({ success: true, data: { name, size: file.size, uploadedAt: new Date() } });
  } catch (e) { return serverError(e); }
}

export async function DELETE(req: NextRequest) {
  const user = await getErpUser(req); if (!user) return unauthorized();
  try { await ready(); await ErpProfile.updateOne({ ownerId: user.id }, { $unset: { letterhead: 1 } }); return NextResponse.json({ success: true }); }
  catch (e) { return serverError(e); }
}
