---
title: "RBI and Corrosion Management for Refinery Operators: API 580/581 in Practice"
slug: "rbi-corrosion-management"
description: "Risk-Based Inspection and corrosion management for refinery and petrochemical operators. API RP 580/581 workflow, sour/naphthenic/sulfidation/MIC/CUI mechanisms, CML/TML programs, and integration with NDT contractor scheduling."
publishedAt: "2026-04-26"
updatedAt: "2026-04-26"
author: "NDT Connect Editorial"
tags: ["RBI", "API 580", "API 581", "corrosion management", "API 510", "API 570", "CUI", "refinery inspection"]
---

# RBI and Corrosion Management for Refinery Operators: API 580/581 in Practice

Risk-Based Inspection is older than most of the engineers running it today. API RP 580 was first published in 2002, API RP 581 (the quantitative methodology) in 2000. Twenty-plus years in, the gap between operators who use RBI to drive maintenance dollars and operators who use it as a paperwork exercise to satisfy a jurisdictional inspector has only widened. This article is for the people on the operator side of that gap, and for the NDT contractors who feed inspection data into operator RBI software.

## What RBI Actually Replaces

Prescriptive inspection under API 510 (pressure vessels), API 570 (piping), and API 653 (storage tanks) sets default inspection intervals: external visual every five years, internal or on-stream every ten years, thickness measurements at the half-life or five years, whichever is less. Those intervals were chosen for an average circuit and a population-wide damage rate. They overshoot for low-risk, low-corrosion-rate equipment and dangerously undershoot for circuits with active high-temperature hydrogen attack, naphthenic acid corrosion, or sulfidation accelerated by silicon-deficient carbon steel.

API RP 580 lays out the RBI methodology requirements; API RP 581 supplies the quantitative damage factor and probability-of-failure tables. A program built on either is permitted under API 510 paragraph 5.3 (in-service inspection planning), API 570 paragraph 5.1, and API 653 with restrictions.

What RBI lets you do that prescriptive inspection does not:

- Push intervals out on equipment with proven low corrosion rates and benign service
- Shorten intervals where the consequence of failure is high (e.g., HF alkylation, hot hydrogen circuits)
- Direct inspection effort to the specific damage mechanism (e.g., wet H2S cracking surveys vs. general thickness)
- Build a defensible maintenance budget tied to risk reduction, not equipment count

## The Damage Mechanisms That Drive the Plan

API RP 571 (Damage Mechanisms Affecting Fixed Equipment in the Refining Industry) is the canonical reference. Five mechanism families dominate refinery RBI plans:

### Sour service (wet H2S)

Hydrogen-induced cracking (HIC), stress-oriented hydrogen-induced cracking (SOHIC), sulfide stress cracking (SSC). NACE MR0103 / ISO 17945 governs material selection. AUT/PAUT mapping for HIC, WFMT for SSC and SOHIC. Inspection frequency in classified wet H2S circuits typically 3-5 years even under aggressive RBI optimization.

### Naphthenic acid corrosion (NAC)

High-TAN crude units (TAN > 0.5 mg KOH/g) operating between 220 C and 400 C. Velocity-accelerated, particularly at elbows, tees, and pump suction lines. Material upgrade to Type 316L or 317L is the long-term answer; UT thickness mapping at high-velocity zones is the inspection answer.

### Sulfidation

Carbon steel above 260 C in sulfur-bearing hydrocarbons. The 2009 Chevron Richmond C-1100 sidecut line failure (silicon < 0.10%) reset industry expectations. API RP 939-C now drives silicon content verification (PMI) of every carbon steel component in sulfidation service. If your CML program does not include 100% PMI on hot-cut replacements, you have a gap.

### Microbiologically influenced corrosion (MIC)

Storage tank bottoms, dead legs, water draws, intermittent service piping. NACE TM0212 outlines field detection. Visual + UT pit mapping + bottom-side coupon programs are the standard inspection package. RBI software typically pegs MIC-susceptible circuits at high probability-of-failure unless mitigated.

### Corrosion under insulation (CUI)

The mechanism that consumes more refinery inspection budget than any other. Carbon steel between -4 C and 175 C, stainless between 60 C and 205 C (chloride SCC). API RP 583 is the dedicated CUI document. Tools: profile radiography, pulsed eddy current (PEC), real-time radiography, and increasingly drone-based thermal screening followed by targeted insulation removal. CUI inspections are where contractor crew hours blow up; planning is everything.

## The RBI Workflow That Survives Audit

A defensible RBI program executes the following loop continuously, not annually:

1. **Equipment inventory and circuit definition.** Group piping into corrosion circuits by metallurgy, fluid composition, temperature, and flow regime. API RP 570 paragraph 5.4.1 provides the basis. A typical 100,000 BPD refinery has 800-1,500 piping circuits.

