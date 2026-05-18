import type { LearnArticleContent } from '../types';

const article: LearnArticleContent = {
  slug: 'how-to-write-ndt-procedure-asme-v',
  category: 'how-to',
  metaTitle: 'How to Write an NDT Procedure to ASME Section V (Audit-Ready)',
  metaDescription:
    'Step-by-step guide to authoring a code-compliant NDT procedure to ASME V. Required elements, demonstration requirements, Level III sign-off, and audit checklist.',
  heroLede:
    "Your AI Authorized Inspector wants the UT procedure on his desk Friday for the pressure-vessel job that breaks ground Monday. Generic templates pulled off the internet fail the audit. ASME Section V Article 1 §T-150 lists every required element a procedure must contain; miss one and the procedure is non-conforming and the inspection invalid. This walk-through is the build-order — required elements, demonstration block setup, Level III qualification sign-off, and the audit checklist that survives Stamp Holder review.",
  audience:
    'NDT Level III procedure authors, QA/QC managers, and inspection engineers writing or revising procedures for ASME B&PV Code Stamp Holder work or Section V audit compliance.',
  prerequisiteKnowledge: [
    'ASNT Level III certification or equivalent in the relevant method',
    'Working knowledge of ASME Section V (Articles 1-4 for UT, Article 2 for RT, etc.)',
    'Familiarity with the owner specification (e.g., Shell DEP, Saudi Aramco SAES) layered on top of ASME',
    'Document-control system (revision tracking, distribution, signatures)',
  ],
  sections: [
    {
      heading: 'The 14 required elements per ASME V Article 1 §T-150',
      level: 2,
      paragraphs: [
        'Every ASME Section V procedure must address fourteen specific elements. Miss one and the procedure is non-conforming. The list lives in ASME V Art. 1 §T-150 and applies regardless of method.[1]',
        'Element 1: scope (materials, thickness range, weld configurations). Element 2: type of equipment (manufacturer, model, identification). Element 3: surface preparation requirements. Element 4: technique (e.g., manual contact pulse-echo UT). Element 5: instrument or examination equipment. Element 6: probes, transducers, sources, or particles.',
        'Element 7: calibration requirements with reference blocks and reflectors. Element 8: examination methodology and scan patterns. Element 9: data to be recorded. Element 10: post-examination cleaning. Element 11: personnel qualification levels. Element 12: any other relevant requirements (e.g., temperature, surface roughness limits). Element 13: examination results and acceptance criteria reference. Element 14: revision control and date.',
      ],
      callout: {
        kind: 'spec',
        title: 'Article-specific additions',
        body: 'Each method article (Art. 2 RT, Art. 4 UT, Art. 6 PT, Art. 7 MT, Art. 8 ET, Art. 10 Leak) adds method-specific required elements on top of the Art. 1 baseline. Always cross-reference the article governing your method.',
      },
    },
    {
      heading: 'Step 1: Define scope tightly',
      level: 2,
      paragraphs: [
        'Scope is the make-or-break section. State material (e.g., SA-516 Gr. 70 carbon steel), product form (rolled plate, forged pipe, casting), thickness range (e.g., 6 mm to 50 mm), weld configurations (butt, fillet, T-joint, nozzle attachment), and welding processes covered (SMAW, GTAW, FCAW).',
        'Limit the scope to what the demonstration actually covers. A procedure that lists "6 mm to 200 mm" but only demonstrates on 25 mm material is non-conforming — the demonstration must bracket the scope. ASME V Art. 4 §T-451 explicitly requires demonstration on a sample representative of the production part.[1]',
        'Add explicit exclusions if needed: "This procedure does not cover austenitic stainless steel" or "Welds with as-cast surface preparation are excluded". Exclusions narrow the audit risk.',
      ],
    },
    {
      heading: 'Step 2: Pin equipment, probes, and reference blocks by ID',
      level: 2,
      paragraphs: [
        'Generic equipment references ("a calibrated flaw detector") fail audit. Name the manufacturer, model, and serial number range or a class spec (e.g., "Olympus EPOCH 650 or equivalent meeting ASTM E317"). Same for probes (e.g., "Olympus A1078S 5L32-A11 5 MHz 32-element linear array") and wedges.[2]',
        'Reference blocks must be identified by drawing number, material certificate, and traceability. ASME V Art. 4 §T-434 lists the basic calibration block requirements; the procedure attaches the actual block drawing or references it by part number.',
        'For RT, name the source make/model (e.g., QSA Global Sentinel 880 Ir-192), source serial number range, exposure device, film type and class (e.g., AGFA D7 Class II per EN 584-1), and lead screen thickness.[3]',
      ],
    },
    {
      heading: 'Step 3: Define technique with all variables',
      level: 2,
      paragraphs: [
        'For UT, list: probe frequency, angle, beam direction, scan pattern (1/2-V or full-V), scan speed limit, scan overlap (typically 10-15%), and gain settings (primary reference + scanning gain). State coupling agent by name and the surface preparation it requires.',
        'For RT, list: source-to-film distance, exposure time per thickness, IQI selection per ASME V Art. 2 §T-276 (sensitivity 2-2T penetrameter), film density range (typically 2.0-4.0 H&D), and viewing illumination.[3]',
        'For MT/PT, list: technique (visible vs fluorescent), wet vs dry, current type and amperage for MT (e.g., 1000-1500 A AC yoke), dwell times (penetrant 10 min, developer 10 min per ASTM E165), and lighting requirements (1000 lux min for visible, < 20 lux ambient + 1000 µW/cm² UV-A for fluorescent).[4]',
      ],
      list: {
        title: 'Variables that must be explicit in the technique section',
        items: [
          'Calibration sequence with reference reflectors and amplitude targets',
          'Scanning gain or scanning sensitivity with dB offset from primary reference',
          'Scan pattern, speed limit, and overlap percentage',
          'Temperature operating range (typically 5°C to 50°C unless qualified otherwise)',
          'Recalibration triggers (probe change, 4-hour interval, power cycle)',
          'Indication recording threshold (e.g., 20% DAC for UT, all relevant indications for MT/PT)',
        ],
      },
    },
    {
      heading: 'Step 4: Define demonstration requirements',
      level: 2,
      paragraphs: [
        'ASME V Art. 1 §T-150(b) requires demonstration of procedure capability on a sample containing known reflectors representative of the production part. For UT, the demonstration block contains side-drilled holes or notches at the limits of the scope; for RT, the demonstration uses a step wedge with the smallest IQI hole that must be visible.[1]',
        'Record the demonstration: photograph the block setup, save the A-scan or radiograph, log the technician name and certification, log the equipment serial numbers, and the Level III who witnessed the demo. The demonstration record stays with the procedure for the life of the procedure (typically 5 years post-revision).',
        'Re-demonstration is required when any essential variable changes — frequency, angle, technique, surface condition limits, or material category. Essential variables for each method are listed in the relevant article (e.g., ASME V Art. 4 §T-421 for UT).',
      ],
    },
    {
      heading: 'Step 5: Acceptance criteria, results recording, and revision control',
      level: 2,
      paragraphs: [
        'The procedure references — not duplicates — the governing acceptance criteria. ASME B31.3 §344.6 for piping UT, ASME VIII Div. 1 Appendix 12 for pressure-vessel UT, AWS D1.1 Clause 8 for structural welds, API 1104 Section 9 for pipeline RT. Quote the section, do not paraphrase.[5][6]',
        'Define the report content: technician name and cert level, date and shift, equipment IDs, weld ID, material and thickness, indication log (location, amplitude, length, sound-path/depth), acceptance decision, and Level III review signature for any reportable indication.',
        'Revision control: every change to scope, equipment, technique, or acceptance reference triggers a new revision number, Level III sign-off, and re-demonstration if essential variables changed. Maintain a revision history table at the front of the document and a distribution list showing who has which revision.',
      ],
    },
    {
      heading: 'Step 6: Level III sign-off and audit-ready records',
      level: 2,
      paragraphs: [
        'The procedure is signed by an ASNT Level III (or equivalent — ISO 9712 Level 3, CGSB Level 3) certified in the method. The signature is dated and the certification ID listed. Many owners require an additional sign-off by the QA/QC manager.[7]',
        'Records retained for the procedure: the demonstration record (block, A-scan/radiograph, technician, witness), the revision history, the distribution log, the Level III certification copy, and the procedure cross-reference to the project specification.',
        'Audit-day deliverables: the current revision PDF, the demonstration record, the Level III certification, evidence of personnel qualification under SNT-TC-1A or CP-189, and the linking project spec showing the procedure is invoked for the work.',
      ],
    },
  ],
  commonMistakes: [
    'Copy-paste from a prior project with the wrong owner spec layered on top. Shell DEP, Saudi Aramco SAES, and ADNOC specs all add requirements on top of ASME — using a Shell DEP-compliant procedure on a Saudi Aramco job will fail audit. Map every requirement to the actual project spec before issuing.',
    'Demonstration block reflectors that do not bracket the procedure scope. A procedure spanning 6-50 mm thickness needs demo block reflectors at or near 6 mm and 50 mm — a single demo on 25 mm material does not qualify the full scope.',
    'Listing "ASNT Level II" as personnel requirement without specifying the method. ASME V Art. 1 §T-130 requires personnel certified in the specific method (UT, RT, MT, PT, ET) — generic "Level II" is non-conforming. Spell out "ASNT Level II in UT per SNT-TC-1A:2020".',
    'No revision date or no revision number on the cover page. Procedures without revision control fail the document-management audit. Every page footer carries Rev X dated YYYY-MM-DD.',
  ],
  relatedFaqs: [
    {
      q: 'What is the difference between a procedure and a technique sheet?',
      a: 'The procedure is the high-level document covering scope, equipment, technique, calibration, and acceptance reference. The technique sheet (sometimes called a work instruction or examination data sheet) is project-specific and lists exact equipment serial numbers, the day\'s calibration values, scanning gain, indication log, and signatures for the specific weld or part being inspected. ASME Section V requires the procedure; many owner specs additionally require a technique sheet per weld or per shift. The procedure is the standing document; the technique sheet is the as-executed record. Both stay in the project quality file.',
    },
    {
      q: 'When does a procedure need re-demonstration vs minor revision?',
      a: 'Re-demonstration is triggered when any essential variable changes. For UT (ASME V Art. 4 §T-421), essential variables include probe frequency, beam angle, scan technique (manual vs encoded), scanning pattern, and acceptance criteria. For RT (ASME V Art. 2 §T-221), essential variables include source type, IQI placement, geometric unsharpness limits, and film system class. Minor revision (no re-demo) is permissible only for non-essential variables — e.g., updating the equipment list to add a new instrument model that meets the same class spec. The Level III makes the call; document the rationale on the revision history.',
    },
    {
      q: 'Does every procedure need a Level III sign-off?',
      a: 'Yes for ASME Section V work and almost every owner-spec project. The signature confirms the Level III has reviewed scope, equipment selection, technique, calibration, and acceptance criteria against the governing code and project spec. The Level III must be certified in the method covered by the procedure — a UT Level III cannot sign an RT procedure. ASNT SNT-TC-1A and CP-189 set the certification framework; most U.S. and Middle East projects accept ASNT Level III certs, while European projects may require ISO 9712 Level 3. The signature is dated and the cert ID listed on the cover page.',
    },
    {
      q: 'How do I handle a procedure that needs to cover a scope wider than my demonstration block?',
      a: 'You don\'t — the procedure scope is bounded by the demonstration. ASME V Art. 1 §T-150(b) states the demonstration must be representative of the production part. If your scope is 6-50 mm thickness and your demo block is 25 mm, the procedure scope is 25 mm ± some range the Level III justifies (often ±25% per Art. 4 cal-block rules). To cover 6-50 mm legitimately, demonstrate on a thin sample (e.g., 6 mm) and a thick sample (e.g., 50 mm). Two demo records, two cal blocks, one procedure — that is the audit-clean path.',
    },
    {
      q: 'What records do I keep when a procedure is superseded?',
      a: 'Retain the superseded procedure, the demonstration record, the Level III cert copy, and the revision-history page for the duration the inspections performed under that procedure remain in service — typically 5 years for piping under ASME B31.3, the life of the asset for pressure vessels under ASME VIII Div. 1, and 30 years for nuclear components under 10 CFR 50 Appendix B. Many owners require the procedure history kept for the entire asset life regardless of code minimum. Archive in a controlled-document system, not loose on a shared drive.',
    },
  ],
  internalLinks: [
    {
      href: '/standards/asme-v',
      label: 'ASME Section V overview',
      context: 'Section V is the parent code governing all NDT procedure requirements covered here.',
    },
    {
      href: '/standards/asme-b31-3',
      label: 'ASME B31.3 process piping code',
      context: 'B31.3 invokes ASME V and adds piping-specific acceptance criteria the procedure must reference.',
    },
    {
      href: '/learn/how-to-calibrate-ut-flaw-detector',
      label: 'UT flaw detector calibration walkthrough',
      context: 'Calibration sequence in the procedure mirrors this technician-facing walkthrough.',
    },
    {
      href: '/learn/how-to-set-up-paut-scan-plan',
      label: 'PAUT scan plan setup',
      context: 'PAUT procedures reference an attached scan plan as part of the technique section.',
    },
    {
      href: '/learn/how-to-perform-dac-curve-construction',
      label: 'DAC curve construction',
      context: 'UT procedures must specify the DAC reflectors, gain offsets, and acceptance reference lines.',
    },
    {
      href: '/learn/faq-acceptance-criteria-asme-b31-3',
      label: 'ASME B31.3 acceptance criteria FAQ',
      context: 'B31.3 acceptance is the most common reference for piping UT and RT procedures.',
    },
    {
      href: '/learn/faq-acceptance-criteria-api-1104',
      label: 'API 1104 acceptance criteria FAQ',
      context: 'Cross-country pipeline procedures reference API 1104 Section 9 acceptance.',
    },
    {
      href: '/methods/ultrasonic-testing',
      label: 'Ultrasonic Testing method overview',
      context: 'Method overview context for procedure authors writing UT-specific scope.',
    },
  ],
  citations: [
    {
      id: 'asme-v-art-1',
      source: 'ASME BPVC Section V, Article 1, 2023 edition — General Requirements, §T-130 Personnel and §T-150 Procedure',
    },
    {
      id: 'astm-e317',
      source: 'ASTM E317-21 — Standard Practice for Evaluating Performance Characteristics of Ultrasonic Pulse-Echo Testing Instruments and Systems',
    },
    {
      id: 'asme-v-art-2',
      source: 'ASME BPVC Section V, Article 2, 2023 edition — Radiographic Examination',
    },
    {
      id: 'astm-e165',
      source: 'ASTM E165/E165M-23 — Standard Practice for Liquid Penetrant Testing for General Industry',
    },
    {
      id: 'asme-b31-3',
      source: 'ASME B31.3-2022 — Process Piping, §344 Examination',
    },
    {
      id: 'api-1104',
      source: 'API 1104, 22nd ed. (2021) — Welding of Pipelines and Related Facilities, Section 9 and Section 11',
    },
    {
      id: 'snt-tc-1a',
      source: 'ASNT SNT-TC-1A:2020 — Recommended Practice for Personnel Qualification and Certification in Nondestructive Testing',
    },
  ],
};

export default article;
