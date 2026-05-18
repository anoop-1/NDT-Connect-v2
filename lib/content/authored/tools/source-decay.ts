import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'source-decay',
  name: 'Source Activity Decay Calculator',
  category: 'rt',
  inputs: [
    { id: 'initialActivity', label: 'Initial activity', unit: 'Ci', type: 'number' },
    { id: 'isotope', label: 'Isotope', type: 'select' },
    { id: 'daysElapsed', label: 'Days elapsed since calibration', unit: 'days', type: 'number' },
  ],
  outputs: [
    { id: 'currentActivity_Ci', label: 'Current activity', unit: 'Ci' },
    { id: 'percentRemaining', label: 'Percent remaining', unit: '%' },
  ],
  metaTitle: 'Gamma Source Decay Calculator | Ir-192, Co-60, Se-75',
  metaDescription:
    'Decay an industrial radiography source to its current activity using A(t) = A₀ × exp(-λt) with half-life values from ANSI N43.3.',
  heroLede:
    'A source projector certificate shows the activity on day of calibration — never the activity on the day you load the camera. Iridium-192 drops 1% per day; on day 75 you have half the curies you started with, and on day 150 you have a quarter. This tool runs the exponential decay so the exposure-time and safe-distance numbers you generate match the source as it stands today, not as it left the supplier.',
  howItWorks:
    'Radioactive decay is first-order: A(t) = A₀ × e^(-λt) where λ = ln(2) / half-life. Every isotope has a fixed half-life: Ir-192 = 73.83 days, Co-60 = 5.27 years (1925 d), Se-75 = 119.78 days, Cs-137 = 30.05 years. Multiply current activity by the inverse-square distance factor and you have a working dose rate at any point in the source\'s service life.',
  formula: 'A(t) = A₀ × exp(-λ × t) ; λ = ln(2) / T½',
  workedExample: {
    inputs: { initialActivity: 100, isotope: 'Ir-192', daysElapsed: 75 },
    outputs: { currentActivity_Ci: '49.3', percentRemaining: '49.3' },
    explanation:
      'A 100 Ci Ir-192 source 75 days post-calibration. T½ = 73.83 days, λ = ln(2)/73.83 = 0.00939/day. A(75) = 100 × e^(-0.00939 × 75) = 100 × e^(-0.704) = 49.3 Ci. Plug 49.3 Ci into the safe-distance calculator instead of the certificate value — the difference between 100 Ci and 49 Ci is the difference between a 50 m and a 35 m boundary.',
  },
  whenToUse:
    'Use every time you load a source projector, plan a shoot more than a week out, write a shielding letter, or audit a vendor\'s exposure calculation. Required before every Ir-192 job because the activity is meaningfully different week to week.',
  limitations: [
    'Assumes no source replacement or top-up. If the assembly was re-loaded mid-cycle, restart from the new calibration date.',
    'Cobalt-60 decay over a typical 5-year service life drops activity to 51% — significant but slower than Ir-192.',
    'Se-75 has a slightly more complex decay scheme; the simple A₀ × e^(-λt) is accurate to within 0.5% across normal service intervals.',
    'Half-life values vary by source: ANSI N43.3 lists 73.83 d for Ir-192; NIST gives 73.827 d — for field work the variation is irrelevant.',
    'Does not account for source self-absorption, which becomes noticeable for very large source pellets (>3 mm).',
  ],
  relatedTools: [
    { slug: 'radiation-safe-distance', name: 'Radiation Safe Distance' },
    { slug: 'half-value-layer', name: 'Half-Value Layer' },
    { slug: 'rt-exposure-time', name: 'RT Exposure Time' },
    { slug: 'astm-e94-exposure-lookup', name: 'ASTM E94 Exposure Lookup' },
  ],
  faqs: [
    {
      q: 'How often should I recompute source activity?',
      a: 'For Ir-192 every shift — the source loses ~1% per day, so a one-week-old activity reading is 7% off. For Co-60 weekly is enough; the half-life is 5.27 years and weekly drift is 0.03%. Operating procedures under 10 CFR 34.43 require source activity tracking in the daily utilization log, and many DOT type-B transport documents require the activity to be updated to within 24 hours of shipment.',
    },
    {
      q: 'What half-life value is authoritative?',
      a: 'NIST and IAEA publish the reference values: Ir-192 = 73.827 ± 0.013 days, Co-60 = 1925.28 ± 0.14 days (5.2711 years), Se-75 = 119.779 ± 0.004 days, Cs-137 = 30.05 ± 0.08 years. ANSI N43.3 rounds these to four-significant-figure values for industry use. The differences are immaterial in the field but show up in audit calculations — pick one source and use it consistently.',
    },
    {
      q: 'Can a depleted Ir-192 source still be used?',
      a: 'Mechanically yes, until DOT/NRC type-B encapsulation expires (10 years for most projector sources per 10 CFR 71). Practically no — below ~10 Ci of Ir-192 the exposure times for a quarter-inch steel weld push past 30 minutes per shot, making the job uneconomical. Industry rule of thumb: replace at 25% of original activity, which is two half-lives or ~148 days for Ir-192.',
    },
    {
      q: 'How does decay affect exposure time?',
      a: 'Inversely. Exposure time at constant film density scales as 1/activity, so a source at 50% activity needs twice the exposure. A weld that took 4 minutes on day 0 takes 8 minutes on day 73.83 (one half-life), 16 minutes on day 147, and 32 minutes by day 220. This is exactly why the RT exposure-time tool pulls current activity from this decay calculator rather than using a fixed certificate value.',
    },
  ],
  citations: [
    { id: 'ansi-n43-3', source: 'ANSI N43.3-2008 General Radiation Safety for Sealed Gamma-Ray Sources' },
    { id: 'cfr-10-34-43', source: '10 CFR 34.43 — Inspection and maintenance of radiographic exposure devices' },
    { id: 'nist-half-life', source: 'NIST Standard Reference Data: Atomic Weights and Half-Lives of Radionuclides' },
    { id: 'iaea-srs-13', source: 'IAEA Safety Reports Series No. 13 (1999), Radiation Protection in Industrial Radiography' },
  ],
};

export default tool;
