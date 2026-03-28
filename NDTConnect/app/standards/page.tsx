import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ndtStandards } from '@/lib/standards-data';
import { Search, BookOpen, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'NDT Standards Database | ASME, API, AWS, ISO Standards | NDT Connect',
  description: 'Comprehensive database of 100+ NDT inspection standards including ASME Section V, API 510/570/653, AWS D1.1, ISO, EN, DNVGL, and NACE standards. Browse by organization and industry.',
  keywords: ['NDT standards', 'ASME Section V', 'API 510', 'AWS D1.1', 'ISO standards', 'inspection standards', 'weld standards'],
  openGraph: {
    title: 'NDT Standards Database | Complete Standards Reference',
    description: 'Browse 100+ NDT standards and inspection codes covering all NDT methods and industries.',
    url: 'https://ndt-connect.com/standards',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ndt-connect.com/standards',
  },
};

// Group standards by organization
const standardsByOrganization = ndtStandards.reduce((acc, standard) => {
  if (!acc[standard.organization]) {
    acc[standard.organization] = [];
  }
  acc[standard.organization].push(standard);
  return acc;
}, {} as Record<string, typeof ndtStandards>);

// Get unique methods
const allMethods = Array.from(new Set(ndtStandards.flatMap(s => s.methods))).sort();

// Get unique industries
const allIndustries = Array.from(new Set(ndtStandards.flatMap(s => s.industries))).sort();

export default function StandardsPage() {
  const organizations = Object.keys(standardsByOrganization).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-4">
            <BookOpen className="h-4 w-4" />
            Standards & Codes
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            NDT Standards Database
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Comprehensive reference for 100+ NDT inspection standards and codes. Browse ASME, API, AWS, ISO, EN, DNVGL, and NACE standards covering all NDT methods and industries worldwide.
          </p>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search standards by code or title..."
              className="pl-12 h-12 text-base rounded-lg border-2 border-primary/20 focus:border-primary focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-2">{ndtStandards.length}</p>
              <p className="text-sm font-medium text-muted-foreground">NDT Standards</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-2">{organizations.length}</p>
              <p className="text-sm font-medium text-muted-foreground">Standards Organizations</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-2">{allIndustries.length}</p>
              <p className="text-sm font-medium text-muted-foreground">Industries Covered</p>
            </CardContent>
          </Card>
        </div>

        {/* Standards by Organization */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-8">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-3xl font-bold text-primary">Standards by Organization</h2>
          </div>

          <div className="space-y-8">
            {organizations.map((org) => (
              <section key={org}>
                <h3 className="text-2xl font-bold text-primary mb-6 pb-3 border-b-2 border-primary/20">
                  {org}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {standardsByOrganization[org]
                    .sort((a, b) => a.code.localeCompare(b.code))
                    .map((standard) => (
                      <Link
                        key={standard.slug}
                        href={`/standards/${standard.slug}`}
                        className="group"
                      >
                        <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 hover:bg-primary/5">
                          <CardContent className="p-6">
                            <div className="mb-3 flex items-start justify-between">
                              <div>
                                <h4 className="font-bold text-primary text-lg group-hover:underline">
                                  {standard.code}
                                </h4>
                                <p className="text-sm font-medium text-muted-foreground mt-1">
                                  {standard.title}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                              {standard.description}
                            </p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                {standard.methods.length} method(s)
                              </span>
                              <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Standards by Method */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Standards by NDT Method</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {allMethods.map((method) => {
              const methodStandards = ndtStandards.filter(s => s.methods.includes(method));
              return (
                <Card key={method}>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-primary mb-4 text-lg">{method}</h3>
                    <div className="space-y-2">
                      {methodStandards.map((standard) => (
                        <Link
                          key={standard.slug}
                          href={`/standards/${standard.slug}`}
                          className="flex items-center justify-between p-2 rounded hover:bg-slate-100 transition-colors group text-sm"
                        >
                          <div>
                            <p className="font-medium text-primary group-hover:underline">
                              {standard.code}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {standard.organization}
                            </p>
                          </div>
                          <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Standards by Industry */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Standards by Industry</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {allIndustries.map((industry) => {
              const industryStandards = ndtStandards.filter(s => s.industries.includes(industry));
              return (
                <Card key={industry}>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-primary mb-4 text-lg">{industry}</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {industryStandards.map((standard) => (
                        <Link
                          key={standard.slug}
                          href={`/standards/${standard.slug}`}
                          className="flex items-center justify-between p-2 rounded hover:bg-slate-100 transition-colors group text-sm"
                        >
                          <div>
                            <p className="font-medium text-primary group-hover:underline">
                              {standard.code}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {standard.organization}
                            </p>
                          </div>
                          <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Key Standards Highlight */}
        <div className="mb-12 grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-bold text-primary mb-4 text-lg">🏭 Essential Industrial Standards</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  <strong>ASME Section V:</strong> NDT methods and requirements
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  <strong>API 510/570/653:</strong> Equipment inspection codes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  <strong>AWS D1.1:</strong> Structural welding code
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  <strong>ISO 9712:</strong> NDT personnel certification
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-bold text-primary mb-4 text-lg">🌐 International Standards</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  <strong>ISO Standards:</strong> Global NDT methods
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  <strong>EN Standards:</strong> European requirements
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  <strong>DNV/ABS Rules:</strong> Marine/offshore codes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  <strong>NACE Standards:</strong> Corrosion control
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-primary mb-2">📚 Glossary</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Understand NDT terminology used in standards.
              </p>
              <Link href="/glossary" className="text-sm font-medium text-primary hover:underline">
                Browse Glossary →
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-primary mb-2">🔧 NDT Methods</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Learn about different NDT inspection methods.
              </p>
              <Link href="/ndt-methods" className="text-sm font-medium text-primary hover:underline">
                View Methods →
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-primary mb-2">🎓 Training</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get certified in NDT inspection methods.
              </p>
              <Link href="/training" className="text-sm font-medium text-primary hover:underline">
                View Training →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'NDT Standards Database',
            description: 'Comprehensive database of NDT inspection standards and codes',
            url: 'https://ndt-connect.com/standards',
          }),
        }}
      />
    </div>
  );
}
