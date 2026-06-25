import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, GitCompareArrows } from 'lucide-react';
import { listSlugs, loadComparison } from '@/lib/content/authored';

export const metadata: Metadata = {
  title: 'NDT Method Comparisons (2026) | UT vs RT, PAUT vs TOFD, MT vs PT',
  description:
    'Side-by-side NDT method comparisons — UT vs RT, PAUT vs RT, PAUT vs UT, TOFD vs PAUT, MT vs PT, RT vs DR/CR, VT vs PT. Sensitivity, speed, cost, access and code coverage to defend your method choice.',
  keywords: ['NDT comparison', 'UT vs RT', 'PAUT vs RT', 'TOFD vs PAUT', 'MT vs PT', 'RT vs DR', 'which NDT method'],
  openGraph: { title: 'NDT Method Comparisons', description: 'Side-by-side NDT method comparisons on sensitivity, speed, cost, access and code.', url: 'https://ndt-connect.com/compare', type: 'website' },
  alternates: { canonical: 'https://ndt-connect.com/compare' },
};

export default async function CompareHubPage() {
  const slugs = listSlugs('comparisons');
  const comps = (await Promise.all(slugs.map(async (slug) => {
    const c = await loadComparison(slug);
    if (!c) return null;
    const a = (c.methodA as { abbreviation?: string })?.abbreviation || '';
    const b = (c.methodB as { abbreviation?: string })?.abbreviation || '';
    return { slug, a, b, metaTitle: c.metaTitle as string, metaDescription: c.metaDescription as string };
  }))).filter(Boolean) as { slug: string; a: string; b: string; metaTitle: string; metaDescription: string }[];

  const itemListSchema = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'NDT Method Comparisons',
    itemListElement: comps.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://ndt-connect.com/compare/${c.slug}`, name: c.metaTitle })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ndt-connect.com' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://ndt-connect.com/compare' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
        <span className="text-foreground">Compare</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">NDT Method Comparisons</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        When the choice comes down to two methods, these head-to-heads put them side by side on sensitivity, speed, cost,
        access and code coverage — so you can defend the selection in a procedure review.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-12">
        {comps.map((c) => (
          <Link key={c.slug} href={`/compare/${c.slug}`} className="group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-primary flex items-center gap-2">
                  <GitCompareArrows className="h-4 w-4 text-primary" />
                  {c.a && c.b ? `${c.a} vs ${c.b}` : c.metaTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{c.metaDescription}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">Compare <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section className="border-t pt-8">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/topics/choosing-ndt-method" className="text-primary underline">How to choose an NDT method →</Link>
          <Link href="/methods" className="text-primary underline">All NDT methods →</Link>
          <Link href="/tools/ndt-method-selector" className="text-primary underline">NDT method selector tool →</Link>
        </div>
      </section>
    </div>
  );
}
