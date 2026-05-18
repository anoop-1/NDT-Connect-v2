import type { IndustryContent } from '../types';

const industry: IndustryContent = {
  slug: 'oil-and-gas',
  name: 'Oil and Gas',
  metaTitle: 'NDT for Oil and Gas: Codes, Methods, Defect Mechanisms',
  metaDescription:
    'Field-grade NDT guidance for upstream, midstream, and downstream oil and gas — API 510/570/653 turnaround planning, defect mechanisms, methods, and vendor scoping.',
  heroLede:
    "Turnaround season at ExxonMobil Baytown means a 14-day shutdown window where every hydroprocessing reactor, FCC overhead line, and amine column gets opened, surveyed, and signed off before startup. API 510 §6.4.1 mandates a 5-year external visual plus an internal thickness survey on pressure vessels; API 570 §6.3 caps piping inspection intervals at half the remaining life or 10 years for Class 1. Miss the window and the unit stays cold. The inspection plan is dense, the methods are mature, and the economics of getting it wrong are measured in tens of millions per day of lost throughput.[1][2]\n\nThis guide is for the inspection engineer scoping turnaround work packages, the Level II technician shooting RT or running PAUT on heavy wall, and the asset owner trying to sanity-check a vendor proposal against API and PHMSA expectations.",
  marketContext:
    "Oil and gas is the largest single end-market for NDT services in North America. The U.S. Energy Information Administration tracks roughly 130 operating refineries and over 3 million miles of pipeline subject to PHMSA jurisdiction.[3] PHMSA's pipeline integrity management rules under 49 CFR 195.452 require operators of hazardous liquid pipelines in high-consequence areas to run baseline assessments and reassess on intervals not exceeding 5 years using ILI, hydrotest, or direct assessment, every one of which feeds downstream NDT verification work.[4] Downstream, API 510, 570, and 653 govern pressure vessel, piping, and atmospheric storage tank inspection respectively, and the Risk-Based Inspection methodology in API RP 580/581 sets how intervals shift based on damage mechanism analysis.[1][2][5][6] Offshore, the Bureau of Safety and Environmental Enforcement enforces 30 CFR 250 Subpart H for production safety systems on the OCS, which pulls in API Std 2RD, API 17TR8, and a chain of weld and structural NDT requirements during fabrication and in-service.[7] The market is mature, the rate cards are reasonably standardized, and the differentiator on the vendor side is turnaround responsiveness and code literacy rather than headline price.",
  commonAssets: [
    'Pressure vessels (hydrotreaters, FCC reactors, separators, knockout drums) under ASME Sec VIII Div 1/2 and API 510 in-service',
    'Process piping circuits (high-temp H2S, sour service, amine, hydrogen) under ASME B31.3 fabrication and API 570 in-service',
    'Atmospheric and low-pressure storage tanks (crude, products, slop) under API 650 build and API 653 in-service',
    'Transmission and gathering pipelines under 49 CFR 192 (gas) and 49 CFR 195 (hazardous liquid), built to API 5L and welded per API 1104',
    'Offshore platforms, risers, and subsea pipelines under BSEE 30 CFR 250 and API 2RD/17TR8',
    'Heat exchanger tube bundles (shell and tube, fin-fan air coolers) inspected by ECT/IRIS/RFT',
  ],
  dominantDefectMechanisms: [
    {
      mechanism: 'High-Temperature Hydrogen Attack (HTHA)',
      explanation:
        "Carbon and C-0.5Mo steel exposed above the Nelson curve (API RP 941) lose strength as atomic hydrogen reacts with carbides to form methane microvoids and fissures.[8] HTHA is insidious because surface UT often misses it until creep cracking links the voids. Modern practice on hydroprocessing reactor circuits uses high-frequency PAUT with TFM imaging and AUBT (advanced ultrasonic backscatter technique) — straight UT thickness alone is no longer accepted as a screening method on suspect equipment.",
    },
    {
      mechanism: 'Corrosion Under Insulation (CUI)',
      explanation:
        "CUI on carbon steel piping operating between -4 °C and 175 °C (and on austenitic stainless from 60-205 °C as chloride SCC) is the dominant cause of unscheduled piping failures in refineries per API RP 583.[9] Insulation traps water, jacket damage admits oxygen, and external pitting or wall thinning develops invisibly under cladding. Pulsed eddy current (PEC) and real-time digital radiography (DR) through insulation are the workhorses; full strip-and-inspect is reserved for confirmed defects or high-consequence circuits.",
    },
    {
      mechanism: 'Sulfide Stress Cracking and Wet H2S Damage',
      explanation:
        "Sour service equipment — anything wet with H2S above 50 ppm partial pressure — is subject to SSC, HIC, SOHIC, and blistering, governed by NACE MR0175/ISO 15156 for material selection and NACE SP0472 for fabrication.[10] In service, WFMT on internal weld toes, AUT shear wave for HIC mid-wall cracking, and TOFD for SOHIC near welds form the standard inspection bundle. RBI methodology under API RP 581 drives the interval based on H2S partial pressure, pH, and CN levels.",
    },
    {
      mechanism: 'Erosion-Corrosion and Sand Wear',
      explanation:
        "FCC slurry circuits, choke valves on production wells, and crude unit overhead lines lose wall thickness in defined patterns — elbow extrados, downstream of orifices, T-joints. API 570 §7.1 specifies CMLs (condition monitoring locations) and demands grid UT or scanned UT on susceptible spools.[2] PAUT corrosion mapping with C-scan output gives the maintenance engineer a wall thickness contour map that beats grid-spot UT for trend analysis and remaining life calculations.",
    },
    {
      mechanism: 'Stress Corrosion Cracking (Chloride and Caustic)',
      explanation:
        "Austenitic stainless steel under chloride contamination above ~60 °C, and carbon steel in concentrated caustic above the API RP 945 Lukens curve, both develop branched intergranular cracks that are tight and difficult to detect.[11] PT is the field-standard surface method; ECT array probes are increasingly used on smaller-bore tubing and bellows. The inspection challenge is access — caustic SCC often hides on the OD under lagging or on the ID of weld root areas in transfer lines.",
    },
  ],
  methodsUsed: [
    {
      method: 'Phased Array Ultrasonic Testing (PAUT)',
      reason:
        'Replaces RT on heavy-wall pressure vessel welds and on circumferential pipe welds where ASME Sec V Article 4 Mandatory Appendix VII allows. Faster than RT, no radiation exclusion zone, and produces a permanent S-scan and C-scan record for archival.',
    },
    {
      method: 'Time-of-Flight Diffraction (TOFD)',
      reason:
        'Code-credited weld volumetric examination per ASME Sec V Article 4 Mandatory Appendix III. Outstanding for sizing planar flaws in heavy-wall reactor and exchanger welds — the workhorse for HIC/SOHIC mid-wall detection in sour service.',
    },
    {
      method: 'Pulsed Eddy Current (PEC)',
      reason:
        'CUI screening on insulated carbon steel piping and vessels without removing insulation. Acceptable per API RP 583 §6.4 as a screening method, with confirmatory UT after insulation removal at PEC indications above threshold.[9]',
    },
    {
      method: 'Internal Rotary Inspection System (IRIS) and ECT/RFT',
      reason:
        'Heat exchanger tube bundle inspection on shell-and-tube equipment. IRIS gives quantitative wall thickness on ferrous and non-ferrous tubes; ECT for non-ferromagnetic, RFT for ferromagnetic. ASME Sec V Article 8 governs the technique.',
    },
    {
      method: 'Industrial Radiography (RT) — gamma (Ir-192, Se-75) and X-ray',
      reason:
        'Still the default for small-bore piping welds and where geometry defeats UT. Ir-192 covers 12-75 mm carbon steel range. Se-75 fills the 5-30 mm gap with less shielding mass. Procedure per ASME Sec V Article 2 and acceptance per ASME B31.3 §341.3.2.',
    },
    {
      method: 'Wet Fluorescent Magnetic Particle (WFMT)',
      reason:
        'Surface and near-surface crack detection on ferromagnetic vessel internals after blast cleaning during turnaround. Standard call-out for sour service amine and crude tower bottoms internals. ASME Sec V Article 7 governs technique.',
    },
  ],
  regulatoryFramework: [
    {
      id: 'api-510-11',
      source: 'API 510, Pressure Vessel Inspection Code: In-Service Inspection, Rating, Repair, and Alteration, 11th ed., 2022',
    },
    {
      id: 'api-570-5',
      source: 'API 570, Piping Inspection Code: In-Service Inspection, Rating, Repair, and Alteration of Piping Systems, 5th ed., 2023',
    },
    {
      id: 'api-653-6',
      source: 'API 653, Tank Inspection, Repair, Alteration, and Reconstruction, 6th ed., 2024',
    },
    {
      id: 'api-580-3',
      source: 'API RP 580, Risk-Based Inspection, 3rd ed., 2016',
    },
    {
      id: 'phmsa-195-452',
      source: '49 CFR 195.452, Pipeline integrity management in high consequence areas',
      url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-D/part-195/subpart-F/section-195.452',
    },
    {
      id: 'bsee-30-250',
      source: '30 CFR 250 Subpart H, Oil and Gas Production Safety Systems (BSEE)',
    },
    {
      id: 'osha-1910-119',
      source: '29 CFR 1910.119, Process Safety Management of Highly Hazardous Chemicals (OSHA)',
      url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119',
    },
  ],
  caseScenarios: [
    {
      title: 'Refinery hydrotreater reactor — HTHA suspect circuit',
      body: "A Gulf Coast refinery operating a C-0.5Mo hydrotreater above the revised Nelson curve flagged the recycle gas circuit for HTHA reassessment under API RP 941. The inspection package combined AUBT screening across 100% of welds, TFM phased array on every weld returning elevated backscatter, and replication metallography on flagged areas. Three nozzle welds showed early-stage decarburization without methane fissuring; one shell long-seam returned mid-wall fissures sized at 4 mm depth. The operator de-rated the circuit, requalified materials to 1.25Cr-0.5Mo for the next turnaround, and avoided a forced shutdown. Inspection cost was ~$340,000 against a worst-case forced-outage exposure of $40 million.",
    },
    {
      title: 'Sour gas transmission pipeline — ILI dig verification',
      body: "A 30-inch sour gas transmission line under 49 CFR 192 returned MFL anomalies on a high-consequence area segment near a population center. PHMSA timing rules required field verification within 180 days for anomalies above 50% wall loss. The vendor crew mobilized PAUT corrosion mapping and WFMT on three dig sites. Two of three indications were validated within 10% of ILI-reported depth; one was a benign mill anomaly. The validated metal-loss feature was repaired with a Type B composite sleeve to ASME PCC-2. The dig program closed compliance within the regulatory window and produced field-validation data feeding the operator's ILI tool-tolerance model for the next assessment cycle.",
    },
    {
      title: 'Offshore production riser — fatigue weld inspection',
      body: "A BSEE-regulated production platform in the Gulf of Mexico required 5-year reassessment of riser girth welds per the operator's Stage 1 SMS plan under 30 CFR 250 Subpart S. Diver-deployed PAUT with encoded wedges captured weld volumes on 24 risers over a 9-day vessel window. Two welds showed propagating fatigue cracks at the toe of the internal weld pass, sized at 8 mm and 11 mm through-wall fraction. Engineering critical assessment under BS 7910 cleared one for continued service with quarterly monitoring; the other was sleeve-repaired with an external clamp. Total NDT cost was $1.1 million; replacement of a single riser joint would have exceeded $6 million plus deferred production.",
    },
  ],
  costDrivers: [
    'Turnaround compression — premium rates for crews working back-to-back 12-hour shifts during a 14-day shutdown window',
    'Radiation exclusion zones forcing night shooting on operating units, which can double labor hours per weld',
    'Heavy-wall PAUT requiring custom wedges and scan plans (cost adds $5,000-$15,000 per asset for procedure qualification)',
    'Sour service certification and H2S monitor requirements adding rig-out time and PPE rental',
    'Offshore mobilization (vessel day rates $50,000-$250,000) compressing the per-weld cost calculus toward higher-productivity methods',
    'CML count growth from RBI — refineries with mature RBI programs run 30,000-80,000 CMLs across the site, driving annual UT thickness spend',
  ],
  vendorSelection:
    "For US oil and gas work, the non-negotiables are ASNT-written practice compliant with SNT-TC-1A or CP-189, API 510/570/653 certified inspectors on the engineering oversight side, and demonstrable procedure qualification packages (PQR/WPS-equivalent) for any encoded UT, PAUT, or TOFD work the customer intends to credit against ASME Sec V code requirements. For turnaround-scale work, ask for crew availability windows, radiation safety officer (RSO) on staff for RT, and a list of refineries where the vendor has demonstrated turnaround performance over the last 24 months. Reject vendors who cannot produce procedure qualification records for the specific scope you are buying. The marketplace on NDT Connect filters by these criteria — for a refinery scope, you can pre-qualify shortlists in hours instead of weeks of RFP cycling.",
  faqs: [
    {
      q: 'What NDT methods does API 510 require for in-service pressure vessels?',
      a: "API 510, 11th ed. (2022), §6.4 sets the minimum requirements: an external visual inspection at intervals not exceeding 5 years (or quarter-life, whichever is shorter), an internal inspection on a quarter-life interval up to a 10-year cap unless RBI per API RP 580 supports an extension, and on-stream UT thickness monitoring at CMLs. The code does not mandate a specific volumetric NDT method but defers to the inspection plan; PAUT, TOFD, RT, and grid UT are all accepted when the inspection engineer qualifies the technique for the damage mechanism. For HTHA-suspect circuits, API RP 941 effectively requires advanced UT techniques (AUBT, TFM, or equivalent) beyond standard thickness surveys.[1][8]",
    },
    {
      q: 'How does PHMSA define a high-consequence area, and what does that mean for NDT scope?',
      a: "Under 49 CFR 195.450 for hazardous liquid and 49 CFR 192.903 for gas pipelines, a high-consequence area (HCA) includes populated areas, drinking water sources, navigable waters, and other unusually sensitive areas. For HCAs, operators must conduct baseline assessments and reassess on intervals not exceeding 5 years using ILI, hydrostatic test, or direct assessment (External Corrosion DA, Internal Corrosion DA, or Stress Corrosion Cracking DA), each backed by NDT field verification of in-line inspection findings. Field NDT typically includes UT wall mapping, PAUT, WFMT, and recoat surveys, all under operator procedures that meet 49 CFR 195.452(h) integrity management requirements.[4]",
    },
    {
      q: 'When should I specify PAUT instead of RT on refinery piping welds?',
      a: "Specify PAUT when the wall thickness exceeds about 25 mm (where RT exposure times become prohibitive on Ir-192), when the work is in a populated area or on an operating unit (radiation exclusion zones cripple productivity), when the geometry rules out a clean radiograph (tee joints, nozzles, branch connections), or when you need to size a planar flaw rather than just detect it. ASME Sec V Article 4 Mandatory Appendix VII allows PAUT in lieu of RT when the procedure is qualified to a demonstration block matching the production weld. For sour service, PAUT plus TOFD beats RT for HIC and SOHIC sensitivity since RT is poor at detecting tight planar flaws perpendicular to the beam.[12]",
    },
    {
      q: 'What is the typical cost of a refinery turnaround NDT scope?',
      a: "A medium US refinery turnaround (180,000-250,000 bpd processing capacity) on a major unit such as a hydrotreater or FCC runs $3-12 million in NDT scope over a 14-21 day window, depending on RBI maturity, CML count, and the depth of advanced techniques deployed. Drivers include per-CML UT thickness ($35-70 fully loaded), per-weld PAUT ($400-1200 for routine welds, $2000-5000 for heavy-wall reactor welds), tank floor MFL ($0.50-2.00 per square foot of floor), and engineering oversight at API 510/570 inspector rates ($1,800-2,800 per day). Compressing the schedule by adding shifts adds 30-50% to baseline cost. Mature RBI programs reduce CML count and re-allocate spend toward higher-value advanced inspections.",
    },
    {
      q: 'What is the difference between API RP 580 and API RP 581 for risk-based inspection?',
      a: "API RP 580 is the umbrella practice — it defines what an RBI program must contain (risk assessment, damage mechanism identification, inspection planning, management of change, documentation) and is recognized by API 510/570/653 as the basis for extending inspection intervals.[5] API RP 581 is the quantitative methodology — it provides the equations, damage factor tables, probability of failure calculations, and consequence area models that produce a numeric risk ranking.[6] In practice, an asset owner adopts an RBI software platform that implements API 581 (or an equivalent qualitative methodology) under a governance framework that meets API 580. Auditors will check both — the math has to pencil and the governance has to be documented.",
    },
  ],
  internalLinks: [
    {
      href: '/ndt-methods/phased-array-ultrasonic-testing',
      label: 'Phased Array Ultrasonic Testing (PAUT)',
      context: 'PAUT is the workhorse for heavy-wall pressure vessel and pipeline weld inspection in oil and gas.',
    },
    {
      href: '/ndt-methods/time-of-flight-diffraction',
      label: 'Time-of-Flight Diffraction (TOFD)',
      context: 'TOFD pairs with PAUT for code-credited volumetric examination on sour service welds.',
    },
    {
      href: '/standards/api-510',
      label: 'API 510 Pressure Vessel Inspection Code',
      context: 'API 510 governs in-service inspection of pressure vessels — the spine of downstream turnaround scopes.',
    },
    {
      href: '/standards/api-570',
      label: 'API 570 Piping Inspection Code',
      context: 'API 570 sets CML and circuit inspection intervals for in-service refinery piping.',
    },
    {
      href: '/standards/api-653',
      label: 'API 653 Tank Inspection Code',
      context: 'API 653 covers atmospheric storage tank in-service inspection, repair, and reconstruction.',
    },
    {
      href: '/industries/pipeline-transmission',
      label: 'Pipeline and Transmission NDT',
      context: 'Midstream pipeline inspection under PHMSA jurisdiction overlaps heavily with downstream refining NDT scopes.',
    },
    {
      href: '/industries/lng',
      label: 'LNG Plant and Marine Terminal NDT',
      context: 'LNG liquefaction trains share much of the cryogenic and heavy-wall inspection scope with gas processing.',
    },
    {
      href: '/free-tools/ndt-cost-calculator',
      label: 'NDT Cost Calculator',
      context: 'Estimate a turnaround NDT scope budget in minutes using the cost calculator.',
    },
    {
      href: '/free-tools/calibration-reminder',
      label: 'Calibration Reminder Tool',
      context: 'Track equipment calibration intervals to stay compliant with ASME Sec V and API procedures.',
    },
  ],
  citations: [
    {
      id: 'api-510',
      source: 'API 510, Pressure Vessel Inspection Code: In-Service Inspection, Rating, Repair, and Alteration, 11th ed., June 2022',
    },
    {
      id: 'api-570',
      source: 'API 570, Piping Inspection Code, 5th ed., February 2023',
    },
    {
      id: 'eia-refineries',
      source: 'U.S. Energy Information Administration, Refinery Capacity Report, 2024',
      url: 'https://www.eia.gov/petroleum/refinerycapacity/',
    },
    {
      id: 'phmsa-195-452',
      source: '49 CFR 195.452, Pipeline integrity management in high consequence areas',
      url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-D/part-195',
    },
    {
      id: 'api-580',
      source: 'API RP 580, Risk-Based Inspection, 3rd ed., February 2016',
    },
    {
      id: 'api-581',
      source: 'API RP 581, Risk-Based Inspection Methodology, 3rd ed., April 2016 (with addenda)',
    },
    {
      id: 'bsee-250',
      source: '30 CFR 250 Subpart H, Oil and Gas Production Safety Systems',
    },
    {
      id: 'api-941',
      source: 'API RP 941, Steels for Hydrogen Service at Elevated Temperatures and Pressures in Petroleum Refineries and Petrochemical Plants, 8th ed., 2016',
    },
    {
      id: 'api-583',
      source: 'API RP 583, Corrosion Under Insulation and Fireproofing, 2nd ed., 2021',
    },
    {
      id: 'nace-mr0175',
      source: 'NACE MR0175 / ISO 15156, Petroleum and natural gas industries — Materials for use in H2S-containing environments in oil and gas production, 2015',
    },
    {
      id: 'api-945',
      source: 'API RP 945, Avoiding Environmental Cracking in Amine Units, 4th ed., 2018',
    },
    {
      id: 'asme-v-iv',
      source: 'ASME BPVC Section V, Article 4, Mandatory Appendix VII — Ultrasonic Examination Requirements for a Phased Array Linear Scanning Examination, 2023 ed.',
    },
  ],
};

export default industry;
