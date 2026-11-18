import { NextRequest, NextResponse } from 'next/server';
import { getErpUser, unauthorized, serverError } from '@/lib/erp/auth';
import { ErpProfile } from '@/lib/erp/model';
import { CURRENCIES } from '@/lib/erp/modules';
import { ready } from '@/lib/erp/service';

export const dynamic = 'force-dynamic';
const FIELDS = ['companyName', 'address', 'email', 'phone', 'website', 'taxId', 'defaultTerms', 'bankDetails'] as const;

function shape(p: any) {
  if (!p) return { letterhead: null };
  const o = p.toObject ? p.toObject() : p;
  const { letterhead, _id, __v, ownerId, ...rest } = o;
  return { ...rest, letterhead: letterhead?.name ? { name: letterhead.name, size: letterhead.size, uploadedAt: letterhead.uploadedAt } : null };
}

export async function GET(req: NextRequest) {
  const user = await getErpUser(req); if (!user) return unauthorized();
  try { await ready(); return NextResponse.json({ success: true, data: shape(await ErpProfile.findOne({ ownerId: user.id }).select('-letterhead.data')) }); }
  catch (e) { return serverError(e); }
}

export async function PUT(req: NextRequest) {
  const user = await getErpUser(req); if (!user) return unauthorized();
  try {
    await ready();
    const b = await req.json().catch(() => ({}));
    const set: Record<string, any> = {};
    for (const f of FIELDS) if (typeof b[f] === 'string') set[f] = b[f].slice(0, 5000);
    if (CURRENCIES.includes(b.defaultCurrency)) set.defaultCurrency = b.defaultCurrency;
    if (b.defaultTaxRate !== undefined && !isNaN(Number(b.defaultTaxRate))) set.defaultTaxRate = Number(b.defaultTaxRate);
    const p = await ErpProfile.findOneAndUpdate({ ownerId: user.id }, { $set: set }, { upsert: true, new: true }).select('-letterhead.data');
    return NextResponse.json({ success: true, data: shape(p) });
  } catch (e) { return serverError(e); }
}
