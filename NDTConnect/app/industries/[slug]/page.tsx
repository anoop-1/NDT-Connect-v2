import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIndustryBySlug, getAllIndustrySlugs, industries, methods } from '@/lib/seo-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, FileText, ArrowRight, Search, Shield } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) return {};

  const title = `NDT for ${industry.name} | ${industry.name} Inspection Services | NDT Connect`;
  const description = `${industry.description} Find certified NDT inspectors specialized in ${industry.name.toLowerCase()} on NDT Connect.`;

  return {
    title,
    description,
    keywords: [
      `NDT ${industry.name.toLowerCase()}`,
      `${industry.name.toLowerCase()} NDT services`,
      `${industry.name.toLowerCase()} inspection`,
      `non-destructive testing ${industry.name.toLowerCase()}`,
      `${industry.name.toLowerCase()} NDT inspector`,
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/industries/${industry.slug}`,
    },
    alternates: {
      canonical: `https://ndt-connect.com/industries/${industry.slug}`,
    },
  };
}

export default function IndustryPage({ params }: Props) {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) notFound();

  const relatedMethods = methods.filter(m =>
    m.industries.some(i => i.toLowerCase().includes(industry.name.split(' ')[0].toLowerCase()) || industry.name.toLowerCase().includes(i.split(' ')[0].toLowerCase()))
  ).slice(0, 6);

  const otherIndustries = industries.filter(i => i.slug !== industry.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `NDT Services for ${industry.name}`,
    description: industry.longDescription,
    provider: { '@type': 'Organization', name: 'NDT Connect', url: 'https://ndt-connect.com' },
    serviceType: `Non-Destructive Testing for ${industry.name}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/industries" className="hover:text-slate-900">Industries</Link>
          <span>/</span>
          <span className="text-slate-900">{industry.name}</span>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 md:p-12 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            NDT for {industry.name}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mb-6">{industry.description}</p>
          <Button size="lg" asChild>
            <Link href="/find-providers"><Search className="h-4 w-4 mr-2" /> Find {industry.name} NDT Inspectors</Link>
          </Button>
        </section>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">NDT in the {industry.name} Industry</h2>
          <p className="text-slate-600 leading-relaxed mb-6">{industry.longDescription}</p>

          <div className="bg-primary/5 border-l-4 border-primary p-5 rounded-r-lg mb-8">
            <h3 className="font-semibold mb-2">Why NDT is Critical for {industry.name}</h3>
            <p className="text-sm text-slate-600">{industry.whyNDT}</p>
          </div>
        </section>

        {/* Key Applications */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Key NDT Applications in {industry.name}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {industry.keyApplications.map((app, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-card border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                <span className="text-sm">{app}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Common Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">NDT Methods Used in {industry.name}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {industry.commonMethods.map((method, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-card border rounded-lg">
                <Shield className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{method}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Industry Challenges</h2>
          <div className="space-y-3">
            {industry.challenges.map((challenge, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm">{challenge}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Standards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Relevant Standards & Codes</h2>
          <div className="flex flex-wrap gap-2">
            {industry.standards.map((std, i) => (
              <Badge key={i} variant="secondary" className="text-sm py-1.5 px-3">
                <FileText className="h-3 w-3 mr-1.5" />{std}
              </Badge>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary rounded-2xl p-10 text-primary-foreground text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Need NDT Services for {industry.name}?</h2>
          <p className="mb-6 opacity-90 max-w-lg mx-auto">
            Connect with certified inspectors experienced in {industry.name.toLowerCase()} applications through NDT Connect.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/find-providers">Find Inspectors</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/register">Register as Provider</Link>
            </Button>
          </div>
        </section>

        {/* Other Industries */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">NDT for Other Industries</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherIndustries.map((ind) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
                <h3 className="font-semibold text-sm group-hover:text-primary mb-1">{ind.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{ind.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
