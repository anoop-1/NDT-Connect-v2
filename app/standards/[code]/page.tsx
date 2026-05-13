import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ndtStandards, getStandardBySlug, getAllStandardSlugs } from '@/lib/standards-data';
import { CheckCircle, FileText, Globe, Zap, ArrowRight } from 'lucide-react';
import AuthorByline from '@/components/AuthorByline';

interface Props {
  params: {
    code: string;
  };
}

export async function generateStaticParams() {
  return getAllStandardSlugs().map((slug) => ({
    code: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const standard = getStandardBySlug(params.code);

  if (!standard) {
    return {};
  }

  const title = `${standard.code}: ${standard.title} | NDT Standards | NDT Connect`;
  const description = standard.description.substring(0, 160);

  return {
    title,
    description,
    keywords: [standard.code, standard.title, 'NDT standard', 'inspection standard', standard.organization],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/standards/${params.code}`,
      type: 'article',
    },
    alternates: {
      canonical: `https://ndt-connect.com/standards/${params.code}`,
    },
  };
}

export default function StandardPage({ params }: Props) {
  const standard = getStandardBySlug(params.code);

  if (!standard) {
    notFound();
  }

  // Find related standards from same organization
  const relatedStandards = ndtStandards.filter(
    s => s.organization === standard.organization && s.slug !== standard.slug
  );

  // Standards by method
  const methodsDetail: Record<string, string> = {
    'Ultrasonic Testing': 'UT - Sound wave propagation through materials to detect flaws',
    'Radiographic Testing': 'RT - Penetrating radiation to visualize internal structure',
    'Magnetic Particle Testing': 'MT - Magnetic field and iron particles for ferromagnetic materials',
    'Liquid Penetrant Testing': 'PT - Colored/fluorescent liquid to detect surface-breaking defects',
    'Eddy Current Testing': 'ET - Electromagnetic induction in conductive materials',
    'Visual Testing': 'VT - Direct observation of surface conditions',
    'Phased Array Ultrasonic Testing': 'PAUT - Advanced UT with multi-element electronic steering',
    'Time-of-Flight Diffraction': 'TOFD - Ultrasonic diffraction for precise defect sizing',
    'Guided Wave Testing': 'GWT - Low-frequency waves for long-distance screening',
    'All NDT Methods': 'Comprehensive standard covering multiple inspection techniques',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 lg:py-16">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/standards" className="hover:text-primary">Standards</Link>
          <span>/</span>
          <span>{standard.code}</span>
        </div>

        {/* Header Section */}
        <div className="mb-8 rounded-lg bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <FileText className="h-3 w-3" />
              Standard Document
            </div>
            {standard.country && (
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <Globe className="h-3 w-3" />
                {standard.country}
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">{standard.code}</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-6">{standard.title}</h2>
          <p className="text-base text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-4">
            {standard.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Extended Content */}
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Overview & Scope
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">Standard Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Organization</p>
                      <p className="text-base font-medium">{standard.organization}</p>
                    </div>
                    {standard.country && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Country/Region</p>
                        <p className="text-base font-medium">{standard.country}</p>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-primary mb-3">Applicable Methods</h3>
                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                  {standard.methods.map((method) => (
                    <div key={method} className="mb-3 last:mb-0">
                      <p className="font-medium text-primary">{method}</p>
                      <p className="text-sm text-muted-foreground">
                        {methodsDetail[method] || 'Inspection technique covered by this standard'}
                      </p>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-primary mb-3">Industry Applications</h3>
                <p className="text-base text-muted-foreground mb-4">
                  This standard is applicable to the following industries:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                  {standard.industries.map((industry) => (
                    <li key={industry} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-base">{industry}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-primary mb-3">Key Requirements</h3>
                <p className="text-base text-muted-foreground mb-4">
                  Standards like {standard.code} establish requirements for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground mb-6">
                  <li>Equipment specifications and calibration procedures</li>
                  <li>Personnel qualification and certification requirements</li>
                  <li>Inspection procedures and technique parameters</li>
                  <li>Acceptance criteria for defects and discontinuities</li>
                  <li>Documentation and record-keeping requirements</li>
                  <li>Safety procedures and radiation protection</li>
                </ul>

                <h3 className="text-lg font-semibold text-primary mb-3">Compliance Benefits</h3>
                <p className="text-base text-muted-foreground mb-4">
                  Following {standard.code} ensures:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground mb-6">
                  <li><strong>Consistency:</strong> Standardized procedures ensure repeatable results</li>
                  <li><strong>Quality:</strong> Proven methods detect defects effectively</li>
                  <li><strong>Safety:</strong> Risk reduction through established procedures</li>
                  <li><strong>Compliance:</strong> Legal and regulatory requirements</li>
                  <li><strong>Credibility:</strong> Industry recognition and customer confidence</li>
                  <li><strong>Risk Management:</strong> Reduced liability and operational risk</li>
                </ul>

                <h3 className="text-lg font-semibold text-primary mb-3">Implementation Considerations</h3>
                <p className="text-base text-muted-foreground mb-4">
                  Organizations implementing {standard.code} should consider:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground">
                  <li>Training staff on standard requirements and procedures</li>
                  <li>Acquiring necessary equipment and ensuring proper calibration</li>
                  <li>Establishing written inspection procedures</li>
                  <li>Creating documentation systems for compliance verification</li>
                  <li>Regular audits to ensure ongoing compliance</li>
                  <li>Staying current with standard updates and revisions</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Standard Code</p>
                  <p className="text-base font-mono font-bold text-primary">{standard.code}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Organization</p>
                  <p className="text-sm font-medium">{standard.organization}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Methods Covered</p>
                  <p className="text-sm font-medium">{standard.methods.length} method(s)</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Industries</p>
                  <p className="text-sm font-medium">{standard.industries.length} sector(s)</p>
                </div>
              </CardContent>
            </Card>

            {/* Related Standards */}
            {relatedStandards.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {relatedStandards.slice(0, 4).map((relStandard) => (
                      <Link
                        key={relStandard.slug}
                        href={`/standards/${relStandard.slug}`}
                        className="flex items-center justify-between p-2 rounded hover:bg-slate-100 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-primary group-hover:underline">
                            {relStandard.code}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {relStandard.title.substring(0, 30)}...
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-primary mb-3">
                    Need Compliant Inspections?
                  </p>
                  <Link
                    href="/request-inspection"
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <p className="text-xs text-muted-foreground mt-3">
                    All inspections follow {standard.code} requirements
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Standards Glossary */}
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Need clarification on NDT terminology used in standards?
                </p>
                <Link
                  href="/glossary"
                  className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-2"
                >
                  Browse NDT Glossary
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Author byline — E-E-A-T signal (Person schema embedded) */}
        <div className="mt-10 mb-4">
          <AuthorByline />
        </div>

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TechArticle',
              headline: `${standard.code}: ${standard.title}`,
              description: standard.description,
              publisher: {
                '@type': 'Organization',
                name: standard.organization,
              },
              url: `https://ndt-connect.com/standards/${params.code}`,
            }),
          }}
        />
      </div>
    </div>
  );
}
