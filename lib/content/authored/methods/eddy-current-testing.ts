import type { MethodContent } from '../types';

const method: MethodContent = {
  slug: 'eddy-current-testing',
  abbreviation: 'ET',
  name: 'Eddy Current Testing',
  metaTitle: 'Eddy Current Testing (ET): Tube Inspection, Coatings & Cracks',
  metaDescription:
    'Inspector guide to eddy current testing — bobbin, array, surface, and pencil probes, ASME V Article 8, heat exchanger and coating measurement applications.',
  heroLede:
    'A 1,200-tube shell-and-tube heat exchanger at a Corpus Christi refinery shuts down at turnaround. The bundle has to be back online in five days. A bobbin-probe eddy current crew pulls 800 tubes per shift at 30 inches per second, mapping wall loss, pitting, and inter-granular attack on every tube — data straight into ASME V Article 8 [1] format for the inspection engineer to plug. Eddy current is the inspection method of choice for non-ferromagnetic tubing, for surface cracks in aerospace structures, for coating thickness on aluminum aircraft skins, and for conductivity verification on heat-treated alloy parts. The physics is simple and the techniques scale from a $5,000 hand-held flaw detector to a $250,000 array system.',
  physicsPrimer:
    'Eddy current testing uses an alternating-current coil to induce circulating currents (eddy currents) in a conductive part. Defects, geometric changes, conductivity changes, and lift-off all perturb the eddy current distribution and reflect back into the coil as impedance changes. The instrument plots impedance as a vector on the complex plane (X-Y display) and the trained operator reads defect type and depth from the angle and amplitude of the vector signal. ASME BPVC Section V Article 8 sets procedure rules for tube inspection [1]; ASTM E309 covers electromagnetic testing of bar [2]; ASTM E215 covers tube inspection [3]; ASTM E376 covers coating thickness by eddy current [4]. Standard depth of penetration follows δ = √(ρ / π·µ·f) where ρ is resistivity, µ is permeability, and f is excitation frequency. For aluminum at 100 kHz, δ ≈ 0.3 mm; for copper at 10 kHz, δ ≈ 1 mm. Frequency selection trades depth against sensitivity to near-surface defects.',
  detectableDefects: [
    'Inter-granular attack (IGA) and inter-granular stress-corrosion cracking (IGSCC) in heat-exchanger tubing',
    'Pitting (general and isolated) in stainless and nickel-alloy tube walls',
    'Wall loss and erosion in admiralty brass and 90-10 copper-nickel tubing',
    'Fatigue cracks at fastener holes in aluminum aircraft skin',
    'Surface cracks in titanium turbine blades',
    'Coating thickness variation on aluminum and non-ferrous substrates',
    'Conductivity changes from heat-treat condition (T3 vs T6 vs T7 aluminum)',
    'Corrosion under thin coatings on aerospace structures',
  ],
  materialsAndForms: [
    'Heat-exchanger tubing in copper, copper-nickel, admiralty brass, titanium, stainless, Inconel',
    'Aluminum aircraft skins, wing spars, fuselage frames',
    'Titanium turbine blades, discs, shafts',
    'Non-ferrous bar, billet, and rod for production-line crack detection',
    'Coated steel surfaces (coating thickness on conductive substrate)',
  ],
  whenToChoose:
    'Choose ET for non-ferromagnetic tube inspection (admiralty brass, 90-10 Cu-Ni, titanium, austenitic stainless), for aerospace fastener-hole crack inspection where MT and PT are slow and limited, for coating thickness measurement on aluminum and copper substrates, for conductivity verification on heat-treated aluminum, and for in-service surface-crack inspection through thin paint where PT prep would require stripping. ET runs fast — 800-1000 tubes per shift with bobbin probes — and gives quantitative depth and length data via reference-tube calibration.',
  whenNotToChoose:
    'ET is heavily affected by lift-off, edge effects, and permeability variation on ferromagnetic material. On carbon steel and ferritic stainless, the permeability variability from heat-treat and cold-work fluctuations swamps defect signals; remote-field eddy current (RFEC) or magnetic flux leakage are better choices for ferromagnetic tubing. Surface roughness above about 250 µin Ra introduces noise that masks small indications. Highly curved or complex geometry defeats bobbin and surface probes — flexible array or pencil probes carry the work but at much higher cost. Depth penetration is limited to about 6 standard depths of penetration; thick parts beyond about 0.2" need UT or RT instead.',
  procedure: [
    {
      heading: 'Procedure qualification and frequency selection',
      level: 2,
      paragraphs: [
        'A written ET procedure references ASME V Article 8 [1] for tube inspection or ASTM E309/E215/E376 [2][3][4] for surface and coating work. The procedure specifies the probe type (bobbin, array, surface, pencil, sliding), frequency (single or multi-frequency mix), calibration reference standard (typically a tube section of the same material and dimensions as production, with machined notches and through-wall drill holes of known size), reference sensitivity, scan speed, and acceptance criteria.',
        'Frequency selection is the most operator-dependent decision in ET. Lower frequency penetrates deeper but loses near-surface sensitivity; higher frequency resolves near-surface defects but cannot see through-wall defects. Most heat-exchanger bobbin work uses dual-frequency or multi-frequency mix — a primary frequency for general inspection and a secondary frequency for tube-support-plate noise rejection. Multi-frequency mix combines impedance signals at two or more frequencies to subtract out signals from one feature (e.g., support plate) while preserving signals from another (wall loss under the support).',
      ],
    },
    {
      heading: 'Calibration standards and reference reflectors',
      level: 2,
      paragraphs: [
        'For tube inspection, ASME V Article 8 Mandatory Appendix I [1] specifies a calibration standard with through-wall drill holes (100% wall), 80%, 60%, 40%, and 20% wall flat-bottom holes, and a circumferential machined notch. The standard is the same material, OD, and wall as the production tubes. The instrument is calibrated to plot the 100% hole at a procedure-specified angle (typically 40° from horizontal) and amplitude (typically 80% full screen height).',
        'For surface ET, the calibration block is a flat plate of the production material with EDM notches of known depth (typically 0.020", 0.040", 0.080", 0.200"). For coating thickness, ASTM E376 [4] uses certified plastic shims of known thickness placed over an uncoated substrate. NIST-traceable shim sets are mandatory; uncertified shims invalidate the readings for any regulated application.',
      ],
    },
    {
      heading: 'Probe selection and signal optimization',
      level: 2,
      paragraphs: [
        'Bobbin probes (internal differential and absolute coils) dominate heat-exchanger tube inspection. Differential bobbins detect short-axial defects (pits, IGA bursts) with high signal-to-noise; absolute bobbins detect gradual wall loss that differential coils integrate out. Array probes (Eddyfi RPC, Olympus EddyAcorn) place 16-128 small coils around the tube circumference to give 360° coverage in a single pass — critical for finding axially-aligned cracks that bobbin coils miss.',
        'Surface probes for aerospace fastener-hole inspection (Hocking 0-180, Rohmann ECT-S) scan around the rim of a hole at 5-20 in/sec. Pencil probes resolve cracks under thin paint or in tight geometry where surface probes cannot fit. Sliding probes scan over rivet heads in a single pass per row of rivets. Probe selection is procedure-specified and substitution requires a procedure revision and Level III sign-off.',
      ],
    },
    {
      heading: 'Scan execution and data recording',
      level: 2,
      paragraphs: [
        'For bobbin tube inspection, the probe is pulled from the back tubesheet to the front at 12-30 inches per second under a constant-speed pulling rig. The instrument (Olympus OmniScan MX2 ECT, Eddyfi Ectane2) records the full impedance trace for every tube. Tube identification (row, column) is logged automatically from the pulling system or manually from the technician\'s plan. Modern systems (Eddyfi MagnaTECH array) record all channels of an array probe simultaneously.',
        'For surface scan work, the technician indexes the probe along a marked grid at 5-10 in/sec with 50% probe-diameter overlap between scan lines. ASME V Article 8 Mandatory Appendix II [1] specifies the scan plan and the indication recording threshold (typically 20% of the calibration reference notch signal). Indications above threshold get marked on the part with paint or tape and on the scan plan for re-evaluation.',
      ],
    },
    {
      heading: 'Indication interpretation and depth sizing',
      level: 2,
      paragraphs: [
        'Eddy current signal interpretation is two-dimensional. Amplitude reflects defect cross-section; phase angle reflects defect depth. For tube inspection, the calibrated chart from the reference standard maps phase angle to percent wall loss — a signal at 40° corresponds to 100% through wall, 50° corresponds to 80%, 60° corresponds to 60%, and so on. Sizing accuracy is typically ±10-15% of wall thickness when the calibration is current and the operator is Level II qualified.',
        'For surface scans, indication length is measured from the scan plan (probe position when signal exceeds threshold to position when signal returns below threshold). Depth comes from the amplitude relative to the EDM-notch reference. ASTM E309 §11 [2] gives the sizing protocol. Confirmatory MT or PT on the marked indication is common before disposition decisions.',
      ],
    },
    {
      heading: 'Reporting and disposition',
      level: 2,
      paragraphs: [
        'The ET report names procedure, instrument and probe serial numbers, calibration standard, frequencies, scan speed, every indication with location, type, length, and depth percent or absolute, and disposition. For heat-exchanger tube inspection, the report includes a tube-map showing every tube color-coded by remaining wall percentage. Tubes below the wall threshold (typically 60-70% remaining for refinery service, 50% for non-critical service) get plugged, retubed, or further-inspected with rotating-coil probe for sizing.',
        'For aerospace and pressure-equipment work, ET indications that match the reject criteria go to engineering for repair or disposition decisions. ASME B31.3 Mandatory Appendix IX [5] permits ET for in-service tube and pipe inspection with code-specified acceptance. API 510 §6.4.2 references ET as an acceptable in-service technique for heat-exchanger tube wall assessment [6].',
      ],
    },
  ],
  equipment: [
    {
      heading: 'Flaw detectors and array systems',
      level: 2,
      paragraphs: [
        'The Olympus OmniScan MX2 ECT and Eddyfi Ectane2 dominate the field portable market for single-channel and small-array bobbin work. Both deliver multi-frequency mix, dual-channel array support, and real-time impedance display. For full-array work on tube banks, the Eddyfi Reddy and Olympus OmniScan X3 64 are the workhorses with 32-64 channel acquisition.',
        'For aerospace surface scan, the Olympus NORTEC 600 and Rohmann ELOTEST PL600 cover surface and pencil-probe work. Conductivity meters (Verimet M4900C, Hocking AutoSigma 3000) handle heat-treat verification on aluminum aerospace parts to AMS 2658 [7].',
      ],
    },
    {
      heading: 'Probes and pulling rigs',
      level: 2,
      paragraphs: [
        'Bobbin probes match the tube ID — Olympus, Eddyfi, and Russell NDE supply probes for every common tube size (0.5" to 2.0" OD). Differential and absolute coil versions ship in pairs for procedure flexibility. Array tube probes (Eddyfi MagnaTECH) deliver full 360° coverage in a single pass at $15-25k per probe.',
        'Pulling rigs (Russell ECT-PR-2, Eddyfi Probot) maintain constant pull speed of 12-30 inches per second across the tube length. Constant-speed pulling is critical — variable pull rates introduce false amplitude variation that mimics wall loss.',
      ],
    },
    {
      heading: 'Calibration standards',
      level: 2,
      paragraphs: [
        'NIST-traceable tube calibration standards for every common alloy (admiralty, 90-10 Cu-Ni, 304/316 SS, Inconel 600/625/690, titanium) ship from Phoenix ISL, Russell NDE, and Magnaflux. Each standard has the ASME V Appendix I [1] mandatory reflectors plus job-specific reflectors as required by the procedure.',
        'For coating thickness, NIST-traceable plastic shim sets (Elcometer, DeFelsko) covering 1-1000 µm verify the meter at the start of every shift. For conductivity, IACS standard blocks at 30%, 50%, 80% IACS verify the meter to AMS 2658 [7].',
      ],
    },
  ],
  codesAndStandards: [
    { id: 'asme-v-art-8', source: 'ASME BPVC Section V (2023), Article 8 — Eddy Current Examination of Tubular Products' },
    { id: 'astm-e309', source: 'ASTM E309-22 — Standard Practice for Eddy-Current Examination of Steel Tubular Products Using Magnetic Saturation' },
    { id: 'astm-e215', source: 'ASTM E215-22 — Standard Practice for Standardizing Equipment for Electromagnetic Examination of Seamless Aluminum-Alloy Tube' },
    { id: 'astm-e376', source: 'ASTM E376-19 — Standard Practice for Measuring Coating Thickness by Magnetic-Field or Eddy Current Examination Methods' },
    { id: 'asme-b31-3', source: 'ASME B31.3 (2022), Mandatory Appendix IX — In-Service Inspection of Piping Systems' },
    { id: 'api-510', source: 'API 510, 11th ed. (2022), §6.4.2 — Heat-Exchanger Tube Inspection' },
    { id: 'ams-2658', source: 'SAE AMS 2658A — Hardness and Conductivity Inspection of Wrought Aluminum Alloy Parts' },
    { id: 'iso-15549', source: 'ISO 15549:2019 — Non-destructive testing — Eddy current testing — General principles' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Qualification and Certification of NDT Personnel' },
  ],
  acceptanceCriteria:
    'For heat-exchanger tube inspection, acceptance is based on remaining wall percentage relative to design minimum. Refinery and chemical-plant operators typically plug tubes at 40% wall loss or refer for rotating-coil probe sizing; 50% wall loss is a hard plug threshold for ASME-stamped exchanger service. ASME V Article 8 Mandatory Appendix I [1] gives the through-wall calibration curve and the sizing accuracy expected. For aerospace surface ET to NAS 410 and AMS 2647-equivalent specs, any crack indication is rejectable regardless of length; the disposition is repair, scrap, or engineering disposition. For coating thickness, acceptance is per the engineering drawing — typically a min-max range with ±10% tolerance verified across multiple readings per location. Conductivity acceptance for heat-treated aluminum follows AMS 2658 [7] — a 7075-T6 part must show 30.0-34.0% IACS to confirm proper heat-treat; outside that range the part is reject or requires re-heat-treat.',
  comparisonAgainst: [
    { method: 'Ultrasonic Testing (UT)', tradeoff: 'UT gives true depth measurement and inspects through full wall thickness, but is slow on tube banks (1-2 tubes/hr vs 800 for bobbin ET) and requires couplant.' },
    { method: 'Magnetic Flux Leakage (MFL)', tradeoff: 'MFL handles ferromagnetic tubing where ET physics breaks down, and inspects through coatings, but is less sensitive to small pits and IGA than ET on non-ferromagnetic material.' },
    { method: 'Remote Field Eddy Current (RFEC)', tradeoff: 'RFEC handles ferromagnetic tubing that conventional ET cannot, but runs slower and has lower spatial resolution.' },
    { method: 'Penetrant Testing (PT)', tradeoff: 'PT confirms a surface-breaking crack visually but cannot find subsurface defects ET can resolve, and requires solvent prep that ET avoids.' },
  ],
  costRange: {
    unit: 'USD per tube inspected (heat-exchanger bobbin, Gulf Coast, 2025)',
    low: 5,
    high: 25,
    mid: 12,
  },
  faqs: [
    {
      q: 'How accurate is eddy current depth sizing?',
      a: 'For tube inspection with bobbin probes against a calibrated ASME V Article 8 standard [1], depth sizing is typically ±10-15% of wall thickness for defects between 20% and 80% wall loss. Below 20% the signal-to-noise drops and accuracy degrades; above 80% the phase angle compresses against the through-wall reference and small phase errors translate to large depth errors. For mission-critical sizing, rotating-coil probe follow-up on flagged tubes gives ±5-7% accuracy. Aerospace surface ET against EDM-notch standards achieves similar accuracy on fastener-hole and structural crack work.',
    },
    {
      q: 'Why does eddy current not work well on carbon steel?',
      a: 'Carbon steel and ferritic stainless have variable magnetic permeability driven by heat-treat condition, cold-work, residual stress, and chemistry variation. The permeability variability dominates the impedance signal, swamping the conductivity-based defect signal that ET relies on. Magnetic saturation eddy current (ASTM E309 [2]) overcomes this by applying a DC magnetic field strong enough to drive the steel to magnetic saturation, where permeability is fixed at the air-equivalent value. Below saturation, ET on carbon steel is unreliable for defect detection — RFEC or MFL handle ferromagnetic tube inspection instead.',
    },
    {
      q: 'What frequency should I use for surface crack detection?',
      a: 'Frequency selection follows the standard-depth-of-penetration math δ = √(ρ / π·µ·f). For surface cracks (depth target 0.020" to 0.080"), frequency is chosen to give δ at roughly the maximum expected depth, which concentrates sensitivity at the near surface. For aluminum at 100 kHz, δ ≈ 0.3 mm (0.012"); for fastener-hole work targeting cracks to 0.080", drop to 5-20 kHz where δ ≈ 0.5-1 mm. For coating thickness on conductive substrate, lower frequencies penetrate the coating to read the substrate-coating interface. The procedure-specified frequency is qualified for the specific defect type — substituting frequency without re-qualification invalidates the inspection.',
    },
    {
      q: 'Can ET inspect tubes with internal corrosion deposits?',
      a: 'Heavy internal deposits (scale, magnetite, sulfide products) lift the bobbin probe off the tube wall and degrade signal-to-noise dramatically. Most refinery and chemical-plant procedures require water-flush cleaning of every tube before bobbin ET — high-pressure water at 5,000-10,000 psi removes loose scale and gives the probe direct ID contact. For tubes with adherent deposits that resist water flushing, mechanical brushing or chemical descaling is required. Running bobbin ET through dirty tubes produces unreliable wall data and is one of the most common causes of missed indications in heat-exchanger inspection.',
    },
    {
      q: 'Does ET certification differ from other methods?',
      a: 'ASNT CP-189 [9] and SNT-TC-1A recognize ET as a discrete method with Levels I, II, and III. Required documented experience hours are similar to UT — 210 hours Level I, 630 hours total Level II for direct employer certification. Aerospace certification under NAS 410 includes additional ET-specific requirements for surface-crack and conductivity work. Many aerospace primes (Boeing, Lockheed, GE Aviation) maintain their own ET prime certifications above the NAS 410 baseline, particularly for engine turbine work where ET is the primary surface inspection.',
    },
  ],
  internalLinks: [
    { href: '/methods/ultrasonic-thickness-measurement', label: 'UT thickness measurement', context: 'UT supplements ET for spot-check sizing on flagged heat-exchanger tubes.' },
    { href: '/methods/magnetic-flux-leakage', label: 'Magnetic Flux Leakage', context: 'MFL handles ferromagnetic tubing where conventional ET breaks down.' },
    { href: '/methods/penetrant-testing', label: 'Penetrant Testing', context: 'PT confirms a surface-breaking crack flagged by ET on aerospace structures.' },
    { href: '/industries/aerospace', label: 'Aerospace inspection', context: 'ET is the primary surface-crack and fastener-hole inspection method on aluminum aircraft structures.' },
    { href: '/industries/petrochemical', label: 'Petrochemical inspection', context: 'Refinery heat-exchanger turnarounds rely on bobbin ET for tube wall mapping.' },
    { href: '/standards/asme-v', label: 'ASME BPVC Section V', context: 'Article 8 of Section V governs every ET procedure for tube inspection.' },
    { href: '/standards/api-510', label: 'API 510', context: 'API 510 §6.4.2 references ET for in-service heat-exchanger tube inspection.' },
    { href: '/tools/skin-depth-calculator', label: 'Skin-depth calculator', context: 'Compute eddy current standard depth of penetration for any material and frequency.' },
    { href: '/learn/eddy-current-frequency-selection', label: 'ET frequency selection guide', context: 'Walk-through of choosing primary and secondary frequencies for tube inspection.' },
  ],
  citations: [
    { id: 'asme-v-art-8', source: 'ASME BPVC Section V (2023), Article 8 — Eddy Current Examination of Tubular Products' },
    { id: 'astm-e309', source: 'ASTM E309-22 — Eddy-Current Examination of Steel Tubular Products Using Magnetic Saturation' },
    { id: 'astm-e215', source: 'ASTM E215-22 — Electromagnetic Examination of Seamless Aluminum-Alloy Tube' },
    { id: 'astm-e376', source: 'ASTM E376-19 — Measuring Coating Thickness by Magnetic-Field or Eddy Current' },
    { id: 'asme-b31-3', source: 'ASME B31.3 (2022), Mandatory Appendix IX — In-Service Inspection of Piping' },
    { id: 'api-510', source: 'API 510, 11th ed. (2022), §6.4.2 — Heat-Exchanger Tube Inspection' },
    { id: 'ams-2658', source: 'SAE AMS 2658A — Hardness and Conductivity Inspection of Wrought Aluminum' },
    { id: 'iso-15549', source: 'ISO 15549:2019 — Eddy current testing — General principles' },
    { id: 'asnt-cp-189', source: 'ANSI/ASNT CP-189-2020 — Qualification and Certification of NDT Personnel' },
  ],
};

export default method;
