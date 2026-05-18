// lib/seo/industry-page-data.ts
//
// Canonical industry definitions for /ndt-services/[city]/[industry] pages.
// Each entry defines a URL slug, display label, matching keywords (against
// the raw industry names in data/cities.json), and rich content blocks used
// by the city-industry content generator.

export interface IndustryPageDef {
  slug: string;
  label: string;
  /** Subtitle used in H1: "NDT Inspection Services for [subtitle] in [City]" */
  subtitle: string;
  /** Keywords substring-matched (case-insensitive) against RichIndustry.name */
  keywords: string[];
  /** Primary NDT methods used in this industry (with standards) */
  methods: { code: string; name: string; why: string }[];
  /** Regulatory bodies and code standards governing NDT in this industry */
  codes: string[];
  /** Key certifications that employers in this industry typically require */
  certifications: string[];
  /** Common inspection targets / asset classes */
  assetClasses: string[];
  /** Industry-specific defect concerns */
  defectConcerns: string[];
  /** Typical job description — what a crew is doing on site */
  typicalScope: string;
  /** Two FAQ pairs unique to this industry */
  faqs: { q: string; a: string }[];
  /** Schema.org industry type for structured data */
  schemaIndustry: string;
}

export const INDUSTRY_PAGE_DATA: Record<string, IndustryPageDef> = {
  'nuclear': {
    slug: 'nuclear',
    label: 'Nuclear',
    subtitle: 'Nuclear Power & Fuel',
    keywords: ['nuclear'],
    methods: [
      { code: 'UT', name: 'Ultrasonic Testing', why: 'ASME Section XI ISI programs for reactor pressure boundary components, piping, and vessel nozzles' },
      { code: 'ET', name: 'Eddy Current Testing', why: 'Steam generator tube inspection (ECT/RFT) detecting wall thinning, pitting, and primary-side cracking' },
      { code: 'RT', name: 'Radiographic Testing', why: 'New fuel-cycle fabrication welds and specialty weld repairs on Class 1 pressure boundary components' },
      { code: 'MT/PT', name: 'MT and PT', why: 'Surface examination of Class 1 and Class 2 components per ASME Section XI IWA-2200' },
      { code: 'VT', name: 'Visual Testing', why: 'Containment liner, spent fuel pool liner, and structural examinations' },
    ],
    codes: [
      'ASME Section XI — Nuclear ISI',
      'ASME Section V — NDE methods and procedures',
      'ASME Section III — Nuclear component construction',
      '10 CFR 50 Appendix B — Quality assurance',
      'NRC Regulatory Guide 1.147 (ISI alternative exams)',
      'EPRI NDE topical reports for qualified procedures',
      'IAEA Safety Standard NS-G-2.6',
    ],
    certifications: [
      'ASNT SNT-TC-1A Level II/III (site-specific qualification)',
      'NAS 410 / EN 9712 for ASME nuclear endorsement',
      'PDI-qualified procedures (Performance Demonstration Initiative)',
      'ACCP (American Certification Program) nuclear supplement',
      '10 CFR 50 Appendix B qualified QA inspector',
    ],
    assetClasses: [
      'Reactor pressure vessel (RPV) and head', 'Primary coolant piping',
      'Steam generator tubes', 'Pressurizer heater sleeves',
      'Containment liner and penetrations', 'Spent fuel pool liner',
      'Class 1/2/3 piping welds', 'Reactor coolant pumps',
    ],
    defectConcerns: [
      'Primary water stress corrosion cracking (PWSCC)',
      'Intergranular attack (IGA) in steam generator crevice zones',
      'Thermal fatigue in reactor coolant system nozzles',
      'Radiation embrittlement in RPV beltline',
      'Flow-accelerated corrosion (FAC) in secondary system',
    ],
    typicalScope: 'Outage-driven ISI crews of 8–24 personnel execute pre-defined examination coverage intervals per ASME Section XI. Work is performed under licensed-plant QA programs: procedures are NRC-approved, personnel are PDI-qualified or site-procedure-qualified, and all data is retained for the plant license period.',
    faqs: [
      { q: 'Do nuclear NDT inspectors need special licensing beyond ASNT?', a: 'Yes. Nuclear plants require site-specific qualification under their 10 CFR 50 Appendix B QA program. Inspectors must use plant-approved procedures, demonstrate proficiency under ASME Section XI Appendix VII/VIII requirements, and — for the most safety-significant examinations — complete PDI performance demonstrations for the specific flaw type, material, and geometry.' },
      { q: 'How does NDT Connect help with nuclear plant outage staffing?', a: 'We connect plant owners and Tier-1 outage contractors with PDI-qualified UT, ET, RT, and VT specialists who are pre-vetted for outage travel availability, radiation worker qualifications, and ASME nuclear endorsements. Post a job scope and receive quotations from vetted nuclear NDT firms within hours.' },
    ],
    schemaIndustry: 'Nuclear Power Generation',
  },

  'lng': {
    slug: 'lng',
    label: 'LNG',
    subtitle: 'LNG & Gas Processing',
    keywords: ['lng', 'liquefied natural gas'],
    methods: [
      { code: 'RT', name: 'Radiographic Testing', why: 'Cryogenic weld qualification on 9% nickel and stainless steel per ASME B31.3 and BS EN 13480 (-196°C service)' },
      { code: 'PAUT', name: 'Phased Array UT', why: 'Full-volume weld examination on LNG storage tank annular plates and shell courses where film RT is impractical' },
      { code: 'PT', name: 'Liquid Penetrant Testing', why: 'Austenitic and duplex stainless surface examination per ASME Section V Article 6' },
      { code: 'PMI', name: 'Positive Material Identification', why: 'Cryogenic alloy verification — 9% nickel steel vs. standard carbon steel has zero margin for mix-up' },
      { code: 'Helium Leak', name: 'Helium Leak Testing', why: 'Inner tank tightness confirmation before cooldown; prevents catastrophic liquefaction of ambient gases' },
    ],
    codes: [
      'ASME B31.3 — Process piping for cryogenic service',
      'NFPA 59A — LNG production, storage, and handling',
      'EN 14620 / BS 7777 — Full-containment LNG tanks',
      'API 625 — Tank systems for refrigerated liquefied gas storage',
      'FERC regulations (US LNG export terminals)',
      'IMO IGC Code (LNG marine vessels)',
      'PHMSA 49 CFR Part 193 (onshore LNG facilities)',
    ],
    certifications: [
      'ASNT Level II/III UT, RT, PT',
      'AWS CWI for weld acceptance records',
      'Cryogenic piping procedure qualification (ASME IX)',
      'PMI technician qualification (alloy verification)',
    ],
    assetClasses: [
      'Full-containment LNG storage tanks', 'Liquefaction heat exchangers (MCHE)',
      'Cryogenic transfer piping (-196°C)', 'LNG loading arms and marine hoses',
      'Vaporizers and cold box equipment', 'Boil-off gas compressors',
      'Flare system welds', 'LNG carrier cargo containment',
    ],
    defectConcerns: [
      'Weld porosity in 9% nickel steel (high sensitivity to hydrogen)',
      'Lack of fusion in austenitic stainless — invisible to VT',
      'Alloy mix-up (carbon steel in cryogenic service = brittle fracture)',
      'Inner tank floor crack under thermal cycling',
      'Sensitization cracking in heat-affected zones of 304/316 SS',
    ],
    typicalScope: 'LNG projects require both construction phase (new weld qualification, PMI, helium leak testing of cryogenic piping) and operational inspection (API 625 tank floor and annular plate surveys, CUI survey on cold-box insulation, PAUT on thick-wall transfer lines). Turnaround windows are narrow — typically 2–4 weeks — requiring large, coordinated crews.',
    faqs: [
      { q: 'Why is PMI especially critical for LNG piping?', a: 'Cryogenic service (-196°C for LNG) demands alloys with guaranteed ductility at low temperature — typically 9% nickel steel or austenitic stainless steel. Carbon steel becomes brittle below about -45°C. A PMI error that allows a carbon-steel spool into cryogenic service risks catastrophic brittle fracture. Every weld heat and every component must be verified by XRF or OES before installation.' },
      { q: 'What NDT coverage is required for an LNG storage tank?', a: 'API 625 and EN 14620 require radiographic or PAUT examination of all full-penetration butt welds in the inner tank shell and bottom annular plates (typically 100% RT). Floor plate welds use vacuum-box leak testing. Outer concrete or steel tank uses VT plus structural inspection. After initial hydrotesting, the helium leak test confirms inner tank tightness before first cooldown.' },
    ],
    schemaIndustry: 'LNG Processing and Storage',
  },

  'oil-gas': {
    slug: 'oil-gas',
    label: 'Oil & Gas',
    subtitle: 'Oil & Gas Exploration and Production',
    keywords: ['oil & gas', 'oil and gas', 'upstream', 'bakken', 'permian', 'eagle ford', 'barnett', 'haynesville', 'marcellus', 'uinta', 'niobrara', 'san juan', 'north sea', 'alaska north slope', 'oilfield', 'oil field', 'conventional e&p', 'oil sands', 'sagd', 'taps pipeline', 'offshore oil', 'floating production'],
    methods: [
      { code: 'UT', name: 'Ultrasonic Testing', why: 'Wall-thickness measurement on production vessels, separators, and wellhead spools per API 510 and ASME Section VIII' },
      { code: 'PAUT', name: 'Phased Array UT', why: 'High-productivity weld inspection on pressure vessels and critical piping; replaces film RT in H₂S-sour environments where radiation permits are costly' },
      { code: 'MT', name: 'Magnetic Particle Testing', why: 'Surface and near-surface crack detection on wellhead components, BOP stacks, and production manifolds' },
      { code: 'GWT', name: 'Guided Wave Testing', why: 'Long-range screening of buried or insulated production flowlines and gathering systems to prioritize UT digs' },
      { code: 'PMI', name: 'Positive Material Identification', why: 'Verification of exotic alloys (duplex SS, 6Mo, Inconel) in sour-service applications where material mix-up is a life-safety issue' },
    ],
    codes: [
      'API 510 — Pressure Vessel Inspection Code',
      'API 570 — Piping Inspection Code',
      'API 653 — Tank Inspection, Repair, Alteration, Reconstruction',
      'ASME B31.3 — Process Piping',
      'ASME B31.8 — Gas Transmission and Distribution Piping',
      'NACE MR0175 / ISO 15156 — Sour service materials',
      'BSEE (US offshore) / HSE (North Sea) regulatory requirements',
    ],
    certifications: [
      'API 510 Pressure Vessel Inspector',
      'API 570 Piping Inspector',
      'API 653 Aboveground Storage Tank Inspector',
      'ASNT Level II/III UT, RT, MT, PT',
      'NACE Corrosion Technologist (for FFS assessments)',
    ],
    assetClasses: [
      'Production separators and free water knockouts', 'Wellhead and Christmas tree assemblies',
      'BOP stacks and choke manifolds', 'Gas compression skids',
      'Storage tanks and produced water vessels', 'Subsea trees and manifolds',
      'Flowlines and gathering system piping', 'Offshore platform topsides',
    ],
    defectConcerns: [
      'CO₂ corrosion (sweet-service pitting and mesa attack)',
      'H₂S-induced sulfide stress cracking (SSC)',
      'Hydrogen-induced cracking (HIC) in plate steels',
      'Erosion in choke and manifold components under high-velocity flow',
      'External corrosion under insulation (CUI) on topside piping',
    ],
    typicalScope: 'Upstream NDT ranges from well-site equipment verification (PMI, hardness on wellhead and BOP components) to production facility inspection (API 510/570 internal/external surveys, tank floor MFL, corrosion mapping on separators). Offshore campaigns are weather-window driven and require personnel with offshore safety certification (BOSIET/HUET).',
    faqs: [
      { q: 'What NDT methods are used for sour-service (H₂S) equipment?', a: 'Sour-service environments demand extra scrutiny for sulfide stress cracking (SSC) and hydrogen-induced cracking (HIC). In addition to standard UT thickness surveys, inspectors run PWHT verification (hardness testing per NACE MR0175), wet fluorescent MT on weld heat-affected zones, and PAUT on heavy-wall vessels where RT film handling is impractical. Step-wise cracking in plate is detected by shear-wave UT or TOFD.' },
      { q: 'How often does upstream production equipment require NDT inspection?', a: 'API 510 sets maximum intervals of 10 years (internal) and 5 years (external) for pressure vessels, but corrosion-based RBI (Risk-Based Inspection per API 580/581) typically shortens this to 2–4 years for high-corrosion streams. GWT screening of buried flowlines is usually annual; tank floors under API 653 are inspected every 10 years or at calculated corrosion-rate intervals.' },
    ],
    schemaIndustry: 'Oil and Gas Exploration and Production',
  },

  'refining': {
    slug: 'refining',
    label: 'Refining',
    subtitle: 'Petroleum Refining',
    keywords: ['refin', 'crude oil processing'],
    methods: [
      { code: 'UT/PAUT', name: 'Ultrasonic and Phased Array UT', why: 'Corrosion mapping on distillation towers, reactors, and fired heaters; PAUT for high-temperature hydrogen attack (HTHA) assessment' },
      { code: 'RT', name: 'Radiographic Testing', why: 'In-service weld repairs on pressure vessels and heat exchangers per ASME VIII and API 510 fitness-for-service evaluation' },
      { code: 'MT/PT', name: 'MT and PT', why: 'Surface crack detection on reactor internal components, catalyst tube hangers, and fired-heater tubes' },
      { code: 'MFL', name: 'Magnetic Flux Leakage', why: 'Aboveground storage tank floor scanning per API 653 — detects pitting before tank-floor failure and costly product release' },
      { code: 'AUT', name: 'Automated UT / TOFD', why: 'Full-volume weld inspection on coker drum weld seams and reactor nozzle-to-shell joints without hot-work permits' },
    ],
    codes: [
      'API 510 — Pressure Vessel Inspection Code (refinery vessels)',
      'API 570 — Piping Inspection Code (process piping circuits)',
      'API 653 — Aboveground Storage Tank inspection',
      'API 579-1 / ASME FFS-1 — Fitness-for-Service',
      'API 571 — Damage mechanisms in refining industry',
      'ASME B31.3 — Process Piping (new construction)',
      'NFPA 652 / OSHA PSM (29 CFR 1910.119) — Process Safety',
    ],
    certifications: [
      'API 510 Pressure Vessel Inspector',
      'API 570 Piping Inspector',
      'API 653 Aboveground Storage Tank Inspector',
      'ASNT Level II/III UT, RT, MT, PT',
      'AWS CWI (Certified Welding Inspector) for weld acceptance',
      'API 580 / 581 Risk-Based Inspection Specialist',
    ],
    assetClasses: [
      'Crude distillation units (CDU)', 'Hydrocracker and hydrotreater reactors',
      'Fluidized catalytic cracker (FCC) main column', 'Fired heaters and reformer tubes',
      'Coker drums', 'Amine contactors and sour-water strippers',
      'Atmospheric and floating-roof storage tanks', 'Cooler and heat exchanger bundles',
    ],
    defectConcerns: [
      'Sulfidation corrosion (above 260°C, API 571 DM#34)',
      'High-temperature hydrogen attack (HTHA, API 941 / Nelson curves)',
      'Naphthenic acid corrosion (above 220°C, high TAN crude)',
      'Corrosion under insulation (CUI, -12°C to +175°C range)',
      'Amine-induced cracking (ASCC) in lean/rich amine systems',
      'Coker drum bulging and fatigue cracking from thermal cycling',
    ],
    typicalScope: 'Turnaround (TAR) campaigns are the dominant refinery NDT event — typically 2–6 weeks every 4–6 years, requiring 30–120 NDT technicians on site simultaneously. Between TARs, running-plant inspection covers API 570 piping circuit thickness programs, tank floor MFL surveys, and pressure-relief valve inspection coordination.',
    faqs: [
      { q: 'What is HTHA and why does it require specialized UT?', a: 'High-Temperature Hydrogen Attack (HTHA) occurs when atomic hydrogen reacts with carbon in steel above ~200°C, forming methane bubbles that cause irreversible decarburization and fissuring. Conventional UT misses early-stage HTHA because the fissures are sub-millimeter and randomly oriented. Specialized techniques — Velocity Ratio Measurement (VRM) or Backscatter TOFD — detect the micro-damage before macrocracking. API 941 Nelson curves define the safe operating limit; ASME FFS-1 Part 12 provides fitness-for-service assessment.' },
      { q: 'How does NDT Connect staff a refinery turnaround?', a: 'Post your TAR scope (unit list, estimated vessel/piping count, required certifications, proposed start date) on NDT Connect. Within hours, qualified NDT contractors respond with crew proposals including Level II/III certifications, API inspector credentials, and equipment lists. Our verification layer confirms ASNT certificates are current before you engage, eliminating the manual credential-chasing that typically consumes 2–4 weeks before every TAR.' },
    ],
    schemaIndustry: 'Petroleum Refining',
  },

  'petrochemical': {
    slug: 'petrochemical',
    label: 'Petrochemical',
    subtitle: 'Petrochemical & Chemical Processing',
    keywords: ['petrochem', 'petrochemical', 'chemical valley', 'chemical', 'chemicals', 'polymer', 'plastics', 'pharma', 'pharmaceutical', 'agro'],
    methods: [
      { code: 'UT', name: 'Ultrasonic Testing', why: 'Corrosion mapping on ethylene crackers, reactors, and heat exchangers; acoustic emission monitoring during hydrotest' },
      { code: 'RT', name: 'Radiographic Testing', why: 'Construction and repair weld examination on high-pressure process piping and reactor vessels per ASME B31.3 and API 510' },
      { code: 'PT', name: 'Liquid Penetrant Testing', why: 'Surface-crack detection on austenitic stainless and duplex SS equipment in chloride-rich environments' },
      { code: 'AE', name: 'Acoustic Emission', why: 'Online monitoring of pressure vessels and storage spheres for growing crack activity — avoids costly shutdown for periodic UT' },
      { code: 'TOFD', name: 'TOFD', why: 'Accurate height sizing of planar flaws in thick-wall reactor nozzles and wye fittings for fitness-for-service assessment' },
    ],
    codes: [
      'ASME B31.3 — Chemical Plant and Petroleum Refinery Piping',
      'API 510 — Pressure Vessel Inspection Code',
      'API 570 — Piping Inspection Code',
      'API 579-1 / ASME FFS-1 — Fitness-for-Service',
      'NFPA 652 — Combustible Dust',
      'EPA RMP (40 CFR Part 68) — Risk Management Program',
      'OSHA PSM (29 CFR 1910.119) — Process Safety Management',
    ],
    certifications: [
      'API 510 Pressure Vessel Inspector',
      'API 570 Piping Inspector',
      'ASNT Level II/III UT, RT, PT, AE',
      'AWS CWI for new-construction acceptance',
      'API 580 / 581 Risk-Based Inspection',
    ],
    assetClasses: [
      'Ethylene cracker furnaces and quench towers', 'High-pressure reactors (polyethylene, polypropylene)',
      'Distillation columns and absorbers', 'Heat exchangers (shell-and-tube, plate)',
      'Chlorinated solvent storage vessels', 'Cryogenic ethylene storage',
      'Pressure relief systems', 'Piping circuits at high P/T conditions',
    ],
    defectConcerns: [
      'Chloride stress corrosion cracking (Cl-SCC) in 304/316 SS',
      'Carbonate cracking in amine and CO₂ service',
      'Erosion-corrosion in catalyst slurry lines',
      'External chloride attack on austenitic insulated piping',
      'Hydrogen blistering in sulfuric acid alkylation units',
    ],
    typicalScope: 'Petrochemical NDT follows similar TAR cycles to refining (3–5 year intervals), but construction inspection is equally significant — new grassroots complexes (ethane crackers, PDH units) involve thousands of ASME B31.3 weld joints requiring 100% RT or PAUT, plus hydrostatic or pneumatic testing of completed systems.',
    faqs: [
      { q: 'What is the difference between API 510 and ASME B31.3 inspection?', a: 'API 510 applies to in-service pressure vessels — it sets intervals for internal and external inspection, governs repair/alteration authorization, and includes fitness-for-service evaluation. ASME B31.3 applies to construction of process piping — it defines weld examination percentages (normal fluid service = 5% RT, Category M = 100% RT), acceptance criteria, and hydrostatic test requirements. A petrochemical plant uses both: B31.3 during construction, API 510/570 once the plant is commissioned and running.' },
      { q: 'Can acoustic emission monitoring replace periodic UT on pressure vessels?', a: 'AE can supplement but not fully replace UT. AE detects growing discontinuities in real time, which is valuable for on-stream monitoring between turnarounds. However, AE cannot size flaws precisely or map corrosion — it only indicates that something is growing. API 510 still requires periodic UT thickness measurements at defined intervals. The combination (AE for continuous watch, UT for interval sizing) is optimal and is recognized in API 510 RBI programs as a basis for extending inspection intervals.' },
    ],
    schemaIndustry: 'Petrochemical Processing',
  },

  'pipeline': {
    slug: 'pipeline',
    label: 'Pipeline',
    subtitle: 'Pipeline & Midstream Infrastructure',
    keywords: ['pipeline', 'midstream', 'gathering', 'transmission line', 'pipeline terminal', 'pipeline & lng', 'pipeline operations', 'pipeline services'],
    methods: [
      { code: 'GWT', name: 'Guided Wave Testing', why: 'Long-range screening of buried and insulated transmission lines — one test station inspects 50–100 m bi-directionally, directing expensive excavation only where anomalies are found' },
      { code: 'MFL ILI', name: 'Magnetic Flux Leakage (In-Line Inspection)', why: 'Smart-pig inspection of liquid and gas transmission pipelines per PHMSA Integrity Management rules; detects metal loss, dents, and seam weld anomalies' },
      { code: 'PAUT', name: 'Phased Array UT', why: 'Girth weld examination during pipeline construction — replaces film RT on many projects for faster cycling and digital records' },
      { code: 'DCVG/ACVG', name: 'Coating Survey (DCVG)', why: 'Close-interval survey and Direct Current Voltage Gradient testing to locate coating holidays before soil-side corrosion advances' },
      { code: 'UT', name: 'Ultrasonic Testing', why: 'Corrosion mapping at excavated anomaly sites after ILI signals; confirms wall thickness and repair-or-continue decisions under ASME B31G' },
    ],
    codes: [
      'PHMSA 49 CFR Part 192 — Gas Transmission Pipelines',
      'PHMSA 49 CFR Part 195 — Hazardous Liquid Pipelines',
      'ASME B31.8 — Gas Transmission and Distribution Piping',
      'ASME B31.4 — Liquid Transportation Systems',
      'ASME B31G — Manual for Determining Remaining Strength',
      'API 1163 — ILI Systems Qualification',
      'API 1160 / 1175 — Integrity Management for hazardous liquid / gas pipelines',
    ],
    certifications: [
      'ASNT Level II/III UT, RT, MT',
      'PHMSA-qualified ILI operator certification',
      'API 570 Piping Inspector (cross-over to pipeline segments)',
      'AWS CWI for new construction girth welds',
      'NACE Cathodic Protection Specialist (coating / CP programs)',
    ],
    assetClasses: [
      'Transmission mainline girth welds', 'Compressor station piping and vessels',
      'Pump station headers and manifolds', 'Pig trap and launcher assemblies',
      'River and road crossing sections (HDD)',
      'Above-ground valve assemblies and flanges',
      'Tank farm interconnecting piping',
    ],
    defectConcerns: [
      'External corrosion under disbonded coating (CEOD)',
      'Stress corrosion cracking (SCC) near pump/compressor stations',
      'Seam weld anomalies (selective seam corrosion, hook cracks)',
      'Mechanical damage from third-party excavation',
      'Internal corrosion from wet CO₂ or O₂ contamination',
    ],
    typicalScope: 'Pipeline integrity inspection spans inline inspection (ILI smart-pig runs scheduled per PHMSA Integrity Management plans), direct assessment excavations (sites flagged by ILI or DCVG), and new-construction girth weld inspection (PAUT or RT for each joint). Emergency response digs following anomaly signals or reportable incidents require 24/7 rapid-response NDT crews.',
    faqs: [
      { q: 'What is the difference between ILI (smart pig) and PAUT for pipeline welds?', a: 'ILI tools travel inside an operating pipeline to inspect the full length of pipe for metal loss, dents, and seam anomalies — they cover hundreds of miles in a single run but cannot see through the soil-to-pipe interface clearly for small pitting. PAUT is used externally at specific excavation sites — either for new-construction girth-weld inspection during installation or at ILI-flagged anomaly sites where direct examination is required. They are complementary: ILI scans the whole line, PAUT confirms and sizes specific indications.' },
      { q: 'When does PHMSA require pipeline NDT?', a: 'PHMSA 49 CFR 192 (gas) and 195 (liquid) require Integrity Management Plans for pipelines in High Consequence Areas (HCAs). These plans specify ILI at intervals based on pipe age, material, and operating conditions (typically 5–7 years). Anomaly excavations triggered by ILI require UT to confirm dimensions and a remaining-strength calculation per ASME B31G or RSTRENG before a repair-or-continue decision.' },
    ],
    schemaIndustry: 'Pipeline Transportation',
  },

  'aerospace': {
    slug: 'aerospace',
    label: 'Aerospace',
    subtitle: 'Aerospace & Aviation',
    keywords: ['aerospace', 'aviation', 'mro', 'space launch', 'space coast', 'aircraft', 'avionics', 'helicopter', 'composites & aerospace', 'aerospace engines', 'naval aviation'],
    methods: [
      { code: 'FPI', name: 'Fluorescent Penetrant Inspection', why: 'Primary surface-flaw method for aluminum and titanium structure per NAS 410 / AMS 2647; detects fatigue cracks, porosity in castings, and surface laps' },
      { code: 'ECT', name: 'Eddy Current Testing', why: 'High-sensitivity crack detection in multilayer aluminum lap joints, bore holes, and fastener sites without disassembly; used in MRO on airframe structure' },
      { code: 'PAUT', name: 'Phased Array UT', why: 'Composite structure delamination and disbond detection in CFRP/GFRP panels, spars, and fan blades per ASTM E2580' },
      { code: 'X-Ray / CT', name: 'Radiographic and CT Inspection', why: 'Aerospace casting acceptance per ASTM E505/E192; micro-CT for additive-manufactured turbine components per AMS 7000 series' },
      { code: 'BN', name: 'Barkhausen Noise', why: 'Post-grind burn detection on gear teeth, turbine disc slots, and bearing races — detects re-tempering or localized hardness loss invisible to MT or PT' },
    ],
    codes: [
      'NAS 410 — Certification and Qualification of NDT Personnel',
      'AS9100 — Quality Management Systems for Aviation, Space, Defense',
      'FAA AC 43.13-1B — Aircraft Inspection, Repair & Alterations',
      'MIL-HDBK-6870 — Inspection Program Requirements (military)',
      'AMS 2647 — Fluorescent Penetrant Inspection',
      'ASTM E1444 / E2632 — Magnetic Particle for aerospace parts',
      'EASA Part 145 (European MRO approvals)',
    ],
    certifications: [
      'NAS 410 Level II/III (required for aerospace NDT in the US)',
      'FAA Airframe & Powerplant (A&P) for MRO technicians',
      'EASA Part 66 Category B for European approvals',
      'AS9100 internal auditor',
      'Specific OEM approvals (Boeing D6-51991, Airbus AITM)',
    ],
    assetClasses: [
      'Airframe fuselage panels and skin', 'Landing gear and actuators',
      'Turbine discs, blades, and vanes', 'Composite fan blades and nacelles',
      'Wing spars and ribs', 'Fastener holes and bore sites',
      'Thrust reverser assemblies', 'Engine mounts and pylons',
    ],
    defectConcerns: [
      'Fatigue cracking at fastener holes in aluminum structure',
      'Disbond or delamination in CFRP sandwich panels',
      'Grinding burns on gear and bearing surfaces',
      'Casting porosity in titanium compressor blades',
      'Hidden corrosion in multi-layer aluminum lap joints',
      'Fretting wear on engine disc contact faces',
    ],
    typicalScope: 'Aerospace NDT spans OEM production (100% FPI/RT on castings and forgings, final assembly sampling) and MRO (line maintenance daily checks, heavy checks A through D on airframes, engine overhaul NDT). Production is NAS 410-driven with OEM customer-specific qualifications; MRO follows FAA-approved maintenance manuals and SB/SIL requirements.',
    faqs: [
      { q: 'What is the difference between NAS 410 and ASNT SNT-TC-1A for aerospace NDT?', a: 'NAS 410 (now equivalent to EN 9712) is the aerospace-specific personnel certification standard — it defines training hours, examination requirements, and renewal intervals specific to aviation, space, and defense applications. ASNT SNT-TC-1A is a general NDT standard used across industries; it allows more employer discretion in qualification. Most aerospace OEMs and primes require NAS 410 certification; a SNT-TC-1A card alone is typically insufficient for aerospace production NDT.' },
      { q: 'Does NDT Connect cover aerospace NDT contractors?', a: 'Yes — NDT Connect lists NAS 410-certified inspection firms covering FPI, ECT, PAUT on composites, and radiographic inspection. When posting an aerospace NDT job, specify the applicable standard (NAS 410, MIL-HDBK-6870, FAA AC 43.13-1B) and any OEM-specific approvals (Boeing, Airbus, Pratt & Whitney, GE Aerospace). Responding contractors include their qualification records so you can verify compliance before mobilization.' },
    ],
    schemaIndustry: 'Aerospace and Defense Manufacturing',
  },

  'power-generation': {
    slug: 'power-generation',
    label: 'Power Generation',
    subtitle: 'Power Generation & Utilities',
    keywords: ['power generation', 'power &', 'coal power', 'coal & power', 'steam generation', 'wind', 'renewabl', 'power plant', 'utility', 'electric', 'offshore wind'],
    methods: [
      { code: 'UT', name: 'Ultrasonic Testing', why: 'Creep and fatigue damage assessment in steam headers, main steam piping, and reheat lines at elevated temperature per ASME TRD 301 and NB-23' },
      { code: 'RT', name: 'Radiographic Testing', why: 'Boiler tube weld acceptance (ASME Section I) and high-energy piping weld repair verification during plant outages' },
      { code: 'MT/PT', name: 'MT and PT', why: 'Surface crack detection on turbine blades, discs, rotors, and generator end-rings per OEM inspection manuals and IEEE C57 for generator components' },
      { code: 'ET', name: 'Eddy Current Testing', why: 'Condenser and feedwater heater tube inspection — detects wall thinning, pitting, and crevice corrosion in service water and steam condenser systems' },
      { code: 'ACFM', name: 'Alternating Current Field Measurement', why: 'Crack depth sizing in turbine disc keyways and rotor bores without removal of surface coatings or paint' },
    ],
    codes: [
      'ASME Section I — Power Boilers (new construction)',
      'ASME Section V — NDE methods and procedures',
      'NB-23 / NBIC — National Board Inspection Code (in-service repair)',
      'ASME B31.1 — Power Piping',
      'EPRI maintenance guidelines for fossil and combined cycle plants',
      'NERC CIP (critical infrastructure protection for nuclear/large plants)',
      'IEC 60034 / IEEE C57 — Rotating machine inspection standards',
    ],
    certifications: [
      'ASNT Level II/III UT, RT, MT, ET',
      'National Board Commission (Authorized Inspector for boilers)',
      'AWS CWI for boiler tube and piping welds',
      'NACE Corrosion Specialist (steam-path corrosion assessment)',
      'Thermographer Level I/II (IRT on electrical systems)',
    ],
    assetClasses: [
      'Steam drums and superheater headers', 'Main steam and hot reheat piping',
      'High-energy piping welds (Class 1 and 2)', 'Turbine blades, discs, and rotor shafts',
      'Boiler tube bundles (waterwall, superheater, reheater)',
      'Condenser and feedwater heater tubes', 'Generator retaining rings',
      'Wind turbine tower welds, blade roots, and main shafts',
    ],
    defectConcerns: [
      'Creep damage in main steam piping (Class 1 piping >550°C)',
      'Fatigue cracking in turbine disc keyways and blade roots',
      'Flow-accelerated corrosion (FAC) in wet steam piping',
      'Fire-side corrosion of boiler tubes (coal ash attack)',
      'Stress corrosion cracking in generator retaining rings (Mn-steel)',
      'Wind turbine main shaft fatigue cracks at bearing fits',
    ],
    typicalScope: 'Power plant NDT is outage-driven — annual (A-inspection), 5–6 year major (C/D inspection). A-inspections cover high-energy piping walkdowns, boiler tube UT sampling, and turbine blade VT. Major outages include full turbine teardown (blade FPI/PT, disc UT, rotor UT), boiler pressure part inspection, generator inspection, and high-energy piping weld volumetric examination program.',
    faqs: [
      { q: 'What is creep damage and how is it detected in power plant piping?', a: 'Creep is time-dependent deformation and internal voiding that occurs in ferritic steels operating above ~450°C in high-pressure steam service. Early-stage creep voids (r-type, A/B on the Neubauer scale) are 10–100 µm and invisible to standard UT. Detection requires metallographic replication (surface carbon replica examined under microscope), specialized UT techniques (backscatter or TOFD with focused probes), or phased-array UT on weld heat-affected zones. EPRI guidance documents define inspection intervals based on material grade, temperature, and operating history.' },
      { q: 'Do wind turbines need NDT inspection?', a: 'Yes. Wind turbine towers require periodic weld inspection (MT/UT on tower can welds and flange welds), gearbox and main bearing inspections (VT, oil analysis, borescope), and blade inspection (PAUT for delamination in GFRP blades, drone-assisted VT for surface erosion and leading-edge damage). Main shafts are inspected for fatigue cracks at keyways and bearing-fit locations by UT or ACFM. Most OEM warranties and IEC 61400-22 certification require documented NDT programs.' },
    ],
    schemaIndustry: 'Electric Power Generation',
  },

  'marine': {
    slug: 'marine',
    label: 'Marine & Port',
    subtitle: 'Marine, Shipbuilding & Port Operations',
    keywords: ['marine', 'shipbuil', 'shipyard', 'ship repair', 'maritime', 'naval', 'naval shipbuild', 'navy shipbuild', 'port', 'cruise', 'offshore wind', 'subsea', 'floating production', 'submarine', 'vessel'],
    methods: [
      { code: 'UT', name: 'Ultrasonic Testing', why: 'Hull plate thickness measurement during dry-dock — detects corrosion wastage and pitting before classification society renewal survey' },
      { code: 'MT', name: 'Magnetic Particle Testing', why: 'Weld inspection on hull structure, deck plates, and transverse framing per class-society rules (ABS, DNV, Bureau Veritas, Lloyd\'s Register)' },
      { code: 'RT', name: 'Radiographic Testing', why: 'New construction pipe weld examination and repair weld acceptance on high-pressure systems (steam, hydraulic) per ASME B31.1/31.3' },
      { code: 'ACFM', name: 'Alternating Current Field Measurement', why: 'Inspection in the splash zone and above-waterline areas on offshore structures and ship hulls — works through coatings and surface contamination' },
      { code: 'VT', name: 'Visual Testing', why: 'Classification society annual surveys of hull interior, void spaces, ballast tanks, and cargo holds; dry-dock bottom surveys' },
    ],
    codes: [
      'ABS — Rules for Building and Classing Steel Vessels',
      'DNV — Rules for Ships (DNVGL-RU-SHIP)',
      'Bureau Veritas — Rules for the Classification of Steel Ships',
      'Lloyd\'s Register — Rules and Regulations for the Classification of Ships',
      'IMO SOLAS Chapter II-1 (structural requirements)',
      'NACE SP0108 — Corrosion control of offshore structures by protective coatings',
      'MIL-STD-2035 / MIL-STD-271 (US Navy NDT specifications)',
    ],
    certifications: [
      'ASNT Level II/III UT, RT, MT, PT',
      'PCN (CSWIP 3.4) or BINDT equivalent for marine UT',
      'Class-society-approved surveyor status (ABS, DNV, BV, LR)',
      'IRATA (rope access) for hull and splash-zone inspections',
      'IMCA C 022 (ROV-assisted underwater inspection qualifications)',
    ],
    assetClasses: [
      'Ship hull plating and framing', 'Deck plates and hatch covers',
      'Ballast tanks and void spaces', 'Main propulsion shafts and rudder stocks',
      'Offshore jacket legs and nodes', 'Crane pedestals and knuckle-boom welds',
      'Submarine pressure hull', 'Port crane and container handling structures',
    ],
    defectConcerns: [
      'General corrosion wastage of hull plate (class-allowable diminution)',
      'Pitting in ballast tanks and void spaces',
      'Fatigue cracking at hatch corners and deck cutouts',
      'Splash-zone corrosion on offshore jacket legs',
      'Stress corrosion cracking of propeller shafting in seawater',
      'Weld root defects in hull seam welds (lack of penetration)',
    ],
    typicalScope: 'Marine NDT concentrates on dry-dock surveys (every 2.5 years for Special Survey), where hull plating is UT-measured on a defined grid, all visible welds are VT examined, and any suspect areas receive MT or RT. Class-society renewal surveys require demonstrated NDT coverage meeting Rules. Newbuilding inspection covers 100% UT on hull welds and class-approved RT on piping and machinery welds.',
    faqs: [
      { q: 'Who authorizes NDT acceptance on a classed vessel?', a: 'The Classification Society surveyor (ABS, DNV, BV, LR, etc.) has the final authority on whether an NDT finding is acceptable under their Rules. In practice, the ship owner\'s NDT contractor performs the examination and presents data to the surveyor during the survey. For routine thickness gauging, approved firms can self-certify results against the class-defined allowable diminution tables. For weld repairs, the surveyor witnesses or accepts the NDT report before re-classing the work.' },
      { q: 'What is ACFM and why is it preferred in the splash zone?', a: 'Alternating Current Field Measurement (ACFM) is an electromagnetic technique that detects and sizes surface cracks through non-conductive coatings up to 10 mm thick without grinding. In the splash zone — the tidal region on a ship hull or offshore structure where marine growth, barnacles, and coating degradation make standard MT impractical — ACFM allows inspection without surface preparation. It measures both crack depth and length from the field perturbation pattern, providing ASME-compatible sizing data for fitness-for-service assessment.' },
    ],
    schemaIndustry: 'Marine Transportation and Shipbuilding',
  },

  'manufacturing': {
    slug: 'manufacturing',
    label: 'Manufacturing',
    subtitle: 'Heavy Manufacturing & Industrial Fabrication',
    keywords: ['manufactur', 'heavy engineering', 'fabricat', 'industrial manufactur', 'heavy manufactur', 'heavy equipment', 'machinery', 'caterpillar', 'agribusiness', 'agricultural', 'food processing', 'glass manufactur', 'pulp & paper'],
    methods: [
      { code: 'UT', name: 'Ultrasonic Testing', why: 'Weld quality verification and base-metal lamination detection on structural steel, pressure vessels, and heavy machinery castings per ASME Section V and AWS D1.1' },
      { code: 'MT', name: 'Magnetic Particle Testing', why: 'Surface and near-surface crack detection on forgings, castings, and structural welds — fastest volumetric surface method for ferromagnetic components' },
      { code: 'PT', name: 'Liquid Penetrant Testing', why: 'Crack detection on non-ferromagnetic alloys (aluminum, titanium, austenitic SS) in precision components, gear housings, and hydraulic manifolds' },
      { code: 'RT', name: 'Radiographic Testing', why: 'Casting acceptance per ASTM E446 / E186 / E280; process-pipe weld acceptance per ASME B31.3 in plant utility systems' },
      { code: 'Hardness', name: 'Hardness Testing', why: 'Post-weld heat treatment (PWHT) verification, case depth assessment on induction-hardened surfaces, and incoming material verification against MTRs' },
    ],
    codes: [
      'AWS D1.1 — Structural Welding Code (Steel)',
      'AWS D1.2 — Structural Welding Code (Aluminum)',
      'ASME B31.3 — Process Piping (utility systems)',
      'ASTM E186 / E280 / E446 — Reference Radiographs for steel castings',
      'ISO 9001 — Quality Management Systems',
      'ISO 3834 — Quality Requirements for Fusion Welding',
      'OSHA 29 CFR 1910.217 (mechanical power press safety)',
    ],
    certifications: [
      'ASNT Level II/III UT, RT, MT, PT',
      'AWS CWI — Certified Welding Inspector',
      'CWE — Certified Welding Educator (for in-house training programs)',
      'ISO 9712 Level II/III for export to EU/international customers',
    ],
    assetClasses: [
      'Structural steel weldments', 'Castings and forgings (gear, valve bodies)',
      'Pressure vessel shells and heads', 'Heavy equipment booms and frames',
      'Hydraulic cylinder bores', 'Gearbox housings and bearing housings',
      'Industrial furnace refractories', 'Pressure-containing pipe spools',
    ],
    defectConcerns: [
      'Incomplete fusion in structural welds',
      'Porosity in aluminum alloy MIG welds',
      'Shrinkage voids and cold shuts in castings',
      'Quench cracks in induction-hardened gear teeth',
      'Hydrogen-induced cracking in high-strength steels (after welding)',
      'Laminations in plate steel used for pressure parts',
    ],
    typicalScope: 'Manufacturing NDT is production-integrated — inspection occurs at defined gates in the production flow (post-casting, post-machining, post-weld, final inspection) rather than in large outage events. Typical crew sizes are 2–8 technicians embedded with production. Many manufacturers maintain an in-house NDT function supplemented by contract specialists for specialized methods (TOFD, CT, automated UT).',
    faqs: [
      { q: 'What NDT does AWS D1.1 require for structural steel welds?', a: 'AWS D1.1 specifies minimum NDT based on weld category and joint design. Complete-joint-penetration (CJP) welds in statically loaded structures require VT only by default; cyclically loaded CJP welds require additional UT per Clause 8. Prequalified partial-joint-penetration (PJP) welds are VT only. Engineers can specify additional MT, PT, or RT for fracture-critical members. Table 6.2 in AWS D1.1-2020 lists the NDT acceptance criteria by weld type.' },
      { q: 'When should a manufacturer use RT vs UT for casting inspection?', a: 'Radiography is the default for casting acceptance (ASTM E186/E280/E446 reference-radiograph comparisons) because it provides a permanent 2D record of the full casting section without contact. UT is preferred when the casting is too thick for RT (>75mm steel), when production speed requires immediate results, or when internal geometry allows meaningful pulse-echo scanning. For highest confidence, OEM specifications often require both: RT during production qualification and UT for in-process monitoring. Discuss your casting alloy, wall thickness, and acceptance class with your NDT contractor before the inspection plan is fixed.' },
    ],
    schemaIndustry: 'Industrial Manufacturing',
  },

  'automotive': {
    slug: 'automotive',
    label: 'Automotive',
    subtitle: 'Automotive & EV Manufacturing',
    keywords: ['auto', 'ev manufactur', 'vehicle', 'electric vehicle', 'car manufactur', 'truck manufactur'],
    methods: [
      { code: 'UT', name: 'Ultrasonic Testing', why: 'Casting inspection for engine blocks, cylinder heads, and structural aluminum die castings — detects shrinkage, cold shuts, and hot tears per ASTM E2375' },
      { code: 'MT', name: 'Magnetic Particle Testing', why: 'Crankshaft, camshaft, and suspension component inspection per ASTM E1444 — critical safety parts require 100% MT coverage' },
      { code: 'Industrial CT', name: 'Computed Tomography (CT)', why: 'High-resolution 3D defect mapping in aluminum castings and injection-molded battery housings — detects internal porosity and inclusion maps missed by 2D RT' },
      { code: 'Leak Testing', name: 'Leak Testing', why: 'Battery pack enclosure, coolant circuit, and brake-system component leak-tightness verification (helium, pressure decay, mass spectrometry)' },
      { code: 'Eddy Current', name: 'Eddy Current', why: 'Case-depth verification on induction-hardened gear teeth and CV joint components; detects grinding burns without disassembly' },
    ],
    codes: [
      'IATF 16949 — Quality Management in Automotive Production',
      'ASTM E1444 — MT for raw products and for finished products',
      'ASTM E2375 — UT of wrought products',
      'VDA 6.1 — Quality Management System Audit (German OEM)',
      'SAE J1086 — Numbering metals and alloys',
      'FMEA / Control Plans (AIAG/VDA 4th edition)',
      'UL 9540 / UN 38.3 — EV battery safety standards',
    ],
    certifications: [
      'ASNT Level II/III UT, MT, ET',
      'NAS 410 / ISO 9712 for Tier-1 supplier requirements',
      'IATF 16949 internal auditor',
      'Certified Leak Test Technician (ASNT LT Level II)',
    ],
    assetClasses: [
      'Engine blocks and cylinder heads (aluminum casting)',
      'Crankshafts and camshafts (forged steel)',
      'Suspension knuckles and control arms', 'Transmission gears and shafts',
      'Battery enclosures and module housings (EV)',
      'Structural body-in-white weldments', 'Drive shafts and CV joints',
      'Brake calipers and brake discs',
    ],
    defectConcerns: [
      'Porosity and shrinkage in aluminum die castings',
      'Grinding burns on induction-hardened gear flanks',
      'Fatigue cracks in crankshaft fillet radii',
      'Delamination in multi-layer battery electrode stacks',
      'Micro-leak paths in battery enclosure welds',
      'Incomplete penetration in structural spot and arc welds',
    ],
    typicalScope: 'Automotive NDT is high-volume and production-integrated: 100% MT on safety-critical forgings, sampling-based UT on casting lots, and 100% leak test on all fluid-carrying and battery assemblies. EV manufacturing adds new scope: battery cell CT screening, module-level leak testing, and structural adhesive bond inspection (pulse thermography or UT). Tier-1 suppliers operate in-house labs; Tier-2 and Tier-3 typically use mobile NDT contractors.',
    faqs: [
      { q: 'Why does EV battery manufacturing need NDT?', a: 'EV battery packs combine several inspection-critical elements: electrode stacks (CT for delamination and foreign particle detection), module-to-module welds (UT or thermographic inspection for incomplete fusion), enclosure welds and seals (helium leak test for tightness to UN 38.3 transport requirements), and structural aluminum extrusions (UT for crack and lamination). An undetected internal short from a metallic inclusion can cause thermal runaway — battery fire. OEM quality plans typically specify 100% CT for cell-level inspection and 100% leak test at module and pack levels.' },
      { q: 'What is the difference between IATF 16949 and ASNT certification for automotive NDT?', a: 'IATF 16949 is a quality management system standard for the automotive supply chain — it requires suppliers to document their NDT methods, calibration, and acceptance criteria in control plans, but does not specify technician qualification levels. ASNT SNT-TC-1A or NAS 410 sets the technician-qualification requirements. Most automotive OEM supplier quality manuals reference both: "NDT per [method standard] performed by ASNT Level II or equivalent certified technicians in an IATF 16949-certified facility."' },
    ],
    schemaIndustry: 'Automotive Manufacturing',
  },

  'mining': {
    slug: 'mining',
    label: 'Mining',
    subtitle: 'Mining & Minerals Extraction',
    keywords: ['mining', 'iron ore', 'coal mining', 'phosphate', 'potash', 'trona', 'bauxite', 'mineral', 'extraction', 'metals', 'aggregates'],
    methods: [
      { code: 'UT', name: 'Ultrasonic Testing', why: 'Wall thickness measurement on slurry pipelines, ball mill liners, and process vessels to predict replacement intervals under abrasive wear' },
      { code: 'MT', name: 'Magnetic Particle Testing', why: 'Surface crack detection on dragline buckets, crane hooks, dump truck frames, and shovel dipper handles — fatigue monitoring on ultra-high-cycle mining equipment' },
      { code: 'Wire Rope MFL', name: 'Magnetic Flux Leakage (Wire Rope)', why: 'Continuous electromagnetic inspection of hoist ropes, skip ropes, and conveyor cables per ASME B30.2 and OSHA 1910.180 — detects broken wires and section loss without disassembly' },
      { code: 'VT', name: 'Visual Testing', why: 'Conveyor structure, belt splice, and overland conveyor tower inspection — usually combined with drone or rope-access delivery for covered sections' },
      { code: 'PT', name: 'Liquid Penetrant Testing', why: 'Inspection of non-ferromagnetic components (aluminum haul truck castings, titanium tool joints in deep-mining drill strings)' },
    ],
    codes: [
      'ASME B30.2 — Overhead and Gantry Cranes (wire rope)',
      'OSHA 1910.180 — Crawler locomotive and truck cranes',
      'MSHA Title 30 CFR Parts 56/57 — Safety and Health in Mining',
      'ISO 4309 — Cranes: wire ropes (condition for discard)',
      'AS 3569 — Australian Wire Ropes (for Australian mining operations)',
      'ASME B31.4 / API 570 (slurry and overland pipelines)',
    ],
    certifications: [
      'ASNT Level II/III UT, MT, PT',
      'Wire Rope Inspector — ISO 4309 / OSHA-compliant',
      'MSHA Part 46 or 48 surface/underground miner training',
      'IRATA Level 1–3 (rope access for shaft and conveyor inspection)',
    ],
    assetClasses: [
      'Dragline buckets and boom structures', 'Haul truck frames and dump bodies',
      'Shovel dipper handles and crowd arms', 'Ball mills and SAG mills (shell and trunnion)',
      'Conveyor structures and gallery frames', 'Hoist and skip ropes',
      'Slurry pipeline and tailings dam piping', 'Underground tunnel support (rock bolts, shotcrete)',
    ],
    defectConcerns: [
      'Fatigue cracking in dragline bucket welds (billions of load cycles)',
      'Abrasive wear thinning of slurry pipeline walls',
      'Wire breakage and core damage in hoist ropes',
      'Stress corrosion cracking in ball mill trunnion welds',
      'Corrosion fatigue in conveyor gallery framing near acidic ore dust',
    ],
    typicalScope: 'Mining NDT is partly continuous (wire rope daily operator checks, monthly certified MFL runs) and partly shutdown-based (annual ball mill relining inspection, major equipment rebuild NDT). Remote-site operations often require self-contained mobile NDT teams that travel to the mine and work for 1–4 weeks covering multiple assets in a planned sequence.',
    faqs: [
      { q: 'How often must mine hoist wire ropes be inspected?', a: 'MSHA regulations (30 CFR 57.19028 for underground mines) require daily visual inspection of wire ropes by the operator and a certified examination at specified intervals (typically monthly or per tonnage throughput). Most state mining regulators and ISO 4309 require a more thorough electromagnetic (MFL) inspection annually or at rope replacement decision points. The discard criteria — number of broken wires per rope lay, valley breaks, core damage — are specified in ISO 4309 and the rope manufacturer\'s data sheet.' },
      { q: 'What causes fatigue cracking in dragline bucket welds?', a: 'Draglines operate in high-cycle conditions: a large dragline excavates 50,000–100,000 passes per year. Bucket teeth, adapters, and the bucket-to-bail welds experience impact loading on each dig-and-drag cycle. The combination of impact, abrasion, and high-stress cycling nucleates fatigue cracks at weld toes, especially at the lip plate–side plate junction where the stress concentration is highest. Regular MT inspection on a 250–500 hour interval (depending on material and design) is the industry standard for fatigue monitoring in earthmoving buckets.' },
    ],
    schemaIndustry: 'Mining and Mineral Extraction',
  },

  'defense': {
    slug: 'defense',
    label: 'Defense',
    subtitle: 'Defense & Government',
    keywords: ['defense', 'military', 'doe /', 'national lab', 'doe and', 'government', 'naval', 'navy', 'naval aviation', 'naval operation', 'submarine', 'defense manufactur', 'defense storage'],
    methods: [
      { code: 'FPI/PT', name: 'Fluorescent Penetrant Inspection', why: 'Surface-flaw detection on military aircraft structures, rocket motor cases, and ordnance components per MIL-STD-6866 and NAS 410' },
      { code: 'RT', name: 'Radiographic Testing', why: 'Ammunition and propellant liner inspection, munitions casting acceptance, and submarine pressure-hull weld examination per MIL-STD-453 and NAVSEA requirements' },
      { code: 'UT', name: 'Ultrasonic Testing', why: 'Hull plate thickness measurement on naval vessels and submarine pressure hulls; corrosion assessment on aircraft carrier flight deck plating' },
      { code: 'MT', name: 'Magnetic Particle Testing', why: 'Ordnance component inspection, gun tube internal bore inspection, and armored-vehicle weld inspection per MIL-HDBK-728/7' },
      { code: 'Neutron Radiography', name: 'Neutron Radiography', why: 'Detection of hydrogen, water, and organic materials inside sealed metal assemblies — used for pyrotechnic device quality assurance and composite bond inspection' },
    ],
    codes: [
      'MIL-HDBK-728/1–7 — NDT handbook series',
      'MIL-STD-6866 — Liquid Penetrant Inspection',
      'MIL-STD-2035 — NDE Acceptance Criteria',
      'NAS 410 — Personnel qualification for aerospace/defense',
      'NAVSEA Technical Specifications (T9074 series for ship systems)',
      'NASA-STD-5009 — NDE Requirements for Fracture Control Programs',
      'DOE Order 422.1 — Conduct of Operations for nuclear facilities',
    ],
    certifications: [
      'NAS 410 Level II/III',
      'DoD security clearance (for classified programs)',
      'NAVSEA qualification for specific weapon system NDT',
      'NASA NDE Certification Program (for spaceflight hardware)',
      'DOE / NNSA facility clearance for nuclear weapons programs',
    ],
    assetClasses: [
      'Military aircraft structures and propulsion components',
      'Naval vessel hull plating and pressure hulls',
      'Submarine pressure hull and equipment foundations',
      'Munitions casings and propellant liners',
      'Ground vehicle armor and structural welds',
      'Rocket motor cases and nozzle assemblies',
      'Nuclear weapons components (non-classified NDT only)',
    ],
    defectConcerns: [
      'Stress corrosion cracking in high-strength aluminum aircraft structure',
      'Fatigue cracks in military aircraft at fastener and inspection access holes',
      'Weld defects in submarine pressure hull (zero tolerance)',
      'Porosity and inclusions in solid rocket propellant grain',
      'Corrosion of naval vessel deck plating under non-skid coating',
    ],
    typicalScope: 'Defense NDT covers the full lifecycle: production acceptance (castings, forgings, weld qualification for new weapon systems), depot-level maintenance (periodic structural inspection of aircraft, refurbishment of naval vessels), and field inspection (organic capability embedded in combat units for critical aircraft and vehicle components). Classified programs require cleared personnel with additional NTK (need-to-know) restrictions.',
    faqs: [
      { q: 'Do NDT inspectors on defense contracts need security clearances?', a: 'It depends on the program. Many defense NDT tasks — ship hull thickness gauging, aircraft structural inspection, vehicle weld inspection — are unclassified and require only standard background checks and facility access authorization. Programs involving classified weapon systems, nuclear components, or special-access programs (SAPs) require SECRET or TS/SCI clearances. When posting a defense NDT job on NDT Connect, indicate clearance requirements and contract vehicle (DCAA-compliant billing, DFARs clauses) so responding contractors can confirm eligibility.' },
      { q: 'What makes NAVSEA submarine NDT requirements unique?', a: 'Submarine pressure hulls operate at depths where a weld failure is immediately fatal — unlike surface ships or aircraft where some failures allow emergency response. NAVSEA T9074-AS-GIB-010/271 imposes 100% radiographic and ultrasonic examination of all pressure-hull welds during construction, with zero-reject (accept-all-to-code vs. accept-with-repair) philosophy. NDT personnel must be NAVSEA-qualified to specific procedure numbers, not just ASNT-certified. The combination of personnel qualification, procedure approval, and witness by a SUPSHIP surveyor makes submarine NDT one of the most tightly controlled NDT programs in the world.' },
    ],
    schemaIndustry: 'Defense and National Security',
  },

  'steel': {
    slug: 'steel',
    label: 'Steel & Metals',
    subtitle: 'Steel Production & Metal Processing',
    keywords: ['steel', 'metals', 'aluminum smelting', 'aluminum & steel', 'iron ore', 'integrated steel', 'specialty steel', 'titanium', 'metals (legacy'],
    methods: [
      { code: 'UT', name: 'Ultrasonic Testing', why: 'Lamination and internal defect detection in steel plate, slab, and bloom before hot rolling — prevents defective material reaching fabricators' },
      { code: 'MT', name: 'Magnetic Particle Testing', why: 'Surface and near-surface crack detection on hot-rolled structural shapes, forgings, and cast steel components per ASTM E709' },
      { code: 'ET', name: 'Eddy Current Testing', why: 'High-speed bar and tube seam inspection on the production line — detects seam weld defects at rolling speeds up to 100 m/min' },
      { code: 'RT', name: 'Radiographic Testing', why: 'Cast steel product acceptance per ASTM E94/E446 and structural steel casting acceptance for bridge and building applications' },
      { code: 'Hardness', name: 'Hardness Testing', why: 'Process verification — ensures heat treatment has achieved target hardness band (e.g., 300–360 HB for abrasion-resistant plate); incoming material verification' },
    ],
    codes: [
      'ASTM E709 — Guide for MT',
      'ASTM E94 — Guide for RT (film technique)',
      'ASTM E446 — Reference Radiographs for steel castings',
      'AWS D1.1 — Structural Welding Code (for structural steel fabrication)',
      'ASME SA-578 / SA-435 — UT of steel plates (ASME/ASTM)',
      'EN 10228 / EN 10306 — MT and UT of steel forgings (EU)',
      'ISO 11666 — UT of welded joints (ISO acceptance levels)',
    ],
    certifications: [
      'ASNT Level II/III UT, RT, MT, ET',
      'AWS CWI for fabrication-shop weld inspection',
      'ISO 9712 Level II/III (for export product certification)',
    ],
    assetClasses: [
      'Steel plate (mill production acceptance)', 'Structural shapes (I-beams, HSS, angles)',
      'Steel bar and rod (bar and tube mills)', 'Forgings (flanges, fittings, shafts)',
      'Cast steel components (valve bodies, pump casings, bridge hangers)',
      'Continuous cast slab and bloom', 'Specialty alloy ingots and billets',
    ],
    defectConcerns: [
      'Laminations from continuous casting inclusion streaks',
      'Hydrogen flaking in thick alloy forgings',
      'Seam defects in hot-rolled bar and tube',
      'Shrinkage cavities in cast steel nodes',
      'Surface seams and laps from hot rolling',
      'Decarburization layer in heat-treated spring steel',
    ],
    typicalScope: 'Steel mill NDT is largely automated or semi-automated and production-integrated: immersion UT systems scan plate at the hot strip mill, eddy-current coils scan bar and tube on the production line, and hardness testers sample every coil or heat. Fabrication NDT (welded structural products) is more manually intensive — AWS D1.1 acceptance, visual inspection of each joint, and UT or RT on complete-joint-penetration welds.',
    faqs: [
      { q: 'What is a lamination in steel plate and why does it matter?', a: 'A lamination is a planar discontinuity parallel to the plate surface, typically caused by elongation of a non-metallic inclusion during hot rolling. Laminations are generally undetected by surface VT or MT because they lie below the surface and have no surface-opening. They are critical in applications where through-thickness loading occurs — flanges, T-connections, or lamellar-tearing-prone applications per AWS D1.1 Annex K. ASME SA-578 (UT for plate) is the standard inspection for lamination detection; ASME SA-770 covers ultrasonic testing of heavy-wall plate for lamellar tearing susceptibility.' },
      { q: 'Can NDT Connect source NDT contractors for a steel fabrication project?', a: 'Yes. Post your fabrication scope — structural steel per AWS D1.1, pressure vessels per ASME Section VIII, piping per ASME B31.3 — and specify the required coverage (VT only, 10% UT, 100% MT on CJPs, etc.). We connect you with certified AWS CWI-led inspection teams and ASNT Level II NDT crews within your region. For large fabrication projects, multi-crew arrangements with staggered mobilization are available through our contractor network.' },
    ],
    schemaIndustry: 'Steel Production and Metal Processing',
  },

  'construction': {
    slug: 'construction',
    label: 'Construction',
    subtitle: 'Construction & Infrastructure',
    keywords: ['construction', 'infrastructure', 'bridge', 'transit', 'hanford', 'civil', 'building', 'real estate', 'transport'],
    methods: [
      { code: 'UT (PA)', name: 'Phased Array UT', why: 'Full-volume inspection of structural steel CJP welds per AWS D1.1 Annex S — digital record, no radiation permitting, faster than RT' },
      { code: 'MT', name: 'Magnetic Particle Testing', why: 'Surface-crack detection on structural welds, crane hook shanks, and precast concrete reinforcement couplers' },
      { code: 'GPR', name: 'Ground Penetrating Radar', why: 'Rebar location, concrete thickness mapping, and void detection behind tunnel linings without demolition' },
      { code: 'VT', name: 'Visual Testing', why: 'Routine bridge inspection per AASHTO / FHWA biennial inspection program; structural condition rating under National Bridge Inspection Standards' },
      { code: 'RT', name: 'Radiographic Testing', why: 'Weld acceptance on complete-joint-penetration groove welds in fracture-critical bridge members per AASHTO LRFD and AISC 360' },
    ],
    codes: [
      'AWS D1.1 — Structural Welding Code (Steel)',
      'AWS D1.5 — Bridge Welding Code',
      'AASHTO LRFD Bridge Design Specifications',
      'FHWA / NBIS — National Bridge Inspection Standards',
      'ACI 318 — Building Code Requirements for Structural Concrete',
      'AISC 360 — Specification for Structural Steel Buildings',
      'IBC 2021 — International Building Code',
    ],
    certifications: [
      'AWS CWI (Certified Welding Inspector) — required for structural steel acceptance',
      'AWS SCWI (Senior CWI) for complex bridge projects',
      'ASNT Level II/III UT, RT, MT',
      'FHWA Bridge Inspector (for bridge inspection programs)',
      'ICC Special Inspector (seismic, high-rise structural)',
    ],
    assetClasses: [
      'Bridge girders and fracture-critical members (FCM)',
      'Structural steel moment frames (high-rise buildings)',
      'Crane runways and monorail systems',
      'Precast and post-tensioned concrete bridges',
      'Tunnel linings and underground structures',
      'Industrial chimney stacks and cooling towers',
      'Heavy structural weldments (offshore jacket fabrication)',
    ],
    defectConcerns: [
      'Lack of fusion in structural CJP welds',
      'Lamellar tearing in T-joint and corner-joint weldments',
      'Fatigue cracking at bridge cope and block-out details',
      'Corrosion of bridge cables and anchor heads',
      'Alkali-silica reaction (ASR) cracking in concrete bridges',
      'Post-tension tendon corrosion in grouted ducts',
    ],
    typicalScope: 'Construction NDT splits between new-build (embedded in steel fabrication shops: AWS D1.1 UT/MT acceptance on CJPs, weld procedure qualification) and in-service infrastructure inspection (biennial bridge inspections, building envelope investigations, post-earthquake reconnaissance). Special inspection programs per IBC Chapter 17 require third-party special inspectors on high-rise and seismic-zone construction.',
    faqs: [
      { q: 'Does AWS D1.1 allow PAUT instead of film RT for structural welds?', a: 'Yes — AWS D1.1-2020 Annex S provides acceptance criteria for Phased Array UT (PAUT), allowing it as an alternative to RT for complete-joint-penetration groove welds in statically and cyclically loaded structures. The PAUT procedure must be demonstrated on a qualification block containing representative flaws, and the system must meet Annex S equipment requirements. PAUT is now the dominant alternative to RT on structural steel projects because it eliminates radiation licensing, permits working in occupied areas, and provides digital records that are easier to archive than film.' },
      { q: 'What triggers special inspection requirements on a building project?', a: 'IBC Chapter 17 requires special inspection — by an approved third-party inspector — for defined scope items: structural steel (visual and NDT per AISC 341/358 for seismic), concrete strength and placement, high-strength bolt installation, masonry, and pile driving, among others. The special inspection program is approved by the Authority Having Jurisdiction (AHJ) and specified in the structural drawings. On seismic-design-category D/E/F buildings, CJP welds in the seismic force-resisting system require 100% UT inspection by a CWI-supervised NDT technician.' },
    ],
    schemaIndustry: 'Construction and Infrastructure',
  },
};

