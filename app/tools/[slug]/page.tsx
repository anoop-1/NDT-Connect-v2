import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import ContentPage from '@/components/content/ContentPage';
import { toolSections } from '@/components/content/sections-from-arbitrary';
import { listSlugs, loadTool } from '@/lib/content/authored';

interface Props { params: { slug: string } }

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  return listSlugs('tools').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await loadTool(params.slug);
  if (!t) return { title: 'Not found' };
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `https://ndt-connect.com/tools/${params.slug}` },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: `https://ndt-connect.com/tools/${params.slug}`,
      type: 'website',
    },
  };
}

// Map slug → calculator widget. The widget file lives in
// components/tools/calculators/[slug].tsx and is dynamically imported so the
// build doesn't try to resolve every slug at compile time.
function loadCalculator(slug: string) {
  return dynamic(() => import(`@/components/tools/calculators/${slug}`).catch(() => ({ default: () => null })), {
    ssr: false,
    loading: () => <div className="text-sm text-muted-foreground">Loading calculator…</div>,
  });
}

export default async function ToolAuthoredPage({ params }: Props) {
  const t = await loadTool(params.slug);
  if (!t) notFound();

  const Calculator = loadCalculator(params.slug);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: t.name,
      applicationCategory: 'EngineeringApplication',
      description: t.metaDescription,
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
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

  const calculatorPanel = (
    <div className="my-8 p-6 bg-card rounded-xl border border-border shadow-sm">
      <Calculator />
    </div>
  );

  return (
    <ContentPage
      title={t.name}
      lede={t.heroLede}
      sections={toolSections(t)}
      faqs={t.faqs}
      citations={t.citations}
      breadcrumb={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: t.name, url: `/tools/${params.slug}` },
      ]}
      schemaJsonLd={schema}
      extraTop={calculatorPanel}
    />
  );
}
