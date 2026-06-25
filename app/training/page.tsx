import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, MapPin, ArrowRight } from 'lucide-react';
import { PUBLISHABLE_CITIES } from '@/data/cities';
import { shouldIndexCity } from '@/lib/seo/indexability';

export const metadata: Metadata = {
  title: 'NDT Training & Certification Courses by City (2026) | Level I, II, III',
  description:
    'Find NDT training and certification courses near you — ASNT Level I, II and III in UT, RT, MT, PT, ET and PAUT across major US and international inspection hubs. Local providers, exam prep and qualification paths.',
  keywords: ['NDT training', 'NDT certification courses', 'ASNT Level II training', 'NDT classes near me', 'UT training', 'radiography training'],
  openGraph: { title: 'NDT Training & Certification Courses by City', description: 'NDT training and certification (Level I-III) across major inspection hubs.', url: 'https://ndt-connect.com/training', type: 'website' },
  alternates: { canonical: 'https://ndt-connect.com/training' },
};

export default function TrainingHubPage() {
  // Only the indexed training cities (tier 1-2 + demand) — matches the route's
  // own indexability gate so the hub links the same set the sitemap carries.
  const cities = PUBLISHABLE_CITIES
    .filter((c) => shouldIndexCity(c.slug, 'training'))
    .sort((a, b) => (a.country === 'US' && b.country !== 'US' ? -1 : a.country !== 'US' && b.country === 'US' ? 1 : a.name.localeCompare(b.name)));

  const us = cities.filter((c) => c.country === 'US');
  const intl = cities.filter((c) => c.country !== 'US');

  const itemListSchema = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'NDT Training Locations',
    itemListElement: cities.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://ndt-connect.com/training/${c.slug}`, name: `NDT Training in ${c.name}` })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ndt-connect.com' },
      { '@type': 'ListItem', position: 2, name: 'Training', item: 'https://ndt-connect.com/training' },
    ],
  };

  const grid = (list: typeof cities) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {list.map((c) => (
        <Link key={c.slug} href={`/training/${c.slug}`} className="text-sm text-slate-700 hover:text-primary inline-flex items-center gap-1">
          <MapPin className="h-3 w-3 shrink-0" /> {c.name}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
        <span className="text-foreground">Training</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 flex items-center gap-2"><GraduationCap className="h-7 w-7" /> NDT Training &amp; Certification by City</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        NDT training and certification — ASNT Level I, II and III in ultrasonic, radiographic, magnetic particle,
        penetrant, eddy current and phased array — across {cities.length}+ major inspection hubs. Pick your city for local
        providers, exam preparation and the qualification path for your method.
      </p>

      <Card className="mb-8">
        <CardContent className="pt-6 grid sm:grid-cols-3 gap-4 text-sm">
          <div><h3 className="font-semibold text-foreground mb-1">Level I-III paths</h3><p className="text-muted-foreground">Classroom + on-the-job hours per SNT-TC-1A / ISO 9712.</p></div>
          <div><h3 className="font-semibold text-foreground mb-1">All methods</h3><p className="text-muted-foreground">UT, PAUT, RT, MT, PT, ET, TOFD and visual.</p></div>
          <div><h3 className="font-semibold text-foreground mb-1">Exam prep</h3><p className="text-muted-foreground">General, specific and practical exam readiness.</p></div>
        </CardContent>
      </Card>

      {us.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">United States</h2>
          {grid(us)}
        </section>
      )}
      {intl.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">International</h2>
          {grid(intl)}
        </section>
      )}

      <section className="border-t pt-8 flex flex-wrap gap-3 text-sm">
        <Link href="/certifications" className="text-primary underline">NDT certifications explained →</Link>
        <Link href="/careers" className="text-primary underline">NDT careers &amp; salaries →</Link>
        <Link href="/methods" className="text-primary underline">NDT methods →</Link>
      </section>
    </div>
  );
}
