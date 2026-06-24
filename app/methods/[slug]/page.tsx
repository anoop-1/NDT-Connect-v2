import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentPage from '@/components/content/ContentPage';
import { methodSections } from '@/components/content/sections-from-arbitrary';
import { listSlugs, loadMethod } from '@/lib/content/authored';

interface Props { params: { slug: string } }

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  return listSlugs('methods').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = await loadMethod(params.slug);
  if (!m) return { title: 'Not found' };
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { canonical: `https://ndt-connect.com/methods/${params.slug}` },
    openGraph: {
      title: m.metaTitle,
      description: m.metaDescription,
      url: `https://ndt-connect.com/methods/${params.slug}`,
      type: 'article',
    },
  };
}

export default async function MethodAuthoredPage({ params }: Props) {
  const m = await loadMethod(params.slug);
  if (!m) notFound();

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: m.metaTitle,
      description: m.metaDescription,
      mainEntityOfPage: `https://ndt-connect.com/methods/${params.slug}`,
      dateModified: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)).toISOString().slice(0, 10),
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
      mainEntity: m.faqs.map((f: { q: string; a: string }) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <ContentPage
      title={`${m.name} (${m.abbreviation}) — Complete Field Guide`}
      lede={m.heroLede}
      sections={methodSections(m)}
      faqs={m.faqs}
      citations={m.citations}
      internalLinks={m.internalLinks}
      breadcrumb={[
        { name: 'Home', url: '/' },
        { name: 'NDT Methods', url: '/methods' },
        { name: m.name, url: `/methods/${params.slug}` },
      ]}
      schemaJsonLd={schema}
    />
  );
}
