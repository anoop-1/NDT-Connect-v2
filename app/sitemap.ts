import { MetadataRoute } from 'next';
import { readdirSync } from 'fs';
import path from 'path';
import { FREE_TOOLS } from '@/data/freeTools';
import { CITIES, PUBLISHABLE_CITIES } from '@/data/cities';
import { allCityIndustryCombos } from '@/lib/content/city-industry-content';
import { shouldIndexCity, shouldIndexCityIndustry } from '@/lib/seo/indexability';
import { procedureExamples } from '@/data/procedure-examples';
// Canonical slug sources — single source of truth shared with the route
// handlers (which use dynamicParams=false). Previously the sitemap had
// hardcoded glossary/standards arrays that drifted from the actual
// /lib data, emitting ~109 URLs that resolved to 404. Fixed 2026-05-29.
import { getAllGlossarySlugs } from '@/lib/glossary-data';
import { getAllStandardSlugs } from '@/lib/standards-data';

// Enumerate authored content slugs at build time.
function authoredSlugs(bucket: string): string[] {
  try {
    const dir = path.join(process.cwd(), 'lib', 'content', 'authored', bucket);
    return readdirSync(dir)
      .filter((f) => f.endsWith('.ts') && !f.startsWith('_'))
      .map((f) => f.replace(/\.ts$/, ''));
  } catch {
    return [];
  }
}

// ============================================================
// NDT Connect — split sitemap (sitemap-index pattern).
//
// generateSitemaps() yields one bucket per template family. Next.js emits:
//   /sitemap.xml         → sitemap index linking each bucket
//   /sitemap/<id>.xml    → that bucket's URLs
//
// Why split:
// 1. GSC reports indexation per submitted sitemap. With one mega-sitemap,
//    "100/3558 indexed" is opaque. With buckets we see exactly which
//    template family Google is ignoring (e.g. free-tool-country = 0/162).
// 2. Per-bucket lastModified updates trigger targeted recrawls.
// 3. Each bucket stays well under the 50k-URL / 50MB sitemap limits.
//
// Quality gate: cities failing isCityPublishable in data/cities.ts are
// excluded site-wide via PUBLISHABLE_CITIES so we never sitemap a thin page.
// ============================================================

const BASE_URL = 'https://ndt-connect.com';
const NOW = new Date();

const cities = PUBLISHABLE_CITIES.map((c) => c.slug);

// Build-log surface area for the quality gate. Visible in two places during
// builds (also logged from data/cities.ts).
// eslint-disable-next-line no-console
console.log(
  `[sitemap] using ${cities.length}/${CITIES.length} publishable cities (rest pruned by isCityPublishable)`,
);

const methods = [
  'ultrasonic-testing', 'radiographic-testing', 'magnetic-particle-testing',
  'penetrant-testing', 'eddy-current-testing', 'visual-testing',
  'phased-array-ut', 'tofd-testing', 'guided-wave-testing',
  'acoustic-emission-testing', 'magnetic-flux-leakage', 'corrosion-mapping',
];

// City × method routes only generate static params for these six. Must
// stay in sync with METHODS in app/ndt-services/[city]/[slug]/page.tsx and
// app/cost-guide/[city]/[service]/page.tsx so sitemap entries don't 404.
const cityMethods = [
  'ultrasonic-testing', 'radiographic-testing', 'magnetic-particle-testing',
  'penetrant-testing', 'visual-testing', 'phased-array-ut',
];

const industries = [
  'oil-and-gas', 'aerospace', 'power-generation', 'manufacturing',
  'marine-and-offshore', 'construction', 'mining',
];

const certifications = [
  'asnt-certification', 'iso-9712', 'api-510', 'api-570', 'api-653', 'pcn-certification', 'cwi-certification',
];

const blogPosts = [
  'ultimate-guide-ultrasonic-testing', 'rbi-corrosion-management',
  'choosing-ndt-service-provider', 'ndt-certifications-explained',
  'pipeline-inspection-techniques', 'real-time-inspection-tracking',
  'ndt-digital-twins-guide', 'ndt-career-guide-2026',
  'ut-vs-rt-comparison', 'ndt-industry-statistics',
  'corrosion-under-insulation-guide', 'weld-inspection-complete-guide',
  'ndt-inspection-cost-guide', 'what-is-ndt-testing',
  'api-510-exam-preparation-guide', 'ndt-vs-destructive-testing',
  'magnetic-particle-testing-complete-guide', 'phased-array-ultrasonic-testing-guide',
];

