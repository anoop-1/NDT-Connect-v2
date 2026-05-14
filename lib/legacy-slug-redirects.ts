// lib/legacy-slug-redirects.ts
//
// Legacy URL → canonical URL resolver. Used by src/middleware.ts.
//
// Why middleware and not next.config.js redirects(): Vercel caps the
// `routes` field at 2,048 entries (rewrites + redirects + headers combined).
// Enumerating every legacy slug × method × industry pair blew through that
// (3,167 routes) and the deploy errored with `too_many_routes`. Middleware
// has no such cap and the lookup is a single object access per request.

const CITY_SLUG_MAP: Record<string, string> = {
  // ---- US Tier 1 ----
  houston: 'houston-tx',
  'los-angeles': 'los-angeles-ca',
  'new-orleans': 'new-orleans-la',
  denver: 'denver-co',
  chicago: 'chicago-il',
  seattle: 'seattle-wa',
  dallas: 'dallas-tx',
  phoenix: 'phoenix-az',
  philadelphia: 'philadelphia-pa',
  'san-francisco': 'san-francisco-ca',
  detroit: 'detroit-mi',
  pittsburgh: 'pittsburgh-pa',
  'baton-rouge': 'baton-rouge-la',
  'corpus-christi': 'corpus-christi-tx',
  tulsa: 'tulsa-ok',
  beaumont: 'beaumont-tx',
  'new-york': 'new-york-ny',
  boston: 'boston-ma',
  atlanta: 'atlanta-ga',
  miami: 'miami-fl',

  // ---- Middle East ----
  dubai: 'dubai-ae',
  'abu-dhabi': 'abu-dhabi-ae',
  qatar: 'doha-qa',
  kuwait: 'kuwait-city-kw',
  bahrain: 'manama-bh',
  oman: 'muscat-om',
  jubail: 'jubail-sa',
  yanbu: 'yanbu-sa',
  dammam: 'dammam-sa',

  // ---- India ----
  mumbai: 'mumbai-in',
  hyderabad: 'hyderabad-in',
  bangalore: 'bangalore-in',
  chennai: 'chennai-in',
  delhi: 'delhi-in',
  kolkata: 'kolkata-in',
  pune: 'pune-in',
  ahmedabad: 'ahmedabad-in',
  kochi: 'kochi-in',
  vizag: 'visakhapatnam-in',
  jamnagar: 'jamnagar-in',

  // ---- SE Asia ----
  singapore: 'singapore-sg',

  // ---- Europe ----
  london: 'london-uk',
  aberdeen: 'aberdeen-uk',

  // ---- Canada ----
  calgary: 'calgary-ab',
  edmonton: 'edmonton-ab',
  toronto: 'toronto-on',
  vancouver: 'vancouver-bc',

  // ---- Australia ----
  sydney: 'sydney-au',
  melbourne: 'melbourne-au',
  brisbane: 'brisbane-au',
  perth: 'perth-au',

  // ---- South Africa ----
  'cape-town': 'cape-town-za',
  johannesburg: 'johannesburg-za',
};

const COUNTRY_FALLBACK_MAP: Record<string, string> = {
  'saudi-arabia': '/find-providers?country=sa',
  malaysia: '/find-providers?country=my',
  indonesia: '/find-providers?country=id',
  thailand: '/find-providers?country=th',
  vietnam: '/find-providers?country=vn',
  philippines: '/find-providers?country=ph',
  norway: '/find-providers?country=no',
  netherlands: '/find-providers?country=nl',
  germany: '/find-providers?country=de',
  france: '/find-providers?country=fr',
  spain: '/find-providers?country=es',
  italy: '/find-providers?country=it',
  nigeria: '/find-providers?country=ng',
  'south-africa': '/find-providers?country=za',
  nairobi: '/find-providers?country=ke',
  egypt: '/find-providers?country=eg',
  brazil: '/find-providers?country=br',
  argentina: '/find-providers?country=ar',
  chile: '/find-providers?country=cl',
  colombia: '/find-providers?country=co',
  mexico: '/find-providers?country=mx',
  trinidad: '/find-providers?country=tt',
};

const SUPPORTED_METHODS = new Set([
  'ultrasonic-testing',
  'radiographic-testing',
  'magnetic-particle-testing',
  'penetrant-testing',
  'visual-testing',
  'phased-array-ut',
]);

/**
 * Resolve a legacy URL pathname to a canonical destination. Returns null
 * when the path doesn't match a legacy slug; the caller should fall through
 * to the normal route handler.
 */
export function resolveLegacyRedirect(pathname: string): string | null {
  // /ndt-services/<slug>[/<sub>]
  const mNdt = /^\/ndt-services\/([^/]+)(?:\/([^/]+))?\/?$/.exec(pathname);
  if (mNdt) {
    const oldSlug = mNdt[1]!;
    const sub = mNdt[2] ?? null;

    if (COUNTRY_FALLBACK_MAP[oldSlug]) return COUNTRY_FALLBACK_MAP[oldSlug]!;

    const newSlug = CITY_SLUG_MAP[oldSlug];
    if (!newSlug) return null;

    if (!sub) return `/ndt-services/${newSlug}`;
    if (SUPPORTED_METHODS.has(sub)) return `/ndt-services/${newSlug}/${sub}`;
    // Dropped methods / industries → fall back to city root.
    return `/ndt-services/${newSlug}`;
  }

  // /cost-guide/<slug>/<method>
  const mCost = /^\/cost-guide\/([^/]+)\/([^/]+)\/?$/.exec(pathname);
  if (mCost) {
    const oldSlug = mCost[1]!;
    const method = mCost[2]!;

    if (COUNTRY_FALLBACK_MAP[oldSlug]) return COUNTRY_FALLBACK_MAP[oldSlug]!;

    const newSlug = CITY_SLUG_MAP[oldSlug];
    if (!newSlug) return null;

    if (SUPPORTED_METHODS.has(method)) return `/cost-guide/${newSlug}/${method}`;
    return `/cost-guide/${newSlug}/ultrasonic-testing`;
  }

  // /training/<slug> and /careers/<slug>
  const mSimple = /^\/(training|careers)\/([^/]+)\/?$/.exec(pathname);
  if (mSimple) {
    const kind = mSimple[1]!;
    const oldSlug = mSimple[2]!;
    const newSlug = CITY_SLUG_MAP[oldSlug];
    if (!newSlug) return null;
    return `/${kind}/${newSlug}`;
  }

  return null;
}

export { CITY_SLUG_MAP, COUNTRY_FALLBACK_MAP, SUPPORTED_METHODS };
