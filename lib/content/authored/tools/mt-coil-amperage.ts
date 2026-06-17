import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'mt-coil-amperage',
  name: 'MT Coil Amperage (Ampere-Turns) Calculator',
  category: 'mt',
  inputs: [
    { id: 'length', label: 'Part length (L)', unit: 'mm', type: 'number' },
    { id: 'diameter', label: 'Part diameter (D)', unit: 'mm', type: 'number' },
    { id: 'turns', label: 'Coil turns (N)', type: 'number' },
    { id: 'fill', label: 'Fill factor', type: 'select' },
  ],
  outputs: [
    { id: 'ampere_turns', label: 'Required ampere-turns (NI)', unit: 'A·turns' },
    { id: 'current', label: 'Required current (I)', unit: 'A' },
  ],
  metaTitle: 'MT Coil Amperage Calculator | Ampere-Turns per ASTM E1444',
  metaDescription:
    'Calculate magnetic particle coil ampere-turns and current for longitudinal magnetization per ASTM E1444 / E1444M — low-fill and high-fill (cable-wrap) formulas.',
  heroLede:
    'Longitudinal magnetic particle inspection energises a part inside a coil; the field strength depends on ampere-turns (current × number of turns), the part L/D ratio, and how much of the coil opening the part fills. Guess low and you miss subsurface indications; guess high and you bake on furring or struggle to demagnetise. ASTM E1444 gives the formulas — this tool applies them and flags the valid L/D window.',
  howItWorks:
    'For longitudinal magnetization in a coil, ASTM E1444 sets ampere-turns by the part length-to-diameter ratio (L/D) and the fill factor. Low fill (part cross-section < 10% of the coil opening, part against the inside wall): NI = 45000 / (L/D). High fill (cable wrapped on the part, or part area ≥ 10% of coil): NI = 35000 / ((L/D) + 2). Required current I = NI / N. The formulas are valid for L/D from 2 to 15; outside that, subdivide long parts or use a central conductor.',
  formula: 'Low fill:  NI = 45000 / (L/D)   |   High fill:  NI = 35000 / ((L/D)+2)   |   I = NI / N',
  workedExample: {
    inputs: { length: 300, diameter: 50, turns: 5, fill: 'Low fill (part < 10% of coil)' },
    outputs: { ampere_turns: '7500', current: '1500' },
    explanation:
      'A 300 mm × 50 mm shaft, L/D = 6, in a 5-turn coil at low fill: NI = 45000 / 6 = 7500 ampere-turns. Current I = 7500 / 5 = 1500 A. Verify field adequacy with a pie gauge or Hall probe and a known-defect standard; the formula is a starting point, not a substitute for verification.',
  },
  whenToUse:
    'Use when setting up coil-shot longitudinal MT, writing an MT technique sheet, or troubleshooting weak indications on long parts. Pair with a field-indicator (pie gauge / QQI) for verification.',
  limitations: [
    'Valid only for L/D between 2 and 15. For L/D < 2, effective L/D is taken as 2; long parts must be inspected in sections.',
    'Formulas are empirical (ASTM E1444) — always verify actual field with a Hall-effect gauge or artificial-flaw shim.',
    'Hollow parts: use the part wall, and consider a central conductor instead of a coil.',
    'Assumes the part is within ~6 in (150 mm) of the coil inside wall (low fill) or wrapped (high fill).',
  ],
  relatedTools: [
    { slug: 'mt-field-strength', name: 'MT Field Strength' },
    { slug: 'pt-dwell-time', name: 'PT Dwell Time' },
  ],
  faqs: [
    {
      q: 'What is the difference between low-fill and high-fill ampere-turns?',
      a: 'Fill factor is the ratio of part cross-sectional area to the coil opening area. Low fill (part < 10% of the opening, lying against the coil wall) uses NI = 45000/(L/D). High fill (part ≥ 10%, or a flexible cable wrapped directly on the part) couples the field far more efficiently and uses NI = 35000/((L/D)+2), which generally calls for fewer ampere-turns. Picking the wrong formula can over- or under-magnetise by a factor of two.',
    },
    {
      q: 'Why does the L/D ratio matter so much?',
      a: 'A long, slender part (high L/D) concentrates the longitudinal field and needs fewer ampere-turns; a short, stubby part (low L/D) has strong demagnetising fields at its ends and needs more. Below L/D = 2 the part is too short for reliable coil magnetization — you either add pole pieces to extend it or switch technique. The formulas explicitly break down outside L/D 2–15.',
    },
    {
      q: 'Do I still need a field indicator if I use the formula?',
      a: 'Yes. ASTM E1444 and E709 require verification of adequate field strength and direction with a tool such as a pie gauge, QQI/shim, or Hall-effect gaussmeter. The ampere-turns formula sets the machine; the indicator proves the field actually reached the surface where flaws would be. Code audits look for the verification record, not just the calculation.',
    },
  ],
  citations: [
    { id: 'astm-e1444', source: 'ASTM E1444 / E1444M — Standard Practice for Magnetic Particle Testing (coil ampere-turn formulas).' },
    { id: 'astm-e709', source: 'ASTM E709 — Standard Guide for Magnetic Particle Testing.' },
    { id: 'asme-v-art7', source: 'ASME BPVC Section V, Article 7 — Magnetic Particle Examination.' },
  ],
};

export default tool;
