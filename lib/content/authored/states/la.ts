import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'la',
  name: 'Louisiana',
  abbreviation: 'LA',
  metaTitle: 'Louisiana NDT Market Guide: Refining, LNG & Chemical Corridor',
  metaDescription:
    'Louisiana operates 17 refineries (~3.4 MMbpd, ~18% of US capacity) and hosts the densest LNG export terminal cluster in the Western Hemisphere. NDT salaries, top metros, and inspector pipeline.',
  heroLede:
    "Louisiana operates 17 active refineries with combined atmospheric distillation capacity of roughly 3.4 million barrels per day — about 18% of US total (EIA 2023). The 130-mile Baton Rouge-to-New Orleans corridor (the 'Chemical Corridor') hosts more petrochemical plants per river mile than anywhere else in North America. Lake Charles is the world's third-largest LNG export hub by nameplate (Cameron LNG, Sabine Pass on the Texas side, Calcasieu Pass, Driftwood and Commonwealth LNG under construction). Hurricane recovery cycles — Laura 2020, Ida 2021, Francine 2024 — concentrate post-storm structural and pressure equipment inspection scopes that surge through Q4. The state's NDT market is the second-largest in the country by hours billed and the densest by inspection-asset-per-square-mile. This guide covers where the work is, what it pays, and which regulators a working tech needs to understand on day one.",
  industryMix:
    "The St. Charles, St. John the Baptist, St. James, Ascension, and East Baton Rouge parish corridor concentrates ExxonMobil Baton Rouge (502,500 bpd, the fourth-largest US refinery), Marathon Garyville (596,000 bpd, the third-largest), Shell Norco, Phillips 66 Alliance (cold-stacked 2020, partial reactivation), Valero Meraux and St. Charles, Dow St. Charles, Shell Geismar, BASF Geismar, and Methanex Geismar. Petrochemicals are dominated by ethylene crackers (Westlake, Dow, Sasol Lake Charles), methanol (Methanex), ammonia (Mosaic, CF Industries), and chlor-alkali (Olin, Westlake). The Lake Charles complex is the LNG anchor: Cameron LNG (Sempra) at 12 MTPA, Calcasieu Pass (Venture Global) at 10 MTPA, and Sabine Pass (Cheniere, Cameron Parish + Texas) at 30 MTPA, with Plaquemines LNG (Venture Global) at 20+ MTPA recently commissioned. Driftwood LNG (Tellurian/Woodside) and CP2 LNG (Venture Global) add another 60+ MTPA under permit. Offshore Gulf of Mexico operations stage out of Port Fourchon — the deepwater service hub for Shell Mars/Olympus/Vito, BP Mad Dog/Atlantis, Chevron Anchor/Tahiti, and Hess Stampede. Maritime is a quiet but constant NDT customer: Bollinger Shipyards (Lockport, Larose, Houma) builds USCG Sentinel-class and Polar Security Cutters; the Port of South Louisiana is the largest US tonnage port. Mississippi River navigation locks at Old River Control and the Bonnet Carre Spillway add USACE bridge and lock-gate inspection work. The combined effect: Louisiana mirrors Texas in industry mix but compresses it into one-fifth the geography, which is why contractor crews shuttle weekly between Lake Charles, Baton Rouge, and New Orleans during peak turnaround.",
  topMetros: [
    { name: 'Baton Rouge', slug: 'baton-rouge-la' },
    { name: 'New Orleans', slug: 'new-orleans-la' },
    { name: 'Lake Charles', slug: 'lake-charles-la' },
    { name: 'Lafayette', slug: 'lafayette-la' },
    { name: 'Shreveport', slug: 'shreveport-la' },
    { name: 'Plaquemine', slug: 'plaquemine-la' },
  ],
  regulatoryNotes: [
    {
      id: 'ldeq-laac33',
      source: 'Louisiana Department of Environmental Quality, LAC Title 33 (Environmental Quality) — Air Quality Regulations (Part III) drive LDAR and tank integrity inspection',
      url: 'https://deq.louisiana.gov/',
    },
    {
      id: 'lpsc-pipeline',
      source: 'Louisiana Public Service Commission — Pipeline Safety (intrastate gas distribution, supplements PHMSA)',
      url: 'https://www.lpsc.louisiana.gov/',
    },
    {
      id: 'dnr-office-conservation',
      source: 'Louisiana Department of Natural Resources, Office of Conservation — Pipeline Division regulates intrastate hazardous liquid and oilfield piping (LAC Title 43)',
      url: 'http://www.dnr.louisiana.gov/',
    },
    {
      id: 'bsee-gulf',
      source: 'BSEE 30 CFR Part 250 — applies to all federal OCS operations off Louisiana coast (production safety, well control, structures)',
      url: 'https://www.bsee.gov/',
    },
    {
      id: 'eia-la-refining',
      source: 'EIA Refinery Capacity Report 2023 — Louisiana atmospheric distillation ~3.4 MMbpd across 17 refineries',
      url: 'https://www.eia.gov/petroleum/refinerycapacity/',
    },
  ],
  majorAssetOwners: [
    { name: 'ExxonMobil (Baton Rouge complex)', sector: 'Refining / Petrochemicals' },
    { name: 'Marathon Petroleum (Garyville)', sector: 'Refining' },
    { name: 'Shell (Norco, Convent, Geismar, GoM offshore)', sector: 'Refining / Petrochemicals / Offshore' },
    { name: 'Phillips 66 (Alliance, Lake Charles JV)', sector: 'Refining' },
    { name: 'Valero (Meraux, St. Charles)', sector: 'Refining' },
    { name: 'Cheniere Energy (Sabine Pass — Cameron Parish portion)', sector: 'LNG Export' },
    { name: 'Sempra Infrastructure (Cameron LNG, Port Arthur LNG)', sector: 'LNG Export' },
    { name: 'Venture Global LNG (Calcasieu Pass, Plaquemines)', sector: 'LNG Export' },
    { name: 'Dow Chemical (St. Charles, Plaquemine)', sector: 'Petrochemicals' },
    { name: 'CF Industries (Donaldsonville)', sector: 'Fertilizer / Ammonia' },
    { name: 'Sasol (Lake Charles)', sector: 'Petrochemicals / GTL' },
    { name: 'BP, Chevron, Hess (Gulf of Mexico deepwater)', sector: 'Offshore Oil & Gas' },
    { name: 'Bollinger Shipyards (Lockport, Larose)', sector: 'Marine / Defense' },
  ],
  methodDemand: [
    {
      method: 'Phased Array Ultrasonic Testing (PAUT)',
      demandLevel: 'high',
      reason:
        'Mandatory on cryogenic LNG weld packages at Cameron, Calcasieu Pass, Plaquemines, and Sabine Pass under ASME B31.3. Replaces RT on most petrochem turnaround in-service piping at ExxonMobil Baton Rouge and Marathon Garyville.',
    },
    {
      method: 'Ultrasonic Testing (UT)',
      demandLevel: 'high',
      reason:
        'Thickness surveys on every fixed-equipment item under API 510, every piping circuit under API 570, and every aboveground storage tank under API 653 — and Louisiana has more tanks per square mile than any state.',
    },
    {
      method: 'Radiographic Testing (RT)',
      demandLevel: 'high',
      reason:
        'Default on greenfield LNG and chemical construction. Ir-192 source licensing through Louisiana DEQ Radiation Protection Division under LAC Title 33 Part XV.',
    },
    {
      method: 'Magnetic Particle Testing (MT)',
      demandLevel: 'high',
      reason:
        'Pressure-vessel weld root and final pass acceptance under ASME Section VIII Div 1; also drilling-asset inspection (BOPs, top drives, drill pipe) for offshore service companies based in Port Fourchon and Houma.',
    },
    {
      method: 'Eddy Current Testing (ECT)',
      demandLevel: 'medium',
      reason:
        "Heat-exchanger tube bundle inspection on every refining and petrochem turnaround — a single FCC unit can have 8-12 exchangers with bundles of 500-2,000 tubes each.",
    },
    {
      method: 'Time-of-Flight Diffraction (TOFD)',
      demandLevel: 'medium',
      reason:
        'Heavy-wall vessel welds on coker drums, hydrocrackers, and ammonia converters. ASME Section VIII Div 2 Code Case 2235 acceptance is the typical specification.',
    },
    {
      method: 'Visual Testing / CWI',
      demandLevel: 'high',
      reason:
        'AWS CWI demand peaks during LNG and petrochem greenfield — Bollinger shipyards and offshore fabricators also drive steady CWI billing.',
    },
    {
      method: 'Rope Access / Drone Inspection',
      demandLevel: 'medium',
      reason:
        'Flare stacks, refinery columns, and offshore platform topsides drive rope-access UT and drone visual inspection demand, particularly in the post-hurricane Q4 inspection wave.',
    },
  ],
  certificationAvailability:
    "Louisiana training is concentrated in three nodes. South Louisiana Community College (Lafayette campus and Young Memorial in Morgan City) runs an NDT technology program tied to offshore service company hiring. SOWELA Technical Community College (Lake Charles) feeds LNG and petrochem demand. Baton Rouge Community College offers welding and quality-inspection coursework that funnels into ExxonMobil and Marathon's contractor pipelines. For API ICP testing, Prometric centers in Baton Rouge and Lafayette administer 510/570/653 endorsements. Hellier NDT and Lavender International route satellite courses through Lake Charles for PAUT, TOFD, and ASNT Level III prep. AWS CWI seminars run quarterly in New Orleans and Baton Rouge. Louisiana DEQ administers RSO credentialing for Ir-192 and Co-60 sources, and most contractors use TEEX (Texas A&M) or in-house training to meet 10 CFR 34 industrial radiographer requirements.",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 40000, high: 55000 },
    { role: 'Level II UT/MT/PT Technician', low: 60000, high: 92000 },
    { role: 'Level II PAUT/TOFD Specialist', low: 82000, high: 128000 },
    { role: 'Level III NDT Engineer', low: 110000, high: 170000 },
    { role: 'API 510/570/653 Inspector', low: 92000, high: 142000 },
    { role: 'NDT Field Supervisor', low: 88000, high: 132000 },
    { role: 'Offshore Inspection Specialist (Port Fourchon)', low: 95000, high: 155000 },
  ],
  hiringSeasons:
    "Louisiana follows the Gulf Coast turnaround cycle (spring February-May, fall September-November) but adds two unique pressures. First, the hurricane post-event surge: any major Gulf strike triggers 4-12 weeks of structural, tank, and pressure-equipment damage inspection across the affected parishes. Second, LNG greenfield: Plaquemines LNG construction peaks (2022-2024) drove sustained year-round welding inspector demand; Driftwood, CP2, and Commonwealth LNG will repeat the pattern into 2026-2028. Offshore demand tracks the May-October Gulf weather window and the BSEE 30-day pre-hurricane shut-in inspection mandate. Plan resumes at refining and petrochem contractors 8-10 weeks ahead of each turnaround peak.",
  faqs: [
    {
      q: 'How does Louisiana NDT pay compare to Texas?',
      a: "Louisiana base pay tracks roughly 3-7% below Houston for equivalent roles, but total comp is often comparable or higher once you include per-diem (Lake Charles and Port Fourchon are remote enough that contractor per-diem of $80-$150/day is standard) and hurricane surge work. Baton Rouge refining pay is closest to Houston levels; Lake Charles LNG specialty roles (cryogenic PAUT, heavy-wall TOFD) can exceed Houston rates by 5-10% during peak construction. Offshore NDT through Port Fourchon pays a 25-40% premium over land-based work due to rotational schedules and BSEE certification requirements.",
    },
    {
      q: 'What is the difference between LDEQ, LDNR Office of Conservation, and LPSC for pipeline NDT work?',
      a: "Three separate state authorities split jurisdiction. The Louisiana Department of Environmental Quality (LDEQ) regulates air quality (LAC 33:III) — which drives LDAR and storage-tank integrity work — and radiation protection (LAC 33:XV) for industrial radiography sources. The Department of Natural Resources Office of Conservation, Pipeline Division regulates intrastate hazardous liquid pipelines and oilfield piping under LAC Title 43. The Louisiana Public Service Commission (LPSC) regulates intrastate gas distribution pipelines as the state pipeline safety authority. Interstate pipelines remain under federal PHMSA jurisdiction (49 CFR 192/195). For a working inspector, a typical week can involve all four authorities on different segments of the same operator's system.",
    },
    {
      q: 'Is offshore NDT work worth the rotational schedule?',
      a: "It depends on life situation. Offshore deepwater inspection through Port Fourchon-staged operators (Shell, BP, Chevron, Hess) typically pays 25-40% above onshore equivalents on a per-hour basis, and rotational schedules (14/14 or 21/21) mean half the year on land. Required additions: BSEE-mandated SafeGulf or SafeLandUSA orientation, water survival training (HUET), HUET helicopter underwater egress, and TWIC. For Level II UT/PAUT and rope-access-qualified inspectors with offshore experience, day rates of $700-$1,500 are reachable as 1099 contractors. Career-progression trade-off: less exposure to operator-side inspection engineering roles, which tend to be hired out of refining/petrochem staff pools.",
    },
    {
      q: 'Which Louisiana LNG project offers the most NDT work today?',
      a: "As of construction status: Plaquemines LNG Phase 2 (Venture Global) and Rio Grande LNG (Texas side, but same contractor pool) are the largest active weld-package consumers. Driftwood LNG (Tellurian/Woodside, Calcasieu Parish) and CP2 LNG (Venture Global) are next in the construction pipeline. Cameron LNG Phase 2 (Sempra) and Commonwealth LNG (Cameron Parish) are pre-FID. The reliable forward indicator is the FERC construction status report and the operator's spool-fabrication procurement releases — once spools start landing at the dock, PAUT and RT demand peaks within 60 days.",
    },
    {
      q: 'How do you handle radiation safety for Ir-192 source work in Louisiana?',
      a: "Louisiana is an NRC Section 274b agreement state, meaning LDEQ Radiation Protection Division administers byproduct material licensing under LAC 33:XV instead of NRC directly. Industrial radiographers must hold a Louisiana Radiographer Certification Card (issued by LDEQ after passing the state exam or holding a current ASNT/ANST RTI certification), the employer must hold an LDEQ Radioactive Materials License with proper field-use authorization, and field operations must comply with LAC 33:XV §1503-1517 mirror provisions of 10 CFR 34. Two-person rule applies. Survey instruments must be calibrated within the prior six months. Radiation safety officer (RSO) credentialing requires 40-hour formal training plus operational experience.",
    },
  ],
  internalLinks: [
    { href: '/states/tx', label: 'Texas NDT market guide', context: 'Texas and Louisiana share the Gulf Coast contractor pool — crews routinely shuttle between Lake Charles and Port Arthur within the same turnaround window.' },
    { href: '/states/ms', label: 'Mississippi NDT market guide', context: 'Mississippi shipbuilding and refining (Pascagoula, Chevron Pascagoula refinery) is an extension of the Gulf Coast NDT market.' },
    { href: '/states/al', label: 'Alabama NDT market guide', context: 'Mobile and Theodore (AL) sit just east of the Louisiana-Mississippi corridor and share aerospace and marine NDT demand.' },
    { href: '/methods/phased-array-ut', label: 'Phased array ultrasonic testing', context: 'PAUT corrosion mapping is the dominant occupied-refinery method in the Chemical Corridor.' },
    { href: '/methods/radiographic-testing', label: 'Radiographic testing (RT)', context: 'RT remains specified on LNG cryogenic weld packages — every Louisiana LNG project drives sustained Ir-192 source demand.' },
    { href: '/industries/oil-and-gas', label: 'Oil & gas NDT inspection', context: 'Louisiana oil & gas inspection covers downstream refining, midstream pipelines, and offshore deepwater Gulf operations.' },
    { href: '/industries/lng', label: 'LNG NDT inspection', context: 'Louisiana hosts the densest LNG export terminal cluster in the Western Hemisphere.' },
    { href: '/standards/api-510', label: 'API 510 pressure vessel inspection code', context: 'API 510 drives in-service vessel inspection at every Louisiana refinery and petrochem plant.' },
    { href: '/standards/api-653', label: 'API 653 tank inspection code', context: 'Louisiana has more aboveground storage tanks per square mile than any US state — API 653 work is constant.' },
    { href: '/careers/baton-rouge-la', label: 'NDT careers in Baton Rouge', context: 'Baton Rouge is the largest single-metro NDT employer in Louisiana.' },
    { href: '/cost-guide/lake-charles-la/paut', label: 'Lake Charles PAUT cost guide', context: 'PAUT rates in Lake Charles surge during LNG construction peaks.' },
    { href: '/free-tools/calibration-reminder', label: 'Calibration reminder tool', context: 'Hurricane-season turnaround compression in Louisiana makes calibration tracking unforgiving.' },
  ],
  citations: [
    { id: 'eia-la-2023', source: 'EIA Refinery Capacity Report 2023 — Louisiana 3.4 MMbpd across 17 refineries', url: 'https://www.eia.gov/petroleum/refinerycapacity/' },
    { id: 'ldeq-air', source: 'LDEQ Title 33, Part III — Air Quality Regulations', url: 'https://deq.louisiana.gov/' },
    { id: 'ldeq-radiation', source: 'LDEQ Title 33, Part XV — Radiation Protection (mirror of 10 CFR 34 industrial radiography requirements)' },
    { id: 'dnr-office-conservation-pipeline', source: 'Louisiana DNR Office of Conservation, Pipeline Division, LAC Title 43' },
    { id: 'bsee-30cfr250', source: 'BSEE 30 CFR Part 250 — federal OCS production safety and well control', url: 'https://www.bsee.gov/' },
    { id: 'phmsa-la', source: 'PHMSA 49 CFR 192/195 — interstate pipelines crossing Louisiana' },
    { id: 'api-510-2022', source: 'API 510 Pressure Vessel Inspection Code, 11th ed., 2022' },
    { id: 'api-653-2022', source: 'API 653 Tank Inspection, Repair, Alteration, and Reconstruction, 5th ed., 2014 (Addendum 2018)' },
  ],
};

export default state;
