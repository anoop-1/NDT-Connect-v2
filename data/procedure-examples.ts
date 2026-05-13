/**
 * Hand-curated NDT procedure example metadata for the AI Procedure Writer
 * landing page. Bodies are authored references — they are starting points,
 * not certified procedures. Any production use requires sign-off by an ASNT
 * Level III in the relevant method and validation against the customer's
 * written practice and the applicable code edition.
 *
 * Slugs are stable and used in URLs; do not rename without a redirect.
 */

export interface ProcedureExample {
  slug: string;
  /** NDT method abbreviation (UT, RT, MT, PT, VT, PAUT, TOFD, ECT). */
  method: string;
  /** Industry / asset class. */
  industry: string;
  /** Governing standard / code. */
  standard: string;
  /** Human-readable headline (used as <h1> and meta title). */
  title: string;
  /** Short blurb (used as description / OG description). */
  summary: string;
  /** Markdown body. */
  body: string;
}

const UT_PRESSURE_VESSEL = `
## 1. Scope

This procedure covers manual contact ultrasonic examination (UT) of full-penetration butt welds in carbon-steel and low-alloy-steel pressure vessels constructed to ASME Boiler and Pressure Vessel Code (BPVC) Section VIII Division 1. The examination is performed in accordance with **ASME BPVC Section V, Article 4** and qualified to the supplemental requirements of Section VIII Division 1 Mandatory Appendix 12 where the vessel is to be marked with UT in lieu of radiography under UW-11(a)(7).

Material thickness range: **6 mm (¼ in) to 200 mm (8 in)**. Geometry: longitudinal and circumferential butt welds, weld crown ground flush or contoured per code.

## 2. References

- ASME BPVC Section V, Article 4 — Ultrasonic Examination Methods for Welds (current edition)
- ASME BPVC Section VIII Division 1, UW-11, UW-51, UW-52, Mandatory Appendix 12
- ASNT SNT-TC-1A or CP-189 for personnel qualification
- Customer Written Practice (WP)
- ASME BPVC Section IX for welding-procedure context (informational)

## 3. Personnel Qualification

UT examination shall be performed by personnel certified to ASNT NDT **Level II** or higher in Ultrasonic Testing, qualified to the employer's Written Practice meeting SNT-TC-1A or CP-189. Procedure approval and interpretation of indications outside the straightforward limits of Table T-441.1 shall be referred to a Level III.

## 4. Equipment

- Pulse-echo flaw detector with calibrated A-scan display (e.g., Olympus EPOCH 650 / Sonatest Veo+ / Krautkrämer USM 100). Vertical linearity within ±5% of full screen height; horizontal linearity within ±5% per T-441.1.
- Single-element transducers:
  - 0° longitudinal-wave, 5 MHz, 25 mm diameter — for thickness reference and lamination scan.
  - Angle beams 45°, 60°, 70° shear-wave wedge — frequency 2.25 MHz or 5 MHz, element 9 × 9 mm or 12 × 13 mm — selected per material thickness per T-451.1.
- Couplant compatible with material — typically glycerin-based, water-based, or low-sulfur cellulose paste. Compatibility verified against the customer's service-fluid contact list (e.g., halide-free for austenitic stainless).
- Calibration block per Figure T-434.1: V1 / V2 (ISO 2400) or per Mandatory Appendix VIII customer-specific block reflecting the actual production material and thickness.
- Distance Amplitude Correction (DAC) reference block with side-drilled holes (SDH) sized per T-434.2.1 — typically 1.5 mm (0.060 in) diameter for thicknesses ≤ 25 mm.

## 5. Surface Preparation

The scanning surface shall be free of weld spatter, paint scale, mill scale, slag, oil, and surface irregularities that interfere with sound transmission. Acceptable surface roughness: 6.3 µm Ra or finer (250 µin). Scanning surface extends a minimum of **1.5 × material thickness** on each side of the weld centerline.

Material temperature at the time of examination shall be between 0 °C (32 °F) and 52 °C (125 °F). For elevated-temperature contact UT, high-temperature couplant and probes shall be specified by the Level III.

## 6. Calibration

### 6.1 System Calibration

Range and sensitivity shall be set using the reference block of Figure T-434.1 or an approved customer block. The DAC curve shall be constructed from a minimum of three SDH responses spanning the metal-path range of interest. The reference level shall be set so that the peak response from the primary reference reflector reaches **80% ± 5% FSH**.

### 6.2 Calibration Verification

System calibration shall be verified:

- At the start of each examination
- After any change of operator, probe, cable, or wedge
- At the end of each examination period
- At intervals not exceeding **4 hours** during continuous use

If calibration verification shows DAC peak amplitude has changed by more than **20%** or **2 dB**, all examinations performed since the last valid calibration shall be repeated.

### 6.3 Couplant Verification

Couplant transmission loss shall be checked daily on the calibration block; loss greater than 6 dB from the as-procured baseline requires couplant replacement.

## 7. Examination Technique

### 7.1 Coverage

The complete weld and adjacent base metal (the heat-affected zone plus 25 mm) shall be examined from **both sides of the weld where accessible, from both surfaces where accessible** per T-471. Scanning shall be performed at a maximum index increment of **(W − D × tan θ) / 1.5** where W is the transducer width, D is the metal path, and θ is the refracted angle.

### 7.2 Scanning Sensitivity

Scanning gain shall be set **6 dB above** the reference DAC level. Evaluation of indications shall be at reference level.

### 7.3 Scanning Speed

Maximum scanning speed: **150 mm/s (6 in/s)**.

### 7.4 Coupling Verification

Continuous coupling shall be maintained throughout each scan. Loss of coupling for more than 25 mm of scan length requires re-scanning.

## 8. Evaluation and Recording

Indications producing a response **equal to or greater than 20% of the DAC reference level** shall be investigated to determine the shape, identity, and location of the reflector. All indications producing a response **equal to or greater than the DAC reference level** that cannot be classified as geometric shall be evaluated against Section VIII Division 1 Mandatory Appendix 12.

## 9. Acceptance Criteria (ASME Section VIII Div 1 App 12)

Indications shall be classified as:

- **Cracks, lack of fusion, incomplete penetration** — rejectable regardless of amplitude per App 12-3(a)
- **Other linear indications**: rejectable if amplitude exceeds reference level AND length exceeds the limits of App 12-3(b)(1) through (3):
  - ≤ ¼ × t for ½ × t < ℓ for the depth zone in question
  - Customer Written Practice may impose more stringent limits.

## 10. Reporting

The examination report shall include, as a minimum: customer and job identifier; component identification; drawing number and weld number; material and thickness; welding process; surface condition; equipment serial numbers (instrument, transducer, wedge); calibration block identifier and last-calibration date; couplant; scanning gain and reference level; date of examination; examiner name, certification level, and ID; Level III approval signature; and a sketch or weld map showing the location, length, depth, and amplitude (% DAC) of every recordable indication.

## 11. Safety

Standard plant safety rules apply. Specific NDT considerations: confined-space entry procedures for in-vessel examination; hot-surface PPE for above-ambient examinations; couplant compatibility with downstream service (e.g., halide content limits for stainless and high-nickel alloys); ergonomic management of continuous overhead scanning per ANSI Z365.

---

*This procedure is a published reference. Production use requires Level III review and approval against the current code edition and the customer's Written Practice. For a tailored procedure including specific transducer selection, exact DAC block geometry, and customer-specific acceptance criteria, use the [free AI Procedure Generator](/tools/ndt-procedure-generator).*
`;

