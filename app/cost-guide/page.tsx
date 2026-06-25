import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, DollarSign, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NDT Inspection Cost Guide (2026) | Rates by Method & City',
  description:
    'What does NDT inspection cost? Typical 2026 rates by method — UT, RT, MT, PT, ET, PAUT — and by city, plus the cost drivers that move the price. Free, no signup.',
  keywords: ['NDT inspection cost', 'NDT cost guide', 'UT inspection cost', 'radiography cost', 'PAUT cost', 'NDT rates', 'NDT price'],
  openGraph: { title: 'NDT Inspection Cost Guide — Rates by Method & City', description: 'Typical NDT inspection rates by method and city, plus the cost drivers.', url: 'https://ndt-connect.com/cost-guide', type: 'website' },
  alternates: { canonical: 'https://ndt-connect.com/cost-guide' },
};

// Full method slugs (match the cost-guide route params) + abbreviations.
const METHODS: [string, string][] = [
  ['ultrasonic-testing', 'Ultrasonic (UT)'],
  ['phased-array-ut', 'Phased Array (PAUT)'],
  ['radiographic-testing', 'Radiographic (RT)'],
  ['magnetic-particle-testing', 'Magnetic Particle (MT)'],
  ['penetrant-testing', 'Penetrant (PT)'],
  ['eddy-current-testing', 'Eddy Current (ET)'],
];
// Tier-1 demand cities (cost-guide pages indexed) — safe links.
const CITIES: [string, string][] = [
  ['houston-tx', 'Houston'], ['los-angeles-ca', 'Los Angeles'], ['new-york-ny', 'New York'],
  ['chicago-il', 'Chicago'], ['baton-rouge-la', 'Baton Rouge'], ['corpus-christi-tx', 'Corpus Christi'],
  ['new-orleans-la', 'New Orleans'], ['pittsburgh-pa', 'Pittsburgh'], ['dubai-ae', 'Dubai'],
  ['jubail-sa', 'Jubail'], ['london-uk', 'London'], ['mumbai-in', 'Mumbai'],
];
const REP_CITY = 'houston-tx';

export default function CostGuideHubPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ndt-connect.com' },
      { '@type': 'ListItem', position: 2, name: 'Cost Guide', item: 'https://ndt-connect.com/cost-guide' },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
        <span className="text-foreground">Cost Guide</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 flex items-center gap-2"><DollarSign className="h-7 w-7" /> NDT Inspection Cost Guide</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        What an NDT inspection costs depends on the method, scope, location, access and certification level. Use the
        per-city, per-method cost guides below, or read the methodology-backed <Link href="/learn/ndt-inspection-cost-index" className="text-primary underline">NDT inspection cost index</Link>.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-5">By method</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {METHODS.map(([slug, label]) => (
            <Link key={slug} href={`/cost-guide/${REP_CITY}/${slug}`} className="group">
              <Card className="h-full transition-colors hover:border-primary">
                <CardContent className="pt-6">
                  <span className="font-semibold text-foreground group-hover:text-primary">{label} cost</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm text-primary"> <ArrowRight className="h-3.5 w-3.5" /></span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> By city</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {CITIES.map(([slug, name]) => (
            <Link key={slug} href={`/cost-guide/${slug}/ultrasonic-testing`} className="text-sm text-slate-700 hover:text-primary inline-flex items-center gap-1">
              <ArrowRight className="h-3 w-3 shrink-0" /> {name}
            </Link>
          ))}
        </div>
        <Link href="/ndt-services" className="text-sm text-primary underline mt-4 inline-block">All cities →</Link>
      </section>

      <section className="border-t pt-8 flex flex-wrap gap-3 text-sm">
        <Link href="/learn/ndt-inspection-cost-index" className="text-primary underline">NDT cost index (data study) →</Link>
        <Link href="/tools/inspection-cost-estimator" className="text-primary underline">Cost estimator tool →</Link>
        <Link href="/find-providers" className="text-primary underline">Get quotes from providers →</Link>
      </section>
    </div>
  );
}
