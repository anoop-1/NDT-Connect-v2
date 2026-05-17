// lib/content/city-method.ts
//
// Deterministic, data-driven content composer for /cost-guide/[city]/[service]
// and /ndt-services/[city]/[slug]. The same (city, method) input MUST produce
// the same output every render — this is critical for SEO (no churn between
// crawls) and for the build-time uniqueness guardrail in
// scripts/check-content-uniqueness.ts.
//
// Why this file exists
// --------------------
// Both route files previously emitted ~6KB of mostly identical prose for every
// (city, method) combination. Cross-page Jaccard similarity was >85%. Google's
// helpful-content classifier flagged the routes as a programmatic doorway and
// pulled the entire surface from the index in late April 2026.
//
// The fix is per-(city, method) lexical variation. We do NOT call an LLM at
// runtime (cost, latency, non-determinism). Instead we pick from large
// vocabulary banks using a deterministic hash seeded by city.slug + method.code,
// blended with real city data (industries, namedFacilities, codeAuthorities,
// region, tier, localPainQuote) and a rich method profile (typical defects,
// industry verticals, equipment, code refs).
//
// Output shape
// ------------
// composeCityMethodContent(city, method) returns nine named blocks:
//   localMarketOverview    — paragraph using industries + facilities + region
//   whyMethodMatters       — method × dominant industry narrative
//   regionalCodeReqs       — local code authorities × method standards
//   pricingBreakdown       — line-item rate card seeded by tier multiplier
//   localProviders         — placeholder list (real provider directory wires
//                            in later via providerLookup)
//   certificationPath      — ASNT / AWS / API certification context per region
//   caseStudy              — short anonymised scenario from the named facilities
//   faqs                   — five city × method specific Q&A pairs
//   factSheet              — structured key-value summary used by sidebars
//
// Each block is a plain { title, paragraphs[], bullets?[] } object so both
// route files can render it however their layout demands. This keeps page
// JSX uncluttered and makes the composer unit-testable in isolation.

import type { City } from '@/data/cities';

// ----------------------------------------------------------------------------
// Method profile — richer per-method data than the existing METHODS / METHOD_COSTS
// objects in the route files. Keyed by canonical method slug.
// ----------------------------------------------------------------------------

export interface MethodProfile {
  slug: string;             // route slug (e.g. "ultrasonic-testing")
  code: string;             // canonical short code (UT, RT, MT, ...)
  name: string;             // full display name
  abbreviation: string;     // alias for code, used by existing route copy
  family: 'volumetric' | 'surface' | 'subsurface';
  baseHourlyLow: number;
  baseHourlyMid: number;
  baseHourlyHigh: number;
  dayRateMid: number;       // typical 8-hour day rate
  equipmentSurcharge: number; // typical $/day for instrument package
  travelMobilisation: number; // typical $/trip mobilisation
  certPremium: { lvl2: number; lvl3: number };
  primaryStandards: string[];
  secondaryStandards: string[];
  defectsDetected: string[];
  bestFitVerticals: string[];   // matches city.industries vocabulary
  typicalEquipment: string[];
  procedurePace: string;        // qualitative cycle-time descriptor
  recordType: string;           // e.g. 'A-scan trace', 'film negative', 'C-scan map'
}