const RT_PIPELINE_API_1104 = `
## 1. Scope

This procedure covers radiographic examination of cross-country pipeline girth welds in carbon-steel transmission and gathering pipelines constructed to **API 1104** (latest edition, currently 22nd). It applies to wall thicknesses from **3.2 mm (0.125 in) to 25.4 mm (1.00 in)**, outside diameters from **60 mm (2-3/8 in) NPS to 1219 mm (48 in) NPS**, and is intended for new construction and tie-in welds. In-service pipeline welds under repair conditions require additional thermal-load review per API 2201; that case is out of scope.

## 2. References

- API Standard 1104 — Welding of Pipelines and Related Facilities, current edition
- ASTM E94 / E94M — Standard Guide for Radiographic Examination
- ASTM E747 — Wire-Type IQI
- ASTM E1742 / E1742M — Radiographic Examination Using Industrial Radiographic Film
- 49 CFR §192 (gas) / §195 (liquid) — PHMSA NDT requirements
- ASNT SNT-TC-1A or CP-189
- Customer Written Practice

## 3. Personnel Qualification

Radiographic examination shall be performed by personnel certified to **ASNT NDT Level II in RT**, qualified per a Written Practice meeting SNT-TC-1A or CP-189. Film interpretation and Level III review of marginal indications shall be by a Level III in RT.

Radiation-safety personnel shall hold a current operator certification per the applicable jurisdiction (US: NRC Reciprocity / Agreement-State; Canada: CNSC).

## 4. Equipment

- Source: **Ir-192** for wall thicknesses 12.5 mm to 65 mm steel; **Se-75** for thin-wall (≤ 12.5 mm) where focal-spot geometry is favourable; X-ray for thin-wall or where source-side IQI sensitivity demands it. Source-activity range typically 1.85 TBq (50 Ci) to 3.7 TBq (100 Ci) Ir-192 depending on wall thickness and SFD.
- Source projector with calibrated source-guide tubes and collimator (collimation mandatory in populated work areas).
- Industrial radiographic film: Class I (D7 / Industrex M / Agfa D4) for high-sensitivity work; Class II for routine work where sensitivity allows.
- Lead intensifying screens, 0.13 mm front / 0.25 mm back (0.005 in / 0.010 in).
- Densitometer calibrated to NIST-traceable step wedge — last calibration ≤ 90 days.
- IQI: ASTM E747 wire-type, material-matched to the production weld. Essential wire selected per API 1104 Table 11.1.
- Calibrated step-wedge density strip.
- Radiation survey meter (Geiger-Müller or scintillator) — calibration current within 12 months.
- Audible and visible alarming dosimeters per 10 CFR 34.

## 5. Surface Preparation and Geometry

Weld and adjacent base metal (minimum 25 mm each side of the weld toe) shall be free of mud, ice, weld spatter, paint that would mask indications, and slag. The weld profile shall be acceptable for visual interpretation per API 1104 Section 9.3.

Source-to-film distance (SFD) shall meet the geometric-unsharpness limits of API 1104 Section 11.1.6:

\`\`\`
Ug = (F × t) / D
where Ug ≤ 0.5 mm (0.020 in) for t ≤ 50 mm
\`\`\`

## 6. Technique

### 6.1 Single Wall — Single Image (SWSI)

For external pipe surfaces ≥ NPS 4 where the source can be placed inside the pipe: panoramic exposure if pipe ID permits source-and-projector entry, or contact / superimposed offset shots from external positions.

### 6.2 Double Wall — Single Image (DWSI)

For NPS 2-7/8 through NPS 3-1/2 where panoramic is not feasible: minimum 3 exposures at 120° spacing; minimum 4 exposures at 90° spacing for NPS ≥ 4 where source cannot enter the pipe.

### 6.3 Double Wall — Double Image (DWDI / Elliptical)

For pipe NPS ≤ 2-7/8 inclusive: minimum 2 exposures 90° apart with the source offset to produce an elliptical projection of the weld. Maximum elliptical separation: 1 weld width.

### 6.4 IQI Placement

Source-side preferred; film-side acceptable where source-side is not practical, subject to API 1104 Section 11.1.4. Wire IQIs placed across the weld with wires perpendicular to the weld axis.

## 7. Exposure and Processing

Exposure time selected from a calibrated exposure chart for the source activity, SFD, pipe-wall thickness, and material. Verify by processing a step-wedge density strip at the start of each shift.

### 7.1 Film Density

Film density measured through the weld and base metal shall be within **2.0 to 4.0** per API 1104 Section 11.1.5. Maximum density variation across the area of interest: 30%.

### 7.2 IQI Sensitivity

Smallest essential wire visible across the weld and adjacent base metal per the controlling table — typically equivalent to **2-2T** sensitivity (per ASTM E747).

### 7.3 Film Processing

Manual or automatic processing per the film-manufacturer's specification, controlled by sensitometric step-wedge strips. Reject any film with handling marks, processing artefacts, or static within the area of interest.

## 8. Interpretation and Acceptance Criteria

Interpretation shall be performed in a film-viewing area meeting ASTM E1742 — variable-intensity viewer adequate for the densities being read, ambient light controlled to eliminate glare on the film.

Acceptance criteria per **API 1104 Section 9.3** — discontinuity types:

- **Inadequate penetration without high-low (IP):** rejectable if length exceeds 25 mm in any continuous 300 mm of weld OR total IP length exceeds 8% of weld length.
- **Inadequate penetration with high-low (IPD):** rejectable if length exceeds 50 mm in any 300 mm OR total exceeds 8%.
- **Incomplete fusion (IF):** rejectable if length exceeds 25 mm in any 300 mm OR 8% of weld.
- **Incomplete fusion due to cold lap (IFD):** rejectable if individual length > 50 mm OR total > 8%.
- **Internal concavity (IC):** acceptable if density does not exceed adjacent base-metal density.
- **Burn-through (BT):** rejectable if max dimension > 6 mm AND > 0.5t, OR sum exceeds 12 mm in 300 mm.
- **Slag inclusions (SI / ESI):** rejectable per Table 9.1 — isolated slag > 13 mm long OR width > 1.6 mm.
- **Porosity:** acceptable per Table 9.2 if cluster diameter ≤ 13 mm AND scattered porosity does not exceed Figure 11.
- **Cracks:** rejectable regardless of size or location.
- **Undercut:** rejectable if exceeds 1 mm (0.04 in) deep OR limits of Table 9.3.

## 9. Reporting

Each radiograph shall be permanently identified with: contract number, weld number, station number, date, technician number, side designation (film side / source side), and shot number for multi-shot welds. The radiographer's report shall record: equipment used, source identity and activity, SFD, exposure time, film type, IQI used and wire visibility, film density, and a sketch with defect locations along the weld axis. Records retained per 49 CFR §192.243 / §195.234 (typically pipeline-life).

## 10. Safety

Compliance with 10 CFR Part 34 (US), Atomic Energy Regulatory Body equivalents (other jurisdictions). Restricted-area boundary established to **2.0 mSv/hr (200 mR/hr)** survey limit; controlled-area boundary at **0.05 mSv/hr (5 mR/hr)**. Personnel dosimetry: TLD or OSL badge plus direct-reading dosimeter with audible alarm. Source-retraction verification on every shot via survey-meter reading at the projector.

---

*This procedure is a published reference. Production use requires customer and AI (Authorized Inspector or equivalent) approval against the current API 1104 edition. Generate a custom procedure for your wall thickness, source, and operator at the [free AI Procedure Generator](/tools/ndt-procedure-generator).*
`;

