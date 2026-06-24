import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Layers } from 'lucide-react';
import { listSlugs, loadTopic } from '@/lib/content/authored';

export const metadata: Metadata = {
  title: 'NDT Topics & Decision Guides | Method Selection, Defects, Codes',
  description:
    'Cross-cutting NDT topic hubs — how to choose the right NDT method, weld defects and the method that detects each, and the codes and standards that govern inspection. Curated guides that tie methods, comparisons and standards together.',
  keywords: ['NDT topics', 'choose NDT method', 'weld defects', 'NDT codes and standards', 'NDT decision guide'],
  openGraph: { title: 'NDT Topics & Decision Guides', description: 'Cross-cutting NDT topic hubs tying methods, comparisons and standards together.', url: 'https://ndt-connect.com/topics', type: 'website' },
  alternates: { canonical: 'https://ndt-connect.com/topics' },
};

export default async function TopicsHubPage() {
  const slugs = listSlugs('topics');
  const topics = (await Promise.all(slugs.map(async (slug) => {
    const t = await loadTopic(slug);
    return t ? { slug, title: t.title as string, metaDescription: t.metaDescription as string } : null;
  }))).filter(Boolean) as { slug: string; title: string; metaDescription: string }[];

  const itemListSchema = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'NDT Topics',
    itemListElement: topics.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://ndt-connect.com/topics/${t.slug}`, name: t.title })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ndt-connect.com' },
      { '@type': 'ListItem', position: 2, name: 'Topics', item: 'https://ndt-connect.com/topics' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
        <span className="text-foreground">Topics</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">NDT Topics & Decision Guides</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Cross-cutting guides that tie the method pages, head-to-head comparisons, calculators and standards together —
        start here when the question is "which method", "what detects this defect", or "which code applies".
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-12">
        {topics.map((t) => (
          <Link key={t.slug} href={`/topics/${t.slug}`} className="group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <Layers className="h-5 w-5 text-primary mb-1" />
                <CardTitle className="text-lg group-hover:text-primary">{t.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{t.metaDescription}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">Read guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section className="border-t pt-8">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/services" className="text-primary underline">NDT methods →</Link>
          <Link href="/tools" className="text-primary underline">Free NDT calculators →</Link>
          <Link href="/certifications" className="text-primary underline">NDT certifications →</Link>
          <Link href="/find-providers" className="text-primary underline">Find providers →</Link>
        </div>
      </section>
    </div>
  );
}
