import type { GlossaryLongFormContent } from '../types';

const term: GlossaryLongFormContent = {
  slug: 'selenium-75',
  term: 'Selenium-75 (Se-75)',
  category: 'Radiographic Testing',
  metaTitle: 'Selenium-75 (Se-75): Thin-Wall Pipeline Radiography Source Data',
  metaDescription:
    'Se-75 outperforms Ir-192 on 5-25 mm steel walls — sharper contrast, smaller exclusion zone. Get energy spectrum, half-life, shielding HVL, and field application limits.',
  heroLede:
    'Selenium-75 is the low-energy gamma source that earned a permanent place in industrial radiography after pipeline RT operators learned it gave sharper images than Iridium-192 on 5-25 mm steel walls while needing roughly half the exclusion radius. Its 217 keV mean photon energy, 119.78-day half-life, and 2.0 mm lead HVL combine to make Se-75 the modern workhorse for thin-wall pipeline girth welds, instrument tubing, and small-diameter process piping where Ir-192 is over-energetic.',
  preciseDefinition:
    'Selenium-75 is a synthetic radioactive isotope of selenium produced by neutron activation of stable Se-74, decaying by electron capture with characteristic γ photons of mean energy 217 keV and a half-life of 119.78 days.[1]',
  alternateNames: ['Se-75', 'Selenium', '³⁴Se-75', 'SentinelSE source'],
  history:
    'Se-75 was developed for industrial radiography in Germany in the late 1990s as a thinner-wall alternative to Ir-192. Sauerwein launched the first commercial Se-75 camera (SentinelSE) in 2001. Adoption accelerated in pipeline construction after 2010 when operators recognised the dose-rate and image-quality benefits on routine 6-24 inch pipeline girth welds. The isotope is now produced commercially at Petten reactor (Netherlands) and IRE (Belgium).',
  technicalDetail: [
    {
      heading: 'Decay scheme and photon emission',
      level: 2,
      paragraphs: [
        'Se-75 decays by electron capture (100% branching) to excited states of As-75, which de-excites by emitting γ photons. The five most-intense emissions are 96.7 keV (3.4%), 121.1 keV (17.2%), 136.0 keV (58.5%), 264.7 keV (58.9%), and 279.5 keV (24.99%). The weighted mean is ~217 keV — well below Ir-192\'s 380 keV.[2]',
        'Half-life T₁/₂ = 119.78 days, longer than Ir-192 (73.83 days). A 100 Ci Se-75 source decays to 50 Ci in 120 days, 25 Ci in 240 days — extending source-replacement intervals from quarterly (Ir-192) to roughly every 6-8 months.',
        'Specific activity ~14,500 Ci/g theoretical; commercial sources at 800-1,200 Ci/g, smaller capsules than Ir-192 sources of equivalent activity. The smaller geometric source size also improves image sharpness through reduced geometric unsharpness Ug.',
      ],
    },
    {
      heading: 'Exposure factor and image quality',
      level: 2,
      paragraphs: [
        'Dose rate at 1 m for Se-75: RHM ≈ 2.0 R/h per curie (vs. 4.8 R/h for Ir-192). A 50 Ci Se-75 source reads 100 mR/h at 1 m. Combined with the lower lead HVL (2.0 mm vs. 4.8 mm for Ir-192), exclusion zones are ~50% smaller for an equivalent inspection scope — a significant operational advantage in tight rights-of-way.',
        'Image contrast on thin steel walls is markedly better than Ir-192 because photoelectric absorption is proportional to ~1/E³ in this energy range. At 217 keV the subject contrast of small slag and porosity in a 15 mm weld is significantly higher than the same defect imaged with Ir-192\'s 380 keV beam.[3]',
        'Practical wall-thickness range: 5-25 mm steel for ASME-quality images. Below 5 mm, X-ray tubes give better contrast at lower cost; above 25 mm, Se-75 exposure times grow too long and Ir-192 retakes the lead. The "sweet spot" is 8-20 mm — the bulk of pipeline construction and small-diameter process-piping work.',
      ],
    },
    {
      heading: 'Operational and regulatory aspects',
      level: 2,
      paragraphs: [
        'Source cameras: Sentinel SE-100, QSA Global Se-75 cameras, and Sauerwein TECHOPS variants. Cameras are 50-60% the weight of equivalent Ir-192 units because the lower-energy beam needs less shielding. Crank-out drive and source-guide tube are identical in form factor to Ir-192 cameras, allowing crews to swap between isotopes with minimal procedure changes.',
        'Licensing: identical to Ir-192 under 10 CFR Part 34 in the US, with the same daily survey, two-person rule, and dose-tracking requirements. Most state radiation control programs treat Se-75 as a Class 2 source under IAEA RS-G-1.9.',
        'Transport: Type B(U) packaging required, same as Ir-192. Half-life affects shipping logistics — a single source can serve a long-duration project (oil-and-gas mainline pipeline construction over 12-18 months) without requiring a mid-project source change.',
      ],
    },
  ],
  workedExample: {
    setup:
      'Pipeline girth weld radiography on 12 inch OD × 9.5 mm wall X65 pipeline. Source: 35 Ci Se-75, Day 60 of source life. SFD: 600 mm. Film: AGFA D7. Required: ASME V Article 2 with 2-2T IQI sensitivity. Compare against an equivalent Ir-192 shot for exposure time and exclusion radius.',
    calculation:
      'Decayed activity: A = 35 × e^(−0.00579 × 60) = 24.7 Ci. Dose at 1 m = 24.7 × 2.0 = 49.4 mR/h. Exclusion radius for 2 mR/h: r = √(49.4/2) = 4.97 m → tape 5 m radius. Exposure on D7 through 9.5 mm steel using Se-75 chart: ~1.8 minutes. Equivalent Ir-192 shot (24.7 Ci): dose at 1 m = 119 mR/h, exclusion radius √(119/2) = 7.7 m, exposure ~1.5 minutes. Se-75 exclusion 35% smaller; exposure marginally longer.',
    result:
      'Se-75 chosen for the project: 35% smaller exclusion footprint accelerates crew progress through cramped pipeline yard areas (parallel utilities, instrumentation, other crews). IQI Type 12 (T = 0.30 mm) per ASME V T-276 for 9.5 mm wall; 2T hole visible on developed film. Image contrast notably crisper than equivalent Ir-192 shot — small porosity (< 1 mm) more readable. Project records show 18% fewer film rejections vs. previous Ir-192-based project on same pipeline size.',
  },
  whereItAppears: [
    {
      context: 'Pipeline girth weld radiography on small-diameter mainline projects',
      explanation:
        'Construction crews running 6-24 inch pipeline (typical wall 5-18 mm) increasingly choose Se-75 over Ir-192 because the smaller exclusion radius shortens taped-off zones in busy work corridors. A typical 30-mile project shoots 3,000-5,000 girth welds; even a 2-3 minute time saving per setup across the project lifetime is operationally significant.',
    },
    {
      context: 'Process piping and instrument tubing radiography in refineries',
      explanation:
        'Small-bore (1/2 inch to 4 inch) instrument lines and sample-system piping in process units have wall thicknesses of 2-8 mm. Se-75 gives notably better image contrast on these thin walls than Ir-192, with smaller exclusion zones suitable for active operating plant environments where other crews must continue working.',
    },
    {
      context: 'Aerospace tube and structural component RT',
      explanation:
        'Some aerospace specifications nominate Se-75 for radiography of thin-wall titanium and aluminium tubes (3-10 mm wall) used in hydraulic and pneumatic systems. The lower photon energy gives appreciable absorption in low-Z materials where Ir-192 would over-penetrate and lose contrast.',
    },
  ],
  relatedTerms: [
    { term: 'Iridium-192', slug: 'iridium-192' },
    { term: 'Cobalt-60', slug: 'cobalt-60' },
    { term: 'Half-Value Layer', slug: 'half-value-layer' },
    { term: 'IQI', slug: 'iqi' },
  ],
  faqs: [
    {
      q: 'Why is Selenium-75 better than Iridium-192 on thin walls?',
      a: 'Two reasons combine to produce sharper images on 5-25 mm steel. First, image contrast on thin walls is roughly proportional to 1/E³ — a 217 keV beam (Se-75) gives ~5× the subject contrast of a 380 keV beam (Ir-192) for the same fractional density change. Small porosity, root-pass slag, and 1 mm undercut that are marginal on Ir-192 film become clearly visible on Se-75 film. Second, the smaller physical source capsule (typically 1.5 mm × 1.5 mm vs. 2-3 mm for Ir-192) reduces geometric unsharpness Ug at the same SFD, improving spatial resolution. Operational bonus: Se-75 lead HVL is 2.0 mm vs. 4.8 mm for Ir-192, so shielding pots and exclusion zones are roughly half the size for equivalent inspection scope.',
    },
    {
      q: 'What is the upper wall-thickness limit for Se-75?',
      a: 'Practically about 25 mm of steel for ASME-quality images at reasonable exposure times. Beyond 25 mm the lower photon energy starts to lose efficiency — exposure times become long enough that scatter buildup degrades image contrast, and Ir-192 becomes the better choice. Specific limits depend on source activity: a fresh 100 Ci Se-75 source can shoot 30-32 mm walls in tolerable times; a 25 Ci end-of-life source struggles past 18-20 mm. ASME V Article 2 and ASTM E94 give no explicit upper limit but practical procedure qualification under ASME V Article 1 sets the operational cutoff. Most operators standardize on Se-75 for ≤ 20 mm and Ir-192 for everything thicker.',
    },
    {
      q: 'Is the longer half-life of Se-75 always an operational advantage?',
      a: 'Mostly yes, but with caveats. A 120-day half-life vs. Ir-192\'s 74 days means roughly 60% longer useful source life from a given fresh activity. For long-duration projects (multi-quarter pipeline construction, large vessel fabrication runs) this reduces source-change frequency, transport events, and disposal logistics — significant savings. The flip side: a longer half-life also means a stuck or stolen source remains hazardous longer; security and accountability obligations under NRC 10 CFR 37 are proportionally heavier than for Ir-192. For short-duration projects (3-month turnarounds), the longer half-life provides no real benefit, and Ir-192 may still be the operational default because crews are more familiar with it.',
    },
    {
      q: 'Can the same camera be used for both Ir-192 and Se-75 sources?',
      a: 'No — sources are model-specific. The source-holder, source-guide tube, crank-out mechanism, and shielding pot are all engineered for one isotope\'s capsule geometry and energy spectrum. Loading an Ir-192 source into a Se-75-rated camera would either fail to fit (wrong capsule length) or leave the operator with inadequate shielding (Ir-192 needs more lead than the Se-75 pot provides). Manufacturers (QSA Global, Sauerwein/Sentinel, SPEC) market separate camera models per isotope: Sentinel SE-100 for Se-75, Sentinel 660B for Ir-192. Some manufacturers offer cameras designed to accept multiple isotope source-holders with interchangeable shielding pots, but each pot is rated for its specific source — never mixed.',
    },
  ],
  internalLinks: [
    {
      href: '/services/radiographic-testing',
      label: 'Radiographic Testing',
      context: 'Se-75 is increasingly the preferred isotope for thin-wall pipeline RT',
    },
    {
      href: '/glossary/iridium-192',
      label: 'Iridium-192',
      context: 'Ir-192 covers thicker walls than Se-75 with a harder photon beam',
    },
    {
      href: '/glossary/cobalt-60',
      label: 'Cobalt-60',
      context: 'Co-60 covers the very thick walls where neither Se-75 nor Ir-192 is practical',
    },
    {
      href: '/glossary/half-value-layer',
      label: 'half-value layer',
      context: 'Se-75 lead HVL is 2.0 mm — less than half that of Ir-192',
    },
    {
      href: '/glossary/iqi',
      label: 'IQI sensitivity',
      context: 'IQI image quality on thin walls is typically better with Se-75 than Ir-192',
    },
    {
      href: '/standards/asme-bpvc-section-v',
      label: 'ASME BPVC Section V',
      context: 'Article 2 procedures apply equally to Se-75, Ir-192, and Co-60 gamma sources',
    },
    {
      href: '/standards/api-1104',
      label: 'API 1104 pipeline weld code',
      context: 'API 1104 pipeline RT increasingly nominates Se-75 for thin-wall girth welds',
    },
    {
      href: '/free-tools/ai-procedure-generator',
      label: 'NDT procedure generator',
      context: 'Generate Se-75 RT procedures with exposure tables tailored to thin-wall pipe',
    },
    {
      href: '/industries/oil-and-gas',
      label: 'oil and gas pipeline RT',
      context: 'Pipeline crews adopt Se-75 to shrink exclusion footprints in busy work corridors',
    },
  ],
  citations: [
    {
      id: 'iaea-se75',
      source: 'IAEA Nuclear Data Section — Selenium-75 decay data, ENSDF database (2024 update)',
      url: 'https://www-nds.iaea.org/',
    },
    {
      id: '10cfr34-se',
      source: '10 CFR Part 34, Licenses for Industrial Radiography — Se-75 industrial source requirements',
      url: 'https://www.nrc.gov/reading-rm/doc-collections/cfr/part034/',
    },
    {
      id: 'sauerwein-se',
      source: 'Sauerwein/Sentinel SentinelSE-100 Operator Manual, 2019 — Se-75 source capsule and exposure factor data',
    },
    {
      id: 'iaea-tecdoc-1162-se',
      source: 'IAEA TECDOC-1162 (2000), Industrial Radiography Manual — Se-75 source data, shielding tables',
    },
    {
      id: 'asme-v-art-2-se',
      source: 'ASME BPVC Section V, 2023 Edition, Article 2 — Radiographic Examination (gamma source procedure requirements)',
    },
  ],
};

export default term;
