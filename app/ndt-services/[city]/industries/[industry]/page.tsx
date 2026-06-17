import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  allCityIndustryCombos,
  generateCityIndustryContent,
} from '@/lib/content/city-industry-content';
import { INDUSTRY_PAGE_DATA } from '@/lib/seo/industry-page-data';
import { shouldIndexCityIndustry, robotsFor } from '@/lib/seo/indexability';
import { CityDataAnchors } from '@/components/seo/CityDataAnchors';
import { CornerstoneLinks } from '@/components/seo/CornerstoneLinks';
import JoinCTA from '@/components/seo/JoinCTA';
import { BreadcrumbListSchema } from '@/components/seo/SchemaMarkup';
import {
  CheckCircle,
  Shield,
  Building2,
  Zap,
  ArrowRight,
  MapPin,
  ClipboardList,
  BadgeCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ============================================================================
// /ndt-services/[city]/industries/[industry]
//
// City × Industry pages. Static-generated from PUBLISHABLE_CITIES and the
// cityIndustrySlugs() function that maps each city's weighted industry list
// to canonical slugs. Generates ~300-400 pages depending on how many
// city×industry combos pass the 0.15 weight threshold.
//
// Sits at /industries/ to avoid routing conflict with the sibling [slug]
// dynamic segment that handles city × method pages.
//
// Content is genuinely differentiated per city×industry: named facilities,
// regulatory codes, wage bands, turnaround seasons, and local employer data
// are injected from data/cities.json into every content block.
// ============================================================================

interface PageProps {
  params: Promise<{ city: string; industry: string }>;
}

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  // Returns { city, industry } — Next.js maps these to [city] and [industry]
  return allCityIndustryCombos();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, industry: industrySlug } = await params;
  const content = generateCityIndustryContent(citySlug, industrySlug);
  if (!content) return {};
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: content.canonicalUrl },
    robots: robotsFor(shouldIndexCityIndustry(citySlug, industrySlug)),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: content.canonicalUrl,
    },
  };
}

export default async function CityIndustryPage({ params }: PageProps) {
  const { city: citySlug, industry: industrySlug } = await params;
  const content = generateCityIndustryContent(citySlug, industrySlug);
  if (!content) notFound();

  const { cityName, stateName, industryLabel, industrySubtitle, h1 } = content;
  const location = stateName ? `${cityName}, ${stateName}` : cityName;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${industrySubtitle} NDT Inspection Services in ${location}`,
    description: content.metaDescription,
    areaServed: { '@type': 'City', name: cityName },
    provider: {
      '@type': 'Organization',
      name: 'NDT Connect',
      url: 'https://ndt-connect.com',
    },
    serviceType: `${industrySubtitle} Non-Destructive Testing`,
  };

  return (
    <>
      <BreadcrumbListSchema items={content.breadcrumbs.map((b) => ({ name: b.label, url: `https://ndt-connect.com${b.href}` }))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            {content.breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {i < content.breadcrumbs.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-blue-300 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-300">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-blue-600/30 text-blue-200 border-blue-500/40">{industryLabel}</Badge>
            <Badge className="bg-slate-600/30 text-slate-200 border-slate-500/40">
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{h1}</h1>

          <p className="text-lg text-slate-300 mb-8 max-w-3xl leading-relaxed">
            {content.leadParagraph}
          </p>

          {/* Day-rate banner */}
          <div className="inline-flex items-center gap-3 bg-blue-800/40 border border-blue-500/30 rounded-xl px-5 py-3 mb-8">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="text-sm text-slate-200">
              Typical day rate in {cityName}:{' '}
              <strong className="text-white">
                ${content.dayRateRange.low.toLocaleString()}–${content.dayRateRange.high.toLocaleString()} / day
              </strong>{' '}
              (Level II crew of 2)
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white">
              <Link href="/post-job">Post Your Inspection Job Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-500 text-slate-200 hover:bg-slate-700">
              <Link href={`/ndt-services/${citySlug}`}>All NDT Services in {cityName}</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

        {/* Local Market */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {industrySubtitle} NDT Market in {cityName}
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">{content.localMarket}</p>
        </section>

        {/* NDT Methods */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            NDT Methods for {industrySubtitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {content.methods.map((method) => (
              <div
                key={method.code}
                className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-md">
                    {method.code}
                  </span>
                  <span className="font-semibold text-slate-900">{method.name}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{method.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Regulatory Codes */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Applicable Codes &amp; Regulatory Requirements
          </h2>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
            <ul className="space-y-2">
              {content.regulatoryCodes.map((code) => (
                <li key={code} className="flex items-start gap-3">
                  <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{code}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Certifications Typically Required in {cityName}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.certifications.map((cert) => (
              <div key={cert} className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                <BadgeCheck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-800">{cert}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Typical Scope */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Typical {industryLabel} Inspection Scope
          </h2>
          <div className="flex items-start gap-4 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <ClipboardList className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <p className="text-slate-700 leading-relaxed">{content.typicalScope}</p>
          </div>
        </section>

        {/* Asset Classes */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Equipment &amp; Asset Classes Inspected
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {INDUSTRY_PAGE_DATA[content.industrySlug]?.assetClasses.map((asset) => (
              <div key={asset} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 rounded-lg px-4 py-2.5 border border-slate-200">
                <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                {asset}
              </div>
            ))}
          </div>
        </section>

        {/* Defect Concerns */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Key Defect Concerns in {industrySubtitle}
          </h2>
          <ul className="space-y-3">
            {INDUSTRY_PAGE_DATA[content.industrySlug]?.defectConcerns.map((defect) => (
              <li key={defect} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                <span className="text-slate-700 text-sm">{defect}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
          <Building2 className="h-10 w-10 mx-auto mb-4 text-blue-200" />
          <h2 className="text-2xl font-bold mb-3">
            Find Certified NDT Inspectors in {cityName}
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Post your {industryLabel.toLowerCase()} NDT job and receive competing quotes from verified contractors
            in {location} within hours. Free to post — no signup required to browse rates.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              <Link href="/post-job">Post Your Job Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-blue-300 text-blue-100 hover:bg-blue-700">
              <Link href="/find-providers">Browse {cityName} Inspectors</Link>
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Frequently Asked Questions — {industrySubtitle} NDT in {cityName}
          </h2>
          <div className="space-y-6">
            {content.faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-3 text-base leading-snug">
                  {faq.q}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: content.faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.q,
                  acceptedAnswer: { '@type': 'Answer', text: faq.a },
                })),
              }),
            }}
          />
        </section>

        {/* Navigation to sibling method pages */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            NDT Inspection Methods in {cityName}
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { slug: 'ultrasonic-testing', abbr: 'UT' },
              { slug: 'radiographic-testing', abbr: 'RT' },
              { slug: 'magnetic-particle-testing', abbr: 'MT' },
              { slug: 'penetrant-testing', abbr: 'PT' },
              { slug: 'phased-array-ut', abbr: 'PAUT' },
              { slug: 'visual-testing', abbr: 'VT' },
            ].map((m) => (
              <Link
                key={m.slug}
                href={`/ndt-services/${citySlug}/${m.slug}`}
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
              >
                {m.abbr} in {cityName}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </section>

        <CityDataAnchors citySlug={citySlug} />
        <CornerstoneLinks topicHints={[industryLabel.toLowerCase()]} />
        <JoinCTA context={`${industryLabel} NDT inspection in ${cityName} — hire vetted providers, or list your services free.`} />

      </div>
    </>
  );
}
