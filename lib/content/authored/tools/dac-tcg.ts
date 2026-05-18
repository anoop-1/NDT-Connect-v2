import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'dac-tcg',
  name: 'DAC / TCG Curve Generator',
  category: 'ut',
  inputs: [
    { id: 'reflectors', label: 'Reference reflector echoes (depth + dB)', type: 'text' },
  ],
  outputs: [
    { id: 'dacCurve', label: 'DAC curve points', unit: 'dB vs depth' },
    { id: 'tcgGain', label: 'TCG gain required at each depth', unit: 'dB' },
  ],
  metaTitle: 'DAC / TCG Curve Generator | UT Reference Reflector',
  metaDescription:
    'Generate a Distance Amplitude Correction or Time-Corrected Gain curve from 3+ reference reflectors per ASME V Article 4 and ASTM E2192.',
  heroLede:
    'A DAC curve normalises amplitude across depth. Hit a side-drilled hole at 12, 25, and 50 mm, log the dB at each, and the curve shows what amplitude an equivalent reflector would give at any other depth. A TCG curve is the same data inverted — gain added to flatten the curve to a single reference line. This tool builds both from three or more reference points.',
  howItWorks:
    'Beam spread plus material attenuation drops echo amplitude as 1/r above the near-field, plus an exponential attenuation term. Rather than re-derive from physics, the calibration approach is empirical: take a block with reflectors at known depths, record the peak dB for each, and connect the points with a smoothed curve. Per ASME V Art. 4 §T-433 the calibration uses at least three reference reflectors spanning the full depth of interest. The DAC curve becomes the reference threshold for indication evaluation.',
  formula: 'DAC(z) = interpolated peak amplitude vs depth ;  TCG(z) = max(DAC) − DAC(z)',
  workedExample: {
    inputs: { reflectors: '12 mm @ 78 dB; 25 mm @ 72 dB; 50 mm @ 64 dB' },
    outputs: { dacCurve: 'DAC(12)=78, DAC(25)=72, DAC(50)=64; interpolated DAC(35)=68 dB', tcgGain: 'TCG(12)=0, TCG(25)=6, TCG(50)=14 — gain added to flatten to 78 dB' },
    explanation:
      'Three side-drilled holes in an ASTM E164 IIW V1 block — 1.5 mm SDH at 12, 25, and 50 mm. Peak echo amplitudes recorded at 78, 72, and 64 dB. The DAC curve passes through those points. At 35 mm depth the curve interpolates to 68 dB. To convert to TCG: subtract each DAC value from the maximum (78 dB) → +0 dB at 12 mm, +6 dB at 25 mm, +14 dB at 50 mm. Apply those gains via the flaw detector\'s TCG function and any reflector at any depth registers at 78 dB if it has the same effective reflectivity as the calibration SDH.',
  },
  whenToUse:
    'Use whenever code requires distance amplitude correction — ASME V Art. 4 weld inspection, ASME XI in-service inspection, AWS D1.1 with the optional DAC technique, and most refinery flange and nozzle scans. Pair with a side-drilled hole block (E164 IIW V1 or custom) of the same nominal acoustic properties as the test piece.',
  limitations: [
    'Three reflectors is the code minimum; five gives a smoother curve through near-field transition.',
    'DAC is reflector-specific — a curve built from 3 mm SDHs does not directly evaluate planar defects.',
    'Material attenuation varies between heat lots; recurve when changing material or temperature ±20 °C.',
    'For phased-array scans, ASME V Art. 4 §T-451 requires TCG built across all angles in the focal law set.',
    'TCG is preferred over DAC in modern code work because it produces a flat baseline easier for the operator to read.',
  ],
  relatedTools: [
    { slug: 'dac-tvg-curve', name: 'DAC-TVG Curve Plot' },
    { slug: 'cal-block-selector', name: 'Calibration Block Selector' },
    { slug: 'snells-law-angle', name: "Snell's Law Refracted Angle" },
    { slug: 'six-db-drop-sizing', name: '6 dB Drop Defect Sizing' },
  ],
  faqs: [
    {
      q: 'Why use DAC instead of just a flat reference level?',
      a: 'A flat reference under-evaluates near-field reflectors and over-evaluates deep ones because echo amplitude drops with distance. Without DAC a 1.5 mm SDH at 50 mm gives 14 dB lower response than the same SDH at 12 mm in the same block. ASME V Art. 4 §T-461 explicitly bans evaluation without distance amplitude correction for weld scans above 12.5 mm thickness for this reason.',
    },
    {
      q: 'What is the difference between DAC, TCG, and TVG?',
      a: 'DAC is a sloped curve drawn through reference echoes — the operator visually compares each indication to the curve. TCG (Time-Corrected Gain) adds gain electronically to flatten the curve so all reference echoes appear at one amplitude. TVG (Time-Variable Gain) is the older analog term for the same thing — modern digital flaw detectors do TCG. AWS D1.1 calls it "TVG"; ASME calls it "TCG". Functionally identical.',
    },
    {
      q: 'How many reference reflectors do I need?',
      a: 'Three is the code minimum (ASME V Art. 4 §T-433.2.1). One must lie within ±25% of the near-field crossover. Five gives much better resolution across the curve transition and is standard for refinery procedures. PAUT and TOFD multi-angle TCG often need 7–10 points across the depth and angle range because each focal law has its own attenuation behaviour.',
    },
    {
      q: 'Do I have to recurve when I change probes?',
      a: 'Yes. Probe frequency, element size, and damping all change the near-field length and beam-spread, which moves every point on the DAC. ASME V Art. 4 §T-433.1 requires recalibration any time the probe, wedge, cable, or instrument is changed. Most field crews keep the original calibration data and re-verify against the cal block at start-of-shift, end-of-shift, and after any equipment swap.',
    },
  ],
  citations: [
    { id: 'asme-v-art-4', source: 'ASME BPVC Section V (2023), Article 4 §T-433 Ultrasonic Reference Standards' },
    { id: 'astm-e164', source: 'ASTM E164-19 Standard Practice for Contact Ultrasonic Testing of Weldments' },
    { id: 'astm-e2192', source: 'ASTM E2192-13 Standard Guide for Planar Flaw Height Sizing by Ultrasonics' },
    { id: 'aws-d1-1', source: 'AWS D1.1/D1.1M:2020 Structural Welding Code — Steel, §6.13 UT' },
  ],
};

export default tool;
