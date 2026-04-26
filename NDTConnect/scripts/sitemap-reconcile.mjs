#!/usr/bin/env node
// scripts/sitemap-reconcile.mjs
//
// PROBLEM:
//   The live https://ndt-connect.com/sitemap.xml is ~555 KB and contains
//   many URLs that have no corresponding source-controlled route in this
//   codebase. The live sitemap is being generated outside this repo (likely
//   by an older build script or a previous deployment). When we ship the new
//   source-controlled `app/sitemap.ts`, any URL that *only* lives in the
//   external sitemap will silently disappear from search-engine indexes.
//
// WHAT THIS SCRIPT DOES:
//   1. Fetches the live sitemap (and any sub-sitemaps from a sitemap-index).
//   2. Fetches the locally-generated sitemap (from a running `next start`
//      or a pre-built `.next` server).
//   3. Diffs the two URL sets.
//   4. Categorises every URL into one of:
//        - kept             : in both
//        - new-in-source    : in source, not in live (we are introducing)
//        - missing-in-source: in live, not in source — these are at risk
//   5. For each "missing-in-source" URL it HEAD-checks the live URL to see
//      whether the URL still resolves on production today. If it does, we
//      either need to add a route, redirect it, or accept losing it.
//   6. Writes a JSON + markdown report under `scripts/output/sitemap-recon/`.
//   7. Optionally fails CI (exit 1) if there are uncategorised URLs that
//      would be lost.
//
// USAGE:
//   node scripts/sitemap-reconcile.mjs                              # report only
//   node scripts/sitemap-reconcile.mjs --local http://localhost:3000# vs running server
//   node scripts/sitemap-reconcile.mjs --strict                     # exit 1 on losses
//   node scripts/sitemap-reconcile.mjs --redirect-csv               # generate redirects.csv
//
// CI:
//   Add to .github/workflows/seo.yml as a build-gate step:
//     - run: npm run build && (npm run start &) && sleep 5 && \
//             node scripts/sitemap-reconcile.mjs --local http://localhost:3000 --strict

import fs from 'node:fs';
import path from 'node:path';

const LIVE_SITEMAP = 'https://ndt-connect.com/sitemap.xml';
const ARGS = new Set(process.argv.slice(2));
const LOCAL_BASE = (() => {
  const i = process.argv.indexOf('--local');
  return i > -1 ? process.argv[i + 1] : 'https://ndt-connect.com';
})();
const STRICT = process.argv.includes('--strict');
const EMIT_REDIRECTS = process.argv.includes('--redirect-csv');

const OUT_DIR = path.join(process.cwd(), 'scripts', 'output', 'sitemap-recon');
fs.mkdirSync(OUT_DIR, { recursive: true });

// Allowlist: URL patterns that are intentionally retired (410 Gone).
// Add patterns here when you decide a URL should NOT be redirected and
// should serve a tombstone. Each entry is a JS regex source.
const RETIRED_PATTERNS = [
  // Examples — tune to your actual retirements:
  // '^https://ndt-connect.com/old-feature/.+$',
];

// Allowlist: URL patterns that are auth-gated and DO NOT belong in the
// public sitemap. If we see them in `live` and they're auth-gated in code,
// suppress them from the report.
const AUTH_GATED_PATTERNS = [
  '^https://ndt-connect.com/admin/',
  '^https://ndt-connect.com/dashboard/',
  '^https://ndt-connect.com/api/',
  '^https://ndt-connect.com/settings/',
  '^https://ndt-connect.com/my-requests',
  '^https://ndt-connect.com/provider-dashboard',
  '^https://ndt-connect.com/provider-profile',
  '^https://ndt-connect.com/provider-requests',
  '^https://ndt-connect.com/track-request',
];

const isAuthGated = (url) => AUTH_GATED_PATTERNS.some(p => new RegExp(p).test(url));
const isRetired   = (url) => RETIRED_PATTERNS.some(p => new RegExp(p).test(url));

async function fetchText(url, { timeoutMs = 30_000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal, redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

async function headStatus(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15_000);
  try {
    const res = await fetch(url, { method: 'HEAD', signal: ctrl.signal, redirect: 'manual' });
    return res.status;
  } catch {
    return 0;
  } finally {
    clearTimeout(t);
  }
}

function extractUrls(xml) {
  // Tolerant extraction; works for sitemap and sitemap-index variants.
  const urls = [];
  const reLoc = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = reLoc.exec(xml)) !== null) urls.push(m[1].trim());
  return urls;
}

