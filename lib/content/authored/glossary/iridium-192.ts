import type { GlossaryLongFormContent } from '../types';

const term: GlossaryLongFormContent = {
  slug: 'iridium-192',
  term: 'Iridium-192 (Ir-192)',
  category: 'Radiographic Testing',
  metaTitle: 'Iridium-192 (Ir-192): Industrial Radiography Source Properties',
  metaDescription:
    'Ir-192 is the workhorse industrial gamma source. Get half-life, energy spectrum, exposure factors, shielding HVL, and field application limits for pipeline and weld RT.',
  heroLede:
    'Iridium-192 is the most widely used gamma-radiography isotope in industrial NDT, covering roughly 80% of all field gamma shots worldwide. Its 380 keV mean photon energy penetrates 5-75 mm of steel, its 73.83-day half-life fits a quarterly source-change schedule, and its specific activity (≈ 450 Ci/g) lets crews carry portable cameras under 25 kg. Every refinery weld, pipeline butt, and shop-fab pressure-vessel longitudinal seam in the world sees Ir-192 photons at some point in its life.',
  preciseDefinition:
    'Iridium-192 is a synthetic radioactive isotope of iridium produced by neutron activation of stable Ir-191, decaying by β⁻ emission with characteristic γ photons of mean energy 380 keV and a half-life of 73.83 days.[1]',
  alternateNames: ['Ir-192', 'Iridium', 'Gamma source 192', '⁷⁷Ir-192'],
  history:
    'Ir-192 was first produced for industrial radiography in the 1950s as a controllable replacement for the much harder Co-60 beam. Sentinel Industrial Radiography Corp. introduced the first widely used portable Ir-192 camera (Tech Ops 660) in the 1960s; the design (depleted-uranium-shielded helical source guide) became the global standard. QSA Global, Sauerwein/Sentinel, and Source Production & Equipment Co. (SPEC) are the dominant current manufacturers.',
  technicalDetail: [
    {
      heading: 'Decay scheme and photon emission',
      level: 2,
      paragraphs: [
        'Ir-192 decays primarily by β⁻ (95.2%) to excited states of Pt-192, which then emit a characteristic spectrum of γ photons. The four dominant photon energies are 296 keV (28.7% emission probability), 308 keV (29.7%), 316 keV (82.7%), and 468 keV (47.7%), giving a weighted mean of ~380 keV. A minor branch (4.8%) decays by electron capture to Os-192.[2]',
        'Half-life T₁/₂ = 73.83 days. Activity decays as A(t) = A₀ × e^(−λt) where λ = ln(2)/T₁/₂ = 0.00939 day⁻¹. A 100 Ci source on Day 0 has dropped to 50 Ci on Day 74, 25 Ci on Day 148. Field cameras are normally returned for source replacement when activity drops below the operational minimum, typically 20-30 Ci, after about four months.',
        'Specific activity at production: theoretical maximum ~9,000 Ci/g; practical commercial sources are 400-500 Ci/g due to neutron self-shielding during reactor activation. A typical 100 Ci source is ~0.25 g of Ir-192 pellets in a stainless capsule no larger than a pencil eraser.',
      ],
    },
    {
      heading: 'Exposure factor and field application',
      level: 2,
      paragraphs: [
        'The Roentgen-equivalent dose rate at 1 m for Ir-192 is RHM ≈ 4.8 R/h per curie (≈ 5.2 mSv/h/GBq). For a 100 Ci source, dose at 1 m = 480 mR/h. This is the headline number for exclusion-zone calculation against the NRC 2 mR/h public-area limit.',
        'Exposure factor (E·t) calculation for film RT uses the standard inverse-square + isotope-specific formula: t = E × d² / (S × γ × F) where S is source activity (Ci), d is source-to-film distance (cm), γ is the gamma constant, F is film factor, and E is the required exposure (e.g. 1.5 R for Class I AGFA D7 film). A 50 Ci source at 600 mm SFD onto D7 film through 20 mm steel typically requires 2-3 minutes exposure.[3]',
        'Practical wall-thickness range: 5-75 mm steel for ASME-quality images. Below 5 mm the photon energy is too high for adequate contrast (use X-ray or Se-75); above 75 mm the exposure times become excessive (use Co-60). The "sweet spot" is 12-40 mm where Ir-192 gives the best balance of penetration, contrast, and shot time.',
      ],
    },
    {
      heading: 'Source safety, transport, and licensing',
      level: 2,
      paragraphs: [
        'Ir-192 sources are Category 2 radioactive material under IAEA RS-G-1.9 — high-risk if uncontrolled. US users license under 10 CFR Part 34 (Industrial Radiography), require dedicated radiographer training (40 hours per ASNT CP-189 plus state-specific licensing), and follow strict daily survey, source-position-verification, and two-person rule protocols.',
        'Transport: Ir-192 ships in Type B(U) packages (HOC-100, Sentinel B660) that survive specified fire, drop, and immersion tests under 10 CFR 71 / IAEA SSR-6. Each shipment carries a Highway Route Controlled Quantity (HRCQ) placard if total activity exceeds 27 TBq (~730 Ci).',
        'Source stuck-in-camera events are the dominant industrial RT hazard. NRC Bulletin 2013-01 cataloguues recovery scenarios. Crews carry lead-blanket emergency shielding, calibrated survey meters, and an emergency response plan — operating without these is a license violation.',
      ],
    },
  ],
  workedExample: {
    setup:
      'Pipeline girth weld radiography. Pipe: 16 inch OD × 12.7 mm wall API 5L X65 carbon steel. Source: 70 Ci Ir-192 on Day 30 of source life (decayed from 100 Ci nominal). SFD: 600 mm. Film: AGFA D7 lead-screen sandwich. Required: ASME B31.3 with 2-2T sensitivity.',
    calculation:
      'Effective activity after 30 days: A = 100 × e^(−0.00939 × 30) = 75.5 Ci (closer to 70 Ci field-checked). Dose rate at 1 m unshielded = 75.5 × 4.8 = 362 mR/h. Exposure time using standard pipeline RT chart (Kodak Industrial Radiography Manual): for 12.7 mm steel through-wall single exposure, t = (1.5 R × (60 cm)² × density factor) / (70 Ci × 4.8 R·cm²/Ci·min). Worked out gives ~2.5 minutes exposure. Exclusion radius at 2 mR/h: r = √(362/2) ≈ 13.5 m. IQI: ASME V T-276 for 12.7 mm = Type 15, 2T hole = 0.030 in.',
    result:
      'Shot at 2.5 min, 600 mm SFD, 70 Ci Ir-192 source. Exclusion radius 14 m taped and patrolled. Film developed: density 2.2-3.5 per ASME V T-282, IQI Type 15 with 2T hole clearly visible. Image accepted; weld evaluation against B31.3 acceptance criteria proceeds.',
  },
  whereItAppears: [
    {
      context: 'Pipeline construction radiography on a cross-country project',
      explanation:
        'Daily crews on a 30 inch gas transmission line shoot 100-150 girth welds with Ir-192 cameras carrying 50-100 Ci sources. Single-wall single-image (SWSI) panoramic shots at 8 minutes total cover the entire weld in one exposure. The crew\'s daily dose log, source decay tracking, and survey-meter records are the regulatory file the NRC or state agency inspects.',
    },
    {
      context: 'In-shop pressure vessel longitudinal seam radiography',
      explanation:
        'Fabrication shops use 40-80 Ci Ir-192 sources in shielded vaults for full-length seam RT on ASME VIII pressure vessels. The vault wall is sized via HVL calculation for the maximum credible source activity; controlled-area boundary remains below 2 mR/h continuous during exposure. Source-change schedules every ~70 days are planned around shop turnaround windows.',
    },
    {
      context: 'Refinery turnaround weld repair NDT',
      explanation:
        'Repair welds on process piping during a turnaround are radiographed in the field with portable Ir-192 cameras. Crews work nights when adjacent units are de-staffed to shrink the exclusion footprint. Each repair weld\'s RT shot is logged with source ID, source-side IQI, and ALARA exposure record per the site\'s NRC license conditions.',
    },
  ],
  relatedTerms: [
    { term: 'Cobalt-60', slug: 'cobalt-60' },
    { term: 'Selenium-75', slug: 'selenium-75' },
    { term: 'Half-Value Layer', slug: 'half-value-layer' },
    { term: 'IQI', slug: 'iqi' },
  ],
  faqs: [
    {
      q: 'Why has Iridium-192 become the dominant industrial radiography source?',
      a: 'Three properties make Ir-192 the workhorse. First, its mean 380 keV photon energy is well-matched to steel wall thicknesses of 5-75 mm — the bulk of fabrication and pipeline work. Second, its 73.83-day half-life provides a usable working life of 90-120 days from a fresh source, fitting commercial source-change scheduling. Third, its high specific activity allows source capsules under 5 mm in diameter — small enough to fit portable hand-carried cameras under 25 kg. Compared with X-ray tubes, Ir-192 cameras need no power supply and work in remote-pipeline environments; compared with Co-60, the lower energy means smaller exclusion zones and lighter shielding pots. The combination of these factors is why ~80% of global field gamma radiography uses Ir-192.',
    },
    {
      q: 'What is the difference between Ir-192 and Co-60 for thick-wall radiography?',
      a: 'Co-60 emits photons at 1.17 and 1.33 MeV (mean ~1.25 MeV), about 3.3× the energy of Ir-192. The harder beam penetrates much thicker steel — Co-60 is used routinely on 50-200 mm walls, where Ir-192 exposure times become impractically long. But the trade-offs are significant: Co-60\'s lead HVL is 12 mm vs. 4.8 mm for Ir-192, so shield pots are 2.5× heavier; exclusion zones grow proportionally. Image contrast on thin walls (under 25 mm) is poor with Co-60 because the high-energy beam has too few photoelectric interactions. Operational rule: Ir-192 for steel under 75 mm; switch to Co-60 only when wall thickness or geometry makes Ir-192 exposure exceed about 30-45 minutes. Pipelines, vessels, and most welds favor Ir-192; nuclear primary-system welds and heavy-section forgings favor Co-60.',
    },
    {
      q: 'How is the activity of an Ir-192 source verified before each use?',
      a: 'NRC 10 CFR 34.27 requires daily source-position and source-strength verification before any radiographic operation. The standard procedure: (1) survey-meter check at 1 m from the camera in the shielded condition (expected reading << 2 mR/h confirms source is fully shielded); (2) expose the source briefly using the crank-out cable and verify dose rate at 1 m matches the decay-corrected expected value (e.g. for a 60 Ci source today, expect ~290 mR/h at 1 m); (3) retract and verify shielded reading again. Discrepancies trigger immediate stop-work. Surveys are logged with date, time, source ID, and meter ID; the log is the first thing an NRC inspector reviews during a license audit.',
    },
    {
      q: 'What happens at the end of an Ir-192 source\'s useful life?',
      a: 'When activity decays below the operational minimum (typically 20-30 Ci for portable cameras), the source is returned to the manufacturer (QSA Global, SPEC, Sentinel) in a Type B(U) shipping cask for disposal or reactor re-activation. The licensee never possesses an "expired" source — it is removed from the camera and immediately placed into the return shipping container with full chain-of-custody documentation. Disposal pathways include re-activation in a neutron source (which produces fresh Ir-192 from the same physical pellet) or eventual long-term storage as radioactive waste. The empty camera is then loaded with a fresh ~100 Ci source under controlled-area protocols, restoring operational activity for the next ~120-day cycle.',
    },
  ],
  internalLinks: [
    {
      href: '/services/radiographic-testing',
      label: 'Radiographic Testing',
      context: 'Ir-192 is the most common gamma source for industrial RT inspections',
    },
    {
      href: '/glossary/cobalt-60',
      label: 'Cobalt-60',
      context: 'Co-60 covers thicker walls than Ir-192 with a much harder photon beam',
    },
    {
      href: '/glossary/selenium-75',
      label: 'Selenium-75',
      context: 'Se-75 is the thin-wall alternative to Ir-192 with better contrast on 5-20 mm steel',
    },
    {
      href: '/glossary/half-value-layer',
      label: 'half-value layer',
      context: 'HVL math drives Ir-192 shielding pot design and exclusion-zone radius',
    },
    {
      href: '/glossary/iqi',
      label: 'IQI selection',
      context: 'IQI sensitivity grade depends on Ir-192 spectrum and part thickness',
    },
    {
      href: '/standards/asme-bpvc-section-v',
      label: 'ASME BPVC Section V',
      context: 'Article 2 governs Ir-192 gamma radiography procedures and IQI requirements',
    },
    {
      href: '/standards/api-1104',
      label: 'API 1104',
      context: 'API 1104 pipeline weld acceptance is the dominant code calling out Ir-192 RT',
    },
    {
      href: '/free-tools/ai-procedure-generator',
      label: 'NDT procedure generator',
      context: 'Auto-generate RT procedures specifying Ir-192 exposure and shielding parameters',
    },
    {
      href: '/industries/oil-and-gas',
      label: 'oil and gas pipeline RT',
      context: 'Ir-192 cameras shoot the vast majority of global pipeline construction welds',
    },
  ],
  citations: [
    {
      id: 'iaea-nuclide-data',
      source: 'IAEA Nuclear Data Section — Iridium-192 decay data, ENSDF database (2024 update)',
      url: 'https://www-nds.iaea.org/',
    },
    {
      id: '10cfr34',
      source: '10 CFR Part 34, Licenses for Industrial Radiography and Radiation Safety Requirements for Industrial Radiographic Operations',
      url: 'https://www.nrc.gov/reading-rm/doc-collections/cfr/part034/',
    },
    {
      id: 'asme-v-art-2',
      source: 'ASME BPVC Section V, 2023 Edition, Article 2 — Radiographic Examination (Ir-192 procedure requirements)',
    },
    {
      id: 'iaea-tecdoc-1162',
      source: 'IAEA TECDOC-1162 (2000), Industrial Radiography Manual — Ir-192 source data and shielding tables',
    },
    {
      id: 'kodak-rad-manual',
      source: 'Kodak Industrial Radiography Manual, Eastman Kodak Co., 6th ed., 2018 — Exposure factor charts for Ir-192',
    },
  ],
};

export default term;
