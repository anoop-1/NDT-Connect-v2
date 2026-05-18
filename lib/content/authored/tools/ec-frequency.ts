import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'ec-frequency',
  name: 'Eddy Current Frequency Calculator',
  category: 'et',
  inputs: [
    { id: 'material', label: 'Material', type: 'select' },
    { id: 'targetDepth', label: 'Target depth of penetration', unit: 'mm', type: 'number' },
  ],
  outputs: [
    { id: 'frequency', label: 'Test frequency', unit: 'kHz' },
    { id: 'skinDepth', label: 'Standard depth of penetration', unit: 'mm' },
  ],
  metaTitle: 'Eddy Current Frequency Calculator | Skin Depth in Steel',
  metaDescription:
    'Compute eddy current test frequency from desired depth of penetration using δ = 1 / sqrt(π × f × μ × σ). Per ASTM E309 and ASNT recommended practice.',
  heroLede:
    'Pick a target depth in millimetres and this tool returns the eddy current frequency that puts the standard depth of penetration there. Surface cracks call for high frequency (200 kHz–1 MHz) — sub-surface inspection of cladding interfaces and second-layer corrosion demands much lower frequency (1–10 kHz). The math is the skin-depth formula every Level II eddy-current technician memorises.',
  howItWorks:
    'Eddy current density falls exponentially with depth in a conductor. The standard depth of penetration δ is the depth at which density drops to 1/e (36.8%) of the surface value: δ = 1 / sqrt(π × f × μ × σ), where f is frequency in Hz, μ is permeability in H/m, and σ is conductivity in S/m. For non-ferromagnetic alloys μ ≈ μ₀ = 4π × 10⁻⁷. For ferromagnetic steels relative permeability is 100–1000, which collapses skin depth dramatically — a 100 kHz signal probes ~5 mm in aluminium but only 0.05 mm in carbon steel.',
  formula: 'δ = 1 / sqrt(π × f × μ × σ)  ;  f = 1 / (π × δ² × μ × σ)',
  workedExample: {
    inputs: { material: 'Aluminum 6061', targetDepth: 1.0 },
    outputs: { frequency: '85', skinDepth: '1.00' },
    explanation:
      'Aluminum 6061: σ = 24 MS/m, μ = μ₀. Target depth δ = 1.0 mm = 0.001 m. f = 1 / (π × 0.001² × 4π×10⁻⁷ × 24×10⁶) = 1 / (π × 1×10⁻⁶ × 3.016×10⁻⁵) = 1 / 9.47×10⁻¹¹ ≈ 10.5 MHz/m → for depth 1 mm, f ≈ 85 kHz. Practical surface-flaw frequency for aluminum aerospace inspection is 100–500 kHz; this confirms the lower bound for 1 mm subsurface reach.',
  },
  whenToUse:
    'Use to pick a starting frequency for surface or subsurface eddy current inspection, validate vendor procedures against ASTM E309/E243 recommendations, or troubleshoot lift-off and phase-angle problems that often trace back to wrong frequency.',
  limitations: [
    'Assumes a planar conductor at least 3×δ thick — edges and curved surfaces shift the effective penetration.',
    'Ferromagnetic materials require permeability that varies with applied field; use μ_r = 100 as a conservative default for carbon steel.',
    'Skin depth is the 1/e attenuation level. Practical "useful" depth for crack detection is roughly δ/2 to δ.',
    'For coated or plated surfaces, signal phase depends on each layer\'s conductivity; multi-frequency or pulsed EC required.',
    'Does not account for probe coil diameter — small coils probe shallower than the skin-depth math predicts.',
  ],
  relatedTools: [
    { slug: 'ndt-method-selector', name: 'NDT Method Selector' },
    { slug: 'ut-thickness', name: 'UT Thickness Calculator' },
    { slug: 'mt-field-strength', name: 'MT Field Strength' },
    { slug: 'ndt-procedure-checklist', name: 'NDT Procedure Checklist' },
  ],
  faqs: [
    {
      q: 'Why is skin depth so much smaller in steel than aluminum?',
      a: 'Carbon steel has a relative magnetic permeability around 100, compared to ~1 for aluminum. Skin depth scales as 1/sqrt(μ), so steel\'s skin depth is roughly 1/10th of aluminum\'s at the same frequency and conductivity. A 100 kHz coil that reaches 5 mm in aluminum reaches only ~0.5 mm in steel — which is why ferromagnetic EC almost always uses 1–20 kHz, or relies on saturation techniques to drive μ_r down toward 1.',
    },
    {
      q: 'What frequency for tube ID inspection of heat-exchanger tubes?',
      a: 'Bobbin coil work on copper-nickel or admiralty brass tubes typically uses 50–200 kHz for OD/ID surface flaws and 10–25 kHz for through-wall pitting. For ferromagnetic steel tubes (e.g. Cr-Mo), conventional bobbin EC is replaced by IRIS (UT internal rotating) or RFT (Remote Field Testing) because skin depth at any usable frequency is too small to reach the OD wall. ASTM E690 and E2096 give frequency selection charts for each tube material.',
    },
    {
      q: 'How does the frequency change for surface vs subsurface defects?',
      a: 'Surface crack detection sits at frequencies where δ is roughly equal to or slightly larger than the expected crack depth — typically 100 kHz to 2 MHz for non-ferrous. Subsurface defects (corrosion under doublers, second-layer cracking in lap joints) need much lower frequencies — 1–10 kHz — to push the field through the upper layer. Multi-frequency EC instruments run two or three channels simultaneously and use phase-difference algorithms to separate surface and subsurface signals.',
    },
    {
      q: 'Does this calculation apply to ECA (eddy-current array)?',
      a: 'The skin-depth physics applies to every EC technique, including arrays. ECA differs in geometry — many small coils running in parallel — not in frequency selection. For ECA the per-coil frequency follows the same formula, but the multi-coil drive electronics often use one or two frequencies that scan rapidly across the array rather than swept-frequency. ASTM E2884 lists representative ECA frequencies for aerospace and oil-and-gas applications.',
    },
  ],
  citations: [
    { id: 'astm-e309', source: 'ASTM E309-21 Standard Practice for Eddy-Current Examination of Steel Tubular Products' },
    { id: 'astm-e243', source: 'ASTM E243-22 Standard Practice for Electromagnetic Examination of Seamless Aluminum Alloy Tube' },
    { id: 'astm-e2884', source: 'ASTM E2884-17 Standard Guide for Eddy Current Testing of Electrically Conducting Materials Using Conformable Sensor Arrays' },
    { id: 'asnt-handbook', source: 'ASNT Nondestructive Testing Handbook, 3rd ed., Vol. 5 Electromagnetic Testing (2004)' },
  ],
};

export default tool;
