'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MODULE_MAP, computeTotals, formatMoney } from '@/lib/erp/modules';
import { erp, ErpRow } from '@/components/erp/api';

/** Clean printable view — use the browser's "Save as PDF". */
export default function PrintPage() {
  const params = useParams<{ module: string; id: string }>(); const key = params?.module ?? ''; const id = params?.id ?? '';
  const mod = MODULE_MAP[key];
  const [r, setR] = useState<ErpRow | null>(null); const [p, setP] = useState<any>(null); const [err, setErr] = useState('');
  useEffect(() => { if (mod) { erp.get(key, id).then(setR).catch(e => setErr(e.message)); erp.profile().then(setP).catch(() => {}); } }, [key, id, mod]);
  useEffect(() => { if (r) setTimeout(() => window.print(), 400); }, [r]);
  if (!mod || err) return <p className="p-10">{err || 'Not found'}</p>;
  if (!r) return <p className="p-10">Preparing document…</p>;
  const d = r.data; const cur = d.currency || 'USD'; const t = mod.totals ? computeTotals(d) : null;
  const party = mod.fields.find(f => f.type === 'ref' && (f.ref === 'clients' || f.ref === 'vendors'));
  const pr = party ? r.refs?.[party.name] : undefined;
  return (
    <div className="mx-auto max-w-[800px] bg-white p-10 text-[13px] text-slate-900 print:p-0">
      <style>{`@media print { header, footer, nav, .no-print { display:none !important } body { background:#fff } @page { margin: 16mm } }`}</style>
      <div className="mb-6 flex items-start justify-between border-b pb-4">
        <div><p className="text-lg font-bold">{p?.companyName || ''}</p><p className="whitespace-pre-line text-xs text-slate-600">{[p?.address, p?.email, p?.phone, p?.taxId && `Tax ID: ${p.taxId}`].filter(Boolean).join('\n')}</p></div>
        <div className="text-right"><p className="text-2xl font-bold uppercase tracking-wide text-[#1F3A5F]">{mod.singular}</p><p className="font-mono">{r.number}</p><p className="text-xs">{r.status}</p></div>
      </div>
      {pr && (
        <div className="mb-5 grid grid-cols-2 gap-6">
          <div><p className="text-xs uppercase text-slate-500">{party!.ref === 'vendors' ? 'Vendor' : 'Bill to'}</p><p className="font-semibold">{pr.title}</p>
            <p className="whitespace-pre-line text-xs">{[pr.data.contactName && `Attn: ${pr.data.contactName}`, pr.data.address, [pr.data.city, pr.data.country].filter(Boolean).join(', '), pr.data.email].filter(Boolean).join('\n')}</p></div>
          <div className="text-right text-xs">{mod.fields.filter(f => f.type === 'date' && d[f.name]).map(f => <p key={f.name}>{f.label}: <b>{d[f.name]}</b></p>)}</div>
        </div>
      )}
      {d.subject && <p className="mb-3 font-semibold">Subject: {d.subject}</p>}
      {d.scope && <><p className="font-semibold">Scope of work</p><p className="mb-4 whitespace-pre-line">{d.scope}</p></>}
      {t ? (
        <table className="mb-4 w-full border-collapse text-xs">
          <thead><tr className="bg-[#1F3A5F] text-white"><th className="p-2 text-left">#</th><th className="p-2 text-left">Description</th><th className="p-2 text-right">Qty</th><th className="p-2">Unit</th><th className="p-2 text-right">Rate</th><th className="p-2 text-right">Amount</th></tr></thead>
          <tbody>{(d.lines || []).map((l: any, i: number) => <tr key={i} className="border-b"><td className="p-2">{i + 1}</td><td className="p-2">{l.description}</td><td className="p-2 text-right">{l.qty}</td><td className="p-2 text-center">{l.unit}</td><td className="p-2 text-right">{formatMoney(l.rate, cur)}</td><td className="p-2 text-right">{formatMoney(l.qty * l.rate, cur)}</td></tr>)}</tbody>
          <tfoot className="text-right">
            <tr><td colSpan={5} className="p-1.5">Subtotal</td><td className="p-1.5">{formatMoney(t.subtotal, cur)}</td></tr>
            {!!t.discount && <tr><td colSpan={5} className="p-1.5">Discount</td><td className="p-1.5">−{formatMoney(t.discount, cur)}</td></tr>}
            {!!d.taxRate && <tr><td colSpan={5} className="p-1.5">Tax ({d.taxRate}%)</td><td className="p-1.5">{formatMoney(t.tax, cur)}</td></tr>}
            <tr className="text-sm font-bold"><td colSpan={5} className="p-1.5">Total</td><td className="p-1.5">{formatMoney(t.total, cur)}</td></tr>
            {!!d.amountPaid && <tr className="font-bold text-rose-700"><td colSpan={5} className="p-1.5">Balance due</td><td className="p-1.5">{formatMoney(t.balance, cur)}</td></tr>}
          </tfoot>
        </table>
      ) : (
        <table className="mb-4 w-full border-collapse text-xs">
          <tbody>{mod.fields.filter(f => !['textarea', 'lines'].includes(f.type) && d[f.name] !== undefined && d[f.name] !== '').map(f =>
            <tr key={f.name} className="border-b"><td className="w-1/3 bg-slate-50 p-2 font-medium">{f.label}</td><td className="p-2">{f.type === 'ref' ? r.refs?.[f.name]?.title : String(d[f.name])}</td></tr>)}</tbody>
        </table>
      )}
      {mod.fields.filter(f => f.type === 'textarea' && !['scope'].includes(f.name) && d[f.name]).map(f => <div key={f.name} className="mb-3"><p className="font-semibold">{f.label}</p><p className="whitespace-pre-line">{d[f.name]}</p></div>)}
      {mod.key === 'invoices' && !d.bankDetails && p?.bankDetails && <div className="mb-3"><p className="font-semibold">Payment details</p><p className="whitespace-pre-line">{p.bankDetails}</p></div>}
      <div className="mt-14 grid grid-cols-2 gap-10 text-xs"><div className="border-t pt-1">Authorised signature — {p?.companyName}</div>{mod.key === 'quotations' && <div className="border-t pt-1">Accepted by client (name, signature, date)</div>}</div>
      <button onClick={() => window.print()} className="no-print fixed bottom-6 right-6 rounded-md bg-[#1F3A5F] px-4 py-2 text-white shadow">Print / Save PDF</button>
    </div>
  );
}
