import { NextRequest, NextResponse } from 'next/server';
import { getErpUser, unauthorized, serverError } from '@/lib/erp/auth';
import { ErpRecord } from '@/lib/erp/model';
import { ready } from '@/lib/erp/service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = await getErpUser(req); if (!user) return unauthorized();
  try {
    await ready();
    const today = new Date().toISOString().slice(0, 10);
    const [counts, money, overdueInv, dueBack, expiringQuotes] = await Promise.all([
      ErpRecord.aggregate([{ $match: { ownerId: user.id } }, { $group: { _id: { m: '$module', s: '$status' }, n: { $sum: 1 } } }]),
      ErpRecord.aggregate([{ $match: { ownerId: user.id, module: { $in: ['quotations', 'invoices'] } } },
        { $group: { _id: { m: '$module', s: '$status', c: '$data.currency' }, total: { $sum: '$totals.total' }, balance: { $sum: '$totals.balance' } } }]),
      ErpRecord.find({ ownerId: user.id, module: 'invoices', status: { $in: ['Sent', 'Partially Paid', 'Overdue'] }, 'data.dueDate': { $lt: today } }).sort({ 'data.dueDate': 1 }).limit(10).lean(),
      ErpRecord.find({ ownerId: user.id, module: 'equipment_issuance', status: 'Issued', 'data.dueBack': { $lt: today } }).limit(10).lean(),
      ErpRecord.find({ ownerId: user.id, module: 'quotations', status: 'Sent', 'data.validUntil': { $lte: new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10) } }).limit(10).lean(),
    ]);
    const pick = (r: any) => ({ id: String(r._id), module: r.module, number: r.number, title: r.title, status: r.status, data: r.data, totals: r.totals });
    return NextResponse.json({ success: true, data: {
      counts: counts.map((c: any) => ({ module: c._id.m, status: c._id.s, n: c.n })),
      money: money.map((m: any) => ({ module: m._id.m, status: m._id.s, currency: m._id.c || 'USD', total: m.total, balance: m.balance })),
      overdueInvoices: overdueInv.map(pick), equipmentOverdue: dueBack.map(pick), quotesExpiring: expiringQuotes.map(pick),
    } });
  } catch (e) { return serverError(e); }
}
