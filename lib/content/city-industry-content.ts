// lib/content/city-industry-content.ts
//
// Content generator for /ndt-services/[city]/[industry] pages.
// Each page addresses a specific industry's NDT needs within a specific city,
// drawing on:
//   - lib/seo/industry-page-data.ts (canonical industry definitions)
//   - lib/seo/cities-rich.ts (rich city data: facilities, employers, wages)
//   - data/cities.ts (City: namedFacilities, codeAuthorities, localPainQuote)
//
// Uniqueness mechanism: every text block selects city-specific named
// facilities, employers, regulatory bodies, and wage figures from the rich
// data and intersects them with the industry definition to produce content
// that is demonstrably specific to that city AND that industry combination.

import {
  findRichCity,
  topIndustry,
  effectivePricingMultiplier,
  type RichCity,
} from '@/lib/seo/cities-rich';
import {
  INDUSTRY_PAGE_DATA,
  cityIndustrySlugs,
  rawIndustryToSlug,
  type IndustryPageDef,
} from '@/lib/seo/industry-page-data';
import { findPublishableCity, type City } from '@/data/cities';

// djb2 hash for deterministic template selection
function djb2(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h;
}

// --------------------------------------------------------------------------

export interface CityIndustryContent {
  citySlug: string;
  industrySlug: string;
  cityName: string;
  stateName: string;
  industryLabel: string;
  industrySubtitle: string;

  /** H1 */
  h1: string;
  /** 150-word lead paragraph: why this industry + this city needs NDT */
  leadParagraph: string;
  /** 100-120 word block: named local facilities and employers in this industry */
  localMarket: string;
  /** regulatory codes relevant to this city×industry */
  regulatoryCodes: string[];
  /** NDT methods block, industry-specific */
  methods: { code: string; name: string; why: string }[];
  /** certifications block */
  certifications: string[];
  /** typical scope paragraph */
  typicalScope: string;
  /** day-rate range (city-adjusted) */
  dayRateRange: { low: number; high: number };
  /** FAQs: 2 industry-level + 1 city-specific */
  faqs: { q: string; a: string }[];
  /** canonical URL */
  canonicalUrl: string;
  /** meta title */
  metaTitle: string;
  /** meta description */
  metaDescription: string;
  /** breadcrumbs */
  breadcrumbs: { label: string; href: string }[];
}

// --------------------------------------------------------------------------

const BASE_URL = 'https://ndt-connect.com';

/** Industry-level day-rate baselines (USD/day for a Level II crew of 2) */
const INDUSTRY_BASE_RATE: Record<string, { low: number; high: number }> = {
  'nuclear':         { low: 1200, high: 2200 },
  'lng':             { low: 900,  high: 1600 },
  'refining':        { low: 750,  high: 1400 },
  'oil-gas':         { low: 650,  high: 1200 },
  'pipeline':        { low: 700,  high: 1300 },
  'aerospace':       { low: 900,  high: 1700 },
  'power-generation':{ low: 750,  high: 1350 },
  'marine':          { low: 650,  high: 1200 },
  'manufacturing':   { low: 500,  high: 950 },
  'automotive':      { low: 550,  high: 1000 },
  'mining':          { low: 600,  high: 1100 },
  'defense':         { low: 850,  high: 1600 },
  'steel':           { low: 550,  high: 1000 },
  'petrochemical':   { low: 700,  high: 1300 },
  'construction':    { low: 450,  high: 850 },
};

/** City-specific industry-relevant facility filter:
 *  returns rich-city sites that plausibly belong to this industry */
function industryRelevantSites(city: RichCity, industrySlug: string): string[] {
  if (!city.majorPortsRefineriesPlants?.length) return [];
  const keywords: Record<string, string[]> = {
    'refining':        ['refin', 'crude', 'fcc', 'hydrocrack'],
    'petrochemical':   ['petrochem', 'chemical', 'polymer', 'plastics', 'ethylene'],
    'oil-gas':         ['oil', 'gas', 'upstream', 'wellhead', 'separator', 'offshore'],
    'pipeline':        ['pipeline', 'compressor', 'pump station', 'terminal', 'midstream'],
    'lng':             ['lng', 'liquef', 'cryogenic', 'regasif'],
    'aerospace':       ['aerospace', 'aviation', 'airport', 'defense', 'air force'],
    'power-generation':['power', 'generat', 'turbine', 'boiler', 'nuclear', 'wind'],
    'nuclear':         ['nuclear', 'reactor', 'npp', 'fuel'],
    'marine':          ['port', 'terminal', 'ship', 'dock', 'yard', 'maritime', 'crane'],
    'manufacturing':   ['manufactur', 'plant', 'factory', 'fab', 'foundry', 'mill'],
    'automotive':      ['auto', 'vehicle', 'assembly', 'stamping', 'ev'],
    'mining':          ['mine', 'mining', 'pit', 'iron ore', 'coal', 'smelter'],
    'defense':         ['base', 'naval', 'army', 'air force', 'shipyard', 'depot'],
    'steel':           ['steel', 'iron', 'aluminum', 'smelter', 'mill', 'foundry'],
    'construction':    ['bridge', 'tunnel', 'infra', 'transit', 'rail', 'airport'],
  };
  const kws = keywords[industrySlug] ?? [];
  return city.majorPortsRefineriesPlants
    .filter((s) => kws.some((kw) => (s.name + ' ' + s.type).toLowerCase().includes(kw)))
    .map((s) => s.name)
    .slice(0, 4);
}