const MT_STRUCTURAL_AWS_D1_1 = `
## 1. Scope

This procedure covers magnetic-particle examination (MT) of weldments on carbon-steel and low-alloy-steel structural members fabricated to **AWS D1.1 Structural Welding Code — Steel**. It applies to complete-joint-penetration (CJP) and partial-joint-penetration (PJP) groove welds and fillet welds in primary and secondary structural members, base-metal thicknesses 3 mm (1/8 in) and greater. Applicable to shop and field examination.

## 2. References

- AWS D1.1 — Structural Welding Code — Steel, current edition, Clauses 6 and 8
- ASTM E709 — Standard Guide for Magnetic Particle Examination
- ASTM E1444 / E1444M — Standard Practice for MT
- ASNT SNT-TC-1A or AWS QC1 for personnel
- Customer Written Practice

## 3. Personnel Qualification

MT examination shall be performed by personnel certified to **ASNT NDT Level II in MT** per the employer's Written Practice. Interpretation of indications and Level III approval per AWS D1.1 Clause 8.14 shall be by an ASNT Level III in MT.

## 4. Equipment

- AC-yoke electromagnetic prod (e.g., Magnaflux Y-7 / Parker B310S) certified to lift **4.5 kg (10 lb)** at the maximum pole spacing to be used (typically 75-200 mm / 3-8 in). Lift test performed before first use each shift; recorded.
- DC or half-wave-DC yoke for subsurface indication detection when specified — certified to lift **18 kg (40 lb)** at maximum pole spacing.
- Visible (color-contrast) magnetic particle bath or dry powder.
- Fluorescent (UV) particle bath where Type II inspection is required — UV-A intensity ≥ 1000 µW/cm² at 38 cm (15 in) per ASTM E1444.
- White-light meter (visible MT) — minimum **1000 lux** illumination at the examination surface.
- UV-A radiometer (fluorescent MT) — calibrated within 12 months.
- Pie gauge (raised-cross indicator) or Magnetic Field Indicator strips for field-direction verification.

## 5. Surface Preparation

Examination surface shall be cleaned of slag, weld spatter, oil, grease, rust, scale, paint, and other contamination that may interfere with particle mobility. Wire brushing or light grinding is acceptable; mechanical removal is not permitted to obliterate weld profile.

For painted or coated surfaces, **maximum coating thickness 0.05 mm (0.002 in)** is permissible only when the contractor demonstrates by a calibration trial that the coating does not impair test sensitivity per AWS D1.1 Section 8.14.4.

## 6. Magnetization Technique

### 6.1 Yoke Method (Standard)

Yoke prods placed across the area of interest with pole spacing between **75 mm (3 in) and 200 mm (8 in)**. Magnetization shall be applied in two perpendicular directions at each examination area to ensure detection of indications in all orientations.

### 6.2 Continuous Method

Particles applied while current is on and field is established. Visible (dry or wet) particles applied with gentle uniform coverage — heavy application masks indications.

### 6.3 Field-Strength Verification

Field strength shall be verified using a pie gauge or magnetic-field indicator placed on the examination surface at the most-distant point from the prods. The indicator shall produce a clear pattern of magnetic flux. Lift-test (4.5 kg AC; 18 kg DC) performed before each shift and documented.

## 7. Examination

- Examination shall cover the weld and **a minimum of 25 mm (1 in) of adjacent base metal** on each side of the weld toe.
- Two examinations at perpendicular directions per area.
- Maximum scan speed: such that the examiner can observe the indication formation — typically continuous.
- Overlap between adjacent examination areas: **10%** minimum.

## 8. Indication Classification

Indications shall be classified per AWS D1.1 Clause 8.13 and 8.14:

- **Relevant indications:** linear or rounded indications associated with discontinuities in the weld or HAZ.
- **Non-relevant indications:** geometric, magnetic writing, or those caused by surface conditions.
- **False indications:** caused by contamination or insufficient cleaning.

Linear indication: length ≥ 3× the width.

## 9. Acceptance Criteria (AWS D1.1 Clause 8.14.6)

For statically loaded structures (Clause 8.14.6.1):

- Any **crack** — rejectable regardless of size.
- Linear indication greater than 5 mm (3/16 in) — rejectable.
- Rounded indications greater than 5 mm (3/16 in) — rejectable.
- Cluster of four or more rounded indications in a line, separated by 1.5 mm or less edge-to-edge — rejectable.

For cyclically loaded (fatigue) structures (Clause 8.14.6.2): all linear indications and rounded indications larger than half the limit above are rejectable. Designer-specified additional limits may apply.

## 10. Repair and Re-Examination

Defects shall be removed by grinding, machining, or weld repair per AWS D1.1 Clause 5.26. Repaired areas shall be re-examined by the same MT procedure plus any additional NDT specified by the Engineer of Record.

## 11. Reporting

Each examination shall be documented with: customer and project; member ID; weld number; weld type (groove / fillet, CJP / PJP); base-metal grade and thickness; weld procedure; surface condition; equipment serial numbers; particle type and batch; field-verification method; date and time of examination; ambient light level (visible MT) or UV intensity (fluorescent MT); examiner name and certification; Level III approval; sketch with location, length, and orientation of every recordable indication.

## 12. Safety

PPE per project — minimum eye protection, gloves, and where dry-powder MT is performed, a NIOSH-approved dust-particulate respirator for confined-area work. UV-A operations require approved UV-blocking eyewear and skin coverage.

---

*This procedure is a published reference. Production use requires Engineer-of-Record approval against the current AWS D1.1 edition. Generate a custom procedure for your weld geometry, loading class, and inspection environment at the [free AI Procedure Generator](/tools/ndt-procedure-generator).*
`;

const PT_AEROSPACE_ASTM_E165 = `
## 1. Scope

This procedure covers liquid penetrant examination (PT) of aerospace fasteners (high-tensile bolts, threaded fittings, and machined fastener forgings) using **fluorescent (Type I) and visible-dye (Type II)** penetrants in accordance with **ASTM E165 / E165M** and aerospace prime supplements (typically Boeing BAC 5424, Lockheed STP57-100, Airbus AITM 6-4001). Materials: precipitation-hardened stainless, titanium alloys (Ti-6Al-4V, Ti-5Al-2.5Sn), aluminum alloys, and high-strength low-alloy steels. Stress-corrosion-sensitive alloys (titanium, austenitic stainless, high-nickel) require halogen-and-sulfur-controlled penetrant chemistries per ASTM F519 supplement.

## 2. References

- ASTM E165 / E165M — Standard Practice for Liquid Penetrant Examination
- ASTM E1417 / E1417M — Standard Practice for Liquid Penetrant Testing
- ASTM E1209 / E1219 — Sensitivity-level qualification
- SAE AMS-2644 — Inspection Material, Penetrant
- NAS 410 / EN 4179 — Personnel qualification
- Customer Written Practice and aerospace prime PCD

## 3. Personnel Qualification

PT examination shall be performed by personnel certified to **NAS 410 Level II in PT** (or EN 4179 equivalent), with the prime-contractor procedure-specific authorization on file. Level III review per the customer's primary qualification chain.

## 4. Penetrant Material

Penetrants, removers, and developers shall be sourced from the same manufacturer's product family certified to **AMS 2644** Level **3 (High)** or Level **4 (Ultra-high)** sensitivity for aerospace fastener work. Type I (fluorescent), Method A (water-washable) is the most common combination; Method C (post-emulsifiable) may be specified for surface-roughness conditions. Each batch must carry a Certificate of Analysis verifying:

- Halogen content < 25 ppm (for titanium, austenitic, and Ni-base service)
- Sulfur content < 25 ppm (for the same)
- AMS-2644 batch sensitivity grade

## 5. Surface Preparation

Fasteners shall be **vapour degreased** (Type I trichloroethylene or AMS-2644-compatible alternative) and dried before penetrant application. Mechanical surface treatments — shot peening, grit blast, machining — shall be performed prior to PT or the surfaces shall be acid-etched to remove smear that masks indications. Plating, painting, or chemical conversion coatings must be removed in the inspection area.

## 6. Process Parameters

### 6.1 Temperature Range

Penetrant application: **10 °C (50 °F) to 38 °C (100 °F)**. For excursion outside this range, a comparator block per ASTM E1208 shall be processed alongside the production lot.

### 6.2 Penetrant Application

Spray, brush, dip, or immersion. Full and continuous wetting of the surface and threads. Dwell time: **10 minutes minimum, 30 minutes maximum** (Type I, Method A). Longer dwell required for tight cracks in machined surfaces — refer to ASTM E1417 Table 1.

### 6.3 Excess Penetrant Removal

Method A (water-washable): wash with low-pressure (≤ 40 psi / 280 kPa) water spray at **10-38 °C**. UV inspection during wash to prevent over-wash — stop when the part background reaches uniform dark (Type I).

### 6.4 Drying

Forced air at **≤ 71 °C (160 °F)**, time as needed to remove residual moisture — typically 5-10 minutes. Over-drying degrades indication formation.

### 6.5 Developer Application

Non-aqueous wet developer (Form D) is preferred for aerospace fastener work; aqueous suspendible (Form B) acceptable for batch processing. Apply as a fine, even mist — heavy developer films mask fine indications. Developer dwell: **10 minutes minimum, 60 minutes maximum**.

## 7. Examination

### 7.1 Type I (Fluorescent)

UV-A intensity at the examination surface: **≥ 1000 µW/cm²** measured with a calibrated UV-A radiometer. Ambient white light at the inspection booth: **≤ 20 lux (2 fc)**. Inspector eye adaption: **minimum 1 minute in darkroom**.

### 7.2 Type II (Visible Dye)

Minimum **500 lux (50 fc)** white-light illumination at the examination surface. Inspection performed under uniform light.

### 7.3 Magnification

Aerospace fastener examination shall be performed with **3× to 10× magnification** for the thread roots and underhead fillet, per the prime PCD.

## 8. Acceptance Criteria

Per the applicable aerospace prime PCD — typical fastener acceptance:

- **No crack-like indication permitted in the underhead fillet radius.**
- **No crack-like indication permitted in the thread root.**
- Rounded indication on shank: maximum **0.4 mm (0.015 in)**, isolated.
- Linear indication length-to-width ratio ≥ 3 — rejectable.
- Cluster of three or more rounded indications in a 6 mm length — rejectable.

## 9. Reporting

Per ASTM E1417 §10 — minimum: part number, lot number, serial number where applicable, material, processing date, penetrant material identity and batch, comparator block readings, examiner name and NAS 410 cert number, Level III sign-off, and disposition (accept / reject) of each indication. Records retained per prime contractor PCD — typically design life of the airframe.

## 10. Safety

Penetrants and removers contain organic solvents — local-exhaust ventilation required at application and removal stations. UV-A inspection requires UV-blocking eyewear and skin coverage. Halogen and sulfur control protocols per AMS 2644 — segregation of inspection materials approved for titanium / austenitic stainless service.

---

*This procedure is a published reference. Production use requires aerospace prime-specific PCD approval. Generate a custom fastener-PT procedure including the prime's exact dwell, wash, and acceptance limits at the [free AI Procedure Generator](/tools/ndt-procedure-generator).*
`;

