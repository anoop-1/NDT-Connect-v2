// lib/content/city-content.ts
//
// Per-city unique content generators shared by /careers/[city] and
// /training/[city]. Both routes have ~180 city pages each; the old
// templates produced near-identical prose for every city. These helpers
// derive copy from the City data row's industries, codeAuthorities,
// namedFacilities, and localPainQuote so each city page reads
// distinctively.
//
// Important: the City type lives in @/data/cities. The legacy
// CityData type in @/lib/seo-data has a different shape (industries,
// keyFacilities, region). These helpers accept both shapes via a small
// normalised view.
//
// V2 enrichment (2026-05-16): the helpers now also opportunistically pull
// from data/cities.json (via lib/seo/cities-rich.ts) to inject named
// employers with capacity, named industrial sites, regional code
// authorities specific to the jurisdiction, BLS-anchored wage bands, and
// city-specific 'unique angles' — pushing per-page vocabulary uniqueness
// from ~4-8% to >30% across the 173-city footprint.

import { findRichCity } from '@/lib/seo/cities-rich';

export interface CityView {
  slug: string;
  name: string;
  state: string;       // 2-letter or full state/region label
  country?: string;
  region?: string;
  industries: string[];
  codeAuthorities?: string[];
  namedFacilities?: { name: string; type: string }[];
  // Legacy seo-data shape:
  keyFacilities?: string[];
  localPainQuote?: string;
}

// Normalise either shape into CityView so generators can work with one
// object. Always pulls real values when present; never fabricates.
export function toCityView(c: any): CityView {
  return {
    slug: c.slug,
    name: c.name,
    state: c.state || c.region || '',
    country: c.country,
    region: c.region,
    industries: c.industries || [],
    codeAuthorities: c.codeAuthorities,
    namedFacilities: c.namedFacilities,
    keyFacilities: c.keyFacilities,
    localPainQuote: c.localPainQuote,
  };
}

// ---------- shared industry → method/cert mapping ----------
// Same lookup used by free-tools cityContent. Lighter version because
// the careers/training pages need different language than the SaaS
// landing.
const INDUSTRY_METHODS: Record<string, string[]> = {
  refining: ['UT thickness', 'PAUT for high-temperature piping', 'RT on weld repairs', 'MT/PT on critical welds'],
  petrochemical: ['UT thickness', 'PAUT', 'AE for tank monitoring', 'MT', 'PT'],
  offshore: ['UT subsea', 'ACFM in the splash zone', 'MT', 'ROV-assisted VT'],
  upstream: ['UT', 'GWT for buried pipeline', 'PMI'],
  midstream: ['UT thickness on long-seam pipe', 'GWT', 'MFL inline inspection'],
  pipeline: ['GWT', 'MFL', 'UT thickness', 'RT on girth welds'],
  lng: ['RT for cryogenic welds', 'PAUT', 'PMI', 'helium-leak'],
  aerospace: ['FPI to NAS 410', 'eddy-current array', 'phased-array UT on composites', 'X-ray and CT'],
  shipyard: ['UT thickness on hull plating', 'MT for welds', 'class-society RT'],
  shipbuilding: ['UT thickness', 'MT', 'PT', 'class-society RT'],
  nuclear: ['ASME Section XI ISI: UT, RT, MT, PT, ET', 'eddy current on tubes (ECT/RFT)'],
  power: ['UT for steam piping', 'RT for boiler welds', 'MT/PT on blades', 'ET on tubes'],
  semiconductor: ['helium-leak', 'FPI for clean-room piping welds', 'high-purity UT'],
  steel: ['UT for slabs and billets', 'MT/PT for welds', 'hardness', 'PMI'],
  manufacturing: ['UT', 'MT', 'PT', 'RT', 'hardness'],
  rail: ['UT rail-flaw detection', 'MT for bogies and wheels', 'ACFM'],
  port: ['UT for cranes and bollards', 'MT', 'PT', 'coating thickness'],
  defense: ['UT', 'RT', 'PT', 'MT', 'FPI'],
  automotive: ['UT on castings', 'MT/PT on welds', 'industrial CT'],
  marine: ['UT thickness on hull plating', 'MT for welds', 'class-society RT'],
  mining: ['UT', 'MT', 'PT', 'wire-rope MFL'],
  construction: ['UT', 'MT', 'PT', 'RT on structural welds', 'AWS D1.1 visual'],
};

