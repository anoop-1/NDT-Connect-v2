import type { GlossaryLongFormContent } from '../types';

const term: GlossaryLongFormContent = {
  slug: 'half-value-layer',
  term: 'Half-Value Layer (HVL)',
  category: 'Radiographic Testing',
  metaTitle: 'Half-Value Layer (HVL): Lead Shielding Values for Ir-192, Co-60, X-Ray',
  metaDescription:
    'HVL is the material thickness that halves radiation intensity. Get HVL values for lead, steel, concrete with Ir-192, Co-60, Se-75 — and how to size shields for legal dose limits.',
  heroLede:
    'Half-value layer (HVL) is the thickness of a given material that reduces incident radiation intensity by exactly 50%. For an industrial radiographer working with Iridium-192, lead has an HVL of 4.8 mm; for Cobalt-60 it climbs to 12 mm. HVL is the engineering calculation that sets shield thickness, exclusion-zone radius, and dose-rate compliance against the 2 mR/h boundary required by 10 CFR 20 and IAEA SSG-11.',
  preciseDefinition:
    'Half-value layer (HVL) is the thickness of a specified material that attenuates a beam of mono-energetic photons to one-half of its incident intensity, with build-up factor neglected.[1]',
  alternateNames: ['HVL', 'Half-thickness', 'Half-value thickness', 'd₁/₂'],
  history:
    'The HVL concept derives from Bouguer-Lambert exponential attenuation (Bouguer 1729, Lambert 1760), applied to gamma- and X-radiation by Rutherford and Soddy in 1903 as part of their work on radioactive decay. The unit became codified in radiation protection through ICRP Publication 1 (1959) and the IAEA Basic Safety Standards. NRC 10 CFR 20 imposes 2 mR/h at unrestricted boundary, which forces every industrial radiographer to calculate shielding in HVLs.',
  technicalDetail: [
    {
      heading: 'Mathematics of exponential attenuation',
      level: 2,
      paragraphs: [
        'The basic relation is I = I₀ × e^(−μx), where I₀ is incident intensity, I is transmitted intensity, μ is the linear attenuation coefficient (cm⁻¹), and x is thickness. Setting I/I₀ = 0.5 gives x = ln(2)/μ = 0.693/μ. That x is one HVL.',
        'For n half-value layers, intensity reduces to (½)ⁿ × I₀. Three HVL gives 12.5% transmission, five HVL gives 3.1%, ten HVL gives ~0.1%. Every dose-rate calculation in industrial RT shielding is essentially this exponential, applied in series for layered materials.[2]',
        'TVL (tenth-value layer) is the thickness that drops intensity to 10%: TVL = ln(10)/μ ≈ 3.32 × HVL. Many RT operators design exclusion zones in TVLs because 10× reduction is the operational unit for moving from 100 mR/h to 10 mR/h and so on.',
      ],
    },
    {
      heading: 'HVL values for common materials and sources',
      level: 2,
      paragraphs: [
        'Iridium-192 (Eγ ≈ 380 keV mean): lead HVL 4.8 mm, steel HVL 13 mm, concrete HVL 41 mm.',
        'Cobalt-60 (Eγ 1.17 + 1.33 MeV): lead HVL 12 mm, steel HVL 22 mm, concrete HVL 60 mm. Co-60 is far harder to shield, which is why most field exposure devices use Ir-192 unless wall thickness > 50 mm steel demands the harder Co-60 beam.',
        'Selenium-75 (mean ≈ 217 keV): lead HVL 2.0 mm, steel HVL 9 mm. Sharper spectrum makes Se-75 ideal for 5-30 mm steel walls and notably easier to shield than Ir-192.',
        'X-ray tube at 250 kV (panoramic industrial): lead HVL ≈ 2.7 mm; at 450 kV crawler-type, lead HVL ≈ 4.0 mm. Decreasing kV always lowers HVL.',
        'Build-up factor (B): for thick shields, scattered photons add to the transmitted intensity. The simple exponential underestimates true dose by 30-150% for 3-10 HVL of concrete or steel. Use ANSI/ANS-6.4.3 buildup tables in detailed shield design.[3]',
      ],
    },
    {
      heading: 'Field application — sizing a shield or exclusion zone',
      level: 2,
      paragraphs: [
        'Start from the source activity and 1 m dose rate. For a 100 Ci Ir-192 source, 1 m gamma dose rate ≈ 480 mR/h (R(m)·hr⁻¹/Ci ≈ 4.8). Calculate dose rate at the boundary distance using inverse-square law, then apply shielding HVLs to bring it below the limit.',
        'NRC 10 CFR 20.1301 sets the unrestricted-area limit at 2 mR/h. To reduce 480 mR/h at 1 m to 2 mR/h, total reduction factor = 240×, i.e. between 7 and 8 HVL. With distance gaining a factor (1/r²), most fieldwork combines exclusion radius plus minimal lead pot shielding around the source itself.',
        'For an indoor exposure room (vault radiography), wall thickness is chosen so transmitted dose at the public boundary is < 2 mR/h continuous, < 100 mR/h occupational. Concrete is the structural material of choice; for 100 Ci Ir-192 a typical vault wall is 50 cm of concrete (~12 HVL × 41 mm/HVL).',
      ],
    },
  ],
  workedExample: {
    setup:
      '100 Ci Ir-192 source for industrial gamma radiography. Site requires the controlled-area boundary at 2 mR/h continuous, per 10 CFR 20.1301. Initial unshielded dose rate at 1 m = 480 mR/h. Lead pot around the source plus exclusion radius to be calculated.',
    calculation:
      'Required reduction factor at the boundary = 480 mR/h ÷ 2 mR/h = 240×. Number of HVLs needed = log₂(240) ≈ 7.9 HVL combined attenuation. Option A — distance only: r²/1² = 240, r = √240 ≈ 15.5 m exclusion radius. Option B — partial lead pot of 30 mm (≈ 6.25 HVL of Pb at Ir-192) reduces to 480 × (1/2)^6.25 = 6.5 mR/h at 1 m; then required boundary distance r = √(6.5/2) = 1.8 m. Option C — full pot with 50 mm lead (~10 HVL) drops dose to 0.47 mR/h at 1 m, well below the boundary limit at any practical distance.',
    result:
      'Practical field choice: 30 mm lead source-holder (commercial Tech Ops Sentinel 660B or QSA Gamma A424-9) plus a 5 m taped-and-signed exclusion radius — the standard daily setup for industrial radiography crews. Survey meter reading at the boundary verified to ≤ 2 mR/h before each shot; log entry per ASNT CP-189 and NRC license conditions.',
  },
  whereItAppears: [
    {
      context: 'Pipeline weld radiography in the field (panoramic or DWE technique)',
      explanation:
        'A radiography crew with a 70 Ci Ir-192 source maps the exclusion radius on every shot. HVL math drives the boundary: 70 × 4.8 = 336 mR/h at 1 m unshielded; required distance for 2 mR/h ≈ 13 m. Crews bring lead-loaded blankets (each 6 mm = 1.25 HVL of Pb) to shield directional beam shots and shrink the exclusion radius for tight pipeline rights-of-way.',
    },
    {
      context: 'Designing a fixed RT vault for fabrication QA work',
      explanation:
        'A fabrication shop building a 450 kV X-ray vault calculates concrete wall thickness using TVL values: 450 kV X-rays have a concrete TVL of ~13 cm. For 1,000× reduction (3 TVL) the walls are designed at 40 cm — plus a ~30% safety margin for buildup. Roof shielding is often the limiting case because skyshine doubles back into adjacent occupied floors.',
    },
    {
      context: 'Source change-out and recovery scenarios',
      explanation:
        'When an Ir-192 source becomes stuck partway out of its shielding pot during pipeline radiography, the responding emergency team uses HVL math in real time to size lead-blanket shielding for a controlled recovery. Each 12 mm lead blanket gives 2.5 HVL at 380 keV; layering three blankets cuts dose by a factor of ~180, often the difference between a 30-minute and a 6-minute recovery exposure window.',
    },
  ],
  relatedTerms: [
    { term: 'Iridium-192', slug: 'iridium-192' },
    { term: 'Cobalt-60', slug: 'cobalt-60' },
    { term: 'Selenium-75', slug: 'selenium-75' },
    { term: 'IQI', slug: 'iqi' },
  ],
  faqs: [
    {
      q: 'How is the half-value layer different from the tenth-value layer?',
      a: 'HVL is the thickness that reduces intensity by 50% (factor of 2); TVL reduces by 90% (factor of 10). The mathematical relation is TVL = HVL × log₂(10) ≈ HVL × 3.32. Field calculation often uses TVLs because exclusion-zone math tends to require 10×, 100×, 1,000× reductions and TVLs make the arithmetic cleaner — "I need 1,000× reduction, that\'s 3 TVL". HVLs work better for small fine-tuning (8 mR/h to 4 mR/h is one HVL; from 4 to 2 is another). Reference tables published by IAEA TECDOC-1162 and NCRP Report 147 give both HVL and TVL values for industrial sources against lead, steel, and concrete.',
    },
    {
      q: 'Does HVL depend on source activity or only on source energy?',
      a: 'Only on energy and material. HVL is a fundamental property of the material at a given photon energy spectrum — it does not change with source activity. A 10 Ci Ir-192 source and a 100 Ci Ir-192 source see the same HVL in lead (4.8 mm), because both emit photons of the same mean energy. The 100 Ci source delivers 10× the photon flux through any thickness, but the same fractional attenuation per HVL applies. This is why industrial radiography shield design depends only on isotope choice and material; source size is then chosen separately based on inspection time, geometry, and exposure factor (S × t / d²).',
    },
    {
      q: 'Why does Cobalt-60 require thicker shielding than Iridium-192?',
      a: 'Co-60 emits two gamma photons per decay at 1.17 MeV and 1.33 MeV — roughly 3-4× the photon energy of Ir-192\'s mean 380 keV. Higher-energy photons penetrate matter more easily because Compton scattering and photoelectric absorption probabilities both drop with energy in this range. The result: lead HVL for Co-60 is ~12 mm vs. 4.8 mm for Ir-192, and steel HVL climbs from 13 mm to 22 mm. This is exactly why Co-60 is reserved for very thick walls (50-200 mm steel) where Ir-192 lacks the penetration — the trade-off is that Co-60 exposure devices are 2-3× larger, heavier, and more expensive to shield than equivalent Ir-192 cameras.',
    },
    {
      q: 'How accurate is the simple I = I₀ × e^(−μx) formula in real shielding calculations?',
      a: 'It is accurate within ~10% for thin shields (1-2 HVL) at the centre of a narrow collimated beam. For thicker shields and broader beams, Compton-scattered photons that arrive at the detector add to the transmitted intensity, an effect called buildup. The true dose is I = B × I₀ × e^(−μx) where B is the buildup factor — ANSI/ANS-6.4.3-2014 tabulates B by material, photon energy, and shield thickness. For 6 HVL of concrete with a Co-60 source, B ≈ 4 — the simple exponential underestimates dose by a factor of 4. Vault and bunker shielding designs always apply buildup correction; field exclusion calculations for short transient exposures use the simple exponential with conservative source activity assumptions.',
    },
  ],
  internalLinks: [
    {
      href: '/services/radiographic-testing',
      label: 'Radiographic Testing',
      context: 'HVL is the foundational shielding calculation for every industrial RT job',
    },
    {
      href: '/glossary/iridium-192',
      label: 'Iridium-192',
      context: 'Ir-192 is the most common industrial gamma source — HVL drives its shield sizing',
    },
    {
      href: '/glossary/cobalt-60',
      label: 'Cobalt-60',
      context: 'Co-60 has 2-3× the HVL of Ir-192 because of its higher photon energy',
    },
    {
      href: '/glossary/selenium-75',
      label: 'Selenium-75',
      context: 'Se-75 has a smaller HVL than Ir-192, useful for thin-wall pipeline radiography',
    },
    {
      href: '/glossary/iqi',
      label: 'IQI (Image Quality Indicator)',
      context: 'Adequate IQI sensitivity depends on the energy choice — same HVL math drives it',
    },
    {
      href: '/standards/asme-bpvc-section-v',
      label: 'ASME BPVC Section V',
      context: 'Article 2 RT procedures must specify shielding adequate to legal dose-rate limits',
    },
    {
      href: '/free-tools/ai-procedure-generator',
      label: 'NDT procedure generator',
      context: 'Generate RT procedures that include source-specific HVL shielding requirements',
    },
    {
      href: '/industries/oil-and-gas',
      label: 'oil and gas pipeline RT',
      context: 'Pipeline radiography crews size exclusion zones daily using HVL calculations',
    },
    {
      href: '/industries/power-generation',
      label: 'power generation NDT',
      context: 'Nuclear and conventional power radiography vault design is built on HVL/TVL tables',
    },
  ],
  citations: [
    {
      id: 'ncrp-147',
      source: 'NCRP Report No. 147 (2004), Structural Shielding Design for Medical X-Ray Imaging Facilities — HVL and TVL tables',
    },
    {
      id: 'iaea-tecdoc-1162',
      source: 'IAEA TECDOC-1162 (2000), Industrial Radiography Manual — Shielding calculations for Ir-192, Co-60, Se-75',
      url: 'https://www.iaea.org/publications/6157',
    },
    {
      id: 'ansi-ans-6-4-3',
      source: 'ANSI/ANS-6.4.3-2014, Gamma-Ray Attenuation Coefficients and Buildup Factors for Engineering Materials',
    },
    {
      id: '10cfr20',
      source: '10 CFR Part 20.1301 (2024), Standards for Protection Against Radiation — Dose limits to individual members of the public',
      url: 'https://www.nrc.gov/reading-rm/doc-collections/cfr/part020/',
    },
    {
      id: 'asme-v-art-2',
      source: 'ASME BPVC Section V, 2023 Edition, Article 2 — Radiographic Examination (shielding adequacy requirements)',
    },
  ],
};

export default term;
