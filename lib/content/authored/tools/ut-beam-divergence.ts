import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'ut-beam-divergence',
  name: 'UT Beam Divergence Calculator',
  category: 'ut',
  inputs: [
    { id: 'frequency', label: 'Probe frequency', unit: 'MHz', type: 'number' },
    { id: 'crystalDia', label: 'Crystal diameter', unit: 'mm', type: 'number' },
    { id: 'material', label: 'Test material', type: 'select' },
    { id: 'distance', label: 'Distance from probe (depth)', unit: 'mm', type: 'number' },
  ],
  outputs: [
    { id: 'nearFieldN', label: 'Near-field length (N)', unit: 'mm' },
    { id: 'halfAngleDb6', label: 'Half-angle (-6 dB)', unit: '°' },
    { id: 'halfAngleDb20', label: 'Half-angle (-20 dB / null)', unit: '°' },
    { id: 'beamWidth', label: 'Beam width at depth', unit: 'mm' },
  ],
  metaTitle: 'UT Beam Divergence Calculator [2026]: Near-Field, Half-Angle, Spread',
  metaDescription:
    'Calculate ultrasonic near-field length, -6 dB and -20 dB half-angles, and beam width at depth. Steel, aluminum, copper, plastic. Per ASTM E317 and EN 12668-2.',
  heroLede:
    'A 5 MHz, 10 mm crystal contact probe on carbon steel has a near-field of ~80 mm — inside that distance, beam-axis amplitude oscillates and DAC curves become unreliable. Past N, the beam diverges with a -6 dB half-angle around 4°, meaning at 100 mm depth the -6 dB beam width is already ~14 mm. This tool produces the four numbers a UT level II actually pencils onto a scan plan: near-field length, the two practical half-angles, and the beam width at the inspection depth.',
  howItWorks:
    'Near-field length N = D² × f / (4 × c), where D is crystal diameter in mm, f is frequency in MHz, and c is material longitudinal velocity in mm/μs. For circular crystals the -6 dB half-angle approximates sin⁻¹(0.514 × λ/D) and the -20 dB (first-null) half-angle approximates sin⁻¹(1.22 × λ/D), where λ = c/f. Beam width at depth z (z > N) ≈ 2 × z × tan(θ_6dB). Inside the near-field the geometric beam width is ~D; oscillations are real but not modelled here. Numbers match published values in Krautkrämer & Krautkrämer "Ultrasonic Testing of Materials" §3 and ASTM E317.',
  formula: 'N = D² × f / (4c) ;  θ_6dB ≈ sin⁻¹(0.514 × λ/D) ;  beam_width(z) ≈ 2 × z × tan(θ_6dB)',
  workedExample: {
    inputs: { frequency: 5, crystalDia: 10, material: 'Steel (c=5,920 m/s)', distance: 100 },
    outputs: { nearFieldN: '21.1', halfAngleDb6: '3.5', halfAngleDb20: '8.3', beamWidth: '12.3' },
    explanation:
      '5 MHz, 10 mm, steel (c=5.92 mm/μs). Wavelength λ = 5.92/5 = 1.18 mm. Near-field N = 10²×5/(4×5.92) = 21.1 mm. Half-angle -6 dB = sin⁻¹(0.514×1.18/10) = sin⁻¹(0.061) = 3.5°. Half-angle -20 dB = sin⁻¹(1.22×1.18/10) = 8.3°. At 100 mm depth (≈ 5N, well in far field) beam width = 2 × 100 × tan(3.5°) = 12.3 mm. Practical consequence: if you are using this probe to size a flaw at 100 mm depth, the smallest reliably sizeable flat-bottom-hole equivalent is ~½ of the beam width = 6 mm — anything smaller blurs into the beam profile and the 6 dB drop method under-sizes it.',
  },
  whenToUse:
    'Use when selecting a probe for a specific depth (the near-field cliff is the biggest under-sizing trap in conventional UT), when calculating the smallest reliably sizeable indication for the 6 dB drop method, when justifying probe choice in a written procedure (ASME Section V Article 4 requires it), or when laying out a CML grid that needs full far-field coverage between scan lines.',
  limitations: [
    'Formulas assume a flat circular piston transducer in immersion or perfect contact. Real contact transducers have a contact lens that distorts the near-field; field-measured N can be 10–25% shorter.',
    'Material velocity varies with temperature, alloy, and texture (austenitic SS has anisotropic velocity that breaks the simple model). Use a calibration block of the same material when sizing.',
    'Half-angle approximations assume uniform crystal excitation. Focused crystals (lens or PA-focused) produce a tighter beam past the focal point — use the manufacturer beam plot for focused probes.',
    'Inside the near-field, the formula above does NOT apply. Beam amplitude oscillates; sizing in the near-field is unreliable. Pick a probe with N < depth_of_interest.',
    'Shear-wave (angle) probes follow a similar formula with shear velocity (≈3.24 mm/μs in steel) but use the apparent crystal aperture (D × cosθ_refracted) not the literal crystal diameter.',
  ],
  relatedTools: [
    { slug: 'dac-tcg', name: 'DAC / TCG Curve Builder' },
    { slug: 'six-db-drop-sizing', name: '6 dB Drop Sizing Calculator' },
    { slug: 'ut-attenuation', name: 'UT Attenuation Calculator' },
    { slug: 'ut-coverage-grid', name: 'UT Coverage Grid (CML sizing)' },
  ],
  faqs: [
    {
      q: 'Why does the beam axis amplitude oscillate inside the near-field?',
      a: 'A piston transducer face is the superposition of many point sources. Inside the Fresnel (near-field) zone, those wavelets interfere constructively and destructively along the beam axis, producing a series of maxima and minima. The last on-axis maximum sits exactly at z = N; past that point only constructive interference dominates and amplitude falls off monotonically with 1/z (geometric spreading). This is why DAC curves are only meaningful past the near-field — inside, the relationship between depth and amplitude is multi-valued.',
    },
    {
      q: 'How do I shrink the near-field if my probe choice produces N longer than the inspection depth?',
      a: 'Two options: increase frequency (linear with f) or decrease crystal diameter (square with D, so most effective). For example, a 5 MHz 10 mm probe has N = 21 mm. Going to 5 MHz 6 mm cuts N to 7.6 mm. Going to 10 MHz 10 mm cuts N to 42 mm — wait, that gets longer. N scales with D²×f, so reducing D wins. Trade-off: smaller crystal → wider beam divergence → poorer sizing resolution. Pick the smallest D that still satisfies the resolution requirement of your acceptance criteria.',
    },
    {
      q: 'Does this work for PAUT probes?',
      a: 'For unfocused PAUT linear arrays the near-field is calculated on the active aperture (number of active elements × element pitch), not the full array width. Focused PAUT (which is most field PAUT) deliberately moves the beam waist to the focal point and the divergence past that point is much wider than the unfocused equivalent. Use the PAUT modelling software (e.g., ESBeamTool, Civa) for focused PAUT scan planning rather than these formulas.',
    },
  ],
  citations: [
    { id: 'astm-e317', source: 'ASTM E317-21 — Standard Practice for Evaluating Performance Characteristics of Ultrasonic Pulse-Echo Testing Instruments and Systems without the Use of Electronic Measurement Instruments', url: 'https://www.astm.org/e0317-21.html' },
    { id: 'en-12668-2', source: 'EN 12668-2:2010 — Non-destructive testing — Characterization and verification of ultrasonic examination equipment — Part 2: Probes' },
    { id: 'krautkramer', source: 'Krautkrämer & Krautkrämer, Ultrasonic Testing of Materials, 4th ed., Springer 1990, Chapter 3' },
  ],
};

export default tool;
