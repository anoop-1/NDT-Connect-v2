import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'pa',
  name: 'Pennsylvania',
  abbreviation: 'PA',
  metaTitle: 'Pennsylvania NDT Market Guide: Marcellus, Refining & Nuclear',
  metaDescription:
    'Pennsylvania anchors Marcellus shale gas (~21 Bcf/d), runs 3 active refineries, hosts 4 operating nuclear units, and the Mariner East NGL system. Salaries, regulators, top metros.',
  heroLede:
    "Pennsylvania produced about 21 billion cubic feet per day of natural gas in 2024 — the second-largest US producing state after Texas, per the EIA — anchored by the Marcellus and Utica shale formations across the northeast and southwest tiers. The state hosts four operating nuclear reactors at Susquehanna (two units, Talen Energy) and Limerick (two units, Constellation), plus the recently announced Three Mile Island Unit 1 restart (Constellation, targeting 2028 service back to grid for Microsoft data-center demand) that will revive ASME Section XI inspection work after years of decommissioning. Three refineries operate today (United Refining Warren 70,000 bpd, Monroe Energy Trainer 190,000 bpd, Hilcorp Marcus Hook NGL fractionator — note Philadelphia Energy Solutions closed permanently after the June 2019 fire). The Mariner East 1 and 2 NGL pipeline system, Sunoco Logistics' Marcus Hook export terminal, and a dense network of gathering and transmission pipelines drive year-round NDT.",
  industryMix:
    "Marcellus and Utica upstream is operated by EQT Corporation (the largest US natural gas producer, HQ Pittsburgh), CNX Resources (HQ Canonsburg), Range Resources (HQ Fort Worth but PA-heavy ops), Coterra Energy, Antero, Chesapeake (merged into Expand Energy 2024), and Olympus Energy. Midstream gas gathering, processing, and NGL takeaway is dominated by MarkWest (MPLX), Williams (Transco Mainline, Atlantic Sunrise), Energy Transfer (Mariner East, ETC Northeast Gathering), Enbridge (Tetco Mainline), and Sunoco Logistics. Marcus Hook Industrial Complex is the export anchor for Marcellus NGLs — ethane to global petrochem markets via VLEC carriers. Refining is anchored by Monroe Energy Trainer (190,000 bpd, owned by Delta Air Lines as jet-fuel hedge), United Refining Warren (70,000 bpd), and the Hilcorp Marcus Hook NGL fractionator. PES Philadelphia (335,000 bpd peak) closed permanently in 2019 after a major hydrofluoric acid release; the site is undergoing redevelopment. Nuclear: Susquehanna 1 and 2 (1,257 MW each, Talen), Limerick 1 and 2 (1,134 MW each, Constellation), plus TMI Unit 1 restart targeted 2028 (835 MW). Steel: U.S. Steel Mon Valley Works (Edgar Thomson, Irvin, Clairton coke), ATI Specialty Steel (Brackenridge), and Cleveland-Cliffs Steelton add primary steel NDT (ladles, rolling-mill rolls, electric arc furnace shells). Defense: Letterkenny Army Depot (Chambersburg), Naval Surface Warfare Center Philadelphia, and Tobyhanna Army Depot drive a steady aerospace and structural NDT load. Pittsburgh hosts Westinghouse (commercial nuclear technology) and Cranberry-area Eaton/Curtiss-Wright suppliers serving nuclear and aerospace.",
  topMetros: [
    { name: 'Pittsburgh', slug: 'pittsburgh-pa' },
    { name: 'Philadelphia', slug: 'philadelphia-pa' },
    { name: 'Erie', slug: 'erie-pa' },
    { name: 'Monroeville (Westinghouse, Mylan)', slug: 'monroeville-pa' },
  ],
  regulatoryNotes: [
    { id: 'pa-dep-air', source: 'Pennsylvania Department of Environmental Protection, 25 Pa. Code Chapter 121-145 — Air Quality (drives refinery and gas-plant inspection cadence)', url: 'https://www.dep.pa.gov/' },
    { id: 'pa-dep-oil-gas', source: 'PA DEP Bureau of Oil and Gas Planning and Program Management — 25 Pa. Code Chapter 78a (well construction, integrity, gathering)' },
    { id: 'pa-puc-pipeline', source: 'Pennsylvania Public Utility Commission Pipeline Safety Section — intrastate gas distribution and Class 1 hazardous liquid (52 Pa. Code Chapter 59)' },
    { id: 'nrc-pa', source: 'NRC 10 CFR 50 / 10 CFR 26 / 10 CFR 50.55a — applies to Susquehanna, Limerick, and TMI Unit 1 (restart)' },
    { id: 'phmsa-pa', source: 'PHMSA 49 CFR 192/195 — interstate gas (Transco, Atlantic Sunrise, Tetco) and liquid (Mariner East 1/2) pipelines crossing PA' },
  ],
  majorAssetOwners: [
    { name: 'EQT Corporation (largest US natural gas producer, HQ Pittsburgh)', sector: 'Upstream' },
    { name: 'CNX Resources (HQ Canonsburg)', sector: 'Upstream' },
    { name: 'Range Resources', sector: 'Upstream' },
    { name: 'Williams (Transco Mainline, Atlantic Sunrise expansion)', sector: 'Midstream' },
    { name: 'Energy Transfer (Mariner East 1 / Mariner East 2 NGL system)', sector: 'Midstream' },
    { name: 'MPLX / MarkWest (Marcellus NGL processing)', sector: 'Midstream' },
    { name: 'Sunoco Logistics (Marcus Hook Industrial Complex)', sector: 'Midstream / Terminal' },
    { name: 'Monroe Energy (Trainer refinery, Delta Air Lines subsidiary)', sector: 'Refining' },
    { name: 'United Refining Company (Warren)', sector: 'Refining' },
    { name: 'Talen Energy (Susquehanna nuclear)', sector: 'Nuclear Power' },
    { name: 'Constellation Energy (Limerick, TMI Unit 1 restart)', sector: 'Nuclear Power' },
    { name: 'U.S. Steel (Mon Valley Works)', sector: 'Steel' },
    { name: 'Westinghouse Electric Company (Monroeville HQ)', sector: 'Nuclear / Industrial' },
  ],
  methodDemand: [
    { method: 'Radiographic Testing (RT)', demandLevel: 'high', reason: 'Marcellus gathering and transmission pipeline weld inspection; refining greenfield piping fabrication.' },
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'Gas plant heat exchangers, refinery turnaround thickness surveys, primary-steel ladle and roll inspection, nuclear ISI baseline.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'high', reason: 'Mariner East pipeline integrity verification, refinery occupied-unit corrosion mapping, nuclear ASME Section XI weld inspection.' },
    { method: 'Nuclear ASME Section XI ISI', demandLevel: 'high', reason: 'Susquehanna, Limerick, and the upcoming TMI Unit 1 restart all run 10-year ISI intervals with periodic refueling outage inspection — PA hosts roughly 5-8% of US commercial nuclear ISI demand.' },
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'medium', reason: 'Steel mill equipment, refinery weld inspection, drilling-rig and workover-equipment inspection.' },
    { method: 'Eddy Current Testing (ECT)', demandLevel: 'high', reason: 'Nuclear steam-generator and condenser tube inspection during refueling outages; heat-exchanger inspection at refineries and gas plants.' },
    { method: 'Liquid Penetrant Testing (PT)', demandLevel: 'medium', reason: 'Nuclear stainless-weld inspection, refining austenitic-stainless piping, and aerospace component PT at Erie and Philadelphia suppliers.' },
    { method: 'Visual Testing / CWI', demandLevel: 'high', reason: 'AWS CWI demand for pipeline and refinery construction plus state bridge inspection (PennDOT bridge program is one of the largest in the US).' },
  ],
  certificationAvailability:
    "Pennsylvania College of Technology (Williamsport) runs one of the most respected NDT and welding technology programs in the country, feeding both the Marcellus and the Marcus Hook NGL workforce. Community College of Allegheny County (CCAC, Pittsburgh) and Community College of Philadelphia run NDT certificate programs. Westmoreland County Community College feeds the Mon Valley steel and gas-plant pipeline. Hellier NDT and Lavender International route satellite courses through Pittsburgh and Philadelphia. Penn State Behrend (Erie) and Penn State University Park feed Level III and engineering NDT roles. The Bechtel Bettis Atomic Power Laboratory and Knolls Atomic Power Laboratory operate in PA-adjacent NY/CT for Naval Reactors — adding a specialized nuclear NDT workforce. NRC NDT personnel qualification is administered by the nuclear operators under 10 CFR 50.55a-incorporated ASME Section XI. API ICP exams at Prometric Pittsburgh and Philadelphia. AWS CWI seminars run monthly in both metros. Radioactive source licensing is administered by PA DEP Bureau of Radiation Protection under 25 Pa. Code Chapter 217-242; PA is a Section 274b agreement state.",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 42000, high: 58000 },
    { role: 'Level II UT/MT/PT Technician', low: 62000, high: 95000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 85000, high: 130000 },
    { role: 'Level III NDT Engineer', low: 115000, high: 170000 },
    { role: 'Nuclear ASME Section XI Inspector', low: 95000, high: 145000 },
    { role: 'API 510/570/653 Inspector', low: 90000, high: 140000 },
    { role: 'NDT Field Supervisor', low: 90000, high: 135000 },
  ],
  hiringSeasons:
    "Marcellus pipeline construction concentrates April through November (post-thaw to pre-freeze). Refining turnaround at Trainer and Warren clusters spring and fall. Nuclear refueling outages at Susquehanna and Limerick run on 18-24 month cycles per unit, with each outage drawing 100-200 ISI specialist headcount for 25-45 days — the schedule is a published industry calendar and outage staffing is the single largest hiring event in PA nuclear inspection. TMI Unit 1 restart construction (2025-2028) will drive sustained inspection workforce demand. Steel mill outages cluster around July (summer demand low) and December-January (holiday).",
  faqs: [
    {
      q: 'How does Pennsylvania nuclear NDT pay compare to refining?',
      a: "Nuclear ISI specialists with ASME Section XI Level II qualifications (UT, PAUT, ECT, VT) command outage-cycle premiums that put 6-week assignments in the $20,000-$40,000 range for senior techs. Annualized, a working nuclear ISI inspector covering 4-6 refueling outages per year (rotating between Susquehanna, Limerick, Beaver Valley, and other US plants) typically clears $110,000-$165,000. Refining inspectors on similar workload run $90,000-$140,000. The trade-off: nuclear work requires significantly more documentation, an unescorted-access clearance, and a 10 CFR 26 fitness-for-duty program that includes random drug and alcohol testing. Career-progression positive: nuclear ISI is a portable specialty with national demand.",
    },
    {
      q: 'What does the Three Mile Island Unit 1 restart mean for NDT hiring?',
      a: "Constellation announced in 2024 a power purchase agreement with Microsoft to restart TMI Unit 1 (Pressurized Water Reactor, 835 MW) targeting 2028 service. The restart requires extensive ASME Section XI baseline inspection of all Class 1, 2, and 3 piping, reactor pressure vessel inspection (RPV head and core internals), steam generator tube ECT inspection, and replacement-component verification. Pre-restart inspection workforce demand: estimated 80-150 specialist headcount across the 2025-2028 construction and commissioning window. Long-term operating workforce: 25-50 ISI specialists at the site plus contracted refueling-outage surge. The restart is creating fresh demand for ASME Section XI Level II UT and PAUT qualifications in a specialty area that had been contracting for two decades.",
    },
    {
      q: 'Is the Marcellus shale slowing down for NDT?',
      a: "Drilling pace has slowed from peak (the 2014 peak was over 80 rigs; mid-2020s pace is 30-50 rigs) but does not equate to a slowing inspection market. Gathering and transmission integrity-management work continues regardless of new-drilling pace. Atlantic Sunrise (Williams), MVP (Equitrans, completed 2024), and ME2X (Mariner East NGL system expansions) drove sustained construction inspection through 2024. Going forward, integrity-management on 30,000+ miles of installed pipeline, Marcus Hook export expansion, and Marcellus-to-LNG export tie-in projects will keep a stable inspection floor through the late 2020s.",
    },
    {
      q: 'How tough is U.S. Steel Mon Valley Works as an NDT customer?',
      a: "Primary steel inspection is unlike oil-and-gas inspection in material, defect mechanisms, and required certifications. Continuous-cast slab inspection requires ultrasonic immersion or angle-beam to ASTM A578 acceptance. Hot-rolled plate and coil require thru-thickness UT to detect mid-thickness laminations under ASTM A435 or A578 Level S2. Ladle and tundish refractory inspection uses thermographic and visual methods. Roll inspection at hot- and cold-mill stands uses surface eddy current and UT. Specifications often require ASNT NDT Level III oversight per the customer's Written Practice, plus AWS D1.1 weld inspection for structural welds. The Mon Valley operations (Edgar Thomson, Irvin, Clairton coke) employ a hybrid of internal NDT departments and contracted services from regional firms.",
    },
    {
      q: 'What unique inspection demand does Marcus Hook Industrial Complex create?',
      a: "Marcus Hook (Sunoco Logistics, Energy Transfer subsidiary) is the export terminal for Marcellus-sourced ethane, propane, and butane via VLEC (Very Large Ethane Carrier) and LPG carriers. Inspection scope includes: refrigerated storage tanks (ethane at minus-127 F, propane at minus-44 F) under API 620 with low-temperature acceptance criteria, cryogenic process piping under ASME B31.3 with stainless-steel acceptance, marine loading arms and metering skids, and the legacy refinery infrastructure converted to NGL service. PAUT, RT, and PT all see continuous demand. The ethylene-export expansion (ME2X) added new cryogenic spheres that drove significant 2022-2024 weld inspection. Sunoco/ET runs strict pre-qualification and operator-qualified (OQ) personnel requirements layered on top of ASNT Level II credentials.",
    },
  ],
  internalLinks: [
    { href: '/states/wv', label: 'West Virginia NDT market guide', context: 'West Virginia hosts the Marcellus-Utica southern tier and Bayer/Chemours chemical operations — shared contractor pool with PA.' },
    { href: '/states/oh', label: 'Ohio NDT market guide', context: 'Ohio Utica shale, refining (Marathon Canton, BP Toledo), and steel mirror the PA mix.' },
    { href: '/states/ny', label: 'New York NDT market guide', context: 'NY upstate manufacturing and grid infrastructure shares contractor crews with northwest PA.' },
    { href: '/methods/phased-array-ut', label: 'Phased array UT (PAUT)', context: 'PAUT is central to Marcellus pipeline integrity verification.' },
    { href: '/methods/eddy-current-testing', label: 'Eddy current testing (ECT)', context: 'ECT is the workhorse method for nuclear steam-generator tube inspection.' },
    { href: '/industries/nuclear', label: 'Nuclear power NDT inspection', context: 'PA hosts four operating reactors plus the TMI Unit 1 restart.' },
    { href: '/industries/midstream-pipelines', label: 'Midstream pipeline NDT', context: 'Marcellus is the second-largest US gas-producing region and the densest gathering network east of the Mississippi.' },
    { href: '/standards/asme-section-xi', label: 'ASME Section XI nuclear ISI', context: 'Section XI governs all PA commercial nuclear inservice inspection.' },
    { href: '/standards/api-570', label: 'API 570 piping inspection code', context: 'API 570 governs refinery piping at Trainer and Warren.' },
    { href: '/careers/pittsburgh-pa', label: 'NDT careers in Pittsburgh', context: 'Pittsburgh is the corporate HQ density anchor for Marcellus upstream.' },
    { href: '/cost-guide/pittsburgh-pa/paut', label: 'Pittsburgh PAUT cost guide', context: 'PAUT rates in western PA track 8-12% below Gulf Coast equivalents.' },
    { href: '/free-tools/certificate-manager', label: 'Certification expiry tracker', context: 'ASNT and ASME Section XI certifications have different renewal cycles — both matter in PA.' },
  ],
  citations: [
    { id: 'eia-pa-gas-2024', source: 'EIA Natural Gas Gross Withdrawals by State — Pennsylvania ~21 Bcf/d (2024)', url: 'https://www.eia.gov/dnav/ng/' },
    { id: 'pa-dep-78a', source: 'PA DEP 25 Pa. Code Chapter 78a — Unconventional Wells', url: 'https://www.dep.pa.gov/' },
    { id: 'pa-puc-pipeline', source: 'PA PUC Pipeline Safety Section 52 Pa. Code Chapter 59' },
    { id: 'nrc-10cfr50-55a', source: 'NRC 10 CFR 50.55a — Codes and Standards (incorporates ASME Section XI for nuclear ISI)' },
    { id: 'pa-dep-rad', source: 'PA DEP Bureau of Radiation Protection, 25 Pa. Code Chapters 217-242' },
    { id: 'asme-xi-2021', source: 'ASME Boiler & Pressure Vessel Code Section XI, 2021 ed.' },
    { id: 'api-510-2022', source: 'API 510 Pressure Vessel Inspection Code, 11th ed., 2022' },
    { id: 'astm-a578', source: 'ASTM A578/A578M — Straight-Beam Ultrasonic Examination of Rolled Steel Plates' },
  ],
};

export default state;
