// src/app/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle, Search, Users, ShieldCheck, Globe, Award, Zap, ArrowRight,
  MapPin, Star, Clock, TrendingUp, Briefcase, FileText, ChevronRight, Activity,
  Radar, Eye, Waves, Atom, Layers, FileBarChart
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
    siteName: 'NDT Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NDT Connect | #1 NDT Inspection Marketplace',
    description: 'Find certified NDT inspectors worldwide. Instant quotes, real-time tracking.',
  },
  alternates: { canonical: 'https://ndt-connect.com' },
};

const ndtMethods = [
  { name: 'Ultrasonic Testing', slug: 'ultrasonic-testing', abbr: 'UT', icon: Waves, desc: 'Detect internal flaws using high-frequency sound waves. Industry standard for thickness measurement and weld inspection.' },
  { name: 'Radiographic Testing', slug: 'radiographic-testing', abbr: 'RT', icon: Atom, desc: 'X-ray and gamma ray imaging for internal defect detection in welds, castings, and complex geometries.' },
  { name: 'Magnetic Particle Testing', slug: 'magnetic-particle-testing', abbr: 'MT', icon: Activity, desc: 'Surface and near-surface crack detection in ferromagnetic materials using magnetic fields.' },
  { name: 'Liquid Penetrant Testing', slug: 'penetrant-testing', abbr: 'PT', icon: Eye, desc: 'Reveal surface-breaking defects in non-porous materials with fluorescent or visible dye.' },
  { name: 'Phased Array UT', slug: 'phased-array-ut', abbr: 'PAUT', icon: Radar, desc: 'Advanced multi-element ultrasonic imaging for complex geometries and detailed flaw characterization.' },
  { name: 'Visual Testing', slug: 'visual-testing', abbr: 'VT', icon: Search, desc: 'Direct and remote visual examination of surfaces, welds, and structural components.' },
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
  { name: 'Oil & Gas', slug: 'oil-and-gas', desc: 'Pipeline, refinery, and offshore platform inspections' },
  { name: 'Aerospace', slug: 'aerospace', desc: 'Aircraft components and structural integrity testing' },
  { name: 'Power Generation', slug: 'power-generation', desc: 'Turbine, boiler, and nuclear facility inspections' },
  { name: 'Manufacturing', slug: 'manufacturing', desc: 'Quality assurance for fabricated components' },
  { name: 'Marine & Offshore', slug: 'marine-and-offshore', desc: 'Vessel hull, subsea, and offshore structure inspections' },
  { name: 'Construction', slug: 'construction', desc: 'Structural steel, bridge, and infrastructure testing' },
  { name: 'Mining', slug: 'mining', desc: 'Heavy equipment and structural integrity assessments' },
  { name: 'Nuclear', slug: 'nuclear', desc: 'Reactor components, containment vessels, and safety-critical inspections' },
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

      <div className="space-y-0 full-bleed -my-8">

        {/* ============================================
            HERO SECTION - Futuristic with grid bg, floating orbs, glassmorphism
            ============================================ */}
        <section className="relative overflow-hidden min-h-[75vh] flex items-center bg-white">
          {/* Background layers */}
          <div className="absolute inset-0 hero-grid-bg" />
          <div className="absolute inset-0 hero-radial-glow" />

          {/* Background watermark logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/logo.png"
              alt=""
              width={1280}
              height={320}
              className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] max-w-[900px] h-auto opacity-[0.04]"
              aria-hidden="true"
              priority
            />
          </div>

          {/* Decorative orbs */}
          <div className="orb orb-primary w-[500px] h-[500px] -top-40 -right-40 opacity-20" />
          <div className="orb orb-accent w-[400px] h-[400px] -bottom-20 -left-20 opacity-20" />

          <div className="relative layout-wrapper py-20 md:py-28">
            <div className="max-w-5xl mx-auto text-center">
              {/* Animated badge */}
              <div className="animate-fade-in-up mb-8">
                <Badge className="px-5 py-2 text-sm font-medium bg-brand text-white rounded-full border border-brand shadow-lg shadow-brand/20">
                  <Activity className="h-3.5 w-3.5 mr-2 text-white" />
                  Trusted by professionals in 75+ cities worldwide
                </Badge>
              </div>

              {/* Main heading with gradient text */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 animate-fade-in-up leading-[1.1] text-slate-900" style={{ animationDelay: '0.1s' }}>
                <span className="gradient-text">Book NDT Inspection</span>{' '}
                <br className="hidden sm:block" />
                <span className="text-slate-900">Services Online</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                The world&apos;s leading marketplace for Non-Destructive Testing. Connect with certified inspectors for UT, RT, MT, PT, PAUT, TOFD &mdash; get instant quotes and real-time tracking.
              </p>

              {/* CTA buttons with glow */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Button size="lg" className="text-base px-6 sm:px-10 py-5 sm:py-6 btn-glow bg-brand hover:bg-brand-dark text-white rounded-xl shadow-lg shadow-brand/20" asChild>
                  <Link href="/request-service">Request Inspection <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-6 sm:px-10 py-5 sm:py-6 rounded-xl bg-white border-2 border-brand text-brand font-semibold hover:bg-brand hover:text-white transition-all shadow-md" asChild>
                  <Link href="/find-providers">Find NDT Providers</Link>
                </Button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {['Free to post requests', 'Verified providers', 'Compare quotes'].map((text) => (
                  <span key={text} className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                    </span>
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* ============================================
            HOW IT WORKS - Numbered steps with connecting line
            ============================================ */}
        <section className="py-16 bg-slate-50/80">
          <div className="layout-wrapper">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="mb-4 px-4 py-1.5 bg-brand/15 rounded-full border border-brand/40 text-brand font-semibold">How It Works</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-4">Three Simple Steps</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Get from inspection request to completed report — fast, simple, reliable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-[#004aad]/20 via-[#004aad]/40 to-[#004aad]/20" />

            {[
              { step: '01', icon: FileText, title: 'Post Your Request', desc: 'Describe your inspection needs — method, location, scope, and timeline. It takes less than 2 minutes.' },
              { step: '02', icon: Users, title: 'Get Matched', desc: 'Receive quotes from certified NDT providers in your area. Compare qualifications, pricing, and availability.' },
              { step: '03', icon: CheckCircle, title: 'Track & Complete', desc: 'Book your provider, track the inspection in real-time, and receive your inspection report digitally.' },
            ].map((item, idx) => (
              <div key={item.step} className={`relative text-center animate-fade-in-up stagger-${idx + 1}`}>
                <div className="relative inline-block mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#004aad] to-[#0066ff] flex items-center justify-center shadow-lg shadow-[#004aad]/20" style={{ animationDelay: `${idx * 1.5}s` }}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-brand flex items-center justify-center text-xs font-bold text-brand shadow-md">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* ============================================
            STATS BANNER - Animated counters with glassmorphism
            ============================================ */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
          <div className="absolute inset-0 hero-dots-bg opacity-10" />

          <div className="relative layout-wrapper">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[
                { value: '75+', label: 'Cities Worldwide', icon: Globe },
                { value: '12', label: 'NDT Methods', icon: Layers },
                { value: '7', label: 'Industries Served', icon: Briefcase },
                { value: '100%', label: 'Verified Providers', icon: ShieldCheck },
              ].map((stat, idx) => (
                <div key={stat.label} className={`text-center animate-count-up stagger-${idx + 1}`}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm mb-4">
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-white stat-number mb-2">{stat.value}</p>
                  <p className="text-sm text-white/90 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            WHY CHOOSE US - Glassmorphism cards with hover 3D
            ============================================ */}
        <section className="layout-wrapper py-16 bg-white">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 bg-brand/15 rounded-full border border-brand/40 text-brand font-semibold">Why NDT Connect</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gradient-text mb-4 text-slate-900">Built for the NDT Industry</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Purpose-built platform connecting asset owners with qualified inspection professionals faster and more reliably.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Search, title: 'Smart Matching', desc: 'AI-powered recommendations match you with the right NDT provider based on method, location, certifications, and availability.' },
              { icon: Globe, title: 'Global Network', desc: 'Access certified NDT inspectors across 75+ cities spanning Americas, Europe, Middle East, Asia-Pacific, and Africa.' },
              { icon: ShieldCheck, title: 'Verified Credentials', desc: 'Every provider is verified for ASNT, ISO 9712, PCN, API, and other industry certifications before joining.' },
              { icon: Clock, title: 'Real-Time Tracking', desc: 'Track your inspection progress in real-time from request to final report delivery. Stay informed at every step.' },
              { icon: TrendingUp, title: 'Competitive Pricing', desc: 'Get multiple quotes to compare. Our marketplace drives competitive pricing while maintaining quality standards.' },
              { icon: Briefcase, title: 'All-in-One Platform', desc: 'From request to report — manage everything in one place. Scheduling, communication, payments, and documentation.' },
            ].map((item, idx) => (
              <div key={item.title} className={`group animate-fade-in-up stagger-${idx + 1}`}>
                <div className="h-full p-7 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover-3d hover:shadow-md">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#004aad]/10 to-[#60a5fa]/10 flex items-center justify-center mb-5 group-hover:from-[#004aad] group-hover:to-[#0066ff] transition-all duration-500">
                    <item.icon className="h-7 w-7 text-brand group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-brand transition-colors">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="layout-wrapper section-divider" />

        {/* ============================================
            NDT METHODS - Icon cards with animated borders
            ============================================ */}
        <section className="py-16 relative bg-slate-50/80">
          <div className="absolute inset-0 hero-dots-bg" />
          <div className="relative layout-wrapper">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-4">NDT Inspection Methods</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Find providers for every major non-destructive testing method — from conventional UT and RT to advanced phased array and TOFD.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ndtMethods.map((m, idx) => (
                <Link key={m.slug} href={`/services/${m.slug}`} className={`block group animate-fade-in-up stagger-${idx + 1}`}>
                  <div className="h-full p-6 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover-lift group-hover:border-brand/40 group-hover:shadow-md relative overflow-hidden">
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" />

                    <div className="relative">
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#004aad]/10 to-[#60a5fa]/10 flex items-center justify-center group-hover:from-[#004aad] group-hover:to-[#0066ff] transition-all duration-500">
                          <m.icon className="h-6 w-6 text-brand group-hover:text-white transition-colors duration-500" />
                        </div>
                        <Badge variant="outline" className="font-mono text-xs tracking-wider border border-brand/40 text-brand bg-brand/5">{m.abbr}</Badge>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-brand transition-colors">{m.name}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{m.desc}</p>
                      <span className="inline-flex items-center text-sm font-medium text-brand opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                        Learn more <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="rounded-xl px-8 border-2 border-brand text-brand font-semibold hover:bg-brand hover:text-white transition-all shadow-sm" asChild>
                <Link href="/services">View All 12 NDT Methods <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ============================================
            INDUSTRIES - Minimal cards with accent borders
            ============================================ */}
        <section className="layout-wrapper py-16 bg-white">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-4">Industries We Serve</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              NDT Connect supports all major industries requiring non-destructive testing and inspection services.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((ind, idx) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} className={`block group animate-fade-in-up stagger-${idx + 1}`}>
                <div className="h-full p-5 rounded-2xl border border-slate-200 shadow-sm card-hover-lift group-hover:border-brand/40 group-hover:shadow-md bg-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-[#004aad] to-[#60a5fa] group-hover:h-full transition-all duration-500 rounded-l-2xl" />
                  <h3 className="font-bold mb-1.5 text-slate-900 group-hover:text-brand transition-colors">{ind.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="layout-wrapper section-divider" />

        {/* ============================================
            POPULAR LOCATIONS - Globe-inspired grid
            ============================================ */}
        <section className="py-16 relative bg-slate-50/80">
          <div className="absolute inset-0 hero-radial-glow" />
          <div className="relative layout-wrapper">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-4">Find NDT Services Near You</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                NDT Connect operates globally with certified providers in major industrial hubs.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {topCities.map((city, idx) => {
                const isPrimary = idx < 6;
                return (
                  <Link
                    key={city.slug}
                    href={`/ndt-services/${city.slug}`}
                    className={`group animate-fade-in-up stagger-${(idx % 8) + 1}`}
                  >
                    <div className={`p-4 bg-white border shadow-sm rounded-xl text-center card-hover-lift group-hover:border-brand/40 group-hover:shadow-md ${isPrimary ? 'border-brand/20' : 'border-slate-200'}`}>
                      <div className="text-2xl mb-2">{city.flag}</div>
                      <p className="font-semibold text-sm text-slate-900 group-hover:text-brand transition-colors">{city.name}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{city.country}</p>
                      {isPrimary && <span className="inline-block mt-1.5 text-[10px] font-medium text-brand/70">Top Market</span>}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link href="/find-providers" className="inline-flex items-center text-sm font-semibold text-brand hover:underline underline-offset-4">
                View all 75+ service locations <ChevronRight className="inline h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================
            FOR PROVIDERS - Split layout with floating stats
            ============================================ */}
        <section className="layout-wrapper py-16 bg-white">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gradient-text mb-6 text-slate-900">Grow Your NDT Business</h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Join NDT Connect as a service provider and access a steady stream of inspection requests from asset owners worldwide.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Get matched with relevant inspection requests',
                  'Showcase your certifications and portfolio',
                  'Manage jobs, scheduling, and payments in one place',
                  'Build your online reputation with verified reviews',
                  'Free to join — pay only when you win work',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 mt-0.5 shrink-0">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    </span>
                    <span className="text-sm font-medium text-slate-900">{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-brand hover:bg-brand-dark text-white rounded-xl px-10 py-6 btn-glow shadow-lg shadow-brand/20" asChild>
                <Link href="/register">Join as Provider <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-5 animate-fade-in-right">
              {[
                { icon: Users, value: '500+', label: 'Active Providers' },
                { icon: Globe, value: '75+', label: 'Cities Covered' },
                { icon: Star, value: '4.8/5', label: 'Avg Rating' },
                { icon: TrendingUp, value: '24hr', label: 'Avg Response' },
              ].map((stat, idx) => (
                <div key={stat.label} className={`group animate-fade-in-up stagger-${idx + 1}`}>
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover-lift hover:shadow-md text-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#004aad]/10 to-[#60a5fa]/10 flex items-center justify-center mx-auto mb-4 group-hover:from-[#004aad] group-hover:to-[#0066ff] transition-all duration-500">
                      <stat.icon className="h-6 w-6 text-brand group-hover:text-white transition-colors duration-500" />
                    </div>
                    <p className="font-bold text-3xl text-brand stat-number mb-1">{stat.value}</p>
                    <p className="text-xs text-slate-600 font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="layout-wrapper section-divider" />

        {/* ============================================
            TESTIMONIALS / SOCIAL PROOF
            ============================================ */}
        <section className="py-16 bg-slate-50/80">
          <div className="layout-wrapper">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-4">What Our Users Say</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Trusted by asset owners and NDT providers worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { quote: 'NDT Connect made it incredibly easy to find qualified UT inspectors for our pipeline project. We received multiple quotes within hours and the tracking feature kept us informed throughout.', name: 'James Mitchell', role: 'Asset Integrity Manager', company: 'Gulf Coast Energy', stars: 5 },
                { quote: 'As an NDT service provider, this platform has transformed our business. We now receive steady, qualified leads and the scheduling tools save us hours every week.', name: 'Raj Patel', role: 'Operations Director', company: 'Precision NDT Services', stars: 5 },
                { quote: 'The certification verification gives us confidence that every inspector we hire through NDT Connect meets our quality standards. It has become our go-to platform for all NDT needs.', name: 'Sarah Chen', role: 'Quality Assurance Lead', company: 'Pacific Fabrication Corp', stars: 5 },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm card-hover-lift">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-sm text-slate-900">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            FEATURED PROVIDERS SHOWCASE
            ============================================ */}
        <section className="layout-wrapper py-16 bg-white">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gradient-text mb-4 text-slate-900">Featured Providers</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Join hundreds of verified NDT companies already on the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {[
              { name: 'Precision NDT Services', location: 'Houston, TX', methods: ['UT', 'RT', 'PAUT'], rating: '4.9' },
              { name: 'Gulf Inspection Group', location: 'Dubai, UAE', methods: ['MT', 'PT', 'VT'], rating: '4.8' },
              { name: 'Pacific Testing Labs', location: 'Singapore', methods: ['UT', 'ET', 'TOFD'], rating: '4.9' },
              { name: 'Atlas NDT Solutions', location: 'Calgary, Canada', methods: ['RT', 'PAUT', 'MFL'], rating: '4.7' },
            ].map((provider, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 p-5 shadow-sm card-hover-lift text-center">
                <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-7 w-7 text-brand" />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 mb-1">{provider.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{provider.location}</p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-700">{provider.rating}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {provider.methods.map((m) => (
                    <span key={m} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" className="rounded-xl px-8 border-2 border-brand text-brand font-semibold hover:bg-brand hover:text-white transition-all" asChild>
              <Link href="/register">Join as Provider <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        <div className="layout-wrapper section-divider" />

        {/* ============================================
            FREE TOOLS - Minimal with icons
            ============================================ */}
        <section className="py-16 bg-slate-50/80">
          <div className="layout-wrapper">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-4">Free NDT Tools</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Use our free tools to help plan your NDT inspection projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'NDT Method Selector', desc: 'Answer a few questions and get recommended NDT methods for your specific application and material type.', href: '/tools/ndt-method-selector' },
              { icon: Search, title: 'Cost Estimator', desc: 'Get rough cost estimates for your NDT inspection project based on method, scope, and location.', href: '/tools/inspection-cost-estimator' },
              { icon: Award, title: 'Certification Pathway', desc: 'Plan your NDT certification journey with our step-by-step guide covering ASNT, ISO 9712, PCN, and API.', href: '/tools/certification-pathway' },
            ].map((tool: any, idx: number) => (
              <a key={tool.href} href={tool.href} target={tool.external ? '_blank' : undefined} rel={tool.external ? 'noopener noreferrer' : undefined} className={`block group animate-fade-in-up stagger-${idx + 1}`}>
                <div className="h-full p-7 rounded-2xl border border-slate-200 shadow-sm card-hover-lift group-hover:border-brand/40 group-hover:shadow-md bg-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#004aad]/10 to-[#60a5fa]/10 flex items-center justify-center mb-5 group-hover:from-[#004aad] group-hover:to-[#0066ff] transition-all duration-500">
                      <tool.icon className="h-7 w-7 text-brand group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-brand transition-colors">{tool.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          </div>
        </section>

        {/* ============================================
            BLOG TEASER
            ============================================ */}
        <section className="layout-wrapper py-16 bg-white">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Latest from Our Blog</h2>
              <p className="text-slate-600 mt-2">Expert insights on NDT methods, careers, and industry trends.</p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex rounded-xl border-2 border-brand text-brand font-semibold hover:bg-brand hover:text-white transition-all">
              <Link href="/blog">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Complete Guide to Ultrasonic Testing', slug: 'ultimate-guide-ultrasonic-testing', category: 'Methods', excerpt: 'Everything you need to know about UT — from principles and equipment to techniques for thickness measurement and weld inspection.', date: 'March 2026' },
              { title: 'NDT Career Guide 2026: Salaries & Paths', slug: 'ndt-career-guide-2026', category: 'Careers', excerpt: 'Explore NDT career paths, certification requirements, salary ranges by level, and the fastest routes to Level III.', date: 'February 2026' },
              { title: 'UT vs RT: Which Method Should You Choose?', slug: 'ut-vs-rt-comparison', category: 'Comparisons', excerpt: 'A side-by-side comparison of ultrasonic and radiographic testing — cost, speed, safety, and application suitability.', date: 'January 2026' },
            ].map((post, idx) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={`group animate-fade-in-up stagger-${idx + 1}`}>
                <div className="h-full p-6 rounded-2xl border border-slate-200 shadow-sm card-hover-lift group-hover:border-brand/40 group-hover:shadow-md bg-white">
                  <Badge className="mb-3 text-xs border-brand/40 text-brand bg-brand/10 rounded-full">{post.category}</Badge>
                  <h3 className="font-bold leading-snug text-slate-900 group-hover:text-brand transition-colors">{post.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{post.excerpt}</p>
                  <p className="text-xs text-slate-400 mt-3">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================================
            FINAL CTA - Full-width gradient with glow
            ============================================ */}
        <section className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
          <div className="absolute inset-0 hero-grid-bg opacity-5" />

          {/* Decorative orbs */}
          <div className="orb w-[300px] h-[300px] bg-white -top-20 -left-20 opacity-5" />
          <div className="orb w-[200px] h-[200px] bg-white -bottom-10 -right-10 opacity-5" />

          <div className="relative layout-wrapper text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              Join NDT Connect today &mdash; whether you need NDT inspection services or want to grow your inspection business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="text-base px-10 py-6 bg-brand hover:bg-brand-dark text-white rounded-xl font-bold shadow-lg" asChild>
                <Link href="/register">Create Free Account</Link>
              </Button>
              <Link href="/find-providers" className="inline-flex items-center justify-center text-base px-10 py-3 border-2 border-white text-white font-semibold hover:bg-white hover:text-slate-800 rounded-xl transition-all">
                Browse Providers
              </Link>
            </div>
            <p className="mt-8 text-sm text-white/70">No credit card required. Free for asset owners.</p>
          </div>
        </section>
      </div>
    </>
  );
}