const tools = [
  'ndt-method-selector', 'inspection-cost-estimator', 'certification-pathway',
];

const careerSlugs = [
  'ndt-technician-level-1', 'ndt-technician-level-2', 'ndt-technician-level-3',
  'ndt-inspector', 'radiographic-technician', 'ultrasonic-technician',
  'welding-inspector', 'corrosion-engineer', 'ndt-supervisor', 'ndt-manager',
  'quality-assurance-manager', 'pipeline-inspector', 'offshore-ndt-technician',
  'aerospace-ndt-specialist', 'ndt-trainer',
];

// glossaryTerms removed 2026-05-29 — now sourced from lib/glossary-data.ts (the route's source of truth)

// standardSlugs removed 2026-05-29 — now sourced from lib/standards-data.ts (the route's source of truth)

function generateComparisonSlugs(): string[] {
  const slugs: string[] = [];
  for (let i = 0; i < methods.length; i++) {
    for (let j = i + 1; j < methods.length; j++) {
      slugs.push(`${methods[i]}-vs-${methods[j]}`);
    }
  }
  return slugs;
}

// ---------- bucket builders --------------------------------------------------

const url = (
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
): MetadataRoute.Sitemap[number] => ({
  url: `${BASE_URL}${path}`,
  lastModified: NOW,
  changeFrequency,
  priority,
});

