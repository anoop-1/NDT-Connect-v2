import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { listSlugs, loadLearn } from '@/lib/content/authored';

export const metadata: Metadata = {
  title: 'Learn NDT (2026) | How-To Procedures, Salary & Cost Data Guides',
  description:
    'Step-by-step NDT how-to guides — calibrate a UT flaw detector, build a DAC curve, run an MT yoke shot, perform a piping thickness survey, set up a PAUT scan plan, write an ASME V procedure — plus the NDT salary and inspection cost data studies.',
  keywords: ['learn NDT', 'how to calibrate UT', 'DAC curve', 'thickness survey', 'PAUT scan plan', 'write NDT procedure', 'NDT salary', 'NDT inspection cost'],
  openGraph: { title: 'Learn NDT — How-To Procedures & Data Guides', description: 'Step-by-step NDT how-to guides plus salary and cost data studies.', url: 'https://ndt-connect.com/learn', type: 'website' },
  alternates: { canonical: 'https://ndt-connect.com/learn' },
};

const CAT_LABELS: Record<string, string> = {
  'how-to': 'How-To Procedures',
  'data-study': 'Data Studies',
  'guide': 'Guides',
};

export default async function LearnHubPage() {
  const slugs = listSlugs('learn');
  const items = (await Promise.all(slugs.map(async (slug) => {
    const l = await loadLearn(slug);
    return l ? { slug, title: (l.title as string) || (l.metaTitle as string), category: (l.category as string) || 'guide', metaDescription: l.metaDescription as string } : null;
  }))).filter(Boolean) as { slug: string; title: string; category: string; metaDescription: string }[];

  const byCat = new Map<string, typeof items>();
  for (const it of items) { if (!byCat.has(it.category)) byCat.set(it.category, []); byCat.get(it.category)!.push(it); }
  const cats = ['how-to', ...[...byCat.keys()].filter((c) => c !== 'how-to')];

  const itemListSchema = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Learn NDT',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://ndt-connect.com/learn/${it.slug}`, name: it.title })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ndt-connect.com' },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: 'https://ndt-connect.com/learn' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
        <span className="text-foreground">Learn</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Learn NDT</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Practical, step-by-step NDT procedures written by inspectors, plus the salary and cost data studies — the
        how-to and the how-much in one place.
      </p>

      {cats.filter((c) => byCat.has(c)).map((cat) => (
        <section key={cat} className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary" /> {CAT_LABELS[cat] || cat}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {byCat.get(cat)!.map((it) => (
              <Link key={it.slug} href={`/learn/${it.slug}`} className="group">
                <Card className="h-full transition-colors hover:border-primary">
                  <CardHeader><CardTitle className="text-base leading-snug group-hover:text-primary">{it.title}</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{it.metaDescription}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="border-t pt-8">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/methods" className="text-primary underline">NDT methods →</Link>
          <Link href="/tools" className="text-primary underline">Free calculators →</Link>
          <Link href="/certifications" className="text-primary underline">Certifications →</Link>
        </div>
      </section>
    </div>
  );
}
