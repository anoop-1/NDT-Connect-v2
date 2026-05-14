// lib/legacy-slug-redirects.js
//
// Maps legacy URL slugs to current canonical slugs. Generated from the
// pre-unification sitemap (lib/seo-data.ts, 75 hand-coded slugs) against the
// current PUBLISHABLE_CITIES (state/country-suffixed slugs in data/cities.ts).
//
// Used by next.config.js `redirects()` to 301 every legacy URL to its
// best-effort canonical replacement. Preserves backlinks and recovers any
// remaining SERP equity from the old slug set.
//
// IMPORTANT: this file is CommonJS so it can be required from next.config.js
// without a TS toolchain in the build step.

/** Old-slug → new-slug mapping for cities that still exist. */
const CITY_SLUG_MAP = {
  // ---- US Tier 1 ----
  'houston': 'houston-tx',
  'los-angeles': 'los-angeles-ca',
  'new-orleans': 'new-orleans-la',
  'denver': 'denver-co',
  'chicago': 'chicago-il',
  'seattle': 'seattle-wa',
  'dallas': 'dallas-tx',
  'phoenix': 'phoenix-az',
  'philadelphia': 'philadelphia-pa',
  'san-francisco': 'san-francisco-ca',
  'detroit': 'detroit-mi',
  'pittsburgh': 'pittsburgh-pa',
  'baton-rouge': 'baton-rouge-la',
  'corpus-christi': 'corpus-christi-tx',
  'tulsa': 'tulsa-ok',
  'beaumont': 'beaumont-tx',
  'new-york': 'new-york-ny',
  'boston': 'boston-ma',
  'atlanta': 'atlanta-ga',
  'miami': 'miami-fl',

  // ---- Middle East ----
  'dubai': 'dubai-ae',
  'abu-dhabi': 'abu-dhabi-ae',
  'qatar': 'doha-qa',
  'kuwait': 'kuwait-city-kw',
  'bahrain': 'manama-bh',
  'oman': 'muscat-om',
  'jubail': 'jubail-sa',
  'yanbu': 'yanbu-sa',
  'dammam': 'dammam-sa',

  // ---- India ----
  'mumbai': 'mumbai-in',
  'hyderabad': 'hyderabad-in',
  'bangalore': 'bangalore-in',
  'chennai': 'chennai-in',
  'delhi': 'delhi-in',
  'kolkata': 'kolkata-in',
  'pune': 'pune-in',
  'ahmedabad': 'ahmedabad-in',
  'kochi': 'kochi-in',
  'vizag': 'visakhapatnam-in',
  'jamnagar': 'jamnagar-in',

  // ---- SE Asia ----
  'singapore': 'singapore-sg',

  // ---- Europe ----
  'london': 'london-uk',
  'aberdeen': 'aberdeen-uk',

  // ---- Canada ----
  'calgary': 'calgary-ab',
  'edmonton': 'edmonton-ab',
  'toronto': 'toronto-on',
  'vancouver': 'vancouver-bc',

  // ---- Australia ----
  'sydney': 'sydney-au',
  'melbourne': 'melbourne-au',
  'brisbane': 'brisbane-au',
  'perth': 'perth-au',

  // ---- South Africa ----
  'cape-town': 'cape-town-za',
  'johannesburg': 'johannesburg-za',
};

/**
 * Legacy slugs that no longer map to a single city — redirect to broader
 * landing pages rather than 404. Country/region pages were removed; route
 * to /find-providers or /ndt-services so the equity is preserved.
 */
const COUNTRY_FALLBACK_MAP = {
  // Saudi Arabia (national-level) — Riyadh / Yanbu / Jubail / Dammam now have canonical rows.
  'saudi-arabia': '/find-providers?country=sa',
  // SE Asia (no per-city rows yet).
  'malaysia': '/find-providers?country=my',
  'indonesia': '/find-providers?country=id',
  'thailand': '/find-providers?country=th',
  'vietnam': '/find-providers?country=vn',
  'philippines': '/find-providers?country=ph',
  // EU (no per-city rows yet).
  'norway': '/find-providers?country=no',
  'netherlands': '/find-providers?country=nl',
  'germany': '/find-providers?country=de',
  'france': '/find-providers?country=fr',
  'spain': '/find-providers?country=es',
  'italy': '/find-providers?country=it',
  // Africa (national-level) — Cape Town + Johannesburg now have canonical rows.
  'nigeria': '/find-providers?country=ng',
  'south-africa': '/find-providers?country=za',
  'nairobi': '/find-providers?country=ke',
  'egypt': '/find-providers?country=eg',
  // LatAm (no per-city rows yet).
  'brazil': '/find-providers?country=br',
  'argentina': '/find-providers?country=ar',
  'chile': '/find-providers?country=cl',
  'colombia': '/find-providers?country=co',
  'mexico': '/find-providers?country=mx',
  'trinidad': '/find-providers?country=tt',
};

