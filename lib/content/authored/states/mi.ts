import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'mi',
  name: 'Michigan',
  abbreviation: 'MI',
  metaTitle: 'Michigan NDT Market Guide: Auto, Marathon Detroit, Dow & Nuclear',
  metaDescription:
    'Michigan NDT is driven by the automotive base (Detroit), the Marathon Detroit refinery, Dow Midland chemicals, steel, and nuclear (Fermi 2, Cook, the Palisades restart). Salaries, regulators, metros.',
  heroLede:
    "Michigan's NDT market blends the automotive heartland with refining, world-scale chemicals and nuclear power. Detroit is the auto capital — GM, Ford and Stellantis headquarters and plants drive casting, forging, weldment and robotic-weld inspection across a deep supplier base. The Marathon Detroit Refinery (~140,000 bpd), the only refinery in the state, anchors API 510/570/653 turnaround work in southwest Detroit. Dow's global headquarters and massive integrated chemical complex at Midland drive constant process-piping and pressure-equipment inspection. Nuclear power adds Fermi 2 (DTE, near Newport), the Cook plant (two units near Bridgman), and — notably — the Palisades restart (Holtec, Covert), the first attempt to bring a fully shut US reactor back to service, which is generating fresh ASME Section XI inspection demand.",
  industryMix:
    "Automotive is the defining sector: General Motors, Ford and Stellantis headquarters and assembly/stamping/powertrain plants concentrate around Detroit, Flint, Lansing and the supplier corridor, driving casting, forging, weld and robotic-UT inspection. Refining centres on the Marathon Detroit Refinery (~140,000 bpd), the only refinery in Michigan, with associated terminals and pipelines. Chemicals are anchored by Dow's global HQ and integrated complex at Midland (one of the largest chemical sites in North America), plus Dow Corning/DuPont-legacy silicones and BASF Wyandotte. Nuclear power: Fermi 2 (DTE Energy, BWR ~1,150 MW near Newport), the D.C. Cook plant (two PWR units near Bridgman, operated by Indiana Michigan Power/AEP), and the Palisades restart led by Holtec at Covert — the first US effort to return a decommissioning reactor to service, reviving Section XI inspection scope. Steel runs through Cleveland-Cliffs Dearborn Works and regional service centres. A large gas-fired and legacy power fleet (DTE, Consumers Energy), plus food processing and aerospace/defense suppliers (Williams International jet engines, Detroit Arsenal), round out the inspection base.",
  topMetros: [
    { name: 'Detroit', slug: 'detroit-mi' },
  ],
  regulatoryNotes: [
    { id: 'egle-air', source: 'Michigan Department of Environment, Great Lakes, and Energy (EGLE) Air Quality Division — refinery and chemical-plant permits drive turnaround/inspection cadence', url: 'https://www.michigan.gov/egle' },
    { id: 'nrc-rad', source: 'NRC 10 CFR 34 — Licenses for Industrial Radiography (governs gamma/X-ray source use in Michigan)' },
    { id: 'mpsc-pipeline', source: 'Michigan Public Service Commission — intrastate gas pipeline safety' },
    { id: 'nrc-mi', source: 'NRC 10 CFR 50 / 50.55a — applies to Fermi 2, D.C. Cook and the Palisades restart (incorporates ASME Section XI)' },
    { id: 'phmsa-mi', source: 'PHMSA 49 CFR 192/195 — interstate gas and liquid pipelines (including Line 5) crossing Michigan' },
  ],
  majorAssetOwners: [
    { name: 'Marathon Petroleum (Detroit refinery)', sector: 'Refining' },
    { name: 'Dow (Midland global HQ + integrated complex)', sector: 'Chemicals' },
    { name: 'General Motors / Ford / Stellantis', sector: 'Automotive' },
    { name: 'DTE Energy (Fermi 2 nuclear)', sector: 'Nuclear Power' },
    { name: 'Indiana Michigan Power / AEP (D.C. Cook nuclear)', sector: 'Nuclear Power' },
    { name: 'Holtec International (Palisades restart, Covert)', sector: 'Nuclear Power' },
    { name: 'Cleveland-Cliffs (Dearborn Works)', sector: 'Steel' },
    { name: 'BASF (Wyandotte)', sector: 'Chemicals' },
    { name: 'Williams International (jet engines)', sector: 'Aerospace / Defense' },
  ],
  methodDemand: [
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'high', reason: 'Automotive casting, forging and weldment inspection across the GM/Ford/Stellantis supply base; steel and structural welds.' },
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'Marathon Detroit turnaround thickness surveys, Dow Midland process equipment, casting/forging UT, nuclear baseline.' },
    { method: 'Liquid Penetrant Testing (PT)', demandLevel: 'high', reason: 'Automotive and aerospace precision components (Williams International), Dow stainless welds, nuclear stainless.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'high', reason: 'Refinery and Dow corrosion mapping, and nuclear Section XI weld inspection at Fermi/Cook/Palisades.' },
    { method: 'Eddy Current Testing (ECT)', demandLevel: 'high', reason: 'Nuclear steam-generator/condenser tubes and Dow/refinery heat exchangers.' },
    { method: 'Radiographic Testing (RT)', demandLevel: 'medium', reason: 'Casting RT in manufacturing; refinery and pipeline weld fabrication.' },
    { method: 'Visual Testing / CWI', demandLevel: 'high', reason: 'AWS CWI demand across automotive, refining, chemicals and MDOT bridge inspection.' },
  ],
  certificationAvailability:
    "Delta College (University Center, near Midland) feeds the Dow chemical complex with NDT and process-technology programs. Macomb Community College, Henry Ford College (Dearborn) and Wayne County Community College serve the Detroit automotive and refining base. Lake Superior State and Northern Michigan serve the upper state. The automotive OEMs and Tier-1 suppliers run extensive in-house NDT (robotic UT weld inspection on body-in-white, casting MT/RT) to their own written practices alongside contracted services. Hellier NDT and Lavender International route satellite courses through the Detroit area. API ICP and AWS CWI exams sit at Prometric centres in Detroit and Grand Rapids. Nuclear NDT at Fermi 2, Cook and the Palisades restart is administered by the operators under 10 CFR 50.55a-incorporated ASME Section XI; the Palisades restart in particular is generating fresh Section XI Level II demand. Industrial-radiography licensing follows NRC 10 CFR 34.",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 41000, high: 57000 },
    { role: 'Level II UT/MT/PT Technician', low: 59000, high: 93000 },
    { role: 'Automotive NDT Technician', low: 58000, high: 95000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 83000, high: 126000 },
    { role: 'Level III NDT Engineer', low: 110000, high: 165000 },
    { role: 'Nuclear ASME Section XI Inspector', low: 92000, high: 144000 },
    { role: 'API 510/570/653 Inspector', low: 88000, high: 138000 },
  ],
  hiringSeasons:
    "Automotive NDT runs year round on production cadence, with surges around model-year retooling and new-line launches. Marathon Detroit turnarounds cluster spring and fall. Dow Midland runs a continuous integrity programme with turnaround peaks in the shoulder seasons. Nuclear refueling outages at Fermi 2 and Cook run on 18-24 month cycles; the Palisades restart (Holtec) is generating a concentrated, multi-year inspection workforce surge through commissioning.",
  faqs: [
    { q: 'Is Michigan mostly automotive NDT?', a: 'Automotive is the largest single sector — GM, Ford and Stellantis plus a deep supplier base drive casting, forging, weld and robotic-UT inspection — but Michigan also has the Marathon Detroit refinery, Dow\'s massive Midland chemical complex, steel at Dearborn, and three nuclear sites, so the inspection mix is broader than cars alone.' },
    { q: 'What is the Palisades restart and why does it matter for NDT?', a: 'Palisades (Covert) is a shut-down PWR that Holtec is working to return to service — the first attempt to restart a fully decommissioned US reactor. Bringing it back requires extensive ASME Section XI baseline inspection of Class 1/2/3 piping, reactor-vessel and steam-generator work, and replacement-component verification, creating a concentrated, multi-year demand for Section XI Level II UT/PAUT/ECT inspectors.' },
    { q: 'How much refining work is in Michigan?', a: 'One refinery — Marathon Detroit (~140,000 bpd) — anchors API 510/570/653 turnaround work in southwest Detroit, with associated terminals and pipelines (including the Line 5 corridor). It is a steady but single-site refining market compared with multi-refinery states.' },
    { q: 'Does Dow Midland drive much inspection?', a: 'Yes. Dow\'s integrated Midland complex is one of the largest chemical sites in North America, with continuous process-piping and pressure-equipment inspection (UT thickness, PAUT corrosion mapping, ECT heat exchangers, PT on stainless) under OSHA PSM mechanical-integrity requirements.' },
    { q: 'What certifications matter most in Michigan?', a: 'For automotive, ASNT Level II in MT/PT/UT/RT plus AWS CWI for weld inspection. For nuclear (Fermi, Cook, Palisades), ASME Section XI Level II plus unescorted-access clearance. For refining and chemicals, API 510/570/653 and ASNT/PCN Level II in UT/PAUT. For aerospace suppliers, NAS 410.' },
  ],
  internalLinks: [
    { href: '/states/oh', label: 'Ohio NDT market guide', context: 'Midwest auto, refining and steel share a contractor pool.' },
    { href: '/states/in', label: 'Indiana NDT market guide', context: 'NW Indiana steel and the Chicago corridor are a short drive.' },
    { href: '/states/il', label: 'Illinois NDT market guide', context: 'The largest US nuclear fleet is next door for ISI rotation.' },
    { href: '/industries/manufacturing', label: 'Automotive NDT inspection', context: 'Michigan is the US automotive capital.' },
    { href: '/industries/nuclear', label: 'Nuclear power NDT inspection', context: 'Fermi 2, Cook and the Palisades restart.' },
    { href: '/methods/phased-array-ut', label: 'Phased array UT (PAUT)' },
    { href: '/standards/api-510', label: 'API 510 pressure-vessel inspection', context: 'Governs the Marathon Detroit and Dow fixed equipment.' },
    { href: '/careers/detroit-mi', label: 'NDT careers in Detroit' },
    { href: '/ndt-services/detroit-mi', label: 'NDT services & rates in Detroit' },
  ],
  citations: [
    { id: 'eia-mi-detroit', source: 'EIA Refinery Capacity Report — Marathon Detroit refinery', url: 'https://www.eia.gov/petroleum/refinerycapacity/' },
    { id: 'nrc-mi-units', source: 'NRC — Fermi 2, D.C. Cook, and Palisades (restart) reactor information', url: 'https://www.nrc.gov/' },
    { id: 'holtec-palisades', source: 'Holtec International — Palisades restart program (first US reactor restart)' },
    { id: 'dow-midland', source: 'Dow — Michigan Operations (Midland) integrated complex' },
    { id: 'nrc-10cfr34', source: 'NRC 10 CFR 34 — Licenses for Industrial Radiography' },
  ],
};

export default state;