async function expandSitemap(rootUrl) {
  const xml = await fetchText(rootUrl);
  const locs = extractUrls(xml);
  // Detect sitemap-index by the presence of <sitemap> tags.
  const isIndex = /<sitemap>/i.test(xml);
  if (!isIndex) return new Set(locs);

  const all = new Set();
  for (const sub of locs) {
    try {
      const subXml = await fetchText(sub);
      for (const u of extractUrls(subXml)) all.add(u);
    } catch (e) {
      console.warn(`[warn] could not fetch sub-sitemap ${sub}: ${e.message}`);
    }
  }
  return all;
}

function classify(missing) {
  return missing
    .filter(u => !isAuthGated(u))
    .map(u => ({
      url: u,
      retired: isRetired(u),
    }));
}

async function main() {
  console.log('[recon] fetching live sitemap...');
  const live = await expandSitemap(LIVE_SITEMAP);
  console.log(`[recon] live URLs: ${live.size}`);

  console.log('[recon] fetching local sitemap from', LOCAL_BASE);
  const local = await expandSitemap(`${LOCAL_BASE}/sitemap.xml`);
  console.log(`[recon] local URLs: ${local.size}`);

  const kept = [];
  const newInSource = [];
  const missingInSource = [];

  for (const u of local) (live.has(u) ? kept : newInSource).push(u);
  for (const u of live) if (!local.has(u)) missingInSource.push(u);

  const flagged = classify(missingInSource);
  console.log(`[recon] kept: ${kept.length}`);
  console.log(`[recon] new in source: ${newInSource.length}`);
  console.log(`[recon] missing in source (after auth-gate filter): ${flagged.length}`);

  // HEAD-check the missing-in-source URLs (sample up to 50 for speed).
  const sample = flagged.slice(0, 50);
  for (const row of sample) {
    row.liveStatus = await headStatus(row.url);
  }

  // Persist outputs.
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportJson = path.join(OUT_DIR, `recon-${stamp}.json`);
  const reportMd   = path.join(OUT_DIR, `recon-${stamp}.md`);

  fs.writeFileSync(reportJson, JSON.stringify({
    liveCount: live.size,
    localCount: local.size,
    kept,
    newInSource,
    missingInSource: flagged,
    sampledHeadCount: sample.length,
    generatedAt: new Date().toISOString(),
  }, null, 2));

  const md = [];
  md.push(`# Sitemap reconciliation — ${new Date().toISOString()}`);
  md.push('');
  md.push(`- live URLs: **${live.size}**`);
  md.push(`- local URLs (from ${LOCAL_BASE}): **${local.size}**`);
  md.push(`- kept (in both): **${kept.length}**`);
  md.push(`- new in source (we are introducing): **${newInSource.length}**`);
  md.push(`- missing in source (at risk): **${flagged.length}** (auth-gated suppressed)`);
  md.push('');
  if (flagged.length === 0) {
    md.push('✅ No URLs at risk. Safe to ship the source-controlled sitemap.');
  } else {
    md.push(`## At-risk URLs (first ${sample.length} HEAD-checked)`);
    md.push('');
    md.push('| URL | live HTTP | retired? |');
    md.push('|---|---|---|');
    for (const r of sample) md.push(`| ${r.url} | ${r.liveStatus} | ${r.retired ? 'yes' : 'no'} |`);
    md.push('');
    md.push('## Action required');
    md.push('');
    md.push('For each at-risk URL, choose ONE of:');
    md.push('1. **Add a route** in `src/app/...` so it lives in the new sitemap. Best for URLs that still earn impressions.');
    md.push('2. **Redirect** via `next.config.js` `redirects()` to a similar live URL. Use 308 (permanent).');
    md.push('3. **Retire (410 Gone)** — add the URL pattern to `RETIRED_PATTERNS` in this script and ship a `not-found.tsx` for the route. Use only when the URL has no replacement and zero traffic.');
    md.push('');
    if (EMIT_REDIRECTS) {
      const csv = path.join(OUT_DIR, `redirects-${stamp}.csv`);
      fs.writeFileSync(csv,
        ['source,destination,status', ...flagged.map(r => `${r.url},/, 308`)].join('\n')
      );
      md.push(`*A redirects CSV scaffold has been written to ${csv}. Edit it before pasting into next.config.js.*`);
    }
  }

  fs.writeFileSync(reportMd, md.join('\n'));
  console.log('[recon] wrote', reportMd);
  console.log('[recon] wrote', reportJson);

  if (STRICT && flagged.length > 0) {
    console.error('[recon] STRICT: failing because at-risk URLs exist.');
    process.exit(1);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(2);
});
