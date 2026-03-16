// src/app/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
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

      <div className="space-y-0">

        {/* ============================================
            HERO SECTION - Futuristic with grid bg, floating orbs, glassmorphism
            ============================================ */}
        <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-white">
          {/* Background layers */}
          <div className="absolute inset-0 hero-grid-bg" />
          <div className="absolute inset-0 hero-radial-glow" />

          {/* Floating orbs */}
          <div className="orb orb-primary w-[500px] h-[500px] -top-40 -right-40 animate-float-slow" />
          <div className="orb orb-accent w-[400px] h-[400px] -bottom-20 -left-20 animate-float" style={{ animationDelay: '2s' }} />
          <div className="orb orb-primary w-[200px] h-[200px] top-1/3 right-1/4 animate-float" style={{ animationDelay: '4s' }} />

          <div className="relative container py-20 md:py-28">
            <div className="max-w-5xl mx-auto text-center">
              {/* Animated badge */}
              <div className="animate-fade-in-up mb-8">
                <Badge className="px-5 py-2 text-sm font-medium glass-dark rounded-full border-[#004aad]/20">
                  <Activity className="h-3.5 w-3.5 mr-2 text-[#004aad]" />
                  Trusted by professionals in 75+ cities worldwide
                </Badge>
              </div>

              {/* Main heading with gradient text */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 animate-fade-in-up leading-[1.1] text-slate-900" style={{ animationDelay: '0.1s' }}>
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
                <Button size="lg" className="text-base px-10 py-6 btn-glow bg-brand hover:bg-brand-dark text-white rounded-xl shadow-lg shadow-brand/25" asChild>
                  <Link href="/request-service">Request Inspection <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-10 py-6 rounded-xl glass border-[#004aad]/20 hover:border-[#004aad]/40 hover:bg-[#004aad]/5" asChild>
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
        <section className="container py-24 bg-white">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="mb-4 px-4 py-1.5 glass-dark rounded-full border-[#004aad]/20 text-[#004aad]">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-slate-900">Three Simple Steps</h2>
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
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#004aad] to-[#0066ff] flex items-center justify-center shadow-xl shadow-[#004aad]/20 animate-float-slow" style={{ animationDelay: `${idx * 1.5}s` }}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-[#004aad] flex items-center justify-center text-xs font-bold text-[#004aad] shadow-md">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================
            STATS BANNER - Animated counters with glassmorphism
            ============================================ */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#004aad] via-[#0055cc] to-[#004aad] animate-gradient" />
          <div className="absolute inset-0 hero-dots-bg opacity-10" />

          <div className="relative container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                  <p className="text-4xl md:text-5xl font-bold text-white stat-number mb-2">{stat.value}</p>
                  <p className="text-sm text-white/70 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            WHY CHOOSE US - Glassmorphism cards with hover 3D
            ============================================ */}
        <section className="container py-24 bg-white">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 glass-dark rounded-full border-[#004aad]/20 text-[#004aad]">Why NDT Connect</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-slate-900">Built for the NDT Industry</h2>
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
                <div className="h-full p-7 rounded-2xl bg-white border border-[#004aad]/10 card-hover-3d">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#004aad]/10 to-[#60a5fa]/10 flex items-center justify-center mb-5 group-hover:from-[#004aad] group-hover:to-[#0066ff] transition-all duration-500">
                    <item.icon className="h-7 w-7 text-[#004aad] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-[#004aad] transition-colors">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="container section-divider" />

        {/* ============================================
            NDT METHODS - Icon cards with animated borders
            ============================================ */}
        <section className="py-24 relative bg-white">
          <div className="absolute inset-0 hero-dots-bg" />
          <div className="relative container">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-1.5 glass-dark rounded-full border-[#004aad]/20 text-[#004aad]">Inspection Methods</Badge>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-slate-900">NDT Inspection Methods</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Find providers for every major non-destructive testing method — from conventional UT and RT to advanced phased array and TOFD.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ndtMethods.map((m, idx) => (
                <Link key={m.slug} href={`/services/${m.slug}`} className={`block group animate-fade-in-up stagger-${idx + 1}`}>
                  <div className="h-full p-6 rounded-2xl bg-white border border-[#004aad]/8 card-hover-lift group-hover:border-[#004aad]/25 relative overflow-hidden">
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" />

                    <div className="relative">
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#004aad]/10 to-[#60a5fa]/10 flex items-center justify-center group-hover:from-[#004aad] group-hover:to-[#0066ff] transition-all duration-500">
                          <m.icon className="h-6 w-6 text-[#004aad] group-hover:text-white transition-colors duration-500" />
                        </div>
                        <Badge variant="outline" className="font-mono text-xs tracking-wider border-[#004aad]/20 text-[#004aad]">{m.abbr}</Badge>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-[#004aad] transition-colors">{m.name}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{m.desc}</p>
                      <span className="inline-flex items-center text-sm font-medium text-[#004aad] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                        Learn more <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="rounded-xl px-8 border-[#004aad]/20 hover:border-[#004aad]/40 hover:bg-[#004aad]/5" asChild>
                <Link href="/services">View All 12 NDT Methods <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ============================================
            INDUSTRIES - Minimal cards with accent borders
            ============================================ */}
        <section className="container py-24 bg-white">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 glass-dark rounded-full border-[#004aad]/20 text-[#004aad]">Industries</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-slate-900">Industries We Serve</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              NDT Connect supports all major industries requiring non-destructive testing and inspection services.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((ind, idx) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} className={`block group animate-fade-in-up stagger-${idx + 1}`}>
                <div className="h-full p-5 rounded-2xl border border-[#004aad]/8 card-hover-lift group-hover:border-[#004aad]/25 bg-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-[#004aad] to-[#60a5fa] group-hover:h-full transition-all duration-500 rounded-l-2xl" />
                  <h3 className="font-bold mb-1.5 text-slate-900 group-hover:text-[#004aad] transition-colors">{ind.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="container section-divider" />

        {/* ============================================
            POPULAR LOCATIONS - Globe-inspired grid
            ============================================ */}
        <section className="py-24 relative bg-white">
          <div className="absolute inset-0 hero-radial-glow" />
          <div className="relative container">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-1.5 glass-dark rounded-full border-[#004aad]/20 text-[#004aad]">Global Network</Badge>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-slate-900">Find NDT Services Near You</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                NDT Connect operates globally with certified providers in major industrial hubs.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {topCities.map((city, idx) => (
                <Link
                  key={city.slug}
                  href={`/ndt-services/${city.slug}`}
                  className={`group animate-fade-in-up stagger-${(idx % 8) + 1}`}
                >
                  <div className="p-4 bg-white border border-[#004aad]/8 rounded-xl text-center card-hover-lift group-hover:border-[#004aad]/25">
                    <div className="text-2xl mb-2">{city.flag}</div>
                    <p className="font-semibold text-sm text-slate-900 group-hover:text-[#004aad] transition-colors">{city.name}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{city.country}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/find-providers" className="inline-flex items-center text-sm font-semibold text-[#004aad] hover:underline underline-offset-4">
                View all 75+ service locations <ChevronRight className="inline h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================
            FOR PROVIDERS - Split layout with floating stats
            ============================================ */}
        <section className="container py-24 bg-white">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-left">
              <Badge className="mb-4 px-4 py-1.5 glass-dark rounded-full border-[#004aad]/20 text-[#004aad]">For NDT Providers</Badge>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 text-slate-900">Grow Your NDT Business</h2>
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
              <Button size="lg" className="bg-brand hover:bg-brand-dark text-white rounded-xl px-10 py-6 btn-glow shadow-lg shadow-brand/25" asChild>
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
                <div key={stat.label} className={`group animate-float-slow stagger-${idx + 1}`} style={{ animationDelay: `${idx * 1}s` }}>
                  <div className="p-6 rounded-2xl bg-white border border-[#004aad]/10 card-hover-3d text-center animate-pulse-glow" style={{ animationDelay: `${idx * 0.7}s` }}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#004aad]/10 to-[#60a5fa]/10 flex items-center justify-center mx-auto mb-4 group-hover:from-[#004aad] group-hover:to-[#0066ff] transition-all duration-500">
                      <stat.icon className="h-6 w-6 text-[#004aad] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <p className="font-bold text-3xl text-[#004aad] stat-number mb-1">{stat.value}</p>
                    <p className="text-xs text-slate-600 font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container section-divider" />

        {/* ============================================
            FREE TOOLS - Minimal with icons
            ============================================ */}
        <section className="container py-24 bg-white">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 glass-dark rounded-full border-[#004aad]/20 text-[#004aad]">Free Resources</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-slate-900">Free NDT Tools</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Use our free tools to help plan your NDT inspection projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'NDT Method Selector', desc: 'Answer a few questions and get recommended NDT methods for your specific application and material type.', href: '/tools/ndt-method-selector' },
              { icon: Search, title: 'Cost Estimator', desc: 'Get rough cost estimates for your NDT inspection project based on method, scope, and location.', href: '/tools/inspection-cost-estimator' },
              { icon: Award, title: 'Certification Pathway', desc: 'Plan your NDT certification journey with our step-by-step guide covering ASNT, ISO 9712, PCN, and API.', href: '/tools/certification-pathway' },
              { icon: FileText, title: 'Reporting Dashboard', desc: 'Generate professional NDT inspection reports with our advanced reporting tools. Access templates, compliance checklists, and digital report generation.', href: 'https://dt.atlantisndt.com', external: true },
            ].map((tool, idx) => (
              <a key={tool.href} href={tool.href} target={tool.external ? '_blank' : undefined} rel={tool.external ? 'noopener noreferrer' : undefined} className={`block group animate-fade-in-up stagger-${idx + 1}`}>
                <div className="h-full p-7 rounded-2xl border border-[#004aad]/8 card-hover-lift group-hover:border-[#004aad]/25 bg-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#004aad]/10 to-[#60a5fa]/10 flex items-center justify-center mb-5 group-hover:from-[#004aad] group-hover:to-[#0066ff] transition-all duration-500">
                      <tool.icon className="h-7 w-7 text-[#004aad] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-[#004aad] transition-colors">{tool.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ============================================
            BLOG TEASER
            ============================================ */}
        <section className="container py-16 bg-white">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text text-slate-900">Latest from Our Blog</h2>
              <p className="text-slate-600 mt-2">Expert insights on NDT methods, careers, and industry trends.</p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex rounded-xl border-[#004aad]/20 hover:border-[#004aad]/40">
              <Link href="/blog">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Complete Guide to Ultrasonic Testing', slug: 'ultimate-guide-ultrasonic-testing', category: 'Methods' },
              { title: 'NDT Career Guide 2026: Salaries & Paths', slug: 'ndt-career-guide-2026', category: 'Careers' },
              { title: 'UT vs RT: Which Method Should You Choose?', slug: 'ut-vs-rt-comparison', category: 'Comparisons' },
            ].map((post, idx) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={`group animate-fade-in-up stagger-${idx + 1}`}>
                <div className="h-full p-6 rounded-2xl border border-[#004aad]/8 card-hover-lift group-hover:border-[#004aad]/25 bg-white">
                  <Badge className="mb-3 text-xs glass-dark border-[#004aad]/20 text-[#004aad] rounded-full">{post.category}</Badge>
                  <h3 className="font-bold leading-snug text-slate-900 group-hover:text-[#004aad] transition-colors">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================================
            FINAL CTA - Full-width gradient with glow
            ============================================ */}
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-[#004aad] via-[#0055cc] to-[#004aad] animate-gradient" />
          <div className="absolute inset-0 hero-grid-bg opacity-5" />

          {/* Floating orbs */}
          <div className="orb w-[300px] h-[300px] bg-white -top-20 -left-20 opacity-5 animate-float-slow" />
          <div className="orb w-[200px] h-[200px] bg-white -bottom-10 -right-10 opacity-5 animate-float" />

          <div className="relative container text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Join NDT Connect today &mdash; whether you need NDT inspection services or want to grow your inspection business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="text-base px-10 py-6 bg-white text-[#004aad] hover:bg-white/90 rounded-xl font-bold shadow-xl" asChild>
                <Link href="/register">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-10 py-6 border-white/30 text-white hover:bg-white/10 rounded-xl" asChild>
                <Link href="/find-providers">Browse Providers</Link>
              </Button>
            </div>
            <p className="mt-8 text-sm text-white/50">No credit card required. Free for asset owners.</p>
          </div>
        </section>
      </div>
    </>
  );
}