/**
 * Methods that the new /ndt-services/[city]/[slug] route no longer supports.
 * Anything in this list redirects to the city root page (strip the trailing
 * segment) so the user still lands on the city page.
 */
const DROPPED_METHODS = new Set([
  'eddy-current-testing',
  'tofd-testing',
  'guided-wave-testing',
  'acoustic-emission-testing',
  'magnetic-flux-leakage',
  'corrosion-mapping',
]);

/**
 * Industries the new route no longer accepts as a slug suffix. Same
 * treatment as DROPPED_METHODS.
 */
const DROPPED_INDUSTRIES = new Set([
  'oil-and-gas',
  'aerospace',
  'power-generation',
  'manufacturing',
  'marine-and-offshore',
  'construction',
  'mining',
]);

const SUPPORTED_METHODS = new Set([
  'ultrasonic-testing',
  'radiographic-testing',
  'magnetic-particle-testing',
  'penetrant-testing',
  'visual-testing',
  'phased-array-ut',
]);

/**
 * Build the full redirect array for next.config.js. All redirects are
 * permanent (301) — the URLs are migrated, not split-tested.
 */
function buildLegacyRedirects() {
  const redirects = [];

  // 1) City-root redirects: /ndt-services/<old> -> /ndt-services/<new>
  // 2) City+method redirects: /ndt-services/<old>/<method> -> /ndt-services/<new>/<method>
  //    where the method is still supported.
  // 3) City + dropped method/industry: -> /ndt-services/<new> (city root)
  for (const [oldSlug, newSlug] of Object.entries(CITY_SLUG_MAP)) {
    redirects.push({
      source: `/ndt-services/${oldSlug}`,
      destination: `/ndt-services/${newSlug}`,
      permanent: true,
    });
    redirects.push({
      source: `/training/${oldSlug}`,
      destination: `/training/${newSlug}`,
      permanent: true,
    });
    redirects.push({
      source: `/careers/${oldSlug}`,
      destination: `/careers/${newSlug}`,
      permanent: true,
    });

    // Supported methods get a direct slug swap.
    for (const method of SUPPORTED_METHODS) {
      redirects.push({
        source: `/ndt-services/${oldSlug}/${method}`,
        destination: `/ndt-services/${newSlug}/${method}`,
        permanent: true,
      });
      redirects.push({
        source: `/cost-guide/${oldSlug}/${method}`,
        destination: `/cost-guide/${newSlug}/${method}`,
        permanent: true,
      });
    }

    // Dropped methods + industries: route to the city root, not the dead URL.
    for (const dropped of [...DROPPED_METHODS, ...DROPPED_INDUSTRIES]) {
      redirects.push({
        source: `/ndt-services/${oldSlug}/${dropped}`,
        destination: `/ndt-services/${newSlug}`,
        permanent: true,
      });
      redirects.push({
        source: `/cost-guide/${oldSlug}/${dropped}`,
        destination: `/cost-guide/${newSlug}/ultrasonic-testing`,
        permanent: true,
      });
    }
  }

  // 4) Country/region fallback pages: redirect to /find-providers.
  for (const [slug, dest] of Object.entries(COUNTRY_FALLBACK_MAP)) {
    redirects.push({
      source: `/ndt-services/${slug}`,
      destination: dest,
      permanent: true,
    });
    // Method-suffixed country pages also route to the find-providers query.
    for (const method of [...SUPPORTED_METHODS, ...DROPPED_METHODS, ...DROPPED_INDUSTRIES]) {
      redirects.push({
        source: `/ndt-services/${slug}/${method}`,
        destination: dest,
        permanent: true,
      });
      redirects.push({
        source: `/cost-guide/${slug}/${method}`,
        destination: dest,
        permanent: true,
      });
    }
  }

  return redirects;
}

module.exports = { buildLegacyRedirects, CITY_SLUG_MAP, COUNTRY_FALLBACK_MAP };
