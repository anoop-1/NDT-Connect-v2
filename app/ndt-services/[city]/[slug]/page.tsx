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

      <div className="space-y-12">
        {/* Breadcrumbs */}
        <div className="bg-muted/50 py-4 px-0">
          <div className="container">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-primary hover:underline">Home</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link href={`/ndt-services/${citySlug}`} className="text-primary hover:underline">{city.name}</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link href={`/services/${serviceSlug}`} className="text-primary hover:underline">{method.name}</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{method.name} in {city.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
          <div className="container">
            <div className="max-w-4xl">
              <div className="inline-block mb-4 px-3 py-1 bg-primary/20 rounded-full text-sm font-medium text-primary">
                {method.abbreviation} Services
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {method.name} in {city.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Professional {method.abbreviation} inspection services for {city.name}, {city.region}. Connect with certified NDT inspectors specializing in {method.name.toLowerCase()} for {city.industries.join(', ')} industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/request-service" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition text-center">
                  Request Inspection Quote
                </Link>
                <Link href={`/services/${serviceSlug}`} className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition text-center">
                  Learn More About {method.abbreviation}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">{method.longDescription}</p>
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                In {city.name}, {method.name} is essential for maintaining safety and reliability across critical industries including {city.industries.join(', ')}. Our certified NDT inspectors have extensive experience with {method.name} applications specific to {city.name}&apos;s unique industrial landscape and regulatory environment.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Whether you operate equipment at {city.keyFacilities.slice(0, 2).join(' or ')}, or other facilities in the {city.name} area, our {method.abbreviation} specialists are equipped to deliver reliable, code-compliant inspection services that meet your operational requirements.
              </p>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg h-fit">
              <h3 className="font-semibold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />Quick Facts
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" /><span>Method: <strong>{method.abbreviation} - {method.name}</strong></span></li>
                <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" /><span>Service Area: <strong>{city.name}, {city.region}</strong></span></li>
                <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" /><span>Primary Industries: <strong>{city.industries.slice(0, 2).join(', ')}</strong></span></li>
                <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" /><span>Key Standards: <strong>{method.standards.slice(0, 2).join(', ')}</strong></span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why This Service Matters */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Why {method.abbreviation} Matters in {city.name}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center"><Target className="w-5 h-5 mr-3 text-primary" />Industry Relevance</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {city.name} is home to significant operations in {city.industries.join(', ')}. {method.name} is critical for ensuring equipment reliability and regulatory compliance across these sectors.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The industrial facilities in the {city.name} area, including {city.keyFacilities.slice(0, 2).join(', ')}, depend on regular {method.abbreviation} inspections to maintain operational safety and meet stringent code requirements.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center"><AlertCircle className="w-5 h-5 mr-3 text-primary" />Compliance &amp; Safety</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {method.name} is mandated by key standards and codes applicable to {city.name} operations: {method.standards.slice(0, 3).join(', ')}.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Working with certified {method.abbreviation} inspectors ensures your facility remains compliant with all applicable regulations while preventing costly equipment failures and safety incidents.
              </p>
            </div>
          </div>
        </section>

        {/* Industries Served */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Industries Served in {city.name}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {city.industries.map((industry: string, idx: number) => (
              <div key={idx} className="border rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold mb-3">{industry}</h3>
                <p className="text-sm text-muted-foreground mb-4">
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
                <Link href={`/services/${serviceSlug}`} className="text-primary text-sm font-medium hover:underline">
                  Learn more about {method.abbreviation} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Key Facilities */}
        <section className="container bg-muted/30 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Key Facilities &amp; Infrastructure</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {city.name}&apos;s major industrial and infrastructure facilities require specialized {method.abbreviation} inspection services:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {city.keyFacilities.map((facility: string, idx: number) => (
              <div key={idx} className="flex items-start p-4 bg-background rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{facility}</p>
                  <p className="text-xs text-muted-foreground mt-1">Infrastructure requiring {method.abbreviation} inspection services</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Method Principles */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">{method.abbreviation} Principles &amp; Process</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">How {method.name} Works</h3>
            <ol className="space-y-3">
              {method.principles.map((principle: string, idx: number) => (
                <li key={idx} className="flex items-start">
                  <span className="font-bold text-blue-600 mr-3">{idx + 1}.</span>
                  <span className="text-blue-900">{principle}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Our certified NDT inspectors in {city.name} follow these principles rigorously to deliver accurate, reliable {method.abbreviation} inspections that meet industry standards and regulatory requirements specific to your facility.
          </p>
        </section>

        {/* Standards & Compliance */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Applicable Standards &amp; Codes</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {method.name} inspections in {city.name} are performed in compliance with the following industry standards and codes:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {method.standards.map((standard: string, idx: number) => (
              <div key={idx} className="border rounded-lg p-4 bg-muted/50">
                <p className="font-semibold text-sm">{standard}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Advantages Section */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Advantages of {method.abbreviation} Inspection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {method.advantages.map((advantage: string, idx: number) => (
              <div key={idx} className="flex items-start p-4 border rounded-lg hover:shadow-md transition">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <p className="text-sm">{advantage}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Applications Section */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">{method.abbreviation} Applications</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {method.name} is used across many inspection scenarios in {city.name}:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {method.applications.map((app: string, idx: number) => (
              <div key={idx} className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-foreground">{app}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Why is {method.abbreviation} important in {city.name}?</h3>
              <p className="text-muted-foreground">
                {method.name} is essential for {city.name}&apos;s critical industries including {city.industries.slice(0, 2).join(' and ')}. These sectors depend on regular inspections to ensure equipment safety, prevent failures, and maintain regulatory compliance.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">What are the main advantages of {method.abbreviation}?</h3>
              <p className="text-muted-foreground">
                Key advantages include: {method.advantages.slice(0, 3).join('; ')}. These benefits make {method.abbreviation} a cost-effective choice for many inspection scenarios in {city.name}.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Which standards apply to {method.abbreviation} in {city.name}?</h3>
              <p className="text-muted-foreground">
                {method.name} inspections follow standards including {method.standards.slice(0, 3).join(', ')}. All inspectors are certified to ASNT standards to ensure quality and compliance.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">How much does {method.abbreviation} cost?</h3>
              <p className="text-muted-foreground">
                Pricing depends on scope, equipment complexity, location, and facility accessibility. NDT Connect connects you with certified inspectors in {city.name} who provide competitive quotes for your specific needs.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Professional {method.abbreviation} Inspection?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with certified NDT inspectors in {city.name} who specialize in {method.name} services for your industry.
          </p>
          <Link href="/request-service" className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition inline-block">
            Get a Free Quote
          </Link>
        </section>

        {/* Related Services */}
        {related.length > 0 && (
          <section className="container">
            <h2 className="text-3xl font-bold mb-8">Related Services in {city.name}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((relatedMethod) => (
                <Link key={relatedMethod.slug} href={`/ndt-services/${citySlug}/${relatedMethod.slug}`} className="border rounded-lg p-6 hover:shadow-lg hover:border-primary transition group">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition">{relatedMethod.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{relatedMethod.abbreviation}</p>
                  <p className="text-sm text-muted-foreground">{relatedMethod.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Same Service in Nearby Cities */}
        {nearby.length > 0 && (
          <section className="container">
            <h2 className="text-3xl font-bold mb-8">{method.name} Services in Nearby Cities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {nearby.map((nearbyCity) => (
                <Link key={nearbyCity.slug} href={`/ndt-services/${nearbyCity.slug}/${serviceSlug}`} className="border rounded-lg p-6 hover:shadow-lg hover:border-primary transition group">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition">{method.name} in {nearbyCity.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{nearbyCity.region}</p>
                  <p className="text-xs text-muted-foreground">{nearbyCity.description.substring(0, 100)}...</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* City Page Link */}
        <section className="container text-center">
          <h2 className="text-2xl font-bold mb-4">Explore All NDT Services in {city.name}</h2>
          <p className="text-muted-foreground mb-6">View complete NDT service offerings and certified inspectors serving the {city.name} area.</p>
          <Link href={`/ndt-services/${citySlug}`} className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition">
            View {city.name} Page <ChevronRight className="w-4 h-4 ml-2" />
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

      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/" className="hover:text-primary">Home</Link><span>/</span>
          <Link href="/ndt-services" className="hover:text-primary">Services</Link><span>/</span>
          <Link href={`/ndt-services/${city.slug}`} className="hover:text-primary">{city.name}</Link><span>/</span>
          <span className="text-foreground">{industry.name}</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-10 md:p-14 mb-12">
          <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge>{industry.name}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{city.name}, {city.region}</div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{industry.name} NDT Services in {city.name}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">{industry.description}</p>
            </div>
            <Building2 className="h-16 w-16 text-primary opacity-20" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-white/50 rounded-lg p-3"><div className="font-semibold text-primary">{industry.commonMethods.length}+</div><div className="text-muted-foreground text-xs">Testing Methods</div></div>
            <div className="bg-white/50 rounded-lg p-3"><div className="font-semibold text-primary">{industry.standards.length}+</div><div className="text-muted-foreground text-xs">Applicable Standards</div></div>
            <div className="bg-white/50 rounded-lg p-3"><div className="font-semibold text-primary">{industry.keyApplications.length}+</div><div className="text-muted-foreground text-xs">Applications</div></div>
            <div className="bg-white/50 rounded-lg p-3"><div className="font-semibold text-primary">24/7</div><div className="text-muted-foreground text-xs">Availability</div></div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">About {industry.name} in {city.name}</h2>
              <Card><CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed mb-6">{industry.longDescription}</p>
                <div className="bg-primary/5 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Zap className="h-4 w-4 text-primary" />Industry Snapshot in {city.name}</h3>
                  <p className="text-sm text-muted-foreground">{city.description}</p>
                </div>
              </CardContent></Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2"><AlertTriangle className="h-6 w-6" />Key Challenges &amp; Inspection Needs</h2>
              <div className="space-y-3">
                {industry.challenges.map((challenge: string, i: number) => (
                  <Card key={i}><CardContent className="pt-6"><p className="text-sm text-muted-foreground">{challenge}</p></CardContent></Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2"><Zap className="h-6 w-6" />Common NDT Methods for {industry.name}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {industry.commonMethods.map((method: string, i: number) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow"><CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div><div className="font-semibold text-foreground">{method}</div></div>
                    </div>
                  </CardContent></Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2"><Shield className="h-6 w-6" />Applications in {city.name}</h2>
              <div className="space-y-2">
                {industry.keyApplications.map((app: string, i: number) => (
                  <Card key={i}><CardContent className="py-3 px-4 flex items-center gap-3"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0" /><span className="text-sm text-muted-foreground">{app}</span></CardContent></Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2"><FileText className="h-6 w-6" />Applicable Standards</h2>
              <Card><CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {industry.standards.map((standard: string, i: number) => (
                    <Badge key={i} variant="secondary" className="text-sm py-2 px-3">{standard}</Badge>
                  ))}
                </div>
              </CardContent></Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-4 bg-primary/5 border-primary/20">
              <CardHeader><CardTitle className="text-lg">Request {industry.name} NDT Services</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Connect with certified NDT professionals in {city.name} specializing in {industry.name}.</p>
                <Button asChild className="w-full"><Link href="/request-service">Request Service</Link></Button>
                <Button variant="outline" asChild className="w-full"><Link href="/find-providers">Find Providers</Link></Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Shield className="h-5 w-5" />Why NDT is Critical</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">{industry.whyNDT}</p></CardContent>
            </Card>

            {relatedCities.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="text-lg">{industry.name} in Other Cities</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {relatedCities.map((relCity) => (
                    <Link key={relCity.slug} href={`/ndt-services/${relCity.slug}/${industry.slug}`} className="block p-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all">
                      <div className="font-semibold text-sm text-foreground hover:text-primary">{relCity.name}</div>
                      <div className="text-xs text-muted-foreground">{relCity.region}</div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {relatedIndustries.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="text-lg">Other Services in {city.name}</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {relatedIndustries.map((relInd) => (
                    <Link key={relInd.slug} href={`/ndt-services/${city.slug}/${relInd.slug}`} className="block p-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all">
                      <div className="font-semibold text-sm text-foreground hover:text-primary">{relInd.name}</div>
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
            <Card><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Users className="h-5 w-5 text-primary" />Find Certified Professionals</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Connect with verified NDT professionals in {city.name} with specific expertise in {industry.name} inspection.</p></CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Clock className="h-5 w-5 text-primary" />Quick Service Requests</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Post your inspection needs and receive quotes from multiple qualified providers within hours.</p></CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Reliable Quality</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">All NDT providers are certified and verified. Get reliable, compliant inspections every time.</p></CardContent></Card>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-4">Need {industry.name} NDT Services in {city.name}?</h2>
          <p className="mb-8 opacity-90 max-w-lg mx-auto">Request professional NDT inspection services tailored to your {industry.name} operation in {city.name}.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary" asChild><Link href="/request-service">Request Service Now</Link></Button>
            <Button size="lg" variant="outline" asChild><Link href={`/ndt-services/${city.slug}`}>More Services in {city.name}</Link></Button>
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
