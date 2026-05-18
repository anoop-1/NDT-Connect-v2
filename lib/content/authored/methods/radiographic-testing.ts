import type { MethodContent } from '../types';

const method: MethodContent = {
  slug: 'radiographic-testing',
  abbreviation: 'RT',
  name: 'Radiographic Testing',
  metaTitle: 'Radiographic Testing (RT): Ir-192, Se-75, Film & DR',
  metaDescription:
    'Field-tested guide to industrial radiography — source selection, exposure math, ASME V Article 2, ASTM E1742 film practice, and 2025 cost ranges per shot.',
  heroLede:
    'A nightshift crew on a Permian gas plant tie-in shoots 38 girth welds between sunset and sunrise — Ir-192 source, 50 Ci, SFD 14 inches × 40 inches of effective length, ASTM E747 wire IQI, Class II film. The B31.8 code stamp on the line depends on every one of those films passing a Level II film interpreter\'s read before sunrise. RT is the oldest volumetric NDT method still in heavy production use, and the workflow has barely changed since the 1960s — the chemistry just moved from film to digital plates. The radiation, the source handling, the geometry math, and the IQI sensitivity rules are all still grounded in the same ASME and ASTM documents the original technicians worked from.',
  physicsPrimer:
    'Radiography uses penetrating ionizing radiation — gamma photons from Ir-192 (380 keV avg.), Se-75 (215 keV avg.), Co-60 (1.25 MeV avg.), or X-ray bremsstrahlung from a tube — passed through the part to expose film, an imaging plate, or a digital detector array on the far side. Density differences in the image map to thickness and density differences in the part: a slag inclusion, a porosity void, a lack-of-fusion gap, or a crack absorbs less photons than the surrounding steel and shows up dark on the developed film. ASME BPVC Section V Article 2 sets the procedure rules, IQI placement, and density requirements [1]; ASTM E94 covers radiographic examination practice [2]; ASTM E1742 governs film handling [3]. The image quality indicator (IQI) — a wire set or hole set placed source-side of the part — proves the technique can resolve a specific small-feature size, expressed as 2-1T or 2-2T sensitivity per ASME V T-276 [1].',
  detectableDefects: [
    'Porosity (single, cluster, linear, hollow-bead)',
    'Slag inclusions in SMAW and FCAW welds',
    'Lack of fusion (sidewall and root)',
    'Incomplete penetration at the root of butt welds',
    'Tungsten inclusions in GTAW welds',
    'Cracks oriented within ±15° of the radiation beam direction',
    'Burn-through and concavity in pipe welds',
    'Undercut and excessive reinforcement at the cap',
  ],
  materialsAndForms: [
    'Carbon and low-alloy steel butt welds in piping and vessels (0.25" to 4" wall typical)',
    'Stainless steel and duplex welds where UT struggles with coarse grain',
    'Aluminum and titanium aerospace structural welds',
    'Cast components (valve bodies, pump casings) for porosity and shrinkage',
    'Composite-overwrapped pressure vessels (with appropriate energy)',
  ],
  whenToChoose:
    'Choose RT when the code mandates film or digital radiography (most ASME B31.3 normal-service welds permit either UT or RT, but client specifications still default to RT for the permanent image record), when you need to detect porosity and slag that UT amplitude criteria struggle with, and when weld geometry — small-bore branch connections, complex fittings — defeats shear-wave UT. RT also wins for legal/insurance-driven jobs where a film image survives 30 years in a file cabinet.',
  whenNotToChoose:
    'RT is wrong for in-service work on populated facilities where evacuating the radiation zone is impractical, for thick-wall vessels (>3" steel) where exposure times stretch past an hour per shot, for parts in service where the asset cannot be decoupled from process flow, and for any weld where the dominant defect is planar and parallel to the beam — RT misses tight lack-of-fusion that runs perpendicular to the film. Crews near radiation work face exposure limits under 10 CFR 20 [4]; on a manned platform or refinery turnaround, the lost-production cost of clearing 100 feet around every shot kills the schedule.',
  procedure: [
    {
      heading: 'Source and energy selection',
      level: 2,
      paragraphs: [
        'Source choice flows from material and thickness. ASME V Article 2 Mandatory Appendix VI [1] lists permitted energy ranges. For steel 0.25" to 2.5" wall, Ir-192 (380 keV gamma) is the workhorse — 50-100 Ci activity, half-life 74 days, sealed source in a Sentinel 880 or QSA Global 880 Delta camera. For thinner walls (0.1" to 1" steel), Se-75 (215 keV) gives finer contrast and a smaller exclusion zone but costs 3× more per Curie. For thick sections (>2.5" steel), switch to Co-60 (1.25 MeV) or a 300+ kV X-ray tube.',
        'Source activity must be within usable life — Ir-192 below about 20 Ci becomes uneconomic for routine work because exposure times balloon. Source-changer paperwork (the leak-test certificate, the manufacturer\'s decay sheet, the NRC or Agreement State license number) ships with every camera and gets photocopied into the job package.',
      ],
    },
    {
      heading: 'Geometry and SFD calculation',
      level: 2,
      paragraphs: [
        'Source-to-film distance (SFD) controls geometric unsharpness Ug = F × t / SFD, where F is source size and t is film-to-source-side-of-part distance. ASME V T-274.2 [1] caps Ug at 0.020" for materials under 2" and 0.030" for thicker. For a typical Ir-192 source (F = 0.080" effective), a 0.5" wall pipe weld with the film against the back wall requires SFD ≥ 14 inches to stay under Ug = 0.020". The technician runs this math at every setup — most modern RT software (Industrex, Carestream, Vidisco) bakes it into the exposure calculator.',
        'Single-wall single-image (SWSI) is standard for vessels and large-bore pipe. Double-wall single-image (DWSI) and double-wall double-image (DWDI) cover small-bore pipe per ASME B31.3 §344.5.2. DWDI elliptical shots on pipe <3.5" OD require a minimum of two exposures 90° apart; smaller pipe (<2.5") often needs three or four exposures to cover the weld circumference.',
      ],
    },
    {
      heading: 'IQI selection and placement',
      level: 2,
      paragraphs: [
        'IQI sensitivity is the proof of technique. ASME V T-276 [1] sets a 2-2T requirement for most pressure-equipment work — the technique must resolve the 2T hole on a 2T-thickness IQI placed source-side on the part. ASTM E747 wire IQIs are equally acceptable; the wire diameter that must be visible is given in ASME V Table T-276. For a 0.5" wall steel pipe shot from outside, ASTM E747 set B wire 4 (0.013" diameter) must be visible on the developed film.',
        'IQI placement is source-side except when the geometry makes that impossible — then film-side with the letter F prominent in the image, and the sensitivity requirement tightens by one thickness step. The IQI sits on a shim of base-metal-equivalent thickness when it cannot sit directly on the weld reinforcement.',
      ],
    },
    {
      heading: 'Exposure and density control',
      level: 2,
      paragraphs: [
        'Film density on processed radiographs must fall between 1.8 and 4.0 H&D under SE-1 viewing, per ASME V T-282 [1]. A densitometer reading at the IQI shim location verifies this on every film before release. Under-density (<1.8) loses small-defect contrast; over-density (>4.0) demands a viewer with higher brightness than most field shop boxes deliver. Exposure factor (curies × minutes) is calibrated against a step-wedge or against the manufacturer\'s exposure chart for the specific film type (Industrex AA400, MX125, M100).',
        'Digital radiography (DR) detectors and computed radiography (CR) imaging plates substitute pixel grayscale for film density. ASTM E2698 [5] sets DR equivalency rules — the technique must demonstrate the same IQI sensitivity as the equivalent film class and the same signal-to-noise ratio at the region of interest. DR exposure is shorter (often 1/3 to 1/10 of film) but capex is 5-10× higher per detector.',
      ],
    },
    {
      heading: 'Processing and film reading',
      level: 2,
      paragraphs: [
        'Film processing follows ASTM E999 [6] — automatic processors (Kodak Industrex M37, Agfa Structurix) running a developer-fixer-wash-dry cycle at controlled temperature and replenishment rate. Manual tank processing is permitted but rarely used today outside remote field locations. Every batch of processed film gets a processed-film image quality check using a step-wedge film and the lab\'s own density verification before any production films are released for reading.',
        'Reading is done in a darkened room with a high-intensity viewer (Industrex M-400, X-Tek HV-1000) and a densitometer. The Level II interpreter scans the entire image, marks every indication on a film-reading record, and assigns disposition per the governing code. ASME Section V does not set acceptance — the construction code does. ASME B31.3 §344.5.3 acceptance limits for normal fluid service are listed in Table 341.3.2 [7]; API 1104 §9 covers cross-country pipeline weld acceptance [8].',
      ],
    },
    {
      heading: 'Reporting and archive',
      level: 2,
      paragraphs: [
        'The report names the procedure, source isotope and activity at exposure time, SFD, exposure time, film/detector type, IQI sensitivity achieved, density at the region of interest, technician name and certification, and every reportable indication with location and disposition. Films are archived per the client\'s document control — typically 5 years minimum for ASME work, longer for API 1104 pipeline construction.',
        'Source utilization gets logged separately for NRC/Agreement State compliance — every Curie-minute of exposure, the radiographer\'s film badge dose, and the daily survey-meter readings outside the exclusion zone. 10 CFR 34 [9] mandates these records for industrial radiography and the licensee must retain them indefinitely for the source license.',
      ],
    },
  ],
  equipment: [
    {
      heading: 'Source projectors and X-ray tubes',
      level: 2,
      paragraphs: [
        'The Sentinel 880 Delta and QSA Global 880 Sigma dominate the Ir-192/Se-75 projector market in the US. Both use a depleted uranium shield, a tungsten S-tube, and a Selectorr crank-out drive. Service life is roughly 10 years before regulator-mandated full rebuild. Co-60 cameras (QSA 660A, Tech-Ops 660A) are heavier (>50 lb) and reserved for thick-section work.',
        'X-ray tube systems for portable field RT include the ICM SiteX C-1607 (160 kV, 7 mA) and the YXLON SMART 200 (200 kV). Crawlers for pipeline RT (RTI X-Stream, Jireh Bug-O) carry an X-ray tube inside the pipe to shoot single-wall radiographs of butt welds at production rates.',
      ],
    },
    {
      heading: 'Film, CR, and DR detectors',
      level: 2,
      paragraphs: [
        'Film classes are governed by ASTM E1815 [10] and ASME V T-260. Class I (Industrex M100, Structurix D2) is fine-grain ultra-high-definition. Class II (M125, D4) is general-purpose. Class III (AA400, D7) is faster but lower resolution — used for survey and screening. Lead intensifying screens (front 0.005", back 0.010") sandwich the film in the cassette.',
        'CR imaging plates (Carestream HPX-1, Fuji ST-VI) replace film with a photostimulable phosphor plate read in a scanner. DR flat-panel detectors (Vidisco FoxRayzor, GE DXR250) deliver digital images in seconds. Both must demonstrate ASME V Article 2 IQI sensitivity to be code-acceptable.',
      ],
    },
    {
      heading: 'Survey instruments and personnel monitoring',
      level: 2,
      paragraphs: [
        'Survey meters (Ludlum 9DP, Mirion DMC 3000) verify the radiation field at the boundary of the high-radiation area. 10 CFR 34.41 [9] requires a survey at the source position before storage at the end of every exposure to confirm the source returned to the shielded position — survey-meter failure here has caused multiple over-exposure incidents in US industrial radiography history.',
        'Personnel dosimeters — OSL film badge plus a direct-reading pocket dosimeter or electronic personal dosimeter — are mandatory under 10 CFR 20. Annual dose limit for radiation workers is 5 rem (50 mSv) whole body. Most radiographers run well under 1 rem/year with proper geometry and shielding discipline.',
      ],
    },
  ],
  codesAndStandards: [
    { id: 'asme-v-art-2', source: 'ASME BPVC Section V (2023), Article 2 — Radiographic Examination' },
    { id: 'astm-e94', source: 'ASTM E94/E94M-23 — Standard Guide for Radiographic Examination' },
    { id: 'astm-e1742', source: 'ASTM E1742/E1742M-23 — Standard Practice for Radiographic Examination' },
    { id: '10-cfr-20', source: '10 CFR Part 20 — Standards for Protection Against Radiation (NRC)' },
    { id: 'astm-e2698', source: 'ASTM E2698-23 — Standard Practice for Radiographic Examination Using Digital Detector Arrays' },
    { id: 'astm-e999', source: 'ASTM E999-21 — Standard Guide for Controlling the Quality of Industrial Radiographic Film Processing' },
    { id: 'asme-b31-3', source: 'ASME B31.3 (2022), §344.5 and Table 341.3.2 — Radiographic Examination of Welds' },
    { id: 'api-1104', source: 'API 1104, 22nd ed. (2021), §9 — Acceptance Standards for Nondestructive Testing' },
    { id: '10-cfr-34', source: '10 CFR Part 34 — Licenses for Industrial Radiography' },
    { id: 'astm-e1815', source: 'ASTM E1815-22 — Standard Test Method for Classification of Film Systems for Industrial Radiography' },
  ],
  acceptanceCriteria:
    'For new-construction ASME B31.3 normal fluid service welds, ASME B31.3 Table 341.3.2 [7] caps cumulative porosity at 1.5% of weld area for any 6-inch length, single porosity at no greater than the lesser of 1/4 t or 5/32", slag inclusions at no greater than t/3 long with a cumulative limit, and rejects all cracks, lack of fusion, and incomplete penetration regardless of dimension. For ASME VIII Division 1 vessels, ASME V Article 2 Mandatory Appendix VIII references UW-51 with similar limits. API 1104 §9 [8] applies to cross-country pipelines and is generally tighter than B31.3 for incomplete penetration but allows slightly more porosity. Severe-cyclic-service piping under B31.3 cuts every limit roughly in half. The film interpreter assigns repair/accept on a per-indication basis; any indication classified rejectable goes back to the welder for excavation and re-RT after the repair weld.',
  comparisonAgainst: [
    { method: 'Ultrasonic Testing (UT)', tradeoff: 'UT scans faster, gives immediate field results, has no radiation safety overhead, and detects planar defects that RT misses — but produces no permanent visual image and demands procedure-qualified operators trained on the specific weld geometry.' },
    { method: 'Phased Array UT (PAUT)', tradeoff: 'PAUT now substitutes for RT under ASME Code Case 2235 and several B31.3 amendments — same code acceptance, no radiation, but procedure qualification is heavier and capex per crew is 4× higher than an Ir-192 projector.' },
    { method: 'Computed Radiography (CR)', tradeoff: 'CR replaces film with reusable imaging plates — same IQI sensitivity, faster turnaround, digital archive — but the plate scanner and software add $40-80k of capex per crew.' },
    { method: 'Digital Radiography (DR)', tradeoff: 'DR detectors give images in seconds and 1/3 the exposure time, ideal for production-line shot rates, but the flat panel detector replacements cost $25-60k and degrade with high-energy dose.' },
  ],
  costRange: {
    unit: 'USD per exposure (single weld shot, Gulf Coast crew, 2025)',
    low: 75,
    high: 280,
    mid: 140,
  },
  faqs: [
    {
      q: 'When does the NRC require evacuation of an exclusion zone?',
      a: '10 CFR 34.41 [9] requires the radiographer to maintain a high-radiation area boundary at the 100 mR/hr line and a restricted area at 2 mR/hr. In practice, an Ir-192 100 Ci shot has a 100 mR/hr boundary at roughly 25-30 feet and a 2 mR/hr boundary at 80-100 feet depending on geometry and shielding. A continuous survey meter reading at the boundary and physical barricades with radiation-zone signage are mandatory before exposure. Any unauthorized entry triggers a reportable event.',
    },
    {
      q: 'Can DR fully replace film on an ASME B31.3 job?',
      a: 'Yes, with the right procedure. ASME V Article 2 Mandatory Appendix VIII and ASTM E2698 [5] provide DR procedure rules. The technique must demonstrate the same IQI sensitivity as the equivalent film class and meet the contrast-to-noise-ratio and signal-to-noise-ratio thresholds in Appendix VIII. Most operators that have transitioned have requalified their procedures and built a parallel digital-archive system, but the code does not force film. The client spec on a given job is the deciding document — many EPCs still write film-only requirements out of habit.',
    },
    {
      q: 'How long does Ir-192 last and when do I replace the source?',
      a: 'Ir-192 has a 74-day half-life. A 100 Ci fresh source decays to roughly 50 Ci in 74 days, 25 Ci in 148 days, and 12.5 Ci in 222 days. Most operators replace sources at the 6-month mark (roughly 20-25 Ci) because exposure times below that activity stretch beyond 3 minutes per inch of steel and crew productivity collapses. Source change-outs are scheduled with the source supplier (QSA Global, Eckert & Ziegler) with at least 4 weeks lead time, and the leak-test certificate on the new source goes into the project file.',
    },
    {
      q: 'What IQI sensitivity does ASME require for general pressure equipment work?',
      a: 'ASME V T-276 [1] sets a 2-2T baseline for most work — the technique must resolve the 2T hole on a 2T-thickness IQI when the IQI is placed source-side. For thick sections (>2.5" steel) the requirement drops to 2-4T because resolution physics gets harder. ASTM E747 wire IQI equivalents are listed in ASME V Table T-276. Film-side placement, when source-side is geometrically impossible, demands one thickness step better — e.g., 2-1T — to compensate for the geometric advantage of the closer IQI.',
    },
    {
      q: 'Does API 1104 use the same acceptance criteria as ASME B31.3?',
      a: 'No. API 1104 §9 [8] governs cross-country oil and gas pipelines and uses its own table of acceptance limits — generally tighter than B31.3 on incomplete penetration (limits to 1" cumulative in 12" of weld, vs. B31.3 which is stricter still on planar defects but allows slightly more cumulative porosity). API 1104 also explicitly addresses elliptical DWDI radiography of small-bore pipe and gives the geometric rules for two-exposure 90° offset shots. Operators on a Permian or Bakken cross-country line follow 1104; operators on a refinery process line follow B31.3 — same physics, different code book.',
    },
  ],
  internalLinks: [
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic Testing', context: 'UT replaces RT on most ASME B31.3 jobs where film record is not contractually required.' },
    { href: '/methods/computed-radiography', label: 'Computed Radiography', context: 'CR uses reusable imaging plates to deliver the same image quality without wet film.' },
    { href: '/methods/digital-radiography', label: 'Digital Radiography', context: 'DR flat panel detectors give a live image in seconds at 1/3 the exposure of film.' },
    { href: '/methods/phased-array-ut', label: 'Phased Array UT', context: 'PAUT now substitutes for RT under ASME Code Case 2235 on many vessel and piping welds.' },
    { href: '/industries/oil-and-gas', label: 'Oil & Gas inspection', context: 'Pipeline RT is the legal-record method of choice for ASME B31.4 and B31.8 construction.' },
    { href: '/industries/petrochemical', label: 'Petrochemical inspection', context: 'Turnaround RT crews shoot hundreds of welds per shift on refinery tie-in work.' },
    { href: '/standards/asme-v', label: 'ASME BPVC Section V', context: 'Article 2 of Section V governs every RT procedure on ASME-stamped equipment.' },
    { href: '/standards/api-1104', label: 'API 1104', context: 'API 1104 §9 acceptance applies to all cross-country pipeline RT.' },
    { href: '/tools/rt-exposure-calculator', label: 'RT exposure calculator', context: 'Compute SFD, Ug, and exposure time from material, thickness, and source activity.' },
    { href: '/compare/ut-vs-rt', label: 'UT vs RT', context: 'Decision matrix for choosing between radiography and ultrasonics.' },
  ],
  citations: [
    { id: 'asme-v-art-2', source: 'ASME BPVC Section V (2023), Article 2 — Radiographic Examination' },
    { id: 'astm-e94', source: 'ASTM E94/E94M-23 — Standard Guide for Radiographic Examination' },
    { id: 'astm-e1742', source: 'ASTM E1742/E1742M-23 — Standard Practice for Radiographic Examination' },
    { id: '10-cfr-20', source: '10 CFR Part 20 — Standards for Protection Against Radiation (NRC)' },
    { id: 'astm-e2698', source: 'ASTM E2698-23 — Standard Practice for Radiographic Examination Using Digital Detector Arrays' },
    { id: 'astm-e999', source: 'ASTM E999-21 — Standard Guide for Controlling the Quality of Industrial Radiographic Film Processing' },
    { id: 'asme-b31-3', source: 'ASME B31.3 (2022), §344.5 and Table 341.3.2 — Radiographic Examination of Welds' },
    { id: 'api-1104', source: 'API 1104, 22nd ed. (2021), §9 — Acceptance Standards for Nondestructive Testing' },
    { id: '10-cfr-34', source: '10 CFR Part 34 — Licenses for Industrial Radiography' },
    { id: 'astm-e1815', source: 'ASTM E1815-22 — Classification of Film Systems for Industrial Radiography' },
  ],
};

export default method;
