import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NDT Connect Pricing (2026) | Free Marketplace, Quote-on-Request Jobs',
  description:
    'NDT Connect is free to use — browse and list NDT providers and inspectors at no cost, post jobs free and receive quotes within 24 hours. No subscription, no listing fee. Free engineering tools and reference content included.',
  keywords: ['NDT Connect pricing', 'NDT marketplace cost', 'NDT directory free', 'list NDT company free', 'NDT inspection quote'],
  openGraph: { title: 'NDT Connect Pricing — Free Marketplace', description: 'Free to browse, free to list, jobs quote-on-request. No subscription.', url: 'https://ndt-connect.com/pricing', type: 'website' },
  alternates: { canonical: 'https://ndt-connect.com/pricing' },
};

const tiers = [
  {
    name: 'Clients (asset owners)',
    price: 'Free',
    sub: 'Post jobs, receive quotes',
    features: ['Post unlimited NDT job requests free', 'Receive quotes from vetted providers within ~24 hours', 'Compare certifications, methods, location and price', 'No subscription, no per-quote fee'],
    cta: { label: 'Post a job free', href: '/register?role=client' },
  },
  {
    name: 'Providers & inspectors',
    price: 'Free',
    sub: 'List your profile, get found',
    features: ['List your company or inspector profile free', 'Get found by clients across 15+ industries', 'Showcase certifications (ASNT, API, ISO 17020/17025, CWI)', 'Fill schedule downtime — no listing fee'],
    cta: { label: 'List free', href: '/register?role=provider' },
    highlight: true,
  },
  {
    name: 'Tools & reference',
    price: 'Free',
    sub: 'Calculators + guides',
    features: ['30+ free NDT calculators (RT, UT, MT, PT, ET)', 'Method guides, standards reference and how-tos', 'Salary and inspection-cost data studies', 'No signup required to read or calculate'],
    cta: { label: 'Open the tools', href: '/tools' },
  },
];

const faqs = [
  { q: 'Is NDT Connect free?', a: 'Yes. Browsing providers, posting NDT job requests, listing a provider or inspector profile, and using the calculators and reference content are all free. There is no subscription and no listing fee.' },
  { q: 'How much does an NDT inspection cost?', a: 'Inspection cost is set by the provider and depends on method, scope, location and certification level — roughly $125–$375/hr for visual testing up to $400–$1,300/hr for phased array. Post your scope to receive real quotes, or see the NDT inspection cost index for typical rates.' },
  { q: 'How do quotes work?', a: 'Clients post a job describing the scope; vetted providers respond with quotes, typically within 24 hours. You compare on price, basis (hourly/day/per-weld), certification and availability, then engage the provider directly.' },
  { q: 'Is there a paid or premium tier?', a: 'The marketplace and the engineering tools are free. Advanced inspection reporting and digital-twin software are offered separately through Atlantis NDT; contact us if you need those.' },
  { q: 'Do I need to pay to list my NDT company?', a: 'No. Listing a provider or freelance inspector profile is completely free, including showcasing your certifications and methods.' },
];

export default function PricingPage() {
  const collectionSchema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'NDT Connect Pricing', url: 'https://ndt-connect.com/pricing',
    description: 'NDT Connect is free to use — free marketplace listings and job posting, with quote-on-request inspection jobs.',
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ndt-connect.com' },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://ndt-connect.com/pricing' },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
        <span className="text-foreground">Pricing</span>
      </nav>

      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">Simple pricing: NDT Connect is free</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse and list free, post jobs free, and pay only the provider you choose for the inspection itself —
          quote-on-request, no subscription, no listing fee.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6 mb-14">
        {tiers.map((t) => (
          <Card key={t.name} className={t.highlight ? 'border-primary shadow-md' : ''}>
            <CardHeader>
              <CardTitle className="text-lg">{t.name}</CardTitle>
              <div className="text-3xl font-bold text-primary mt-2">{t.price}</div>
              <p className="text-sm text-muted-foreground">{t.sub}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
              <Button asChild className="w-full"><Link href={t.cta.href}>{t.cta.label}</Link></Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Pricing FAQ</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="border-l-4 border-primary/30 pl-4">
              <h3 className="font-semibold text-foreground mb-1">{f.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t pt-8 flex flex-wrap gap-3 text-sm">
        <Link href="/learn/ndt-inspection-cost-index" className="text-primary underline">NDT inspection cost index →</Link>
        <Link href="/find-providers" className="text-primary underline">Find providers →</Link>
        <Link href="/tools" className="text-primary underline">Free calculators →</Link>
      </section>
    </div>
  );
}
