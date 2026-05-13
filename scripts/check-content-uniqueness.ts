/* eslint-disable no-console */
/**
 * check-content-uniqueness.ts
 *
 * Build-time guardrail: refuses to ship if any two /ndt-services/[city]
 * pages share more than 70% Jaccard similarity over their 5-word shingles.
 *
 * Run:  npm run check-content-uniqueness
 * Exit codes:
 *   0 — no near-duplicates above threshold
 *   1 — at least one near-duplicate pair detected (logged)
 *   2 — internal error (data load failure, etc.)
 *
 * Why shingling? It's the same de-dupe technique Google uses (MinHash /
 * k-shingles) — it ignores word order on the small scale but stays robust
 * to copy-paste prose. 5-word k-grams sit in the sweet spot for English
 * SEO body text.
 *
 * NOTE: We do NOT render Next.js pages — too slow. Instead we import
 * `cityPageBody(city)` from `@/lib/city-page-body`, which is the pure
 * function shared with the actual page renderer.
 */

import { cities } from '../lib/seo-data';
import { cityPageBody, normalizeForShingling } from '../lib/city-page-body';

const SHINGLE_SIZE = 5;
const THRESHOLD = 0.7;

/** Build the set of k-word shingles from a token list. */
function shingles(tokens: string[], k = SHINGLE_SIZE): Set<string> {
  const out = new Set<string>();
  if (tokens.length < k) {
    if (tokens.length > 0) out.add(tokens.join(' '));
    return out;
  }
  for (let i = 0; i <= tokens.length - k; i++) {
    out.add(tokens.slice(i, i + k).join(' '));
  }
  return out;
}

/** Jaccard similarity between two sets. */
function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let inter = 0;
  // iterate the smaller set
  const [s, l] = a.size <= b.size ? [a, b] : [b, a];
  for (const v of s) if (l.has(v)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

interface Violation {
  a: string;
  b: string;
  similarity: number;
}

function main(): number {
  if (!Array.isArray(cities) || cities.length === 0) {
    console.error('[uniqueness] No cities found in lib/seo-data. Aborting.');
    return 2;
  }

  console.log(`[uniqueness] Computing shingles for ${cities.length} city pages…`);

  const sets: { slug: string; name: string; shingles: Set<string>; tokens: number }[] = [];
  for (const city of cities) {
    let body: string;
    try {
      body = cityPageBody(city);
    } catch (err) {
      console.error(`[uniqueness] Failed to build body for "${city.slug}":`, err);
      return 2;
    }
    const tokens = normalizeForShingling(body);
    sets.push({
      slug: city.slug,
      name: city.name,
      shingles: shingles(tokens),
      tokens: tokens.length,
    });
  }

  const allPairs: Violation[] = [];
  for (let i = 0; i < sets.length; i++) {
    for (let j = i + 1; j < sets.length; j++) {
      allPairs.push({
        a: sets[i].slug,
        b: sets[j].slug,
        similarity: jaccard(sets[i].shingles, sets[j].shingles),
      });
    }
  }
  allPairs.sort((x, y) => y.similarity - x.similarity);

  const violations = allPairs.filter((p) => p.similarity > THRESHOLD);

  console.log(
    `[uniqueness] Compared ${allPairs.length} pairs · threshold = ${THRESHOLD} Jaccard on ${SHINGLE_SIZE}-grams.`,
  );

  const top = allPairs.slice(0, 5);
  if (top.length > 0) {
    console.log('[uniqueness] Top 5 closest pairs:');
    for (const p of top) {
      console.log(`  - ${p.a}  <-> ${p.b}   ${(p.similarity * 100).toFixed(1)}%`);
    }
  }

  if (violations.length === 0) {
    console.log(`[uniqueness] OK — no city pairs exceed ${(THRESHOLD * 100).toFixed(0)}% similarity.`);
    return 0;
  }

  console.error(
    `\n[uniqueness] FAIL — ${violations.length} city pair(s) exceed ${(THRESHOLD * 100).toFixed(0)}% similarity:`,
  );
  for (const v of violations) {
    console.error(
      `  * ${v.a}  <-> ${v.b}   ${(v.similarity * 100).toFixed(1)}%   (threshold ${(THRESHOLD * 100).toFixed(0)}%)`,
    );
  }
  console.error(
    '\n  Fix: differentiate the city descriptions, FAQ answers, or named facilities ' +
      'in lib/seo-data.ts / lib/city-page-body.ts so each city has unique prose.\n',
  );
  return 1;
}

const exitCode = main();
process.exit(exitCode);
