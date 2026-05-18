import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'six-db-drop-sizing',
  name: '6 dB Drop Defect Sizing',
  category: 'ut',
  inputs: [
    { id: 'scanDistance', label: 'Scan distance between 6 dB points', unit: 'mm', type: 'number' },
    { id: 'beamSpread', label: 'Beam spread correction', unit: 'mm', type: 'number' },
  ],
  outputs: [
    { id: 'defectLength', label: 'Estimated defect length', unit: 'mm' },
  ],
  metaTitle: '6 dB Drop Method | UT Defect Length Sizing',
  metaDescription:
    'Size a planar UT indication using the 6 dB drop method per ASTM E2192 and ASME V Article 4. Returns through-scan defect length with beam-spread correction.',
  heroLede:
    'The 6 dB drop method is the workhorse for sizing planar indications larger than the beam width: scan along the indication, mark the points where the amplitude drops to half (−6 dB), and the distance between marks is the apparent defect length. The catch — beam spread inflates the reading by 5 to 15 mm depending on probe geometry, and you must subtract the correction or your reject calls are 20% too long.',
  howItWorks:
    'Acoustic intensity drops 6 dB (factor of two) when the beam centre line moves off the edge of the reflector. So if you peak the indication, mark the position, and slide the probe until the amplitude has dropped 6 dB on each side, the two marks bracket the reflector ± half of the beam width at that depth. Subtract the beam-spread correction (typically 5–12 mm for a 22 mm 2.25 MHz angle probe at half-skip) and the result is the actual defect length within ±2 mm for indications larger than the beam.',
  formula: 'defect_length = scan_between_6dB_points − beam_spread_correction',
  workedExample: {
    inputs: { scanDistance: 28, beamSpread: 8 },
    outputs: { defectLength: '20' },
    explanation:
      'A planar indication in a 25 mm carbon steel weld. Scanned with a 60° 2.25 MHz angle probe. The 6 dB drop points sit 28 mm apart along the weld axis. Beam spread at the indication\'s 35 mm metal path is 8 mm per the probe certificate. Defect length = 28 − 8 = 20 mm. Without the correction the technician reports a 28 mm long indication and over-rejects against an ASME B31.3 acceptance criterion of < 25 mm.',
  },
  whenToUse:
    'Use to size weld indications larger than the beam width — typically planar defects 5 mm and longer. For indications smaller than the beam width the 6 dB method overestimates; use the equivalent reflector or amplitude-vs-position fitting per ASTM E2192 instead.',
  limitations: [
    'Valid only for indications larger than the beam width at the indication depth.',
    'Beam spread correction must come from a measured beam-profile certificate, not a generic table.',
    'Material attenuation and surface coupling losses can mimic a 6 dB drop — verify on a calibration block before each scan.',
    'For point reflectors and small porosity clusters the 6 dB method is invalid; use the equivalent reflector method.',
    'PAUT and TOFD scans have their own sizing methods (D-scan length, lateral wave-to-tip echo); 6 dB drop is conventional UT only.',
  ],
  relatedTools: [
    { slug: 'snells-law-angle', name: "Snell's Law Refracted Angle" },
    { slug: 'skip-distance', name: 'Skip & Half-Skip Distance' },
    { slug: 'dac-tcg', name: 'DAC / TCG Curve' },
    { slug: 'asme-b31-3-acceptance', name: 'ASME B31.3 Acceptance' },
  ],
  faqs: [
    {
      q: 'Why exactly 6 dB?',
      a: 'A 6 dB amplitude drop is a factor of two in pressure (10^(6/20) = 2). In an isotropic circular beam the intensity at the −6 dB position corresponds to the beam half-angle — the position where the beam centre has moved off the geometric edge of an ideal point reflector. The convention dates to 1960s UK industrial standards and has been carried into ASME V, EN 1714, and ASTM E2192 because it produces a length within ±10% for any reflector larger than the beam.',
    },
    {
      q: 'What is beam spread and how do I get the correction value?',
      a: 'Beam spread is the half-angle divergence of the ultrasonic beam from the probe focal point outward. It is a geometric property of element size, frequency, and material — for a typical 22 mm 2.25 MHz probe in steel the half-angle is ~3° and the −6 dB beam width at 35 mm metal path is roughly 7 mm. The correction value comes from the probe\'s beam-profile certificate (ASTM E1065 procedure) or from a measured side-drilled hole scan in a calibration block of the same material.',
    },
    {
      q: 'How does this differ from the 20 dB drop method?',
      a: '6 dB drop maps the −6 dB edge of the reflector (factor-of-two amplitude). 20 dB drop maps the −20 dB edge (factor-of-ten) and gives the full beam diameter, used for sizing very large reflectors where the beam never fully misses the indication. ASTM E2192 §10.3 prefers 6 dB drop for indications 0.5–3× the beam width; 20 dB drop is reserved for indications larger than 3× the beam width.',
    },
    {
      q: 'Can I use the 6 dB method on PAUT?',
      a: 'No — PAUT replaces the 6 dB scan with electronic S-scan sizing (lateral wave to tip echo distance) per ASTM E2700 §10. The 6 dB drop technique relies on a known, characterised beam profile that does not change during the scan; PAUT focal-law beams have different shapes at every angle, which makes the method unreliable. Use it only for conventional single-element angle-beam pulse-echo work.',
    },
  ],
  citations: [
    { id: 'astm-e2192', source: 'ASTM E2192-13 Standard Guide for Planar Flaw Height Sizing by Ultrasonics' },
    { id: 'asme-v-art-4', source: 'ASME BPVC Section V (2023), Article 4 §T-462 Length Sizing' },
    { id: 'astm-e1065', source: 'ASTM E1065-20 Standard Practice for Evaluating Characteristics of Ultrasonic Search Units' },
    { id: 'en-1714', source: 'EN 1714 Non-destructive testing of welded joints — Ultrasonic testing' },
  ],
};

export default tool;
