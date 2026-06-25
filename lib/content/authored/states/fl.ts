import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'fl',
  name: 'Florida',
  abbreviation: 'FL',
  metaTitle: 'Florida NDT Market Guide: Aerospace, Nuclear, Marine & Phosphate',
  metaDescription:
    'Florida NDT is driven by Space Coast aerospace (KSC, SpaceX, Blue Origin), two FPL nuclear plants (Turkey Point, St. Lucie), Navy/ship-repair at Mayport-Jacksonville, and central-Florida phosphate. Salaries, regulators, metros.',
  heroLede:
    "Florida has no oil refineries, so its NDT market looks different from the Gulf Coast — it is driven by aerospace, nuclear power, marine and ship repair, phosphate chemicals, and a very large gas-fired power fleet. The Space Coast around Cape Canaveral and Kennedy Space Center is one of the busiest launch and aerospace-manufacturing corridors in the world, home to NASA, SpaceX, Blue Origin, Boeing and Lockheed Martin, with heavy demand for aerospace NDT (PT, ET, RT, UT to NAS 410). Florida Power & Light operates two nuclear stations — Turkey Point (two units, near Homestead) and St. Lucie (two units, on Hutchinson Island) — both running ASME Section XI inservice inspection. Jacksonville anchors a major Navy and commercial ship-repair market (Naval Station Mayport, BAE Systems Jacksonville), and central Florida's phosphate industry (Mosaic) adds sulfuric-acid-plant and fertilizer fixed-equipment inspection.",
  industryMix:
    "Aerospace is the marquee sector: Kennedy Space Center and Cape Canaveral Space Force Station host NASA, SpaceX, Blue Origin (rocket manufacturing at Exploration Park), Boeing, Lockheed Martin and Northrop Grumman, with a dense supplier and MRO base across the Space Coast (Melbourne/Titusville). Nuclear power: FPL's Turkey Point (two PWR units near Homestead) and St. Lucie (two PWR units on Hutchinson Island) run ASME Section XI ISI on 10-year intervals with refueling-outage surges. Marine and defense centre on Jacksonville — Naval Station Mayport (surface fleet), BAE Systems Jacksonville Ship Repair, and the port — driving marine UT thickness, weld and structural inspection to NAVSEA and ABS standards. Central Florida is the heart of the US phosphate industry: Mosaic operates mines and fertilizer/sulfuric-acid plants around Bartow/Mulberry, where corrosive-service fixed-equipment inspection is constant. A very large gas-fired power fleet (FPL, Duke Energy Florida, TECO) drives boiler, HRSG and piping inspection on outage cycles. Ports (Port Everglades, Tampa, Jacksonville) add fuel-storage tank (API 653) inspection.",
  topMetros: [
    { name: 'Jacksonville (Navy, ship repair)', slug: 'jacksonville-fl' },
    { name: 'Tampa (phosphate, port)', slug: 'tampa-fl' },
    { name: 'Melbourne (Space Coast)', slug: 'melbourne-fl' },
    { name: 'Cape Canaveral', slug: 'cape-canaveral-fl' },
    { name: 'Miami', slug: 'miami-fl' },
    { name: 'Mayport', slug: 'mayport-fl' },
  ],
  regulatoryNotes: [
    { id: 'fdep', source: 'Florida Department of Environmental Protection — air and industrial-wastewater permits (phosphate, power) drive inspection cadence', url: 'https://floridadep.gov/' },
    { id: 'fl-radiation', source: 'Florida Department of Health Bureau of Radiation Control — industrial radiography licensing (Florida is an NRC Agreement State)' },
    { id: 'nrc-fl', source: 'NRC 10 CFR 50 / 50.55a — applies to Turkey Point and St. Lucie (incorporates ASME Section XI)' },
    { id: 'navsea', source: 'NAVSEA technical requirements (T9074 series) — govern Navy ship-repair NDT at Mayport' },
    { id: 'faa-nas410', source: 'FAA / NAS 410 / Nadcap — aerospace NDT personnel qualification on the Space Coast' },
  ],
  majorAssetOwners: [
    { name: 'NASA Kennedy Space Center', sector: 'Aerospace' },
    { name: 'SpaceX (Cape Canaveral / KSC)', sector: 'Aerospace' },
    { name: 'Blue Origin (Exploration Park manufacturing)', sector: 'Aerospace' },
    { name: 'Boeing / Lockheed Martin / Northrop Grumman (Space Coast)', sector: 'Aerospace / Defense' },
    { name: 'Florida Power & Light (Turkey Point, St. Lucie nuclear)', sector: 'Nuclear Power' },
    { name: 'Naval Station Mayport', sector: 'Navy / Marine' },
    { name: 'BAE Systems Jacksonville Ship Repair', sector: 'Ship Repair' },
    { name: 'Mosaic (central Florida phosphate / sulfuric acid)', sector: 'Chemicals / Fertilizer' },
    { name: 'Duke Energy Florida / TECO (gas-fired power)', sector: 'Power Generation' },
  ],
  methodDemand: [
    { method: 'Liquid Penetrant Testing (PT)', demandLevel: 'high', reason: 'Aerospace component and rocket-hardware inspection to NAS 410 across the Space Coast.' },
    { method: 'Eddy Current Testing (ECT)', demandLevel: 'high', reason: 'Nuclear steam-generator/condenser tubes at Turkey Point and St. Lucie; aerospace surface-crack detection; power-plant heat exchangers.' },
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'Marine UT thickness gauging at Mayport/BAE, phosphate fixed-equipment, power-plant boiler/HRSG and nuclear baseline UT.' },
    { method: 'Radiographic Testing (RT)', demandLevel: 'medium', reason: 'Aerospace casting/weld RT and DR; power and marine weld fabrication.' },
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'medium', reason: 'Ship-repair structural welds, power-plant components and phosphate equipment.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'medium', reason: 'Nuclear Section XI weld inspection, power-plant and phosphate corrosion mapping.' },
    { method: 'Visual Testing / CWI', demandLevel: 'high', reason: 'Ship-repair, aerospace and FDOT bridge inspection.' },
  ],
  certificationAvailability:
    "Eastern Florida State College (Melbourne/Cocoa) sits at the centre of the Space Coast and feeds the aerospace NDT and manufacturing workforce, with strong ties to KSC, Blue Origin and the supplier base. Florida State College at Jacksonville (FSCJ) and Tulsa Welding School's Jacksonville campus feed the Navy ship-repair and marine market. Polk State College (Winter Haven/Lakeland) and State College of Florida serve central-Florida phosphate and power. Aerospace NDT qualification follows NAS 410 and Nadcap rather than the API code world, so Space Coast employers run their own written practices certified to those schemes. Nuclear NDT at Turkey Point and St. Lucie is administered by FPL under 10 CFR 50.55a-incorporated ASME Section XI. Navy ship-repair NDT follows NAVSEA technical requirements. API ICP and AWS CWI exams sit at Prometric centres in Jacksonville, Tampa and Orlando. Industrial-radiography licensing is handled by the Florida Department of Health Bureau of Radiation Control.",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 40000, high: 55000 },
    { role: 'Level II UT/MT/PT Technician', low: 56000, high: 90000 },
    { role: 'Aerospace NDT (NAS 410) Technician', low: 62000, high: 100000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 80000, high: 122000 },
    { role: 'Level III NDT Engineer', low: 108000, high: 160000 },
    { role: 'Nuclear ASME Section XI Inspector', low: 92000, high: 142000 },
    { role: 'NDT Field Supervisor', low: 85000, high: 128000 },
  ],
  hiringSeasons:
    "Aerospace NDT on the Space Coast runs year round on launch and manufacturing cadence rather than seasonal turnarounds, and has been growing with the commercial-launch boom. Nuclear refueling outages at Turkey Point and St. Lucie run on 18-24 month cycles, each drawing 100-200 ISI specialists for several weeks. Power-plant outages cluster in spring and fall (avoiding the summer air-conditioning peak). Ship-repair availabilities at Mayport/BAE run on the Navy maintenance schedule year round. Phosphate-plant turnarounds cluster outside the peak fertilizer season.",
  faqs: [
    { q: 'Does Florida have oil refineries for NDT work?', a: 'No — Florida has no oil refineries. Its NDT market is instead driven by aerospace (the Space Coast), nuclear power (Turkey Point and St. Lucie), Navy and commercial ship repair (Jacksonville/Mayport), central-Florida phosphate chemicals, and a very large gas-fired power fleet. Inspectors who want refinery work look to the Gulf Coast.' },
    { q: 'What aerospace NDT demand exists on the Space Coast?', a: 'Substantial and growing. Kennedy Space Center, Cape Canaveral, SpaceX, Blue Origin, Boeing and Lockheed Martin drive demand for aerospace NDT — primarily PT, eddy current, RT/DR and UT to NAS 410 and Nadcap requirements. This is a distinct certification track from the API code world, and the commercial-launch boom has expanded the workforce.' },
    { q: 'How much nuclear NDT is in Florida?', a: 'Two FPL stations — Turkey Point (two units near Homestead) and St. Lucie (two units on Hutchinson Island) — run ASME Section XI inservice inspection on 10-year intervals with refueling outages every 18-24 months. Each outage draws 100-200 ISI specialists (UT, PAUT, ECT, VT) for several weeks, so nuclear ISI is a real but cyclical part of the market.' },
    { q: 'Is there marine NDT work in Florida?', a: 'Yes, concentrated in Jacksonville. Naval Station Mayport (surface fleet) and BAE Systems Jacksonville Ship Repair drive marine UT thickness gauging, weld and structural inspection to NAVSEA and ABS standards, plus the port and tank-storage (API 653) inspection at Port Everglades, Tampa and Jacksonville.' },
    { q: 'What certifications matter most in Florida?', a: 'On the Space Coast, NAS 410 / Nadcap aerospace qualifications in PT, ET, RT and UT. For nuclear, ASME Section XI Level II plus unescorted-access clearance. For ship repair, ASNT Level II plus NAVSEA-specific qualification. For phosphate and power fixed-equipment, API 510/570/653 and ASNT/PCN Level II.' },
  ],
  internalLinks: [
    { href: '/industries/aerospace', label: 'Aerospace NDT inspection', context: 'The Space Coast is one of the busiest aerospace corridors in the world.' },
    { href: '/industries/nuclear', label: 'Nuclear power NDT inspection', context: 'Turkey Point and St. Lucie anchor Florida nuclear ISI.' },
    { href: '/industries/marine-and-offshore', label: 'Marine & offshore NDT', context: 'Mayport and BAE Jacksonville drive ship-repair inspection.' },
    { href: '/methods/penetrant-testing', label: 'Liquid penetrant testing (PT)', context: 'PT is the dominant aerospace surface method.' },
    { href: '/methods/eddy-current-testing', label: 'Eddy current testing (ECT)', context: 'ECT serves both aerospace and nuclear tube inspection.' },
    { href: '/standards/api-653', label: 'API 653 tank inspection', context: 'Governs fuel-storage tanks at Florida ports.' },
    { href: '/careers/jacksonville-fl', label: 'NDT careers in Jacksonville' },
    { href: '/ndt-services/jacksonville-fl', label: 'NDT services & rates in Jacksonville' },
    { href: '/states/tx', label: 'Texas NDT market guide', context: 'Refinery-focused inspectors look to the Gulf Coast.' },
  ],
  citations: [
    { id: 'nrc-fl-units', source: 'NRC — Turkey Point and St. Lucie operating reactor information', url: 'https://www.nrc.gov/' },
    { id: 'nasa-ksc', source: 'NASA Kennedy Space Center / Cape Canaveral Space Force Station — launch and manufacturing operations' },
    { id: 'navsea-t9074', source: 'NAVSEA T9074 series — Navy NDT requirements (Mayport ship repair)' },
    { id: 'nas-410', source: 'NAS 410 — NAS Certification & Qualification of Nondestructive Test Personnel (aerospace)' },
    { id: 'fl-doh-radiation', source: 'Florida Department of Health Bureau of Radiation Control — radioactive materials licensing' },
    { id: 'usgs-phosphate', source: 'USGS Mineral Commodity Summaries — Florida phosphate production (Mosaic)' },
  ],
};

export default state;
