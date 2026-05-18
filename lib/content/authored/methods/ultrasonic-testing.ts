import type { MethodContent } from '../types';

const method: MethodContent = {
  slug: 'ultrasonic-testing',
  abbreviation: 'UT',
  name: 'Ultrasonic Testing',
  metaTitle: 'Ultrasonic Testing (UT): Procedures, Probes, Acceptance',
  metaDescription:
    'Working inspectors guide to ultrasonic testing — pulse-echo physics, dual-element thickness, shear-wave weld scans, ASME V Article 4, and real cost ranges.',
  heroLede:
    'A 24-inch crude line on a Houston Ship Channel dock thins from the inside as water drops out under low-flow conditions. The operator cannot tear it apart to look — UT does the looking for them. A 5 MHz dual-element probe coupled with glycerin reads remaining wall to 0.001 inch through paint, and a shear-wave scan of the next girth weld flags a 3 mm lack of fusion that a magnetic particle test on the cap would have missed entirely. Pulse-echo ultrasonics carries more of the world\'s pressure-equipment integrity decisions than any other NDT method, and most of the failures we see in the field come from operators skipping the calibration block, not the physics.',
  physicsPrimer:
    'Ultrasonic testing sends a short mechanical pulse — typically 0.5 to 25 MHz — into a part through a piezoelectric transducer and listens for the echo. The pulse travels at the bulk longitudinal velocity of the material (5,920 m/s in carbon steel, 6,320 m/s in aluminum, 3,230 m/s for shear in steel) and reflects from any acoustic-impedance mismatch — a back wall, a lack-of-fusion plane, a hydrogen-induced crack, or a corrosion pit. Time-of-flight gives depth; amplitude relative to a calibration reflector gives an estimate of size; signal shape distinguishes a planar reflector from a volumetric one. ASME BPVC Section V, Article 4 lays out the calibration, scanning, and recording rules for weld examination [1]; ASTM E114 covers straight-beam contact testing [2]; ASTM E797 governs hand-held thickness measurement [3]. The whole method rests on coupling the transducer to the part with a thin film of gel, oil, or glycerin so the pulse actually transfers into the steel instead of bouncing off the air gap.',
  detectableDefects: [
    'Lack of fusion in groove welds (planar, oriented to scan plane)',
    'Hydrogen-induced cracking (HIC) in sour-service line pipe',
    'Stress-corrosion cracking (SCC) in carbon and stainless steel',
    'Internal corrosion pitting and general wall loss',
    'Lamination and inclusions in plate and forgings',
    'Incomplete penetration and root cracks in butt welds',
    'Inter-granular attack and creep cavities in high-temperature service',
    'Hydrogen blistering in pressure-vessel cladding',
  ],
  materialsAndForms: [
    'Carbon and low-alloy steel plate, pipe, forgings, castings',
    'Austenitic stainless steel (with coarse-grain scattering caveats)',
    'Nickel alloys (Inconel 625, 825, 718) for offshore risers and reactors',
    'Aluminum and titanium plate for aerospace structures',
    'Duplex and super-duplex stainless steel for subsea piping',
  ],
  whenToChoose:
    'Choose UT when you need volumetric inspection of welds or wall, when the part is too thick or geometry too tight for RT, when radiation-source logistics or population exposure rules out gamma work, or when you need an immediate field result rather than a 24-hour film turnaround. For thickness surveys on in-service equipment, UT is almost always the default — API 510 §6.4.1 expects UT thickness data at every external inspection of a pressure vessel [4].',
  whenNotToChoose:
    'UT struggles on coarse-grained austenitic welds where back-scatter swamps the signal, on parts thinner than roughly 1 mm where dead-zone hides the indication, and on highly attenuative materials like cast iron or wet ceramic-lined pipe. Surface roughness above about 250 µin Ra kills coupling. If you cannot grind the cap of a weld smooth, expect to switch to RT or PAUT with a flexible array. Branch connections smaller than 2-inch nominal and complex geometry like nozzle-to-shell intersections often defeat single-element shear-wave work and demand phased array.',
  procedure: [
    {
      heading: 'Scope and procedure qualification',
      level: 2,
      paragraphs: [
        'Every UT job starts with a written procedure qualified against the governing code. For new-construction pressure piping under ASME B31.3, the procedure references ASME BPVC Section V, Article 4 [1] and lists the search-unit frequency, beam angle, calibration block, reference reflector, scanning pattern, and recording level. Section V demands procedure qualification on a mockup that matches the production part within thickness and material category. Skip this and the AI (Authorized Inspector) will reject every report on the job.',
        'For in-service work the procedure cites the inspection code — API 510 for pressure vessels, API 570 for piping, API 653 for above-ground storage tanks. Each code points back to Section V for the technique itself but adds its own thickness-survey grid spacing, CML (condition monitoring location) selection, and acceptance criteria. The procedure also names the SNT-TC-1A or ANSI/ASNT CP-189 [5] qualification of the technician performing the work and the Level III who wrote and signed the procedure.',
      ],
    },
    {
      heading: 'Calibration block selection',
      level: 2,
      paragraphs: [
        'For pulse-echo thickness on carbon steel, a five-step wedge block (0.100" to 0.500") or an IIW Type 1 (V1) block sets the sweep and gain. The block must be the same material and heat-treat condition as the part — calibrating on 1018 cold-rolled and shooting a Q&T 4140 forging will throw thickness readings off by several percent. For shear-wave weld scans, an IIW Type 2 (V2) or a job-specific block with side-drilled holes and notches at known depths sets the angle, sensitivity, and depth gates.',
        'NAVSEA T9074-AS-GIB-010/271 and ASME Section V both require the block to be calibrated against a national standard and re-verified at intervals stated in the procedure [1]. In practice, technicians block-check at the start of every shift, after any cable swap, after a probe drop, and at the end of the shift. A failed verification voids every reading taken since the last good check.',
      ],
    },
    {
      heading: 'Coupling and contact preparation',
      level: 2,
      paragraphs: [
        'Surface prep drives more rejected UT scans than any other single factor. The scan path must be free of loose scale, weld spatter, paint flakes, and standing water. For thickness work through coatings, a verified coating-thickness gauge reading lets the inspector subtract the coating from the gross reading, but ASTM E797 [3] warns that delaminated coatings give phantom back-wall echoes that look like wall loss. Pull a 6-inch test strip of paint with a putty knife on every survey just to confirm the substrate condition.',
        'Couplant choice matches the temperature and the orientation. Glycerin works to about 150°F, propylene glycol to 200°F, and high-temp ultrasonic couplant (Magnaflux Ultragel II, Sonotech Soundsafe) to 700°F for short-duration shots. On overhead and vertical surfaces the couplant must be viscous enough to stay under the probe — water-thin couplant on a vertical line gives intermittent loss-of-back-wall that mimics a real indication.',
      ],
    },
    {
      heading: 'Scanning pattern and indexing',
      level: 2,
      paragraphs: [
        'For a full-volume weld scan to ASME V Article 4, the technician runs two scan patterns from each accessible side of the weld: a longitudinal raster looking for transverse cracks, and a transverse raster looking for axial and planar discontinuities. Scan speed cannot exceed 6 inches per second per Section V [1], and overlap between successive scan lines must be at least 10% of the active element width. Faster scans miss indications by aliasing them between gate triggers.',
        'For a CML thickness survey the grid is typically 1-inch on small-bore piping and 6-inch on vessel shells, with denser grids around dead-legs, injection points, and elbows. API 570 §7.1.6.4 [6] requires four readings minimum at each CML for piping — top, bottom, two sides — and any reading more than 20% below the design minimum triggers an immediate engineering review.',
      ],
    },
    {
      heading: 'Indication sizing and recording',
      level: 2,
      paragraphs: [
        'Sizing methods follow the code. ASME B31.3 references the workmanship criteria of ASME V for amplitude-based sizing — a reflector greater than 50% of the distance-amplitude-correction (DAC) curve gets recorded; greater than 100% DAC is a defect for normal-service piping. For fitness-for-service work under API 579-1/ASME FFS-1 [7], the inspector reports actual flaw height and length using 6 dB drop or tip-diffraction methods rather than amplitude, because the engineering critical assessment needs real dimensions.',
        'Recording goes into the digital data file (UT1 or UTX format on most modern instruments — Olympus Epoch 650, Sonatest Veo+, GE USM Go+) with the scan plan, gain settings, calibration record, and indication map. Paper-only records are unacceptable on any ASME B31.3 or API-coded job today; the AI will demand the raw scan file.',
      ],
    },
    {
      heading: 'Reporting and disposition',
      level: 2,
      paragraphs: [
        'The final report names the procedure number, revision, code edition, technician name and certification level, instrument serial number, calibration block ID, search unit details (frequency, size, angle), couplant, temperature, scan plan, and every reportable indication with location, depth, length, height, and amplitude or sizing method. ASME V §T-490 [1] lists every required field — most modern reporting software (Atlantis NDT Reporting, Sonatest Wave) templates these in automatically.',
        'Disposition routes the part for repair, accept, or fitness-for-service evaluation. For new-construction welds, any defect greater than the workmanship limit goes back to the welder for excavation and repair, with the repair re-inspected at full sensitivity. For in-service findings the report goes to the inspection engineer for an API 579 Level 1 or 2 assessment before any decision on continued operation, repair, or replacement.',
      ],
    },
  ],
  equipment: [
    {
      heading: 'Flaw detectors and thickness gauges',
      level: 2,
      paragraphs: [
        'The workhorse field instrument across US Gulf Coast inspection contractors is the Olympus Epoch 650 — A-scan flaw detector with DAC/TCG, AWS D1.1 weld-scan software, and ruggedized for 14°F to 122°F operation. Sonatest Veo+ and GE USM Go+ cover the same role with comparable performance. For pure thickness work, the Olympus 38DL Plus and Dakota MX-5 dual-element gauges measure 0.020" to 25" of steel with 0.001" resolution and through-coat compensation.',
        'Calibration of the instrument itself is annual against NIST-traceable standards per ANSI/ASNT CP-189 [5]. The cert sticker on the side of the box gets checked at every job mobilization — an expired cal sticker voids the entire job\'s data.',
      ],
    },
    {
      heading: 'Search units (probes)',
      level: 2,
      paragraphs: [
        'Probe selection drives the result. For pulse-echo thickness on 0.1" to 2" steel: 5 MHz, 0.25" diameter dual-element (Olympus D790 or equivalent). For shear-wave weld scans on 0.25" to 2" wall: 2.25 MHz, 0.5" square, 45°/60°/70° angle on a Lucite or Rexolite wedge. For thick-section forgings: 1 MHz, 1" diameter longitudinal. Each probe is verified against the cal block at job start; element delamination (visible as a soft spot in the wear face) retires the probe immediately.',
        'Wedges wear. A 70° wedge that has dragged across 200 feet of weld cap may now read 67°, putting every indication at the wrong depth. Check the wedge angle weekly against the IIW V1 block radius reflector. Replace at any deviation greater than 1°.',
      ],
    },
    {
      heading: 'Couplant and consumables',
      level: 2,
      paragraphs: [
        'Standard couplant for ambient work is Sonotech Sonotrace Type 30 or Magnaflux Ultragel II. For potable-water service or food-contact equipment, use NSF/ANSI 61-listed couplant — propylene glycol-based, not glycerin. For nuclear work, low-sulfur and low-halide couplant is mandatory under ASME III NCA-5400; the certificate of analysis from the lot ships with the job package.',
        'Test blocks travel with the technician — IIW V1, IIW V2, a step wedge, and any job-specific block built from production material. NIST traceability documents for each block live in the procedure binder and get presented to the client at audit.',
      ],
    },
  ],
  codesAndStandards: [
    { id: 'asme-v-art-4', source: 'ASME BPVC Section V (2023), Article 4 — Ultrasonic Examination Methods for Welds' },
    { id: 'astm-e114', source: 'ASTM E114-20 — Standard Practice for Ultrasonic Pulse-Echo Straight-Beam Contact Testing' },
    { id: 'astm-e797', source: 'ASTM E797/E797M-21 — Standard Practice for Measuring Thickness by Manual Ultrasonic Pulse-Echo Contact Method' },
    { id: 'api-510', source: 'API 510, 11th ed. (2022), §6.4.1 — Inspection Plan' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Standard for Qualification and Certification of NDT Personnel' },
    { id: 'api-570', source: 'API 570, 5th ed. (2024), §7.1.6.4 — Thickness Measurement Locations' },
    { id: 'api-579', source: 'API 579-1/ASME FFS-1 (2021), Part 4 — Assessment of General Metal Loss' },
    { id: 'iso-17640', source: 'ISO 17640:2018 — Non-destructive testing of welds — Ultrasonic testing — Techniques, testing levels, and assessment' },
    { id: 'asme-b31-3', source: 'ASME B31.3 (2022), §344.6 — Ultrasonic Examination of Welds' },
  ],
  acceptanceCriteria:
    'For new-construction welds under ASME B31.3 normal fluid service, any indication exceeding 100% of the reference DAC is rejectable, and any indication 50-100% DAC requires evaluation against the workmanship table — linear indications longer than 0.25" are rejectable regardless of amplitude [9]. For category D service the threshold relaxes, for severe cyclic service it tightens. API 510 in-service criteria for pressure vessel walls allow continued operation if remaining thickness exceeds the t-min calculated under ASME VIII Division 1 UG-27, with corrosion-rate-based remaining-life calculations driving the next inspection date [4]. API 579 fitness-for-service overrides workmanship criteria with engineering-critical-assessment math when a defect is found in service — a 0.5"-deep crack-like flaw in a 2"-wall vessel may still be acceptable for 5 more years of operation if the assessment shows adequate margin against brittle and ductile failure.',
  comparisonAgainst: [
    { method: 'Radiographic Testing (RT)', tradeoff: 'RT gives a permanent film record and detects volumetric defects regardless of orientation, but exposes workers to ionizing radiation, requires evacuation, and runs 5-10× slower per linear foot than UT for thick sections.' },
    { method: 'Phased Array UT (PAUT)', tradeoff: 'PAUT replaces conventional UT for complex geometry, coarse-grained austenitic welds, and where electronic beam steering eliminates multiple probe swaps — but capex is 4-5× higher and procedure qualification is heavier.' },
    { method: 'Magnetic Particle Testing (MT)', tradeoff: 'MT finds surface and slightly subsurface cracks on ferromagnetic material faster and cheaper than UT, but cannot size volumetric defects or measure remaining wall.' },
    { method: 'TOFD', tradeoff: 'TOFD pairs well with UT for high-accuracy through-wall sizing of planar defects, but suffers from dead zones at the top and bottom surfaces and cannot stand alone for full-volume coverage.' },
  ],
  costRange: {
    unit: 'USD per linear foot of weld scanned (Gulf Coast, 2025)',
    low: 4,
    high: 12,
    mid: 7,
  },
  faqs: [
    {
      q: 'How thin a wall can hand-held UT reliably measure?',
      a: 'Standard 5 MHz dual-element probes reliably measure down to about 0.040" of steel. Below that the dead zone of the transducer obscures the back-wall echo. For thinner material — heat-exchanger tubes at 0.025" or aerospace skins at 0.020" — switch to a high-frequency (15-20 MHz) delay-line single-element probe or to immersion testing. ASTM E797 §6.4 [3] specifies the minimum thickness any given probe and gauge combination can measure, and the technician should verify the limit on a calibrated step block before trusting any reading.',
    },
    {
      q: 'Why do my UT readings drift when scanning over paint?',
      a: 'Paint and coatings present an acoustic-impedance mismatch that produces echoes at the paint-steel interface. A coated-thickness mode gauge subtracts the coating thickness from the gross reading, but only works when the coating is well-bonded. A delaminated or blistered coating gives phantom echoes that read as wall loss. Always grind a 2-inch test patch at the start of a coated-survey job, compare bare vs. coated readings on the same spot, and document the offset in the procedure. ASTM E797 §X1.4 [3] discusses through-coat measurement limits in detail.',
    },
    {
      q: 'Does UT qualify under SNT-TC-1A or CP-189?',
      a: 'Both. SNT-TC-1A is a recommended practice — the employer writes the written practice that adopts it. CP-189 (ANSI/ASNT CP-189-2020) [5] is a standard with mandatory provisions; many nuclear and aerospace clients require CP-189 over SNT-TC-1A because it adds objective exam requirements and tighter recertification rules. The international equivalent is ISO 9712, which is harmonized across the EU and most of Asia. A US technician with SNT-TC-1A UT Level II will need a bridge exam to operate under ISO 9712 jurisdiction on an offshore platform in the North Sea.',
    },
    {
      q: 'When does a job require PAUT instead of conventional UT?',
      a: 'Three triggers force PAUT: complex geometry (nozzle welds, branch connections, small-bore tees), thick sections where multiple wedge angles are needed (>2" wall typically), and coarse-grained austenitic or duplex welds where conventional shear-wave loses signal-to-noise. PAUT also delivers permanent S-scan and merged-data records that conventional A-scan cannot, which makes audit and re-evaluation faster. ASME BPVC Section V Article 4 Mandatory Appendix VIII [1] and Code Case 2235 govern PAUT in lieu of RT for many ASME VIII and B31.3 applications.',
    },
    {
      q: 'How often must UT equipment and personnel be recertified?',
      a: 'Instrument calibration is annual against NIST-traceable standards. Cal blocks are typically verified every 2-5 years depending on use. Personnel under SNT-TC-1A recertify every 5 years for Levels I and II, every 5 years with continuing experience for Level III. CP-189 holds the same intervals but requires documented annual visual acuity and an objective practical re-exam at recertification. For nuclear work, ASME III NCA-5400 imposes additional employer-administered annual evaluation [5].',
    },
  ],
  internalLinks: [
    { href: '/methods/phased-array-ut', label: 'Phased Array UT', context: 'When weld geometry or coarse grain defeats conventional UT, switch to phased array UT.' },
    { href: '/methods/tofd-testing', label: 'TOFD', context: 'Pair UT with TOFD for through-wall sizing accuracy on planar defects.' },
    { href: '/methods/ultrasonic-thickness-measurement', label: 'UT thickness measurement', context: 'For pure wall-loss surveys see the dedicated UT thickness procedure.' },
    { href: '/industries/oil-and-gas', label: 'Oil & Gas inspection', context: 'UT is the default volumetric method across upstream, midstream, and refining.' },
    { href: '/industries/petrochemical', label: 'Petrochemical inspection', context: 'Refinery turnarounds rely on UT for vessel and piping integrity.' },
    { href: '/standards/asme-v', label: 'ASME BPVC Section V', context: 'Section V Article 4 governs ultrasonic weld examination procedure qualification.' },
    { href: '/standards/api-510', label: 'API 510', context: 'API 510 mandates the inspection plan that drives UT thickness frequency.' },
    { href: '/tools/ut-thickness-corrosion-rate', label: 'Corrosion-rate calculator', context: 'Convert two UT thickness reads into a remaining-life estimate.' },
    { href: '/tools/dac-curve-builder', label: 'DAC curve builder', context: 'Generate a distance-amplitude-correction curve from your calibration block data.' },
    { href: '/compare/ut-vs-rt', label: 'UT vs RT', context: 'Decision matrix for choosing between ultrasonic and radiographic testing.' },
  ],
  citations: [
    { id: 'asme-v-art-4', source: 'ASME BPVC Section V (2023), Article 4 — Ultrasonic Examination Methods for Welds' },
    { id: 'astm-e114', source: 'ASTM E114-20 — Standard Practice for Ultrasonic Pulse-Echo Straight-Beam Contact Testing' },
    { id: 'astm-e797', source: 'ASTM E797/E797M-21 — Standard Practice for Measuring Thickness by Manual Ultrasonic Pulse-Echo Contact Method' },
    { id: 'api-510', source: 'API 510, 11th ed. (2022), §6.4.1 — Inspection Plan' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Standard for Qualification and Certification of NDT Personnel' },
    { id: 'api-570', source: 'API 570, 5th ed. (2024), §7.1.6.4 — Thickness Measurement Locations' },
    { id: 'api-579', source: 'API 579-1/ASME FFS-1 (2021), Part 4 — Assessment of General Metal Loss' },
    { id: 'iso-17640', source: 'ISO 17640:2018 — Non-destructive testing of welds — Ultrasonic testing' },
    { id: 'asme-b31-3', source: 'ASME B31.3 (2022), §344.6 — Ultrasonic Examination of Welds' },
  ],
};

export default method;
