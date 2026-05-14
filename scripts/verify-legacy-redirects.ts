// Verify every city-slug destination in lib/legacy-slug-redirects.js
// exists in data/cities.ts. Catches typos before a build ships dead 301s.

import { CITIES } from '../data/cities';
import { CITY_SLUG_MAP, COUNTRY_FALLBACK_MAP, resolveLegacyRedirect } from '../lib/legacy-slug-redirects';

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

// Smoke-test the resolver against a few representative legacy paths.
console.log('');
console.log('Smoke-tests:');
const cases: [string, string][] = [
  ['/ndt-services/houston', '/ndt-services/houston-tx'],
  ['/ndt-services/houston/radiographic-testing', '/ndt-services/houston-tx/radiographic-testing'],
  ['/ndt-services/houston/eddy-current-testing', '/ndt-services/houston-tx'],
  ['/ndt-services/saudi-arabia', '/find-providers?country=sa'],
  ['/cost-guide/dubai/radiographic-testing', '/cost-guide/dubai-ae/radiographic-testing'],
  ['/training/bangalore', '/training/bangalore-in'],
  ['/careers/sydney', '/careers/sydney-au'],
  ['/ndt-services/houston-tx', null as unknown as string],  // canonical, no redirect
];
let smokeFails = 0;
for (const [input, expected] of cases) {
  const got = resolveLegacyRedirect(input);
  const ok = got === expected;
  if (!ok) smokeFails += 1;
  console.log(`  ${ok ? 'OK ' : 'FAIL'}  ${input}  ->  ${got ?? '(no redirect)'}${ok ? '' : `  (expected ${expected ?? '(no redirect)'})`}`);
}
if (smokeFails > 0) {
  console.log(`Smoke-test failures: ${smokeFails}`);
  process.exit(1);
}
