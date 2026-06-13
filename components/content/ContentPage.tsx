// Shared shell for hand-authored long-form content pages.
// Consumes the data shapes from lib/content/authored/types.ts and renders a
// consistent layout: hero, TOC, body sections, FAQ, citations, internal
// links, author byline. Route-specific schema is injected via the `schema`
// prop (already JSON-LD-ready).

import Link from 'next/link';
import type { ReactNode } from 'react';
import { PRIMARY_AUTHOR, type Author, type Section, type Faq, type Citation, type InternalLink } from '@/lib/content/authored/types';
import JoinCTA from '@/components/seo/JoinCTA';

export interface ContentPageProps {
  title: string;
  lede: string; // hero paragraph(s)
  audience?: string;
  sections: Section[];
  faqs?: Faq[];
  citations?: Citation[];
  internalLinks?: InternalLink[];
  author?: Author;
  lastReviewed?: string; // ISO date or human label; default = current month
  breadcrumb?: { name: string; url: string }[];
  schemaJsonLd?: object | object[];
  extraTop?: ReactNode; // optional widget slot (e.g. tool calculator)
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function defaultReviewLabel() {
  const d = new Date();
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function slugifyHeading(h: string): string {
  return h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function SectionView({ section }: { section: Section }) {
  const id = slugifyHeading(section.heading);
  const HeadingTag = section.level === 3 ? 'h3' : 'h2';
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      {section.level === 3 ? (
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4 mt-8">{section.heading}</h3>
      ) : (
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 mt-12 border-b pb-2">{section.heading}</h2>
      )}
      {section.paragraphs.map((p, i) => (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
      ))}
      {section.callout && (
        <div
          className={`my-6 p-5 rounded-lg border-l-4 ${
            section.callout.kind === 'warn'
              ? 'border-orange-500 bg-orange-50'
              : section.callout.kind === 'spec'
              ? 'border-blue-500 bg-blue-50'
              : 'border-primary bg-primary/5'
          }`}
        >
          <div className="font-semibold mb-1 text-foreground">{section.callout.title}</div>
          <div className="text-sm text-muted-foreground">{section.callout.body}</div>
        </div>
      )}
      {section.list && (
        <div className="my-4">
          {section.list.title && <p className="font-semibold text-foreground mb-2">{section.list.title}</p>}
          {section.list.ordered ? (
            <ol className="list-decimal list-outside ml-6 space-y-2 text-muted-foreground">
              {section.list.items.map((item, i) => <li key={i}>{item}</li>)}
            </ol>
          ) : (
            <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground">
              {section.list.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          )}
        </div>
      )}
      {section.table && (
        <div className="my-6 overflow-x-auto">
          {section.table.caption && <p className="text-sm text-muted-foreground italic mb-2">{section.table.caption}</p>}
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-primary/30">
                {section.table.headers.map((h, i) => (
                  <th key={i} className="text-left py-2 pr-4 font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, r) => (
                <tr key={r} className="border-b border-border last:border-0">
                  {row.map((cell, c) => (
                    <td key={c} className="py-2 pr-4 text-muted-foreground">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.code && (
        <pre className="my-4 p-4 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto text-sm">
          <code>{section.code.body}</code>
        </pre>
      )}
    </section>
  );
}

function TOC({ sections }: { sections: Section[] }) {
  const h2s = sections.filter((s) => s.level === 2);
  if (h2s.length < 3) return null;
  return (
    <nav aria-label="Table of contents" className="my-8 p-5 bg-muted/40 rounded-lg border border-border">
      <p className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">On this page</p>
      <ul className="space-y-1.5 text-sm">
        {h2s.map((s, i) => (
          <li key={i}>
            <a href={`#${slugifyHeading(s.heading)}`} className="text-primary hover:underline">
              {s.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FaqList({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;
  return (
    <section id="faq" className="mt-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 border-b pb-2">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((f, i) => (
          <div key={i} className="border-l-4 border-primary/30 pl-5">
            <p className="font-semibold text-foreground mb-2">{f.q}</p>
            <p className="text-muted-foreground leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CitationsList({ citations }: { citations: Citation[] }) {
  if (!citations.length) return null;
  return (
    <section id="citations" className="mt-12 scroll-mt-24">
      <h2 className="text-xl font-bold text-primary mb-4">References & Standards Cited</h2>
      <ol className="list-decimal list-outside ml-6 space-y-2 text-sm text-muted-foreground">
        {citations.map((c) => (
          <li key={c.id} id={`cite-${c.id}`}>
            {c.source}
            {c.url && (
              <>
                {' '}
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">↗</a>
              </>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function InternalLinkList({ links }: { links: InternalLink[] }) {
  if (!links.length) return null;
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-primary mb-4">Related on NDT Connect</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {links.map((l, i) => (
          <Link
            key={i}
            href={l.href}
            className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="font-semibold text-foreground mb-1">{l.label}</div>
            {l.context && <div className="text-xs text-muted-foreground line-clamp-2">{l.context}</div>}
          </Link>
        ))}
      </div>
    </section>
  );
}

function AuthorByline({ author, lastReviewed }: { author: Author; lastReviewed: string }) {
  return (
    <div className="mt-12 pt-6 border-t border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Authored by</span>{' '}
          <span className="font-semibold text-foreground">{author.name}</span>
          <span className="text-muted-foreground"> — {author.role}</span>
          <div className="text-xs text-muted-foreground mt-0.5">{author.certifications.join(' • ')}</div>
        </div>
        <div className="text-xs text-muted-foreground">Last reviewed: {lastReviewed}</div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{author.bio}</p>
    </div>
  );
}

function Breadcrumb({ items }: { items: { name: string; url: string }[] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6 flex flex-wrap gap-2">
      {items.map((it, i) => (
        <span key={i}>
          {i < items.length - 1 ? (
            <>
              <Link href={it.url} className="hover:text-primary">{it.name}</Link>
              <span className="mx-2">/</span>
            </>
          ) : (
            <span className="text-foreground">{it.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default function ContentPage(props: ContentPageProps) {
  const author = props.author ?? PRIMARY_AUTHOR;
  const lastReviewed = props.lastReviewed ?? defaultReviewLabel();
  const schemas = props.schemaJsonLd
    ? Array.isArray(props.schemaJsonLd)
      ? props.schemaJsonLd
      : [props.schemaJsonLd]
    : [];

  return (
    <article className="max-w-4xl mx-auto py-8 px-4">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      {props.breadcrumb && <Breadcrumb items={props.breadcrumb} />}
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">{props.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{props.lede}</p>
        {props.audience && (
          <p className="text-xs uppercase tracking-wide text-primary mt-3">For: {props.audience}</p>
        )}
      </header>

      {props.extraTop}

      <TOC sections={props.sections} />

      <div>
        {props.sections.map((section, i) => (
          <SectionView key={i} section={section} />
        ))}
      </div>

      {props.faqs && <FaqList faqs={props.faqs} />}
      {props.citations && <CitationsList citations={props.citations} />}
      {props.internalLinks && <InternalLinkList links={props.internalLinks} />}

      <JoinCTA />
      <AuthorByline author={author} lastReviewed={lastReviewed} />
    </article>
  );
}
