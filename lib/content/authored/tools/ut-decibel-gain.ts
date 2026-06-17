import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'ut-decibel-gain',
  name: 'UT Decibel (dB) Amplitude Calculator',
  category: 'ut',
  inputs: [
    { id: 'amp1', label: 'Reference amplitude', unit: '% FSH', type: 'number' },
    { id: 'amp2', label: 'Measured amplitude', unit: '% FSH', type: 'number' },
  ],
  outputs: [
    { id: 'db_diff', label: 'Amplitude difference', unit: 'dB' },
    { id: 'gain_to_80', label: 'Gain to bring measured to 80% FSH', unit: 'dB' },
  ],
  metaTitle: 'UT Decibel (dB) Calculator | Amplitude Ratio dB = 20·log(A1/A2)',
  metaDescription:
    'Convert ultrasonic amplitude ratios to decibels and back. Compute dB difference between two signals and the gain needed to set a signal to 80% FSH.',
  heroLede:
    'Ultrasonic evaluation lives in decibels: transfer correction, DAC offsets, the 6 dB and 20 dB drop sizing rules, and reference-level reporting all hinge on converting an amplitude ratio to dB. This tool does the conversion both ways — give it two screen heights and it returns the dB difference, plus the exact gain to drive a signal to the 80% full-screen-height reference.',
  howItWorks:
    'Decibels express a ratio of two amplitudes logarithmically: ΔdB = 20 × log₁₀(A₁/A₂). A factor-of-2 amplitude change is 6.02 dB (the basis of the "6 dB drop" rule); a factor of 10 is 20 dB. Because the relationship is logarithmic, dB values add and subtract — that is why instrument gain in dB can be tallied directly against DAC/TCG offsets and transfer-correction values.',
  formula: 'ΔdB = 20 · log₁₀(A₁ / A₂)',
  workedExample: {
    inputs: { amp1: 80, amp2: 40 },
    outputs: { db_diff: '6.0', gain_to_80: '6.0' },
    explanation:
      'A signal at 40% FSH compared with an 80% reference: ΔdB = 20·log₁₀(80/40) = 20·log₁₀(2) = 6.0 dB. The measured signal is 6 dB below reference. To raise the 40% signal to the 80% reference you add 6 dB of gain — exactly the 6 dB drop relationship inverted.',
  },
  whenToUse:
    'Use for transfer correction between calibration block and part, applying DAC/DGS offsets, executing 6 dB or 20 dB drop flaw sizing, normalising a signal to a reference level, or reporting indication amplitude relative to reference.',
  limitations: [
    'Assumes a linear, calibrated amplifier across the range used — verify instrument linearity (ASME V Article 4 requires vertical/horizontal linearity checks).',
    'Screen height is only proportional to acoustic pressure within the calibrated linear region (typically 20–80% FSH).',
    'Does not include attenuation or transfer correction — those are added separately as further dB terms.',
    'Saturated (>100% FSH) or very low (<20% FSH) signals fall outside the reliable linear band.',
  ],
  relatedTools: [
    { slug: 'dac-tcg', name: 'DAC / TCG Builder' },
    { slug: 'six-db-drop-sizing', name: '6 dB Drop Sizing' },
    { slug: 'ut-attenuation', name: 'UT Attenuation' },
    { slug: 'ut-thickness', name: 'UT Thickness' },
  ],
  faqs: [
    {
      q: 'Why is a doubling of amplitude 6 dB?',
      a: 'Because dB for amplitude uses 20·log₁₀(ratio). log₁₀(2) = 0.301, and 20 × 0.301 = 6.02 dB. This is the foundation of the 6 dB drop technique: when the echo from the edge of a large reflector falls to half (−6 dB) of its peak, the beam centre is taken to be at the reflector edge, allowing through-wall sizing.',
    },
    {
      q: 'What is the difference between 20·log and 10·log?',
      a: 'Use 20·log₁₀ for amplitude/voltage/screen-height ratios (what UT instruments display) and 10·log₁₀ for power/intensity ratios. UT evaluation is amplitude-based, so 20·log is correct. Mixing them up doubles or halves every dB value — a common rookie error in transfer-correction math.',
    },
    {
      q: 'How does this relate to setting a reference level?',
      a: 'Calibration sets a reference reflector to a fixed screen height (commonly 80% FSH) at a known gain — the reference level. Indications are then reported as "x dB above/below reference". This calculator gives that x directly from the two screen heights, and the "gain to 80%" output tells you how much instrument gain to add to re-peak a signal to the reference height.',
    },
  ],
  citations: [
    { id: 'asme-v-art4', source: 'ASME BPVC Section V, Article 4 — Ultrasonic Examination (amplitude, linearity, reference level).' },
    { id: 'iso-16811', source: 'ISO 16811:2014 Non-destructive testing — Ultrasonic testing — Sensitivity and range setting.' },
    { id: 'asnt-ut', source: 'ASNT Ultrasonic Testing (Level II) — decibel system and amplitude evaluation.' },
  ],
};

export default tool;
