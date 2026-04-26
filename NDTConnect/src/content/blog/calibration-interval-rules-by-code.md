---
title: "NDT Equipment Calibration Intervals by Code: API, ASME, ISO, NAS"
slug: "calibration-interval-rules-by-code"
description: "Definitive reference for NDT equipment calibration intervals - who specifies them (manufacturer vs code vs procedure), how often UT, MT, RT, and ET equipment must be calibrated, and when ISO/IEC 17025 traceability matters."
publishedAt: "2026-04-26"
updatedAt: "2026-04-26"
author: "NDT Connect Editorial"
tags: ["NDT calibration", "calibration intervals", "ASME Section V", "API 510", "ISO 17025", "NAS 410", "audit findings"]
---

# NDT Equipment Calibration Intervals by Code: API, ASME, ISO, NAS

"How often does a UT flaw detector need calibration?" is the single most-asked question in our compliance inbox, and the most-misanswered. The honest answer is "it depends on which document is on top of your contract stack." This article ranks those documents and gives the actual intervals each one specifies, with citations.

## Who Sets the Interval - A Hierarchy

Calibration intervals come from four sources, and they stack in this order:

1. **Contract** (customer flow-down). If the PO says monthly verification, monthly it is, regardless of code minimum.
2. **Code** (ASME, API, AWS). Sets a minimum that the contract can tighten but cannot loosen.
3. **Procedure** (your written technique). Operationalizes the code. May tighten further.
4. **Manufacturer recommendation**. Floor for any silent contract.

Where multiple apply, the most stringent governs. An audit will check the bottom of the stack first - if the procedure is silent, the code applies; if both are silent and the manufacturer recommends 12 months, that is the interval.

## A Vocabulary Note: Calibration vs. Standardization vs. Verification

Codes use these words inconsistently. The pragmatic distinctions:

- **Calibration**: comparison against a higher-order traceable standard, by a calibration laboratory, producing a signed certificate. ISO/IEC 17025 accreditation is the gold standard.
- **Standardization**: pre-job adjustment of an instrument against a reference block on site. Required at the start of every job and every shift; not a substitute for calibration.
- **Verification / Functional check**: confirmation between calibrations that the instrument still operates within tolerance. Typically daily or per-job.

ASME Section V Article 4 calls the on-site reference-block adjustment "calibration" in some clauses; what it means is standardization. Read the clause, not the word.

## Ultrasonic Equipment

### Conventional flaw detectors

ASME Section V Article 4 (T-461 vertical linearity, T-462 horizontal linearity, T-463 amplitude control linearity) requires linearity verification at minimum every 12 months and any time after equipment repair. Most procedures tighten this to:

- Linearity (vertical, horizontal, amplitude): annual, by an accredited lab
- Functional check: at the start of each examination, after every 4 hours, when personnel change, or whenever malfunction is suspected (T-467)

NAS 410 paragraph 6 and AC7114/3 align: 12 months for instrument linearity calibration, daily standardization with reference blocks.

### UT thickness gauges

API 510 paragraph 5.7 and API 570 paragraph 5.7 require corroded thickness measurements to be made with calibrated instruments. The codes do not name an interval; the manufacturer's recommendation (typically 12 months for the instrument, infinite for the dual-element transducer until damaged) is the floor. Practice in refining: 12-month instrument calibration, every-shift block verification at known steps.

### PAUT and TOFD instruments

ASME Section V Article 4 Mandatory Appendix V references conventional UT calibration requirements, plus probe element verification per Mandatory Appendix VII (encoded scanning) and procedure-qualification demonstrations. Common practice:

- Instrument linearity: 12 months
- Probe element check (dead/weak elements): every 30 days or per procedure
- Wedge verification and angle: per shift

### Calibration blocks (V1, V2, IIW, custom)

ASTM E1158 and ISO 2400 / 7963 require traceable dimensional verification. Practice: dimensional re-verification every 5 years or after any visible damage. Block surface roughness and reflector dimensions should be verified by an accredited dimensional laboratory.

## Magnetic Particle Equipment

### MT yokes (electromagnetic)

ASTM E709 paragraph 7 requires lifting force verification:

- AC yokes: 4.5 kg (10 lb) minimum lift
- DC yokes: 18 kg (40 lb) minimum lift
- After repair, after dropping, or annually - whichever is sooner

ASME Section V Article 7 T-762 mandates this lift test at minimum every 12 months and any time the yoke is dropped or damaged.

### MT prods, coils, central conductors

ASTM E709 and ASME Section V Article 7 require ammeter verification annually against a calibrated ammeter and field strength verification with a Hall-effect gaussmeter (the gaussmeter itself calibrated annually).

### MT ammeters and timers

12 months calibration against a NIST-traceable instrument. ASME Section V Article 7 T-761.

### Wet fluorescent particles and bath concentration

Per-shift: settling test (ASTM E1444 paragraph 7.3), background fluorescence check, contamination check. Bath concentration: per shift before use (1.0-2.4 mL/100 mL for fluorescent, 1.2-2.4 mL/100 mL for visible per ASTM E1444 / E709).

### Light meters (UV-A and visible)

ASME Section V Article 6 (PT) and Article 7 (MT) require:

- UV-A intensity at the test surface: 1000 microW/cm2 minimum, verified per shift
- Light meter calibration: every 6 months minimum, against a NIST-traceable standard
- White-light supplemental illumination: 100 lx (10 fc) minimum for fluorescent, 1000 lx (100 fc) minimum for visible inspection

## Penetrant Testing

### Penetrant materials

ASME Section V Article 6 T-641 limits sulfur, halogen, and fluorine residue on austenitic stainless and nickel alloys. Each batch of penetrant must come with a certificate of conformance verifying these limits. Verification by the user is required when contract or procedure demands; otherwise certificate retention is sufficient.

