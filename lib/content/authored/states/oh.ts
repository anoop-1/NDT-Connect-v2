import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'oh',
  name: 'Ohio',
  abbreviation: 'OH',
  metaTitle: 'Ohio NDT Market Guide: Refining, Steel, Nuclear & Utica Shale',
  metaDescription:
    'Ohio runs the BP-Husky and PBF Toledo refineries, Marathon Petroleum HQ (Findlay), Cleveland-Cliffs steel, two nuclear units (Davis-Besse, Perry) and Utica shale. Salaries, regulators, top metros.',
  heroLede:
    "Ohio pairs a dense heavy-manufacturing and steel base with refining, two operating nuclear units and the Utica shale play — a broad NDT market that does not rise and fall with a single commodity. Toledo alone hosts two refineries (BP-Husky ~160,000 bpd and PBF Toledo ~170,000 bpd); Marathon Petroleum is headquartered in Findlay and runs the Canton refinery; Cleveland-Cliffs operates integrated steelmaking at Cleveland Works and (via Middletown) across the state. Two nuclear reactors run on Lake Erie — Davis-Besse near Oak Harbor and Perry near North Perry — both on 18-24 month refueling cycles that drive ASME Section XI inservice inspection. Eastern Ohio's Utica shale adds gathering, processing and NGL pipeline integrity work, and Columbus hosts the Edison Welding Institute (EWI), one of the most important applied-NDE and welding research centres in North America.",
  industryMix:
    "Refining is anchored by the two Toledo plants — BP-Husky Toledo Refinery and PBF Energy Toledo — plus Marathon's Canton refinery; Marathon Petroleum Corporation's corporate headquarters and Marathon Pipe Line LLC sit in Findlay, concentrating pipeline-integrity engineering in the northwest. Steel is a defining Ohio industry: Cleveland-Cliffs (Cleveland Works integrated mill, plus Middletown and Mansfield electrical-steel operations), U.S. Steel Lorain Tubular (OCTG), and a dense network of service centres and fabricators. Chemicals and polymers run through INEOS Lima, Lubrizol (Wickliffe/Painesville), and Sherwin-Williams. Nuclear power: Davis-Besse (894 MW PWR) and Perry (1,268 MW BWR), both operated by Vistra (formerly Energy Harbor). Utica shale gas and NGL production concentrates in the eastern counties (Belmont, Harrison, Carroll, Monroe), with midstream processing and the Rover and NEXUS interstate gas pipelines crossing the state. Aerospace and defense run through GE Aerospace (Evendale, near Cincinnati — one of the world's largest jet-engine plants), the Mansfield Lahm and Springfield Air National Guard bases, and a deep automotive supply base (Honda Marysville, Ford, GM). Power-gen, pulp, and food-processing add steady fixed-equipment inspection across Columbus, Dayton and Cincinnati.",
  topMetros: [
    { name: 'Cleveland', slug: 'cleveland-oh' },
    { name: 'Toledo', slug: 'toledo-oh' },
    { name: 'Columbus', slug: 'columbus-oh' },
    { name: 'Cincinnati', slug: 'cincinnati-oh' },
    { name: 'Findlay (Marathon HQ)', slug: 'findlay-oh' },
    { name: 'Lima', slug: 'lima-oh' },
  ],
  regulatoryNotes: [
    { id: 'ohio-epa', source: 'Ohio EPA Division of Air Pollution Control — refinery and chemical-plant air permits drive turnaround/inspection cadence', url: 'https://epa.ohio.gov/' },
    { id: 'ohio-dnr-oilgas', source: 'Ohio Department of Natural Resources, Division of Oil and Gas Resources Management — Utica well construction and integrity (OAC 1501:9)' },
    { id: 'puco-pipeline', source: 'Public Utilities Commission of Ohio (PUCO) Pipeline Safety — intrastate gas distribution and gathering' },
    { id: 'nrc-oh', source: 'NRC 10 CFR 50 / 50.55a — applies to Davis-Besse and Perry (incorporates ASME Section XI for nuclear ISI)' },
    { id: 'phmsa-oh', source: 'PHMSA 49 CFR 192/195 — Rover, NEXUS and interstate liquid pipelines crossing Ohio' },
  ],
  majorAssetOwners: [
    { name: 'BP-Husky Toledo Refinery', sector: 'Refining' },
    { name: 'PBF Energy (Toledo Refinery)', sector: 'Refining' },
    { name: 'Marathon Petroleum (Canton refinery; corporate HQ + Marathon Pipe Line, Findlay)', sector: 'Refining / Midstream' },
    { name: 'Cleveland-Cliffs (Cleveland Works, Middletown, Mansfield)', sector: 'Steel' },
    { name: 'U.S. Steel Tubular Operations (Lorain)', sector: 'Steel' },
    { name: 'INEOS (Lima chemicals)', sector: 'Petrochemical' },
    { name: 'Lubrizol (Wickliffe / Painesville)', sector: 'Chemicals' },
    { name: 'Vistra (Davis-Besse, Perry nuclear)', sector: 'Nuclear Power' },
    { name: 'GE Aerospace (Evendale)', sector: 'Aerospace' },
    { name: 'Utica shale operators (Encino, EAP Ohio, Ascent, Gulfport)', sector: 'Upstream' },
  ],
  methodDemand: [
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'Refinery turnaround thickness surveys at the Toledo plants and Canton; steel-mill plate and roll inspection; nuclear baseline UT.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'high', reason: 'Refinery occupied-unit corrosion mapping, Utica pipeline integrity, and nuclear ASME Section XI weld inspection.' },
    { method: 'Radiographic Testing (RT)', demandLevel: 'high', reason: 'Utica gathering and NEXUS/Rover transmission weld inspection; refinery fabrication.' },
    { method: 'Eddy Current Testing (ECT)', demandLevel: 'high', reason: 'Nuclear steam-generator/condenser tube inspection at Davis-Besse and Perry; heat-exchanger work at refineries and chemical plants.' },
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'high', reason: 'Steel-mill equipment, OCTG tubular inspection at Lorain, and structural weld inspection.' },
    { method: 'Liquid Penetrant Testing (PT)', demandLevel: 'medium', reason: 'GE Aerospace engine-component PT, stainless process piping, and nuclear stainless welds.' },
    { method: 'Visual Testing / CWI', demandLevel: 'high', reason: 'AWS CWI demand for pipeline and refinery construction plus ODOT bridge inspection.' },
    { method: 'Nuclear ASME Section XI ISI', demandLevel: 'medium', reason: 'Davis-Besse and Perry run 10-year ISI intervals with refueling-outage inspection surges.' },
  ],
  certificationAvailability:
    "Columbus is home to the Edison Welding Institute (EWI), a major applied welding and NDE research organisation, and Hobart Institute of Welding Technology (Troy) and the Lincoln Electric Welding Technology programs (nearby) feed the welding/CWI workforce. Terra State Community College (Fremont) and Owens Community College (Toledo) run NDT and welding programs that feed the Toledo refining cluster. Cuyahoga Community College (Cleveland) and Stark State (Canton) serve the steel and Marathon-Canton workforce. Sinclair (Dayton) and Cincinnati State feed GE Aerospace and the automotive supply base. Hellier NDT and Lavender International route satellite courses through Cleveland and Columbus. API ICP exams sit at Prometric centres in Columbus, Cleveland and Cincinnati; AWS CWI seminars run regularly in the major metros. Nuclear NDT qualification at Davis-Besse and Perry is administered by the operator under 10 CFR 50.55a-incorporated ASME Section XI. Radioactive-source licensing for industrial radiography is handled by the Ohio Department of Health Bureau of Radiation Protection (Ohio is an NRC Agreement State).",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 40000, high: 56000 },
    { role: 'Level II UT/MT/PT Technician', low: 58000, high: 92000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 82000, high: 125000 },
    { role: 'Level III NDT Engineer', low: 110000, high: 165000 },
    { role: 'API 510/570/653 Inspector', low: 88000, high: 138000 },
    { role: 'Nuclear ASME Section XI Inspector', low: 92000, high: 142000 },
    { role: 'NDT Field Supervisor', low: 88000, high: 132000 },
  ],
  hiringSeasons:
    "Refinery turnarounds at the two Toledo plants and Marathon Canton cluster spring (March-May) and fall (September-November). Nuclear refueling outages at Davis-Besse and Perry run on 18-24 month cycles, each drawing 100-200 ISI specialists for 25-45 days. Utica pipeline construction concentrates April-November. Steel-mill outages cluster mid-summer and December-January. GE Aerospace and automotive NDT runs year-round on production cadence rather than seasonal turnarounds.",
  faqs: [
    { q: 'Where is the NDT work concentrated in Ohio?', a: 'Three clusters dominate: Toledo (two refineries — BP-Husky and PBF — plus glass and auto), Cleveland-Lorain (Cleveland-Cliffs integrated steel and U.S. Steel Lorain tubular), and the Lake Erie nuclear units (Davis-Besse near Oak Harbor, Perry near North Perry). Findlay anchors pipeline-integrity engineering as Marathon Petroleum\'s HQ, and eastern Ohio adds Utica shale gathering and transmission work.' },
    { q: 'Is Ohio a good state for refinery inspectors?', a: 'Yes. Toledo is a genuine two-refinery town (BP-Husky ~160,000 bpd and PBF ~170,000 bpd) and Marathon runs Canton, so API 510/570/653 inspectors and UT/PAUT technicians have a stable turnaround calendar within a short drive. Findlay\'s Marathon HQ also concentrates corporate inspection and integrity-engineering roles.' },
    { q: 'How much nuclear NDT work is in Ohio?', a: 'Two operating units — Davis-Besse (894 MW PWR) and Perry (1,268 MW BWR) — run ASME Section XI inservice inspection on 10-year intervals with refueling-outage surges every 18-24 months. Each outage draws 100-200 ISI specialists (UT, PAUT, ECT, VT) for several weeks, so nuclear ISI is a real but cyclical part of the Ohio market.' },
    { q: 'What makes steel-mill NDT in Ohio different from oil and gas?', a: 'Primary steel inspection at Cleveland-Cliffs and U.S. Steel Lorain uses different methods and acceptance: thru-thickness UT for plate laminations to ASTM A435/A578, OCTG tubular UT/EMI on every joint to API 5CT, and surface eddy current on rolls. Specifications usually require ASNT Level III oversight under the mill\'s written practice, distinct from the API-code world of refining.' },
    { q: 'Does Utica shale drive much NDT in Ohio?', a: 'Yes, in the eastern counties (Belmont, Harrison, Carroll, Monroe). New-drilling pace has moderated, but gathering-system and transmission integrity work (RT and PAUT on welds, plus NEXUS and Rover interstate lines) provides a steady inspection floor independent of rig count.' },
  ],
  internalLinks: [
    { href: '/states/pa', label: 'Pennsylvania NDT market guide', context: 'Marcellus/Utica and steel share a contractor pool across the OH-PA line.' },
    { href: '/states/wv', label: 'West Virginia NDT market guide', context: 'The southern Utica tier and Ohio Valley chemicals overlap with WV.' },
    { href: '/states/mi', label: 'Michigan NDT market guide', context: 'Detroit-area refining and automotive mirror Ohio\'s manufacturing base.' },
    { href: '/methods/phased-array-ut', label: 'Phased array UT (PAUT)', context: 'PAUT is central to refinery corrosion mapping and Utica pipeline integrity.' },
    { href: '/methods/eddy-current-testing', label: 'Eddy current testing (ECT)', context: 'ECT is the workhorse for nuclear and heat-exchanger tube inspection.' },
    { href: '/industries/oil-and-gas', label: 'Oil & gas NDT inspection' },
    { href: '/standards/api-510', label: 'API 510 pressure-vessel inspection', context: 'Governs the Toledo and Canton refinery vessels.' },
    { href: '/careers/cleveland-oh', label: 'NDT careers in Cleveland' },
    { href: '/ndt-services/toledo-oh', label: 'NDT services & rates in Toledo' },
  ],
  citations: [
    { id: 'eia-oh-refining', source: 'EIA Refinery Capacity Report — Ohio (Toledo BP-Husky, PBF Toledo, Marathon Canton)', url: 'https://www.eia.gov/petroleum/refinerycapacity/' },
    { id: 'nrc-oh-units', source: 'NRC — Davis-Besse and Perry operating reactor information', url: 'https://www.nrc.gov/' },
    { id: 'ohio-dnr-utica', source: 'Ohio DNR Division of Oil and Gas Resources Management — Utica production reports' },
    { id: 'nrc-10cfr5055a', source: 'NRC 10 CFR 50.55a — incorporates ASME Section XI for nuclear inservice inspection' },
    { id: 'astm-a578', source: 'ASTM A578/A578M — Straight-Beam Ultrasonic Examination of Rolled Steel Plates' },
    { id: 'api-5ct', source: 'API 5CT — Casing and Tubing (OCTG inspection at Lorain)' },
  ],
};

export default state;