const BUCKETS: Record<string, () => MetadataRoute.Sitemap> = {
  // High-priority discovery surface.
  static: () => [
    url('', 'daily', 1.0),
    url('/about', 'monthly', 0.8),
    url('/find-providers', 'daily', 0.9),
    url('/ndt-services', 'daily', 0.95),
    url('/blog', 'weekly', 0.8),
    url('/register', 'monthly', 0.7),
    url('/login', 'monthly', 0.5),
    url('/services', 'monthly', 0.9),
    url('/industries', 'monthly', 0.8),
    url('/certifications', 'monthly', 0.8),
    url('/faq', 'monthly', 0.7),
    url('/case-studies', 'monthly', 0.7),
    url('/equipment', 'weekly', 0.8),
    url('/contact', 'monthly', 0.7),
    url('/glossary', 'weekly', 0.7),
    url('/standards', 'monthly', 0.7),
    url('/careers', 'weekly', 0.7),
  ],

  // ---- city pages ----
  'city-hubs': () =>
    cities.map((c) => url(`/ndt-services/${c}`, 'weekly', 0.8)),

  // ---- city × method (highest-intent geo pages) ----
  // Indexable set only (tier-1/2 cities); tier-3/4 are noindex,follow → omit.
  'city-methods': () =>
    cities.filter((c) => shouldIndexCity(c, 'method')).flatMap((c) =>
      cityMethods.map((m) => url(`/ndt-services/${c}/${m}`, 'weekly', 0.8)),
    ),

  // ---- cost-guide ----
  'cost-guides': () =>
    cities.filter((c) => shouldIndexCity(c, 'cost')).flatMap((c) =>
      cityMethods.map((m) => url(`/cost-guide/${c}/${m}`, 'weekly', 0.8)),
    ),

  // ---- careers city + role ----
  'careers-cities': () =>
    cities.map((c) => url(`/careers/${c}`, 'weekly', 0.7)),

  'careers-roles': () =>
    careerSlugs.map((s) => url(`/careers/roles/${s}`, 'monthly', 0.5)),

  // ---- training ---- (tier-1 metros only; rest noindex,follow)
  training: () =>
    cities.filter((c) => shouldIndexCity(c, 'training')).map((c) => url(`/training/${c}`, 'monthly', 0.6)),

  // ---- method/industry/certification/blog/comparison ----
  methods: () =>
    methods.map((m) => url(`/services/${m}`, 'monthly', 0.9)),

  industries: () =>
    industries.map((i) => url(`/industries/${i}`, 'monthly', 0.8)),

  certifications: () =>
    certifications.map((c) => url(`/certifications/${c}`, 'monthly', 0.7)),

  blog: () => blogPosts.map((p) => url(`/blog/${p}`, 'monthly', 0.7)),

  comparisons: () =>
    generateComparisonSlugs().map((s) => url(`/compare/${s}`, 'monthly', 0.75)),

  // ---- glossary + standards ----
  glossary: () => getAllGlossarySlugs().map((t) => url(`/glossary/${t}`, 'monthly', 0.4)),
  standards: () => getAllStandardSlugs().map((s) => url(`/standards/${s}`, 'monthly', 0.4)),

  // ---- tools ----
  tools: () => tools.map((t) => url(`/tools/${t}`, 'monthly', 0.7)),

  // ---- free tools family ----
  'free-tools-landing': () => [url('/free-tools', 'weekly', 0.95)],

  'free-tools-features': () =>
    FREE_TOOLS.map((t) => url(`/free-tools/${t.slug}`, 'weekly', 0.9)),

  // Standalone static free-tool landings (not driven by freeTools.ts). These
  // are hand-authored long-form pages added alongside the dynamic [feature]
  // route. They take precedence over the dynamic route via Next.js routing.
  'free-tools-standalone': () => [
    url('/free-tools/calibration-reminder', 'weekly', 0.9),
    url('/free-tools/certificate-manager', 'weekly', 0.9),
    url('/free-tools/equipment-tracker', 'weekly', 0.9),
    url('/free-tools/ai-procedure-generator', 'weekly', 0.9),
  ],

  // free-tool x {city,region,country} matrices are noindex as of 2026-05-24
  // (near-zero search demand: ~40 impr across 600 URLs, 0 clicks in GSC). They
  // stay live for direct/in-app use but are removed from the sitemap so crawl
  // budget concentrates on the indexable tool hub + feature pages. Re-enable by
  // restoring the generators below once domain authority supports the long tail.
  'free-tools-cities': () => [],

  'free-tools-regions': () => [],

  'free-tools-countries': () => [],

  // ---- city × industry ---- (only indexable: tier-1/2 city + industry weight >= 0.4)
  'city-industries': () =>
    allCityIndustryCombos()
      .filter(({ city: c, industry: i }) => shouldIndexCityIndustry(c, i))
      .map(({ city: c, industry: i }) =>
        url(`/ndt-services/${c}/industries/${i}`, 'weekly', 0.75),
      ),

  // ---- AI procedure generator ----
  'procedure-generator': () => [
    url('/tools/ndt-procedure-generator', 'weekly', 0.95),
    url('/tools/ndt-procedure-generator/examples', 'weekly', 0.85),
    ...procedureExamples.map((ex) =>
      url(
        `/tools/ndt-procedure-generator/examples/${ex.slug}`,
        'monthly',
        0.75,
      ),
    ),
  ],

  // ---- Authored long-form content (hand-built + daily pipeline) ----
  'authored-methods': () =>
    authoredSlugs('methods').map((s) => url(`/methods/${s}`, 'weekly', 0.9)),

  'authored-industries': () =>
    authoredSlugs('industries').map((s) => url(`/industries/${s}`, 'weekly', 0.85)),

  'authored-standards': () =>
    authoredSlugs('standards').map((s) => url(`/standards/${s}`, 'monthly', 0.8)),

  'authored-states': () =>
    authoredSlugs('states').map((s) => url(`/states/${s}`, 'weekly', 0.85)),

  'authored-careers': () =>
    authoredSlugs('careers').map((s) => url(`/careers/roles/${s}`, 'monthly', 0.7)),

  'authored-equipment': () =>
    authoredSlugs('equipment').map((s) => url(`/equipment/${s}`, 'monthly', 0.75)),

  'authored-case-studies': () =>
    authoredSlugs('case-studies').map((s) => url(`/case-studies/${s}`, 'monthly', 0.75)),

  'authored-comparisons': () =>
    authoredSlugs('comparisons').map((s) => url(`/compare/${s}`, 'monthly', 0.7)),

  'authored-learn': () =>
    authoredSlugs('learn').map((s) => url(`/learn/${s}`, 'monthly', 0.7)),

  'authored-glossary': () =>
    authoredSlugs('glossary').map((s) => url(`/glossary/${s}`, 'monthly', 0.65)),

  'authored-pillars': () =>
    authoredSlugs('pillars').map((s) => url(`/pillars/${s}`, 'weekly', 0.95)),

  'authored-tools': () =>
    authoredSlugs('tools').map((s) => url(`/tools/${s}`, 'weekly', 0.95)),

  'authored-topics': () =>
    authoredSlugs('topics').map((s) => url(`/topics/${s}`, 'weekly', 0.7)),
};

// ---------- Next.js sitemap-index entrypoints --------------------------------

export async function generateSitemaps() {
  return Object.keys(BUCKETS).map((id) => ({ id }));
}

export default function sitemap({
  id,
}: {
  id: string;
}): MetadataRoute.Sitemap {
  const build = BUCKETS[id];
  if (!build) {
    throw new Error(`[sitemap] unknown bucket id="${id}"`);
  }
  return build();
}

