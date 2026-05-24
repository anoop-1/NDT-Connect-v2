import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { glossaryTerms, getGlossaryTermBySlug, getAllGlossarySlugs } from '@/lib/glossary-data';
import { methods } from '@/lib/seo-data';
import {
  inferStandardsForTerm,
  howItWorks,
  whenToApply,
  commonMistakes,
  faqsForTerm,
} from '@/lib/content/glossary-content';
import { getGlossaryFacts } from '@/lib/content/glossary-facts';
import { FAQSchema } from '@/components/seo/SchemaMarkup';
import { ArrowRight, BookOpen, Zap, AlertTriangle, FileText, HelpCircle, Calculator } from 'lucide-react';

interface Props {
  params: {
    term: string;
  };
}

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

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

  // Title rewrite (SEO sprint 2026-05-15): added "What is" hook + "Definition,
  // Examples & Use" trailer so glossary terms read as informational entries
  // and surface in "what is X" / "X meaning" queries.
  const title = `What is ${glossaryTerm.term}? Definition, Examples & Use in NDT`;
  const description = `${glossaryTerm.term}: ${glossaryTerm.definition.substring(0, 130).trim()}...`;

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

  // Per-term unique content blocks. Each helper composes prose from the
  // term's own definition keywords + category, so 96 sibling pages do
  // NOT share the boilerplate paragraphs the old template produced.
  const standards = inferStandardsForTerm(glossaryTerm);
  const howWorks = howItWorks(glossaryTerm);
  const useCases = whenToApply(glossaryTerm);
  const mistakes = commonMistakes(glossaryTerm);
  const faqs = faqsForTerm(glossaryTerm);
  // Per-term fact rows (etymology, formula, units, range, equipment,
  // code refs, worked example, misconception). Loaded from
  // data/glossary.json — only renders for slugs that have entries.
  const facts = getGlossaryFacts(glossaryTerm.slug);

  // Find related methods that match the term content
  const relatedMethods = methods.filter(m =>
    glossaryTerm.definition.toLowerCase().includes(m.abbreviation.toLowerCase()) ||
    glossaryTerm.definition.toLowerCase().includes(m.slug)
  );

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
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {glossaryTerm.term} — Definition &amp; NDT Use
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{glossaryTerm.definition}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Main column */}
          <div className="md:col-span-2 space-y-6">
            {/* How it works */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  How {glossaryTerm.term} Works in Practice
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed text-muted-foreground">{howWorks}</p>
              </CardContent>
            </Card>

            {/* When to apply */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  When to Apply It
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed text-muted-foreground">{useCases}</p>
              </CardContent>
            </Card>

            {/* Quick Reference Facts — only renders when term has fact-row data */}
            {facts && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Quick Reference: {glossaryTerm.term}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-4 text-sm">
                    {facts.etymology && (
                      <>
                        <dt className="font-semibold text-primary sm:col-span-1">Etymology / Origin</dt>
                        <dd className="text-muted-foreground sm:col-span-2 leading-relaxed">{facts.etymology}</dd>
                      </>
                    )}
                    {facts.formula && (
                      <>
                        <dt className="font-semibold text-primary sm:col-span-1">Formula</dt>
                        <dd className="text-muted-foreground sm:col-span-2 leading-relaxed font-mono text-xs sm:text-sm">{facts.formula}</dd>
                      </>
                    )}
                    {facts.units && (
                      <>
                        <dt className="font-semibold text-primary sm:col-span-1">Units</dt>
                        <dd className="text-muted-foreground sm:col-span-2 leading-relaxed">{facts.units}</dd>
                      </>
                    )}
                    {facts.typicalRange && (
                      <>
                        <dt className="font-semibold text-primary sm:col-span-1">Typical Range</dt>
                        <dd className="text-muted-foreground sm:col-span-2 leading-relaxed">{facts.typicalRange}</dd>
                      </>
                    )}
                    {facts.measuredBy && (
                      <>
                        <dt className="font-semibold text-primary sm:col-span-1">Measured / Produced By</dt>
                        <dd className="text-muted-foreground sm:col-span-2 leading-relaxed">{facts.measuredBy}</dd>
                      </>
                    )}
                    {facts.codeReferences && facts.codeReferences.length > 0 && (
                      <>
                        <dt className="font-semibold text-primary sm:col-span-1">Code References</dt>
                        <dd className="text-muted-foreground sm:col-span-2 leading-relaxed">
                          {facts.codeReferences.join('; ')}
                        </dd>
                      </>
                    )}
                    {facts.workedExample && (
                      <>
                        <dt className="font-semibold text-primary sm:col-span-1">Worked Example</dt>
                        <dd className="text-muted-foreground sm:col-span-2 leading-relaxed">{facts.workedExample}</dd>
                      </>
                    )}
                  </dl>
                </CardContent>
              </Card>
            )}

            {/* Related standards */}
            {standards.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Related Standards &amp; Code References
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {standards.map((s) => (
                      <li key={s.code} className="border-l-2 border-primary/30 pl-4">
                        <p className="text-sm font-semibold text-primary">{s.code}</p>
                        <p className="text-sm text-muted-foreground">{s.note}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Common mistakes / misconceptions */}
            {mistakes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    Common Mistakes &amp; Misconceptions
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p className="text-base leading-relaxed text-muted-foreground">{mistakes}</p>
                </CardContent>
              </Card>
            )}

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Frequently Asked
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((f, i) => (
                  <div key={i}>
                    <p className="text-base font-semibold text-foreground mb-1">{f.q}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {glossaryTerm.relatedTerms.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Glossary Terms</CardTitle>
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
                        href={`/services/${method.slug}`}
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

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-primary mb-3">Need Professional NDT Services?</p>
                  <Link
                    href="/request-service"
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
        <FAQSchema questions={faqs.map(f => ({ question: f.q, answer: f.a }))} />
      </div>
    </div>
  );
}
