import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, Globe2, Wrench, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NDT_LEADERS } from '@/lib/content/ndt-leaders';

export const metadata: Metadata = {
  title: 'NDT Leaders — Profiles of the People Shaping Nondestructive Testing',
  description: 'Introductions to the engineers, Level IIIs and founders moving the NDT industry forward — their careers, technologies and advice. Part of the global NDT-Connect community.',
  alternates: { canonical: 'https://ndt-connect.com/ndt-leaders' },
};

export default function LeadersHub() {
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'NDT Leaders',
    itemListElement: NDT_LEADERS.map((l, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://ndt-connect.com/ndt-leaders/${l.slug}`, name: l.name })) };
  return (
    <div className="mx-auto max-w-6xl space-y-14 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="space-y-4 text-center">
        <p className="flex items-center justify-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-brand"><Award className="h-4 w-4" />NDT Leaders series</p>
        <h1 className="text-4xl font-bold md:text-5xl">The people shaping nondestructive testing</h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">In-depth introductions to the Level IIIs, engineers and founders moving our industry forward — how they built their careers, the technologies they champion and what they would tell the next generation.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {NDT_LEADERS.map(l => (
          <Link key={l.slug} href={`/ndt-leaders/${l.slug}`} className="group flex flex-col rounded-2xl border p-6 transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-lg font-bold text-white" aria-hidden>{l.name.split(' ').map(p => p[0]).join('').slice(0, 2)}</div>
            <h2 className="text-xl font-bold group-hover:text-brand">{l.honorific ? `${l.honorific} ` : ''}{l.name}</h2>
            <p className="mt-1 text-sm font-medium text-slate-700">{l.role}</p>
            <p className="mt-3 flex-1 text-sm text-slate-600">{l.headline}</p>
            <p className="mt-4 flex items-center text-sm font-semibold text-brand">Read the profile <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></p>
          </Link>
        ))}
      </div>

      <section className="rounded-2xl border bg-slate-50 p-8">
        <h2 className="text-center text-2xl font-bold">One platform for NDT people everywhere</h2>
        <p className="mx-auto mt-2 max-w-3xl text-center text-slate-600">NDT-Connect is built to connect the whole profession — technicians, Level IIIs, inspection companies, trainers and asset owners — across every country and method.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[[Globe2, 'Find and be found', 'Certified providers in 220+ cities, and buyers posting real inspection scopes.', '/find-providers'],
            [Wrench, 'Free tools and a free ERP', '30+ NDT calculators, procedure writer, and quotes-to-invoices ERP for inspection companies.', '/free-erp'],
            [MessageSquare, 'Learn from the best', 'Method guides, buyer’s guides and profiles of the leaders shaping the industry.', '/buyers-guide']].map(([Icon, t, d, href]: any) => (
            <Link key={t} href={href} className="rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <Icon className="mb-2 h-6 w-6 text-brand" /><p className="font-semibold">{t}</p><p className="text-sm text-slate-600">{d}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link href="/register">Join NDT-Connect free</Link></Button>
          <Button asChild size="lg" variant="outline"><a href="mailto:info@ndt-connect.com?subject=Nominate%20an%20NDT%20Leader">Nominate an NDT leader</a></Button>
        </div>
      </section>
    </div>
  );
}