### System performance check

ASTM E1417 requires daily verification with a known-defect comparator panel (PSM-5 or equivalent) before any production work. The panel itself is replaced after wear or contamination - no published shelf life, replace based on diminishing indication clarity.

### Light meters

Same as MT.

## Radiographic Testing

### X-ray and gamma sources

10 CFR Part 34 (US, NRC) and equivalent state agreements:

- Radiographic exposure devices (gamma sources): 6-month inspection per 10 CFR 34.31, plus quarterly leak test per 10 CFR 34.27
- Source change-out: per source half-life and license conditions
- Survey meters: annual calibration against a NIST-traceable source, per 10 CFR 34.25

### Densitometers

ASTM E1079 requires calibration before each shift against a NIST-traceable step wedge, and instrument calibration annually by an accredited lab.

### Image quality indicators (penetrameters / IQIs)

ASME Section V Article 2 T-233 specifies hole-type and wire-type IQIs. These are reference articles, not calibrated instruments - they have no calibration interval, but are replaced if damaged or worn.

### Computed and digital radiography systems

ASME Section V Article 2 Mandatory Appendices IV (CR) and V (DR) require system performance evaluation annually plus daily IQI verification. ASTM E2737 (DDA) and E2445 (CR) detail the test routines.

## Eddy Current Equipment

### Surface and tube ET instruments

ASME Section V Article 8 references ASTM E243 (tube), E309 (steel products), and E426 (welds). Calibration intervals are typically procedure-driven:

- Instrument annual linearity and frequency calibration
- Probe verification per shift against reference standards (drilled holes, EDM notches)

### Reference standards (ASME tube standards, drilled-hole calibration tubes)

Dimensional verification every 5 years or upon visible damage. ASTM E215 and ASME Section V tables specify reflector dimensions.

## Cross-Reference Summary

| Equipment | Code | Interval (instrument) | Interval (verification / standardization) |
|---|---|---|---|
| UT flaw detector | ASME V Art 4 T-461..463 | 12 mo linearity | Per shift, per 4 hr |
| UT thickness gauge | API 510/570/653 | 12 mo (mfr typ) | Per shift |
| PAUT instrument | ASME V Art 4 Mand App V | 12 mo | Per shift, 30-day element check |
| MT yoke | ASTM E709 / ASME V Art 7 | 12 mo lift test | Per shift, after drop |
| MT prod / coil | ASME V Art 7 T-761 | 12 mo ammeter | Per job |
| Gaussmeter | ASTM E709 | 12 mo | Per use |
| Light meter (UV/white) | ASME V Art 6/7 | 6 mo | Per shift |
| Penetrant comparator | ASTM E1417 | Per use | Daily |
| Survey meter | 10 CFR 34.25 | 12 mo | Per shift / battery check |
| Densitometer | ASTM E1079 | 12 mo | Per shift step-wedge |
| Gamma source | 10 CFR 34.31 / 34.27 | 6 mo inspection / quarterly leak | Per use |
| Eddy current | ASME V Art 8 | 12 mo | Per shift |

## When ISO/IEC 17025 Traceability Matters

ISO/IEC 17025 accreditation of the calibration laboratory is required, in practice, when:

- The contract or quality system explicitly requires it (most aerospace primes, NADCAP work, nuclear ASME Section XI)
- The customer audits to AS9100, IATF 16949, or ISO 17020
- A reading is challenged in litigation or insurance claim - 17025 calibrations carry evidentiary weight that non-accredited calibrations do not

If you cannot point to an active 17025 accreditation scope (with the specific instrument type listed) on the calibration certificate, the certificate is administratively a 17025 calibration only when the cert says it is.

NIST traceability is necessary but not sufficient for 17025. Many calibration shops are NIST-traceable without 17025 accreditation; some 17025-accredited shops have scope limitations that exclude specific instrument types.

## Common Audit Findings on Calibration Programs

- **Expired certificates in service.** Equipment used after the calibration due date with no out-of-service record. Most-cited finding industry-wide.
- **No daily standardization records.** Annual instrument calibration is fine, but the per-shift block standardization is not logged. Cited under ASME Section V Article 4 T-467.
- **Non-accredited lab on aerospace work.** Calibration certificate from a NIST-traceable but not 17025-accredited lab on NADCAP work. Typically a major finding.
- **Block damage not reported.** Visible wear or impact damage on a calibration block, no out-of-service record.
- **Lift-test interval missed.** MT yoke dropped during a job, no immediate lift test or out-of-service tag. Cited under ASTM E709.
- **Source survey missed.** Quarterly leak test or 6-month source inspection past due. Regulatory citation, not just finding.

## What a Defensible Calibration Program Looks Like

Five operational habits:

1. **One register.** Every instrument by serial, with last-calibrated, due-date, calibrating lab, scope of calibration, and current location.
2. **Auto-alerts at 30 / 14 / 7 days.** Calibration approaching due date triggers a work order, not an emergency.
3. **Out-of-service tagging tied to records.** An instrument flagged as damaged or out of cal is locked out of job assignment.
4. **Certificate retention for the life of the instrument plus the contract retention period.** Typically 7 years minimum for refining, 11 years for nuclear, life-of-aircraft for aerospace.
5. **Calibration history portable on technician audit.** When the auditor asks for the cal history of probe SN 12345, it appears in seconds, not after a 30-minute search.

A spreadsheet survives one auditor. A real register survives the loss of the engineer who maintains it.

Track your equipment calibration and personnel certs free at NDT Connect. Free equipment management, free calibration tracking, free certificate management - one register, automatic expiry alerts, full export. User ID only, no per-seat fees.