/** Returns 2-3 employers from the city that are relevant to the industry */
function industryRelevantEmployers(city: RichCity, industrySlug: string): string[] {
  if (!city.majorEmployers?.length) return [];
  // Use the first 3 employers as a proxy (they are ordered by industry weight)
  return city.majorEmployers.slice(0, 3);
}

// --------------------------------------------------------------------------

export function generateCityIndustryContent(
  citySlug: string,
  industrySlug: string,
): CityIndustryContent | null {
  const richCity = findRichCity(citySlug);
  const canonicalCity = findPublishableCity(citySlug);
  const industryDef = INDUSTRY_PAGE_DATA[industrySlug];

  if (!industryDef) return null;
  if (!richCity && !canonicalCity) return null;

  const city = richCity;
  const canon = canonicalCity;

  const cityName = city?.displayName ?? canon?.name ?? citySlug;
  const stateName = city?.state ?? city?.stateCode ?? canon?.state ?? '';
  const countryCode = city?.country ?? canon?.country ?? 'US';
  const location = stateName ? `${cityName}, ${stateName}` : cityName;

  const seed = djb2(`${citySlug}|${industrySlug}`);

  // Named facilities and employers in this city for this industry
  const sites = city ? industryRelevantSites(city, industrySlug) : [];
  const employers = city ? industryRelevantEmployers(city, industrySlug) : [];
  const namedFacilities = canon?.namedFacilities?.map((f) => f.name) ?? [];
  const codeAuthorities = canon?.codeAuthorities ?? [];

  // Blend local named facility data: prefer rich JSON sites, fall back to cities.ts
  const facilitiesForCopy = sites.length >= 2
    ? sites
    : namedFacilities.filter((n) => n.length > 2).slice(0, 4);

  // Day-rate with city cost-of-living multiplier
  const baseRate = INDUSTRY_BASE_RATE[industrySlug] ?? { low: 600, high: 1100 };
  const mult = city ? effectivePricingMultiplier(city) : 1.0;
  const dayRateRange = {
    low:  Math.round(baseRate.low  * mult / 50) * 50,
    high: Math.round(baseRate.high * mult / 50) * 50,
  };

  // Regulatory codes: blend industry codes with city-specific code authorities
  const regulatoryCodes = [
    ...industryDef.codes.slice(0, 5),
    ...codeAuthorities.filter((c) => !industryDef.codes.includes(c)).slice(0, 3),
  ];

  // ---------- prose blocks ----------

  const facilityList = facilitiesForCopy.length > 0
    ? `facilities including ${facilitiesForCopy.slice(0, 3).join(', ')}`
    : `major industrial assets`;

  const localMarket = buildLocalMarketBlock(
    cityName, stateName, industryDef, city, facilitiesForCopy, employers, seed,
  );

  const leadParagraph = buildLeadParagraph(
    cityName, stateName, location, industryDef, city, canon ?? null, seed,
  );

  // City-specific FAQ using localPainQuote or unique-angles data
  const cityFaq = buildCityFaq(cityName, industryDef, city, canon ?? null);

  const faqs = [...industryDef.faqs, cityFaq];

  // Meta
  const metaTitle = `${industryDef.subtitle} NDT in ${cityName}${stateName ? `, ${stateName}` : ''} — Inspection Services & Rates`;
  const metaDescription = `Find certified NDT inspectors for ${industryDef.subtitle.toLowerCase()} in ${location}. UT, RT, MT, PT, PAUT — verified contractors, day-rate quotes, industry-specific compliance. Post your job free.`;

  return {
    citySlug,
    industrySlug,
    cityName,
    stateName,
    industryLabel: industryDef.label,
    industrySubtitle: industryDef.subtitle,
    h1: `NDT Inspection Services for ${industryDef.subtitle} in ${location}`,
    leadParagraph,
    localMarket,
    regulatoryCodes,
    methods: industryDef.methods,
    certifications: industryDef.certifications,
    typicalScope: industryDef.typicalScope,
    dayRateRange,
    faqs,
    canonicalUrl: `${BASE_URL}/ndt-services/${citySlug}/industries/${industrySlug}`,
    metaTitle,
    metaDescription,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'NDT Services', href: '/ndt-services' },
      { label: cityName, href: `/ndt-services/${citySlug}` },
      { label: industryDef.label, href: `/ndt-services/${citySlug}/industries/${industrySlug}` },
    ],
  };
}

