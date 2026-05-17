// lib/content/glossary-facts.ts
//
// Loads the per-term fact rows from data/glossary.json and exposes a
// typed accessor used by /glossary/[term]/page.tsx to render an extra
// "Quick Reference Facts" panel.
//
// Adds 8 unique fact-rows per term (etymology, formula, units, range,
// equipment, code refs, worked example, misconception). Pages whose
// slug is not in glossary.json simply do not render the panel — no
// breakage, no fabricated facts.

import factsRaw from '@/data/glossary.json';

export interface GlossaryFacts {
  etymology?: string;
  formula?: string;
  units?: string;
  typicalRange?: string;
  measuredBy?: string;
  codeReferences?: string[];
  workedExample?: string;
  misconception?: string;
}

// Strip _meta key which is not a term
const facts: Record<string, GlossaryFacts> = (() => {
  const out: Record<string, GlossaryFacts> = {};
  const entries = Object.entries(factsRaw as Record<string, unknown>);
  for (const [k, v] of entries) {
    if (k === '_meta') continue;
    out[k] = v as GlossaryFacts;
  }
  return out;
})();

export function getGlossaryFacts(slug: string): GlossaryFacts | null {
  return facts[slug] ?? null;
}

export function hasGlossaryFacts(slug: string): boolean {
  return slug in facts;
}
