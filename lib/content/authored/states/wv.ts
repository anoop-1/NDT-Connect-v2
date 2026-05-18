import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'wv',
  name: 'West Virginia',
  abbreviation: 'WV',
  metaTitle: 'West Virginia NDT Market Guide: Marcellus-Utica, Chemicals & MPLX',
  metaDescription:
    'West Virginia produces ~8 Bcf/d from the Marcellus-Utica southern tier, hosts MPLX/MarkWest fractionation, and the Kanawha Valley chemical corridor. NDT salaries, regulators, top metros.',
  heroLede:
    "West Virginia produced roughly 8.0 billion cubic feet per day of natural gas in 2024 — the fifth-largest US producing state, anchored by the Marcellus and Utica formations in the northern panhandle (Marshall, Wetzel, Tyler counties) and the southwest (Ritchie, Doddridge). MPLX/MarkWest operates the largest natural gas fractionation complex in the country at Houston, PA — adjacent to and tied into WV gas-plant infrastructure at Sherwood, Mobley, and Hastings. The Kanawha Valley chemical corridor (Charleston, Nitro, Institute, South Charleston) hosts Bayer/Covestro polycarbonate, Dow methyl methacrylate (sold to Trinseo), Chemours/DuPont Belle, Westlake (formerly OxyChem) at Natrium, and Union Carbide legacy operations. The WV Department of Environmental Protection administers air permits under WV Code 22-5 that drive refinery and chemical-plant LDAR and tank integrity cadence. The state's NDT market is smaller in headcount than PA or OH but more diverse per square mile — upstream, midstream, refining (Marathon Catlettsburg KY draws WV crude), heavy chemicals, and primary steel converge in one geography.",
  industryMix:
    "Northern panhandle and north-central WV concentrate Marcellus and Utica upstream operated by EQT, Antero Resources (HQ Denver but WV-heavy ops), Southwestern Energy, Hilcorp, and Tug Hill (legacy Cabot now part of Coterra). Midstream is dominated by MPLX/MarkWest (Sherwood, Mobley, Houston PA tie-in), Equitrans (Mountain Valley Pipeline operator), Crestwood, and Williams (Stonewall Gas Gathering, Atlantic Sunrise lateral). The Mountain Valley Pipeline (303 miles, 42-inch, 2.0 Bcf/d capacity from northwest WV to southern VA) completed construction in 2024 and brought sustained inspection workload through 2023-2024. The Kanawha Valley chemical complex anchored by Bayer/Covestro South Charleston, Dow/Trinseo Institute, Chemours Belle (titanium dioxide), Westlake Natrium (chlor-alkali), and the Union Carbide legacy operations is one of the densest chemical-corridor inspection markets in the eastern US. Primary steel at Cleveland-Cliffs Weirton and ArcelorMittal Weirton (legacy operations now consolidated) plus Wheeling Nippon Steel adds steel-mill NDT. Aerospace: Aurora Flight Sciences (Bridgeport, Boeing subsidiary) builds composite UAV structures. Defense: Allegheny Ballistic Laboratory (Rocket Center, ATK/Northrop Grumman) — solid rocket motor inspection. Coal: WV remains the second-largest US coal producer, with associated mine-equipment, prep-plant, and rail-loading NDT.",
  topMetros: [
    { name: 'Charleston', slug: 'charleston-wv' },
    { name: 'Huntington', slug: 'huntington-wv' },
    { name: 'Parkersburg', slug: 'parkersburg-wv' },
    { name: 'Weirton', slug: 'weirton-wv' },
    { name: 'Beckley', slug: 'beckley-wv' },
  ],
  regulatoryNotes: [
    { id: 'wv-dep-air', source: 'West Virginia Department of Environmental Protection, Division of Air Quality — 45 CSR (drives chemical-corridor and refinery inspection cadence)', url: 'https://dep.wv.gov/' },
    { id: 'wv-dep-oil-gas', source: 'WV DEP Office of Oil and Gas — well construction, integrity, hydraulic fracturing (W. Va. Code 22-6 and 22-6A)' },
    { id: 'wv-puc-pipeline', source: 'WV Public Service Commission Pipeline Safety — intrastate gas and hazardous liquid (under PHMSA grant)' },
    { id: 'phmsa-wv', source: 'PHMSA 49 CFR 192/195 — Mountain Valley Pipeline, Tetco Mainline, Columbia Gas Mainline crossing WV' },
    { id: 'wv-bbcs', source: 'WV Bureau of Public Health Radiologic Health Program — 64 CSR Series 23 (radioactive materials and industrial radiography)' },
  ],
  majorAssetOwners: [
    { name: 'EQT Corporation (WV-heavy Marcellus ops)', sector: 'Upstream' },
    { name: 'Antero Resources', sector: 'Upstream' },
    { name: 'Southwestern Energy (now part of Expand Energy after 2024 merger)', sector: 'Upstream' },
    { name: 'MPLX / MarkWest (Sherwood, Mobley, Hastings complex)', sector: 'Midstream' },
    { name: 'Equitrans Midstream (Mountain Valley Pipeline)', sector: 'Midstream' },
    { name: 'Williams (Stonewall, Atlantic Sunrise lateral)', sector: 'Midstream' },
    { name: 'Bayer / Covestro (South Charleston)', sector: 'Chemicals' },
    { name: 'Trinseo / Dow Methyl Methacrylate (Institute)', sector: 'Chemicals' },
    { name: 'Chemours (Belle TiO2)', sector: 'Chemicals' },
    { name: 'Westlake (Natrium chlor-alkali)', sector: 'Chemicals' },
    { name: 'Cleveland-Cliffs (Weirton)', sector: 'Steel' },
    { name: 'Aurora Flight Sciences / Boeing (Bridgeport)', sector: 'Aerospace' },
    { name: 'Northrop Grumman / Allegheny Ballistic Laboratory (Rocket Center)', sector: 'Defense' },
  ],
  methodDemand: [
    { method: 'Radiographic Testing (RT)', demandLevel: 'high', reason: 'Mountain Valley Pipeline and Marcellus gathering construction; chemical-plant turnaround weld inspection.' },
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'Chemical-plant heat exchangers, tank inspection, gas-plant cryogenic process equipment.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'medium', reason: 'Pipeline integrity verification and chemical-corridor occupied-unit corrosion mapping.' },
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'high', reason: 'Chemical-plant pressure vessel weld inspection, drilling and workover equipment, steel-mill equipment.' },
    { method: 'Liquid Penetrant Testing (PT)', demandLevel: 'high', reason: 'Stainless and special-alloy weld inspection for chemical and polycarbonate process equipment; aerospace composite component PT.' },
    { method: 'Eddy Current Testing (ECT)', demandLevel: 'medium', reason: 'Heat exchanger tube inspection across the chemical corridor.' },
    { method: 'Visual Testing / CWI', demandLevel: 'high', reason: 'AWS CWI for pipeline and chemical-plant construction, plus WVDOT bridge inspection.' },
    { method: 'Aerospace FPI / Composite UT', demandLevel: 'medium', reason: 'Aurora Flight Sciences composite UAV structures at Bridgeport and Allegheny Ballistic solid rocket motor inspection.' },
  ],
  certificationAvailability:
    "BridgeValley Community and Technical College (South Charleston) and Pierpont Community and Technical College (Fairmont) run NDT certificate programs feeding the Kanawha Valley and Marcellus operators. West Virginia University (Morgantown) Statler College feeds Level III engineering and inspection-management roles. Marshall University (Huntington) runs welding engineering technology. Most working Level II techs in WV cycle in from PA and OH. API ICP exams at Prometric Charleston and Morgantown. AWS CWI seminars run quarterly in Charleston and Morgantown. Radiographic source licensing is administered by WV Bureau of Public Health Radiologic Health Program under 64 CSR Series 23; WV is a Section 274b agreement state. The chemical-corridor operators run extensive site-specific qualification programs layered on top of ASNT Level II credentials.",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 38000, high: 54000 },
    { role: 'Level II UT/MT/PT Technician', low: 58000, high: 88000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 78000, high: 122000 },
    { role: 'Level III NDT Engineer', low: 105000, high: 158000 },
    { role: 'API 510/570 Inspector (chemicals)', low: 85000, high: 132000 },
    { role: 'NDT Field Supervisor', low: 85000, high: 128000 },
  ],
  hiringSeasons:
    "Marcellus gathering and transmission construction concentrates April-November. Chemical-plant turnaround clusters spring and fall. Steel-mill outages cluster summer (demand low) and December-January. Coal-prep plant outages follow customer-demand cycles. Mountain Valley Pipeline construction (2018-2024) drove sustained year-round NDT hiring; its post-construction integrity-management workload will continue through the line's operating life.",
  faqs: [
    {
      q: 'How does the Kanawha Valley chemical corridor compare to Houston Ship Channel?',
      a: "Houston is roughly an order of magnitude larger by plant count and value, but the Kanawha Valley packs concentrated specialty-chemical inspection in a narrow 30-mile corridor. The difference is materials chemistry: Houston is hydrocarbon-cracking dominant (ethylene, propylene, aromatics); the Kanawha Valley is specialty (polycarbonate, methyl methacrylate, chlor-alkali, titanium dioxide, fluoropolymers). That drives a different NDT mix — more stainless and exotic-alloy weld PT, more reactor and column liquid-penetrant for chloride and HF environments, less heavy-wall hydrotreater work. Salaries in the Kanawha Valley run 10-15% below Houston for equivalent roles but cost-of-living differences narrow the take-home gap.",
    },
    {
      q: 'Did Mountain Valley Pipeline change the WV NDT market?',
      a: "Mountain Valley Pipeline (Equitrans, 303 miles, 42-inch) was the largest single greenfield pipeline construction project in the eastern US for 2018-2024 and required thousands of inspector-hours of RT, PAUT, and visual weld inspection along the route from northwest WV to southern VA. The project's protracted permitting fights drove a stop-start construction tempo that complicated crew scheduling, but the cumulative inspection workload was material. Post-completion (2024), the line operates under PHMSA 49 CFR 192 with integrity-management requirements driving 5-7 year ILI tool runs and follow-up NDT verification. The project also catalyzed a generation of pipeline-construction inspectors who now staff Marcellus integrity-management work.",
    },
    {
      q: 'Is WV nuclear NDT work available?',
      a: "Not directly. West Virginia has no commercial nuclear power generation. Adjacent states host nuclear assets — Pennsylvania (Susquehanna, Limerick, TMI restart), Ohio (Davis-Besse, Perry), Virginia (North Anna, Surry), Tennessee (Watts Bar, Sequoyah), South Carolina (Catawba, V.C. Summer), and Maryland (Calvert Cliffs) — and WV-based inspectors who pursue ASME Section XI specialization typically work refueling outages across multiple plants on a national rotational basis. The Northrop Grumman Allegheny Ballistic Laboratory at Rocket Center does perform DOE-related NDT on solid rocket motor components, which carries a quasi-nuclear regulatory layer.",
    },
    {
      q: 'What is the long-term outlook for WV NDT employment?',
      a: "Steady with sector rotation. Upstream natural gas drilling pace fluctuates with prices but has settled into a ~30-50 rig plateau that sustains gathering-line construction at lower volumes than peak Marcellus years. Chemical-corridor inspection is dependent on continued operation of legacy plants — a closure cycle has played out gradually over decades but most major operators have committed to long-term operation through plant-life-extension projects. Coal-related inspection is in slow decline as coal-fired generation retires. The growth adjacencies are aerospace composite (Aurora Flight Sciences expansion) and Mountain Valley Pipeline integrity-management. Net effect: stable employment of 1,500-2,000 working NDT technicians and inspectors statewide through the decade.",
    },
    {
      q: 'Does WV require state-specific NDT certifications beyond ASNT?',
      a: "No state-administered NDT personnel certification exists. ASNT SNT-TC-1A and NAS 410 (for aerospace) are the recognized frameworks, with employer Written Practice. WV-specific requirements arise in two areas: (1) radiographic source licensing through WV Bureau of Public Health under 64 CSR Series 23, which requires industrial radiographer card endorsements analogous to NRC 10 CFR 34 — the state mirrors federal requirements; and (2) pipeline operator-qualification programs under PHMSA 49 CFR 192 Subpart N for personnel performing covered tasks on regulated pipelines, administered through ISN, NCMS, OQ Solutions, and similar OQ providers. Chemical-corridor operators (Bayer, Westlake, Dow/Trinseo) also run plant-specific badging and site-safety qualification.",
    },
  ],
  internalLinks: [
    { href: '/states/pa', label: 'Pennsylvania NDT market guide', context: 'PA shares the Marcellus-Utica contractor pool with WV.' },
    { href: '/states/oh', label: 'Ohio NDT market guide', context: 'Ohio Utica shale and refining mirror the WV chemical-corridor inspection mix.' },
    { href: '/states/ky', label: 'Kentucky NDT market guide', context: 'Marathon Catlettsburg refinery sits on the KY side of the Big Sandy River and draws WV crude and inspection crews.' },
    { href: '/methods/liquid-penetrant-testing', label: 'Liquid penetrant testing (PT)', context: 'PT is essential to specialty-chemical stainless and exotic-alloy weld inspection.' },
    { href: '/methods/radiographic-testing', label: 'Radiographic testing (RT)', context: 'Mountain Valley Pipeline construction was an RT volume anchor.' },
    { href: '/industries/chemicals', label: 'Chemical-plant NDT', context: 'The Kanawha Valley is the densest specialty-chemical inspection market in the eastern US.' },
    { href: '/industries/midstream-pipelines', label: 'Midstream pipeline NDT', context: 'Marcellus-Utica gathering converges through WV plants.' },
    { href: '/standards/asme-section-viii', label: 'ASME Section VIII Div 1 / Div 2', context: 'Section VIII governs the chemical-plant pressure vessel population.' },
    { href: '/standards/api-570', label: 'API 570 piping inspection code', context: 'API 570 drives the chemical-plant piping inspection cycle.' },
    { href: '/careers/charleston-wv', label: 'NDT careers in Charleston WV', context: 'Charleston is the Kanawha Valley corridor anchor.' },
    { href: '/cost-guide/charleston-wv/ut', label: 'Charleston UT cost guide', context: 'Chemical-corridor UT rates reflect the specialty-alloy material mix.' },
    { href: '/free-tools/calibration-reminder', label: 'Calibration reminder tool', context: 'Multi-customer chemical corridor work makes calibration tracking critical.' },
  ],
  citations: [
    { id: 'eia-wv-gas-2024', source: 'EIA Natural Gas Gross Withdrawals — West Virginia ~8 Bcf/d (2024)' },
    { id: 'wv-dep-air-45csr', source: 'WV DEP Division of Air Quality, 45 CSR' },
    { id: 'wv-code-22-6a', source: 'W. Va. Code 22-6A — Natural Gas Horizontal Well Control Act' },
    { id: 'phmsa-49cfr-wv', source: 'PHMSA 49 CFR 192 / 195 — applicable to interstate pipelines crossing WV' },
    { id: 'wv-bbcs-rad', source: 'WV Bureau of Public Health Radiologic Health 64 CSR Series 23' },
    { id: 'asme-viii-2023', source: 'ASME Boiler & Pressure Vessel Code Section VIII Div 1, 2023 ed.' },
    { id: 'api-570-2022', source: 'API 570 Piping Inspection Code, 5th ed., 2022' },
  ],
};

export default state;
