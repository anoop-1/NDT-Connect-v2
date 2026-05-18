import type { GlossaryLongFormContent } from '../types';

const term: GlossaryLongFormContent = {
  slug: 'a-scan',
  term: 'A-Scan',
  category: 'Ultrasonic Testing',
  metaTitle: 'A-Scan: Definition, Reading, and Sizing in Ultrasonic Testing',
  metaDescription:
    'A-Scan is the amplitude-vs-time UT display. Learn how to read echoes, calibrate DAC, and size flaws from the trace — with worked examples and code citations.',
  heroLede:
    'A-Scan is the one-dimensional ultrasonic display that plots signal amplitude on the vertical axis against time-of-flight (or its converted metal-path distance) on the horizontal axis. It is the foundational UT view every Level II technician interprets in the field, and the only display format that survives unchanged from 1942-era WW2 sonar sets to today\'s phased-array units. Every echo on the screen — initial pulse, surface entry, defect indication, back-wall — corresponds to a reflected pressure wave returning to the transducer.',
  preciseDefinition:
    'A-Scan is a UT display mode showing reflected signal amplitude (vertical) vs. transit time or equivalent material distance (horizontal), produced by a single transmit/receive cycle at one transducer position.[1]',
  alternateNames: ['Amplitude scan', 'A-display', 'A-trace', 'Echo waveform'],
  history:
    'The "A" naming is a wartime convention: A-scan was the first standardised oscilloscope display in 1940s RDF (radar) and sonar work. B and C variants followed when 2D presentations became possible with mechanical scanning. The format carried directly into industrial UT in the late 1940s through Sperry Products and Branson, and remains the regulatory reference display in ASME V Article 4 and ASTM E317.',
  technicalDetail: [
    {
      heading: 'How the trace is generated',
      level: 2,
      paragraphs: [
        'The pulser energises a piezoelectric element with a 100-500 V damped spike. The element radiates a longitudinal or shear wave into the test piece via couplant. Reflections from interfaces (surface, internal flaw, back-wall) return to the same element, generating a voltage proportional to acoustic pressure. The receiver amplifies, rectifies, and time-bases the signal onto the display.',
        'Horizontal scale: t (microseconds) or 2d/c (millimetres) where d = one-way depth and c = material sound velocity. For steel at 5,920 m/s, 1 µs of round-trip time = 2.96 mm of metal path. The display is "calibrated" by aligning known reference points (back-wall, side-drilled hole, V1 block radius) to the correct horizontal position so screen distance reads as metal distance.',
        'Vertical scale: percent full screen height (% FSH) or decibels relative to a reference echo. Gain is adjusted in 1- or 0.1-dB increments to bring the reference echo to a target FSH — typically 80% FSH per ASME V Art. 4 T-462 sensitivity setup.[2]',
      ],
    },
    {
      heading: 'Pulse, gates, and the DAC curve',
      level: 2,
      paragraphs: [
        'Modern flaw detectors overlay measurement "gates" on the A-scan: rectangular zones with a start position, width, and trigger threshold. A gate that fires on any echo crossing its threshold writes that echo\'s amplitude and time to the report log. Two gates (one for back-wall, one for defect zone) handle most weld scans.',
        'A Distance-Amplitude Correction (DAC) curve is drawn on the A-scan to compensate for beam-spread and attenuation losses with depth. The technician records the peak amplitude from a calibration block side-drilled hole at multiple depths, then connects those points. Any indication in the inspection plotted at or above the DAC curve is recordable; the acceptance/rejection threshold per ASME VIII Div 1 UW-53 is typically 50% or 100% DAC.[3]',
        'Time Corrected Gain (TCG) is the same compensation applied to the gain itself: instead of curving the line, the instrument boosts gain dynamically with depth so equal reflectors give equal-height responses. Required by ASME V Article 4 Mandatory Appendix VIII for digital instruments.',
      ],
    },
    {
      heading: 'Reading the trace — typical features',
      level: 2,
      paragraphs: [
        'Initial pulse (IP): the leftmost vertical spike, often saturating the screen — the transmit pulse bleeding into the receiver. The "dead zone" immediately after IP is the depth range where echoes cannot be resolved (typically 3-10 mm for a 5 MHz contact probe).',
        'Surface entry echo: a sharp spike when using a delay line or immersion setup; absent in direct-contact pulse-echo. Used to set the zero point.',
        'Defect indication: an echo between surface and back-wall. Position on the time axis gives depth; height gives reflectivity. Shape (sharp vs. broad) hints at orientation and reflector type — a planar crack gives a sharp narrow echo; porosity clusters give a "grass" of low broad responses.',
        'Back-wall echo (BWE): the strong return from the far surface. Loss of BWE while gain stays constant signals heavy attenuation — coarse-grain austenitic welds, lamination splitting the beam, or transmission loss into a coupling defect.',
      ],
    },
  ],
  workedExample: {
    setup:
      'Pulse-echo UT on a 40 mm steel plate using a 5 MHz, 12 mm diameter normal-incidence contact probe. Calibration: DAC drawn on IIW V1 block with side-drilled holes at 10, 25, and 50 mm depths.',
    calculation:
      'A defect echo appears at 13.5 µs on the calibrated trace. Metal path = (13.5 × 10⁻⁶ s × 5920 m/s) / 2 = 39.96 mm — within rounding, the indication is sitting at the back-wall. Amplitude reads 92% FSH. The 25 mm DAC reference point is at 80% FSH, and the curve has dropped to ~65% FSH by 40 mm depth. The indication is 92% FSH at a DAC level of 65% FSH = approximately +3 dB above DAC.',
    result:
      'Per ASME VIII Div 1 UW-53(b)(2), any indication producing a response greater than the DAC reference line is recordable and must be characterised. Recordable; proceed to characterise (length, depth, orientation) before applying the acceptance criteria.',
  },
  whereItAppears: [
    {
      context: 'Weld inspection of pressure vessel longitudinal seams under ASME VIII Div 1',
      explanation:
        'The technician sweeps an angle beam probe along the toe of the weld. A planar lack-of-fusion at 20 mm depth produces a sharp single-peak echo on the A-scan that rises above DAC as the probe is centred over it. The trace is the primary evidence: position, amplitude, and signal shape are recorded in the inspection report and held for the AI review per UW-51.',
    },
    {
      context: 'Corrosion thickness survey on refinery piping under API 570',
      explanation:
        'A dual-element thickness gauge probe shows two echoes on its A-scan: the surface entry from the OD and the back-wall from the corroded ID. The horizontal distance between echoes is the remaining wall. Sudden BWE drop-out at one CML usually means internal pitting that the gauge has lost into; technicians switch to a wider-band single-element setup and re-read the A-scan in detail.',
    },
    {
      context: 'Phased-array imaging — the A-scan is still the underlying primitive',
      explanation:
        'PAUT sector and linear scans (S-scan, L-scan) are constructed by colour-mapping hundreds of individual A-scans, one per beam angle or aperture position, stacked into the 2D sectorial view. Level II PAUT operators routinely "drop into A-scan" at any cursor position to verify an indication\'s waveform shape — colour images can mislead when grain noise mimics a defect.',
    },
    {
      context: 'Calibration verification at start of shift',
      explanation:
        'ASME V Article 4 T-461 requires the technician to confirm range, sensitivity, and amplitude linearity each shift. The A-scan trace of the V1 block 100 mm radius echo and the 25 mm side-drilled hole is the literal record — printed or screen-captured into the inspection log — that proves the instrument was within spec at the start of work.',
    },
  ],
  relatedTerms: [
    { term: 'B-Scan', slug: 'b-scan' },
    { term: 'C-Scan', slug: 'c-scan' },
    { term: 'DAC Curve', slug: 'dac-curve' },
    { term: 'Attenuation', slug: 'attenuation' },
    { term: 'Calibration Block', slug: 'calibration-block' },
  ],
  faqs: [
    {
      q: 'What is the difference between an A-scan and a B-scan in ultrasonic testing?',
      a: 'An A-scan is a single waveform at one transducer position — amplitude on the vertical axis, time/depth on the horizontal axis, one beam, one snapshot. A B-scan is a cross-sectional image built by sweeping the transducer along a line and stacking many A-scans side by side, with reflector amplitude shown as colour or brightness. The A-scan tells you what is directly below the probe; the B-scan tells you how reflectors are distributed along a scan path. Most ASME and API codes still require A-scan capture as the primary record because every measurement (sizing, depth, amplitude) traces back to an underlying A-scan waveform — B and C images are derived views, not raw data.',
    },
    {
      q: 'How is the horizontal axis of an A-scan converted from time to depth?',
      a: 'The horizontal axis is fundamentally a time scale in microseconds, but flaw detectors display it as one-way metal path using d = (c × t) / 2 for pulse-echo, where c is the sound velocity of the material and t is the round-trip transit time. For carbon steel longitudinal waves at c = 5,920 m/s, every 1 µs of round-trip time equals 2.96 mm of metal depth. The calibration step at the start of every shift is what fixes this conversion: the technician aligns a known reference echo (a 25 mm side-drilled hole, the 100 mm radius of a V1 block) to its known horizontal position on the screen. From that moment on, the screen reads metal distance directly.',
    },
    {
      q: 'Why does a back-wall echo sometimes disappear on the A-scan when the part is clearly intact?',
      a: 'Back-wall loss without a corresponding flaw indication usually means the sound never reached the back-wall or was scattered before returning. Three common causes: coarse-grain attenuation in austenitic stainless or Inconel welds, where grain boundaries scatter 5 MHz energy faster than the wave can complete a round trip; a horizontal lamination splitting the beam at mid-thickness — the beam reflects from the lamination and never reaches the far wall, but the lamination echo itself may be too low to trigger the gate; or poor couplant contact, where the surface entry coupling is so weak that not enough energy gets in. Always confirm by dropping a thickness gauge nearby and verifying with a second probe frequency.',
    },
    {
      q: 'Is the amplitude of an A-scan echo a direct measure of flaw size?',
      a: 'No — and treating it as one is the single most common Level II error. Amplitude is a relative response affected by reflector orientation, surface roughness, beam spread, distance, attenuation, and coupling efficiency. A favourably-oriented 1 mm flaw can give a stronger echo than an unfavourably-oriented 5 mm flaw. Codes therefore require sizing using calibrated techniques: the 6 dB drop method (length), the 20 dB drop method (height), DAC-referenced amplitude comparison, or — for accurate through-wall sizing — TOFD or PAUT tip-diffraction. The A-scan amplitude only flags an indication as recordable; it does not by itself size the flaw.',
    },
    {
      q: 'How long must A-scan records be retained after an inspection?',
      a: 'Retention depends on the governing code. ASME BPVC Section V does not set a universal duration but defers to the referencing construction code: ASME VIII Div 1 UG-99 ties record retention to the life of the vessel for as long as Form U-1 is valid. API 570 §7.4 requires inspection records for piping to be retained for the life of the asset. AWS D1.1 §6.25.1 requires retention for the duration specified by the contract or owner. In practice, refineries and operators keep raw A-scan files and screen captures for 10-25 years on a network drive linked to the equipment ID, because a wall-loss trend can only be plotted from old A-scans alongside new ones.',
    },
  ],
  internalLinks: [
    {
      href: '/services/ultrasonic-testing',
      label: 'Ultrasonic Testing service',
      context: 'A-scan is the primary display format for conventional ultrasonic testing',
    },
    {
      href: '/services/phased-array-ut',
      label: 'Phased Array UT',
      context: 'PAUT sector scans are colour-mapped stacks of underlying A-scans',
    },
    {
      href: '/services/tofd-testing',
      label: 'TOFD inspection',
      context: 'TOFD displays B-scan images but uses A-scan tip-diffraction signals for sizing',
    },
    {
      href: '/glossary/dac-curve',
      label: 'DAC curve',
      context: 'DAC overlays on the A-scan compensate for beam spread with depth',
    },
    {
      href: '/glossary/calibration-block',
      label: 'calibration block',
      context: 'A-scan calibration is set against reference reflectors in IIW V1/V2 blocks',
    },
    {
      href: '/standards/asme-bpvc-section-v',
      label: 'ASME BPVC Section V',
      context: 'Article 4 mandates A-scan record retention for nuclear and pressure-vessel UT',
    },
    {
      href: '/free-tools/ut-thickness-calculator',
      label: 'UT thickness calculator',
      context: 'Convert A-scan time-of-flight to thickness for any material',
    },
    {
      href: '/free-tools/ai-procedure-generator',
      label: 'NDT procedure generator',
      context: 'Auto-build a Level II UT procedure that specifies A-scan capture requirements',
    },
    {
      href: '/industries/oil-and-gas',
      label: 'Oil and gas inspection',
      context: 'A-scan corrosion surveys are the foundation of API 510/570/653 thickness programs',
    },
    {
      href: '/industries/aerospace',
      label: 'aerospace NDT',
      context: 'Aerospace UT specs (NAS 410, AMS 2630) still require raw A-scan retention',
    },
  ],
  citations: [
    {
      id: 'astm-e1316',
      source: 'ASTM E1316-23, Standard Terminology for Nondestructive Examinations, Section B (Ultrasonic) — A-scan definition',
      url: 'https://www.astm.org/e1316-23.html',
    },
    {
      id: 'asme-v-art-4-t462',
      source: 'ASME BPVC Section V, 2023 Edition, Article 4, T-462 — Calibration requirements for amplitude reference and DAC',
    },
    {
      id: 'asme-viii-uw-53',
      source: 'ASME BPVC Section VIII Div 1, 2023 Edition, UW-53 — Ultrasonic examination acceptance criteria',
    },
    {
      id: 'astm-e317',
      source: 'ASTM E317-21, Standard Practice for Evaluating Performance Characteristics of Ultrasonic Pulse-Echo Testing Instruments',
    },
    {
      id: 'asnt-l2-ut',
      source: 'ASNT Level II Study Guide: Ultrasonic Testing, 3rd ed., American Society for Nondestructive Testing, 2020 — Chapter on display formats',
    },
  ],
};

export default term;
