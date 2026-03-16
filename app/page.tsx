// src/app/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle, Search, Users, ShieldCheck, Globe, Award, Zap, ArrowRight,
  MapPin, Star, Clock, TrendingUp, Briefcase, FileText, ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'NDT Connect | #1 Marketplace for Non-Destructive Testing Services',
  description: 'Find certified NDT inspectors worldwide. NDT Connect is the leading marketplace connecting asset owners with qualified non-destructive testing providers for UT, RT, MT, PT, PAUT, TOFD, and more. Instant quotes, real-time tracking.',
  keywords: [
    'NDT marketplace', 'non-destructive testing', 'NDT services', 'NDT inspectors',
    'ultrasonic testing', 'radiographic testing', 'magnetic particle testing',
    'NDT provider', 'NDT inspection', 'find NDT services', 'book NDT inspection',
    'certified NDT inspectors', 'NDT service marketplace', 'industrial inspection',
    'NDT inspection near me', 'NDT testing companies', 'NDT inspection cost',
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
  { name: 'Ultrasonic Testing (UT)', slug: 'ultrasonic-testing', abbr: 'UT', desc: 'Detect internal flaws using high-frequency sound waves. Industry standard for thickness measurement and weld inspection.' },
  { name: 'Radiographic Testing (RT)', slug: 'radiographic-testing', abbr: 'RT', desc: 'X-ray and gamma ray imaging for internal defect detection in welds, castings, and complex geometries.' },
  { name: 'Magnetic Particle Testing (MT)', slug: 'magnetic-particle-testing', abbr: 'MT', desc: 'Surface and near-surface crack detection in ferromagnetic materials using magnetic fields.' },
  { name: 'Liquid Penetrant Testing (PT)', slug: 'penetrant-testing', abbr: 'PT', desc: 'Reveal surface-breaking defects in non-porous materials with fluorescent or visible dye.' },
  { name: 'Phased Array UT (PAUT)', slug: 'phased-array-ut', abbr: 'PAUT', desc: 'Advanced multi-element ultrasonic imaging for complex geometries and detailed flaw characterization.' },
  { name: 'Visual Testing (VT)', slug: 'visual-testing', abbr: 'VT', desc: 'Direct and remote visual examination of surfaces, welds, and structural components.' },
];

const topCities = [
  { name: 'Houston', slug: 'houston', country: 'USA', flag: '🇺🇸' },
  { name: 'Dubai', slug: 'dubai', country: 'UAE', flag: '🇦🇪' },
  { name: 'Abu Dhabi', slug: 'abu-dhabi', country: 'UAE', flag: '🇦🇪' },
  { name: 'Saudi Arabia', slug: 'saudi-arabia', country: 'KSA', flag: '🇸🇦' },
  { name: 'Singapore', slug: 'singapore', country: 'SG', flag: '🇸🇬' },
  { name: 'Mumbai', slug: 'mumbai', country: 'India', flag: '🇮🇳' },
  { name: 'Calgary', slug: 'calgary', country: 'Canada', flag: '🇨🇦' },
  { name: 'Aberdeen', slug: 'aberdeen', country: 'UK', flag: '🇬🇧' },
  { name: 'Los Angeles', slug: 'los-angeles', country: 'USA', flag: '🇺🇸' },
  { name: 'New York', slug: 'new-york', country: 'USA', flag: '🇺🇸' },
  { name: 'London', slug: 'london', country: 'UK', flag: '🇬🇧' },
  { name: 'Qatar', slug: 'qatar', country: 'Qatar', flag: '🇶🇦' },
];

