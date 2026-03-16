// src/app/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Search, Users, ShieldCheck, Globe, Award, Zap, ArrowRight } from 'lucide-react';
import { HomepageImage } from '@/components/shared/HomepageImage';

export const metadata: Metadata = {
  title: 'NDT Connect | The Leading Marketplace for Non-Destructive Testing Services',
  description: 'Find certified NDT inspectors worldwide. NDT Connect is the #1 marketplace connecting asset owners with qualified non-destructive testing providers for UT, RT, MT, PT, PAUT, TOFD, and more.',
  keywords: [
    'NDT marketplace', 'non-destructive testing', 'NDT services', 'NDT inspectors',
    'ultrasonic testing', 'radiographic testing', 'magnetic particle testing',
    'NDT provider', 'NDT inspection', 'find NDT services', 'book NDT inspection',
    'certified NDT inspectors', 'NDT service marketplace', 'industrial inspection',
  ],
  openGraph: {
    title: 'NDT Connect | The #1 NDT Inspection Marketplace',
    description: 'Find certified NDT inspectors worldwide. Connect with qualified providers for UT, RT, MT, PT, PAUT, and more.',
    url: 'https://ndt-connect.com',
    type: 'website',
  },
  alternates: { canonical: 'https://ndt-connect.com' },
};

const ndtMethods = [
  { name: 'Ultrasonic Testing (UT)', slug: 'ultrasonic-testing', desc: 'Detect internal flaws using high-frequency sound waves' },
  { name: 'Radiographic Testing (RT)', slug: 'radiographic-testing', desc: 'X-ray and gamma ray imaging for internal defect detection' },
  { name: 'Magnetic Particle Testing (MT)', slug: 'magnetic-particle-testing', desc: 'Surface and near-surface crack detection in ferromagnetic materials' },
  { name: 'Liquid Penetrant Testing (PT)', slug: 'liquid-penetrant-testing', desc: 'Reveal surface-breaking defects in non-porous materials' },
  { name: 'Phased Array UT (PAUT)', slug: 'phased-array-ut', desc: 'Advanced multi-element ultrasonic imaging for complex geometries' },
  { name: 'Visual Testing (VT)', slug: 'visual-testing', desc: 'Direct and remote visual examination of surfaces and welds' },
];

const topCities = [
  { name: 'Houston', slug: 'houston' },
  { name: 'Aberdeen', slug: 'aberdeen' },
  { name: 'Calgary', slug: 'calgary' },
  { name: 'Singapore', slug: 'singapore' },
  { name: 'Dubai', slug: 'dubai' },
  { name: 'Mumbai', slug: 'mumbai' },
];