// ---------------------------------------------------------------------------
// Canonical slug mapper
// ---------------------------------------------------------------------------
// Priority order matters: more-specific industries (nuclear, lng) must be
// tested before broader ones (oil-gas, petrochemical) or a city with
// "Nuclear / Power" gets mis-classified as "power-generation".
const MATCH_ORDER = [
  'nuclear', 'lng', 'refining', 'oil-gas', 'pipeline',
  'aerospace', 'automotive', 'defense', 'marine', 'mining',
  'steel', 'power-generation', 'petrochemical', 'manufacturing', 'construction',
];

export function rawIndustryToSlug(rawName: string): string | null {
  const lower = rawName.toLowerCase();
  for (const slug of MATCH_ORDER) {
    const def = INDUSTRY_PAGE_DATA[slug];
    if (!def) continue;
    if (def.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return slug;
    }
  }
  return null;
}

/** Returns qualifying industry slugs for a city (weight >= threshold). */
export function cityIndustrySlugs(
  industries: { name: string; weight: number }[],
  minWeight = 0.15,
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const ind of industries) {
    if (ind.weight < minWeight) continue;
    const slug = rawIndustryToSlug(ind.name);
    if (slug && !seen.has(slug)) {
      seen.add(slug);
      out.push(slug);
    }
  }
  return out;
}
