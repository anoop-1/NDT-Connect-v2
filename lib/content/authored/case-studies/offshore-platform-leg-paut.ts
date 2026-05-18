import type { CaseStudyContent } from '../types';

const study: CaseStudyContent = {
  slug: 'offshore-platform-leg-paut',
  metaTitle: 'GoM Platform Leg PAUT: K-Joint Fatigue Crack Case Study',
  metaDescription:
    'A Gulf of Mexico platform operator found a 92 mm fatigue crack at a K-node joint in a leg brace using PAUT and ACFM, scoped a class-approved underwater weld repair, and avoided a $34M leg-strengthening project.',
  industry: 'Offshore oil & gas (fixed jacket platforms)',
  regionLabel: 'US Gulf of Mexico (200 ft water depth)',
  assetType: 'Fixed steel jacket platform leg, 42-inch tubular X65, K-node tubular brace joint',
  heroLede:
    'A Gulf of Mexico platform operator running a 35-year-old jacket-style production platform pulled the 5-yearly close visual inspection (CVI) on the underwater jacket and found a hairline crack indication at the K-node weld where a 24-inch diagonal brace meets the 42-inch main leg. Saturation-diver PAUT and ACFM follow-up confirmed a 92 mm fatigue crack 8 mm deep at the brace-side toe — half the distance to through-wall. Class society notification went out within 24 hours. This is the inspection and repair walkthrough that put the platform back in service inside the hurricane preparation window.',
  challenge:
    'A GoM Class 1 fixed jacket platform operating in 200 ft water depth, in service since 1991, was on a 5-year underwater inspection interval under API RP 2SIM for in-service inspection of fixed offshore structures.[1] The K-node joint at elevation -68 ft (where the 24-inch K-brace meets the 42-inch leg) had been a high-fatigue-loading concern from the original design FEA, with monitored stress concentration factor (SCF) of 5.8 — typical for a K-node geometry in a North Atlantic-pattern wave climate. A CVI by ROV during the 2026 inspection found a 95 mm linear indication at the K-node weld toe on the brace side. The operator had to: (a) characterize the indication (crack vs paint flaw vs marine growth artifact), (b) size any confirmed defect to drive fitness-for-service evaluation, (c) issue a class society notification per ABS Rules for Building and Classing Offshore Installations within the 24-hour window if a crack was confirmed.[2]',
  approach: [
    {
      heading: 'Method selection: ACFM and PAUT in tandem for underwater weld characterization',
      level: 2,
      paragraphs: [
        'Underwater NDT for offshore jacket structures has a specific tool kit defined in API RP 2X and AWS D3.6M.[3][4] Close visual inspection (CVI) is the first screen. Magnetic particle inspection (MT, the underwater variant uses fluorescent wet-particle technique) is the surface-NDT workhorse for ferromagnetic structural welds but has practical limitations at depth (visibility, current, light from the diver helmet). Alternating Current Field Measurement (ACFM) is the modern alternative — diver-deployed handheld probe, no magnetic ink required, gives both crack detection and length sizing in a single pass, and works through paint up to 6 mm thick. The operator\'s underwater inspection procedure specified ACFM as the primary follow-up to CVI per AWS D3.6M §6.4.',
        'PAUT was the depth-sizing tool. A diver-deployed phased array probe with a 5 MHz, 32-element linear array configured for shear-wave inspection of the K-node weld geometry can resolve through-wall extent of a surface-breaking crack to roughly ±1 mm accuracy. The PAUT scan plan followed ASME V Article 4 Appendix IV for weld inspection, adapted for the K-node geometry and the curved tubular surface.[5] Sizing a fatigue crack at a K-node requires both crack length (from ACFM) and crack depth (from PAUT) to feed into the fracture-mechanics fitness-for-service evaluation.',
        'Saturation diving was the deployment platform. At -68 ft, surface-supplied air diving is possible but constrained on bottom time; saturation diving from a dive support vessel (DSV) gives 5-6 hour useful working windows and was selected for the multi-method inspection of the K-node. Two PAUT-qualified saturation divers were rotated through the inspection, with surface-side data analysis by a Level III PAUT inspector in real-time.',
      ],
    },
    {
      heading: 'Procedure: ACFM screening, PAUT sizing, full K-node coverage',
      level: 2,
      paragraphs: [
        'The first dive completed CVI on the K-node weld at 0.5 m visual range, photographing the indication and confirming it was a discrete crack-like feature rather than marine-growth artifact or paint disbond. Marine growth was removed from a 600 mm × 400 mm window around the indication using a low-pressure water jet (12 MPa) — high-pressure cleaning was specifically excluded by the procedure to avoid masking or worsening any crack indication. Surface prep brought the underlying weld and HAZ to bright metal.',
        'ACFM scanning followed with a Tritex Eddyfi probe across the full K-node weld toe on both the brace side and the leg side. The brace-side scan returned a 92 mm crack signature with the characteristic ACFM Bx and Bz field-component plots consistent with a surface-breaking fatigue crack. The leg-side weld scanned clean. ACFM length sizing gave 92 mm ± 3 mm — confirmed in a second-pass scan with the probe rotated 90° to verify the orientation.',
        'PAUT depth sizing followed on a third dive. The 32-element linear array was mounted in a flexible curved-surface holder that conformed to the 42-inch leg tubular geometry. The scan was performed in linear electronic scan mode at 45° refracted angle on the brace side, capturing the crack tip diffraction. The PAUT A-scan showed a clear tip signal at 8.2 mm depth, with the corner-trap signal at the crack-mouth surface. The crack was confirmed as a fatigue-type surface-breaking crack, 92 mm long, 8.2 mm deep into the 16 mm wall — roughly 51% through-wall extent.',
      ],
    },
    {
      heading: 'Findings: fatigue crack at high-SCF K-node, no other K-nodes affected',
      level: 2,
      paragraphs: [
        'Class society notification went out within 18 hours of PAUT confirmation. The fracture-mechanics fitness-for-service evaluation under BS 7910 §7 used the measured crack dimensions, the operating stress range, the wave-loading spectrum from the platform\'s metocean database, and the base-metal fracture toughness (Charpy V-notch data from the original mill certificates).[6] The critical crack size at end-of-life conditions returned 14 mm depth × 140 mm length — the existing 8.2 mm × 92 mm crack was inside the critical envelope but with reduced margin against a major storm-loading event.',
        'The asset team triggered an expanded-scope inspection of every K-node on the jacket. Saturation divers ran ACFM on 24 additional K-nodes across the four jacket legs over the next 6 days. Twenty-three nodes returned clean ACFM. One additional node (different leg, similar elevation) returned a 45 mm × 4 mm crack — well inside the BS 7910 critical envelope and dispositioned as a monitored defect with re-inspection at 12 months. The fatigue-crack distribution matched the original FEA prediction: highest-SCF K-nodes at the mid-depth elevation showed crack initiation first; lower-SCF nodes were clean.',
        'A separate ROV-deployed VT inspection of the jacket anode condition (a routine 5-year scope) confirmed 38% remaining anode material, consistent with the original cathodic-protection design service life. Anode replacement was added to the next 5-year inspection cycle rather than requiring immediate intervention.',
      ],
    },
    {
      heading: 'Disposition: class-approved underwater grinding-and-weld repair',
      level: 2,
      paragraphs: [
        'The 92 mm × 8.2 mm crack was repaired by underwater hyperbaric weld repair per AWS D3.6M Class A.[4] The procedure: (1) grind out the crack to verified clean metal, confirmed by MT after each grinding pass; (2) re-profile the weld toe to a smooth contour with a maximum 1:4 weld-toe-to-base-metal transition to reduce SCF; (3) deposit a new weld using diver-deployed shielded metal arc welding with low-hydrogen E7018 electrodes inside a habitat with controlled atmosphere; (4) post-weld ACFM and PAUT to verify defect-free repair. The repair habitat was sized at 1.8 m × 2.4 m × 1.5 m, with surface-supplied breathing gas, and the welder-diver was certified to AWS D3.6M Class A welding.',
        'Repair execution took 9 days, including 2 days of habitat installation and removal. The smaller 45 mm crack on the second K-node was monitored rather than repaired, on the engineering data — repair cost on a second node would have extended the campaign by another 7 days and the BS 7910 evaluation confirmed adequate margin for 12-month monitoring. The class society accepted both the repair and the monitored-defect disposition.',
        'The avoided cost case was substantial. The next-step alternative if underwater repair had been judged infeasible was a full leg-strengthening project — adding grouted-pile reinforcement or installed plate cover-plates over the K-node region. Operator engineering estimates for similar past projects on GoM jackets put the cost at $28-40M with a 4-6 month installation window. The actual underwater repair cost: $4.8M including DSV mobilization, saturation diving, NDT, and the habitat repair scope.',
      ],
    },
  ],
  methodsUsed: [
    'Diver-deployed Close Visual Inspection (CVI) — initial screening',
    'Alternating Current Field Measurement (ACFM) — crack detection and length sizing',
    'Diver-deployed Phased Array UT (PAUT) — crack depth sizing',
    'Underwater wet Magnetic Particle (MT) — repair-zone confirmation between grinding passes',
    'ROV Visual Testing — anode and general-area condition',
  ],
  defectsFound: [
    'Fatigue crack at K-node brace-side weld toe — 92 mm length × 8.2 mm depth (51% through-wall)',
    'Secondary fatigue crack at adjacent K-node — 45 mm length × 4 mm depth (25% through-wall, monitored)',
  ],
  outcome:
    'Class society notification filed within 18 hours of PAUT confirmation. BS 7910 fracture-mechanics FFS confirmed sub-critical for 12-month interval. Underwater hyperbaric weld repair completed per AWS D3.6M Class A. Second monitored crack scheduled for 12-month re-inspection. Platform returned to service.',
  costAvoidance:
    '$28-40M against a leg-strengthening project (grouted-pile reinforcement or cover-plate installation). The underwater hyperbaric repair at $4.8M was 85-88% cheaper than the leg-strengthening alternative and completed in 9 days vs 4-6 months.',
  durationDays: 18,
  techniciansDeployed: 7,
  certificationsNeeded: [
    'ASNT Level II PAUT (with commercial saturation-diving qualification)',
    'ASNT Level II MT and CSWIP 3.2U Underwater Inspector',
    'ACFM operator qualification per AWS D3.6M §6.4',
    'AWS D3.6M Class A underwater welder-diver',
    'API 580 Risk-Based Inspection engineer (for FFS sentencing)',
  ],
  faqs: [
    {
      q: 'Why use ACFM instead of underwater MT as the primary surface-crack detection tool on offshore jackets?',
      a: 'Underwater MT (wet fluorescent magnetic particle inspection) is the historical standard for ferromagnetic offshore weld inspection and is still widely used. ACFM is the modern alternative with three operational advantages: (1) no magnetic ink consumables — ACFM uses a handheld probe and electronic signal processing only, which simplifies diver logistics and avoids ink residue on the structure; (2) ACFM measures both crack presence and crack length in a single pass, with quantitative output, while MT gives indication detection but length sizing requires manual measurement against marine-growth-blurred indication boundaries; (3) ACFM works through paint up to 6 mm thick and through light marine growth, reducing the surface-prep scope. ACFM is now the primary surface-NDT method in most operator offshore inspection procedures, with MT retained for confirmation and for inspection of repair zones during welding.',
    },
    {
      q: 'How is a K-node different from other tubular joints, and why does it concentrate fatigue cracking?',
      a: 'A K-node is a tubular joint geometry where two diagonal braces meet a vertical (or near-vertical) chord member in a K-pattern. The K-pattern is structurally efficient for transferring lateral wave loads from the braces into the chord, but the geometry concentrates stress at the weld toes where the brace-to-chord welds meet. The stress concentration factor (SCF) at a K-node is typically 5-8× the nominal stress in the brace, compared to 2-3× at a simpler T-node and 1.5-2× at a Y-node. Over 30+ years of cyclic wave loading, K-nodes accumulate fatigue damage faster than other joint types and are the highest-priority inspection targets on aging jackets. Modern design practice (API RP 2A-WSD §5.3) uses joint-type-specific SCF tables and explicit fatigue life calculation to drive inspection intervals, with K-node inspection typically tightened to 4-5 year intervals on assets past 25 years of service.',
    },
    {
      q: 'How does saturation diving compare to air diving and ROV inspection for offshore NDT?',
      a: 'Air diving (surface-supplied air via umbilical) is the default for inspections at depths up to roughly -150 ft, with bottom-time limited by no-decompression dive tables — typically 30-45 minutes of useful inspection per dive. Saturation diving puts the diver in a pressurized habitat at the working depth for 28-day rotations, giving 5-6 hour useful work windows per dive without surface decompression — economical for deeper inspections (-150 ft and below) or for inspections requiring extended manual work like welding. ROV inspection is the rapidly-growing third option: ROV-deployed cameras and tools can cover CVI scope at any depth at lower cost than diving, but ROV-deployed NDT (UT, ACFM, MT) is still developing and currently most reliable for screening rather than for high-fidelity defect characterization. The hybrid approach used on this campaign — ROV for screening, divers for characterization and repair — is the current industry standard for GoM and North Sea jacket inspection programs.',
    },
    {
      q: 'What is in scope for a BS 7910 fracture-mechanics FFS on an offshore K-node crack?',
      a: 'BS 7910 Section 7 covers the assessment of crack-like flaws in welded structures. The required inputs are: (1) measured crack dimensions (length, depth, position relative to weld toe and HAZ); (2) base-metal and weld-metal mechanical properties — yield, tensile, Charpy V-notch energy or CTOD at minimum service temperature; (3) the stress spectrum at the crack location — for offshore platforms, this is the wave-loading spectrum scaled by the K-node SCF; (4) the residual stress field at the weld toe — typically assumed at yield-strength level for as-welded condition; (5) the fatigue crack growth law parameters (Paris-law constants) for the steel grade and the loading frequency. The output is a critical-crack-size envelope, a fatigue-life projection, and a remaining-life-to-action assessment. The FFS gives the operator a defensible engineering basis for repair, monitoring, or removal-from-service dispositioning.',
    },
    {
      q: 'When is underwater hyperbaric welding the right repair, versus a clamp or a leg-strengthening project?',
      a: 'Hyperbaric welding (welding inside a dry habitat installed around the repair site, with the diver-welder breathing controlled-atmosphere gas) is the highest-quality underwater repair method, qualifiable to AWS D3.6M Class A — the same metallurgical quality bar as topside structural welding. It is the right choice for fatigue cracks at high-SCF nodes where: (1) the defect can be ground out and re-welded inside a habitat of reasonable size (typically 1-3 m); (2) the joint geometry is accessible to a welder-diver; (3) the operating life justifies the cost — typical hyperbaric K-node repair costs $3-6M including DSV mobilization, divers, habitat, NDT, and welding. Bolted clamps are an alternative for cases where habitat installation is infeasible or where the defect class is non-load-bearing. Leg-strengthening (grouted piles, cover plates) becomes the option when the underlying structure no longer carries the design loads even with local crack repair — typically only after multi-node fatigue damage that signals systemic end-of-fatigue-life rather than localized defect repair.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/paut',
      label: 'Phased Array UT',
      context: 'Diver-deployed PAUT sized the K-node fatigue crack to ±1 mm depth accuracy.',
    },
    {
      href: '/methods/acfm',
      label: 'Alternating Current Field Measurement',
      context: 'ACFM is the primary surface-crack detection tool on offshore jacket welds.',
    },
    {
      href: '/methods/mt',
      label: 'Magnetic Particle Testing',
      context: 'Underwater wet MT confirmed the repair zone clean between grinding passes.',
    },
    {
      href: '/methods/vt',
      label: 'Visual Testing',
      context: 'Close visual inspection by diver and ROV is the first-pass screen on jacket structures.',
    },
    {
      href: '/industries/offshore',
      label: 'Offshore NDT',
      context: 'Fixed-jacket platform inspection programs across GoM, North Sea, and West Africa.',
    },
    {
      href: '/industries/oil-gas',
      label: 'Oil & Gas NDT',
      context: 'Upstream offshore inspection across drilling, production, and pipeline assets.',
    },
    {
      href: '/glossary/fatigue-crack',
      label: 'Fatigue Crack',
      context: 'Service-induced cyclic loading defect, characteristic of high-SCF welded joints.',
    },
    {
      href: '/free-tools/scf-calculator',
      label: 'Stress Concentration Factor Calculator',
      context: 'Estimate K-node, T-node, and Y-node SCF for fatigue-life screening.',
    },
    {
      href: '/ndt-services/houston/paut',
      label: 'PAUT services in Houston',
      context: 'Gulf Coast PAUT inspection vendors with offshore saturation-diving qualification.',
    },
    {
      href: '/standards/asme-section-v',
      label: 'ASME Section V',
      context: 'Article 4 Appendix IV (PAUT) procedure baseline, adapted for tubular geometry.',
    },
  ],
  citations: [
    {
      id: 'api-rp-2sim',
      source: 'API RP 2SIM, 2nd ed. (2014, R2019), Structural Integrity Management of Fixed Offshore Structures',
    },
    {
      id: 'abs-mou-2024',
      source: 'ABS Rules for Building and Classing Offshore Installations (2024), Part 7 Survey After Construction',
    },
    {
      id: 'api-rp-2x',
      source: 'API RP 2X, 5th ed. (2018), Recommended Practice for Ultrasonic and Magnetic Examination of Offshore Structural Fabrication',
    },
    {
      id: 'aws-d3-6m',
      source: 'AWS D3.6M:2017, Underwater Welding Code',
    },
    {
      id: 'asme-v-app-iv',
      source: 'ASME BPVC Section V (2023), Article 4 Mandatory Appendix IV — Phased Array UT',
    },
    {
      id: 'bs-7910',
      source: 'BS 7910:2019, Guide to methods for assessing the acceptability of flaws in metallic structures, Section 7',
    },
    {
      id: 'api-rp-2a-wsd',
      source: 'API RP 2A-WSD, 22nd ed. (2014), Planning, Designing, and Constructing Fixed Offshore Platforms — Working Stress Design',
    },
  ],
};

export default study;
