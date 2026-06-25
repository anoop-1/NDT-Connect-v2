import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen } from 'lucide-react';
import { listSlugs, loadPillar } from '@/lib/content/authored';

export const metadata: Metadata = {
  title: 'In-Depth NDT Guides (2026) | Complete Method, Weld, Pipeline & Tank Guides',
  description:
    'Comprehensive NDT cornerstone guides — ultrasonic, radiographic and phased array complete guides, weld inspection, pipeline and MFL, tank and refinery inspection, heat-exchanger tubes, corrosion monitoring and CWI certification.',
  keywords: ['NDT guide', 'ultrasonic testing complete guide', 'phased array guide', 'weld inspection guide', 'pipeline inspection', 'tank inspection', 'corrosion monitoring', 'CWI certification'],
  openGraph: { title: 'In-Depth NDT Guides', description: 'Comprehensive NDT cornerstone guides across methods, assets and certification.', url: 'https://ndt-connect.com/pillars', type: 'website' },
  alternates: { canonical: 'https://ndt-connect.com/pillars' },
};

export default async function PillarsHubPage() {
  const slugs = listSlugs('pillars');
  const pillars = (await Promise.all(slugs.map(async (slug) => {
    const p = await loadPillar(slug);
    return p ? { slug, title: (p.title as string) || (p.metaTitle as string), metaDescription: p.metaDescription as string } : null;
  }))).filter(Boolean) as { slug: string; title: string; metaDescription: string }[];

  const itemListSchema = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'In-Depth NDT Guides',
    itemListElement: pillars.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://ndt-connect.com/pillars/${p.slug}`, name: p.title })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ndt-connect.com' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ndt-connect.com/pillars' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
        <span className="text-foreground">Guides</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">In-Depth NDT Guides</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Long-form cornerstone guides — the complete method references, asset-specific inspection programs and certification
        paths, written to ASNT Level III depth with real code citations.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-12">
        {pillars.map((p) => (
          <Link key={p.slug} href={`/pillars/${p.slug}`} className="group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <BookOpen className="h-5 w-5 text-primary mb-1" />
                <CardTitle className="text-lg leading-snug group-hover:text-primary">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{p.metaDescription}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">Read guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section className="border-t pt-8">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/methods" className="text-primary underline">All NDT methods →</Link>
          <Link href="/learn" className="text-primary underline">How-to procedures →</Link>
          <Link href="/standards" className="text-primary underline">Codes &amp; standards →</Link>
        </div>
      </section>
    </div>
  );
}
