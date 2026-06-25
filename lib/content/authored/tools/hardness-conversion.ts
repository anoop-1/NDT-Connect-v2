import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'hardness-conversion',
  name: 'Hardness Conversion Calculator (HB / HRC / HRB / HV)',
  category: 'general',
  inputs: [
    { id: 'scale', label: 'Input hardness scale', type: 'select' },
    { id: 'value', label: 'Hardness value', type: 'number' },
  ],
  outputs: [
    { id: 'hb', label: 'Brinell (HB)', unit: '' },
    { id: 'hv', label: 'Vickers (HV)', unit: '' },
    { id: 'hrc', label: 'Rockwell C (HRC)', unit: '' },
    { id: 'hrb', label: 'Rockwell B (HRB)', unit: '' },
    { id: 'tensile', label: 'Approx. tensile strength', unit: 'MPa' },
  ],
  metaTitle: 'Hardness Conversion Calculator | Brinell, Rockwell, Vickers (ASTM E140)',
  metaDescription:
    'Convert between Brinell (HB), Rockwell C (HRC), Rockwell B (HRB) and Vickers (HV) hardness, with approximate tensile strength, for steel. Based on ASTM E140 conversion tables.',
  heroLede:
    'A material test report quotes Brinell, the drawing calls out Rockwell C, and the inspector\'s portable tester reads Vickers — and somebody has to reconcile the three. Hardness conversion between scales is only ever approximate (each scale indents differently), but ASTM E140 publishes the accepted tables for steel. This tool converts between HB, HRC, HRB and HV and gives the rough tensile-strength equivalent for a quick sanity check.',
  howItWorks:
    'Hardness scales measure resistance to indentation but with different indenters and loads, so there is no exact physics conversion — the relationships are empirical. ASTM E140 tabulates corresponding values for non-austenitic steels from extensive testing. This tool interpolates those published correspondences: enter a value on one scale and it returns the equivalent on the others, plus the approximate tensile strength (for steel, tensile in MPa ≈ 3.4 × HB within the common range).',
  formula: 'Empirical correspondence per ASTM E140 (steel); approximate tensile (MPa) ≈ 3.4 × HB',
  workedExample: {
    inputs: { scale: 'HRC', value: 40 },
    outputs: { hb: '375', hv: '392', hrc: '40', hrb: '—', tensile: '1280' },
    explanation:
      '40 HRC corresponds to about 375 HB and 392 HV per ASTM E140 for steel. HRB is not meaningful at this hardness (the B scale tops out around 100 HRB ≈ 240 HB), so it is not reported. Approximate tensile strength ≈ 3.4 × 375 ≈ 1275 MPa, consistent with a quenched-and-tempered alloy steel.',
  },
  whenToUse:
    'Use when a material certificate, drawing, procedure and field tester report hardness on different scales and you need to confirm they agree — or to estimate tensile strength from a hardness reading during a positive-material-identification or weld-procedure review.',
  limitations: [
    'Conversions are approximate and valid for non-austenitic steels (carbon, low-alloy, tool steels) per ASTM E140 — they do not apply to austenitic stainless, aluminium, copper, or cemented carbides.',
    'Each scale has a valid range: HRB roughly 0–100 (soft to medium), HRC roughly 20–68 (medium to very hard). Converting outside a scale\'s range is meaningless.',
    'Tensile-from-hardness is an estimate only and must never replace a tensile test for certification.',
    'Surface condition, work hardening, and thin or curved parts can shift readings significantly.',
    'For welds, hardness limits (e.g. NACE MR0175 / ISO 15156 sour-service caps at 22 HRC) require an actual qualified test, not a conversion.',
  ],
  relatedTools: [
    { slug: 'weld-metal-weight', name: 'Weld Metal Weight & Filler' },
    { slug: 'corrosion-rate-remaining-life', name: 'Corrosion Rate & Remaining Life' },
  ],
  faqs: [
    { q: 'Is hardness conversion exact?', a: 'No. Different hardness scales use different indenters and loads, so there is no exact physical conversion between them. The conversions in ASTM E140 are empirical correspondences derived from testing many steel specimens, and they carry an inherent uncertainty of a few points. For critical acceptance, test on the scale the specification actually calls out.' },
    { q: 'Can I convert hardness to tensile strength?', a: 'For steel, an approximate rule is tensile strength (MPa) ≈ 3.4 × Brinell hardness (HB) in the common engineering range. This is useful for a quick sanity check or estimate, but it is not a substitute for an actual tensile test when a certificate or code requires verified strength.' },
    { q: 'Why can\'t I convert Rockwell B to Rockwell C for soft steel?', a: 'The scales overlap only narrowly. Rockwell B (1/16 in ball, 100 kgf) is for softer materials up to about 100 HRB (≈ 240 HB), while Rockwell C (diamond cone, 150 kgf) is for harder materials above about 20 HRC (≈ 240 HB). Below ~20 HRC the C-scale indenter barely penetrates, so HRC is not reported and you stay on the B scale.' },
    { q: 'Do these conversions work for stainless steel or aluminium?', a: 'No. ASTM E140 has separate conversion tables for austenitic stainless steels, nickel alloys, and other materials because they indent differently from carbon and low-alloy steel. Using the steel table on stainless or aluminium gives wrong answers — use the material-specific table.' },
    { q: 'What hardness is required for sour service?', a: 'NACE MR0175 / ISO 15156 limits carbon and low-alloy steels to 22 HRC maximum (about 250 HB) for resistance to sulfide stress cracking in H₂S service, with tighter limits for welds and HAZ. That limit must be verified by an actual qualified hardness test, not estimated by conversion.' },
  ],
  citations: [
    { id: 'astm-e140', source: 'ASTM E140 — Standard Hardness Conversion Tables for Metals (Brinell, Rockwell, Vickers, Knoop, Scleroscope)' },
    { id: 'astm-a370', source: 'ASTM A370 — Standard Test Methods and Definitions for Mechanical Testing of Steel Products' },
    { id: 'nace-mr0175', source: 'NACE MR0175 / ISO 15156 — Petroleum and natural gas industries — Materials for use in H2S-containing environments' },
  ],
};

export default tool;
