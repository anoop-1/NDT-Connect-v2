import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCityBySlug, getAllCitySlugs, methods, cities } from '@/lib/seo-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, Search, ArrowRight, Shield, CheckCircle, Clock, Users } from 'lucide-react';

interface Props {
  params: { city: string };
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  if (!city) return {};

  const title = `NDT Services in ${city.name}, ${city.country} | NDT Inspection Near You | NDT Connect`;
  const description = `Find certified NDT inspection services in ${city.name}. Book ultrasonic testing, radiographic testing, and more. Verified ${city.name} NDT inspectors with instant quotes on NDT Connect.`;

  return {
    title,
    description,
    keywords: [
      `NDT services ${city.name}`,
      `NDT inspection ${city.name}`,
      `non-destructive testing ${city.name}`,
      `ultrasonic testing ${city.name}`,
      `NDT inspector ${city.name}`,
      `NDT company ${city.name}`,
      `${city.name} inspection services`,
      `industrial inspection ${city.name}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/ndt-services/${city.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://ndt-connect.com/ndt-services/${city.slug}`,
    },
  };
}

export default function CityPage({ params }: Props) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();

  // Get nearby cities from same region
  const nearbyCities = cities
    .filter(c => c.region === city.region && c.slug !== city.slug)
    .slice(0, 8);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `NDT Services in ${city.name}`,
    description: `Non-destructive testing and inspection services in ${city.name}, ${city.country}`,
    provider: {
      '@type': 'Organization',
      name: 'NDT Connect',
      url: 'https://ndt-connect.com',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'Country',
        name: city.country,
      },
    },
    serviceType: 'Non-Destructive Testing',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NDT Services',
      itemListElement: methods.slice(0, 6).map((m) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${m.name} in ${city.name}`,
        },
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I find NDT inspectors in ${city.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `NDT Connect makes it easy to find certified NDT inspectors in ${city.name}. Simply search our platform by location and service type to see available providers, compare qualifications, and book inspections online.` },
      },
      {
        '@type': 'Question',
        name: `What NDT services are available in ${city.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `NDT Connect provides access to all major NDT methods in ${city.name} including Ultrasonic Testing (UT), Radiographic Testing (RT), Magnetic Particle Testing (MT), Penetrant Testing (PT), Eddy Current Testing (ET), Visual Testing (VT), and advanced methods like PAUT and TOFD.` },
      },
      {
        '@type': 'Question',
        name: `What industries in ${city.name} use NDT services?`,
        acceptedAnswer: { '@type': 'Answer', text: `Key industries in ${city.name} requiring NDT services include ${city.industries.join(', ')}. Major facilities include ${city.keyFacilities.join(', ')}.` },
      },
      {
        '@type': 'Question',
        name: `How much do NDT services cost in ${city.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `NDT service costs in ${city.name} vary based on the testing method, scope of work, accessibility, and urgency. Get instant quotes from multiple certified providers through NDT Connect to compare pricing.` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-primary">NDT Services</Link>
          <span>/</span>
          <span className="text-foreground">{city.name}</span>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 md:p-12 mb-10">
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" />
            <span>{city.region}, {city.country}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            NDT Services in {city.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Find certified non-destructive testing providers in {city.name}. Book inspections online with instant quotes, real-time tracking, and verified expert inspectors.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/find-providers">
                <Search className="h-4 w-4 mr-2" />
                Find Inspectors in {city.name}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/request-service">Post a Service Request</Link>
            </Button>
          </div>
        </section>

        {/* Why NDT in this city */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">NDT Services in {city.name}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{city.description}</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-card border rounded-lg text-center">
              <Users className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Verified Inspectors</p>
              <p className="text-xs text-muted-foreground">Certified & qualified</p>
            </div>
            <div className="p-4 bg-card border rounded-lg text-center">
              <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Instant Quotes</p>
              <p className="text-xs text-muted-foreground">Compare pricing</p>
            </div>
            <div className="p-4 bg-card border rounded-lg text-center">
              <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Quality Assured</p>
              <p className="text-xs text-muted-foreground">Standards compliant</p>
            </div>
            <div className="p-4 bg-card border rounded-lg text-center">
              <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Local Experts</p>
              <p className="text-xs text-muted-foreground">{city.name} based</p>
            </div>
          </div>
        </section>

        {/* Industries in this city */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Key Industries in {city.name}</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {city.industries.map((ind, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-card border rounded-lg">
                <Building2 className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium">{ind}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-3">Major Facilities & Infrastructure</h3>
          <div className="flex flex-wrap gap-2">
            {city.keyFacilities.map((facility, i) => (
              <Badge key={i} variant="secondary" className="text-sm py-1.5 px-3">{facility}</Badge>
            ))}
          </div>
        </section>

        {/* NDT Methods Available */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">NDT Methods Available in {city.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {methods.slice(0, 6).map((method) => (
              <Card key={method.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-1">{method.abbreviation}</Badge>
                  <CardTitle className="text-base">{method.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{method.description}</p>
                  <Link href={`/services/${method.slug}`} className="text-xs text-primary font-medium flex items-center hover:underline">
                    {method.abbreviation} in {city.name} <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline" asChild>
              <Link href="/services">View All NDT Methods <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions - NDT in {city.name}</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-5">
              <h3 className="font-semibold mb-2">How do I find NDT inspectors in {city.name}?</h3>
              <p className="text-sm text-muted-foreground">NDT Connect makes it easy to find certified NDT inspectors in {city.name}. Simply search our platform by location and service type to see available providers, compare qualifications, and book inspections online.</p>
            </div>
            <div className="border rounded-lg p-5">
              <h3 className="font-semibold mb-2">What NDT services are available in {city.name}?</h3>
              <p className="text-sm text-muted-foreground">NDT Connect provides access to all major NDT methods in {city.name} including Ultrasonic Testing (UT), Radiographic Testing (RT), Magnetic Particle Testing (MT), Penetrant Testing (PT), Eddy Current Testing (ET), Visual Testing (VT), and advanced methods like PAUT and TOFD.</p>
            </div>
            <div className="border rounded-lg p-5">
              <h3 className="font-semibold mb-2">What industries in {city.name} need NDT services?</h3>
              <p className="text-sm text-muted-foreground">Key industries in {city.name} requiring NDT services include {city.industries.join(', ')}. Major facilities in the area include {city.keyFacilities.join(', ')}.</p>
            </div>
            <div className="border rounded-lg p-5">
              <h3 className="font-semibold mb-2">How much do NDT services cost in {city.name}?</h3>
              <p className="text-sm text-muted-foreground">NDT service costs in {city.name} vary based on the testing method, scope of work, accessibility, and urgency. Get instant quotes from multiple certified providers through NDT Connect to compare pricing.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Book NDT Services in {city.name}?</h2>
          <p className="mb-6 opacity-90 max-w-lg mx-auto">
            Join thousands of asset owners and inspectors on NDT Connect. Find, compare, and book certified NDT providers in {city.name} today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/find-providers">Find Inspectors</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/register">Join as Provider</Link>
            </Button>
          </div>
        </section>

        {/* Nearby Cities */}
        {nearbyCities.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6">NDT Services in Nearby Locations</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {nearbyCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/ndt-services/${c.slug}`}
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors text-sm"
                >
                  <MapPin className="h-3 w-3 text-primary shrink-0" />
                  <span>NDT in {c.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