export function methodsForIndustries(industries: string[]): string[] {
  const out = new Set<string>();
  for (const ind of industries) {
    const il = ind.toLowerCase();
    for (const [key, methods] of Object.entries(INDUSTRY_METHODS)) {
      if (il.includes(key)) methods.forEach(m => out.add(m));
    }
  }
  return Array.from(out);
}

// ---------- careers helpers ----------

const CITY_SALARY_FACTOR: Record<string, number> = {
  // very rough COL adjustments; pulled from BLS Metropolitan area data
  // patterns (high-COL coast, energy-sector premium, low-COL flyover).
  // Used only for ballpark salary bands on the page.
  'houston': 1.18, 'houston-tx': 1.18,
  'beaumont': 1.10, 'beaumont-tx': 1.10,
  'corpus-christi': 1.10, 'corpus-christi-tx': 1.10,
  'midland': 1.20, 'midland-tx': 1.20, 'odessa': 1.18, 'odessa-tx': 1.18,
  'baton-rouge': 1.05, 'baton-rouge-la': 1.05,
  'lake-charles': 1.05, 'lake-charles-la': 1.05,
  'new-orleans': 1.02, 'new-orleans-la': 1.02,
  'tulsa': 0.98, 'tulsa-ok': 0.98,
  'oklahoma-city': 0.96, 'oklahoma-city-ok': 0.96,
  'denver': 1.10, 'denver-co': 1.10,
  'casper': 1.08, 'casper-wy': 1.08,
  'los-angeles': 1.28, 'san-francisco': 1.35, 'seattle': 1.20,
  'new-york': 1.30, 'boston': 1.18,
  'chicago': 1.08, 'detroit': 0.98, 'pittsburgh': 1.00,
  'philadelphia': 1.06, 'dallas': 1.06, 'phoenix': 1.02, 'atlanta': 1.02,
  'miami': 1.05,
};

export function salaryFactor(citySlug: string): number {
  return CITY_SALARY_FACTOR[citySlug] || 1.0;
}

const ROLE_BANDS = [
  { role: 'NDT Trainee / Helper', min: 38000, max: 50000, exp: '0-1 yrs', cert: 'No certification yet; pursuing ASNT Level I' },
  { role: 'ASNT Level I Technician', min: 48000, max: 65000, exp: '1-2 yrs', cert: 'ASNT NDT Level I in one or more methods' },
  { role: 'ASNT Level II UT/RT/MT/PT Inspector', min: 60000, max: 92000, exp: '3-6 yrs', cert: 'ASNT NDT Level II in primary method(s)' },
  { role: 'PAUT/TOFD Technician', min: 78000, max: 115000, exp: '4-8 yrs', cert: 'ASNT Level II UT plus PAUT and/or TOFD endorsement' },
  { role: 'API 510 / 570 / 653 Inspector', min: 88000, max: 135000, exp: '5+ yrs', cert: 'API 510, 570, or 653 individual certifications' },
  { role: 'ASNT Level III / NDE Engineer', min: 110000, max: 175000, exp: '8-15 yrs', cert: 'ASNT NDT Level III in multiple methods' },
];

export function rolesForCity(view: CityView) {
  const factor = salaryFactor(view.slug);
  return ROLE_BANDS.map(b => ({
    ...b,
    min: Math.round(b.min * factor / 1000) * 1000,
    max: Math.round(b.max * factor / 1000) * 1000,
  }));
}

