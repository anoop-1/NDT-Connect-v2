---
title: "Ultimate Guide to Ultrasonic Testing (UT): Methods, Codes, and Field Application"
slug: "ultimate-guide-ultrasonic-testing"
description: "An ASNT Level III-grade guide to ultrasonic testing covering pulse-echo, TOFD, PAUT, GWT, calibration blocks, couplants, and code requirements under ASME Section V Article 4, AWS D1.1, and API 510."
publishedAt: "2026-04-26"
updatedAt: "2026-04-26"
author: "NDT Connect Editorial"
tags: ["ultrasonic testing", "UT", "PAUT", "TOFD", "ASME Section V", "API 510", "AWS D1.1", "NDT methods"]
---

# Ultimate Guide to Ultrasonic Testing (UT): Methods, Codes, and Field Application

Ultrasonic testing is the most versatile volumetric NDT method in the inspection toolbox. It is the method of choice when radiography is impractical, when in-service thickness data is required, or when discontinuities must be sized rather than merely detected. This guide is written for inspection-shop owners, ASNT Level III consultants, and the Level II technicians who execute the work day to day. It assumes you know what a transducer is, and it focuses on the decisions that get audit findings written or jobs lost.

## Physical Principles That Drive Every UT Decision

Ultrasound in industrial NDT operates between roughly 0.5 MHz and 25 MHz, with the bulk of weld and corrosion work in the 2.25-10 MHz band. Three physical phenomena govern almost every field decision you make:

- **Acoustic impedance mismatch**, calculated as Z = density x velocity, determines how much energy reflects at an interface. The 99%+ reflection at a steel-to-air interface is what makes pulse-echo work.
- **Attenuation** scales with frequency and grain size. Coarse-grained austenitic stainless and Inconel cladding are the reasons your 5 MHz longitudinal wave dies before reaching the far wall.
- **Beam divergence** is governed by the near-field length N = D^2 x f / (4 x v). Calibrate inside the near field and you will get amplitude readings that are not reproducible. This is the single most common audit finding when reviewing UT procedures.

If you cannot defend why you chose 4 MHz over 2.25 MHz, or why a 70-degree shear wave instead of 60-degree, your procedure has a hole in it.

## Instruments: Conventional, PAUT, and the Hybrid Generation

### Conventional flaw detectors

Single-channel pulser-receivers (Olympus EPOCH 650/6LT, Sonatest D-50, GE USM Go+) remain the workhorse for code-mandated weld exams under ASME Section V Article 4 and AWS D1.1 Section 8 visual-plus-UT acceptance. Specifications to verify before any job:

- Linearity (vertical and horizontal) per ASME Section V Article 4 T-461 / T-462
- Pulse repetition frequency adjustability for thick-section work
- Dynamic range and gate sensitivity
- DAC/TVG capability for distance-amplitude curves

### Thickness gauges

Dual-element gauges (Cygnus 6+, Olympus 38DL Plus) handle most CML work for API 510/570/653 programs. Single-element high-resolution gauges are used for clad and laminated stock. Calibration must reference a step block traceable through ISO/IEC 17025 chain.

### Phased array (PAUT) and TOFD

Modern shop-grade PAUT instruments (Olympus OmniScan X3, Sonatest Veo+, Eddyfi Mantis) deliver encoded scans, sectorial and linear electronic scanning, and merged TOFD/PA imaging. ASME Section V Article 4 Mandatory Appendix V specifies PAUT requirements; Code Case 2235 historically authorized PAUT in lieu of radiography for ASME Section VIII pressure vessels and is now fully embedded in Section V.

### Guided Wave Testing (GWT)

Long-range UT using torsional or longitudinal modes between 10-100 kHz, used for screening pipelines and inaccessible piping (CUI, road crossings). Standards: ASTM E2775, ISO 18211. GWT screens; it does not size. Follow-up with conventional or PAUT is mandatory.

## The Five Methods You Need to Defend in a Procedure

### 1. Pulse-echo

The default. Single transducer transmits and receives. Used for thickness, weld inspection, lamination checks, and flaw sizing via 6 dB drop, 20 dB drop, or DAC/TVG techniques.

### 2. Through-transmission

Two transducers, one each side. Used in composites and bonded structures where pulse-echo gives ambiguous results. Aerospace shops doing CFRP under NAS 410 personnel certification should already have a written practice covering this.

### 3. Phased Array (PAUT)

Multiple piezo-elements pulsed with controlled time delays (focal laws) to steer and focus the beam electronically. Provides S-scan, B-scan, C-scan imaging. Required to demonstrate procedure qualification per ASME Section V Article 4 Mandatory Appendix VIII for performance demonstration.

### 4. Time-of-Flight Diffraction (TOFD)

Two angled longitudinal-wave probes facing each other across the weld. Sizes flaws from diffracted tip signals rather than reflected amplitude. Excellent for sizing through-wall extent, weak for surface-breaking flaws inside the dead zone. Almost always paired with PAUT to cover dead zones.

### 5. Guided Wave (GWT)

Covered above. Treat it as a screening tool, never a code-mandated final acceptance method.

## Calibration Blocks: V1, V2, IIW, and the Custom Mistake

Three blocks dominate the discussion:

