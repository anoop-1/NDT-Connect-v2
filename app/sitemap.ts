import { MetadataRoute } from 'next';
import { readdirSync } from 'fs';
import path from 'path';
import { FREE_TOOLS } from '@/data/freeTools';
import { CITIES, PUBLISHABLE_CITIES, REGIONS, COUNTRIES } from '@/data/cities';
import { procedureExamples } from '@/data/procedure-examples';

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
  'asnt-certification', 'iso-9712', 'api-510', 'api-570', 'api-653', 'pcn-certification',
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

const glossaryTerms = [
  'acoustic-impedance', 'a-scan', 'b-scan', 'c-scan', 'amplitude', 'attenuation',
  'back-wall-echo', 'beam-spread', 'calibration-block', 'couplant', 'crack', 'creep',
  'dead-zone', 'decibel', 'delamination', 'discontinuity', 'dye-penetrant', 'echo',
  'eddy-current', 'flaw', 'frequency', 'gain', 'half-value-layer', 'heat-affected-zone',
  'inclusion', 'indication', 'interpretation', 'iridium-192', 'isotropic', 'lamination',
  'linear-indication', 'luminance', 'magnetic-domain', 'near-field', 'node',
  'nominal-thickness', 'parallel-scan', 'penetrameter', 'porosity', 'probe',
  'radiograph', 'reference-standard', 'rejectable-indication', 'relevant-indication',
  'scanning-sensitivity', 'sensitivity', 'slag-inclusion', 'snells-law', 'sound-velocity',
  'transducer', 'undercut', 'weld-profile', 'x-ray-tube', 'yoke',
  'absorption', 'acceptance-criteria', 'angle-beam', 'artifact', 'austenitic',
  'backscatter', 'baseline', 'beam-angle', 'boundary', 'brinell-hardness',
  'capillary-action', 'cathode-ray-tube', 'certification', 'cobalt-60', 'collimator',
  'contact-testing', 'contrast', 'corrosion', 'coupling-medium', 'crystal',
  'curie', 'current-flow', 'dag', 'damping', 'defect',
  'density', 'depth-of-penetration', 'developer', 'diffraction', 'digital-radiography',
  'direct-current', 'distance-amplitude-correction', 'dual-element-probe', 'duplex',
  'electromagnetic-testing', 'endoscope', 'erosion', 'evaluation', 'examination',
  'exposure', 'ferrite', 'ferromagnetic', 'film-density', 'fitness-for-service',
  'fluorescent', 'focal-length', 'forging-defect', 'gamma-ray', 'geometric-unsharpness',
  'grading', 'hall-effect', 'hardness-testing', 'hydrogen-embrittlement',
  'image-quality-indicator', 'immersion-testing', 'impedance-plane', 'in-service-inspection',
  'infrared-thermography', 'inspection-interval', 'inverse-square-law',
  'leak-testing', 'level-i-technician', 'level-ii-technician', 'level-iii-technician',
  'lift-off', 'liquid-penetrant', 'longitudinal-wave', 'magnetic-field',
  'magnetization', 'material-characterization', 'mode-conversion', 'ndt-certification',
];