const PAUT_API_579 = `
## 1. Scope

This procedure covers encoded phased-array ultrasonic testing (PAUT) of in-service piping, pressure vessels, and storage-tank components for the purpose of corrosion mapping and remaining-wall-thickness assessment to feed **API 579-1 / ASME FFS-1 Fitness-for-Service Level 2 evaluation**. Materials: carbon steel and low-alloy steel; thickness range **3 mm to 75 mm**. Component geometries: straight pipe, elbows (long-radius and short-radius), tank shells, and pressure vessel walls.

## 2. References

- API 579-1 / ASME FFS-1 — Fitness-for-Service, current edition
- ASME BPVC Section V, Article 4 Mandatory Appendix IV (PAUT)
- ASNT SNT-TC-1A or CP-189 plus ASNT ILI-PQ where applicable
- API 510 / 570 / 653 — for re-inspection trigger
- Customer Written Practice

## 3. Personnel Qualification

PAUT examination shall be performed by personnel certified to **ASNT NDT Level II in UT** with documented PAUT-specific training (minimum 40 contact hours theory + 80 hours application) per the employer's Written Practice. Procedure approval and interpretation against FFS Level 2 criteria shall be by a **Level III in UT** with API 579 familiarity.

## 4. Equipment

- PAUT instrument: 32:128 (32 active, 128 element addressable) or larger, e.g., Olympus OmniScan X3 / Sonatest Veo+ / Eddyfi M2M Gekko. Calibrated linearity (vertical, horizontal, control) within ±5% per ASME V Mandatory Appendix IV.
- Probe: 5L64-A12 or equivalent — 5 MHz, 64 elements, 12 mm pitch — coupled to a 0° wedge (compression-wave) for thickness mapping or a shear-wave wedge (typically SW45 / SW60) for flaw screening adjacent to corroded areas. For corrosion mapping, **0° compression with electronic scanning** is the typical configuration.
- Encoder: optical or magnetic-wheel encoder with resolution ≤ 0.5 mm and a verified accuracy of ±1% over 1 m of travel.
- Couplant: glycerin-based, water-based, or low-sulfur cellulose paste. Halogen-free for austenitic stainless.
- Reference block: step wedge cut from the same material as the production component, with steps spanning the expected thickness range; calibrated by an accredited cal lab within 12 months. Side-drilled holes per ASME V Mandatory Appendix IV.
- Calibrated thickness comparator (micrometer or 0° UT thickness gauge) for verification.

## 5. Surface Preparation

Examination surface shall be free of loose scale, weld spatter, paint scale that exceeds 0.25 mm, and surface irregularities that impair coupling. Surface roughness Ra ≤ 12.5 µm (500 µin) for encoded scanning; tighter where DAC sensitivity is required.

Coated surfaces: where coating < 0.5 mm is uniform and bonded, scanning may be performed through coating provided a coating-compensated thickness reference is established on a representative coupon. Where coating is loose or exceeds 0.5 mm, removal is required.

## 6. Calibration

### 6.1 Zero / Velocity Calibration

0° focal law calibrated for zero offset and material velocity using the reference step wedge. Velocity tolerance: **±0.3% of nominal** (e.g., 5920 m/s ±18 m/s for carbon steel).

### 6.2 Encoder Calibration

Encoder pulses-per-mm calibrated on a 1 m reference straight-edge. Tolerance: ±1%.

### 6.3 Sensitivity Calibration

For thickness mapping, sensitivity set so that the **first back-wall echo at maximum thickness reaches 80% ± 5% FSH**. DAC or TCG curve built from SDH responses across the thickness range of interest.

### 6.4 Verification Frequency

System verification on the reference block:

- Before scan campaign
- After every 4 hours of continuous use
- After any change of operator, probe, wedge, or cable
- At end of scan campaign

A change in back-wall echo amplitude > 2 dB or in measured thickness > 0.2 mm requires re-calibration and re-examination of all scans since the last valid verification.

## 7. Scan Plan

### 7.1 Coverage

Encoded raster scans with **index increment of 1 mm or finer** in the axial direction. Scan speed: ≤ 50 mm/s for raster; ≤ 100 mm/s for linear. Overlap between adjacent scans: ≥ 10% of probe aperture.

### 7.2 Data Storage

Full waveform data (A-scans plus encoder position) stored for every scan. File format: native to the PAUT instrument (e.g., .nde, .opd) for re-analysis. Backup copy stored within 24 hours.

### 7.3 Resolution Requirements

Pixel resolution in the resulting C-scan: **axial 1 mm × circumferential 1 mm or finer**. For pit-detection scans, 0.5 × 0.5 mm.

## 8. Analysis

### 8.1 Thickness Determination

Minimum remaining wall thickness (\`t_mm\`) determined from the C-scan as the lowest valid value within a defined assessment volume. Edge effects (probe pulse near-surface) and lateral wave artefacts excluded.

### 8.2 Local Thin Area (LTA) Mapping

LTAs identified per API 579 Part 5 — flaw length \`s\`, width \`c\`, and \`R_t = t_mm / t_nom\` recorded for every contiguous region where \`t_mm < t_nom - 0.5 mm\` OR per the customer corrosion-rate-action threshold.

### 8.3 Output

PAUT analysis output for FFS evaluation:

- Minimum remaining-wall-thickness contour map (C-scan)
- LTA geometry table (length, width, R_t, axial / circumferential position)
- Corrosion-rate calculation against the last-inspection record
- Remaining-life calculation per API 579 Part 4 Level 1 screening criteria

## 9. Acceptance / FFS Routing

Results route to API 579 evaluation as follows:

- **R_t ≥ 0.8 AND LTA length s ≤ s_max per Table 5.4** → Level 1 acceptable, document.
- **R_t < 0.8 OR s > Level 1 limit** → escalate to Level 2 numerical evaluation.
- **R_t < 0.5 OR through-wall** → immediate isolation, repair planning per customer Mechanical Integrity program.

## 10. Reporting

Per ASME V Mandatory Appendix IV §IV-T-490 — minimum: customer and asset ID; circuit / line ID; material and nominal thickness; probe and wedge identity; encoder resolution; software and software version; scan-plan diagram; raw data archive identifier; reduced thickness map; LTA table; corrosion-rate and remaining-life calculation; examiner name and certification; Level III sign-off and API 579 evaluation routing.

## 11. Safety

Standard plant safety rules apply. PAUT-specific: ergonomic management of overhead encoded scanning, eye protection for above-shoulder work, and confined-space entry procedures for in-vessel scanning. Coupling-fluid disposal per plant environmental procedures.

---

*This procedure is a published reference. Production use for FFS feed requires Level III approval and API 579 SME review. For a tailored scan plan covering your asset geometry, expected corrosion morphology, and FFS routing, use the [free AI Procedure Generator](/tools/ndt-procedure-generator).*
`;

