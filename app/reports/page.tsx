import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Database, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NDT Data Reports (2026) | Salary, Cost Index & Industry Statistics',
  description:
    'Free NDT data studies from NDT Connect — inspector salary ranges, the inspection cost index by method and region, and global industry statistics. Open data with downloadable CSVs, free to cite.',
  keywords: ['NDT data', 'NDT salary report', 'NDT cost index', 'NDT industry statistics', 'NDT market data', 'NDT wages by city'],
  openGraph: { title: 'NDT Data Reports — Salary, Cost & Industry Statistics', description: 'Free NDT data studies with downloadable CSVs, free to cite.', url: 'https://ndt-connect.com/reports', type: 'website' },
  alternates: { canonical: 'https://ndt-connect.com/reports' },
};

const reports = [
  {
    title: 'NDT Inspector Salary Guide (2026)',
    href: '/learn/ndt-inspector-salary-guide',
    desc: 'US NDT inspector pay by certification level (I/II/III), method (UT, PAUT, RT, CWI), role and industry — plus wage bands for 200+ cities.',
    csv: '/api/datasets/city-wages',
    csvLabel: 'Wages by city (CSV)',
  },
  {
    title: 'NDT Inspection Cost Index (2026)',
    href: '/learn/ndt-inspection-cost-index',
    desc: 'Typical US NDT inspection rates by method with regional tier multipliers and the five factors that move the price.',
    csv: '/api/datasets/cost-index',
    csvLabel: 'Cost index (CSV)',
  },
  {
    title: 'NDT Industry Statistics & Market Size (2026)',
    href: '/blog/ndt-industry-statistics',
    desc: 'Global NDT market size, growth rates, regional breakdown, employment figures and method/industry segmentation, with cited sources.',
    csv: null,
    csvLabel: '',
  },
];

export default function ReportsHubPage() {
  const itemListSchema = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'NDT Data Reports',
    itemListElement: reports.map((r, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://ndt-connect.com${r.href}`, name: r.title })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ndt-connect.com' },
      { '@type': 'ListItem', position: 2, name: 'Reports', item: 'https://ndt-connect.com/reports' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
        <span className="text-foreground">Reports</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">NDT Data Reports</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Original NDT data studies built from NDT Connect&apos;s own marketplace, careers and 220+ city datasets, benchmarked
        to public sources. Free to read, free to cite, with downloadable CSVs under a CC-BY licence.
      </p>

      <div className="space-y-5 mb-12">
        {reports.map((r) => (
          <Card key={r.href} className="transition-colors hover:border-primary">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Database className="h-5 w-5 text-primary" /> {r.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{r.desc}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href={r.href} className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read report <ArrowRight className="h-3.5 w-3.5" /></Link>
                {r.csv && (
                  <a href={r.csv} className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800"><Download className="h-3.5 w-3.5" /> {r.csvLabel}</a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="border-t pt-6 text-sm text-muted-foreground">
        <p><strong>Citation:</strong> &quot;NDT Connect, {new Date().getUTCFullYear()}&quot; — data compiled from NDT Connect marketplace/careers datasets benchmarked to US BLS OES, EIA and published NDT market research. A link back to the report page is appreciated.</p>
      </section>
    </div>
  );
}
