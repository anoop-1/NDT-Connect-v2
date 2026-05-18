import type { StateGuideContent } from '../types';

const state: StateGuideContent = {
  slug: 'ak',
  name: 'Alaska',
  abbreviation: 'AK',
  metaTitle: 'Alaska NDT Market Guide: TAPS, North Slope & Cook Inlet',
  metaDescription:
    'Alaska runs the 800-mile Trans-Alaska Pipeline System, North Slope upstream, and Cook Inlet oil and gas. NDT salaries, AOGCC, and rotational schedules covered.',
  heroLede:
    "The Trans-Alaska Pipeline System (TAPS) is 800 miles of 48-inch crude oil pipeline crossing three mountain ranges and 34 major rivers — Alyeska Pipeline Service Company runs the most NDT-intensive single pipeline asset in the United States. Production has fallen from the 1988 peak of 2.0 million bpd to roughly 470,000 bpd in 2024 per the Alaska Department of Revenue, but PHMSA integrity-management dig-and-NDT programs, plus elevated-section girth-weld inspection, plus the BP-to-Hilcorp asset transfer (2020) integrity baseline, keep continuous NDT crew demand from Pump Station 1 (Prudhoe Bay) to Valdez Marine Terminal. The Alaska Oil and Gas Conservation Commission (AOGCC) regulates well integrity under 20 AAC 25, the Alaska Department of Environmental Conservation regulates aboveground storage tanks and pressure equipment, and a unique federal-state regulatory mesh covers Cook Inlet (state waters) and Beaufort/Chukchi (federal BOEM/BSEE OCS waters). Rotational schedules (typically 2-on/2-off or 3-on/3-off), per-diem of $130-$250/day, and the highest US cost-of-living adjustments outside Hawaii drive total comp well above Lower 48 equivalents.",
  industryMix:
    "TAPS dominates infrastructure-side NDT. The line crosses six earthquake zones, including the 1964 Denali Fault zone where the pipeline survived a 7.9 Mw event in 2002 thanks to specifically engineered slider supports — every elevated section requires support inspection and girth weld follow-up. North Slope upstream is anchored by Prudhoe Bay (Hilcorp, the operator since BP's 2020 exit) and Kuparuk (ConocoPhillips), with the Willow Project (ConocoPhillips, ~180,000 bpd at peak, sanctioned 2023) under construction through 2029 — that project alone will drive several years of greenfield piping, vessel, and flowline NDT. Pioneer Natural Resources Oooguruk and Eni Nikaitchuq are active offshore-from-shore developments. Cook Inlet is operated by Hilcorp (acquired BP and Marathon assets) plus smaller operators; the inlet hosts ConocoPhillips Kenai LNG (one of two operating US LNG export terminals before the Gulf Coast build-out — shut down 2017, partial restart paths under study). Refining: Petro Star runs two small refineries (North Pole and Valdez, ~73,000 bpd combined) producing diesel, jet fuel, and asphalt. Marathon Petroleum (formerly Tesoro/Andeavor) operated the Kenai/Nikiski refinery before selling to Marathon's parent — currently restructured ownership. Pacific Pride and Crowley operate fuel distribution terminals statewide. Defense: Joint Base Elmendorf-Richardson (Anchorage) and Eielson AFB (Fairbanks) host F-22 and F-35 squadrons requiring NAS 410 aviation NDT. Mining: Red Dog (zinc, Teck Resources) and Pogo (gold, Northern Star) require structural and lifting-equipment NDT. The combined effect: a small market by headcount (~600-900 active NDT field techs in-state by industry estimate), but extraordinarily high per-tech billable hours and travel cost, with one dominant pipeline system anchoring everything.",
  topMetros: [
    { name: 'Anchorage', slug: 'anchorage-ak' },
    { name: 'Prudhoe Bay / Deadhorse (North Slope, served from Anchorage)', slug: 'anchorage-ak' },
    { name: 'Fairbanks (TAPS midpoint, Eielson AFB)', slug: 'anchorage-ak' },
    { name: 'Valdez (TAPS terminal, Petro Star refinery)', slug: 'anchorage-ak' },
  ],
  regulatoryNotes: [
    { id: 'aogcc-20aac25', source: 'Alaska Oil and Gas Conservation Commission 20 AAC 25 — Well construction, integrity, abandonment, and pressure testing', url: 'https://www.commerce.alaska.gov/web/aogcc/' },
    { id: 'adec-18aac75', source: 'Alaska Department of Environmental Conservation 18 AAC 75 — Aboveground Storage Tank standards (mirrors API 653 with state-specific addenda)' },
    { id: 'adec-18aac78', source: 'ADEC 18 AAC 78 — Underground storage tank inspection and corrosion control' },
    { id: 'jpo-taps', source: 'Joint Pipeline Office (JPO) — federal-state inter-agency oversight of TAPS (Alyeska Right-of-Way Lease and Federal Grant)', url: 'https://www.blm.gov/programs/lands-and-realty/pipelines/alaska/joint-pipeline-office' },
    { id: 'bsee-arctic', source: 'BSEE 30 CFR Part 250 with Arctic-specific provisions (Subpart S) — applies to federal Beaufort/Chukchi OCS operations' },
    { id: 'usda-rust', source: 'PHMSA 49 CFR 195 — applies to TAPS as an interstate hazardous liquid pipeline crossing state-federal boundary' },
  ],
  majorAssetOwners: [
    { name: 'Alyeska Pipeline Service Company (TAPS operator)', sector: 'Pipeline / Midstream' },
    { name: 'Hilcorp Energy (Prudhoe Bay operator, Cook Inlet)', sector: 'Upstream / Offshore' },
    { name: 'ConocoPhillips Alaska (Kuparuk, Willow Project)', sector: 'Upstream' },
    { name: 'Eni Petroleum US (Nikaitchuq)', sector: 'Upstream / Offshore' },
    { name: 'Pioneer Natural Resources (Oooguruk)', sector: 'Upstream / Offshore' },
    { name: 'Petro Star (North Pole and Valdez refineries)', sector: 'Refining' },
    { name: 'BP-to-Hilcorp transfer assets (legacy)', sector: 'Upstream' },
    { name: 'Joint Base Elmendorf-Richardson / Eielson AFB', sector: 'Aerospace / Defense' },
    { name: 'Teck Resources Red Dog Mine', sector: 'Mining' },
    { name: 'Northern Star Resources Pogo Mine', sector: 'Mining' },
    { name: 'Crowley Fuels (statewide terminals)', sector: 'Fuel Distribution' },
  ],
  methodDemand: [
    { method: 'Phased Array UT (PAUT)', demandLevel: 'high', reason: 'TAPS girth-weld inspection in elevated sections and at fault crossings; PHMSA Mega-Rule integrity-management digs verify ILI tool findings with PAUT corrosion mapping.' },
    { method: 'In-Line Inspection (ILI) Support', demandLevel: 'high', reason: 'Alyeska runs MFL, deformation, and crack-detection ILI tools through TAPS at 5-7 year cycles per 49 CFR 195.452 — each run drives 100-400 follow-up dig sites and verification NDT.' },
    { method: 'Ultrasonic Testing (UT)', demandLevel: 'high', reason: 'Pump station vessel inspection, North Slope flowline thickness surveys, refinery tank inspection at Valdez and North Pole.' },
    { method: 'Radiographic Testing (RT)', demandLevel: 'medium', reason: 'Willow Project greenfield piping and module fabrication weld inspection. Cold-weather radiographic operations require source-handling cold-procedure adaptations.' },
    { method: 'Magnetic Particle Testing (MT)', demandLevel: 'medium', reason: 'Drilling rig and workover-unit inspection in Prudhoe Bay and Kuparuk service yards; mine lifting-equipment inspection.' },
    { method: 'API 653 Tank Inspection', demandLevel: 'high', reason: 'TAPS Pump Station tank farms, Valdez Marine Terminal tanks (some of the largest in the country), and statewide fuel-distribution terminals all on 5/10-year API 653 cycles.' },
    { method: 'Visual Testing / Rope Access', demandLevel: 'medium', reason: 'Elevated TAPS sections, Valdez terminal column inspection, and offshore platform topsides drive rope-access work — qualified rope-access UT technicians are particularly scarce in Alaska.' },
    { method: 'Aerospace FPI / ECT', demandLevel: 'medium', reason: 'F-22 and F-35 squadron-level inspection at Eielson AFB and JBER; NAS 410 personnel certification required.' },
  ],
  certificationAvailability:
    "Alaska does not have a large in-state NDT training pipeline — most working techs arrive with Lower-48 ASNT SNT-TC-1A Level II credentials and convert via employer Written Practice. University of Alaska Anchorage (UAA) and University of Alaska Fairbanks (UAF) run welding and process technology programs that funnel into Alyeska and the North Slope operators. Alaska Vocational Technical Center (AVTEC, Seward) runs industrial-process and welding programs feeding the same pipeline. API ICP exams are administered at Prometric Anchorage. AWS CWI seminars run irregularly in Anchorage and Fairbanks — many CWI candidates fly to Seattle or Portland for testing windows. Radioactive source licensing is administered by Alaska DEC Radiation Protection Program under 18 AAC 85; Alaska is a Section 274b agreement state. Rope-access certification (IRATA or SPRAT) is typically obtained outside Alaska. The Alyeska/JPO co-op runs operator-specific qualification programs (TAPS Procedure NDT) layered on top of ASNT credentials — all field NDT inside the TAPS Right-of-Way requires the layered qualification.",
  salaryBands: [
    { role: 'Level I NDT Trainee (Lower 48 sourced)', low: 52000, high: 72000 },
    { role: 'Level II UT/MT/PT Technician (rotational)', low: 95000, high: 145000 },
    { role: 'Level II PAUT / TOFD Specialist', low: 120000, high: 175000 },
    { role: 'Level III NDT Engineer', low: 140000, high: 215000 },
    { role: 'TAPS Pipeline Integrity Inspector', low: 115000, high: 175000 },
    { role: 'API 653 Tank Inspector (Valdez / Slope)', low: 105000, high: 155000 },
    { role: 'NDT Field Supervisor (rotational)', low: 125000, high: 185000 },
  ],
  hiringSeasons:
    "TAPS integrity-management digs concentrate in the May-September thaw window — frozen ground from October-April makes excavation impractical except for emergency repair. North Slope facilities operate year-round, but module installation and brownfield piping work peak during the August-March winter ice-road season (counterintuitively, frozen ground is the construction surface). Cook Inlet platform inspection follows the ice-free window (April-October). Refining turnaround at Petro Star North Pole and Valdez clusters in shoulder seasons (April-May, September-October). Aviation NDT at Eielson and JBER runs steady-state. Mining inspection (Red Dog, Pogo) follows campaign-driven schedules tied to processing plant outages.",
  faqs: [
    {
      q: 'Is Alaska NDT work worth the rotational schedule and weather?',
      a: "For Level II PAUT and TOFD specialists, yes — the financial gap versus the Lower 48 is real. A Level II PAUT tech earning $85,000-$110,000 in Houston commonly clears $135,000-$170,000 on a North Slope or TAPS rotation, even before factoring in subsidized housing, transportation, and per-diem. Trade-offs: extended periods away from family, severe weather logistics (minus-40 windchill outdoor inspection in winter, mosquito-saturated tundra in summer), and a small social network. Career-progression positive: TAPS and Willow Project experience reads well on a resume for any major operator nationally. Career-progression neutral: most TAPS work is integrity-management dig support — you don't accumulate as much exposure to refining process equipment or LNG cryogenic work.",
    },
    {
      q: 'How does the AOGCC differ from federal regulators for Alaska wellwork NDT?',
      a: "The Alaska Oil and Gas Conservation Commission (AOGCC) is a state agency that regulates oil and gas well construction, integrity, pressure testing, and abandonment for wells on Alaska state and private lands under 20 AAC 25 — broadly equivalent to a state oil-and-gas conservation commission elsewhere. For federal OCS waters (Beaufort/Chukchi seas), BSEE applies under 30 CFR 250 with Arctic-specific Subpart S amendments. Onshore federal lands (notably the National Petroleum Reserve-Alaska, NPR-A, where Willow is located) bring BLM and BIA into the mesh. Practical impact on NDT: AOGCC mandates mechanical integrity testing on production casing and tubing including baseline thickness and bottom-hole pressure tests, with specific well control inspection prior to drilling operations. Willow's NPR-A location means BLM right-of-way conditions apply to gathering lines and flowlines on top of AOGCC well-side requirements.",
    },
    {
      q: 'What is unique about cold-weather NDT operations in Alaska?',
      a: "Three categories of adaptation. First, equipment: ultrasonic couplant must be cold-rated (gel couplants freeze; specialty propylene-glycol or silicone-based couplants extend operation to minus-30 F). Radiographic film and IP plates degrade rapidly in extreme cold — heated source enclosures and image-acquisition shelters become standard. Battery performance halves at minus-20 F, so spare-battery cycling is part of the procedure. Second, personnel: cold-weather PPE adds 4-6 inches of bulk that affects probe coupling and access; mandatory warming-shelter cycles every 30-45 minutes for outdoor work below minus-20 F. Third, schedule: ice-road and rolligon-supported sites have time-of-year access windows that close abruptly — missing an October access window can push inspection to the following April. Procedures must account for thermal cycling between heated shelters and ambient that can cause condensation issues on probes and electronics.",
    },
    {
      q: 'Will the Willow Project change Alaska NDT hiring volume?',
      a: "Yes, materially. Willow (ConocoPhillips, sanctioned March 2023) is a $7+ billion development with peak production of approximately 180,000 bpd and first oil targeted for late 2028 / 2029. Construction runs through 2025-2028 with modules fabricated outside Alaska (Korea, Texas) and barged/sealifted to the Slope, then assembled on site. NDT scope spans module fabrication (RT and PAUT inspection at the fabrication yards), Alaska on-site joining-weld inspection (PAUT/RT/MT at the construction site), commissioning baseline (UT thickness and API 510 baseline), and operating-life inspection from first-oil forward. Estimated peak NDT field workforce in-state during construction: 80-160 technicians on rotation, with sustained operating workforce of 40-80 going forward — a meaningful percentage increase against the current Alaska market.",
    },
    {
      q: 'Where do most Alaska NDT inspectors come from?',
      a: "Operationally, Alaska is a destination market more than a self-sustaining one. Roughly 60-70% of working Level II and Level III NDT technicians in-state are sourced from the Lower 48 — predominantly Texas, Oklahoma, Louisiana, and Colorado contractor pools — and work rotational schedules (2/2, 3/3, or 28/28 day rotations). A smaller in-state cohort (30-40%) consists of Alaska residents who developed certifications through the UAA/AVTEC pipeline and stay in-state long-term. Most of the in-state cohort works for Alyeska directly or for the major Slope service contractors (Acuren, Mistras, Team, IRISNDT, ASRC Energy Services) on Alaska-residency contracts. Alaska residency carries tax and Permanent Fund Dividend advantages that affect total-comp calculations.",
    },
  ],
  internalLinks: [
    { href: '/states/wa', label: 'Washington NDT market guide', context: 'Many Alaska-rotation NDT crews stage out of Anchorage via Seattle — Washington serves as the Lower-48 staging point for North Slope work.' },
    { href: '/states/tx', label: 'Texas NDT market guide', context: 'A large share of Alaska-rotation crews are sourced from Texas oil & gas contractors.' },
    { href: '/states/nd', label: 'North Dakota NDT market guide', context: 'Cold-weather upstream operations in the Bakken share procedure adaptations with Alaska.' },
    { href: '/methods/phased-array-ut', label: 'Phased array UT (PAUT)', context: 'PAUT is the workhorse for TAPS girth-weld inspection and ILI verification.' },
    { href: '/methods/in-line-inspection', label: 'ILI / smart pig support inspection', context: 'TAPS runs ILI cycles every 5-7 years with extensive NDT dig follow-up.' },
    { href: '/industries/midstream-pipelines', label: 'Midstream pipeline NDT', context: 'TAPS is the largest single-pipeline NDT customer in the US.' },
    { href: '/industries/upstream-oil-gas', label: 'Upstream oil & gas NDT', context: 'Alaska North Slope upstream concentration mirrors the Permian in scale.' },
    { href: '/standards/api-653', label: 'API 653 tank inspection', context: 'Valdez Marine Terminal tanks are among the largest in the world and operate on API 653 cycles.' },
    { href: '/standards/phmsa-49cfr195', label: '49 CFR 195 hazardous liquid pipelines', context: 'TAPS is the single largest 49 CFR 195 asset in the country.' },
    { href: '/careers/anchorage-ak', label: 'NDT careers in Anchorage', context: 'Anchorage is the staging hub for North Slope rotations.' },
    { href: '/cost-guide/anchorage-ak/paut', label: 'Anchorage PAUT cost guide', context: 'PAUT day-rates in Alaska routinely run 40-60% above Gulf Coast equivalents.' },
    { href: '/free-tools/calibration-reminder', label: 'Calibration reminder tool', context: 'Rotational schedules and remote sites make calibration tracking critical.' },
  ],
  citations: [
    { id: 'ak-dor-2024', source: 'Alaska Department of Revenue Spring 2024 Revenue Forecast — North Slope production ~470,000 bpd', url: 'https://tax.alaska.gov/' },
    { id: 'aogcc-20aac25', source: 'AOGCC 20 AAC 25 — Oil and Gas Conservation', url: 'https://www.commerce.alaska.gov/web/aogcc/' },
    { id: 'adec-18aac75', source: 'ADEC 18 AAC 75 — Oil and Other Hazardous Substances Pollution Control (incl. AST standards)' },
    { id: 'jpo-taps-grant', source: 'TAPS Federal Grant and State Right-of-Way Lease (Joint Pipeline Office oversight)' },
    { id: 'phmsa-195-452', source: 'PHMSA 49 CFR 195.452 — Pipeline Integrity Management in High Consequence Areas' },
    { id: 'bsee-30cfr250-s', source: 'BSEE 30 CFR 250 Subpart S — Arctic-specific OCS operating requirements' },
    { id: 'willow-rod', source: 'BLM Record of Decision — Willow Master Development Plan (March 2023)' },
    { id: 'api-1163', source: 'API 1163 In-Line Inspection Systems Qualification, 3rd ed., 2021' },
  ],
};

export default state;