const TOFD_B31_3 = `
## 1. Scope

This procedure covers Time-of-Flight Diffraction (TOFD) examination of process-piping girth welds and longitudinal seam welds in carbon-steel and low-alloy-steel piping fabricated to **ASME B31.3 Process Piping**. It is applied alongside or in lieu of radiography per ASME B31.3 §344.6.2 with Owner approval, qualified per **ASME BPVC Section V, Article 4 Mandatory Appendix III**. Wall thickness range: **6 mm (¼ in) to 75 mm (3 in)**. Outside diameter range: **NPS 4 (114 mm) and greater**.

## 2. References

- ASME B31.3 — Process Piping, current edition
- ASME BPVC Section V, Article 4 Mandatory Appendix III (TOFD)
- ASME BPVC Section V, Article 4 Mandatory Appendix VIII (TOFD Demonstration)
- ASTM E2373 / E2373M — TOFD Examination Practice
- ASNT SNT-TC-1A or CP-189 plus instrument-specific TOFD training (minimum 40 hr theory, 80 hr application)
- Customer Written Practice

## 3. Personnel Qualification

TOFD examination shall be performed by an **ASNT NDT Level II in UT** with documented TOFD training and demonstrated competence per Mandatory Appendix VIII. Procedure approval and final interpretation shall be by a **Level III** with TOFD-specific certification.

## 4. Equipment

- TOFD instrument: digital, gated A-scan with B-scan and D-scan display. Examples: Olympus OmniScan X3 (TOFD module), Sonatest Veo+, Eddyfi M2M Gekko.
- Probe pair: **two longitudinal-wave compression-mode transducers**, frequency 5 MHz or 10 MHz selected per thickness band (10 MHz for ≤ 25 mm; 5 MHz for 25 mm – 75 mm), element 6 × 6 mm to 10 × 10 mm. Beam-spread angle (refracted longitudinal angle) selected to give a single TOFD coverage zone — typically 60° or 70° for ¼ wall thickness.
- Wedges: matched pair, refracted-angle selected per the thickness band; wedge delay verified on the calibration block.
- Encoder: optical or magnetic-wheel, resolution ≤ 0.5 mm.
- Couplant: low-sulfur cellulose paste (or glycerin / water-based per material compatibility).
- Calibration block: per Figure T-434.1 with side-drilled holes; supplemental block with through-wall thickness and a known notch or SDH to verify TOFD diffraction signature.

## 5. Surface Preparation and Geometry

Scan surface roughness: Ra ≤ 6.3 µm (250 µin). Weld cap shall not exceed **3 mm reinforcement** for the scan plane. Where reinforcement exceeds this, grinding flush is required for the scan area.

Probe Centre Spacing (PCS) — determined from a single-zone or multi-zone coverage diagram:

\`\`\`
PCS = 2 × (Wall Thickness) × tan(refracted angle)
\`\`\`

For 12 mm wall × 60° refracted angle: PCS = 41.6 mm.

## 6. Calibration

### 6.1 Wedge-Delay Calibration

Performed on a reference block of the same material and thickness as the production weld, using the side-drilled holes and the calibration-block back-wall. Wedge delay set such that the lateral wave appears at the correct time-of-flight per the geometry.

### 6.2 Sensitivity Calibration

Lateral wave amplitude set to **70% to 100% FSH** of full screen. Sensitivity gain noted; scan gain typically 6 dB above this reference.

### 6.3 Verification Frequency

System verification on the reference block:

- Before scan campaign
- After every 4 hours of continuous use
- After any change of operator, probe, wedge, cable
- At end of scan

A change of > 20% in lateral wave amplitude or > 6 dB in DAC across the back-wall response requires re-calibration and re-scanning since the last valid verification.

## 7. Examination

### 7.1 Coverage

Single-zone or multi-zone coverage diagrams generated for the specified wall thickness, weld preparation, and probe geometry. Mandatory Appendix III Table III-432.1 governs multi-zone schemes for wall thickness above 50 mm. For each circumferential pass, a near-side and far-side scan is recorded — the dead zones (lateral wave dead zone near the surface, and the back-wall dead zone) are addressed by complementary pulse-echo angle-beam scans per Mandatory Appendix III §III-460.

### 7.2 Scan Speed

Maximum encoded scan speed: **100 mm/s** to ensure data point density and signal-to-noise.

### 7.3 Coupling Verification

Continuous monitoring of lateral wave amplitude during the scan — loss > 6 dB sustained over 25 mm requires re-scanning.

## 8. Data Analysis

Analysis performed offline in the manufacturer's analysis software (e.g., Olympus TomoView, M2M Capture).

### 8.1 Flaw Detection

Diffraction tip-signal pairs (top and bottom tips of an embedded planar reflector) located in the time-of-flight domain. Through-wall extent measured from the time-of-flight separation between tip signals.

### 8.2 Sizing Accuracy

TOFD sizing accuracy per Appendix VIII demonstrated:

- Through-wall extent: ±1 mm for thickness ≤ 25 mm; ±1.5 mm for thickness 25 – 75 mm
- Length: ±10 mm or 10%, whichever is greater

### 8.3 Dead-Zone Compensation

Lateral-wave dead zone and back-wall dead zone addressed by:

- Complementary pulse-echo scans at 45° and 60° angle-beam
- Or twin-probe TOFD with offset PCS to overlap dead zones

## 9. Acceptance Criteria

Per ASME B31.3 Table 341.3.2 and Mandatory Appendix III §III-465 — typical for Severe Cyclic / Category M service:

- **Cracks, lack of fusion, lack of penetration:** rejectable regardless of size.
- **Other linear indications:** rejectable if through-wall extent > 1/3 × wall thickness OR length > 12 mm OR amplitude > 100% of reference (Mandatory Appendix III §III-465.1.1).
- **Volumetric (slag, porosity):** rejectable if through-wall extent > 1/3 × wall thickness OR aggregate length > wall thickness in any 12 × wall thickness length.

Customer acceptance criteria (e.g., Owner-imposed B31.3 Severe Cyclic) may be more stringent.

## 10. Reporting

Per Mandatory Appendix III §III-490 — examination data archive (raw and reduced), instrument settings, probe and wedge identification, encoder calibration record, scan-plan diagram with multi-zone coverage, flaw table with through-wall extent and length, lateral-wave and back-wall reference traces from start and end of campaign, examiner name and certification, Level III sign-off, and disposition per the acceptance criteria.

## 11. Safety

Standard plant safety. TOFD-specific: pinch-hazard awareness during encoder scanning around piping; eye and back protection for elevated or overhead scans; coupling-fluid disposal per plant environmental procedures.

---

*This procedure is a published reference. Production use requires Owner Inspector approval against the current ASME B31.3 edition and the customer Mechanical Integrity program. Generate a custom multi-zone TOFD plan including PCS, focal laws, and acceptance criteria at the [free AI Procedure Generator](/tools/ndt-procedure-generator).*
`;

