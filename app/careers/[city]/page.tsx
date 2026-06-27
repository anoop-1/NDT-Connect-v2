import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug } from '@/lib/seo-data';
import { PUBLISHABLE_CITIES, findPublishableCity } from '@/data/cities';
import { buildAlternates } from '@/lib/seo-helpers';
import { findRichCity } from '@/lib/seo/cities-rich';
import { CityDataAnchors } from '@/components/seo/CityDataAnchors';
import { CornerstoneLinks } from '@/components/seo/CornerstoneLinks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/SchemaMarkup';
import {
  toCityView,
  rolesForCity,
  localMarketProse,
  certificationsForCity,
  applicationChecklist,
  cityFaqs,
  methodsForIndustries,
} from '@/lib/content/city-content';
import { MapPin, DollarSign, Briefcase, ArrowRight, ListChecks, Award, HelpCircle } from 'lucide-react';

interface Props {
  params: { city: string };
}

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  return PUBLISHABLE_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Prefer the canonical curated row (richer fields) and fall back to the
  // legacy CityData via getCityBySlug so older slugs keep resolving.
  const canonical = findPublishableCity(params.city);
  const legacy = canonical ? null : getCityBySlug(params.city);
  if (!canonical && !legacy) return {};
  const name = canonical?.name ?? legacy!.name;
  const region = canonical?.state ?? legacy!.region;

  // Salary range in the title is the single biggest careers-CTR lever (GSC: the
  // careers family ranks pos ~8 but gets ~1% CTR with no $ in the snippet).
  // Prefer real city wage bands; fall back to a national band when no rich row.
  const wage = findRichCity(params.city)?.avgInspectorWageUSD;
  const lowK = Math.round((wage?.level1 ?? 45000) / 1000);
  const highK = Math.round((wage?.level3 ?? 110000) / 1000);
  const title = `NDT Inspector Jobs in ${name}: $${lowK}K–$${highK}K Salaries [2026]`;
  const description = `NDT inspector jobs in ${name}, ${region} — pay $${lowK}K–$${highK}K across Level I/II/III, who's hiring, and how to apply free. Updated 2026.`;

  return {
    title,
    description,
    keywords: [
      `NDT jobs ${name}`,
      `NDT careers ${name}`,
      `NDT salary ${name}`,
      `NDT technician ${name}`,
      `${name} ${region} NDT`,
      'NDT career',
      'NDT technician jobs',
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/careers/${params.city}`,
    },
    alternates: {
      canonical: `https://ndt-connect.com/careers/${params.city}`,
      languages: buildAlternates(params.city, `https://ndt-connect.com/careers/${params.city}`),
    },
  };
}

