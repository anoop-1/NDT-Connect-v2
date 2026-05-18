import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentPage from '@/components/content/ContentPage';
import { learnSections } from '@/components/content/sections-from-arbitrary';
import { listSlugs, loadLearn } from '@/lib/content/authored';

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return listSlugs('learn').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = await loadLearn(params.slug);
  if (!l) return { title: 'Not found' };
  return {
    title: l.metaTitle,
    description: l.metaDescription,
    alternates: { canonical: `https://ndt-connect.com/learn/${params.slug}` },
    openGraph: {
      title: l.metaTitle,
      description: l.metaDescription,
      url: `https://ndt-connect.com/learn/${params.slug}`,
      type: 'article',
    },
  };
}

export default async function LearnAuthoredPage({ params }: Props) {
  const l = await loadLearn(params.slug);
  if (!l) notFound();

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': l.category === 'how-to' ? 'HowTo' : 'Article',
      name: l.metaTitle,
      description: l.metaDescription,
      mainEntityOfPage: `https://ndt-connect.com/learn/${params.slug}`,
      author: { '@type': 'Person', name: 'Anoop Rayavarapu' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: l.relatedFaqs.map((f: { q: string; a: string }) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <ContentPage
      title={l.metaTitle}
      lede={l.heroLede}
      audience={l.audience}
      sections={learnSections(l)}
      faqs={l.relatedFaqs}
      citations={l.citations}
      internalLinks={l.internalLinks}
      breadcrumb={[
        { name: 'Home', url: '/' },
        { name: 'Learn', url: '/learn' },
        { name: l.metaTitle, url: `/learn/${params.slug}` },
      ]}
      schemaJsonLd={schema}
    />
  );
}
