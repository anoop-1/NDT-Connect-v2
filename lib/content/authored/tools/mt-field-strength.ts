import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'mt-field-strength',
  name: 'MT Field Strength Calculator',
  category: 'mt',
  inputs: [
    { id: 'mode', label: 'Magnetization mode', type: 'select' },
    { id: 'turns', label: 'Number of turns (N)', type: 'number' },
    { id: 'current', label: 'Current (I)', unit: 'A', type: 'number' },
    { id: 'length', label: 'Coil length / part length', unit: 'mm', type: 'number' },
  ],
  outputs: [
    { id: 'field_oe', label: 'Field strength', unit: 'Oe' },
    { id: 'field_AmpPerM', label: 'Field strength', unit: 'A/m' },
  ],
  metaTitle: 'MT Magnetic Field Strength Calculator | Solenoid Coil',
  metaDescription:
    'Compute applied magnetic field for MT inspection per ASTM E1444 §7. Solenoid coil amp-turns and field strength for yokes per ASME V Art. 7.',
  heroLede:
    'Magnetic particle inspection works only when the applied field is strong enough to magnetize the part to about 80% of saturation. ASTM E1444 §7.5 gives the rule of thumb: for a solenoid coil running through a long part, H = NI / L (amp-turns per coil length). For a yoke, field strength is verified by the 10 lb / 40 lb lift test. This tool runs the coil calculation and confirms yoke compliance.',
  howItWorks:
    'Inside a long solenoid the H-field on axis is N × I / L where N is turns, I is current in amperes, and L is solenoid length in metres. The result is in A/m. Convert to oersteds (the unit MT procedures still use) via 1 Oe = 79.58 A/m. ASME V Art. 7 §T-753 requires 40 to 120 Oe (3,200 to 9,600 A/m) on the surface of a ferromagnetic part for indications to form reliably with wet fluorescent particles. The yoke alternative is empirical: 4.5 kg (10 lb) AC yoke lift, 18 kg (40 lb) DC yoke lift, verified daily per ASTM E1444 §7.4.4.',
  formula: 'H = N × I / L  (solenoid, A/m) ;  1 Oe = 79.58 A/m',
  workedExample: {
    inputs: { mode: 'Solenoid coil', turns: 5, current: 1200, length: 300 },
    outputs: { field_oe: '251', field_AmpPerM: '20,000' },
    explanation:
      '5-turn coil, 1,200 A through-current, 300 mm part length inside the coil. H = (5 × 1200) / 0.300 = 20,000 A/m = 251 Oe. That exceeds the 40–120 Oe specification of ASME V Art. 7, which means the coil setting needs to come down — typically by reducing current to 600 A, yielding 126 Oe. Most field setups run the calculation backward: target 100 Oe → I = (target × L) / N = (100 × 79.58 × 0.300) / 5 = 478 A.',
  },
  whenToUse:
    'Use when setting up a coil-shot MT procedure, verifying that a recurring inspection setup still meets ASTM E1444 §7.5 amp-turn requirements, or auditing a vendor procedure against ASME V Art. 7 amp-turn limits.',
  limitations: [
    'H = NI/L holds inside an infinite solenoid. For real coils, the field at the centre is 60–80% of the infinite-solenoid value depending on length-to-diameter ratio.',
    'For parts shorter than the coil, multiply by an L/D shape factor per ASTM E1444 §A1.1.',
    'Yoke lift-test is empirical — the actual field at the test surface is not measured, only the pole-piece pull.',
    'Residual field measurement after demag requires a Hall-effect gauge; this tool does not size demagnetization current.',
    'AC and HWDC currents produce different penetration depths; this calculation gives the surface field magnitude only.',
  ],
  relatedTools: [
    { slug: 'pt-dwell-time', name: 'PT Dwell Time' },
    { slug: 'cal-block-selector', name: 'Cal Block Selector' },
    { slug: 'ndt-method-selector', name: 'NDT Method Selector' },
    { slug: 'ndt-procedure-checklist', name: 'NDT Procedure Checklist' },
  ],
  faqs: [
    {
      q: 'What is the difference between amp-turns and field strength?',
      a: 'Amp-turns (N·I) is the magnetomotive force — the input driving the field. Field strength H is the resulting magnetic field intensity at the part surface, in A/m or oersteds. ASTM E1444 §7.5.1.1 specifies coil amp-turns: 30,000 to 50,000 AT for low fill-factor parts. ASME V Art. 7 §T-753 specifies field strength: 40–120 Oe measured with a Hall gauge. Both target the same outcome; the amp-turn rule lets you set up without a gauge on hand.',
    },
    {
      q: 'How do I verify field strength without a gauge?',
      a: 'Two field-accepted alternatives. (1) Magnetic particle field indicator (pie gauge, ASTM E1444 §A1.3) — a notched ferrous disk that shows particle build-up patterns when the field is adequate at the indicator location. (2) Yoke lift test — the yoke must lift 10 lb (4.5 kg) on AC, 40 lb (18 kg) on DC, verified at start of shift. Neither alternative replaces a calibrated Hall-effect gauge for procedure qualification, but both are accepted for routine production work.',
    },
    {
      q: 'What field strength is correct for crack detection?',
      a: 'ASME V Art. 7 §T-753 sets 30 to 60 G (3 to 6 mT) tangential at the surface. Below 30 G, sub-surface and tight cracks miss formation. Above 60 G the field saturates surface features and produces wide, hazy indications that obscure small cracks. Typical wet fluorescent particle work targets 40–50 G, which is the central two-thirds of the working window and gives consistent results across operators.',
    },
    {
      q: 'Why do procedures still use oersteds instead of A/m?',
      a: 'Historical inertia. The SI unit A/m replaced oersteds in 1948 (CGS to SI) but MT instrumentation, ASNT training materials, and most field-use Hall gauges (e.g. Magnaflux Type 1000) still display Oe. ASME V Art. 7 lists both. ASTM E1444 §3.2.9 defines the conversion: 1 Oe = 79.58 A/m. Site documentation should record whichever unit the gauge reads, with the conversion attached.',
    },
  ],
  citations: [
    { id: 'astm-e1444', source: 'ASTM E1444/E1444M-22 Standard Practice for Magnetic Particle Testing' },
    { id: 'asme-v-art-7', source: 'ASME BPVC Section V (2023), Article 7 Magnetic Particle Examination' },
    { id: 'astm-e709', source: 'ASTM E709-21 Standard Guide for Magnetic Particle Testing' },
    { id: 'asnt-snt-tc-1a', source: 'ASNT SNT-TC-1A (2020), Personnel Qualification — Magnetic Particle Testing' },
  ],
};

export default tool;
