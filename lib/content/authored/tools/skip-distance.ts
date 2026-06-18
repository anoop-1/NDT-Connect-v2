import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'skip-distance',
  name: 'UT Skip Distance Calculator (Angle Beam)',
  category: 'ut',
  inputs: [
    { id: 'thickness', label: 'Wall thickness (T)', unit: 'mm', type: 'number' },
    { id: 'angle', label: 'Refracted shear angle (θ)', unit: '°', type: 'number' },
  ],
  outputs: [
    { id: 'half_skip', label: 'Half-skip surface distance', unit: 'mm' },
    { id: 'full_skip', label: 'Full-skip surface distance', unit: 'mm' },
    { id: 'half_path', label: 'Half-skip beam path (½V)', unit: 'mm' },
    { id: 'full_path', label: 'Full-skip beam path (full V)', unit: 'mm' },
  ],
  metaTitle: 'UT Skip Distance Calculator | Angle-Beam ½V & Full-V (2T·tanθ)',
  metaDescription:
    'Calculate ultrasonic angle-beam skip distance and beam path for weld inspection — half-skip and full-skip surface distance and sound path from wall thickness and refracted angle.',
  heroLede:
    'Angle-beam weld scanning lives and dies by probe placement. The skip distance tells you exactly how far back from the weld toe to start, where the half-node and full-node fall, and how long the sound path is at each — so you cover the full weld volume (root to cap) without missing the fusion faces. Get it wrong and you scan air or miss the root.',
  howItWorks:
    'A shear beam refracted at angle θ travels down to the back wall and reflects up to the surface. The horizontal surface distance to the first back-wall bounce (the half-skip, ½V or node) is T·tan θ; the full skip (the beam returns to the surface, full-V) is 2·T·tan θ. The corresponding sound (beam) path lengths are T/cos θ to the half-node and 2T/cos θ to the full node. Scanning between ½ and full skip interrogates the upper and lower halves of the weld respectively.',
  formula: 'Half-skip = T·tanθ ;  Full-skip = 2·T·tanθ ;  ½V path = T/cosθ ;  full-V path = 2T/cosθ',
  workedExample: {
    inputs: { thickness: 20, angle: 60 },
    outputs: { half_skip: '34.6', full_skip: '69.3', half_path: '40.0', full_path: '80.0' },
    explanation:
      'A 20 mm wall with a 60° probe: half-skip = 20·tan60° = 34.6 mm, full skip = 69.3 mm. The ½V beam path is 20/cos60° = 40 mm, full-V is 80 mm. To inspect the root, place the index point about one half-skip (≈35 mm) from the weld centreline so the beam hits the root at the first leg; move in toward the weld to raise the beam up the fusion face.',
  },
  whenToUse:
    'Use to plan angle-beam scan offsets for weld inspection, set the scanning band (½ to full skip) for root and cap coverage, convert a screen-range reading to surface position, or train technicians on node placement.',
  limitations: [
    'Refracted angle changes with temperature and material — verify on a calibration block of the same material; austenitic stainless skews the angle.',
    'Uses the nominal refracted angle; wedge wear and couplant shift it. Re-verify angle periodically.',
    'Surface distance is from the probe index (exit) point, not the front of the wedge — measure from the index point.',
    'Assumes a flat plate; curved surfaces (pipe) need a curvature correction.',
  ],
  relatedTools: [
    { slug: 'snells-law-angle', name: "Snell's Law Angle" },
    { slug: 'ut-beam-divergence', name: 'UT Beam Divergence' },
    { slug: 'dac-tcg', name: 'DAC / TCG Builder' },
    { slug: 'ut-thickness', name: 'UT Thickness' },
  ],
  faqs: [
    {
      q: 'What is the difference between half-skip and full-skip?',
      a: 'Half-skip (½V) is the beam path from the probe down to the first back-wall reflection — it interrogates the lower portion of the weld and the root. Full-skip (full-V) is after the beam bounces back up to the surface — it covers the upper portion and cap. Scanning the band from ½ to full skip, moving the probe toward and away from the weld, sweeps the beam through the entire fusion face from root to cap.',
    },
    {
      q: 'Why use a 60° probe versus 45° or 70°?',
      a: '45° gives short skips and is good for thick sections and corner reflectors; 70° gives long skips and shallow beam paths, ideal for thin wall and detecting surface-breaking cracks. 60° is the common all-round choice for weld inspection. The skip distance scales with tan θ, so a 70° probe nearly triples the skip of a 45° at the same thickness — plan bench space accordingly.',
    },
    {
      q: 'Do I measure skip distance from the front of the probe?',
      a: 'No — measure from the beam index (exit) point, the spot on the wedge where the beam leaves into the part. It is marked on the wedge and verified on an IIW block. Measuring from the front face of the housing introduces a fixed error equal to the index-point offset, which matters most on thin wall where skips are short.',
    },
  ],
  citations: [
    { id: 'asme-v-art4', source: 'ASME BPVC Section V, Article 4 — Ultrasonic Examination of Welds (angle-beam technique).' },
    { id: 'aws-d1-1', source: 'AWS D1.1 Structural Welding Code — Steel, UT provisions.' },
    { id: 'iso-17640', source: 'ISO 17640 — Non-destructive testing of welds — Ultrasonic testing.' },
  ],
};

export default tool;
