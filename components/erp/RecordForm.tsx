'use client';
import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ModuleDef, FieldDef, Line, computeTotals, formatMoney, MODULE_MAP } from '@/lib/erp/modules';
import { erp, ErpRow } from './api';

const selectCls = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring';

function RefSelect({ f, value, onChange }: { f: FieldDef; value: string; onChange: (v: string) => void }) {
  const [opts, setOpts] = useState<ErpRow[]>([]);
  useEffect(() => { erp.list(f.ref!).then(setOpts).catch(() => setOpts([])); }, [f.ref]);
  const target = MODULE_MAP[f.ref!];
  return (
    <div className="flex gap-2">
      <select className={selectCls} value={value || ''} onChange={e => onChange(e.target.value)}>
        <option value="">— Select {target?.singular.toLowerCase()} —</option>
        {opts.map(o => <option key={o.id} value={o.id}>{o.title || o.number} ({o.number})</option>)}
      </select>
      <a href={`/erp/${f.ref}?new=1`} target="_blank" rel="noreferrer" title={`New ${target?.singular}`}
        className="inline-flex h-10 shrink-0 items-center rounded-md border px-3 text-sm hover:bg-muted">+</a>
    </div>
  );
}

function LinesEditor({ value, currency, onChange }: { value: Line[]; currency: string; onChange: (v: Line[]) => void }) {
  const rows = value?.length ? value : [];
  const set = (i: number, k: keyof Line, v: any) => onChange(rows.map((r, j) => j === i ? { ...r, [k]: k === 'description' || k === 'unit' ? v : Number(v) } : r));
  return (
    <div className="space-y-2">
      <div className="hidden grid-cols-[1fr_80px_90px_110px_110px_36px] gap-2 text-xs font-medium text-muted-foreground md:grid">
        <span>Description</span><span>Qty</span><span>Unit</span><span>Rate</span><span className="text-right">Amount</span><span />
      </div>
      {rows.map((l, i) => (
        <div key={i} className="grid grid-cols-2 gap-2 rounded-md border p-2 md:grid-cols-[1fr_80px_90px_110px_110px_36px] md:border-0 md:p-0">
          <Input className="col-span-2 md:col-span-1" placeholder="e.g. PAUT inspection of 6&quot; girth weld" value={l.description} onChange={e => set(i, 'description', e.target.value)} />
          <Input type="number" min="0" step="any" placeholder="Qty" value={l.qty} onChange={e => set(i, 'qty', e.target.value)} />
          <Input placeholder="day / joint / m" value={l.unit || ''} onChange={e => set(i, 'unit', e.target.value)} />
          <Input type="number" min="0" step="any" placeholder="Rate" value={l.rate} onChange={e => set(i, 'rate', e.target.value)} />
          <div className="flex items-center justify-end text-sm tabular-nums">{formatMoney((l.qty || 0) * (l.rate || 0), currency)}</div>
          <button type="button" aria-label="Remove line" className="flex items-center justify-center text-muted-foreground hover:text-destructive" onClick={() => onChange(rows.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...rows, { description: '', qty: 1, unit: '', rate: 0 }])}><Plus className="mr-1 h-4 w-4" />Add line</Button>
    </div>
  );
}

export default function RecordForm({ mod, initial, defaults, onSubmit, saving }: {
  mod: ModuleDef; initial?: Record<string, any>; defaults?: Record<string, any>; saving?: boolean; onSubmit: (data: Record<string, any>) => void;
}) {
  const [data, setData] = useState<Record<string, any>>(() => ({ ...(defaults || {}), ...(initial || {}) }));
  const set = (k: string, v: any) => setData(d => ({ ...d, [k]: v }));
  const totals = useMemo(() => (mod.totals ? computeTotals(data) : null), [data, mod.totals]);
  const cur = data.currency || 'USD';

  const control = (f: FieldDef) => {
    const v = data[f.name];
    switch (f.type) {
      case 'textarea': return <Textarea rows={4} value={v || ''} placeholder={f.placeholder} onChange={e => set(f.name, e.target.value)} />;
      case 'select': return (
        <select className={selectCls} value={v || ''} onChange={e => set(f.name, e.target.value)}>
          <option value="">— Select —</option>{f.options!.map(o => <option key={o}>{o}</option>)}
        </select>);
      case 'ref': return <RefSelect f={f} value={v} onChange={x => set(f.name, x)} />;
      case 'lines': return <LinesEditor value={v || []} currency={cur} onChange={x => set(f.name, x)} />;
      case 'checkbox': return <input type="checkbox" className="h-5 w-5" checked={!!v} onChange={e => set(f.name, e.target.checked)} />;
      case 'number': case 'money': return <Input type="number" step="any" value={v ?? ''} onChange={e => set(f.name, e.target.value === '' ? '' : e.target.value)} />;
      case 'date': return <Input type="date" value={v || ''} onChange={e => set(f.name, e.target.value)} />;
      default: return <Input type={f.type === 'email' ? 'email' : f.type === 'phone' ? 'tel' : 'text'} value={v || ''} placeholder={f.placeholder} onChange={e => set(f.name, e.target.value)} />;
    }
  };

  return (
    <form className="space-y-6" onSubmit={e => { e.preventDefault(); onSubmit(data); }}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {mod.fields.map(f => (
          <div key={f.name} className={f.half ? '' : 'md:col-span-2'}>
            <Label className="mb-1.5 block">{f.label}{f.required && <span className="text-destructive"> *</span>}</Label>
            {control(f)}
          </div>
        ))}
      </div>
      {totals && (
        <div className="ml-auto w-full max-w-xs space-y-1 rounded-lg bg-muted/50 p-4 text-sm tabular-nums">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(totals.subtotal, cur)}</span></div>
          {!!totals.discount && <div className="flex justify-between"><span>Discount</span><span>−{formatMoney(totals.discount, cur)}</span></div>}
          {!!data.taxRate && <div className="flex justify-between"><span>Tax ({data.taxRate}%)</span><span>{formatMoney(totals.tax, cur)}</span></div>}
          <div className="flex justify-between border-t pt-1 text-base font-semibold"><span>Total</span><span>{formatMoney(totals.total, cur)}</span></div>
          {!!data.amountPaid && <div className="flex justify-between font-medium text-rose-700"><span>Balance due</span><span>{formatMoney(totals.balance, cur)}</span></div>}
        </div>
      )}
      <div className="flex justify-end gap-2"><Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button></div>
    </form>
  );
}
