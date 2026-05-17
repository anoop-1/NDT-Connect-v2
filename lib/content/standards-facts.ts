// lib/content/standards-facts.ts
//
// Loads the per-standard fact rows from data/standards.json and exposes
// a typed accessor used by /standards/[code]/page.tsx to render an
// extra "Quick Reference" panel with edition year, key clauses, and
// sample contract language.
//
// Pages whose slug is not in standards.json simply do not render the
// panel — no breakage, no fabricated facts.

import factsRaw from '@/data/standards.json';

export interface StandardFacts {
  latestEdition?: string;
  originYear?: number;
  scope?: string;
  keyClauses?: string[];
  acceptanceCriteria?: string;
  calibrationOrQualification?: string;
  relatedStandards?: string[];
  typicalContractLanguage?: string;
}

const facts: Record<string, StandardFacts> = (() => {
  const out: Record<string, StandardFacts> = {};
  const entries = Object.entries(factsRaw as Record<string, unknown>);
  for (const [k, v] of entries) {
    if (k === '_meta') continue;
    out[k] = v as StandardFacts;
  }
  return out;
})();

export function getStandardFacts(slug: string): StandardFacts | null {
  return facts[slug] ?? null;
}

export function hasStandardFacts(slug: string): boolean {
  return slug in facts;
}
