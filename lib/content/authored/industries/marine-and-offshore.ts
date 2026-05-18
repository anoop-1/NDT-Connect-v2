import type { IndustryContent } from '../types';

const industry: IndustryContent = {
  slug: 'marine-and-offshore',
  name: 'Marine and Offshore',
  metaTitle: 'Marine and Offshore NDT: ABS, DNV, Lloyd\'s, USCG, BSEE',
  metaDescription:
    'Marine and offshore NDT under ABS, DNV, Lloyd\'s Register, USCG, and BSEE — hull plating UT, ballast tank coatings, jacket weld inspection, and subsea pipeline ROV survey.',
  heroLede:
    "A Suezmax crude tanker arrives at a Singapore drydock for its 15-year special survey. Classification under ABS or DNV demands UT thickness measurements on every plate, every longitudinal stiffener, and every transverse web frame across the cargo block — typically 20,000-40,000 individual gaugings against the original mill thickness, with class-defined wastage limits driving steel renewal decisions worth $5-15 million per vessel.[1] Offshore, a fixed jacket platform on the U.S. OCS owes BSEE a regular Level III inspection per 30 CFR 250 Subpart I that exercises diver and ROV-deployed UT, MT, and CP surveys to demonstrate structural fitness for continued service.[2] The marine and offshore inspection world is governed by class societies and flag states, and the technical bar is set by the IACS Common Structural Rules and the offshore design codes.\n\nThis guide is for the marine superintendent specifying drydock work, the offshore integrity engineer scoping subsea inspections, and the Level II UT/MT technician working a drydock survey or platform shutdown.",
  marketContext:
    "Marine and offshore NDT runs on a parallel regulatory track to onshore work. Vessels operate under class society oversight (ABS, DNV, Lloyd's Register, Bureau Veritas, ClassNK, RINA, KR) per the IACS member framework, with periodic surveys (Annual, Intermediate, Renewal/Special) on 5-year cycles. The IACS Common Structural Rules harmonize tanker and bulker structural requirements across classes.[1][3] Flag state jurisdiction (US Coast Guard under 46 CFR for US-flagged vessels) layers on top with port state control inspections under MOUs (Paris, Tokyo, USCG). Offshore oil and gas installations on the U.S. OCS are regulated by BSEE under 30 CFR 250, with API RP 2A-WSD as the design and assessment standard for fixed steel jackets, API RP 2I for in-service inspection, and API RP 2SIM for structural integrity management.[2][4] North Sea installations operate under HSE Safety Case regulations with DNV-OS-C101 and DNV-RP-C203 as the typical design and fatigue assessment references. Subsea pipelines fall under DNV-ST-F101 with ROV-deployed external corrosion, free-span, and CP surveys driving the in-service inspection scope.",
  commonAssets: [
    'Hull plating, stiffeners, and primary structural members on tankers, bulkers, container ships, and gas carriers',
    'Cargo and ballast tanks — coating condition, plate wastage, and structural member section loss',
    'Fixed offshore platforms — jacket members, conductor framing, deck legs, leg-to-pile welds, and risers',
    'Floating production units (FPSO, FLNG, FSO) — turret moorings, riser hang-offs, hull-deck connections, and topsides supports',
    'Subsea pipelines and risers — concrete-coated trunklines, flexible risers, dynamic umbilicals, and tie-in spools',
    'Mooring systems — chain, wire rope, polyester rope, anchor points, and connecting hardware',
  ],
  dominantDefectMechanisms: [
    {
      mechanism: 'General and Localized Corrosion in Ballast and Cargo Tanks',
      explanation:
        "Ballast tanks alternate between seawater immersion and aerated empty conditions, driving wastage at 0.1-0.3 mm/year on uncoated structures and 0.02-0.10 mm/year on properly coated. IACS Common Structural Rules specify gross-thickness, renewal-thickness, and substantial-corrosion limits by structural category. The 2006 IACS CSR plus the 2014 harmonized CSR-H rules tightened both the design margins and the inspection scope.[1] Closeup surveys at intermediate and special surveys require UT thickness on representative members; substantial corrosion findings trigger expanded UT scope.",
    },
    {
      mechanism: 'Fatigue Cracking at Stiffener-to-Web Connections',
      explanation:
        "Tanker side longitudinal connections to transverse web frames experience high cyclic stress from cargo loading cycles and wave-induced loads. The 'gap-stress' detail at the stiffener-to-web bracket is fatigue-prone, particularly in the cargo block. IACS rules require closeup visual inspection at intermediate surveys past age 5 and full UT/MT at special surveys past age 15. Repair welding under class-approved procedures using ABS or DNV welder qualifications.",
    },
    {
      mechanism: 'Stress Concentration Fatigue on Offshore Jacket Joints',
      explanation:
        "Tubular K, T, and Y joints on fixed offshore jackets accumulate fatigue damage from wave and current loading over 25-40 year design lives. API RP 2A-WSD §11 specifies fatigue analysis methodology using AWS D1.1 hot-spot stress concentration factors and S-N curves; DNV-RP-C203 provides the European equivalent. Subsea inspection by diver or ROV uses ACFM (alternating current field measurement) and MPI (in-air or underwater) for surface crack detection at hot-spot locations.[5][6]",
    },
    {
      mechanism: 'Coating Breakdown and Cathodic Protection Failure',
      explanation:
        "External coatings on submerged offshore structures degrade over 20-30 years, transferring corrosion protection load to sacrificial anodes (typically aluminum-zinc-indium). Anode depletion and excess current demand drive accelerated corrosion at coating breaks. ROV-deployed CP surveys (proximity and contact potential measurements per NACE SP0176) plus visual coating inspection on a 1-3 year interval characterize the protection status.[7]",
    },
    {
      mechanism: 'Hydrogen-Induced Stress Cracking on Subsea High-Strength Components',
      explanation:
        "High-strength low-alloy steel subsea components (riser bolts, subsea connectors, mooring chain) operating with cathodic protection are susceptible to hydrogen embrittlement when overpolarized. NACE TM0177 and DNV-RP-B401 guide design and material selection; in-service inspection uses MT/PT on accessible surfaces and ECT array on bolt-hole fastener surfaces. Failures are typically delayed and brittle, making proactive inspection essential.",
    },
  ],
  methodsUsed: [
    {
      method: 'UT Thickness — Manual and Crawler-Deployed',
      reason:
        "Mainstay of hull steel renewal decisions during drydock special surveys. Manual single-element UT with 5 MHz dual-element probes per ASTM E797. Crawler-deployed automated UT (e.g., Silverwing R-Scan/R-MAT) covers large plate areas faster than manual gauging.",
    },
    {
      method: 'MT/PT — Surface Crack Detection',
      reason:
        "Wet fluorescent MT on internal hull weld details during drydock; underwater MPI (UMPI) per BS EN ISO 23278 on subsea welds. PT on stainless steel and non-ferromagnetic structures.",
    },
    {
      method: 'ACFM (Alternating Current Field Measurement) Underwater',
      reason:
        "Underwater crack detection on offshore jacket nodes without surface preparation beyond marine growth removal. ACFM probes work through paint and thin coatings, making them faster than UMPI for diver-deployed inspection on submerged structural welds.",
    },
    {
      method: 'Long-Range UT (Guided Wave) on Risers and Caissons',
      reason:
        "Screening of long pipeline lengths, risers, and caissons from a single inspection point. ISO 18211 governs technique. Catches wall thickness loss and circumferential cracks over hundreds of meters from a single transducer ring.",
    },
    {
      method: 'ROV-Deployed Visual and CP Survey',
      reason:
        "External survey of subsea pipelines, risers, and platform structures. Work-class ROV with HD video, plus stab-contact CP probe per NACE SP0176. Survey speeds of 2-5 km/hr on flowlines.",
    },
    {
      method: 'Closeup Visual Survey for Class Inspection',
      reason:
        "IACS-defined closeup visual survey within arms-reach of structural members during intermediate and special surveys. Driven by qualified class surveyors plus contracted UT technicians; this is where steel renewal decisions get made.",
    },
  ],
  regulatoryFramework: [
    {
      id: 'abs-rules',
      source: 'ABS Rules for Building and Classing Marine Vessels, 2024 ed.',
      url: 'https://ww2.eagle.org/',
    },
    {
      id: 'dnv-rules',
      source: 'DNV Rules for Classification of Ships, Part 7: Fleet in Service, 2024',
    },
    {
      id: 'lr-rules',
      source: "Lloyd's Register Rules and Regulations for the Classification of Ships, 2024 ed.",
    },
    {
      id: 'iacs-csr',
      source: 'IACS Common Structural Rules for Bulk Carriers and Oil Tankers, 2024 ed.',
    },
    {
      id: 'uscg-46cfr',
      source: '46 CFR Subchapter D — Tank Vessels and Subchapter I — Cargo and Miscellaneous Vessels (US Coast Guard)',
    },
    {
      id: 'bsee-250',
      source: '30 CFR 250 Subpart I — Platforms and Structures, Bureau of Safety and Environmental Enforcement',
    },
    {
      id: 'api-2a-wsd',
      source: 'API RP 2A-WSD, Planning, Designing, and Constructing Fixed Offshore Platforms — Working Stress Design, 22nd ed., 2014',
    },
  ],
  caseScenarios: [
    {
      title: 'Suezmax crude tanker — 15-year special survey scope',
      body: "A 162,000 DWT Suezmax tanker classed by ABS arrived at a Far East drydock for its third special survey at age 15. Pre-arrival document review under IACS Common Structural Rules identified five cargo tanks and four ballast tanks for closeup visual plus expanded UT scope based on prior intermediate survey wastage findings. The drydock contractor mobilized 24 UT technicians supporting four ABS surveyors over a 21-day window, gauging 38,000 individual readings against gross and renewal thickness limits. Final scope identified 320 tonnes of steel renewal on side shell, longitudinal stiffeners, and transverse webs in two cargo tanks. Total NDT cost was $480,000; steel renewal and coating cost $4.2 million; class certification was issued on schedule and the vessel returned to charter within the planned drydock window.",
    },
    {
      title: 'GoM fixed jacket platform — Level III API RP 2I inspection',
      body: "An aging fixed jacket platform on the Gulf of Mexico OCS, in service 36 years against a 25-year original design life, required a Level III API RP 2I inspection per BSEE 30 CFR 250 Subpart I. The integrity team mobilized a diver crew plus a work-class ROV over a 12-day vessel window. Underwater scope included CP survey of all submerged members, marine growth removal at 28 critical nodes, ACFM crack detection at hot-spot locations, and FMD (flooded member detection) on horizontal braces. Findings included three propagating fatigue cracks at K-joint hot spots, four anodes below 20% remaining mass, and two members showing internal flooding consistent with through-wall corrosion. Engineering critical assessment under API RP 2SIM cleared the platform for 5 additional years of service with anode retrofit, weld repair on the three flagged nodes, and monitoring of the flooded members. NDT and engineering cost was $1.4 million against a $35 million decommissioning trigger.",
    },
    {
      title: 'Subsea pipeline ROV survey — free-span and CUI assessment',
      body: "A North Sea operator commissioned a 5-year external integrity survey of a 220 km subsea pipeline under DNV-ST-F101. Work-class ROV with multibeam sonar, HD video, and CP probe completed the survey over 16 vessel days. The survey identified 14 free-span sections exceeding the static analysis allowable, two areas of suspect concrete coating damage, and CP readings averaging -890 mV with localized excursions to -780 mV (anode depletion). Engineering assessment cleared 9 of the 14 free spans for continued service, mandated rock-dump remediation on 5 critical spans, and triggered an anode retrofit project on three pipeline sections. Survey cost was $2.6 million; remediation $14 million; the assessment supported continued operation at full design pressure for the next 5-year integrity cycle.",
    },
  ],
  costDrivers: [
    'Drydock day rates ($120,000-$280,000 per day for large tankers) compressing all NDT into a tight critical-path window',
    'Diver versus ROV mix — saturation diving day rates $80,000-$180,000 versus work-class ROV $40,000-$90,000 per spread day',
    'Class society surveyor day rates plus travel — ABS, DNV, LR survey costs typically $1,800-$3,500 per surveyor day',
    'UT thickness gauging volume — major special survey scope can exceed 40,000 readings per vessel',
    'Confined space and gas-free certifications for cargo tank entries — adds 6-12 hours of prep per tank',
    'Vessel mobilization for offshore inspection — DSV/ROV vessel charter $50,000-$250,000 per day, often the largest single cost line',
  ],
  vendorSelection:
    "For marine and offshore NDT, the threshold is ASNT SNT-TC-1A or CP-189 written practice plus class society approval where required. ABS, DNV, LR, and BV maintain lists of approved firms for UT thickness measurement under class — vessels under their flag will only accept readings from approved firms. For underwater work, IMCA (International Marine Contractors Association) divers with appropriate UMPI/ACFM training are the bar; many North Sea operators specifically require IMCA membership and DNV-approved underwater NDT procedures. For offshore platform inspection, BSEE expects qualified API RP 2I assessors leading the inspection campaign and ASNT Level II technicians performing the field work. Pre-qualify vendors by requesting class society approval letters, IMCA membership documentation, and recent vessel/platform reference projects. NDT Connect lists marine and offshore vendors by class society approval status, IMCA membership, and operational region.",
  faqs: [
    {
      q: 'How does a ship special survey work under classification?',
      a: "Class societies (ABS, DNV, LR, BV, ClassNK, etc.) operate on a 5-year survey cycle for steel ships: Annual Survey (each year), Intermediate Survey (between 2 and 3 years), and Renewal/Special Survey (every 5 years). The Special Survey is the most intensive — under IACS Common Structural Rules for tankers and bulkers, vessels past age 10 require closeup visual inspection of every cargo tank and ballast tank, comprehensive UT thickness measurements on plating and structural members, and verification of structural integrity against renewal thickness limits. Findings of substantial corrosion (75% of allowable wastage) trigger expanded UT scope per the CSR rules. Steel renewal decisions get made during the survey based on the as-found thickness measurements versus renewal-thickness limits.[1][3]",
    },
    {
      q: 'What is the difference between API RP 2A and API RP 2SIM?',
      a: "API RP 2A-WSD (currently 22nd ed., 2014) is the design and construction standard for fixed offshore platforms — it covers structural design, fatigue analysis, foundation design, and material selection for new construction.[4] API RP 2SIM (Structural Integrity Management, 2nd ed., 2019) is the in-service assessment standard — it provides the framework for evaluating an aging platform's fitness for continued service, including engineering criticality assessment, risk-based inspection prioritization, and life extension justification. API RP 2I (In-service Inspection of Mooring Hardware and Welds, 4th ed., 2024) provides the inspection methodology that feeds into API RP 2SIM. BSEE accepts API RP 2SIM as the basis for life extension submissions on aging GoM platforms.",
    },
    {
      q: 'When is underwater NDT acceptable versus drydock NDT?',
      a: "Underwater NDT is acceptable for class continuous-survey programs where the vessel maintains an in-water survey schedule in lieu of drydocking. IACS classification rules allow in-water surveys for the second intermediate and second renewal survey for vessels meeting age and condition criteria — typically vessels under 15 years old in good condition with documented coating and CP performance. Underwater UT thickness (single-element with appropriate couplant) is class-approved when performed by qualified divers/ROV with approved procedures. For tankers and chemical carriers, drydock is mandatory at 7.5-year intervals with no waiver. For offshore platforms, all subsea inspection is by definition underwater — drydocking is not feasible.",
    },
    {
      q: 'How does cathodic protection survey work on subsea pipelines?',
      a: "Cathodic protection (CP) surveys on subsea pipelines and offshore structures measure the electrical potential between the metal surface and a reference cell (typically silver/silver-chloride or zinc) to verify that the structure is adequately polarized to prevent corrosion. NACE SP0176 sets the protection criterion at -800 mV (Ag/AgCl seawater) or more negative.[7] ROV-deployed CP surveys use a stab-contact probe that physically contacts the metal surface through marine growth, plus a trailing reference cell on a stinger. Survey output is a plot of CP potential versus pipeline kilometer point, with anomalies (potentials less negative than -800 mV) flagged for further investigation including anode condition inspection. Combined CP surveys with multibeam sonar and visual inspection provide an integrated external pipeline integrity assessment.",
    },
    {
      q: 'What are IMCA requirements for offshore NDT divers?',
      a: "IMCA (International Marine Contractors Association) is the industry body governing offshore diving contractor practices. Member contractors operate under IMCA-defined competency standards including IMCA D 023 (diver/diving supervisor competency) and IMCA D 014 (offshore underwater inspection personnel). For NDT diving specifically, IMCA expects divers to hold CSWIP 3.1U (underwater inspection controller) or CSWIP 3.2U (underwater inspector) plus method-specific qualifications (CSWIP UMPI, ACFM, UT). Most major operators in the North Sea, Gulf of Mexico, and other established offshore regions specify IMCA membership as a contracting prerequisite, and procedures must align with IMCA's published guidance documents.",
    },
  ],
  internalLinks: [
    {
      href: '/ndt-methods/ultrasonic-testing',
      label: 'Ultrasonic Testing (UT)',
      context: 'UT thickness gauging is the primary tool for hull plate wastage assessment under class.',
    },
    {
      href: '/ndt-methods/magnetic-particle-testing',
      label: 'Magnetic Particle Testing (MT)',
      context: 'MT (including underwater MPI) catches surface cracks on offshore jacket welds and ship structures.',
    },
    {
      href: '/ndt-methods/eddy-current-testing',
      label: 'Eddy Current Testing (ECT)',
      context: 'ECT array probes cover fastener-hole and bolt-hole inspection on subsea connectors.',
    },
    {
      href: '/standards/api-510',
      label: 'API 510 Pressure Vessel Inspection',
      context: 'Offshore process equipment falls under API 510 in parallel to BSEE structural rules.',
    },
    {
      href: '/industries/oil-and-gas',
      label: 'Oil and Gas NDT',
      context: 'Offshore production directly bridges marine and oil and gas inspection scopes.',
    },
    {
      href: '/industries/pipeline-transmission',
      label: 'Pipeline NDT',
      context: 'Subsea pipeline integrity management overlaps onshore pipeline NDT under PHMSA-equivalent class rules.',
    },
    {
      href: '/free-tools/ndt-cost-calculator',
      label: 'NDT Cost Calculator',
      context: 'Estimate drydock and platform inspection NDT budgets against vessel size and scope.',
    },
    {
      href: '/free-tools/equipment-tracker',
      label: 'Equipment Tracker',
      context: 'Track UT thickness gauges, MT yokes, and ACFM probes across offshore inspection campaigns.',
    },
  ],
  citations: [
    {
      id: 'iacs-csr',
      source: 'IACS Common Structural Rules for Bulk Carriers and Oil Tankers, International Association of Classification Societies, 2024 ed.',
      url: 'https://www.iacs.org.uk/',
    },
    {
      id: 'bsee-250',
      source: '30 CFR 250 Subpart I, Platforms and Structures, Bureau of Safety and Environmental Enforcement',
      url: 'https://www.bsee.gov/',
    },
    {
      id: 'abs-rules',
      source: 'ABS Rules for Survey After Construction, American Bureau of Shipping, 2024 ed.',
    },
    {
      id: 'api-2a-wsd',
      source: 'API RP 2A-WSD, Planning, Designing, and Constructing Fixed Offshore Platforms — Working Stress Design, 22nd ed., 2014',
    },
    {
      id: 'api-2sim',
      source: 'API RP 2SIM, Structural Integrity Management of Fixed Offshore Structures, 2nd ed., 2019',
    },
    {
      id: 'dnv-rp-c203',
      source: 'DNV-RP-C203, Fatigue Design of Offshore Steel Structures, DNV, 2021',
    },
    {
      id: 'nace-sp0176',
      source: 'NACE SP0176-2007, Corrosion Control of Submerged Areas of Permanently Installed Steel Offshore Structures Associated with Petroleum Production',
    },
    {
      id: 'dnv-st-f101',
      source: 'DNV-ST-F101, Submarine Pipeline Systems, DNV, 2021',
    },
  ],
};

export default industry;
