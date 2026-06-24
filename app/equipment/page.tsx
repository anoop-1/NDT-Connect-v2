import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Cpu } from 'lucide-react';
import { listSlugs, loadEquipment } from '@/lib/content/authored';

export const metadata: Metadata = {
  title: 'NDT Equipment Guide (2026): Flaw Detectors, PAUT, Eddy Current & More',
  description:
    'Independent NDT instrument reviews and buyer guides — ultrasonic flaw detectors (EPOCH 650, USM 100, USM Go+), phased array (OmniScan X3, Mantis, Veo+), eddy current, MT yokes and PT kits. Specs, price guidance and how to choose.',
  keywords: ['NDT equipment', 'ultrasonic flaw detector', 'phased array instrument', 'EPOCH 650', 'Krautkramer USM 100', 'OmniScan X3', 'eddy current instrument', 'MT yoke', 'NDT equipment reviews'],
  openGraph: { title: 'NDT Equipment Guide — Flaw Detectors, PAUT, Eddy Current', description: 'Independent NDT instrument reviews and buyer guides.', url: 'https://ndt-connect.com/equipment', type: 'website' },
  alternates: { canonical: 'https://ndt-connect.com/equipment' },
};

const CATEGORY_LABELS: Record<string, string> = {
  'flaw-detector': 'Ultrasonic Flaw Detectors',
  'phased-array': 'Phased Array (PAUT) Instruments',
  'eddy-current': 'Eddy Current Instruments',
  'mt-yoke': 'Magnetic Particle Yokes',
  'pt-kit': 'Penetrant Testing Consumables',
  'other': 'Radiography & Other Equipment',
};
const CATEGORY_ORDER = ['flaw-detector', 'phased-array', 'eddy-current', 'mt-yoke', 'pt-kit', 'other'];

export default async function EquipmentHubPage() {
  const slugs = listSlugs('equipment');
  const items = (await Promise.all(slugs.map(async (slug) => {
    const e = await loadEquipment(slug);
    return e ? { slug, make: e.make as string, model: e.model as string, category: (e.category as string) || 'other', metaDescription: e.metaDescription as string } : null;
  }))).filter(Boolean) as { slug: string; make: string; model: string; category: string; metaDescription: string }[];

  const byCat = new Map<string, typeof items>();
  for (const it of items) {
    if (!byCat.has(it.category)) byCat.set(it.category, []);
    byCat.get(it.category)!.push(it);
  }
  const cats = [...CATEGORY_ORDER.filter((c) => byCat.has(c)), ...[...byCat.keys()].filter((c) => !CATEGORY_ORDER.includes(c))];

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NDT Equipment & Instruments',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1,
      url: `https://ndt-connect.com/equipment/${it.slug}`,
      name: `${it.make} ${it.model}`,
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ndt-connect.com' },
      { '@type': 'ListItem', position: 2, name: 'Equipment', item: 'https://ndt-connect.com/equipment' },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
        <span className="text-foreground">Equipment</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">NDT Equipment Guide</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Independent reviews and buyer guides for the instruments inspectors actually use in the field — ultrasonic flaw
        detectors, phased array, eddy current, magnetic particle yokes and penetrant kits. Specs, real-world notes,
        price guidance and how to choose for your method and budget.
      </p>

      {cats.map((cat) => (
        <section key={cat} className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2"><Cpu className="h-5 w-5 text-primary" /> {CATEGORY_LABELS[cat] || cat}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {byCat.get(cat)!.map((it) => (
              <Link key={it.slug} href={`/equipment/${it.slug}`} className="group">
                <Card className="h-full transition-colors hover:border-primary">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit text-xs mb-1">{it.make}</Badge>
                    <CardTitle className="text-lg group-hover:text-primary">{it.model}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{it.metaDescription}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">Read review <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="border-t pt-8 mt-4">
        <h2 className="text-xl font-bold mb-3">Need an inspection, not an instrument?</h2>
        <p className="text-muted-foreground mb-4 max-w-2xl">Compare certified NDT providers and freelance inspectors by method, certification and location — free to browse.</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/find-providers" className="text-primary underline">Find NDT providers →</Link>
          <Link href="/services" className="text-primary underline">Browse NDT methods →</Link>
          <Link href="/tools" className="text-primary underline">Free NDT calculators →</Link>
        </div>
      </section>
    </div>
  );
}
