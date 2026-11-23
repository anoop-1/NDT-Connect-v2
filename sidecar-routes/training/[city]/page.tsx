import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin, CalendarDays, BookOpen, Building2, Factory, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TRAINING_HUBS, getTrainingHub } from '@/lib/content/training-hubs';
import { RichText } from '@/components/buyers-guide/RichText';

const BASE = 'https://ndt-connect.com';
export const dynamicParams = false;
export function generateStaticParams() { return TRAINING_HUBS.map(c => ({ city: c.slug })); }

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const c = getTrainingHub(params.city); if (!c) return {};
  const url = `${BASE}/training/${c.slug}`;
  return {
    title: c.metaTitle, description: c.description, alternates: { canonical: url },
    openGraph: { title: c.title, description: c.description, url, type: 'article', modifiedTime: c.updated },
  };
}

export default function TrainingHubPage({ params }: { params: { city: string } }) {
  const c = getTrainingHub(params.city); if (!c) notFound();
  const url = `${BASE}/training/${c.slug}`;
  const strip = (s: string) => s.replace(/\*\*/g, '').replace(/\[\d+\]/g, '');
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'ItemList', name: `NDT training providers serving ${c.city}`, numberOfItems: c.schools.length,
        itemListElement: c.schools.map((sc, i) => ({ '@type': 'ListItem', position: i + 1,
          item: { '@type': 'EducationalOrganization', name: sc.name, url: sc.url, address: sc.location } })) },
      { '@type': 'Article', headline: c.title, description: c.description, dateModified: c.updated, datePublished: c.updated,
        mainEntityOfPage: url, author: { '@type': 'Organization', name: 'NDT-Connect Editorial Team', url: BASE },
        publisher: { '@type': 'Organization', name: 'NDT Connect', url: BASE }, citation: c.references.map(r => r.url) },
      { '@type': 'FAQPage', mainEntity: c.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'NDT Training', item: `${BASE}/training` },
        { '@type': 'ListItem', position: 3, name: c.city, item: url } ] },
    ],
  };
  return (
    <div className="mx-auto max-w-6xl py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/training" className="hover:underline">NDT Training</Link> / <span className="text-foreground">{c.city}</span>
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
            <Button asChild size="lg"><Link href={`/register?redirect=/training/${c.slug}`}>Create your free NDT profile <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="#schools">See training providers</Link></Button>
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

          <section id="schools" className="mt-8 scroll-mt-24">
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold"><GraduationCap className="h-6 w-6 text-brand" />NDT training providers serving {c.city}</h2>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100"><tr><th className="px-3 py-2 font-semibold">Provider</th><th className="px-3 py-2 font-semibold">Type</th><th className="px-3 py-2 font-semibold">Location</th><th className="px-3 py-2 font-semibold">What they offer</th></tr></thead>
                <tbody>{c.schools.map(sc => (
                  <tr key={sc.name} className="border-t align-top">
                    <td className="px-3 py-2 font-medium"><a href={sc.url} target="_blank" rel="noopener noreferrer nofollow" className="text-brand hover:underline">{sc.name}</a></td>
                    <td className="px-3 py-2">{sc.type}</td><td className="px-3 py-2">{sc.location}</td><td className="px-3 py-2"><RichText text={sc.offers} /></td>
                  </tr>))}</tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Listed from each provider's published information as of the update date. NDT-Connect has no commercial relationship with these providers; confirm schedules, prices and accreditation directly. Run a school? <Link href="/claim" className="underline">Add or update your listing</Link>.</p>
          </section>

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
              <h2 className="mb-3 text-2xl font-bold">Frequently asked questions about NDT training in {c.city}</h2>
              <div className="space-y-3">{c.faqs.map(f => (
                <details key={f.q} className="rounded-lg border p-4"><summary className="cursor-pointer font-medium">{f.q}</summary><p className="mt-2 leading-relaxed text-slate-700"><RichText text={f.a} /></p></details>
              ))}</div>
            </section>

            <section className="rounded-2xl bg-brand p-8 text-white">
              <h2 className="text-2xl font-bold">Start or grow your NDT career in {c.city}</h2>
              <p className="mt-2 max-w-2xl opacity-90">Create a free NDT-Connect profile to track your certifications, get matched with employers and inspection companies hiring in {c.city}, and see local salary data.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary"><Link href={`/register?redirect=/training/${c.slug}`}>Create free profile <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-brand"><Link href="/learn/ndt-inspector-salary-guide">NDT salary guide</Link></Button>
              </div>
            </section>

            <section id="references" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-bold">References</h2>
              <ol className="list-decimal space-y-1.5 pl-6 text-sm text-slate-600">
                {c.references.map((r, i) => <li key={i} id={`ref-${i + 1}`} className="scroll-mt-24"><a href={r.url} target="_blank" rel="noopener noreferrer nofollow" className="hover:underline">{r.title}</a></li>)}
              </ol>
              <p className="mt-4 text-xs text-muted-foreground">Course costs and wages shown are indicative ranges drawn from cited public sources, not quotes. Certification and licensing rules change; confirm current requirements with the state agency, ASNT and your employer's written practice.</p>
            </section>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border p-5">
            <p className="mb-3 font-semibold">On this page</p>
            <ul className="space-y-1.5 text-sm">{c.sections.map(s => <li key={s.id}><a href={`#${s.id}`} className="text-slate-600 hover:text-brand">{s.h2}</a></li>)}
              <li><a href="#schools" className="text-slate-600 hover:text-brand">Training providers</a></li><li><a href="#faq" className="text-slate-600 hover:text-brand">FAQs</a></li><li><a href="#references" className="text-slate-600 hover:text-brand">References</a></li></ul>
          </div>
          <div className="rounded-xl border p-5">
            <p className="mb-3 flex items-center gap-1.5 font-semibold"><Factory className="h-4 w-4 text-brand" />Industries hiring</p>
            <div className="flex flex-wrap gap-2">{c.industries.map(i => <span key={i} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{i}</span>)}</div>
          </div>
          <div className="rounded-xl border p-5">
            <p className="mb-3 flex items-center gap-1.5 font-semibold"><MapPin className="h-4 w-4 text-brand" />NDT training nearby</p>
            <ul className="space-y-1.5 text-sm">{c.nearby.map(n => <li key={n.href}><Link href={n.href} className="text-slate-600 hover:text-brand">NDT training in {n.name}</Link></li>)}
              <li><Link href="/training" className="font-medium text-brand hover:underline">All NDT training →</Link></li></ul>
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
