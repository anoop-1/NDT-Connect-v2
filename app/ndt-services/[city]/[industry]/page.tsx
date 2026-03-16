import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cities, industries, getCityBySlug, getIndustryBySlug } from '@/lib/seo-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import {
  MapPin, Building2, Zap, AlertTriangle, Shield, CheckCircle,
  TrendingUp, ArrowRight, FileText, Settings, Users, Clock
} from 'lucide-react';

interface Props {
  params: { city: string; industry: string };
}

export async function generateStaticParams() {
  const params: Array<{ city: string; industry: string }> = [];

  cities.forEach((city) => {
    industries.forEach((ind) => {
      if (city.industries.includes(ind.name)) {
        params.push({
          city: city.slug,
          industry: ind.slug,
        });
      }
    });
  });

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  const industry = getIndustryBySlug(params.industry);

  if (!city || !industry) return {};

  const title = `${industry.name} NDT Services in ${city.name} | Inspection & Testing | NDT Connect`;
  const description = `${industry.name} NDT inspection services in ${city.name}, ${city.region}. ${industry.commonMethods.slice(0, 2).join(', ')} and more. Find certified inspectors with NDT Connect.`;

  return {
    title,
    description,
    keywords: [
      `${industry.name} NDT ${city.name}`,
      `${industry.name} inspection ${city.name}`,
      `NDT services ${industry.name}`,
      ...industry.commonMethods.slice(0, 3),
      `${city.name} inspection services`,
      'NDT inspection',
      'non-destructive testing',
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/ndt-services/${city.slug}/${industry.slug}`,
    },
    alternates: {
      canonical: `https://ndt-connect.com/ndt-services/${city.slug}/${industry.slug}`,
    },
  };
}

