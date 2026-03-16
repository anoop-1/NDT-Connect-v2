import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cities } from '@/lib/seo-data';
import { careerRoles, adjustSalaryByRegion } from '@/lib/careers-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { MapPin, TrendingUp, DollarSign, Briefcase, ArrowRight } from 'lucide-react';

interface Props {
  params: { city: string };
}

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cities.find((c) => c.slug === params.city);
  if (!city) return {};

  const title = `NDT Jobs & Careers in ${city.name} | Salary Guide | NDT Connect`;
  const description = `Explore NDT career opportunities in ${city.name}, ${city.region}. View local salary ranges, industry context, and available NDT roles.`;

  return {
    title,
    description,
    keywords: [
      `NDT jobs ${city.name}`,
      `NDT careers ${city.name}`,
      `NDT salary ${city.name}`,
      `NDT technician ${city.name}`,
      `${city.name} ${city.region} NDT`,
      'NDT career',
      'NDT technician jobs',
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/careers/${city.slug}`,
    },
    alternates: { canonical: `https://ndt-connect.com/careers/${city.slug}` },
  };
}

export default function CityCareerPage({ params }: Props) {
  const city = cities.find((c) => c.slug === params.city);
  if (!city) notFound();

  // Regional multiplier for salary adjustments
  const regionMultiplier = city.region === 'Texas' && city.name === 'Houston' ? 1.2 :
    city.region === 'California' ? 1.25 :
      city.region === 'New York' ? 1.25 :
        city.region === 'Washington' ? 1.15 :
          city.region === 'Massachusetts' ? 1.1 :
            city.region === 'Pennsylvania' && city.name === 'Pittsburgh' ? 1.05 :
              1.0;

  const relevantIndustries = city.industries || ['Oil & Gas', 'Manufacturing', 'Construction'];
  const topRoles = careerRoles.slice(0, 8);

  const cityContext: Record<string, { demand: string; keyFocus: string; description: string }> = {
    houston: { demand: 'Very High', keyFocus: 'Oil & Gas, Petrochemical, Pipeline', description: 'Houston is the energy capital with exceptional demand for NDT services.' },
    'los-angeles': { demand: 'High', keyFocus: 'Aerospace, Manufacturing, Port', description: 'Los Angeles requires specialized aerospace and marine NDT expertise.' },
    denver: { demand: 'High', keyFocus: 'Pipeline, Mining, Construction', description: 'Denver is a hub for pipeline and mining NDT operations.' },
    seattle: { demand: 'High', keyFocus: 'Aerospace, Marine, Manufacturing', description: 'Seattle\'s Boeing presence drives strong aerospace NDT demand.' },
    default: { demand: 'Growing', keyFocus: 'Multiple Industries', description: `${city.name} offers diverse NDT career opportunities across multiple industries.` },
  };

  const context = cityContext[city.slug] || cityContext.default;

  const jobPostingSchema = careerRoles.slice(0, 5).map(role => {
    const adjustedSalary = adjustSalaryByRegion(role.salaryRange.min, role.salaryRange.max, city.name);
    return {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: `${role.title} in ${city.name}`,
      description: role.description,
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: city.name,
          addressRegion: city.region,
          addressCountry: city.country,
        },
      },
      baseSalary: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        price: `${adjustedSalary.min}-${adjustedSalary.max}`,
      },
    };
  });

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://ndt-connect.com' },
        { name: 'Careers', url: 'https://ndt-connect.com/careers' },
        { name: `${city.name} Jobs`, url: `https://ndt-connect.com/careers/${city.slug}` },
      ]} />

      {jobPostingSchema.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: `NDT Careers in ${city.name}`,
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
        })
      }} />

      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/careers" className="hover:text-primary">Careers</Link>
          <span>/</span>
          <span className="text-foreground">{city.name}</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-10 md:p-14 mb-12">
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <Badge>{city.region}</Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">NDT Careers & Jobs in {city.name}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">{context.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-8">
            <div className="bg-white/50 rounded-lg p-3">
              <div className="font-semibold text-primary">{context.demand}</div>
              <div className="text-muted-foreground text-xs">Local Demand</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="font-semibold text-primary">{relevantIndustries.slice(0, 2).join(', ')}</div>
              <div className="text-muted-foreground text-xs">Top Industries</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="font-semibold text-primary">{city.keyFacilities?.length || 3}+</div>
              <div className="text-muted-foreground text-xs">Major Facilities</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="font-semibold text-primary">{Math.round(regionMultiplier * 100)}%</div>
              <div className="text-muted-foreground text-xs">Salary Adjustment</div>
            </div>
          </div>
        </section>

        {/* City Context */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">About NDT Opportunities in {city.name}</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Industry Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Key Industries</h3>
                  <div className="flex flex-wrap gap-2">
                    {relevantIndustries.map((industry, i) => (
                      <Badge key={i} variant="secondary">{industry}</Badge>
                    ))}
                  </div>
                </div>
                {city.keyFacilities && city.keyFacilities.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Major Facilities</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {city.keyFacilities.map((facility, i) => (
                        <li key={i}>• {facility}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Salary Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-1">REGIONAL ADJUSTMENT</div>
                  <div className="text-lg font-bold text-primary">{Math.round((regionMultiplier - 1) * 100)}% {regionMultiplier > 1 ? 'higher' : 'average'}</div>
                  <div className="text-xs text-muted-foreground">vs. national average</div>
                </div>
                <div className="border-t pt-3">
                  <div className="text-xs font-semibold text-muted-foreground mb-1">EXAMPLE: LEVEL 2 TECHNICIAN</div>
                  <div className="text-sm text-foreground">
                    <div>National: $55K-$80K</div>
                    <div className="text-primary font-semibold">
                      {city.name}: ${Math.round(55000 * regionMultiplier / 1000)}K-${Math.round(80000 * regionMultiplier / 1000)}K
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Popular Roles in City */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Popular NDT Roles in {city.name}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {topRoles.map((role) => {
              const adjustedSalary = adjustSalaryByRegion(role.salaryRange.min, role.salaryRange.max, city.name);
              return (
                <Card key={role.slug} className="hover:shadow-lg transition-shadow group flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="outline">{role.experience}+ yrs</Badge>
                      <TrendingUp className="h-4 w-4 text-primary opacity-60" />
                    </div>
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{role.description}</p>

                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Salary in {city.name}</div>
                        <div className="text-sm font-bold text-primary">
                          ${(adjustedSalary.min / 1000).toFixed(0)}K - ${(adjustedSalary.max / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Adjusted for regional cost of living
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Key Skills</div>
                        <div className="flex flex-wrap gap-1">
                          {role.skills.slice(0, 3).map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/careers/roles/${role.slug}`}
                      className="text-sm text-primary font-medium flex items-center group-hover:underline"
                    >
                      View Role Details <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/careers">View All {careerRoles.length} NDT Career Roles</Link>
            </Button>
          </div>
        </section>

        {/* Local Opportunities */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">How to Find NDT Jobs in {city.name}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1. Get Certified</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Earn ASNT, ISO 9712, or API certifications relevant to {city.name}'s industries.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/certifications">View Certifications</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2. Find Training</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Connect with NDT training providers in {city.name} area.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/find-providers">Find Providers</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3. Register Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Create your professional profile and connect with employers in {city.name}.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/register">Create Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* More Cities */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Explore Careers in Other Cities</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {cities.slice(0, 20).filter(c => c.slug !== city.slug).slice(0, 12).map((otherCity) => (
              <Link
                key={otherCity.slug}
                href={`/careers/${otherCity.slug}`}
                className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{otherCity.name}</div>
                <div className="text-xs text-muted-foreground">{otherCity.region}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-4">Start Your NDT Career in {city.name}</h2>
          <p className="mb-8 opacity-90 max-w-lg mx-auto">
            Get certified, gain experience, and join the growing community of NDT professionals in {city.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/certifications">Get Certified</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/find-providers">Find Local Training</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
