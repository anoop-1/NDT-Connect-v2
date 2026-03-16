import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCityBySlug, getAllCitySlugs, methods, cities } from '@/lib/seo-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, Search, ArrowRight, Shield, CheckCircle, Clock, Users, Zap, Globe, TrendingUp } from 'lucide-react';

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
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8 px-4 md:px-0">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-primary/40">/</span>
          <Link href="/services" className="hover:text-primary transition-colors">NDT Services</Link>
          <span className="text-primary/40">/</span>
          <span className="text-primary font-medium">{city.name}</span>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl mb-16 px-4 md:px-0">
          {/* Background elements */}
          <div className="absolute inset-0 hero-grid-bg opacity-10"></div>
          <div className="absolute top-10 right-10 w-72 h-72 orb opacity-20 rounded-full blur-3xl" style={{backgroundColor: '#004aad'}}></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 orb opacity-10 rounded-full blur-3xl" style={{backgroundColor: '#004aad'}}></div>

          {/* Content */}
          <div className="relative z-10 glass glass-strong rounded-2xl p-8 md:p-12 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="glass border border-white/20 bg-white/5 text-primary font-medium">
                <MapPin className="h-3 w-3 mr-1.5" />
                {city.region}, {city.country}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6 leading-tight text-slate-900">
              NDT Services in {city.name}
            </h1>

            <p className="text-lg text-slate-600 max-w-3xl mb-8 leading-relaxed">
              Find certified non-destructive testing providers in {city.name}. Book inspections online with instant quotes, real-time tracking, and verified expert inspectors.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="btn-glow bg-[#004aad] hover:bg-[#003a8a] text-white" asChild>
                <Link href="/find-providers">
                  <Search className="h-4 w-4 mr-2" />
                  Find Inspectors in {city.name}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="glass border-white/20 hover:bg-white/5" asChild>
                <Link href="/request-service">
                  <Zap className="h-4 w-4 mr-2" />
                  Post a Service Request
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider my-10"></div>

        {/* Why NDT in this city - Stats Section */}
        <section className="mb-16 px-4 md:px-0">
          <div className="mb-10">
            <h2 className="text-3xl font-bold gradient-text mb-4 text-slate-900">NDT Services in {city.name}</h2>
            <p className="text-slate-600 leading-relaxed text-lg">{city.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass rounded-xl p-6 border border-white/10 card-hover-lift animate-fade-in-up stagger-1 group cursor-default">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-[#004aad]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Users className="h-8 w-8 text-[#004aad] relative z-10 animate-float" />
              </div>
              <p className="font-semibold text-slate-900 mb-1">Verified Inspectors</p>
              <p className="text-sm text-slate-600">Certified & qualified professionals</p>
            </div>

            <div className="glass rounded-xl p-6 border border-white/10 card-hover-lift animate-fade-in-up stagger-2 group cursor-default">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-[#004aad]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Clock className="h-8 w-8 text-[#004aad] relative z-10 animate-float" />
              </div>
              <p className="font-semibold text-slate-900 mb-1">Instant Quotes</p>
              <p className="text-sm text-slate-600">Get pricing in seconds</p>
            </div>

            <div className="glass rounded-xl p-6 border border-white/10 card-hover-lift animate-fade-in-up stagger-3 group cursor-default">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-[#004aad]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Shield className="h-8 w-8 text-[#004aad] relative z-10 animate-float" />
              </div>
              <p className="font-semibold text-slate-900 mb-1">Quality Assured</p>
              <p className="text-sm text-slate-600">Standards compliant</p>
            </div>

            <div className="glass rounded-xl p-6 border border-white/10 card-hover-lift animate-fade-in-up stagger-4 group cursor-default">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-[#004aad]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Globe className="h-8 w-8 text-[#004aad] relative z-10 animate-float" />
              </div>
              <p className="font-semibold text-slate-900 mb-1">Local Experts</p>
              <p className="text-sm text-slate-600">{city.name} based services</p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider my-10"></div>

        {/* Industries in this city */}
        <section className="mb-16 px-4 md:px-0">
          <h2 className="text-3xl font-bold gradient-text mb-8">Key Industries in {city.name}</h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {city.industries.map((ind, i) => (
              <div
                key={i}
                className="glass-dark rounded-xl p-5 border border-white/10 card-hover-3d animate-fade-in-up group"
                style={{transitionDelay: `${i * 100}ms`}}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 glass-strong rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="h-5 w-5 text-[#004aad]" />
                  </div>
                  <span className="font-semibold text-foreground group-hover:text-[#004aad] transition-colors">{ind}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">Major Facilities & Infrastructure</h3>
            <div className="flex flex-wrap gap-3">
              {city.keyFacilities.map((facility, i) => (
                <Badge
                  key={i}
                  className="glass border border-[#004aad]/30 bg-[#004aad]/5 text-[#004aad] font-medium py-2 px-4 text-sm hover:bg-[#004aad]/10 transition-colors"
                >
                  {facility}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider my-10"></div>

        {/* NDT Methods Available */}
        <section className="mb-16 px-4 md:px-0">
          <h2 className="text-3xl font-bold gradient-text mb-8">NDT Methods Available in {city.name}</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {methods.slice(0, 6).map((method, i) => (
              <div
                key={method.slug}
                className="glass rounded-xl border border-white/10 overflow-hidden card-hover-lift animate-fade-in-up group"
                style={{transitionDelay: `${i * 100}ms`}}
              >
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-xl animated-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 p-6">
                  <div className="mb-4">
                    <Badge className="glass-strong border border-[#004aad]/30 bg-[#004aad]/10 text-[#004aad] font-bold text-xs">
                      {method.abbreviation}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-[#004aad] transition-colors">
                    {method.name}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {method.description}
                  </p>

                  <Link
                    href={`/services/${method.slug}`}
                    className="inline-flex items-center gap-2 text-[#004aad] font-semibold text-sm hover:gap-3 transition-all group/link"
                  >
                    {method.abbreviation} in {city.name}
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="glass border-white/20 hover:bg-white/5 text-foreground"
              asChild
            >
              <Link href="/services" className="flex items-center gap-2">
                View All NDT Methods <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider my-10"></div>

        {/* FAQ Section */}
        <section className="mb-16 px-4 md:px-0">
          <h2 className="text-3xl font-bold gradient-text mb-8">Frequently Asked Questions - NDT in {city.name}</h2>

          <div className="space-y-4">
            {[
              {
                q: `How do I find NDT inspectors in ${city.name}?`,
                a: `NDT Connect makes it easy to find certified NDT inspectors in ${city.name}. Simply search our platform by location and service type to see available providers, compare qualifications, and book inspections online.`
              },
              {
                q: `What NDT services are available in ${city.name}?`,
                a: `NDT Connect provides access to all major NDT methods in ${city.name} including Ultrasonic Testing (UT), Radiographic Testing (RT), Magnetic Particle Testing (MT), Penetrant Testing (PT), Eddy Current Testing (ET), Visual Testing (VT), and advanced methods like PAUT and TOFD.`
              },
              {
                q: `What industries in ${city.name} need NDT services?`,
                a: `Key industries in ${city.name} requiring NDT services include ${city.industries.join(', ')}. Major facilities in the area include ${city.keyFacilities.join(', ')}.`
              },
              {
                q: `How much do NDT services cost in ${city.name}?`,
                a: `NDT service costs in ${city.name} vary based on the testing method, scope of work, accessibility, and urgency. Get instant quotes from multiple certified providers through NDT Connect to compare pricing.`
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="glass rounded-xl p-6 border border-white/10 card-hover-lift animate-fade-in-up group cursor-default"
                style={{transitionDelay: `${i * 100}ms`}}
              >
                <div className="flex gap-1 mb-3">
                  <CheckCircle className="h-5 w-5 text-[#004aad] shrink-0 group-hover:animate-pulse-glow" />
                </div>
                <h3 className="font-bold text-foreground mb-3 group-hover:text-[#004aad] transition-colors">
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider my-10"></div>

        {/* CTA Section */}
        <section className="relative overflow-hidden rounded-2xl mb-16 px-4 md:px-0">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#004aad] to-[#003a8a] rounded-2xl opacity-90"></div>
          <div className="absolute top-10 right-10 w-72 h-72 orb opacity-20 rounded-full blur-3xl" style={{backgroundColor: '#ffffff'}}></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 orb opacity-10 rounded-full blur-3xl" style={{backgroundColor: '#ffffff'}}></div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Book NDT Services in {city.name}?
            </h2>

            <p className="text-lg opacity-95 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of asset owners and inspectors on NDT Connect. Find, compare, and book certified NDT providers in {city.name} today.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-[#004aad] hover:bg-gray-100 font-semibold"
                asChild
              >
                <Link href="/find-providers">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Find Inspectors
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 font-semibold"
                asChild
              >
                <Link href="/register">
                  <Zap className="h-4 w-4 mr-2" />
                  Join as Provider
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider my-10"></div>

        {/* Nearby Cities */}
        {nearbyCities.length > 0 && (
          <section className="px-4 md:px-0">
            <h2 className="text-3xl font-bold gradient-text mb-8">NDT Services in Nearby Locations</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {nearbyCities.map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/ndt-services/${c.slug}`}
                  className="glass rounded-xl p-4 border border-white/10 card-hover-lift animate-fade-in-up group flex flex-col items-center gap-2 text-center text-sm transition-all"
                  style={{transitionDelay: `${i * 80}ms`}}
                >
                  <MapPin className="h-5 w-5 text-[#004aad] group-hover:animate-float" />
                  <span className="font-semibold text-foreground group-hover:text-[#004aad] transition-colors">
                    NDT in {c.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
