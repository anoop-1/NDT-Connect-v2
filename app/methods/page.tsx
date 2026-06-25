import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Waves } from 'lucide-react';
import { listSlugs, loadMethod } from '@/lib/content/authored';

export const metadata: Metadata = {
  title: 'NDT Methods Explained (2026) | UT, RT, MT, PT, ET, PAUT, TOFD, VT',
  description:
    'Reference guides to every major NDT method — ultrasonic, radiographic, magnetic particle, penetrant, eddy current, phased array, TOFD and visual testing. Principle, equipment, procedure, advantages, limitations and governing codes.',
  keywords: ['NDT methods', 'non destructive testing methods', 'ultrasonic testing', 'radiographic testing', 'magnetic particle', 'penetrant testing', 'eddy current', 'phased array', 'NDT method comparison'],
  openGraph: { title: 'NDT Methods Explained', description: 'Reference guides to every major NDT method — principle, equipment, procedure and codes.', url: 'https://ndt-connect.com/methods', type: 'website' },
  alternates: { canonical: 'https://ndt-connect.com/methods' },
};

export default async function MethodsHubPage() {
  const slugs = listSlugs('methods');
  const methods = (await Promise.all(slugs.map(async (slug) => {
    const m = await loadMethod(slug);
    return m ? { slug, name: m.name as string, abbreviation: (m.abbreviation as string) || '', metaDescription: m.metaDescription as string } : null;
  }))).filter(Boolean) as { slug: string; name: string; abbreviation: string; metaDescription: string }[];

  const itemListSchema = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'NDT Methods',
    itemListElement: methods.map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://ndt-connect.com/methods/${m.slug}`, name: m.name })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ndt-connect.com' },
      { '@type': 'ListItem', position: 2, name: 'Methods', item: 'https://ndt-connect.com/methods' },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
        <span className="text-foreground">Methods</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">NDT Methods Explained</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        How each non-destructive testing method works — the physics, the equipment, the procedure, what it detects and the
        codes that govern it. Looking to hire instead? See <Link href="/services" className="text-primary underline">NDT services by method</Link>.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-12">
        {methods.map((m) => (
          <Link key={m.slug} href={`/methods/${m.slug}`} className="group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                {m.abbreviation && <Badge variant="outline" className="w-fit text-xs mb-1"><Waves className="h-3 w-3 mr-1" />{m.abbreviation}</Badge>}
                <CardTitle className="text-lg group-hover:text-primary">{m.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{m.metaDescription}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">Read guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section className="border-t pt-8">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/compare" className="text-primary underline">Compare methods head-to-head →</Link>
          <Link href="/topics/choosing-ndt-method" className="text-primary underline">How to choose a method →</Link>
          <Link href="/pillars" className="text-primary underline">In-depth method guides →</Link>
        </div>
      </section>
    </div>
  );
}
