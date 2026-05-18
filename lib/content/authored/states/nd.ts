import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'nd',
  name: 'North Dakota',
  abbreviation: 'ND',
  metaTitle: 'North Dakota NDT Market Guide: Bakken, Pipelines & Williston',
  metaDescription:
    'North Dakota produces 1.2 MMbpd from the Bakken shale, runs DAPL and Keystone tie-ins, and hosts the largest cold-weather upstream NDT market in the Lower 48. Salaries, regulators, top metros.',
  heroLede:
    "North Dakota produced an average 1.17 million barrels per day of crude oil in 2024 — the third-largest US producing state after Texas and New Mexico, per the North Dakota Industrial Commission. The Bakken-Three Forks shale play centered on Williams, McKenzie, Mountrail, and Dunn counties drove the state from 80,000 bpd in 2007 to a 2019 peak of 1.5 MMbpd, and back to a stable ~1.2 MMbpd plateau as core inventory matures and infill targets thicker pay zones. The North Dakota Pipeline Authority tracks more than 25,000 miles of gathering and transmission pipelines. The Dakota Access Pipeline (DAPL, 570,000 bpd takeaway) and the Keystone Pipeline (Hardisty AB to US Gulf Coast) anchor takeaway capacity. Winter operations dominate planning — Williston average January low is minus-2 F and minus-30 windchill is routine. Cold-weather upstream inspection know-how and high per-diem rates define this market.",
  industryMix:
    "Upstream Bakken-Three Forks is operated by Continental Resources (the largest operator, recently taken private), ConocoPhillips (acquired Concho 2021 with Bakken assets), Marathon Oil (acquired by ConocoPhillips 2024), Hess (in process of acquisition by Chevron), Whiting/Oasis (now Chord Energy after 2022 merger), Enerplus, and Devon Energy. Midstream gathering and processing: Hess Midstream, Targa Resources, Crestwood Equity Partners, ONEOK (Bear Creek complex), Bridger Pipeline, and Bakken Oil Express terminals (rail loading). Long-distance takeaway: Energy Transfer DAPL, TC Energy Keystone (Cushing-bound), Enbridge Bakken Pipeline System (north to Cromer MB, then south through the Mainline). Refining: Marathon Mandan (74,000 bpd), Dakota Prairie Refining (cold-stacked, the country's first new refinery in decades when it opened 2015 — closed 2017). Hess North Dakota gas-processing complex at Tioga (250 MMcfd plus NGL fractionation) is one of the largest gas plants in the upper Midwest. Coal: Coal Creek and Antelope Valley (Basin Electric), Falkirk, Coyote, Leland Olds — North Dakota is the second-largest US lignite-producing state, and Falkirk-Coal Creek alone supplies feed to a 1,150 MW power plant. Wind: ~4.6 GW installed (NEAT/Wind Vision 2023 data). Refining and coal-power inspection adds boiler/HRSG, baghouse, and ash-handling NDT to the upstream pipeline focus. Defense: Minot AFB (B-52H bombers, ICBM Minuteman III silos in 8th Air Force) and Grand Forks AFB (refueling and intelligence) add aerospace and structural NDT.",
  topMetros: [
    { name: 'Williston', slug: 'williston-nd' },
    { name: 'Dickinson', slug: 'dickinson-nd' },
    { name: 'Mandan / Bismarck', slug: 'mandan-nd' },
    { name: 'Fargo', slug: 'fargo-nd' },
  ],
  regulatoryNotes: [
    { id: 'ndic-oil-gas', source: 'North Dakota Industrial Commission, Oil and Gas Division (NDAC Title 43) — well construction, integrity testing, production reporting', url: 'https://www.dmr.nd.gov/oilgas/' },
    { id: 'ndic-pipeline', source: 'NDIC Pipeline Authority — intrastate gathering and transmission oversight' },
    { id: 'ndpsc-pipeline', source: 'North Dakota Public Service Commission — siting, safety, and routing oversight for gas and hazardous liquid pipelines under NDCC 49-22' },
    { id: 'ndeq-air', source: 'North Dakota Department of Environmental Quality (NDDEQ), NDAC Title 33-15 — Air Quality (covers refinery and gas-plant LDAR)' },
    { id: 'phmsa-nd', source: 'PHMSA 49 CFR 192/195 — DAPL, Keystone, and Enbridge mainlines crossing ND' },
  ],
  majorAssetOwners: [
    { name: 'Continental Resources (Bakken operator)', sector: 'Upstream' },
    { name: 'ConocoPhillips / Marathon Oil (post-merger)', sector: 'Upstream' },
    { name: 'Chord Energy (Whiting + Oasis merger)', sector: 'Upstream' },
    { name: 'Hess Corporation (Bakken upstream and midstream)', sector: 'Upstream / Midstream' },
    { name: 'Energy Transfer (Dakota Access Pipeline)', sector: 'Midstream' },
    { name: 'TC Energy (Keystone Pipeline)', sector: 'Midstream' },
    { name: 'Enbridge (Bakken Pipeline System, Mainline)', sector: 'Midstream' },
    { name: 'ONEOK (Bear Creek gas processing)', sector: 'Midstream' },
    { name: 'Marathon Petroleum (Mandan refinery)', sector: 'Refining' },
    { name: 'Basin Electric Power Cooperative (Antelope Valley, Coal Creek)', sector: 'Power Generation' },
    { name: 'Minot AFB (B-52H, Minuteman III)', sector: 'Aerospace / Defense' },
    { name: 'Grand Forks AFB', sector: 'Aerospace / Defense' },
  ],
  methodDemand: [
    { method: 'Radiographic Testing (RT)', demandLevel: 'high', reason: 'Gathering and transmission pipeline weld inspection at every new well-pad-to-trunkline tie-in. Bakken still adds 800-1,500 new wells per year, each with several thousand feet of new gathering line.' },
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'high', reason: 'Drilling rig and workover-equipment inspection (BOP, top drives, drill pipe). Hundreds of active rigs and workover units cycle through Williston and Dickinson yards.' },
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'Gathering line thickness surveys, gas-plant heat-exchanger inspection, refinery UT at Marathon Mandan, and tank inspection at terminal-rail loading complexes.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'medium', reason: 'Pipeline integrity-management dig verification and refinery turnaround corrosion mapping; demand growing as Mega-Rule implementation expands.' },
    { method: 'API 653 Tank Inspection', demandLevel: 'high', reason: 'Bakken Oil Express, Stampede Crude Terminal, Hess Tioga, ONEOK Bear Creek, and Marathon Mandan tankage all on API 653 cycles.' },
    { method: 'In-Line Inspection (ILI) Support', demandLevel: 'medium', reason: 'DAPL, Keystone, and Enbridge mainline ILI tool runs require follow-up NDT verification at integrity-management dig sites.' },
    { method: 'Aerospace FPI / ECT', demandLevel: 'medium', reason: 'Minot AFB B-52 fleet maintenance and Grand Forks AFB tanker work require NAS 410 personnel.' },
    { method: 'Drone / Visual Inspection', demandLevel: 'medium', reason: 'Flare-stack inspection, gas-plant column visual, and wind turbine blade inspection (~4.6 GW installed).' },
  ],
  certificationAvailability:
    "Bismarck State College and Williston State College run NDT certificate and welding programs feeding the Bakken contractor pipeline. Dakota College at Bottineau runs a process operations program supporting the gas-plant workforce. North Dakota State College of Science (Wahpeton) feeds aerospace and structural inspection. Most working Bakken Level II techs arrive with credentials from Texas, Oklahoma, or Montana and convert via employer Written Practice. API ICP exams administered at Prometric Bismarck and Fargo. Radiographic source licensing is administered by NDDEQ Radiation Control under NDAC 33-10; North Dakota is a Section 274b agreement state. AWS CWI seminars run quarterly in Fargo and Bismarck. Minot AFB and Grand Forks AFB operate internal Air Force NDT training facilities.",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 40000, high: 56000 },
    { role: 'Level II UT/MT/PT Technician', low: 68000, high: 105000 },
    { role: 'Level II Pipeline RT Specialist', low: 72000, high: 112000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 88000, high: 138000 },
    { role: 'Level III NDT Engineer', low: 115000, high: 175000 },
    { role: 'API 653 Tank Inspector', low: 88000, high: 135000 },
    { role: 'NDT Field Supervisor', low: 95000, high: 145000 },
  ],
  hiringSeasons:
    "Bakken pipeline construction concentrates in the late-spring through fall thaw window — frost depth of 4-6 feet keeps gathering-line trenching to May-October for most projects. Drilling rig count fluctuates with WTI price but tends to ramp in late winter ahead of the spring construction season. Refining turnaround at Mandan clusters around catalyst cycles, typically March-May and September-October. Gas-plant turnarounds at Hess Tioga and ONEOK Bear Creek run on multi-year cycles. Aerospace NDT at Minot and Grand Forks AFB is steady-state with occasional fleet retrofit surges. Per-diem rates rise sharply from December through February when crews willing to work outdoors at minus-20 F become scarce.",
  faqs: [
    {
      q: 'How do North Dakota NDT salaries compare to Texas?',
      a: "Base rates for Level II techs run 5-10% above Houston equivalents, with per-diem rates of $80-$150/day during peak construction season and cold-weather premiums of an additional $10-$25/day during the December-February window. Total annual comp for a Bakken pipeline RT or PAUT tech on a 14/14 rotation or extended-stint schedule commonly runs $110,000-$150,000 — comparable to Houston with overtime. Trade-offs: extreme weather, distance from major metros (Williston is a 4+ hour drive from Bismarck and 7 hours from Minneapolis), limited social infrastructure for short-term workers, and a higher proportion of contracted (1099) work than W-2 staffing in the Gulf Coast.",
    },
    {
      q: 'Why is gathering-line RT volume so high in the Bakken?',
      a: "Bakken-Three Forks development requires substantial gathering infrastructure: each new well pad needs crude gathering, gas gathering, water gathering, and sometimes NGL gathering, often 3-8 miles of new pipe to tie into a central battery and then to a transmission trunk. With 800-1,500 new wells per year (down from 2,400+ at peak but still significant), gathering-line construction alone drives tens of thousands of weld inspection joints annually. ASME B31.4 (liquid) and B31.8 (gas) acceptance criteria apply, and PHMSA 49 CFR 192/195 personnel qualification (OQ) requirements add a layer of operator-specific qualification on top of ASNT Level II credentials. Pipeline RT specialists are the single largest job-category for working Bakken NDT techs.",
    },
    {
      q: 'What does cold-weather NDT operation involve in North Dakota?',
      a: "Procedure adaptations beyond Lower-48 norms. Ultrasonic couplant: cold-rated couplant (specialty silicone or glycol-based) extends UT operation to minus-20 F; standard gel couplant freezes at roughly 28 F. Radiographic film and IP plates require heated source enclosures below zero F; modern CR/DR imaging plates have a much wider operating range. Battery performance halves at minus-20 F — instrument battery cycling becomes part of the work plan. Personnel PPE includes insulated coveralls and face protection that affect probe handling, with mandatory warming-shelter cycles every 30-45 minutes at extreme cold. Inspection scope frequently shifts to indoor or shop-stage work (refinery turnaround at Mandan, gas-plant turnaround at Tioga) during the December-February window when outdoor pipeline work becomes impractical.",
    },
    {
      q: 'Is the Dakota Access Pipeline still driving NDT work?',
      a: "Yes, ongoing. The DAPL operates under 49 CFR 195 with a 10-year hydrostatic test recurrence by default and integrity-management ILI cycles for high-consequence areas. Energy Transfer (operator) runs MFL and crack-detection ILI on a 5-7 year cadence per HCA segment, generating 100-400 follow-up dig sites per cycle that require PAUT corrosion mapping and crack characterization. The pending North Dakota state court litigation around the Lake Oahe crossing easement affects future capacity expansion but does not change near-term integrity-management workload. DAPL operator Energy Transfer also runs ETCOP, Pony Express, and the Bayou Bridge tie-ins that share crew dependence with DAPL.",
    },
    {
      q: 'What\'s the long-term outlook for North Dakota NDT employment?',
      a: "Bakken production has plateaued in the 1.1-1.3 MMbpd range and is widely expected to remain on that plateau through the late 2020s before slow decline as core inventory drains. New-well drilling will slow but integrity-management work on the installed 25,000+ miles of pipeline will continue indefinitely. Refining (Marathon Mandan) and coal-power (Basin Electric) provide steady non-upstream work. Wind energy installation is the growth adjacency. The state's NDT employment is unlikely to grow significantly from current levels but is also unlikely to contract sharply — the regulatory framework (PHMSA integrity management, NDIC well integrity rules, API 653 tank cycles) sustains a stable inspection floor regardless of new-drilling pace.",
    },
  ],
  internalLinks: [
    { href: '/states/mt', label: 'Montana NDT market guide', context: 'Montana hosts the western flank of the Bakken plus Billings refining — crews shuttle weekly between Williston and Billings during peak season.' },
    { href: '/states/wy', label: 'Wyoming NDT market guide', context: 'Wyoming Powder River Basin and DJ Basin upstream share contractor pools with the Bakken.' },
    { href: '/states/ak', label: 'Alaska NDT market guide', context: 'Cold-weather pipeline and upstream procedures share much in common with Alaska North Slope work.' },
    { href: '/methods/radiographic-testing', label: 'Radiographic testing (RT)', context: 'Pipeline RT is the largest single Bakken NDT line item.' },
    { href: '/methods/in-line-inspection', label: 'In-line inspection (ILI) support', context: 'DAPL and Keystone integrity-management cycles drive continuous ILI verification NDT.' },
    { href: '/industries/upstream-oil-gas', label: 'Upstream oil & gas NDT', context: 'The Bakken is the third-largest US upstream play and the densest gathering-line construction market.' },
    { href: '/industries/midstream-pipelines', label: 'Midstream pipeline NDT', context: 'Bakken takeaway is dominated by three trunk pipelines plus rail loading.' },
    { href: '/standards/phmsa-49cfr192', label: 'PHMSA 49 CFR 192 / 195 pipeline safety', context: 'PHMSA 49 CFR 192/195 governs every transmission pipeline crossing North Dakota.' },
    { href: '/standards/asme-b31-4', label: 'ASME B31.4 liquid pipeline transportation', context: 'B31.4 is the design and inspection code for hazardous liquid pipelines in the Bakken takeaway system.' },
    { href: '/careers/williston-nd', label: 'NDT careers in Williston', context: 'Williston is the operational center of the Bakken NDT market.' },
    { href: '/cost-guide/williston-nd/rt', label: 'Williston pipeline RT cost guide', context: 'Pipeline RT rates rise sharply during peak construction season.' },
    { href: '/free-tools/calibration-reminder', label: 'Calibration reminder tool', context: 'Remote sites and rotational schedules make calibration tracking critical.' },
  ],
  citations: [
    { id: 'ndic-2024', source: 'North Dakota Industrial Commission Oil and Gas Division — production statistics 2024', url: 'https://www.dmr.nd.gov/oilgas/' },
    { id: 'eia-nd-2024', source: 'EIA Crude Oil Production by State — North Dakota 2024 (~1.17 MMbpd)' },
    { id: 'phmsa-49cfr195-452', source: 'PHMSA 49 CFR 195.452 — Pipeline Integrity Management in High Consequence Areas' },
    { id: 'ndpsc-pipeline', source: 'North Dakota Public Service Commission, NDCC 49-22 — Energy Conversion and Transmission Facility Siting Act' },
    { id: 'ndeq-rad', source: 'NDDEQ Radiation Control, NDAC 33-10 — Radioactive Materials Licensing' },
    { id: 'api-653-2014', source: 'API 653 Tank Inspection, Repair, Alteration, and Reconstruction, 5th ed., 2014' },
    { id: 'asme-b31-4-2022', source: 'ASME B31.4 Pipeline Transportation Systems for Liquids and Slurries, 2022 ed.' },
  ],
};

export default state;