// --------------------------------------------------------------------------
// Prose block builders — each pulls specific city facts into the copy
// --------------------------------------------------------------------------

function buildLeadParagraph(
  cityName: string,
  stateName: string,
  location: string,
  def: IndustryPageDef,
  city: RichCity | null,
  canon: City | null,
  seed: number,
): string {
  const population = city?.metroPopulation
    ? `The ${cityName} metropolitan area (${(city.metroPopulation / 1_000_000).toFixed(1)}M residents) `
    : `${cityName} `;

  const industryContext = city?.industries?.find((i) =>
    rawIndustryToSlug(i.name) === def.slug,
  )?.context ?? '';

  const painQuote = canon?.localPainQuote ?? city?.uniqueAngles?.[0] ?? '';

  // Template A: industry-weight-led opener
  const templateA = `${location} is one of the most active ${def.subtitle.toLowerCase()} centers in the region, with persistent demand for qualified NDT inspection teams throughout the year. ${industryContext ? industryContext + ' ' : ''}Inspection programs here follow ${def.codes[0]} and ${def.codes[1]} — the governing standards for every contract scope in this market. ${painQuote ? `"${painQuote}"` : `Certification compliance and turnaround scheduling are the two chronic friction points operators in ${cityName} cite most.`} NDT Connect provides immediate access to pre-vetted inspection contractors serving ${location} — no RFQ delay, no credential chase.`;

  // Template B: regulatory-authority-led opener
  const codeAuth = canon?.codeAuthorities?.[0] ?? def.codes[0];
  const templateB = `${def.subtitle} operations in ${location} require continuous NDT support: routine in-service inspection programs, equipment integrity verification, and construction-phase weld acceptance all generate consistent inspector demand year-round. Work in this sector must comply with ${codeAuth}${def.codes[1] ? ` and ${def.codes[1]}` : ''}, and most clients require ASNT or ${def.certifications[0]?.split(' ').slice(0, 3).join(' ')} certification from the inspection crew before mobilization. ${painQuote ? `Local operators note: "${painQuote}"` : ``} NDT Connect connects you with contractors who are already active in ${cityName}'s ${def.label.toLowerCase()} sector and can mobilize within 48 hours.`;

  // Template C: asset-led opener
  const templateC = `The ${def.subtitle.toLowerCase()} sector in ${location} spans a diverse asset base — ${def.assetClasses.slice(0, 3).join(', ')} — all requiring periodic and event-driven NDT to meet ${def.codes[0]} requirements. Inspection teams here must be fluent in the governing codes, familiar with local permitting practices${city?.permittingAuthority ? ` (${city.permittingAuthority})` : ''}, and available on the compressed schedules that ${cityName}'s ${def.label.toLowerCase()} calendar demands. NDT Connect makes it straightforward: post your scope, compare verified contractor proposals, and mobilize within 24–48 hours.`;

  return [templateA, templateB, templateC][seed % 3];
}

function buildLocalMarketBlock(
  cityName: string,
  stateName: string,
  def: IndustryPageDef,
  city: RichCity | null,
  sites: string[],
  employers: string[],
  seed: number,
): string {
  const asntChapter = city?.asntChapter ? ` The local ASNT ${city.asntChapter} serves the ${cityName} inspector community.` : '';
  const apiExamCenter = city?.apiExamCenter ? ` ${cityName} is an API exam center, making local re-certification more accessible than in smaller markets.` : '';
  const turnaround = city?.turnaroundSeasons?.length
    ? ` Peak inspection demand in ${cityName} concentrates around ${city.turnaroundSeasons.join(' and ')} turnaround windows.`
    : '';
  const wageNote = city?.avgInspectorWageUSD?.level2
    ? ` BLS wage data shows ${cityName}-area NDT Level II technicians averaging $${city.avgInspectorWageUSD.level2.toLocaleString()}/yr — consistent with competitive contractor day rates for ${def.label.toLowerCase()} work.`
    : '';

  if (sites.length >= 2) {
    return `${cityName}'s ${def.label.toLowerCase()} sector is anchored by ${sites.slice(0, 2).join(' and ')}${sites[2] ? `, ${sites[2]},` : ''} among others.${turnaround}${asntChapter}${apiExamCenter}${wageNote} Contractors working this market typically hold ${def.certifications[0]} and ${def.certifications[1] ?? 'ASNT Level II UT/MT/PT'} as baseline qualifications.`;
  } else if (employers.length >= 2) {
    return `Major ${def.label.toLowerCase()} employers in ${cityName} — ${employers.slice(0, 2).join(' and ')}${employers[2] ? `, ${employers[2]},` : ''} — maintain ongoing NDT programs for both routine inspection and outage or project-driven scope.${turnaround}${asntChapter}${wageNote}`;
  } else {
    return `${cityName} has an established ${def.label.toLowerCase()} sector with recurring NDT demand across ${def.assetClasses.slice(0, 2).join(' and ')} programs.${turnaround}${asntChapter}${apiExamCenter}${wageNote} Qualified inspection contractors serving ${cityName} carry ${def.certifications[0]} as a baseline.`;
  }
}

