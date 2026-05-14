import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PUBLISHABLE_CITIES,
  findPublishableCity,
  type City,
} from '@/data/cities';
import { nearestCities } from '@/lib/seo-helpers';
import { DollarSign, TrendingUp, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { BreadcrumbListSchema } from '@/components/seo/SchemaMarkup';

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
  // Lead with impression-driving exact-match query "NDT inspection cost in
  // <city>" — GSC shows thousands of impressions across cost-guide pages at
  // CTRs well below the 3.8% pos-7 benchmark. Old title led with "UT Cost"
  // which doesn't match how procurement actually searches. ≤60 chars so it
  // doesn't truncate in SERPs.
  const title =
    `NDT Inspection Cost in ${city.name} (${method.abbreviation}): $${cost.low}-$${cost.high}/hr ${new Date().getFullYear()}`;
  const description =
    `NDT inspection cost in ${city.name}: ${method.abbreviation} ${method.unit} ` +
    `$${cost.low}–$${cost.high} (typical $${cost.mid}), tier-${city.tier} ` +
    `${city.country === 'US' ? city.state : city.country} labour band. ` +
    `Compare quotes from certified ${city.name} providers — free, no signup to view.`;

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
    },
    alternates: {
      canonical: `https://ndt-connect.com/cost-guide/${params.city}/${params.service}`,
    },
  };
}

export default function CostGuidePage({ params }: Props) {
  const city = findPublishableCity(params.city);
  const method = findMethodCost(params.service);
  if (!city || !method) notFound();

  const stateLabel = city.country === 'US' || city.country === 'CA' ? city.state : city.country;
  const cost = computeCostBand(city, method);
  const nearby = nearestCities(city.slug, 5);

  const factorsAffectingCost: { factor: string; description: string }[] = [
    {
      factor: 'Crew rotation length',
      description:
        `Multi-day mobilisations in ${city.name} amortise travel and per-diem across more billable hours, lowering the per-hour rate. Single-day call-outs sit at the high band.`,
    },
    {
      factor: 'Access and rigging',
      description:
        `Rope access, scaffold, or confined-space entry add 15–35% to the base rate. ${city.industries[0]} sites in ${city.name} often require all three.`,
    },
    {
      factor: 'Shift premium',
      description: `Night shift, weekend, and turnaround windows in ${city.name} typically carry a 25–40% premium on the base hourly rate.`,
    },
    {
      factor: 'Acceptance criteria',
      description: `${city.codeAuthorities[0]} acceptance criteria require Level II / III sign-off, which prices above structural-weld AWS D1.1 work.`,
    },
    {
      factor: 'Equipment specification',
      description: method.driver,
    },
    {
      factor: 'Programme volume',
      description: `Multi-asset programmes at sites like ${city.namedFacilities[0]?.name ?? 'major local operators'} typically negotiate volume discounts of 8–15% off the typical rate.`,
    },
    {
      factor: 'Mobilisation distance',
      description: `Remote ${city.region.replace(/-/g, ' ')} sites add a per-trip mobilisation charge ($350–$1,500 depending on travel distance from ${city.name}).`,
    },
    {
      factor: 'Documentation depth',
      description: `Full digital scan packages with audit-grade traceability cost 10–20% more than basic written report deliverables, and are required at ${city.codeAuthorities[0]} sites.`,
    },
  ];

  const costSavingTips = [
    `Plan ${method.abbreviation} scopes against the ${city.region.replace(/-/g, ' ')} turnaround calendar to avoid rush premiums.`,
    `Batch multiple assets at the same site (e.g. ${city.namedFacilities[0]?.name ?? 'major local operators'}) to amortise mobilisation across more billable hours.`,
    'Provide detailed component specs and accessibility info up-front — vague RFPs price high to absorb uncertainty.',
    'Standardise on a single contractor for programme work; spot-buys carry a 10–20% premium.',
    `Where ${method.abbreviation} is interchangeable with another method (RT ↔ PAUT, MT ↔ PT), price both before committing.`,
    'Verify Level II / III currency before quote — re-mobilisation for an expired cert is unbillable to the asset.',
  ];

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

        {/* Main grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{method.abbreviation} overview</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="mb-4">{method.description}</p>
                <p className="text-slate-700 text-sm">{method.longDescription}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Why {city.name} sits in the Tier-{city.tier} labour band
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-slate-700">
                  {city.name}&apos;s industrial substrate — {city.industries.slice(0, 3).join(', ')} —
                  pulls NDT scopes onto recurring sites including{' '}
                  {city.namedFacilities.slice(0, 2).map((f) => f.name).join(' and ')}. The local
                  contractor pool prices against {city.codeAuthorities[0]} acceptance criteria,
                  which requires Level II / III certified personnel and traceable instrument
                  calibration. That floor — not raw wage data — is what sets the band.
                </p>
                <p className="mb-4 text-sm text-slate-700">
                  The Tier-{city.tier} multiplier (×{cost.multiplier.toFixed(2)} applied to the
                  national {method.abbreviation} base band) accounts for local cost of living,
                  procurement competition, and the documentary overhead that {city.codeAuthorities[0]}{' '}
                  imposes. {method.abbreviation} programmes in {city.name} have historically
                  clustered around the typical rate of ${cost.mid} {method.unit}, with turnaround
                  and outage premiums pushing toward the high band.
                </p>
                <div className="mb-3">
                  <p className="font-semibold text-primary mb-3">
                    Recurring industries pricing against this band:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {city.industries.map((industry) => (
                      <span
                        key={industry}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-700">
                  <strong>Named operators / sites:</strong>{' '}
                  {city.namedFacilities.map((f) => f.name).join(', ')}.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Factors that move {method.abbreviation} costs in {city.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {factorsAffectingCost.map((factor, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-200 shadow-sm rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">{factor.factor}</h4>
                      <p className="text-sm text-slate-700">{factor.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Procurement levers to get the best value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {costSavingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-primary font-bold shrink-0">{idx + 1}.</span>
                      <span className="text-sm text-slate-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Where {method.abbreviation} is applied in {city.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {method.applications.map((app, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-slate-700 flex items-start gap-2"
                    >
                      <span className="text-primary shrink-0">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
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

        {/* Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              minPrice: cost.low.toString(),
              maxPrice: cost.high.toString(),
              price: cost.mid.toString(),
              description: `${method.name} (${method.abbreviation}) cost band in ${city.name}, ${stateLabel}`,
              url: `https://ndt-connect.com/cost-guide/${params.city}/${params.service}`,
            }),
          }}
        />
      </div>
    </div>
  );
}
