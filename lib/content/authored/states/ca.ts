import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'ca',
  name: 'California',
  abbreviation: 'CA',
  metaTitle: 'California NDT Market Guide: Refining, Aerospace & Power',
  metaDescription:
    'California refines 1.6 MMbpd through 11 refineries, hosts the densest US aerospace cluster, and runs the largest seismic-driven inspection regime. NDT salaries, top metros, regulators.',
  heroLede:
    "California refines 1.6 million barrels per day across 11 active refineries (EIA 2023), making it the third-largest US refining state — but the regulatory and inspection regime is unlike Texas or Louisiana. CARB low-carbon fuel standards, the South Coast AQMD Rule 1180 fenceline monitoring program, Cal/OSHA Process Safety Management (Title 8 §5189.1, the toughest PSM rule in the country), and the California Seismic Hazards Mapping Act all compress inspection scope into shorter windows and tighter scrutiny. Aerospace concentration is unmatched: SpaceX Hawthorne, Northrop Grumman Redondo Beach and Palmdale, Lockheed Martin Skunk Works Palmdale, Boeing Long Beach and El Segundo, NASA JPL, and an extensive supplier base in the LA basin and San Diego County. The state's high-speed rail program and PG&E electrical infrastructure inspection (post-Camp Fire CPUC mandates) round out a market that demands more code expertise per inspector than anywhere else in the US.",
  industryMix:
    "Refining concentrates in two clusters. The Los Angeles basin (Marathon Carson 365,000 bpd, Phillips 66 Wilmington/Carson, Chevron El Segundo, Valero Wilmington, PBF Torrance and Martinez 1, Marathon Wilmington) is dense — five major refineries within a 25-mile radius. The Bay Area (Chevron Richmond 240,000 bpd, Marathon Martinez 161,000 bpd planned for renewables conversion, Phillips 66 Rodeo similarly converting, Valero Benicia, PBF Martinez 1) hosts another five. Phillips 66 Rodeo and Marathon Martinez are converting to renewable diesel — these projects drove unique HF-acid neutralization and tankage retrofit inspection through 2023-2024. Aerospace is the second pillar: SpaceX Hawthorne (Crew Dragon, Falcon 9, Starship), Northrop Grumman Redondo Beach (B-21, James Webb Space Telescope class programs), Lockheed Martin Palmdale (U-2, SR-72 development, Skunk Works), Boeing Long Beach (C-17 legacy, classified programs), NASA JPL Pasadena (Mars/lunar missions), General Atomics San Diego (MQ-9 Reaper, MQ-1C Gray Eagle), and a deep small-shop supplier base. Aerospace NDT is dominated by FPI (fluorescent penetrant), eddy current, CT, and ultrasonic immersion — different equipment and certification (NAS 410, NADCAP) than oil & gas. Power generation is split: PG&E and SoCal Edison run hundreds of miles of high-voltage transmission with constant inspection demand (post-Camp Fire CPUC enhanced inspection mandates), Diablo Canyon nuclear (the last operating CA nuclear plant, license extended through 2030) runs ASME Section XI ISI, and combined-cycle gas plants across Kern County and the central valley keep boiler/HRSG inspection steady. Aerospace and the renewable-diesel conversions mean California has the largest concentration of NDT Level III specialists on the West Coast.",
  topMetros: [
    { name: 'Los Angeles', slug: 'los-angeles-ca' },
    { name: 'Long Beach', slug: 'long-beach-ca' },
    { name: 'San Diego', slug: 'san-diego-ca' },
    { name: 'San Francisco / Bay Area', slug: 'san-francisco-ca' },
    { name: 'Sacramento', slug: 'sacramento-ca' },
    { name: 'Bakersfield', slug: 'bakersfield-ca' },
  ],
  regulatoryNotes: [
    { id: 'carb-lcfs', source: 'California Air Resources Board (CARB) — Low Carbon Fuel Standard and Refinery Air Toxics Reduction; drives renewable-diesel retrofit inspection scope', url: 'https://ww2.arb.ca.gov/' },
    { id: 'cal-osha-psm', source: 'Cal/OSHA Title 8 §5189.1 — Process Safety Management of Acutely Hazardous Materials at Petroleum Refineries (the most stringent PSM rule in the US; supplements federal 29 CFR 1910.119)', url: 'https://www.dir.ca.gov/title8/5189_1.html' },
    { id: 'cpuc-ge ', source: 'California Public Utilities Commission GO-95 / GO-165 — overhead electric line inspection requirements (post-Camp Fire enhanced inspection mandates)', url: 'https://www.cpuc.ca.gov/' },
    { id: 'aqmd-1180', source: 'South Coast AQMD Rule 1180 — refinery fenceline air monitoring; correlates with leak detection and tank integrity inspection cadence', url: 'http://www.aqmd.gov/' },
    { id: 'csb-cal', source: 'CSB Refinery Safety Reports (Chevron Richmond 2012, Torrance 2015) — drove Cal/OSHA PSM revisions that affect inspection frequency and DMR documentation' },
    { id: 'eia-ca-refining', source: 'EIA Refinery Capacity Report 2023 — California 1.6 MMbpd across 11 active refineries' },
  ],
  majorAssetOwners: [
    { name: 'Chevron (Richmond, El Segundo)', sector: 'Refining' },
    { name: 'Marathon Petroleum (Carson, Martinez)', sector: 'Refining / Renewable Diesel' },
    { name: 'Phillips 66 (Wilmington, Rodeo)', sector: 'Refining / Renewable Diesel' },
    { name: 'PBF Energy (Torrance, Martinez)', sector: 'Refining' },
    { name: 'Valero (Wilmington, Benicia)', sector: 'Refining' },
    { name: 'SpaceX (Hawthorne)', sector: 'Aerospace' },
    { name: 'Northrop Grumman (Redondo Beach, Palmdale)', sector: 'Aerospace / Defense' },
    { name: 'Lockheed Martin Skunk Works (Palmdale)', sector: 'Aerospace / Defense' },
    { name: 'NASA JPL (Pasadena)', sector: 'Aerospace / Research' },
    { name: 'General Atomics (San Diego)', sector: 'Aerospace / Defense / Nuclear R&D' },
    { name: 'PG&E (statewide gas and electric)', sector: 'Utility' },
    { name: 'Southern California Edison', sector: 'Utility' },
    { name: 'Pacific Gas & Electric (Diablo Canyon)', sector: 'Nuclear Power' },
    { name: 'BNSF and Union Pacific (rail tank cars and bridges)', sector: 'Rail' },
  ],
  methodDemand: [
    { method: 'Fluorescent Penetrant Inspection (FPI)', demandLevel: 'high', reason: 'Dominant method in aerospace fastener-hole, fan-blade, and casting inspection. NAS 410 Level II FPI is the most common aerospace credential — every CA tier-1 aerospace shop requires it.' },
    { method: 'Eddy Current Testing (ECT)', demandLevel: 'high', reason: 'Aerospace fastener-hole, conductivity, and surface inspection across LA-basin aerospace primes. Also heat-exchanger bundle inspection across the LA-basin refineries.' },
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'API 510/570/653 baseline at all 11 refineries, plus aerospace composite immersion UT at SpaceX, Northrop, Lockheed Palmdale.' },
    { method: 'Phased Array UT (PAUT)', demandLevel: 'high', reason: 'Refinery turnaround corrosion mapping under Cal/OSHA §5189.1 DMR program. Required by most CA refiners as the preferred occupied-unit method over RT.' },
    { method: 'Radiographic Testing (RT)', demandLevel: 'medium', reason: 'Tight permitting and AQMD constraints limit on-site Ir-192 use in occupied refineries; computed and digital radiography (CR/DR) capture much of the workload. Aerospace x-ray and CT (component-level) is steady.' },
    { method: 'Computed Tomography (CT)', demandLevel: 'high', reason: 'Composite and additive-manufacturing inspection at SpaceX, Northrop, Boeing, and NASA JPL drives a unique CA-heavy CT inspection market.' },
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'medium', reason: 'Refinery weld inspection plus oilfield drilling-asset inspection in Kern County. Lower volume than the Gulf Coast.' },
    { method: 'Visual Testing / CWI', demandLevel: 'high', reason: 'AWS CWI for refinery weld inspection and California high-speed rail civil/structural welding. Caltrans bridge inspection drives steady CWI billing.' },
    { method: 'Drone / Rope Access Inspection', demandLevel: 'high', reason: 'PG&E transmission tower inspection (post-Camp Fire CPUC GO-165 inspection enhancement) and refinery flare/column inspection — California has the largest drone-inspection contractor base in the US.' },
  ],
  certificationAvailability:
    "California's NDT training is split by sector. Aerospace certification is centered on NAS 410 administered by employers — SpaceX, Northrop, Lockheed, and Boeing all run internal Level I/II FPI, ECT, and UT programs aligned to NADCAP-audited written practice. The community college pipeline (Cerritos College, College of the Canyons, Antelope Valley College, San Diego Mesa) feeds aerospace through welding technology and NDT certificate programs. For oil & gas, Cypress College, Long Beach City College, and Bakersfield College run NDT and welding programs feeding the LA-basin refineries and Kern County upstream. UC Berkeley (Lawrence Berkeley National Lab), Stanford SLAC, and Cal Poly San Luis Obispo produce engineers who staff Level III roles. API ICP exams are administered through Prometric Los Angeles, Oakland, and San Diego. AWS CWI seminars run monthly in Long Beach and San Francisco. Cal/OSHA-specific PSM training (required for refinery inspection roles) is delivered by University of California Center for Labor Research and Education and by industry contractors. The state's radiographic-source regulator is the California Department of Public Health Radiologic Health Branch, a Section 274b agreement state.",
  salaryBands: [
    { role: 'Level I NDT Trainee (Aerospace FPI/ECT)', low: 48000, high: 65000 },
    { role: 'Level II NDT Technician (Oil & Gas)', low: 70000, high: 105000 },
    { role: 'Level II Aerospace NDT (FPI/ECT/UT)', low: 75000, high: 115000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 95000, high: 145000 },
    { role: 'Level III NDT Engineer', low: 130000, high: 195000 },
    { role: 'API 510/570/653 Inspector', low: 110000, high: 165000 },
    { role: 'NDT Field Supervisor', low: 105000, high: 155000 },
    { role: 'AWS CWI (Bridges / High-Speed Rail)', low: 85000, high: 135000 },
  ],
  hiringSeasons:
    "California refining turnaround scheduling is constrained by CARB summer-blend transitions — most refineries turn around in late winter (January-March) and again in early fall (October-November). PG&E and SoCal Edison transmission inspection has been year-round since the Camp Fire (2018) but peaks in dry-season pre-deployment (April-June) when crews stage for wildfire-prone area inspection. Aerospace hiring is steady-state with cyclical program-driven surges — SpaceX Starship pad rebuild cycles, Northrop B-21 production ramp, and Lockheed F-35 sub-tier supplier work drive most quarterly hiring waves. The state's high-speed rail authority and Caltrans bridge programs run procurement-driven hiring cycles that follow legislative funding tranches.",
  faqs: [
    {
      q: 'Why are California NDT salaries higher than the Gulf Coast?',
      a: "Three drivers. First, cost of living: LA and Bay Area median rents force higher base pay just to reach equivalent take-home. Second, Cal/OSHA §5189.1 PSM scrutiny: refineries pay a premium for inspectors who can document Damage Mechanism Review (DMR) findings to Cal/OSHA standard, which is materially more rigorous than federal PSM. Third, aerospace concentration: NAS 410 and NADCAP-credentialed inspectors are scarce nationally and concentrate in California — that scarcity drives pay 15-25% above oil-and-gas equivalents for FPI, ECT, and CT specialists. Add in California-specific overtime premiums (daily overtime after 8 hours, not just weekly after 40) and total comp diverges further.",
    },
    {
      q: 'Is it easier to break into aerospace or oil & gas NDT in California?',
      a: "Aerospace has the lower entry barrier numerically but a steeper certification ladder. Tier-1 aerospace primes (SpaceX, Northrop, Lockheed) hire Level I trainees directly out of community college NDT programs and run internal Level II progression. Oil & gas in CA is harder to enter as a trainee — the refining contractor base (Acuren, Mistras, Team, IRISNDT) tends to import experienced techs from Texas and Louisiana because Cal/OSHA documentation expectations make on-the-job training slower. Once you are Level II, the situations reverse: aerospace progression to Level III is bottlenecked by NADCAP-aligned Written Practice and limited senior slots; oil & gas progression is bottlenecked by API ICP endorsement timing.",
    },
    {
      q: 'What does Cal/OSHA §5189.1 mean for an inspection contractor?',
      a: "§5189.1 (the Process Safety Management of Acutely Hazardous Materials at Petroleum Refineries rule, effective 2017) extends federal 29 CFR 1910.119 in three material ways: it mandates a written Damage Mechanism Review (DMR) for every covered process, requires Hierarchy of Hazard Controls Analysis (HCA) for proposed changes, and imposes Management of Organizational Change (MOOC) requirements. For an inspection contractor, this means: every UT thickness location and every API 510 inspection must tie back to a DMR-identified mechanism with documented justification, inspection scope changes require formal MOOC, and post-turnaround inspection close-out documentation must demonstrate DMR coverage. Contractors who came up under federal PSM only are routinely surprised at the documentation overhead.",
    },
    {
      q: 'How does CPUC GO-165 affect transmission tower inspection?',
      a: "California Public Utilities Commission General Order 165, with post-Camp Fire amendments, mandates risk-informed inspection of overhead electric distribution and transmission infrastructure, with shortened intervals in High Fire-Threat District (HFTD) Tier 2 and Tier 3 zones. PG&E's Enhanced Powerline Safety Settings and Wildfire Mitigation Plans translate into ground-based visual, climbing inspection, drone visual, and infrared inspection on roughly 25,000 miles of transmission line annually. NDT-adjacent inspection (cross-arm, conductor, dampener, insulator) is performed by linemen, but drone IR and visual inspection has become a major NDT-contractor adjacency for firms like Mistras, Cyberhawk, and PrecisionHawk.",
    },
    {
      q: 'What unique inspection demand does the California renewable-diesel conversion create?',
      a: "Phillips 66 Rodeo and Marathon Martinez are converting from petroleum refining to renewable diesel using hydrotreating of soybean oil, used cooking oil, and tallow. The conversions retain much of the original hydrotreater and hydrocracker hardware but add new feedstock pretreatment, deoxygenation reactors, and storage tankage. Inspection demand peaks during HF-alkylation unit decommissioning and neutralization (HF-acid handling drives unique PT and UT acceptance), during heat-exchanger and reactor retrofit (PAUT corrosion mapping and TOFD on heavy-wall reactors), and during new feedstock-storage tank construction (API 650 weld inspection, API 653 baseline survey). The conversion projects ran 2022-2024 with continuing post-startup inspection through 2025.",
    },
  ],
  internalLinks: [
    { href: '/states/nv', label: 'Nevada NDT market guide', context: 'Nevada mining and Tesla Gigafactory inspection markets overlap with California contractor crews working out of Reno and Sacramento.' },
    { href: '/states/ut', label: 'Utah NDT market guide', context: 'Utah aerospace (Northrop Grumman Promontory) and oil services share talent with California aerospace.' },
    { href: '/methods/fluorescent-penetrant-inspection', label: 'Fluorescent penetrant inspection (FPI)', context: 'FPI is the dominant aerospace surface inspection method across California aerospace primes.' },
    { href: '/methods/eddy-current-testing', label: 'Eddy current testing (ECT)', context: 'ECT is the workhorse method for aerospace fastener-hole inspection in the LA basin.' },
    { href: '/industries/aerospace', label: 'Aerospace NDT inspection', context: 'California aerospace concentration is unmatched in the US — the only state with primes for crewed spaceflight, stealth aircraft, and unmanned systems within 100 miles.' },
    { href: '/industries/refining', label: 'Refining NDT inspection', context: 'California refining inspection is constrained by Cal/OSHA §5189.1, the most stringent PSM rule in the country.' },
    { href: '/standards/asme-section-xi', label: 'ASME Section XI ISI', context: 'Diablo Canyon nuclear runs Section XI ISI through its license extension period.' },
    { href: '/standards/nas-410', label: 'NAS 410 aerospace NDT personnel qualification', context: 'NAS 410 is the foundation document for aerospace NDT certification across California.' },
    { href: '/careers/los-angeles-ca', label: 'NDT careers in Los Angeles', context: 'LA basin combines refining, aerospace, and rail inspection demand within a 50-mile radius.' },
    { href: '/cost-guide/los-angeles-ca/paut', label: 'Los Angeles PAUT cost guide', context: 'LA-basin PAUT rates run 20-30% above Gulf Coast equivalents.' },
    { href: '/free-tools/certificate-manager', label: 'Certification expiry tracker', context: 'NAS 410 and ASNT certifications have different renewal cycles — tracking both matters in California.' },
    { href: '/free-tools/calibration-reminder', label: 'Calibration reminder tool', context: 'Cal/OSHA documentation expectations make calibration tracking non-negotiable.' },
  ],
  citations: [
    { id: 'eia-ca-2023', source: 'EIA Refinery Capacity Report 2023 — California 1.6 MMbpd across 11 refineries', url: 'https://www.eia.gov/petroleum/refinerycapacity/' },
    { id: 'cal-osha-5189-1', source: 'Cal/OSHA Title 8 §5189.1 — PSM of Acutely Hazardous Materials at Petroleum Refineries', url: 'https://www.dir.ca.gov/title8/5189_1.html' },
    { id: 'carb-lcfs-2023', source: 'CARB Low Carbon Fuel Standard, 17 CCR 95480-95503', url: 'https://ww2.arb.ca.gov/our-work/programs/low-carbon-fuel-standard' },
    { id: 'cpuc-go-165', source: 'CPUC General Order 165 — Inspection of Distribution Facilities', url: 'https://www.cpuc.ca.gov/' },
    { id: 'aqmd-1180', source: 'South Coast AQMD Rule 1180 — Refinery Fenceline and Community Air Monitoring' },
    { id: 'cdph-rhb', source: 'California Department of Public Health Radiologic Health Branch — industrial radiography licensing (17 CCR 30100 et seq.)' },
    { id: 'nas-410-2020', source: 'NAS 410, Rev. 5 (2020) — NAS Certification & Qualification of Nondestructive Test Personnel' },
    { id: 'asme-xi', source: 'ASME Boiler & Pressure Vessel Code Section XI (2021) — Rules for In-Service Inspection of Nuclear Power Plant Components' },
  ],
};

export default state;
