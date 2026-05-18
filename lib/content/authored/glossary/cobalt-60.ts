import type { GlossaryLongFormContent } from '../types';

const term: GlossaryLongFormContent = {
  slug: 'cobalt-60',
  term: 'Cobalt-60 (Co-60)',
  category: 'Radiographic Testing',
  metaTitle: 'Cobalt-60: Heavy-Section Radiography Source Data & Applications',
  metaDescription:
    'Co-60 is the high-energy gamma source for 50-200 mm steel walls. Get energy spectrum, half-life, shielding HVL, exposure tables, and where Co-60 beats Ir-192.',
  heroLede:
    'Cobalt-60 is the high-energy gamma isotope used in industrial radiography when wall thickness pushes past what Iridium-192 can practically penetrate. Its 1.25 MeV mean photon energy and 5.27-year half-life make Co-60 the standard source for heavy-section forgings, thick-wall reactor seams, and concrete radiography — at the cost of much heavier shielding pots, larger exclusion zones, and longer crew dose-management discipline than Ir-192 requires.',
  preciseDefinition:
    'Cobalt-60 is a synthetic radioactive isotope of cobalt produced by neutron activation of stable Co-59, decaying by β⁻ emission with two cascade γ photons of 1.173 MeV and 1.333 MeV and a half-life of 5.2714 years.[1]',
  alternateNames: ['Co-60', 'Cobalt source', '²⁷Co-60', 'Cobalt isotope'],
  history:
    'Co-60 entered industrial radiography in the early 1950s, just after the National Reactor Testing Station began producing the isotope in volume. Its 30× longer half-life vs. Ir-192 meant fewer source changes, attractive for stationary vault use. By the late 1960s most field work shifted to Ir-192 because of weight and shielding penalties, but Co-60 retained dominance for steel walls > 75 mm and concrete radiography of nuclear containment structures.',
  technicalDetail: [
    {
      heading: 'Decay scheme and photon emission',
      level: 2,
      paragraphs: [
        'Co-60 decays by β⁻ emission (mean β energy 96 keV, max 318 keV) to excited Ni-60, which de-excites through a two-step cascade emitting two γ photons of 1.1732 MeV and 1.3325 MeV per disintegration. The β particles are absorbed in the source capsule and contribute no useful inspection radiation; the gamma cascade is what reaches the part. Average photon energy = (1.1732 + 1.3325) / 2 = 1.2529 MeV.[2]',
        'Half-life T₁/₂ = 5.2714 years. Decay constant λ = ln(2)/T₁/₂ = 0.131 yr⁻¹ = 3.6 × 10⁻⁴ day⁻¹. A 100 Ci Co-60 source after one year is at 100 × e^(−0.131) = 87.7 Ci. Practical source replacement is typically every 5-10 years, when activity drops below operational thresholds for the target wall thickness.',
        'Specific activity: pure Co-60 ≈ 1,131 Ci/g theoretical; commercial sources are ~50-300 Ci/g depending on reactor enrichment. A typical 50 Ci field source is 0.2-1 g of pelletised cobalt in a double-encapsulated stainless capsule.',
      ],
    },
    {
      heading: 'Exposure factor and field application',
      level: 2,
      paragraphs: [
        'Dose rate at 1 m for Co-60: RHM ≈ 13.2 R/h per Ci (≈ 14.3 mSv/h/GBq) — roughly 2.8× the Ir-192 exposure factor on a curie-for-curie basis, because both photons carry more energy. A 50 Ci Co-60 source reads 660 mR/h at 1 m, vs. 240 mR/h for an equivalent Ir-192 activity.',
        'Practical wall-thickness range: 50-200 mm steel. Below 50 mm the high-energy beam gives poor image contrast — photoelectric absorption (which generates contrast) becomes vanishingly small at 1.25 MeV in steel. Above 200 mm exposure times become extreme and image sharpness suffers from scatter buildup.[3]',
        'Co-60 is the standard for thick-wall pressure-vessel construction (e.g. reactor primary heads, heavy forgings), heavy-section weld qualification (ASME IX procedure tests on >150 mm coupons), and concrete radiography of nuclear containment penetrations and post-tension tendon ducts.',
      ],
    },
    {
      heading: 'Shielding, transport, and regulatory burden',
      level: 2,
      paragraphs: [
        'Lead HVL for Co-60 = 12 mm (vs. 4.8 mm Ir-192). Steel HVL = 22 mm; concrete HVL = 60 mm. To reduce a 50 Ci source dose from 660 mR/h at 1 m to the 2 mR/h public limit, total reduction = 330× = 8.4 HVL of lead = 100 mm of solid lead — a serious pot weight. Field cameras therefore use depleted-uranium (DU) shielding (DU HVL ≈ 7 mm at 1.25 MeV) to keep total weight manageable; a 50 Ci Co-60 camera with DU shield is typically 70-100 kg vs. 20-25 kg for an equivalent Ir-192 unit.',
        'Transport: Co-60 ships in Type B(U) packages under stricter routing controls than Ir-192. HRCQ threshold = 27 TBq, easily exceeded by stationary-vault source replacements (1,000+ Ci shipments), requiring DOT/IAEA highway-route notification.',
        'Licensing: NRC 10 CFR 34 same as Ir-192 for industrial radiography; additional NRC 10 CFR 36 applies for sealed-source irradiators (food irradiation, sterilization) that use much larger Co-60 inventories. Daily source-position verification, two-person rule, and dose-rate surveys are identical to Ir-192 protocols but with proportionally larger exclusion zones.',
      ],
    },
  ],
  workedExample: {
    setup:
      'Radiography of a 150 mm thick carbon steel pressure-vessel longitudinal seam under ASME VIII Div 2. Co-60 source: 25 Ci, fresh. SFD: 1 m. Film: AGFA D5 lead-screen sandwich. Required: 2-2T IQI sensitivity per ASME V Article 2.',
    calculation:
      'Number of HVLs through 150 mm steel = 150 / 22 = 6.82 HVL. Transmitted intensity fraction = (½)^6.82 = 0.0089. Direct exposure dose rate at film position (1 m past source through wall) drops from 25 × 13.2 = 330 mR/h to 330 × 0.0089 = 2.94 mR/h. Required film exposure for D5 ≈ 1.2 R = 1,200 mR. Required exposure time = 1,200 / 2.94 = 408 minutes ≈ 6.8 hours. IQI: ASME V T-276 for 150 mm wall = Type 100 (T = 2.54 mm).',
    result:
      'Exposure scheduled overnight (6.5-hour single shot). Exclusion radius for 25 Ci Co-60: at 1 m the dose is 330 mR/h; to reach 2 mR/h requires √(330/2) ≈ 12.8 m. Crew tapes off 15 m radius and patrols both shifts. Film developed: density 2.0-3.5 with Type 100 IQI 2T hole visible. Inspection accepted; flaw interpretation per UW-51 proceeds.',
  },
  whereItAppears: [
    {
      context: 'Reactor pressure vessel manufacture',
      explanation:
        'Heavy-section reactor pressure vessels (200-300 mm wall) for new nuclear builds are radiographed during fabrication with Co-60 in shielded vaults at the manufacturer\'s facility (Doosan, JSW, EDF). Each longitudinal and circumferential weld is shot multiple times around its circumference; exposures run 4-12 hours per shot. The radiographic record is part of the ASME III Class 1 certification dossier.',
    },
    {
      context: 'Concrete radiography of nuclear containment structures',
      explanation:
        'Co-60 is the only practical gamma source for radiographing 1-2 m thick reinforced concrete — verifying rebar positions, embedded conduit, and post-tension tendon condition. Specialized self-shielded crawler cameras carry up to 100 Ci sources along the concrete face; image plates capture wall-cross-section in 30-60 minute exposures.',
    },
    {
      context: 'Heavy forging acceptance under AMS 2630',
      explanation:
        'Large rotor and shaft forgings (300-600 mm cross-section) for turbine and generator service are radiographed at the forge with Co-60 to verify internal soundness before machining. Image-quality acceptance follows ASTM E94/E1648 with Type 200+ IQIs; multiple radial orientations are shot to cover the full forging volume.',
    },
  ],
  relatedTerms: [
    { term: 'Iridium-192', slug: 'iridium-192' },
    { term: 'Selenium-75', slug: 'selenium-75' },
    { term: 'Half-Value Layer', slug: 'half-value-layer' },
    { term: 'IQI', slug: 'iqi' },
  ],
  faqs: [
    {
      q: 'Why is Cobalt-60 used instead of Iridium-192 for thick-wall work?',
      a: 'Photon energy. Co-60\'s 1.25 MeV mean energy penetrates ~3× more steel per unit exposure than Ir-192\'s 380 keV. The penetrating ability is captured in the steel HVL: 22 mm for Co-60 vs. 13 mm for Ir-192. To shoot a 150 mm wall with Ir-192, exposure time runs 12-24 hours and image quality degrades from scatter; with Co-60 the same shot takes 4-8 hours at acceptable contrast. Above ~75 mm steel the operational economics force a switch to Co-60. The cost is in shielding and exclusion: Co-60\'s lead HVL is 12 mm vs. 4.8 mm, so source pots are 2-3× heavier and exclusion radii are correspondingly larger.',
    },
    {
      q: 'What is the practical lifespan of a Co-60 industrial source?',
      a: 'Activity halves every 5.27 years, so a source nominally rated at 50 Ci is at 25 Ci after 5 years, 12.5 Ci after 10 years. Operational replacement happens when activity drops below the threshold needed for tolerable exposure times — typically every 7-10 years for portable field cameras, and every 10-15 years for stationary vault sources where longer exposure is acceptable. Compared to Ir-192\'s 73.83-day half-life, Co-60 dramatically reduces source-change frequency and the associated transport and license burden. But the long half-life also means a stuck or stolen Co-60 source remains hazardous for decades, which is why Category 1/2 source security under NRC 10 CFR 37 is more onerous for Co-60 than for short-half-life isotopes.',
    },
    {
      q: 'Can Co-60 be used for pipeline radiography in the field?',
      a: 'Technically yes, but rarely chosen. Field pipeline RT walls are typically 5-25 mm — well within Ir-192\'s sweet spot, where Co-60\'s high energy actually degrades image contrast and the shielding penalty is unwarranted. Co-60 field cameras exist (e.g. Sentinel C880 with 30-100 Ci capacity) but their 70-100 kg weight requires mechanical handling carts. The exception is offshore pipeline radiography on thick-wall risers (40-65 mm pipe walls in high-pressure subsea service) where Co-60 cuts shot time from impractical to manageable. For most onshore pipeline work, Ir-192 dominates by a 50:1 ratio over Co-60.',
    },
    {
      q: 'How does Co-60 image quality compare with Ir-192 on the same wall thickness?',
      a: 'On steel walls where both are usable (50-75 mm), Ir-192 gives better image contrast and subject detail. The reason is photoelectric vs. Compton interaction balance: photoelectric absorption (which generates X-ray contrast) scales as Z⁵/E³, so it dominates at lower photon energies. Ir-192\'s 380 keV photons interact with steel mostly photoelectrically near defects, producing strong contrast; Co-60\'s 1.25 MeV photons interact almost entirely by Compton scattering, which is energy-loss-dependent but contrast-flat — small density changes (porosity, slag) become harder to see. Operationally, Co-60 IQI requirements are typically one grade more permissive than Ir-192 to acknowledge this — ASME V T-276 Table T-276 reflects the difference in selected IQI thickness.',
    },
  ],
  internalLinks: [
    {
      href: '/services/radiographic-testing',
      label: 'Radiographic Testing',
      context: 'Co-60 is the high-energy gamma source for heavy-section RT work',
    },
    {
      href: '/glossary/iridium-192',
      label: 'Iridium-192',
      context: 'Co-60 takes over from Ir-192 above ~75 mm steel wall thickness',
    },
    {
      href: '/glossary/selenium-75',
      label: 'Selenium-75',
      context: 'Se-75 covers the other end of the spectrum — thin-wall pipeline radiography',
    },
    {
      href: '/glossary/half-value-layer',
      label: 'half-value layer',
      context: 'Co-60 has 12 mm lead HVL — 2.5× more shielding mass than Ir-192',
    },
    {
      href: '/glossary/iqi',
      label: 'IQI selection',
      context: 'Co-60 IQI choice differs from Ir-192 because of harder beam contrast',
    },
    {
      href: '/standards/asme-bpvc-section-v',
      label: 'ASME BPVC Section V',
      context: 'Article 2 covers Co-60 radiography procedures for ASME-class welds',
    },
    {
      href: '/standards/asme-bpvc-section-iii',
      label: 'ASME BPVC Section III',
      context: 'Nuclear Class 1 component radiography routinely specifies Co-60 for heavy sections',
    },
    {
      href: '/free-tools/ai-procedure-generator',
      label: 'NDT procedure generator',
      context: 'Generate RT procedures specifying Co-60 exposure tables for thick walls',
    },
    {
      href: '/industries/power-generation',
      label: 'power generation NDT',
      context: 'Nuclear pressure boundary radiography is dominated by Co-60 source applications',
    },
  ],
  citations: [
    {
      id: 'iaea-co60',
      source: 'IAEA Nuclear Data Section — Cobalt-60 decay data, ENSDF database (2024 update)',
      url: 'https://www-nds.iaea.org/',
    },
    {
      id: '10cfr34-co60',
      source: '10 CFR Part 34, Licenses for Industrial Radiography — Co-60 industrial source requirements',
      url: 'https://www.nrc.gov/reading-rm/doc-collections/cfr/part034/',
    },
    {
      id: 'asme-v-art-2',
      source: 'ASME BPVC Section V, 2023 Edition, Article 2 — Radiographic Examination (Co-60 procedure requirements)',
    },
    {
      id: 'iaea-tecdoc-1162-co',
      source: 'IAEA TECDOC-1162 (2000), Industrial Radiography Manual — Co-60 source data, shielding tables, and exposure factors',
    },
    {
      id: 'ncrp-155',
      source: 'NCRP Report No. 155 (2007), Management of Radionuclide Therapy Patients — also tabulates Co-60 industrial source data',
    },
  ],
};

export default term;
