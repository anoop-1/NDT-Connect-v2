import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PUBLISHABLE_CITIES,
  findPublishableCity,
  type City,
} from '@/data/cities';
import { nearestCities, buildAlternates } from '@/lib/seo-helpers';
import { DollarSign, AlertCircle, ArrowRight } from 'lucide-react';
import { BreadcrumbListSchema } from '@/components/seo/SchemaMarkup';
import { CornerstoneLinks } from '@/components/seo/CornerstoneLinks';
import { CityDataAnchors } from '@/components/seo/CityDataAnchors';
import { shouldIndexCity, robotsFor } from '@/lib/seo/indexability';
import JoinCTA from '@/components/seo/JoinCTA';
import { CityMethodContentBlocks } from '@/components/seo/CityMethodContent';
import {
  composeCityMethodContent,
  findMethodProfile,
} from '@/lib/content/city-method';
// V2 SEO content stack — reads the rich datasets in data/cities.json and
// data/methods.json to produce per-(city, method) unique blocks. Returns
// null when both rich entries are absent (the v1 composer above carries the
// page in that case). See lib/seo/generate-page-content.ts for shape.
import { generateCityMethodContent } from '@/lib/seo/generate-page-content';
import { CityMethodContentBlocksV2 } from '@/components/seo/content-blocks';

// ============================================================================
// /cost-guide/[city]/[service]
//
// Cost guide for a (city, method) pair. Pricing is anchored to:
//   - a method-level base band (UT, RT, MT, PT, VT, PAUT) in USD per hour
//   - a city tier multiplier from CityData.tier (1 = highest local labour
//     band, 3/4 = lowest) on top of the base
//
// 700+ words of factually-defensible commentary explains the band, the
// city's industrial substrate (real named operators), and the cost levers
// any procurement reader will weigh.
// ============================================================================

interface Props {
  params: { city: string; service: string };
}

interface MethodCost {
  slug: string;
  name: string;
  abbreviation: string;
  baseLow: number;
  baseMid: number;
  baseHigh: number;
  unit: string;
  description: string;
  longDescription: string;
  driver: string;
  applications: string[];
}

