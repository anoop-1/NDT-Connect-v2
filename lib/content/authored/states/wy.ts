import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'wy',
  name: 'Wyoming',
  abbreviation: 'WY',
  metaTitle: 'Wyoming NDT Market Guide: Powder River, Refining & Soda Ash',
  metaDescription:
    'Wyoming produces ~265 kbpd of crude, hosts 4 refineries, anchors the Powder River Basin and Green River trona/soda ash mining. NDT salaries, regulators, top metros.',
  heroLede:
    "Wyoming produced an average 265,000 barrels per day of crude oil and 5.6 billion cubic feet per day of natural gas in 2024 — the eighth-largest US crude state and fifth-largest gas state per EIA data. The state operates four refineries (HF Cheyenne 52,000 bpd, Sinclair Casper 89,000 bpd, Sinclair Sinclair 80,000 bpd, Wyoming Refining Newcastle 18,000 bpd) and hosts the world's largest trona/soda ash mining complex in the Green River Basin (Genesis Alkali, Sisecam Wyoming, WE Soda — combined capacity ~14 MTPA, supplying ~25% of global soda ash). The Powder River Basin in northeast Wyoming remains the largest US coal-producing region, and CCS (carbon capture and storage) project development is concentrating around Bunker Hill, ExxonMobil LaBarge, and the Wabamun Carbon Hub. The Wyoming Oil and Gas Conservation Commission, the Wyoming Pipeline Safety Authority, and the Wyoming Department of Environmental Quality split regulatory jurisdiction across upstream, midstream, and air permits. Cold-weather operations dominate planning — Casper average January low is 13 F with windchill regularly below zero.",
  industryMix:
    "Upstream is concentrated in three plays. The Powder River Basin (Campbell, Converse, Niobrara, Johnson counties) — operated by EOG Resources, Devon Energy, Chesapeake/Expand Energy, Anschutz, and Continental Resources — produces from Niobrara, Mowry, Turner, and Sussex formations. The Green River Basin and Greater Green River play (Sweetwater, Lincoln, Sublette counties) is gas-heavy and operated by Ultra Petroleum, Jonah Energy, BP Lower 48, and Pinedale operators. The Big Horn Basin (Park, Big Horn, Hot Springs) is a mature conventional oil play. Midstream gathering is operated by Tallgrass Energy (REX Pipeline, Pony Express), Williams (NW Pipeline), Enterprise, Magellan, and DCP Midstream. Refining: HF Cheyenne (HollyFrontier merger), Sinclair Casper and Sinclair (now Marathon following the 2022 acquisition of Sinclair Oil), and the small Wyoming Refining Newcastle. The Sinclair complex was struck by a major explosion in 2020 and has since been rebuilt with significant inspection scope on the rebuilt FCC and alkylation units. Trona/soda ash mining is unique: Wyoming holds ~90% of the world's known trona reserves, and Green River-area operations (Sisecam Wyoming, Genesis Alkali, WE Soda) drive continuous mine-equipment, conveyor structural, and processing-plant NDT. Coal: Powder River Basin coal mines (Black Thunder, North Antelope Rochelle, Cordero Rojo) ship low-sulfur sub-bituminous coal nationwide; mine and prep-plant equipment inspection is steady. Wind: ~3.2 GW installed with significant expansion under the Chokecherry Sierra Madre project. F.E. Warren Air Force Base (Cheyenne) hosts ICBM Minuteman III silos. Carbon capture: ExxonMobil LaBarge has captured CO2 commercially since 1986 and is the largest US CCS facility — pipelines and injection wells under EPA Class VI permitting drive specialty inspection demand.",
  topMetros: [
    { name: 'Casper', slug: 'casper-wy' },
    { name: 'Cheyenne', slug: 'cheyenne-wy' },
    { name: 'Gillette', slug: 'gillette-wy' },
    { name: 'Rock Springs', slug: 'rock-springs-wy' },
  ],
  regulatoryNotes: [
    { id: 'wogcc', source: 'Wyoming Oil and Gas Conservation Commission (WOGCC) — well construction, integrity testing (Wyo. Stat. 30-5)', url: 'https://wogcc.wyo.gov/' },
    { id: 'wy-deq-air', source: 'Wyoming Department of Environmental Quality, Air Quality Division — Chapter 6 Standards (drives refinery and gas-plant LDAR)' },
    { id: 'wy-deq-uic', source: 'WY DEQ Water Quality Division — UIC Class II for produced water disposal and Class VI for CO2 sequestration (Wabamun Carbon Hub, ExxonMobil LaBarge)' },
    { id: 'wy-public-service', source: 'Wyoming Public Service Commission Pipeline Safety Section — intrastate gas distribution under PHMSA grant' },
    { id: 'phmsa-wy', source: 'PHMSA 49 CFR 192/195 — REX, Pony Express, Wyoming Interstate, NW Pipeline mainlines' },
  ],
  majorAssetOwners: [
    { name: 'EOG Resources (Powder River Basin)', sector: 'Upstream' },
    { name: 'Devon Energy / Anschutz / Continental (PRB)', sector: 'Upstream' },
    { name: 'BP Lower 48 (Greater Green River)', sector: 'Upstream' },
    { name: 'ExxonMobil (LaBarge CCS, Shute Creek gas plant)', sector: 'Upstream / CCS' },
    { name: 'HF Sinclair (Cheyenne refinery)', sector: 'Refining' },
    { name: 'Marathon Petroleum (Sinclair Casper, Sinclair refineries)', sector: 'Refining' },
    { name: 'Tallgrass Energy (REX, Pony Express)', sector: 'Midstream' },
    { name: 'Williams (Northwest Pipeline)', sector: 'Midstream' },
    { name: 'Sisecam Wyoming (Green River trona/soda ash)', sector: 'Mining / Industrial Minerals' },
    { name: 'Genesis Alkali (Green River trona)', sector: 'Mining / Industrial Minerals' },
    { name: 'WE Soda (Granger expansion)', sector: 'Mining / Industrial Minerals' },
    { name: 'Peabody Energy (Powder River Basin coal)', sector: 'Coal Mining' },
    { name: 'Arch Resources (Black Thunder PRB)', sector: 'Coal Mining' },
    { name: 'F.E. Warren Air Force Base', sector: 'Defense' },
  ],
  methodDemand: [
    { method: 'Radiographic Testing (RT)', demandLevel: 'high', reason: 'Powder River and Green River gathering and transmission pipeline weld inspection; refinery turnaround weld repair.' },
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'Refinery turnaround thickness surveys at Cheyenne and Casper, gas-plant heat exchanger inspection, tank inspection at midstream terminals.' },
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'high', reason: 'Drilling rig and workover equipment inspection at Casper and Gillette service yards, mine equipment lifting inspection, refinery weld inspection.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'medium', reason: 'Pipeline integrity verification on REX and Pony Express, refinery occupied-unit corrosion mapping at Sinclair complex post-rebuild.' },
    { method: 'API 653 Tank Inspection', demandLevel: 'high', reason: 'Refining tankage at all four refineries, midstream terminal tanks, and storage at Powder River Basin gathering hubs.' },
    { method: 'Magnetic Flux Leakage (MFL) / Tank Floor', demandLevel: 'medium', reason: 'API 653 internal inspection bottom-plate scanning at terminal and refinery tanks.' },
    { method: 'Visual Testing / Drone', demandLevel: 'medium', reason: 'Wind turbine blade inspection (~3.2 GW installed and growing), refinery column inspection, coal-mine equipment visual inspection.' },
    { method: 'CO2 Pipeline / Class VI Inspection', demandLevel: 'medium', reason: 'ExxonMobil LaBarge CO2 system and emerging CCS projects (Wabamun Carbon Hub) drive specialty inspection demand on dense-phase CO2 pipelines.' },
  ],
  certificationAvailability:
    "Casper College, Western Wyoming Community College (Rock Springs), Sheridan College, and Northwest College (Powell) run welding and industrial process programs feeding the upstream and midstream contractor pipeline. Wyoming Tech (Laramie) runs an NDT certificate program. Most Level II techs in Wyoming cycle in from Colorado, Utah, or North Dakota. API ICP exams at Prometric Cheyenne and Casper. AWS CWI seminars run quarterly in Cheyenne and Casper. Radiographic source licensing is administered by WY DEQ Radiation Materials Program under Chapter 5; Wyoming is a Section 274b agreement state. Several large refining contractor firms maintain regional offices in Casper.",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 40000, high: 56000 },
    { role: 'Level II UT/MT/PT Technician', low: 62000, high: 95000 },
    { role: 'Level II Pipeline RT Specialist', low: 65000, high: 100000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 82000, high: 128000 },
    { role: 'Level III NDT Engineer', low: 108000, high: 162000 },
    { role: 'API 653 Tank Inspector', low: 85000, high: 132000 },
    { role: 'NDT Field Supervisor', low: 90000, high: 138000 },
  ],
  hiringSeasons:
    "Pipeline gathering construction concentrates April-October. Refinery turnarounds at Cheyenne, Casper, and Sinclair cluster spring and fall. The Sinclair complex rebuild post-2020 explosion has driven sustained 2021-2025 construction inspection workload that is finally winding down. Coal-mine equipment inspection follows operator-driven outage scheduling. Wind farm construction in the Chokecherry Sierra Madre project area drives multi-year cyclical hiring. Per-diem premiums spike November-March when crews willing to work outdoors in extreme cold become scarce.",
  faqs: [
    {
      q: 'What is the soda ash / trona mining inspection market in Wyoming?',
      a: "Wyoming hosts ~90% of the world's known trona deposits in the Green River Basin (Sweetwater County). Three operators run conventional underground and solution mining: Sisecam Wyoming, Genesis Alkali, and WE Soda (Granger expansion under construction). Combined capacity is ~14 MTPA, supplying ~25% of global soda ash. NDT demand spans: surface processing plant heat exchangers and evaporators (UT and ECT), conveyor and structural inspection (MT, VT), underground mine equipment lifting and structural (MT, VT), and the recently expanded WE Soda greenfield (full ASME B31.3 and ASME Section VIII weld inspection during construction). Salary premiums for mining inspection roles run 10-15% above pipeline equivalents due to the specialized environment and Mine Safety and Health Administration (MSHA) qualification requirements.",
    },
    {
      q: 'What happened with the Sinclair refinery and what does it mean for NDT?',
      a: "The Sinclair refinery in Sinclair, Wyoming was struck by a major explosion in March 2020 that damaged the FCC unit and adjacent units. The complex was acquired by Marathon Petroleum in 2022 (along with the Casper refinery) and underwent extensive rebuild and integrity-baseline work through 2022-2025. The rebuild drove sustained PAUT, RT, UT, MT, and PT inspection across new and existing equipment, with full API 510 baseline reissuance on rebuilt vessels and API 570 piping circuit recertification. Post-rebuild, normal turnaround cycles resume and inspection workforce returns to baseline levels (smaller than the rebuild peak).",
    },
    {
      q: 'Is the Wabamun Carbon Hub creating new NDT work?',
      a: "Yes. Wabamun Carbon Hub (jointly developed by Trafigura and Bunker Hill, located in southwest WY) and ExxonMobil LaBarge expansions are advancing Class VI sequestration well permits and dense-phase CO2 pipeline construction. Dense-phase CO2 pipelines (under ASME B31.4 with CO2-specific guidance) require fracture-resistant pipe material and specialty weld inspection because of unique fracture mechanics in CO2 service. Inspection scope: greenfield pipeline construction RT and PAUT, pre-service hydrotest and CHT (cold hydrostatic test) verification, baseline UT thickness surveys, well-bore and tubing inspection for injection wells under EPA UIC Class VI rules. The CCS market is small today but growing — total US dense-phase CO2 pipeline mileage is expected to roughly triple between 2024 and 2030 if announced projects proceed.",
    },
    {
      q: 'How does Powder River Basin coal-mine NDT differ from oil-and-gas?',
      a: "Coal-mine NDT under MSHA jurisdiction (30 CFR 75-77) emphasizes lifting equipment, draglines, shovels, conveyor structural, and prep-plant pressure equipment. Methods used are predominantly MT (welds and structural), VT, and UT (thickness on prep-plant vessels and tanks). Personnel qualification follows ASNT SNT-TC-1A but with MSHA-specific mine-site safety qualification (CMS Operator certification, MSHA Part 48 training). Inspection cadence is operator-driven — major drag-line outages run 6-week shutdowns approximately every 5 years per unit with full structural and weld inspection scope. Salaries for mine-specialist NDT inspectors run modestly above generic field rates due to MSHA qualification, but workload is steadier than rig-count-driven oilfield work.",
    },
    {
      q: 'Is rotational schedule common in Wyoming NDT?',
      a: "Less common than Alaska or North Dakota but increasingly so for remote-site work. Powder River Basin work out of Gillette and Casper is typically day-commute (most operators provide company-truck commute compensation). Green River and southwest Wyoming work out of Rock Springs sometimes operates on 14/7 or 21/7 rotations for non-resident techs. Pipeline construction crews working REX, Pony Express, or Wyoming Interstate mainline integrity-management often operate on 14/7 or 14/14 rotations during peak campaign weeks. Per-diem rates of $90-$140/day are common during peak construction season for non-resident techs.",
    },
  ],
  internalLinks: [
    { href: '/states/co', label: 'Colorado NDT market guide', context: 'Colorado DJ Basin and Front Range refining share contractor pool with Wyoming.' },
    { href: '/states/ut', label: 'Utah NDT market guide', context: 'Utah Uinta Basin upstream and Salt Lake City refining mirror southwest Wyoming patterns.' },
    { href: '/states/mt', label: 'Montana NDT market guide', context: 'Montana Billings refining and eastern Bakken share Powder River Basin contractor crews.' },
    { href: '/states/nd', label: 'North Dakota NDT market guide', context: 'Bakken and Powder River share cold-weather pipeline operations.' },
    { href: '/methods/radiographic-testing', label: 'Radiographic testing (RT)', context: 'Pipeline RT is the largest single Wyoming NDT line item.' },
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic particle testing (MT)', context: 'MT is essential for mine equipment and drilling asset inspection.' },
    { href: '/industries/upstream-oil-gas', label: 'Upstream oil & gas NDT', context: 'Powder River Basin is one of the most active US upstream plays.' },
    { href: '/industries/mining', label: 'Mining NDT', context: 'Powder River coal and Green River trona are Wyoming\'s mining NDT anchors.' },
    { href: '/standards/api-570', label: 'API 570 piping inspection code', context: 'API 570 governs all four Wyoming refineries.' },
    { href: '/standards/asme-b31-4', label: 'ASME B31.4 liquid pipeline transportation', context: 'B31.4 is the inspection code for Wyoming\'s major takeaway pipelines and emerging CO2 systems.' },
    { href: '/careers/casper-wy', label: 'NDT careers in Casper', context: 'Casper is the central refining and upstream service hub.' },
    { href: '/cost-guide/casper-wy/ut', label: 'Casper UT cost guide', context: 'Casper UT rates track 5-8% below Houston with significant per-diem variability.' },
  ],
  citations: [
    { id: 'eia-wy-2024', source: 'EIA Crude Oil and Natural Gas Production by State — Wyoming 2024' },
    { id: 'wogcc-stat', source: 'Wyoming Oil and Gas Conservation Commission, Wyo. Stat. 30-5' },
    { id: 'wy-deq-air-ch6', source: 'WY DEQ Air Quality Division Chapter 6' },
    { id: 'phmsa-49cfr-wy', source: 'PHMSA 49 CFR 192 / 195' },
    { id: 'wy-deq-rad-ch5', source: 'WY DEQ Radiation Materials Program Chapter 5' },
    { id: 'epa-uic-class-vi', source: 'EPA UIC Class VI Rule (40 CFR 146 Subpart H) — CO2 sequestration wells' },
    { id: 'msha-30cfr', source: 'MSHA 30 CFR Parts 75-77 — Mine Safety and Health Standards' },
    { id: 'api-510-2022', source: 'API 510 Pressure Vessel Inspection Code, 11th ed., 2022' },
  ],
};

export default state;
