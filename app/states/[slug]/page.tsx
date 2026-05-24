import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentPage from '@/components/content/ContentPage';
import { stateSections } from '@/components/content/sections-from-arbitrary';
import { listSlugs, loadState } from '@/lib/content/authored';

interface Props { params: { slug: string } }

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  return listSlugs('states').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await loadState(params.slug);
  if (!s) return { title: 'Not found' };
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `https://ndt-connect.com/states/${params.slug}` },
    openGraph: {
      title: s.metaTitle,
      description: s.metaDescription,
      url: `https://ndt-connect.com/states/${params.slug}`,
      type: 'article',
    },
  };
}

export default async function StateAuthoredPage({ params }: Props) {
  const s = await loadState(params.slug);
  if (!s) notFound();

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: s.metaTitle,
      description: s.metaDescription,
      mainEntityOfPage: `https://ndt-connect.com/states/${params.slug}`,
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
      mainEntity: s.faqs.map((f: { q: string; a: string }) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <ContentPage
      title={`NDT Inspection in ${s.name} — State Market Guide`}
      lede={s.heroLede}
      sections={stateSections(s)}
      faqs={s.faqs}
      citations={s.citations}
      internalLinks={s.internalLinks}
      breadcrumb={[
        { name: 'Home', url: '/' },
        { name: 'NDT by State', url: '/states' },
        { name: s.name, url: `/states/${params.slug}` },
      ]}
      schemaJsonLd={schema}
    />
  );
}
