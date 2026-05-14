import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMethodBySlug, getAllMethodSlugs, methods } from '@/lib/seo-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, FileText, ArrowRight, Search, BookOpen } from 'lucide-react';
import AuthorByline from '@/components/AuthorByline';
import { BreadcrumbListSchema } from '@/components/seo/SchemaMarkup';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllMethodSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const method = getMethodBySlug(params.slug);
  if (!method) return {};

  const title = `${method.name} (${method.abbreviation}) Services | Book ${method.abbreviation} Inspection Online | NDT Connect`;
  const description = `${method.description} Find certified ${method.abbreviation} inspectors near you. Get instant quotes, real-time tracking, and verified experts on NDT Connect.`;

  return {
    title,
    description,
    keywords: [
      method.name.toLowerCase(),
      `${method.abbreviation} inspection`,
      `${method.abbreviation} testing services`,
      `${method.abbreviation} inspector`,
      `hire ${method.abbreviation} inspector`,
      `book ${method.abbreviation} testing`,
      `${method.name.toLowerCase()} near me`,
      'NDT services',
      'non-destructive testing',
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/services/${method.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://ndt-connect.com/services/${method.slug}`,
    },
  };
}

export default function MethodPage({ params }: Props) {
  const method = getMethodBySlug(params.slug);
  if (!method) notFound();

  const relatedMethods = methods.filter(m => m.slug !== method.slug).slice(0, 4);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${method.name} (${method.abbreviation}) Services`,
    description: method.longDescription,
    provider: {
      '@type': 'Organization',
      name: 'NDT Connect',
      url: 'https://ndt-connect.com',
    },
    areaServed: 'Worldwide',
    serviceType: 'Non-Destructive Testing',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${method.name} (${method.abbreviation})?`,
        acceptedAnswer: { '@type': 'Answer', text: method.longDescription },
      },
      {
        '@type': 'Question',
        name: `What industries use ${method.abbreviation} testing?`,
        acceptedAnswer: { '@type': 'Answer', text: `${method.name} is commonly used in ${method.industries.join(', ')} industries.` },
      },
      {
        '@type': 'Question',
        name: `What are the advantages of ${method.abbreviation}?`,
        acceptedAnswer: { '@type': 'Answer', text: method.advantages.join('. ') + '.' },
      },
      {
        '@type': 'Question',
        name: `How do I book ${method.abbreviation} inspection services?`,
        acceptedAnswer: { '@type': 'Answer', text: `You can book ${method.name} services through NDT Connect by searching for certified ${method.abbreviation} inspectors, comparing quotes, and scheduling inspections online with real-time tracking.` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbListSchema items={[
        { name: 'Home', url: 'https://ndt-connect.com' },
        { name: 'Services', url: 'https://ndt-connect.com/services' },
        { name: method.name, url: `https://ndt-connect.com/services/${method.slug}` },
      ]} />

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-slate-900">NDT Services</Link>
          <span>/</span>
          <span className="text-slate-900">{method.name}</span>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 md:p-12 mb-10">
          <Badge className="mb-4 text-sm">{method.abbreviation}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {method.name} ({method.abbreviation}) Services
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mb-6">
            {method.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/find-providers">
                <Search className="h-4 w-4 mr-2" />
                Find {method.abbreviation} Inspectors
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/request-service">Get a Quote</Link>
            </Button>
          </div>
        </section>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">What is {method.name}?</h2>
          <p className="text-slate-600 leading-relaxed mb-6">{method.longDescription}</p>

          <h3 className="text-xl font-semibold mb-3">How {method.abbreviation} Works</h3>
          <div className="space-y-3 mb-8">
            {method.principles.map((principle, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-slate-600">{principle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Applications of {method.name}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {method.applications.map((app, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-card border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                <span className="text-sm">{app}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Advantages & Limitations */}
        <section className="mb-12 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Advantages</h2>
            <ul className="space-y-3">
              {method.advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">{adv}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Limitations</h2>
            <ul className="space-y-3">
              {method.limitations.map((lim, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Standards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Applicable Standards & Codes</h2>
          <div className="flex flex-wrap gap-2">
            {method.standards.map((std, i) => (
              <Badge key={i} variant="secondary" className="text-sm py-1.5 px-3">
                <FileText className="h-3 w-3 mr-1.5" />
                {std}
              </Badge>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Industries Using {method.abbreviation}</h2>
          <div className="flex flex-wrap gap-3">
            {method.industries.map((ind, i) => (
              <Badge key={i} variant="outline" className="text-sm py-2 px-4">{ind}</Badge>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Need {method.name} Services?</h2>
          <p className="mb-6 opacity-90 max-w-lg mx-auto">
            Connect with certified {method.abbreviation} inspectors through NDT Connect. Get instant quotes, real-time tracking, and verified expertise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/find-providers">Find {method.abbreviation} Inspectors</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/register">Register as Provider</Link>
            </Button>
          </div>
        </section>

        {/* City providers — internal-link surface from method hub
            to top city × method pages. 18 anchor links from this hub feed
            crawl path into the city network. */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">
            {method.abbreviation} ({method.name}) services by city
          </h2>
          <p className="text-slate-600 mb-6">
            {method.abbreviation} inspection providers in the cities where this
            method sees the most demand. Click any link for a locally-anchored
            scope, named-facility list, and rate band.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {[
              ['houston-tx', 'Houston'],
              ['beaumont-tx', 'Beaumont'],
              ['baton-rouge-la', 'Baton Rouge'],
              ['corpus-christi-tx', 'Corpus Christi'],
              ['dallas-tx', 'Dallas-Fort Worth'],
              ['tulsa-ok', 'Tulsa'],
              ['midland-tx', 'Midland (Permian)'],
              ['pittsburgh-pa', 'Pittsburgh'],
              ['denver-co', 'Denver'],
              ['dubai-ae', 'Dubai'],
              ['abu-dhabi-ae', 'Abu Dhabi'],
              ['jubail-sa', 'Jubail'],
              ['yanbu-sa', 'Yanbu'],
              ['mumbai-in', 'Mumbai'],
              ['jamnagar-in', 'Jamnagar'],
              ['london-uk', 'London'],
              ['aberdeen-uk', 'Aberdeen'],
              ['perth-au', 'Perth'],
            ].map(([slug, label]) => (
              <Link
                key={slug}
                href={`/ndt-services/${slug}/${method.slug}`}
                className="text-slate-700 hover:text-primary hover:underline"
              >
                {method.abbreviation} services in {label}
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/find-providers"
              className="inline-flex items-center gap-1.5 text-primary font-semibold hover:gap-2 transition-all text-sm"
            >
              All 170+ cities <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        {/* Related Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Other NDT Methods</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedMethods.map((m) => (
              <Card key={m.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-2">{m.abbreviation}</Badge>
                  <CardTitle className="text-base">{m.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">{m.description}</p>
                  <Link href={`/services/${m.slug}`} className="text-sm text-primary font-medium flex items-center hover:underline">
                    Learn more <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Author byline — E-E-A-T signal (Person schema embedded) */}
        <section className="mb-12">
          <AuthorByline />
        </section>
      </div>
    </>
  );
}
