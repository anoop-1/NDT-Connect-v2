import type { CareerContent } from '../types';

const career: CareerContent = {
  slug: 'corrosion-engineer',
  title: 'Corrosion Engineer — Career Guide',
  metaTitle: 'Corrosion Engineer Career: NACE/AMPP Certs, Pay & Path',
  metaDescription:
    'Corrosion engineers run CP systems, FFS evaluations, and material selection for refineries and pipelines. AMPP/NACE cert path, 2024-2026 US pay, and field vs office tracks.',
  heroLede:
    'A corrosion engineer at a Bayport polyethylene plant reviews the morning UT thickness data from a 32-inch ethylene cracker transfer line, runs the long-term corrosion rate against API 579 Part 4 Level 1 for the past 18 months of TML readings, and flags a single CML that has thinned from 0.380" to 0.298" — below the engineered Tmin of 0.310" with two years remaining to the next turnaround[1][2]. The corrosion engineer\'s call: repair clamp now or shut the line. By 14:00 the engineer is on a call with the refinery integrity manager, the inspection contractor, and the unit operations supervisor walking through the Fitness-for-Service Level 2 calculation and the rerate option per ASME B31.3 §304. This is what a corrosion engineer does — translate inspection data into integrity decisions backed by code.',
  whatYouDo:
    'A corrosion engineer evaluates material degradation in industrial assets, designs and monitors corrosion mitigation (cathodic protection, coatings, inhibitors, alloy selection), and performs fitness-for-service evaluations to determine if an asset can continue operating past nominal design[1][2]. Day-to-day work splits between desk (FFS calculations, data review, material selection studies) and field (CP surveys, coating inspections, internal asset walkdowns during turnarounds). Most corrosion engineers hold a B.S. in materials science, metallurgical, chemical, or mechanical engineering plus AMPP (formerly NACE) certifications.',
  typicalDay: [
    '07:00 — Review overnight inspection reports from the unit\'s API 510/570 inspection cycle. Three CMLs flagged below alert threshold on the H2S service piping.',
    '08:30 — Run API 579 Part 4 Level 1 FFS on a thinned section of crude unit overhead line — apply remaining strength factor, calculate retirement date based on long-term corrosion rate[2].',
    '10:30 — Field walkdown with the inspection contractor on a hydrotreater reactor effluent line — verify CMLs, sketch the unit, photograph external coating breaks.',
    '12:00 — Working lunch with operations on a proposed material upgrade for sour service piping (CS to Alloy 625 cladding) — present the AMPP MR0103 / ISO 15156 compliance basis[3].',
    '13:30 — CP system review: monitor rectifier outputs from the morning survey, check pipe-to-soil potentials on the buried tank farm header (need -850 mV CSE per AMPP TM0497).',
    '15:30 — Write the FFS report — Level 1 finding, recommended monitoring plan, repair scope if conditions change, route to the asset integrity manager for sign-off.',
    '16:30 — Phone call with the materials lab on a failure analysis — chloride stress corrosion cracking suspected on a stainless deaerator; coordinate on metallography and chemistry.',
  ],
  responsibilities: [
    'Conduct Fitness-for-Service (FFS) evaluations per API 579-1/ASME FFS-1 (general metal loss, local thin areas, pitting, crack-like flaws, HTHA, fire damage)[2].',
    'Design and monitor cathodic protection systems on buried pipelines and tanks per AMPP SP0169, SP0285, and 49 CFR Part 192 Subpart I[3][4].',
    'Specify materials for corrosive service per AMPP MR0103 (refinery wet H2S) and ISO 15156 / MR0175 (upstream H2S)[3].',
    'Review and trend inspection data: corrosion rates (short-term and long-term), TML grids, RBI risk rankings (API 580/581).',
    'Conduct failure analyses on premature degradation — metallurgical sampling, chemistry, environmental review, root cause classification (general, pitting, SCC, MIC, erosion-corrosion, etc.).',
    'Specify coating systems and qualified applicators per AMPP/SSPC standards (SSPC-PA 1, SSPC-PA 2, AMPP SP1).',
    'Develop and maintain the unit\'s corrosion management plan, including CCDs (Corrosion Control Documents) and damage mechanism reviews per API 571.',
    'Interface with NDT contractors on inspection scope — specify locations, methods, and acceptance for thickness, MT, PT, and PAUT corrosion mapping campaigns.',
  ],
  pathToEntry: [
    {
      step: 1,
      title: 'B.S. in materials, metallurgical, chemical, or mechanical engineering',
      body: 'A four-year engineering degree is the standard entry. Materials and metallurgical programs (Colorado School of Mines, Penn State, Ohio State, University of Akron) feed directly into corrosion engineering. Chemical and mechanical engineers can pivot in via AMPP coursework and on-the-job experience.',
    },
    {
      step: 2,
      title: 'Start as a corrosion technician or junior engineer',
      body: 'Most large operators (ExxonMobil, Chevron, Shell, BP, Marathon) and EPCs (Bechtel, Worley, Wood, KBR) hire junior corrosion engineers into rotational programs covering pipeline, refinery, and offshore. Pay starts $72-95k base.',
    },
    {
      step: 3,
      title: 'Complete AMPP (formerly NACE) certification path',
      body: 'Core path: Coating Inspector Program (CIP) Level 1/2/3, Cathodic Protection (CP) Tester / Technician / Technologist / Specialist, and Corrosion Specialist or Senior Corrosion Technologist[3][4]. Each cert involves 1-2 week course plus written/practical exam, $1,800-$4,500 per level. Most engineers complete CIP 2 + CP 2 + Senior Tech within 5-7 years.',
    },
    {
      step: 4,
      title: 'Pursue Professional Engineer (PE) license',
      body: 'PE license (mechanical, metallurgical, or chemical depending on state) is mandatory for signing FFS evaluations and integrity decisions on public-impact assets. Requires 4 years engineering experience post-degree plus FE + PE exam.',
    },
  ],
  certificationsRequired: [
    {
      name: 'B.S. engineering degree (or equivalent technologist credential)',
      mandatory: true,
      reason: 'The job is engineering judgment under code; most postings require degree or substitute combinations.',
    },
    {
      name: 'AMPP Corrosion Specialist or Senior Corrosion Technologist',
      mandatory: false,
      reason: 'Industry-recognized expert credential; required by many integrity engineer postings[3].',
    },
    {
      name: 'AMPP CIP Level 2 or 3 (coating inspector)',
      mandatory: false,
      reason: 'Required for coating program oversight and acceptance.',
    },
    {
      name: 'PE license (Professional Engineer)',
      mandatory: false,
      reason: 'Required for stamping FFS evaluations and integrity decisions on public-impact assets. Career accelerator.',
    },
  ],
  salaryByExperience: [
    {
      years: '0-3 (junior corrosion engineer)',
      min: 72000,
      max: 95000,
      median: 82000,
    },
    {
      years: '3-8 (mid-level, AMPP certified)',
      min: 92000,
      max: 135000,
      median: 112000,
    },
    {
      years: '8+ (senior + PE, integrity engineer)',
      min: 130000,
      max: 220000,
      median: 165000,
    },
  ],
  industriesEmploying: [
    {
      industry: 'Oil & gas (upstream, midstream, downstream)',
      demand: 'Very high — every refinery and pipeline operator has corrosion engineering as a core function under API 510/570/653 integrity programs[1].',
    },
    {
      industry: 'Pipeline operators (DOT 49 CFR 192/195)',
      demand: 'High — CP program design and integrity management require licensed corrosion engineers[4].',
    },
    {
      industry: 'Power generation (fossil, nuclear, renewables)',
      demand: 'Moderate — fossil and nuclear corrosion programs are substantial; renewables (offshore wind) is a growing niche.',
    },
    {
      industry: 'Marine and offshore (production platforms, FPSOs)',
      demand: 'High — splash zone, seawater, and sour service degradation drive deep corrosion engineering needs.',
    },
    {
      industry: 'Chemical and petrochemical (NACE MR0103 service)',
      demand: 'High — wet H2S and amine service require specialized material selection and inspection planning.',
    },
    {
      industry: 'EPC firms (Bechtel, Worley, Fluor, KBR)',
      demand: 'High — capital projects require corrosion engineering for material specification and corrosion allowance.',
    },
  ],
  advancementPath:
    'Junior corrosion engineer → senior corrosion engineer → asset integrity engineer or corrosion technical lead → corrosion engineering manager or principal engineer. Many senior corrosion engineers pivot into RBI (Risk Based Inspection) program leadership under API 580/581, or into independent consulting on FFS and failure analysis. The highest-pay path is principal engineer at a major operator or independent consultant billing $200-400/hr on FFS and failure analysis work. PE + AMPP Senior Corrosion Technologist + API 510/570 SIFE is the credential stack for top earners.',
  remoteOrField: 'hybrid',
  riskFactors: [
    'Liability — FFS reports and material selection recommendations get pulled in litigation when assets fail; E&O insurance is standard for consulting engineers.',
    'Field exposure — refinery and offshore walkdowns include heat, height, confined space, and process fluid hazards.',
    'Long FFS engagements — Level 3 FFS on complex damage can take weeks of finite element analysis; deadline pressure is real.',
    'Regulatory pressure — pipeline CP program findings under PHMSA can trigger consent decrees and enforcement; staying current on 49 CFR is unpaid time.',
    'On-call response — a failure event can demand immediate metallurgical sampling and FFS at any hour; experienced engineers carry 24/7 phones during turnarounds.',
  ],
  faqs: [
    {
      q: 'What is the difference between a corrosion engineer and an NDT inspector?',
      a: 'They work the same data from opposite ends. An NDT inspector collects the inspection findings — thickness readings, indication characterizations, corrosion mapping — and signs the report that conforms to code acceptance. A corrosion engineer interprets that data over time, decides whether the asset can continue operating, specifies the next inspection scope, and designs the corrosion mitigation program[1]. The corrosion engineer typically holds a degree and a PE; the NDT inspector typically holds Level II/III certifications and may not have a degree. The two roles are highly complementary — many integrity teams pair a corrosion engineer (degreed, office-heavy) with senior NDT inspectors (field, certification-heavy) on every unit.',
    },
    {
      q: 'Do I need a PE license to be a corrosion engineer?',
      a: 'Not at entry, but yes for senior roles. Junior and mid-level corrosion engineers can work under a licensed PE supervisor without holding the license themselves. Once you sign FFS evaluations under API 579, specify CP designs on regulated pipelines, or stamp integrity decisions on public-impact assets, the PE is required (or the work must be reviewed and stamped by a PE). State licensing boards (TBPELS in Texas, BPELS in California, etc.) require an ABET-accredited engineering degree, 4 years of qualifying experience post-degree, and the FE + PE exams (Mechanical, Metallurgical, or Chemical discipline). Total time from start of degree to PE is typically 8-9 years. The PE adds $15-25k/year to comp and is mandatory for most senior integrity roles.',
    },
    {
      q: 'What is AMPP and how is it different from NACE?',
      a: 'AMPP (Association for Materials Protection and Performance) is the merged organization formed in 2021 from NACE International and SSPC (Society for Protective Coatings)[3]. All existing NACE certifications transitioned to AMPP branding. The technical content is unchanged — CP-1/2/3/4, CIP 1/2/3, Senior Corrosion Technologist, Corrosion Specialist — same exams, same body of knowledge, same recertification rules. Standards previously published as NACE (MR0175, MR0103, RP0775, etc.) are now AMPP standards with the same identifiers. Existing NACE certifications remain valid through their original expiration dates and renew under AMPP. For job postings, "NACE-certified" and "AMPP-certified" are interchangeable in 2024-2026 industry usage.',
    },
    {
      q: 'How much does a corrosion engineer earn vs an NDT inspector?',
      a: 'A degreed corrosion engineer earns more on base but less on overtime/per diem than a senior NDT inspector. Mid-level corrosion engineers (3-8 years, AMPP certified) earn $92-135k base with bonus[5]; senior corrosion engineers with PE earn $130-220k base. NDT inspectors top out around $130-170k including OT and per diem unless they cross into Level III or independent consulting. The engineer path is steadier, more office-based, and more senior at the same age. The inspector path is more lucrative early (no degree time) but plateaus unless you add Level III, API certs, and consulting. Many high earners do both — engineering degree + PE + Level III + AMPP Specialist = principal engineer roles at $200-280k.',
    },
  ],
  internalLinks: [
    { href: '/standards/api-510', label: 'API 510 pressure vessel inspection', context: 'Primary code corrosion engineers work to.' },
    { href: '/standards/api-579', label: 'API 579 fitness-for-service', context: 'The FFS standard used daily by corrosion engineers.' },
    { href: '/standards/api-571', label: 'API 571 damage mechanisms', context: 'Reference for damage mechanism classification.' },
    { href: '/learn/corrosion-under-insulation', label: 'CUI primer', context: 'Common damage mechanism in refinery assets.' },
    { href: '/learn/cathodic-protection', label: 'Cathodic protection primer', context: 'Core mitigation method corrosion engineers design.' },
    { href: '/free-tools/corrosion-rate-calculator', label: 'Corrosion rate calculator', context: 'Tool used daily for trending TML data.' },
    { href: '/careers/ndt-consultant', label: 'NDT consultant path', context: 'Adjacent role often filled by senior corrosion engineers.' },
    { href: '/industries/refinery-turnaround', label: 'Refinery turnaround', context: 'Major work context for corrosion engineers.' },
    { href: '/industries/pipeline', label: 'Pipeline inspection', context: 'CP-heavy market segment.' },
  ],
  citations: [
    { id: 'api-510', source: 'API 510, 11th ed. (2022), §7 Inspection Planning, §8 Corrosion Rate Determination.' },
    { id: 'api-579', source: 'API 579-1 / ASME FFS-1 (2021), Fitness-For-Service, Parts 4, 5, 9 (FFS assessment levels).' },
    { id: 'ampp-mr0103', source: 'AMPP MR0103-2023 (formerly NACE), Materials Resistant to Sulfide Stress Cracking in Corrosive Petroleum Refining Environments.' },
    { id: 'cfr-192-subpart-i', source: '49 CFR Part 192 Subpart I, Requirements for Corrosion Control.' },
    { id: 'ampp-2024-survey', source: 'AMPP 2024 Materials Performance Salary Survey, Materials Performance Magazine.' },
  ],
};

export default career;
