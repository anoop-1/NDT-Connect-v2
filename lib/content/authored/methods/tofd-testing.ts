import type { MethodContent } from '../types';

const method: MethodContent = {
  slug: 'tofd-testing',
  abbreviation: 'TOFD',
  name: 'Time-of-Flight Diffraction',
  metaTitle: 'TOFD Testing: Through-Wall Sizing for Pipe & Vessel Welds',
  metaDescription:
    'Working guide to time-of-flight diffraction — tip-diffraction physics, dead-zone management, ASME V Article 4 Appendix III, and pairing TOFD with PAUT.',
  heroLede:
    'A 24-inch SCH 80 hot-reheat steam header weld at a coal-fired generating station shows a 3 mm-long indication on a phased array S-scan. The plant\'s API 579 fitness-for-service engineer needs through-wall height to within 0.5 mm to make the rerate-or-replace decision before the unit comes back online. A TOFD scan with a 5 MHz 12 mm element pair at 60° refracted angle catches the upper and lower tip diffraction signals from the crack — height read directly from the time-of-flight difference at ±0.3 mm accuracy. TOFD is the gold-standard sizing method for through-wall defect height on planar flaws, and the standard companion to PAUT on every code-substitution job under ASME Code Case 2235.',
  physicsPrimer:
    'TOFD uses two angled longitudinal-wave transducers — one transmit, one receive — placed across the weld on opposite sides. The transmit probe sends a wide-angle longitudinal pulse; the receive probe picks up the lateral wave traveling along the surface, the back-wall echo, and any tip-diffracted signals from defect edges. The time of flight from transmit to receive at each tip gives the defect tip depth: an upper-tip signal arrives later than the lateral wave (defect close to surface) or earlier than the back-wall echo (defect deep in the wall). Through-wall height is the time-of-flight difference between upper and lower tip signals converted to depth via the longitudinal velocity (5,920 m/s in carbon steel). ASME BPVC Section V Article 4 Mandatory Appendix III covers TOFD [1]; ASTM E2373 covers practice [2]; ISO 10863 covers procedure for welds [3]; ASME Code Case 2235 permits TOFD in lieu of RT [4].',
  detectableDefects: [
    'Inter-bead lack of fusion in multi-pass groove welds',
    'Sidewall lack of fusion in narrow-groove welds',
    'Inter-granular stress-corrosion cracking through wall',
    'Hydrogen-induced cracking (HIC) and stress-oriented HIC',
    'Fatigue cracks with tip-diffraction signal',
    'Lack of root penetration with through-wall extent',
    'Creep cavities in high-temperature service welds',
  ],
  materialsAndForms: [
    'Carbon and low-alloy steel piping welds (0.5" to 6" wall)',
    'Pressure vessel circumferential and longitudinal seam welds',
    'Pipeline girth welds (paired with AUT phased array)',
    'Reformer and reactor outlet header welds in high-temperature service',
    'Boiler and HRSG header and pipe welds',
  ],
  whenToChoose:
    'Choose TOFD when through-wall height of a planar defect must be sized accurately — typically as a companion to PAUT or RT for fitness-for-service assessment under API 579. TOFD is the standard sizing technique for crack-like flaws in pipe and vessel welds and the basis for the through-wall measurement that drives engineering critical assessment math. For pipeline AUT under DNV-ST-F101 [5], TOFD covers the centerline of the weld where amplitude-based PAUT sizing struggles.',
  whenNotToChoose:
    'TOFD has two significant dead zones: a near-surface dead zone (typically 0-3 mm below the scan surface) where the lateral wave masks tip-diffraction signals, and a back-wall dead zone (typically 1-2 mm above the back surface) where the back-wall echo masks lower-tip signals. Defects in either dead zone cannot be sized by TOFD alone — they need PAUT or a second TOFD setup at a different beam angle. TOFD is not a standalone volumetric method — it must pair with another method (PAUT, RT, or conventional shear-wave UT) for full coverage. Surface roughness above about 250 µin Ra degrades the lateral wave and back-wall echo, masking tip signals.',
  procedure: [
    {
      heading: 'Procedure qualification and setup geometry',
      level: 2,
      paragraphs: [
        'Procedure qualification under ASME V Article 4 Mandatory Appendix III [1] demonstrates detection and sizing capability on a qualification block with known defects at known locations. The procedure specifies the probe pair (frequency, element size, refracted angle), the probe center separation (PCS), the scan plan (parallel, non-parallel, or combined), the encoder, and the acceptance criteria. ISO 10863 [3] provides parallel European procedure rules.',
        'Probe center separation (PCS) is the distance between the centers of the two probes on the scan surface. PCS is chosen so the beams intersect at the middle of the wall thickness: PCS = 2t·tan(θ) where t is wall thickness and θ is refracted angle. For 25 mm wall at 60° refracted angle, PCS = 86.6 mm. Wider PCS biases coverage to the back wall; narrower PCS biases to the surface. Multi-zone TOFD uses three or four PCS pairs to cover the full wall thickness without dead-zone gaps.',
      ],
    },
    {
      heading: 'Calibration and time-base setup',
      level: 2,
      paragraphs: [
        'Calibration on an IIW Type 1 or a job-specific block with through-wall reference reflectors sets the time-base and verifies the geometric setup. The lateral wave arrival time and the back-wall echo arrival time are measured and used to set the depth scale linearly between them. ASME V T-471 [1] specifies the verification steps and the periodic re-verification frequency (typically every 4 hours of scanning, after any setup change, and at the end of every shift).',
        'Sensitivity is set so the lateral wave amplitude reads 40-80% full screen height per ASME V Appendix III §III-461 [1]. Gain that produces lateral wave saturation will saturate weak tip signals at depth and produce false-clean results; gain that produces lateral wave below 40% will miss tip signals from real defects. The lateral-wave amplitude check happens at the start of every scan line.',
      ],
    },
    {
      heading: 'Scan execution and encoded data',
      level: 2,
      paragraphs: [
        'A TOFD scan runs along the weld axis (parallel scan) at constant probe spacing. An encoder (Olympus mini-wheel, Jireh Skoot) maps scan position to data index so the resulting D-scan image plots probe position vs time. Defects appear as parabolic or hyperbolic arc signals between the lateral wave and back-wall echo, with the upper-tip arc closer to the lateral wave and the lower-tip arc closer to the back wall.',
        'Non-parallel scans (probes translated perpendicular to the weld axis) cover the weld width when the parallel scan flags a long indication. Modern instruments (Olympus OmniScan X3 + TOFD module, Eddyfi M2M Gekko) record both PAUT and TOFD channels simultaneously in a single scan pass, eliminating the second-pass setup time that hand-positioned TOFD used to require.',
      ],
    },
    {
      heading: 'Indication interpretation and depth sizing',
      level: 2,
      paragraphs: [
        'TOFD interpretation reads the D-scan image and identifies the lateral wave, the back-wall echo, and any tip-diffraction signals between them. A defect produces two tip signals: upper tip (closer to scan surface) appears closer to the lateral wave; lower tip (closer to back wall) appears closer to the back-wall echo. The vertical separation between the two tip arcs is the through-wall height of the defect.',
        'Depth is read from the time of flight relative to the lateral wave (depth = (TOFtip - TOFlateral) × VL / 2 where VL is longitudinal velocity). Height accuracy is typically ±0.3-0.5 mm for defects greater than 2 mm tall, which feeds directly into API 579 [6] Level 1 and Level 2 fitness-for-service assessments. For tight defects under 2 mm tall, the two tip signals merge into a single arc and TOFD loses height resolution — PAUT or AUT zone-discriminated arrays handle these.',
      ],
    },
    {
      heading: 'Dead-zone management',
      level: 2,
      paragraphs: [
        'Near-surface dead zone: the lateral wave dominates the top 1-3 mm of the wall, masking tip signals from surface-breaking or near-surface defects. Surface-breaking defects show as a perturbation of the lateral wave itself — a phase reversal or amplitude drop. A second TOFD setup with a steeper refracted angle (70-75°) reduces the near-surface dead zone but introduces back-wall coverage limitations.',
        'Back-wall dead zone: the back-wall echo dominates the bottom 1-2 mm of the wall, masking lower-tip signals from defects near the back surface. A shallower refracted angle (45-50°) reduces the back-wall dead zone. Multi-zone TOFD setups stack two or three PCS pairs at different angles to cover the full wall thickness without dead-zone gaps. ASME V Appendix III §III-432 [1] gives the multi-zone setup rules for thick-section work.',
      ],
    },
    {
      heading: 'Reporting and pairing with PAUT/RT',
      level: 2,
      paragraphs: [
        'The TOFD report names the procedure, PCS, refracted angle, frequency, element size, calibration record, every indication with location, length, upper-tip depth, lower-tip depth, through-wall height, and disposition. D-scan image exports accompany every reportable indication. ASME V Appendix III §III-490 [1] specifies the required report content.',
        'TOFD pairs with PAUT for code-substitution work under ASME Code Case 2235 [4]. PAUT carries primary detection across the angular range; TOFD carries through-wall sizing on flagged indications. The combined report cites both methods and the procedures. For pipeline AUT under ISO 13588 [7] or DNV-ST-F101 [5], TOFD covers the weld centerline that zone-discriminated PAUT arrays miss.',
      ],
    },
  ],
  equipment: [
    {
      heading: 'TOFD instruments and probes',
      level: 2,
      paragraphs: [
        'Most modern PAUT instruments (Olympus OmniScan X3, Eddyfi M2M Gekko, Sonatest Veo+) include a TOFD acquisition module that records the probe pair waveform alongside the PAUT focal laws. Standalone TOFD instruments are rare today — the integrated PAUT+TOFD workflow dominates.',
        'Probe pairs are matched in frequency, element size, and refracted angle. Typical pairs: 5 MHz, 6 mm element, 60° refracted (for 10-25 mm wall); 5 MHz, 12 mm element, 60° refracted (for 25-50 mm wall); 2.25 MHz, 20 mm element, 45° refracted (for 50-100 mm wall). Manufacturers (Olympus, Eddyfi, Sonatest) supply matched pairs with certificates of conformance.',
      ],
    },
    {
      heading: 'Wedges and encoders',
      level: 2,
      paragraphs: [
        'Longitudinal-wave wedges (typically Rexolite at 60° refracted angle) come matched to the probe size and frequency. Wedge wear changes the refracted angle and biases depth measurements; weekly verification against the IIW V1 block radius reflector catches drift early.',
        'Encoders (Olympus mini-wheel, Jireh Skoot, Sonatest Wheely) map probe position to data index. For pipeline AUT, the mechanized crawler provides position feedback to the instrument over the umbilical. Encoder resolution is typically 12-25 counts per mm.',
      ],
    },
    {
      heading: 'Calibration blocks',
      level: 2,
      paragraphs: [
        'Standard TOFD calibration uses an IIW Type 1 (V1) block for time-base setup, plus a job-specific block of production material with through-wall reference reflectors (typically EDM notches at 25%, 50%, 75% wall depth) for sizing verification. ASME V Appendix III [1] requires the block to be the same material and thickness as production within procedure-qualified limits.',
        'For high-temperature service work, the calibration block is sometimes machined from a production weld coupon and includes representative weld geometry. The block ships in the procedure binder with NIST-traceable dimensional verification and a Level III sign-off.',
      ],
    },
  ],
  codesAndStandards: [
    { id: 'asme-v-app-iii', source: 'ASME BPVC Section V (2023), Article 4 Mandatory Appendix III — Time-of-Flight Diffraction' },
    { id: 'astm-e2373', source: 'ASTM E2373/E2373M-23 — Standard Practice for Use of the Ultrasonic Time-of-Flight Diffraction (TOFD) Technique' },
    { id: 'iso-10863', source: 'ISO 10863:2020 — Non-destructive testing of welds — Ultrasonic testing — Use of time-of-flight diffraction technique' },
    { id: 'asme-cc-2235', source: 'ASME Code Case 2235-15 — Use of Ultrasonic Examination in Lieu of Radiography' },
    { id: 'dnv-st-f101', source: 'DNV-ST-F101 (2021) — Submarine Pipeline Systems, Sec.10 AUT' },
    { id: 'api-579', source: 'API 579-1/ASME FFS-1 (2021), Part 9 — Assessment of Crack-Like Flaws' },
    { id: 'iso-13588', source: 'ISO 13588:2019 — Ultrasonic testing — Automated phased array technology' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Qualification and Certification of NDT Personnel' },
    { id: 'iso-15626', source: 'ISO 15626:2018 — Time-of-flight diffraction technique — Acceptance levels' },
  ],
  acceptanceCriteria:
    'For TOFD-in-lieu-of-RT under ASME Code Case 2235 [4], acceptance follows the equivalent construction-code RT workmanship limits. Crack-like indications are rejectable regardless of length under most construction codes. ISO 15626:2018 [9] provides parallel European acceptance levels with explicit dimensional thresholds keyed to wall thickness — for a 20 mm wall ferritic steel weld, ISO 15626 Acceptance Level 2 allows planar indications up to 3 mm height and 25 mm length cumulative per 100 mm of weld. For fitness-for-service work under API 579 [6], the TOFD-measured flaw height feeds directly into the Level 1 or Level 2 ECA, with engineering decisions on continued operation, repair, or rerate. Indications that fall in the near-surface or back-wall dead zones must be re-inspected by PAUT or by a second TOFD setup at a different beam angle before acceptance can be declared.',
  comparisonAgainst: [
    { method: 'Phased Array UT (PAUT)', tradeoff: 'PAUT gives angular and aperture coverage TOFD lacks, and detects defects in the TOFD dead zones, but amplitude-based PAUT sizing is less accurate than TOFD tip diffraction for tall planar flaws.' },
    { method: 'Conventional UT', tradeoff: 'Conventional shear-wave UT amplitude sizing is less accurate than TOFD by a factor of 2-3 for through-wall height on planar defects.' },
    { method: 'Radiographic Testing (RT)', tradeoff: 'RT shows the X-Y projection of a defect but cannot resolve through-wall depth; TOFD pairs with RT or replaces it for the height dimension that API 579 needs.' },
    { method: 'TFM/FMC', tradeoff: 'TFM gives high-resolution images and good tip detection in many geometries, but TOFD remains the reference standard for through-wall height sizing in API 579 assessments.' },
  ],
  costRange: {
    unit: 'USD per linear foot of weld scanned (Gulf Coast crew, 2025)',
    low: 10,
    high: 30,
    mid: 18,
  },
  faqs: [
    {
      q: 'How accurate is TOFD through-wall height sizing?',
      a: 'For defects greater than about 2 mm tall, TOFD height accuracy is typically ±0.3-0.5 mm when the calibration is current and the analyst is qualified to ASNT Level II TOFD [8]. The accuracy comes from the geometric precision of measuring time-of-flight differences between the upper-tip and lower-tip diffraction signals. Below 2 mm tall, the two tip signals merge into a single arc and TOFD loses height resolution — PAUT or AUT zone-discriminated arrays handle smaller defects. For API 579 [6] fitness-for-service work, the TOFD-measured height feeds the Level 1 or Level 2 ECA directly without further conversion.',
    },
    {
      q: 'Can TOFD detect surface-breaking defects?',
      a: 'TOFD detects surface-breaking defects as a perturbation of the lateral wave — typically a phase reversal or amplitude drop at the defect location. The defect height cannot be sized from TOFD alone because the upper tip merges into the lateral wave (the surface itself). A second TOFD setup with a steeper refracted angle (70-75°) shrinks the near-surface dead zone, or PAUT shear-wave handles the surface zone in parallel. ASME V Appendix III §III-432 [1] explicitly notes the surface-breaking limitation and requires complementary methods for full coverage on procedures that include surface defects.',
    },
    {
      q: 'Why pair TOFD with PAUT instead of using either alone?',
      a: 'PAUT gives angular and aperture coverage across the weld bevel — it catches a wide range of defect orientations and provides indication length and amplitude. TOFD gives the most accurate through-wall height on tall planar defects via tip diffraction. PAUT alone is weaker at through-wall sizing on tall cracks; TOFD alone has dead zones at the top and bottom of the wall. The pair covers each other\'s weaknesses, which is why ASME Code Case 2235 [4] and ISO 13588 [7] both recognize the combined methodology as the highest-confidence alternative to RT. Modern instruments record both channels in a single scan pass.',
    },
    {
      q: 'What certification does a TOFD technician need?',
      a: 'ASNT CP-189 [8] and SNT-TC-1A recognize TOFD as a UT method extension similar to PAUT. The technician must hold UT Level II as the foundation, plus method-specific TOFD training (typically 40 hours classroom plus 240 hours on-the-job for direct employer certification) and a practical exam on a TOFD instrument. Most Gulf Coast operators require qualification on the production geometry before independent work — procedure qualification is in addition to personnel certification. The international equivalent is ISO 9712 Level 2 TOFD, harmonized for offshore and EU jurisdictions.',
    },
    {
      q: 'How does TOFD handle thick-section welds?',
      a: 'For wall thickness above about 50 mm, a single TOFD probe pair cannot cover the full wall without significant dead zones. Multi-zone TOFD stacks two or three probe pairs at different PCS (probe center separation) and refracted angles to cover the wall in zones: a shallow-angle pair (45°) handles the near-back-wall zone, a mid-angle pair (60°) handles the middle, and a steep-angle pair (70°+) handles the near-surface zone. ASME V Appendix III §III-432 [1] gives the multi-zone rules. For very thick sections (>100 mm), the procedure may also use lower frequencies (1-2 MHz) to penetrate the wall.',
    },
  ],
  internalLinks: [
    { href: '/methods/phased-array-ut', label: 'Phased Array UT', context: 'PAUT pairs with TOFD on every Code Case 2235 procedure for full weld coverage.' },
    { href: '/methods/ultrasonic-testing', label: 'Conventional UT', context: 'Conventional shear-wave UT covers areas TOFD cannot when PAUT is not available.' },
    { href: '/methods/radiographic-testing', label: 'Radiographic Testing', context: 'TOFD pairs with RT or substitutes for it under Code Case 2235 for high-confidence sizing.' },
    { href: '/industries/oil-and-gas', label: 'Oil & Gas inspection', context: 'TOFD is the standard sizing method for in-service crack indications in refinery and petrochemical service.' },
    { href: '/industries/pipeline', label: 'Pipeline construction', context: 'TOFD covers the weld centerline that zone-discriminated AUT arrays miss on offshore pipeline girth welds.' },
    { href: '/standards/asme-v', label: 'ASME BPVC Section V', context: 'Article 4 Appendix III of Section V governs every TOFD procedure on ASME-stamped equipment.' },
    { href: '/standards/api-579', label: 'API 579 / ASME FFS-1', context: 'TOFD through-wall height measurements feed directly into API 579 fitness-for-service assessments.' },
    { href: '/tools/tofd-pcs-calculator', label: 'TOFD PCS calculator', context: 'Compute probe center separation for any wall thickness and refracted angle.' },
    { href: '/compare/paut-vs-tofd', label: 'PAUT vs TOFD', context: 'Decision matrix and pairing strategy for phased array and TOFD.' },
  ],
  citations: [
    { id: 'asme-v-app-iii', source: 'ASME BPVC Section V (2023), Article 4 Mandatory Appendix III — Time-of-Flight Diffraction' },
    { id: 'astm-e2373', source: 'ASTM E2373/E2373M-23 — Standard Practice for Time-of-Flight Diffraction (TOFD)' },
    { id: 'iso-10863', source: 'ISO 10863:2020 — Time-of-flight diffraction technique for welds' },
    { id: 'asme-cc-2235', source: 'ASME Code Case 2235-15 — Use of Ultrasonic Examination in Lieu of Radiography' },
    { id: 'dnv-st-f101', source: 'DNV-ST-F101 (2021) — Submarine Pipeline Systems' },
    { id: 'api-579', source: 'API 579-1/ASME FFS-1 (2021), Part 9 — Assessment of Crack-Like Flaws' },
    { id: 'iso-13588', source: 'ISO 13588:2019 — Automated phased array technology' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Qualification and Certification of NDT Personnel' },
    { id: 'iso-15626', source: 'ISO 15626:2018 — TOFD technique — Acceptance levels' },
  ],
};

export default method;
