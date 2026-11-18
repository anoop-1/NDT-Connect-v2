import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { BUYER_GUIDES } from '@/lib/content/buyers-guide';

export const metadata: Metadata = {
  title: "NDT Buyer's Guide — Which Inspection Method, Where and Why",
  description: 'Region-by-region guides for US asset owners: which NDT method fits refineries, pipelines and aerospace parts, the codes behind it, and how to scope a comparable quote.',
  alternates: { canonical: 'https://ndt-connect.com/buyers-guide' },
};

export default function BuyersGuideHub() {
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: "NDT Buyer's Guide",
    itemListElement: BUYER_GUIDES.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://ndt-connect.com/buyers-guide/${g.slug}`, name: g.title })) };
  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">For plant owners, operators and buyers</p>
        <h1 className="text-4xl font-bold">NDT Buyer&apos;s Guide</h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">Which inspection method fits your problem, why, and how to scope it so quotes are comparable — written for the industries and regions where you actually buy NDT.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {BUYER_GUIDES.map(g => (
          <Link key={g.slug} href={`/buyers-guide/${g.slug}`} className="group flex flex-col rounded-2xl border p-6 transition-shadow hover:shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">{g.industry}</p>
            <h2 className="mt-1 text-xl font-bold group-hover:text-brand">{g.title}</h2>
            <p className="mt-2 flex-1 text-sm text-slate-600">{g.description}</p>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{g.cities.map(c => c.name.split(',')[0]).join(' · ')}</p>
            <p className="mt-3 flex items-center text-sm font-semibold text-brand">Read the guide <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></p>
          </Link>
        ))}
      </div>
    </div>
  );
}
