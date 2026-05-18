import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'corrosion-monitoring-pillar',
  metaTitle: 'Corrosion Monitoring Hub: CML, RBI, Damage Mechanisms',
  metaDescription:
    'The full corrosion monitoring cluster — CML strategy, damage mechanisms, RBI integration, UT mapping, FSM, ER/LPR probes, and CUI screening.',
  heroLede:
    'Corrosion monitoring fails most often not because the inspection technology is wrong, but because the condition monitoring location plan never updated for the actual damage mechanism. A CML grid laid out for general thinning on a 1990s hydroprocessing line will miss localized sulfidation at flow disruptions, and the next thickness reading on schedule confirms what the plan tracks — not what the asset is doing. This hub maps the full corrosion monitoring discipline on NDT Connect: CML design under API 570 and API 510, damage-mechanism cataloging per API 571, online monitoring with ER/LPR/FSM probes, ultrasonic corrosion mapping with PAUT, the RBI integration under API 580/581, and the corrosion-under-insulation screening regime.',
  topicOverview:
    'The corrosion monitoring cluster covers four supply chains: in-service thickness monitoring (CML), online corrosion sensors (electrical resistance, linear polarization resistance, field signature method), corrosion-under-insulation (CUI) screening (pulsed eddy current, real-time radiography, infrared, insulation removal sampling), and damage-mechanism cataloging under API 571. It connects to the RBI cluster (API 580/581) because CML placement is fundamentally a function of corrosion mechanism, and the FFS cluster (API 579-1/ASME FFS-1) because the thickness data feeds the remaining-life calculation. Sub-articles cover the specific damage mechanisms — sulfidation, naphthenic acid corrosion, amine corrosion, polythionic acid stress corrosion cracking, chloride pitting in cooling water systems, microbiologically influenced corrosion (MIC), erosion-corrosion at flow disruptions, dew-point corrosion in flue gas systems — and the inspection technique mapped to each. The cluster also covers data systems (IDMS, integrity data management systems), CML naming conventions, and the auditor-friendly records required for API 510, 570, and 653 inspection plan approval.',
  subPages: [
    {
      href: '/standards/api-510',
      label: 'API 510 — Pressure Vessel Inspection',
      description:
        'The governing in-service inspection code for pressure vessels. CML placement, inspection interval setting, and the half-life rule for external visual.',
    },
    {
      href: '/standards/api-570',
      label: 'API 570 — Piping Inspection',
      description:
        'The piping equivalent — covers CML strategy for process piping, classification of piping circuits, and the corrosion rate calculation that drives inspection intervals.',
    },
    {
      href: '/standards/api-571',
      label: 'API 571 — Damage Mechanisms',
      description:
        'The damage-mechanism reference. Sixty-five mechanisms cataloged with susceptibility, morphology, and the recommended inspection technique for each.',
    },
    {
      href: '/standards/api-580',
      label: 'API 580 — Risk-Based Inspection',
      description:
        'The framework for risk-based CML planning. Probability of failure (POF) and consequence of failure (COF) drive inspection prioritization.',
    },
    {
      href: '/methods/ultrasonic-corrosion-mapping',
      label: 'UT Corrosion Mapping (PAUT/Conventional)',
      description:
        'Encoded PAUT corrosion mapping for in-service thickness work. Replaced grid-pattern conventional UT as the default for most refinery and pipeline corrosion surveys.',
    },
    {
      href: '/methods/pulsed-eddy-current',
      label: 'Pulsed Eddy Current (PEC)',
      description:
        'Through-insulation thickness screening on carbon steel — does not resolve point defects but flags wall loss averaging over a 100-200 mm footprint. The dominant CUI screening tool.',
    },
    {
      href: '/methods/long-range-ultrasonic-testing',
      label: 'Long-Range UT for Pipe Screening',
      description:
        'Guided wave screening of 30+ meters of pipe from a single ring location. Used for buried lines and pipe-rack screening between detailed CML inspections.',
    },
    {
      href: '/methods/electrical-resistance-probes',
      label: 'ER and LPR Online Probes',
      description:
        'Inserted probes that produce a real-time corrosion-rate signal. Best for process-stream-water corrosion (cooling tower returns, amine units) where the mechanism is uniform.',
    },
    {
      href: '/learn/cml-placement-strategy',
      label: 'CML Placement Strategy by Damage Mechanism',
      description:
        'How CML locations should track the mechanism — not the geometry. Mapping API 571 mechanisms to specific weld toe, elbow extrados, deadleg, and flow-disruption locations.',
    },
    {
      href: '/learn/corrosion-rate-calculation',
      label: 'Corrosion Rate Calculation (Short-Term, Long-Term)',
      description:
        'API 510 §7.1 and API 570 §7.1.1 corrosion rate definitions, the long-term vs short-term comparison, and the inspection-interval setting that follows.',
    },
    {
      href: '/learn/cui-screening-program',
      label: 'CUI Screening Program Design',
      description:
        'The systematic CUI program — paint specification, insulation jacketing inspection, PEC screening, and the targeted insulation removal that catches active corrosion.',
    },
    {
      href: '/tools/remaining-life-calculator',
      label: 'Remaining Life Calculator',
      description:
        'Compute remaining life from thickness readings, corrosion rate, and corroded thickness limit per API 510 §7.1.1.',
    },
    {
      href: '/industries/oil-gas-refining',
      label: 'Corrosion Monitoring in Refineries',
      description:
        'The refinery CML universe — typical 5,000-15,000 locations per site, the unit-by-unit damage-mechanism profile, and the turnaround integration.',
    },
    {
      href: '/case-studies/cml-revision-after-naphthenic-acid-failure',
      label: 'Case Study: CML Revision After Naphthenic Acid Failure',
      description:
        'A crude unit failure traced to a CML grid that placed no locations at the elbow extrados where high-velocity naphthenic acid corrosion was active.',
    },
  ],
  expertCommentary:
    'RBI saves money, but only when the corrosion mechanism inventory is complete. Most failures we audit trace back to a missing damage mechanism in the original CML plan, not a missed inspection. A 50-year-old crude unit reviewed for RBI today often has CML plans that assume general sulfidation — the dominant mechanism in 1985 — and miss the localized naphthenic acid attack that became dominant after the feedstock shift in 2005. The plan keeps reading thickness at locations the corrosion is not attacking, and the next failure shows up at an unmonitored elbow extrados. The fix is procedural: every five-year inspection plan review must include a damage-mechanism re-evaluation under API 571, with the process engineer and the corrosion engineer signing off on the mechanism inventory before the inspector lays out CMLs. Second issue: online corrosion sensors are routinely treated as a substitute for thickness inspection. They are not. ER probes measure metal loss at one point, in one stream, on a coupon that does not see the same flow regime as the pipe wall. They are excellent for trending and for detecting process upset (chloride excursion, oxygen ingress) and they are useless for the localized mechanism a CML survey catches. Use both. Third, CUI screening with PEC is a screening tool — the alarm flags wall loss averaging over a 150 mm footprint, and the follow-up is always either insulation removal or a smaller-footprint method (radiography in real time or pulsed eddy current array). Treating a clean PEC sweep as "no CUI present" is the most common false-negative in the industry. Build the mechanism inventory first, place CMLs against mechanisms, and treat screening tools as screening — and corrosion monitoring delivers the asset-life trending it is supposed to.',
  externalResources: [
    {
      label: 'API 510 — Pressure Vessel Inspection Code',
      url: 'https://www.api.org/products-and-services/standards/important-standards-announcements/standard-510',
    },
    {
      label: 'API 570 — Piping Inspection Code',
      url: 'https://www.api.org/products-and-services/standards/important-standards-announcements/standard-570',
    },
    {
      label: 'API 571 — Damage Mechanisms Affecting Fixed Equipment',
      url: 'https://www.api.org/products-and-services/standards/important-standards-announcements/standard-571',
    },
    {
      label: 'NACE/AMPP — Corrosion Resources',
      url: 'https://www.ampp.org/',
    },
    {
      label: 'API 580 — Risk-Based Inspection',
      url: 'https://www.api.org/products-and-services/standards/important-standards-announcements/standard-580',
    },
  ],
  faqs: [
    {
      q: 'How many CMLs do I need on a typical process pipe circuit?',
      a: 'API 570 §7.1.1 does not set a fixed count — it requires "sufficient CMLs to determine the corrosion rate." Practical defaults for a circuit of ~100 ft of NPS 8 carbon steel handling sour service: 6-12 CMLs minimum, placed at high-corrosion-probability locations (elbow extrados and intrados, tees, dead legs, downstream of control valves and orifices, downstream of mixing points where stream chemistry changes). Every CML must have a position-specific naming (e.g., "Circuit C-204 / Spool 3 / 12-o\'clock at long-radius elbow LE-12 extrados") so the same location can be reread on the next inspection cycle. RBI-driven plans under API 580 reduce CML count on low-consequence circuits and concentrate density on high-consequence circuits.',
    },
    {
      q: 'When is PEC screening enough versus targeted insulation removal?',
      a: 'PEC is a screening tool for general wall loss averaging over a 100-200 mm footprint on carbon steel through insulation up to ~100 mm thick. It is appropriate as the first-pass survey on a CUI-suspect circuit — paint-blistering visible, wet insulation, ambient cycling between dew point and dry. A clean PEC sweep on a circuit with no CUI-failure history is generally acceptable for the next inspection interval. A clean PEC sweep on a circuit with prior CUI failures, jacket damage visible, or chloride-contaminated insulation is not acceptable — targeted removal at the worst-condition spots is the follow-up. The procedure must define the trigger thresholds explicitly.',
    },
    {
      q: 'What is the corrosion rate definition under API 510?',
      a: 'API 510 §7.1.1 distinguishes two rates: long-term (LT) calculated from initial thickness to most-recent thickness divided by time in service, and short-term (ST) calculated between the two most-recent thickness measurements divided by elapsed time. The greater of LT and ST is used for remaining-life calculation. Sudden mechanism change (feedstock change, corrosion inhibitor failure, process upset) shows up in ST first, which is why the rule uses the worst case. Negative ST (apparent gain in thickness from measurement noise) is treated as zero, not added to remaining life.',
    },
    {
      q: 'How does RBI change CML strategy from the prescriptive interval approach?',
      a: 'Under prescriptive API 510 §6.4.1, every pressure vessel gets an internal inspection at the half-life interval or 10 years, whichever is less. Under API 580/581 RBI, the inspection interval is set by the probability and consequence of failure for each inspection effectiveness category, with intervals stretching to 15 or 20 years on low-POF/low-COF circuits and tightening to 2-3 years on high-COF circuits with active damage mechanisms. CML density follows the same logic — concentrate measurement on the mechanisms and locations driving POF, eliminate measurements on circuits where POF is dominated by mechanisms PEC or thickness cannot detect (e.g., environmental cracking, requires PAUT or PT).',
    },
  ],
  internalLinks: [
    {
      href: '/learn/api-571-damage-mechanism-catalog',
      label: 'API 571 Damage Mechanism Catalog',
      context: 'The full mechanism list with susceptibility tables and the inspection technique mapped to each — the reference for CML mechanism mapping.',
    },
    {
      href: '/learn/idms-data-management',
      label: 'IDMS — Integrity Data Management Systems',
      context: 'How CML data should be stored, with the naming convention, position tags, and trending requirements that survive personnel changes.',
    },
    {
      href: '/equipment/eddyfi-lyft-pec',
      label: 'Eddyfi Lyft PEC',
      context: 'The dominant pulsed eddy current screening tool — operating range, footprint, and signal-to-noise on typical CUI conditions.',
    },
    {
      href: '/equipment/olympus-38dl-plus',
      label: 'Olympus 38DL Plus Thickness Gauge',
      context: 'The field default thickness gauge for CML readings — dual-element probe operation and the bare-metal calibration block.',
    },
    {
      href: '/standards/asme-ffs-1-api-579',
      label: 'API 579-1 / ASME FFS-1 — Fitness for Service',
      context: 'The FFS standard the CML data feeds when remaining life falls below the next inspection interval.',
    },
    {
      href: '/case-studies/rbi-revision-after-cui-failure',
      label: 'Case Study: RBI Revision After CUI Failure',
      context: 'A unit-wide RBI revision triggered by a single CUI failure on a circuit screened clean by PEC the previous year.',
    },
    {
      href: '/compare/pec-vs-real-time-rt-for-cui',
      label: 'PEC vs Real-Time RT for CUI Screening',
      context: 'When PEC screening is sufficient and when real-time radiography is the right escalation technique.',
    },
    {
      href: '/tools/cml-interval-calculator',
      label: 'CML Inspection Interval Calculator',
      context: 'Compute next inspection interval from corrosion rate, current thickness, and corroded retired thickness per API 510 §7.1.1.',
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
      id: 'api-580',
      source: 'API 580, 4th ed., 2023, Risk-Based Inspection',
    },
    {
      id: 'api-581',
      source: 'API 581, 3rd ed., 2016, Risk-Based Inspection Methodology',
    },
  ],
};

export default pillar;
