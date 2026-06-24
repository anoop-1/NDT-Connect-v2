import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentPage from '@/components/content/ContentPage';
import { learnSections } from '@/components/content/sections-from-arbitrary';
import { listSlugs, loadLearn } from '@/lib/content/authored';

interface Props { params: { slug: string } }

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

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

  const pageUrl = `https://ndt-connect.com/learn/${params.slug}`;
  const isHowTo = l.category === 'how-to';

  // HowTo: map H2 sections to steps so AI/Google can extract the procedure.
  const primary = isHowTo
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: l.metaTitle,
        description: l.metaDescription,
        mainEntityOfPage: pageUrl,
        dateModified: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)).toISOString().slice(0, 10),
        author: { '@type': 'Person', name: 'Anoop Rayavarapu' },
        step: (l.sections || [])
          .filter((s: { level: number }) => s.level === 2)
          .map((s: { heading: string; paragraphs: string[] }) => ({
            '@type': 'HowToStep',
            name: s.heading,
            text: (s.paragraphs || []).join(' ').slice(0, 500),
          })),
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Article',
        name: l.metaTitle,
        description: l.metaDescription,
        mainEntityOfPage: pageUrl,
        dateModified: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)).toISOString().slice(0, 10),
        author: { '@type': 'Person', name: 'Anoop Rayavarapu' },
      };

  const schema: object[] = [
    primary,
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

  // Dataset markup for the salary report — eligible for dataset rich results
  // and a strong AI-citation signal for "NDT salary" queries.
  if (params.slug === 'ndt-inspector-salary-guide') {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'US NDT Inspector Salary Ranges (2026)',
      description:
        'Non-destructive testing pay in the US for 2026 by certification level (I/II/III), method (UT, PAUT, RT, CWI), role, and industry.',
      url: pageUrl,
      creator: { '@type': 'Organization', name: 'NDT Connect', url: 'https://ndt-connect.com' },
      spatialCoverage: 'United States',
      temporalCoverage: '2026',
      keywords: ['NDT salary', 'NDT inspector pay', 'ASNT Level III salary', 'CWI salary', 'radiographer pay'],
    });
  }
  if (params.slug === 'ndt-inspection-cost-index') {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'US NDT Inspection Cost Index (2026)',
      description:
        'Typical US NDT inspection rates for 2026 by method (UT, PAUT, RT, MT, PT, ET, VT) with regional tier multipliers and cost drivers.',
      url: pageUrl,
      creator: { '@type': 'Organization', name: 'NDT Connect', url: 'https://ndt-connect.com' },
      spatialCoverage: 'United States',
      temporalCoverage: '2026',
      keywords: ['NDT inspection cost', 'NDT rates', 'UT cost', 'PAUT cost', 'radiography price', 'NDT price list'],
    });
  }

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
