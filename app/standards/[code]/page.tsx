import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ndtStandards, getStandardBySlug, getAllStandardSlugs } from '@/lib/standards-data';
import {
  authorityProse,
  whenToUse,
  keyRequirements,
  whatChanged,
  realWorldExample,
  faqsForStandard,
} from '@/lib/content/standards-content';
import { getStandardFacts } from '@/lib/content/standards-facts';
import { FAQSchema } from '@/components/seo/SchemaMarkup';
import { CheckCircle, FileText, Globe, Zap, ArrowRight, History, HelpCircle, Briefcase, BookMarked } from 'lucide-react';
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

  // Title rewrite (SEO sprint 2026-05-15): scope/year hook so SERP snippet
  // reads as a quick-reference instead of just the code label.
  const title = `${standard.code} ${standard.title} — Scope, Requirements & Inspection Guide (2026)`;
  const description = `${standard.code} (${standard.organization}): ${standard.description.substring(0, 130).trim()}...`;

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

  // Per-standard unique content blocks. Each helper composes prose from
  // the standard's organization, code prefix (ASME / API / ASTM / ISO /
  // EN / AWS / NACE), method tags, and industry tags.
  const auth = authorityProse(standard);
  const useWhen = whenToUse(standard);
  const requirements = keyRequirements(standard);
  const changed = whatChanged(standard);
  const example = realWorldExample(standard);
  const faqs = faqsForStandard(standard);
  // Per-standard fact rows (latest edition, scope, key clauses,
  // acceptance, calibration/qualification, sample contract language).
  // Loaded from data/standards.json — only renders for slugs that have entries.
  const facts = getStandardFacts(standard.slug);

  // Find related standards from same organization
  const relatedStandards = ndtStandards.filter(
    s => s.organization === standard.organization && s.slug !== standard.slug
  );

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
          <div className="mb-4 flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <FileText className="h-3 w-3" />
              {standard.organization}
            </div>
            {standard.country && (
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <Globe className="h-3 w-3" />
                {standard.country}
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            {standard.code}: {standard.title}
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-4">
            {standard.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 space-y-6">
            {/* Authority + jurisdiction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Why {standard.code} Matters
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none space-y-3">
                <p className="text-base text-muted-foreground leading-relaxed">{auth.authority}</p>
                <p className="text-base text-muted-foreground leading-relaxed">{auth.jurisdiction}</p>
              </CardContent>
            </Card>

            {/* When to use */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  When {standard.code} Applies
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-base text-muted-foreground leading-relaxed">{useWhen}</p>

                <h3 className="text-base font-semibold text-primary mt-4 mb-2">Methods covered</h3>
                <div className="flex flex-wrap gap-2">
                  {standard.methods.map((m) => (
                    <span key={m} className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-700">{m}</span>
                  ))}
                </div>

                <h3 className="text-base font-semibold text-primary mt-4 mb-2">Industries</h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {standard.industries.map((industry) => (
                    <li key={industry} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{industry}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Key requirements — numbered list */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Key Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-outside ml-5 space-y-3 text-sm text-muted-foreground">
                  {requirements.map((r, i) => (
                    <li key={i} className="leading-relaxed">{r}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Standard Facts — only renders when this standard has fact-row data */}
            {facts && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookMarked className="h-5 w-5 text-primary" />
                    {standard.code} — Quick Reference
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-4 text-sm">
                    {facts.latestEdition && (
                      <>
                        <dt className="font-semibold text-primary sm:col-span-1">Latest Edition</dt>
                        <dd className="text-muted-foreground sm:col-span-2 leading-relaxed">{facts.latestEdition}</dd>
                      </>
                    )}
                    {facts.originYear && (
                      <>
                        <dt className="font-semibold text-primary sm:col-span-1">First Published</dt>
                        <dd className="text-muted-foreground sm:col-span-2 leading-relaxed">{facts.originYear}</dd>
                      </>
                    )}
                    {facts.scope && (
                      <>
                        <dt className="font-semibold text-primary sm:col-span-1">Scope</dt>
                        <dd className="text-muted-foreground sm:col-span-2 leading-relaxed">{facts.scope}</dd>
                      </>
                    )}
                    {facts.acceptanceCriteria && (
                      <>
                        <dt className="font-semibold text-primary sm:col-span-1">Acceptance Criteria</dt>
                        <dd className="text-muted-foreground sm:col-span-2 leading-relaxed">{facts.acceptanceCriteria}</dd>
                      </>
                    )}
                    {facts.calibrationOrQualification && (
                      <>
                        <dt className="font-semibold text-primary sm:col-span-1">Calibration / Qualification</dt>
                        <dd className="text-muted-foreground sm:col-span-2 leading-relaxed">{facts.calibrationOrQualification}</dd>
                      </>
                    )}
                  </dl>
                  {facts.keyClauses && facts.keyClauses.length > 0 && (
                    <div>
                      <p className="font-semibold text-primary text-sm mb-2">Key Clauses Inspectors Cite</p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-outside ml-5">
                        {facts.keyClauses.map((c, i) => (
                          <li key={i} className="leading-relaxed">{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {facts.relatedStandards && facts.relatedStandards.length > 0 && (
                    <div>
                      <p className="font-semibold text-primary text-sm mb-2">Companion / Parent Standards</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{facts.relatedStandards.join(' · ')}</p>
                    </div>
                  )}
                  {facts.typicalContractLanguage && (
                    <div className="border-l-4 border-primary/40 pl-4 py-2 bg-slate-50 rounded">
                      <p className="font-semibold text-primary text-xs uppercase tracking-wide mb-1">Sample Contract Language</p>
                      <p className="text-sm text-muted-foreground italic leading-relaxed">&ldquo;{facts.typicalContractLanguage}&rdquo;</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* What's changed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Edition History &amp; What Tends to Change
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-base text-muted-foreground leading-relaxed">{changed}</p>
              </CardContent>
            </Card>

            {/* Real-world application */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Real-World Application
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-base text-muted-foreground leading-relaxed">{example}</p>
              </CardContent>
            </Card>

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

            {relatedStandards.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related {standard.organization} Standards</CardTitle>
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
                            {relStandard.title.substring(0, 30)}{relStandard.title.length > 30 ? '...' : ''}
                          </p>
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
                  <p className="text-sm font-medium text-primary mb-3">
                    Need {standard.code}-Compliant Inspections?
                  </p>
                  <Link
                    href="/request-service"
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <p className="text-xs text-muted-foreground mt-3">
                    Inspections run to {standard.code} requirements
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Need clarification on NDT terminology used in {standard.code}?
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

        <div className="mt-10 mb-4">
          <AuthorByline />
        </div>

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
        <FAQSchema questions={faqs.map(f => ({ question: f.q, answer: f.a }))} />
      </div>
    </div>
  );
}