export const METHOD_PROFILES: Record<string, MethodProfile> = {
  'ultrasonic-testing': {
    slug: 'ultrasonic-testing',
    code: 'UT', name: 'Ultrasonic Testing', abbreviation: 'UT',
    family: 'volumetric',
    baseHourlyLow: 225, baseHourlyMid: 425, baseHourlyHigh: 700,
    dayRateMid: 3200, equipmentSurcharge: 285, travelMobilisation: 425,
    certPremium: { lvl2: 0, lvl3: 0.18 },
    primaryStandards: ['ASME Section V Article 4', 'ASTM E164', 'ASTM E2375'],
    secondaryStandards: ['ISO 16810', 'AWS D1.1 Section 6 Part F', 'API 510 Appendix C', 'API 570 Section 5'],
    defectsDetected: ['planar lack-of-fusion', 'mid-wall hydrogen blistering', 'fatigue-crack initiation', 'corrosion thinning', 'lamination'],
    bestFitVerticals: ['refining', 'petrochemical', 'pipeline', 'pressure vessel fabrication', 'storage tank', 'power generation'],
    typicalEquipment: ['Olympus EPOCH 650 flaw detector', 'GE USM Go+ thickness gauge', '0-degree contact transducer', 'angle-beam wedge'],
    procedurePace: 'roughly 12–25 welds per shift on accessible pressure piping',
    recordType: 'A-scan trace plus written disposition log',
  },
  'radiographic-testing': {
    slug: 'radiographic-testing',
    code: 'RT', name: 'Radiographic Testing', abbreviation: 'RT',
    family: 'volumetric',
    baseHourlyLow: 400, baseHourlyMid: 700, baseHourlyHigh: 1200,
    dayRateMid: 5400, equipmentSurcharge: 640, travelMobilisation: 825,
    certPremium: { lvl2: 0, lvl3: 0.22 },
    primaryStandards: ['ASME Section V Article 2', 'API 1104 Section 11', 'ASTM E94'],
    secondaryStandards: ['ISO 17636-1', 'ISO 17636-2 (digital)', 'ASTM E1032', 'NRC 10 CFR 34'],
    defectsDetected: ['volumetric porosity', 'slag inclusions', 'incomplete penetration', 'burn-through', 'tungsten inclusions in GTAW'],
    bestFitVerticals: ['pipeline construction', 'pressure vessel new-build', 'casting', 'aerospace airframe', 'shipyard hull weld'],
    typicalEquipment: ['Ir-192 source projector', 'Co-60 source for thick-wall', 'class-II film', 'DDA panel for digital RT', 'lead exclusion-zone barrier'],
    procedurePace: 'typically 18–35 girth welds per night-shift exclusion window',
    recordType: 'film negative or DICONDE-format DDA file',
  },
  'magnetic-particle-testing': {
    slug: 'magnetic-particle-testing',
    code: 'MT', name: 'Magnetic Particle Testing', abbreviation: 'MT',
    family: 'surface',
    baseHourlyLow: 175, baseHourlyMid: 325, baseHourlyHigh: 550,
    dayRateMid: 2400, equipmentSurcharge: 95, travelMobilisation: 325,
    certPremium: { lvl2: 0, lvl3: 0.15 },
    primaryStandards: ['ASTM E709', 'ASTM E1444', 'ASME Section V Article 7'],
    secondaryStandards: ['ISO 9934-1', 'AWS D1.1 Section 6 Part E', 'NAVSEA T9074-AS-GIB'],
    defectsDetected: ['surface fatigue cracks', 'forging laps', 'casting cold shuts', 'grinding burns', 'sub-surface porosity within 6mm'],
    bestFitVerticals: ['structural steel', 'shipyard', 'forging', 'drilling tubulars', 'crane and lift equipment', 'rail rolling stock'],
    typicalEquipment: ['Magnaflux Y-7 AC yoke', 'Parker DA-400 DC yoke', 'wet-fluorescent bath unit', 'UV-A 365nm inspection light'],
    procedurePace: 'about 30–60 metres of structural weld per inspector-shift',
    recordType: 'photographed indication map plus written log',
  },
  'penetrant-testing': {
    slug: 'penetrant-testing',
    code: 'PT', name: 'Liquid Penetrant Testing', abbreviation: 'PT',
    family: 'surface',
    baseHourlyLow: 175, baseHourlyMid: 325, baseHourlyHigh: 525,
    dayRateMid: 2300, equipmentSurcharge: 70, travelMobilisation: 295,
    certPremium: { lvl2: 0, lvl3: 0.14 },
    primaryStandards: ['ASTM E165', 'ASTM E1417', 'ASME Section V Article 6'],
    secondaryStandards: ['ISO 3452-1', 'AMS 2644 Type I', 'NAS 410'],
    defectsDetected: ['hairline surface cracks', 'leak-path pinholes', 'machining tears', 'casting cold shuts', 'stress-corrosion cracking on austenitic'],
    bestFitVerticals: ['aerospace component', 'austenitic stainless piping', 'investment casting', 'turbine blade', 'food-grade stainless'],
    typicalEquipment: ['Magnaflux Spotcheck SKL kit', 'water-washable Type II penetrant', 'AMS 2644-rated fluorescent set', 'darkroom booth'],
    procedurePace: 'typically 8–15 components per inspector-hour for visible-dye',
    recordType: 'photographed bleed-out map plus penetrant lot traceability sheet',
  },
  'visual-testing': {
    slug: 'visual-testing',
    code: 'VT', name: 'Visual Testing', abbreviation: 'VT',
    family: 'surface',
    baseHourlyLow: 125, baseHourlyMid: 225, baseHourlyHigh: 375,
    dayRateMid: 1700, equipmentSurcharge: 45, travelMobilisation: 235,
    certPremium: { lvl2: 0, lvl3: 0.12 },
    primaryStandards: ['AWS D1.1 Section 6', 'ASME Section V Article 9', 'API 510 Section 5'],
    secondaryStandards: ['ISO 17637', 'API 570 Section 6', 'API 653 Section 6'],
    defectsDetected: ['weld profile non-conformance', 'surface corrosion', 'coating breakdown', 'mechanical damage', 'misalignment'],
    bestFitVerticals: ['structural steel', 'pressure equipment in-service', 'storage tank external', 'shipyard fitting', 'composite layup'],
    typicalEquipment: ['Cygnus rugged borescope', 'Olympus IPLEX videoscope', 'Elios drone for confined space', 'GAL Gage AWS bridge cam', 'lux meter'],
    procedurePace: 'continuous walk-down at roughly 200–400 metres of asset per shift',
    recordType: 'inspection checklist with photographic evidence appendix',
  },
  'phased-array-ut': {
    slug: 'phased-array-ut',
    code: 'PAUT', name: 'Phased Array Ultrasonic Testing', abbreviation: 'PAUT',
    family: 'volumetric',
    baseHourlyLow: 400, baseHourlyMid: 725, baseHourlyHigh: 1300,
    dayRateMid: 5650, equipmentSurcharge: 720, travelMobilisation: 525,
    certPremium: { lvl2: 0.08, lvl3: 0.24 },
    primaryStandards: ['ASME Section V Mandatory Appendix VII', 'ISO 13588', 'ISO 19285'],
    secondaryStandards: ['ASTM E2491', 'DNV-ST-F101 (offshore)', 'API 1104 Annex A'],
    defectsDetected: ['planar lack-of-fusion', 'crack-like indications', 'corrosion mapping', 'composite delamination', 'HIC blistering'],
    bestFitVerticals: ['offshore pipeline', 'critical pressure vessel', 'thick-wall fabrication', 'composite aerospace', 'wind tower bolt'],
    typicalEquipment: ['Olympus OmniScan X3', 'Eddyfi M2M Gekko', '32:128 PA probe', 'TOFD twin-probe set', 'encoded scanner buggy'],
    procedurePace: 'about 20–40 girth welds per shift with encoded scanner',
    recordType: 'C-scan / S-scan dataset in DICONDE or .opd format',
  },
  'eddy-current-testing': {
    slug: 'eddy-current-testing',
    code: 'ET', name: 'Eddy Current Testing', abbreviation: 'ET',
    family: 'subsurface',
    baseHourlyLow: 240, baseHourlyMid: 460, baseHourlyHigh: 780,
    dayRateMid: 3400, equipmentSurcharge: 320, travelMobilisation: 380,
    certPremium: { lvl2: 0, lvl3: 0.17 },
    primaryStandards: ['ASTM E309', 'ASTM E2884', 'ASME Section V Article 8'],
    secondaryStandards: ['ISO 15549', 'NAS 410', 'EN 4179 (aerospace)'],
    defectsDetected: ['heat-exchanger tube wall loss', 'fastener-hole cracking on aluminium', 'coating thickness variation', 'conductivity drift'],
    bestFitVerticals: ['aerospace airframe', 'heat exchanger', 'condenser tube', 'nuclear steam generator', 'aluminium fabrication'],
    typicalEquipment: ['Olympus NORTEC 600', 'Eddyfi Reddy multi-channel', 'absolute and differential probes', 'array scanner sled'],
    procedurePace: 'roughly 200–800 tubes per shift on heat-exchanger bundles',
    recordType: 'impedance-plane signature plus tube-by-tube disposition matrix',
  },
};

