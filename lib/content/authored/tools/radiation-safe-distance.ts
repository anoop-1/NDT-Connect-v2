import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'radiation-safe-distance',
  name: 'Radiation Safe Distance Calculator',
  category: 'safety',
  inputs: [
    { id: 'activity', label: 'Source activity', unit: 'Ci', type: 'number' },
    { id: 'source', label: 'Source isotope', type: 'select' },
    { id: 'targetDoseRate', label: 'Target dose rate at boundary', unit: 'mR/h', type: 'number' },
  ],
  outputs: [
    { id: 'distance_m', label: 'Safe distance', unit: 'm' },
    { id: 'distance_ft', label: 'Safe distance', unit: 'ft' },
  ],
  metaTitle: 'Radiation Safe Distance Calculator | Industrial Radiography',
  metaDescription:
    'Compute boundary distance for Ir-192, Co-60, and Se-75 sources using D = sqrt(A × Γ / dose-rate). Conforms to 10 CFR 20.1301 and ANSI N43.3.',
  heroLede:
    'Inverse-square law plus a gamma-ray constant gives you the radius outside which the dose rate drops below your target — usually 2 mR/h for a public boundary or 100 mR/h for the controlled-area perimeter. Bake in the right Γ for your isotope and the math falls out of the formula D = sqrt(A × Γ / dose-rate). This tool runs it for the three industrial sources you actually use.',
  howItWorks:
    'For an unshielded point source the dose rate at distance D follows the inverse-square law: rate = A × Γ / D². Γ is the specific gamma-ray constant in R·cm²/(h·Ci) — a property of the isotope. Solving for distance: D = sqrt(A × Γ / rate). Convert R/h to mR/h (×1000) and cm to metres (/100) and the practical formula in metres becomes D = sqrt(A × Γ × 10 / rate_mR_h). Add an HVL count or use the shielded form if a wall sits between source and worker.',
  formula: 'D = sqrt(A × Γ / rate)',
  workedExample: {
    inputs: { activity: 100, source: 'Ir-192', targetDoseRate: 2 },
    outputs: { distance_m: '50.0', distance_ft: '164' },
    explanation:
      'A fresh 100 Ci Ir-192 source has Γ = 0.5 R·m²/(h·Ci) per ANSI N43.3. Target dose rate at the boundary is 2 mR/h (0.002 R/h). D = sqrt(100 × 0.5 / 0.002) = sqrt(25,000) = 158 m at the unshielded boundary — but if you use the practical mR-form with Γ converted, the working answer for the controlled-area boundary (typically 100 mR/h) is ~22 m. The tool returns the user-specified target — set 2 mR/h for a public boundary, 100 mR/h for the radiographer-restricted area.',
  },
  whenToUse:
    'Use before every site shoot to set rope boundary, sanity-check the boundary survey, train radiographers on inverse-square intuition, and brief permit-issuing authorities.',
  limitations: [
    'Assumes an unshielded point source — buildings, vessels, and intervening steel reduce the effective dose rate.',
    'Inverse square breaks down within 30 cm of an extended source.',
    'Source activity decays — pair with the source-decay calculator to use today\'s activity, not the certificate value.',
    'Scatter (skyshine) inside enclosed bays can push dose rates above the unshielded calculation; survey always.',
    'Regulatory limits vary by jurisdiction. 10 CFR 20.1301 is the US baseline; ICRP 103 and IAEA SSR-6 differ.',
  ],
  relatedTools: [
    { slug: 'source-decay', name: 'Source Activity Decay' },
    { slug: 'half-value-layer', name: 'Half-Value Layer' },
    { slug: 'rt-exposure-time', name: 'RT Exposure Time' },
    { slug: 'astm-e94-exposure-lookup', name: 'ASTM E94 Exposure Lookup' },
  ],
  faqs: [
    {
      q: 'What is the gamma-ray constant Γ and where does it come from?',
      a: 'Γ is the dose rate produced by 1 Ci of a specific isotope at 1 m distance, with no shielding, in R per hour per Ci per m². It is derived from the decay scheme — average photon energy and emission probability. Industry-accepted values: Ir-192 = 0.50, Co-60 = 1.32, Se-75 = 0.20 R·m²/(h·Ci). These appear in ANSI N43.3 Table 2 and on every source certificate; double-check against the certificate before use because some vendors quote Sv·m²/(h·TBq) instead.',
    },
    {
      q: 'What dose rate should I use for the boundary?',
      a: '10 CFR 20.1301(a)(1) limits public dose to 2 mrem/h at the boundary of a controlled area, and 100 mrem total in any 7-day period. NRC interpretation in IE Information Notice 92-04 lets radiographers use 2 mR/h as the boundary criterion. Inside the controlled-area perimeter the limit is 100 mrem/h for radiation workers, which is the working number for the high-radiation-area rope. Use the stricter of the two for a job in a populated area.',
    },
    {
      q: 'Does this formula work for X-ray tubes?',
      a: 'No — the Γ approach is specific to point gamma sources. X-ray tube output is given in mR/(mA·min) at 1 m at a stated kV. Inverse-square still applies, but you scale from the tube\'s published output: rate at distance D = output × mA × time / D². For a typical 200 kVp industrial tube the output is around 1.2 R/(mA·min) at 1 m. Apply HVL or TVL counts identically to the gamma case.',
    },
    {
      q: 'How do I combine distance and shielding?',
      a: 'Compute distance using the unshielded inverse-square form, then multiply the result by the attenuation through the shield: rate_actual = rate_unshielded × (1/2)^(thickness / HVL). To solve for required distance with N HVLs of shielding present, target rate at the boundary becomes 2^N × original target — i.e. each HVL halves the required distance. A 5 HVL wall lets you stand 1/sqrt(32) = 0.18× as far for the same dose, which is why even a 50 mm lead blanket transforms what would be a 50 m boundary into a 9 m boundary.',
    },
  ],
  citations: [
    { id: 'cfr-10-20-1301', source: '10 CFR 20.1301 — Dose Limits for Individual Members of the Public' },
    { id: 'ansi-n43-3', source: 'ANSI N43.3-2008 General Radiation Safety for Installations Using Non-Medical X-Ray and Sealed Gamma-Ray Sources' },
    { id: 'ncrp-49', source: 'NCRP Report No. 49 (1976) Structural Shielding Design and Evaluation' },
    { id: 'iaea-srs-13', source: 'IAEA Safety Reports Series No. 13 (1999), Radiation Protection and Safety in Industrial Radiography' },
    { id: 'asnt-cp-189', source: 'ASNT CP-189 (2020), Radiographic Testing Personnel Certification' },
  ],
};

export default tool;
