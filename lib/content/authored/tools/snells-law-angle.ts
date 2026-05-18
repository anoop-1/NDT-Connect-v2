import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'snells-law-angle',
  name: "Snell's Law Refracted Angle Calculator",
  category: 'ut',
  inputs: [
    { id: 'theta1', label: 'Incident angle (in wedge)', unit: '°', type: 'number' },
    { id: 'v1', label: 'Velocity in wedge', unit: 'm/s', type: 'number' },
    { id: 'v2', label: 'Velocity in test piece', unit: 'm/s', type: 'number' },
  ],
  outputs: [
    { id: 'theta2', label: 'Refracted angle in test piece', unit: '°' },
    { id: 'criticalAngle', label: 'First critical angle', unit: '°' },
  ],
  metaTitle: "Snell's Law Calculator | UT Refracted Angle in Steel",
  metaDescription:
    "Compute the refracted shear-wave angle in steel from a wedge incidence angle using Snell's Law. Verifies probe wedge selection per ASME V Art. 4.",
  heroLede:
    "Pick a wedge, pick a material, and this tool tells you whether the shear wave inside the test piece actually arrives at the 45°, 60°, or 70° you wrote on the procedure. Snell's Law — sin(θ₁)/v₁ = sin(θ₂)/v₂ — governs the refraction at the wedge/steel interface, and a 2-degree drift on a worn wedge is enough to throw a beam path calculation off by 8% at half-skip on a 25 mm wall.",
  howItWorks:
    "Two velocities are at play: the longitudinal velocity in the plastic wedge (typically 2,330–2,730 m/s for Rexolite or acrylic) and the shear velocity in the test piece (3,240 m/s for steel, 3,130 m/s for aluminum). The probe element fires a longitudinal wave; the wedge angle is cut so that when the wave hits the wedge/steel interface, refraction produces the desired shear angle. The first critical angle is where θ₂ would equal 90° — beyond it, no longitudinal wave enters the steel. The second critical angle is where the shear wave would itself refract to 90°.",
  formula: 'sin(θ₁) / v₁ = sin(θ₂) / v₂',
  workedExample: {
    inputs: { theta1: 36.2, v1: 2330, v2: 3240 },
    outputs: { theta2: '60.0', criticalAngle: '46.0' },
    explanation:
      'Standard 60-degree shear wedge for carbon steel: Rexolite wedge (v₁ = 2,330 m/s longitudinal), test piece is steel with shear velocity 3,240 m/s. Cutting the wedge at 36.2° incidence gives sin(36.2°)/2330 = sin(θ₂)/3240 → θ₂ = arcsin(0.821) = 60.0°. The first critical angle (where the longitudinal wave grazes the surface) is 27.4°; the second critical angle is 56.5° for the steel longitudinal mode.',
  },
  whenToUse:
    'Use when validating a probe wedge against a material whose velocity differs from steel (aluminum, brass, austenitic stainless), specifying a custom angle for tight geometry, or troubleshooting a procedure where the actual beam angle does not match what the procedure says.',
  limitations: [
    'Assumes the wedge contact face and test surface are flat and parallel. Curved surfaces (small pipe ODs) shift the effective angle.',
    'Worn wedges drift — a 0.5 mm wear on a 60° wedge changes refracted angle by ~1°.',
    'Mode-converted longitudinal energy is ignored. Below the first critical angle both modes exist; the tool only reports the shear refraction.',
    'Velocity is temperature-dependent — verify on a heated calibration block above 80 °C.',
    'For austenitic welds the shear velocity varies with grain orientation and Snell\'s Law gives only an approximation.',
  ],
  relatedTools: [
    { slug: 'ut-thickness', name: 'UT Thickness Calculator' },
    { slug: 'skip-distance', name: 'Skip & Half-Skip Distance' },
    { slug: 'probe-angle-selector', name: 'Probe Angle Selector' },
    { slug: 'six-db-drop-sizing', name: '6 dB Drop Defect Sizing' },
  ],
  faqs: [
    {
      q: 'Why do most UT shear-wave probes come in 45°, 60°, and 70°?',
      a: 'These angles bracket the working range for steel. Above the first critical angle (~27.4° for a Rexolite-to-steel interface) only the shear wave enters the test piece, eliminating ambiguous longitudinal echoes. Below the second critical angle (~56.5°) only one shear mode exists. 45/60/70 split that window into reasonable steps: 45° for thick sections and back-wall corner reflectors, 60° for general weld scanning, 70° for thin-section lack-of-fusion and toe-of-weld inspection.',
    },
    {
      q: 'How does an austenitic stainless weld change the calculation?',
      a: 'Type 308/316 weld metal solidifies in columnar grains that align roughly with the weld axis. Shear-wave velocity becomes anisotropic — varying by ±15% with direction — so applying a single isotropic velocity in Snell\'s Law produces only an approximate refracted angle. ASME V Article 4 mandates that procedures for austenitic welds use a TOFD or phased-array technique with ray-traced beam paths rather than rely on a fixed wedge angle.',
    },
    {
      q: 'What is the first critical angle and why does it matter?',
      a: 'The first critical angle is the wedge incidence angle at which the longitudinal wave in the test piece refracts to 90° — i.e. travels along the surface as a creeping wave. For a Rexolite-to-steel interface this is about 27.4°. Below it, both longitudinal and shear waves enter the steel and the A-scan shows two parallel indication trains. Above it, only the shear wave propagates inside the steel, which is why almost all angle-beam shear inspections specify an incidence angle larger than 30°.',
    },
    {
      q: 'Can I use the same wedge on aluminum and steel?',
      a: "No. Aluminum has a shear velocity of 3,130 m/s versus 3,240 m/s in steel. A wedge cut for 60° in steel produces approximately 57.5° in aluminum — close, but enough to put the beam centre on the opposite weld toe at half-skip on a 25 mm plate. Procedure-grade work requires a wedge cut to the alloy under test, or a phased-array probe where the angle is steered electronically and Snell's Law is applied per element ray.",
    },
  ],
  citations: [
    { id: 'asme-v-art-4', source: 'ASME BPVC Section V (2023), Article 4 Ultrasonic Examination of Welds' },
    { id: 'astm-e2700', source: 'ASTM E2700-19 Standard Practice for Contact Ultrasonic Testing of Welds Using Phased Arrays' },
    { id: 'iso-22825', source: 'ISO 22825:2017 Non-destructive testing of welds — Ultrasonic testing of welds in austenitic steels and nickel-based alloys' },
    { id: 'astm-e494', source: 'ASTM E494-20 Standard Practice for Measuring Ultrasonic Velocity in Materials' },
  ],
};

export default tool;
