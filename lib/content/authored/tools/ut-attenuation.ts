import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'ut-attenuation',
  name: 'UT Attenuation Calculator',
  category: 'ut',
  inputs: [
    { id: 'material', label: 'Test material', type: 'select' },
    { id: 'frequency', label: 'Probe frequency', unit: 'MHz', type: 'number' },
    { id: 'distance', label: 'Sound path distance', unit: 'mm', type: 'number' },
    { id: 'beamMode', label: 'Beam mode (longitudinal / shear)', type: 'select' },
  ],
  outputs: [
    { id: 'totalLoss', label: 'Total amplitude loss', unit: 'dB' },
    { id: 'attenCoeff', label: 'Material attenuation coefficient', unit: 'dB/mm' },
    { id: 'geometricLoss', label: 'Geometric spreading loss', unit: 'dB' },
    { id: 'effectiveRange', label: 'Effective inspection range (40 dB drop)', unit: 'mm' },
  ],
  metaTitle: 'UT Attenuation Calculator [2026]: dB Loss per mm by Material & Frequency',
  metaDescription:
    'Calculate ultrasonic attenuation loss for carbon steel, stainless, aluminum, copper, plastic, and concrete at 1–25 MHz. Separates material absorption from geometric spreading. Per EN 583-2.',
  heroLede:
    'Conventional UT loses roughly 20 dB through 300 mm of carbon steel at 5 MHz — half from material absorption, half from beam spreading. Push that to 10 MHz on the same path and total loss climbs to 38 dB, which is why thick-wall and coarse-grain forgings sit at 2.25 MHz or lower. This calculator separates the two loss mechanisms so you can size the gain budget on a real UT instrument (typically 60–100 dB dynamic range) before mobilising to the field.',
  howItWorks:
    'Total back-and-forth loss = 2 × distance × α(f, material) + 20×log₁₀(distance/N) once past the near-field, where α is the material attenuation coefficient in dB/mm and the second term is geometric spreading from the diverging beam. α is itself a function of frequency: in carbon steel α(f) ≈ 0.02×f for longitudinal waves and 0.04×f for shear waves (dB/mm, f in MHz). Austenitic stainless and coarse-grain materials have α 3–10× higher because of grain-boundary scattering. Effective range is the path length where total loss equals the typical 40 dB working budget (above the noise floor on a calibrated DAC).',
  formula: 'L_total = 2αx + 20 log₁₀(x/N) ;  α_steel(L) ≈ 0.02f ;  α_steel(S) ≈ 0.04f  [dB/mm, f in MHz]',
  workedExample: {
    inputs: { material: 'Carbon steel', frequency: 5, distance: 100, beamMode: 'Longitudinal' },
    outputs: { totalLoss: '23', attenCoeff: '0.10', geometricLoss: '13', effectiveRange: '350' },
    explanation:
      '5 MHz longitudinal in carbon steel, 100 mm sound path (50 mm wall, pulse-echo). α = 0.02 × 5 = 0.10 dB/mm. Material absorption (both ways) = 2 × 100 × 0.10 = 20 dB. Near-field of a typical 10 mm probe at 5 MHz is ~21 mm; at 100 mm we are at 5N, geometric spreading = 20×log₁₀(100/21) = 13.6 dB. But geometric loss for back-wall echo is largely cancelled by the back-wall acting as a reflector of the full beam — so practical loss on a back-wall echo at 50 mm wall ≈ 2αx ≈ 20 dB plus a few dB couplant + reflector loss = 23 dB total. Effective range (40 dB budget): solve 2αx = 40 → x = 200 mm one-way = 400 mm sound path; subtract 50 dB for an FBH-sized indication reflector and effective range drops to ~350 mm. This is why 5 MHz works on 300 mm steel and 10 MHz does not.',
  },
  whenToUse:
    'Use when selecting probe frequency for thick-wall components (typically going DOWN to 2.25 MHz or 1 MHz for forgings >150 mm), when sizing the gain budget for a long sound-path inspection (austenitic SS welds, copper castings, large forgings), when explaining to a procurement reviewer why a low-frequency probe was specified, or when comparing two material lots that show different attenuation on the same calibration block.',
  limitations: [
    'Coefficients are typical values for fine-grained carbon steel and aluminum. Cast iron, austenitic stainless (especially weld metal), Inconel, and coarse-grain forgings can have α 3–10× higher and must be measured on the actual material, not estimated.',
    'Frequency exponent for α varies by material: carbon steel ≈ linear in f, austenitic SS often closer to f² (grain scattering dominates), polymers can be f^1.5.',
    'Temperature changes α materially — austenitic SS attenuation drops ~25% from 20°C to 200°C, which matters for in-service hot-piping UT.',
    'Geometric spreading assumes a piston transducer in far-field. Focused probes converge then diverge; PA arrays follow their focal plan. Use manufacturer beam plots for non-flat probes.',
    'Does NOT account for couplant transmission loss (typically 6–12 dB on contact UT, near-zero on immersion).',
    'Does NOT account for surface roughness loss (rough as-rolled or as-cast surface can add another 10–20 dB on contact UT — use immersion or buffer-coupling for rough surfaces).',
  ],
  relatedTools: [
    { slug: 'ut-beam-divergence', name: 'UT Beam Divergence Calculator' },
    { slug: 'dac-tcg', name: 'DAC / TCG Curve Builder' },
    { slug: 'six-db-drop-sizing', name: '6 dB Drop Sizing Calculator' },
    { slug: 'half-value-layer', name: 'HVL / TVL Calculator (radiography)' },
  ],
  faqs: [
    {
      q: 'Why does shear-wave attenuation roughly double the longitudinal value?',
      a: 'In polycrystalline metals, shear waves interact more strongly with grain boundaries because their displacement is perpendicular to propagation (so grain anisotropy matters more). Across most engineering metals, shear α is 1.8–2.5× longitudinal α at the same frequency. This is why angle-beam shear-wave inspection on austenitic SS welds frequently uses 2.25 MHz when longitudinal would have used 5 MHz — the shear-mode attenuation forces a lower frequency to keep enough signal-to-noise across the weld leg.',
    },
    {
      q: 'How do I measure α on a piece of material I have no data for?',
      a: 'Use the back-wall echo decay method per EN 12668-2. Place a 0° contact probe on a flat parallel-sided sample. Record amplitude of the 1st and 2nd back-wall echoes (B1 and B2). α = (20×log₁₀(B1/B2)) / (2 × thickness). Repeat at 3 different thicknesses to confirm linearity. Use the same probe and gain as the field inspection. This gives the in-service attenuation including roughness, couplant, and grain scattering — far more useful than a literature value for that alloy grade.',
    },
    {
      q: 'Why does this calculator separate material absorption from geometric spreading?',
      a: 'Because they have different fixes. If material absorption dominates (low frequency helps), going from 5 → 2.25 MHz cuts loss roughly in half. If geometric spreading dominates (a focused probe helps), switching to a focal-point lens or PA array can recover 10–20 dB at the inspection depth. Showing the two terms separately lets a UT level III pick the right tool. A single combined "loss" number hides the diagnostic.',
    },
  ],
  citations: [
    { id: 'en-583-2', source: 'EN 583-2:2001 — Non-destructive testing — Ultrasonic examination — Part 2: Sensitivity and range setting' },
    { id: 'en-12668-2', source: 'EN 12668-2:2010 — Probes — Sensitivity and pulse-echo characteristics' },
    { id: 'asnt-h3', source: 'ASNT Nondestructive Testing Handbook, 3rd ed., Vol. 7 Ultrasonic Testing, §3.3 Attenuation' },
  ],
};

export default tool;
