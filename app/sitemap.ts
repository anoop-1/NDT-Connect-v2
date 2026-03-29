import { MetadataRoute } from 'next';

// ============================================================
// NDT Connect - Comprehensive Sitemap
// Generates ALL URLs for ~4,000+ pages
// ============================================================

// All city pages for geographic SEO
const cities = [
  'houston', 'los-angeles', 'new-orleans', 'denver', 'chicago', 'seattle', 'dallas', 'phoenix',
  'philadelphia', 'san-francisco', 'detroit', 'pittsburgh', 'baton-rouge', 'corpus-christi',
  'tulsa', 'beaumont', 'new-york', 'boston', 'atlanta', 'miami',
  'dubai', 'abu-dhabi', 'saudi-arabia', 'qatar', 'kuwait', 'bahrain', 'oman', 'jubail', 'yanbu', 'dammam',
  'mumbai', 'hyderabad', 'bangalore', 'chennai', 'delhi', 'kolkata', 'pune', 'ahmedabad', 'kochi', 'vizag', 'jamnagar',
  'singapore', 'malaysia', 'indonesia', 'thailand', 'vietnam', 'philippines',
  'london', 'aberdeen', 'norway', 'netherlands', 'germany', 'france', 'spain', 'italy',
  'calgary', 'edmonton', 'toronto', 'vancouver',
  'sydney', 'melbourne', 'brisbane', 'perth',
  'nigeria', 'south-africa', 'cape-town', 'johannesburg', 'nairobi', 'egypt',
  'brazil', 'argentina', 'chile', 'colombia', 'mexico', 'trinidad',
];

// All NDT method pages
const methods = [
  'ultrasonic-testing', 'radiographic-testing', 'magnetic-particle-testing',
  'penetrant-testing', 'eddy-current-testing', 'visual-testing',
  'phased-array-ut', 'tofd-testing', 'guided-wave-testing',
  'acoustic-emission-testing', 'magnetic-flux-leakage', 'corrosion-mapping',
];

// Industry pages
const industries = [
  'oil-and-gas', 'aerospace', 'power-generation', 'manufacturing',
  'marine-and-offshore', 'construction', 'mining',
];

// Certification pages
const certifications = [
  'asnt-certification', 'iso-9712', 'api-510', 'api-570', 'api-653', 'pcn-certification',
];

// Blog posts
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

// Tool pages
const tools = [
  'ndt-method-selector', 'inspection-cost-estimator', 'certification-pathway',
];

// Career roles
const careerSlugs = [
  'ndt-technician-level-1', 'ndt-technician-level-2', 'ndt-technician-level-3',
  'ndt-inspector', 'radiographic-technician', 'ultrasonic-technician',
  'welding-inspector', 'corrosion-engineer', 'ndt-supervisor', 'ndt-manager',
  'quality-assurance-manager', 'pipeline-inspector', 'offshore-ndt-technician',
  'aerospace-ndt-specialist', 'ndt-trainer',
];

// Glossary terms (top-level slugs for sitemap - full list imported at build time)
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

// Standards
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

// Generate comparison slugs
function generateComparisonSlugs(): string[] {
  const slugs: string[] = [];
  for (let i = 0; i < methods.length; i++) {
    for (let j = i + 1; j < methods.length; j++) {
      slugs.push(`${methods[i]}-vs-${methods[j]}`);
    }
  }
  return slugs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ndt-connect.com';

  // ---- Static Pages ----
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/find-providers`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/industries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/certifications`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/glossary`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/standards`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  // ---- City Pages (75) ----
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/ndt-services/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ---- City x Service Pages (900) ----
  const cityServicePages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    methods.map((method) => ({
      url: `${baseUrl}/ndt-services/${city}/${method}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  // ---- City x Industry Pages (525) ----
  const cityIndustryPages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    industries.map((industry) => ({
      url: `${baseUrl}/ndt-services/${city}/${industry}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  // ---- Method Pages (12) ----
  const methodPages: MetadataRoute.Sitemap = methods.map((method) => ({
    url: `${baseUrl}/services/${method}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // ---- Industry Pages (7) ----
  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${baseUrl}/industries/${industry}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ---- Certification Pages (6) ----
  const certPages: MetadataRoute.Sitemap = certifications.map((cert) => ({
    url: `${baseUrl}/certifications/${cert}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ---- Blog Pages (18) ----
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ---- Tool Pages (3) ----
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ---- Comparison Pages (66) ----
  const comparisonPages: MetadataRoute.Sitemap = generateComparisonSlugs().map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // ---- Cost Guide Pages (900) ----
  const costGuidePages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    methods.map((method) => ({
      url: `${baseUrl}/cost-guide/${city}/${method}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  // ---- Training Pages (75) ----
  const trainingPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/training/${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // ---- Career Role Pages (15) ----
  const careerRolePages: MetadataRoute.Sitemap = careerSlugs.map((slug) => ({
    url: `${baseUrl}/careers/roles/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // ---- Career City Pages (75) ----
  const careerCityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/careers/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // ---- Glossary Pages (120+) ----
  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((term) => ({
    url: `${baseUrl}/glossary/${term}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // ---- Standards Pages (90+) ----
  const standardPages: MetadataRoute.Sitemap = standardSlugs.map((slug) => ({
    url: `${baseUrl}/standards/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...cityPages,
    ...cityServicePages,
    ...cityIndustryPages,
    ...methodPages,
    ...industryPages,
    ...certPages,
    ...blogPages,
    ...toolPages,
    ...comparisonPages,
    ...costGuidePages,
    ...trainingPages,
    ...careerRolePages,
    ...careerCityPages,
    ...glossaryPages,
    ...standardPages,
  ];
}
