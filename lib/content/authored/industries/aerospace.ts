import type { IndustryContent } from '../types';

const industry: IndustryContent = {
  slug: 'aerospace',
  name: 'Aerospace',
  metaTitle: 'NDT in Aerospace: FAA, AS9100, Nadcap, FPI, ECT, CT',
  metaDescription:
    'Aerospace NDT under FAA Part 145, AS9100D, and Nadcap AC7114 — fan blade FPI, engine disk ETC, composite shearography, and CT for additive manufacturing.',
  heroLede:
    "At a GE Aerospace MRO shop in Cincinnati, a CFM56 high-pressure compressor stage 9 disk lands in the line with 17,500 cycles. Before it can re-enter service, the disk goes through a fluorescent penetrant inspection (FPI) line qualified to ASTM E1417, an eddy current scan of every blade slot per the engine manual, and a Nadcap AC7114-1 audit trail that proves the procedure, the equipment, and the inspector all comply.[1][2] One missed indication in a fir-tree blade slot and the disk releases on a takeoff roll. The economics are stark: FAA tracks roughly $4-7 billion in annual airworthiness directive (AD) compliance spend, much of it driven by NDT-detectable damage mechanisms in engines, structures, and landing gear.[3]\n\nThis guide is for the inspection engineer specifying an aerospace work scope, the Level II FPI or ECT technician on the floor, and the procurement lead vetting a Nadcap-accredited vendor for a Tier 1 OEM.",
  marketContext:
    "Aerospace NDT is the most regulated and procedurally locked-down segment in the industry. Above the FAA's airworthiness regulations in 14 CFR Parts 21, 23, 25, 33, 39, and 145, the Performance Review Institute administers Nadcap accreditation for NDT (AC7114 family) on behalf of the OEMs — Boeing, Airbus, Lockheed Martin, RTX, GE Aerospace, Pratt & Whitney, Rolls-Royce, Safran, and the engine MROs.[2] AS9100D is the quality management baseline for aerospace suppliers, and AS9100/AS9110/AS9120 plus NAS 410 (technician certification) plus Nadcap AC7114 plus the OEM-specific NTM (NDT manual) form a four-layer compliance stack that takes new entrants 18-24 months to clear.[4] EASA Part 145 mirrors the FAA framework for European operators with additional Form 1 release requirements. The market structure is consolidated — a Tier 1 OEM may pre-approve only 20-40 NDT vendors globally for a given commodity. New entrants compete on additive manufacturing inspection (CT), composite inspection (shearography, UT phased array, IR thermography), and digital archive workflow more than on legacy FPI/MT capacity, which is saturated.",
  commonAssets: [
    'Engine rotating hardware — turbine disks, compressor disks, blades, vanes, spools (fir-tree slots, dovetail roots, bores)',
    'Airframe primary structure — wing spars, fuselage frames, longerons, bulkheads (often 7075-T6 or 7050-T7451 aluminum, increasingly Ti-6Al-4V)',
    'Composite primary structure — carbon-fiber wing skins, fuselage barrels (787, A350), control surfaces, tail planes',
    'Landing gear — 300M and AerMet 100 ultra-high-strength steel main and nose gear cylinders, struts, axles',
    'Additively manufactured (AM) hot section components — LPBF Inconel 718/625 fuel nozzles, brackets, manifolds requiring CT acceptance',
    'Castings — investment-cast turbine blades and vanes, sand-cast magnesium gearbox housings',
  ],
  dominantDefectMechanisms: [
    {
      mechanism: 'Low-Cycle Fatigue (LCF) Cracking at Stress Concentrations',
      explanation:
        "Engine disks, blade roots, and airframe fastener holes accumulate LCF damage cycle by cycle. Cracks initiate at machining marks, shot-peen drop-out, or microstructural anomalies and propagate slowly until they reach a critical size. FAA AC 33.14-1 mandates damage tolerance design for engine rotors, and the inspection intervals are driven by the calculated crack growth from initial-flaw size to critical-flaw size.[5] FPI per ASTM E1417 catches surface-breaking cracks; ETC per ASTM E2884 finds tight subsurface cracks at fastener holes; on engine bore holes, ultrasonic methods can size deeper indications.",
    },
    {
      mechanism: 'Stress Corrosion Cracking in Aluminum Alloys',
      explanation:
        "7075-T6, 7050-T7451, and 2024-T3 aluminum airframe parts in marine or hot/humid environments develop intergranular SCC at sustained tensile stress and short-transverse grain orientation. Naval aircraft are particularly susceptible. ASTM E1417 FPI and ECT per NAS 410 procedures are the standard detection methods. The defect is tight and intergranular, demanding Class 1 high-sensitivity fluorescent penetrant systems and 10-15 minute dwell at properly controlled black-light intensity (≥1000 µW/cm² per ASTM E3022).[1]",
    },
    {
      mechanism: 'Foreign Object Damage (FOD) and Erosion on Compressor Airfoils',
      explanation:
        "Fan and low-pressure compressor blades take FOD strikes from runway debris and bird ingestion; high-pressure compressor blades suffer leading-edge erosion in dusty operating environments. Engine manuals (CFM56, V2500, CF6, GE90, GEnx, LEAP, GTF) specify visual + FPI + ECT inspections at defined cycle intervals. Borescope inspections under FAA AC 43-204 supplement disassembly inspections. The challenge is differentiating cosmetic from structurally significant indications under the engine manual's repair limits.[6]",
    },
    {
      mechanism: 'Disbond and Impact Damage in Composite Laminates',
      explanation:
        "Carbon-fiber-reinforced polymer (CFRP) wing skins, control surfaces, and fuselage barrels suffer barely-visible impact damage (BVID) and disbonds at bonded joints. ASTM E2580 covers UT methods for composite inspection; phased array UT with low-frequency probes (2-5 MHz) is standard for laminate volumetric inspection. Shearography per ASTM E2581 detects near-surface disbonds. IR thermography (active flash thermography per ASTM E2582) is increasingly accepted for rapid screening of large composite skins.[7]",
    },
    {
      mechanism: 'Lack-of-Fusion and Porosity in Additively Manufactured Components',
      explanation:
        "Laser powder bed fusion (LPBF) Inconel 718, Inconel 625, and Ti-6Al-4V components exhibit lack-of-fusion defects between layers and gas/keyhole porosity that compromise fatigue life. Industrial CT per ASTM E1570 and CT acceptance criteria per ASTM E2737 are the dominant inspection methods because the defects are internal and three-dimensional.[8] Nadcap AC7114/12 specifically addresses CT for AM. Build-by-build first-article CT plus statistical sampling is the typical acceptance protocol for flight hardware.",
    },
  ],
  methodsUsed: [
    {
      method: 'Fluorescent Penetrant Inspection (FPI), Type 1 Method A/B/C/D',
      reason:
        "Workhorse for surface-breaking flaws on engine and airframe metallic parts. Qualified under ASTM E1417 and Nadcap AC7114-1. Process control on temperature, dwell, emulsifier concentration, rinse pressure, and lighting is audited line-by-line.[1][2]",
    },
    {
      method: 'Eddy Current Testing (ECT) — surface, bolt-hole, and array',
      reason:
        "Crack detection at fastener holes (rotating bolt-hole probes per ASTM E2884), surface scanning on engine airfoils, and array probes for blade slot inspection. ECT detects tight cracks that FPI cannot resolve and works through thin coatings.",
    },
    {
      method: 'Ultrasonic Testing — conventional, PAUT, and immersion',
      reason:
        "Forging volumetric inspection per AMS 2154, billet inspection per AMS-STD-2154, and composite laminate inspection per ASTM E2580. Immersion UT for engine disk macroetch and ultrasonic noise standards. PAUT increasingly used on composite primary structure.",
    },
    {
      method: 'Industrial Computed Tomography (CT)',
      reason:
        "Acceptance NDT for additively manufactured hot section components, investment castings with complex internal geometry, and electronics. Resolves volumetric porosity, lack-of-fusion, and inclusions per ASTM E1570 and E2737.[8]",
    },
    {
      method: 'Radiographic Testing (RT) — film and digital (DR/CR)',
      reason:
        "Investment casting inspection, weld inspection on engine cases and exhaust nozzles, and detection of inclusions in forgings. Film RT per ASTM E1742 and digital DR per ASTM E2698. Largely being displaced by CT for high-value parts.",
    },
    {
      method: 'Shearography and Active Thermography',
      reason:
        "Composite disbond and impact damage detection on large skin areas. Shearography per ASTM E2581 and flash thermography per ASTM E2582. Fast screening tools that flag suspect areas for follow-up UT.",
    },
  ],
  regulatoryFramework: [
    {
      id: 'faa-145',
      source: '14 CFR Part 145, Repair Stations (Federal Aviation Administration)',
      url: 'https://www.ecfr.gov/current/title-14/chapter-I/subchapter-H/part-145',
    },
    {
      id: 'faa-33',
      source: '14 CFR Part 33, Airworthiness Standards: Aircraft Engines',
    },
    {
      id: 'easa-145',
      source: 'EASA Part-145, Maintenance Organisation Approvals (Regulation (EU) 1321/2014, Annex II)',
    },
    {
      id: 'as9100d',
      source: 'SAE AS9100D, Quality Management Systems — Requirements for Aviation, Space, and Defense Organizations, 2016',
    },
    {
      id: 'nas410',
      source: 'NAS 410 / EN 4179, NAS Certification & Qualification of Nondestructive Test Personnel, Revision 5, 2020',
    },
    {
      id: 'nadcap-ac7114',
      source: 'Nadcap AC7114, Nondestructive Testing Audit Criteria, Performance Review Institute',
    },
    {
      id: 'astm-e1417',
      source: 'ASTM E1417/E1417M-21, Standard Practice for Liquid Penetrant Testing',
    },
  ],
  caseScenarios: [
    {
      title: 'CFM56 HPC stage 9 disk — life-limited part shop visit',
      body: "A widebody MRO received a CFM56-5B HPC stage 9 disk at its first heavy shop visit with 17,200 cycles against an LLP limit of 30,000. The shop ran a full FPI to ASTM E1417 Type 1 Method D with hydrophilic emulsifier, plus a rotating bolt-hole ECT probe on every blade dovetail slot at 2 MHz per the engine manual. FPI returned three rejectable indications in fir-tree slots — two were confirmed cracks at 0.8 mm and 1.2 mm depth after metallography on a sister part; one was a manufacturing lap below repair limits. The disk was rejected, an unscheduled disk procurement was triggered, and the operator avoided releasing a damage-tolerant LLP back into service with detectable propagating cracks.",
    },
    {
      title: '787 wing skin — bird strike BVID assessment',
      body: "A 787-9 operator reported a bird strike to the right wing leading edge during a departure climb. Ramp inspection found visible denting plus suspected subsurface delamination over a 600 mm × 200 mm area. The line maintenance team performed Boeing-procedure phased array UT at 5 MHz over the suspect zone, mapped a 320 mm × 110 mm disbond between plies 6-9 of the upper skin laminate, and cross-confirmed with portable shearography. The damage exceeded SRM allowable limits for routine repair; the aircraft was routed to a heavy maintenance base for a bonded skin patch over four days. The AOG cost of the diversion was offset against the certainty of the damage map — without the NDT, the operator would have flown a deferred-repair aircraft for weeks under conservative load restrictions.",
    },
    {
      title: 'LPBF fuel nozzle first-article CT acceptance',
      body: "A new build of LEAP-1A fuel nozzles fabricated by laser powder bed fusion at a Tier 1 supplier required first-article acceptance CT per the OEM's NTM and Nadcap AC7114/12. The CT system was qualified to ASTM E1570 with a 25 µm voxel size on a 150 mm nozzle envelope. CT scans of the first 20 builds returned two lack-of-fusion clusters above the 0.20 mm acceptance threshold — both correlated to laser power drops during the build that the in-process melt-pool monitoring system had flagged but the operator had not paused. The supplier retuned process parameters, locked the build recipe, and entered serial production with statistical CT sampling of one in twenty parts plus 100% in-process monitoring. Build yield improved from 78% to 96% over six months.",
    },
  ],
  costDrivers: [
    'Nadcap audit cycle (every 18 months for established suppliers, every 12 months during probation) consuming 80-160 hours of internal quality time per audit',
    'NAS 410 / EN 4179 Level II and Level III technician certification — initial qualification 2-6 months, recurring eye exams, annual procedure familiarization',
    'Type 1 Method D FPI line process control — daily temperature, concentration, and water pressure checks plus weekly system performance per ASTM E1417',
    'OEM-proprietary procedures — each engine OEM (GE, P&W, Rolls-Royce) maintains separate NTMs with non-portable procedures',
    'CT capital cost — a 450 kV industrial CT system runs $1.5-3.5M with a 5-year payback dependent on AM volume',
    'Traceability and digital archive — Boeing D6-51991 and Airbus AIPI 09-08-002 mandate 7-25 year inspection record retention',
  ],
  vendorSelection:
    "For aerospace work, the minimum bar is AS9100D certification, NAS 410 / EN 4179 personnel certification (with Level III on staff for each method used), and Nadcap AC7114 accreditation in the specific NDT commodity (AC7114-1 for PT/MT, AC7114-2 for UT, AC7114/3 for ETC, AC7114/4 for RT, AC7114/12 for AM). Each OEM separately approves vendors — Boeing's M&P Approved Suppliers list, Airbus AIPS approval, GE Aviation S-475, P&W LCS, RTX approved supplier lists. For a new procurement scope, confirm not just that the vendor holds Nadcap, but that they hold the OEM-specific approval for the commodity, technique, and material family. Reject vendors who hold AS9100 but not Nadcap for the specific NDT method; the OEM will not accept the certification chain. NDT Connect's marketplace flags Nadcap accreditation status and OEM approvals on vendor profiles so procurement teams can shortlist in hours.",
  faqs: [
    {
      q: 'What is the difference between AS9100, NAS 410, and Nadcap AC7114?',
      a: "These are three layers of the aerospace NDT compliance stack. AS9100D is the overarching quality management system standard — it covers all aviation/space/defense suppliers and is the equivalent of ISO 9001 with aerospace-specific additions. NAS 410 / EN 4179 governs personnel certification — it defines training hours, experience requirements, and examinations for Level I, II, and III NDT technicians by method. Nadcap AC7114 is the process audit criteria for NDT specifically — it audits the procedure, the equipment, the chemistry, the lighting, and the records for each NDT method. A Tier 1 OEM typically requires all three plus its own NTM (NDT manual) approval before accepting parts.[2][4]",
    },
    {
      q: 'When is industrial CT required versus radiography for aerospace parts?',
      a: "CT is required when the part has complex 3D internal geometry where film RT cannot achieve unambiguous interpretation — investment castings with internal cooling passages, additively manufactured parts with internal lattices, and electronic assemblies. ASTM E1570 covers CT practice and ASTM E2737 covers performance evaluation of CT systems. For simple geometry (forged plates, welds, simple castings), film RT per ASTM E1742 or digital DR per ASTM E2698 remains acceptable and is faster and cheaper per part. The crossover for AM parts is unambiguous — every major engine OEM mandates CT acceptance for flight-critical LPBF and electron-beam-melted hot section components.[8]",
    },
    {
      q: 'What FPI sensitivity level should I specify for engine rotor parts?',
      a: "ASTM E1417 defines five FPI sensitivity levels: Level 1 (Ultra-Low) through Level 4 (Ultra-High). Engine rotor parts (disks, spools, integrally bladed rotors) require Level 3 (High) or Level 4 (Ultra-High) penetrant. Method D (hydrophilic post-emulsifier) is the standard process for rotor disks because it provides controlled background removal that preserves indications. Process controls per the standard include penetrant dwell of 10-30 minutes (typically 20 for rotor parts), emulsifier concentration 15-20% measured by refractometer twice per shift, and black light intensity ≥1000 µW/cm² at the inspection surface. The OEM engine manual or the supplier's NTM will specify the exact level — when in doubt, default up.[1]",
    },
    {
      q: 'How are composite primary structures (e.g., 787 wing skins) inspected in service?',
      a: "Composite primary structure inspection is governed by the OEM Structural Repair Manual (SRM) and Aircraft Maintenance Manual (AMM). For routine line inspections, visual is supplemented by tap testing (audible response) for delamination screening; for any suspected damage, phased array UT at 2-5 MHz with low-frequency probes maps subsurface disbonds and delaminations per ASTM E2580. Boeing and Airbus both qualify portable PAUT and shearography systems for in-service damage assessment. For impact damage exceeding SRM allowables, the aircraft typically routes to a heavy maintenance base equipped with full-area UT mapping systems and bonded patch repair capability under SRM-controlled procedures.[7]",
    },
    {
      q: 'How long does Nadcap accreditation take for a new NDT supplier?',
      a: "A new entrant typically needs 12-24 months from a standing start. The path is: implement AS9100D (6-9 months including stage 1 and stage 2 audits with a notified body), qualify personnel under NAS 410 / EN 4179 (3-6 months for first Level II, 1-3 years for first Level III in each method depending on hours-of-experience requirements), write NDT procedures aligned with OEM NTMs (2-3 months), submit a Nadcap application and complete a self-audit (1-2 months), then host the Nadcap on-site audit (2-4 days). First-time audit findings typically run 5-15 nonconformances requiring 60-day closure. Sustained accreditation requires re-audit on 18-24 month cycles plus annual internal audits per the AS9100 framework.[2]",
    },
  ],
  internalLinks: [
    {
      href: '/ndt-methods/fluorescent-penetrant-inspection',
      label: 'Fluorescent Penetrant Inspection (FPI)',
      context: 'FPI is the dominant surface NDT method on aerospace engine and airframe metallic parts.',
    },
    {
      href: '/ndt-methods/eddy-current-testing',
      label: 'Eddy Current Testing (ECT)',
      context: 'ECT covers crack detection at fastener holes, blade slots, and thin coatings on aerospace structures.',
    },
    {
      href: '/ndt-methods/computed-tomography',
      label: 'Industrial Computed Tomography (CT)',
      context: 'CT is the acceptance method for additively manufactured hot section components and complex castings.',
    },
    {
      href: '/standards/as9100',
      label: 'AS9100D Quality Management',
      context: 'AS9100D is the baseline QMS for aerospace suppliers above Nadcap and NAS 410.',
    },
    {
      href: '/standards/nas-410',
      label: 'NAS 410 Personnel Certification',
      context: 'NAS 410 / EN 4179 governs technician qualification for aerospace NDT.',
    },
    {
      href: '/industries/automotive',
      label: 'Automotive NDT',
      context: 'Automotive shares CT, AM, and high-volume FPI inspection capacity with aerospace.',
    },
    {
      href: '/industries/manufacturing',
      label: 'Manufacturing NDT',
      context: 'Tier 1 aerospace manufacturing relies on the same precision casting and forging inspection capacity as general manufacturing.',
    },
    {
      href: '/free-tools/certificate-manager',
      label: 'NDT Certificate Manager',
      context: 'Track NAS 410 / EN 4179 personnel certifications with expiry alerts.',
    },
    {
      href: '/careers/ndt-technician',
      label: 'NDT Technician Career Path',
      context: 'Aerospace NDT careers under NAS 410 have distinct training hour requirements compared to ASNT SNT-TC-1A.',
    },
  ],
  citations: [
    {
      id: 'astm-e1417',
      source: 'ASTM E1417/E1417M-21, Standard Practice for Liquid Penetrant Testing, ASTM International, 2021',
    },
    {
      id: 'nadcap-ac7114',
      source: 'Nadcap AC7114, Audit Criteria for Nondestructive Testing, Performance Review Institute (revised periodically)',
    },
    {
      id: 'faa-ad-spend',
      source: 'FAA Aircraft Certification Service, Annual Performance Report, 2023',
      url: 'https://www.faa.gov/aircraft/air_cert',
    },
    {
      id: 'as9100d',
      source: 'SAE AS9100D, Quality Management Systems — Requirements for Aviation, Space, and Defense Organizations, SAE International, 2016',
    },
    {
      id: 'faa-ac-33-14',
      source: 'FAA Advisory Circular 33.14-1, Damage Tolerance for High Energy Turbine Engine Rotors, 2001',
    },
    {
      id: 'faa-ac-43-204',
      source: 'FAA Advisory Circular 43-204, Visual Inspection for Aircraft, 1997',
    },
    {
      id: 'astm-e2580',
      source: 'ASTM E2580-17, Standard Practice for Ultrasonic Testing of Flat Panel Composites and Sandwich Core Materials Used in Aerospace Applications',
    },
    {
      id: 'astm-e1570',
      source: 'ASTM E1570-19, Standard Practice for Computed Tomographic (CT) Examination',
    },
    {
      id: 'nas-410',
      source: 'NAS 410 Revision 5, NAS Certification & Qualification of Nondestructive Test Personnel, Aerospace Industries Association, 2020',
    },
    {
      id: 'easa-145',
      source: 'Commission Regulation (EU) No 1321/2014, Annex II (Part-145), Maintenance Organisation Approvals',
    },
  ],
};

export default industry;
