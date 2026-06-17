import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'ut-near-field',
  name: 'UT Near-Field (Fresnel Zone) Calculator',
  category: 'ut',
  inputs: [
    { id: 'diameter', label: 'Element diameter', unit: 'mm', type: 'number' },
    { id: 'frequency', label: 'Frequency', unit: 'MHz', type: 'number' },
    { id: 'material', label: 'Material', type: 'select' },
  ],
  outputs: [
    { id: 'near_field_mm', label: 'Near-field length (N)', unit: 'mm' },
    { id: 'wavelength_mm', label: 'Wavelength', unit: 'mm' },
  ],
  metaTitle: 'UT Near-Field Calculator | Fresnel Zone Length N = D²f/4v',
  metaDescription:
    'Calculate ultrasonic near-field (Fresnel zone) length from probe diameter, frequency, and material velocity. Find where the beam focuses and is usable for flaw sizing.',
  heroLede:
    'The near field is the chaotic interference zone right in front of a UT transducer where echo amplitude is unreliable and flaws cannot be sized accurately. Its length, N, marks the natural focal point of the beam and the start of the predictable far field. Knowing N tells you the minimum standoff, the best probe for a given depth, and where on the beam your reference reflectors should sit.',
  howItWorks:
    'For a circular element the near-field length N = D²/(4λ), where D is the element diameter and λ is the wavelength in the test material. Wavelength λ = v/f, so N = D²·f/(4v). A bigger crystal or a higher frequency pushes N (the focal point) deeper; a faster material (higher velocity) pulls it shallower. Reference reflectors used for calibration should ideally sit at or beyond N so amplitude behaves predictably (inverse-square in the far field).',
  formula: 'N = D² / (4λ)  where  λ = v / f   →   N = D²·f / (4·v)',
  workedExample: {
    inputs: { diameter: 12.7, frequency: 5, material: 'Steel (5900 m/s)' },
    outputs: { near_field_mm: '34.2', wavelength_mm: '1.18' },
    explanation:
      'A 12.7 mm (½ in), 5 MHz probe in steel (v ≈ 5.9 mm/µs): λ = 5.9/5 = 1.18 mm. N = 12.7²/(4×1.18) = 161.3/4.72 ≈ 34.2 mm. So the beam focuses ~34 mm deep — calibrate reference reflectors at or beyond that depth and expect unreliable sizing shallower than it.',
  },
  whenToUse:
    'Use when selecting a probe for a known inspection depth, setting the minimum water path / wedge standoff, planning where to place side-drilled holes or FBHs for DAC, or explaining why a near-surface indication will not size correctly.',
  limitations: [
    'Formula is for unfocused, circular flat elements; focused or rectangular (PAUT) elements differ.',
    'Uses the effective element diameter — many probes have an active diameter smaller than the housing.',
    'Assumes a homogeneous, non-attenuating material; coarse grain shifts the effective focus.',
    'Near-field length is in the material; add wedge/water path delay separately for the physical standoff.',
  ],
  relatedTools: [
    { slug: 'ut-thickness', name: 'UT Thickness' },
    { slug: 'snells-law-angle', name: "Snell's Law Angle" },
    { slug: 'dac-tcg', name: 'DAC / TCG Builder' },
    { slug: 'ut-beam-divergence', name: 'UT Beam Divergence' },
  ],
  faqs: [
    {
      q: 'Why can I not size flaws in the near field?',
      a: 'Inside the near field, contributions from across the element face arrive out of phase and interfere, producing a series of amplitude maxima and minima. A reflector of fixed size can therefore show wildly different echo heights depending on its exact depth, so amplitude-based sizing (DAC, DGS, 6 dB drop) is invalid. Only beyond N, in the far field, does amplitude fall off smoothly with distance and become a reliable size proxy.',
    },
    {
      q: 'How do I move the focal point deeper?',
      a: 'Increase the element diameter or the frequency — both increase N (D has a squared effect, so it dominates). A larger or higher-frequency probe focuses deeper but a higher frequency also attenuates faster in coarse material, so there is a practical trade-off. For a fixed depth target, choose D and f so N lands at or just before the region of interest.',
    },
    {
      q: 'Does the wedge or water path count toward the near field?',
      a: 'The near-field length from this formula is measured in the test material. The wedge (in angle-beam UT) or water column (immersion) adds a sound path that must be converted to an equivalent and added separately. In immersion testing the rule of thumb is water path ≥ ¼ of the steel near-field equivalent so the focal zone sits inside the part.',
    },
  ],
  citations: [
    { id: 'asnt-ut-cp', source: 'ASNT, Ultrasonic Testing Classroom Training Book (PTP series), near-field/beam characteristics.' },
    { id: 'asme-v-art4', source: 'ASME BPVC Section V, Article 4 — Ultrasonic Examination Methods for Welds.' },
    { id: 'iso-16810', source: 'ISO 16810:2012 Non-destructive testing — Ultrasonic testing — General principles.' },
  ],
};

export default tool;