const industries = [
  { name: 'Oil & Gas', slug: 'oil-and-gas', icon: '🛢️', desc: 'Pipeline, refinery, and offshore platform inspections' },
  { name: 'Aerospace', slug: 'aerospace', icon: '✈️', desc: 'Aircraft components and structural integrity testing' },
  { name: 'Power Generation', slug: 'power-generation', icon: '⚡', desc: 'Turbine, boiler, and nuclear facility inspections' },
  { name: 'Manufacturing', slug: 'manufacturing', icon: '🏭', desc: 'Quality assurance for fabricated components' },
  { name: 'Marine & Offshore', slug: 'marine-and-offshore', icon: '🚢', desc: 'Vessel hull, subsea, and offshore structure inspections' },
  { name: 'Construction', slug: 'construction', icon: '🏗️', desc: 'Structural steel, bridge, and infrastructure testing' },
  { name: 'Mining', slug: 'mining', icon: '⛏️', desc: 'Heavy equipment and structural integrity assessments' },
];

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NDT Connect',
    url: 'https://ndt-connect.com',
    logo: 'https://ndt-connect.com/favicon.png',
    description: 'The leading online marketplace connecting asset owners with certified non-destructive testing (NDT) service providers worldwide.',
    sameAs: [],
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'info@ndt-connect.com', telephone: '+1-281-840-8969' },
    address: { '@type': 'PostalAddress', addressLocality: 'Houston', addressRegion: 'TX', addressCountry: 'US' },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      <div className="space-y-20">
        {/* Hero Section - More Dynamic */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/10 via-blue-50/50 to-transparent" />
          <div className="relative container py-20 md:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
                Trusted by professionals in 75+ cities worldwide
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: '#004aad' }}>
                Book NDT Inspection<br className="hidden sm:block" /> Services Online
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                The world&apos;s leading marketplace for Non-Destructive Testing. Connect with certified inspectors for UT, RT, MT, PT, PAUT, TOFD &mdash; get instant quotes and real-time tracking.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                <Button size="lg" className="text-base px-8" asChild>
                  <Link href="/request-service">Request Inspection <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8" asChild>
                  <Link href="/find-providers">Find NDT Providers</Link>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> Free to post requests</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> Verified providers</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> Compare quotes</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container">
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: '#004aad' }}>How NDT Connect Works</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Get from inspection request to completed report in three simple steps.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: FileText, title: 'Post Your Request', desc: 'Describe your inspection needs — method, location, scope, and timeline. It takes less than 2 minutes.' },
              { step: '2', icon: Users, title: 'Get Matched', desc: 'Receive quotes from certified NDT providers in your area. Compare qualifications, pricing, and availability.' },
              { step: '3', icon: CheckCircle, title: 'Track & Complete', desc: 'Book your provider, track the inspection in real-time, and receive your inspection report digitally.' },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#004aad]/10 mb-5">
                  <span className="text-2xl font-bold" style={{ color: '#004aad' }}>{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Banner */}
        <section className="rounded-2xl py-14" style={{ backgroundColor: '#004aad' }}>
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div><p className="text-4xl md:text-5xl font-bold">75+</p><p className="text-sm opacity-80 mt-2">Cities Worldwide</p></div>
              <div><p className="text-4xl md:text-5xl font-bold">12</p><p className="text-sm opacity-80 mt-2">NDT Methods</p></div>
              <div><p className="text-4xl md:text-5xl font-bold">7</p><p className="text-sm opacity-80 mt-2">Industries Served</p></div>
              <div><p className="text-4xl md:text-5xl font-bold">100%</p><p className="text-sm opacity-80 mt-2">Verified Providers</p></div>
            </div>
          </div>
        </section>

        {/* Why Choose NDT Connect */}
        <section className="container">
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: '#004aad' }}>Why Choose NDT Connect?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Purpose-built for the NDT industry — connecting asset owners with qualified inspection professionals faster and more reliably.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Search, title: 'Smart Matching', desc: 'AI-powered recommendations match you with the right NDT provider based on method, location, certifications, and availability.' },
              { icon: Globe, title: 'Global Network', desc: 'Access certified NDT inspectors across 75+ cities spanning Americas, Europe, Middle East, Asia-Pacific, and Africa.' },
              { icon: ShieldCheck, title: 'Verified Credentials', desc: 'Every provider is verified for ASNT, ISO 9712, PCN, API, and other industry certifications before joining.' },
              { icon: Clock, title: 'Real-Time Tracking', desc: 'Track your inspection progress in real-time from request to final report delivery. Stay informed at every step.' },
              { icon: TrendingUp, title: 'Competitive Pricing', desc: 'Get multiple quotes to compare. Our marketplace drives competitive pricing while maintaining quality standards.' },
              { icon: Briefcase, title: 'All-in-One Platform', desc: 'From request to report — manage everything in one place. Scheduling, communication, payments, and documentation.' },
            ].map((item) => (
              <Card key={item.title} className="border hover:shadow-lg transition-all duration-300 hover:border-[#004aad]/30">
                <CardHeader>
                  <div className="p-2.5 bg-[#004aad]/10 rounded-lg w-fit mb-2">
                    <item.icon className="h-6 w-6" style={{ color: '#004aad' }} />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* NDT Methods Section */}
        <section className="bg-muted/30 py-16 rounded-2xl">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-3" style={{ color: '#004aad' }}>NDT Inspection Methods</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Find providers for every major non-destructive testing method — from conventional UT and RT to advanced phased array and TOFD.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ndtMethods.map((m) => (
                <Link key={m.slug} href={`/services/${m.slug}`} className="block group">
                  <Card className="h-full transition-all hover:shadow-lg hover:border-[#004aad]/30 bg-background">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="font-mono text-xs">{m.abbr}</Badge>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[#004aad] transition-colors" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-[#004aad] transition-colors">{m.name}</CardTitle>
                      <CardDescription className="leading-relaxed">{m.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">View All 12 NDT Methods <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="container">
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: '#004aad' }}>Industries We Serve</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            NDT Connect supports all major industries requiring non-destructive testing and inspection services.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((ind) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} className="block group">
                <Card className="h-full transition-all hover:shadow-lg hover:border-[#004aad]/30">
                  <CardContent className="pt-6">
                    <div className="text-3xl mb-3">{ind.icon}</div>
                    <h3 className="font-semibold mb-1 group-hover:text-[#004aad] transition-colors">{ind.name}</h3>
                    <p className="text-sm text-muted-foreground">{ind.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/industries">Explore All Industries <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        {/* Popular Locations - More Dynamic */}
        <section className="bg-muted/30 py-16 rounded-2xl">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-3" style={{ color: '#004aad' }}>Find NDT Services Near You</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              NDT Connect operates globally with certified providers in major industrial hubs.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {topCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/ndt-services/${city.slug}`}
                  className="p-4 bg-background border rounded-lg text-center hover:border-[#004aad]/30 hover:shadow-md transition-all group"
                >
                  <div className="text-2xl mb-1">{city.flag}</div>
                  <p className="font-medium text-sm group-hover:text-[#004aad] transition-colors">{city.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{city.country}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/find-providers" className="text-sm font-medium hover:underline" style={{ color: '#004aad' }}>
                View all 75+ service locations <ChevronRight className="inline h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* For Providers Section */}
        <section className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">For NDT Providers</Badge>
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#004aad' }}>Grow Your NDT Business</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Join NDT Connect as a service provider and access a steady stream of inspection requests from asset owners worldwide. Showcase your certifications, build your reputation, and win more work.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Get matched with relevant inspection requests',
                  'Showcase your certifications and portfolio',
                  'Manage jobs, scheduling, and payments in one place',
                  'Build your online reputation with verified reviews',
                  'Free to join — pay only when you win work',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild>
                <Link href="/register">Join as Provider <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-[#004aad]/5 border-[#004aad]/20">
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2" style={{ color: '#004aad' }} />
                  <p className="font-bold text-2xl" style={{ color: '#004aad' }}>500+</p>
                  <p className="text-xs text-muted-foreground">Active Providers</p>
                </CardContent>
              </Card>
              <Card className="bg-[#004aad]/5 border-[#004aad]/20">
                <CardContent className="pt-6 text-center">
                  <Globe className="h-8 w-8 mx-auto mb-2" style={{ color: '#004aad' }} />
                  <p className="font-bold text-2xl" style={{ color: '#004aad' }}>75+</p>
                  <p className="text-xs text-muted-foreground">Cities Covered</p>
                </CardContent>
              </Card>
              <Card className="bg-[#004aad]/5 border-[#004aad]/20">
                <CardContent className="pt-6 text-center">
                  <Star className="h-8 w-8 mx-auto mb-2" style={{ color: '#004aad' }} />
                  <p className="font-bold text-2xl" style={{ color: '#004aad' }}>4.8/5</p>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </CardContent>
              </Card>
              <Card className="bg-[#004aad]/5 border-[#004aad]/20">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2" style={{ color: '#004aad' }} />
                  <p className="font-bold text-2xl" style={{ color: '#004aad' }}>24hr</p>
                  <p className="text-xs text-muted-foreground">Avg Response</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Free NDT Tools */}
        <section className="container">
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: '#004aad' }}>Free NDT Tools</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Use our free tools to help plan your NDT inspection projects.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/tools/ndt-method-selector" className="block group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-[#004aad]/30">
                <CardHeader>
                  <div className="p-2.5 bg-[#004aad]/10 rounded-lg w-fit mb-2">
                    <Zap className="h-5 w-5" style={{ color: '#004aad' }} />
                  </div>
                  <CardTitle className="text-lg group-hover:text-[#004aad] transition-colors">NDT Method Selector</CardTitle>
                  <CardDescription>Answer a few questions and get recommended NDT methods for your specific application and material type.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/tools/inspection-cost-estimator" className="block group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-[#004aad]/30">
                <CardHeader>
                  <div className="p-2.5 bg-[#004aad]/10 rounded-lg w-fit mb-2">
                    <Search className="h-5 w-5" style={{ color: '#004aad' }} />
                  </div>
                  <CardTitle className="text-lg group-hover:text-[#004aad] transition-colors">Cost Estimator</CardTitle>
                  <CardDescription>Get rough cost estimates for your NDT inspection project based on method, scope, and location.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/tools/certification-pathway" className="block group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-[#004aad]/30">
                <CardHeader>
                  <div className="p-2.5 bg-[#004aad]/10 rounded-lg w-fit mb-2">
                    <Award className="h-5 w-5" style={{ color: '#004aad' }} />
                  </div>
                  <CardTitle className="text-lg group-hover:text-[#004aad] transition-colors">Certification Pathway</CardTitle>
                  <CardDescription>Plan your NDT certification journey with our step-by-step guide covering ASNT, ISO 9712, PCN, and API.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>

        {/* Blog / Resources Teaser */}
        <section className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold" style={{ color: '#004aad' }}>Latest from Our Blog</h2>
              <p className="text-muted-foreground mt-1">Expert insights on NDT methods, careers, and industry trends.</p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/blog">View All Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Complete Guide to Ultrasonic Testing', slug: 'ultimate-guide-ultrasonic-testing', category: 'Methods' },
              { title: 'NDT Career Guide 2026: Salaries & Paths', slug: 'ndt-career-guide-2026', category: 'Careers' },
              { title: 'UT vs RT: Which Method Should You Choose?', slug: 'ut-vs-rt-comparison', category: 'Comparisons' },
            ].map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full hover:shadow-lg transition-all hover:border-[#004aad]/30">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2 text-xs">{post.category}</Badge>
                    <CardTitle className="text-base group-hover:text-[#004aad] transition-colors leading-snug">{post.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="rounded-2xl p-12 md:p-16 text-white text-center" style={{ backgroundColor: '#004aad' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join NDT Connect today &mdash; whether you need NDT inspection services or want to grow your inspection business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="text-base px-8" asChild>
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 border-white text-white hover:bg-white/10" asChild>
              <Link href="/find-providers">Browse Providers</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-70">No credit card required. Free for asset owners.</p>
        </section>
      </div>
    </>
  );
}
