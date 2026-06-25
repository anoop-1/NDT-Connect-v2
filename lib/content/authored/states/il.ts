import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'il',
  name: 'Illinois',
  abbreviation: 'IL',
  metaTitle: 'Illinois NDT Market Guide: Refining, Petrochem & Nuclear (11 Units)',
  metaDescription:
    'Illinois runs four major refineries (ExxonMobil Joliet, Citgo Lemont, Phillips 66 Wood River, Marathon Robinson), the most nuclear reactors of any US state (11), and a deep manufacturing base. Salaries, regulators, metros.',
  heroLede:
    "Illinois carries one of the heaviest combined refining-and-nuclear NDT loads in the country. Four major refineries operate in the state — ExxonMobil Joliet, Citgo Lemont, Phillips 66 Wood River (Roxana), and Marathon Robinson — making the Chicago/Joliet corridor and the lower Mississippi tier dense with API 510/570/653 turnaround work. Illinois also has more operating commercial nuclear reactors than any other US state: eleven units across Braidwood, Byron, Dresden, LaSalle, Clinton and Quad Cities, all operated by Constellation, each running ASME Section XI inservice inspection on 10-year intervals with 18-24 month refueling-outage surges. Layered on top is a heavy-manufacturing base — Caterpillar (Peoria/Decatur), John Deere (Quad Cities), and Archer Daniels Midland (Decatur) — that adds structural, casting and pressure-equipment NDT year round.",
  industryMix:
    "Refining is anchored by ExxonMobil Joliet (~250,000 bpd), Citgo Lemont (~180,000 bpd), Phillips 66 Wood River in Roxana (~340,000 bpd, one of the largest in the Midwest, jointly with WRB/Cenovus), and Marathon Robinson (~250,000 bpd) in southeastern Illinois. Petrochemicals run through ExxonMobil Channahon (olefins), LyondellBasell, INEOS Joliet, and Stepan. The Chicago area is a major crude-and-products pipeline hub feeding the region. Nuclear power is dominant: Braidwood (2 units), Byron (2), Dresden (2), LaSalle (2), Clinton (1) and Quad Cities (2) — eleven Constellation-operated reactors, the largest nuclear fleet of any state, anchoring Illinois’s clean-energy generation and a major share of US commercial nuclear ISI demand. Heavy manufacturing is a defining sector: Caterpillar (Peoria, Decatur, Aurora), John Deere (Moline/Quad Cities), Archer Daniels Midland and Tate & Lyle (Decatur agri-processing), and Navistar. Steel and metals run through service centres across the Chicago region. Together these give Illinois a diversified inspection base that does not depend on any single commodity cycle.",
  topMetros: [
    { name: 'Chicago', slug: 'chicago-il' },
    { name: 'Peoria (Caterpillar)', slug: 'peoria-il' },
    { name: 'Decatur (ADM, Caterpillar)', slug: 'decatur-il' },
    { name: 'Rockford', slug: 'rockford-il' },
    { name: 'Bloomington', slug: 'bloomington-il' },
  ],
  regulatoryNotes: [
    { id: 'illinois-epa', source: 'Illinois EPA Bureau of Air — refinery and petrochemical permits drive turnaround/inspection cadence', url: 'https://epa.illinois.gov/' },
    { id: 'iema-radiation', source: 'Illinois Emergency Management Agency (IEMA) Division of Nuclear Safety — industrial radiography licensing (Illinois is an NRC Agreement State)' },
    { id: 'icc-pipeline', source: 'Illinois Commerce Commission Pipeline Safety Program — intrastate gas and hazardous liquid' },
    { id: 'nrc-il', source: 'NRC 10 CFR 50 / 50.55a — applies to all eleven Illinois reactors (incorporates ASME Section XI)' },
    { id: 'phmsa-il', source: 'PHMSA 49 CFR 192/195 — interstate gas and liquid pipelines crossing Illinois' },
  ],
  majorAssetOwners: [
    { name: 'ExxonMobil (Joliet refinery)', sector: 'Refining' },
    { name: 'Citgo (Lemont refinery)', sector: 'Refining' },
    { name: 'Phillips 66 / WRB (Wood River, Roxana)', sector: 'Refining' },
    { name: 'Marathon Petroleum (Robinson refinery)', sector: 'Refining' },
    { name: 'ExxonMobil Chemical (Channahon olefins)', sector: 'Petrochemical' },
    { name: 'Constellation Energy (Braidwood, Byron, Dresden, LaSalle, Clinton, Quad Cities)', sector: 'Nuclear Power' },
    { name: 'Caterpillar Inc. (Peoria, Decatur, Aurora)', sector: 'Heavy Manufacturing' },
    { name: 'John Deere (Quad Cities)', sector: 'Heavy Manufacturing' },
    { name: 'Archer Daniels Midland (Decatur)', sector: 'Agri-Processing' },
  ],
  methodDemand: [
    { method: 'Nuclear ASME Section XI ISI', demandLevel: 'high', reason: 'Eleven reactors — the largest US state fleet — run continuous refueling-outage ISI (UT, PAUT, ECT, VT); Illinois is one of the top US states for nuclear inspection demand.' },
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'Refinery turnaround thickness surveys at Joliet, Lemont, Wood River and Robinson; manufacturing casting/forging UT.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'high', reason: 'Refinery occupied-unit corrosion mapping and nuclear Section XI weld inspection.' },
    { method: 'Eddy Current Testing (ECT)', demandLevel: 'high', reason: 'Nuclear steam-generator/condenser tube inspection across the Constellation fleet; refinery heat exchangers.' },
    { method: 'Radiographic Testing (RT)', demandLevel: 'medium', reason: 'Refinery and pipeline weld fabrication; manufacturing casting RT.' },
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'high', reason: 'Caterpillar/John Deere casting and weldment inspection; refinery structural welds.' },
    { method: 'Liquid Penetrant Testing (PT)', demandLevel: 'medium', reason: 'Nuclear stainless welds, manufacturing precision components.' },
    { method: 'Visual Testing / CWI', demandLevel: 'high', reason: 'AWS CWI demand across heavy manufacturing, refining and IDOT bridge inspection.' },
  ],
  certificationAvailability:
    "Lewis and Clark Community College (Godfrey, near Wood River) and Lincoln Land Community College (Springfield) feed the southern refining and Decatur manufacturing workforce. College of DuPage, Moraine Valley and the City Colleges of Chicago run NDT and welding programs serving the Joliet/Lemont refining corridor and the manufacturing base. Illinois Central College (Peoria) and Richland (Decatur) feed Caterpillar and ADM. Black Hawk College (Moline) feeds John Deere and the Quad Cities. Hellier NDT and Lavender International route satellite courses through Chicago. API ICP exams sit at Prometric centres in Chicago, Peoria and Springfield; AWS CWI seminars run regularly in Chicago. Nuclear NDT qualification across the eleven units is administered by Constellation under 10 CFR 50.55a-incorporated ASME Section XI — a large, steady source of ISI specialist demand. Industrial-radiography source licensing is handled by IEMA Division of Nuclear Safety.",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 42000, high: 58000 },
    { role: 'Level II UT/MT/PT Technician', low: 60000, high: 94000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 84000, high: 128000 },
    { role: 'Level III NDT Engineer', low: 112000, high: 168000 },
    { role: 'Nuclear ASME Section XI Inspector', low: 95000, high: 148000 },
    { role: 'API 510/570/653 Inspector', low: 90000, high: 140000 },
    { role: 'NDT Field Supervisor', low: 90000, high: 135000 },
  ],
  hiringSeasons:
    "Refinery turnarounds at Joliet, Lemont, Wood River and Robinson cluster spring and fall. Nuclear refueling outages across the eleven Constellation units are near-continuous as a fleet — there is almost always an Illinois outage in progress during spring and fall windows, each drawing 100-200 ISI specialists for several weeks, making Illinois one of the most reliable states for rotating nuclear inspection work. Manufacturing NDT at Caterpillar, Deere and ADM runs on production cadence year round.",
  faqs: [
    { q: 'Why is Illinois important for nuclear NDT?', a: 'Illinois has eleven operating commercial reactors — the most of any US state — across Braidwood, Byron, Dresden, LaSalle, Clinton and Quad Cities, all operated by Constellation. With that many units, there is almost always a refueling outage in progress during spring and fall, so ASME Section XI ISI specialists (UT, PAUT, ECT, VT) have unusually steady demand without leaving the state.' },
    { q: 'How strong is Illinois refining for inspectors?', a: 'Strong. Four major refineries — ExxonMobil Joliet, Citgo Lemont, Phillips 66 Wood River and Marathon Robinson — give API 510/570/653 inspectors and UT/PAUT technicians a full turnaround calendar in the Chicago/Joliet corridor and the southern Mississippi tier.' },
    { q: 'Is there manufacturing NDT work beyond oil and nuclear in Illinois?', a: 'Yes. Caterpillar (Peoria, Decatur, Aurora), John Deere (Quad Cities) and Archer Daniels Midland (Decatur) drive casting, forging, weldment and pressure-equipment inspection year round — a base that does not follow the refining or nuclear cycles, which smooths inspector workload.' },
    { q: 'What certifications matter most in Illinois?', a: 'For the nuclear fleet, ASME Section XI Level II (UT, PAUT, ECT, VT) plus unescorted-access clearance and 10 CFR 26 fitness-for-duty. For refining, API 510/570/653 and ASNT/PCN Level II in UT/PAUT. For manufacturing, ASNT Level II in MT/PT/UT and AWS CWI for weld inspection.' },
    { q: 'Where should an inspector base in Illinois?', a: 'The Chicago/Joliet corridor gives access to two refineries, petrochemicals and several nuclear units within driving distance. The southern tier (Wood River/Roxana and Robinson) suits refining-focused inspectors. Peoria/Decatur suits manufacturing-focused work at Caterpillar and ADM.' },
  ],
  internalLinks: [
    { href: '/states/in', label: 'Indiana NDT market guide', context: 'BP Whiting and Gary steel are a short drive from the Chicago corridor.' },
    { href: '/states/oh', label: 'Ohio NDT market guide', context: 'Midwest refining, steel and nuclear share a contractor pool.' },
    { href: '/industries/nuclear', label: 'Nuclear power NDT inspection', context: 'Illinois has the largest US nuclear fleet.' },
    { href: '/methods/eddy-current-testing', label: 'Eddy current testing (ECT)', context: 'ECT is the workhorse for nuclear steam-generator tubes.' },
    { href: '/methods/phased-array-ut', label: 'Phased array UT (PAUT)' },
    { href: '/standards/api-510', label: 'API 510 pressure-vessel inspection' },
    { href: '/careers/chicago-il', label: 'NDT careers in Chicago' },
    { href: '/ndt-services/chicago-il', label: 'NDT services & rates in Chicago' },
  ],
  citations: [
    { id: 'eia-il-refining', source: 'EIA Refinery Capacity Report — Illinois (Joliet, Lemont, Wood River, Robinson)', url: 'https://www.eia.gov/petroleum/refinerycapacity/' },
    { id: 'nrc-il-fleet', source: 'NRC — Illinois operating reactors (Braidwood, Byron, Dresden, LaSalle, Clinton, Quad Cities)', url: 'https://www.nrc.gov/' },
    { id: 'iema-dns', source: 'Illinois Emergency Management Agency, Division of Nuclear Safety — radioactive materials licensing' },
    { id: 'nrc-10cfr5055a', source: 'NRC 10 CFR 50.55a — incorporates ASME Section XI for nuclear inservice inspection' },
    { id: 'eia-il-nuclear', source: 'EIA — Illinois leads US states in nuclear generating capacity' },
  ],
};

export default state;