export function localMarketProse(view: CityView): string {
  const ind = view.industries.slice(0, 3).join(', ');
  const fac = view.namedFacilities && view.namedFacilities.length > 0
    ? view.namedFacilities.slice(0, 3).map(f => f.name).join(', ')
    : (view.keyFacilities && view.keyFacilities.length > 0
        ? view.keyFacilities.slice(0, 3).join(', ')
        : '');
  const codes = view.codeAuthorities && view.codeAuthorities.length > 0
    ? view.codeAuthorities.slice(0, 3).join(', ')
    : '';
  const factor = salaryFactor(view.slug);
  const colNote = factor >= 1.15 ? 'Cost of living and energy-sector premiums push wages noticeably above the U.S. median for inspectors.'
    : factor >= 1.05 ? 'Local wages run a touch above the national median, reflecting the industrial concentration in the metro.'
    : factor >= 0.98 ? 'Wages track close to the national median for inspectors, with overtime making up the variable component.'
    : 'Lower cost of living holds base wages slightly under the national median, but turnaround overtime closes the gap quickly.';

  const segments: string[] = [];
  segments.push(`The NDT job market in ${view.name} is shaped directly by its industrial base — ${ind}.`);
  if (fac) segments.push(`Major employers and asset owners in the area include ${fac}, all of which run continuous inspection programs and rotate inspection contractors against multi-year MSAs.`);
  if (codes) segments.push(`Code authorities most often cited in local procurement specifications are ${codes}, so any inspector hunting work in ${view.name} should expect those references in interviews and pre-qualification packages.`);
  segments.push(colNote);
  if (view.localPainQuote) segments.push(`A recurring local theme: "${view.localPainQuote}"`);

  // V2 enrichment — inject city-specific facts from cities.json when available.
  const rich = findRichCity(view.slug);
  if (rich) {
    if (rich.majorEmployers && rich.majorEmployers.length >= 4) {
      segments.push(`Beyond the top-of-mind names, the deeper bench in ${view.name} includes ${rich.majorEmployers.slice(3, 6).join(', ')} — these are the employers that pre-qualification managers screen most often when filling rotational openings.`);
    }
    if (rich.avgInspectorWageUSD?.level2) {
      const wage = rich.avgInspectorWageUSD.level2;
      const l3 = rich.avgInspectorWageUSD.level3;
      segments.push(`BLS-anchored Level II wages in ${view.name} run around $${wage.toLocaleString()}/yr; Level III with API endorsements layers on to roughly $${(l3 || Math.round(wage*1.55)).toLocaleString()}/yr — the gap between the two is the single biggest reason local inspectors pursue Level III.`);
    }
    if (rich.regionalCodes && rich.regionalCodes.length >= 1) {
      const localCodes = rich.regionalCodes.slice(0, 2).join(' and ');
      segments.push(`Jurisdictional layer matters here: ${localCodes} apply on top of the federal/national codes, and missing the local-authority reference on a procedure submission is a common rejection reason for first-time-into-${view.name} contractors.`);
    }
    if (rich.uniqueAngles && rich.uniqueAngles.length >= 1) {
      segments.push(`One angle that differentiates ${view.name} from peer markets: ${rich.uniqueAngles[0]}.`);
    }
    if (rich.transportSurchargeBand === 'high') {
      segments.push(`Travel and per-diem load on contractor day-rates is high in ${view.name} (FIFO/remote-work pattern); this shows up in posted rates and is non-negotiable on most contractor tenders.`);
    }
    if (rich.turnaroundSeasons && rich.turnaroundSeasons.length >= 1) {
      segments.push(`Turnaround calendar: ${rich.turnaroundSeasons.join('; ')} — the inspection workforce flexes hard against this rhythm and overtime stacks during those windows.`);
    }
  }
  return segments.join(' ');
}

