import type { GlossaryLongFormContent } from '../types';

const term: GlossaryLongFormContent = {
  slug: 'dac-curve',
  term: 'DAC Curve',
  category: 'Ultrasonic Testing',
  metaTitle: 'DAC Curve in UT: Distance-Amplitude Correction Explained',
  metaDescription:
    'DAC plots reference reflector amplitude vs. depth so the inspector can size flaws across the full range. Learn DAC construction, TCG vs. DAC, and ASME acceptance lines.',
  heroLede:
    'A DAC curve (Distance-Amplitude Correction) is an overlay drawn on the ultrasonic A-scan that traces the falling amplitude of equal-size reference reflectors as a function of depth. It is the inspector\'s yardstick — any indication that pokes above the curve is recordable, anything below is noise. ASME, API, and AWS codes all reference DAC levels (50%, 100%, 200%) as acceptance/rejection thresholds; getting the DAC drawn wrong invalidates the entire inspection.',
  preciseDefinition:
    'A DAC curve is a graphical line plotted on the UT display connecting the peak amplitudes of identical reference reflectors located at progressively greater depths in a calibration block, used to compensate for beam-spread and attenuation losses with depth.[1]',
  alternateNames: ['Distance Amplitude Correction', 'DAC line', 'Reference response curve', 'Echo dynamic correction curve'],
  history:
    'DAC techniques were standardised in the 1960s when ASME Section V Article 4 first required quantitative amplitude calibration. The original DAC blocks used side-drilled holes (SDH) at fixed depth increments — the IIW V1 block of 1962 became the de facto international reference. The DGS (Distance-Gain-Size) curve, developed by Krautkrämer in 1959, is the theoretical analog of DAC but uses a flat-bottomed-hole reference and analytic beam geometry rather than measured points.',
  technicalDetail: [
    {
      heading: 'Constructing a DAC curve',
      level: 2,
      paragraphs: [
        'Pick a calibration block with reference reflectors of identical size at three or more depths covering the inspection range. Standard choices: V1 block with 1.5 mm side-drilled hole at 13, 25, 50 mm depths; ASME V Basic Cal Block with SDH at quarter-, half-, three-quarter-thickness; AWS D1.1 reference block with 1.6 mm SDH at 25, 50, 75 mm depths.',
        'With the probe at the position giving peak response from the shallowest reflector, set gain to bring that echo to 80% FSH. This is the primary reference level — every other DAC point is measured relative to it.[2]',
        'Move the probe to each subsequent reflector at its peak position and mark the resulting amplitude at its time-base position. Connect the points with a smooth curve. The result: a line descending from 80% FSH at the shallowest reflector down through ~20-30% FSH at the deepest, capturing the combined effect of beam spread and material attenuation.',
        'On modern digital instruments (Olympus Epoch, GE/Waygate Krautkramer USM Vision+) the DAC is built by tagging the peak echoes; the firmware fits a curve through them. Always verify the fit visually — bad fit happens when one reference reflector has been missed off-axis.',
      ],
    },
    {
      heading: 'Acceptance levels and reporting',
      level: 2,
      paragraphs: [
        'ASME VIII Div 1 UW-53 uses the DAC as the recording threshold: any indication with amplitude ≥ 50% DAC must be evaluated; ≥ 100% DAC must be sized and reported. AWS D1.1 §6.13 uses an "indication rating" relative to a reference level set on the same block, with acceptance limits in dB above/below.[3]',
        'For sensitivity above reference reflector size, transfer correction (the dB difference in attenuation between cal block and component) is added to the gain. ASME V Article 4 T-462.4 requires this offset documented on every report.',
        'DAC is plotted at 100% reference (primary), 50% (evaluation), and 20% (recording) lines on many instruments — colour-coded for at-a-glance interpretation during scanning.',
      ],
    },
    {
      heading: 'DAC vs. TCG vs. DGS',
      level: 2,
      paragraphs: [
        'DAC: the curve is drawn on the screen; gain stays flat; the operator compares each indication to the curve. Universal, code-friendly, works on any flaw detector new or old.',
        'TCG (Time Corrected Gain): the gain itself is ramped up with depth so that equal reflectors give equal screen heights — the screen looks flat at 80% FSH for the cal reflectors. Easier scanning (no curve to read), but mandatory under ASME V Article 4 Mandatory Appendix VIII for digital instruments performing distance-amplitude techniques. TCG and DAC are mathematically equivalent.',
        'DGS (also called AVG): analytical method that uses one reference reflector (back-wall, flat-bottom-hole) and a generic master curve scaled by probe geometry. Lets an inspector size a flaw as a "1.5 mm FBH equivalent" without a graded block at every depth. Required reading for ISO 11666 and EN-spec UT.[4]',
      ],
    },
  ],
  workedExample: {
    setup:
      'UT weld inspection on a 50 mm carbon steel plate using 5 MHz 60° angle probe. Calibration block: AWS D1.1 reference block with 1.6 mm side-drilled holes at 25 mm, 50 mm, and 75 mm metal paths.',
    calculation:
      'Bring peak response from SDH at 25 mm to 80% FSH at gain setting of 45 dB. Move to SDH at 50 mm: peak amplitude reads 55% FSH (loss of 3.2 dB). Move to SDH at 75 mm: peak amplitude reads 32% FSH (loss of 8.0 dB). Plot the three points and draw the DAC curve. During scanning of the actual weld, an indication appears at 60 mm metal path with amplitude 70% FSH. Interpolating the DAC at 60 mm gives ~46% FSH = 100% DAC. Indication amplitude / DAC = 70/46 = 1.52 → +3.6 dB over reference.',
    result:
      'Per AWS D1.1 §6.13 with the indication rating computed for the probe angle and material thickness, +3.6 dB on a non-tubular static structure (Class B) corresponds to a Class III rating. Length must be measured; if length exceeds limits the indication is rejectable. Document on the UT report with DAC curve image attached.',
  },
  whereItAppears: [
    {
      context: 'AWS D1.1 weld inspection on a structural steel bridge',
      explanation:
        'A Level II UT inspector calibrates against the AWS D1.1 reference block before each shift. The DAC drawn on the flaw detector becomes the literal yardstick: every weld indication is captured as a dB-from-reference value, and acceptance follows the table in D1.1 §6.13 by reference level, class, and material thickness. The DAC screen capture appears on every inspection record.',
    },
    {
      context: 'ASME Section VIII Div 1 pressure-vessel longitudinal seam',
      explanation:
        'For a 75 mm wall reactor, the Basic Cal Block built per Section V Mandatory Appendix II provides SDH at quarter-, half-, and three-quarter wall. The DAC plus 20%, 50%, and 100% lines are drawn. Recording threshold is set at 50% DAC; evaluation threshold at 100%. Any flaw with response above 100% DAC is sized and characterised before acceptance per UW-53(b).',
    },
    {
      context: 'Aerospace forging acceptance under AMS 2630',
      explanation:
        'A nickel-alloy rotor forging is scanned immersion-style with 10 MHz transducers. The reference is a 1.2 mm flat-bottom-hole (FBH) at three depths; the DAC is drawn against those FBH echoes. AMS 2630 Class A acceptance forbids any indication exceeding the 1.2 mm FBH DAC anywhere in the forging volume — a single recordable echo can mean rework or rejection of a six-figure part.',
    },
  ],
  relatedTerms: [
    { term: 'A-Scan', slug: 'a-scan' },
    { term: 'Attenuation', slug: 'attenuation' },
    { term: 'Calibration Block', slug: 'calibration-block' },
    { term: 'Angle Beam', slug: 'angle-beam' },
  ],
  faqs: [
    {
      q: 'What is the difference between a DAC curve and a TCG?',
      a: 'Mathematically they are equivalent — both compensate for the falling response of reference reflectors with depth. The display behaviour differs. With a DAC, the gain is set once on the shallowest reference reflector and held flat; the operator sees a curve overlaid on the screen and judges each indication relative to that curve. With TCG (Time Corrected Gain), the gain is programmed to ramp upward with depth so that equal reference reflectors all hit the same screen amplitude (typically 80% FSH); the operator sees a flat reference and indications appear above or below it without a curve. ASME V Article 4 Mandatory Appendix VIII makes TCG mandatory on digital instruments performing distance-amplitude techniques — it removes the operator-judgment error of reading off a curve and produces more repeatable sizing across operators.',
    },
    {
      q: 'How many reference points are needed to construct a DAC curve?',
      a: 'Three at minimum, covering the full inspection depth range. ASME V Article 4 T-434.1.5 requires reference reflectors at quarter-, half-, and three-quarter thickness; many shops add a fourth point at the maximum depth to capture the curve\'s tail. With only two points, you would draw a straight line and lose accuracy in the middle of the range where most flaws actually sit. AWS D1.1 reference blocks come with three SDH at fixed standard depths (e.g. 25/50/75 mm). On modern digital flaw detectors the firmware fits a smooth interpolation curve through the points and extrapolates briefly past the deepest point — never trust extrapolation more than 10-15% beyond the last measured point; recalibrate with a deeper reflector if necessary.',
    },
    {
      q: 'When does a DAC need to be redrawn during an inspection?',
      a: 'Whenever any of the variables that built it changes. ASME V T-461 requires a calibration check at the start of each shift, after any probe/cable/wedge change, every 4 hours of continuous use, and whenever the operator notices an anomaly. If the back-wall amplitude on the reference block shifts more than ±2 dB between checks, redraw the DAC entirely. Temperature changes >25 °F between calibration and inspection require re-verification of the curve (velocity in steel changes ~1% per 100 °F). The cal block stays on the inspection cart for the entire job; mid-shift verification is a 60-second exercise that protects the day\'s data from a probe-cable issue invalidating dozens of recorded indications.',
    },
    {
      q: 'Why does the DAC look different in custom-block work vs. standard blocks?',
      a: 'A DAC drawn on the ASME Basic Cal Block (carbon steel SDH at quarter/half/three-quarter T) bakes in the block\'s own attenuation. When you switch to a component with higher attenuation, the on-block DAC underestimates loss in the part. The correction is the transfer-correction technique: measure the back-wall echo amplitude on both block and component at the same path length, take the dB difference, and add it as a gain offset before scanning. Custom blocks fabricated from the same material as the component eliminate transfer correction but cost $600-$3,500 to make. Many shops use a standard block plus a measured transfer correction recorded on the report — both approaches are acceptable per ASME V T-462.4 if documented.',
    },
  ],
  internalLinks: [
    {
      href: '/services/ultrasonic-testing',
      label: 'Ultrasonic Testing',
      context: 'DAC is the universal amplitude reference for conventional UT inspections',
    },
    {
      href: '/services/phased-array-ut',
      label: 'Phased Array UT',
      context: 'PAUT extends DAC into ACG (Angle-Corrected Gain) for sectorial scanning',
    },
    {
      href: '/glossary/a-scan',
      label: 'A-scan',
      context: 'The DAC is overlaid on the A-scan display as the recording threshold',
    },
    {
      href: '/glossary/attenuation',
      label: 'attenuation',
      context: 'DAC slope encodes attenuation plus beam-spread loss across the inspection range',
    },
    {
      href: '/glossary/calibration-block',
      label: 'calibration block',
      context: 'DAC reference points are measured from side-drilled holes in calibration blocks',
    },
    {
      href: '/glossary/angle-beam',
      label: 'angle beam UT',
      context: 'Angle-beam DAC accounts for skip distance and refraction geometry',
    },
    {
      href: '/standards/asme-bpvc-section-v',
      label: 'ASME BPVC Section V',
      context: 'Article 4 T-434 sets DAC construction and reference reflector requirements',
    },
    {
      href: '/standards/aws-d1-1',
      label: 'AWS D1.1 structural welding',
      context: 'D1.1 §6.13 indication rating is computed from DAC reference dB',
    },
    {
      href: '/free-tools/ai-procedure-generator',
      label: 'NDT procedure generator',
      context: 'Generate UT procedures that specify the cal block, DAC points, and acceptance levels',
    },
  ],
  citations: [
    {
      id: 'astm-e1316-dac',
      source: 'ASTM E1316-23, Standard Terminology for Nondestructive Examinations — DAC, distance-amplitude correction',
      url: 'https://www.astm.org/e1316-23.html',
    },
    {
      id: 'asme-v-t434',
      source: 'ASME BPVC Section V, 2023 Edition, Article 4, T-434 — Calibration and standardisation',
    },
    {
      id: 'aws-d1-1',
      source: 'AWS D1.1/D1.1M:2020, Structural Welding Code — Steel, Clause 6 — Ultrasonic acceptance criteria',
    },
    {
      id: 'iso-11666',
      source: 'ISO 11666:2018, Non-destructive testing of welds — Ultrasonic testing — Acceptance levels',
    },
    {
      id: 'krautkramer-dgs',
      source: 'Krautkrämer, J., "Determination of the size of defects by the ultrasonic impulse echo method", British Journal of Applied Physics, vol. 10, 1959',
    },
  ],
};

export default term;
