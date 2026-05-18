import type { MethodContent } from '../types';

const method: MethodContent = {
  slug: 'penetrant-testing',
  abbreviation: 'PT',
  name: 'Penetrant Testing',
  metaTitle: 'Penetrant Testing (PT): Solvent Removable, Fluorescent & Acceptance',
  metaDescription:
    'Field-tested guide to liquid penetrant inspection — Type I vs Type II, ASME V Article 6, dwell times, ASTM E165, and real cost ranges on stainless and aluminum.',
  heroLede:
    'A 4-inch 316L stainless tie-in weld on a hydrogen plant manifold has to ship clean for a Class A weld stamp. MT is not an option — austenitic stainless is non-ferromagnetic. UT shear-wave struggles with the coarse grain. PT is the answer: solvent cleaner, red visible dye penetrant, 10-minute dwell, solvent remover on a lint-free wipe, non-aqueous wet developer in a thin film, 7-minute developer dwell, and the indication map for the inspector — every surface-breaking defect down to about 0.0001" wide pulled out by capillary action. PT is the second-most-used surface NDT method after MT, and the only practical surface method on the materials MT cannot touch.',
  physicsPrimer:
    'Liquid penetrant testing uses capillary action to draw a low-surface-tension liquid into surface-breaking discontinuities. After dwell, excess surface penetrant is removed and a developer pulls the penetrant trapped in the discontinuity back out onto the surface as a visible or fluorescent indication. ASME BPVC Section V Article 6 sets procedure rules [1]; ASTM E165 covers visible PT [2]; ASTM E1417 covers fluorescent PT for aerospace [3]; ASTM E1209 / E1219 / E1220 specify the four PT method classes by sensitivity and removal method [4]. The penetrant chemistry is engineered for low surface tension and high wettability — a typical Type II Method C solvent-removable visible penetrant has surface tension around 25-35 mN/m, which is roughly half that of water. The developer is a fine inert powder (Type a dry, Type b water-soluble, Type c water-suspendable, Type d non-aqueous wet, Type e specific application).',
  detectableDefects: [
    'Surface-breaking cracks (fatigue, stress-corrosion, grinding, quench)',
    'Surface porosity (single, cluster, linear) in welds and castings',
    'Cold shuts in castings',
    'Laps and seams in rolled or forged stock',
    'Leak paths in welded thin-wall pressure boundaries',
    'Inter-granular cracking in sensitized stainless',
    'Tight fatigue cracks in turbine blades and rotors',
  ],
  materialsAndForms: [
    'Austenitic stainless steel (304, 316, 321) welds and castings',
    'Aluminum and aluminum alloy aerospace structures',
    'Titanium and titanium alloys (Ti-6Al-4V) in aerospace',
    'Nickel-base superalloys (Inconel, Hastelloy) in turbines',
    'Copper, brass, and bronze castings',
    'Non-porous ceramics and certain plastics',
  ],
  whenToChoose:
    'Choose PT when the material is non-ferromagnetic (austenitic stainless, aluminum, titanium, nickel alloy), when MT is procedurally banned (instrumentation skids, aerospace assemblies), when the surface is too complex for yoke placement, or when the defect must be surface-breaking and you need confirmation it actually opens to the surface (e.g., before pressure-test sign-off). PT also serves on ferromagnetic material where wet fluorescent MT is impractical — small parts, intricate geometry.',
  whenNotToChoose:
    'PT cannot find any defect that does not break the surface. Subsurface and volumetric flaws are invisible to it. Porous materials (unfired ceramics, unsealed castings) bleed penetrant indiscriminately and produce unusable backgrounds. Surfaces with paint, oxide scale, or oil contamination block penetrant entry — the surface prep is more critical than for any other method. PT chemicals are flammable, generate hazardous waste under RCRA, and demand cradle-to-grave disposal documentation that adds $5-15 per inspection in compliance overhead. Temperature limits matter: standard penetrants work between 40°F and 125°F; outside that range a procedure-qualified high- or low-temperature material is required under ASME V T-655 [1].',
  procedure: [
    {
      heading: 'Procedure qualification and pre-cleaning',
      level: 2,
      paragraphs: [
        'A written procedure references ASME V Article 6 [1] or the aerospace counterpart (ASTM E1417 [3], NAS 410, or AMS 2647). The procedure specifies the penetrant family (manufacturer + product number, e.g., Magnaflux Spotcheck SKL-SP2 Type II Method C), the cleaner, the remover, the developer, the dwell times (penetrant and developer), and the acceptance reference. The Level III who wrote the procedure must be qualified under SNT-TC-1A or CP-189 [5].',
        'Pre-cleaning is the most common cause of false-clean PT results. ASTM E165 §7 [2] requires the surface to be free of oil, grease, water, oxide scale, paint, rust, and any other contaminant that could block penetrant entry into a discontinuity. Solvent wipe with Magnaflux SKC-S or equivalent non-halogenated cleaner is standard; vapor degreasing in trichloroethylene was the historical gold standard but is now banned on most jobs because of EPA regulations. For nickel and austenitic stainless, sulfur and halogen content in the cleaner must be controlled — ASME III NCA-5400 caps total halogen at 1% of dry residue for nuclear work.',
      ],
    },
    {
      heading: 'Penetrant application and dwell',
      level: 2,
      paragraphs: [
        'Penetrant goes on the prepared surface by spray, brush, dip, or aerosol. The entire inspection area must be wetted continuously throughout the dwell period — if penetrant dries on the surface it cannot enter newly-opened capillaries and the inspection is invalid. ASME V T-672 [1] sets minimum dwell times: 5 minutes for aluminum, magnesium, steel, brass, bronze, and titanium; 10 minutes for plastics; longer for high-temperature service penetrants. Manufacturer technical data sheets often specify longer dwells than the code minimum (e.g., 10-30 min for tight fatigue cracks).',
        'Temperature affects dwell. Below 40°F penetrant viscosity rises and capillary action slows; the procedure may require longer dwell or a low-temperature penetrant qualified to ASME V T-653 [1]. Above 125°F the penetrant evaporates before completing capillary entry. For high-temperature in-process inspection on hot welds, a special high-temp penetrant family qualified per ASME V T-655 must be used and the qualification documentation ships with the job.',
      ],
    },
    {
      heading: 'Excess penetrant removal',
      level: 2,
      paragraphs: [
        'The four PT methods are defined by removal technique. Method A water-washable, Method B post-emulsifiable lipophilic, Method C solvent-removable, Method D post-emulsifiable hydrophilic. Method C is the field standard — the technician wipes excess penetrant off with a clean dry lint-free cloth, then dampens a second cloth with solvent remover and wipes again. ASME V T-674 [1] explicitly prohibits spraying solvent remover directly on the part because it flushes penetrant out of the discontinuity along with the surface excess.',
        'Method A water-wash is faster on large or complex parts but risks over-washing — water pressure above about 40 psi and water temperature above 110°F flushes penetrant from discontinuities and produces a false-clean result. ASME V T-674.1 caps water pressure at 50 psi and temperature at 110°F. Method B and D post-emulsifiable systems give higher sensitivity for tight defects and are dominant in aerospace turbine-blade inspection.',
      ],
    },
    {
      heading: 'Developer application and developer dwell',
      level: 2,
      paragraphs: [
        'Developer is applied within 5-10 minutes of removal completion. ASME V T-677 [1] sets developer dwell at a minimum of 10 minutes for most penetrants — manufacturer data may specify shorter (7 min) or longer (60 min) depending on the penetrant-developer pair. Non-aqueous wet developer (Magnaflux SKD-S2) gives the highest sensitivity and the cleanest background; dry developer is faster on large parts but harder to read because indications stay subtle.',
        'Developer film thickness matters. Too thin and the bleed-out is invisible; too thick and the developer masks the indication. The technician sprays from 6-12 inches in a thin even coat. Over-application is more common than under-application. The film should look like a light dusting — through the developer you should still see surface features faintly.',
      ],
    },
    {
      heading: 'Inspection and indication interpretation',
      level: 2,
      paragraphs: [
        'For visible PT, ≥100 footcandles white light at the inspection surface is required by ASME V T-676 [1]. For fluorescent PT, ≥1000 µW/cm² UV-A and <2 footcandles ambient white light per ASTM E1417 §11 [3]. The technician scans every accessible inspection area at the end of developer dwell, marks every indication, and characterizes it: linear (length >3× width), rounded (length ≤3× width), or porosity cluster. Indications are confirmed by re-cleaning and re-running PT — a real indication recurs in the same location.',
        'Bleed-out from a real defect grows over the developer dwell as more penetrant is drawn out of the cavity. A static indication that does not grow is likely false (residual penetrant trapped in surface roughness rather than a real cavity). Watching the indication grow during inspection is one of the strongest discriminators between real defects and false positives.',
      ],
    },
    {
      heading: 'Post-cleaning and reporting',
      level: 2,
      paragraphs: [
        'Post-cleaning removes all penetrant, remover, and developer residue from the part. Residual fluorescent penetrant in a welded assembly causes problems at service temperature — sulfur and chloride from cleaner residue can drive stress-corrosion cracking in austenitic stainless. ASME III NCA-5400 mandates post-cleaning verification on nuclear work via wipe sampling for total halogens.',
        'The PT report lists procedure, penetrant family and lot number, cleaner and developer products, dwell times, lighting, ambient temperature, all indications with location and disposition, and post-cleaning confirmation. ASME V §T-690 [1] gives the required fields. Hazardous-waste manifest from the spent penetrant disposal attaches to the job file.',
      ],
    },
  ],
  equipment: [
    {
      heading: 'Penetrant chemistries and brands',
      level: 2,
      paragraphs: [
        'Magnaflux Spotcheck (SKL-SP1, SKL-SP2 visible; ZL-67 fluorescent) and Met-L-Check VP-30 dominate the US field market for solvent-removable Type II Method C. For aerospace turbine-blade work, Magnaflux ZL-2C and Sherwin DP-55 Type I Method D fluorescent post-emulsifiable systems give the highest sensitivity available — required for AMS 2647 Class 4 work.',
        'Type I fluorescent penetrants are visible only under UV-A in a darkened booth. Type II visible (typically dark red) penetrants are visible under any white light. Type I gives 5-10× better sensitivity for tight defects but requires the darkened booth and UV equipment; Type II is the field standard for general weld and casting work.',
      ],
    },
    {
      heading: 'Cleaners, removers, developers',
      level: 2,
      paragraphs: [
        'Cleaner/remover/developer must be a matched set from one manufacturer\'s qualified penetrant family — ASME V T-642 [1] explicitly prohibits mixing brands within a single inspection. Each lot of penetrant material gets a certificate of conformance with sulfur and halogen content for nickel and austenitic-stainless service per ASME III and ASTM D1193 limits.',
        'Aerosol cans dominate field work; bulk drums supply shop dip tanks. The aerosol propellant is the limiting shelf-life factor — cans older than about 24 months lose propellant pressure and spray pattern becomes erratic. Lot tracking against expiry is mandatory under nuclear and aerospace QA programs.',
      ],
    },
    {
      heading: 'UV lighting and verification',
      level: 2,
      paragraphs: [
        'For fluorescent PT, a UV-A lamp (Magnaflux ZB-100F LED, Spectroline TRiTAN-365) delivers ≥1000 µW/cm² at the working distance. Lamp output is verified at the start of every shift with a Spectroline DSE-100X UV radiometer and a white-light meter. UV-A safety glasses (with the lamp\'s matched UV-blocking filter) are mandatory.',
        'For visible PT, a white-light meter (Spectroline DM-365XL) verifies ≥100 footcandles at the inspection surface. Inadequate lighting is the most common cause of missed indications in field visible PT — particularly on overhead or tight-access welds where the inspector cannot get good light to the part.',
      ],
    },
  ],
  codesAndStandards: [
    { id: 'asme-v-art-6', source: 'ASME BPVC Section V (2023), Article 6 — Liquid Penetrant Examination' },
    { id: 'astm-e165', source: 'ASTM E165/E165M-23 — Standard Practice for Liquid Penetrant Testing for General Industry' },
    { id: 'astm-e1417', source: 'ASTM E1417/E1417M-21 — Standard Practice for Liquid Penetrant Testing (Aerospace)' },
    { id: 'astm-e1209', source: 'ASTM E1209-22 — Standard Practice for Fluorescent Liquid Penetrant Testing Using the Water-Washable Process' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Qualification and Certification of NDT Personnel' },
    { id: 'asme-b31-3', source: 'ASME B31.3 (2022), §344.4 and Table 341.3.2 — Liquid Penetrant Examination' },
    { id: 'aws-d1-1', source: 'AWS D1.1/D1.1M:2020 — Structural Welding Code Steel, §6.15' },
    { id: 'iso-3452', source: 'ISO 3452-1:2021 — Non-destructive testing — Penetrant testing — General principles' },
    { id: 'ams-2647', source: 'SAE AMS 2647F — Fluorescent Penetrant Inspection Aircraft and Engine Component Maintenance' },
  ],
  acceptanceCriteria:
    'For new-construction ASME B31.3 normal-fluid-service welds, PT acceptance per Table 341.3.2 [6] rejects all cracks, all linear indications longer than 3/16" for material thicker than 3/4", all rounded indications larger than 3/16", and any group of indications exceeding the cumulative table limits. AWS D1.1 §6.15 [7] applies the same crack-reject rule for structural steel work. For aerospace work under AMS 2647 [9], acceptance follows the engineering drawing call-out by class — Class 4 fluorescent post-emulsifiable for fatigue-critical rotating parts has the tightest indication limits. Any indication initially classified as questionable goes through a re-inspection — re-clean, re-PT, and confirm. Indications that fail to reappear after re-inspection are typically classified non-relevant (loose particles, contamination from prior process); indications that recur in the same location and orientation are real defects.',
  comparisonAgainst: [
    { method: 'Magnetic Particle Testing (MT)', tradeoff: 'MT is faster (5 min vs 30+ min cycle), works through light surface contamination, and detects shallow subsurface defects PT cannot — but only on ferromagnetic material.' },
    { method: 'Eddy Current Testing (ET)', tradeoff: 'ET inspects through coatings and finds subsurface defects in thin sections, but requires conductivity-specific calibration and trained operators where PT works on any non-porous material.' },
    { method: 'Visual Testing (VT)', tradeoff: 'VT runs in seconds with no consumables and finds gross defects PT would catch — but misses tight cracks PT pulls out via capillary action.' },
    { method: 'Phased Array UT', tradeoff: 'PAUT finds subsurface defects and through-wall sizing PT cannot, but cannot replace PT for confirming a defect is surface-breaking before hydrostatic test.' },
  ],
  costRange: {
    unit: 'USD per linear foot of weld inspected (Gulf Coast shop, 2025)',
    low: 3,
    high: 9,
    mid: 5,
  },
  faqs: [
    {
      q: 'What is the minimum penetrant dwell time?',
      a: 'ASME V T-672 [1] sets minimum dwells at 5 minutes for aluminum, magnesium, steel, brass, bronze, and titanium for all forms (castings, welds, wrought) for most surface-cracking defect types. Plastics require 10 minutes. Tight fatigue cracks and stress-corrosion cracks often need 20-30 minutes per the penetrant manufacturer\'s data sheet. The procedure-specified dwell is mandatory — shortening it is the most common cause of missed indications on fatigue inspection. The technician should verify the penetrant stays wet on the surface throughout dwell; if it dries, re-apply and restart the dwell clock.',
    },
    {
      q: 'Why does sulfur and halogen content matter for stainless and nickel?',
      a: 'Austenitic stainless steel and nickel-base alloys are susceptible to stress-corrosion cracking when residual sulfur, chloride, or fluoride contamination is present at service temperature. ASME III NCA-5400 and ASME V T-624 [1] cap total halogens at 1% of dry residue and sulfur at 1% for materials in this category. The certificate of conformance for every penetrant lot, every cleaner, every remover, and every developer must state the analytical results. Using an uncertified general-industry penetrant on a nuclear or refinery hydrogen-service stainless weld can introduce the very chemistry that drives the failure mode the part is supposed to resist.',
    },
    {
      q: 'When is fluorescent PT better than visible PT?',
      a: 'Fluorescent PT under UV-A in a darkened booth gives 5-10× better contrast for tight, narrow defects than visible PT — fatigue cracks below about 0.0005" width often miss visible inspection but glow clearly under UV-A. Aerospace turbine-blade and rotor-disc inspection mandates fluorescent (ASTM E1417 [3], AMS 2647 [9]) for fatigue-critical rotating parts. For shop weld and casting work where the indications are broader (porosity, slag, cold shuts), visible PT in white light is faster and adequate. The trade-off is infrastructure — fluorescent requires the booth, the UV-A lamps, and the radiometer; visible needs only ambient light.',
    },
    {
      q: 'Can I use PT in cold weather field conditions?',
      a: 'Standard penetrants work from 40°F to 125°F per ASME V T-653 [1]. Below 40°F viscosity rises and capillary action slows; a low-temperature penetrant family qualified to T-653 is required, with extended dwell per the qualification documentation. In practice, most field crews running PT on a January day in the Bakken use a heated tent over the inspection area to keep the surface above 40°F. Trying to run standard PT on a 20°F surface gives unreliable results regardless of dwell extension — the penetrant simply will not enter tight defects, and the inspection cannot pass procedure qualification.',
    },
    {
      q: 'What hazardous waste does PT generate?',
      a: 'Spent penetrant, cleaner, remover, and developer are RCRA-listed hazardous waste in most cases. Solvent removers based on isohexane and other non-halogenated hydrocarbons fall under D001 ignitable waste. Cradle-to-grave manifesting through a licensed hazmat hauler is mandatory, and the manifest receipt goes into the job file. Some water-washable penetrants meet local POTW discharge limits but most clients require all PT waste to leave the site as drummed hazardous. Disposal costs add roughly $5-15 per inspection in compliance overhead and are why some shops have moved to MT or ET wherever the material allows it.',
    },
  ],
  internalLinks: [
    { href: '/methods/magnetic-particle-testing', label: 'Magnetic Particle Testing', context: 'MT is faster and cheaper than PT on ferromagnetic material where physics allows it.' },
    { href: '/methods/eddy-current-testing', label: 'Eddy Current Testing', context: 'ET inspects through coatings and finds subsurface defects PT cannot reach.' },
    { href: '/methods/visual-testing', label: 'Visual Testing', context: 'VT precedes PT on every weld and catches gross defects PT would also find.' },
    { href: '/industries/aerospace', label: 'Aerospace inspection', context: 'Fluorescent PT to AMS 2647 is the surface-defect standard on turbine engines.' },
    { href: '/industries/petrochemical', label: 'Petrochemical inspection', context: 'Stainless and nickel-alloy welds in hydrogen and ammonia service rely on PT for surface defects.' },
    { href: '/standards/asme-v', label: 'ASME BPVC Section V', context: 'Article 6 of Section V governs every PT procedure on ASME-stamped equipment.' },
    { href: '/standards/aws-d1-1', label: 'AWS D1.1', context: 'AWS D1.1 §6.15 lists PT acceptance for structural steel welds.' },
    { href: '/tools/pt-dwell-calculator', label: 'PT dwell calculator', context: 'Compute correct penetrant and developer dwell based on material and temperature.' },
    { href: '/compare/mt-vs-pt', label: 'MT vs PT', context: 'Decision matrix for choosing between magnetic particle and dye penetrant.' },
  ],
  citations: [
    { id: 'asme-v-art-6', source: 'ASME BPVC Section V (2023), Article 6 — Liquid Penetrant Examination' },
    { id: 'astm-e165', source: 'ASTM E165/E165M-23 — Liquid Penetrant Testing for General Industry' },
    { id: 'astm-e1417', source: 'ASTM E1417/E1417M-21 — Liquid Penetrant Testing (Aerospace)' },
    { id: 'astm-e1209', source: 'ASTM E1209-22 — Fluorescent Liquid Penetrant Testing — Water-Washable Process' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Qualification and Certification of NDT Personnel' },
    { id: 'asme-b31-3', source: 'ASME B31.3 (2022), §344.4 — Liquid Penetrant Examination' },
    { id: 'aws-d1-1', source: 'AWS D1.1/D1.1M:2020 — Structural Welding Code Steel, §6.15' },
    { id: 'iso-3452', source: 'ISO 3452-1:2021 — Penetrant testing — General principles' },
    { id: 'ams-2647', source: 'SAE AMS 2647F — Fluorescent Penetrant Inspection Aircraft and Engine Component Maintenance' },
  ],
};

export default method;