const standardSlugs = [
  'asme-section-v', 'asme-bpvc', 'asme-b31-3', 'asme-b31-4', 'asme-b31-8',
  'api-510', 'api-570', 'api-653', 'api-1104', 'api-579', 'api-580', 'api-581',
  'api-571', 'api-574', 'api-576', 'api-598', 'api-620', 'api-650', 'api-1163',
  'aws-d1-1', 'aws-d1-2', 'aws-d1-5', 'aws-d1-6', 'aws-d17-1', 'aws-b1-10',
  'astm-e164', 'astm-e165', 'astm-e709', 'astm-e1444', 'astm-e94', 'astm-e1032',
  'astm-e2375', 'astm-e2491', 'astm-e2775', 'astm-e376', 'astm-e243', 'astm-e569',
  'astm-e1067', 'astm-e2096', 'astm-e2373', 'astm-e1417', 'astm-e2905',
  'iso-9712', 'iso-3452', 'iso-16810', 'iso-17636', 'iso-17637', 'iso-17638',
  'iso-13588', 'iso-19285', 'iso-10863', 'iso-15548', 'iso-9934', 'iso-18211',
  'iso-22096', 'iso-11666', 'iso-12718', 'iso-15653',
  'en-12668', 'en-13018', 'en-13554', 'en-1711', 'en-iso-17636', 'en-iso-17638',
  'en-iso-3452', 'en-13068',
  'dnvgl-st-f101', 'dnvgl-rp-g103', 'dnvgl-os-c401', 'dnvgl-rp-f118',
  'nace-sp0102', 'nace-sp0169', 'nace-sp0188', 'nace-sp0502',
  'pcn-certification', 'asnt-snt-tc-1a', 'asnt-cp-189', 'asnt-cp-105',
  'sae-ams-2644', 'sae-ams-2630', 'sae-arp-1962',
  'nas-410', 'abs-rules', 'rina-rules',
];

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
    url('/contact', 'monthly', 0.7),
    url('/glossary', 'weekly', 0.7),
    url('/standards', 'monthly', 0.7),
    url('/careers', 'weekly', 0.7),
  ],

  // ---- city pages ----
  'city-hubs': () =>
    cities.map((c) => url(`/ndt-services/${c}`, 'weekly', 0.8)),

  // ---- city × method (highest-intent geo pages) ----
  'city-methods': () =>
    cities.flatMap((c) =>
      cityMethods.map((m) => url(`/ndt-services/${c}/${m}`, 'weekly', 0.7)),
    ),

  // ---- cost-guide ----
  'cost-guides': () =>
    cities.flatMap((c) =>
      cityMethods.map((m) => url(`/cost-guide/${c}/${m}`, 'monthly', 0.7)),
    ),

  // ---- careers city + role ----
  'careers-cities': () =>
    cities.map((c) => url(`/careers/${c}`, 'weekly', 0.7)),

  'careers-roles': () =>
    careerSlugs.map((s) => url(`/careers/roles/${s}`, 'monthly', 0.7)),

  // ---- training ----
  training: () =>
    cities.map((c) => url(`/training/${c}`, 'monthly', 0.6)),

  // ---- method/industry/certification/blog/comparison ----
  methods: () =>
    methods.map((m) => url(`/services/${m}`, 'monthly', 0.9)),

  industries: () =>
    industries.map((i) => url(`/industries/${i}`, 'monthly', 0.8)),

  certifications: () =>
    certifications.map((c) => url(`/certifications/${c}`, 'monthly', 0.7)),

  blog: () => blogPosts.map((p) => url(`/blog/${p}`, 'monthly', 0.7)),

  comparisons: () =>
    generateComparisonSlugs().map((s) => url(`/compare/${s}`, 'monthly', 0.6)),

  // ---- glossary + standards ----
  glossary: () => glossaryTerms.map((t) => url(`/glossary/${t}`, 'monthly', 0.5)),
  standards: () => standardSlugs.map((s) => url(`/standards/${s}`, 'monthly', 0.5)),

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

  'free-tools-cities': () =>
    FREE_TOOLS.flatMap((t) =>
      PUBLISHABLE_CITIES.map((c) =>
        url(`/free-tools/${t.slug}/${c.slug}`, 'monthly', 0.7),
      ),
    ),

  'free-tools-regions': () =>
    FREE_TOOLS.flatMap((t) =>
      REGIONS.map((r) =>
        url(`/free-tools/${t.slug}/region/${r.slug}`, 'monthly', 0.65),
      ),
    ),

  'free-tools-countries': () =>
    FREE_TOOLS.flatMap((t) =>
      COUNTRIES.map((c) =>
        url(
          `/free-tools/${t.slug}/country/${c.code.toLowerCase()}`,
          'monthly',
          0.6,
        ),
      ),
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
    authoredSlugs('pillars').map((s) => url(`/pillars/${s}`, 'weekly', 0.9)),

  'authored-tools': () =>
    authoredSlugs('tools').map((s) => url(`/tools/${s}`, 'weekly', 0.85)),

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
