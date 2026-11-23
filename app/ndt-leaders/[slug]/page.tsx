import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Award, CalendarDays, Quote, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NDT_LEADERS, getLeader } from '@/lib/content/ndt-leaders';
import { RichText } from '@/components/buyers-guide/RichText';

const BASE = 'https://ndt-connect.com';
export const dynamicParams = false;
export function generateStaticParams() { return NDT_LEADERS.map(l => ({ slug: l.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const l = getLeader(params.slug); if (!l) return {};
  const url = `${BASE}/ndt-leaders/${l.slug}`;
  return { title: l.metaTitle, description: l.description, alternates: { canonical: url },
    openGraph: { title: l.title, description: l.description, url, type: 'profile' } };
}

export default function LeaderPage({ params }: { params: { slug: string } }) {
  const l = getLeader(params.slug); if (!l) notFound();
  const url = `${BASE}/ndt-leaders/${l.slug}`;
  const strip = (s: string) => s.replace(/\*\*/g, '').replace(/\[\d+\]/g, '');
  const initials = l.name.split(' ').map(p => p[0]).join('').slice(0, 2);
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'ProfilePage', url, name: l.title, dateModified: l.updated,
        mainEntity: { '@type': 'Person', name: l.name, honorificPrefix: l.honorific, jobTitle: l.role,
          worksFor: { '@type': 'Organization', name: l.organization }, knowsAbout: l.expertise, hasCredential: l.credentials, sameAs: l.sameAs, description: strip(l.quickBio) } },
      { '@type': 'Article', headline: l.title, description: l.description, dateModified: l.updated, datePublished: l.updated, mainEntityOfPage: url,
        author: { '@type': 'Organization', name: 'NDT-Connect Editorial Team', url: BASE }, publisher: { '@type': 'Organization', name: 'NDT Connect', url: BASE },
        about: { '@type': 'Person', name: l.name }, citation: Array.from(new Set(l.references.map(r => r.url))) },
      { '@type': 'FAQPage', mainEntity: l.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'NDT Leaders', item: `${BASE}/ndt-leaders` },
        { '@type': 'ListItem', position: 3, name: l.name, item: url } ] },
    ],
  };
  return (
    <div className="mx-auto max-w-6xl py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/ndt-leaders" className="hover:underline">NDT Leaders</Link> / <span className="text-foreground">{l.name}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <article className="min-w-0">
          <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-brand"><Award className="h-4 w-4" />NDT Leaders series</p>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">{l.title}</h1>
          <p className="mt-3 text-lg text-slate-600">{l.headline}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />Updated {new Date(l.updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>NDT-Connect Editorial Team · {new Set(l.references.map(r => r.url)).size} public sources</span>
          </div>
          {l.disclosure && <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"><strong>Disclosure:</strong> {l.disclosure}</p>}

          <div className="mt-6 rounded-xl border-l-4 border-brand bg-blue-50/60 p-5">
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-brand">At a glance</p>
            <p className="leading-relaxed text-slate-800"><RichText text={l.quickBio} /></p>
          </div>

          <div className="mt-8 space-y-10">
            {l.sections.map((s, idx) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="mb-3 text-2xl font-bold">{s.h2}</h2>
                {s.paragraphs.map((p, i) => <p key={i} className="mb-4 leading-relaxed text-slate-700"><RichText text={p} /></p>)}
                {s.bullets && <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-700">{s.bullets.map((b, i) => <li key={i}><RichText text={b} /></li>)}</ul>}
                {idx === 2 && l.quote && (
                  <blockquote className="my-6 flex gap-3 rounded-xl bg-slate-50 p-5 text-lg italic text-slate-800">
                    <Quote className="h-6 w-6 shrink-0 text-brand" /><span>“{l.quote.text}” <span className="not-italic text-sm text-muted-foreground">— {l.name} <sup><a href={`#ref-${l.quote.source}`} className="text-brand">[{l.quote.source}]</a></sup></span></span>
                  </blockquote>
                )}
              </section>
            ))}
            <section id="faq" className="scroll-mt-24">
              <h2 className="mb-3 text-2xl font-bold">Frequently asked questions</h2>
              <div className="space-y-3">{l.faqs.map(f => <details key={f.q} className="rounded-lg border p-4"><summary className="cursor-pointer font-medium">{f.q}</summary><p className="mt-2 leading-relaxed text-slate-700">{f.a}</p></details>)}</div>
            </section>
            <section className="rounded-2xl bg-brand p-8 text-white">
              <h2 className="text-2xl font-bold">Connect with the global NDT community</h2>
              <p className="mt-2 max-w-2xl opacity-90">NDT-Connect brings technicians, Level IIIs, inspection companies and asset owners together — with free tools, a free NDT ERP and a marketplace for inspection work.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary"><Link href="/register">Join free</Link></Button>
                <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-brand"><Link href="/ndt-leaders">Meet more NDT leaders</Link></Button>
              </div>
            </section>
            <section id="references" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-bold">Sources</h2>
              <ol className="list-decimal space-y-1.5 pl-6 text-sm text-slate-600">
                {l.references.map((r, i) => <li key={i} id={`ref-${i + 1}`} className="scroll-mt-24"><a href={r.url} target="_blank" rel="noopener noreferrer nofollow" className="hover:underline">{r.title}</a></li>)}
              </ol>
              <p className="mt-4 text-xs text-muted-foreground">This profile is compiled from publicly published sources. Corrections or updates: <a className="underline" href="mailto:info@ndt-connect.com?subject=NDT%20Leaders%20profile%20correction">info@ndt-connect.com</a>.</p>
            </section>
          </div>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border p-5">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-xl font-bold text-white" aria-hidden>{initials}</div>
            <p className="text-lg font-bold">{l.honorific ? `${l.honorific} ` : ''}{l.name}</p>
            <p className="text-sm text-slate-600">{l.role}</p>
            <p className="mt-1 text-xs text-muted-foreground">{l.location}</p>
            <dl className="mt-4 space-y-2 text-sm">{l.highlights.map(h => <div key={h.label}><dt className="text-xs uppercase tracking-wide text-muted-foreground">{h.label}</dt><dd className="text-slate-800">{h.value}</dd></div>)}</dl>
          </div>
          <div className="rounded-xl border p-5">
            <p className="mb-2 font-semibold">Expertise</p>
            <div className="flex flex-wrap gap-1.5">{l.expertise.map(e => <span key={e} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-700">{e}</span>)}</div>
          </div>
          <div className="rounded-xl border p-5">
            <p className="mb-3 font-semibold">Related reading</p>
            <ul className="space-y-1.5 text-sm">{l.related.map(r => <li key={r.href}><Link href={r.href} className="text-slate-600 hover:text-brand">{r.label}</Link></li>)}</ul>
          </div>
          <div className="rounded-xl border p-5">
            <p className="mb-3 flex items-center gap-1.5 font-semibold"><Users className="h-4 w-4 text-brand" />More NDT leaders</p>
            <ul className="space-y-1.5 text-sm">{NDT_LEADERS.filter(x => x.slug !== l.slug).map(x => <li key={x.slug}><Link href={`/ndt-leaders/${x.slug}`} className="text-slate-600 hover:text-brand">{x.honorific ? `${x.honorific} ` : ''}{x.name}</Link></li>)}</ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
