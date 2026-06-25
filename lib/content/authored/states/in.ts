import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'in',
  name: 'Indiana',
  abbreviation: 'IN',
  metaTitle: 'Indiana NDT Market Guide: BP Whiting, NW Indiana Steel & Manufacturing',
  metaDescription:
    'Indiana hosts BP Whiting (one of the largest US refineries), the densest steelmaking region in North America (Gary, Burns Harbor, Indiana Harbor), Cummins, and a deep auto base. Salaries, regulators, metros.',
  heroLede:
    "Indiana's NDT market is anchored by two heavyweight clusters in the northwest corner of the state. BP Whiting — at roughly 435,000 bpd one of the largest refineries in the United States — sits on Lake Michigan and runs a continuous turnaround and integrity programme that drives heavy API 510/570/653, UT and PAUT demand. Immediately around it is the densest integrated steelmaking region in North America: U.S. Steel Gary Works, Cleveland-Cliffs Burns Harbor, and Cleveland-Cliffs Indiana Harbor (East Chicago) together make Northwest Indiana the country's largest steel-producing area. Add Cummins (Columbus) engine manufacturing, a broad automotive assembly base (Subaru Lafayette, Toyota Princeton, GM Fort Wayne), and Eli Lilly pharmaceutical operations in Indianapolis, and Indiana offers a diversified, manufacturing-heavy inspection market.",
  industryMix:
    "Refining is dominated by BP Whiting (~435,000 bpd), one of the largest refineries in the US and the anchor of the Lake Michigan industrial corridor; CountryMark operates a smaller refinery at Mount Vernon in the southwest. Steel defines Northwest Indiana: U.S. Steel Gary Works (the company's largest plant), Cleveland-Cliffs Burns Harbor, and Cleveland-Cliffs Indiana Harbor (East Chicago) — the largest integrated steel mill in North America — plus ArcelorMittal-legacy coke and a dense fabricator/service-centre base. Heavy manufacturing runs through Cummins (Columbus — diesel and natural-gas engines), the automotive assembly plants (Subaru of Indiana Automotive in Lafayette, Toyota Princeton, GM Fort Wayne, Stellantis Kokomo), and Allison Transmission (Indianapolis). Pharmaceuticals and life sciences centre on Eli Lilly (Indianapolis). Indiana has no operating commercial nuclear reactors, so the inspection mix leans toward refining fixed-equipment, primary-steel, and manufacturing casting/weldment NDT rather than nuclear ISI. Pipeline and midstream work feeds the Whiting complex and crosses the state on interstate systems.",
  topMetros: [
    { name: 'Gary / Northwest Indiana', slug: 'gary-in' },
    { name: 'Indianapolis', slug: 'indianapolis-in' },
  ],
  regulatoryNotes: [
    { id: 'idem-air', source: 'Indiana Department of Environmental Management (IDEM) Office of Air Quality — refinery and steel-mill permits drive turnaround/inspection cadence', url: 'https://www.in.gov/idem/' },
    { id: 'isdh-radiation', source: 'Indiana Department of Health Radiological Health Section — industrial radiography registration' },
    { id: 'iurc-pipeline', source: 'Indiana Utility Regulatory Commission (IURC) Pipeline Safety Division — intrastate gas' },
    { id: 'phmsa-in', source: 'PHMSA 49 CFR 192/195 — interstate gas and liquid pipelines crossing Indiana' },
    { id: 'osha-psm', source: 'OSHA 29 CFR 1910.119 Process Safety Management — drives mechanical-integrity inspection at Whiting and chemical plants' },
  ],
  majorAssetOwners: [
    { name: 'BP (Whiting refinery)', sector: 'Refining' },
    { name: 'CountryMark (Mount Vernon refinery)', sector: 'Refining' },
    { name: 'U.S. Steel (Gary Works)', sector: 'Steel' },
    { name: 'Cleveland-Cliffs (Burns Harbor, Indiana Harbor)', sector: 'Steel' },
    { name: 'Cummins Inc. (Columbus)', sector: 'Heavy Manufacturing' },
    { name: 'Subaru of Indiana Automotive (Lafayette)', sector: 'Automotive' },
    { name: 'Toyota Motor Manufacturing (Princeton)', sector: 'Automotive' },
    { name: 'Eli Lilly and Company (Indianapolis)', sector: 'Pharmaceutical' },
    { name: 'Allison Transmission (Indianapolis)', sector: 'Heavy Manufacturing' },
  ],
  methodDemand: [
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'BP Whiting turnaround thickness surveys; primary-steel plate and slab UT to ASTM A578/A435.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'high', reason: 'Whiting occupied-unit corrosion mapping and weld inspection; steel-mill heavy-section UT.' },
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'high', reason: 'Steel-mill equipment, OCTG/structural welds, and manufacturing casting/forging inspection.' },
    { method: 'Radiographic Testing (RT)', demandLevel: 'medium', reason: 'Refinery and pipeline weld fabrication; casting RT in manufacturing.' },
    { method: 'Liquid Penetrant Testing (PT)', demandLevel: 'medium', reason: 'Pharmaceutical hygienic stainless welds (Lilly), aerospace/engine components (Cummins, Allison).' },
    { method: 'Eddy Current Testing (ECT)', demandLevel: 'medium', reason: 'Refinery and chemical-plant heat-exchanger tube inspection at Whiting.' },
    { method: 'Visual Testing / CWI', demandLevel: 'high', reason: 'AWS CWI demand across steel, refining and INDOT bridge inspection.' },
  ],
  certificationAvailability:
    "Ivy Tech Community College runs NDT and welding programs across its statewide campus network, with the Northwest (Gary/Valparaiso) campuses feeding the steel and Whiting refining workforce. Purdue University Northwest (Hammond) and Indiana University Northwest serve the steel corridor with engineering and technology programs. Vincennes University feeds the southwest (CountryMark, Toyota Princeton). Ivy Tech Columbus and the Cummins technical pipeline feed the engine-manufacturing base, and Indianapolis campuses serve Lilly and Allison. Hellier NDT and Lavender International route satellite courses through the Chicago/NW-Indiana area. API ICP exams sit at Prometric centres in Indianapolis and the Chicago area; AWS CWI seminars run regularly in the steel corridor. Because Indiana has no operating reactors, the nuclear-ISI specialty is served by inspectors who travel to neighbouring Illinois and Michigan. Industrial-radiography registration is handled by the Indiana Department of Health Radiological Health Section.",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 41000, high: 57000 },
    { role: 'Level II UT/MT/PT Technician', low: 59000, high: 93000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 83000, high: 126000 },
    { role: 'Level III NDT Engineer', low: 110000, high: 165000 },
    { role: 'API 510/570/653 Inspector', low: 90000, high: 140000 },
    { role: 'Steel-Mill NDT Specialist', low: 70000, high: 110000 },
    { role: 'NDT Field Supervisor', low: 88000, high: 132000 },
  ],
  hiringSeasons:
    "BP Whiting turnarounds cluster spring and fall and are the single largest inspection hiring events in the state, drawing large contracted crews. Steel-mill outages at Gary, Burns Harbor and Indiana Harbor cluster mid-summer and December-January when production demand softens. Manufacturing NDT at Cummins, the auto plants, Allison and Lilly runs on production cadence year round, smoothing the inspector workload between refining/steel turnaround peaks.",
  faqs: [
    { q: 'How big is BP Whiting for NDT work?', a: 'Very big. At roughly 435,000 bpd, Whiting is one of the largest refineries in the United States, so its turnarounds draw large contracted inspection crews and its ongoing integrity programme keeps API 510/570/653 inspectors and UT/PAUT technicians busy. It is the single most important NDT customer in Indiana.' },
    { q: 'Why is Northwest Indiana important for steel NDT?', a: 'Northwest Indiana is the largest steel-producing region in North America — U.S. Steel Gary Works, Cleveland-Cliffs Burns Harbor, and Cleveland-Cliffs Indiana Harbor (the largest integrated mill on the continent). That concentration creates steady demand for thru-thickness plate UT (ASTM A578/A435), surface eddy current on rolls, and structural/weld MT, a specialty distinct from the refining-and-pipeline world.' },
    { q: 'Is there nuclear NDT work in Indiana?', a: 'No — Indiana has no operating commercial nuclear reactors. Inspectors who want nuclear ASME Section XI work travel to the large fleets in neighbouring Illinois and Michigan. Indiana\'s inspection mix leans toward refining fixed-equipment, primary steel, and manufacturing.' },
    { q: 'What manufacturing NDT exists beyond steel and refining?', a: 'Cummins (Columbus) drives engine-component casting and weldment inspection; Allison Transmission and the automotive plants (Subaru Lafayette, Toyota Princeton, GM Fort Wayne) add casting and weld NDT; and Eli Lilly drives hygienic stainless-weld PT in Indianapolis. This base runs year round, independent of refining and steel turnaround cycles.' },
    { q: 'Where should an inspector base in Indiana?', a: 'Northwest Indiana (the Gary/Hammond/Whiting corridor) is the centre of gravity — refining and the densest steel cluster in North America in one drive, with the Chicago market next door. Indianapolis suits manufacturing- and pharma-focused inspectors at Lilly, Allison and the regional auto plants.' },
  ],
  internalLinks: [
    { href: '/states/il', label: 'Illinois NDT market guide', context: 'The Chicago refining and nuclear corridor is a short drive from NW Indiana.' },
    { href: '/states/oh', label: 'Ohio NDT market guide', context: 'Midwest refining and steel share a contractor pool.' },
    { href: '/states/mi', label: 'Michigan NDT market guide', context: 'Detroit-area refining and automotive complement Indiana manufacturing.' },
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic testing (UT)', context: 'Thru-thickness UT is the core steel-plate method.' },
    { href: '/methods/phased-array-ut', label: 'Phased array UT (PAUT)' },
    { href: '/industries/manufacturing', label: 'Steel industry NDT inspection' },
    { href: '/standards/api-510', label: 'API 510 pressure-vessel inspection', context: 'Governs BP Whiting fixed equipment.' },
    { href: '/careers/gary-in', label: 'NDT careers in Northwest Indiana' },
    { href: '/ndt-services/gary-in', label: 'NDT services & rates in Gary' },
  ],
  citations: [
    { id: 'eia-in-whiting', source: 'EIA Refinery Capacity Report — Indiana (BP Whiting, CountryMark Mount Vernon)', url: 'https://www.eia.gov/petroleum/refinerycapacity/' },
    { id: 'aisi-nw-indiana', source: 'American Iron and Steel Institute — Northwest Indiana integrated steelmaking (Gary, Burns Harbor, Indiana Harbor)' },
    { id: 'idem', source: 'Indiana Department of Environmental Management — air permitting' },
    { id: 'astm-a578', source: 'ASTM A578/A578M — Straight-Beam Ultrasonic Examination of Rolled Steel Plates' },
    { id: 'osha-psm', source: 'OSHA 29 CFR 1910.119 — Process Safety Management' },
  ],
};

export default state;
