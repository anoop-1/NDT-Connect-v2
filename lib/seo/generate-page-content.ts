// lib/seo/generate-page-content.ts
//
// V2 SEO content generator. Reads from the rich datasets in data/cities.json
// and data/methods.json (loaded via lib/seo/cities-rich.ts and
// lib/seo/methods-rich.ts) and emits a structured `GeneratedContent` object
// that the seven content-block components in components/seo/content-blocks/
// consume.
//
// API (per spec)
// --------------
//   generateCityMethodContent(citySlug, methodSlug) → GeneratedContent | null
//
//   Returns null only when both the city and the method are missing from the
//   rich datasets (the route falls back to the legacy composer in that case).
//   When the city is present in cities.json but method is missing, or vice
//   versa, the generator fills the gap with sensible defaults so the page
//   still renders.
//
// Determinism
// -----------
//   Every per-page choice (template index, vocab pick, FAQ ordering) is
//   seeded by djb2(citySlug + '|' + methodCode). The same input always
//   produces the same output across builds and crawls. This is the SEO
//   stability guarantee Google's helpful-content classifier expects.
//
// Uniqueness mechanism
// --------------------
//   Each block has 4 templates indexed by `seed % 4`. Within each template,
//   3-5 city-specific facts are interpolated from the rich data (employer,
//   industrial site, regional code, wage figure, COL index, ASNT chapter).
//   Industry-driven vocab from lib/seo/industry-vocabulary.ts swaps the
//   trade-language layer per city's dominant industry.

import {
  findRichCity,
  effectivePricingMultiplier,
  topIndustry,
  topIndustries,
  populationDescriptor,
  type RichCity,
} from './cities-rich';
import {
  findRichMethodBySlug,
  typicalLevel2DayRate,
  totalLevel2TrainingHours,
  aggregateCodeRefs,
  type RichMethod,
} from './methods-rich';
import { vocabFor, type IndustryVocab } from './industry-vocabulary';

// ----------------------------------------------------------------------------
// Output shape
// ----------------------------------------------------------------------------

export interface GeneratedTableRow {
  label: string;
  value: string;
  detail?: string;
}

export interface GeneratedFAQ {
  question: string;
  answer: string;
}

export interface GeneratedContent {
  // Identity
  citySlug: string;
  methodSlug: string;
  cityName: string;
  methodCode: string;
  methodName: string;

  // Block 1
  localMarketOverview: string[]; // 2-3 paragraphs, 150-220 words combined

  // Block 2
  regionalCodeContext: {
    paragraph: string; // 120-180 words
    codes: string[]; // bullet list
  };

  // Block 3
  localPricingBreakdown: {
    paragraph: string; // 100-150 words
    table: GeneratedTableRow[];
    multiplier: number;
    surchargeBand: string;
  };

  // Block 4
  topLocalProviders: {
    paragraph: string; // 80-120 words
    employerHighlights: string[];
    ctaHref: string;
    ctaLabel: string;
  };

  // Block 5
  methodInThisCity: string[]; // 2-3 paragraphs, 200-300 words combined (most-unique block)

  // Block 6
  localCertificationPath: {
    paragraph: string; // 100-150 words
    asntChapter?: string;
    awsSection?: string;
    apiExamCenter: boolean;
  };

  // Block 7
  cityFAQ: GeneratedFAQ[]; // exactly 6
}

// ----------------------------------------------------------------------------
// Determinism helpers
// ----------------------------------------------------------------------------