const UT_TANK_API_653 = `
## 1. Scope

This procedure covers manual ultrasonic thickness measurement (UTM) of aboveground storage tank (AST) shells, floors, and roofs constructed and inspected to **API 653 (Tank Inspection, Repair, Alteration, and Reconstruction)**. Carbon-steel and low-alloy-steel tanks; thickness range **3 mm to 50 mm**. Floor scanning when AST is empty and gas-freed; shell and roof scanning may be in-service depending on access and customer JSA.

## 2. References

- API 653 — Tank Inspection, Repair, Alteration, and Reconstruction, current edition
- API 575 — Inspection Practices for Atmospheric and Low-pressure Storage Tanks
- ASME BPVC Section V, Article 23 — UT thickness measurement
- ASTM E797 / E797M — Standard Practice for Measuring Thickness by Manual Ultrasonic Pulse-Echo
- ASNT SNT-TC-1A or CP-189
- Customer Mechanical Integrity Program / Written Practice

## 3. Personnel Qualification

UTM shall be performed by personnel certified to **ASNT NDT Level II in UT** per the employer's Written Practice meeting SNT-TC-1A or CP-189. Tank Inspector responsible for the assessment shall hold a current **API 653 certification** (API Individual Certification Program).

## 4. Equipment

- Digital UT thickness gauge (e.g., Olympus 38DL Plus, GE DM5E, Krautkrämer DMS 2) with calibrated A-scan display preferred for accurate gating on corroded surfaces. Resolution: 0.01 mm. Linearity verified per ASTM E797 §6.
- Dual-element probe **5 MHz, 12.5 mm diameter** for general scanning; **7.5 MHz, 6.4 mm** for areas of high pitting or restricted access. Single-element 0° probes for areas where A-scan interpretation of subsurface laminations is required.
- Couplant: glycerin-based, water-based, or grease-type compatible with the tank service fluid. Halide content ≤ 25 ppm where austenitic floor strips are encountered.
- Calibration step block — material-matched to the tank steel — covering the thickness range of measurement. Block calibrated by an accredited cal lab within 12 months.
- Surface-preparation tools: power wire wheel, surface grinder, or sandblast as required by surface condition.

## 5. Surface Preparation

Coating removal where coating exceeds 0.25 mm or is loose. For epoxy-coated tank floors and corroded shells, grit-blast to SSPC SP-6 commercial blast or finer at each examination spot. Surface roughness Ra ≤ 12.5 µm.

For pit-prone areas, **light grinding with a flap disc** is preferred to preserve actual remaining wall — aggressive grinding falsifies the reading.

## 6. Calibration

### 6.1 Velocity / Zero Calibration

Calibrated on the step block at the start of each shift, after any probe or cable change, and at the end of each shift. Velocity tolerance: **±0.5% of nominal**. Zero-offset tolerance: ±0.05 mm.

### 6.2 Verification Frequency

Verification on a known-thickness coupon of the tank material:

- Every **2 hours** during continuous measurement
- After any temperature change > 10 °C from the calibration ambient

Drift > 0.1 mm requires re-calibration and re-measurement of all readings taken since the last valid verification.

## 7. Examination

### 7.1 Shell Scanning Pattern (Course Inspection per API 653 §4.3.3)

Minimum coverage per Table 6.1:

- Course thickness measurement: minimum **8 readings per course on each course**, evenly distributed around the circumference, taken at the 1/4-height of the course
- Minimum-Thickness Readings (MTR): minimum **at every observed corroded area** plus the lowest of the eight readings per course

Pit measurement: A-scan UT to confirm pit depth, supplemented by pit gauge where the pit is open.

### 7.2 Floor Scanning

Magnetic Flux Leakage (MFL) is the standard floor-screening method; this procedure covers **the UT follow-up of MFL anomalies and the verification of remaining floor-plate thickness**. UT readings taken at every MFL indication where the indication mark-and-paint matches a thickness loss > 20% per the MFL crew's acceptance criteria.

### 7.3 Roof Scanning

Where the roof is suspect (cone, dome, internal floating roof), readings on a grid per the Tank Inspector's scan plan — typically 600 mm centres for the primary roof surface; 300 mm centres where coating wear or wet insulation is evident.

## 8. Corrosion-Rate Determination

Long-term corrosion rate (LT-CR) per API 653 §4.4.4:

\`\`\`
LT-CR = (t_initial - t_actual) / (years in service)
\`\`\`

Short-term corrosion rate (ST-CR) from the previous inspection:

\`\`\`
ST-CR = (t_previous - t_actual) / (years between inspections)
\`\`\`

Controlling rate: the higher of LT-CR and ST-CR per §4.4.4.2.

## 9. Acceptance / Minimum Acceptable Remaining Thickness

Per API 653 §4.3.3.1 and §4.4:

- **Shell minimum thickness:** \`t_min = (2.6 × D × (H − 1) × G) / (S × E)\`
  - where D = nominal tank diameter (ft), H = height of fluid above the course bottom (ft), G = specific gravity, S = allowable stress (psi), E = joint efficiency.
- **Bottom plate minimum:** 0.10 inch (2.54 mm) per §4.4.5.1, OR per the corrosion-rate-anchored projection that gives a 10-year remaining life.
- **Critical zone (3 inches from chime weld):** 0.10 inch (2.54 mm) per §4.4.5.2.

A reading below t_min, OR a remaining life < 5 years, OR a critical-zone reading below 0.10 inch — escalate to the API 653 Tank Inspector for re-rate / repair planning.

## 10. Reporting

Per API 653 §6 — minimum: tank ID; date and inspector; equipment serial numbers (UT gauge, probe, cable); calibration block ID and calibration certificate number; couplant; surface preparation; full reading set with location identifier; minimum reading per course; LT-CR and ST-CR; t_min calculated for each course; remaining-life projection; signed by the Tank Inspector (API 653 certified).

## 11. Safety

Tank-entry permits per the customer Confined Space Entry program. Gas-freeing verified by competent person; LEL ≤ 10%, O₂ between 19.5% and 23.5%, H₂S < 10 ppm, benzene < occupational limit. Rescue plan with retrieval equipment in place before entry. Hot-work permits for any grinding inside the tank. Coupling-fluid disposal per plant procedure.

---

*This procedure is a published reference. Production use requires API 653 Tank Inspector approval and customer Mechanical Integrity program alignment. Generate a custom tank-UT plan including grid layout and corrosion-rate trending at the [free AI Procedure Generator](/tools/ndt-procedure-generator).*
`;

const RT_CASTINGS_ASME = `
## 1. Scope

This procedure covers radiographic examination of carbon-steel and low-alloy-steel castings used in ASME pressure-bearing service — pump and valve bodies, ASME BPVC Section VIII Division 1 and Division 2 fittings, and ASME B16.34 valve bodies. Wall thickness range: **6 mm to 200 mm**. Material classes: per ASTM A216, A217, A352, A487 typical for pressure-bearing applications.

## 2. References

- ASME BPVC Section V, Article 2 — Radiographic Examination
- ASME BPVC Section VIII Division 1, UG-77, UCS-57; Division 2, 7.5
- ASTM E446 — Reference Radiographs for Steel Castings up to 50 mm
- ASTM E186 — Reference Radiographs for Steel Castings 50–115 mm
- ASTM E280 — Reference Radiographs for Steel Castings 115–305 mm
- ASTM E1742 — Standard Practice for Radiographic Examination
- ASNT SNT-TC-1A / CP-189

## 3. Personnel Qualification

Radiographic examination by **ASNT NDT Level II in RT**; interpretation against reference radiographs by **Level II** with documented experience in casting interpretation; Level III sign-off for non-routine indications and on the procedure itself.

## 4. Equipment

- Source: **Ir-192** for steel thickness 12 – 65 mm; **Co-60** for 50 – 200 mm; **X-ray (450 kVp – 1 MV)** for surface-sensitive thin or moderate-thickness castings where focal-spot geometry favours sensitivity. Source activity per a calibrated exposure chart.
- Industrial radiographic film: Class I (ISO 11699 fine-grain) for primary examinations; lead intensifying screens 0.13/0.25 mm.
- Source-to-film distance per the geometric-unsharpness limit:

\`\`\`
Ug = (F × t) / D ≤ 0.5 mm for t ≤ 50 mm
\`\`\`

- ASTM E747 wire-type IQI in the production material — essential wire per ASME V Article 2 Table T-233.1 / T-233.2.
- Lead identification markers and shot identifiers.
- Variable-intensity film viewer; calibrated densitometer.

## 5. Surface Preparation

Casting surface free of moulding sand, loose oxide, and machining chips. Surface irregularities (riser stumps, parting-line flash) that would obscure a radiographic indication shall be ground or machined per the casting drawing's NDT note.

## 6. Technique

### 6.1 Single-Wall Single-Image (SWSI) — Preferred

Used for all castings where source-and-film access permits. Multiple shots arranged to cover the casting per a written shot map; minimum coverage: every wall thickness change and every prescribed inspection zone of the casting drawing.

### 6.2 IQI Placement

Source-side preferred per ASME V Article 2 §T-277. Film-side acceptable only where source-side is mechanically impossible; in that case, the radiograph must demonstrate that the additional film-side wire of the IQI table is visible.

## 7. Film Density and Sensitivity

### 7.1 Film Density

Through the area of interest: **1.8 to 4.0** (single-film viewing); **2.6 to 4.0** (composite viewing with two films). Maximum density variation across the area of interest: 30%.

### 7.2 IQI Sensitivity

Smallest essential wire visible per ASME V Article 2 Table T-276 — typical for castings:

- 6 – 19 mm thickness: 2T sensitivity equivalent to wire size #6
- 19 – 38 mm: wire #8
- 38 – 65 mm: wire #10
- 65 – 100 mm: wire #11

## 8. Interpretation

Castings interpreted against the appropriate ASTM Reference Radiograph (E446 / E186 / E280) for **discontinuity type and severity level**.

Discontinuity types per ASTM:

- **A — Gas porosity** (Severity 1 to 5)
- **B — Sand and slag inclusions**
- **C — Shrinkage** (sub-types CA / CB / CC / CD)
- **D — Cracks** (hot tears and cold cracks)
- **E — Insufficient penetration / cold shut**
- **F — Inclusion-type defects**

Each indication classified by type and severity level by comparison to the matching reference radiograph at the same thickness range.

## 9. Acceptance Criteria

Per the casting drawing / specification — typical ASME pressure-bearing service per Section VIII Division 1 UG-77 and UCS-57:

- **Cracks (Type D, all sub-types): rejectable, regardless of severity.**
- **Hot tears (Type D-HT): rejectable.**
- **Type A porosity, Type B inclusions, Type C shrinkage: maximum severity level per the casting drawing — typical limits Severity 1 for Class A castings, Severity 2 for Class B, Severity 3 for Class C** (where the casting class is called out in the design specification).

The casting drawing or material specification governs final acceptance; in the absence of a more specific limit, ASTM E446 Severity Level 3 applies for ASME Class B pressure-bearing service.

## 10. Repair and Re-Examination

Defects shall be removed by grinding or excavation per the casting Repair Welding Procedure (RWP). Repair-welded areas shall be re-examined by the same RT procedure plus MT or PT of the repair-weld surface per the controlling welding specification (typically ASME Section IX qualified).

## 11. Reporting

Per ASME V Article 2 §T-291 — examination report including: casting identifier, drawing and revision, material, equipment used, source identity and activity, SFD, exposure time, film type, IQI sensitivity confirmation, density readings, ASTM reference-radiograph match (type and severity) for every recordable indication, examiner name and certification, Level III sign-off, and disposition.

## 12. Safety

Compliance with 10 CFR Part 34. Restricted-area boundary at 2.0 mSv/hr; controlled-area boundary at 0.05 mSv/hr. Personnel dosimetry with audible alarm. Source-retraction verification by survey-meter reading after every shot.

---

*This procedure is a published reference. Production use requires customer / AI approval against the current code edition and the casting class. Generate a casting-specific RT plan with the exact ASTM severity limit and shot map at the [free AI Procedure Generator](/tools/ndt-procedure-generator).*
`;

