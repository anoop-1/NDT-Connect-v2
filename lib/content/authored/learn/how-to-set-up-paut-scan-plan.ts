import type { LearnArticleContent } from '../types';

const article: LearnArticleContent = {
  slug: 'how-to-set-up-paut-scan-plan',
  category: 'how-to',
  metaTitle: 'How to Set Up a PAUT Scan Plan (ASME V Article 4 Mandatory App. IV)',
  metaDescription:
    'Build a code-compliant PAUT scan plan: weld geometry import, focal law generation, beam coverage validation, and sensitivity calibration in ESBeamTool or OmniScan.',
  heroLede:
    "You have a 24-inch sch. 80 girth weld and a procedure call-out for full coverage with PAUT Encoded. The OmniScan is on the truck, the wedge is a 55SW, and the foreman wants the scan plan on his desk before lunch. Here is the exact sequence — from CAD geometry import through focal law verification — that produces a scan plan an ASME V Art. 4 Mandatory Appendix IV auditor will sign without redlines.",
  audience:
    'Level II PAUT technicians and Level III procedure authors writing encoded line-scan procedures for girth welds and nozzle attachments per ASME V Article 4 Mandatory Appendix IV.',
  prerequisiteKnowledge: [
    'PAUT focal law theory — element count, aperture, beam steering, focusing',
    'Familiarity with ESBeamTool, AIM, or equivalent scan plan software',
    'Reading weld geometry from WPS, including bevel angle and root land',
    'Understanding of encoded line scan vs raster vs sectorial scanning',
  ],
  sections: [
    {
      heading: 'Inputs you need before opening the scan plan software',
      level: 2,
      paragraphs: [
        'Pull the WPS or the as-built isometric. You need wall thickness (nominal and minimum), bevel angle, root land, root opening, and weld cap reinforcement height. For a typical butt weld on 24-inch sch. 80 carbon steel, that is 30.96 mm nominal wall, 37.5° single-V bevel, 1.6 mm root land, 2-3 mm root gap, and 2.5 mm cap reinforcement per ASME B31.3 §328.[1]',
        'Pull the probe and wedge data sheets. For most pipe-weld work, a 5L32-A11 probe (5 MHz, 32 elements, 0.6 mm pitch) on a SA11-N55S wedge (55° shear in steel) is the default. Note the wedge first-element height and roof angle — both feed the focal law calculation.',
        'Confirm the procedure-required coverage: most ASME B31.3 and API 1104 PAUT procedures require two-sided two-pass coverage with overlap, meaning the beam must sweep the entire weld volume from both sides of the cap, with at least 25% overlap at the centerline.[2][3]',
      ],
      callout: {
        kind: 'spec',
        title: 'Coverage rule of thumb',
        body: 'ASME V Art. 4 Mandatory App. IV §IV-432 requires coverage of 100% of the weld volume plus 13 mm (1/2 inch) of base metal on each side. Verify this in the simulation, not on the spec sheet.',
      },
    },
    {
      heading: 'Step 1: Import or draw the weld geometry',
      level: 2,
      paragraphs: [
        'In ESBeamTool: New Part → Pipe Weld → enter OD (610 mm), wall (30.96 mm), and material (carbon steel, 3240 m/s shear, 5920 m/s longitudinal). Draw the bevel by entering single-V, 37.5° each side, 1.6 mm root land, 2.5 mm cap.',
        'Add the heat-affected zone (HAZ) — most procedures require coverage of 6 mm into the base metal on each side. Add the wedge contact surface; if the cap is not ground flush, set the cap-clearance offset so the wedge sits on the base metal, not the cap.',
        'Save the geometry as a named part so the scan plan is reproducible. ASME V Art. 4 audits routinely ask "show me how you reproduce this scan plan six months from now" — a named CAD file is the answer.',
      ],
    },
    {
      heading: 'Step 2: Generate focal laws and set beam coverage',
      level: 2,
      paragraphs: [
        'Add the probe (5L32, 0.6 mm pitch) and wedge (SA11-N55S). Set scan type to sectorial with sweep from 40° to 70° in 1° steps — that gives 31 beams per scan. For pipe welds, this single sectorial group typically covers full V-path on a 30 mm wall.',
        'Set focal depth to half-wall (15 mm) for the first pass. The second pass focuses at 1.5x wall (45 mm) to cover the full skip volume. Aperture: use the full 16 active elements for the 5L32 (giving ~9.6 mm aperture). Element step: 1.',
        'Run the simulation and watch the beam cones. Every beam in the sectorial sweep must cover the weld volume with no gaps. If a gap appears near the root, increase the sweep to 35° or lower the wedge angle to 45°. If the upper cap has no coverage, add a second group with a steeper sweep (60°-75°).[4]',
      ],
      list: {
        title: 'Common focal law settings for 5L32 on 30 mm CS pipe weld',
        items: [
          'Sweep range: 40° to 70°, 1° step (31 beams)',
          'Aperture: 16 elements (full probe width)',
          'Focal depth: half-wall for pass 1, 1.5x wall for pass 2',
          'Element step: 1 (no skipping)',
          'PRF: auto, typically 1-2 kHz',
          'Filter: matched to probe center frequency (5 MHz bandpass)',
        ],
      },
    },
    {
      heading: 'Step 3: Position the probe and verify beam coverage in simulation',
      level: 2,
      paragraphs: [
        'Set the probe stand-off distance — the distance from the wedge front to the weld cap centerline. For a 55° wedge on 30 mm wall, stand-off typically sits at 35-45 mm to put the half-V coverage on the far side of the weld.',
        'Run the dynamic simulation. The animation shows beams sweeping through the weld at every element step. Verify three things: (1) no coverage gaps in the weld volume, (2) the back-wall echo returns to the probe (otherwise the beam misses and you lose the geometric reflector reference), and (3) the half-V and full-V coverage overlap by at least 25% at the weld centerline.[2]',
        'Document the stand-off, encoder direction, and scan length on the scan plan PDF. The PDF goes into the procedure file; the OmniScan .ops file goes onto the unit and a backup USB.',
      ],
    },
    {
      heading: 'Step 4: Sensitivity calibration on the basic calibration block',
      level: 2,
      paragraphs: [
        'Take the scan plan to the basic calibration block — a curved block matching the pipe OD with side-drilled holes (SDH) at 1/4T, 1/2T, and 3/4T per ASME V Art. 4 Fig. T-434.3. Couple the probe and run the encoded scan over the SDHs.',
        'Open the data file and use the TCG (Time Corrected Gain) tool. For each SDH, peak the indication and let the software equalize amplitude to 80% FSH across all beams. The TCG curve is built — every beam now reads the same amplitude for the same reflector regardless of sound-path.',
        'Add scanning gain per the procedure (typically +6 dB for ASME V Art. 4 work). Save the .ops file as the reference state. Re-verify TCG every 4 hours and after any temperature change > 8°C, per ASME V Art. 4 §T-467.[1]',
      ],
    },
    {
      heading: 'Step 5: Lock the scan plan and brief the crew',
      level: 2,
      paragraphs: [
        'The scan plan package contains: the ESBeamTool PDF (geometry, focal laws, coverage screenshots), the OmniScan .ops file, the calibration block SDH report, the encoder calibration record, and the procedure cover sheet signed by the Level III. Anything less and the inspection is not auditable.',
        'Brief the field crew: stand-off distance, encoder direction, scan speed limit (typically 100 mm/s for line scans), recalibration triggers, and the call-out for reportable indications. Walk them through the OmniScan setup once on the cal block before the first weld.',
        'Save the entire package to the project folder with a date-stamped revision number. Every revision after the first requires a new Level III sign-off — there is no "minor edit" exception in ASME V Art. 4 audit practice.',
      ],
    },
  ],
  commonMistakes: [
    'Building the scan plan with a flat-plate assumption when the part is a 24-inch pipe. The curvature changes the wedge contact and beam exit point — flat-plate scan plans miss 5-15% of weld volume on small-diameter pipe. Always import pipe geometry with the correct OD.',
    'Running TCG on a corroded calibration block. Surface roughness on the SDHs corrupts the equalization and the scan reads 2-4 dB lower than reality. Inspect the cal block face under raking light before every TCG build.',
    'Skipping the second-pass focal law because "the first pass covers it." Geometric shadows from the bevel root or the cap reinforcement leave 10-20 mm of weld volume uninspected on a single-pass plan. Run two passes with overlap or use a dual-group scan plan.',
    'Forgetting to recalibrate after a temperature swing. PAUT wedge velocity shifts ~1.5 m/s per °C. A 15°C swing from morning to afternoon shifts the refracted angle by ~1° — enough to push the beam off the root reflector. Recheck TCG every 4 hours and on every shift change.',
  ],
  relatedFaqs: [
    {
      q: 'What is the minimum software output a code-compliant PAUT scan plan must contain?',
      a: 'ASME V Art. 4 Mandatory Appendix IV §IV-432 and §IV-440 require the scan plan to document: weld geometry (thickness, bevel, root), probe and wedge identification, focal law parameters (sweep range, focal depth, aperture, element step), stand-off distance, encoder direction and resolution, sensitivity calibration reflectors and target amplitude, coverage validation screenshot, and a signature from the qualified Level III. Skipping any of these is a finding on most third-party audits and a hard stop on Shell, Saudi Aramco, and ADNOC owner-spec projects.',
    },
    {
      q: 'When do I need two probes (tandem) instead of one?',
      a: 'Tandem PAUT is required when the weld geometry blocks single-probe two-sided coverage — typically nozzle attachments, fillet welds, or T-joints where one side of the weld is inaccessible. ASME V Art. 4 Mandatory App. IV permits tandem configurations if the focal law calculation shows full volume coverage and the calibration block contains matched tandem reflectors (typically 3 mm FBHs at root, mid-wall, and cap). Tandem also helps for thick wall (> 50 mm) where single-probe V-path coverage exceeds the wedge stand-off range. The penalty is a longer setup time (typically 2-3x single probe) and tighter encoder tolerance.',
    },
    {
      q: 'Why does the simulation show beam gaps near the root on a 70° wedge?',
      a: 'A 70° refracted angle puts the beam at a shallow grazing angle near the root, where the path length and the reflection angle off the bevel both work against you. The beam can pass the root entirely without reflecting back. Drop the upper sweep limit to 65° or add a second group at 45-55° focused on the root. Many ASME V Art. 4 procedures specifically prohibit single-group scan plans with sweeps wider than 30° because of this gap pattern — check your procedure before assuming 40-70° is acceptable.',
    },
    {
      q: 'How often must I rebuild the TCG curve during a shift?',
      a: 'ASME V Art. 4 §T-467 requires TCG verification at the start of each shift, every 4 hours of continuous use, after any probe or wedge change, after any cable change, after a power cycle, and at the end of the shift. The verification is a quick re-scan of the cal block — if any SDH amplitude drifts more than 20% from the reference or more than 10% in sound-path position, rebuild the TCG and re-scan every weld since the last good verification. Temperature swings greater than 8°C also trigger a rebuild because wedge velocity is temperature-dependent.',
    },
    {
      q: 'Can I use a 32-element probe for both pipe and plate scans with one scan plan?',
      a: 'No. The geometry differs — pipe OD curvature changes the wedge contact area, beam exit point, and refracted angle by 0.5-3° depending on diameter. ASME V Art. 4 Mandatory App. IV §IV-432.1 explicitly requires the scan plan to be geometry-specific. You build one scan plan per part configuration (OD, wall, bevel angle). The probe and wedge can be the same; the focal laws and stand-off cannot. Reusing a flat-plate scan plan on pipe is one of the most common audit findings on PAUT procedures.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/phased-array-ultrasonic-testing',
      label: 'PAUT method overview',
      context: 'Full method overview covers physics, equipment selection, and code framework beyond scan-plan construction.',
    },
    {
      href: '/standards/asme-v',
      label: 'ASME Section V Article 4',
      context: 'Mandatory Appendix IV is the governing clause for PAUT scan plans.',
    },
    {
      href: '/learn/how-to-calibrate-ut-flaw-detector',
      label: 'UT flaw detector calibration walkthrough',
      context: 'Conventional UT calibration logic underpins PAUT sensitivity calibration.',
    },
    {
      href: '/learn/how-to-perform-snells-law-calculation',
      label: 'Snell\'s law calculation for refracted angles',
      context: 'Wedge angle, material velocity, and refracted angle relationships drive PAUT focal law math.',
    },
    {
      href: '/learn/how-to-perform-defect-characterization-ut',
      label: 'Defect characterization with UT',
      context: 'Once the scan plan is built, characterization rules separate cracks from inclusions and porosity.',
    },
    {
      href: '/free-tools/paut-coverage-calculator',
      label: 'PAUT coverage calculator',
      context: 'Validate beam coverage on irregular weld geometries before drafting the scan plan.',
    },
    {
      href: '/learn/troubleshooting-paut-noise',
      label: 'Troubleshooting PAUT noise',
      context: 'High background noise during sensitivity calibration usually means a wedge or coupling problem.',
    },
    {
      href: '/methods/time-of-flight-diffraction',
      label: 'TOFD method overview',
      context: 'Most pipe-weld PAUT procedures pair encoded line scans with parallel TOFD coverage.',
    },
  ],
  citations: [
    {
      id: 'asme-v-app-iv',
      source: 'ASME BPVC Section V, Article 4, Mandatory Appendix IV — Phased Array Manual Raster Examination Techniques, 2023 edition',
    },
    {
      id: 'asme-b31-3',
      source: 'ASME B31.3-2022 — Process Piping, Chapter VI Examination, §328 and §341',
    },
    {
      id: 'api-1104',
      source: 'API 1104, 22nd ed. (2021) — Welding of Pipelines and Related Facilities, §11.4 Ultrasonic and Phased Array Techniques',
    },
    {
      id: 'iso-13588',
      source: 'ISO 13588:2019 — Non-destructive testing of welds — Ultrasonic testing — Use of automated phased array technology',
    },
    {
      id: 'astm-e2700',
      source: 'ASTM E2700-22 — Standard Practice for Contact Ultrasonic Testing of Welds Using Phased Arrays',
    },
  ],
};

export default article;