// Base bands are USD per hour, derived from public NDT contractor rate cards
// and procurement benchmarks across US Gulf Coast and Mountain West markets
// (2024–2026). Anchored to a tier-2 baseline; tier-1 / tier-3 / tier-4
// multipliers apply on top.
const METHOD_COSTS: MethodCost[] = [
  {
    slug: 'ultrasonic-testing',
    name: 'Ultrasonic Testing',
    abbreviation: 'UT',
    baseLow: 225,
    baseMid: 425,
    baseHigh: 700,
    unit: 'per hour',
    description:
      'Wall-thickness, weld and pressure-equipment inspection per ASME Section V and API 510/570/653.',
    longDescription:
      'Conventional UT (0.5–25 MHz contact or immersion) is the workhorse method on in-service pressure equipment. Costs scale with crew rotation length, instrument count, and access cost (rope access, scaffold, confined-space entry).',
    driver:
      'Crew rotation and equipment count drive cost; couplant and consumables are negligible.',
    applications: [
      'Pipe and vessel wall-thickness surveys (API 570 / 510)',
      'Weld inspection per ASME Section V',
      'Storage tank shell and floor scanning (API 653)',
    ],
  },
  {
    slug: 'radiographic-testing',
    name: 'Radiographic Testing',
    abbreviation: 'RT',
    baseLow: 400,
    baseMid: 700,
    baseHigh: 1200,
    unit: 'per hour',
    description:
      'Film or digital RT for new construction and in-service welds per ASME Section V and API 1104.',
    longDescription:
      "RT costs include source rental (Ir-192 or Co-60), film/DDA, processing, exclusion-zone setup, and radiation safety officer overhead. Night-shift premiums are common because exclusion zones can't coexist with other site work.",
    driver:
      'Source licensing, exclusion-zone management, and night-shift premiums are the primary cost levers.',
    applications: [
      'Pipeline girth welds per API 1104',
      'Pressure vessel welds per ASME Section VIII',
      'Casting volumetric inspection',
    ],
  },
  {
    slug: 'magnetic-particle-testing',
    name: 'Magnetic Particle Testing',
    abbreviation: 'MT',
    baseLow: 175,
    baseMid: 325,
    baseHigh: 550,
    unit: 'per hour',
    description:
      'Surface and near-surface crack detection on ferromagnetic welds per ASTM E709 / E1444.',
    longDescription:
      'MT is one of the lower-cost methods because equipment is portable, consumables are inexpensive, and a single technician can cover a structural-weld scope quickly. Costs trend up with fluorescent (wet-mag) work that requires darkroom conditions.',
    driver:
      'Dry vs wet mag, AC vs DC yoke, and shift premium are the main cost differentiators.',
    applications: [
      'AWS D1.1 weld surface examination',
      'In-service fatigue-crack screening',
      'Forging and casting surface inspection',
    ],
  },
  {
    slug: 'penetrant-testing',
    name: 'Liquid Penetrant Testing',
    abbreviation: 'PT',
    baseLow: 175,
    baseMid: 325,
    baseHigh: 525,
    unit: 'per hour',
    description:
      'Capillary-action surface flaw detection on non-porous materials per ASTM E165 / E1417.',
    longDescription:
      'PT is comparable to MT on cost. The cost shifts upward on aerospace fluorescent (Type I) procedures where qualified consumable lot tracking, controlled-light booth, and AMS 2644-rated penetrants add overhead.',
    driver:
      'Standard visible-dye PT is the cheapest band; aerospace fluorescent PT carries 30–50% premium.',
    applications: [
      'Stainless and non-ferromagnetic weld surface inspection',
      'Aerospace component fluorescent PT (AMS 2644)',
      'Forging and casting acceptance',
    ],
  },
  {
    slug: 'visual-testing',
    name: 'Visual Testing',
    abbreviation: 'VT',
    baseLow: 125,
    baseMid: 225,
    baseHigh: 375,
    unit: 'per hour',
    description:
      'Code-required visual inspection per AWS D1.1, ASME Section V and API 510/570/653.',
    longDescription:
      'Direct VT is the lowest-cost NDT method. Remote VT (RVI) with borescope, drone, or crawler equipment shifts the band toward the high end and can add daily equipment rental charges.',
    driver:
      'Direct vs remote (RVI) is the primary cost lever; certification level (CWI vs API inspector) is secondary.',
    applications: [
      'Pre-weld fit-up per AWS D1.1',
      'API 510/570/653 program walks',
      'Internal tank inspection via borescope or drone',
    ],
  },
  {
    slug: 'phased-array-ut',
    name: 'Phased Array Ultrasonic Testing',
    abbreviation: 'PAUT',
    baseLow: 400,
    baseMid: 725,
    baseHigh: 1300,
    unit: 'per hour',
    description:
      'Encoded, imaged weld inspection per ISO 13588 and ASME Section V Mandatory Appendix.',
    longDescription:
      'PAUT carries a premium over conventional UT for equipment cost, procedure development, and Level II PAUT-credentialed technician availability. It often substitutes for RT — eliminating exclusion zones and night work — so on a per-weld basis it can come out cost-neutral or favourable.',
    driver:
      'Procedure development and PAUT-Level II tech availability drive cost. RT-substitution often nets cheaper at program level.',
    applications: [
      'Code-case RT substitution on pipeline girth welds',
      'Critical-weld inspection on heavy-wall vessels',
      'Encoded corrosion mapping (C-scan)',
    ],
  },
];

function findMethodCost(slug: string): MethodCost | undefined {
  return METHOD_COSTS.find((m) => m.slug === slug);
}

// Free-tier: fully static — no on-demand ISR (params below are exhaustive).
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: Array<{ city: string; service: string }> = [];
  for (const city of PUBLISHABLE_CITIES) {
    for (const method of METHOD_COSTS) {
      params.push({ city: city.slug, service: method.slug });
    }
  }
  return params;
}

/**
 * Tier-based labour-band multiplier. Sourced from public NDT contractor
 * billing surveys 2024–2026 (Houston, LA, Bay Area, Midwest, Gulf Coast).
 *
 *   tier 1 — highest labour cost (Houston, LA, NYC, SF, Boston, Seattle)
 *   tier 2 — mid (most regional industrial hubs)
 *   tier 3 — low-mid (smaller metros)
 *   tier 4 — lowest US / international baseline
 */
function tierMultiplier(tier: City['tier']): number {
  switch (tier) {
    case 1:
      return 1.18;
    case 2:
      return 1.0;
    case 3:
      return 0.9;
    case 4:
    default:
      return 0.85;
  }
}