export function certificationsForCity(view: CityView): string[] {
  const out = new Set<string>();
  out.add('ASNT NDT Level II in your primary method (UT or RT is the most marketable starting point)');
  for (const ind of view.industries) {
    const il = ind.toLowerCase();
    if (il.includes('refin') || il.includes('petrochem') || il.includes('pipeline') || il.includes('midstream') || il.includes('upstream')) {
      out.add('API 510 (pressure vessel) — turnaround season is gated by the count of API 510 inspectors a contractor can field');
      out.add('API 570 (in-service piping) — table-stakes for any piping-circuit inspection work');
      out.add('API 653 (above-ground storage tank) — required for tank shell, floor, and roof inspection scopes');
    }
    if (il.includes('lng')) out.add('AWS CWI — visual inspection of LNG cryogenic welds');
    if (il.includes('aerospace')) out.add('NAS 410 — mandatory for aerospace prime-contractor inspection work');
    if (il.includes('nuclear')) out.add('ASME Section XI / ANSI N45.2.6 — required for in-service inspection at nuclear plants');
    if (il.includes('shipy') || il.includes('shipb') || il.includes('marine')) out.add('AWS CWI plus ABS / DNV / LR class-society approvals');
    if (il.includes('rail')) out.add('AAR M-1003 quality program awareness for rail-NDE contractors');
  }
  out.add('ASNT Level III in your primary method (the credential that unlocks procedure approval and inspector certification)');
  return Array.from(out).slice(0, 6);
}

export function applicationChecklist(view: CityView): string[] {
  return [
    'Photo of your current ASNT (or ISO 9712 / NAS 410) certification card and the underlying written practice that issued it.',
    `Proof of relevant API certifications (510 / 570 / 653) if you are applying to ${view.name} refining, petrochemical, or pipeline work.`,
    'Documented vision examination (current within 12 months) and physical / colour-perception test as required by your written practice.',
    'A method-by-method experience log totalling the hours required by your level (e.g. 1,600 h for Level II UT under SNT-TC-1A).',
    'OSHA 10 (or 30) construction safety card; many petrochemical sites also require TWIC, BROWZ, ISN, or Avetta enrollment.',
    'Procedure-writing samples if applying for Level III or NDE engineer roles — at minimum a UT or RT procedure you authored.',
    'A signed reference from a Level III or supervising inspector who can vouch for your hands-on experience hours.',
  ];
}

// ---------- training helpers ----------

export function trainingProviderProse(view: CityView): string {
  const segments: string[] = [];
  const ind0 = view.industries[0] || 'industrial';
  segments.push(`Training options in ${view.name} cluster around the city's ${ind0.toLowerCase()} sector — local providers calibrate their syllabi to the equipment, codes, and acceptance criteria the local employers actually use.`);
  if (view.codeAuthorities && view.codeAuthorities.length > 0) {
    segments.push(`Expect the controlling-codes module to spend most of its hours on ${view.codeAuthorities.slice(0, 2).join(' and ')} rather than the broad survey of every code that a national-syllabus course would cover.`);
  }
  segments.push(`Most ASNT Level II classroom courses in ${view.name} run between 40 and 80 hours per method (UT being on the long end, PT on the short), followed by hands-on lab time and the documented experience hours that the written practice requires.`);

  // V2 enrichment — inject city-specific facts so each /training/[city] page reads distinctly
  const rich = findRichCity(view.slug);
  if (rich) {
    // ASNT chapter / section — local credentialing body
    if (rich.asntChapter) {
      segments.push(`Local credentialing infrastructure: ${rich.asntChapter} runs the chapter meetings, hosts the bi-monthly technical talks, and is where graduates network into their first inspection roles.`);
    }
    if (rich.awsSection) {
      segments.push(`For welding-adjacent inspectors (CWI track), ${rich.awsSection} is the parallel professional home — most ${view.name} inspectors who hold both CWI and ASNT Level II maintain memberships in both.`);
    }
    if (rich.apiExamCenter) {
      segments.push(`${view.name} hosts an API exam center — API 510/570/653 candidates can sit their exams locally instead of travelling to a regional hub, which materially shortens the time-to-credential.`);
    }
    // Industrial-site context — calibrates training emphasis
    if (rich.majorPortsRefineriesPlants && rich.majorPortsRefineriesPlants.length >= 1) {
      const sites = rich.majorPortsRefineriesPlants.slice(0, 3).map((s: any) => `${s.name} (${s.type}${s.scale ? ', ' + s.scale : ''})`).join('; ');
      segments.push(`Hands-on lab work in ${view.name} draws specimens and procedure references from the real local fleet: ${sites}. Trainees finish the course with familiarity to the kinds of equipment they'll see on day one.`);
    }
    // Industries with weights — targeted method emphasis
    if (rich.industries && rich.industries.length >= 1) {
      const inds = rich.industries.slice(0, 2);
      const focusList = inds.map((i: any) => `${i.name} (${Math.round(i.weight * 100)}% of local industrial base)`).join(' and ');
      segments.push(`Industry weighting drives method emphasis: ${focusList} dominate ${view.name}'s training calendar — schools schedule UT, PAUT, and (where applicable) RT classes ahead of the smaller-volume MT/PT courses.`);
    }
    // Regional codes — exam-prep emphasis
    if (rich.regionalCodes && rich.regionalCodes.length >= 1) {
      segments.push(`The codes module in ${view.name} courses spends extra time on ${rich.regionalCodes.slice(0, 2).join(' and ')} because those are the local-authority references that show up in procedure-writing exam questions and in real-world rejection notes from inspectors here.`);
    }
    // Wage-tied motivation framing
    if (rich.avgInspectorWageUSD?.level2 && rich.avgInspectorWageUSD?.level3) {
      const l2 = rich.avgInspectorWageUSD.level2;
      const l3 = rich.avgInspectorWageUSD.level3;
      const delta = l3 - l2;
      segments.push(`Career math: completing Level II training in ${view.name} unlocks the ~$${l2.toLocaleString()}/yr band; the further progression to Level III lifts pay by ~$${delta.toLocaleString()}/yr — that gap is what most trainees plan their next 3-5 years against.`);
    }
    // Unique angle
    if (rich.uniqueAngles && rich.uniqueAngles.length >= 2) {
      segments.push(`Specialty pipelines worth knowing about: ${rich.uniqueAngles.slice(0, 2).join('; ')}.`);
    }
  }
  return segments.join(' ');
}