2. **Damage mechanism identification.** Cross-reference circuit conditions against API RP 571 mechanism criteria. This must be done by a corrosion engineer or jointly with one; an inspector alone cannot defend it.

3. **Probability of failure (PoF) calculation.** API RP 581 quantitative tables, or qualitative scoring per RP 580. Inputs: damage factor, inspection effectiveness, generic failure frequency.

4. **Consequence of failure (CoF) calculation.** Fluid inventory, release scenario, ignition probability, area-of-effect. RP 581 gives both area-based and financial-based CoF.

5. **Risk ranking and inspection planning.** Risk = PoF x CoF. Plot on a 5x5 risk matrix. Top-risk circuits get a tailored inspection plan with named techniques (UT scan vs. spot, PAUT vs. RT, internal entry vs. on-stream).

6. **Execute, capture data, recalculate.** Each inspection event updates the damage factor and inspection effectiveness category, which recalculates PoF and shifts the next due date.

The loop breaks at step 6 when inspection data sits in PDFs on a shared drive instead of feeding back into the RBI database. This is the most common reason RBI programs degrade after the third or fourth recertification cycle.

## CML and TML Programs in Practice

A condition monitoring location (CML) or thickness measurement location (TML) is a designated point where repeated thickness readings are taken to calculate corrosion rate. API 570 paragraph 5.6 sets the minimum requirements:

- Permanently marked, repeatable to within 25 mm
- Sufficient quantity to characterize the corrosion mechanism (general vs. localized)
- Located at high-velocity zones, dead legs, and downstream of injection points (every 2.5 m for at least 7.5 m downstream of injection, per RP 570 5.5)

Two corrosion rates are calculated per CML:

- **Short-term rate**: latest minus previous, divided by interval
- **Long-term rate**: latest minus original, divided by total time

Whichever is higher drives the next inspection date and the remaining life calculation per API 510 paragraph 7.1 / API 570 paragraph 7.1.

The audit-finding bar:

- CMLs that have moved between inspections (different technician, different mark) - data void
- Surface temperature compensation missing on hot-line readings - readings 1-3% off
- A-scan saving and double-bounce verification not specified in procedure

## Integration With NDT Contractor Scheduling

Operator RBI software (PCMS, Bentley APM, IDMS, Meridium APM, Inspectioneering) generates work orders for the next inspection cycle. The contractor side rarely sees the RBI logic; it sees a list of tags, dates, and methods. The friction:

- Operator sends 600 tags, 5 methods, 12-week window
- Contractor must align technician certifications (ASNT Level II UT, PAUT specific written-practice qualification, RT Level II + radiation safety officer coverage), equipment calibration validity, and procedure revisions
- Mid-job, an interval CML reads below T-min - operator triggers Fitness-for-Service per API 579-1/ASME FFS-1
- Contractor must produce calibration records, technician certifications, and procedure revisions on 24-hour notice

Operators measure contractor performance on data return time and audit-readiness of the data package. A contractor whose technicians' certs are on a spreadsheet that lives on one estimator's laptop loses the work to one whose certs export from a real system.

## What Auditors Look At First

Five items, in this order:

1. The current revision of the inspection plan, signed by an authorized inspector and reviewed by a corrosion engineer
2. Damage mechanism review documents matching API RP 571 categories
3. Inspection records for the past two cycles on at least 10% of circuits, statistically sampled
4. Technician certifications (ASNT SNT-TC-1A or ACCP, NACE / AMPP for the corrosion engineer) traceable to date of work
5. Procedure revisions and qualification records for any advanced method (PAUT, AUT, PEC, GWT)

If item 4 takes more than 60 seconds to produce per technician per job, the program scores down on documentation maturity, regardless of the technical quality of the inspection.

## Field Discipline That Makes RBI Pay

The RBI programs that actually reduce inspection cost (rather than reshuffle it) share three habits:

- **Daily data return.** Field readings uploaded same-day, not at end of turnaround. Drift trends caught while crews are still on site.
- **Technician-tag accountability.** Every reading tagged with the technician ID, certification level, and procedure revision. Disputed readings traced in minutes.
- **Equipment calibration discipline.** Every gauge, every probe, every block has a current calibration certificate. Out-of-cal equipment used on a CML invalidates the entire round.

Operators can run RBI without all three. They cannot extend intervals safely without all three.

Track your equipment calibration and personnel certs free at NDT Connect. Free equipment management, free calibration tracking, free certificate management for manpower and company-owned assets - the documentation backbone that keeps your CML data audit-defensible and your turnarounds on schedule. User ID only, full export, no per-seat fees.