export default function CityCareerPage({ params }: Props) {
  // Normalise either data source into the shared CityView shape.
  const canonical = findPublishableCity(params.city);
  const legacy = canonical ? null : getCityBySlug(params.city);
  if (!canonical && !legacy) notFound();
  const view = toCityView(canonical ?? legacy);

  const roles = rolesForCity(view);
  const market = localMarketProse(view);
  const certs = certificationsForCity(view);
  const checklist = applicationChecklist(view);
  const faqs = cityFaqs(view, 'careers');
  const methods = methodsForIndustries(view.industries);
  const fac = view.namedFacilities && view.namedFacilities.length > 0
    ? view.namedFacilities
    : (view.keyFacilities || []).map(n => ({ name: n, type: '' }));

  // JobPosting schema — one per role band, rooted in the city.
  // Stable build-time date so SSG output is deterministic. validThrough = +90 days.
  const buildDate = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1));
  const datePosted = buildDate.toISOString().slice(0, 10);
  const validThrough = new Date(buildDate.getTime() + 90 * 24 * 3600 * 1000).toISOString().slice(0, 10);

  const jobPostingSchemas = roles.slice(0, 5).map(role => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: `${role.role} in ${view.name}`,
    description: `${role.role} position in ${view.name}. Required: ${role.cert}. Typical experience ${role.exp}.`,
    datePosted,
    validThrough,
    employmentType: 'FULL_TIME',
    directApply: false,
    identifier: {
      '@type': 'PropertyValue',
      name: 'NDT Connect',
      value: `ndtc-${view.slug}-${role.role.toLowerCase().replace(/\s+/g, '-')}`,
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: 'NDT Connect Marketplace',
      sameAs: 'https://ndt-connect.com',
      logo: 'https://ndt-connect.com/logo.png',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: view.name,
        addressRegion: view.state,
        addressCountry: view.country || 'US',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        minValue: role.min,
        maxValue: role.max,
        unitText: 'YEAR',
      },
    },
  }));

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://ndt-connect.com' },
        { name: 'Careers', url: 'https://ndt-connect.com/careers' },
        { name: `${view.name} Jobs`, url: `https://ndt-connect.com/careers/${view.slug}` },
      ]} />
      {jobPostingSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <FAQSchema questions={faqs.map(f => ({ question: f.q, answer: f.a }))} />

      <div className="max-w-6xl mx-auto py-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/careers" className="hover:text-primary">Careers</Link>
          <span>/</span>
          <span className="text-foreground">{view.name}</span>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-10 md:p-14 mb-12">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-primary" />
            <Badge>{view.state}</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            NDT Jobs &amp; Salaries in {view.name}, {view.state}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{market}</p>
        </section>

        {/* Local market */}
        <section className="mb-12 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Industry mix driving demand
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Local industries</h3>
                <div className="flex flex-wrap gap-2">
                  {view.industries.map((industry, i) => (
                    <Badge key={i} variant="secondary">{industry}</Badge>
                  ))}
                </div>
              </div>
              {fac.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Top local employers / asset owners</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {fac.slice(0, 5).map((f, i) => (
                      <li key={i}>• {f.name}{f.type ? ` (${f.type})` : ''}</li>
                    ))}
                  </ul>
                </div>
              )}
              {methods.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Methods most-used locally</h3>
                  <p className="text-sm text-muted-foreground">{methods.slice(0, 8).join('; ')}.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Salary bands in {view.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-semibold">Role</th>
                      <th className="text-right py-2 font-semibold">Pay (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((r, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-2 pr-2">
                          <div className="font-medium text-foreground">{r.role}</div>
                          <div className="text-xs text-muted-foreground">{r.exp} • {r.cert}</div>
                        </td>
                        <td className="py-2 text-right text-primary font-semibold whitespace-nowrap">
                          ${(r.min / 1000).toFixed(0)}K–${(r.max / 1000).toFixed(0)}K
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Required certifications */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <Award className="h-6 w-6" /> Certifications worth holding for the {view.name} market
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {certs.map((c, i) => (
              <li key={i} className="border-l-2 border-primary/40 pl-4">{c}</li>
            ))}
          </ul>
        </section>

        {/* Application checklist */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <ListChecks className="h-6 w-6" /> Application checklist
          </h2>
          <ol className="list-decimal list-outside ml-5 space-y-2 text-sm text-muted-foreground">
            {checklist.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <HelpCircle className="h-6 w-6" /> Frequently asked
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border-l-4 border-primary/30 pl-4">
                <p className="font-semibold text-foreground mb-1">{f.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-link: training in the same city */}
        <section className="mb-12 grid md:grid-cols-2 gap-4">
          <Link href={`/training/${view.slug}`} className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="font-semibold text-primary mb-1">NDT Training in {view.name}</p>
                <p className="text-sm text-muted-foreground">Local courses, fees, and accreditation pathways feeding the same employer base.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href={`/ndt-services/${view.slug}`} className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="font-semibold text-primary mb-1">NDT Services in {view.name}</p>
                <p className="text-sm text-muted-foreground">The companies hiring inspectors — see the local service catalogue.</p>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Other cities */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-primary mb-4">Explore Careers in Other Cities</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {cities.slice(0, 20).filter(c => c.slug !== view.slug).slice(0, 12).map((otherCity) => (
              <Link
                key={otherCity.slug}
                href={`/careers/${otherCity.slug}`}
                className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-foreground group-hover:text-primary text-sm">{otherCity.name}</div>
                <div className="text-xs text-muted-foreground">{otherCity.region}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Local data + cornerstone links (internal-link density on careers) */}
        <div className="space-y-8 mb-12">
          <CityDataAnchors citySlug={view.slug} />
          <CornerstoneLinks topicHints={['careers', (view.industries?.[0] || '').toString().toLowerCase()]} />
        </div>

        {/* CTA */}
        <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-4">Start Your NDT Career in {view.name}</h2>
          <p className="mb-8 opacity-90 max-w-lg mx-auto">
            Get certified, gain documented experience, and connect with the local employers above.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/certifications">View Certifications</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`/training/${view.slug}`}>Find Local Training</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
