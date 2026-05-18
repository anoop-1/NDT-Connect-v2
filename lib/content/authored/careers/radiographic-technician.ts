import type { CareerContent } from '../types';

const career: CareerContent = {
  slug: 'radiographic-technician',
  title: 'Radiographic Technician (RT) — Career Guide',
  metaTitle: 'Radiographic Technician Career: Pay, Certs & Day-to-Day',
  metaDescription:
    'RT technicians shoot pipeline girth welds at 2 AM, handle Ir-192 sources, and read film to ASME V. Honest 2024-2026 US pay, RSO path, and the move to DR.',
  heroLede:
    'An RT Level II on a Permian Basin pipeline spread starts at 02:00 because that\'s when the right-of-way clears. The crew rolls a 100 Ci Iridium-192 SENTINEL exposure device onto the next girth weld, sets a 60-foot radiation barrier per 10 CFR 34.42, hangs a 7-inch source-to-film distance for the diameter wall, exposes for 90 seconds, retracts the source, and verifies survey to background before approaching to retrieve film[1]. The Level II reads the wet processed film at 4:30 AM by a high-intensity viewer — looking for porosity, slag inclusion, lack of fusion, incomplete penetration against API 1104 §9 acceptance[2]. RT pays well because the hours are brutal, the materials are radioactive, and the regulatory burden is heavy.',
  whatYouDo:
    'A radiographic technician sets up radiation sources (sealed isotopes — typically Ir-192, Se-75, or Co-60, or X-ray generators), positions the source and film/imaging plate, controls the radiation area, exposes the weld or material, processes the film or imaging plate, and interprets the resulting radiograph for code-defined defects[1]. RT certified personnel also handle the NRC/Agreement State licensing burden — survey meters, dosimetry, leak tests on sealed sources, and the radiation safety paperwork that travels with every job.',
  typicalDay: [
    '02:00 — Pipeline spread night-shift start. JSA, radiation worker check-in, draw the SENTINEL exposure device from the truck (logged out by serial number).',
    '02:30 — First weld setup: SDH 28-inch transmission, 100 Ci Ir-192, 7-inch SFD, Class II film (Kodak AA400 or Agfa D7), expose 95 seconds, retract, survey at 10 feet to <2 mR/hr per 10 CFR 34.51[1].',
    '03:00-06:00 — Shoot 14 girth welds, advance survey barriers between exposures, log each exposure in the source utilization record (time, distance, exposure index).',
    '06:30 — Drive to the field office trailer, develop film in the portable processor (or for DR work, transfer images to the laptop), set up the high-intensity viewer.',
    '07:00 — Read the night\'s film against API 1104 §9: characterize indications (porosity P1, slag inclusion SI, lack of root penetration LRP, etc.), measure to defect length limits, mark accept/reject per joint.',
    '08:30 — Write the radiographic report — one entry per weld with film density readings (2.0-4.0 transmission density per ASME V T-282), IQI sensitivity, defect summary, accept/reject call.',
    '09:30 — Source storage, dosimetry exchange, hand off the report to the pipeline construction foreman, sleep.',
  ],
  responsibilities: [
    'Set up and operate radiation sources per the procedure and the radioactive materials license — including radiation barrier setup, survey meter operation, and area posting per 10 CFR 34 / state equivalents[1].',
    'Expose film or digital imaging plates with the correct geometry, source-to-film distance, kilovoltage/mAs (for X-ray) or exposure time (for isotopes), and IQI placement per ASME V Article 2.',
    'Process radiographs to specification: film density 2.0-4.0 per ASME V T-282, digital DR with required SNR per ASTM E2698 or ISO 17636-2.',
    'Interpret radiographs against the applicable code acceptance criteria (ASME V/VIII Appendix 4, API 1104 §9, AWS D1.1 §6, B31.3 §341.3.2)[2].',
    'Maintain source utilization logs, dosimetry records, leak test certificates, and storage facility records — all auditable by the NRC or Agreement State.',
    'Conduct routine surveys: radiation barrier check, source storage area survey, dosimetry exchange and review, leak test of sealed sources every 6 months.',
    'Coordinate with other crews to clear the radiation area — RT shoots typically happen at night or on cleared shifts because of the area exclusion.',
  ],
  pathToEntry: [
    {
      step: 1,
      title: 'Complete the 40-hour Radiation Safety course',
      body: 'Required for any role handling sealed sources. The course covers basic radiation physics, NRC regulations, exposure devices, and emergency response. Cost: $500-$1,200 at Hellier, Lavender, TEAM Training. Some states require state-specific training on top.',
    },
    {
      step: 2,
      title: 'Sit Level I RT under SNT-TC-1A (40 hours classroom + 210 hours OJT)',
      body: 'RT has the longest OJT requirement of any common method[3]. Many candidates start as RT helpers driving the truck and pulling film for 4-6 months before sitting the Level I exam.',
    },
    {
      step: 3,
      title: 'Earn Radiographer Certification (state and/or federal)',
      body: 'Most US states certify radiographers separately from the NRC. The Conference of Radiation Control Program Directors (CRCPD) coordinates a national exam used by most Agreement States. Federal NRC operates in non-Agreement States. The exam covers regulations, safety, and operations — separate from the SNT-TC-1A NDT exam.',
    },
    {
      step: 4,
      title: 'Accumulate Level II OJT (840 hours) and pass Level II exams',
      body: 'Level II RT under SNT-TC-1A requires 840 hours of documented OJT[3]. Most candidates clear this in 12-18 months on an active pipeline or refinery spread. Level II exams add interpretation depth to the Level I baseline.',
    },
    {
      step: 5,
      title: 'Add specialty: Computed Radiography (CR), Digital Radiography (DR), or RSO',
      body: 'Modern RT increasingly uses CR (phosphor plates) and DR (digital flat panels) under ASTM E2698, E2737, and ISO 17636-2. Specialty endorsements pay 10-20% premium. The Radiation Safety Officer (RSO) role requires 5+ years experience and a separate exam — RSOs run the company-wide radiation safety program and report to the NRC.',
    },
  ],
  certificationsRequired: [
    {
      name: 'SNT-TC-1A or CP-189 RT Level II',
      mandatory: true,
      reason: 'Industry baseline for interpretation authority on radiographs[3].',
    },
    {
      name: 'Radiographer Certification (state or NRC)',
      mandatory: true,
      reason: 'Legally required to handle sealed sources under 10 CFR 34 (NRC) or state radiation control program[1].',
    },
    {
      name: 'TLD/OSL dosimetry + bioassay records',
      mandatory: true,
      reason: 'Personal dosimetry is required for any radiation worker. Records must be maintained for 30 years or term of employment + 5 years.',
    },
    {
      name: 'Radiation Safety Officer (RSO) — advanced',
      mandatory: false,
      reason: 'Required to be the named RSO on a company\'s radioactive materials license. Pays $15-30k premium over standard RT Level II.',
    },
  ],
  salaryByExperience: [
    {
      years: '0-2 (RT Level I/II, helper to junior)',
      min: 55000,
      max: 78000,
      median: 66000,
    },
    {
      years: '2-7 (RT Level II + radiographer cert)',
      min: 72000,
      max: 108000,
      median: 88000,
    },
    {
      years: '7+ (senior RT + RSO + CR/DR specialty)',
      min: 100000,
      max: 165000,
      median: 130000,
    },
  ],
  industriesEmploying: [
    {
      industry: 'Pipeline construction (cross-country girth weld inspection)',
      demand: 'Very high — RT is the default girth weld method on most onshore pipelines. Permian, Marcellus, Bakken spreads are major employers.',
    },
    {
      industry: 'Refinery turnaround & fabrication',
      demand: 'High — RT on pressure piping under B31.3 and pressure vessels under ASME VIII Div 1.',
    },
    {
      industry: 'Power plant construction and maintenance',
      demand: 'High — fossil, combined-cycle, and nuclear construction. Nuclear adds 10 CFR 50 Appendix B and ANSI N45.2.6 qualifications.',
    },
    {
      industry: 'Aerospace and defense manufacturing',
      demand: 'Moderate — castings inspection, weldments. Increasingly shifting to DR and CT.',
    },
    {
      industry: 'NDT service companies (Acuren, TEAM, Mistras, Applus+)',
      demand: 'Very high — all major NDT service companies maintain RT crews.',
    },
  ],
  advancementPath:
    'RT Level II → CR/DR specialist → RT Level III or RSO → NDT supervisor → NDT manager. Many RT technicians pivot to PAUT (Phased Array UT) in their 30s because PAUT increasingly replaces RT on pipeline girth welds (no radiation area exclusion, faster cycle time). RSO is a high-pay specialization for those who want to step away from field work — RSOs typically office-based managing licenses, training, and audits across multiple crews. ASNT Level III RT is the ultimate technical destination and often pairs with consulting work.',
  remoteOrField: 'field',
  riskFactors: [
    'Ionizing radiation — sealed source incidents (stuck sources, lost sources) are rare but career-ending and can be fatal. Stuck source recovery requires shielding, distance, time discipline.',
    'Night shift — most pipeline RT is night-shift to clear the right-of-way; circadian disruption is the norm.',
    'Heavy lifting — exposure devices weigh 30-55 lbs. Crank-out cables and tube bundles fatigue shoulders.',
    'Chemical exposure — film processing chemistry (developer, fixer) is being phased out in favor of DR but still present.',
    'Travel — pipeline spreads are 6-12 months on remote sites; many RT technicians spend 10+ months/year on the road.',
  ],
  faqs: [
    {
      q: 'Is RT being replaced by Phased Array UT?',
      a: 'On pipeline girth welds, increasingly yes. PAUT under ASME V Article 4 Mandatory Appendix VIII and API 1104 Annex A is now widely accepted as an alternative to RT for new construction pipeline welds[2]. PAUT eliminates the radiation area exclusion (no shooting at night, no clearing the right-of-way), runs 3-5x faster, and produces an electronic record. But RT still dominates in three areas: thin-wall pipe under 5mm where UT signal-to-noise suffers, castings where UT geometry is too complex, and fabrication of pressure vessels where film inventory and procedure inertia favor RT. Smart RT technicians are adding PAUT certification on top of RT — the combined skill set is the highest-pay profile in pipeline inspection.',
    },
    {
      q: 'How much radiation does an RT technician absorb in a year?',
      a: 'Under NRC regulations the legal whole-body dose limit is 5 rem/year (50 mSv/yr) for a radiation worker[1]. Typical pipeline RT technicians average 0.3-1.5 rem/yr based on dosimetry records — well below the limit. The ALARA principle (As Low As Reasonably Achievable) drives most companies to set internal action levels at 1.0-2.0 rem/yr, triggering supervisor review if exceeded. Exposure tracks closely with workload and how strictly the crew follows time-distance-shielding. The cumulative limit is 5 rem × (age − 18) years, calculated at the start of each year. Pregnancy declaration drops the limit to 0.5 rem for the gestation period.',
    },
    {
      q: 'What is the difference between RT, CR, and DR?',
      a: 'All three produce a radiographic image but with different imaging media. RT (traditional radiography) uses silver halide film, processed wet, viewed on a light box[1]. CR (computed radiography) uses a phosphor plate read by a laser scanner — replaces film with a reusable plate but the technique is otherwise similar (covered under ASTM E2698). DR (digital radiography) uses a digital flat panel detector that produces an image immediately — no plate change, no processing, but the equipment is heavier and more expensive (ASTM E2737, ISO 17636-2). CR Level II adds ~$3-5k of training over RT Level II; DR Level II is similar plus equipment-specific OEM training (Vidisco, Rapiscan, GE-Wirth). Pay premium for CR/DR is typically 10-20% over film RT.',
    },
    {
      q: 'Do I need to be a US citizen to work as a radiographer?',
      a: 'Not for most commercial work, but yes for nuclear and defense. Commercial pipeline, refinery, and fabrication RT work requires the standard NRC or Agreement State radiographer license — open to legal US workers regardless of citizenship. Nuclear plant work under 10 CFR 50 requires unescorted access authorization, which typically requires US citizenship or permanent residency, plus a full background investigation and psychological evaluation. DOE national lab work and defense radiography work (DoE/NAVSEA contracts) requires US citizenship and often a security clearance. International work (Saudi Aramco, ADNOC, North Sea operators) follows different national regulations — IRATA or PCN-equivalent radiographer certs are typical[3].',
    },
  ],
  internalLinks: [
    { href: '/learn/radiographic-testing', label: 'Radiographic testing primer', context: 'Core method this role performs.' },
    { href: '/learn/phased-array-ultrasonic-testing', label: 'PAUT primer', context: 'The method increasingly replacing RT on pipelines.' },
    { href: '/careers/ndt-technician-level-2', label: 'Level II Technician path', context: 'General Level II context.' },
    { href: '/standards/asme-section-v', label: 'ASME Section V', context: 'Code governing radiographic procedures.' },
    { href: '/standards/api-1104', label: 'API 1104 pipeline welding', context: 'Acceptance criteria for pipeline girth weld RT.' },
    { href: '/industries/pipeline', label: 'Pipeline inspection', context: 'Largest US employer of RT technicians.' },
    { href: '/free-tools/exposure-time-calculator', label: 'RT exposure time calculator', context: 'Tool used daily by RT technicians.' },
    { href: '/free-tools/ndt-salary-calculator', label: 'NDT salary calculator', context: 'Estimate RT comp with night-shift differential.' },
    { href: '/careers/pipeline-inspector', label: 'Pipeline inspector path', context: 'Adjacent role often filled by RT technicians.' },
  ],
  citations: [
    { id: 'nrc-10-cfr-34', source: '10 CFR Part 34, Licenses for Industrial Radiography and Radiation Safety Requirements for Industrial Radiographic Operations (NRC).' },
    { id: 'api-1104', source: 'API 1104, 22nd ed. (2021), Welding of Pipelines and Related Facilities, §9 Acceptance Standards for Nondestructive Testing.' },
    { id: 'asnt-snt-tc-1a-rt', source: 'ASNT SNT-TC-1A (2020), Table 6.3.1A — RT Level I 40hr classroom + 210hr OJT; Level II + 840hr OJT.' },
    { id: 'asme-v', source: 'ASME BPVC Section V (2023), Article 2 — Radiographic Examination.' },
    { id: 'asnt-2024-survey', source: 'ASNT 2024 Salary Survey of NDT Professionals, ASNT Materials Evaluation Vol. 82 No. 3.' },
  ],
};

export default career;
