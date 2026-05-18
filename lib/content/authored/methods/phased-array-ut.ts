import type { MethodContent } from '../types';

const method: MethodContent = {
  slug: 'phased-array-ut',
  abbreviation: 'PAUT',
  name: 'Phased Array Ultrasonic Testing',
  metaTitle: 'Phased Array UT (PAUT): Procedures, Wedges, Code Case 2235',
  metaDescription:
    'Working guide to phased array UT — focal laws, S-scan and E-scan, ASME Code Case 2235 substitution for RT, ASME V Article 4 Appendix V, and real cost ranges.',
  heroLede:
    'A 6-inch SCH XXS hydrogen reformer riser weld in a refinery turnaround needs volumetric inspection. RT is off the table — the shutdown crew cannot be evacuated and the 4-inch wall demands a 90-minute Ir-192 exposure per shot. Conventional shear-wave UT cannot cover the bevel angles in a single scan. PAUT solves both problems: an Olympus OmniScan X3 with a 32-element 5 MHz probe on a wedge sweeps 40°-70° electronically, captures the full weld volume in one raster pass, and delivers an S-scan image that goes to the AI for code-acceptance review without a single curie of source activity. Phased array UT is now the dominant volumetric method on new-construction and in-service weld work across the Gulf Coast and offshore.',
  physicsPrimer:
    'Phased array UT replaces a single-element transducer with an array of 16-128 small piezoelectric elements that fire in time-delayed sequence (the focal law) to electronically steer and focus the beam. Beam angle, focal depth, and beam shape are controlled by software in real time without changing wedges. Sectorial scan (S-scan) sweeps the beam through a range of angles from a single probe position. Electronic scan (E-scan) translates the active aperture along the array to inspect a long zone without physical probe movement. ASME BPVC Section V Article 4 Mandatory Appendix V covers PAUT procedure qualification [1]; ASME Code Case 2235 permits PAUT in lieu of RT for many vessel and piping applications [2]; ASTM E2491 covers PAUT generally [3]; ASTM E2700 covers TFM and FMC techniques [4]. The mathematical foundation is Huygens\' principle — the constructive interference of wavelets from each element produces the steered beam.',
  detectableDefects: [
    'Lack of sidewall fusion in narrow-groove welds',
    'Hydrogen-induced cracking (HIC) and stress-oriented HIC in sour service',
    'Inter-granular stress-corrosion cracking (IGSCC) in austenitic and duplex welds',
    'Inter-bead lack of fusion in multi-pass welds',
    'Root cracks and incomplete penetration in pipe butt welds',
    'Porosity and slag inclusions (with calibration to ASME workmanship limits)',
    'Inter-granular attack in HF alkylation and other corrosive service',
    'Tight planar defects oriented at angles between 30° and 70° to scan surface',
  ],
  materialsAndForms: [
    'Carbon and low-alloy steel piping welds (0.25" to 6" wall)',
    'Austenitic and duplex stainless steel welds (with grain-noise considerations)',
    'Nickel-base alloy welds (Inconel 625, 825, 718)',
    'Pipeline girth welds for AUT mechanized inspection',
    'Pressure vessel circumferential and longitudinal seam welds',
    'Nozzle-to-shell intersections and branch connections',
  ],
  whenToChoose:
    'Choose PAUT over conventional UT when weld geometry demands multiple beam angles (thick sections >2" wall, narrow-groove welds, complex intersections), when austenitic or duplex coarse grain defeats conventional shear-wave signal-to-noise, when a permanent imaging record is contractually required, when the client invokes ASME Code Case 2235 to substitute PAUT for RT, and when production speed matters — a phased array scan covers in one pass what conventional UT would need three or four wedge changes for.',
  whenNotToChoose:
    'PAUT has higher capex (an OmniScan X3 + probe + wedges runs $80-120k) and demands procedure qualification, focal-law qualification on the production geometry, and ASNT Level II PAUT certification — heavier than conventional UT certification. For simple thin-wall (<0.5") pipe and straight-weld inspection where conventional UT works fine, PAUT is overkill. For thickness-only surveys, dual-element thickness UT is faster and cheaper. PAUT performance on highly attenuative materials (cast iron, ceramic-lined pipe) is not better than conventional UT — the array does not overcome attenuation, it only steers the beam.',
  procedure: [
    {
      heading: 'Procedure qualification and focal law development',
      level: 2,
      paragraphs: [
        'Procedure qualification under ASME V Article 4 Mandatory Appendix V [1] requires demonstration of detection capability on a representative qualification block containing known flaws at known locations. The block matches the production part in thickness, material, weld geometry, and surface condition. The procedure specifies the array probe (frequency, element count, pitch), the wedge (angle, length, contact width), the focal law set (beam angles, focal depths, aperture configuration), the scan pattern, the encoder, and the acceptance criteria.',
        'Focal laws are designed in software (Olympus NDT SetupBuilder, Eddyfi UltraVision, Sonatest WaveSetup) for the specific geometry. A typical S-scan sweep covers 40° to 70° in 1° steps with focusing at half the wall thickness. An E-scan uses a fixed angle (typically 60°) and translates the active aperture along the array. Multi-group scans combine both. Every focal law set is verified against the calibration block before production scanning begins.',
      ],
    },
    {
      heading: 'Calibration block selection and TCG setup',
      level: 2,
      paragraphs: [
        'For weld inspection, the calibration block is the same material grade, thickness, and weld geometry as production. ASME V T-434.2.1 [1] requires side-drilled holes (SDHs) at three depths covering the wall thickness, plus a reference notch on the inside surface for time-corrected gain (TCG) curve generation. TCG compensates for the natural amplitude decay with distance — without it, deeper indications appear smaller than they really are.',
        'The technician acquires data on each SDH at each focal law, then the software builds a TCG curve mapping amplitude vs depth for each beam angle. A separate sensitivity curve normalizes amplitude across the angular range so a 1/16" SDH gives the same display amplitude at 40° as at 70°. ASME V Appendix V §V-460 [1] mandates the calibration steps and the verification frequency.',
      ],
    },
    {
      heading: 'Scan plan and encoder setup',
      level: 2,
      paragraphs: [
        'A typical weld scan uses two raster passes from each accessible side of the weld — a forward scan and a backward scan with the probe offset to clear the full weld volume. ASME V Appendix V §V-433 [1] sets the scan plan rules. An encoder (Olympus mini-wheel encoder, Jireh Skoot crawler) tracks probe position along the weld and indexes the data so the resulting C-scan or S-scan image maps cleanly to weld position.',
        'For pipeline AUT (automated ultrasonic testing) under ISO 13588 [5] or DNV-ST-F101 [6], the array probe is carried by a mechanized crawler around the pipe circumference at a fixed offset. Multiple zone-discriminated arrays cover the weld bevel in narrow vertical zones, each with its own focal law. AUT replaces RT on cross-country and offshore pipeline construction at 5-10× faster shot rate.',
      ],
    },
    {
      heading: 'Scan execution and data acquisition',
      level: 2,
      paragraphs: [
        'The technician couples the wedge to the part with ultrasonic gel, verifies coupling indicator stability across all elements (a missing-element indication appears as a vertical streak in the S-scan), and scans the weld at the procedure-specified speed (typically 1-3 inches per second for manual encoded PAUT). The instrument records the full waveform from every focal law at every encoder position — a 3D data block that the technician can replay and reanalyze offline.',
        'Coupling loss during scan is the most common cause of bad data. The OmniScan and Veo+ instruments display a real-time coupling indicator from the back-wall echo of a reference element; if the indicator drops below 50% for more than a couple of encoder steps, the technician stops, re-applies couplant, and rescans the affected zone. Glycerin and propylene glycol are the standard couplants for ambient PAUT; high-temp couplant up to 700°F is available for hot-process scans.',
      ],
    },
    {
      heading: 'Data review and indication sizing',
      level: 2,
      paragraphs: [
        'PAUT data review happens in software (Olympus OmniPC, Eddyfi UltraVision, Sonatest WaveImager) on a desktop monitor after scan completion. The Level II analyst scans through the data, marking every indication with a rectangle in the S-scan or C-scan view. Indication length and height are read from the cursor measurements on the calibrated views. Through-wall sizing accuracy with PAUT is typically ±1-2 mm for tight planar defects, comparable to TOFD.',
        'For fitness-for-service work under API 579 [7], the analyst reports actual indication height and length, not just amplitude. Tip-diffraction or 6 dB drop sizing techniques apply, and the focal law that gives the clearest tip signal is used for the height measurement. The reported dimensions go into the API 579 Level 1 or Level 2 assessment for the engineering decision.',
      ],
    },
    {
      heading: 'Reporting and code substitution',
      level: 2,
      paragraphs: [
        'The PAUT report names the procedure number and revision, the focal law set ID, the calibration block ID and verification record, the instrument and probe serial numbers, every indication with location, length, height, amplitude, type, and disposition. Image exports of the S-scan and merged-data views accompany every reportable indication. ASME V Appendix V §V-490 [1] specifies the required report content.',
        'For PAUT-in-lieu-of-RT under ASME Code Case 2235 [2], the report explicitly references the code case and the procedure-qualification record. The Authorized Inspector reviews the report against Code Case 2235 acceptance criteria — the same as the equivalent RT workmanship limits — and signs off the weld for code stamp. The code-case substitution has become the dominant volumetric method on new-construction ASME VIII Division 1 work at most Gulf Coast fabricators.',
      ],
    },
  ],
  equipment: [
    {
      heading: 'Phased array instruments',
      level: 2,
      paragraphs: [
        'The Olympus OmniScan X3 (32:128PR or 64:128PR) dominates the field portable PAUT market. The Eddyfi M2M Gekko and Sonatest Veo+ compete with similar channel counts and software ecosystems. For TFM (total focusing method) work, the OmniScan X3 64 and the Eddyfi Mantis carry the FMC (full matrix capture) firmware.',
        'For pipeline AUT, the GE PipeWizard, Olympus PipeWIZARD, and Eddyfi Capture systems integrate the instrument, the crawler, and the data review into a single station. Capex per AUT system runs $250-400k with the crawler, probes, and software.',
      ],
    },
    {
      heading: 'Array probes and wedges',
      level: 2,
      paragraphs: [
        'Standard array probes for weld inspection: 5 MHz, 32-element, 0.6 mm pitch (Olympus 5L32-A11, Eddyfi 5MHz 32E). For thicker sections, 2.25 MHz, 64-element, 1 mm pitch gives better penetration. For thin-wall (<0.25"), 10 MHz arrays with 0.3 mm pitch give the resolution needed.',
        'Wedges match the probe and the part curvature. Standard Rexolite SA10-N55S wedges fit on 5L32-A11 probes for shear-wave at 55° refracted angle. For pipe scans, curved wedges machined to the production OD avoid the conformability problems flat wedges introduce on small-diameter pipe. Wedge wear is checked weekly against the IIW V1 block radius reflector; a worn wedge drifts the refracted angle and biases every depth measurement.',
      ],
    },
    {
      heading: 'Encoders and scanning fixtures',
      level: 2,
      paragraphs: [
        'Manual encoded PAUT uses a 1- or 2-axis encoder wheel (Olympus mini-wheel, Jireh Skoot) clipped to the probe assembly. Encoder resolution is typically 12 counts per mm, giving positional accuracy of ±0.5 mm over a 1-meter scan.',
        'For mechanized work, scanning fixtures (Jireh Bug-O, Sonatest Wheely) ride on a magnetic track around the pipe circumference at constant speed. The crawler carries the probe and encoder and feeds data continuously to the instrument over an umbilical cable. Mechanized scans are essential for production-rate pipeline and vessel-seam work.',
      ],
    },
  ],
  codesAndStandards: [
    { id: 'asme-v-app-v', source: 'ASME BPVC Section V (2023), Article 4 Mandatory Appendix V — Phased Array Ultrasonic Examination' },
    { id: 'asme-cc-2235', source: 'ASME Code Case 2235-15 — Use of Ultrasonic Examination in Lieu of Radiography' },
    { id: 'astm-e2491', source: 'ASTM E2491-23 — Standard Guide for Evaluating Performance Characteristics of Phased-Array Ultrasonic Testing Instruments and Systems' },
    { id: 'astm-e2700', source: 'ASTM E2700-23 — Standard Practice for Contact Ultrasonic Testing of Welds Using Phased Arrays' },
    { id: 'iso-13588', source: 'ISO 13588:2019 — Non-destructive testing of welds — Ultrasonic testing — Use of automated phased array technology' },
    { id: 'dnv-st-f101', source: 'DNV-ST-F101 (2021) — Submarine Pipeline Systems, Sec.10 AUT' },
    { id: 'api-579', source: 'API 579-1/ASME FFS-1 (2021), Part 9 — Assessment of Crack-Like Flaws' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Qualification and Certification of NDT Personnel' },
    { id: 'iso-19285', source: 'ISO 19285:2017 — Non-destructive testing of welds — Phased array ultrasonic testing — Acceptance levels' },
  ],
  acceptanceCriteria:
    'For PAUT-in-lieu-of-RT under ASME Code Case 2235 [2], the acceptance criteria match the equivalent RT workmanship limits in the construction code — ASME B31.3 Table 341.3.2, ASME VIII Division 1 UW-51, or API 1104 §9. The PAUT procedure must demonstrate equivalent detection capability through the qualification block. For PAUT to ASME V Article 4 Appendix V [1] (not Code Case 2235), workmanship-based acceptance follows the construction code with the PAUT-specific amplitude or length thresholds. ISO 19285:2017 [9] provides parallel European acceptance levels for PAUT. For fitness-for-service work under API 579 [7], the PAUT-measured flaw height and length feed directly into the Level 1 or Level 2 ECA — engineering decisions on continued operation, repair, or rerate. Indications classified as cracks, lack of fusion, or incomplete penetration are universally rejectable on new-construction work and trigger immediate excavation and weld repair followed by re-PAUT to full acceptance.',
  comparisonAgainst: [
    { method: 'Radiographic Testing (RT)', tradeoff: 'RT gives a permanent film image and detects volumetric defects regardless of orientation, but requires radiation safety, evacuation, and 10× slower per linear foot than PAUT on thick sections.' },
    { method: 'Conventional UT', tradeoff: 'Conventional UT works fine on simple geometry and thin walls at lower capex, but cannot match PAUT for thick-section coverage, narrow-groove access, or austenitic-grain noise handling.' },
    { method: 'TOFD', tradeoff: 'TOFD pairs with PAUT for through-wall sizing accuracy on planar defects, but has dead zones at the top and bottom surfaces and cannot stand alone for full-volume coverage.' },
    { method: 'TFM/FMC', tradeoff: 'TFM (total focusing method) gives higher resolution images than S-scan PAUT for the same hardware, but requires longer post-processing time and more demanding procedure qualification.' },
  ],
  costRange: {
    unit: 'USD per linear foot of weld scanned (Gulf Coast crew, 2025)',
    low: 12,
    high: 35,
    mid: 20,
  },
  faqs: [
    {
      q: 'When does ASME Code Case 2235 permit PAUT instead of RT?',
      a: 'Code Case 2235-15 [2] permits PAUT in lieu of radiography for ASME B31.1, B31.3, B31.7, and Section VIII Division 1 and 2 welds when the PAUT procedure is qualified under ASME V Article 4 Mandatory Appendix V [1] and the personnel are certified to ASME V or CP-189 [8]. The substitution is at the option of the Owner — the code does not force it but does not restrict it. Most Gulf Coast fabricators have qualified Code Case 2235 procedures for their common weld geometries and use PAUT as the default volumetric method on new-construction work, falling back to RT only when the client spec mandates film.',
    },
    {
      q: 'How does PAUT handle coarse-grained austenitic welds?',
      a: 'Coarse-grained austenitic and duplex welds scatter ultrasonic energy at grain boundaries, producing back-scatter noise that swamps small defect signals in conventional shear-wave UT. PAUT mitigates this through several mechanisms: lower frequency (2.25 MHz or 1.5 MHz vs the 5 MHz typical for ferritic steel) trades resolution for penetration; longitudinal-wave probes avoid the shear-wave attenuation that makes austenitic UT so hard; and TFM/FMC reconstruction algorithms apply spatial filtering to suppress grain noise. Procedure qualification on representative austenitic mockup blocks is mandatory under ASME V Appendix V [1] for these materials, and the qualification record stays with the procedure.',
    },
    {
      q: 'What certification level does a PAUT technician need?',
      a: 'ASNT CP-189 [8] and SNT-TC-1A recognize PAUT as a UT method extension. The technician must hold UT Level II as the foundation, plus method-specific PAUT training (typically 80 hours classroom plus 320 hours on-the-job for direct employer certification) and a documented practical exam on a PAUT instrument. Most Gulf Coast operators require the technician to qualify on the specific procedure and the production geometry before working independently — procedure qualification is in addition to personnel certification. International equivalent is ISO 9712 Level 2 PAUT, harmonized for offshore and EU jurisdictions.',
    },
    {
      q: 'How does TFM differ from S-scan PAUT?',
      a: 'S-scan PAUT applies focal laws in real time during the scan — the instrument fires each focal law sequentially and stitches the results into an angular image. TFM (total focusing method) records the raw signal from every transmitter-receiver pair (full matrix capture, FMC), then post-processes to compute the focused image at every point in the inspection volume. TFM gives higher resolution at every depth than S-scan because the focus is recalculated at each pixel, but acquisition time is longer and the data file is much larger. ASTM E2700 [4] covers PAUT procedure; FMC/TFM rules are being added to ASME V revisions. For most weld inspection, S-scan is the workhorse; TFM is reserved for tight-defect sizing or high-resolution volumetric work.',
    },
    {
      q: 'Can PAUT replace TOFD?',
      a: 'PAUT and TOFD are complementary, not interchangeable. PAUT gives angular and aperture coverage that catches a wide range of defect orientations with high spatial resolution. TOFD gives the best through-wall sizing accuracy on planar defects via tip diffraction, particularly in the middle of the weld where PAUT amplitude-based sizing struggles. Most code-substitution procedures under ASME Code Case 2235 [2] and ISO 13588 [5] combine both methods — PAUT for primary detection and coverage, TOFD for through-wall sizing on flagged indications. A modern field setup often runs both probe types on the same scanner, with the instrument acquiring both data streams in a single pass.',
    },
  ],
  internalLinks: [
    { href: '/methods/ultrasonic-testing', label: 'Conventional UT', context: 'Conventional UT is faster and cheaper than PAUT on simple thin-wall geometry.' },
    { href: '/methods/tofd-testing', label: 'TOFD', context: 'TOFD pairs with PAUT for high-accuracy through-wall sizing on planar defects.' },
    { href: '/methods/radiographic-testing', label: 'Radiographic Testing', context: 'PAUT now substitutes for RT under ASME Code Case 2235 on many vessel and piping welds.' },
    { href: '/industries/oil-and-gas', label: 'Oil & Gas inspection', context: 'PAUT is the default volumetric method on refinery and petrochemical pipe welds.' },
    { href: '/industries/pipeline', label: 'Pipeline construction', context: 'AUT phased array runs at production rates on cross-country and offshore pipeline girth welds.' },
    { href: '/standards/asme-v', label: 'ASME BPVC Section V', context: 'Article 4 Appendix V of Section V governs every PAUT procedure on ASME-stamped equipment.' },
    { href: '/standards/asme-code-case-2235', label: 'ASME Code Case 2235', context: 'Code Case 2235 permits PAUT in lieu of RT for many ASME applications.' },
    { href: '/tools/paut-focal-law-builder', label: 'Focal law builder', context: 'Design PAUT focal laws for your weld geometry and validate against a calibration block.' },
    { href: '/compare/ut-vs-rt', label: 'UT vs RT', context: 'Decision matrix for choosing between ultrasonic and radiographic testing.' },
  ],
  citations: [
    { id: 'asme-v-app-v', source: 'ASME BPVC Section V (2023), Article 4 Mandatory Appendix V — Phased Array Ultrasonic Examination' },
    { id: 'asme-cc-2235', source: 'ASME Code Case 2235-15 — Use of Ultrasonic Examination in Lieu of Radiography' },
    { id: 'astm-e2491', source: 'ASTM E2491-23 — Evaluating Performance Characteristics of Phased-Array Ultrasonic Testing Instruments and Systems' },
    { id: 'astm-e2700', source: 'ASTM E2700-23 — Contact Ultrasonic Testing of Welds Using Phased Arrays' },
    { id: 'iso-13588', source: 'ISO 13588:2019 — Ultrasonic testing — Use of automated phased array technology' },
    { id: 'dnv-st-f101', source: 'DNV-ST-F101 (2021) — Submarine Pipeline Systems, Sec.10 AUT' },
    { id: 'api-579', source: 'API 579-1/ASME FFS-1 (2021), Part 9 — Assessment of Crack-Like Flaws' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Qualification and Certification of NDT Personnel' },
    { id: 'iso-19285', source: 'ISO 19285:2017 — Phased array ultrasonic testing — Acceptance levels' },
  ],
};

export default method;
