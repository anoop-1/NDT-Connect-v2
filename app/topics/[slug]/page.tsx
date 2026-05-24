import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentPage from '@/components/content/ContentPage';
import { listSlugs, loadTopic } from '@/lib/content/authored';

interface Props { params: { slug: string } }

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  return listSlugs('topics').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await loadTopic(params.slug);
  if (!t) return { title: 'Not found' };
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `https://ndt-connect.com/topics/${params.slug}` },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: `https://ndt-connect.com/topics/${params.slug}`,
      type: 'article',
    },
  };
}

export default async function TopicAuthoredPage({ params }: Props) {
  const t = await loadTopic(params.slug);
  if (!t) notFound();

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: t.metaTitle,
      description: t.metaDescription,
      mainEntityOfPage: `https://ndt-connect.com/topics/${params.slug}`,
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
      mainEntity: t.faqs.map((f: { q: string; a: string }) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <ContentPage
      title={t.title}
      lede={t.heroLede}
      audience={t.audience}
      sections={t.sections}
      faqs={t.faqs}
      citations={t.citations}
      internalLinks={t.internalLinks}
      breadcrumb={[
        { name: 'Home', url: '/' },
        { name: 'Topics', url: '/topics' },
        { name: t.title, url: `/topics/${params.slug}` },
      ]}
      schemaJsonLd={schema}
    />
  );
}