export function trainingCoursesForCity(view: CityView) {
  const methods = methodsForIndustries(view.industries);
  // Always expose the four mainline methods; supplement with industry-specific ones.
  const courses = [
    { code: 'UT-LII', title: 'Ultrasonic Testing — Level II', hours: 80, fee: 1900, prereq: 'High school maths; UT Level I documented experience hours' },
    { code: 'RT-LII', title: 'Radiographic Testing — Level II', hours: 80, fee: 2400, prereq: 'Radiation safety course + RT Level I experience hours' },
    { code: 'MT-LII', title: 'Magnetic Particle — Level II', hours: 16, fee: 850, prereq: 'High school qualification; MT Level I experience hours' },
    { code: 'PT-LII', title: 'Liquid Penetrant — Level II', hours: 16, fee: 750, prereq: 'High school qualification; PT Level I experience hours' },
  ];
  if (methods.some(m => m.toLowerCase().includes('paut'))) {
    courses.push({ code: 'PAUT', title: 'Phased Array Ultrasonic Testing', hours: 80, fee: 3200, prereq: 'ASNT Level II UT + 280 h documented PAUT experience' });
  }
  if (methods.some(m => m.toLowerCase().includes('tofd'))) {
    courses.push({ code: 'TOFD', title: 'Time-of-Flight Diffraction', hours: 40, fee: 2200, prereq: 'ASNT Level II UT + procedure-driven TOFD experience' });
  }
  if (methods.some(m => m.toLowerCase().includes('gwt'))) {
    courses.push({ code: 'GWT', title: 'Guided Wave Testing', hours: 40, fee: 2400, prereq: 'ASNT Level II UT + system-vendor training' });
  }
  if (view.industries.some(i => i.toLowerCase().includes('aerospace'))) {
    courses.push({ code: 'NAS410', title: 'NAS 410 Aerospace NDT Cert Prep', hours: 40, fee: 1800, prereq: 'Aerospace QC role with documented NDT experience' });
  }
  if (view.industries.some(i => i.toLowerCase().includes('refin') || i.toLowerCase().includes('petrochem') || i.toLowerCase().includes('pipeline'))) {
    courses.push({ code: 'API-510', title: 'API 510 Pressure Vessel Inspector — Exam Prep', hours: 60, fee: 2200, prereq: 'Inspection experience to API 510 §1.2 eligibility' });
    courses.push({ code: 'API-570', title: 'API 570 Piping Inspector — Exam Prep', hours: 60, fee: 2200, prereq: 'Piping inspection experience to API 570 §1.2 eligibility' });
  }
  return courses;
}

