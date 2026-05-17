// lib/seo/methods-rich.ts
//
// Loader and typed accessor for the rich method dataset that lives in
// data/methods.json. Parallels lib/seo/cities-rich.ts.
//
// data/methods.json is keyed by NDT short code (UT, RT, MT, PT, VT, PAUT,
// TOFD, ECT, GWT, AE, LT, IRT). The route system uses long slug forms
// ("ultrasonic-testing" etc.), so this module provides the slug ↔ code
// translation in one place.

import methodsJson from '@/data/methods.json';

// ----------------------------------------------------------------------------
// Schema
// ----------------------------------------------------------------------------

export interface RichDayRate {
  level1?: { low: number; high: number };
  level2?: { low: number; high: number };
  level3?: { low: number; high: number };
  autSpecialist?: { low: number; high: number };
  combinedPaut?: { low: number; high: number };
  cwi?: { low: number; high: number };
  api510?: { low: number; high: number };
  api570?: { low: number; high: number };
  api653?: { low: number; high: number };
  borescopeTech?: { low: number; high: number };
  notes?: string;
  crewMin?: string;
  scannerOpAddl?: number;
}

export interface RichTrainingHours {
  level1?: number;
  level2?: number;
  level3?: number;
  experienceL1Hours?: number;
  experienceL2Hours?: number;
  experienceHours?: number;
  totalL2?: number;
  totalL2Build?: number;
  radSafetyHours?: number;
  industry?: string;
  prereq?: string;
  prerequisitePAUT?: string;
}

export interface RichCodeRefs {
  asme?: string[];
  aws?: string[];
  api?: string[];
  iso?: string[];
  astm?: string[];
  military?: string[];
  regulatory?: string[];
  aerospace?: string[];
}

export interface RichMethod {
  code: string;
  name: string;
  fullName?: string;
  category?: string;
  discoveryYear?: number;
  principle?: string;
  typicalUseCases?: string[];
  primaryIndustries?: string[];
  equipmentRanges?: Record<string, unknown>;
  calibrationRequirements?: Record<string, unknown>;
  codeReferences?: RichCodeRefs;
  dayRateRangeUSD?: RichDayRate;
  trainingHoursMinimum?: RichTrainingHours;
  prerequisiteCertifications?: string[];
  outputArtifacts?: string[];
  limitationsAndCaveats?: string[];
  complementaryMethods?: string[];
  averageInspectionRateSqFtPerHour?: number;
  averageInspectionRateInchesWeldPerHour?: number;
  averageInspectionRateExposuresPerShift?: number;
  typicalProjectMix?: Record<string, number>;
}

// ----------------------------------------------------------------------------
// Slug ↔ code map (route slug → method code)
// ----------------------------------------------------------------------------

export const SLUG_TO_CODE: Record<string, string> = {
  'ultrasonic-testing': 'UT',
  'radiographic-testing': 'RT',
  'magnetic-particle-testing': 'MT',
  'penetrant-testing': 'PT',
  'visual-testing': 'VT',
  'phased-array-ut': 'PAUT',
  'time-of-flight-diffraction': 'TOFD',
  'eddy-current-testing': 'ECT',
  'guided-wave-testing': 'GWT',
  'acoustic-emission': 'AE',
  'leak-testing': 'LT',
  'thermography': 'IRT',
};

// ----------------------------------------------------------------------------
// Cached, code-keyed access
// ----------------------------------------------------------------------------

type RawJson = Record<string, unknown>;
const RAW = methodsJson as RawJson;

let cache: Record<string, RichMethod> | null = null;
const warnedKeys = new Set<string>();

function buildCache(): Record<string, RichMethod> {
  const out: Record<string, RichMethod> = {};
  for (const [key, value] of Object.entries(RAW)) {
    if (key.startsWith('_')) continue;
    if (!value || typeof value !== 'object') continue;
    const v = value as Partial<RichMethod>;
    if (!v.name) continue;
    out[key] = { ...(v as RichMethod), code: v.code ?? key };
  }
  return out;
}

export function findRichMethodByCode(code: string): RichMethod | null {
  if (!cache) cache = buildCache();
  return cache[code] ?? null;
}

export function findRichMethodBySlug(slug: string): RichMethod | null {
  const code = SLUG_TO_CODE[slug];
  if (!code) {
    if (!warnedKeys.has(slug)) {
      // eslint-disable-next-line no-console
      console.warn(`[seo/methods-rich] no code mapping for method slug "${slug}"`);
      warnedKeys.add(slug);
    }
    return null;
  }
  const m = findRichMethodByCode(code);
  if (!m && !warnedKeys.has(code)) {
    // eslint-disable-next-line no-console
    console.warn(`[seo/methods-rich] code "${code}" missing from data/methods.json`);
    warnedKeys.add(code);
  }
  return m;
}

// ----------------------------------------------------------------------------
// Helpers — typical day rate, hours-to-Level-II, code lists
// ----------------------------------------------------------------------------

export function typicalLevel2DayRate(method: RichMethod): { low: number; high: number } {
  const dr = method.dayRateRangeUSD;
  if (!dr) return { low: 600, high: 1100 };
  if (dr.level2) return dr.level2;
  // VT and a few other methods don't list a generic level2 — they list role
  // bands (cwi, api510, etc.). Return the first available role band as the
  // representative Level II rate.
  if (dr.cwi) return dr.cwi;
  if (dr.api510) return dr.api510;
  if (dr.api570) return dr.api570;
  if (dr.api653) return dr.api653;
  if (dr.borescopeTech) return dr.borescopeTech;
  if (dr.level3) return { low: Math.round(dr.level3.low * 0.7), high: Math.round(dr.level3.high * 0.7) };
  return { low: 600, high: 1100 };
}

export function totalLevel2TrainingHours(method: RichMethod): number {
  const t = method.trainingHoursMinimum;
  if (!t) return 800;
  if (t.totalL2) return t.totalL2;
  if (t.totalL2Build) return t.totalL2Build;
  const cls = t.level2 ?? 40;
  const exp = t.experienceL2Hours ?? t.experienceHours ?? 760;
  return cls + exp;
}

export function aggregateCodeRefs(method: RichMethod): string[] {
  const r = method.codeReferences;
  if (!r) return [];
  const out: string[] = [];
  for (const arr of [r.asme, r.aws, r.api, r.iso, r.astm, r.regulatory, r.military, r.aerospace]) {
    if (Array.isArray(arr)) out.push(...arr);
  }
  return out;
}
