// ============================================================
// Shared pure helper that returns the visible body text for a
// city page (the same prose rendered in /ndt-services/[city]).
//
// Used by:
//   - scripts/check-content-uniqueness.ts  (Jaccard de-dupe check)
//   - any future server-side text extraction / SEO audit
//
// Pure: no React, no Node-only APIs. Safe to import from anywhere.
// ============================================================

import type { CityData } from './seo-data';
import { methods } from './seo-data';

/**
 * cityPageBody(city)
 *
 * Returns the concatenated user-visible text body of the
 * /ndt-services/[city] page, focused on the prose that should be UNIQUE
 * per city — hero, description, industries, named facilities, FAQ context.
 *
 * Excluded on purpose:
 *   - boilerplate stat cards ("Verified Inspectors…")
 *   - global method descriptions (identical across all cities)
 *   - identically-worded CTA copy
 *
 * Including those would make every pair of cities trivially exceed any
 * similarity threshold purely from shared template chrome, defeating the
 * purpose of the de-dupe check. The intent is to catch pages whose
 * SUBSTANTIVE copy (description, industries, facilities, FAQ details) is
 * a near-duplicate of another city.
 */
export function cityPageBody(city: CityData): string {
  const lines: string[] = [];

  // Hero — name + region + country (light templating, mostly unique by city)
  lines.push(`${city.name} ${city.region} ${city.country}`);

  // The big paragraph — should be the most-unique prose on the page.
  lines.push(city.description);

  // Industries (per-city list)
  for (const ind of city.industries) lines.push(ind);

  // Named facilities (most distinctive per-city content)
  for (const f of city.keyFacilities) lines.push(f);

  // FAQ body content that actually varies by city (industries + facilities)
  lines.push(
    `Key industries in ${city.name} requiring NDT services include ${city.industries.join(', ')}. ` +
      `Major facilities in the area include ${city.keyFacilities.join(', ')}.`,
  );

  return lines.join('\n');
}

/**
 * fullCityPageText(city)
 *
 * Returns the FULL text content as rendered (including templated chrome).
 * Useful for word-count audits, but not for similarity checks. Kept here
 * so future audit scripts have one source of truth.
 */
export function fullCityPageText(city: CityData): string {
  const dynamic = cityPageBody(city);
  const templated = [
    `NDT Services in ${city.name}, ${city.country}`,
    `Find certified non-destructive testing providers in ${city.name}. Book inspections online with instant quotes, real-time tracking, and verified expert inspectors.`,
    'Verified Inspectors Certified & qualified professionals',
    'Instant Quotes Get pricing in seconds',
    'Quality Assured Standards compliant',
    `Local Experts ${city.name} based services`,
    `NDT Methods Available in ${city.name}`,
    ...methods.slice(0, 6).flatMap((m) => [m.abbreviation, m.name, m.description, `${m.abbreviation} in ${city.name}`]),
    `Frequently Asked Questions - NDT in ${city.name}`,
    `How do I find NDT inspectors in ${city.name}?`,
    `What NDT services are available in ${city.name}?`,
    `How much do NDT services cost in ${city.name}?`,
    `Ready to Book NDT Services in ${city.name}?`,
  ].join('\n');
  return dynamic + '\n' + templated;
}

/**
 * Lowercase, strip punctuation, collapse whitespace — produces the token
 * stream used for shingling. Pure utility, exported so the de-dupe script
 * and any future audit tooling stay consistent.
 */
export function normalizeForShingling(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}
