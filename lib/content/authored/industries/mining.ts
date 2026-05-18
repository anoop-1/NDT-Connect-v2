import type { IndustryContent } from '../types';

const industry: IndustryContent = {
  slug: 'mining',
  name: 'Mining',
  metaTitle: 'Mining NDT: Haul Truck Frames, Mill Liners, Conveyors, Shovels',
  metaDescription:
    'Mining NDT — Caterpillar 797F haul truck frame MT, ball mill shell UT, dragline boom inspection, MSHA compliance, and surface and underground equipment integrity programs.',
  heroLede:
    "At a copper mine in Arizona, a fleet of 30 Caterpillar 797F haul trucks each hauls 400 short tons per cycle, 24/7 across a 20-year operating life. Frame and suspension component fatigue cracks are not theoretical — they propagate from the first 1,000 hours of service and the question is whether NDT catches them before catastrophic failure on a haul road. MSHA's 30 CFR Part 56 (surface) and Part 57 (underground) require equipment to be 'maintained in safe operating condition' and explicitly allow inspectors to mandate NDT when failure consequences warrant.[1] Beyond regulatory minimums, the OEM Service Information System (SIS) for Cat and Komatsu specifies MT and UT intervals on critical frame welds — a missed crack on a haul truck spindle housing or dragline boom takes the asset out of production for weeks at six- and seven-figure cost.\n\nThis guide is for the reliability engineer at a hard-rock or coal mine, the field NDT technician inspecting heavy mobile equipment, and the equipment owner specifying an inspection program against MSHA expectations and OEM SIS guidance.",
  marketContext:
    "U.S. mining is a $90+ billion sector tracked by the U.S. Geological Survey (USGS) Mineral Industry Surveys, with metal mining (copper, gold, iron, molybdenum, zinc), coal mining, and industrial minerals each driving their own equipment fleets and NDT scopes.[2] MSHA regulates worker and equipment safety under 30 CFR Parts 56 and 57; the Department of Energy's Bureau of Land Management and various state regulators handle environmental, reclamation, and surface-impact oversight. Equipment fleets are dominated by Caterpillar, Komatsu, Liebherr, Hitachi, P&H/Joy Global, and Sandvik, each with proprietary SIS or maintenance manuals that specify NDT intervals on frame welds, undercarriage components, and rotating machinery. Underground mining adds methane and ventilation safety considerations plus specific equipment qualifications under 30 CFR Part 18 for permissible (flameproof) electrical equipment. The NDT market structure favors in-house inspectors at large miners (Freeport-McMoRan, BHP, Rio Tinto, Newmont, Glencore) supplemented by specialty contractors for high-value campaigns — dragline boom inspections, mill liner replacements, conveyor structural surveys.",
  commonAssets: [
    'Haul trucks — 100-ton to 400-ton ultra class (Cat 797F, Komatsu 980E, Liebherr T 282C) frame, suspension, dump body',
    'Cable and hydraulic shovels — P&H 4100 series, Cat 7495, Komatsu PC8000 — boom, dipper, undercarriage, swing rack',
    'Draglines — Marion 8200, Bucyrus-Erie 2570W — boom welds, tub assembly, bucket trunnion',
    'Ball and SAG mills — shell, head, trunnion, gear, pinion (typically 26-42 ft diameter SAG mills, 6,000-30,000 hp drives)',
    'Conveyor structural — trusses, supports, pulleys, drive frames on long-distance overland conveyors',
    'Underground equipment — continuous miners, longwall shearers, shuttle cars, scoops (with 30 CFR Part 18 permissibility)',
  ],
  dominantDefectMechanisms: [
    {
      mechanism: 'Fatigue Cracking on Haul Truck Frame Welds',
      explanation:
        "Ultra-class haul trucks load and unload 400-ton payloads continuously, putting frame welds under cyclic stress at the order of 100,000+ cycles per year. Cat and Komatsu SIS bulletins identify hot-spot weld locations — typically suspension trunnion-to-frame welds, dump body pivot pins, and rear axle housing welds — for MT inspection at 5,000-15,000 hour intervals. Detection is by wet visible or wet fluorescent MT after high-pressure wash and grind preparation. Cracks below 5 mm length are often gouged out and re-welded in field; cracks above 25 mm typically require dispatch to a heavy rebuild center.",
    },
    {
      mechanism: 'Dragline Boom Stress Concentration Fatigue',
      explanation:
        "Walking draglines used in coal stripping operate continuously for 30-50 year design lives. Boom welds at the foot pin, mast attachment, and boom-to-house connections experience massive cyclic stress amplified by suspension cable load variations. Periodic UT inspection of boom welds, MT of accessible weld toes, and visual inspection of mast cables forms the integrity program. Catastrophic boom failures (Black Thunder Mine 2007, others) have driven the industry toward more aggressive inspection intervals and finite element fatigue analysis updating.",
    },
    {
      mechanism: 'Mill Trunnion Bearing Fatigue and Shell Wear',
      explanation:
        "SAG and ball mill trunnion bearings carry shell, ore, and grinding media loads continuously. Trunnion bearing surface fatigue is detected by ultrasonic shell wear surveys, bearing oil debris analysis, and periodic shell weld UT inspection. Modern mills with 26-42 ft shell diameters carry millions of pounds of charge weight, and a trunnion failure shuts down the mill for 6-12 weeks pending bearing replacement. Inspection during shell reline shutdowns (every 6-18 months for SAG, every 12-24 for ball) is the principal opportunity for thorough inspection.",
    },
    {
      mechanism: 'Conveyor Pulley Shaft and Frame Cracking',
      explanation:
        "Long-distance overland conveyors (10-20+ km) carry crushed ore at high tonnages with drive pulleys, take-up pulleys, and idler frames under continuous load. Drive pulley shaft cracking at the keyway, taper-lock bushing locations, and shaft-to-end-disc welds is common at 50,000-100,000 service hours. UT shaft inspection during scheduled belt change-outs, plus MT on pulley end-disc welds and frame member welds, drives the conveyor reliability program. CEMA (Conveyor Equipment Manufacturers Association) standards plus the operator's reliability manual govern inspection scope.",
    },
    {
      mechanism: 'Underground Roof Bolt and Cable Bolt Verification',
      explanation:
        "Coal and hard-rock underground mines use steel roof bolts (typically 0.625-0.875 in diameter) and cable bolts to support tunnel and stope geometry. MSHA 30 CFR §75.220 (coal) and §57.3360 (metal/non-metal) requires roof support plans approved by the District Manager. Bolt installation pull-out testing per ASTM F432 verifies anchorage capacity. NDT methods including time-of-flight UT (Boltometer, MIRARCO Bolt Scanner) and EFI (Electromagnetic Field Imaging) check installed bolt integrity for grout coverage and shaft condition.",
    },
  ],
  methodsUsed: [
    {
      method: 'Magnetic Particle Testing (MT) — Field Yoke and Prod',
      reason:
        "Workhorse for crack detection on haul truck frames, shovel booms, dragline structural welds, and conveyor pulley shafts. ASTM E709 and ASME V Article 7 govern technique. Field-portable yokes (Magnaflux Y-8, Parker B310S) with dry powder or wet visible particle.",
    },
    {
      method: 'Ultrasonic Testing (UT) — Shaft Bore and Weld Volumetric',
      reason:
        "Shaft inspection on drive pulleys, mill trunnions, and shovel swing-rack shafts. Weld volumetric inspection on dragline booms and shovel structural members. ASME V Article 5 and ASTM A388 govern technique. PAUT increasingly used on heavy structural welds.",
    },
    {
      method: 'Liquid Penetrant Testing (PT)',
      reason:
        "Crack detection on non-ferromagnetic components — stainless steel screens, bronze bearings, aluminum dump body components. ASME V Article 6 and ASTM E165 govern technique.",
    },
    {
      method: 'Visual Testing (VT) — Direct and Remote',
      reason:
        "First-line acceptance for every structural weld and equipment inspection. AWS CWI for code-credited inspection on rebuilds; remote borescope for internal mill liner inspection and underground equipment hot spots.",
    },
    {
      method: 'Bolt Tension and Bolt Integrity UT',
      reason:
        "Time-of-flight UT through bolt length per ASTM F2482 for shovel cluster bolts, mill liner bolts, and structural connections. Pull-out testing per ASTM F432 for installed roof bolts in underground mines.",
    },
    {
      method: 'Ground-Penetrating Radar (GPR) for Roof and Pillar Assessment',
      reason:
        "Subsurface imaging of underground rock conditions, void detection in pillars, and verification of roof-bolt grouting. NIOSH research and various commercial GPR systems (e.g., MALA, GSSI) calibrated for in-mine use.",
    },
  ],
  regulatoryFramework: [
    {
      id: 'msha-30-56',
      source: '30 CFR Part 56, Safety and Health Standards — Surface Metal and Nonmetal Mines',
      url: 'https://www.ecfr.gov/current/title-30/chapter-I/subchapter-N/part-56',
    },
    {
      id: 'msha-30-57',
      source: '30 CFR Part 57, Safety and Health Standards — Underground Metal and Nonmetal Mines',
    },
    {
      id: 'msha-30-75',
      source: '30 CFR Part 75, Mandatory Safety Standards — Underground Coal Mines',
    },
    {
      id: 'msha-30-77',
      source: '30 CFR Part 77, Mandatory Safety Standards — Surface Coal Mines and Surface Work Areas',
    },
    {
      id: 'msha-30-18',
      source: '30 CFR Part 18, Electric Motor-Driven Mine Equipment and Accessories (Permissibility)',
    },
    {
      id: 'osha-1910-269',
      source: '29 CFR 1910.269, Electric Power Generation, Transmission, and Distribution — applies to mine substations',
    },
    {
      id: 'astm-f432',
      source: 'ASTM F432-19, Standard Specification for Roof and Rock Bolts and Accessories',
    },
  ],
  caseScenarios: [
    {
      title: 'Arizona copper mine — Cat 797F haul truck frame crack campaign',
      body: "An Arizona copper mine operating 30 Cat 797F haul trucks averaging 6,500 operating hours per year initiated a fleet-wide MT inspection program after a single truck developed a 380 mm crack in the rear axle housing weld, taking the truck out of service for 9 weeks. The reliability team partnered with a regional NDT contractor to MT-inspect critical weld locations on every truck at the next scheduled 5,000-hour service interval. The campaign over 18 months found 23 cracks across 30 trucks ranging from 15 mm to 270 mm length, 19 of which were caught early and field-repaired without major teardown. Total inspection cost was $720,000 across the fleet; estimated avoided downtime savings exceeded $14 million in production preservation. The mine adopted MT inspection every 5,000 hours as a standing reliability practice on the ultra-class fleet.",
    },
    {
      title: 'Wyoming coal dragline — boom weld UT and life extension',
      body: "A 65-cubic-yard walking dragline at a Powder River Basin coal operation reached its 42nd year of service with the operator considering a 10-year life extension versus a $180 million replacement. Engineering critical assessment under BS 7910 required a comprehensive UT inspection of all boom welds, mast attachment welds, and house structural welds, plus replication metallography at four locations on the boom foot pin region. The 21-day inspection campaign found two propagating fatigue cracks on the boom dump-block weld at 8 mm and 14 mm depth, plus generalized weld-toe cracking on the mast attachment requiring weld repair. Engineering assessment cleared the dragline for 8 additional years of service with mandated annual MT re-inspection on the repaired and adjacent welds. Inspection and repair cost was $4.6 million; deferred replacement capex was $175 million.",
    },
    {
      title: '32-ft SAG mill shell crack — emergency inspection and weld repair',
      body: "A western gold mine's 32-ft SAG mill developed an audible 'tick' during operation that the maintenance team traced to a shell crack near the feed-end head-to-shell weld. Emergency inspection during a planned 36-hour grinding circuit shutdown deployed PAUT and MT on the suspect weld zone. The inspection mapped a 1.8 m through-wall crack propagating circumferentially in the head-to-shell weld at the 4 o'clock position. The mine engaged a specialty heavy weld repair contractor to grind out, preheat, weld-repair, and PWHT the affected section under an ASME B31.3-style WPS qualified for the high-Mn-content shell plate. The 16-day extended outage cost $42 million in deferred production but avoided a catastrophic shell failure that would have destroyed the trunnion bearings and head castings — a $130 million replacement cycle plus 4-6 month lead time.",
    },
  ],
  costDrivers: [
    'Remote mine site mobilization — rural haul road and lodging costs add 30-60% to NDT contractor day rates',
    'Heavy mobile equipment downtime opportunity cost — ultra-class haul truck offline costs $20,000-$50,000 per day in deferred production',
    'OEM SIS bulletin compliance — Cat, Komatsu, Liebherr publish targeted inspection bulletins that drive intensified intervals on identified hot spots',
    'Cleaning and preparation — high-pressure wash plus grind preparation can consume 30-50% of total MT inspection cost on dirt-impacted heavy equipment',
    'MSHA compliance documentation — inspection records must be auditable and tied to MSHA part 50 accident reporting',
    'Dragline and shovel boom inspections — typically 7-21 day campaigns with multiple inspectors, scaffolding, and rigging',
  ],
  vendorSelection:
    "For mining NDT, the threshold is ASNT SNT-TC-1A or CP-189 written practice plus AWS CWI for any code-credited weld inspection on rebuilds. For heavy equipment OEM-credit inspections, vendors should hold demonstrated training on the specific OEM SIS (Cat, Komatsu, Liebherr) — the OEMs provide periodic training updates for contracted inspectors. For underground work, vendors must have MSHA training certificates (Part 46 surface or Part 48 underground), respiratory protection program compliance, and equipment qualified for the specific underground environment (permissibility under 30 CFR Part 18 for coal). Pre-qualify vendors by requesting MSHA training certificates, recent mine site references, OEM-specific training documentation, and Level III oversight credentials. NDT Connect lists mining-credentialed vendors filtered by MSHA training, OEM SIS familiarity, and regional coverage near remote mine sites.",
  faqs: [
    {
      q: 'Does MSHA require NDT on mine equipment?',
      a: "MSHA 30 CFR Parts 56, 57, 75, and 77 do not prescribe specific NDT methods or intervals on equipment beyond requiring that equipment be 'maintained in safe operating condition.' However, MSHA inspectors can and do issue 104(a) citations when equipment failures result from inadequate inspection, and case law from prior enforcement actions establishes that OEM-recommended NDT intervals form a reasonable baseline for what constitutes safe maintenance practice. In practice, large operators run NDT inspection programs aligned with OEM SIS bulletins (Caterpillar, Komatsu, Liebherr) plus internal reliability standards that go beyond the regulatory minimum. MSHA's roof control plan approval process for underground mines (§75.220 coal, §57.3360 metal) does specifically require documented testing including pull-out tests for roof bolts.[1]",
    },
    {
      q: 'How is a dragline boom inspected for life extension?',
      a: "Dragline boom life extension inspections combine UT volumetric weld inspection (typically PAUT or shear wave UT per ASME V Article 5), MT surface crack detection on accessible weld toes, replication metallography on suspect hot-spot welds, and engineering critical assessment under BS 7910 or API 579-1/ASME FFS-1. A typical campaign covers 100-300 individual weld locations on boom, mast, and house structural members over a 14-28 day planned outage. The output is a list of repair-required welds, monitoring-recommended welds, and accepted-as-found welds, plus a remaining life estimate based on observed crack growth and applied finite element fatigue analysis updating with field measurements. Major OEMs (Joy Global, Bucyrus, Caterpillar) maintain proprietary life extension methodologies layered on top of the inspection-NDT and ECA work.",
    },
    {
      q: 'What is the role of OEM Service Information System (SIS) bulletins in mining NDT?',
      a: "Caterpillar SIS, Komatsu CSS-Net, Liebherr LIDAT, and similar OEM systems publish periodic Service Bulletins, Field Modifications, and Inspection Notices identifying recurring failure modes and specifying NDT inspection requirements. For example, a Caterpillar SIS bulletin on the 797F rear axle housing weld will specify MT inspection interval (typically 5,000-10,000 operating hours), inspection technique, acceptance criteria, and remedial action for found cracks. Operators are not legally required to follow OEM bulletins, but adherence is the typical industry practice for two reasons: warranty maintenance and reliability outcomes. NDT contractors working on mine sites are expected to be familiar with the relevant OEM bulletins for the equipment they inspect.",
    },
    {
      q: 'How does roof bolt integrity inspection work in underground mines?',
      a: "Roof bolt integrity is verified through several methods: initial pull-out testing per ASTM F432 at installation to verify anchorage; periodic visual inspection of plates, washers, and bolt heads during routine roof control inspections; and in critical situations, NDT methods including time-of-flight ultrasonic testing (Boltometer-type instruments) that send a stress wave down the bolt and measure the return time to characterize the bolt length and the presence of grout. MSHA roof control plans approved under 30 CFR §75.220 (coal) and §57.3360 (metal/non-metal) typically specify the inspection cadence and methods. Cable bolts (used in stope reinforcement) have specialized integrity inspection methods including time-domain reflectometry for grout column verification.",
    },
    {
      q: 'What certifications should a mining NDT contractor hold?',
      a: "Minimum credentials for U.S. mining NDT work: ASNT SNT-TC-1A or CP-189 personnel certification for the inspection methods being applied; AWS CWI for any code-credited weld inspection associated with major equipment rebuilds (e.g., haul truck frame straightening and welding under AWS D1.1); MSHA Part 46 (surface) or Part 48 (underground) annual training certification for site access; and for underground coal mines, additional MSHA Part 48A or 48B certification depending on the worker classification. Some operators additionally require OSHA 30-hour Construction or General Industry training for crews on rebuild and major maintenance projects. Major miners (BHP, Rio Tinto, Freeport-McMoRan, Newmont) maintain their own pre-qualification programs that layer on top of these baseline credentials.",
    },
  ],
  internalLinks: [
    {
      href: '/ndt-methods/magnetic-particle-testing',
      label: 'Magnetic Particle Testing (MT)',
      context: 'MT is the workhorse for surface crack detection on mining heavy mobile equipment.',
    },
    {
      href: '/ndt-methods/ultrasonic-testing',
      label: 'Ultrasonic Testing (UT)',
      context: 'UT covers shaft and weld volumetric inspection on shovels, draglines, and conveyor pulleys.',
    },
    {
      href: '/ndt-methods/visual-testing',
      label: 'Visual Testing (VT)',
      context: 'Visual inspection — direct and remote borescope — is the first-line acceptance for every weld and equipment hot spot.',
    },
    {
      href: '/standards/aws-d1-1',
      label: 'AWS D1.1 Structural Welding Code',
      context: 'AWS D1.1 governs the weld procedures and acceptance on heavy mobile equipment rebuilds.',
    },
    {
      href: '/industries/construction',
      label: 'Construction NDT',
      context: 'Mining structural NDT shares much of the methodology and equipment with heavy civil construction work.',
    },
    {
      href: '/industries/manufacturing',
      label: 'Manufacturing NDT',
      context: 'Shop-fabrication of mining equipment runs through manufacturing NDT before field deployment.',
    },
    {
      href: '/free-tools/equipment-tracker',
      label: 'Equipment Tracker',
      context: 'Track UT gauges, MT yokes, and PAUT systems across remote mine site campaigns.',
    },
    {
      href: '/free-tools/calibration-reminder',
      label: 'Calibration Reminder',
      context: 'Stay ahead of UT and MT equipment calibration intervals on long mine site rotations.',
    },
  ],
  citations: [
    {
      id: 'msha-30-56',
      source: '30 CFR Part 56, Safety and Health Standards — Surface Metal and Nonmetal Mines, Mine Safety and Health Administration',
    },
    {
      id: 'usgs-mineral',
      source: 'U.S. Geological Survey, Mineral Industry Surveys and Mineral Commodity Summaries, 2024',
      url: 'https://www.usgs.gov/centers/national-minerals-information-center',
    },
    {
      id: 'astm-e709',
      source: 'ASTM E709-21, Standard Guide for Magnetic Particle Testing',
    },
    {
      id: 'astm-f432',
      source: 'ASTM F432-19, Standard Specification for Roof and Rock Bolts and Accessories',
    },
    {
      id: 'msha-30-75',
      source: '30 CFR Part 75, Mandatory Safety Standards — Underground Coal Mines',
    },
    {
      id: 'astm-a388',
      source: 'ASTM A388/A388M-19, Standard Practice for Ultrasonic Examination of Steel Forgings',
    },
    {
      id: 'aws-d1-1',
      source: 'AWS D1.1/D1.1M:2020, Structural Welding Code — Steel, American Welding Society',
    },
    {
      id: 'astm-f2482',
      source: 'ASTM F2482-19, Standard Specification for Inspection and Acceptance of Ultrasonic Examination of Bolts',
    },
  ],
};

export default industry;