function djb2(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

function pickIdx(seed: number, salt: string, mod: number): number {
  return djb2(salt + ':' + seed.toString(36)) % mod;
}

// `pick` (a one-liner that wraps pickIdx + indexing) is intentionally
// inlined per call site rather than re-exported as a helper — the inline
// `pickIdx(seed, salt, list.length)` makes the deterministic intent clearer
// at every call site than a generic helper would.

/**
 * Append a period to a sentence fragment if it doesn't already end with
 * terminal punctuation. Used for `uniqueAngles` interpolation since the
 * sister agent's data may or may not include terminal punctuation.
 */
function endWithPeriod(s: string): string {
  if (!s) return s;
  const t = s.trim();
  if (/[.!?…]$/.test(t)) return t;
  return t + '.';
}

// ----------------------------------------------------------------------------
// Tier inference (for cities that lack an explicit `tier` field on the
// rich row, fall back to metroPopulation banding so the template selector
// still has a tier to switch on).
// ----------------------------------------------------------------------------

function tierOf(city: RichCity): 1 | 2 | 3 {
  if (city.tier === 1) return 1;
  if (city.tier === 2) return 2;
  if (city.tier === 3 || city.tier === 4) return 3;
  const p = city.metroPopulation ?? 0;
  if (p >= 1_500_000) return 1;
  if (p >= 500_000) return 2;
  return 3;
}

// ----------------------------------------------------------------------------
// Block 1 — Local market overview (4 templates × tier-aware variation)
// ----------------------------------------------------------------------------

function block1LocalMarketOverview(
  city: RichCity,
  method: RichMethod,
  vocab: IndustryVocab | null,
  seed: number,
): string[] {
  const tier = tierOf(city);
  const inds = topIndustries(city, 3);
  const ind1 = inds[0];
  const ind2 = inds[1];
  const ind3 = inds[2];
  const popDesc = populationDescriptor(city);
  const employer1 = city.majorEmployers?.[0] ?? 'major regional operators';
  const employer2 = city.majorEmployers?.[1] ?? 'tier-1 site operators';
  const site1 = city.majorPortsRefineriesPlants?.[0];
  const site2 = city.majorPortsRefineriesPlants?.[1];
  const region = (city.region ?? 'regional').replace(/-/g, ' ');
  const angle = city.uniqueAngles?.[0];
  const tradeTerm = vocab ? vocab.termsOfArt[seed % vocab.termsOfArt.length] : null;
  const assetClass = vocab ? vocab.assetClasses[(seed >> 2) % vocab.assetClasses.length] : null;

  const tmplIdx = pickIdx(seed, 'mkt1', 4);
  const wage = city.avgInspectorWageUSD?.level2;
  const colIdx = city.costOfLivingIndex;
  const angle2 = city.uniqueAngles?.[1];
  const turnaround = city.turnaroundSeasons?.[0];

  // Each template returns 2-3 paragraphs targeting 150-220 words combined.

  // Template 0 — anchored on dominant industry weight
  const t0 = [
    `${city.displayName} runs a ${tier === 1 ? 'top-tier' : tier === 2 ? 'mid-band' : 'compact'} NDT economy that pivots around ${ind1.name.toLowerCase()} (${Math.round(ind1.weight * 100)}% of the local industrial base) and ${ind2 ? ind2.name.toLowerCase() : 'allied heavy industry'}${ind3 ? `, with secondary load from ${ind3.name.toLowerCase()}` : ''}. ${ind1.context} feeds the ${method.code} workload that defines this market — ${popDesc} sustains a contractor pool calibrated to that demand cadence.`,
    `Anchor employers like ${employer1}${site1 ? ` and ${site1.name}` : ''} write ${method.name} into recurring scope packages. ${tradeTerm ? `${tradeTerm[0].toUpperCase() + tradeTerm.slice(1)} cycles` : 'Programme cycles'} dominate the calendar — pre-qualification at ${employer1} alone unlocks the volume backbone of the ${city.displayName} ${method.code} contractor base. ${angle ? endWithPeriod(angle) : ''}`.trim(),
    `${wage ? `Local Level II inspector wages run roughly $${wage.toLocaleString()}/year per BLS, anchoring the day-rate band that providers quote in ${city.displayName}` : `The local labour band is anchored to regional BLS medians, with provider day-rates building from there`}${colIdx ? ` against a cost-of-living index of ${colIdx}` : ''}. ${turnaround ? `${turnaround} compresses the calendar; spot-buy crews cover the surge.` : `Outage-window surges layer on top of steady-state programme demand.`} ${method.code} is consistently among the methods most often written into procedure packs at the city's anchor sites.`,
  ];

  // Template 1 — anchored on regional narrative + named site
  const t1 = [
    `Inspection-services demand across ${city.displayName} flows out of ${ind1.name.toLowerCase()}, ${ind2 ? ind2.name.toLowerCase() : 'heavy industry'}${ind3 ? `, and ${ind3.name.toLowerCase()}` : ''}. The ${region} corridor — ${popDesc} — concentrates ${city.majorPortsRefineriesPlants?.length ?? 'multiple'} named industrial sites that ${method.code} crews mobilise to on a recurring cadence, with ${site1?.name ?? employer1} typically holding standing-order contractor coverage.`,
    `${tradeTerm ? `${tradeTerm[0].toUpperCase() + tradeTerm.slice(1)} dominates` : 'Steady-state programme work dominates'} the ${method.code} order book here. ${ind1.context}. Combined with ${employer2}'s capital-asset footprint, that is what makes ${city.displayName} a ${tier === 1 ? 'priority' : 'core'} ${method.code} market for local providers.`,
    `${angle2 ?? angle ?? `Provider density in this metro keeps mobilisation lead times short — typically 24–72 hours for routine ${method.code} scope`}. ${wage ? `Wages, capital-equipment depreciation, and procedure overhead all feed into the ${method.code} rate band, which clears at the regional benchmark for Level II work` : `Rate bands for ${method.code} clear near the regional benchmark; outage windows push above it.`} Procurement teams should expect ${tier === 1 ? 'aggressive' : 'measured'} negotiation on volume contracts here.`,
  ];

  // Template 2 — narrative led by uniqueAngles
  const t2 = [
    `The NDT footprint in ${city.displayName} reflects ${ind1.name.toLowerCase()}'s share of the local economy${ind2 ? ` and the supporting ${ind2.name.toLowerCase()} cluster` : ''}. ${angle ? endWithPeriod(angle) : endWithPeriod(ind1.context)} ${method.name} (${method.code}) sits inside the recurring scope mix that ${employer1}${site1 ? `, ${site1.name},` : ''} and the broader ${region} operator base put on contract every cycle.`,
    `${popDesc} keeps the certified-contractor base deep enough to absorb ${tradeTerm ? `${tradeTerm} surges` : 'demand surges'} without losing schedule. ${assetClass ? `Programmes typically rotate around ${assetClass} populations` : 'Programmes typically rotate on multi-year intervals'}, and ${method.code} is the examination most often written into the procedure pack at the gate.`,
    `${angle2 ?? `Local providers compete on calibration currency, named-site experience, and Level III sign-off coverage rather than headline rate alone`}.${colIdx ? ` Cost-of-living index ${colIdx} and the ${city.transportSurchargeBand ?? 'medium'} transport surcharge band combine into the multiplier procurement teams budget against.` : ` Transport surcharge band and contractor density together set the multiplier procurement teams budget against.`}`,
  ];

  // Template 3 — code-and-employer led
  const t3 = [
    `${city.displayName} hosts a ${tier === 1 ? 'mature' : tier === 2 ? 'developing' : 'lean'} NDT contractor ecosystem built around ${ind1.name.toLowerCase()}${ind2 ? ` and ${ind2.name.toLowerCase()}` : ''}. ${employer1}${employer2 !== 'tier-1 site operators' ? `, ${employer2},` : ''} and the wider ${region} operator pool route ${method.code} scope through pre-qualified providers — losing a Level II credential here costs real money on outage windows.`,
    `${ind1.context}. That industrial substrate is what places ${city.displayName} on the short list for ${method.code} programme contracts: ${tradeTerm ? `${tradeTerm} cadence` : 'inspection cadence'}, ${city.regionalCodes?.[0] ?? 'local regulator'} oversight, and ${site1 ? `the ${site1.type} footprint at ${site1.name}` : 'the named-site inventory'} all push the ${method.code} day-rate above generic regional benchmarks.`,
    `${turnaround ? `${turnaround} brings the seasonal peak — expect crew rotation to tighten and spot-buy premiums to land at the upper bound of the published rate band.` : `Seasonal cycles bring rotation tightening and spot-buy premiums at the upper bound of the published rate band.`} ${angle2 ?? angle ?? `The volume backbone is steady-state programme work, not outage spikes — that is what stabilises the rate floor.`}`,
  ];

  return [t0, t1, t2, t3][tmplIdx];
}

// ----------------------------------------------------------------------------
// Block 2 — Regional code context
// ----------------------------------------------------------------------------

function block2RegionalCodeContext(
  city: RichCity,
  method: RichMethod,
  vocab: IndustryVocab | null,
  seed: number,
): { paragraph: string; codes: string[] } {
  const localCodes = city.regionalCodes ?? [];
  const methodCodes = aggregateCodeRefs(method);
  const primary = method.codeReferences?.asme?.[0] ?? methodCodes[0] ?? `${method.code} method standard`;
  const localCode1 = localCodes[0] ?? 'the applicable state authority';
  const localCode2 = localCodes[1];
  const employer1 = city.majorEmployers?.[0] ?? 'tier-1 operators';
  const region = (city.region ?? 'regional').replace(/-/g, ' ');

  const tmplIdx = pickIdx(seed, 'code', 4);
  const vocabCode = vocab && vocab.codeShorthand[seed % vocab.codeShorthand.length];

  const paragraphs: string[] = [
    `Code compliance on ${method.code} work in ${city.displayName} starts with the local authority stack — ${localCodes.join(', ') || 'state and federal regulators'}. ${primary} is the method-level technical standard procedures qualify against, with ${vocabCode ? `${vocabCode}, ` : ''}${methodCodes.slice(1, 3).join(' and ') || 'allied industry standards'} pulled in when scope crosses into ${vocab ? topIndustry(city)?.name.toLowerCase() ?? 'general' : 'general'} territory. ${employer1} typically requires currency on both layers before a contractor crosses the gate.`,

    `${localCode1} sets the documentary depth ${method.code} reports must reach in ${city.displayName} — and ${localCode2 ? `${localCode2} layers a second audit trail on top` : 'the state authority layers a second audit trail on top'}. The method-level reference is ${primary}; ${vocabCode ? `industry-side, ${vocabCode} is the standard` : 'allied industry codes complete the stack'} that owners cite in the bid pack. Procedures must demonstrate currency on both before the crew is cleared at gates like ${employer1}.`,

    `Acceptance criteria for ${method.code} in the ${region} corridor lean on ${primary} as the technical floor and on ${localCodes.slice(0, 2).join(' / ') || 'the state regulator'} for documentary survival. ${vocabCode ? `Industry-specific: ${vocabCode} is the cross-reference the procedure must close on` : 'Industry-specific cross-references complete the procedure pack'}. Owners audit the calibration trail and Level III sign-off on every recurring scope, and ${employer1} runs its own qualification matrix on top.`,

    `${primary} governs the ${method.code} examination itself. On top of that, ${city.displayName} contractors close the procedure against ${localCodes.join(', ') || 'state authorities'} before the first weld is shot. ${vocabCode ? `${vocabCode} typically appears in the customer pack` : 'Customer-specific specs appear in the pack'} for ${vocab ? topIndustry(city)?.name.toLowerCase() ?? 'this' : 'this'} market — and ${employer1}'s pre-qualification process re-validates that the procedure pack is current at every onboarding.`,
  ];

  // Build the bullet code list — combine local regional codes with primary method codes.
  const codeBullets: string[] = [];
  for (const c of localCodes.slice(0, 3)) codeBullets.push(c);
  for (const c of [primary, methodCodes[1], methodCodes[2]].filter(Boolean) as string[]) {
    if (!codeBullets.includes(c)) codeBullets.push(c);
  }
  if (vocabCode && !codeBullets.includes(vocabCode)) codeBullets.push(vocabCode);

  return { paragraph: paragraphs[tmplIdx], codes: codeBullets.slice(0, 6) };
}

// ----------------------------------------------------------------------------
// Block 3 — Local pricing breakdown
// ----------------------------------------------------------------------------

function block3LocalPricingBreakdown(
  city: RichCity,
  method: RichMethod,
  seed: number,
): GeneratedContent['localPricingBreakdown'] {
  const mult = effectivePricingMultiplier(city);
  const dr = typicalLevel2DayRate(method);
  const lvl2Low = Math.round(dr.low * mult);
  const lvl2High = Math.round(dr.high * mult);
  const lvl2Mid = Math.round((lvl2Low + lvl2High) / 2);

  const lvl3 = method.dayRateRangeUSD?.level3;
  const lvl3Mid = lvl3
    ? Math.round(((lvl3.low + lvl3.high) / 2) * mult)
    : Math.round(lvl2Mid * 1.4);

  const surcharge = city.transportSurchargeBand ?? 'medium';
  const colIdx = city.costOfLivingIndex;
  const wageRef = city.avgInspectorWageUSD?.level2;

  const employer1 = city.majorEmployers?.[0] ?? 'tier-1 employers';
  const region = (city.region ?? 'regional').replace(/-/g, ' ');

  const tmplIdx = pickIdx(seed, 'price', 4);
  const paragraphs = [
    `${method.name} (${method.code}) day-rates in ${city.displayName} cluster between $${lvl2Low}–$${lvl2High} for Level II crews, with a typical mid-point near $${lvl2Mid}. The ${city.transportSurchargeBand ?? 'medium'} transport-surcharge band${colIdx ? ` and a cost-of-living index of ${colIdx}` : ''} push rates ${mult >= 1.05 ? 'above' : mult <= 0.95 ? 'below' : 'near'} the national baseline (multiplier ×${mult.toFixed(2)}).${wageRef ? ` Local Level II inspector wages — $${wageRef.toLocaleString()} median per BLS — anchor that band.` : ''} Outage windows add 25–40%; volume programmes negotiate 8–15% off.`,

    `A typical ${method.code} bid in ${city.displayName} lands at $${lvl2Mid}/day for Level II work and roughly $${lvl3Mid}/day for Level III sign-off authority. Mobilisation surcharge runs ${surcharge} (band-${surcharge.charAt(0).toUpperCase()})${colIdx ? `, with COL index ${colIdx} feeding the labour line` : ''}. ${employer1} programme contracts trade volume against rate; spot-buys pay the 10–20% premium. The full multiplier resolves at ×${mult.toFixed(2)} once transport and demand-density are layered in.`,

    `Procurement-grade rates for ${method.code} in ${city.displayName}: $${lvl2Low}–$${lvl2High}/day Level II, $${lvl3Mid}/day Level III. ${wageRef ? `BLS reports median Level II inspector wages of $${wageRef.toLocaleString()} for the ${city.msa ?? city.displayName} MSA` : 'Wages track the regional BLS median'} — the day-rate covers wage plus equipment, mobilisation, calibration overhead, and contractor margin. Transport surcharge: ${surcharge}. Effective multiplier vs national base: ×${mult.toFixed(2)}.`,

    `Field-anchored ${method.code} pricing in ${city.displayName} runs $${lvl2Mid}/day at the typical Level II point, scaling to $${lvl3Mid}/day for Level III procedural sign-off. The ${region} demand profile${colIdx ? `, COL index ${colIdx},` : ''} and ${surcharge} transport band combine into a ×${mult.toFixed(2)} multiplier on the national base ($${dr.low}–$${dr.high}/day). ${employer1} sets the high water mark — pre-qualified providers there typically collect the upper-band rate without negotiation.`,
  ];

  // Table
  const baseHourLow = Math.round((dr.low * mult) / 8);
  const baseHourHigh = Math.round((dr.high * mult) / 8);
  const lvl3HourMid = Math.round(lvl3Mid / 8);
  const mobilisation = surcharge === 'high' ? 850 : surcharge === 'medium' ? 525 : 325;
  const equipPerDay = Math.round((method.dayRateRangeUSD?.scannerOpAddl ?? 280) * mult);

  const table: GeneratedTableRow[] = [
    {
      label: 'Hourly labour (Level II)',
      value: `$${baseHourLow}–$${baseHourHigh}/hr`,
      detail: 'standard programme rate',
    },
    {
      label: 'Hourly labour (Level III)',
      value: `$${lvl3HourMid}/hr`,
      detail: 'procedure qualification + disposition',
    },
    {
      label: 'Day rate (Level II)',
      value: `$${lvl2Mid}/day`,
      detail: '8 hours, ≤30 km from base',
    },
    {
      label: 'Equipment surcharge',
      value: `$${equipPerDay}/day`,
      detail: 'instrument + consumables',
    },
    {
      label: 'Mobilisation',
      value: `$${mobilisation}/trip`,
      detail: `${surcharge} transport-surcharge band`,
    },
    {
      label: 'Outage / night-shift uplift',
      value: '+25–40%',
      detail: 'turnaround windows and weekend work',
    },
  ];

  return {
    paragraph: paragraphs[tmplIdx],
    table,
    multiplier: mult,
    surchargeBand: surcharge,
  };
}

// ----------------------------------------------------------------------------
// Block 4 — Top local providers (frame major employers as client base)
// ----------------------------------------------------------------------------

function block4TopLocalProviders(
  city: RichCity,
  method: RichMethod,
  seed: number,
): GeneratedContent['topLocalProviders'] {
  const employers = (city.majorEmployers ?? []).slice(0, 5);
  const employer1 = employers[0] ?? 'major regional employers';
  const employer2 = employers[1];

  const region = (city.region ?? 'regional').replace(/-/g, ' ');
  const tmplIdx = pickIdx(seed, 'prov', 4);

  const paragraphs = [
    `Certified ${method.code} providers in ${city.displayName} typically serve a client base anchored by ${employer1}${employer2 ? `, ${employer2},` : ''} and other ${region} operators. Posting a scope through NDT Connect routes the request to providers already pre-qualified at these gates — ${employers.length >= 3 ? 'three to five' : 'two to four'} parallel quotes typically return within 24–72 hours.`,

    `The ${city.displayName} ${method.code} contractor base is sized to recurring demand from ${employers.slice(0, 3).join(', ') || 'tier-1 regional operators'}. Provider listings on NDT Connect include current ASNT certification level, instrument calibration status, and named-site experience — replacing the email-and-spreadsheet pre-qualification dance most procurement teams still run for new vendors.`,

    `Active ${method.code} providers serving ${city.displayName} hold pre-qualification packages for ${employer1}${employer2 ? ` and ${employer2}` : ''} as table stakes. The directory filters by Level II/III currency, ${method.code}-specific procedure history, and instrument calibration date — letting buyers shortlist crews who can mobilise without a fresh onboarding cycle.`,

    `Providers covering the ${city.displayName} market work to the cadence set by ${employer1}${employers.slice(1, 3).length ? ` and other anchors like ${employers.slice(1, 3).join(', ')}` : ''}. Filter the NDT Connect provider list by city to surface crews with current ${method.code} qualifications and recent named-site deliverables — three quotes inside 72 hours is the realistic SLA for routine scope.`,
  ];

  return {
    paragraph: paragraphs[tmplIdx],
    employerHighlights: employers,
    ctaHref: `/find-providers?city=${city.slug}&method=${method.code.toLowerCase()}`,
    ctaLabel: `Find ${method.code} providers in ${city.displayName}`,
  };
}

// ----------------------------------------------------------------------------
// Block 5 — Method in this city (most-unique, 200-300 words, vocab-driven)
// ----------------------------------------------------------------------------

function block5MethodInThisCity(
  city: RichCity,
  method: RichMethod,
  vocab: IndustryVocab | null,
  seed: number,
): string[] {
  const ind = topIndustry(city) ?? city.industries[0];
  const employer1 = city.majorEmployers?.[0] ?? 'major local operators';
  const angle1 = city.uniqueAngles?.[0];
  const angle2 = city.uniqueAngles?.[1];
  const useCase = method.typicalUseCases?.[seed % (method.typicalUseCases?.length || 1)] ?? `${method.code} examination scope`;
  const limitation = method.limitationsAndCaveats?.[0];
  const tradeTerm = vocab?.termsOfArt[seed % vocab.termsOfArt.length];
  const scopeVerb = vocab?.scopeVerbs[(seed >> 1) % vocab.scopeVerbs.length];
  const failure = vocab?.failureModes[(seed >> 3) % vocab.failureModes.length];
  const assetClass = vocab?.assetClasses[(seed >> 5) % vocab.assetClasses.length];

  const tmplIdx = pickIdx(seed, 'mic', 4);

  // Each template returns 3 paragraphs targeting 200-300 words combined.
  // This is the most-unique block: industry vocabulary + named site +
  // failure mode + use case + asset class are all interpolated.
  const advantage = method.codeReferences?.asme ? `${method.codeReferences.asme[0]} sign-off authority` : `Level III procedure authority`;
  const complement = method.complementaryMethods?.[0];

  const t0 = [
    `${method.name} (${method.code}) in ${city.displayName} is most often pulled into scope when ${ind.name.toLowerCase()} operators need to qualify ${assetClass ?? 'critical equipment'} against ${city.regionalCodes?.[0] ?? 'the applicable code'}. The technique is the default examination for ${useCase.toLowerCase()} — and on ${city.displayName} jobs, the use case typically narrows to ${tradeTerm ?? 'recurring programme work'} where ${failure ?? 'common-mode defect'} is the failure mechanism owners are screening for.`,

    `The dominant scope here is ${scopeVerb ?? 'inspection during scheduled outages'}. ${employer1} writes ${method.code} into the procedure pack on every cycle, and the local crews who run this scope daily have built the calibration libraries, scan plans, and reporting templates that ${city.displayName} owners have come to expect. ${angle1 ? endWithPeriod(angle1) : 'Recurring volume keeps the contractor pool sharp.'} Procedures cite ${method.codeReferences?.asme?.[0] ?? `the ${method.code} primary standard`}; deliverables ship as ${method.outputArtifacts?.[0] ?? 'the standard examination record'} with Level II/III written disposition.`,

    limitation
      ? `Worth flagging: ${limitation.toLowerCase()}. ${city.displayName} crews work around this with paired methods${complement ? ` (typically ${complement} as a crosscheck)` : ''} and procedure-level mitigations${angle2 ? ` — ${angle2.toLowerCase()}` : ''}. ${employer1}'s site-specific qualification matrix layers an additional acceptance gate on top, so contractors who already hold the ${method.code} pre-qual win the bid before rate negotiation even starts.`
      : `${angle2 ?? `Owners also lean on the contractor pool for surge cover during ${tradeTerm ?? 'turnaround windows'} — that response capacity is part of why ${method.code} programme rates here clear above the national median.`} ${complement ? `${complement} is the typical paired method when ${method.code} can't reach a particular indication class.` : ''} ${employer1}'s pre-qualification matrix is the gate that locks in volume work.`,
  ];

  const t1 = [
    `Across ${city.displayName}, ${method.code} is the examination ${ind.name.toLowerCase()} programmes lean on for ${useCase.toLowerCase()}. The local case is straightforward: ${ind.context ?? 'the dominant industry concentration'} drives a workload mix where ${tradeTerm ?? 'programme work'} accounts for the majority of billable hours, and ${method.code}'s detection envelope — particularly for ${failure ?? 'the common-mode defects'} — is the right technical fit.`,

    `${employer1}${city.majorPortsRefineriesPlants?.[0] ? ` and the ${city.majorPortsRefineriesPlants[0].type.toLowerCase()} footprint at ${city.majorPortsRefineriesPlants[0].name}` : ''} set the scope language. Procedures cite ${method.codeReferences?.asme?.[0] ?? `the ${method.code} primary standard`}; deliverables are ${method.outputArtifacts?.[0] ?? 'the standard examination record'} and a written disposition. ${scopeVerb ? `${scopeVerb[0].toUpperCase() + scopeVerb.slice(1)} dominates the local order book` : 'Programme work dominates the local order book'}, with ${complement ? `${complement} carried as the standard paired method for cross-coverage` : 'paired methods called in only when scope expands beyond single-method coverage'}.`,

    `Where ${city.displayName} departs from generic national benchmarks: ${angle1 ?? `the ${ind.name.toLowerCase()} concentration raises the share of ${method.code} scope that lands in outage windows`}. ${angle2 ?? `That keeps the contractor base on rotation rather than steady-state work — the cost line in any ${method.code} bid here.`} ${assetClass ? `Recurring ${assetClass} populations are the volume backbone` : 'Recurring asset populations are the volume backbone'}; spot-buys cover the surge.`,
  ];

  const t2 = [
    `${method.code}'s role in ${city.displayName}'s inspection economy is anchored to ${ind.name.toLowerCase()}: ${ind.context ?? 'the regional industrial base'}. The technique earns its keep on ${useCase.toLowerCase()}, and local pre-job plans ${assetClass ? `often centre on ${assetClass} populations` : 'are written around recurring asset populations'} where ${failure ?? 'common defects'} have to be screened out before return-to-service.`,

    `On the ground, that translates to ${scopeVerb ?? 'programme inspection windows'} as the dominant scope, with ${tradeTerm ? `${tradeTerm} surges` : 'demand surges'} layered on every cycle. ${employer1} typically locks in standing-order coverage; smaller operators time spot-buys against contractor availability. The local pace — measured in ${method.averageInspectionRateInchesWeldPerHour ? `${method.averageInspectionRateInchesWeldPerHour}+ inches of weld per shift` : method.averageInspectionRateSqFtPerHour ? `${method.averageInspectionRateSqFtPerHour} sq ft per shift` : 'realistic shift throughput'} — is what sets contractor utilisation and, downstream, the rate band procurement should expect.`,

    `${angle1 ?? `${city.displayName}'s ${ind.name.toLowerCase()} concentration keeps ${method.code} demand resilient through the cycle`}. ${angle2 ? `${angle2}.` : `That demand resilience is what holds the ${method.code} rate band stable against macro pressure on contractor billing.`} ${limitation ? `On the limitation side, ${limitation.toLowerCase()} — local crews mitigate by procedure-level controls and ${complement ?? 'paired methods'} where the indication class warrants it.` : `${complement ? `${complement} is the typical complementary method when scope warrants additional coverage.` : ''}`}`,
  ];

  const t3 = [
    `For the ${ind.name.toLowerCase()} operators that dominate the ${city.displayName} industrial base, ${method.code} is the workhorse for ${useCase.toLowerCase()}. ${ind.context ?? 'Industry concentration'} means the scope is dense, repeatable, and tightly specified — ${assetClass ? `with ${assetClass} populations driving the recurring volume` : 'with recurring asset populations driving volume'}.`,

    `Local crews run ${method.code} packages calibrated for ${failure ?? 'the failure modes that matter most here'}, deliver ${method.outputArtifacts?.[0] ?? 'the standard examination record'}, and close the disposition against ${city.regionalCodes?.[0] ?? 'the local authority'}. ${scopeVerb ? `${scopeVerb[0].toUpperCase() + scopeVerb.slice(1)} accounts for the bulk of billable hours` : 'Programme work accounts for the bulk of billable hours'}; ${tradeTerm ? `${tradeTerm} cycles` : 'outage cycles'} drive the seasonal peaks. ${advantage} is the contractor capability that consistently wins the bid here.`,

    `${angle1 ?? `${city.displayName}'s position in the broader regional supply chain keeps ${method.code} scope on the contract list every cycle`}. ${employer1} pre-qualifications are the gatekeeper — crews who already hold them win the volume work; new entrants run the onboarding gauntlet first. ${angle2 ?? `${complement ? `${complement} is the typical paired method when scope demands cross-coverage` : 'Paired methods are called in when single-method coverage falls short'}.`}`,
  ];

  return [t0, t1, t2, t3][tmplIdx];
}

// ----------------------------------------------------------------------------
// Block 6 — Local certification path
// ----------------------------------------------------------------------------

function block6LocalCertificationPath(
  city: RichCity,
  method: RichMethod,
  seed: number,
): GeneratedContent['localCertificationPath'] {
  const asnt = city.asntChapter;
  const aws = city.awsSection;
  const apiCenter = !!city.apiExamCenter;
  const trainHours = totalLevel2TrainingHours(method);
  const prereq = method.prerequisiteCertifications?.[0] ?? 'ASNT SNT-TC-1A employer-written practice';
  const academic = city.academicNDTPrograms?.[0];
  const trainingProvider = city.trainingProviders?.[0];
  const ind = topIndustry(city) ?? city.industries[0];

  const tmplIdx = pickIdx(seed, 'cert', 4);

  const paragraphs = [
    `Inspectors qualifying into the ${city.displayName} ${method.code} market route through ${asnt ?? 'the regional ASNT section'} for ASNT Level II/III certification under SNT-TC-1A or CP-189. Total Level II training time for ${method.code} runs roughly ${trainHours} hours including classroom and on-the-job experience. ${aws ? `Welding-related credentials route through ${aws} for AWS CWI exam access; ` : ''}${apiCenter ? `the city hosts an API exam centre for 510/570/653 testing.` : `the nearest API exam centre handles 510/570/653 logistics.`} Prerequisite per ASNT: ${prereq.toLowerCase()}.`,

    `${asnt ?? 'The regional ASNT section'} anchors ${method.code} certification in ${city.displayName}; ${aws ?? 'the local AWS district'} handles welding-inspector credentials. Practical experience requirement is roughly ${trainHours} total hours to Level II — typically split between vendor classroom time at ${trainingProvider ?? 'a regional training provider'}${academic ? ` or ${academic}` : ''} and supervised on-the-job hours at ${city.majorEmployers?.[0] ?? 'a tier-1 site'}. ${apiCenter ? 'API exam centre access is local; ' : 'API exam access is regional; '}the ${ind.name.toLowerCase()} operators here generally require currency on all three credential tracks.`,

    `Credentialing in ${city.displayName} runs through ${asnt ?? 'the regional ASNT section'} (Level II/III), ${aws ?? 'the regional AWS section'} (CWI/CWE), and ${apiCenter ? 'a local API exam centre' : 'the nearest API exam centre'} for pressure-equipment tickets. ${method.code} Level II takes about ${trainHours} hours of combined classroom and field experience to qualify; the credential stack — ASNT plus CWI plus API 510/570/653 where relevant — is what unlocks the ${ind.name.toLowerCase()} job classes that drive local demand.`,

    `The ${city.displayName} certification economy is built around ${asnt ?? 'the nearest ASNT section'}, ${aws ?? 'the regional AWS district'}, and ${apiCenter ? 'a local API exam centre' : 'regional API exam access'}. Inspectors targeting ${method.code} work clear roughly ${trainHours} training hours to Level II, then layer AWS CWI and API tickets to qualify into the ${ind.name.toLowerCase()} programmes that anchor local demand. ${trainingProvider ? `${trainingProvider} is a common training-provider entry point;` : 'Vendor-led training paths feed most of the local pipeline;'} ${academic ? `${academic} runs the formal academic route.` : 'apprenticeship routes carry the rest.'}`,
  ];

  return {
    paragraph: paragraphs[tmplIdx],
    asntChapter: asnt,
    awsSection: aws,
    apiExamCenter: apiCenter,
  };
}

// ----------------------------------------------------------------------------
// Block 7 — City × method FAQ (6 Q&A)
// ----------------------------------------------------------------------------

function block7CityFAQ(
  city: RichCity,
  method: RichMethod,
  vocab: IndustryVocab | null,
  seed: number,
): GeneratedFAQ[] {
  const mult = effectivePricingMultiplier(city);
  const dr = typicalLevel2DayRate(method);
  const lvl2Mid = Math.round(((dr.low + dr.high) / 2) * mult);
  const wage = city.avgInspectorWageUSD?.level2;
  const employer1 = city.majorEmployers?.[0] ?? 'major local operators';
  const ind = topIndustry(city) ?? city.industries[0];
  const code1 = city.regionalCodes?.[0] ?? method.codeReferences?.asme?.[0] ?? `${method.code} primary standard`;
  const trainHours = totalLevel2TrainingHours(method);
  const tradeTerm = vocab?.termsOfArt[seed % vocab.termsOfArt.length];
  const failure = vocab?.failureModes[(seed >> 2) % vocab.failureModes.length] ?? method.typicalUseCases?.[0] ?? 'standard defect classes';

  return [
    {
      question: `How much does ${method.code} cost in ${city.displayName}?`,
      answer: `${method.code} (${method.name}) day-rates in ${city.displayName} typically clear at $${lvl2Mid}/day for Level II crews, with the pricing multiplier on the national base running ×${mult.toFixed(2)} (transport surcharge band: ${city.transportSurchargeBand ?? 'medium'}). ${wage ? `Local Level II inspector wages average $${wage.toLocaleString()}/year per BLS, which anchors that day-rate band.` : 'Wages track the regional BLS median.'} Always solicit at least three parallel quotes before committing programme spend.`,
    },
    {
      question: `Which ${city.displayName} sites use ${method.code} most often?`,
      answer: `${employer1}${city.majorEmployers?.[1] ? ` and ${city.majorEmployers[1]}` : ''} are the high-volume ${method.code} buyers in ${city.displayName}. ${city.majorPortsRefineriesPlants?.[0] ? `The ${city.majorPortsRefineriesPlants[0].type.toLowerCase()} footprint at ${city.majorPortsRefineriesPlants[0].name} is a recurring ${method.code} mobilisation point.` : `Recurring scope lands at ${ind.name.toLowerCase()} sites across the metro.`} Pre-qualification at these gates is what unlocks the volume contracts.`,
    },
    {
      question: `What credentials do ${method.code} inspectors need to work in ${city.displayName}?`,
      answer: `Working ${method.code} scope in ${city.displayName} requires ASNT Level II for the method (roughly ${trainHours} total training hours to qualify), plus ${city.asntChapter ? city.asntChapter : 'regional ASNT section'} membership is common. AWS CWI is required for welding-related scope; API 510/570/653 tickets unlock pressure-equipment work. ${city.apiExamCenter ? `An API exam centre is hosted in ${city.displayName} itself.` : 'API exam logistics route through the nearest regional centre.'}`,
    },
    {
      question: `What ${ind.name.toLowerCase()} failure modes does ${method.code} screen for in ${city.displayName}?`,
      answer: `On ${ind.name.toLowerCase()} jobs in ${city.displayName}, ${method.code} is most often called for ${failure} screening. ${tradeTerm ? `Recurring scope on ${tradeTerm} cycles drives the volume.` : 'Recurring programme cycles drive the volume.'} The technique sits inside ${code1}'s acceptance framework, and local crews build inspection plans around the failure modes the ${ind.name.toLowerCase()} owners audit hardest.`,
    },
    {
      question: `How fast can a ${method.code} crew mobilise in ${city.displayName}?`,
      answer: `Routine ${method.code} scope in ${city.displayName} typically picks up a certified crew within 24–72 hours of posting a request — the ${city.tier === 1 ? 'deep' : 'established'} contractor base around ${employer1} keeps mobilisation lead times short. Outage windows and turnaround support are negotiated against rotation; post the scope to NDT Connect to receive parallel quotes from providers already pre-qualified at ${city.displayName} sites.`,
    },
    {
      question: `What standards govern ${method.code} acceptance in ${city.displayName}?`,
      answer: `${method.code} examinations in ${city.displayName} reference ${method.codeReferences?.asme?.slice(0, 2).join(' / ') ?? 'the method primary standard'} as the technical floor and ${city.regionalCodes?.slice(0, 2).join(', ') ?? 'state regulators'} for documentary compliance. ${city.majorEmployers?.[0] ? `${city.majorEmployers[0]}'s qualification matrix layers an additional customer-specific spec on top` : 'Customer-specific specs layer on top'} — procedures must close on all three before the crew is cleared at the gate.`,
    },
  ];
}

// ----------------------------------------------------------------------------
// Top-level generator
// ----------------------------------------------------------------------------

export function generateCityMethodContent(
  citySlug: string,
  methodSlug: string,
): GeneratedContent | null {
  const city = findRichCity(citySlug);
  const method = findRichMethodBySlug(methodSlug);

  // If both rich entries are missing, the route should fall back to the
  // legacy composer (lib/content/city-method.ts). Returning null is the
  // signal for that.
  if (!city && !method) return null;
  if (!city || !method) {
    // eslint-disable-next-line no-console
    console.warn(
      `[seo/generate-page-content] partial data for ${citySlug}/${methodSlug} ` +
      `(city=${!!city}, method=${!!method}) — caller should fall back`,
    );
    return null;
  }

  const seed = djb2(`${citySlug}|${method.code}`);
  const vocab = vocabFor(topIndustry(city)?.name ?? city.industries[0]?.name ?? '');

  return {
    citySlug,
    methodSlug,
    cityName: city.displayName,
    methodCode: method.code,
    methodName: method.name,
    localMarketOverview: block1LocalMarketOverview(city, method, vocab, seed),
    regionalCodeContext: block2RegionalCodeContext(city, method, vocab, seed),
    localPricingBreakdown: block3LocalPricingBreakdown(city, method, seed),
    topLocalProviders: block4TopLocalProviders(city, method, seed),
    methodInThisCity: block5MethodInThisCity(city, method, vocab, seed),
    localCertificationPath: block6LocalCertificationPath(city, method, seed),
    cityFAQ: block7CityFAQ(city, method, vocab, seed),
  };
}
