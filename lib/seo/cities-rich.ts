// lib/seo/cities-rich.ts
//
// Loader and typed accessor for the rich city dataset that lives in
// data/cities.json. This file is the bridge between the curated TypeScript
// `City` rows in data/cities.ts (used by the existing route system) and the
// data-rich JSON entries (used by the v2 SEO content generator).
//
// Design notes
// ------------
//   - The JSON file is built and grown by a sister agent. Cities present in
//     data/cities.ts may not yet have a JSON counterpart, and vice versa.
//     Lookups MUST degrade gracefully — a missing entry returns `null`, the
//     callers fall back to the curated City row, and we log a single warning
//     per slug per process.
//   - The JSON shape is `_meta` plus one keyed object per city slug. We strip
//     `_meta` on first access and cache the resulting record.
//   - Numeric helpers (pricingMultiplier, transport surcharge multiplier)
//     centralise the two-place-decimal math so every block reads the same
//     numbers.

import citiesJson from '@/data/cities.json';

// ----------------------------------------------------------------------------
// Schema — mirrors the data the sister agent emits in data/cities.json. Many
// fields are optional because the schema is still being filled in; the only
// hard requirement for the v2 content stack to engage is `displayName` plus a
// non-empty `industries` array.
// ----------------------------------------------------------------------------

export interface RichIndustry {
  name: string;
  weight: number; // 0..1, weights across industries sum to ~1
  context: string;
}

export interface RichSite {
  name: string;
  type: string;
  capacity?: string;
  rank?: string;
  annualTonnage?: string;
}

export interface RichWageBand {
  level1?: number;
  level2?: number;
  level3?: number;
  cwi?: number;
  api510?: number;
  paut?: number;
}

export interface RichPricingFactor {
  baseMultiplier: number;
  rationale: string;
}

export interface RichCity {
  slug: string; // injected at load time from the JSON object key
  displayName: string;
  country: string;
  state?: string;
  stateCode?: string;
  tier?: 1 | 2 | 3 | 4;
  region?: string;
  metroPopulation?: number;
  msa?: string;
  lat?: number;
  lng?: number;
  industries: RichIndustry[];
  majorEmployers?: string[];
  avgInspectorWageUSD?: RichWageBand;
  wageBandSource?: string;
  regionalCodes?: string[];
  asntChapter?: string;
  awsSection?: string;
  apiExamCenter?: boolean;
  transportSurchargeBand?: 'low' | 'medium' | 'high';
  costOfLivingIndex?: number;
  majorPortsRefineriesPlants?: RichSite[];
  pricingFactor?: RichPricingFactor;
  uniqueAngles?: string[];
  turnaroundSeasons?: string[];
  permittingAuthority?: string;
  internationalAirportCode?: string;
  academicNDTPrograms?: string[];
  trainingProviders?: string[];
  rigCountInfluence?: 'high' | 'medium' | 'low';
  demandIndex?: number;
  nearbyMajorCities?: string[];
}

// ----------------------------------------------------------------------------
// Cached, slug-keyed access
// ----------------------------------------------------------------------------

type RawJson = Record<string, unknown>;

const RAW = citiesJson as RawJson;

let cache: Record<string, RichCity> | null = null;
const warnedSlugs = new Set<string>();

function buildCache(): Record<string, RichCity> {
  const out: Record<string, RichCity> = {};
  for (const [key, value] of Object.entries(RAW)) {
    if (key.startsWith('_')) continue; // skip _meta
    if (!value || typeof value !== 'object') continue;
    const v = value as Partial<RichCity> & Record<string, unknown>;
    if (!v.displayName || !Array.isArray(v.industries)) continue;
    out[key] = { ...(v as RichCity), slug: key };
  }
  return out;
}

export function findRichCity(slug: string): RichCity | null {
  if (!cache) cache = buildCache();
  const hit = cache[slug];
  if (!hit) {
    if (!warnedSlugs.has(slug)) {
      // eslint-disable-next-line no-console
      console.warn(`[seo/cities-rich] no rich entry for slug "${slug}" — content generator will use fallbacks`);
      warnedSlugs.add(slug);
    }
    return null;
  }
  return hit;
}

export function listRichCitySlugs(): string[] {
  if (!cache) cache = buildCache();
  return Object.keys(cache);
}

// ----------------------------------------------------------------------------
// Helpers — pricing, surcharge, tier inference
// ----------------------------------------------------------------------------

const TRANSPORT_SURCHARGE: Record<NonNullable<RichCity['transportSurchargeBand']>, number> = {
  low: 0.0,
  medium: 0.05,
  high: 0.12,
};

export function effectivePricingMultiplier(city: RichCity): number {
  const base = city.pricingFactor?.baseMultiplier ?? tierFallbackMultiplier(city.tier);
  const surcharge = city.transportSurchargeBand
    ? TRANSPORT_SURCHARGE[city.transportSurchargeBand]
    : 0;
  return Number((base + surcharge).toFixed(3));
}

export function tierFallbackMultiplier(tier?: number): number {
  switch (tier) {
    case 1: return 1.18;
    case 2: return 1.0;
    case 3: return 0.9;
    case 4: return 0.85;
    default: return 1.0;
  }
}

export function topIndustry(city: RichCity): RichIndustry | undefined {
  return [...city.industries].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))[0];
}

export function topIndustries(city: RichCity, n: number): RichIndustry[] {
  return [...city.industries].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0)).slice(0, n);
}

/**
 * Best-effort population-tier label used in opener prose. Falls back to a
 * generic "regional" descriptor when metroPopulation is absent.
 */
export function populationDescriptor(city: RichCity): string {
  const p = city.metroPopulation;
  if (!p) return 'a regional industrial economy';
  if (p >= 5_000_000) return `a mega-metro footprint of ${(p / 1_000_000).toFixed(1)} million residents`;
  if (p >= 1_500_000) return `a top-tier metro of roughly ${(p / 1_000_000).toFixed(1)} million`;
  if (p >= 600_000) return `a mid-band metro of about ${Math.round(p / 1000)}K residents`;
  if (p >= 200_000) return `a compact metro of around ${Math.round(p / 1000)}K residents`;
  return `a smaller metro of roughly ${Math.round(p / 1000)}K residents`;
}
