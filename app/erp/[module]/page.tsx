'use client';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Plus, Search, FileDown, Printer, Trash2, ArrowRightLeft, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { MODULE_MAP, formatMoney } from '@/lib/erp/modules';
import RecordForm from '@/components/erp/RecordForm';
import { erp, docxUrl, ErpRow, StatusPill } from '@/components/erp/api';
import { ErpIcon } from '@/components/erp/icons';

export default function ModulePage() {
  return <Suspense fallback={<div className="py-16 text-center text-muted-foreground">Loading…</div>}><ModuleView /></Suspense>;
}

function ModuleView() {
  const key = useParams<{ module: string }>()?.module ?? '';
  const mod = MODULE_MAP[key];
  const router = useRouter(); const sp = useSearchParams() ?? new URLSearchParams();
  const { toast } = useToast();
  const [rows, setRows] = useState<ErpRow[]>([]); const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(''); const [status, setStatus] = useState('');
  const [editing, setEditing] = useState<ErpRow | 'new' | null>(null);
  const [saving, setSaving] = useState(false); const [defaults, setDefaults] = useState<Record<string, any>>({});
  const [refNames, setRefNames] = useState<Record<string, Record<string, string>>>({});

  const load = useCallback(async () => {
    if (!mod) return;
    setLoading(true);
    try { setRows(await erp.list(mod.key, q, status)); } catch (e: any) { toast({ title: 'Could not load', description: e.message, variant: 'destructive' }); }
    finally { setLoading(false); }
  }, [mod, q, status, toast]);
  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t); }, [load]);

  const listCols = useMemo(() => mod?.fields.filter(f => f.list) ?? [], [mod]);
  useEffect(() => {   // resolve ref columns to names
    if (!mod) return;
    const refMods = Array.from(new Set(listCols.filter(f => f.type === 'ref').map(f => f.ref!)));
    Promise.all(refMods.map(async m => [m, Object.fromEntries((await erp.list(m).catch(() => [])).map(r => [r.id, r.title || r.number]))] as const))
      .then(e => setRefNames(Object.fromEntries(e)));
  }, [mod, listCols, rows.length]);
  useEffect(() => {   // profile defaults for new financial docs
    erp.profile().then(p => setDefaults({ currency: p?.defaultCurrency || 'USD', taxRate: p?.defaultTaxRate || undefined,
      terms: mod?.key === 'quotations' ? p?.defaultTerms : undefined, bankDetails: mod?.key === 'invoices' ? p?.bankDetails : undefined,
      issueDate: new Date().toISOString().slice(0, 10) })).catch(() => {});
  }, [mod?.key]);
  useEffect(() => { if (sp.get('new') === '1') setEditing('new'); }, [sp]);
  useEffect(() => {
    const id = sp.get('id'); if (!id || !mod) return;
    erp.get(mod.key, id).then(setEditing).catch(() => {});
  }, [sp, mod]);

  if (!mod) return <div className="py-20 text-center">Unknown module. <Link className="underline" href="/erp">Back to ERP</Link></div>;

  const save = async (data: Record<string, any>) => {
    setSaving(true);
    try {
      if (editing === 'new') { const r = await erp.create(mod.key, data); toast({ title: `${mod.singular} ${r.number} created` }); setEditing(r); }
      else if (editing) { const r = await erp.update(mod.key, editing.id, data); toast({ title: `${r.number} saved` }); setEditing({ ...editing, ...r }); }
      load();
    } catch (e: any) { toast({ title: 'Not saved', description: e.message, variant: 'destructive' }); }
    finally { setSaving(false); }
  };
  const setStat = async (r: ErpRow, s: string) => {
    try { const u = await erp.update(mod.key, r.id, r.data, s); setEditing({ ...r, ...u }); load(); }
    catch (e: any) { toast({ title: 'Status not changed', description: e.message, variant: 'destructive' }); }
  };
  const convert = async (r: ErpRow, to: string) => {
    try { const n = await erp.convert(mod.key, r.id, to); toast({ title: `${MODULE_MAP[to].singular} ${n.number} created from ${r.number}` }); router.push(`/erp/${to}?id=${n.id}`); }
    catch (e: any) { toast({ title: 'Could not convert', description: e.message, variant: 'destructive' }); }
  };
  const del = async (r: ErpRow) => {
    if (!confirm(`Delete ${r.number}? This cannot be undone.`)) return;
    try { await erp.remove(mod.key, r.id); setEditing(null); load(); toast({ title: `${r.number} deleted` }); }
    catch (e: any) { toast({ title: 'Not deleted', description: e.message, variant: 'destructive' }); }
  };
  const cell = (r: ErpRow, f: typeof listCols[number]) => {
    const v = r.data[f.name];
    if (v === undefined || v === '') return <span className="text-muted-foreground">—</span>;
    if (f.type === 'ref') return refNames[f.ref!]?.[v] ?? '…';
    if (f.type === 'money') return formatMoney(v, r.data.currency);
    return String(v);
  };
  const current = editing && editing !== 'new' ? editing : null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5"><ErpIcon name={mod.icon} className="h-6 w-6 text-primary" /></div>
          <div><h1 className="text-2xl font-bold">{mod.label}</h1><p className="text-sm text-muted-foreground">{mod.description}</p></div>
        </div>
        <Button onClick={() => setEditing('new')}><Plus className="mr-1 h-4 w-4" />New {mod.singular.toLowerCase()}</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full max-w-xs"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder={`Search ${mod.label.toLowerCase()}…`} value={q} onChange={e => setQ(e.target.value)} /></div>
        {mod.statuses && ['', ...mod.statuses].map(s => (
          <button key={s || 'all'} onClick={() => setStatus(s)} className={`rounded-full border px-3 py-1 text-xs ${status === s ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{s || 'All'}</button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
            <tr><th className="px-3 py-2.5">No.</th>{listCols.map(f => <th key={f.name} className="px-3 py-2.5">{f.label}</th>)}
              {mod.totals && <th className="px-3 py-2.5 text-right">Total</th>}{mod.statuses && <th className="px-3 py-2.5">Status</th>}</tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={9} className="px-3 py-8 text-center text-muted-foreground">Loading…</td></tr>}
            {!loading && !rows.length && (
              <tr><td colSpan={9} className="px-3 py-12 text-center">
                <p className="font-medium">No {mod.label.toLowerCase()} yet</p>
                <p className="mb-3 text-sm text-muted-foreground">{mod.description}</p>
                <Button size="sm" onClick={() => setEditing('new')}><Plus className="mr-1 h-4 w-4" />Create your first {mod.singular.toLowerCase()}</Button>
              </td></tr>
            )}
            {rows.map(r => (
              <tr key={r.id} className="cursor-pointer border-t hover:bg-muted/40" onClick={() => setEditing(r)}>
                <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs">{r.number}</td>
                {listCols.map(f => <td key={f.name} className="max-w-[260px] truncate px-3 py-2.5">{cell(r, f)}</td>)}
                {mod.totals && <td className="whitespace-nowrap px-3 py-2.5 text-right tabular-nums">{formatMoney(r.totals?.total || 0, r.data.currency)}</td>}
                {mod.statuses && <td className="px-3 py-2.5"><StatusPill s={r.status} /></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!editing} onOpenChange={o => { if (!o) { setEditing(null); if (sp.get('new') || sp.get('id')) router.replace(`/erp/${mod.key}`); } }}>
        <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex flex-wrap items-center gap-2">{current ? <>{current.number}<StatusPill s={current.status} /></> : `New ${mod.singular.toLowerCase()}`}</DialogTitle>
            <DialogDescription>{current?.source ? <>Created from <Link className="underline" href={`/erp/${current.source.module}?id=${current.source.id}`}>{current.source.number}</Link></> : mod.description}</DialogDescription>
          </DialogHeader>

          {current && (
            <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 p-2">
              {mod.statuses && (
                <select className="h-9 rounded-md border bg-background px-2 text-sm" value={current.status} onChange={e => setStat(current, e.target.value)} aria-label="Status">
                  {mod.statuses.map(s => <option key={s}>{s}</option>)}
                </select>
              )}
              {mod.docx && <a href={docxUrl(mod.key, current.id)}><Button size="sm" variant="outline"><FileDown className="mr-1 h-4 w-4" />Word (letterhead)</Button></a>}
              {mod.docx && <a href={`/erp/print/${mod.key}/${current.id}`} target="_blank" rel="noreferrer"><Button size="sm" variant="outline"><Printer className="mr-1 h-4 w-4" />Print / PDF</Button></a>}
              {mod.converts?.map(c => (
                <Button key={c.to} size="sm" variant="outline" disabled={!!c.whenStatus && !c.whenStatus.includes(current.status)}
                  title={c.whenStatus && !c.whenStatus.includes(current.status) ? `Available when ${c.whenStatus.join(' / ')}` : ''} onClick={() => convert(current, c.to)}>
                  <ArrowRightLeft className="mr-1 h-4 w-4" />{c.label}</Button>
              ))}
              <Button size="sm" variant="ghost" className="ml-auto text-destructive" onClick={() => del(current)}><Trash2 className="mr-1 h-4 w-4" />Delete</Button>
            </div>
          )}

          <RecordForm key={current?.id ?? 'new'} mod={mod} initial={current?.data} defaults={current ? undefined : defaults} saving={saving} onSubmit={save} />

          {!!current?.history?.length && (
            <div className="border-t pt-3 text-xs text-muted-foreground">
              <p className="mb-1 flex items-center gap-1 font-medium"><History className="h-3.5 w-3.5" />History</p>
              {current.history.slice().reverse().map((h, i) => <p key={i}>{new Date(h.at).toLocaleString()} — {h.status}{h.note ? ` · ${h.note}` : ''}</p>)}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
