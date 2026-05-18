import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'rt-exposure-time',
  name: 'Radiography Exposure Time Calculator',
  category: 'rt',
  inputs: [
    { id: 'activity', label: 'Source activity', unit: 'Ci', type: 'number' },
    { id: 'sfd', label: 'Source-to-film distance', unit: 'in', type: 'number' },
    { id: 'thickness', label: 'Steel thickness', unit: 'in', type: 'number' },
    { id: 'film', label: 'Film class', type: 'select' },
  ],
  outputs: [
    { id: 'exposureSeconds', label: 'Exposure time', unit: 's' },
    { id: 'exposureMinutes', label: 'Exposure time', unit: 'min' },
  ],
  metaTitle: 'RT Exposure Time Calculator | Ir-192 Film Exposure',
  metaDescription:
    'Calculate gamma radiography exposure time for Ir-192 on D4/D5/D7/D8 film classes using the exposure-factor method per ASTM E94 and ASME V Article 2.',
  heroLede:
    'A 25 mm steel weld with a 60 Ci Ir-192 source and Class II film at 36 inch SFD takes about 4 minutes. Bump SFD to 48 inches and the time goes to 7 minutes because the inverse square hits hard. This tool runs the exposure-factor lookup that every Level II radiographer keeps taped to the inside of their film bag — but with current source activity baked in rather than the certificate value.',
  howItWorks:
    'Exposure time scales with the exposure factor E(t) from ASTM E94 lookup tables (E94 Annex A1, Tables A1.1–A1.4 for Ir-192 and Co-60). The working formula is t = E × SFD² / (A × density-factor), where E is read from a kV/thickness or isotope/thickness table, SFD is squared per inverse-square, A is current activity, and the density factor adjusts between film classes. Class I (D2/D3) fine-grain slow film needs ~3× the exposure of Class III (D7/D8) coarse-grain fast film at the same density.',
  formula: 't = (E × SFD²) / (A × FilmFactor)',
  workedExample: {
    inputs: { activity: 60, sfd: 36, thickness: 1.0, film: 'D5 (Class II)' },
    outputs: { exposureSeconds: '240', exposureMinutes: '4.0' },
    explanation:
      '60 Ci Ir-192 source, 1.0 inch (25.4 mm) steel thickness, Class II film (Kodak AA / Agfa D5), 36 inch SFD. From ASTM E94 the exposure factor at 1 inch steel for Ir-192 is ~0.18 Ci·min/in² for density 2.0 on D5. t = (0.18 × 36²) / 60 = 233 / 60 ≈ 4.0 min = 240 s. Class I film (D3) would double this to 8 min; Class III (D7) would cut to 1.7 min — but Class III sacrifices definition.',
  },
  whenToUse:
    'Use to plan every Ir-192 weld shoot, validate vendor exposure times, recalculate when the source has decayed below 60% activity, or train new radiographers on the SFD-squared scaling that drives most density failures.',
  limitations: [
    'Calibrated for Ir-192 and Co-60 on steel only. Other isotopes and materials require their own exposure-factor tables.',
    'Density target is 2.0 H&D on film. Higher density (2.5–3.0) requires proportionally more time.',
    'Does not account for source-to-object-distance vs object-to-film-distance geometric unsharpness — verify Ug per ASTM E94 §17.',
    'Backscatter from concrete floors can add 10–15% density; not included.',
    'Film class boundaries are manufacturer-specific. Confirm with Kodak/Agfa/Fuji datasheet for your stock.',
  ],
  relatedTools: [
    { slug: 'source-decay', name: 'Source Activity Decay' },
    { slug: 'radiation-safe-distance', name: 'Radiation Safe Distance' },
    { slug: 'astm-e94-exposure-lookup', name: 'ASTM E94 Exposure Factor Lookup' },
    { slug: 'half-value-layer', name: 'Half-Value Layer' },
  ],
  faqs: [
    {
      q: 'Why does film class change exposure time so much?',
      a: 'Film speed varies by silver-halide grain size. Class I (D3) is ultra-fine grain — best definition, slowest. Class III (D7/D8) is coarse grain — fastest, lower definition. ASTM E94 Table 1 gives the speed ratios: D3:D5:D7 ≈ 4:2:1 in exposure factor. Pick the slowest class the schedule allows — better grain means smaller indications are visible at lower contrast.',
    },
    {
      q: 'How does SFD affect exposure?',
      a: 'Inverse square — double the SFD, quadruple the time. SFD also drives geometric unsharpness Ug = F·t/D where F is source dimension, t is object-to-film distance, D is source-to-object distance. ASME V Article 2 caps Ug at 0.020 in for thickness ≤ 2 in and 0.030 in for >2 to ≤3 in. Many shoots are SFD-constrained by Ug long before exposure-time becomes the binding factor.',
    },
    {
      q: 'What density target should I aim for?',
      a: 'ASME V T-282.1 and ASTM E94 §11 require base-plus-fog density of 2.0 to 4.0 H&D for routine work, measured under the area of interest. Most procedures target 2.5 ± 0.2. Below 2.0, density curves are too flat to distinguish a 2% sensitivity penetrameter; above 4.0, the high-density region drops off the linear part of the H&D curve.',
    },
    {
      q: 'Can I scale exposure for a thinner or thicker weld using HVL?',
      a: 'Yes — each HVL of additional steel doubles the required time. For Ir-192 the HVL in steel is ~13 mm. A weld that takes 4 min at 25 mm takes 8 min at 38 mm (one extra HVL) and 16 min at 51 mm. This is the practical reason most heavy-wall (>50 mm) work moves to Co-60 or X-ray crawlers — exposure times for Ir-192 become prohibitive past 60 mm steel.',
    },
  ],
  citations: [
    { id: 'astm-e94', source: 'ASTM E94/E94M-17 Standard Guide for Radiographic Examination' },
    { id: 'asme-v-art-2', source: 'ASME BPVC Section V (2023), Article 2 Radiographic Examination' },
    { id: 'asnt-snt-tc-1a', source: 'ASNT SNT-TC-1A (2020), Personnel Qualification — Radiographic Testing' },
    { id: 'astm-e1025', source: 'ASTM E1025-18 Standard Practice for Design, Manufacture, and Material Grouping Classification of Hole-Type IQIs' },
  ],
};

export default tool;
