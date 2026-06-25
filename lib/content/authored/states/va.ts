import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'va',
  name: 'Virginia',
  abbreviation: 'VA',
  metaTitle: 'Virginia NDT Market Guide: Naval Shipbuilding, Nuclear & Aerospace',
  metaDescription:
    'Virginia NDT is driven by Newport News Shipbuilding (nuclear carriers & subs), Norfolk Naval Shipyard, Dominion nuclear (North Anna, Surry), and NASA Langley aerospace. Salaries, regulators, metros.',
  heroLede:
    "Virginia's NDT market is anchored by the largest naval shipbuilding complex in the United States. HII Newport News Shipbuilding is the sole designer/builder of US aircraft carriers and one of two yards building nuclear submarines — work governed by NAVSEA technical requirements and demanding the most rigorous UT, RT, PT, MT and PAUT in the country. Norfolk Naval Shipyard (Portsmouth) adds nuclear-vessel overhaul. Dominion Energy runs four reactors — North Anna (two units) and Surry (two units) — on ASME Section XI inservice inspection. NASA Langley (Hampton) plus a deep aerospace and defense supplier base drive NAS 410 aerospace NDT, and the Port of Virginia adds marine and structural inspection. There are no oil refineries, so the mix is marine/nuclear/aerospace rather than refining.",
  industryMix:
    "Naval shipbuilding and ship repair dominate Hampton Roads: HII Newport News Shipbuilding (aircraft carriers and Virginia/Columbia-class submarines — the largest industrial employer in Virginia), Norfolk Naval Shipyard (nuclear overhaul/refueling), and BAE Systems Norfolk Ship Repair. Nuclear power: Dominion Energy's North Anna (two PWR units, Louisa County) and Surry (two PWR units, Surry County) run ASME Section XI ISI with refueling outages, and Dominion has pursued small-modular-reactor study at North Anna. Aerospace and defense: NASA Langley Research Center (Hampton), Rolls-Royce Crosspointe (Prince George — jet-engine discs), and a broad DoD supplier base across Northern Virginia. The Port of Virginia (Norfolk/Portsmouth) is one of the largest US East Coast container ports, adding crane, structural and marine inspection. Manufacturing and pulp/paper (WestRock, Covington) plus data-center construction (Loudoun County, the world's largest data-center cluster) round out structural and weld NDT. No petroleum refineries operate in the state.",
  topMetros: [
    { name: 'Newport News (HII Shipbuilding)', slug: 'newport-news-va' },
    { name: 'Norfolk (Navy, port)', slug: 'norfolk-va' },
    { name: 'Richmond', slug: 'richmond-va' },
    { name: 'Lynchburg (BWXT, Framatome)', slug: 'lynchburg-va' },
    { name: 'Portsmouth (Naval Shipyard)', slug: 'portsmouth-va' },
  ],
  regulatoryNotes: [
    { id: 'navsea', source: 'NAVSEA technical requirements (T9074 series, NAVSEA 250-1500) — govern naval shipbuilding & nuclear-vessel NDT', url: 'https://www.navsea.navy.mil/' },
    { id: 'nrc-va', source: 'NRC 10 CFR 50 / 50.55a — North Anna and Surry (incorporates ASME Section XI)' },
    { id: 'vdh-radiation', source: 'Virginia Department of Health Office of Radiological Health — industrial radiography licensing (Virginia is an NRC Agreement State)' },
    { id: 'nas-410', source: 'NAS 410 / Nadcap — aerospace NDT personnel qualification (Rolls-Royce, NASA suppliers)' },
    { id: 'deq-va', source: 'Virginia DEQ — air/industrial permits for pulp, manufacturing and power' },
  ],
  majorAssetOwners: [
    { name: 'HII Newport News Shipbuilding', sector: 'Naval Shipbuilding' },
    { name: 'Norfolk Naval Shipyard', sector: 'Navy / Ship Repair' },
    { name: 'BAE Systems Norfolk Ship Repair', sector: 'Ship Repair' },
    { name: 'Dominion Energy (North Anna, Surry nuclear)', sector: 'Nuclear Power' },
    { name: 'BWXT / Framatome (Lynchburg — nuclear components & fuel)', sector: 'Nuclear / Manufacturing' },
    { name: 'NASA Langley Research Center', sector: 'Aerospace' },
    { name: 'Rolls-Royce Crosspointe (Prince George)', sector: 'Aerospace' },
    { name: 'The Port of Virginia', sector: 'Marine / Port' },
  ],
  methodDemand: [
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'Naval hull/weld UT thickness and volumetric exams at Newport News and Norfolk; nuclear baseline; engine-disc UT.' },
    { method: 'Radiographic Testing (RT)', demandLevel: 'high', reason: 'Naval weld RT to NAVSEA, nuclear-component RT at BWXT/Framatome.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'high', reason: 'Submarine/carrier weld inspection, nuclear ASME Section XI, engine-component imaging.' },
    { method: 'Liquid Penetrant Testing (PT)', demandLevel: 'high', reason: 'Aerospace (NASA, Rolls-Royce) and nuclear stainless-weld PT to NAS 410 / Section XI.' },
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'high', reason: 'Naval structural welds and forgings, ship-repair components.' },
    { method: 'Eddy Current Testing (ECT)', demandLevel: 'high', reason: 'Nuclear steam-generator/condenser tubes at North Anna and Surry; aerospace surface cracks.' },
    { method: 'Visual Testing / CWI', demandLevel: 'high', reason: 'Shipbuilding, data-center construction and VDOT bridge inspection.' },
  ],
  certificationAvailability:
    "Tidewater Community College and Thomas Nelson (Virginia Peninsula) Community College feed the Hampton Roads shipbuilding/ship-repair NDT workforce, with The Apprentice School at Newport News Shipbuilding running one of the most respected industrial trade programs in the country. Central Virginia Community College (Lynchburg) feeds BWXT/Framatome nuclear work. Naval NDT follows NAVSEA qualification layered on ASNT SNT-TC-1A; aerospace follows NAS 410/Nadcap; nuclear at North Anna/Surry is administered by Dominion under 10 CFR 50.55a-incorporated ASME Section XI. Hellier NDT and Lavender International route satellite courses through the region. API ICP and AWS CWI exams sit at Prometric centres in Norfolk and Richmond. Industrial-radiography licensing is handled by the Virginia Department of Health Office of Radiological Health.",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 42000, high: 58000 },
    { role: 'Level II UT/MT/PT Technician', low: 60000, high: 94000 },
    { role: 'Naval / NAVSEA NDT Specialist', low: 70000, high: 115000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 84000, high: 128000 },
    { role: 'Level III NDT Engineer', low: 112000, high: 168000 },
    { role: 'Nuclear ASME Section XI Inspector', low: 95000, high: 145000 },
    { role: 'Aerospace NDT (NAS 410) Technician', low: 64000, high: 102000 },
  ],
  hiringSeasons:
    "Naval shipbuilding and ship repair run year round on multi-year carrier/submarine and overhaul schedules — the most stable NDT demand in the state, not seasonal. Nuclear refueling outages at North Anna and Surry run on 18-24 month cycles, each drawing 100-200 ISI specialists for several weeks. Aerospace and BWXT/Framatome nuclear-manufacturing NDT run on production cadence. Data-center construction in Northern Virginia drives steady structural/weld inspection.",
  faqs: [
    { q: 'Why is Virginia important for naval NDT?', a: 'HII Newport News Shipbuilding is the only US builder of aircraft carriers and one of two yards building nuclear submarines, and Norfolk Naval Shipyard performs nuclear-vessel overhaul. Together they create the most rigorous and most stable naval NDT demand in the country, governed by NAVSEA technical requirements layered on ASNT certification.' },
    { q: 'Does Virginia have refinery NDT work?', a: 'No — Virginia has no oil refineries. The NDT market is marine/naval, nuclear (North Anna, Surry), aerospace (NASA Langley, Rolls-Royce) and nuclear-component manufacturing (BWXT, Framatome in Lynchburg). Refinery-focused inspectors look to the Gulf Coast.' },
    { q: 'What certifications matter most in Virginia?', a: 'For naval work, NAVSEA-specific qualification plus ASNT Level II (UT, RT, PT, MT, PAUT). For nuclear (North Anna, Surry, BWXT), ASME Section XI Level II plus clearance. For aerospace (NASA, Rolls-Royce), NAS 410 / Nadcap. AWS CWI for shipbuilding and construction welds.' },
    { q: 'How much nuclear NDT is in Virginia?', a: 'Four reactors — North Anna (two units) and Surry (two units), both Dominion — run ASME Section XI inservice inspection on 10-year intervals with refueling outages every 18-24 months. Lynchburg adds BWXT and Framatome nuclear-component manufacturing NDT, making Virginia a significant nuclear inspection market beyond the operating fleet.' },
    { q: 'Where should an inspector base in Virginia?', a: 'Hampton Roads (Newport News/Norfolk/Portsmouth) is the centre of gravity — naval shipbuilding, ship repair and the port in one area, with the most stable demand. Lynchburg suits nuclear-manufacturing inspectors (BWXT/Framatome); Northern Virginia suits data-center construction and DoD supplier work.' },
  ],
  internalLinks: [
    { href: '/states/wv', label: 'West Virginia NDT market guide', context: 'Adjacent Appalachian chemicals/power share a contractor pool.' },
    { href: '/states/pa', label: 'Pennsylvania NDT market guide', context: 'Naval reactors program work (Bettis/Knolls) ties PA and VA nuclear.' },
    { href: '/industries/marine-and-offshore', label: 'Marine & offshore NDT', context: 'Newport News and Norfolk anchor US naval shipbuilding.' },
    { href: '/industries/nuclear', label: 'Nuclear power NDT inspection', context: 'North Anna, Surry, plus BWXT/Framatome manufacturing.' },
    { href: '/industries/aerospace', label: 'Aerospace NDT inspection', context: 'NASA Langley and Rolls-Royce Crosspointe.' },
    { href: '/methods/phased-array-ut', label: 'Phased array UT (PAUT)' },
    { href: '/standards/asme-section-v', label: 'ASME Section V NDE methods' },
    { href: '/careers/norfolk-va', label: 'NDT careers in Norfolk' },
    { href: '/ndt-services/newport-news-va', label: 'NDT services in Newport News' },
  ],
  citations: [
    { id: 'hii-nns', source: 'HII Newport News Shipbuilding — US aircraft carrier and submarine construction' },
    { id: 'nrc-va-units', source: 'NRC — North Anna and Surry operating reactor information', url: 'https://www.nrc.gov/' },
    { id: 'navsea-t9074', source: 'NAVSEA T9074 series — Navy NDT requirements' },
    { id: 'nas-410', source: 'NAS 410 — NAS Certification & Qualification of Nondestructive Test Personnel' },
    { id: 'vdh-rad', source: 'Virginia Department of Health Office of Radiological Health — radioactive materials licensing' },
  ],
};

export default state;