export function whoHiresAfter(view: CityView): string {
  const fac = view.namedFacilities && view.namedFacilities.length > 0
    ? view.namedFacilities.slice(0, 4).map(f => `${f.name} (${f.type})`).join(', ')
    : (view.keyFacilities && view.keyFacilities.length > 0
        ? view.keyFacilities.slice(0, 4).join(', ')
        : '');
  if (!fac) {
    return `Once certified, expect to be in front of inspection-services contractors and asset-owner mechanical-integrity teams across the ${view.name} metro on a near-continuous basis.`;
  }
  return `Once certified, the most active local hiring channels are inspection-services contractors with MSAs at ${fac}; the asset-owner mechanical-integrity teams at the same facilities also bring inspectors directly onto staff for owner-user inspection roles.`;
}

export function accreditationPath(view: CityView): string {
  const segments: string[] = [];
  segments.push(`The accreditation route in ${view.name} follows the same structure as the rest of the U.S. NDT industry: classroom training, documented experience hours under a Level III's written practice, vision and physical examinations, and a series of method-specific examinations.`);
  if (view.industries.some(i => i.toLowerCase().includes('aerospace'))) {
    segments.push(`If your career path is aerospace, the qualification scheme will typically be NAS 410 rather than the generic SNT-TC-1A — the former is mandatory for prime-contractor work and is policed harder under FAA Part 145 audits.`);
  }
  if (view.industries.some(i => i.toLowerCase().includes('nuclear'))) {
    segments.push(`Nuclear-industry inspectors layer ANSI N45.2.6 and ASME Section XI requirements on top of SNT-TC-1A; the additional documentation and oversight is non-negotiable on any Section XI ISI scope.`);
  }
  if (view.industries.some(i => i.toLowerCase().includes('refin') || i.toLowerCase().includes('petrochem') || i.toLowerCase().includes('pipeline'))) {
    segments.push(`For refining and pipeline work, plan to layer API 510 / 570 / 653 individual certifications on top of the underlying ASNT credentials — those API tickets are what unlock the inspection-engineer pay grade.`);
  }

  // V2 enrichment — pull jurisdiction-specific accreditation context from cities.json
  const rich = findRichCity(view.slug);
  if (rich) {
    if (rich.country === 'CA') {
      segments.push(`Canadian inspectors in ${view.name} also work to CGSB (Canadian General Standards Board) qualification under CAN/CGSB-48.9712 — many employers will accept either CGSB or ASNT certification, but provincial registration (e.g. ABSA in Alberta) is non-negotiable for in-service pressure equipment work.`);
    } else if (rich.country === 'UK') {
      segments.push(`In the UK the dominant qualification scheme is PCN (Personnel Certification in NDT) administered by BINDT — for UK-domiciled work most employers will not accept ASNT certification without separate UK paperwork; CSWIP is the parallel route for welding-adjacent inspection.`);
    } else if (rich.country === 'AU') {
      segments.push(`Australian inspectors in ${view.name} certify under AINDT — the Australian Institute for NDT issues the AS 3998 / ISO 9712 credentials; ASNT certifications are recognised but secondary, and many WA-based mining jobs require AS-only paperwork.`);
    } else if (rich.country === 'IN') {
      segments.push(`Indian inspectors in ${view.name} qualify under ISNT — the Indian Society for NDT — to IS:13805 / ISO 9712; for IBR-regulated boiler work, the additional IBR Form III certification path runs in parallel.`);
    } else if (rich.country === 'SA' || rich.country === 'AE' || rich.country === 'QA' || rich.country === 'KW') {
      segments.push(`Gulf-region inspectors in ${view.name} typically hold ASNT or ISO 9712 certification, but the binding gate is the asset-owner's vendor-approval programme: Aramco SAP-ER, ADNOC Tier-1 approval, QatarEnergy QE-VRR, and KOC vendor lists each have their own pre-qualification process and can take 6-18 months.`);
    } else if (rich.country === 'BR') {
      segments.push(`Brazilian inspectors in ${view.name} work to ABENDI Petrobras N-1738 / N-2055 standards — Petrobras-specific qualification is mandatory for upstream and downstream contractor work and is administered through ABENDI rather than the international schemes.`);
    } else if (rich.country === 'NO') {
      segments.push(`Norwegian-sector inspectors in ${view.name} certify to NORSOK M-101/M-501 standards alongside DNV-OS-F101 for offshore pipelines — the PSA Norway regulatory regime is markedly more prescriptive than the Gulf or USGOM analogues.`);
    }
    if (rich.apiExamCenter) {
      segments.push(`Practical note: ${view.name} hosts an API exam center, so 510/570/653 candidates can sit their exams locally — this typically saves 2-4 weeks on the credential timeline versus travelling to a regional hub.`);
    }
    if (rich.asntChapter && rich.asntChapter !== 'Regional ASNT chapter') {
      segments.push(`The ${rich.asntChapter} runs the local technical-meeting calendar and is the most efficient on-ramp for documented experience-hour signoffs from a Level III sponsor.`);
    }
  }
  return segments.join(' ');
}

