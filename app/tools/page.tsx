import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calculator } from 'lucide-react';
import { listSlugs, loadTool } from '@/lib/content/authored';

export const metadata: Metadata = {
  title: 'Free NDT Calculators & Tools (2026) | UT, RT, MT, PT, ET',
  description:
    'Free, formula-backed NDT calculators — radiography (HVL, exposure, safe distance), ultrasonics (thickness, near field, dB, temperature correction), eddy current, magnetic particle, corrosion rate & remaining life, hardness conversion, weld cost. No signup.',
  keywords: ['NDT calculator', 'NDT tools', 'half value layer calculator', 'UT thickness calculator', 'corrosion rate calculator', 'radiation safe distance', 'hardness conversion', 'NDT formulas'],
  openGraph: { title: 'Free NDT Calculators & Tools', description: 'Free, formula-backed NDT calculators for RT, UT, MT, PT, ET and inspection planning.', url: 'https://ndt-connect.com/tools', type: 'website' },
  alternates: { canonical: 'https://ndt-connect.com/tools' },
};

const CAT_LABELS: Record<string, string> = {
  rt: 'Radiography (RT) & Radiation Safety',
  ut: 'Ultrasonics (UT / PAUT)',
  et: 'Eddy Current (ET)',
  mt: 'Magnetic Particle (MT)',
  pt: 'Penetrant (PT)',
  general: 'Materials & General',
  planning: 'Inspection Planning & Cost',
  safety: 'Safety',
};
const CAT_ORDER = ['rt', 'ut', 'et', 'mt', 'pt', 'general', 'planning', 'safety'];

export default async function ToolsHubPage() {
  const slugs = listSlugs('tools');
  const tools = (await Promise.all(slugs.map(async (slug) => {
    const t = await loadTool(slug);
    return t ? { slug, name: t.name as string, category: (t.category as string) || 'general', metaDescription: t.metaDescription as string } : null;
  }))).filter(Boolean) as { slug: string; name: string; category: string; metaDescription: string }[];

  const byCat = new Map<string, typeof tools>();
  for (const t of tools) { if (!byCat.has(t.category)) byCat.set(t.category, []); byCat.get(t.category)!.push(t); }
  const cats = [...CAT_ORDER.filter((c) => byCat.has(c)), ...[...byCat.keys()].filter((c) => !CAT_ORDER.includes(c))];

  const itemListSchema = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Free NDT Calculators & Tools',
    itemListElement: tools.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://ndt-connect.com/tools/${t.slug}`, name: t.name })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ndt-connect.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://ndt-connect.com/tools' },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
        <span className="text-foreground">Tools</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Free NDT Calculators &amp; Tools</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        {tools.length} free, formula-backed calculators for the working inspector — every one shows the formula, a worked
        example and the governing code. No signup, no paywall.
      </p>

      {cats.map((cat) => (
        <section key={cat} className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" /> {CAT_LABELS[cat] || cat.toUpperCase()}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {byCat.get(cat)!.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="group">
                <Card className="h-full transition-colors hover:border-primary">
                  <CardHeader>
                    <CardTitle className="text-base group-hover:text-primary">{t.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{t.metaDescription}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">Open calculator <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="border-t pt-8">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/topics" className="text-primary underline">NDT decision guides →</Link>
          <Link href="/equipment" className="text-primary underline">NDT equipment reviews →</Link>
          <Link href="/find-providers" className="text-primary underline">Find NDT providers →</Link>
        </div>
      </section>
    </div>
  );
}
