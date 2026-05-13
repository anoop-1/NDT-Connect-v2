// List cities pruned by the publishable quality gate.
// Run: npx tsx scripts/list-pruned-cities.ts

import { CITIES, isCityPublishable } from '../data/cities';

const pruned = CITIES.filter((c) => !isCityPublishable(c));

const rows = pruned.map((c) => {
  const missing: string[] = [];
  if (!Array.isArray(c.industries) || c.industries.length < 3) {
    missing.push(`industries=${c.industries?.length ?? 0}`);
  }
  if (!Array.isArray(c.namedFacilities) || c.namedFacilities.length < 2) {
    missing.push(`facilities=${c.namedFacilities?.length ?? 0}`);
  }
  if (
    typeof c.localPainQuote !== 'string' ||
    c.localPainQuote.trim() === ''
  ) {
    missing.push('no localPainQuote');
  }
  return {
    slug: c.slug,
    name: c.name,
    state: c.state,
    country: c.country,
    tier: c.tier,
    missing: missing.join(', '),
  };
});

rows.sort((a, b) => a.tier - b.tier || a.slug.localeCompare(b.slug));

console.log(`Total pruned: ${rows.length}`);
console.log('');
console.log('tier  slug                                  name (state)               missing');
console.log('----  ------------------------------------  -------------------------  ---------------------------------');
for (const r of rows) {
  const t = String(r.tier).padEnd(4);
  const s = r.slug.padEnd(36).slice(0, 36);
  const n = `${r.name} (${r.state})`.padEnd(25).slice(0, 25);
  console.log(`${t}  ${s}  ${n}  ${r.missing}`);
}
