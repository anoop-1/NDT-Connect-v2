import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'rt-geometric-unsharpness',
  name: 'RT Geometric Unsharpness Calculator',
  category: 'rt',
  inputs: [
    { id: 'focalSpot', label: 'Source / focal-spot size (F)', unit: 'mm', type: 'number' },
    { id: 'sod', label: 'Source-to-object distance (SOD)', unit: 'mm', type: 'number' },
    { id: 'ofd', label: 'Object-to-film distance (OFD)', unit: 'mm', type: 'number' },
  ],
  outputs: [
    { id: 'ug_mm', label: 'Geometric unsharpness (Ug)', unit: 'mm' },
  ],
  metaTitle: 'RT Geometric Unsharpness Calculator | Ug = F·OFD/SOD (ASME V)',
  metaDescription:
    'Calculate radiographic geometric unsharpness from focal-spot size, source-to-object, and object-to-film distance. Check Ug against ASME V / ASTM E1742 limits.',
  heroLede:
    'Geometric unsharpness (Ug) is the blur at the edge of a radiographic image caused by the source having a finite size rather than being a perfect point. It is the single geometry number most likely to fail a film-technique review: ASME Section V sets hard Ug limits by material thickness, and exceeding them means re-shooting. This tool computes Ug from your shot geometry so you can fix it before exposing.',
  howItWorks:
    'A finite focal spot of size F casts a penumbra. By similar triangles, the blur projected at the film is Ug = F × (OFD / SOD), where SOD is source-to-object distance and OFD is object-to-film distance. Increasing SOD (moving the source back) shrinks Ug; increasing OFD (object lifted off the film) grows it. The classic fix for a failing Ug is a longer source-to-film distance.',
  formula: 'Ug = F × OFD / SOD',
  workedExample: {
    inputs: { focalSpot: 3, sod: 600, ofd: 25 },
    outputs: { ug_mm: '0.125' },
    explanation:
      'A 3 mm focal spot, 600 mm source-to-object, 25 mm object-to-film: Ug = 3 × 25 / 600 = 0.125 mm. For material under 50 mm thick, ASME V Article 2 allows Ug ≤ 0.51 mm — so this geometry passes comfortably. If SOD were halved to 300 mm, Ug doubles to 0.25 mm (still passing, but with less margin).',
  },
  whenToUse:
    'Use during shot planning to set source-to-film distance, when a technique sheet is challenged in review, or to diagnose why an exposed film looks blurred at defect edges.',
  limitations: [
    'Accounts only for geometric (penumbra) blur — not film/detector inherent unsharpness or screen/scatter blur. Total unsharpness combines these in quadrature.',
    'Assumes the object surface of interest is at the stated OFD; thick parts have a range of OFD across the wall.',
    'F is the effective focal-spot/source size from the certificate, not the housing size.',
    'ASME V Ug limits are thickness-banded — check the exact band for your material thickness.',
  ],
  relatedTools: [
    { slug: 'rt-exposure-time', name: 'RT Exposure Time' },
    { slug: 'half-value-layer', name: 'Half-Value Layer' },
    { slug: 'source-decay', name: 'Source Activity Decay' },
  ],
  faqs: [
    {
      q: 'What are the ASME Section V geometric unsharpness limits?',
      a: 'ASME BPVC Section V, Article 2 bands Ug by material thickness: under 2 in (50 mm) → Ug ≤ 0.020 in (0.51 mm); 2 to 3 in → 0.030 in (0.76 mm); 3 to 4 in → 0.040 in (1.0 mm); over 4 in → 0.070 in (1.78 mm). Many fabrication specs are stricter, so always check the governing code and the client spec together.',
    },
    {
      q: 'How do I reduce geometric unsharpness?',
      a: 'The most effective lever is increasing source-to-object distance (SOD) — Ug is inversely proportional to it. Placing the object as close to the film as possible (minimising OFD) also helps, as does using a smaller focal spot. The trade-off: a longer SOD increases exposure time because intensity falls with the inverse square of distance.',
    },
    {
      q: 'Is geometric unsharpness the same as total unsharpness?',
      a: 'No. Total image unsharpness Ut combines geometric unsharpness Ug with inherent (film/detector) unsharpness Ui, roughly as Ut = (Ug^n + Ui^n)^(1/n) with n≈2. Ug is the part you control through shot geometry; Ui is fixed by the film class or detector. Codes set the Ug limit because it is the operator-controllable term.',
    },
  ],
  citations: [
    { id: 'asme-v-art2', source: 'ASME BPVC Section V, Article 2 — Radiographic Examination (geometric unsharpness limits).' },
    { id: 'astm-e1742', source: 'ASTM E1742 / E1742M — Standard Practice for Radiographic Examination.' },
    { id: 'astm-e94', source: 'ASTM E94 / E94M — Standard Guide for Radiographic Examination Using Industrial Radiographic Film.' },
  ],
};

export default tool;