const industries = [
  { name: 'Oil & Gas', slug: 'oil-and-gas' },
  { name: 'Aerospace', slug: 'aerospace' },
  { name: 'Power Generation', slug: 'power-generation' },
  { name: 'Manufacturing', slug: 'manufacturing' },
];

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NDT Connect',
    url: 'https://ndt-connect.com',
    description: 'The leading online marketplace connecting asset owners with certified non-destructive testing (NDT) service providers worldwide.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@ndt-connect.com',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NDT Connect',
    url: 'https://ndt-connect.com',
    description: 'The #1 marketplace for non-destructive testing services. Find certified NDT inspectors worldwide.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://ndt-connect.com/find-providers?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center py-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm">
          <div className="container">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
              The #1 Marketplace for<br />Non-Destructive Testing Services
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with certified NDT inspectors worldwide. Find expert providers for ultrasonic testing, radiographic testing, magnetic particle testing, and more — all in one platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/find-providers">Find NDT Providers</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Trusted by asset owners and NDT professionals in 70+ cities worldwide
            </p>
          </div>
        </section>

        {/* Why Choose NDT Connect */}
        <section className="container">
          <h2 className="text-3xl font-semibold text-center mb-4">Why Choose NDT Connect?</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            The most comprehensive NDT service marketplace, purpose-built to connect asset owners with qualified inspection professionals.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Find Experts Easily</CardTitle>
                <CardDescription>Quickly locate qualified NDT service providers tailored to your specific needs, testing method, and location.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Global Coverage</CardTitle>
                <CardDescription>Access certified NDT inspectors across 70+ cities in the Americas, Europe, Middle East, Asia-Pacific, and Africa.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Verified Certifications</CardTitle>
                <CardDescription>Every provider on NDT Connect is verified for ASNT, ISO 9712, PCN, API, and other industry certifications.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* NDT Methods Section */}
        <section className="container">
          <h2 className="text-3xl font-semibold text-center mb-4">NDT Inspection Methods</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Find providers for every major non-destructive testing method. From conventional UT and RT to advanced phased array and TOFD.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ndtMethods.map((m) => (
              <Link key={m.slug} href={`/services/${m.slug}`} className="block group">
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{m.name}</CardTitle>
                    <CardDescription>{m.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/services">View All NDT Methods <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        {/* Streamlined NDT Solutions + Image */}
        <section className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Streamlined NDT Solutions</h2>
            <p className="text-muted-foreground mb-6">
              NDT Connect simplifies the process of finding and delivering Non-Destructive Testing services. From ultrasonic testing to radiographic inspections, connect with the right professionals instantly.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "AI-powered provider recommendations",
                "Easy service request and scheduling",
                "Real-time inspection tracking",
                "Role-based interfaces for clients and providers",
                "Verified certifications and qualifications",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <HomepageImage />
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary text-primary-foreground rounded-lg py-16">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold">70+</p>
                <p className="text-sm opacity-80 mt-1">Cities Worldwide</p>
              </div>
              <div>
                <p className="text-4xl font-bold">12+</p>
                <p className="text-sm opacity-80 mt-1">NDT Methods</p>
              </div>
              <div>
                <p className="text-4xl font-bold">7</p>
                <p className="text-sm opacity-80 mt-1">Industries Served</p>
              </div>
              <div>
                <p className="text-4xl font-bold">100%</p>
                <p className="text-sm opacity-80 mt-1">Verified Providers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="container">
          <h2 className="text-3xl font-semibold text-center mb-4">Industries We Serve</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            NDT Connect supports all major industries requiring non-destructive testing and inspection services.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} className="block group">
                <Card className="text-center h-full transition-all hover:shadow-lg hover:border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{ind.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/industries">View All Industries <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        {/* Popular Locations */}
        <section className="container">
          <h2 className="text-3xl font-semibold text-center mb-4">Find NDT Services Near You</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            NDT Connect operates globally with certified providers in major industrial hubs around the world.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/ndt-services/${city.slug}`}
                className="p-4 border rounded-lg text-center hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                <p className="font-medium text-sm">{city.name}</p>
                <p className="text-xs text-muted-foreground mt-1">NDT Services</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/ndt-services/houston" className="text-sm text-primary hover:underline">
              View all 70+ service locations →
            </Link>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container">
          <h2 className="text-3xl font-semibold text-center mb-4">Free NDT Tools</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Use our free tools to help plan your NDT inspection projects.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/tools/ndt-method-selector" className="block group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/30">
                <CardHeader>
                  <div className="p-2 bg-primary/10 rounded-full w-fit mb-2">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">NDT Method Selector</CardTitle>
                  <CardDescription>Answer a few questions and get recommended NDT methods for your application.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/tools/inspection-cost-estimator" className="block group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/30">
                <CardHeader>
                  <div className="p-2 bg-primary/10 rounded-full w-fit mb-2">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">Cost Estimator</CardTitle>
                  <CardDescription>Get rough cost estimates for your NDT inspection project.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/tools/certification-pathway" className="block group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/30">
                <CardHeader>
                  <div className="p-2 bg-primary/10 rounded-full w-fit mb-2">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">Certification Pathway</CardTitle>
                  <CardDescription>Plan your NDT certification journey with our step-by-step guide.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary rounded-2xl p-12 text-primary-foreground text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join NDT Connect today — whether you need NDT inspection services or want to grow your inspection business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/find-providers">Browse Providers</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
