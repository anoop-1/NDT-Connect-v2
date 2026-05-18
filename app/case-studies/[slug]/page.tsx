import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentPage from '@/components/content/ContentPage';
import { caseStudySections } from '@/components/content/sections-from-arbitrary';
import { listSlugs, loadCaseStudy } from '@/lib/content/authored';

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return listSlugs('case-studies').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await loadCaseStudy(params.slug);
  if (!c) return { title: 'Not found' };
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `https://ndt-connect.com/case-studies/${params.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `https://ndt-connect.com/case-studies/${params.slug}`,
      type: 'article',
    },
  };
}

export default async function CaseStudyAuthoredPage({ params }: Props) {
  const c = await loadCaseStudy(params.slug);
  if (!c) notFound();

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: c.metaTitle,
      description: c.metaDescription,
      mainEntityOfPage: `https://ndt-connect.com/case-studies/${params.slug}`,
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
      mainEntity: c.faqs.map((f: { q: string; a: string }) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <ContentPage
      title={`Case Study: ${c.assetType} — ${c.industry}`}
      lede={c.heroLede}
      sections={caseStudySections(c)}
      faqs={c.faqs}
      citations={c.citations}
      internalLinks={c.internalLinks}
      breadcrumb={[
        { name: 'Home', url: '/' },
        { name: 'Case Studies', url: '/case-studies' },
        { name: c.assetType, url: `/case-studies/${params.slug}` },
      ]}
      schemaJsonLd={schema}
    />
  );
}
