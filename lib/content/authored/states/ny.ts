import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'ny',
  name: 'New York',
  abbreviation: 'NY',
  metaTitle: 'New York NDT Market Guide: Semiconductors, Power Turbines & Nuclear',
  metaDescription:
    'New York NDT spans GlobalFoundries semiconductors, GE power turbines (Schenectady), upstate nuclear (Nine Mile Point, FitzPatrick, Ginna), Alcoa/Corning manufacturing, and NYC infrastructure. Salaries, regulators, metros.',
  heroLede:
    "New York's NDT market is manufacturing-, power- and infrastructure-driven rather than refining (the state has no oil refineries). Upstate carries the industrial weight: GlobalFoundries runs one of the most advanced semiconductor fabs in the US at Malta; GE builds and services large power turbines and generators at Schenectady; Alcoa (Massena) and Corning add primary metals and specialty glass/ceramics. Three nuclear sites operate upstate — Nine Mile Point (two units) and James A. FitzPatrick (one unit) at Oswego, and Ginna near Rochester — all Constellation-operated on ASME Section XI inservice inspection (Indian Point downstate closed in 2021). Downstate, New York City's vast bridge, transit and building stock drives one of the largest structural and weld-inspection markets in the country.",
  industryMix:
    "Advanced manufacturing leads upstate: GlobalFoundries (Malta — leading-edge semiconductor fabrication), GE Vernova (Schenectady — gas/steam turbines and generators, a historic heavy-power site), Alcoa Massena (aluminum smelting), Corning Incorporated (specialty glass/ceramics, Corning/Painted Post), and Lockheed Martin (Owego — defense electronics). Nuclear power: Nine Mile Point 1 & 2 and FitzPatrick at Oswego on Lake Ontario, plus Ginna near Rochester — all Constellation, running Section XI ISI with refueling outages. Power and grid: NYPA (the largest US state public power organization, incl. Niagara hydro), Con Edison and the NYISO network. Marine/port: the Port of New York and New Jersey (shared) and harbor infrastructure. Downstate NYC drives enormous structural NDT — bridges (MTA/NYSDOT), transit tunnels, high-rise steel, and the data-center/construction boom. Pharmaceuticals (Regeneron, Tarrytown) and food/beverage manufacturing add process-piping inspection. No petroleum refineries operate in New York.",
  topMetros: [
    { name: 'New York City', slug: 'new-york-ny' },
    { name: 'Buffalo', slug: 'buffalo-ny' },
    { name: 'Rochester', slug: 'rochester-ny' },
  ],
  regulatoryNotes: [
    { id: 'nysdec', source: 'NYSDEC — air/industrial permits for manufacturing and power', url: 'https://dec.ny.gov/' },
    { id: 'nysdoh-berp', source: 'NY State DOH Bureau of Environmental Radiation Protection — industrial radiography licensing (NYC has its own DOHMH radiation permit)' },
    { id: 'nrc-ny', source: 'NRC 10 CFR 50 / 50.55a — Nine Mile Point, FitzPatrick, Ginna (incorporates ASME Section XI)' },
    { id: 'nyspsc', source: 'NY State Public Service Commission — intrastate gas pipeline safety' },
    { id: 'nas-410', source: 'NAS 410 / Nadcap — aerospace/defense NDT (Lockheed Owego, GE)' },
  ],
  majorAssetOwners: [
    { name: 'GlobalFoundries (Malta fab)', sector: 'Semiconductors' },
    { name: 'GE Vernova (Schenectady — turbines/generators)', sector: 'Heavy Power Manufacturing' },
    { name: 'Constellation Energy (Nine Mile Point, FitzPatrick, Ginna)', sector: 'Nuclear Power' },
    { name: 'Alcoa (Massena smelter)', sector: 'Metals' },
    { name: 'Corning Incorporated', sector: 'Specialty Glass/Ceramics' },
    { name: 'New York Power Authority (NYPA)', sector: 'Power / Hydro' },
    { name: 'Lockheed Martin (Owego)', sector: 'Defense' },
    { name: 'MTA / NYSDOT (bridges, transit)', sector: 'Infrastructure' },
  ],
  methodDemand: [
    { method: 'Visual Testing / CWI', demandLevel: 'high', reason: 'NYC bridge, transit and high-rise structural-weld inspection (one of the largest US markets); NYSDOT bridge program.' },
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'Turbine/generator rotor and weld UT at GE Schenectady; structural UT; nuclear baseline.' },
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'high', reason: 'Turbine forgings, structural welds, and metals (Alcoa) inspection.' },
    { method: 'Eddy Current Testing (ECT)', demandLevel: 'high', reason: 'Nuclear steam-generator/condenser tubes (Ginna, Nine Mile Point); turbine blade-root inspection; semiconductor/aerospace surface.' },
    { method: 'Liquid Penetrant Testing (PT)', demandLevel: 'high', reason: 'Turbine components, aerospace/defense (Lockheed), nuclear stainless welds.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'medium', reason: 'Nuclear Section XI weld inspection and heavy-power component imaging.' },
    { method: 'Radiographic Testing (RT)', demandLevel: 'medium', reason: 'Casting/weld RT in heavy manufacturing and bridge fabrication.' },
  ],
  certificationAvailability:
    "Hudson Valley Community College (Troy) and SUNY Adirondack feed the GlobalFoundries/GE Capital District workforce; Mohawk Valley Community College (Utica) and Erie Community College (Buffalo) serve western/central NY manufacturing. Onondaga Community College (Syracuse) feeds the Oswego nuclear cluster. NYC structural-weld inspection runs on NYC DOB special-inspection requirements plus AWS CWI — a large, distinct certification market. Nuclear NDT at Nine Mile Point/FitzPatrick/Ginna is administered by Constellation under 10 CFR 50.55a-incorporated ASME Section XI. Aerospace/defense follows NAS 410. Hellier NDT and Lavender International route satellite courses through the region. API ICP (limited, given no refineries) and AWS CWI exams sit at Prometric centres in NYC, Albany and Buffalo. Industrial-radiography licensing is via NY State DOH BERP (and NYC DOHMH within the five boroughs).",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 44000, high: 60000 },
    { role: 'Level II UT/MT/PT Technician', low: 62000, high: 98000 },
    { role: 'Structural / CWI Inspector (NYC)', low: 72000, high: 120000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 86000, high: 130000 },
    { role: 'Level III NDT Engineer', low: 115000, high: 172000 },
    { role: 'Nuclear ASME Section XI Inspector', low: 95000, high: 148000 },
    { role: 'NDT Field Supervisor', low: 92000, high: 138000 },
  ],
  hiringSeasons:
    "NYC structural and bridge inspection runs year round (special-inspection and DOT programs), with a construction-season lean April-November. Nuclear refueling outages at the Oswego units and Ginna run on 18-24 month cycles drawing ISI specialists for several weeks. GE Schenectady turbine and GlobalFoundries fab NDT run on production cadence. Cold upstate winters compress some outdoor structural work into the warmer months.",
  faqs: [
    { q: 'Does New York have oil-refinery NDT work?', a: 'No — New York has no operating oil refineries. Its NDT market is manufacturing (GlobalFoundries semiconductors, GE turbines, Alcoa, Corning), nuclear power (Nine Mile Point, FitzPatrick, Ginna upstate), and a very large NYC structural/bridge/transit inspection market. Refinery inspectors look to the Gulf Coast or neighboring New Jersey.' },
    { q: 'How big is the NYC structural inspection market?', a: 'Very large. New York City\'s bridges, transit tunnels, and high-rise steel — under NYC DOB special-inspection rules plus AWS D1.1/D1.5 and NYSDOT programs — make structural and weld inspection (VT/CWI, UT, MT) one of the biggest single NDT markets in the US, distinct from the industrial/code world.' },
    { q: 'What nuclear NDT exists in New York?', a: 'Three upstate sites — Nine Mile Point (two units) and FitzPatrick at Oswego, and Ginna near Rochester, all Constellation — run ASME Section XI inservice inspection on 10-year intervals with refueling outages every 18-24 months. Indian Point downstate permanently shut down in 2021, so demand is now upstate.' },
    { q: 'What certifications matter most in New York?', a: 'For NYC structural work, AWS CWI plus ASNT Level II (UT/MT) and NYC DOB special-inspector qualification. For nuclear, ASME Section XI Level II plus clearance. For GE/aerospace/defense, ASNT Level II and NAS 410. API certifications matter less here given no refineries.' },
    { q: 'Where should an inspector base in New York?', a: 'The Capital District (Albany/Schenectady/Malta) suits GE-turbine and GlobalFoundries work; Oswego/Syracuse for nuclear; NYC for the huge structural/bridge market; Buffalo/Rochester for western-NY manufacturing and Ginna nuclear.' },
  ],
  internalLinks: [
    { href: '/states/pa', label: 'Pennsylvania NDT market guide', context: 'Northwest PA manufacturing and nuclear share crews with western NY.' },
    { href: '/states/nj', label: 'New Jersey NDT market guide', context: 'Refining and the shared NY/NJ port are next door for refinery-focused inspectors.' },
    { href: '/industries/nuclear', label: 'Nuclear power NDT inspection', context: 'Three upstate Constellation sites.' },
    { href: '/industries/power-generation', label: 'Power-generation NDT', context: 'GE Schenectady turbines + NYPA hydro/grid.' },
    { href: '/methods/eddy-current-testing', label: 'Eddy current testing (ECT)', context: 'Nuclear tubes + turbine blade roots.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1 structural welding code', context: 'Governs NYC structural-weld inspection.' },
    { href: '/careers/new-york-ny', label: 'NDT careers in New York City' },
    { href: '/ndt-services/buffalo-ny', label: 'NDT services in Buffalo' },
  ],
  citations: [
    { id: 'nrc-ny-units', source: 'NRC — Nine Mile Point, FitzPatrick, Ginna reactor information', url: 'https://www.nrc.gov/' },
    { id: 'globalfoundries', source: 'GlobalFoundries — Fab 8, Malta NY' },
    { id: 'ge-vernova', source: 'GE Vernova — Schenectady turbine/generator operations' },
    { id: 'nyc-dob', source: 'NYC Department of Buildings — special inspections (structural/welding)' },
    { id: 'nysdoh-berp', source: 'NY State DOH Bureau of Environmental Radiation Protection' },
  ],
};

export default state;
