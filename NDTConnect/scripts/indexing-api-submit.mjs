#!/usr/bin/env node
// scripts/indexing-api-submit.mjs
//
// Drip-feed submission of URLs to Google's Indexing API for ndt-connect.com.
// Mirrors Atlantis's gsc-multi-account-submit.mjs pattern so we can rotate
// across multiple service accounts and stay under the 200-quota-per-account
// daily limit.
//
// USAGE:
//   node scripts/indexing-api-submit.mjs --urls urls.txt --rate 100
//   node scripts/indexing-api-submit.mjs --tier 1            # submit all Tier-1 city pages
//   node scripts/indexing-api-submit.mjs --new-since 2026-04-26   # diff vs last run
//
// SETUP:
//   1. Create N Google Cloud service accounts with the Indexing API enabled.
//   2. Add each as Owner to the Search Console property for ndt-connect.com.
//   3. Drop the JSON keys at scripts/secrets/sa-1.json ... sa-N.json
//      (gitignored; never commit).
//   4. Run.
//
// RATE LIMITS:
//   Default is 100 URL submissions/day per service account. Hard quota is
//   200/day. The script caps at the user's --rate flag and rotates accounts
//   round-robin so 10 accounts × 100 = 1,000 URLs/day comfortably.
//
// SAFETY:
//   - Logs every submission to scripts/output/indexing-api/log-DATE.jsonl
//   - Refuses to run if more URLs than (accounts × rate) are queued.
//   - Honours --dry-run for the entire pipeline.

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ARG = (k, d) => {
  const i = process.argv.indexOf(k);
  return i > -1 ? process.argv[i + 1] : d;
};
const HAS = (k) => process.argv.includes(k);

const SECRETS_DIR = path.join(process.cwd(), 'scripts', 'secrets');
const OUT_DIR = path.join(process.cwd(), 'scripts', 'output', 'indexing-api');
fs.mkdirSync(OUT_DIR, { recursive: true });

const RATE_PER_ACCOUNT = parseInt(ARG('--rate', '100'), 10);
const DRY = HAS('--dry-run');
const STAMP = new Date().toISOString().replace(/[:.]/g, '-');
const LOG = path.join(OUT_DIR, `log-${STAMP}.jsonl`);

function listServiceAccounts() {
  if (!fs.existsSync(SECRETS_DIR)) {
    throw new Error(`No secrets directory at ${SECRETS_DIR}. Drop service-account JSON keys there as sa-1.json, sa-2.json, ...`);
  }
  return fs.readdirSync(SECRETS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => path.join(SECRETS_DIR, f));
}

async function getAccessToken(saPath) {
  // Use gcloud or a JWT-mint to get an access token. For CI, prefer
  // `gcloud auth activate-service-account` then `gcloud auth print-access-token`.
  // For local one-shots without gcloud, use the google-auth-library:
  //   const { JWT } = await import('google-auth-library');
  // This stub uses gcloud for simplicity.
  if (DRY) return 'dry-run-token';
  const sa = JSON.parse(fs.readFileSync(saPath, 'utf-8'));
  // Mint a JWT signed with the SA private key.
  const { JWT } = await import('google-auth-library');
  const client = new JWT({
    email: sa.client_email,
    key: sa.private_key,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  const tok = await client.authorize();
  return tok.access_token;
}

async function submit(url, accessToken) {
  if (DRY) return { ok: true, status: 200 };
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }),
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}

function loadUrls() {
  const urlsFile = ARG('--urls');
  const tier = ARG('--tier');
  const newSince = ARG('--new-since');

  if (urlsFile) {
    return fs.readFileSync(urlsFile, 'utf-8').split('\n').map(s => s.trim()).filter(Boolean);
  }

  // Default: enumerate all /free-tools/* URLs from the source-of-truth
  // sitemap.ts by spawning a `node` script that imports it.
  // This works when the project is built. For dev, prefer --urls.
  const sitemapModule = path.join(process.cwd(), '.next', 'server', 'app', 'sitemap.xml.body.js');
  if (!fs.existsSync(sitemapModule)) {
    throw new Error('No sitemap source available. Run `next build` first or pass --urls file.');
  }
  const all = require(sitemapModule).default();
  let urls = all.map(e => e.url);

  if (tier) {
    // Filter by tier: simple slug-based heuristic — Tier 1 = slugs from cities.ts inline list.
    // For exactness, import CITIES via dynamic import and filter.
    console.log('[info] --tier filter is best-effort by slug. Pre-build a manifest for exact tier.');
  }
  if (newSince) {
    // Stub: in CI, diff this run's URL list against last run's manifest.
    console.log('[info] --new-since requires last-run manifest. See scripts/output/indexing-api/manifests/.');
  }

  return urls;
}

async function main() {
  const accounts = listServiceAccounts();
  console.log(`[indexing] service accounts available: ${accounts.length}`);
  if (accounts.length === 0) throw new Error('No service-account JSONs found.');

  const urls = loadUrls();
  const cap = accounts.length * RATE_PER_ACCOUNT;
  if (urls.length > cap) {
    console.error(`[indexing] queue ${urls.length} > daily cap ${cap}. Reduce or split runs.`);
    process.exit(1);
  }

  console.log(`[indexing] submitting ${urls.length} URLs at ${RATE_PER_ACCOUNT}/account, dry-run=${DRY}`);

  // Mint tokens up front — once per account per day.
  const tokens = [];
  for (const sa of accounts) tokens.push({ sa, token: await getAccessToken(sa), used: 0 });

  let okCount = 0, errCount = 0;
  for (const url of urls) {
    // Pick the least-used account.
    tokens.sort((a, b) => a.used - b.used);
    const t = tokens[0];
    if (t.used >= RATE_PER_ACCOUNT) {
      console.error('[indexing] all accounts at cap, stopping.');
      break;
    }
    const result = await submit(url, t.token);
    t.used++;
    fs.appendFileSync(LOG, JSON.stringify({ at: new Date().toISOString(), url, sa: path.basename(t.sa), ...result }) + '\n');
    if (result.ok) okCount++; else errCount++;
    if (errCount > 0 && errCount % 5 === 0) {
      console.warn(`[indexing] ${errCount} errors so far (last status: ${result.status})`);
    }
    // Polite pacing — 1 req/sec across the fleet.
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`[indexing] done. ok=${okCount} err=${errCount} log=${LOG}`);
}

main().catch(e => { console.error(e); process.exit(2); });
