import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentPage from '@/components/content/ContentPage';
import { equipmentSections } from '@/components/content/sections-from-arbitrary';
import { listSlugs, loadEquipment } from '@/lib/content/authored';

interface Props { params: { slug: string } }

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  return listSlugs('equipment').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = await loadEquipment(params.slug);
  if (!e) return { title: 'Not found' };
  return {
    title: e.metaTitle,
    description: e.metaDescription,
    alternates: { canonical: `https://ndt-connect.com/equipment/${params.slug}` },
    openGraph: {
      title: e.metaTitle,
      description: e.metaDescription,
      url: `https://ndt-connect.com/equipment/${params.slug}`,
      type: 'article',
    },
  };
}

export default async function EquipmentAuthoredPage({ params }: Props) {
  const e = await loadEquipment(params.slug);
  if (!e) notFound();

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${e.make} ${e.model}`,
      description: e.metaDescription,
      brand: { '@type': 'Brand', name: e.make },
      category: e.category,
      ...(e.msrpUSD
        ? {
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: e.msrpUSD,
              availability: 'https://schema.org/InStock',
            },
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: e.faqs.map((f: { q: string; a: string }) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <ContentPage
      title={`${e.make} ${e.model} — Review, Specs & Alternatives`}
      lede={e.heroLede}
      sections={equipmentSections(e)}
      faqs={e.faqs}
      citations={e.citations}
      internalLinks={e.internalLinks}
      breadcrumb={[
        { name: 'Home', url: '/' },
        { name: 'NDT Equipment', url: '/equipment' },
        { name: `${e.make} ${e.model}`, url: `/equipment/${params.slug}` },
      ]}
      schemaJsonLd={schema}
    />
  );
}
