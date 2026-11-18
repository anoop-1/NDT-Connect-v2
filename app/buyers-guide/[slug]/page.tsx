import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin, CalendarDays, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BUYER_GUIDES, getGuide } from '@/lib/content/buyers-guide';
import { RichText } from '@/components/buyers-guide/RichText';

const BASE = 'https://ndt-connect.com';
export const dynamicParams = false;
export function generateStaticParams() { return BUYER_GUIDES.map(g => ({ slug: g.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuide(params.slug); if (!g) return {};
  const url = `${BASE}/buyers-guide/${g.slug}`;
  return {
    title: g.metaTitle, description: g.description, alternates: { canonical: url },
    openGraph: { title: g.title, description: g.description, url, type: 'article', modifiedTime: g.updated },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug); if (!g) notFound();
  const url = `${BASE}/buyers-guide/${g.slug}`;
  const strip = (s: string) => s.replace(/\*\*/g, '').replace(/\[\d+\]/g, '');
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: g.title, description: g.description, dateModified: g.updated, datePublished: g.updated,
        mainEntityOfPage: url, author: { '@type': 'Organization', name: 'NDT-Connect Editorial Team', url: BASE },
        publisher: { '@type': 'Organization', name: 'NDT Connect', url: BASE },
        about: g.industry, spatialCoverage: g.cities.map(c => ({ '@type': 'Place', name: c.name })),
        citation: g.references.map(r => r.url) },
      { '@type': 'FAQPage', mainEntity: g.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: "NDT Buyer's Guide", item: `${BASE}/buyers-guide` },
        { '@type': 'ListItem', position: 3, name: g.title, item: url } ] },
    ],
  };
  return (
    <div className="mx-auto max-w-6xl py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/buyers-guide" className="hover:underline">NDT Buyer&apos;s Guide</Link> / <span className="text-foreground">{g.region}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
        <article className="min-w-0">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand">{g.industry} · {g.region}</p>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">{g.title}</h1>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />Updated {new Date(g.updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" />NDT-Connect Editorial Team · {g.references.length} cited sources</span>
          </div>

          <div className="mt-6 rounded-xl border-l-4 border-brand bg-blue-50/60 p-5">
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-brand">Quick answer</p>
            <p className="leading-relaxed text-slate-800"><RichText text={g.quickAnswer} /></p>
          </div>

          <div className="prose-slate mt-8 space-y-10">
            {g.sections.map(s => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="mb-3 text-2xl font-bold">{s.h2}</h2>
                {s.paragraphs.map((p, i) => <p key={i} className="mb-4 leading-relaxed text-slate-700"><RichText text={p} /></p>)}
                {s.table && (
                  <div className="my-5 overflow-x-auto rounded-lg border">
                    <table className="w-full text-left text-sm">
                      <caption className="bg-slate-50 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{s.table.caption}</caption>
                      <thead className="bg-slate-100"><tr>{s.table.head.map(h => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}</tr></thead>
                      <tbody>{s.table.rows.map((r, i) => <tr key={i} className="border-t align-top">{r.map((c, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? 'font-medium' : ''}`}><RichText text={c} /></td>)}</tr>)}</tbody>
                    </table>
                  </div>
                )}
                {s.bullets && <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-700">{s.bullets.map((b, i) => <li key={i}><RichText text={b} /></li>)}</ul>}
              </section>
            ))}

            <section id="faq" className="scroll-mt-24">
              <h2 className="mb-3 text-2xl font-bold">Frequently asked questions</h2>
              <div className="space-y-3">{g.faqs.map(f => (
                <details key={f.q} className="rounded-lg border p-4"><summary className="cursor-pointer font-medium">{f.q}</summary><p className="mt-2 leading-relaxed text-slate-700">{f.a}</p></details>
              ))}</div>
            </section>

            <section className="rounded-2xl bg-brand p-8 text-white">
              <h2 className="text-2xl font-bold">Need this inspection scoped and quoted?</h2>
              <p className="mt-2 max-w-2xl opacity-90">Post your scope once on NDT-Connect and compare certified providers near {g.cities[0].name.split(',')[0]} and across the {g.region}. Free for buyers.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary"><Link href="/request-service">Request an inspection <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-brand"><Link href="/find-providers">Find providers</Link></Button>
              </div>
            </section>

            <section id="references" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-bold">References</h2>
              <ol className="list-decimal space-y-1.5 pl-6 text-sm text-slate-600">
                {g.references.map((r, i) => <li key={i} id={`ref-${i + 1}`} className="scroll-mt-24"><a href={r.url} target="_blank" rel="noopener noreferrer nofollow" className="hover:underline">{r.title}</a></li>)}
              </ol>
              <p className="mt-4 text-xs text-muted-foreground">This guide is general technical information for buyers, not engineering advice for a specific asset. Always apply your plant’s inspection program, the governing code edition and your customer’s specifications.</p>
            </section>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border p-5">
            <p className="mb-3 font-semibold">In this guide</p>
            <ul className="space-y-1.5 text-sm">{g.sections.map(s => <li key={s.id}><a href={`#${s.id}`} className="text-slate-600 hover:text-brand">{s.h2}</a></li>)}
              <li><a href="#faq" className="text-slate-600 hover:text-brand">FAQs</a></li><li><a href="#references" className="text-slate-600 hover:text-brand">References</a></li></ul>
          </div>
          <div className="rounded-xl border p-5">
            <p className="mb-3 flex items-center gap-1.5 font-semibold"><MapPin className="h-4 w-4 text-brand" />NDT providers by city</p>
            <ul className="space-y-1.5 text-sm">{g.cities.map(c => <li key={c.href}><Link href={c.href} className="text-slate-600 hover:text-brand">NDT services in {c.name}</Link></li>)}</ul>
          </div>
          <div className="rounded-xl border p-5">
            <p className="mb-3 font-semibold">Related reading</p>
            <ul className="space-y-1.5 text-sm">{g.related.map(r => <li key={r.href}><Link href={r.href} className="text-slate-600 hover:text-brand">{r.label}</Link></li>)}</ul>
          </div>
          <div className="rounded-xl border p-5">
            <p className="mb-3 font-semibold">More buyer&apos;s guides</p>
            <ul className="space-y-1.5 text-sm">{BUYER_GUIDES.filter(x => x.slug !== g.slug).map(x => <li key={x.slug}><Link href={`/buyers-guide/${x.slug}`} className="text-slate-600 hover:text-brand">{x.region}: {x.industry}</Link></li>)}</ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
