// Verify every city-slug destination in lib/legacy-slug-redirects.js
// exists in data/cities.ts. Catches typos before a build ships dead 301s.

import { CITIES } from '../data/cities';
// @ts-ignore — CommonJS interop with .js file
import legacyMap from '../lib/legacy-slug-redirects';

const { CITY_SLUG_MAP, COUNTRY_FALLBACK_MAP } = legacyMap;

const slugs = new Set(CITIES.map((c) => c.slug));

let bad = 0;
console.log(`Verifying ${Object.keys(CITY_SLUG_MAP).length} CITY_SLUG_MAP entries against ${slugs.size} canonical slugs...`);
console.log('');

for (const [oldSlug, newSlug] of Object.entries(CITY_SLUG_MAP) as [string, string][]) {
  if (!slugs.has(newSlug)) {
    console.log(`  MISSING: ${oldSlug} -> ${newSlug}  (no canonical row in data/cities.ts)`);
    bad += 1;
  }
}

console.log('');
if (bad === 0) {
  console.log('OK — every redirect destination exists.');
} else {
  console.log(`FAIL — ${bad} redirect(s) point at missing canonical slugs. Fix before shipping.`);
  process.exit(1);
}

console.log('');
console.log(`COUNTRY_FALLBACK_MAP: ${Object.keys(COUNTRY_FALLBACK_MAP).length} entries (manually verified, no slug check needed).`);
