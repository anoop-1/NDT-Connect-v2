import type { IndustryContent } from '../types';

const industry: IndustryContent = {
  slug: 'power-generation',
  name: 'Power Generation',
  metaTitle: 'Power Generation NDT: Boilers, Turbines, ASME Section I',
  metaDescription:
    'Power plant NDT under ASME Section I, NBIC, and NERC GADS reliability rules — boiler tube creep, HRSG inspection, steam turbine rotor bore, and HP/IP casing examinations.',
  heroLede:
    "A 750 MW coal-fired unit at Plant Bowen takes a 21-day spring outage every other year. Boiler tube failures account for roughly 40% of forced outages on aging coal and biomass fleets per EPRI's annual outage cause analysis, and the inspection scope on the unit's superheater pendants, reheater outlet headers, and waterwall tubes drives the critical path of the entire turnaround.[1] ASME Section I governs the build, NBIC and the state jurisdictional commission govern in-service inspection, and ASME PCC-2 controls the repair methodology. Combined-cycle units swap the boiler for a heat recovery steam generator (HRSG) and add gas turbine hot section inspections — different defect mechanisms, same inspection-budget pressure.[2][3]\n\nThis guide is for the inspection engineer scoping a plant outage, the Level II technician shooting borescope and UT on tube banks, and the asset owner stress-testing a contractor's outage proposal against NBIC and jurisdictional requirements.",
  marketContext:
    "The U.S. power generation NDT market is shaped by two regulatory layers: ASME for build and design, and the National Board Inspection Code (NBIC) for in-service inspection of boilers and pressure vessels in the 49 states that recognize NBIC.[4] State jurisdictional commissioners (Texas DLR, California OSPV, Pennsylvania Department of Labor, etc.) enforce inspection intervals — typically annual external + biennial or quinquennial internal for high-pressure boilers above 15 psig steam or 160 psig water.[5] Nuclear plants operate under a separate framework discussed in the nuclear industry guide. NERC's GADS (Generating Availability Data System) tracks forced outage causes, and the leading causes are boiler tube leaks, HRSG thermal fatigue, steam turbine blade failures, generator rotor issues, and transformer faults — every one of these has an NDT solution. EPRI maintains the deepest applied research library in the world on power plant materials and NDT, and the industry has built an effective standards bridge between EPRI guidelines and ASME/NBIC code requirements.[1][6]",
  commonAssets: [
    'Fossil boilers — waterwall tubes, superheater and reheater pendants, economizer, drum, headers (SA-178/192/210/213/335 steels)',
    'HRSG modules in combined-cycle plants — HP/IP/LP evaporators, superheaters, attemperators (T22, T23, T91, T92, P91 alloys)',
    'Steam turbines — HP/IP/LP rotors, blade roots, bores, casings, control valves, balance pistons',
    'Generators — rotor forgings, retaining rings, stator core, stator bars, end-winding supports',
    'Gas turbines (combined cycle and simple cycle) — combustor liners, transition pieces, turbine blades and vanes, rotors',
    'Balance of plant — feedwater piping (ASME B31.1), condensers, feedwater heaters, deaerators',
  ],
  dominantDefectMechanisms: [
    {
      mechanism: 'Long-Term Creep and Creep-Fatigue in High-Temperature Headers and Tubes',
      explanation:
        "Headers, pendant tubes, and reheater outlet tubes operating above 540 °C in modern supercritical and ultra-supercritical units accumulate creep damage. T91/P91 (Grade 91) ferritic-martensitic steel is particularly notorious for Type IV cracking in the fine-grained heat-affected zone of girth welds.[7] EPRI guidelines specify periodic replication metallography, PAUT TOFD on girth welds, and time-on-load tracking. Detection sensitivity is procedure-bound — generic UT misses tight intergranular cracking until it links and propagates.",
    },
    {
      mechanism: 'Thermal Fatigue and Flexible Operation Damage in HRSGs',
      explanation:
        "Cycling combined-cycle plants subject HRSG harp tubes, attemperators, and headers to thousands of start-stop cycles per year, well above the original design assumption of baseload steady operation. EPRI's HRSG Tube Failure Manual documents 18 distinct failure modes, with thermal fatigue at attemperators and ligament cracking at headers leading the list.[8] Borescope visual inspection plus phased array UT and surface PT/MT at suspect locations form the in-service inspection bundle. Some operators now mandate full header replacement at 100,000-150,000 cycles.",
    },
    {
      mechanism: 'Steam Turbine Blade Stress Corrosion and Last-Stage Erosion',
      explanation:
        "L-0 and L-1 stage LP turbine blades operate in wet steam at high tip speeds and develop stress corrosion cracking at disk attachment grooves, plus water-droplet erosion on leading edges. Manufacturer-specific inspection intervals (typically every other major outage) require disk and rotor disassembly, magnetic particle inspection on attachment grooves, and dye-penetrant on blade-root surfaces. Bore sonic inspection per ASME Section V Article 23 covers the rotor bore for hydrogen-induced or hydrogen-assisted cracking.[9]",
    },
    {
      mechanism: 'Generator Retaining Ring Stress Corrosion',
      explanation:
        "18Mn-18Cr austenitic retaining rings on generator rotors held the industry standard since 1985 — earlier 18Mn-5Cr rings were notorious for SCC failures, leading to multiple catastrophic events including the 1994 ring burst at the Tennessee Valley Authority's Browns Ferry. Even modern rings require periodic UT inspection per the OEM manual (typically every 6-10 years) plus visual surface examination during major outages. EPRI guidelines and GE/Siemens/Mitsubishi OEM bulletins drive the inspection methodology.[10]",
    },
    {
      mechanism: 'Hot Section Distress in Combustion Turbine Hot Gas Path',
      explanation:
        "Combustion liners, transition pieces, first-stage nozzles and buckets operate above 1300 °C with thermal barrier coatings. Distress modes include thermal mechanical fatigue cracking, TBC spallation, oxidation, sulfidation, and creep. OEM-specific borescope inspection per the engine maintenance manual is the baseline; FPI and ECT at module overhaul intervals catch surface and near-surface defects. Replacement intervals are EOH-driven and OEM-controlled.",
    },
  ],
  methodsUsed: [
    {
      method: 'Boiler Tube Wall Thickness UT (Manual and IRIS)',
      reason:
        "Annual wall thickness mapping on waterwall and superheater tubes to track erosion-corrosion and fireside wastage. Manual UT with 5 MHz dual-element probes on accessible tubes; IRIS for fin-tube bundles where access permits. ASME Sec V Article 23 governs the technique.",
    },
    {
      method: 'Phased Array UT with TOFD on High-Energy Piping Girth Welds',
      reason:
        "ASME B31.1 and ASME PCC-2 acknowledge PAUT/TOFD for high-energy piping (main steam, hot reheat) inspection. Replaces RT for in-service work — no exclusion zone, faster than RT on heavy wall, permanent digital record for trend.",
    },
    {
      method: 'Replication Metallography on Creep-Susceptible Headers',
      reason:
        "Surface plastic replication per ASTM E1351 captures grain structure for offline metallographic interpretation. Standard EPRI practice on P91/T91 headers, hot reheat piping, and high-temperature steam drum welds for early-stage creep cavitation detection.",
    },
    {
      method: 'Borescope Visual on Gas Turbines, HRSGs, and Boiler Tube Banks',
      reason:
        "Compact rigid and articulating borescopes (4-12 mm dia) plus video probes give access to internal surfaces without disassembly. Workhorse for GT hot section bucket and nozzle inspection, HRSG tube bank inspection between rows, and boiler tube ID inspection.",
    },
    {
      method: 'Magnetic Particle Inspection (Wet Fluorescent)',
      reason:
        "Surface crack detection on turbine rotor blade root attachment grooves, generator retaining rings (after demagnetization), and high-stress structural welds. ASME Sec V Article 7 governs technique with continuous-method residual after current shut-off.",
    },
    {
      method: 'Acoustic Emission Monitoring on Pressure Vessels and Storage Tanks',
      reason:
        "Online integrity assessment for boiler tube leak detection and intermediate-pressure vessel monitoring during hydrotest per ASTM E1930 and ASME Sec V Article 12. Catches active growing flaws in real time and prioritizes follow-up inspection.",
    },
  ],
  regulatoryFramework: [
    {
      id: 'asme-bpvc-i',
      source: 'ASME Boiler and Pressure Vessel Code, Section I: Rules for Construction of Power Boilers, 2023 ed.',
    },
    {
      id: 'asme-bpvc-v',
      source: 'ASME BPVC Section V: Nondestructive Examination, 2023 ed.',
    },
    {
      id: 'nbic',
      source: 'National Board Inspection Code (NBIC) NB-23, Part 2: Inspection, 2023 ed.',
      url: 'https://www.nationalboard.org/Index.aspx?pageID=4',
    },
    {
      id: 'asme-b31-1',
      source: 'ASME B31.1, Power Piping, 2022 ed.',
    },
    {
      id: 'asme-pcc-2',
      source: 'ASME PCC-2, Repair of Pressure Equipment and Piping, 2022 ed.',
    },
    {
      id: 'epa-nepa',
      source: 'National Environmental Policy Act (NEPA), 42 USC §4321 — applies to new generation siting; affects inspection-driven plant uprates',
    },
    {
      id: 'osha-1910-23',
      source: '29 CFR 1910.23, Walking-Working Surfaces (OSHA) — affects boiler access and confined-space inspection rigging',
    },
  ],
  caseScenarios: [
    {
      title: '550 MW supercritical boiler — Type IV cracking in P91 hot reheat girth weld',
      body: "An eastern utility's supercritical unit returned from a planned outage with elevated vibration on hot reheat piping. Follow-up PAUT TOFD inspection on the fleet of P91 hot reheat girth welds at the next forced outage revealed three girth welds with sub-surface fine-grain HAZ cracking consistent with EPRI's Type IV creep pattern. Replication metallography confirmed Class 4-5 creep cavitation in the affected HAZ. The operator de-rated the unit, sourced replacement P91 spools with controlled normalize-and-temper heat treatment matching the original parent material, and completed weld repair under ASME PCC-2 Article 2.2 during a 14-day forced outage. Total NDT, engineering, and repair cost was $2.4 million against a forced-failure exposure exceeding $20 million per day of unplanned outage.",
    },
    {
      title: '2x1 combined-cycle HRSG — attemperator thermal fatigue',
      body: "A 850 MW 2x1 combined-cycle plant cycling daily reported repeated tube leaks at the HP attemperator outlet on both HRSG units. Borescope inspection revealed ligament cracking at the spray-water injection point on the attemperator pipe inner wall. PAUT mapping characterized 14 separate ligament cracks across both HRSGs, ranging from 30% to 70% wall depth. The operator replaced both attemperator sections with a modified design including improved spray-water atomization and longer thermal mixing distance, and added borescope inspection of all attemperator outlets every major outage. Forced outage frequency on the units dropped from 4 per year to under 1 over the following 24 months.",
    },
    {
      title: '650 MW steam turbine — generator retaining ring rotor bore exam',
      body: "A 650 MW steam turbine generator approaching its 30-year overhaul required a bore sonic inspection of the rotor body per the OEM major-maintenance schedule. The vendor crew set up an immersion-couplant UT system with axial and circumferential scans of the rotor bore over a 4-day shop visit. The inspection identified two indications above the OEM reject threshold near the body coupling end — both at depths consistent with hydrogen-induced bore cracking risk per EPRI guidelines. Engineering critical assessment under the OEM's ECA methodology cleared one indication for continued service with monitoring on a 6-year interval; the second required boring out and weld-buildup repair. The decision saved the operator a $14 million rotor replacement against a $1.6 million bore repair.",
    },
  ],
  costDrivers: [
    'Outage compression — premium rates for crews working back-to-back 12-hour shifts during a 14-30 day shutdown window',
    'High-pressure boiler scaffolding and confined-space rigging (often 15-25% of total inspection cost on coal-fired units)',
    'NDT personnel jurisdictional certification (NBIC NIA, state-specific high-pressure boiler inspector commissioning) in addition to ASNT Level II/III',
    'Replication metallography on P91/T91 headers — typical cost $300-700 per location, with 50-200 locations per unit',
    'PAUT/TOFD procedure qualification on high-energy piping — first-time procedure qualification adds $25,000-60,000 per code class',
    'Specialized rotor bore sonic inspection (immersion UT) requiring shop visit — typical $400,000-1,200,000 per rotor',
  ],
  vendorSelection:
    "For US power generation work, the table-stakes are ASNT SNT-TC-1A or CP-189 written practice, jurisdictional inspector commissioning where state-required (NBIC NIA at minimum for the engineering oversight role), and demonstrable procedure qualification on the specific code class and pipe size of the work scope. For high-energy piping (P91, T22, T91, T92), ask for PAUT/TOFD procedure qualifications on a P91 demonstration block matching the production weld; reject vendors who try to use generic carbon-steel procedures. For HRSG and combined-cycle work, ask for borescope crews with documented experience on the specific HRSG OEM (NEM, Vogt, Nooter Eriksen, CMI). For steam turbine and generator rotor bore inspection, only a handful of vendors globally maintain calibrated immersion UT systems — pre-qualify the vendor through the OEM major-maintenance group. NDT Connect lists outage-capable vendors filtered by code-class qualification, jurisdictional coverage, and recent outage references.",
  faqs: [
    {
      q: 'How often must a power boiler be inspected under NBIC?',
      a: "NBIC NB-23 Part 2 §2.2 and individual state jurisdictional rules typically require an annual external inspection by a Commissioned Inspector while in operation, plus a biennial internal inspection (or annually for higher-risk service) with the boiler out of service and prepared for entry. High-pressure power boilers above 15 psig steam are subject to the stricter intervals; some states (Texas, Pennsylvania, Ohio) recognize risk-based inspection extensions backed by an engineering assessment and approved by the chief inspector. NDT performed during internal inspection typically includes visual examination of all internal surfaces, UT thickness on accessible tubes, and MT/PT on suspect drum welds or tube butt welds.[4][5]",
    },
    {
      q: 'What is Type IV cracking in P91/Grade 91 piping and why is it a problem?',
      a: "P91 (ASME SA-335 Grade 91, a 9Cr-1Mo-V-Nb ferritic-martensitic creep-strength-enhanced steel) was widely adopted in supercritical and ultra-supercritical power plants in the 1990s-2010s for hot reheat, main steam, and superheater outlet piping. The 'Type IV' designation refers to creep-cavitation cracking that develops in the fine-grained outer heat-affected zone of girth welds, where the post-weld heat treatment produces a weaker microstructure than either the parent or weld metal. Cracking is intergranular and grows slowly under sustained tensile stress at temperature, typically becoming detectable after 100,000+ service hours. EPRI guidelines recommend PAUT/TOFD inspection at major outages plus replication metallography at vulnerable HAZ locations.[7]",
    },
    {
      q: 'What inspections does a combined-cycle HRSG require during major outage?',
      a: "Major outage inspection scope on a typical 2x1 combined-cycle HRSG includes: borescope visual of all evaporator, superheater, and economizer tube banks (rows accessible from drum and downcomers); UT wall thickness on susceptible tubes at fireside-corrosion-prone locations; PAUT/TOFD on hot-side header girth welds and attemperator sections; PT/MT on header attachment welds and on attemperator internals; tube bundle eddy current or IRIS in selected modules; drum internal visual with PT/MT on susceptible drum-to-downcomer welds. EPRI guidelines specifically address HRSG inspection planning under cycling duty.[8]",
    },
    {
      q: 'What is the role of EPRI in power plant NDT specification?',
      a: "EPRI (the Electric Power Research Institute, an industry-funded research organization headquartered in Palo Alto, CA, and Charlotte, NC) maintains the most comprehensive applied-research library on power plant materials and NDT. EPRI guidelines (e.g., HRSG Tube Failure Manual, P91/T91 Inspection Guidelines, Boiler Tube Failure Manual, Generator Retaining Ring Inspection Guideline) are not formal code documents but are widely adopted by operators as the technical basis for ASME/NBIC code-required inspections. Most major utilities reference EPRI guidelines in their internal inspection procedures, and contractors quoting outage work are expected to be familiar with the relevant EPRI documents.[1][6]",
    },
    {
      q: 'How does a steam turbine rotor bore sonic inspection work?',
      a: "Rotor bore sonic inspection is an immersion ultrasonic technique performed in a shop environment during a major turbine overhaul (typically every 100,000 operating hours or 25-30 calendar years for legacy fleets). The rotor is supported horizontally in calibrated rolls, a sealed water-filled chamber is built around the bore, and a rotating axial-and-shear-wave transducer assembly scans the bore length while recording C-scan and A-scan data. Detection sensitivity targets sub-surface flaws as small as 1.5-3 mm depending on the OEM's acceptance methodology. ASME Section V Article 23 governs the general UT technique; OEM-specific procedures govern acceptance. Engineering critical assessment under BS 7910 or the OEM's proprietary ECA methodology turns detected indications into a remaining-life decision.[9]",
    },
  ],
  internalLinks: [
    {
      href: '/ndt-methods/ultrasonic-testing',
      label: 'Ultrasonic Testing (UT)',
      context: 'UT wall thickness is the backbone of power boiler tube and high-energy piping inspection.',
    },
    {
      href: '/ndt-methods/phased-array-ultrasonic-testing',
      label: 'Phased Array Ultrasonic Testing (PAUT)',
      context: 'PAUT replaces RT on high-energy piping girth welds under ASME PCC-2 and B31.1.',
    },
    {
      href: '/standards/asme-section-v',
      label: 'ASME Section V Nondestructive Examination',
      context: 'ASME Section V is the build-and-repair NDT methodology backbone for power plant work.',
    },
    {
      href: '/standards/asme-section-i',
      label: 'ASME Section I Power Boilers',
      context: 'ASME Section I governs construction of power boilers operating above 15 psig steam.',
    },
    {
      href: '/industries/nuclear',
      label: 'Nuclear Power NDT',
      context: 'Nuclear plant inspection layers ASME Section XI on top of the fossil/combined-cycle framework.',
    },
    {
      href: '/industries/oil-and-gas',
      label: 'Oil and Gas NDT',
      context: 'Many power generation NDT vendors cross-qualify into refinery turnaround scopes.',
    },
    {
      href: '/free-tools/ndt-cost-calculator',
      label: 'NDT Cost Calculator',
      context: 'Estimate an outage NDT scope budget against unit size and inspection intensity.',
    },
    {
      href: '/free-tools/calibration-reminder',
      label: 'Calibration Reminder',
      context: 'Track UT, PAUT, and MT equipment calibration intervals across an outage crew.',
    },
  ],
  citations: [
    {
      id: 'epri-bt',
      source: 'EPRI, Boiler Tube Failures: Theory and Practice, 3 vols., Electric Power Research Institute, 2007',
      url: 'https://www.epri.com/',
    },
    {
      id: 'asme-bpvc-i',
      source: 'ASME Boiler and Pressure Vessel Code, Section I: Rules for Construction of Power Boilers, 2023 ed.',
    },
    {
      id: 'asme-b31-1',
      source: 'ASME B31.1, Power Piping, 2022 ed.',
    },
    {
      id: 'nbic-nb23',
      source: 'National Board Inspection Code (NBIC) NB-23, Part 2: Inspection, 2023 ed.',
    },
    {
      id: 'asme-pcc-2',
      source: 'ASME PCC-2, Repair of Pressure Equipment and Piping, 2022 ed.',
    },
    {
      id: 'epri-p91',
      source: 'EPRI, Guidelines and Specifications for High-Reliability Fossil Power Plants — Best Practice Guideline for Manufacturing and Construction of Grade 91 Steel Components, 2014',
    },
    {
      id: 'epri-hrsg',
      source: 'EPRI, Heat Recovery Steam Generator (HRSG) Tube Failure Manual, 2nd ed., 2016',
    },
    {
      id: 'asme-v-23',
      source: 'ASME BPVC Section V, Article 23: Ultrasonic Standards, 2023 ed.',
    },
    {
      id: 'epri-retaining',
      source: 'EPRI, Generator Retaining Ring Inspection Guidelines, 1014342, 2007',
    },
    {
      id: 'astm-e1351',
      source: 'ASTM E1351-22, Standard Practice for Production and Evaluation of Field Metallographic Replicas',
    },
  ],
};

export default industry;