const MT_PIPELINE_API_1104 = `
## 1. Scope

This procedure covers **wet fluorescent magnetic-particle (WFMT)** examination of cross-country pipeline girth welds in carbon-steel and low-alloy-steel transmission pipelines per **API 1104**, current edition. It is intended as a **supplementary surface-examination method** where RT is not feasible (e.g., field-weld zones with restricted radiation access, repair welds, or thin-wall welds where small surface cracks govern weld quality). Wall thickness range: **6 mm to 25 mm**.

## 2. References

- API 1104 — Welding of Pipelines and Related Facilities, current edition (Section 9 acceptance and Section 11 NDT)
- ASTM E709 — Standard Guide for Magnetic Particle Examination
- ASTM E1444 / E1444M — Standard Practice for MT
- 49 CFR §192 / §195
- ASNT SNT-TC-1A or CP-189

## 3. Personnel Qualification

MT examination shall be performed by **ASNT NDT Level II in MT**, qualified per a Written Practice that meets SNT-TC-1A or CP-189. Level III review per the customer Written Practice and 49 CFR.

## 4. Equipment

- AC yoke prod certified for **4.5 kg lift at 200 mm pole spacing** (e.g., Magnaflux Y-7, Parker B310S). Lift test at start of each shift; documented.
- Fluorescent wet MT bath compliant with AMS 3041 — concentration measured by centrifuge tube (settling test) per ASTM E1444 §6 — typical fluorescent bath concentration **0.1 – 0.4 mL/100 mL**.
- UV-A lamp (LED or mercury vapour) with measured intensity **≥ 1000 µW/cm² at 38 cm (15 in)** at the examination surface.
- White-light meter for booth ambient (≤ 20 lux) and UV-A radiometer (within 12-month calibration).
- Field-direction indicator (pie gauge) and magnetic-flux strip indicators.
- Background-paint: non-fluorescing white background where coating contrast aids interpretation.

## 5. Surface Preparation

Examination surface (the weld plus 25 mm of adjacent base metal on each side) shall be free of:

- Weld spatter, paint scale, slag, and loose mill scale
- Oil, grease, and moisture
- Coating thicker than 0.05 mm (0.002 in) over the examination area

Where the pipeline coating is fusion-bonded epoxy (FBE) or three-layer-polyethylene (3LPE), local removal in the inspection zone is required — coatings of these thicknesses block MT.

## 6. Magnetization

### 6.1 Yoke Placement

AC yoke prods placed across the weld with pole spacing **75 mm – 200 mm**. Magnetization applied in **two perpendicular directions** at each examination area.

### 6.2 Particle Application

Wet fluorescent bath applied as a low-velocity flood while current is on (continuous method) — applied by squeeze-bulb sprayer or low-pressure hose; not by high-velocity spray that washes away indications.

### 6.3 Field-Strength Verification

Field strength verified using a pie gauge or magnetic field indicator on the examination surface at the most distant point from the prods — indicator shall produce a clearly defined pattern of magnetic flux.

## 7. Examination Conditions

- White-light ambient at the inspection booth: **≤ 20 lux (2 fc)**
- UV-A intensity at the examination surface: **≥ 1000 µW/cm²**
- Examiner dark-adaption: **≥ 1 minute**
- UV-protective eyewear required (visible-light-transmitting yellow lens)

Examination performed immediately after the magnetization is removed — wet fluorescent particles continue to indicate until they dry; do not allow drying before observation.

## 8. Indication Classification

Indications classified per API 1104 §9.6:

- **Crack:** any linear indication is treated as a crack until proven otherwise by removal and re-examination. Rejectable.
- **Linear indication:** length ≥ 3× width. Length > **3 mm in any 25 mm of weld** is rejectable per §9.6.2.
- **Rounded indication:** length < 3× width. Rounded indication > **3 mm major dimension** is rejectable per §9.6.3.
- **Cluster:** four or more rounded indications in any 25 mm of weld where their cluster falls within a 12 mm circle — rejectable per §9.6.4.

Non-relevant indications (geometric, magnetic-writing, dirt) shall be identified by mechanical cleaning and re-examination; if the indication re-appears, treat as relevant.

## 9. Repair and Re-Examination

Defects removed by grinding to a depth where the indication is no longer visible by re-MT examination. Cavity dimension verified per the pipeline repair procedure (typically not to exceed the limits of API 1104 §10). Re-welded repairs re-examined by both RT and MT per Section 11.

## 10. Reporting

Per API 1104 §11.4 — minimum: pipeline / spread / station number; weld number; date; technician number and ASNT certification; equipment serial numbers; bath concentration and certification batch; UV-A intensity verified at the examination location; field-direction verification result; sketch / weld map with location, length, orientation, and classification of every recordable indication; disposition and re-examination record where applicable.

Records retained per 49 CFR §192.243 / §195.234.

## 11. Safety

PPE per project — minimum eye protection (UV-blocking), gloves, and skin coverage. Bath solvent management per local environmental authority — typical kerosene-based fluorescent baths are flammable; storage and disposal per project HAZMAT plan. Yoke-cable inspection daily for nicks or cuts that compromise insulation. Confined-space considerations for tie-in welds in stations.

---

*This procedure is a published reference. Production use requires customer / AI approval against the current API 1104 edition. Generate a custom WFMT procedure including bath chemistry, UV intensity zone, and acceptance limits at the [free AI Procedure Generator](/tools/ndt-procedure-generator).*
`;

