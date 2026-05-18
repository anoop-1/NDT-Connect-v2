import type { StandardContent } from '../types';

const standard: StandardContent = {
  code: 'API 510',
  fullTitle: 'Pressure Vessel Inspection Code: In-Service Inspection, Rating, Repair, and Alteration',
  organization: 'American Petroleum Institute',
  edition: '11th Edition, May 2014, with Addendums through 2022',
  slug: 'api-510',
  metaTitle: 'API 510 Pressure Vessel Inspection: Intervals, Scope, Audit Findings',
  metaDescription: 'API 510 11th ed. controls in-service pressure vessel inspection. Intervals, thickness surveys, RBI, repair rules, and the audit findings that get owners cited.',
  heroLede:
    'API 510 enters scope the moment a vessel covered by ASME Section VIII is placed in process service at a refinery, petrochemical plant, or chemical plant operating under OSHA Process Safety Management (29 CFR 1910.119). The 11th edition (2014, with 2022 addendums) fixes external visual intervals at 5 years or one-quarter remaining life, whichever is shorter, and forces internal inspection at intervals capped at 10 years unless a documented Risk-Based Inspection program under API 580/581 justifies extension. The code does not regulate new construction — that lives in ASME Section VIII Division 1 or 2 — but the moment hydrocarbon hits the shell, API 510 governs every thickness reading, every nozzle inspection, every weld repair, and every Fitness-for-Service evaluation under API 579-1/ASME FFS-1.',
  scope:
    'API 510 covers in-service inspection, repair, alteration, and rerating of pressure vessels that operate above 15 psig and were built to ASME Section VIII or equivalent recognized code. It applies to vessels in refining, petrochemical, and chemical service, including reactors, columns, drums, separators, heat exchangers shells, and storage spheres above 15 psig. Vessels below 15 psig, multi-chambered transport vessels, and vessels in nuclear service fall outside the code. State pressure vessel jurisdictions in the United States adopt API 510 by reference (notably California Title 8 §462 and Texas Health and Safety Code Chapter 755), making compliance not just a contractual requirement but a legal one.',
  whoMustComply: [
    'Owners and operators of pressure vessels in process service at facilities covered by OSHA 29 CFR 1910.119 (Process Safety Management)',
    'Refiners and petrochemical operators in US jurisdictions adopting API 510 by reference (TX, CA, LA, OK, IL, OH, PA among others)',
    'EPC contractors performing in-service rerating or alteration of existing ASME Section VIII vessels',
    'Authorized Inspection Agencies (AIAs) supplying API 510 Authorized Inspectors to facility owners',
    'Engineering contractors performing API 579 Fitness-for-Service evaluations on flagged equipment',
    'Mechanical integrity managers responsible for closing OSHA PSM Element MI deficiencies',
  ],
  keyRequirements: [
    {
      heading: 'Authorized Inspector certification and independence',
      level: 2,
      paragraphs: [
        'API 510 §4.3 requires all inspections, repair authorizations, and rerating calculations to be performed or directly supervised by an API 510 Authorized Inspector (AI). The AI must hold a current API Individual Certification Program (ICP) certificate, which requires passing both a closed-book and open-book exam, three years of pressure vessel inspection experience, and continuing recertification every three years (API ICP Body of Knowledge, 2023 revision).',
        'The AI does not need to be employed by the owner. Third-party AIAs supply contract inspectors. The code is strict on independence: the AI cannot also be the engineer who designed a repair if the repair changes pressure boundary geometry, and the AI must report inspection findings directly to the owner-user without filter from operations management. Many OSHA PSM citations trace back to "AI suppression" — inspection reports altered or buried by plant management.',
      ],
    },
    {
      heading: 'Inspection plan and intervals',
      level: 2,
      paragraphs: [
        'Per §6.3 and §6.4, every vessel needs a written inspection plan signed by the AI and the owner-user. The plan must specify methods (visual, UT thickness, PAUT, AUBT, ECT for tube bundles, etc.), locations (CMLs — Condition Monitoring Locations), techniques, and acceptance criteria. CMLs are not random — they are chosen based on damage mechanisms expected from the operating envelope, referencing API 571 for mechanism identification.',
        'Default intervals: external visual is the lesser of 5 years or one-quarter remaining life (§6.4.1). Internal or on-stream UT inspection is the lesser of 10 years or one-half remaining life (§6.4.2). The 10-year cap can be extended only through a documented RBI assessment per API 580 and API 581 with assessment validity not exceeding 10 years and reassessment every 5 years minimum.',
      ],
      callout: {
        kind: 'warn',
        title: 'Interval shortening triggers',
        body: 'If the calculated remaining life drops below 4 years on external or 20 years on internal, intervals shorten automatically per §6.4. Damage mechanism changes (sour service introduction, temperature excursion) also reset the clock and require AI re-evaluation.',
      },
    },
    {
      heading: 'Thickness measurements and corrosion rates',
      level: 2,
      paragraphs: [
        'Section 7 specifies UT thickness as the primary survey tool, with calibration to ASTM E797 and instrument verification before and after each measurement set. The code distinguishes short-term corrosion rate (last two readings) from long-term corrosion rate (current minus initial or baseline), and the AI must use the higher of the two for remaining life calculations (§7.1.1).',
        'CMLs must be representative of the vessel\'s damage mechanisms. A reactor in hydrotreating service expects high-temperature H₂S sulfidation per API 571 §4.4.2, so CMLs cluster on the bottom head and around inlet nozzles where velocity and temperature peak. Storage spheres expect external CUI under deteriorated insulation per API 583 — CMLs follow the support ring and any cold-spot zone.',
      ],
    },
    {
      heading: 'Repair, alteration, and rerating',
      level: 2,
      paragraphs: [
        'Section 8 separates repairs (restore to original specification) from alterations (change pressure boundary geometry, MAWP, or service). Both require AI authorization. Welded repairs follow a written procedure qualified to ASME Section IX, with PWHT requirements pulled from the original construction code or relaxed only through controlled deposition welding under §8.1.7.1 with engineering analysis.',
        'Rerating per §8.2 allows MAWP increase or decrease based on new thickness measurements, material verification, or operating envelope change. The rerating calculation must follow ASME Section VIII (the original construction code), be signed by an AI, and be accompanied by an updated nameplate stamping and Manufacturer\'s Data Report Form U-1A amendment.',
      ],
    },
    {
      heading: 'Risk-Based Inspection program requirements',
      level: 2,
      paragraphs: [
        'Annex on RBI references API 580 (program elements) and API 581 (quantitative methodology). To extend internal intervals beyond the 10-year default, the owner must implement a documented RBI program with consequence and probability scoring, damage mechanism review per API 571, and management of change procedures that re-trigger assessment when operating conditions shift.',
        'The most common citation here is poor MOC (Management of Change) discipline — operating temperature creep, feed sulfur increase, or velocity changes from revamp work that never triggered RBI reassessment. The AI must have visibility into the MOC process, and many sites integrate this through their CMMS or RBI software (Meridium APM, PCMS, GE APM).',
      ],
    },
  ],
  inspectionIntervals: {
    caption: 'API 510 default inspection intervals (§6.4) — without RBI extension',
    headers: ['Inspection type', 'Default interval', 'Hard cap', 'Trigger to shorten'],
    rows: [
      ['External visual', '5 years or 1/4 remaining life', '5 years', 'Insulation damage, CUI history, paint failure'],
      ['Internal/on-stream UT', '10 years or 1/2 remaining life', '10 years', 'Active corrosion >10 mpy, mechanism change'],
      ['CUI inspection', '5 years for 25-250°F carbon steel', '5 years', 'Insulation breach, weather barrier failure'],
      ['Pressure relief device', '5 years (clean service), 10 years (severe)', '10 years', 'Past stuck-open events, fouling history'],
      ['On-stream RBI-extended', 'Up to 10 years calculated', '10 years cal', 'Operating envelope change, MOC trigger'],
    ],
  },
  acceptanceCriteria: {
    caption: 'API 510 corrosion and remaining life acceptance limits',
    headers: ['Parameter', 'Threshold', 'Code reference', 'Action required'],
    rows: [
      ['Minimum thickness (general)', 'tmin per ASME VIII calculation', '§7.4', 'FFS per API 579 if below tmin'],
      ['Locally thin area', '0.9 × tmin acceptable with FFS Level 1', 'API 579-1 Part 5', 'Level 1/2/3 FFS assessment'],
      ['Pitting depth', 'Up to 50% of tmin with FFS evaluation', 'API 579-1 Part 6', 'Pit charting, RLA review'],
      ['Crack-like flaw', 'Not acceptable without FFS', 'API 579-1 Part 9', 'Engineering critical assessment'],
      ['Blister with no cracking', 'Document and monitor', '§7.5', 'HIC/SOHIC review per API 571'],
      ['Bulge or distortion', 'Engineering evaluation', '§7.5.5', 'FFS per API 579-1 Part 8'],
    ],
  },
  relatedStandards: [
    {
      code: 'ASME Section VIII Division 1',
      relation: 'Original construction code referenced for rerating calculations and material/weld requirements',
    },
    {
      code: 'API 571',
      relation: 'Damage mechanisms reference used to identify expected degradation when planning CMLs',
    },
    {
      code: 'API 579-1/ASME FFS-1',
      relation: 'Fitness-for-Service standard invoked when thickness or flaw exceeds basic acceptance',
    },
    {
      code: 'API 580',
      relation: 'Risk-Based Inspection program elements required to extend default intervals',
    },
    {
      code: 'API 581',
      relation: 'Quantitative RBI methodology supplying consequence and probability calculations',
    },
  ],
  commonAuditFindings: [
    'CMLs not justified by damage mechanism — generic grid pattern instead of API 571 mechanism-driven layout. Citation: §6.3.2.',
    'Long-term corrosion rate ignored in favor of more favorable short-term rate, masking degradation. Citation: §7.1.1.',
    'PRV inspection past 5-year interval with no RBI extension documented. Citation: §6.8.',
    'Repair welds without WPS qualified to ASME IX, or PWHT skipped without engineering analysis. Citation: §8.1.5.',
    'AI signature appearing on inspection reports without AI presence at the inspection — "rubber stamp" violation. Citation: §4.3.',
    'RBI assessment older than 5 years still being used to justify extended intervals. Citation: API 580 §8.2.',
    'MOC events (feed sulfur change, temp creep) not triggering RBI reassessment. Most common OSHA PSM Element MI citation.',
    'Nameplate not updated after rerating, or U-1A amendment missing. Citation: §8.2.5.',
  ],
  faqs: [
    {
      q: 'When does API 510 supersede ASME Section VIII?',
      a: 'It never supersedes — they govern different lifecycle phases. ASME Section VIII governs design, fabrication, and stamping of new pressure vessels. The moment a Section VIII vessel goes into process service at a covered facility, API 510 takes over for in-service inspection, repair, alteration, and rerating. Section VIII is still referenced when calculating new MAWP during a rerating or qualifying repair welds, but the inspection program itself is API 510 territory. A common confusion at audits: inspectors quoting Section VIII tolerances for an in-service repair when API 510 §8 sets the rules.',
    },
    {
      q: 'How does RBI legally let me extend internal inspection past 10 years?',
      a: 'API 510 §6.4.2 caps internal inspection at the lesser of 10 years or half the remaining life — but Annex on Risk-Based Inspection allows extension when a documented program per API 580 with quantitative methodology per API 581 supports it. The RBI assessment must show that the combined probability and consequence of failure remains within the owner\'s risk target, must be re-validated every 5 years, and must be tied into the site Management of Change procedure. Some jurisdictions (California, parts of Texas) also require state pressure vessel authority concurrence before applying RBI extension on insurance-stamped vessels.',
    },
    {
      q: 'Who can sign off on an API 510 repair?',
      a: 'An API 510 Authorized Inspector (AI) authorizes the repair scope before work starts and signs the Repair Plan and Repair Record after completion. The AI must hold a current API ICP API 510 certificate. The welding work itself is performed by welders qualified to ASME Section IX under a Welding Procedure Specification, but the AI authorization is what makes the repair code-compliant. If the repair is also an alteration (changing pressure boundary geometry or MAWP), the engineering calculation must also be reviewed and signed by a qualified pressure vessel engineer, and the alteration must be recorded with the jurisdictional authority.',
    },
    {
      q: 'What is the practical difference between API 510 and API 570?',
      a: 'API 510 governs pressure vessels — drums, columns, reactors, exchangers shells. API 570 governs in-service piping — process piping, instrument piping, and metallic transmission lines. They share inspection philosophy, AI certification structure, and reference API 571 for damage mechanisms and API 579 for Fitness-for-Service, but the inspection intervals, CML strategies, and repair rules differ because piping fails by different mechanisms (dead-leg corrosion, injection point thinning, vibration cracking) than vessels. A facility under PSM typically has both an API 510 and API 570 program, often run by overlapping staff but with separate documentation streams.',
    },
    {
      q: 'Does API 510 apply to vessels below 15 psig?',
      a: 'No. API 510 §1.2.1 explicitly excludes vessels operating at 15 psig or below. Atmospheric storage tanks fall under API 653 instead, and low-pressure storage tanks (between atmospheric and 15 psig) are covered by API 620. The scope cutoff matters at audits because some hot oil surge drums and slop systems sit close to the threshold — a vessel rated above 15 psig MAWP is API 510 even if operating below that pressure. The MAWP, not the operating pressure, drives scope.',
    },
  ],
  internalLinks: [
    {
      href: '/ultrasonic-testing',
      label: 'Ultrasonic thickness testing',
      context: 'UT thickness is the workhorse method for API 510 CML surveys.',
    },
    {
      href: '/methods/phased-array-ultrasonic-testing',
      label: 'PAUT corrosion mapping',
      context: 'PAUT resolves localized thinning patterns that single-point UT misses.',
    },
    {
      href: '/standards/api-570',
      label: 'API 570 piping inspection',
      context: 'Sister code for in-service piping, often run by the same inspection team.',
    },
    {
      href: '/standards/api-579',
      label: 'API 579 Fitness-for-Service',
      context: 'Invoked whenever a vessel flaw exceeds basic API 510 acceptance.',
    },
    {
      href: '/standards/api-571',
      label: 'API 571 damage mechanisms',
      context: 'Drives CML placement and inspection method selection.',
    },
    {
      href: '/industries/oil-gas-refining',
      label: 'Refining inspection programs',
      context: 'Primary industry where API 510 compliance is enforced under OSHA PSM.',
    },
    {
      href: '/free-tools/corrosion-rate-calculator',
      label: 'Corrosion rate calculator',
      context: 'Calculate short-term and long-term corrosion rates per API 510 §7.1.1.',
    },
    {
      href: '/free-tools/remaining-life-calculator',
      label: 'Remaining life calculator',
      context: 'Project remaining life from thickness trends to drive interval decisions.',
    },
    {
      href: '/find-providers',
      label: 'Find API 510 inspection providers',
      context: 'Locate AIAs supplying API 510 Authorized Inspectors in your region.',
    },
  ],
  citations: [
    {
      id: 'api-510-cover',
      source: 'API 510, Pressure Vessel Inspection Code, 11th ed. (May 2014, addendums through 2022)',
      url: 'https://www.api.org/products-and-services/standards/important-standards-announcements/standard-510',
    },
    {
      id: 'api-510-4-3',
      source: 'API 510 §4.3 — Authorized Inspector qualification and responsibilities',
    },
    {
      id: 'api-510-6-3',
      source: 'API 510 §6.3 — Inspection planning and Condition Monitoring Locations',
    },
    {
      id: 'api-510-6-4',
      source: 'API 510 §6.4 — Inspection intervals (external, internal, on-stream)',
    },
    {
      id: 'api-510-7',
      source: 'API 510 §7 — Inspection methods, thickness measurements, and corrosion rate calculation',
    },
    {
      id: 'api-510-8',
      source: 'API 510 §8 — Repair, alteration, and rerating',
    },
    {
      id: 'asme-viii-1',
      source: 'ASME Boiler and Pressure Vessel Code, Section VIII, Division 1 (2023 edition)',
      url: 'https://www.asme.org/codes-standards/bpvc-standards',
    },
    {
      id: 'asme-ix',
      source: 'ASME Section IX (2023) — Welding, Brazing, and Fusing Qualifications',
    },
    {
      id: 'api-571',
      source: 'API 571, Damage Mechanisms Affecting Fixed Equipment in the Refining Industry, 3rd ed. (2020)',
    },
    {
      id: 'api-579',
      source: 'API 579-1/ASME FFS-1, Fitness-For-Service, 3rd ed. (2021)',
    },
    {
      id: 'api-580',
      source: 'API 580, Risk-Based Inspection, 4th ed. (2023)',
    },
    {
      id: 'api-581',
      source: 'API 581, Risk-Based Inspection Methodology, 3rd ed. (2016, with addendums)',
    },
    {
      id: 'osha-psm',
      source: 'OSHA 29 CFR 1910.119, Process Safety Management of Highly Hazardous Chemicals',
      url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119',
    },
    {
      id: 'astm-e797',
      source: 'ASTM E797/E797M-21, Standard Practice for Measuring Thickness by Manual Ultrasonic Pulse-Echo Contact Method',
    },
    {
      id: 'api-icp',
      source: 'API Individual Certification Program — API 510 Body of Knowledge (2023)',
      url: 'https://www.api.org/products-and-services/individual-certification-programs/certifications/api510',
    },
  ],
};

export default standard;