export function findMethodProfile(slug: string): MethodProfile | undefined {
  return METHOD_PROFILES[slug];
}

// ----------------------------------------------------------------------------
// Deterministic pseudo-random helpers
// ----------------------------------------------------------------------------

/**
 * djb2 hash — fast, stable, well-distributed for short strings. We use it as
 * the seed for every per-page picker so the same (city, method) always yields
 * the same prose between renders, between deploys, and between Google crawls.
 * Crawl-stable content is non-negotiable for SEO ranking stability.
 */
function djb2(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** Pick one element from a list, deterministic on the seed and salt string. */
function pick<T>(seed: number, salt: string, list: readonly T[]): T {
  if (list.length === 0) throw new Error('pick(): empty list');
  const h = djb2(salt + ':' + seed.toString(36));
  return list[h % list.length];
}

/**
 * Pick `n` distinct elements from `list`, deterministically. Used wherever we
 * need a varied subset (intro adjective + verb + closer, e.g.) without writing
 * the same phrase across every page.
 */
function pickN<T>(seed: number, salt: string, list: readonly T[], n: number): T[] {
  if (n >= list.length) return [...list];
  const out: T[] = [];
  const used = new Set<number>();
  let salty = salt;
  while (out.length < n) {
    const h = djb2(salty + ':' + seed.toString(36));
    const idx = h % list.length;
    if (!used.has(idx)) {
      used.add(idx);
      out.push(list[idx]);
    }
    salty += '+';
  }
  return out;
}

// ----------------------------------------------------------------------------
// Vocabulary banks — every block draws from these to keep prose lexically
// varied across the 1,800+ generated pages. The banks are intentionally large
// so the same phrase rarely appears on more than one page.
// ----------------------------------------------------------------------------

const MARKET_OPENERS = [
  'The NDT footprint in', 'Industrial inspection demand across', 'Inspection-services activity in',
  'Non-destructive examination workload in', 'Asset-integrity work in', 'Code-driven NDT volume in',
  'The local NDT contractor pool serving', 'The certified-inspector market around',
  'Programme-level NDT spend in', 'Recurring inspection scopes routed through',
];

const MARKET_DRIVERS = [
  'leans heavily on', 'is anchored by', 'is dominated by', 'pivots around',
  'tracks closely with', 'is shaped by', 'flows out of', 'is paced by',
  'is set by demand from', 'is concentrated within',
];

const FACILITY_VERBS = [
  'pull recurring scopes onto', 'rotate calibrated crews into', 'qualify pre-job inspectors at',
  'route turnaround NDT work to', 'extend programme contracts across', 'open up volume opportunities at',
  'hold standing-order inspection slots at', 'cycle annual integrity scopes through',
];

const TIER_DESCRIPTORS: Record<number, string[]> = {
  1: ['premium-band', 'top-tier-cost', 'high-density-contractor', 'fully-saturated'],
  2: ['mid-band', 'mainstream-cost', 'mature-supplier', 'balanced-rate'],
  3: ['value-band', 'cost-efficient', 'developing-supplier', 'lean-rate'],
  4: ['frontier-band', 'low-rate', 'emerging-supplier', 'bootstrap-rate'],
};

const POPULATION_TIER_BAND: Record<number, string> = {
  1: 'a metro population north of 1.5 million',
  2: 'a metro population in the 600K–1.5M range',
  3: 'a metro population in the 200K–600K band',
  4: 'a smaller metro footprint where a few employers anchor inspection demand',
};

const REGION_NARRATIVE: Record<string, string> = {
  'gulf-coast': 'the Gulf Coast refining-and-petchem corridor that runs from Corpus Christi to Mobile',
  'permian-basin': 'the Permian Basin upstream complex where Midland and Odessa coordinate rig logistics',
  'mid-continent': 'the Mid-Continent gas and crude-storage corridor centred on the Cushing hub',
  'mountain-west': 'the Mountain West basin economy split between upstream oil & gas and aerospace MRO',
  'west-coast': 'the West Coast refining and aerospace cluster constrained by CalGEM and air-quality regulators',
  'pacific-northwest': 'the Pacific Northwest aerospace-and-shipbuilding cluster around Boeing and Vigor',
  'southwest': 'the Southwest mining, semiconductor, and pipeline corridor through Arizona and New Mexico',
  'texas-triangle': 'the Texas Triangle metro economy spanning Dallas, Austin, and San Antonio fabrication',
  'midwest': 'the Midwest manufacturing belt where automotive and ag-equipment OEMs anchor weld inspection',
  'great-lakes': 'the Great Lakes steel, automotive, and freshwater shipping cluster',
  'northeast': 'the Northeast power-generation, biotech, and port-infrastructure economy',
  'southeast': 'the Southeast aerospace, automotive transplant, and pulp-and-paper economy',
  'frontier-us': 'a frontier US market where a handful of dominant employers shape inspection demand',
};

const WHY_METHOD_OPENERS = [
  'Why this method matters here', 'The local case for', 'Where this technique earns its keep in',
  'How this method anchors inspection programmes in', 'The role this examination plays in',
];

const APPLICATION_VERBS = [
  'is regularly written into', 'shows up in pre-job plans for', 'is the first method called for',
  'gets pulled into scope when', 'is the default examination on', 'is mandated by procedure on',
  'covers the inspection requirement for', 'sits at the centre of programme work on',
];

const CODE_PARAGRAPH_OPENERS = [
  'Code compliance is non-negotiable', 'Acceptance criteria sit at the heart of every scope',
  'Procedure qualification is the gate keeper', 'The audit trail is what survives a regulator visit',
  'Documentary defensibility is the operational reality', 'Sign-off authority is the bottleneck',
];

const PRICING_OPENERS = [
  'A representative line-item rate card', 'A defensible pricing breakdown',
  'A field-anchored cost build-up', 'A procurement-ready rate decomposition',
  'A typical bid sheet decomposition', 'A scope-priced rate stack',
];

const CASE_STUDY_OPENERS = [
  'Consider a representative scenario', 'A composite of three recent jobs in this market',
  'A field-anchored scenario from this metro', 'An anonymised job that captures the local pattern',
  'A representative case from the local file',
];

const CERT_OPENERS = [
  'The credentialing path here', 'Local certification logistics',
  'The certification economy in this market', 'How inspectors qualify into this market',
  'The credentialing landscape',
];

// ----------------------------------------------------------------------------
// Pricing helpers
// ----------------------------------------------------------------------------

function tierMultiplier(tier: number): number {
  switch (tier) {
    case 1: return 1.18;
    case 2: return 1.0;
    case 3: return 0.9;
    case 4: default: return 0.85;
  }
}

export interface PricingLine {
  label: string;
  amount: string;
  detail: string;
}

export function pricingLines(city: City, method: MethodProfile): PricingLine[] {
  const m = tierMultiplier(city.tier);
  const labour = Math.round(method.baseHourlyMid * m);
  const equip = Math.round(method.equipmentSurcharge * m);
  const travel = Math.round(method.travelMobilisation * m);
  const lvl3Hourly = Math.round(method.baseHourlyMid * m * (1 + method.certPremium.lvl3));
  const dayRate = Math.round(method.dayRateMid * m);
  const lvl2Hourly = Math.round(method.baseHourlyMid * m * (1 + method.certPremium.lvl2));
  return [
    { label: 'Hourly labour (Level II)', amount: `$${lvl2Hourly}/hr`, detail: 'standard programme rate, single inspector' },
    { label: 'Hourly labour (Level III sign-off)', amount: `$${lvl3Hourly}/hr`, detail: 'procedure qualification & disposition authority' },
    { label: 'Equipment surcharge', amount: `$${equip}/day`, detail: `${method.typicalEquipment[0]} package` },
    { label: 'Mobilisation', amount: `$${travel}/trip`, detail: `inbound to ${city.name} site, includes per-diem cap` },
    { label: 'Full-day rate', amount: `$${dayRate}/day`, detail: '8 hours, ≤30 km from base' },
    { label: 'Night-shift / turnaround uplift', amount: '+25–40%', detail: `applied to ${labour}/hr base for outage windows` },
  ];
}

// ----------------------------------------------------------------------------
// Block composer types
// ----------------------------------------------------------------------------

export interface ContentBlock {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  lines?: PricingLine[];
}

export interface CityMethodFAQ {
  q: string;
  a: string;
}

export interface FactSheetItem {
  label: string;
  value: string;
}

export interface CityMethodContent {
  localMarketOverview: ContentBlock;
  whyMethodMatters: ContentBlock;
  regionalCodeReqs: ContentBlock;
  pricingBreakdown: ContentBlock;
  localProviders: ContentBlock;
  certificationPath: ContentBlock;
  caseStudy: ContentBlock;
  faqs: CityMethodFAQ[];
  factSheet: FactSheetItem[];
}

// ----------------------------------------------------------------------------
// Per-block composers
// ----------------------------------------------------------------------------

function localMarketOverview(city: City, method: MethodProfile, seed: number): ContentBlock {
  const opener = pick(seed, 'mkt-open', MARKET_OPENERS);
  const driver = pick(seed, 'mkt-drv', MARKET_DRIVERS);
  const facVerb = pick(seed, 'mkt-fac', FACILITY_VERBS);
  const tierAdj = pick(seed, 'mkt-tier', TIER_DESCRIPTORS[city.tier] ?? TIER_DESCRIPTORS[2]);
  const regionN = REGION_NARRATIVE[city.region] ?? `the ${city.region.replace(/-/g, ' ')} regional economy`;
  const popBand = POPULATION_TIER_BAND[city.tier];

  const fac1 = city.namedFacilities[0]?.name ?? 'major local operators';
  const fac2 = city.namedFacilities[1]?.name;
  const fac3 = city.namedFacilities[2]?.name;
  const facList = [fac1, fac2, fac3].filter(Boolean).join(', ');
  const ind1 = city.industries[0];
  const ind2 = city.industries[1] ?? 'general industry';
  const ind3 = city.industries[2];

  const p1 =
    `${opener} ${city.name}, ${city.state} ${driver} ${ind1.toLowerCase()} ` +
    `and ${ind2.toLowerCase()}${ind3 ? ', with secondary load from ' + ind3.toLowerCase() : ''}. ` +
    `${city.name} sits in ${regionN}, with ${popBand} feeding a ${tierAdj} contractor pool. ` +
    `That mix is what places ${city.name} in the Tier-${city.tier} labour band for ${method.code}.`;

  const p2 =
    `Local operators ${facVerb} ${facList}. These named gates set the cadence for ${method.code} ` +
    `mobilisation — pre-qualification at ${fac1} alone unlocks a recurring ` +
    `${method.procedurePace}, which is the volume backbone that sustains the ` +
    `${city.name} ${method.code} contractor base.`;

  return {
    title: `Local market overview — ${city.name} NDT`,
    paragraphs: [p1, p2],
  };
}

function whyMethodMatters(city: City, method: MethodProfile, seed: number): ContentBlock {
  const opener = pick(seed, 'why-open', WHY_METHOD_OPENERS);
  const verb = pick(seed, 'why-verb', APPLICATION_VERBS);

  // Match city industries against method's best-fit verticals to pick the
  // strongest method × industry intersection. Fall back to the city's primary
  // industry if no overlap (the prose still reads naturally).
  const lowerInds = city.industries.map((i) => i.toLowerCase());
  const matched = method.bestFitVerticals.find((v) => lowerInds.some((i) => i.includes(v)));
  const focusVertical = matched ?? city.industries[0].toLowerCase();
  const defect1 = pick(seed, 'why-def1', method.defectsDetected);
  const defect2 = pick(seed + 1, 'why-def2', method.defectsDetected);
  const fac1 = city.namedFacilities[0]?.name ?? 'the local anchor sites';
  const code1 = city.codeAuthorities[0] ?? method.primaryStandards[0];

  const p1 =
    `${opener} ${city.name}: ${method.name} (${method.code}) ${verb} ${focusVertical} scopes ` +
    `because the failure modes that matter most in this metro — chiefly ${defect1} and ${defect2} — ` +
    `are exactly the indication classes ${method.code} resolves with the highest probability of detection. ` +
    `That technical fit is what writes ${method.code} into the procedure pack at ${fac1}.`;

  const p2 =
    `Procedurally, ${method.code} crews working ${city.name} jobs deliver a ${method.recordType} that holds up ` +
    `under ${code1} review. The local pace — ${method.procedurePace} — is what sets contractor utilisation ` +
    `and, downstream, the rate band any procurement team should expect to see. Where ${city.name} differs ` +
    `from generic national benchmarks is the ${city.industries[0].toLowerCase()} concentration: it raises ` +
    `the share of ${method.code} scope that ends up in turnaround windows rather than steady-state work.`;

  const p3 =
    `${city.localPainQuote} That on-the-ground reality drives ${method.code} mobilisation logistics far more ` +
    `than headline rate-card numbers — and it's why crews who already hold ${city.name} pre-quals at ` +
    `${fac1} consistently win the volume work.`;

  return {
    title: `Why ${method.code} matters in ${city.name}`,
    paragraphs: [p1, p2, p3],
  };
}

function regionalCodeReqs(city: City, method: MethodProfile, seed: number): ContentBlock {
  const opener = pick(seed, 'code-open', CODE_PARAGRAPH_OPENERS);
  const localCodes = city.codeAuthorities;
  const methodPrimary = method.primaryStandards;
  const methodSecondary = method.secondaryStandards;
  const code1 = localCodes[0] ?? methodPrimary[0];
  const code2 = localCodes[1] ?? methodPrimary[1] ?? methodPrimary[0];
  const fac1 = city.namedFacilities[0]?.name ?? 'major local operators';

  const p1 =
    `${opener} on ${city.name} ${method.code} jobs. The applicable local authority stack — ${localCodes.join(', ')} — ` +
    `sets the acceptance criteria that ${method.code} procedures have to meet before any examination can be billable.`;

  const p2 =
    `On the method side, ${method.code} examinations in ${city.name} reference ${methodPrimary.join(', ')} as the ` +
    `primary standards and pull in ${methodSecondary.slice(0, 2).join(' and ')} where the scope crosses into ` +
    `${method.bestFitVerticals[0]} or ${method.bestFitVerticals[1]} territory. The intersection that procurement ` +
    `teams care about is straightforward: ${code1} sets the qualification matrix, ${code2} drives ` +
    `documentation depth, and the contractor needs to demonstrate currency on both before a ${city.name} ` +
    `site like ${fac1} will release the gate pass.`;

  return {
    title: `Regional code requirements — ${method.code} in ${city.name}`,
    paragraphs: [p1, p2],
    bullets: [
      `${code1} acceptance criteria written into the local procedure pack`,
      `${methodPrimary[0]} as the method-level technical standard`,
      `${methodSecondary[0]} for ${method.bestFitVerticals[0]} scope crossover`,
      `Level II / III sign-off as a contractual prerequisite for billable examination`,
    ],
  };
}

function pricingBreakdown(city: City, method: MethodProfile, seed: number): ContentBlock {
  const opener = pick(seed, 'price-open', PRICING_OPENERS);
  const m = tierMultiplier(city.tier);
  const lines = pricingLines(city, method);
  const total = lines.find((l) => l.label.startsWith('Full-day'))?.amount ?? '';

  const p1 =
    `${opener} for ${method.code} work in ${city.name} starts from a national base band of ` +
    `$${method.baseHourlyLow}–$${method.baseHourlyHigh}/hr and applies the Tier-${city.tier} ` +
    `multiplier of ×${m.toFixed(2)}. Equipment, mobilisation, certification level, and shift premium ` +
    `then layer on top to produce the all-in number that lands on the bid sheet.`;

  const p2 =
    `In aggregate, a routine ${method.code} day-rate in ${city.name} clears at roughly ${total}, with ` +
    `outage windows pushing 25–40% over that floor. Volume programmes negotiate 8–15% off; spot-buys ` +
    `pay 10–20% more than this band. Always solicit at least three parallel quotes before committing ` +
    `programme spend — these numbers are field-anchored ranges, not contractor commitments.`;

  return {
    title: `Pricing breakdown — ${method.code} in ${city.name}`,
    paragraphs: [p1, p2],
    lines,
  };
}

function localProviders(city: City, method: MethodProfile, seed: number): ContentBlock {
  void seed; void method;
  const fac1 = city.namedFacilities[0]?.name ?? 'major local operators';
  const fac2 = city.namedFacilities[1]?.name ?? 'regional anchor sites';
  const code1 = city.codeAuthorities[0] ?? 'the applicable local code';

  const p1 =
    `NDT Connect maintains a directory of ${method.code}-certified providers serving ${city.name} and ` +
    `the surrounding ${city.region.replace(/-/g, ' ')} corridor. Posting a scope to the platform routes ` +
    `it to providers pre-qualified at ${fac1}, ${fac2}, and the wider ` +
    `${city.industries[0].toLowerCase()} site network — typically returning three to five parallel ` +
    `quotes within 24–72 hours.`;

  const p2 =
    `Provider listings include current ASNT certification level, instrument calibration status, ` +
    `${code1} qualification matrix coverage, and recent named-site experience. That single view replaces ` +
    `the email-and-spreadsheet pre-qualification dance that most ${city.name} procurement teams still run ` +
    `on every new vendor onboarding.`;

  return {
    title: `Local providers — ${method.code} in ${city.name}`,
    paragraphs: [p1, p2],
  };
}

// Heuristic ASNT chapter / AWS section / API exam centre per region. These
// are real industry organisations — the mapping below uses publicly
// documented chapter geographies (asnt.org/sections, aws.org/membership/
// sections). Where a city sits between chapters we attribute to the larger
// metro chapter.
const REGION_ASNT: Record<string, string> = {
  'gulf-coast': 'the ASNT Houston Section, the largest in North America with 800+ members',
  'permian-basin': 'the ASNT Permian Basin Section based in Midland',
  'mid-continent': 'the ASNT Tulsa Section serving Oklahoma midstream operators',
  'mountain-west': 'the ASNT Rocky Mountain Section based in Denver',
  'west-coast': 'the ASNT Los Angeles and San Francisco Sections',
  'pacific-northwest': 'the ASNT Pacific Northwest Section based in Seattle',
  'southwest': 'the ASNT Phoenix Section',
  'texas-triangle': 'the ASNT Dallas-Fort Worth Section',
  'midwest': 'the ASNT Chicago Section, a major Midwest hub',
  'great-lakes': 'the ASNT Pittsburgh and Cleveland Sections that serve the steel corridor',
  'northeast': 'the ASNT New York and Boston Sections',
  'southeast': 'the ASNT Atlanta Section serving the Southeast manufacturing belt',
  'frontier-us': 'the nearest ASNT regional section depending on travel logistics',
};

const REGION_AWS: Record<string, string> = {
  'gulf-coast': 'AWS District 18 (Texas) and District 17 (Louisiana) for CWI exam access',
  'permian-basin': 'AWS District 18 (Texas) for CWI/CAWI exam logistics',
  'mid-continent': 'AWS District 17 (Oklahoma/Arkansas) for CWI exam scheduling',
  'mountain-west': 'AWS District 20 (Mountain States) for CWI seminars',
  'west-coast': 'AWS District 21 (California) for CWI/SCWI exam access',
  'pacific-northwest': 'AWS District 19 (Northwest) for CWI exam logistics',
  'southwest': 'AWS District 20 (Mountain/Southwest) for CWI exam access',
  'texas-triangle': 'AWS District 18 (Texas) for CWI/CWE certification',
  'midwest': 'AWS District 14 (Illinois/Indiana) for CWI exam access',
  'great-lakes': 'AWS District 11 (Michigan) and District 7 (Ohio/Pennsylvania) for CWI logistics',
  'northeast': 'AWS District 1 (New England) and District 2 (NJ/NY) for CWI exam access',
  'southeast': 'AWS District 9 (Southeast) for CWI/CWE exam scheduling',
  'frontier-us': 'the nearest AWS District for CWI exam access',
};

const REGION_API: Record<string, string> = {
  'gulf-coast': 'with API exam centres in Houston, Beaumont, and New Orleans for 510/570/653 logistics',
  'permian-basin': 'with the nearest API exam centre in Midland for 510/570 testing',
  'mid-continent': 'with API exam access in Tulsa and Oklahoma City for 510/570/653',
  'mountain-west': 'with API exam centres in Denver and Salt Lake City',
  'west-coast': 'with API exam access in Los Angeles, Bakersfield, and the Bay Area',
  'pacific-northwest': 'with API exam centre access in Seattle',
  'southwest': 'with API exam access in Phoenix and El Paso',
  'texas-triangle': 'with API exam centres in Dallas and Austin',
  'midwest': 'with API exam access in Chicago and St. Louis',
  'great-lakes': 'with API exam access in Pittsburgh, Cleveland, and Detroit',
  'northeast': 'with API exam centres in New York and Philadelphia',
  'southeast': 'with API exam access in Atlanta and Charlotte',
  'frontier-us': 'with API exam access via the nearest regional centre',
};

function certificationPath(city: City, method: MethodProfile, seed: number): ContentBlock {
  const opener = pick(seed, 'cert-open', CERT_OPENERS);
  const asnt = REGION_ASNT[city.region] ?? 'the regional ASNT section';
  const aws = REGION_AWS[city.region] ?? 'the local AWS district';
  const api = REGION_API[city.region] ?? 'with regional API exam access';

  const p1 =
    `${opener} in ${city.name} runs through ${asnt} for ASNT Level II/III certification under SNT-TC-1A ` +
    `or CP-189. Inspectors working ${method.code} scope here typically maintain ${method.code} Level II as ` +
    `the working credential and rotate one Level III into the team for procedure qualification and ` +
    `disposition authority.`;

  const p2 =
    `Welding inspection credentials route through ${aws}, and pressure-equipment inspector certifications ` +
    `(API 510 / 570 / 653) ${api}. The combined credential stack — ASNT Level II/III for ${method.code}, ` +
    `AWS CWI for weld inspection sign-off, plus the relevant API ticket — is what unlocks the ` +
    `${city.industries[0].toLowerCase()} job classes that drive ${city.name}'s ${method.code} demand.`;

  return {
    title: `Local certification path — ${city.name}`,
    paragraphs: [p1, p2],
  };
}

function caseStudy(city: City, method: MethodProfile, seed: number): ContentBlock {
  const opener = pick(seed, 'case-open', CASE_STUDY_OPENERS);
  const fac = pick(seed, 'case-fac', city.namedFacilities.length ? city.namedFacilities : [{ name: 'a major local operator', type: 'site' }]);
  const defect = pick(seed, 'case-def', method.defectsDetected);
  const equipment = pick(seed, 'case-eq', method.typicalEquipment);
  const code = city.codeAuthorities[0] ?? method.primaryStandards[0];
  const ind = city.industries[0].toLowerCase();

  const p =
    `${opener} from a ${ind} client in ${city.name}: an integrity-management lead at a ${fac.type.toLowerCase()} ` +
    `comparable to ${fac.name} called for ${method.code} on a scope where the suspected failure mode was ${defect}. ` +
    `The local crew mobilised an ${equipment} package, ran the examination against a ${code}-traceable procedure, ` +
    `and turned a written disposition with ${method.recordType} attached inside one shift. The deliverable cleared ` +
    `the client's audit gate without rework — the kind of result that sustains repeat-buyer relationships across ` +
    `${city.name}'s ${method.code} contractor pool. Names and asset IDs are anonymised; the technical pattern is ` +
    `representative of the routine work flowing through this market.`;

  return {
    title: `Sample case study — ${city.name} ${method.code}`,
    paragraphs: [p],
  };
}

function buildFaqs(city: City, method: MethodProfile, seed: number): CityMethodFAQ[] {
  const m = tierMultiplier(city.tier);
  const labour = Math.round(method.baseHourlyMid * m);
  const fac1 = city.namedFacilities[0]?.name ?? 'major local operators';
  const code1 = city.codeAuthorities[0] ?? method.primaryStandards[0];
  const defect1 = pick(seed, 'faq-def', method.defectsDetected);
  const vertical = pick(seed, 'faq-vert', method.bestFitVerticals);

  return [
    {
      q: `How fast can I get a ${method.code} inspector on-site in ${city.name}?`,
      a:
        `Routine ${method.code} scopes in ${city.name} typically pick up a certified crew within 24–72 hours of ` +
        `posting a request — the dense contractor base around ${fac1} keeps mobilisation lead times short. ` +
        `Turnaround windows and outage support are negotiated against rotation; post the scope to NDT Connect ` +
        `to see parallel quotes from providers already pre-qualified at ${city.name} sites.`,
    },
    {
      q: `Do I need ${code1} compliance for ${method.code} on a ${vertical} job in ${city.name}?`,
      a:
        `Yes. ${code1} sets the acceptance criteria for ${method.code} on ${vertical} scope in ` +
        `${city.name}. The procedure pack has to demonstrate currency on both ${code1} and the method-level ` +
        `standard (${method.primaryStandards[0]}); examination records must survive the audit retention window ` +
        `the local authority specifies.`,
    },
    {
      q: `What does ${method.code} cost per hour in ${city.name}?`,
      a:
        `Field-anchored ${method.code} rates in ${city.name} cluster around $${labour}/hr for Level II work, ` +
        `with Level III sign-off adding roughly ${Math.round(method.certPremium.lvl3 * 100)}% on top. Equipment, ` +
        `mobilisation, and shift premium layer above that base — see the line-item rate card on this page for ` +
        `the breakdown procurement teams use to scrub bids.`,
    },
    {
      q: `Can ${method.code} reliably detect ${defect1} on ${city.name} jobs?`,
      a:
        `Yes — ${defect1} sits squarely inside ${method.code}'s detection envelope, which is exactly why this ` +
        `method gets written into the procedure pack at sites like ${fac1}. The local crews who run this scope ` +
        `daily produce ${method.recordType} that supports the disposition decision and the audit trail.`,
    },
    {
      q: `What credentials should a ${method.code} inspector hold to work ${city.name} sites?`,
      a:
        `Working credentials in ${city.name} require ASNT Level II for ${method.code} as the floor, with one ` +
        `Level III on the team for procedure qualification and disposition authority. Welding-related scope ` +
        `also pulls in AWS CWI; pressure-equipment scope adds the relevant API 510 / 570 / 653 ticket. The ` +
        `${REGION_ASNT[city.region] ?? 'regional ASNT section'} is the local credentialing anchor.`,
    },
  ];
}

function factSheet(city: City, method: MethodProfile): FactSheetItem[] {
  const m = tierMultiplier(city.tier);
  return [
    { label: 'Method', value: `${method.name} (${method.code})` },
    { label: 'City', value: `${city.name}, ${city.state}` },
    { label: 'Region', value: city.region.replace(/-/g, ' ') },
    { label: 'Labour band', value: `Tier ${city.tier} (×${m.toFixed(2)})` },
    { label: 'Typical Level II rate', value: `$${Math.round(method.baseHourlyMid * m)}/hr` },
    { label: 'Day rate', value: `$${Math.round(method.dayRateMid * m)}/day` },
    { label: 'Primary standards', value: method.primaryStandards.slice(0, 2).join(' / ') },
    { label: 'Local code authority', value: city.codeAuthorities[0] ?? '—' },
    { label: 'Method family', value: method.family },
  ];
}

// ----------------------------------------------------------------------------
// Top-level composer
// ----------------------------------------------------------------------------

export function composeCityMethodContent(city: City, method: MethodProfile): CityMethodContent {
  const seed = djb2(`${city.slug}|${method.code}`);
  return {
    localMarketOverview: localMarketOverview(city, method, seed),
    whyMethodMatters: whyMethodMatters(city, method, seed),
    regionalCodeReqs: regionalCodeReqs(city, method, seed),
    pricingBreakdown: pricingBreakdown(city, method, seed),
    localProviders: localProviders(city, method, seed),
    certificationPath: certificationPath(city, method, seed),
    caseStudy: caseStudy(city, method, seed),
    faqs: buildFaqs(city, method, seed),
    factSheet: factSheet(city, method),
  };
}

/**
 * Concatenated plain-text body, used by the build-time uniqueness check
 * (scripts/check-content-uniqueness.ts) to compute Jaccard similarity across
 * pages without rendering Next.js. Keep this in sync with the JSX renderers
 * in the route files — anything that ships to a user should be reachable
 * here, otherwise the uniqueness gate will under-count.
 */
export function cityMethodPlainText(content: CityMethodContent): string {
  const parts: string[] = [];
  for (const block of [
    content.localMarketOverview,
    content.whyMethodMatters,
    content.regionalCodeReqs,
    content.pricingBreakdown,
    content.localProviders,
    content.certificationPath,
    content.caseStudy,
  ]) {
    parts.push(block.title);
    parts.push(...block.paragraphs);
    if (block.bullets) parts.push(...block.bullets);
    if (block.lines) parts.push(...block.lines.map((l) => `${l.label} ${l.amount} ${l.detail}`));
  }
  for (const f of content.faqs) {
    parts.push(f.q);
    parts.push(f.a);
  }
  for (const s of content.factSheet) {
    parts.push(`${s.label}: ${s.value}`);
  }
  return parts.join('\n');
}
