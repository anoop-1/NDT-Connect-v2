import type { StandardContent } from '../types';

const standard: StandardContent = {
  code: 'API 579-1/ASME FFS-1',
  fullTitle: 'Fitness-For-Service',
  organization: 'American Petroleum Institute / ASME (joint)',
  edition: '3rd Edition, 2021',
  slug: 'api-579',
  metaTitle: 'API 579 Fitness-for-Service: Levels 1/2/3, Flaw Categories, Audit Traps',
  metaDescription: 'API 579-1/ASME FFS-1 3rd ed. (2021) lets you keep flawed equipment in service safely. Levels 1/2/3, flaw parts, qualification, and the common Level 1 misuse pattern.',
  heroLede:
    'API 579-1/ASME FFS-1 (3rd ed., 2021) is the engineering analysis standard owners reach for the moment an in-service inspection finds something below code minimum thickness, a crack-like flaw, or a dent that looks bad enough to question. Rather than condemn the equipment, the code prescribes three escalating levels of analysis — Level 1 quick check using simple formulas and screening curves, Level 2 detailed assessment with more accurate stress analysis, Level 3 full numerical FEA with stress-strain curves and crack-tip plasticity — that let an operator make a documented run-or-replace decision. It is joint-developed by API and ASME, referenced by API 510 §7.5, API 570 §7.5, API 653 §4, NB-23 for boilers, and it is the only engineering analysis recognized by most US state pressure equipment jurisdictions for in-service flaw acceptance.',
  scope:
    'API 579 covers fitness-for-service assessments of in-service pressurized equipment — pressure vessels (ASME Section VIII Div 1, Div 2, Div 3), piping (ASME B31.1, B31.3, B31.4, B31.8, B31.12), and storage tanks (API 650). It addresses fourteen flaw and damage categories in fourteen Parts: brittle fracture, general metal loss, local thin areas, pitting, blister/HIC/SOHIC, weld misalignment, shell distortion, crack-like flaws, creep damage, fire damage, dent/gouge, laminations, and corrosion/erosion. The 3rd edition (2021) added Part 14 for dissimilar weld joint assessment and expanded Part 13 for high-temperature hydrogen attack screening.',
  whoMustComply: [
    'Owner-operators applying for fitness-for-service determination on equipment flagged by API 510, 570, or 653 inspections',
    'Pressure equipment engineers (PE or equivalent) performing the Level 2 or Level 3 assessment',
    'API Authorized Inspectors accepting or rejecting the FFS conclusion on behalf of the owner-user',
    'Jurisdictional authorities (state boiler inspectors, NB Authorized Inspection Supervisors) reviewing FFS reports as part of repair authorization',
    'EPC firms performing engineering critical assessments on legacy equipment during plant acquisitions or revamps',
    'Insurance loss control engineers evaluating risk on flagged equipment before renewal',
  ],
  keyRequirements: [
    {
      heading: 'Three-level assessment framework',
      level: 2,
      paragraphs: [
        'Section 2.4 sets the three-tier framework. Level 1 is the screening assessment — quick, conservative, uses tabulated curves and simple closed-form equations. A Level 1 LTA assessment per Part 5 needs only thickness, flaw length, flaw width, and pressure. Output is acceptable or not at the operating conditions. Level 2 is the detailed assessment — more accurate stress analysis, less conservative, requires more inputs (material toughness, residual stress, weld geometry). Level 3 is the advanced assessment — numerical analysis (typically FEA), stress-strain curves to failure, J-integral or stress intensity factor solutions for crack-like flaws, requires senior engineering judgement.',
        'The escalation rule is "if Level 1 fails, try Level 2; if Level 2 fails, try Level 3 or repair". Going straight to Level 3 is permitted but wastes engineering hours. The most common audit citation is the opposite — running Level 1 only, getting an acceptable result on a flaw that should have been escalated because inputs were missing or assumptions invalid, and treating Level 1 as the final word.',
      ],
    },
    {
      heading: 'Flaw and damage categories — fourteen Parts',
      level: 2,
      paragraphs: [
        'Each Part addresses a specific flaw or damage type. Part 3 covers brittle fracture and minimum allowable temperature (MAT) curves. Part 4 covers general metal loss — uniform thinning across an area. Part 5 covers Local Thin Areas (LTAs) with the well-known "river bottom" profile assessment. Part 6 covers pitting damage with pit charting. Part 7 covers blistering, HIC, and SOHIC. Part 8 covers weld misalignment and shell distortion (bulges, ovality). Part 9 covers crack-like flaws using the Failure Assessment Diagram (FAD). Part 10 covers creep damage. Part 11 covers fire damage. Part 12 covers dents, gouges, and dent-gouge combinations. Part 13 covers high-temperature hydrogen attack. Part 14 (new in 2021) covers dissimilar weld joints.',
        'Selecting the right Part is the first task — and it is not always obvious. A thinned area at a weld toe with shallow surface cracks is partly Part 5 (LTA), partly Part 9 (crack-like flaw), and the assessment must address both modes. The 2021 edition clarified Part 9 to require that surface flaws on thinned walls be assessed against the thinned wall, not the original wall, which closed a common loophole.',
      ],
      callout: {
        kind: 'warn',
        title: 'Don\'t treat Level 1 as a green light',
        body: 'Level 1 assessments use conservative tabulated curves. They can give an acceptable result on a flaw that fails Level 2 once material toughness, residual stress, or service mechanism is properly considered. Always document why Level 1 inputs are valid for the equipment in service.',
      },
    },
    {
      heading: 'Remaining strength factor and remaining life',
      level: 2,
      paragraphs: [
        'The central output of a Part 4 or Part 5 assessment is the Remaining Strength Factor (RSF), defined in §2.4.2.2 as the ratio of plastic collapse load with the flaw to plastic collapse load without it. The allowable RSF is typically 0.9 for in-service equipment (allowing 10% strength loss) but can be lowered with engineering justification or raised by owner-user policy. RSF below 0.9 either fails the assessment or triggers MAWP reduction by the same ratio.',
        'Remaining life calculations combine the assessed flaw with the projected corrosion or growth rate. For LTAs, remaining life is the time until the locally thin wall reaches the calculated minimum required thickness. For crack-like flaws under Part 9, remaining life is the time until the flaw grows to the critical size on the Failure Assessment Diagram, requiring crack growth rate inputs from da/dN data or environmental cracking growth models.',
      ],
    },
    {
      heading: 'Assessor qualification and AI acceptance',
      level: 2,
      paragraphs: [
        'Section 1.4.3 requires the assessor to be qualified by training and experience for the level of assessment performed. Level 1 can be performed by an experienced inspector — many AI certifications include Level 1 training. Level 2 typically requires a pressure equipment engineer with FEA or stress analysis experience. Level 3 requires senior engineering judgement and is usually performed by specialty firms with documented FFS practice histories. The AI accepts or rejects the assessment on behalf of the owner-user and signs the inspection record referencing the FFS report.',
        'The 2021 edition strengthened documentation requirements — the FFS report must include the assessment Level, the Part(s) applied, all inputs with sources, all assumptions, the calculation results, and the conclusion. Many state jurisdictions now require submission of the FFS report before authorizing return to service. The NB-23 (NBIC) inspection rules in jurisdictions that adopt them require AI counter-sign on every FFS conclusion.',
      ],
    },
  ],
  acceptanceCriteria: {
    caption: 'API 579 acceptance thresholds by Part',
    headers: ['Part', 'Flaw type', 'Level 1 acceptance', 'Level 2/3 path'],
    rows: [
      ['Part 3', 'Brittle fracture', 'MAT screening curve', 'Toughness-based Charpy or J-test'],
      ['Part 4', 'General metal loss', 'Average tmin meets code', 'Detailed stress analysis'],
      ['Part 5', 'LTA', 'Folias factor + screening curve', 'RSF ≥ 0.9 with detailed stress'],
      ['Part 6', 'Pitting', 'Equivalent metal loss approach', 'Pit charting + FEA'],
      ['Part 7', 'HIC/SOHIC/blister', 'Size limits + monitoring', 'Crack growth + FEA'],
      ['Part 8', 'Misalignment, distortion', 'Tabulated limits', 'FEA stress-strain'],
      ['Part 9', 'Crack-like flaw', 'FAD screening curves', 'Detailed FAD with J or K'],
      ['Part 10', 'Creep', 'Remaining life estimate', 'Omega method or FEA'],
      ['Part 12', 'Dent/gouge', 'Depth/length screening', 'FEA + fatigue analysis'],
      ['Part 13', 'HTHA', 'Nelson curve screening', 'Time-temperature-pressure modeling'],
    ],
  },
  relatedStandards: [
    { code: 'API 510', relation: 'In-service vessel code that invokes API 579 when flaws exceed basic acceptance' },
    { code: 'API 570', relation: 'In-service piping code that invokes API 579 for piping flaw assessment' },
    { code: 'API 653', relation: 'Tank inspection code that invokes API 579 for shell and bottom flaw assessment' },
    { code: 'ASME Section VIII Div 1/2/3', relation: 'Construction codes whose minimum design rules form the baseline for FFS assessment' },
    { code: 'API 571', relation: 'Damage mechanism reference used to select which Part of API 579 applies' },
  ],
  commonAuditFindings: [
    'Level 1 LTA assessment used on a flaw at a weld toe where Part 9 crack assessment should also have been run. Citation: §2.4.1.',
    'FFS report missing material toughness inputs for a Level 2 Part 9 assessment — assumed minimum specified instead of measured. Citation: §9.4.2.',
    'Residual stress assumed as zero on as-welded carbon steel without PWHT. Citation: Annex 9F.',
    'RSF target lower than 0.9 used without owner-user policy or engineering justification. Citation: §2.4.2.2.',
    'Remaining life calculated without including ongoing corrosion rate beyond the flaw. Citation: §4.5.2.',
    'Level 1 screening curve extrapolated beyond tabulated range. Citation: §5.4.2.',
    'FFS assessor not qualified for the Level performed — no documented training or experience record. Citation: §1.4.3.',
    'AI signature accepting FFS conclusion without independent review of inputs. Citation: §1.4.4.',
  ],
  faqs: [
    {
      q: 'When do I actually need API 579 and not just code minimum thickness?',
      a: 'API 510, 570, and 653 all set a code minimum thickness (tmin) calculated from the original construction code at the operating MAWP. If inspection finds an area below tmin, you are out of compliance with the construction code. API 579 lets you keep operating safely by demonstrating through engineering analysis that the local flaw — even though below tmin — does not threaten structural integrity at operating conditions, often by showing the remaining strength factor stays above 0.9. Without API 579, the only options would be MAWP reduction, repair, or retirement. The standard exists because brute-force thickness limits are conservative — they ignore that local thinning is often surrounded by full-thickness material that carries load.',
    },
    {
      q: 'Can the inspection company perform their own Level 2 FFS?',
      a: 'API 579 does not prohibit it, but most operators and many state authorities prefer separation. The Level 2 assessor must be qualified per §1.4.3, which usually means a degreed engineer with documented FFS experience. Inspection companies with in-house engineering can perform Level 2; pure inspection contractors typically subcontract to specialty FFS firms (Equity Engineering, Becht, Hexagon PPM, Stress Engineering Services). The AI accepting the FFS conclusion should be independent of the assessor — same firm is acceptable if there is internal review separation, but same person is a finding at audit.',
    },
    {
      q: 'How long is an FFS conclusion valid?',
      a: 'Section 2.4.2.1 makes the conclusion conditional on the inputs remaining valid. If corrosion rate is used to calculate remaining life and the actual rate later exceeds the assumed rate, the conclusion is invalidated and reassessment is required. Same applies to operating conditions — temperature creep, pressure changes, service composition changes (sulfur increase, chloride introduction) all trigger reassessment. As a working rule, an FFS conclusion is good until the next scheduled inspection or until a Management of Change event, whichever comes first. Many operators set a 5-year maximum validity by policy.',
    },
    {
      q: 'Does API 579 apply to atmospheric tanks?',
      a: 'Yes. API 653 §4 explicitly invokes API 579 for shell, bottom, and roof flaw assessment when conditions exceed basic API 653 acceptance. Tank-specific issues — edge settlement evaluation, bottom-plate LTAs, shell-to-bottom corner cracking — all have dedicated Part 5, Part 8, or Part 9 paths in API 579. The 2021 edition added clarifications on tank applicability and improved the screening curves for low-pressure storage assessment, where the stress state differs from pressure vessel service.',
    },
    {
      q: 'What is the Failure Assessment Diagram in Part 9?',
      a: 'The FAD is a graphical tool used in Part 9 crack-like flaw assessment that plots two normalized parameters — Kr (ratio of applied stress intensity to fracture toughness) on the y-axis and Lr (ratio of applied stress to plastic collapse stress) on the x-axis. Each combination of crack size, stress, and material toughness gives a point on the diagram. If the point lies inside the FAD curve, the flaw is acceptable; if outside, it is not. Level 1 uses tabulated FAD curves; Level 2 allows option for material-specific FAD construction; Level 3 lets you derive the FAD from full numerical analysis. The FAD framework comes from R6 (UK CEGB) and BS 7910 — API 579 Part 9 is technically equivalent for in-service assessment of US-regulated equipment.',
    },
  ],
  internalLinks: [
    { href: '/standards/api-510', label: 'API 510 vessel inspection', context: 'Invokes API 579 when thickness or flaws exceed basic acceptance.' },
    { href: '/standards/api-570', label: 'API 570 piping inspection', context: 'Cross-references API 579 for piping flaw evaluation.' },
    { href: '/standards/api-653', label: 'API 653 tank inspection', context: 'Sends shell and bottom flaws to API 579 for assessment.' },
    { href: '/standards/api-571', label: 'API 571 damage mechanisms', context: 'Identifies which Part of API 579 applies to a flaw.' },
    { href: '/ultrasonic-testing', label: 'UT thickness for FFS inputs', context: 'Provides the dimensional inputs for Level 1/2 calculations.' },
    { href: '/methods/phased-array-ultrasonic-testing', label: 'PAUT corrosion mapping', context: 'Generates the flaw profile required for Part 5 LTA assessment.' },
    { href: '/industries/oil-gas-refining', label: 'Refining FFS programs', context: 'Industry where API 579 keeps aging equipment in service.' },
    { href: '/free-tools/corrosion-rate-calculator', label: 'Corrosion rate calculator', context: 'Generates the rate input for FFS remaining life.' },
    { href: '/find-providers', label: 'Find FFS engineering services', context: 'Locate firms qualified for Level 2 and Level 3 assessments.' },
  ],
  citations: [
    { id: 'api-579-cover', source: 'API 579-1/ASME FFS-1, Fitness-For-Service, 3rd ed., 2021', url: 'https://www.api.org/products-and-services/standards' },
    { id: 'api-579-2-4', source: 'API 579 §2.4 — Assessment Levels (Level 1, 2, 3)' },
    { id: 'api-579-1-4', source: 'API 579 §1.4 — Responsibilities and qualifications' },
    { id: 'api-579-part-3', source: 'API 579 Part 3 — Brittle Fracture Assessment' },
    { id: 'api-579-part-4', source: 'API 579 Part 4 — General Metal Loss' },
    { id: 'api-579-part-5', source: 'API 579 Part 5 — Local Thin Areas' },
    { id: 'api-579-part-9', source: 'API 579 Part 9 — Crack-Like Flaws (Failure Assessment Diagram)' },
    { id: 'api-579-part-13', source: 'API 579 Part 13 — High-Temperature Hydrogen Attack' },
    { id: 'api-579-annex-9f', source: 'API 579 Annex 9F — Residual stress profiles for weld assessment' },
    { id: 'asme-viii-div-2', source: 'ASME Section VIII Division 2 (2023) — Alternative Rules' },
    { id: 'bs-7910', source: 'BS 7910:2019, Guide to methods for assessing the acceptability of flaws in metallic structures' },
    { id: 'api-571-ffs', source: 'API 571, Damage Mechanisms Affecting Fixed Equipment in the Refining Industry, 3rd ed. (2020)' },
    { id: 'nb-23', source: 'NBIC NB-23, National Board Inspection Code, 2023 edition' },
  ],
};

export default standard;