function buildCityFaq(
  cityName: string,
  def: IndustryPageDef,
  city: RichCity | null,
  canon: City | null,
): { q: string; a: string } {
  // Build a city-specific FAQ using whatever data we have
  const nearbyCity = city?.nearbyMajorCities?.[0];
  const turnaround = city?.turnaroundSeasons?.[0];
  const painQuote = canon?.localPainQuote;
  const chapter = city?.asntChapter;

  if (turnaround) {
    return {
      q: `When is NDT inspection demand highest for ${def.label.toLowerCase()} in ${cityName}?`,
      a: `${cityName}'s ${def.label.toLowerCase()} sector concentrates inspection demand around ${turnaround} — the period when most facilities schedule major outages, turnarounds, or planned maintenance campaigns. Booking NDT contractors 4–8 weeks ahead of your target window is strongly advisable; last-minute mobilization during peak periods typically costs 15–25% more and may mean accepting teams with less local experience. NDT Connect lets you post your scope early, collect quotes, and lock in a preferred contractor before the peak-demand compression begins.`,
    };
  }

  if (nearbyCity) {
    return {
      q: `Can NDT contractors from ${nearbyCity} serve ${cityName} ${def.label.toLowerCase()} sites?`,
      a: `Yes — many inspection firms based in ${nearbyCity} routinely serve ${cityName} and surrounding areas for ${def.label.toLowerCase()} inspection. Per diem and mobilization costs apply but are often offset by the broader contractor pool, especially during periods when ${cityName}'s local capacity is fully committed. NDT Connect displays both local-${cityName} and regional-${nearbyCity} contractors for your job so you can compare rates, certifications, and availability in one place.`,
    };
  }

  if (chapter) {
    return {
      q: `What role does the ASNT ${chapter} play in ${cityName}'s ${def.label.toLowerCase()} NDT community?`,
      a: `The ASNT ${chapter} organizes technical seminars, code-update workshops, and networking events for NDT professionals serving ${cityName}'s ${def.label.toLowerCase()} sector. Membership provides access to procedure libraries, training contacts, and a roster of locally qualified Level III personnel who can sign off procedures for contractors who need a responsible Level III but haven't staffed one in-house. Most active ${cityName}-area NDT contractors participate in the section.`,
    };
  }

  // Generic fallback with city name
  return {
    q: `How quickly can NDT inspectors mobilize for ${def.label.toLowerCase()} jobs in ${cityName}?`,
    a: `For routine planned-inspection work in ${cityName}, contractors on NDT Connect typically mobilize within 48–72 hours of scope confirmation. Emergency response (unplanned shutdown, leak, damage assessment) can be as fast as 4–12 hours for firms already active in the ${cityName} market. Specialized work — nuclear outage crews, PDI-qualified teams, offshore-certified personnel — may require 5–10 business days for mobilization and procedure review. Post your job with your required start date, and responding contractors will confirm their actual availability.`,
  };
}

// --------------------------------------------------------------------------
// generateStaticParams helper — returns all valid city×industry combos
// --------------------------------------------------------------------------

export function allCityIndustryCombos(): { city: string; industry: string }[] {
  // Import at call time to avoid circular-dep issues at module load
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PUBLISHABLE_CITIES } = require('@/data/cities') as { PUBLISHABLE_CITIES: City[] };
  const results: { city: string; industry: string }[] = [];
  for (const city of PUBLISHABLE_CITIES) {
    const richCity = findRichCity(city.slug);
    const industries = richCity?.industries ?? [];
    const slugs = cityIndustrySlugs(industries, 0.15);
    for (const ind of slugs) {
      results.push({ city: city.slug, industry: ind });
    }
  }
  return results;
}
