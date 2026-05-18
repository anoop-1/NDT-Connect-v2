import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'ut-thickness',
  name: 'UT Thickness Calculator',
  category: 'ut',
  inputs: [
    { id: 'velocity', label: 'Material sound velocity', unit: 'm/s', type: 'number' },
    { id: 'tof', label: 'Time of flight (round-trip)', unit: 'μs', type: 'number' },
  ],
  outputs: [
    { id: 'thickness_mm', label: 'Wall thickness', unit: 'mm' },
    { id: 'thickness_in', label: 'Wall thickness', unit: 'in' },
  ],
  metaTitle: 'UT Thickness Calculator | Pulse-Echo Wall Thickness',
  metaDescription:
    'Convert ultrasonic time-of-flight to wall thickness in mm and inches. Uses t = (v × Δt) / 2, the pulse-echo equation per ASTM E797 and API 510.',
  heroLede:
    'Punch in the material sound velocity and a measured time-of-flight and this tool returns wall thickness instantly. The math is the pulse-echo equation that sits inside every digital thickness gauge — t = (v × Δt) / 2 — but exposed so an inspector can sanity-check a reading, validate a calibration, or back-calculate velocity from a known step block. Velocity defaults follow ASTM E494 reference values: 5,920 m/s for low-carbon steel, 6,320 m/s for aluminum 6061, 5,790 m/s for 304 stainless, 4,660 m/s for copper.',
  howItWorks:
    'The probe fires a longitudinal pulse, the pulse hits the back wall, reflects, and returns. The flight clock runs round-trip, so the one-way distance is half the total path. Velocity is a material constant at fixed temperature — steel does not get faster at noon. The gauge or scope reports Δt in microseconds; you convert to seconds, multiply by velocity in m/s, divide by 2, and convert metres to millimetres. The same formula governs A-scan cursor placement on a flaw detector and the digital readout on any handheld thickness gauge.',
  formula: 't = (v × Δt) / 2',
  workedExample: {
    inputs: { velocity: 5920, tof: 6.76 },
    outputs: { thickness_mm: '20.01', thickness_in: '0.788' },
    explanation:
      'Carbon steel pipe, longitudinal velocity 5,920 m/s, measured time-of-flight 6.76 μs. Convert μs to s (6.76e-6), multiply by velocity (5,920 × 6.76e-6 = 0.04002 m round-trip), divide by 2 (0.02001 m), convert to mm (20.01 mm). That matches a Schedule 40 NPS 12 pipe (nominal 0.406 in / 10.31 mm) inside a heavier fitting.',
  },
  whenToUse:
    'Use for any pulse-echo thickness reading where you need to verify a digital gauge against first principles, back-out velocity when the material is unknown, or train a new technician on what the device is actually computing under the hood.',
  limitations: [
    'Assumes a single homogeneous material — clad pipe or weld overlay requires multi-layer math.',
    'Temperature shifts velocity. Steel velocity drops about 1 m/s per °C above 20 °C — at 400 °C this is a 1.4% error.',
    'Couplant film, paint, or scale add extra path that the gauge cannot subtract automatically.',
    'Round-trip assumption breaks for surface waves, creeping waves, or angle-beam shear inspections.',
    'Below ~0.5 mm wall, near-field and pulse-width effects dominate and standalone thickness math is unreliable.',
  ],
  relatedTools: [
    { slug: 'snells-law-angle', name: "Snell's Law Refracted Angle" },
    { slug: 'six-db-drop-sizing', name: '6 dB Drop Defect Sizing' },
    { slug: 'cal-block-selector', name: 'Calibration Block Selector' },
    { slug: 'inspection-interval', name: 'Inspection Interval (API 581)' },
  ],
  faqs: [
    {
      q: 'Why divide by two in the UT thickness formula?',
      a: 'A pulse-echo measurement times the round trip — the pulse travels down to the back wall and the echo travels back to the transducer. So the path length recorded by the gauge is twice the wall thickness. Dividing by two gives the one-way distance, which is the physical wall. Through-transmission and tandem techniques use a different geometry and a different math; do not apply the /2 there.',
    },
    {
      q: 'What sound velocity should I use for carbon steel?',
      a: 'ASTM E494 lists 5,920 m/s for typical low-alloy and carbon steels at room temperature. P91 and other ferritic alloys run within 1% of this value. Austenitic stainless (304/316) drops to about 5,790 m/s longitudinally and exhibits strong anisotropy due to columnar grain structure — pick the velocity from a calibration block of the same heat treatment when measurements get below 6 mm wall.',
    },
    {
      q: 'How accurate is a UT thickness reading in the field?',
      a: 'Typical pulse-echo accuracy is ±0.1 mm on smooth, clean carbon steel above 2 mm thickness with a properly calibrated dual-element probe. Rough surfaces, scale, high temperature, and curved geometry below 50 mm diameter degrade accuracy quickly. API 570 §7.1.2 requires recalibration against a known reference block every four hours of survey work to keep readings within ±0.13 mm (0.005 in).',
    },
    {
      q: 'Can I use this tool for cladded or lined pipe?',
      a: 'Not directly. Cladding (overlay weld, roll-bonded, or weld-deposited stainless) creates a velocity discontinuity, and the gauge will see an echo from the bond line as well as from the back wall. For clad assets you need a delay-line probe and either pre-set the gauge to read total wall ignoring the clad echo, or use a multi-zone gate to split clad thickness from base-metal thickness. The single-formula approach here is for monolithic walls only.',
    },
    {
      q: 'Does temperature affect the calculation?',
      a: 'Yes. Steel longitudinal velocity decreases roughly 1 m/s per degree C above ambient. A reading taken on a 400 °C reactor wall using a room-temperature velocity of 5,920 m/s will under-read by about 1.4%. ASNT SNT-TC-1A recommends high-temperature procedures use velocity values measured on a heated reference block at the operating temperature, or apply a correction factor from API 510 Annex E.',
    },
  ],
  citations: [
    { id: 'astm-e797', source: 'ASTM E797/E797M-21 Standard Practice for Measuring Thickness by Manual Ultrasonic Pulse-Echo Contact Method' },
    { id: 'astm-e494', source: 'ASTM E494-20 Standard Practice for Measuring Ultrasonic Velocity in Materials' },
    { id: 'api-510', source: 'API 510, 11th ed. (2022), §7.1.2 Pressure Vessel Inspection Code — Thickness Measurement Locations' },
    { id: 'api-570', source: 'API 570, 5th ed. (2020), §7.1.2 Piping Inspection Code — Thickness Measurements' },
    { id: 'asnt-snt-tc-1a', source: 'ASNT SNT-TC-1A (2020), Personnel Qualification and Certification in NDT' },
  ],
};

export default tool;
