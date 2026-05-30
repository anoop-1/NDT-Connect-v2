import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContentPage from '@/components/content/ContentPage';
import { pillarSections } from '@/components/content/sections-from-arbitrary';
import { listSlugs, loadPillar } from '@/lib/content/authored';

interface Props { params: { slug: string } }

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  return listSlugs('pillars').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await loadPillar(params.slug);
  if (!p) return { title: 'Not found' };
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: `https://ndt-connect.com/pillars/${params.slug}` },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url: `https://ndt-connect.com/pillars/${params.slug}`,
      type: 'article',
      siteName: 'NDT Connect',
      images: ['https://ndt-connect.com/opengraph-image'],
    },
    twitter: { card: 'summary_large_image', title: p.metaTitle, description: p.metaDescription, images: ['https://ndt-connect.com/opengraph-image'] },
  };
}

export default async function PillarAuthoredPage({ params }: Props) {
  const p = await loadPillar(params.slug);
  if (!p) notFound();

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: p.metaTitle,
      description: p.metaDescription,
      mainEntityOfPage: `https://ndt-connect.com/pillars/${params.slug}`,
      author: { '@type': 'Person', name: 'Anoop Rayavarapu' },
      publisher: {
        '@type': 'Organization',
        name: 'NDT Connect',
        logo: { '@type': 'ImageObject', url: 'https://ndt-connect.com/logo.png' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.faqs.map((f: { q: string; a: string }) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  const subPagesPanel = (
    <div className="my-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
      <h2 className="text-xl font-bold text-primary mb-4">Articles in this cluster</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {p.subPages.map((s: { href: string; label: string; description: string }, i: number) => (
          <Link
            key={i}
            href={s.href}
            className="block p-4 bg-white rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="font-semibold text-foreground mb-1">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <ContentPage
      title={p.metaTitle}
      lede={p.heroLede}
      sections={pillarSections(p)}
      faqs={p.faqs}
      citations={p.citations}
      internalLinks={p.internalLinks}
      breadcrumb={[
        { name: 'Home', url: '/' },
        { name: 'Topic Hubs', url: '/pillars' },
        { name: p.metaTitle, url: `/pillars/${params.slug}` },
      ]}
      schemaJsonLd={schema}
      extraTop={subPagesPanel}
    />
  );
}

