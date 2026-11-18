'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULES, GROUP_ORDER, formatMoney } from '@/lib/erp/modules';
import { erp } from '@/components/erp/api';
import { ErpIcon } from '@/components/erp/icons';

export default function ErpHome() {
  const [s, setS] = useState<any>(null); const [err, setErr] = useState('');
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => { erp.summary().then(setS).catch(e => setErr(e.message)); erp.profile().then(setProfile).catch(() => {}); }, []);
  const count = (m: string, st?: string[]) => (s?.counts || []).filter((c: any) => c.module === m && (!st || st.includes(c.status))).reduce((a: number, c: any) => a + c.n, 0);
  const sumBy = (m: string, st: string[], k: 'total' | 'balance') => {
    const by: Record<string, number> = {};
    (s?.money || []).filter((x: any) => x.module === m && st.includes(x.status)).forEach((x: any) => { by[x.currency] = (by[x.currency] || 0) + (x[k] || 0); });
    const e = Object.entries(by); return e.length ? e.map(([c, v]) => formatMoney(v, c)).join(' · ') : formatMoney(0);
  };
  const kpis = [
    { label: 'Open quotes (sent)', value: sumBy('quotations', ['Sent'], 'total'), sub: `${count('quotations', ['Sent'])} awaiting reply`, href: '/erp/quotations' },
    { label: 'Won quotes', value: sumBy('quotations', ['Accepted'], 'total'), sub: `${count('quotations', ['Accepted'])} accepted`, href: '/erp/quotations' },
    { label: 'Receivables', value: sumBy('invoices', ['Sent', 'Partially Paid', 'Overdue'], 'balance'), sub: `${s?.overdueInvoices?.length || 0} overdue`, href: '/erp/invoices' },
    { label: 'Active jobs', value: String(count('jobs', ['Planned', 'In Progress'])), sub: `${count('jobs', ['Completed'])} completed`, href: '/erp/jobs' },
  ];
  const alerts = [
    ...(s?.overdueInvoices || []).map((r: any) => ({ t: `Invoice ${r.number} overdue since ${r.data.dueDate}`, href: `/erp/invoices?id=${r.id}` })),
    ...(s?.quotesExpiring || []).map((r: any) => ({ t: `Quote ${r.number} expires ${r.data.validUntil} — follow up`, href: `/erp/quotations?id=${r.id}` })),
    ...(s?.equipmentOverdue || []).map((r: any) => ({ t: `${r.title} was due back ${r.data.dueBack}`, href: `/erp/equipment_issuance?id=${r.id}` })),
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-bold">Your NDT business, in one place</h1>
          <p className="text-sm text-muted-foreground">Quotes, jobs, reports, invoices, people and equipment — free with your NDT-Connect account.</p></div>
        {!profile?.letterhead && <Link href="/erp/settings" className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">Upload your Word letterhead so quotes go out on your branding →</Link>}
      </div>
      {err && <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-800">{err}</p>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(k => (
          <Link key={k.label} href={k.href}><Card className="h-full transition-shadow hover:shadow-md"><CardContent className="p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</p>
            <p className="mt-1 text-xl font-bold tabular-nums">{s ? k.value : '…'}</p><p className="text-xs text-muted-foreground">{k.sub}</p>
          </CardContent></Card></Link>
        ))}
      </div>
      {!!alerts.length && (
        <Card><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><AlertTriangle className="h-4 w-4 text-amber-600" />Needs attention</CardTitle></CardHeader>
          <CardContent className="space-y-1">{alerts.map((a, i) => <Link key={i} href={a.href} className="block text-sm hover:underline">{a.t}</Link>)}</CardContent></Card>
      )}
      {GROUP_ORDER.map(g => (
        <div key={g}>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{g}</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {MODULES.filter(m => m.group === g).map(m => (
              <Link key={m.key} href={`/erp/${m.key}`} className="group flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/40">
                <ErpIcon name={m.icon} className="mt-0.5 h-5 w-5 text-primary" />
                <div className="min-w-0 flex-1"><p className="flex items-center justify-between font-medium">{m.label}<span className="text-xs text-muted-foreground">{s ? count(m.key) : ''}</span></p>
                  <p className="text-xs text-muted-foreground">{m.description}</p></div>
                <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
