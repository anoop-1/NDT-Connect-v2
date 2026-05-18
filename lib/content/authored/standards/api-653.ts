import type { StandardContent } from '../types';

const standard: StandardContent = {
  code: 'API 653',
  fullTitle: 'Tank Inspection, Repair, Alteration, and Reconstruction',
  organization: 'American Petroleum Institute',
  edition: '5th Edition, November 2014, with Addendums through 2020',
  slug: 'api-653',
  metaTitle: 'API 653 Tank Inspection: Bottom MFL, Shell UT, Intervals & FFS Rules',
  metaDescription: 'API 653 5th ed. governs in-service AST inspection. External 5-year, internal 10/20-year, MFL bottom scans, shell UT, repair rules, and audit pitfalls.',
  heroLede:
    'API 653 enters scope whenever an aboveground storage tank built to API 650 (or API 12C, its predecessor) holds petroleum or hazardous liquid and is placed in service. The 5th edition (2014, addendums through 2020) sets external visual inspection at 5-year intervals, internal inspection at 10 years for the first inspection on a new tank and 20 years thereafter unless RBI shortens it, and forces a documented inspection plan signed by an API 653 Authorized Tank Inspector. The code drives a multi-billion-dollar inspection market every year at terminals, refineries, and chemical plants — bottom MFL scans, shell UT thickness grids, settlement surveys, foundation evaluations, and floating roof inspections — and it integrates with API 575 (inspection practices), API 579 (Fitness-for-Service), and the EPA SPCC rule (40 CFR 112) that mandates secondary containment and inspection for oil storage above 1,320 gallons aggregate.',
  scope:
    'API 653 covers in-service inspection, repair, alteration, and reconstruction of welded or riveted aboveground steel storage tanks (ASTs) that operate at atmospheric pressure (above the surface of the liquid). It applies to tanks built to API 650 and the older API 12C, and tank reconstruction follows API 653 §10. Bolted tanks built to API 12B are outside the inspection scope of API 653 but follow many of the same practices through API 12R1. The code does not cover pressure vessels (API 510), piping (API 570), or low-pressure storage tanks operating between 0.5 psig and 15 psig (API 620).',
  whoMustComply: [
    'Owner-operators of petroleum, petrochemical, and hazardous liquid AST farms covered by EPA SPCC (40 CFR 112)',
    'Refinery and pipeline terminal operators with storage capacity above 1,320 gallons',
    'API 653 Authorized Tank Inspectors holding current API ICP certification',
    'Tank repair contractors performing welded repairs, bottom replacements, or shell course replacements',
    'EPC firms reconstructing or relocating existing tanks per §10',
    'State environmental authorities adopting API 653 by reference (e.g., Texas TCEQ Chapter 334, California Title 23)',
  ],
  keyRequirements: [
    {
      heading: 'Authorized Tank Inspector and AI independence',
      level: 2,
      paragraphs: [
        'Section 4 requires all formal inspections to be performed or directly supervised by an API 653 Authorized Tank Inspector holding current API ICP API 653 certification. Eligibility requires high school plus 5 years of inspection experience (2 years tank specific), or a BS in engineering plus 1 year of tank inspection experience, plus passing the closed-book and open-book exams. Recertification every 3 years includes continuing education and re-examination.',
        'The AI must report findings directly to the owner-user. A common citation issue at terminal audits is the inspection company also being the repair contractor for the same tanks — API 653 §4.2.3 does not prohibit it, but conflicts of interest in scope-setting are flagged by auditors and increasingly excluded by terminal operators through procurement segregation.',
      ],
    },
    {
      heading: 'External and internal inspection intervals',
      level: 2,
      paragraphs: [
        'Section 6.3.1 fixes the external visual inspection interval at the lesser of 5 years or one-quarter of the corrosion allowance remaining life. Section 6.3.2 sets the internal inspection interval at the lesser of 10 years for first inspection (for a new tank), 20 years for subsequent inspections, or the time it takes to reach the minimum acceptable shell or bottom thickness. RBI per API 580/581 can extend internal intervals up to a maximum of 30 years if specific conditions are met (release prevention barrier, leak detection, cathodic protection on bottom).',
        'External UT thickness surveys must be performed at intervals not exceeding 5 years per §6.3.1.2. For uninsulated tanks where the floor side cannot be inspected externally, the inspection cadence drives planning. CUI on insulated tanks under §6.3.3 follows the same 5-year cap as API 510 piping in the temperature vulnerability range.',
      ],
      callout: {
        kind: 'spec',
        title: 'Release prevention barrier credit',
        body: 'Section 4.4.1 allows interval extension up to 30 years internal if the tank has a release prevention barrier (double bottom, liner, or impermeable membrane) with leak detection. Without these, the 20-year cap holds.',
      },
    },
    {
      heading: 'Bottom inspection — MFL and vacuum box',
      level: 2,
      paragraphs: [
        'Section 6.4 mandates the bottom inspection methods. Magnetic flux leakage (MFL) floor scanning per API 653 §6.4.2 and Appendix G is the workhorse — it covers 100% of the accessible plate area within the limits of the scanner head (typically not within 12 inches of the shell or sumps, which require manual UT or alternative). Bottom plate minimum thickness per §4.4.5 is 0.1 inch for tanks without release prevention barrier, with corrosion rate driving remaining life calculation.',
        'Vacuum box testing per §6.4.3 is required on welds after any bottom plate repair. The test uses a transparent box pressed against a soap-solution-coated weld with vacuum drawn — leaks show as bubbles. ASTM E515 documents the technique. Operators sometimes skip vacuum box on stitch welds during patch repairs, which is a finding under §9.10.',
      ],
    },
    {
      heading: 'Shell, roof, and foundation evaluation',
      level: 2,
      paragraphs: [
        'Shell UT thickness per §6.3.1.2 follows a course-by-course pattern with CMLs concentrated at courses 1-3 where hydrostatic stress is highest and where water bottoms cause MIC and bottom-up corrosion. Settlement surveys per Appendix B distinguish uniform settlement (no concern up to a point) from planar tilt (acceptable within limits) from differential edge settlement (which can crack shell-to-bottom welds). API 653 Appendix B provides graphical evaluation criteria — Cosine curve fitting for shell settlement, Rdix calculation for edge settlement.',
        'Roof inspection includes floating roof seals (primary and secondary), pontoon vacuum tests, drain checks, and emergency vent verification. Fixed roof tanks need internal inspection for corrosion under the roof, vapor space corrosion, and gauge pole condition. Foundation evaluation looks for ringwall settlement, asphalt or concrete pad cracking, and grout deterioration.',
      ],
    },
  ],
  inspectionIntervals: {
    caption: 'API 653 §6.3 default inspection intervals',
    headers: ['Inspection', 'Default interval', 'Hard cap', 'Extension path'],
    rows: [
      ['External visual', '5 years or 1/4 corrosion allowance', '5 years', 'None — fixed cap'],
      ['External UT thickness', '5 years', '5 years', 'None'],
      ['Internal — first (new tank)', '10 years from start of service', '10 years', 'RBI per API 580/581'],
      ['Internal — subsequent', '20 years', '20 years', '30 years with RBI + RPB + leak detection'],
      ['CUI inspection', '5 years for vulnerable temperature range', '5 years', 'None'],
      ['Floating roof seal', '1 year visual, internal at deck', '1 year', 'None for visual'],
    ],
  },
  acceptanceCriteria: {
    caption: 'API 653 shell, bottom, and component minimum thresholds',
    headers: ['Component', 'Minimum threshold', 'Reference', 'Action if below'],
    rows: [
      ['Bottom plate (no RPB)', '0.1 inch', '§4.4.5', 'Repair, replace, or FFS evaluation'],
      ['Bottom plate (with RPB)', '0.05 inch', '§4.4.5.4', 'Repair or replace'],
      ['Shell course tmin', 'Calculated per §4.3', '§4.3', 'Local repair or FFS'],
      ['Edge settlement', 'Per Appendix B Eq B.3', 'Appendix B', 'Re-level, jack, or FFS'],
      ['Floating roof pontoon', 'No vacuum loss in 24 hr', 'API 575 §8.2', 'Repair'],
      ['Hydrotest after major repair', 'Per §12 if required', '§12', 'Mandatory before return to service'],
    ],
  },
  relatedStandards: [
    { code: 'API 650', relation: 'Original construction code for welded steel storage tanks' },
    { code: 'API 620', relation: 'Construction code for low-pressure tanks between 0.5-15 psig' },
    { code: 'API 575', relation: 'Inspection practices for atmospheric and low-pressure storage tanks' },
    { code: 'API 579-1/ASME FFS-1', relation: 'Fitness-for-Service when thickness or settlement exceeds basic acceptance' },
    { code: 'EPA SPCC 40 CFR 112', relation: 'Federal regulation that adopts API 653 by reference for above-1,320-gallon storage' },
  ],
  commonAuditFindings: [
    'Internal inspection past 20-year cap with no RBI extension documented. Citation: §6.3.2.',
    'MFL bottom scan coverage gaps at shell-to-bottom critical zone (within 12 inches) with no manual UT backfill. Citation: §6.4.2.',
    'Settlement survey performed but Appendix B Cosine evaluation not run, just spot elevation taken. Citation: Appendix B.',
    'Vacuum box test missing on patch plate repairs to the floor. Citation: §6.4.3.',
    'Shell UT thickness past 5-year cap on uninsulated tanks. Citation: §6.3.1.2.',
    'Floating roof seal inspection annual visual missing or done by operations without AI sign-off. Citation: §6.5.',
    'CUI inspection not performed on insulated tanks in the 25-250°F vulnerability range. Citation: §6.3.3.',
    'Repair welds without ASME Section IX qualified WPS and welder qualification records. Citation: §9.3.',
  ],
  faqs: [
    {
      q: 'When does the 20-year internal inspection clock start?',
      a: 'Per API 653 §6.3.2, the clock for the second and subsequent internal inspections runs from the date the tank was returned to service after the prior internal inspection — not from the calendar year, not from the last external visual. The first internal inspection of a new tank is capped at 10 years from initial placement in service. After that, the 20-year cap applies between successive internal inspections, subject to RBI extension and to bottom remaining life calculations that may shorten the interval independently. Auditors look for a documented service-resumption date on each tank — many sites lose track of this when ownership changes hands.',
    },
    {
      q: 'Can MFL replace internal visual entirely?',
      a: 'No. MFL is a bottom-scanning technique that detects through-thickness loss on plate. It does not replace the internal visual inspection requirement under §6.4 — the AI still needs to verify weld condition, look for stress cracking, inspect the shell-to-bottom corner, check the gauge pole and roof support columns, and confirm the absence of bulges, dents, or coatings degradation. MFL closes the bottom plate corrosion coverage question fast and quantitatively, but the rest of the internal inspection scope still applies. A typical 150-ft diameter tank internal takes 3-5 days of multi-disciplinary work, of which MFL is one shift.',
    },
    {
      q: 'What is the difference between API 650 and API 653?',
      a: 'API 650 is the construction code — it governs design, materials, fabrication, welding, and hydrotest of new welded steel storage tanks at atmospheric pressure. API 653 is the in-service inspection and repair code — it governs how tanks built to API 650 (or to the older API 12C) are inspected, repaired, altered, and reconstructed once in service. They cross-reference: API 653 §9 sends you back to API 650 for material and welding requirements during repair, and §10 reconstruction explicitly requires the rebuilt tank to meet either API 650 current edition or the original construction edition as agreed by the owner.',
    },
    {
      q: 'Does API 653 cover bottom leaks detected by inventory loss?',
      a: 'Yes — §6.4.4 requires investigation of any tank with measurable inventory loss not attributable to other causes. The owner must perform leak detection per API 653 Annex H methods (tracer gas, acoustic emission, soil vapor monitoring) and take the tank out of service for internal inspection if a bottom leak is confirmed. Many state environmental rules also require notification within a defined timeline once a release is suspected — Texas TCEQ within 24 hours, California Title 23 within 8 hours for SPCC-covered facilities. Inventory reconciliation alone does not satisfy the leak investigation requirement; it triggers it.',
    },
    {
      q: 'How does RBI extend internal inspection to 30 years?',
      a: 'API 653 §4.4.1 and Annex on RBI allow extension to 30 years only when three conditions are documented: (1) a release prevention barrier exists (double bottom with leak detection, geomembrane liner, or impermeable spill barrier), (2) continuous leak detection or monitored interstitial space, and (3) a documented RBI program per API 580 with API 581 quantitative methodology that supports the extension. Without all three, the cap is 20 years. State environmental authorities sometimes impose stricter limits even when API allows 30 years — Texas Chapter 334 and California Title 23 routinely cap at 20 years for tanks without secondary containment that meets EPA SPCC standards.',
    },
  ],
  internalLinks: [
    { href: '/methods/magnetic-particle-testing', label: 'MT on welded repairs', context: 'Used to inspect repair welds on tank shells.' },
    { href: '/ultrasonic-testing', label: 'UT shell thickness surveys', context: 'Primary method for API 653 external surveys.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT shell mapping', context: 'Resolves localized thinning on shell courses.' },
    { href: '/standards/api-510', label: 'API 510 pressure vessels', context: 'Companion code at refineries with mixed equipment.' },
    { href: '/standards/api-579', label: 'API 579 Fitness-for-Service', context: 'Invoked for shell or settlement flaws beyond basic acceptance.' },
    { href: '/industries/oil-gas-refining', label: 'Refining and terminal operations', context: 'Primary industry for API 653 enforcement.' },
    { href: '/free-tools/corrosion-rate-calculator', label: 'Corrosion rate calculator', context: 'Drive bottom and shell remaining life calculations.' },
    { href: '/free-tools/remaining-life-calculator', label: 'Remaining life calculator', context: 'Project intervals from thickness trends.' },
    { href: '/find-providers', label: 'Find API 653 tank inspectors', context: 'Locate Authorized Tank Inspectors in your region.' },
  ],
  citations: [
    { id: 'api-653-cover', source: 'API 653, Tank Inspection, Repair, Alteration, and Reconstruction, 5th ed. (2014, addendums through 2020)', url: 'https://www.api.org/products-and-services/standards' },
    { id: 'api-653-4-3', source: 'API 653 §4.3 — Minimum shell thickness and design calculations' },
    { id: 'api-653-4-4', source: 'API 653 §4.4 — Minimum bottom plate thickness' },
    { id: 'api-653-6-3', source: 'API 653 §6.3 — Inspection intervals' },
    { id: 'api-653-6-4', source: 'API 653 §6.4 — Bottom inspection methods' },
    { id: 'api-653-9', source: 'API 653 §9 — Repairs and alterations' },
    { id: 'api-653-10', source: 'API 653 §10 — Reconstruction' },
    { id: 'api-653-app-b', source: 'API 653 Appendix B — Evaluation of tank bottom settlement' },
    { id: 'api-650', source: 'API 650, Welded Tanks for Oil Storage, 13th ed. (2020)' },
    { id: 'api-575', source: 'API 575, Inspection Practices for Atmospheric and Low-pressure Storage Tanks, 4th ed. (2020)' },
    { id: 'api-579-tank', source: 'API 579-1/ASME FFS-1, Fitness-For-Service, 3rd ed. (2021)' },
    { id: 'astm-e515', source: 'ASTM E515-21, Standard Practice for Leaks Using Bubble Emission Techniques' },
    { id: 'epa-spcc', source: 'US EPA 40 CFR 112, Oil Pollution Prevention (SPCC Rule)', url: 'https://www.epa.gov/oil-spills-prevention-and-preparedness-regulations' },
    { id: 'api-icp-653', source: 'API ICP — API 653 Body of Knowledge (2023)', url: 'https://www.api.org/products-and-services/individual-certification-programs/certifications/api653' },
  ],
};

export default standard;