- **IIW Type 1 (V1) block**: 25 mm thick carbon steel, 91 mm radius, used for angle verification, beam exit point, sensitivity, and time-base calibration on shear wave probes. Specified in ISO 2400 and referenced in ASME Section V Article 4 T-434.2.
- **IIW Type 2 (V2) block**: smaller (12.5 mm), 25 mm and 50 mm radii, for site work and small probes. Specified in ISO 7963.
- **DAC/SDH blocks**: side-drilled hole reference blocks for distance-amplitude calibration, dimensioned per ASME Section V Article 4 Figure T-434.2.1 or AWS D1.1 Annex G.

The custom-block trap: any procedure-specified block with reflectors not traceable to the production component thickness, curvature, and material will fail an audit. A 25 mm flat block calibrating UT for a 4-inch elbow is a finding under ASME Section V Article 4 T-434.1.

Block surface condition matters. A worn IIW with a hammered face will not deliver reproducible amplitude. Block calibration certificates with dimensional verification should be retained for the life of the block. This is exactly the kind of artifact that ends up lost in a shoebox during an audit.

## Couplants: The Boring Topic That Sinks Jobs

Couplant choice is procedure-controlled, not technician-controlled. Common failures:

- Glycerin on stainless without a sulfur/halogen content check (ASME Section V Article 6 T-641 limits residual halogens, fluorides, and sulfur on austenitic and nickel alloys to 250 ppm typical)
- Cellulose gel that dries out in 4 hours of summer scanning, causing amplitude drift
- Water-based couplant on hot surfaces above 50 C without temperature-rated compound

Procedure should specify couplant brand, batch traceability where required, and surface-temperature window. NAS 410 and NADCAP-audited aerospace work demands consumable batch records on file with calibration and certification documentation.

## Signal Interpretation Without Hand-Waving

Three rules separate Level II craftsmen from button-pushers:

1. **Geometry first, flaw second.** Map every reflector against a sketch of the part geometry: weld root, counterbore, mismatch, weld cap. Geometry indications are repeatable and predictable. Flaw indications change character with skew angle.
2. **Sizing technique must match the code.** AWS D1.1 uses amplitude-based acceptance against an indication rating. ASME Section VIII Div. 1 Mandatory Appendix 12 uses amplitude. ASME Section VIII Div. 2 and Section XI nuclear use length and through-wall sizing. Mixing a 6 dB drop length with an AWS amplitude rating is a procedural defect.
3. **Documented signal evaluation.** Modern PAUT software auto-generates indication tables. Conventional UT requires the technician to record gain, gate, soundpath, surface distance, and depth manually. If your indication sheet does not have all five for every reportable indication, you will have rework on audit.

## Applications by Industry

### Refining and chemical (ASME Section VIII / API 510 / 570)

CML thickness rounds, HTHA screening (advanced UT and PAUT per API RP 941), in-service weld exams, valve seat inspection. Storage tank floor scanning under API 653 frequently combines MFL and UT thickness verification.

### Power generation (ASME Section XI)

Risk-informed in-service inspection of reactor pressure vessels, primary loop piping, steam generator tubing. Performance demonstration initiative (PDI) qualification of procedures and personnel is mandatory for ASME Section XI Appendix VIII work.

### Aerospace (NAS 410 / EN 4179 / NADCAP)

Bonded composite inspection, forging billet inspection, turbine disk web exams. Written practice, capability demonstrations, and recurrent audits of personnel files drive the work scope.

### Structural steel and bridges (AWS D1.1 / D1.5)

Shear-wave weld exams to AWS D1.1 Section 8, increasingly supplemented by PAUT under AWS D1.1 Annex Q.

### Subsea and pipelines (API 1104 / DNV)

Automated UT (AUT) zonal discrimination has largely replaced radiography for girth welds on lay barges.

## Codes Cheat Sheet for Procedures and Audit Files

| Application | Governing code | Key clause |
|---|---|---|
| Pressure vessel weld UT | ASME Section V Article 4 | T-431 through T-489 |
| New construction Sec VIII Div 1 | ASME BPVC VIII Div 1 UW-53, Mandatory Appendix 12 | Acceptance criteria |
| In-service refinery | API 510 (vessels), API 570 (piping), API 653 (tanks) | Inspection intervals + thickness |
| Structural welds | AWS D1.1 Section 8 | Procedure + acceptance |
| Aerospace personnel | NAS 410 / EN 4179 | Written practice + recurrent training |
| Procedure qualification | ASME Section IX | Welding-side; UT references back to V |
| Nuclear ISI | ASME Section XI Appendix VIII | Performance demonstration |

## Common Audit Findings on UT Programs

- Procedures that reference a withdrawn ASME Code edition
- Calibration block certificates expired or missing
- Technician sight test (near-vision Jaeger 2 at 12 in) older than 12 months
- DAC curve constructed from fewer than three side-drilled holes
- Couplant SDS not on file showing halogen/sulfur content for stainless work
- No documented procedure qualification record (PQR) for PAUT focal laws

A clean program tracks every one of these in a central system rather than on a shared drive that nobody updates between jobs.

## Operational Reality: Records or It Did Not Happen

A UT job creates four record streams: instrument calibration verification, block calibration certificate, technician certification record, and the inspection report itself. Lose any one and the job is unbillable to a tier-1 client. The shops that grow are the ones that keep equipment calibration logs, technician certifications, and procedure revisions in one place that auditors can see in 30 seconds.

Track your equipment calibration and personnel certs free at NDT Connect. User ID only, no per-seat fees, full export of your data, and audit-ready reports for ASME, API, and NADCAP reviews. Free equipment management, free calibration tracking, free certificate management for both manpower and company-owned assets.
