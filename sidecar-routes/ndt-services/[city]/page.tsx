import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin, CalendarDays, BookOpen, Building2, Factory } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CITY_HUBS, getCityHub } from '@/lib/content/city-hubs';
import { RichText } from '@/components/buyers-guide/RichText';

const BASE = 'https://ndt-connect.com';
export const dynamicParams = false;
export function generateStaticParams() { return CITY_HUBS.map(c => ({ city: c.slug })); }

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const c = getCityHub(params.city); if (!c) return {};
  const url = `${BASE}/ndt-services/${c.slug}`;
  return {
    title: c.metaTitle, description: c.description, alternates: { canonical: url },
    openGraph: { title: c.title, description: c.description, url, type: 'article', modifiedTime: c.updated },
  };
}

export default function CityHubPage({ params }: { params: { city: string } }) {
  const c = getCityHub(params.city); if (!c) notFound();
  const url = `${BASE}/ndt-services/${c.slug}`;
  const strip = (s: string) => s.replace(/\*\*/g, '').replace(/\[\d+\]/g, '');
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', name: `NDT inspection services in ${c.city}`, serviceType: 'Non-destructive testing and inspection',
        areaServed: { '@type': 'City', name: c.city, containedInPlace: { '@type': 'Country', name: c.country } },
        provider: { '@type': 'Organization', name: 'NDT Connect', url: BASE }, url },
      { '@type': 'Article', headline: c.title, description: c.description, dateModified: c.updated, datePublished: c.updated,
        mainEntityOfPage: url, author: { '@type': 'Organization', name: 'NDT-Connect Editorial Team', url: BASE },
        publisher: { '@type': 'Organization', name: 'NDT Connect', url: BASE }, citation: c.references.map(r => r.url) },
      { '@type': 'FAQPage', mainEntity: c.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'NDT Locations', item: `${BASE}/ndt-locations` },
        { '@type': 'ListItem', position: 3, name: c.country, item: `${BASE}/ndt-locations#${c.countrySlug}` },
        { '@type': 'ListItem', position: 4, name: c.city, item: url } ] },
    ],
  };
  return (
    <div className="mx-auto max-w-6xl py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/ndt-locations" className="hover:underline">NDT Locations</Link> / <Link href={`/ndt-locations#${c.countrySlug}`} className="hover:underline">{c.country}</Link> / <span className="text-foreground">{c.city}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
        <article className="min-w-0">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand">{c.region} · {c.country}</p>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">{c.title}</h1>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />Updated {new Date(c.updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" />NDT-Connect Editorial Team · {c.references.length} cited sources</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/request-service">Request an inspection quote <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/claim">List your company free</Link></Button>
          </div>

          <div className="mt-6 rounded-xl border-l-4 border-brand bg-blue-50/60 p-5">
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-brand">At a glance</p>
            <p className="leading-relaxed text-slate-800"><RichText text={c.quickAnswer} /></p>
          </div>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {c.keyFacts.map(f => (
              <div key={f.label} className="rounded-lg border p-4"><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{f.label}</dt><dd className="mt-1 text-slate-800"><RichText text={f.value} /></dd></div>
            ))}
          </dl>

          <div className="prose-slate mt-8 space-y-10">
            {c.sections.map(s => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="mb-3 text-2xl font-bold">{s.h2}</h2>
                {s.paragraphs.map((p, i) => <p key={i} className="mb-4 leading-relaxed text-slate-700"><RichText text={p} /></p>)}
                {s.table && (
                  <div className="my-5 overflow-x-auto rounded-lg border">
                    <table className="w-full text-left text-sm">
                      <caption className="bg-slate-50 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{s.table.caption}</caption>
                      <thead className="bg-slate-100"><tr>{s.table.head.map(h => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}</tr></thead>
                      <tbody>{s.table.rows.map((r, i) => <tr key={i} className="border-t align-top">{r.map((v, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? 'font-medium' : ''}`}><RichText text={v} /></td>)}</tr>)}</tbody>
                    </table>
                  </div>
                )}
                {s.bullets && <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-700">{s.bullets.map((b, i) => <li key={i}><RichText text={b} /></li>)}</ul>}
              </section>
            ))}

            <section id="faq" className="scroll-mt-24">
              <h2 className="mb-3 text-2xl font-bold">Frequently asked questions about NDT in {c.city}</h2>
              <div className="space-y-3">{c.faqs.map(f => (
                <details key={f.q} className="rounded-lg border p-4"><summary className="cursor-pointer font-medium">{f.q}</summary><p className="mt-2 leading-relaxed text-slate-700"><RichText text={f.a} /></p></details>
              ))}</div>
            </section>

            <section className="rounded-2xl bg-brand p-8 text-white">
              <h2 className="text-2xl font-bold">Get NDT quotes in {c.city}</h2>
              <p className="mt-2 max-w-2xl opacity-90">Post your scope once and compare certified inspection companies serving {c.city} and {c.region}. Free for buyers. Providers: list your company free and quote with the free NDT ERP.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary"><Link href="/request-service">Request an inspection <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-brand"><Link href="/free-erp">Free NDT ERP for providers</Link></Button>
              </div>
            </section>

            <section id="references" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-bold">References</h2>
              <ol className="list-decimal space-y-1.5 pl-6 text-sm text-slate-600">
                {c.references.map((r, i) => <li key={i} id={`ref-${i + 1}`} className="scroll-mt-24"><a href={r.url} target="_blank" rel="noopener noreferrer nofollow" className="hover:underline">{r.title}</a></li>)}
              </ol>
              <p className="mt-4 text-xs text-muted-foreground">Rates shown are indicative ranges for budgeting, not quotes. Facility and regulatory details are drawn from the cited public sources as of the update date; always confirm the governing code edition and client specifications for your asset.</p>
            </section>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border p-5">
            <p className="mb-3 font-semibold">On this page</p>
            <ul className="space-y-1.5 text-sm">{c.sections.map(s => <li key={s.id}><a href={`#${s.id}`} className="text-slate-600 hover:text-brand">{s.h2}</a></li>)}
              <li><a href="#faq" className="text-slate-600 hover:text-brand">FAQs</a></li><li><a href="#references" className="text-slate-600 hover:text-brand">References</a></li></ul>
          </div>
          <div className="rounded-xl border p-5">
            <p className="mb-3 flex items-center gap-1.5 font-semibold"><Factory className="h-4 w-4 text-brand" />Key industries</p>
            <div className="flex flex-wrap gap-2">{c.industries.map(i => <span key={i} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{i}</span>)}</div>
          </div>
          <div className="rounded-xl border p-5">
            <p className="mb-3 flex items-center gap-1.5 font-semibold"><MapPin className="h-4 w-4 text-brand" />Nearby NDT locations</p>
            <ul className="space-y-1.5 text-sm">{c.nearby.map(n => <li key={n.href}><Link href={n.href} className="text-slate-600 hover:text-brand">NDT services in {n.name}</Link></li>)}
              <li><Link href="/ndt-locations" className="font-medium text-brand hover:underline">All NDT locations →</Link></li></ul>
          </div>
          <div className="rounded-xl border p-5">
            <p className="mb-3 flex items-center gap-1.5 font-semibold"><Building2 className="h-4 w-4 text-brand" />Tools and guides</p>
            <ul className="space-y-1.5 text-sm">{c.related.map(r => <li key={r.href}><Link href={r.href} className="text-slate-600 hover:text-brand">{r.label}</Link></li>)}</ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