export function cityFaqs(view: CityView, kind: 'careers' | 'training'): { q: string; a: string }[] {
  const rich = findRichCity(view.slug);
  const topEmp = rich?.majorEmployers?.[0];
  const topSite = rich?.majorPortsRefineriesPlants?.[0];
  const wage = rich?.avgInspectorWageUSD;
  const codes = rich?.regionalCodes?.slice(0, 2).join(' and ');

  if (kind === 'careers') {
    const baseFaqs = [
      {
        q: `What's the entry-level NDT salary in ${view.name}?`,
        a: wage?.level1
          ? `Entry-level NDT trainees in ${view.name} start around $${Math.round(wage.level1 * 0.7 / 1000)}K-$${(wage.level1 / 1000).toFixed(0)}K (BLS-anchored regional band). Once ASNT Level I certifications come in (typically 6-12 months), base pay steps to ~$${(wage.level1 / 1000).toFixed(0)}K-$${(wage.level2 || Math.round(wage.level1 * 1.4)) / 1000}K, with turnaround overtime layering on top.`
          : `Entry-level NDT trainees in ${view.name} typically start in the $${Math.round(38000 * salaryFactor(view.slug) / 1000)}K-$${Math.round(50000 * salaryFactor(view.slug) / 1000)}K range. Once Level I certifications come in (usually within 6-12 months) base pay steps up by 15-25%, and turnaround overtime then becomes the variable on top.`,
      },
      {
        q: `Which NDT certifications are most in-demand in ${view.name}?`,
        a: `${certificationsForCity(view).slice(0, 3).join('; ')} — these are the certifications that show up most often in local procurement and pre-qualification packages.${codes ? ` Note also ${codes} — local code references that procurement managers expect inspectors to be familiar with.` : ''}`,
      },
      {
        q: `Are remote / travel NDT roles available out of ${view.name}?`,
        a: rich?.transportSurchargeBand === 'high'
          ? `${view.name} is FIFO-heavy — most local NDT work involves rotation to remote sites with a per-diem premium. Travel-rotation positions dominate the local market, and willingness to mobilise is the standard expectation rather than the exception.`
          : `Yes. Most ${view.name}-based inspection contractors run a mix of local turnaround work and travel-rotation positions to other regions; a willingness to mobilise is one of the fastest ways to break into the industry from a Level I background.`,
      },
    ];

    // Add city-specific FAQs when rich data available
    if (topEmp) {
      baseFaqs.push({
        q: `Who are the largest NDT employers in ${view.name}?`,
        a: `The biggest single employer of NDT inspectors in ${view.name} is ${topEmp}; the broader top-five typically also includes ${rich?.majorEmployers?.slice(1, 5).join(', ') || 'a rotation of regional inspection-services contractors'}. Pre-qualification with the top three names unlocks the bulk of the local volume.`,
      });
    }
    if (rich?.uniqueAngles && rich.uniqueAngles.length >= 1) {
      baseFaqs.push({
        q: `What makes the ${view.name} NDT market different from neighbouring cities?`,
        a: `${rich.uniqueAngles[0]}${rich.uniqueAngles[1] ? ` Combined with: ${rich.uniqueAngles[1].toLowerCase()}` : ''}. These local specialties shape the kinds of credentials that get hired here vs. neighbouring metros.`,
      });
    }
    if (rich?.turnaroundSeasons && rich.turnaroundSeasons.length >= 1) {
      baseFaqs.push({
        q: `When does NDT hiring spike in ${view.name}?`,
        a: `Hiring follows the local turnaround calendar: ${rich.turnaroundSeasons.join('; ')}. Recruitment for these surge periods typically opens 60-90 days ahead, so positioning your resume by January for a spring TAR or July for an autumn TAR is the most effective approach.`,
      });
    }
    return baseFaqs;
  }

  // training
  const baseTrainingFaqs = [
    {
      q: `How long does ASNT Level II training take in ${view.name}?`,
      a: `Classroom training time is method-specific: UT Level II runs about 80 hours, RT Level II about 80 hours, MT and PT Level II about 16 hours each. Documented experience hours under your written practice run in parallel and are not bypassed by the classroom course.${rich?.asntChapter && rich.asntChapter !== 'Regional ASNT chapter' ? ` ${rich.asntChapter} hosts the local exam sittings.` : ''}`,
    },
    {
      q: `What does NDT certification cost in ${view.name}?`,
      a: `Course fees in ${view.name} typically run $750-$2,400 per ASNT Level II method, with PAUT and TOFD specialty courses at the upper end ($2,200-$3,200). API 510/570/653 exam-prep courses run $1,800-$2,500. Many local employers offer tuition reimbursement once you are on staff.${rich?.apiExamCenter ? ` ${view.name} hosts an API exam center, which saves travel costs on exam day.` : ''}`,
    },
    {
      q: `Where do graduates of ${view.name} NDT courses end up working?`,
      a: whoHiresAfter(view),
    },
  ];

  if (topSite) {
    baseTrainingFaqs.push({
      q: `What practical experience do ${view.name} NDT courses provide?`,
      a: `Hands-on lab work in ${view.name} typically includes specimens that mirror the real local fleet — ${topSite.name} (${topSite.type}${(topSite as any).scale ? ', ' + (topSite as any).scale : ''}) and similar sites. Trainees finish with familiarity to the equipment metallurgy and acceptance criteria they'll actually encounter on day one.`,
    });
  }
  if (rich?.industries && rich.industries.length >= 1) {
    baseTrainingFaqs.push({
      q: `Which NDT methods are most useful to learn in ${view.name}?`,
      a: `Industry weighting in ${view.name} (${rich.industries[0].name} = ${Math.round(rich.industries[0].weight * 100)}% of local industrial base) drives the answer: ${methodsForIndustries(view.industries).slice(0, 4).join(', ')} are the methods most often listed on local job postings. Focus your training spend on those before specialty methods.`,
    });
  }
  if (rich?.regionalCodes && rich.regionalCodes.length >= 1) {
    baseTrainingFaqs.push({
      q: `Do I need to learn local codes specific to ${view.name}?`,
      a: `Yes — beyond the generic ASME/API curriculum, local-authority references like ${rich.regionalCodes.slice(0, 3).join(', ')} apply in ${view.name} and show up in procedure-writing exam questions. Most local courses spend 8-16 hours on the regional-code module specifically.`,
    });
  }

  return baseTrainingFaqs;
}