const VT_AWS_D1_1 = `
## 1. Scope

This procedure covers **visual examination (VT)** of high-strength bolted connections and welded joints in structural-steel buildings, bridges, and stadiums fabricated to **AWS D1.1 Structural Welding Code — Steel** and the **RCSC Specification for Structural Joints Using High-Strength Bolts**. Material class: ASTM A36, A572, A992 and other carbon and low-alloy structural steels. Fastener grades A325, F1852, A490, F2280 covered.

## 2. References

- AWS D1.1 — Structural Welding Code — Steel, Clause 8.9 (visual)
- RCSC Specification for Structural Joints Using High-Strength Bolts, current edition
- AISC 360 — Specification for Structural Steel Buildings
- AISC Code of Standard Practice
- ASNT SNT-TC-1A or AWS QC1 (CWI)

## 3. Personnel Qualification

VT examination of welded joints shall be performed by an **AWS Certified Welding Inspector (CWI)** or equivalent (CAWI, CWI, SCWI) holding a current certification. VT of bolted joints by a structural-steel inspector qualified per the project quality plan and AISC 360 §N3.

## 4. Equipment

- Visual aids — 6× to 10× hand-held magnifying lens; weld gauge set (Cambridge / Bridge / Fillet) calibrated; pit gauge; depth gauge; ruler / tape measure; mirror for inaccessible weld toes; flashlight (≥ 1000 lumens) for blind areas.
- Light meter — illumination at the surface to be examined: **≥ 1000 lux (≥ 100 fc)** per AWS D1.1 §8.13.4.
- For bolted joints: **calibrated DTI (Direct Tension Indicator) feeler gauge, calibrated load-indicating washer micrometer, or torque wrench** per the RCSC pre-tensioning method specified.

## 5. Examination Conditions

- Lighting: **≥ 1000 lux** at the examination surface. Where ambient is below this, supplemental task lighting required.
- Examiner eye-test: documented vision certification within 12 months — Snellen 20/30 or better (uncorrected or corrected), Jaeger J2 near-vision at 305 mm.
- Surface condition: cleaned of weld spatter, slag, and surface contamination that masks indications. Mill scale is acceptable; loose scale is not.
- Temperature: ambient. No examination during precipitation, on wet surfaces, or where condensation would impair visibility.

## 6. Welded Joint Examination

### 6.1 Coverage

Examination shall cover the entire weld length, both sides where accessible, and the adjacent 25 mm of base metal on each side of the weld toe.

### 6.2 Inspection Sequence

- **Before welding** (AWS D1.1 §8.9.1): joint preparation, fit-up, alignment, joint geometry per the WPS, pre-heat (where required), and material identification.
- **During welding** (§8.9.2): inter-pass temperature, slag removal between passes, weld bead profile per the WPS.
- **After welding** (§8.9.3): final weld profile, weld size, weld length, contour, surface condition, and any visual indication of defects.

### 6.3 Acceptance Criteria (AWS D1.1 §8.9.1 — Statically Loaded)

- **Cracks:** any crack is rejectable. Includes surface cracks, crater cracks, and toe cracks.
- **Weld fusion:** thorough fusion between weld metal and base metal and between layers of weld metal required.
- **Crater cross-section:** craters shall be filled.
- **Weld profile:** per Figure 5.4 — convexity within limits; weld toes shall blend smoothly into the base metal.
- **Undercut:** > 1 mm (1/32 in) deep — rejectable.
- **Overlap:** rejectable.
- **Porosity (visible / piping):** rejectable when the visible discontinuity (in a fillet weld or in any weld within 6 mm of the surface for a CJP groove weld in tension) exceeds limits of §8.9.1.5:
  - Pipe porosity > 1 mm in a 25 mm length OR aggregate > 10 mm in 100 mm.
- **Weld size:** fillet shall not be less than the specified size for more than 10% of the weld length per §8.9.1.

For **cyclically loaded (fatigue-critical)** weldments per §8.9.2, the limits tighten — no visible cracks, no porosity, undercut limited to 0.25 mm where transverse to the principal stress, and weld-toe-blending verified.

## 7. Bolted Joint Examination

### 7.1 Snug-Tight Condition (RCSC §8.1)

- Bolt heads and nut faces firmly seated against the joint surfaces.
- Sufficient pre-installation visible to indicate the bolt has been driven home — no gaps under the head or washer.

### 7.2 Pre-Tensioned Bolts (RCSC §8.2)

Verified by the **method specified in the contract** — one of:

- **Turn-of-Nut method (RCSC §8.2.1):** snug-tight, then specified additional rotation per RCSC Table 8.1.
- **Calibrated Wrench (RCSC §8.2.2):** torque applied to achieve at least the specified pretension, verified by Skidmore-Wilhelm calibration each shift.
- **Twist-off-type tension-control bolts (TC bolts, RCSC §8.2.3):** spline shear-off verified visually.
- **Direct Tension Indicator (DTI) washers (RCSC §8.2.4):** gap at the prescribed dimensions per the DTI manufacturer's calibrated feeler gauge.

### 7.3 Pre-Installation Verification

For pre-tensioned and slip-critical joints, **3 bolts from each combination of bolt, nut, and washer** verified by Skidmore-Wilhelm load cell or DTI calibration before installation. Records retained per RCSC §8.2.4.

## 8. Reporting

Per AWS D1.1 §8.13.5 and the project quality plan — minimum: project, drawing, member ID, weld or bolt connection ID, weld procedure / bolt type, examiner name and AWS CWI certification, lighting verified (lux value), date / time, sketch with location and disposition of every recordable indication, repair and re-examination record where applicable, and CWI signature.

## 9. Safety

PPE per project — minimum hard hat, eye protection, hearing protection where applicable, fall-arrest for elevated work, and high-visibility apparel on active construction sites. Hot-work proximity restrictions where grinding or cutting is in progress.

---

*This procedure is a published reference. Production use requires Engineer-of-Record approval and project quality plan alignment. Generate a project-specific VT plan including the exact bolting method, fatigue-class limits, and acceptance gauges at the [free AI Procedure Generator](/tools/ndt-procedure-generator).*
`;

export const procedureExamples: ProcedureExample[] = [
  {
    slug: 'ut-pressure-vessel-asme-v',
    method: 'UT',
    industry: 'Pressure Vessels',
    standard: 'ASME Section V',
    title: 'Ultrasonic Testing Procedure for Pressure Vessel Welds (ASME Section V)',
    summary:
      'Conventional UT examination procedure for full-penetration welds on ASME pressure vessels — calibration, scanning, acceptance criteria per ASME BPVC Section V Article 4 and Section VIII Division 1 Mandatory Appendix 12.',
    body: UT_PRESSURE_VESSEL,
  },
  {
    slug: 'rt-pipeline-weld-api-1104',
    method: 'RT',
    industry: 'Oil & Gas Pipelines',
    standard: 'API 1104',
    title: 'Radiographic Testing Procedure for Pipeline Girth Welds (API 1104)',
    summary:
      'Ir-192 / Se-75 / X-ray procedure for pipeline girth welds — exposure setup, IQI placement, SWSI / DWSI / DWDI techniques, and acceptance criteria per API 1104 Section 9.',
    body: RT_PIPELINE_API_1104,
  },
  {
    slug: 'mt-structural-weld-aws-d1-1',
    method: 'MT',
    industry: 'Structural Steel',
    standard: 'AWS D1.1',
    title: 'Magnetic Particle Testing Procedure for Structural Welds (AWS D1.1)',
    summary:
      'Yoke-method MT procedure for structural-steel weldments per AWS D1.1 Clause 8 — magnetization in two directions, indication evaluation, statically and cyclically loaded acceptance criteria.',
    body: MT_STRUCTURAL_AWS_D1_1,
  },
  {
    slug: 'pt-aerospace-fastener-astm-e165',
    method: 'PT',
    industry: 'Aerospace',
    standard: 'ASTM E165',
    title: 'Liquid Penetrant Testing Procedure for Aerospace Fasteners (ASTM E165)',
    summary:
      'Type I fluorescent / Type II visible-dye penetrant procedure for safety-critical aerospace fasteners — AMS-2644 Level 3/4 sensitivity, halogen and sulfur control for titanium and austenitic stainless service.',
    body: PT_AEROSPACE_ASTM_E165,
  },
  {
    slug: 'paut-corrosion-mapping-api-579',
    method: 'PAUT',
    industry: 'Refining / FFS',
    standard: 'API 579',
    title: 'Phased Array UT Procedure for Corrosion Mapping (API 579 FFS)',
    summary:
      'Encoded PAUT C-scan procedure for wall-loss mapping on in-service piping and pressure equipment — feeds Level 1 and Level 2 fitness-for-service evaluation per API 579-1.',
    body: PAUT_API_579,
  },
  {
    slug: 'tofd-girth-weld-asme-b31-3',
    method: 'TOFD',
    industry: 'Process Piping',
    standard: 'ASME B31.3',
    title: 'TOFD Procedure for Process Piping Girth Welds (ASME B31.3)',
    summary:
      'Time-of-flight diffraction procedure for ASME B31.3 process-piping welds — probe pairing, PCS, multi-zone coverage, dead-zone compensation, and acceptance per ASME V Article 4 Mandatory Appendix III.',
    body: TOFD_B31_3,
  },
  {
    slug: 'ut-storage-tank-api-653',
    method: 'UT',
    industry: 'Aboveground Storage Tanks',
    standard: 'API 653',
    title: 'Ultrasonic Thickness Measurement Procedure for AST Floors and Shells (API 653)',
    summary:
      'UT thickness procedure for aboveground storage tank shells, bottoms, and roofs per API 653 — grid layout, corrosion-rate calculation, t_min derivation, and remaining-life assessment.',
    body: UT_TANK_API_653,
  },
  {
    slug: 'rt-castings-asme-bpvc-v',
    method: 'RT',
    industry: 'Foundry / Castings',
    standard: 'ASME BPVC Section V',
    title: 'Radiographic Testing Procedure for Steel Castings (ASME BPVC Section V)',
    summary:
      'RT procedure for carbon and low-alloy steel castings — source selection, technique sheets, and discontinuity classification per ASME BPVC Section V Article 2 with ASTM E446 / E186 / E280 reference radiographs.',
    body: RT_CASTINGS_ASME,
  },
  {
    slug: 'mt-pipeline-girth-api-1104',
    method: 'MT',
    industry: 'Oil & Gas Pipelines',
    standard: 'API 1104',
    title: 'Magnetic Particle Testing Procedure for Pipeline Girth Welds (API 1104)',
    summary:
      'Wet fluorescent MT procedure for cross-country pipeline girth welds per API 1104 Section 9 — applicable as a supplementary surface examination or where RT is not feasible.',
    body: MT_PIPELINE_API_1104,
  },
  {
    slug: 'vt-bolted-joint-aws-d1-1',
    method: 'VT',
    industry: 'Structural Steel',
    standard: 'AWS D1.1',
    title: 'Visual Testing Procedure for Bolted and Welded Joints (AWS D1.1)',
    summary:
      'VT procedure covering high-strength bolted and welded structural connections per AWS D1.1 Clause 8.9 and RCSC Specification — lighting, gauge calibration, snug-tight / pre-tensioned bolting methods, weld-profile acceptance.',
    body: VT_AWS_D1_1,
  },
];

export function getExampleBySlug(slug: string): ProcedureExample | undefined {
  return procedureExamples.find((e) => e.slug === slug);
}