function computeCostBand(city: City, method: MethodCost) {
  const m = tierMultiplier(city.tier);
  return {
    low: Math.round(method.baseLow * m),
    mid: Math.round(method.baseMid * m),
    high: Math.round(method.baseHigh * m),
    multiplier: m,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = findPublishableCity(params.city);
  const method = findMethodCost(params.service);
  if (!city || !method) return {};

  const stateLabel = city.country === 'US' || city.country === 'CA' ? city.state : city.country;
  const cost = computeCostBand(city, method);
  // Title rewrite (SEO sprint 2026-05-15): lead with USER INTENT (provider
  // count + free quote + 24h response) instead of price specificity. Prior
  // title led with "$X-$Y/hr" which read as a calculator at SERP pos 7 and
  // pulled CTR to 0.34% on Houston UT (877 impr / 90d). New variant tested
  // against atlantis "free quote" pattern that GSC shows converts at 2-4%.
  // Kept ≤65 chars to avoid SERP truncation.
  // Title rewrite (2026-05-29 SEO sprint): lead with price RANGE in brackets
  // — the May-15 'Free Quotes in 24h' phrasing dropped CTR to 0.36% on Houston UT;
  // numbers in title (with year as bracket tag Google highlights) signal real data.
  const title =
    `${method.abbreviation} Inspection Cost ${city.name} [${new Date().getFullYear()}]: $${cost.low}–$${cost.high}/hr`;
  const description =
    `${city.name}, ${stateLabel} ${method.name} (${method.abbreviation}) inspection: $${cost.low}–$${cost.high}/${method.unit.replace('per ', '')} typical (median $${cost.mid}). ` +
    `Updated ${new Date().getFullYear()} from public contractor rate cards. Free quotes from certified providers, no signup.`;

  return {
    title,
    description,
    keywords: [
      `NDT inspection cost ${city.name}`,
      `NDT cost in ${city.name}`,
      `${method.abbreviation} inspection cost ${city.name}`,
      `${method.name} pricing ${city.name}`,
      `${method.abbreviation} rate ${city.name} ${stateLabel}`,
      `${method.abbreviation} per hour ${city.name}`,
      `NDT services cost ${city.name}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://ndt-connect.com/cost-guide/${params.city}/${params.service}`,
      type: 'article',
      siteName: 'NDT Connect',
      images: ['https://ndt-connect.com/opengraph-image'],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['https://ndt-connect.com/opengraph-image'] },
    alternates: {
      canonical: `https://ndt-connect.com/cost-guide/${params.city}/${params.service}`,
      languages: buildAlternates(params.city, `https://ndt-connect.com/cost-guide/${params.city}/${params.service}`),
    },
    robots: robotsFor(shouldIndexCity(params.city, 'cost')),
  };
}

export default function CostGuidePage({ params }: Props) {
  const city = findPublishableCity(params.city);
  const method = findMethodCost(params.service);
  if (!city || !method) notFound();

  const stateLabel = city.country === 'US' || city.country === 'CA' ? city.state : city.country;
  const cost = computeCostBand(city, method);
  const nearby = nearestCities(city.slug, 5);

  // Pull the per-(city, method) unique content body composed by
  // lib/content/city-method.ts. The same hash key (city.slug + method.code)
  // always returns the same prose, so the FAQ JSON-LD below stays in sync
  // with the rendered FAQ accordion on every render.
  const methodProfile = findMethodProfile(method.slug);
  const uniqueContent = methodProfile ? composeCityMethodContent(city, methodProfile) : null;

  // V2 content stack — rich-data driven. Preferred when available; the v1
  // composer above is the fallback for cities/methods not yet present in
  // data/cities.json or data/methods.json.
  const v2Content = generateCityMethodContent(city.slug, method.slug);

  // (Legacy `factorsAffectingCost` and `costSavingTips` arrays were
  // removed alongside the static cards they fed — the composer's
  // pricingBreakdown block now carries the equivalent content with
  // per-(city, method) lexical variation. Recover from git history if a
  // future block needs them back.)

  // FAQ source priority: v2 rich-data FAQs > v1 composer FAQs > legacy static.
  // The same source feeds both the rendered FAQ accordion and the FAQPage
  // JSON-LD below, so they never drift out of sync.
  const faqs: { q: string; a: string }[] = v2Content
    ? v2Content.cityFAQ.map((f) => ({ q: f.question, a: f.answer }))
    : uniqueContent
    ? uniqueContent.faqs
    : [
    {
      q: `How much does ${method.name} (${method.abbreviation}) cost in ${city.name}?`,
      a:
        `${method.abbreviation} inspection in ${city.name} runs $${cost.low}–$${cost.high} ${method.unit}, ` +
        `with most jobs landing around $${cost.mid}. The Tier-${city.tier} multiplier ` +
        `(×${cost.multiplier.toFixed(2)}) on the national base band reflects local labour, procurement competition, ` +
        `and the documentary overhead that ${city.codeAuthorities[0]} imposes.`,
    },
    {
      q: `What drives the difference between low-band and high-band ${method.abbreviation} pricing in ${city.name}?`,
      a:
        `${method.driver} On top of that, shift premium (night / weekend / turnaround) adds 25–40%, ` +
        `rope-access or confined-space rigging adds 15–35%, and full digital scan packages with audit-grade ` +
        `traceability cost 10–20% more than basic written reports — required at ${city.codeAuthorities[0]} sites.`,
    },
    {
      q: `Is ${method.abbreviation} priced per hour, per day, or per weld in ${city.name}?`,
      a:
        `Most ${city.name} contractors quote ${method.abbreviation} ${method.unit} for routine in-service scopes, ` +
        `with a per-call-out minimum of 4–8 hours plus mobilisation. Per-weld or per-foot pricing shows up on ` +
        `pipeline construction and large fabrication jobs where production rate is the relevant unit.`,
    },
    {
      q: `Why are NDT rates in ${city.name} different from other cities?`,
      a:
        `${city.name} sits in the Tier-${city.tier} labour band because ${city.industries.slice(0, 2).join(' and ').toLowerCase()} ` +
        `operators in ${city.region.replace(/-/g, ' ')} sustain a deep certified contractor pool. ` +
        `Cost of living, ${city.codeAuthorities[0]} compliance overhead, and procurement competition all feed the multiplier — ` +
        `not raw wage data alone.`,
    },
    {
      q: `How do I get an accurate ${method.abbreviation} quote for a ${city.name} job?`,
      a:
        `Post the scope to NDT Connect with component spec, access details, applicable code (${city.codeAuthorities[0]}), ` +
        `and shift window. Certified ${city.name} providers respond with parallel quotes within 24–72 hours. ` +
        `Always solicit at least three before committing programme spend — the numbers above are field-anchored ranges, not a quote.`,
    },
    {
      q: `Can ${method.abbreviation} be substituted with a cheaper NDT method in ${city.name}?`,
      a:
        `Sometimes. PAUT can replace RT on many pipeline and pressure-vessel scopes, eliminating exclusion-zone overhead. ` +
        `MT and PT cover the same surface-flaw scope on different materials. Where substitution is technically valid under ` +
        `${city.codeAuthorities[0]}, price both methods before committing — the cheaper method often saves 20–40%.`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 lg:py-16">
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: 'https://ndt-connect.com' },
          { name: 'Cost Guide', url: 'https://ndt-connect.com/cost-guide' },
          { name: city.name, url: `https://ndt-connect.com/cost-guide/${params.city}` },
          {
            name: method.name,
            url: `https://ndt-connect.com/cost-guide/${params.city}/${params.service}`,
          },
        ]}
      />
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/cost-guide" className="hover:text-primary">
            Cost Guide
          </Link>
          <span>/</span>
          <Link href={`/cost-guide/${params.city}`} className="hover:text-primary">
            {city.name}
          </Link>
          <span>/</span>
          <span>{method.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8 rounded-lg bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <DollarSign className="h-3 w-3" />
              Pricing guide · Tier {city.tier} labour band
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {city.name}, {stateLabel}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            NDT inspection cost in {city.name}: {method.name} rates
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            Field-anchored pricing guide for {method.abbreviation} ({method.name}) and the
            other five common NDT methods in {city.name}, {stateLabel}. Rates are quoted in
            USD per hour and reflect the Tier-{city.tier} labour band that applies across{' '}
            {city.region.replace(/-/g, ' ')} markets.
          </p>
          <blockquote className="border-l-4 border-primary/50 pl-4 italic text-slate-700 mb-6">
            {city.localPainQuote}
          </blockquote>

          {/* Pricing table */}
          <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-primary/10">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Low band
              </p>
              <p className="text-3xl font-bold text-primary">${cost.low}</p>
              <p className="text-xs text-muted-foreground">
                {method.unit} · routine scope, full-day crew
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Typical</p>
              <p className="text-3xl font-bold text-primary">${cost.mid}</p>
              <p className="text-xs text-muted-foreground">{method.unit} · most jobs land here</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                High band
              </p>
              <p className="text-3xl font-bold text-primary">${cost.high}</p>
              <p className="text-xs text-muted-foreground">
                {method.unit} · turnaround / night shift / rope access
              </p>
            </div>
          </div>
        </div>

        {/* Main grid — body now sourced from the per-(city, method) composer
            in lib/content/city-method.ts. The previous static cards (method
            overview, factors, tips, applications) collapsed to <50% lexical
            uniqueness across sibling pages and were replaced wholesale by
            the seven composer blocks rendered inside CityMethodContentBlocks. */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 space-y-6">
            {v2Content ? (
              // V2 stack — rich-data per-(city, method) blocks. Renders its
              // own FAQ accordion as the seventh block, so the standalone
              // FAQ at the bottom of the page is suppressed below.
              <CityMethodContentBlocksV2 content={v2Content} />
            ) : uniqueContent && methodProfile ? (
              <CityMethodContentBlocks
                city={city}
                method={methodProfile}
                prebuilt={uniqueContent}
                variant="full"
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{method.abbreviation} overview</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p className="mb-4">{method.description}</p>
                  <p className="text-slate-700 text-sm">{method.longDescription}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick reference</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    Method
                  </p>
                  <p className="font-semibold text-primary">{method.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    Abbreviation
                  </p>
                  <p className="font-semibold text-primary">{method.abbreviation}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    Labour band
                  </p>
                  <p className="font-semibold text-primary">
                    Tier {city.tier} (×{cost.multiplier.toFixed(2)})
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    Code authority
                  </p>
                  <p className="text-sm text-slate-700">{city.codeAuthorities[0]}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-primary mb-3">Get a quote</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Post a {method.abbreviation} scope and receive parallel quotes from certified{' '}
                  {city.name} providers.
                </p>
                <Link
                  href={`/request-inspection?city=${params.city}&service=${params.service}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  Request a quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-900 text-sm mb-1">Pricing caveat</p>
                    <p className="text-xs text-amber-800">
                      The numbers above are field-anchored ranges, not a quote. Actual {city.name}{' '}
                      rates vary with scope, accessibility, shift, and contractor utilisation.
                      Always solicit at least three quotes before committing programme spend.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Nearby cities pricing */}
        {nearby.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Compare {method.abbreviation} rates in nearby cities
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/cost-guide/${c.slug}/${method.slug}`}
                  className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-primary/40 transition-all"
                >
                  <p className="font-semibold text-primary text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tier {c.tier} ·{' '}
                    {c.country === 'US' || c.country === 'CA' ? c.state : c.country}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQ — only rendered as a standalone block when neither the v2
            stack nor the v1 composer is available (legacy fallback path).
            Both stacks render their own FAQ accordion as the final block,
            so we skip the standalone version here to avoid double-rendering. */}
        {!v2Content && !uniqueContent && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">
              {method.abbreviation} cost FAQ — {city.name}
            </h2>
            <div className="space-y-3">
              {faqs.map((f, idx) => (
                <details
                  key={idx}
                  className="bg-white rounded-lg border border-slate-200 p-4 open:shadow-sm"
                >
                  <summary className="font-semibold text-primary cursor-pointer text-sm">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm text-slate-700 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        <CityDataAnchors citySlug={params.city} methodAbbr={method.abbreviation} />
        <CornerstoneLinks methodAbbr={method.abbreviation} />
        <JoinCTA context={`Get ${method.abbreviation} inspection quotes in ${city.name}, or list your services — free on NDT Connect.`} />

        {/* Schema markup — upgraded 2026-05-29 to nest price inside Service+AggregateOffer
            so Google can surface $-amount rich snippet in SERP. Standalone PriceSpecification
            does not trigger price rich-result on its own. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${method.name} (${method.abbreviation}) Inspection in ${city.name}, ${stateLabel}`,
              serviceType: `${method.name} (${method.abbreviation}) Inspection`,
              description: `${method.name} inspection services in ${city.name}, ${stateLabel}. Hourly rate range $${cost.low}–$${cost.high}, typical $${cost.mid}/hr from certified providers.`,
              url: `https://ndt-connect.com/cost-guide/${params.city}/${params.service}`,
              provider: {
                '@type': 'Organization',
                name: 'NDT Connect Provider Network',
                url: 'https://ndt-connect.com',
              },
              areaServed: {
                '@type': city.country === 'US' || city.country === 'CA' ? 'City' : 'Place',
                name: city.name,
                ...(city.country === 'US' || city.country === 'CA'
                  ? {
                      containedInPlace: {
                        '@type': 'AdministrativeArea',
                        name: stateLabel,
                      },
                    }
                  : {}),
              },
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'USD',
                lowPrice: cost.low.toString(),
                highPrice: cost.high.toString(),
                offerCount: '5',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: cost.mid.toString(),
                  priceCurrency: 'USD',
                  unitText: method.unit.replace('per ', ''),
                  referenceQuantity: {
                    '@type': 'QuantitativeValue',
                    value: 1,
                    unitText: method.unit.replace('per ', ''),
                  },
                },
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </div>
  );
}