export default function CityIndustryPage({ params }: Props) {
  const city = getCityBySlug(params.city);
  const industry = getIndustryBySlug(params.industry);

  if (!city || !industry) notFound();

  // Verify industry is relevant to city
  if (!city.industries.includes(industry.name)) notFound();

  const relatedCities = cities.filter(c => c.industries.includes(industry.name)).slice(0, 5);
  const relatedIndustries = industries.filter(i => city.industries.includes(i.name)).slice(0, 5);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${industry.name} NDT Services in ${city.name}`,
    description: `${industry.name} inspection and testing services in ${city.name}`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      addressRegion: city.region,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.coordinates.lat,
      longitude: city.coordinates.lng,
    },
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://ndt-connect.com' },
        { name: 'Services', url: 'https://ndt-connect.com/ndt-services' },
        { name: city.name, url: `https://ndt-connect.com/ndt-services/${city.slug}` },
        { name: industry.name, url: `https://ndt-connect.com/ndt-services/${city.slug}/${industry.slug}` },
      ]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/ndt-services" className="hover:text-primary">Services</Link>
          <span>/</span>
          <Link href={`/ndt-services/${city.slug}`} className="hover:text-primary">{city.name}</Link>
          <span>/</span>
          <span className="text-foreground">{industry.name}</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-10 md:p-14 mb-12">
          <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge>{industry.name}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {city.name}, {city.region}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {industry.name} NDT Services in {city.name}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {industry.description}
              </p>
            </div>
            <Building2 className="h-16 w-16 text-primary opacity-20" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-white/50 rounded-lg p-3">
              <div className="font-semibold text-primary">{industry.commonMethods.length}+</div>
              <div className="text-muted-foreground text-xs">Testing Methods</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="font-semibold text-primary">{industry.standards.length}+</div>
              <div className="text-muted-foreground text-xs">Applicable Standards</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="font-semibold text-primary">{industry.keyApplications.length}+</div>
              <div className="text-muted-foreground text-xs">Applications</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="font-semibold text-primary">24/7</div>
              <div className="text-muted-foreground text-xs">Availability</div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Industry Overview */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">About {industry.name} in {city.name}</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {industry.longDescription}
                  </p>

                  <div className="bg-primary/5 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Industry Snapshot in {city.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {city.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Key Challenges */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                Key Challenges & Inspection Needs
              </h2>
              <div className="space-y-3">
                {industry.challenges.map((challenge, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">{challenge}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Testing Methods */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Common NDT Methods for {industry.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {industry.commonMethods.map((method, i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-foreground">{method}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {method.includes('Ultrasonic') && 'Detects internal flaws and thickness variations'}
                            {method.includes('Radiographic') && 'Reveals internal defects through imaging'}
                            {method.includes('Magnetic') && 'Detects surface and near-surface flaws'}
                            {method.includes('Liquid Penetrant') && 'Identifies surface discontinuities'}
                            {method.includes('Eddy Current') && 'Detects surface cracks and material thickness'}
                            {method.includes('Visual') && 'Primary inspection for structural integrity'}
                            {method.includes('Phased Array') && 'Advanced ultrasonic scanning and defect sizing'}
                            {method.includes('TOFD') && 'Time-of-flight diffraction for accurate sizing'}
                            {method.includes('Guided Wave') && 'Long-distance pipe and rail inspection'}
                            {method.includes('Acoustic Emission') && 'Monitors active defect growth'}
                            {method.includes('Corrosion Mapping') && 'Assesses corrosion loss and remaining life'}
                            {method.includes('MFL') && 'Pipeline internal surface inspection'}
                          }
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Key Applications */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Applications in {city.name}
              </h2>
              <div className="space-y-2">
                {industry.keyApplications.map((app, i) => (
                  <Card key={i}>
                    <CardContent className="py-3 px-4 flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{app}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Standards & Compliance */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Applicable Standards
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {industry.standards.map((standard, i) => (
                      <Badge key={i} variant="secondary" className="text-sm py-2 px-3">
                        {standard}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Request Service */}
            <Card className="sticky top-4 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Request {industry.name} NDT Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Connect with certified NDT professionals in {city.name} specializing in {industry.name}.
                </p>
                <Button asChild className="w-full">
                  <Link href="/request-service">Request Service</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/find-providers">Find Providers</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Why NDT */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Why NDT is Critical
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{industry.whyNDT}</p>
              </CardContent>
            </Card>

            {/* Other Cities in Industry */}
            {relatedCities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{industry.name} in Other Cities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {relatedCities.map((relCity) => (
                    <Link
                      key={relCity.slug}
                      href={`/ndt-services/${relCity.slug}/${industry.slug}`}
                      className="block p-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <div className="font-semibold text-sm text-foreground hover:text-primary">
                        {relCity.name}
                      </div>
                      <div className="text-xs text-muted-foreground">{relCity.region}</div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Other Industries in City */}
            {relatedIndustries.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Other Services in {city.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {relatedIndustries.map((relInd) => (
                    <Link
                      key={relInd.slug}
                      href={`/ndt-services/${city.slug}/${relInd.slug}`}
                      className="block p-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <div className="font-semibold text-sm text-foreground hover:text-primary">
                        {relInd.name}
                      </div>
                      <div className="text-xs text-muted-foreground">{relInd.commonMethods.slice(0, 1).join(', ')}</div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* How We Help */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">How NDT Connect Helps</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Find Certified Professionals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect with verified NDT professionals in {city.name} with specific expertise in {industry.name} inspection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Quick Service Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Post your inspection needs and receive quotes from multiple qualified providers within hours.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Reliable Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All NDT providers are certified and verified. Get reliable, compliant inspections every time.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-4">Need {industry.name} NDT Services in {city.name}?</h2>
          <p className="mb-8 opacity-90 max-w-lg mx-auto">
            Request professional NDT inspection services tailored to your {industry.name} operation in {city.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/request-service">Request Service Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`/ndt-services/${city.slug}`}>More Services in {city.name}</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
