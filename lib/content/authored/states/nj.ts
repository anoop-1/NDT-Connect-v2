import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'nj',
  name: 'New Jersey',
  abbreviation: 'NJ',
  metaTitle: 'New Jersey NDT Market Guide: Refining, Pharma, Tank Farms & Nuclear',
  metaDescription:
    'New Jersey NDT spans the Phillips 66 Bayway & PBF Paulsboro refineries, the NY/NJ port tank farms, a dense pharma/chemical corridor, and PSEG nuclear (Salem, Hope Creek). Salaries, regulators, metros.',
  heroLede:
    "New Jersey packs refining, one of the largest petroleum-storage clusters on the US East Coast, a dense pharmaceutical and chemical corridor, and nuclear power into a small footprint. Phillips 66 Bayway (Linden, ~258,000 bpd) and PBF Energy Paulsboro (~180,000 bpd) anchor refining, surrounded by enormous tank farms at Linden, Carteret, Bayonne and Perth Amboy that feed the New York Harbor market — making API 653 above-ground-storage-tank inspection a constant. The Port of New York and New Jersey (Newark/Elizabeth) is the largest container port on the East Coast. PSEG's Artificial Island complex (Salem two units + Hope Creek) runs three reactors on ASME Section XI inservice inspection. And New Jersey's pharmaceutical and specialty-chemical industry — Johnson & Johnson, Merck, Bristol Myers Squibb, BASF — drives high-purity process-piping inspection.",
  industryMix:
    "Refining and petroleum storage define the northern and southern industrial zones: Phillips 66 Bayway (Linden), PBF Energy Paulsboro, and one of the densest above-ground-storage-tank concentrations in the country (Linden, Carteret, Bayonne, Perth Amboy, Sewaren) serving New York Harbor — IMTT, Buckeye, Kinder Morgan and Phillips 66 terminals. Chemicals and pharmaceuticals are a defining New Jersey sector: Johnson & Johnson, Merck, Bristol Myers Squibb, Bayer, and BASF run process plants and R&D across the central corridor, demanding hygienic and high-purity stainless-weld inspection. Nuclear power: PSEG Nuclear's Artificial Island (Lower Alloways Creek) runs Salem 1 & 2 and Hope Creek — three reactors, among the largest US nuclear sites — on Section XI ISI. The Port of NY/NJ (Newark/Elizabeth) plus marine terminals add crane, structural and tank inspection. Power generation (PSEG, gas-fired fleet) and a broad manufacturing base round out the inspection market.",
  topMetros: [
    { name: 'Newark / North Jersey', slug: 'newark-nj' },
  ],
  regulatoryNotes: [
    { id: 'njdep', source: 'New Jersey DEP — air permits and the Toxic Catastrophe Prevention Act (TCPA) drive refinery/chemical inspection cadence', url: 'https://dep.nj.gov/' },
    { id: 'nj-rad', source: 'NJ DEP Bureau of X-ray Compliance / Radiation Protection — industrial radiography licensing (New Jersey is an NRC Agreement State)' },
    { id: 'nrc-nj', source: 'NRC 10 CFR 50 / 50.55a — Salem and Hope Creek (incorporates ASME Section XI)' },
    { id: 'osha-psm', source: 'OSHA 29 CFR 1910.119 PSM — mechanical-integrity inspection at Bayway, Paulsboro and chemical plants' },
    { id: 'phmsa-nj', source: 'PHMSA 49 CFR 192/195 — interstate pipelines and the harbor terminal network' },
  ],
  majorAssetOwners: [
    { name: 'Phillips 66 (Bayway refinery, Linden)', sector: 'Refining' },
    { name: 'PBF Energy (Paulsboro refinery)', sector: 'Refining' },
    { name: 'IMTT / Buckeye / Kinder Morgan (harbor tank terminals)', sector: 'Storage / Terminals' },
    { name: 'PSEG Nuclear (Salem, Hope Creek)', sector: 'Nuclear Power' },
    { name: 'Johnson & Johnson / Merck / Bristol Myers Squibb', sector: 'Pharmaceutical' },
    { name: 'BASF', sector: 'Chemicals' },
    { name: 'Port of New York and New Jersey (Newark/Elizabeth)', sector: 'Marine / Port' },
  ],
  methodDemand: [
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'Refinery turnaround thickness surveys (Bayway, Paulsboro), tank-shell UT, nuclear baseline, chemical-plant fixed equipment.' },
    { method: 'Magnetic Flux Leakage (MFL) / API 653', demandLevel: 'high', reason: 'Dense harbor tank-farm floors — MFL floor scanning and API 653 in/out-of-service inspection is constant.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'high', reason: 'Refinery occupied-unit corrosion mapping and nuclear Section XI weld inspection at Salem/Hope Creek.' },
    { method: 'Liquid Penetrant Testing (PT)', demandLevel: 'high', reason: 'Pharmaceutical hygienic stainless welds (J&J, Merck, BMS) and nuclear stainless.' },
    { method: 'Eddy Current Testing (ECT)', demandLevel: 'high', reason: 'Nuclear steam-generator/condenser tubes; refinery and chemical heat exchangers.' },
    { method: 'Radiographic Testing (RT)', demandLevel: 'medium', reason: 'Refinery and terminal weld fabrication; pipeline tie-ins.' },
    { method: 'Visual Testing / CWI', demandLevel: 'high', reason: 'Refining, terminal and port construction plus NJDOT bridge inspection.' },
  ],
  certificationAvailability:
    "Camden County College and Rowan College (Gloucester/Burlington) feed the Paulsboro refining and southern-corridor workforce; Middlesex College and Union County College serve the Linden/Bayway refining and central pharma corridor. Salem Community College (Carneys Point) sits adjacent to the PSEG Artificial Island nuclear complex and feeds its workforce. Refinery and tank-terminal work runs on API 510/570/653 plus operator-qualified (OQ) requirements; pharma on ASNT Level II with validation-grade documentation; nuclear at Salem/Hope Creek under 10 CFR 50.55a-incorporated ASME Section XI. Hellier NDT and Lavender International route satellite courses through the NY/NJ metro. API ICP and AWS CWI exams sit at Prometric centres across North Jersey and Philadelphia (for the southern corridor). Industrial-radiography licensing is via the NJ DEP Bureau of X-ray Compliance.",
  salaryBands: [
    { role: 'Level I NDT Trainee', low: 44000, high: 60000 },
    { role: 'Level II UT/MT/PT Technician', low: 62000, high: 98000 },
    { role: 'API 510/570/653 Inspector', low: 92000, high: 142000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 86000, high: 130000 },
    { role: 'Level III NDT Engineer', low: 115000, high: 172000 },
    { role: 'Nuclear ASME Section XI Inspector', low: 95000, high: 148000 },
    { role: 'NDT Field Supervisor', low: 92000, high: 138000 },
  ],
  hiringSeasons:
    "Refinery turnarounds at Bayway and Paulsboro cluster spring and fall. Tank-farm API 653 inspection runs year round across the harbor terminals. Nuclear refueling outages at Salem and Hope Creek run on 18-24 month cycles, each drawing 100-200 ISI specialists for several weeks. Pharmaceutical and chemical NDT runs on production and validation cadence year round, smoothing the inspector workload between refinery turnaround peaks.",
  faqs: [
    { q: 'What drives NDT demand in New Jersey?', a: 'Four pillars: two refineries (Phillips 66 Bayway in Linden, PBF Paulsboro), one of the densest petroleum tank-farm clusters on the East Coast feeding New York Harbor, a large pharmaceutical/chemical corridor (J&J, Merck, BMS, BASF), and the PSEG nuclear complex (Salem + Hope Creek). It is a compact but very deep inspection market.' },
    { q: 'Why is tank inspection so important in New Jersey?', a: 'The Linden/Carteret/Bayonne/Perth Amboy terminals hold one of the largest concentrations of above-ground petroleum storage in the country, serving the New York Harbor market. That makes API 653 floor (MFL), shell and roof inspection a constant, year-round source of work distinct from refinery turnarounds.' },
    { q: 'How much nuclear NDT is in New Jersey?', a: 'PSEG\'s Artificial Island complex (Lower Alloways Creek) runs three reactors — Salem 1 & 2 and Hope Creek — among the largest US nuclear sites. They run ASME Section XI inservice inspection on 10-year intervals with refueling outages every 18-24 months, drawing ISI specialists for several weeks each.' },
    { q: 'Is there pharmaceutical NDT work in New Jersey?', a: 'Yes — New Jersey is a US pharmaceutical hub (Johnson & Johnson, Merck, Bristol Myers Squibb, Bayer). Pharma process plants drive hygienic, high-purity stainless-weld inspection (orbital-GTAW PT/borescope, validation-grade documentation), a distinct specialty from the refinery code world.' },
    { q: 'What certifications matter most in New Jersey?', a: 'For refining and tank terminals, API 510/570/653 plus operator-qualified (OQ) requirements and ASNT/PCN Level II. For nuclear (Salem/Hope Creek), ASME Section XI Level II plus clearance. For pharma, ASNT Level II with validation documentation. AWS CWI for construction and port work.' },
  ],
  internalLinks: [
    { href: '/states/ny', label: 'New York NDT market guide', context: 'The shared NY/NJ port and harbor terminals span both states.' },
    { href: '/states/pa', label: 'Pennsylvania NDT market guide', context: 'The Philadelphia/Marcus Hook refining cluster is adjacent to South Jersey.' },
    { href: '/standards/api-653', label: 'API 653 tank inspection', context: 'Governs the dense harbor tank-farm population.' },
    { href: '/pillars/tank-inspection-pillar', label: 'Storage-tank inspection guide', context: 'MFL floor scanning + API 653 is core NJ work.' },
    { href: '/industries/nuclear', label: 'Nuclear power NDT inspection', context: 'Salem + Hope Creek at Artificial Island.' },
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic particle testing (MT)' },
    { href: '/standards/api-510', label: 'API 510 pressure-vessel inspection', context: 'Governs Bayway and Paulsboro fixed equipment.' },
    { href: '/careers/newark-nj', label: 'NDT careers in North Jersey' },
    { href: '/ndt-services/newark-nj', label: 'NDT services in Newark' },
  ],
  citations: [
    { id: 'eia-nj-refining', source: 'EIA Refinery Capacity Report — New Jersey (Phillips 66 Bayway, PBF Paulsboro)', url: 'https://www.eia.gov/petroleum/refinerycapacity/' },
    { id: 'nrc-nj-units', source: 'NRC — Salem and Hope Creek reactor information', url: 'https://www.nrc.gov/' },
    { id: 'njdep-tcpa', source: 'NJ DEP — Toxic Catastrophe Prevention Act (TCPA)' },
    { id: 'api-653', source: 'API 653 — Tank Inspection, Repair, Alteration, and Reconstruction' },
    { id: 'osha-psm', source: 'OSHA 29 CFR 1910.119 — Process Safety Management' },
  ],
};

export default state;
