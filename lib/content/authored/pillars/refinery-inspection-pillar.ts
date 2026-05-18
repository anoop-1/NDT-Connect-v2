import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'refinery-inspection-pillar',
  metaTitle: 'Refinery Inspection Hub: Turnarounds, Damage Mechanisms, Codes',
  metaDescription:
    'The full refinery inspection cluster — turnaround planning, unit-by-unit damage mechanisms, API 510/570/653, RBI, FFS, and OSHA PSM compliance.',
  heroLede:
    'Refinery inspection is unit-by-unit risk management, not a generic NDT scope. A crude unit\'s desalter and overhead receiver fail by entirely different damage mechanisms than the FCC reactor riser, and the inspection regime for an alkylation unit\'s acid settler bears no resemblance to the hydrotreater feed/effluent exchanger train. This hub maps the full refinery inspection cluster on NDT Connect: turnaround planning and execution, unit-specific damage mechanisms under API 571, in-service inspection under API 510/570/653, risk-based inspection under API 580/581, fitness-for-service under API 579-1, and the regulatory compliance regime under OSHA PSM 29 CFR 1910.119 and EPA RMP 40 CFR 68.',
  topicOverview:
    'The refinery cluster splits along three axes: by unit (crude, vacuum, FCC, hydrotreaters, hydrocracker, reformer, alkylation, sulfur recovery, sour water stripper, amine treaters, tank farm, flare), by equipment (pressure vessels, piping, storage tanks, heat exchangers, fired heaters, rotating equipment), and by life-cycle phase (construction commissioning, in-service inspection, turnaround execution, decommissioning). Sub-articles cover the dominant damage mechanisms per unit (high-temperature H2/H2S corrosion in hydrotreaters, naphthenic acid corrosion in vacuum overhead, sulfidation in crude furnaces, polythionic acid stress corrosion cracking in austenitic crude overhead piping after sour water condensation, refractory degradation in FCC, dew-point corrosion in flue gas, MIC in cooling water), the integrated inspection plan structure under API 510/570/653, and the turnaround execution discipline that runs 35-50 day stops with 200-600 NDT technicians on site.',
  subPages: [
    {
      href: '/industries/oil-gas-refining',
      label: 'Refining Industry Overview',
      description:
        'Industry sizing, the unit set, capital and operating spend profile, regulatory framework, and the inspection contractor ecosystem.',
    },
    {
      href: '/standards/api-510',
      label: 'API 510 — Pressure Vessel Inspection',
      description:
        'The governing in-service inspection code for pressure vessels in refineries and chemical plants. External, internal, and on-stream intervals under §6.4.',
    },
    {
      href: '/standards/api-570',
      label: 'API 570 — Piping Inspection',
      description:
        'The piping in-service inspection code — Class 1/2/3 piping circuit definition, CML strategy, and the interval-setting framework.',
    },
    {
      href: '/standards/api-653',
      label: 'API 653 — Tank Inspection',
      description:
        'The aboveground storage tank inspection, repair, alteration, and reconstruction code. External, internal, and floor inspection regime.',
    },
    {
      href: '/standards/api-579-1',
      label: 'API 579-1 / ASME FFS-1 — Fitness for Service',
      description:
        'The fitness-for-service procedure for damaged equipment. Three-level assessment, with Levels 1 and 2 typical for inspection-driven decisions.',
    },
    {
      href: '/standards/api-571',
      label: 'API 571 — Damage Mechanisms',
      description:
        'The damage-mechanism reference. 65 mechanisms cataloged with susceptibility, morphology, prevention, and the recommended inspection technique.',
    },
    {
      href: '/learn/refinery-turnaround-inspection-plan',
      label: 'Refinery Turnaround Inspection Plan',
      description:
        'The TA planning sequence — readiness review, scope freeze, contractor mobilization, day-by-day inspection schedule, and the close-out integrity report.',
    },
    {
      href: '/learn/fcc-unit-inspection-scope',
      label: 'FCC Unit Inspection Scope',
      description:
        'Riser refractory mapping, reactor cyclone wear, regenerator shell creep, slide valve seat inspection, and the catalyst-handling tankage scope.',
    },
    {
      href: '/learn/hydroprocessing-inspection-scope',
      label: 'Hydroprocessing Inspection Scope',
      description:
        'High-temperature hydrogen attack (HTHA) screening on the reactor and effluent train, sulfidation mapping, and the cold-side amine corrosion locations.',
    },
    {
      href: '/learn/crude-unit-inspection-scope',
      label: 'Crude Unit Inspection Scope',
      description:
        'Desalter internals, overhead receiver chloride corrosion, vacuum tower naphthenic acid, atmospheric tower nozzle inspection, and furnace tube creep.',
    },
    {
      href: '/methods/ultrasonic-corrosion-mapping',
      label: 'UT Corrosion Mapping for Refinery Equipment',
      description:
        'Encoded PAUT corrosion mapping for in-service vessel and piping thickness work — the workhorse technique for refinery integrity surveys.',
    },
    {
      href: '/methods/pulsed-eddy-current',
      label: 'Pulsed Eddy Current for CUI Screening',
      description:
        'Through-insulation thickness screening on refinery piping and equipment — the first-pass CUI tool before targeted insulation removal.',
    },
    {
      href: '/industries/petrochemical',
      label: 'Petrochemical Plant Inspection',
      description:
        'The petrochemical companion cluster — ethylene crackers, polymer reactors, aromatics units, and the inspection regime shared with refining.',
    },
    {
      href: '/case-studies/cml-revision-after-naphthenic-acid-failure',
      label: 'Case Study: CML Revision After Naphthenic Acid Failure',
      description:
        'A vacuum unit failure traced to a CML grid that placed no locations at the elbow extrados where high-velocity naphthenic acid corrosion was active.',
    },
  ],
  expertCommentary:
    'Refinery turnarounds are the largest concentrated industrial inspection events on Earth and they are routinely planned by schedule first, mechanism inventory second. The pattern: a 35-day TA gets a frozen scope at T-180 days, the inspection contractor mobilizes 250 technicians, and the integrity engineer\'s pre-TA mechanism review surfaces three new damage mechanisms two weeks into the stop — because the feedstock changed in the last operating cycle and no one updated the mechanism inventory. The fix is upstream. The pre-TA integrity review must include the process engineer\'s feedstock history for the cycle, the corrosion engineer\'s damage-mechanism re-evaluation against API 571, and the inspection engineer\'s CML coverage analysis against the updated mechanism list. The TA scope freeze should follow the mechanism review, not precede it. Second, the inspection-to-disposition handoff is where TA schedule extends. A PAUT survey on the FCC reactor returns 14 indications and the integrity team needs 5 days to disposition them against API 579-1 Level 1 and Level 2 FFS — and the unit is already idle waiting on a repair-or-run decision. The fix is procedural: pre-stage the FFS analyst on site, with the relevant Level 1 spreadsheets pre-built for the units being inspected, so disposition can happen same-day on routine indications and only complex cases route to Level 2/3. Third, the contractor mix. Most refineries we work with run 5-12 NDT contractors during a TA, each with their own procedures and reporting formats. The integrity engineer spends week 3 of a 5-week TA reconciling reports across contractors. Standardize the report format and the procedure references at the contract level, before mobilization. The TA executes faster when the data structure is forced upstream.',
  externalResources: [
    {
      label: 'API — Refining Standards Library',
      url: 'https://www.api.org/products-and-services/standards/whats-new/publication-updates/refining',
    },
    {
      label: 'OSHA 29 CFR 1910.119 — Process Safety Management',
      url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119',
    },
    {
      label: 'EPA 40 CFR Part 68 — Risk Management Program',
      url: 'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-68',
    },
    {
      label: 'NACE/AMPP — Refining Corrosion Resources',
      url: 'https://www.ampp.org/',
    },
    {
      label: 'ASME — Pressure Technology Codes',
      url: 'https://www.asme.org/codes-standards/pressure-technology',
    },
  ],
  faqs: [
    {
      q: 'What is the typical inspection scope for a refinery turnaround?',
      a: 'A typical mid-size refinery TA (180,000 BPD, 35-day stop) inspects 2,500-5,000 CMLs across the in-scope units, performs 80-200 ultrasonic surveys on vessels and piping, runs 100-400 radiographic exposures on weld repairs and new spool fabrication, and performs internal visual inspection on 8-15 pressure vessels. The PAUT corrosion mapping scope typically covers 5,000-15,000 square inches of vessel and piping wall. Tank work runs in parallel — typically 2-4 tanks per TA on a 5- to 10-year cycle under API 653. The inspection contractor crew size runs 150-300 technicians at peak, including UT/PAUT, RT, MT/PT, visual, and supervisory CWI/API-certified inspectors.',
    },
    {
      q: 'How does API 510 set inspection intervals?',
      a: 'API 510 §6.4 sets two prescriptive intervals: external visual at 5 years or quarter-life of the vessel (whichever is less), and internal inspection at 10 years or half-life (whichever is less). The corrosion rate that drives the half-life calculation comes from the CML thickness history under §7.1. Owner-user programs may extend intervals under §6.4.3 if the vessel is on an RBI program qualified under API 580/581. The on-stream alternative (§6.4.2) allows replacement of internal inspection with on-stream NDT (UT, PAUT, RT) where the vessel construction and damage mechanisms permit external-only inspection coverage of the population.',
    },
    {
      q: 'What is HTHA and why is it the most-feared damage mechanism in hydroprocessing?',
      a: 'High-temperature hydrogen attack — atomic hydrogen diffuses into carbon and low-alloy steels at elevated temperature and partial pressure, reacts with metallic carbides to form methane in the grain boundaries, and produces decarburization plus internal fissuring that grows to through-wall cracking. The fear: HTHA progresses without visible external signs, conventional UT corrosion mapping does not resolve the fine fissures, and the failure mode is sudden hydrogen-rich vessel rupture. API 941 gives the Nelson curves that bound safe operation; advanced UT techniques (TOFD, time-of-flight backscatter, attenuation analysis, velocity ratio) are the inspection tools, but interpretation is specialist work. API 941 (latest edition) is the governing reference and the only authoritative susceptibility chart.',
    },
    {
      q: 'How does OSHA PSM affect refinery inspection planning?',
      a: 'OSHA PSM 29 CFR 1910.119(j) requires written mechanical integrity procedures, inspection and testing of process equipment per recognized and generally accepted good engineering practice (RAGAGEP — API 510, 570, 653 are the cited references), and documented training of personnel involved in mechanical integrity. Inspection records must be kept and any equipment found deficient must be corrected before continued use or operated within limits with documented justification. PSM audits at 3-year intervals examine the inspection program for completeness, training currency, and finding-resolution. EPA RMP 40 CFR 68 layers risk management plan requirements on top for facilities with covered process chemistries.',
    },
  ],
  internalLinks: [
    {
      href: '/learn/htha-inspection-techniques',
      label: 'HTHA Inspection Techniques',
      context: 'TOFD, backscatter, attenuation, and velocity-ratio methods for high-temperature hydrogen attack — the specialist toolkit.',
    },
    {
      href: '/learn/turnaround-inspection-scheduling',
      label: 'Turnaround Inspection Scheduling',
      context: 'Day-by-day TA inspection schedule construction — release order, equipment availability windows, and the rework holdback.',
    },
    {
      href: '/equipment/eddyfi-lyft-pec',
      label: 'Eddyfi Lyft PEC Screening Tool',
      context: 'The dominant CUI screening tool for refinery piping inspection — operating range and footprint considerations.',
    },
    {
      href: '/standards/asme-b31-3',
      label: 'ASME B31.3 — Process Piping',
      context: 'The construction code for refinery process piping that API 570 in-service inspection references.',
    },
    {
      href: '/standards/api-941',
      label: 'API 941 — Steels for Hydrogen Service',
      context: 'The Nelson curve reference for HTHA susceptibility — material selection and operating envelope.',
    },
    {
      href: '/case-studies/htha-found-during-turnaround',
      label: 'Case Study: HTHA Found During Turnaround',
      context: 'A hydroprocessing reactor with HTHA detected only because the integrity team specified TOFD over conventional UT for the high-temperature portion.',
    },
    {
      href: '/tools/remaining-life-calculator',
      label: 'Remaining Life Calculator',
      context: 'Compute remaining life from thickness, corrosion rate, and corroded thickness per API 510 §7.1.1.',
    },
    {
      href: '/careers/api-510-inspector',
      label: 'API 510 Inspector Career Pathway',
      context: 'The API 510 certification path — exam structure, prerequisite experience, and the role in refinery inspection programs.',
    },
  ],
  citations: [
    {
      id: 'api-510',
      source: 'API 510, 11th ed., 2022, Pressure Vessel Inspection Code',
    },
    {
      id: 'api-570',
      source: 'API 570, 5th ed., 2023, Piping Inspection Code',
    },
    {
      id: 'api-571',
      source: 'API 571, 3rd ed., 2020, Damage Mechanisms Affecting Fixed Equipment in the Refining Industry',
    },
    {
      id: 'api-941',
      source: 'API 941, 9th ed., 2022, Steels for Hydrogen Service at Elevated Temperatures and Pressures',
    },
    {
      id: 'osha-1910-119',
      source: 'OSHA 29 CFR 1910.119, Process Safety Management of Highly Hazardous Chemicals',
    },
  ],
};

export default pillar;
