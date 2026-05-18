import type { StandardContent } from '../types';

const standard: StandardContent = {
  code: 'API 570',
  fullTitle: 'Piping Inspection Code: In-Service Inspection, Rating, Repair, and Alteration of Piping Systems',
  organization: 'American Petroleum Institute',
  edition: '5th Edition, February 2023',
  slug: 'api-570',
  metaTitle: 'API 570 Piping Inspection: Intervals by Class, CMLs, RBI, Audit Risks',
  metaDescription: 'API 570 5th ed. (2023) sets in-service piping inspection rules. Class-based intervals, CML strategy, injection point rules, dead-leg cap, and common citations.',
  heroLede:
    'Process piping kills more workers in US refining than any other piece of equipment — OSHA accident data and CSB investigations from Tesoro Anacortes (2010), Chevron Richmond (2012), and Husky Superior (2018) all trace back to thinned piping that should have been flagged years earlier. API 570 (5th ed., February 2023) is the inspection code that closes that gap. It applies to in-service metallic piping built to ASME B31.3, B31.4, or B31.8, separates piping into four classes by fluid hazard, and ties inspection intervals to those classes with hard caps: Class 1 piping in lethal service caps at 5 years for thickness and 5 years for external visual. Like API 510, the code runs through the API Authorized Piping Inspector and integrates with API 571 for damage mechanism identification and API 579 for Fitness-for-Service when flaws exceed basic acceptance.',
  scope:
    'API 570 covers in-service metallic piping systems (including pipe, fittings, valves, flange assemblies, expansion joints, and pressure-relieving devices) in petroleum refining, petrochemical, and chemical plants. It does not cover pipelines under DOT jurisdiction (49 CFR 192/195) — those follow API 1163 and ASME B31.8S — and it does not cover utility services that are uninhabited, fully buried, or operate below specific exclusion thresholds defined in §1.2.2. Piping fabricated to ASME B31.3 (process), B31.4 (liquid hydrocarbon transportation within facility), or B31.8 (gas distribution within facility) all fall in scope once placed in service.',
  whoMustComply: [
    'Refinery and petrochemical operators with process piping under OSHA 29 CFR 1910.119 PSM coverage',
    'Chemical plant owners of piping in hazardous, flammable, or toxic service per OSHA PSM-listed chemicals',
    'API Authorized Piping Inspectors employed by owner-users or contracted Authorized Inspection Agencies',
    'EPC firms performing in-service alteration or rerating on existing ASME B31.3 process piping',
    'Maintenance contractors performing welded repairs requiring AI authorization',
    'Inspection engineering firms providing RBI program support and damage mechanism reviews',
  ],
  keyRequirements: [
    {
      heading: 'Piping classification and class assignment',
      level: 2,
      paragraphs: [
        'API 570 §6.3 splits piping into four classes by fluid hazard and operating conditions. Class 1 covers services with the highest potential consequence — flammable services that vaporize rapidly at ambient conditions (LPG, light hydrocarbons), services above autoignition temperature, hydrofluoric acid, hydrogen sulfide above 3% mol, and anhydrous ammonia. Class 2 covers services not in Class 1 but flammable or hazardous (most refinery process piping). Class 3 covers flammable but non-vaporizing services below autoignition (kerosene, diesel). Class 4 covers non-flammable, non-toxic services (water, steam under 150 psig).',
        'Class assignment is the owner-user\'s responsibility and must be documented in the inspection plan. A common audit finding is misclassification — a piping circuit carrying H₂S-laden sour water classified as Class 2 instead of Class 1 because the operator did not check the H₂S concentration against the §6.3 threshold. The classification drives every downstream interval, so getting it wrong cascades.',
      ],
    },
    {
      heading: 'Inspection intervals by class',
      level: 2,
      paragraphs: [
        'Section 6.5 fixes maximum intervals based on class. Thickness measurements: Class 1 caps at 5 years or one-half remaining life; Class 2 caps at 10 years or one-half remaining life; Class 3 caps at 10 years or one-half remaining life; Class 4 is optional. External visual: 5 years for Classes 1-3, optional for Class 4. CUI inspection follows §6.5.4 with a 5-year cap on carbon steel piping in the 25-250°F vulnerability range.',
        'Injection points, mix points, and dead-legs get special treatment in §5.4.1 and §5.4.2. Injection points (chemical injection into a process stream) require CMLs 12 inches upstream and 12 pipe diameters or three feet downstream of the injection nozzle, whichever is greater. Dead-legs (piping with no flow during normal operation) require CMLs at the dead-leg termination and at any low point where condensation or solids can collect.',
      ],
      callout: {
        kind: 'spec',
        title: 'Soil-to-air interfaces',
        body: 'Per §5.4.3, soil-to-air interface zones on buried piping require excavation and inspection within 6 to 18 inches of grade unless an alternative is qualified. CUI-equivalent risk at soil-to-air interfaces causes more piping leaks than any other single defect zone.',
      },
    },
    {
      heading: 'Condition Monitoring Locations and damage mechanisms',
      level: 2,
      paragraphs: [
        'CMLs must be chosen based on expected damage mechanisms from API 571 — generic gridding fails audits. A hydrotreater effluent line expects high-temperature H₂/H₂S corrosion per API 571 §4.4.2 and hydrogen attack per §5.1.3.1, so CMLs cluster at temperature transitions, at the bottom of horizontal runs, and downstream of any flow disturbance. A sour water stripper overhead expects ammonium bisulfide corrosion per §5.1.1.4, so CMLs target the first elbow after the tower top, low points before the reflux drum, and any control valve outlet where velocity peaks.',
        'CML density per §5.4 ranges from 25% of welds and components on Class 1 to 5% on Class 4. The 11th edition introduced clearer language on inspection effectiveness ratings (highly effective, usually effective, fairly effective, poorly effective) following API 581 Annex 2.C — RBI programs use these ratings to credit inspection coverage in probability calculations.',
      ],
    },
    {
      heading: 'Repair, alteration, and on-stream welding',
      level: 2,
      paragraphs: [
        'Section 8 covers repairs and alterations. All welded repairs require a WPS qualified to ASME Section IX, AI authorization before work starts, and an AI sign-off after. On-stream welding (hot tap, weld buildup over thinned wall) follows API RP 2201 (4th ed., 2020) plus §8.2.7 supplemental requirements. Temporary repairs are explicitly allowed — clamps, sleeves, weld buildup over thinned wall — but must be tracked, dated, and replaced or upgraded to permanent at the next turnaround unless a documented engineering analysis extends them.',
        'Alterations changing pressure boundary geometry, MAWP, design temperature, or service require engineering calculations to the original construction code (typically B31.3) plus AI authorization. Rerating per §8.4 follows the same logic as API 510 §8.2 — verify thickness, verify material, verify weld quality, recalculate MAWP, update nameplates and records.',
      ],
    },
  ],
  inspectionIntervals: {
    caption: 'API 570 §6.5 maximum inspection intervals by class',
    headers: ['Class', 'Service', 'Thickness max', 'External max', 'CUI max'],
    rows: [
      ['Class 1', 'LPG, HF, H₂S >3%, above autoignition', '5 years', '5 years', '5 years'],
      ['Class 2', 'Flammable but not Class 1 (most process)', '10 years', '5 years', '5 years'],
      ['Class 3', 'Flammable below autoignition (diesel, kero)', '10 years', '10 years', '10 years'],
      ['Class 4', 'Non-flammable, non-toxic', 'Optional', 'Optional', 'Optional'],
      ['Injection points', 'All classes', '3 years or 1/2 RL', '5 years', 'Per parent class'],
    ],
  },
  acceptanceCriteria: {
    caption: 'API 570 acceptance and action thresholds',
    headers: ['Condition', 'Limit', 'Reference', 'Required action'],
    rows: [
      ['General thinning below tmin', 'Per ASME B31.3 calculation', '§7.5', 'FFS per API 579 or replacement'],
      ['Local thin area', 'Per API 579 Part 5 Level 1', 'API 579 Part 5', 'FFS evaluation'],
      ['Pitting', 'Per API 579 Part 6', 'API 579 Part 6', 'Pit charting + RLA'],
      ['Crack-like flaw in pressure boundary', 'Not acceptable as-is', 'API 579 Part 9', 'ECA and weld repair'],
      ['Dent or buckle', 'Engineering evaluation', '§7.6', 'FFS per API 579 Part 12'],
      ['Galvanic corrosion at dissimilar welds', 'Per API 571 §5.1.1.13', 'API 571', 'Material/coating review'],
    ],
  },
  relatedStandards: [
    {
      code: 'ASME B31.3',
      relation: 'Original construction code for process piping; used for rerating calculations',
    },
    {
      code: 'API 510',
      relation: 'Sister code for in-service pressure vessels at the same facility',
    },
    {
      code: 'API 571',
      relation: 'Damage mechanism reference for CML placement and method selection',
    },
    {
      code: 'API 579-1/ASME FFS-1',
      relation: 'Fitness-for-Service when flaws exceed basic API 570 acceptance',
    },
    {
      code: 'API RP 2201',
      relation: 'Procedures for hot tapping, welding on equipment in service',
    },
  ],
  commonAuditFindings: [
    'Piping class assigned without documented H₂S, autoignition, or flammable analysis — Class 2 used when Class 1 applies. Citation: §6.3.',
    'Injection points lacking 12-inch upstream / 12-diameter downstream CMLs. Citation: §5.4.1.',
    'Dead-legs identified but no CML at the termination or low point. Citation: §5.4.2.',
    'CUI inspection past 5-year cap on carbon steel piping in the 25-250°F range. Citation: §6.5.4.',
    'Temporary clamp repairs older than two turnarounds without engineering extension. Citation: §8.2.5.',
    'Soil-to-air interface zones not excavated or inspected within the required band. Citation: §5.4.3.',
    'RBI inspection effectiveness ratings missing or claimed without supporting procedure. Citation: §6.5 / API 581 Annex 2.C.',
    'On-stream welding performed without API RP 2201 procedure or AI authorization. Citation: §8.2.7.',
  ],
  faqs: [
    {
      q: 'How is API 570 different from ASME B31.3?',
      a: 'ASME B31.3 is a construction code — it governs design, fabrication, examination, and testing of new process piping. API 570 is an in-service inspection code — it governs how that piping is inspected, repaired, altered, and rerated once it is operating. They cite each other often: API 570 §8 sends you back to B31.3 for repair welding and rerating calculations, and B31.3 references API 570 for guidance on in-service inspection programs. A piping circuit in service is governed by both — B31.3 for any new work performed, API 570 for the inspection that catches degradation.',
    },
    {
      q: 'What makes a CML "highly effective" per API 570?',
      a: 'API 570 §6.5 and the linked API 581 Annex 2.C define inspection effectiveness on a scale from Usually Effective to Poorly Effective. A "highly effective" thickness inspection requires multiple readings at each CML, statistical treatment of the data set, blind verification by a second inspector or by automated UT, and procedures that demonstrably detect the expected damage mechanism. For a corrosion-under-insulation inspection, "highly effective" usually means insulation removal with full visual or pulsed eddy current with profile scanning — not just temperature surveys, which rate "fairly effective" at best.',
    },
    {
      q: 'Can I extend a Class 1 piping interval beyond 5 years with RBI?',
      a: 'Section 6.5 allows it only through a documented RBI program meeting API 580 with quantitative methodology per API 581. The extension cannot exceed twice the default interval, and the assessment must be revalidated every 5 years minimum or whenever the operating envelope changes (MOC trigger). Even with RBI, Class 1 piping carrying HF, light flammables vaporizing at ambient, or H₂S above 3% rarely sees intervals stretched past 7-8 years in practice because consequence of failure dominates the calculation and few thinning mechanisms drop probability low enough to compensate.',
    },
    {
      q: 'Are pipeline transmission lines covered by API 570?',
      a: 'No. API 570 explicitly excludes piping under DOT regulation. Pipelines under 49 CFR 192 (gas) and 49 CFR 195 (hazardous liquids) follow PHMSA rules with API 1160, API 1163, and ASME B31.8S as supporting standards. The boundary is the facility fence line in most cases — once the pipeline enters the meter station or refinery, it transitions to facility piping under B31.3 and API 570 inspection. Some operators apply API 570 as a voluntary best-practice on station piping that sits on the pipeline side of the boundary, but it is not the regulatory authority there.',
    },
  ],
  internalLinks: [
    {
      href: '/ultrasonic-testing',
      label: 'UT thickness for piping CMLs',
      context: 'Primary thickness method for API 570 surveys.',
    },
    {
      href: '/methods/phased-array-ultrasonic-testing',
      label: 'PAUT corrosion mapping on piping',
      context: 'Resolves local thinning that single-point UT misses.',
    },
    {
      href: '/standards/api-510',
      label: 'API 510 pressure vessel inspection',
      context: 'Sister in-service inspection code at most refineries.',
    },
    {
      href: '/standards/asme-b31-3',
      label: 'ASME B31.3 process piping',
      context: 'Construction code that API 570 references for repair and rerating.',
    },
    {
      href: '/standards/api-571',
      label: 'API 571 damage mechanisms',
      context: 'Drives CML placement and method selection in API 570 plans.',
    },
    {
      href: '/standards/api-579',
      label: 'API 579 Fitness-for-Service',
      context: 'Invoked when piping flaws exceed basic API 570 acceptance.',
    },
    {
      href: '/free-tools/corrosion-rate-calculator',
      label: 'Corrosion rate calculator',
      context: 'Run short- and long-term rate calculations per §7.1.',
    },
    {
      href: '/industries/oil-gas-refining',
      label: 'Refining inspection programs',
      context: 'Industry where API 570 is enforced under OSHA PSM.',
    },
    {
      href: '/find-providers',
      label: 'Find API 570 inspection providers',
      context: 'Locate AIAs with API 570 Authorized Piping Inspectors.',
    },
  ],
  citations: [
    {
      id: 'api-570-cover',
      source: 'API 570, Piping Inspection Code, 5th ed., February 2023',
      url: 'https://www.api.org/products-and-services/standards/important-standards-announcements/standard-570',
    },
    { id: 'api-570-5-4', source: 'API 570 §5.4 — Injection points, mix points, dead-legs, soil-to-air interfaces' },
    { id: 'api-570-6-3', source: 'API 570 §6.3 — Piping classification (Class 1 through Class 4)' },
    { id: 'api-570-6-5', source: 'API 570 §6.5 — Inspection intervals by class' },
    { id: 'api-570-7-5', source: 'API 570 §7.5 — Minimum thickness and remaining life calculations' },
    { id: 'api-570-8', source: 'API 570 §8 — Repairs, alterations, rerating' },
    {
      id: 'asme-b31-3',
      source: 'ASME B31.3-2022, Process Piping',
      url: 'https://www.asme.org/codes-standards',
    },
    { id: 'api-rp-2201', source: 'API RP 2201, Safe Hot Tapping Practices, 4th ed. (2020)' },
    { id: 'api-571-piping', source: 'API 571, Damage Mechanisms Affecting Fixed Equipment in the Refining Industry, 3rd ed. (2020)' },
    { id: 'api-579-fps', source: 'API 579-1/ASME FFS-1, Fitness-For-Service, 3rd ed. (2021)' },
    { id: 'api-580-rbi-pip', source: 'API 580, Risk-Based Inspection, 4th ed. (2023)' },
    { id: 'api-581-rbi-pip', source: 'API 581, Risk-Based Inspection Methodology, 3rd ed. (2016, addendums)' },
    { id: 'osha-psm-pip', source: 'OSHA 29 CFR 1910.119, Process Safety Management', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119' },
    { id: 'csb-anacortes', source: 'US CSB Final Investigation Report: Tesoro Anacortes Refinery (2010 fatal accident from piping rupture)' },
  ],
};

export default standard;
