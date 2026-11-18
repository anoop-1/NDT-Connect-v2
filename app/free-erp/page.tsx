import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MODULES, GROUP_ORDER } from '@/lib/erp/modules';
import { ErpIcon } from '@/components/erp/icons';

export const metadata: Metadata = {
  title: 'Free NDT ERP Software — Quotes, Jobs, Reports & Invoices | NDT-Connect',
  description: 'Free ERP built for NDT and inspection companies: quotations on your Word letterhead, jobs, timesheets, UT/RT/MT/PT reports, invoices, POs, equipment, calibration and certificate alerts.',
  alternates: { canonical: 'https://ndt-connect.com/free-erp' },
  openGraph: { title: 'Free NDT ERP for inspection companies', description: 'Run your whole NDT business free — quotes to invoices, on your own letterhead.', url: 'https://ndt-connect.com/free-erp', type: 'website' },
};

const FAQ = [
  ['Is the NDT ERP really free?', 'Yes. Every module on this page is included free with an NDT-Connect provider account — no trial period, no credit card, no per-user fee.'],
  ['Can I use my own company letterhead?', 'Yes. Upload your letterhead as a Word .docx once. Quotations, invoices, purchase orders and inspection reports download as Word files that keep your header, footer, logo and page layout, or print to PDF.'],
  ['Who is it built for?', 'Independent NDT technicians, inspection contractors, testing laboratories and in-house inspection departments working in UT, PAUT, TOFD, RT, MT, PT, ET and VT across oil & gas, power, aerospace, maritime and construction.'],
  ['Does it handle certifications and calibration?', 'Yes. Technician certifications (ASNT, PCN, ISO 9712, API, CWI) and equipment calibration certificates are tracked with automatic expiry email alerts, alongside equipment issuance and maintenance records.'],
  ['Can a quote become a job and an invoice?', 'Yes. Mark a quotation Accepted and convert it to a job or an invoice in one click — client, line items, tax and terms carry over, and every document links back to its source.'],
  ['Is my data private?', 'Your records are visible only to your signed-in account. They are never shown to other members or on public pages.'],
];

export default function FreeErpPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'NDT-Connect NDT ERP', applicationCategory: 'BusinessApplication', operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url: 'https://ndt-connect.com/free-erp',
        featureList: MODULES.map(m => m.label).concat(['Certifications', 'Calibration alerts', 'AI procedure writer']).join(', ') },
      { '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };
  const signup = '/register?role=provider&redirect=/erp';
  return (
    <div className="mx-auto max-w-6xl space-y-16 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="space-y-5 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Free for NDT & inspection companies</p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Run your entire NDT business — free</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">Quotations on your own Word letterhead, jobs and timesheets, UT/RT/MT/PT inspection reports, invoices, purchase orders, equipment, certifications and calibration alerts. One login, no licence fees.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link href={signup}>Create free account</Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="/login?redirect=/erp">I already have an account</Link></Button>
        </div>
        <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {['No credit card', 'Unlimited quotes & invoices', 'Your letterhead on every document', 'Expiry alerts by email'].map(t =>
            <li key={t} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" />{t}</li>)}
        </ul>
      </section>

      <section className="grid gap-6 rounded-2xl border bg-muted/30 p-8 md:grid-cols-3">
        {[['1', 'Upload your letterhead', 'Your Word header and footer become the frame for every quote, invoice, PO and report.'],
          ['2', 'Quote → job → invoice', 'Price a scope with line items and tax, mark it accepted, convert to a job, then bill it — nothing retyped.'],
          ['3', 'Stay audit-ready', 'Technician certs, calibration certificates, equipment issuance and maintenance tracked with automatic reminders.']].map(([n, t, d]) => (
          <div key={n}><p className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{n}</p><p className="font-semibold">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
        ))}
      </section>

      <section className="space-y-8">
        <h2 className="text-center text-3xl font-bold">Every module an inspection company needs</h2>
        {GROUP_ORDER.map(g => (
          <div key={g}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{g}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MODULES.filter(m => m.group === g).map(m => (
                <div key={m.key} className="flex gap-3 rounded-lg border p-4"><ErpIcon name={m.icon} className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div><p className="font-medium">{m.label}</p><p className="text-sm text-muted-foreground">{m.description}</p></div></div>
              ))}
              {g === 'Assets' && <>
                <div className="flex gap-3 rounded-lg border p-4"><ErpIcon name="Wrench" className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><p className="font-medium">Equipment register</p><p className="text-sm text-muted-foreground">Instruments, probes, sources and serial numbers with status.</p></div></div>
                <div className="flex gap-3 rounded-lg border p-4"><ErpIcon name="CalendarClock" className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><p className="font-medium">Calibration alerts</p><p className="text-sm text-muted-foreground">Email reminders before calibration certificates expire.</p></div></div>
              </>}
              {g === 'People' && <div className="flex gap-3 rounded-lg border p-4"><ErpIcon name="Award" className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><p className="font-medium">Certifications</p><p className="text-sm text-muted-foreground">ASNT, PCN, ISO 9712, API and CWI certificates with expiry tracking.</p></div></div>}
              {g === 'Operations' && <div className="flex gap-3 rounded-lg border p-4"><ErpIcon name="FileSignature" className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><p className="font-medium">AI procedure writer</p><p className="text-sm text-muted-foreground">Draft code-referenced NDT procedures in minutes for Level III review.</p></div></div>}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl space-y-4">
        <h2 className="text-center text-3xl font-bold">Questions</h2>
        {FAQ.map(([q, a]) => <details key={q} className="rounded-lg border p-4"><summary className="cursor-pointer font-medium">{q}</summary><p className="mt-2 text-sm text-muted-foreground">{a}</p></details>)}
      </section>

      <section className="rounded-2xl bg-primary p-10 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold">Stop paying for software that wasn&apos;t built for NDT</h2>
        <p className="mx-auto mt-2 max-w-xl opacity-90">Set up in minutes. Your first quotation on your own letterhead can go out today.</p>
        <Button asChild size="lg" variant="secondary" className="mt-6"><Link href={signup}>Start free</Link></Button>
      </section>
    </div>
  );
}
