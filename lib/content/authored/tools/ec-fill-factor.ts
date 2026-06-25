import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'ec-fill-factor',
  name: 'Eddy Current Fill Factor Calculator',
  category: 'et',
  inputs: [
    { id: 'coil_d', label: 'Bobbin coil outer diameter', unit: 'mm', type: 'number' },
    { id: 'tube_id', label: 'Tube inner diameter', unit: 'mm', type: 'number' },
  ],
  outputs: [
    { id: 'fill_factor', label: 'Fill factor (η)', unit: '' },
    { id: 'fill_pct', label: 'Fill factor', unit: '%' },
  ],
  metaTitle: 'Eddy Current Fill Factor Calculator | Bobbin Probe Tube Inspection',
  metaDescription:
    'Calculate the eddy current fill factor for a bobbin probe in tube inspection — η = (coil diameter / tube ID)². Higher fill factor means better sensitivity. Per ASME V Article 8 / ASTM E690.',
  heroLede:
    'Fill factor is how snugly a bobbin coil fits inside the tube it is inspecting — and it is the single biggest control on eddy current sensitivity for tube testing. A loose probe (low fill factor) couples weakly to the tube wall and misses shallow defects; too tight and it jams or wears. This tool returns the fill factor from the coil and tube diameters so you can pick the right probe for a heat-exchanger or condenser tube bundle.',
  howItWorks:
    'In bobbin-coil tube inspection the fill factor is the ratio of the cross-sectional area of the coil to the cross-sectional area of the tube bore, which reduces to the square of the diameter ratio: η = (d_coil / D_tube_ID)². Because the magnetic coupling between coil and tube falls off with the gap, sensitivity rises sharply as the fill factor approaches 1. Practice keeps it high enough for sensitivity but below ~0.9 so the probe still passes freely through dents, deposits and ovality.',
  formula: 'η = (d_coil / D_tube_ID)²',
  workedExample: {
    inputs: { coil_d: 14.0, tube_id: 15.4 },
    outputs: { fill_factor: '0.826', fill_pct: '82.6' },
    explanation:
      'A 14.0 mm bobbin in a 19 mm OD tube with a 15.4 mm bore gives η = (14.0 / 15.4)² = 0.909² = 0.826, or 82.6%. That is in the typical good-practice band (0.7–0.85): tight enough for strong sensitivity to wall loss and pitting, loose enough to pass through ovality and light deposits without sticking.',
  },
  whenToUse:
    'Use when selecting a bobbin probe for heat-exchanger, condenser, feedwater-heater or boiler tube inspection — match the coil diameter to the as-built tube bore so the fill factor lands in the working band before you mobilise.',
  limitations: [
    'Fill factor only describes geometric coupling — it does not capture probe frequency, fill-factor noise, or the effect of support plates and tubesheets.',
    'Tube ID must be the actual bore (OD minus twice the wall), allowing for ovality and deposits that reduce clearance.',
    'Very high fill factor (>0.9) risks probe sticking, wear and false indications from minor geometry changes.',
    'Bobbin testing is limited for detecting circumferential cracks and defects near support plates — array or rotating probes may be needed.',
    'Ferromagnetic and partially ferromagnetic tubes (e.g. some stainless, Monel) need different techniques (RFT, NFT, MFL) where fill factor is defined differently.',
  ],
  relatedTools: [
    { slug: 'ec-skin-depth', name: 'EC Skin Depth' },
    { slug: 'ec-frequency', name: 'EC Test Frequency' },
    { slug: 'ut-thickness', name: 'UT Thickness' },
  ],
  faqs: [
    { q: 'What is a good eddy current fill factor?', a: 'For bobbin-coil tube inspection a fill factor of about 0.7 to 0.85 is the usual working band — high enough for strong sensitivity to wall loss and pitting, but loose enough that the probe passes freely through ovality, dents and light deposits. Values much above 0.9 risk the probe sticking or generating false indications.' },
    { q: 'Why does fill factor matter for sensitivity?', a: 'The eddy current coupling between the coil and the tube wall weakens as the air gap grows. A higher fill factor means a smaller gap and stronger coupling, so the same defect produces a larger signal. A loose probe (low fill factor) can miss shallow pitting and gradual wall loss entirely.' },
    { q: 'How do I calculate the tube inner diameter?', a: 'Tube ID equals the outer diameter minus twice the wall thickness. For a 19.05 mm (3/4 in) OD tube with a 1.65 mm wall, ID = 19.05 − 3.30 = 15.75 mm. Use the as-built dimensions and allow for ovality or deposits that reduce the effective bore.' },
    { q: 'Can fill factor be greater than 1?', a: 'No — a coil cannot be larger than the bore it fits inside, so the diameter ratio and therefore the fill factor are always less than 1. A computed value above 1 means the coil diameter or tube ID was entered incorrectly.' },
    { q: 'Does fill factor apply to rotating or array probes?', a: 'The (d/D)² fill-factor concept is specific to concentric bobbin coils. Rotating pancake and array probes use surface-riding coils where lift-off, not fill factor, is the governing coupling parameter, and they are chosen for crack detection and sizing that bobbin probes handle poorly.' },
  ],
  citations: [
    { id: 'asme-v-art8', source: 'ASME BPVC Section V, Article 8 — Eddy Current Examination of Tubular Products' },
    { id: 'astm-e690', source: 'ASTM E690 — Standard Practice for In Situ Electromagnetic (Eddy Current) Examination of Nonmagnetic Heat Exchanger Tubes' },
    { id: 'astm-e2096', source: 'ASTM E2096 — Standard Practice for In Situ Examination of Ferromagnetic Heat-Exchanger Tubes Using Remote Field Testing' },
  ],
};

export default tool;
