import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cities, methods, industries, getCityBySlug, getMethodBySlug, getIndustryBySlug } from '@/lib/seo-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import {
  ChevronRight, CheckCircle, AlertCircle, Zap, Target, BookOpen,
  MapPin, Building2, AlertTriangle, Shield, TrendingUp, ArrowRight,
  FileText, Settings, Users, Clock
} from 'lucide-react';

interface PageProps {
  params: Promise<{ city: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: Array<{ city: string; slug: string }> = [];

  // City × Service combinations
  for (const city of cities) {
    for (const method of methods) {
      params.push({ city: city.slug, slug: method.slug });
    }
  }

  // City × Industry combinations (only where relevant)
  for (const city of cities) {
    for (const ind of industries) {
      if (city.industries.includes(ind.name)) {
        params.push({ city: city.slug, slug: ind.slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, slug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return { title: 'Not Found' };

  const method = getMethodBySlug(slug);
  if (method) {
    const title = `${method.name} in ${city.name} | NDT Connect`;
    const description = `Professional ${method.abbreviation} (${method.name}) inspection services in ${city.name}, ${city.region}. Certified NDT inspectors specializing in ${method.name.toLowerCase()} for ${city.industries.join(', ')} industries.`;
    return {
      title,
      description,
      keywords: [
        `${method.name} in ${city.name}`,
        `${method.abbreviation} services ${city.name}`,
        `NDT inspection ${city.name}`,
        `${method.name} ${city.region}`,
        `certified NDT ${city.name}`,
      ],
      openGraph: { title, description, url: `https://ndt-connect.com/ndt-services/${citySlug}/${slug}`, type: 'website' },
      alternates: { canonical: `https://ndt-connect.com/ndt-services/${citySlug}/${slug}` },
    };
  }

  const industry = getIndustryBySlug(slug);
  if (industry) {
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
      ],
      openGraph: { title, description, url: `https://ndt-connect.com/ndt-services/${citySlug}/${slug}` },
      alternates: { canonical: `https://ndt-connect.com/ndt-services/${citySlug}/${slug}` },
    };
  }

  return { title: 'Not Found' };
}

// ==========================================
// SERVICE (METHOD) PAGE COMPONENT
// ==========================================
function ServicePage({ city, method, citySlug, serviceSlug }: { city: any; method: any; citySlug: string; serviceSlug: string }) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${method.name} in ${city.name}`,
    description: `Professional ${method.name} (${method.abbreviation}) inspection services in ${city.name}`,
    areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: city.region } },
    provider: { '@type': 'Organization', name: 'NDT Connect', url: 'https://ndt-connect.com' },
    serviceType: method.name,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Why is ${method.abbreviation} important in ${city.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `${method.name} is critical for ${city.name}'s key industries including ${city.industries.join(', ')}. These industries require rigorous inspection standards to ensure equipment reliability and safety.` },
      },
      {
        '@type': 'Question',
        name: `What are the advantages of ${method.abbreviation} inspection?`,
        acceptedAnswer: { '@type': 'Answer', text: method.advantages.slice(0, 3).join('. ') },
      },
      {
        '@type': 'Question',
        name: `Which standards govern ${method.abbreviation} in ${city.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `${method.name} inspections in ${city.name} follow standards including ${method.standards.slice(0, 3).join(', ')}.` },
      },
      {
        '@type': 'Question',
        name: `How long does a ${method.abbreviation} inspection take?`,
        acceptedAnswer: { '@type': 'Answer', text: `The duration of ${method.name} inspections depends on equipment size, complexity, and accessibility. Most inspections in ${city.name} are completed within 1-3 days.` },
      },
      {
        '@type': 'Question',
        name: `How much does ${method.abbreviation} cost in ${city.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Pricing for ${method.name} services in ${city.name} varies based on scope, equipment complexity, and location accessibility. Contact our platform to get competitive quotes from certified inspectors.` },
      },
    ],
  };

  const related = methods.filter(m => m.slug !== method.slug && m.industries.some((ind: string) => method.industries.includes(ind))).slice(0, 4);
  const nearby = cities.filter(c => c.slug !== city.slug && c.region === city.region).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="space-y-16">
        {/* Breadcrumbs */}
        <div className="glass py-4 px-0 sticky top-0 z-40 backdrop-blur-xl border-b border-white/10">
          <div className="container">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-[#004aad] hover:text-[#003a85] font-medium transition">Home</Link>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <Link href={`/ndt-services/${citySlug}`} className="text-[#004aad] hover:text-[#003a85] font-medium transition">{city.name}</Link>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <Link href={`/services/${serviceSlug}`} className="text-[#004aad] hover:text-[#003a85] font-medium transition">{method.name}</Link>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <span className="text-white/60">{method.name} in {city.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32">
          {/* Background elements */}
          <div className="hero-grid-bg absolute inset-0 opacity-5"></div>
          <div className="absolute inset-0 hero-radial-glow"></div>

          {/* Floating orbs */}
          <div className="absolute top-20 right-10 w-72 h-72 orb opacity-20 animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute -bottom-10 left-20 w-64 h-64 orb opacity-15 animate-float" style={{ animationDelay: '2s' }}></div>

          <div className="container relative z-10">
            <div className="max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="inline-block mb-6 px-4 py-2 glass-dark rounded-full text-sm font-semibold text-[#004aad] border border-[#004aad]/20 backdrop-blur-sm">
                {method.abbreviation} Services in {city.name}
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 gradient-text text-slate-900">
                {method.name} Inspection
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-3xl">
                Professional {method.abbreviation} inspection services for {city.name}, {city.region}. Connect with certified NDT inspectors specializing in {method.name.toLowerCase()} for {city.industries.join(', ')} industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/request-service" className="px-8 py-4 bg-[#004aad] text-white rounded-xl font-semibold hover:bg-[#003a85] transition btn-glow text-center">
                  Request Inspection Quote
                </Link>
                <Link href={`/services/${serviceSlug}`} className="px-8 py-4 glass-strong rounded-xl font-semibold hover:glass text-[#004aad] border border-[#004aad]/30 transition text-center">
                  Learn More About {method.abbreviation}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Overview Section */}
        <section className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl font-bold mb-8 gradient-text text-slate-900">Overview</h2>
              <p className="text-lg text-white/75 mb-6 leading-relaxed">{method.longDescription}</p>
              <p className="text-base text-white/70 mb-6 leading-relaxed">
                In {city.name}, {method.name} is essential for maintaining safety and reliability across critical industries including {city.industries.join(', ')}. Our certified NDT inspectors have extensive experience with {method.name} applications specific to {city.name}&apos;s unique industrial landscape and regulatory environment.
              </p>
              <p className="text-base text-white/70 leading-relaxed">
                Whether you operate equipment at {city.keyFacilities.slice(0, 2).join(' or ')}, or other facilities in the {city.name} area, our {method.abbreviation} specialists are equipped to deliver reliable, code-compliant inspection services that meet your operational requirements.
              </p>
            </div>
            <div className="glass-strong backdrop-blur-xl rounded-2xl p-8 h-fit border border-[#004aad]/20 animate-fade-in-scale stagger-1 animated-border">
              <h3 className="font-bold mb-6 flex items-center text-xl text-[#004aad]">
                <Zap className="w-6 h-6 mr-3 animate-pulse-glow" />Quick Facts
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /><span className="text-white/90"><strong className="text-[#004aad]">Method:</strong> {method.abbreviation} - {method.name}</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /><span className="text-white/90"><strong className="text-[#004aad]">Service Area:</strong> {city.name}, {city.region}</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /><span className="text-white/90"><strong className="text-[#004aad]">Primary Industries:</strong> {city.industries.slice(0, 2).join(', ')}</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /><span className="text-white/90"><strong className="text-[#004aad]">Key Standards:</strong> {method.standards.slice(0, 2).join(', ')}</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Why This Service Matters */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 gradient-text text-center">Why {method.abbreviation} Matters</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-dark rounded-2xl p-8 backdrop-blur-xl border border-[#004aad]/20 card-hover-lift animate-fade-in-up stagger-1">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-[#004aad]"><Target className="w-6 h-6 mr-3 icon-glow" />Industry Relevance</h3>
              <p className="text-white/75 leading-relaxed mb-4">
                {city.name} is home to significant operations in {city.industries.join(', ')}. {method.name} is critical for ensuring equipment reliability and regulatory compliance across these sectors.
              </p>
              <p className="text-white/70 leading-relaxed">
                The industrial facilities in the {city.name} area, including {city.keyFacilities.slice(0, 2).join(', ')}, depend on regular {method.abbreviation} inspections to maintain operational safety and meet stringent code requirements.
              </p>
            </div>
            <div className="glass-dark rounded-2xl p-8 backdrop-blur-xl border border-[#004aad]/20 card-hover-lift animate-fade-in-up stagger-2">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-[#004aad]"><Shield className="w-6 h-6 mr-3 icon-glow" />Compliance &amp; Safety</h3>
              <p className="text-white/75 leading-relaxed mb-4">
                {method.name} is mandated by key standards and codes applicable to {city.name} operations: {method.standards.slice(0, 3).join(', ')}.
              </p>
              <p className="text-white/70 leading-relaxed">
                Working with certified {method.abbreviation} inspectors ensures your facility remains compliant with all applicable regulations while preventing costly equipment failures and safety incidents.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Industries Served */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 gradient-text text-center">Industries Served in {city.name}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {city.industries.map((industry: string, idx: number) => (
              <div key={idx} className="glass rounded-2xl p-6 backdrop-blur-xl border border-white/10 card-hover-3d animate-fade-in-up transition-all hover:border-[#004aad]/50" style={{ animationDelay: `${idx * 0.1}s` }}>
                <h3 className="text-lg font-bold mb-4 text-[#004aad]">{industry}</h3>
                <p className="text-sm text-white/75 mb-4 leading-relaxed">
                  {industry === 'Oil & Gas'
                    ? `${method.name} plays a vital role in ensuring the integrity of pipelines, refineries, and production facilities throughout the ${city.name} region.`
                    : industry === 'Aerospace'
                    ? `Critical aircraft and aerospace component inspections require stringent ${method.abbreviation} standards, ensuring mission-critical performance.`
                    : industry === 'Manufacturing'
                    ? `Industrial manufacturing in ${city.name} relies on ${method.name} for quality control and defect detection in fabricated components.`
                    : industry === 'Power Generation'
                    ? `Power plants and energy infrastructure require regular ${method.abbreviation} inspections to maintain operational reliability and safety.`
                    : industry === 'Marine'
                    ? `Marine vessels and offshore structures in the ${city.name} area depend on ${method.abbreviation} for corrosion and fatigue inspection.`
                    : `${industry} operations in ${city.name} require professional ${method.abbreviation} inspection services for equipment and facility maintenance.`}
                </p>
                <Link href={`/services/${serviceSlug}`} className="text-[#004aad] text-sm font-semibold hover:text-[#003a85] transition inline-flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Key Facilities */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 gradient-text text-center">Key Facilities &amp; Infrastructure</h2>
          <div className="glass-dark rounded-2xl p-8 backdrop-blur-xl border border-[#004aad]/20 mb-8">
            <p className="text-white/80 mb-8 leading-relaxed text-lg">
              {city.name}&apos;s major industrial and infrastructure facilities require specialized {method.abbreviation} inspection services:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {city.keyFacilities.map((facility: string, idx: number) => (
                <div key={idx} className="flex items-start p-4 glass rounded-xl border border-white/10 animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{facility}</p>
                    <p className="text-xs text-white/60 mt-1">Infrastructure requiring {method.abbreviation} inspection services</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Method Principles */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 gradient-text text-center">{method.abbreviation} Principles &amp; Process</h2>
          <div className="glass-strong rounded-2xl p-8 md:p-12 backdrop-blur-xl border border-[#004aad]/30">
            <h3 className="text-2xl font-bold mb-8 text-[#004aad]">How {method.name} Works</h3>
            <div className="space-y-4">
              {method.principles.map((principle: string, idx: number) => (
                <div key={idx} className="flex items-start gap-4 p-4 glass rounded-xl border border-white/10 hover:border-[#004aad]/30 transition animate-fade-in-up stagger-{idx}" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#004aad] to-[#003a85] font-bold text-white text-sm flex-shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-white/90 leading-relaxed pt-1">{principle}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/75 leading-relaxed mt-8 text-center text-lg">
            Our certified NDT inspectors in {city.name} follow these principles rigorously to deliver accurate, reliable {method.abbreviation} inspections that meet industry standards and regulatory requirements specific to your facility.
          </p>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Standards & Compliance */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 gradient-text text-center">Applicable Standards &amp; Codes</h2>
          <p className="text-white/75 mb-8 leading-relaxed text-center text-lg">
            {method.name} inspections in {city.name} are performed in compliance with the following industry standards and codes:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {method.standards.map((standard: string, idx: number) => (
              <div key={idx} className="glass rounded-xl p-5 backdrop-blur-xl border border-[#004aad]/20 flex items-center gap-3 card-hover-lift animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <Shield className="w-5 h-5 text-[#004aad] flex-shrink-0" />
                <p className="font-semibold text-sm text-white">{standard}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Advantages Section */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 gradient-text text-center">Advantages of {method.abbreviation} Inspection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {method.advantages.map((advantage: string, idx: number) => (
              <div key={idx} className="flex items-start p-6 glass rounded-xl backdrop-blur-xl border border-white/10 card-hover-lift transition-all animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CheckCircle className="w-6 h-6 text-emerald-400 mr-4 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white/90">{advantage}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Applications Section */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 gradient-text text-center">{method.abbreviation} Applications</h2>
          <p className="text-white/75 mb-8 leading-relaxed text-center text-lg">
            {method.name} is used across many inspection scenarios in {city.name}:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {method.applications.map((app: string, idx: number) => (
              <div key={idx} className="p-4 glass rounded-xl backdrop-blur-xl border border-white/10 text-white/90 animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <p className="text-sm flex items-start gap-3">
                  <span className="text-[#004aad] font-bold mt-0.5">•</span>
                  {app}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* FAQ Section */}
        <section className="container">
          <h2 className="text-4xl font-bold mb-12 gradient-text text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: `Why is ${method.abbreviation} important in ${city.name}?`,
                a: `${method.name} is essential for ${city.name}'s critical industries including ${city.industries.slice(0, 2).join(' and ')}. These sectors depend on regular inspections to ensure equipment safety, prevent failures, and maintain regulatory compliance.`
              },
              {
                q: `What are the main advantages of ${method.abbreviation}?`,
                a: `Key advantages include: ${method.advantages.slice(0, 3).join('; ')}. These benefits make ${method.abbreviation} a cost-effective choice for many inspection scenarios in ${city.name}.`
              },
              {
                q: `Which standards apply to ${method.abbreviation} in ${city.name}?`,
                a: `${method.name} inspections follow standards including ${method.standards.slice(0, 3).join(', ')}. All inspectors are certified to ASNT standards to ensure quality and compliance.`
              },
              {
                q: `How much does ${method.abbreviation} cost?`,
                a: `Pricing depends on scope, equipment complexity, location, and facility accessibility. NDT Connect connects you with certified inspectors in ${city.name} who provide competitive quotes for your specific needs.`
              }
            ].map((faq, idx) => (
              <div key={idx} className="glass rounded-xl p-6 backdrop-blur-xl border border-white/10 card-hover-lift animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <h3 className="font-bold text-lg mb-3 text-[#004aad]">{faq.q}</h3>
                <p className="text-white/80 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Call to Action */}
        <section className="relative overflow-hidden rounded-3xl p-12 md:p-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/20 via-transparent to-[#004aad]/10"></div>
          <div className="absolute inset-0 hero-dots-bg opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 orb opacity-15 animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 orb opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-slate-900">Ready for Professional {method.abbreviation} Inspection?</h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Connect with certified NDT inspectors in {city.name} who specialize in {method.name} services for your industry.
            </p>
            <Link href="/request-service" className="px-10 py-4 bg-[#004aad] text-white rounded-xl font-bold hover:bg-[#003a85] transition btn-glow inline-block">
              Get a Free Quote Today
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Related Services */}
        {related.length > 0 && (
          <section className="container">
            <h2 className="text-4xl font-bold mb-12 gradient-text text-center">Related Services in {city.name}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((relatedMethod, idx) => (
                <Link key={relatedMethod.slug} href={`/ndt-services/${citySlug}/${relatedMethod.slug}`} className="glass rounded-2xl p-8 backdrop-blur-xl border border-[#004aad]/20 card-hover-3d animate-fade-in-up transition-all group" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <h3 className="font-bold text-2xl mb-3 text-[#004aad] group-hover:text-emerald-400 transition">{relatedMethod.name}</h3>
                  <p className="text-sm text-white/70 mb-4 font-medium">{relatedMethod.abbreviation}</p>
                  <p className="text-sm text-white/80 leading-relaxed">{relatedMethod.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-[#004aad] text-sm font-semibold group-hover:gap-3 transition">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Divider */}
        {nearby.length > 0 && <div className="section-divider"></div>}

        {/* Same Service in Nearby Cities */}
        {nearby.length > 0 && (
          <section className="container">
            <h2 className="text-4xl font-bold mb-12 gradient-text text-center">{method.name} Services in Nearby Cities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {nearby.map((nearbyCity, idx) => (
                <Link key={nearbyCity.slug} href={`/ndt-services/${nearbyCity.slug}/${serviceSlug}`} className="glass rounded-2xl p-8 backdrop-blur-xl border border-white/10 card-hover-3d animate-fade-in-up transition-all group hover:border-[#004aad]/50" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <h3 className="font-bold text-2xl mb-2 text-[#004aad] group-hover:text-emerald-400 transition">{method.name}</h3>
                  <p className="text-sm text-white/70 mb-3 font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {nearbyCity.name}, {nearbyCity.region}
                  </p>
                  <p className="text-sm text-white/75 leading-relaxed">{nearbyCity.description.substring(0, 100)}...</p>
                  <div className="mt-4 flex items-center gap-2 text-[#004aad] text-sm font-semibold group-hover:gap-3 transition">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Divider */}
        <div className="section-divider"></div>

        {/* City Page Link */}
        <section className="container text-center">
          <h2 className="text-3xl font-bold mb-4 gradient-text text-slate-900">Explore All NDT Services in {city.name}</h2>
          <p className="text-white/75 mb-8 text-lg">View complete NDT service offerings and certified inspectors serving the {city.name} area.</p>
          <Link href={`/ndt-services/${citySlug}`} className="inline-flex items-center px-8 py-4 glass-strong rounded-xl font-bold text-[#004aad] border border-[#004aad]/30 hover:border-[#004aad]/60 transition hover:bg-[#004aad]/5">
            View {city.name} Page <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </section>
      </div>
    </>
  );
}

// ==========================================
// INDUSTRY PAGE COMPONENT
// ==========================================
function IndustryPage({ city, industry, citySlug }: { city: any; industry: any; citySlug: string }) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${industry.name} NDT Services in ${city.name}`,
    description: `${industry.name} inspection and testing services in ${city.name}`,
    areaServed: { '@type': 'City', name: city.name, addressRegion: city.region },
    geo: { '@type': 'GeoCoordinates', latitude: city.coordinates.lat, longitude: city.coordinates.lng },
  };

  const relatedCities = cities.filter(c => c.industries.includes(industry.name)).slice(0, 5);
  const relatedIndustries = industries.filter(i => city.industries.includes(i.name)).slice(0, 5);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://ndt-connect.com' },
        { name: 'Services', url: 'https://ndt-connect.com/ndt-services' },
        { name: city.name, url: `https://ndt-connect.com/ndt-services/${city.slug}` },
        { name: industry.name, url: `https://ndt-connect.com/ndt-services/${city.slug}/${industry.slug}` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-white/60 mb-6 flex-wrap p-4 glass rounded-xl backdrop-blur-xl border border-white/10">
          <Link href="/" className="hover:text-[#004aad] transition">Home</Link><span>/</span>
          <Link href="/ndt-services" className="hover:text-[#004aad] transition">Services</Link><span>/</span>
          <Link href={`/ndt-services/${city.slug}`} className="hover:text-[#004aad] transition">{city.name}</Link><span>/</span>
          <span className="text-white font-medium">{industry.name}</span>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl p-12 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/20 via-transparent to-[#004aad]/10"></div>
          <div className="absolute inset-0 hero-grid-bg opacity-5"></div>
          <div className="absolute top-10 right-10 w-96 h-96 orb opacity-20 animate-float" style={{ animationDelay: '0s' }}></div>

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-6 mb-8 flex-wrap">
              <div className="flex-1 max-w-2xl">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <Badge className="bg-[#004aad]/20 text-[#004aad] border border-[#004aad]/30 px-4 py-2 text-sm font-semibold">{industry.name}</Badge>
                  <div className="flex items-center gap-1 text-sm text-white/70 glass rounded-lg px-3 py-1 backdrop-blur-sm border border-white/10">
                    <MapPin className="h-4 w-4 text-[#004aad]" />{city.name}, {city.region}
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text text-slate-900">{industry.name} NDT</h1>
                <p className="text-xl text-white/80 max-w-2xl leading-relaxed">{industry.description}</p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/20 to-transparent rounded-2xl blur-2xl"></div>
                <Building2 className="h-28 w-28 text-[#004aad] opacity-30 relative" />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { value: `${industry.commonMethods.length}+`, label: 'Testing Methods' },
                { value: `${industry.standards.length}+`, label: 'Standards' },
                { value: `${industry.keyApplications.length}+`, label: 'Applications' },
                { value: '24/7', label: 'Availability' }
              ].map((stat, idx) => (
                <div key={idx} className="glass rounded-xl p-4 backdrop-blur-xl border border-[#004aad]/20 text-center animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="font-bold text-2xl text-[#004aad]">{stat.value}</div>
                  <div className="text-xs text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <section className="animate-fade-in-up">
              <h2 className="text-4xl font-bold text-[#004aad] mb-6 gradient-text text-slate-900">About {industry.name}</h2>
              <div className="glass rounded-2xl p-8 backdrop-blur-xl border border-white/10">
                <p className="text-white/85 leading-relaxed mb-6 text-lg">{industry.longDescription}</p>
                <div className="glass-dark rounded-xl p-6 border border-[#004aad]/20">
                  <h3 className="font-bold text-[#004aad] mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 icon-glow" />Industry Snapshot in {city.name}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">{city.description}</p>
                </div>
              </div>
            </section>

            {/* Challenges Section */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-4xl font-bold text-[#004aad] mb-6 gradient-text flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 icon-glow" />Key Challenges
              </h2>
              <div className="space-y-3">
                {industry.challenges.map((challenge: string, i: number) => (
                  <div key={i} className="glass rounded-xl p-6 backdrop-blur-xl border border-white/10 card-hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <p className="text-white/90 text-base leading-relaxed">{challenge}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Methods Section */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl font-bold text-[#004aad] mb-6 gradient-text flex items-center gap-3">
                <Zap className="h-8 w-8 icon-glow" />Common NDT Methods
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {industry.commonMethods.map((method: string, i: number) => (
                  <div key={i} className="glass rounded-xl p-6 backdrop-blur-xl border border-white/10 card-hover-lift animate-fade-in-up transition-all hover:border-[#004aad]/40" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-[#004aad] flex-shrink-0 mt-1" />
                      <div className="font-bold text-white text-lg">{method}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Applications Section */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-4xl font-bold text-[#004aad] mb-6 gradient-text flex items-center gap-3">
                <Shield className="h-8 w-8 icon-glow" />Applications in {city.name}
              </h2>
              <div className="space-y-3">
                {industry.keyApplications.map((app: string, i: number) => (
                  <div key={i} className="glass rounded-xl p-4 backdrop-blur-xl border border-white/10 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <CheckCircle className="h-5 w-5 text-[#004aad] flex-shrink-0" />
                    <span className="text-white/90">{app}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Standards Section */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-4xl font-bold text-[#004aad] mb-6 gradient-text flex items-center gap-3">
                <FileText className="h-8 w-8 icon-glow" />Applicable Standards
              </h2>
              <div className="glass rounded-2xl p-8 backdrop-blur-xl border border-white/10">
                <div className="flex flex-wrap gap-2">
                  {industry.standards.map((standard: string, i: number) => (
                    <Badge key={i} className="bg-[#004aad]/20 text-[#004aad] border border-[#004aad]/30 px-4 py-2 text-sm font-medium animate-fade-in-scale" style={{ animationDelay: `${i * 0.05}s` }}>{standard}</Badge>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="sticky top-4 glass-strong rounded-2xl p-8 backdrop-blur-xl border border-[#004aad]/30 animated-border animate-fade-in-scale">
              <h3 className="text-xl font-bold text-[#004aad] mb-4">Request {industry.name} Services</h3>
              <p className="text-sm text-white/80 mb-5 leading-relaxed">Connect with certified NDT professionals in {city.name} specializing in {industry.name}.</p>
              <div className="space-y-3">
                <Link href="/request-service" className="block px-6 py-3 bg-[#004aad] text-white rounded-xl font-semibold hover:bg-[#003a85] transition text-center btn-glow">
                  Request Service
                </Link>
                <Link href="/find-providers" className="block px-6 py-3 glass rounded-xl font-semibold text-[#004aad] border border-[#004aad]/30 hover:border-[#004aad]/60 transition text-center">
                  Find Providers
                </Link>
              </div>
            </div>

            {/* Why NDT Card */}
            <div className="glass rounded-2xl p-8 backdrop-blur-xl border border-white/10 card-hover-lift animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h4 className="text-lg font-bold text-[#004aad] mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 icon-glow" />Why NDT is Critical
              </h4>
              <p className="text-sm text-white/80 leading-relaxed">{industry.whyNDT}</p>
            </div>

            {/* Related Cities */}
            {relatedCities.length > 0 && (
              <div className="glass rounded-2xl p-8 backdrop-blur-xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h4 className="text-lg font-bold text-[#004aad] mb-4">{industry.name} in Other Cities</h4>
                <div className="space-y-2">
                  {relatedCities.map((relCity) => (
                    <Link key={relCity.slug} href={`/ndt-services/${relCity.slug}/${industry.slug}`} className="block p-3 rounded-lg glass border border-white/10 hover:border-[#004aad]/40 transition-all hover:bg-[#004aad]/5">
                      <div className="font-semibold text-sm text-[#004aad] hover:text-emerald-400 transition">{relCity.name}</div>
                      <div className="text-xs text-white/60">{relCity.region}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Industries */}
            {relatedIndustries.length > 0 && (
              <div className="glass rounded-2xl p-8 backdrop-blur-xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h4 className="text-lg font-bold text-[#004aad] mb-4">Other Services in {city.name}</h4>
                <div className="space-y-2">
                  {relatedIndustries.map((relInd) => (
                    <Link key={relInd.slug} href={`/ndt-services/${city.slug}/${relInd.slug}`} className="block p-3 rounded-lg glass border border-white/10 hover:border-[#004aad]/40 transition-all hover:bg-[#004aad]/5">
                      <div className="font-semibold text-sm text-[#004aad] hover:text-emerald-400 transition">{relInd.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* How We Help */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text text-slate-900">How NDT Connect Helps</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Find Certified Professionals',
                desc: `Connect with verified NDT professionals in ${city.name} with specific expertise in ${industry.name} inspection.`
              },
              {
                icon: Clock,
                title: 'Quick Service Requests',
                desc: 'Post your inspection needs and receive quotes from multiple qualified providers within hours.'
              },
              {
                icon: TrendingUp,
                title: 'Reliable Quality',
                desc: 'All NDT providers are certified and verified. Get reliable, compliant inspections every time.'
              }
            ].map((item, idx) => (
              <div key={idx} className="glass rounded-2xl p-8 backdrop-blur-xl border border-white/10 card-hover-lift animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#004aad]/20 border border-[#004aad]/30">
                    <item.icon className="h-6 w-6 text-[#004aad]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#004aad]">{item.title}</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* CTA Section */}
        <section className="relative overflow-hidden rounded-3xl p-12 md:p-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#004aad] to-[#003a85]"></div>
          <div className="absolute inset-0 hero-dots-bg opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 orb opacity-20 animate-float" style={{ animationDelay: '0s' }}></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Need {industry.name} NDT Services in {city.name}?</h2>
            <p className="mb-8 text-white/90 max-w-lg mx-auto text-lg leading-relaxed">Request professional NDT inspection services tailored to your {industry.name} operation in {city.name}.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-service" className="px-8 py-4 bg-white text-[#004aad] rounded-xl font-bold hover:bg-white/90 transition text-center">
                Request Service Now
              </Link>
              <Link href={`/ndt-services/${city.slug}`} className="px-8 py-4 glass rounded-xl font-bold text-white border border-white/30 hover:border-white/60 transition text-center">
                More Services in {city.name}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// ==========================================
// MAIN PAGE - routes to service or industry
// ==========================================
export default async function CitySlugPage({ params }: PageProps) {
  const { city: citySlug, slug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  // Check if slug is a method
  const method = getMethodBySlug(slug);
  if (method) {
    return <ServicePage city={city} method={method} citySlug={citySlug} serviceSlug={slug} />;
  }

  // Check if slug is an industry
  const industry = getIndustryBySlug(slug);
  if (industry && city.industries.includes(industry.name)) {
    return <IndustryPage city={city} industry={industry} citySlug={citySlug} />;
  }

  notFound();
}
