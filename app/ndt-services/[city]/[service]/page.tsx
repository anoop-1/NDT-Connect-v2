import { Metadata } from 'next';
import Link from 'next/link';
import { cities, methods, getCityBySlug, getMethodBySlug } from '@/lib/seo-data';
import { ChevronRight, CheckCircle, AlertCircle, Zap, Target, BookOpen } from 'lucide-react';

interface PageProps {
  params: Promise<{
    city: string;
    service: string;
  }>;
}

export async function generateStaticParams() {
  const params: Array<{ city: string; service: string }> = [];

  for (const city of cities) {
    for (const method of methods) {
      params.push({
        city: city.slug,
        service: method.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const method = getMethodBySlug(serviceSlug);

  if (!city || !method) {
    return {
      title: 'Service Not Found',
    };
  }

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
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/ndt-services/${citySlug}/${serviceSlug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://ndt-connect.com/ndt-services/${citySlug}/${serviceSlug}`,
    },
  };
}

function SchemaMarkup({ city, method }: { city: any; method: any }) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${method.name} in ${city.name}`,
    description: `Professional ${method.name} (${method.abbreviation}) inspection services in ${city.name}`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: city.region,
      },
    },
    provider: {
      '@type': 'Organization',
      name: 'NDT Connect',
      url: 'https://ndt-connect.com',
    },
    serviceType: method.name,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Why is ${method.abbreviation} important in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${method.name} is critical for ${city.name}'s key industries including ${city.industries.join(', ')}. These industries require rigorous inspection standards to ensure equipment reliability and safety.`,
        },
      },
      {
        '@type': 'Question',
        name: `What are the advantages of ${method.abbreviation} inspection?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: method.advantages.slice(0, 3).join('. '),
        },
      },
      {
        '@type': 'Question',
        name: `Which standards govern ${method.abbreviation} in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${method.name} inspections in ${city.name} follow standards including ${method.standards.slice(0, 3).join(', ')}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How long does a ${method.abbreviation} inspection take?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The duration of ${method.name} inspections depends on equipment size, complexity, and accessibility. Most inspections in ${city.name} are completed within 1-3 days.`,
        },
      },
      {
        '@type': 'Question',
        name: `How much does ${method.abbreviation} cost in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Pricing for ${method.name} services in ${city.name} varies based on scope, equipment complexity, and location accessibility. Contact our platform to get competitive quotes from certified inspectors.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

const relatedServices = (method: any, city: any) => {
  return methods
    .filter(m => m.slug !== method.slug && m.industries.some(ind => method.industries.includes(ind)))
    .slice(0, 4);
};

const nearbyCities = (currentCity: any) => {
  return cities
    .filter(c => c.slug !== currentCity.slug && c.region === currentCity.region)
    .slice(0, 4);
};

export default async function NDTServicePage({ params }: PageProps) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const method = getMethodBySlug(serviceSlug);

  if (!city || !method) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-bold text-red-600">Service Not Found</h1>
        <p className="text-muted-foreground mt-2">The service or city combination you requested does not exist.</p>
        <Link href="/" className="text-primary hover:underline mt-4 block">
          Return to Home
        </Link>
      </div>
    );
  }

  const related = relatedServices(method, city);
  const nearby = nearbyCities(city);

  return (
    <>
      <SchemaMarkup city={city} method={method} />

      <div className="space-y-12">
        {/* Breadcrumbs */}
        <div className="bg-muted/50 py-4 px-0">
          <div className="container">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link href={`/cities/${citySlug}`} className="text-primary hover:underline">
                {city.name}
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link href={`/services/${serviceSlug}`} className="text-primary hover:underline">
                {method.name}
              </Link>
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
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
                  Request Inspection Quote
                </button>
                <Link
                  href={`/services/${serviceSlug}`}
                  className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition"
                >
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
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                {method.longDescription}
              </p>
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                In {city.name}, {method.name} is essential for maintaining safety and reliability across critical industries including {city.industries.join(', ')}. Our certified NDT inspectors have extensive experience with {method.name} applications specific to {city.name}'s unique industrial landscape and regulatory environment.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Whether you operate equipment at {city.keyFacilities.slice(0, 2).join(' or ')}, or other facilities in the {city.name} area, our {method.abbreviation} specialists are equipped to deliver reliable, code-compliant inspection services that meet your operational requirements.
              </p>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg h-fit">
              <h3 className="font-semibold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                Quick Facts
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Method: <strong>{method.abbreviation} - {method.name}</strong></span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Service Area: <strong>{city.name}, {city.region}</strong></span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Primary Industries: <strong>{city.industries.slice(0, 2).join(', ')}</strong></span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Key Standards: <strong>{method.standards.slice(0, 2).join(', ')}</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why This Service Matters */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Why {method.abbreviation} Matters in {city.name}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-3 text-primary" />
                Industry Relevance
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {city.name} is home to significant operations in {city.industries.join(', ')}. {method.name} is critical for ensuring equipment reliability and regulatory compliance across these sectors.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The industrial facilities in the {city.name} area, including {city.keyFacilities.slice(0, 2).join(', ')}, depend on regular {method.abbreviation} inspections to maintain operational safety and meet stringent code requirements.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-3 text-primary" />
                Compliance & Safety
              </h3>
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
            {city.industries.map((industry, idx) => (
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
                <Link
                  href={`/services/${serviceSlug}`}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Learn more about {method.abbreviation} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Key Facilities */}
        <section className="container bg-muted/30 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Key Facilities & Infrastructure</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {city.name}'s major industrial and infrastructure facilities require specialized {method.abbreviation} inspection services:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {city.keyFacilities.map((facility, idx) => (
              <div key={idx} className="flex items-start p-4 bg-background rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{facility}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {facility.includes('Port') || facility.includes('Channel')
                      ? `Marine and shipping operations requiring regular ${method.abbreviation} assessments`
                      : facility.includes('Medical') || facility.includes('Hospital')
                      ? `Medical device and facility inspections using ${method.abbreviation} methods`
                      : facility.includes('NASA') || facility.includes('Space')
                      ? `Aerospace components requiring stringent ${method.abbreviation} standards`
                      : facility.includes('Refinery') || facility.includes('Chemical')
                      ? `Pressure vessels and piping inspection using ${method.abbreviation} techniques`
                      : `Infrastructure requiring ${method.abbreviation} inspection services`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Method Principles */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">{method.abbreviation} Principles & Process</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">How {method.Name} Works</h3>
            <ol className="space-y-3">
              {method.principles.map((principle, idx) => (
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
          <h2 className="text-3xl font-bold mb-8">Applicable Standards & Codes</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {method.name} inspections in {city.name} are performed in compliance with the following industry standards and codes:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {method.standards.map((standard, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-muted/50">
                <p className="font-semibold text-sm">{standard}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
            All inspections are performed by certified {method.abbreviation} Level III inspectors who maintain current certifications under ASNT CP-189 or equivalent standards.
          </p>
        </section>

        {/* Advantages Section */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">Advantages of {method.Abbreviation} Inspection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {method.advantages.map((advantage, idx) => (
              <div key={idx} className="flex items-start p-4 border rounded-lg hover:shadow-md transition">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <p className="text-sm">{advantage}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Applications Section */}
        <section className="container">
          <h2 className="text-3xl font-bold mb-8">{method.Abbreviation} Applications</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {method.name} is used across many inspection scenarios in {city.name}:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {method.applications.map((app, idx) => (
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
              <h3 className="font-semibold text-lg mb-2">Why is {method.Abbreviation} important in {city.name}?</h3>
              <p className="text-muted-foreground">
                {method.name} is essential for {city.name}'s critical industries including {city.industries.slice(0, 2).join(' and ')}. These sectors depend on regular inspections to ensure equipment safety, prevent failures, and maintain regulatory compliance.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">What are the main advantages of {method.Abbreviation}?</h3>
              <p className="text-muted-foreground">
                Key advantages include: {method.advantages.slice(0, 3).join('; ')}. These benefits make {method.abbreviation} a cost-effective choice for many inspection scenarios in {city.name}.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Which standards apply to {method.Abbreviation} in {city.name}?</h3>
              <p className="text-muted-foreground">
                {method.name} inspections follow standards including {method.standards.slice(0, 3).join(', ')}. All inspectors are certified to ASNT standards to ensure quality and compliance.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">How long does a {method.Abbreviation} inspection take?</h3>
              <p className="text-muted-foreground">
                Inspection duration varies based on equipment size, complexity, and accessibility. Most {method.abbreviation} inspections in {city.name} are completed within 1-3 business days.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">How much does {method.Abbreviation} cost?</h3>
              <p className="text-muted-foreground">
                Pricing depends on scope, equipment complexity, location, and facility accessibility. NDT Connect connects you with certified inspectors in {city.name} who provide competitive quotes for your specific needs.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Professional {method.Abbreviation} Inspection?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with certified NDT inspectors in {city.name} who specialize in {method.name} services for your industry.
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
            Get a Free Quote
          </button>
        </section>

        {/* Related Services */}
        {related.length > 0 && (
          <section className="container">
            <h2 className="text-3xl font-bold mb-8">Related Services in {city.name}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((relatedMethod) => (
                <Link
                  key={relatedMethod.slug}
                  href={`/ndt-services/${citySlug}/${relatedMethod.slug}`}
                  className="border rounded-lg p-6 hover:shadow-lg hover:border-primary transition group"
                >
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition">
                    {relatedMethod.name}
                  </h3>
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
            <h2 className="text-3xl font-bold mb-8">{method.Name} Services in Nearby Cities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {nearby.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/ndt-services/${nearbyCity.slug}/${serviceSlug}`}
                  className="border rounded-lg p-6 hover:shadow-lg hover:border-primary transition group"
                >
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition">
                    {method.name} in {nearbyCity.name}
                  </h3>
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
          <p className="text-muted-foreground mb-6">
            View complete NDT service offerings and certified inspectors serving the {city.name} area.
          </p>
          <Link
            href={`/cities/${citySlug}`}
            className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition"
          >
            View {city.name} Page
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </section>
      </div>
    </>
  );
}
