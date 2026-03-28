import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { glossaryTerms, getGlossaryTermBySlug, getAllGlossarySlugs } from '@/lib/glossary-data';
import { methods } from '@/lib/seo-data';
import { ArrowRight, BookOpen, Zap } from 'lucide-react';

interface Props {
  params: {
    term: string;
  };
}

export async function generateStaticParams() {
  return getAllGlossarySlugs().map((slug) => ({
    term: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const glossaryTerm = getGlossaryTermBySlug(params.term);

  if (!glossaryTerm) {
    return {};
  }

  const title = `${glossaryTerm.term} | NDT Glossary | NDT Connect`;
  const description = glossaryTerm.definition.substring(0, 160);

  return {
    title,
    description,
    keywords: [glossaryTerm.term, 'NDT', 'glossary', 'non-destructive testing', glossaryTerm.category],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/glossary/${params.term}`,
      type: 'article',
    },
    alternates: {
      canonical: `https://ndt-connect.com/glossary/${params.term}`,
    },
  };
}

export default function GlossaryTermPage({ params }: Props) {
  const glossaryTerm = getGlossaryTermBySlug(params.term);

  if (!glossaryTerm) {
    notFound();
  }

  // Find related methods
  const relatedMethods = methods.filter(m =>
    glossaryTerm.definition.toLowerCase().includes(m.abbreviation.toLowerCase()) ||
    glossaryTerm.definition.toLowerCase().includes(m.slug)
  );

  // Generate expanded content
  const categoryDescriptions: Record<string, string> = {
    methods: 'NDT inspection technique or method',
    equipment: 'Equipment and instruments used in NDT',
    defects: 'Material discontinuities and flaws detected by NDT',
    standards: 'Industry standards and regulations',
    materials: 'Material properties and characteristics',
    physics: 'Physical principles governing NDT',
    certifications: 'Professional certifications and training',
    safety: 'Safety protocols and procedures',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 lg:py-16">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/glossary" className="hover:text-primary">Glossary</Link>
          <span>/</span>
          <span>{glossaryTerm.term}</span>
        </div>

        {/* Header Section */}
        <div className="mb-8 rounded-lg bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Zap className="h-3 w-3" />
            {glossaryTerm.category.charAt(0).toUpperCase() + glossaryTerm.category.slice(1)}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{glossaryTerm.term}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{glossaryTerm.definition}</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Extended Definition and Application */}
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Detailed Explanation
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="mb-4 text-base leading-relaxed">
                  {glossaryTerm.definition}
                </p>

                {/* Additional context based on category */}
                {glossaryTerm.category === 'methods' && (
                  <>
                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Why It Matters</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {glossaryTerm.term} is a critical NDT technique used across multiple industries. Understanding its principles, applications, and limitations is essential for proper inspection planning and execution.
                    </p>

                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Industry Applications</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This method is widely used in oil and gas, aerospace, power generation, manufacturing, and construction industries for detecting discontinuities, assessing material properties, and ensuring component safety.
                    </p>
                  </>
                )}

                {glossaryTerm.category === 'defects' && (
                  <>
                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Detection and Assessment</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {glossaryTerm.term} must be detected early and accurately characterized to determine safety implications. Multiple NDT methods may be required for comprehensive evaluation.
                    </p>

                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Acceptance Criteria</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Industry standards such as ASME Section V, AWS D1.1, and API standards provide specific acceptance limits. Whether a detected {glossaryTerm.term.toLowerCase()} is acceptable depends on material, component function, and applicable code.
                    </p>
                  </>
                )}

                {glossaryTerm.category === 'physics' && (
                  <>
                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Physical Foundation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Understanding {glossaryTerm.term.toLowerCase()} is fundamental to effectively applying NDT methods. Many NDT techniques rely directly on these physical principles.
                    </p>

                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Practical Impact on Inspections</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This principle affects equipment selection, test parameters, inspection procedures, and data interpretation. Proper application requires understanding these physics fundamentals.
                    </p>
                  </>
                )}

                {glossaryTerm.category === 'equipment' && (
                  <>
                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Equipment Selection and Use</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Proper selection and maintenance of {glossaryTerm.term.toLowerCase()} is critical for successful NDT inspections. Equipment must be calibrated and verified per applicable standards.
                    </p>

                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Maintenance and Verification</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Regular maintenance and calibration verification ensure reliable equipment performance. Equipment that falls out of calibration can produce unreliable results.
                    </p>
                  </>
                )}

                {glossaryTerm.category === 'standards' && (
                  <>
                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Standard Compliance</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This standard establishes requirements for NDT practices in specific industries or applications. Following applicable standards ensures consistent, reliable, and safe inspection practices.
                    </p>

                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Regulatory Importance</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Many jurisdictions legally require compliance with these standards. Failure to follow applicable standards can result in unsafe operations and legal liability.
                    </p>
                  </>
                )}

                {glossaryTerm.category === 'certifications' && (
                  <>
                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Professional Development</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Obtaining and maintaining certifications demonstrates professional competence and commitment to NDT excellence. Certifications are often required by employers and regulatory agencies.
                    </p>

                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Career Advancement</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Recognized certifications enhance career opportunities and earning potential. Many companies prioritize employees with relevant certifications and continuous education.
                    </p>
                  </>
                )}

                {glossaryTerm.category === 'safety' && (
                  <>
                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Safety Importance</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Proper {glossaryTerm.term.toLowerCase()} procedures protect NDT personnel and the public. Safety must always be the primary concern in NDT operations.
                    </p>

                    <h3 className="mt-6 mb-3 text-lg font-semibold text-primary">Training Requirements</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      All personnel working with {glossaryTerm.term.toLowerCase()} must receive proper training and follow established safety procedures. Regular safety refresher training is recommended.
                    </p>
                  </>
                )}

                <h3 className="mt-8 mb-3 text-lg font-semibold text-primary">Best Practices</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Always follow applicable NDT standards and procedures</li>
                  <li>Use properly calibrated and maintained equipment</li>
                  <li>Ensure personnel are properly trained and certified</li>
                  <li>Document inspection procedures and results completely</li>
                  <li>Keep current with industry standards and best practices</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Terms */}
            {glossaryTerm.relatedTerms.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {glossaryTerm.relatedTerms.map((relatedSlug) => {
                      const relatedTerm = glossaryTerms.find(t => t.slug === relatedSlug);
                      return relatedTerm ? (
                        <Link
                          key={relatedSlug}
                          href={`/glossary/${relatedSlug}`}
                          className="flex items-center justify-between p-2 rounded hover:bg-slate-100 transition-colors group"
                        >
                          <span className="text-sm font-medium text-primary group-hover:underline">
                            {relatedTerm.term}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        </Link>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related NDT Methods */}
            {relatedMethods.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related NDT Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {relatedMethods.slice(0, 3).map((method) => (
                      <Link
                        key={method.slug}
                        href={`/ndt-methods/${method.slug}`}
                        className="flex items-center justify-between p-2 rounded hover:bg-slate-100 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-primary group-hover:underline">
                            {method.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{method.abbreviation}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Category Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Type</p>
                    <p className="text-sm font-medium mt-1">
                      {glossaryTerm.category.charAt(0).toUpperCase() + glossaryTerm.category.slice(1)}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {categoryDescriptions[glossaryTerm.category]}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-primary mb-3">Need Professional NDT Services?</p>
                  <Link
                    href="/request-inspection"
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
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
              '@type': 'DefinedTerm',
              name: glossaryTerm.term,
              description: glossaryTerm.definition,
              inDefinedTermSet: {
                '@type': 'DefinedTermSet',
                name: 'NDT Glossary',
                url: 'https://ndt-connect.com/glossary',
              },
            }),
          }}
        />
      </div>
    </div>
  );
}
