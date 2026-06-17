import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'ec-skin-depth',
  name: 'Eddy Current Skin Depth (Standard Depth of Penetration)',
  category: 'et',
  inputs: [
    { id: 'material', label: 'Material', type: 'select' },
    { id: 'frequency', label: 'Frequency', unit: 'kHz', type: 'number' },
  ],
  outputs: [
    { id: 'sdp_mm', label: 'Standard depth of penetration (δ)', unit: 'mm' },
    { id: 'eff_depth_mm', label: 'Effective depth (~3δ)', unit: 'mm' },
  ],
  metaTitle: 'Eddy Current Skin Depth Calculator | Standard Depth of Penetration',
  metaDescription:
    'Calculate eddy current standard depth of penetration (skin depth) from material conductivity, permeability, and frequency. Pick the right EC test frequency.',
  heroLede:
    'Eddy currents weaken exponentially with depth. The standard depth of penetration (δ) — where current density falls to 37% of the surface value — sets how deep an eddy-current test can reliably see and which frequency to choose. Too high a frequency and you only read the surface; too low and you lose resolution. This tool computes δ so you select frequency on physics, not guesswork.',
  howItWorks:
    'δ = 1/√(π·f·μ·σ). In practical units, δ(mm) ≈ 50·√(ρ / (μr·f)), with resistivity ρ in µΩ·cm and frequency f in Hz. Lower conductivity (higher ρ), lower permeability, and lower frequency all increase penetration. Practical inspection depth is roughly 3δ (current density ~5% of surface). Choose test frequency so the flaw of interest sits within ~1–2 δ for good sensitivity and phase separation.',
  formula: 'δ = 1 / √(π·f·μ·σ)   ≈   50 · √( ρ[µΩ·cm] / ( μr · f[Hz] ) )  mm',
  workedExample: {
    inputs: { material: 'Aluminium (2.82 µΩ·cm)', frequency: 100 },
    outputs: { sdp_mm: '0.27', eff_depth_mm: '0.80' },
    explanation:
      'Aluminium (ρ ≈ 2.82 µΩ·cm, µr = 1) at 100 kHz: δ = 50·√(2.82 / (1 × 100000)) = 50·√(2.82e-5) = 50 × 0.00531 = 0.27 mm. Effective depth ≈ 3δ ≈ 0.8 mm. To find a flaw 1 mm deep you would drop frequency (e.g. to ~10 kHz, tripling δ).',
  },
  whenToUse:
    'Use when selecting EC test frequency for surface vs. subsurface flaws, designing a multi-frequency setup, inspecting heat-exchanger tubes, or explaining why a deeper flaw needs a lower frequency.',
  limitations: [
    'Ferromagnetic materials (carbon steel) have high, variable µr — δ becomes very small and readings are dominated by permeability noise; saturation or alternative methods are usually needed.',
    'Uses nominal resistivity; alloy, temper, and temperature shift conductivity (and thus δ).',
    'δ is the 37% depth, not a hard limit — sensitivity degrades progressively; ~3δ is a practical effective limit.',
    'Lift-off, edge effect, and probe design also constrain real-world depth response.',
  ],
  relatedTools: [
    { slug: 'ec-frequency', name: 'EC Frequency Selector' },
    { slug: 'ut-thickness', name: 'UT Thickness' },
  ],
  faqs: [
    {
      q: 'How deep can eddy current testing actually inspect?',
      a: 'Reliable response extends to roughly three standard depths of penetration (3δ), where current density is about 5% of the surface value. Beyond that, sensitivity falls off too far for dependable detection. Because δ depends on frequency, conductivity, and permeability, "how deep" always reduces to choosing the right frequency for the material and flaw depth.',
    },
    {
      q: 'Why does carbon steel give such a shallow skin depth?',
      a: 'Carbon steel is ferromagnetic with relative permeability in the tens to hundreds. Since δ scales as 1/√µr, a µr of 100 shrinks penetration by 10× versus a non-magnetic metal. That, plus permeability variation creating large background noise, is why conventional EC on ferrous material is mostly a surface-crack method — subsurface work uses magnetic saturation, remote-field, or other techniques.',
    },
    {
      q: 'How do I pick the test frequency?',
      a: 'Target the flaw depth within about 1–2 δ for the best amplitude and phase separation. Compute δ at a trial frequency; if the flaw sits much deeper than ~3δ, lower the frequency (δ rises as 1/√f). For surface cracks you can use a higher frequency for resolution. Tube inspection and multi-layer parts often run two or more frequencies to separate signals.',
    },
  ],
  citations: [
    { id: 'astm-e2884', source: 'ASTM E2884 — Standard Guide for Eddy Current Testing of Electrically Conducting Materials Using Conformable Sensor Arrays.' },
    { id: 'astm-e309', source: 'ASTM E309 — Standard Practice for Eddy-Current Examination of Steel Tubular Products Using Magnetic Saturation.' },
    { id: 'asnt-et', source: 'ASNT, Electromagnetic Testing (ET) Classroom Training — depth of penetration.' },
  ],
};

export default tool;
