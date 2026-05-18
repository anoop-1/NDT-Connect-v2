import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'tx',
  name: 'Texas',
  abbreviation: 'TX',
  metaTitle: 'Texas NDT Market Guide: Refining, LNG, Offshore & Permian',
  metaDescription:
    'Texas runs 31% of US refining capacity and most of the LNG export build-out. Inside the inspector pipeline, salary bands, top metros, and turnaround calendar.',
  heroLede:
    "Texas operates 31% of US refining capacity (5.9 million barrels per day across 31 refineries per EIA 2023 data) and hosts the bulk of the Gulf Coast LNG export build-out — Sabine Pass, Corpus Christi, Freeport, and the Rio Grande and Port Arthur trains under construction. Turnaround season compresses around Q1 and Q3, and every Level II UT, RT, and PAUT technician within 200 miles of the Houston Ship Channel is committed by November of the prior year. The state's NDT market is the largest in North America by headcount, billable hours, and equipment installed base — but it runs on a regulatory stack (TCEQ air permits, RRC pipeline jurisdiction, BSEE offshore, and PHMSA interstate) that newcomers routinely misread. This guide is the working inspector's and asset owner's map to where work concentrates, what it pays, and how to pass pre-job qualification on the first try.",
  industryMix:
    "Downstream Texas is anchored by the Houston Ship Channel (Baytown, Deer Park, Channelview, Pasadena) and the Sabine/Neches corridor (Beaumont, Port Arthur, Orange). ExxonMobil Baytown is the single largest US refinery at ~564,000 bpd; Motiva Port Arthur is the next at ~636,000 bpd. Petrochemical capacity is even more concentrated — LyondellBasell, Dow Freeport, Chevron Phillips Cedar Bayou, INEOS Chocolate Bayou, and Westlake — driving constant fixed-equipment and piping inspection work under API 510, 570, and 653. LNG export is the growth story: Cheniere Sabine Pass and Corpus Christi together exceed 30 MTPA, with Rio Grande LNG (NextDecade) and Port Arthur LNG (Sempra) under FERC-approved construction adding 30+ MTPA more, and every cryogenic weld package requiring PAUT or RT under ASME B31.3 and API 1104. Upstream, the Permian Basin (Midland-Odessa, plus the New Mexico side covered in the NM guide) produces over 6.3 million bpd — DCP/Targa/Enterprise midstream gathering systems alone keep PHMSA-driven integrity inspection running year-round. Offshore Gulf BSEE jurisdiction starts at the federal line nine nautical miles out and adds rope-access UT, PAUT corrosion mapping, and ROV-deployed inspection for Shell, BP, Chevron, and Hess assets. Aerospace inspection clusters around NASA Johnson, Lockheed Martin Fort Worth (F-35 final assembly), and Bell Textron Hurst — adding penetrant, eddy current, and CT-based composite inspection to the mix. The net effect: Texas is the only state where an NDT firm can build a full-service book (oil & gas, petrochem, LNG, midstream, offshore, aerospace) inside a four-hour drive of HQ.",
  topMetros: [
    { name: 'Houston', slug: 'houston-tx' },
    { name: 'Beaumont', slug: 'beaumont-tx' },
    { name: 'Corpus Christi', slug: 'corpus-christi-tx' },
    { name: 'Port Arthur', slug: 'port-arthur-tx' },
    { name: 'Midland', slug: 'midland-tx' },
    { name: 'Odessa', slug: 'odessa-tx' },
    { name: 'Pasadena', slug: 'pasadena-tx' },
    { name: 'Texas City', slug: 'texas-city-tx' },
    { name: 'Galveston', slug: 'galveston-tx' },
    { name: 'Fort Worth', slug: 'fort-worth-tx' },
    { name: 'Dallas', slug: 'dallas-tx' },
    { name: 'Tyler', slug: 'tyler-tx' },
  ],
  regulatoryNotes: [
    {
      id: 'tceq-30tac',
      source: 'Texas Commission on Environmental Quality, 30 TAC Chapter 115 (Volatile Organic Compounds) — drives LDAR and tank integrity inspection cadence on refineries and petrochem',
      url: 'https://www.tceq.texas.gov/',
    },
    {
      id: 'rrc-pipeline',
      source: 'Railroad Commission of Texas — Pipeline Safety Division (16 TAC Chapter 8) — intrastate pipeline integrity, supplements PHMSA on interstate',
      url: 'https://www.rrc.texas.gov/pipeline-safety/',
    },
    {
      id: 'bsee-30cfr250',
      source: 'BSEE 30 CFR Part 250 Subpart H — Production Safety Systems (offshore Gulf of Mexico) — mandates NDT on pressure vessels, risers, and SCSSVs',
      url: 'https://www.bsee.gov/',
    },
    {
      id: 'phmsa-49cfr192',
      source: 'PHMSA 49 CFR Part 192 (gas) and Part 195 (hazardous liquid) — interstate pipeline NDT, applies to all Texas interstate transmission',
      url: 'https://www.phmsa.dot.gov/',
    },
    {
      id: 'tx-boiler',
      source: 'Texas Department of Licensing and Regulation, Boiler Program (Tex. Health & Safety Code Chapter 755) — NB Inservice inspection of boilers ≥ 250,000 BTU/hr',
      url: 'https://www.tdlr.texas.gov/boilers/',
    },
    {
      id: 'eia-refining',
      source: 'EIA Refinery Capacity Report (2023): Texas operable atmospheric distillation capacity 5.91 MMbpd, 31% of US total',
      url: 'https://www.eia.gov/petroleum/refinerycapacity/',
    },
  ],
  majorAssetOwners: [
    { name: 'ExxonMobil (Baytown, Beaumont)', sector: 'Refining / Petrochemicals' },
    { name: 'Motiva Enterprises (Port Arthur)', sector: 'Refining' },
    { name: 'Marathon Petroleum (Galveston Bay, Texas City)', sector: 'Refining' },
    { name: 'Valero Energy (Corpus Christi, Houston, Texas City)', sector: 'Refining' },
    { name: 'LyondellBasell (Houston, Channelview)', sector: 'Petrochemicals' },
    { name: 'Dow Chemical (Freeport, La Porte)', sector: 'Petrochemicals' },
    { name: 'Cheniere Energy (Sabine Pass, Corpus Christi)', sector: 'LNG Export' },
    { name: 'Shell (Deer Park JV, Gulf of Mexico offshore)', sector: 'Refining / Offshore' },
    { name: 'Chevron Phillips Chemical (Cedar Bayou, Sweeny)', sector: 'Petrochemicals' },
    { name: 'Enterprise Products Partners (statewide midstream)', sector: 'Midstream' },
    { name: 'Kinder Morgan (statewide pipelines & terminals)', sector: 'Midstream' },
    { name: 'NASA Johnson Space Center', sector: 'Aerospace' },
    { name: 'Lockheed Martin Aeronautics (Fort Worth)', sector: 'Aerospace / Defense' },
  ],
  methodDemand: [
    {
      method: 'Ultrasonic Testing (UT)',
      demandLevel: 'high',
      reason:
        'Baseline thickness surveys on every fixed-equipment item under API 510/570 and tank shells under API 653. UT-T is the single most-billed NDT line item on Gulf Coast turnarounds, with Level II UT techs cycling through 6-12 turnarounds per year.',
    },
    {
      method: 'Phased Array Ultrasonic Testing (PAUT)',
      demandLevel: 'high',
      reason:
        'Replacing RT on most piping and pressure vessel welds in occupied refineries. Cheniere LNG and Rio Grande LNG specify PAUT corrosion mapping plus TOFD on cryogenic process piping. PAUT Level II demand exceeds supply — qualified techs command $45-65/hr in Houston metro.',
    },
    {
      method: 'Radiographic Testing (RT)',
      demandLevel: 'high',
      reason:
        'Still the default for greenfield LNG and petrochem construction. NRC-licensed Ir-192 sources for fabrication-shop weld qualification under ASME Section V and IX. Texas Department of State Health Services (DSHS) regulates radiation safety alongside NRC agreement-state authority.',
    },
    {
      method: 'Magnetic Particle Testing (MT)',
      demandLevel: 'high',
      reason:
        'Mandatory on every weld root and final pass on carbon-steel pressure equipment under ASME Section VIII Div 1, plus drill-pipe and BOP inspection per API Spec 7-1 and API 16A for offshore and Permian upstream.',
    },
    {
      method: 'Liquid Penetrant Testing (PT)',
      demandLevel: 'medium',
      reason:
        'Standard on austenitic stainless welds in LNG, ethylene, and ammonia service. Lower entry barrier — Level I PT roles are the most common entry-point into the Gulf Coast NDT workforce.',
    },
    {
      method: 'Eddy Current Testing (ECT)',
      demandLevel: 'medium',
      reason:
        'Heat-exchanger tube inspection during turnarounds at every Houston Ship Channel refinery — bobbin and array probes on bundles of 1,000+ tubes per exchanger. Aerospace fastener-hole inspection at Lockheed Fort Worth keeps a steady second customer base.',
    },
    {
      method: 'Time-of-Flight Diffraction (TOFD)',
      demandLevel: 'medium',
      reason:
        'Specified on heavy-wall (>50 mm) pressure vessel welds — common on coker drums, hydrocrackers, and ammonia converters across the Houston-Beaumont corridor.',
    },
    {
      method: 'Visual Testing (VT)',
      demandLevel: 'high',
      reason:
        'AWS CWI demand is constant across LNG fabrication shops and pipeline construction. Texas hosts more CWI-credentialed inspectors than any other state per AWS 2023 figures.',
    },
  ],
  certificationAvailability:
    'Texas has the deepest training ecosystem in the country. Lamar Institute of Technology (Beaumont) runs ASNT SNT-TC-1A Level I/II UT, RT, MT, PT, VT courses tied to refinery hiring pipelines. San Jacinto College (Pasadena), Lee College (Baytown), and Houston Community College run NDT certificate programs feeding the Ship Channel. Hellier NDT and Lavender International maintain Houston training centers for PAUT, TOFD, and ASNT NDT Level III prep. API 510/570/653 endorsements are administered through API ICP — most candidates sit the proctored exam at Prometric Houston or Austin. AWS CWI seminars run monthly in Houston, Dallas, and San Antonio. For radiation safety officer (RSO) credentialing under DSHS, Texas A&M Engineering Extension Service (TEEX) is the dominant provider.',
  salaryBands: [
    { role: 'Level I NDT Trainee (UT/MT/PT)', low: 42000, high: 58000 },
    { role: 'Level II NDT Technician (UT, RT, MT, PT)', low: 62000, high: 95000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 85000, high: 130000 },
    { role: 'Level III NDT Engineer', low: 115000, high: 175000 },
    { role: 'API 510/570/653 Inspector', low: 95000, high: 145000 },
    { role: 'NDT Field Supervisor', low: 90000, high: 135000 },
    { role: 'AWS Certified Welding Inspector (CWI)', low: 72000, high: 115000 },
  ],
  hiringSeasons:
    "Texas runs two compressed peaks. Spring turnaround (mid-February through early May) is the largest — refineries and petrochem coordinate around catalyst cycles and summer gasoline RVP transitions. Fall turnaround (mid-September through November) clears the second catalyst run. Contractors staff up 6-10 weeks ahead and shed temporary headcount within two weeks of mechanical completion. Greenfield LNG (Rio Grande, Port Arthur LNG, CP2) hires year-round but with weld-package peaks tied to spool fabrication releases. Permian upstream is the inverse — drilling-led demand spikes with rig count, which means hiring follows WTI strip pricing more than the calendar. Offshore Gulf hookup and commissioning compresses into the May-October weather window.",
  faqs: [
    {
      q: 'How much does a Level II UT technician earn in Houston versus the rest of Texas?',
      a: "Houston Ship Channel Level II UT pay runs $62,000-$95,000 base for straight-time, with overtime during turnarounds routinely pushing total comp into the $110,000-$140,000 range for high-utilization techs. PAUT add-on raises base $15,000-$30,000. Beaumont and Port Arthur trail Houston by roughly 5%, Corpus Christi by 8-10%, and Permian (Midland/Odessa) upstream UT pays about par with Houston refining but with more travel and rotational schedules. Dallas-Fort Worth aerospace UT, by contrast, pays $58,000-$82,000 with much less overtime — a trade-off in lifestyle versus take-home.",
    },
    {
      q: 'Which Texas certifications matter most for refinery turnaround work?',
      a: "For Gulf Coast refining and petrochem, the working stack is: ASNT SNT-TC-1A Level II in UT, MT, and PT as the entry baseline, plus API 510 (pressure vessels), API 570 (piping), or API 653 (tanks) endorsements for inspector roles. PAUT Level II under ASNT or to CP-189 is the differentiator that gets you off bench UT and onto coker, hydrotreater, and FCC repair packages. Add an OSHA 30, TWIC card (Transportation Worker Identification Credential — mandatory inside any port or LNG facility), and a refinery-site safety council badge (BASIC-Plus, Reliant) and you can clear site access at every Ship Channel facility.",
    },
    {
      q: 'What regulatory authority drives most Texas NDT work — federal or state?',
      a: "It is layered. Federal: PHMSA for interstate pipelines (49 CFR 192/195), BSEE for federal offshore (30 CFR 250), NRC for radioactive sources (with Texas as a Section 274b agreement state, meaning DSHS handles day-to-day licensing). State: the Railroad Commission of Texas regulates intrastate oil and gas pipelines under 16 TAC Chapter 8; TCEQ runs air permits that trigger LDAR and tank integrity work under 30 TAC Chapter 115; the Texas Department of Licensing and Regulation administers boiler inspections. For a typical refinery turnaround, you will touch TCEQ, RRC, OSHA Process Safety Management (29 CFR 1910.119), and DSHS radiation safety inside the same week.",
    },
    {
      q: 'How do I get on the approved vendor list at ExxonMobil Baytown or Motiva Port Arthur?',
      a: "Both majors run multi-tier qualification. ExxonMobil uses GlobalSign / OQ SOLUTIONS plus internal NDT vendor pre-qualification administered through procurement; expect six to twelve months from first contact to first PO. Motiva uses ISNetworld plus PEC SafeLandUSA, with NDT-specific qualification through their inspection engineering group. Both require evidence of: ASNT-compliant Written Practice, NDT Level III on staff or under contract, ISO 9001 or equivalent QMS, demonstrated turnaround experience with named-customer references, OSHA EMR below industry threshold (typically 1.0), and full insurance (general liability minimum $5M, professional liability $2M). The faster path is sub-tier through an existing T1 contractor (Team Inc., Acuren, Mistras, IRISNDT) for the first one or two turnarounds, then convert to direct.",
    },
    {
      q: 'Is Texas NDT work mostly W-2 employment or 1099 contracting?',
      a: "Both, with a clear split. Permanent staff at the refining/petrochem inspection engineering groups (operator-side) are W-2. Contractor field crews are predominantly W-2 with hourly plus per-diem during turnarounds — most of the large NDT firms moved away from 1099 classification after IRS and DOL enforcement actions in the 2010s. Independent Level III consultants and API inspectors remain 1099, often through a single-member LLC, billing $95-$185/hr depending on specialization and call-out terms. For Permian upstream, 1099 day-rate engagements ($600-$1,100/day for senior inspectors) remain common, often via staffing platforms.",
    },
    {
      q: 'When is the best time of year to look for an NDT job in Texas?',
      a: "Aim resumes at refining and petrochem contractors in November-December for the spring turnaround push (job offers typically extended late December through early February). Aim again at August for fall turnaround. LNG construction hiring runs through the year but accelerates around weld-package release milestones — track Rio Grande LNG, Port Arthur LNG, and CP2 LNG construction reports for visibility. Permian upstream hiring tracks the Baker Hughes rig count by roughly six weeks. Aerospace (DFW area) runs steady-state hiring with low cyclicality.",
    },
  ],
  internalLinks: [
    {
      href: '/states/la',
      label: 'Louisiana NDT market guide',
      context: 'Louisiana refining, petrochem, and LNG corridor mirrors Texas and shares the same contractor pool — Port Arthur jobs frequently swap with Lake Charles within the same turnaround window.',
    },
    {
      href: '/states/nm',
      label: 'New Mexico NDT market guide',
      context: 'The eastern Permian (Lea, Eddy counties) is operationally identical to West Texas — Permian Basin inspection firms work both states from Midland and Hobbs offices.',
    },
    {
      href: '/methods/phased-array-ut',
      label: 'Phased array ultrasonic testing',
      context: 'PAUT corrosion mapping is the primary occupied-refinery alternative to RT and dominates Houston Ship Channel turnaround scopes.',
    },
    {
      href: '/methods/radiographic-testing',
      label: 'Radiographic testing (RT)',
      context: 'RT remains the default on LNG cryogenic weld packages and greenfield petrochem construction.',
    },
    {
      href: '/industries/oil-and-gas',
      label: 'Oil & gas NDT inspection',
      context: 'Texas oil & gas inspection scope spans upstream Permian, midstream gathering, downstream refining, and LNG export — the broadest industry mix in the country.',
    },
    {
      href: '/industries/petrochemical',
      label: 'Petrochemical NDT inspection',
      context: 'The Houston Ship Channel is the largest petrochemical inspection market in the world, driving demand for API 510/570/653 inspectors.',
    },
    {
      href: '/standards/api-510',
      label: 'API 510 pressure vessel inspection code',
      context: 'API 510 governs in-service pressure vessel inspection across every Texas refinery.',
    },
    {
      href: '/standards/api-570',
      label: 'API 570 piping inspection code',
      context: 'API 570 drives the bulk of Texas piping NDT — UT thickness, PAUT corrosion mapping, and RT on damage mechanism circuits.',
    },
    {
      href: '/standards/asme-section-v',
      label: 'ASME Section V (NDE)',
      context: 'ASME V defines the NDE procedures referenced by ASME Section VIII Div 1 and B31.3 — the foundation document for Texas pressure equipment fabrication.',
    },
    {
      href: '/careers/houston-tx',
      label: 'NDT careers in Houston',
      context: 'Houston metro alone employs more than 7,000 working NDT technicians and inspectors by IES estimates.',
    },
    {
      href: '/cost-guide/houston-tx/ut',
      label: 'Houston UT cost guide',
      context: 'Reference rates for Level II UT and PAUT in the Houston metro vary widely between turnaround peaks and shoulder months.',
    },
    {
      href: '/free-tools/calibration-reminder',
      label: 'Calibration reminder tool',
      context: 'Turnaround scheduling in Texas hinges on calibration validity — automate the reminder to avoid losing crew availability at the worst time.',
    },
  ],
  citations: [
    {
      id: 'eia-refining-2023',
      source: 'EIA Refinery Capacity Report 2023 — Texas atmospheric distillation 5.91 MMbpd / 31% of US',
      url: 'https://www.eia.gov/petroleum/refinerycapacity/',
    },
    {
      id: 'tceq-30tac-115',
      source: 'Texas Commission on Environmental Quality, 30 TAC Chapter 115 — Control of Air Pollution from Volatile Organic Compounds',
      url: 'https://www.tceq.texas.gov/',
    },
    {
      id: 'rrc-pipeline-safety',
      source: 'Railroad Commission of Texas, 16 TAC Chapter 8 — Pipeline Safety Regulations',
      url: 'https://www.rrc.texas.gov/pipeline-safety/',
    },
    {
      id: 'bsee-30cfr250-subpart-h',
      source: 'BSEE 30 CFR Part 250 Subpart H — Production Safety Systems (offshore)',
      url: 'https://www.bsee.gov/',
    },
    {
      id: 'phmsa-49cfr',
      source: 'PHMSA 49 CFR Parts 192 (gas) and 195 (hazardous liquid)',
      url: 'https://www.phmsa.dot.gov/',
    },
    {
      id: 'dshs-radiation',
      source: 'Texas Department of State Health Services — Radiation Control Program (25 TAC Chapter 289)',
      url: 'https://www.dshs.texas.gov/radiation/',
    },
    {
      id: 'api-510-2022',
      source: 'API 510 Pressure Vessel Inspection Code, 11th ed., 2022, §6.4.1 Inspection Plan',
    },
    {
      id: 'asnt-snt-tc-1a-2020',
      source: 'ASNT SNT-TC-1A (2020 ed.) — Personnel Qualification and Certification in Nondestructive Testing',
    },
  ],
};

export default state;
