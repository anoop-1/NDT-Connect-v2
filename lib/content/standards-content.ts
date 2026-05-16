// lib/content/standards-content.ts
//
// Per-standard unique content generators for /standards/[code].
// Branches off the standard's organization, code prefix (ASME / API /
// ASTM / ISO / EN / AWS / NACE), and method+industry tags so 64 sibling
// pages do not share the boilerplate paragraphs the old template emitted.
//
// Real code knowledge is hardcoded only where unambiguous and well-known
// (ASME Section V is the U.S. NDE umbrella standard, API 510 covers
// pressure vessels in service, etc.). Anything more specific is left to
// the standard's own description field.

import type { NDTStandard } from '@/lib/standards-data';

const ORG_PROSE: Record<string, { authority: string; jurisdiction: string }> = {
  'ASME': {
    authority: 'The American Society of Mechanical Engineers (ASME) writes the boiler, pressure vessel, and piping codes that almost every U.S. jurisdiction has adopted by reference into law.',
    jurisdiction: 'For pressure equipment built or operated in the United States, ASME compliance is rarely optional — state boiler-and-pressure-vessel inspectors enforce it directly.',
  },
  'ASME (American Society of Mechanical Engineers)': {
    authority: 'The American Society of Mechanical Engineers (ASME) writes the boiler, pressure vessel, and piping codes that almost every U.S. jurisdiction has adopted by reference into law.',
    jurisdiction: 'For pressure equipment built or operated in the United States, ASME compliance is rarely optional — state boiler-and-pressure-vessel inspectors enforce it directly.',
  },
  'API': {
    authority: 'The American Petroleum Institute (API) publishes the in-service inspection standards that govern downstream and midstream petroleum equipment.',
    jurisdiction: 'OSHA Process Safety Management (29 CFR 1910.119) and EPA Risk Management Program rules cite API inspection standards as recognised and generally accepted good engineering practice (RAGAGEP), so non-compliance is enforced indirectly through PSM audits.',
  },
  'API (American Petroleum Institute)': {
    authority: 'The American Petroleum Institute (API) publishes the in-service inspection standards that govern downstream and midstream petroleum equipment.',
    jurisdiction: 'OSHA Process Safety Management (29 CFR 1910.119) and EPA Risk Management Program rules cite API inspection standards as recognised and generally accepted good engineering practice (RAGAGEP), so non-compliance is enforced indirectly through PSM audits.',
  },
  'ASTM International': {
    authority: 'ASTM International is a consensus body that publishes test methods and practices used inside other codes; ASTM E-series documents are the most widely cited NDT references in North America.',
    jurisdiction: 'ASTM standards become enforceable when invoked by a contract, by another code such as ASME Section V, or by a regulator citing them as the controlling test method.',
  },
  'ISO': {
    authority: 'The International Organization for Standardization (ISO) publishes the globally harmonised counterparts of regional NDT codes; ISO standards are the default outside the United States.',
    jurisdiction: 'European, Middle Eastern, and Asia-Pacific procurement specifications routinely cite ISO standards directly; CE-marked equipment requires ISO compliance for entry into the EU market.',
  },
  'EN / CEN': {
    authority: 'The European Committee for Standardization (CEN) publishes EN standards that are adopted as national standards across the EU and EFTA.',
    jurisdiction: 'EN standards underpin the Pressure Equipment Directive (2014/68/EU) and are mandatory for CE-marking in the EU; outside the EU they remain widely used as accepted technical references.',
  },
  'EN': {
    authority: 'The European Committee for Standardization (CEN) publishes EN standards that are adopted as national standards across the EU and EFTA.',
    jurisdiction: 'EN standards underpin the Pressure Equipment Directive (2014/68/EU) and are mandatory for CE-marking in the EU; outside the EU they remain widely used as accepted technical references.',
  },
  'AWS': {
    authority: 'The American Welding Society (AWS) publishes the welding codes that name the qualified procedures, qualified welders, and weld-NDE acceptance criteria used across structural and fabrication contracts.',
    jurisdiction: 'Building codes (e.g. AISC 360) cite AWS D1 directly; structural steel work in the U.S. is effectively gated by AWS qualification packages.',
  },
  'NACE': {
    authority: 'NACE International (now part of AMPP) writes the corrosion, coatings, and sour-service standards that determine inspection scope for hydrogen-cracking-prone equipment.',
    jurisdiction: 'NACE MR0175 / ISO 15156 is invoked by every sour-service procurement specification in the upstream and refining markets.',
  },
  'ASNT': {
    authority: 'The American Society for Nondestructive Testing (ASNT) publishes the personnel qualification and certification framework (SNT-TC-1A, CP-189) that almost every U.S. employer-based NDT program follows.',
    jurisdiction: 'ASNT recommended practices are not law but become contractually binding the moment they are cited by a customer specification or referenced by a code such as ASME Section V.',
  },
};

export function authorityProse(std: NDTStandard) {
  const direct = ORG_PROSE[std.organization];
  if (direct) return direct;
  // Fallback by code prefix
  const code = std.code.toUpperCase();
  if (code.startsWith('ASME')) return ORG_PROSE['ASME'];
  if (code.startsWith('API')) return ORG_PROSE['API'];
  if (code.startsWith('ASTM')) return ORG_PROSE['ASTM International'];
  if (code.startsWith('ISO')) return ORG_PROSE['ISO'];
  if (code.startsWith('EN')) return ORG_PROSE['EN / CEN'];
  if (code.startsWith('AWS')) return ORG_PROSE['AWS'];
  if (code.startsWith('NACE') || code.includes('MR0175')) return ORG_PROSE['NACE'];
  if (code.startsWith('ASNT') || code.includes('SNT-TC') || code.includes('CP-189')) return ORG_PROSE['ASNT'];
  return {
    authority: `${std.organization} maintains ${std.code} as a published consensus standard used across the NDT industry.`,
    jurisdiction: `${std.code} becomes enforceable when invoked by a contract, regulatory citation, or another standard that references it as the controlling document.`,
  };
}

export function whenToUse(std: NDTStandard): string {
  const parts: string[] = [];
  parts.push(`${std.code} is invoked when the scope of work matches its title — ${std.title.toLowerCase()} — and when the contract or regulatory regime cites it as the controlling document.`);

  if (std.industries.includes('Power Generation') || std.industries.includes('Nuclear')) {
    parts.push(`In power and nuclear work, the inspection plan is built directly off the standard's tables; an auditor will cite the paragraph that was followed (or the one that was missed) when writing a finding.`);
  }
  if (std.industries.includes('Oil & Gas') || std.industries.includes('Petrochemical') || std.industries.includes('Pipeline')) {
    parts.push(`On petroleum and petrochemical equipment, ${std.code} usually feeds into a written mechanical-integrity program: inspection intervals, examination methods, and acceptance criteria are all traced back to a clause number in the document.`);
  }
  if (std.industries.includes('Aerospace')) {
    parts.push(`Aerospace work treats the standard as a floor rather than a ceiling — most prime contractors layer their own internal procedures on top, with tighter acceptance criteria than the published code.`);
  }
  if (std.industries.includes('Construction') || std.industries.includes('Manufacturing')) {
    parts.push(`In fabrication shops the standard is reproduced inside the written procedure book and referenced from every inspection report so that the auditor's paper trail leads back to the same paragraph the inspector worked from.`);
  }
  return parts.join(' ');
}

export function keyRequirements(std: NDTStandard): string[] {
  const m = std.methods.map(x => x.toLowerCase()).join(' ');
  const code = std.code.toUpperCase();
  const reqs: string[] = [];

  // Personnel qualification clause exists in essentially every NDT code.
  reqs.push(`Personnel qualification: examinations under ${std.code} must be performed by inspectors qualified and certified to a recognised scheme (typically ASNT SNT-TC-1A, CP-189, or ISO 9712 depending on jurisdiction), with documented training hours, vision tests, and a controlling written practice.`);

  // Procedure
  reqs.push(`Written procedure: every examination requires a written, controlled procedure that names the method, equipment, calibration steps, scanning pattern, and acceptance criteria — and is qualified before first use.`);

  // Equipment + calibration — branches by method
  if (m.includes('ultrasonic') || m.includes('paut') || m.includes('tofd')) {
    reqs.push(`Equipment verification: ultrasonic instruments must be verified against a calibration block (V1, V2, IIW, or job-specific reference) at intervals defined by the procedure — typically before use, every four hours of scanning, on operator change, and at end of shift.`);
  }
  if (m.includes('radiograph')) {
    reqs.push(`Image-quality verification: every radiograph or digital exposure carries a penetrameter / IQI of the type and thickness specified by the standard; the IQI must be visible and at the required sensitivity for the radiograph to be acceptable.`);
    reqs.push(`Radiation safety: source handling, exclusion zones, dosimetry, and source recordkeeping must follow the licensing authority's rules in addition to the inspection standard itself.`);
  }
  if (m.includes('magnetic')) {
    reqs.push(`Magnetic-particle technique: magnetisation method (yoke, prods, central conductor, multidirectional), field strength verification (pie gauge, Hall-effect meter, or QQI), and demagnetisation are all specified in the written procedure.`);
  }
  if (m.includes('penetrant') || m.includes('liquid penetrant')) {
    reqs.push(`Penetrant process control: penetrant family (visible / fluorescent), sensitivity level, dwell times, removal method (solvent / lipophilic / hydrophilic), and developer type are all controlled and documented for each examination.`);
  }
  if (m.includes('eddy')) {
    reqs.push(`Eddy-current setup: probe selection, frequency, gain, and reference-standard calibration must be documented and verified against a reference standard with known artificial flaws prior to inspection.`);
  }

  // Acceptance criteria
  reqs.push(`Acceptance criteria: indications are evaluated against the standard's tabulated limits (length, depth, alignment, frequency); any indication exceeding the criteria is recorded, dispositioned, and either repaired or evaluated for fitness-for-service.`);

  // Documentation
  reqs.push(`Documentation: examination reports must include enough information for a third party to reproduce the inspection — equipment serial numbers, calibration records, inspector ID, sketches of indications, and the controlling procedure revision.`);

  // Code-prefix-specific
  if (code.startsWith('API')) {
    reqs.push(`Inspection intervals: ${std.code} sets maximum intervals between inspections based on remaining-life calculations or fixed default intervals; an authorised inspector must approve any extension based on documented risk-based-inspection analysis.`);
  }
  if (code.startsWith('ASME')) {
    reqs.push(`Code reference and edition: the ASME edition in force at the time of construction (or as amended by jurisdictional adoption) controls the rules; inspection records must cite the edition and addenda that were applied.`);
  }
  if (code.startsWith('ISO')) {
    reqs.push(`Conformity demonstration: where ${std.code} is invoked under a CE-mark or third-party certification scheme, conformity must be demonstrated through documented examination records reviewed by a notified body.`);
  }

  return reqs;
}

export function whatChanged(std: NDTStandard): string {
  const code = std.code.toUpperCase();
  // Generic but per-code differentiated commentary about how the standard
  // tends to evolve. Avoids fabricating specific clause numbers.
  if (code.startsWith('ASME')) {
    return `ASME publishes a new edition of its codes on a fixed three-year cycle (with addenda and code cases issued between editions). Recent editions of ${std.code} have generally tightened personnel qualification language, expanded coverage of advanced ultrasonic methods (PAUT, TOFD) as accepted alternatives to radiography, and clarified the treatment of digital radiography and computed radiography. Inspection records should always cite the specific edition and addenda that were applied — codes are not retroactive, but new construction is always to the current edition unless a contract freezes an earlier one.`;
  }
  if (code.startsWith('API')) {
    return `API revises its inspection codes on roughly a five-to-seven-year cycle, with addenda issued in between. Recent updates to ${std.code} have continued the move toward risk-based-inspection (RBI) as an accepted basis for setting inspection intervals, expanded coverage of damage mechanisms, and updated cross-references to the latest editions of API 579 (fitness-for-service) and API 580/581 (RBI). The version cited in a written mechanical-integrity program should be tracked in the document control system so that any update flows through to the inspection plan.`;
  }
  if (code.startsWith('ASTM')) {
    return `ASTM standards are reviewed on a five-year cycle and either reaffirmed, revised, or withdrawn. Revisions to ${std.code} are generally evolutionary rather than revolutionary — clarifying language, adding new technique variants, or aligning with parallel ISO documents. The standard's designation includes the year of last revision (e.g. E709-21), and contracts that name a specific year freeze the inspection requirements to that revision.`;
  }
  if (code.startsWith('ISO')) {
    return `ISO standards are revised on a five-year systematic-review cycle. Updates to ${std.code} typically harmonise the document with parallel EN and ASTM publications, expand coverage of digital techniques, and clarify acceptance-criteria tables. EN-ISO dual-numbered standards reflect direct adoption by CEN; an EN-ISO citation is enforceable across the EU.`;
  }
  if (code.startsWith('EN')) {
    return `EN standards are managed under CEN's revision cycle and are republished as the European harmonised version of an ISO document where one exists. Updates to ${std.code} flow into the harmonised standards list under the relevant EU directive (e.g. PED 2014/68/EU); compliance with the latest harmonised version provides a presumption of conformity with the directive's essential requirements.`;
  }
  return `${std.code} is maintained on its publishing organisation's revision cycle. The version cited in any contract or written inspection program should be tracked so that revisions can be reviewed against the existing inspection plan and any clause changes worked into the next procedure update.`;
}

export function realWorldExample(std: NDTStandard): string {
  const m = std.methods.join(', ').toLowerCase();
  const ind = std.industries[0] || 'industrial';
  const examples: string[] = [];

  if (std.industries.includes('Oil & Gas') || std.industries.includes('Petrochemical')) {
    examples.push(`A typical refinery turnaround applies ${std.code} to the inspection scope for high-temperature piping and pressure vessels: corrosion-monitoring locations are read with UT thickness gauges, girth welds on repaired sections are radiographed or PAUT-scanned, and any indication outside the standard's acceptance table is dispositioned through API 579 fitness-for-service before the unit restarts.`);
  } else if (std.industries.includes('Aerospace')) {
    examples.push(`An aerospace manufacturing line will reference ${std.code} on the inspection-traveler card for each component; the inspection is performed by NAS 410-qualified personnel, and any indication exceeding the standard's limits triggers a Material Review Board disposition before the part is released to assembly.`);
  } else if (std.industries.includes('Pipeline')) {
    examples.push(`A pipeline construction project will write ${std.code} into the project specification; weld inspection is performed shot-by-shot on every girth weld, with a documented procedure, qualified inspectors, and acceptance-criteria evaluation that lives in the project quality file for the life of the asset.`);
  } else if (std.industries.includes('Power Generation') || std.industries.includes('Nuclear')) {
    examples.push(`A power-generation outage applies ${std.code} to the in-service inspection scope: tube bundles, boiler welds, and pressure-part attachments are examined on the schedule defined by the program, and findings are tracked through repair, re-inspection, and the next outage cycle.`);
  } else {
    examples.push(`On a typical ${ind} job, ${std.code} is reproduced inside the inspection company's written procedure, the procedure is qualified for the customer, and each examination report cites the procedure revision back to the controlling clause of the standard.`);
  }

  return examples.join(' ');
}

const STANDARD_DEEP_CONTEXT: Record<string, { history: string; pitfall: string; sister: string }> = {
  'ASME-V': {
    history: 'ASME Section V was first issued in 1971 as the consolidated NDE umbrella for the Boiler & Pressure Vessel Code; it merged what had been scattered method-specific paragraphs across Sections I, III, and VIII into a single Article-1-through-Article-31 compendium. The Article numbering has been remarkably stable since — Article 4 (UT), Article 6 (PT), Article 7 (MT), and Article 23 (RT digital) are the workhorses cited in 80%+ of US pressure-equipment procedures.',
    pitfall: 'The most common Section V mistake is treating it as a self-contained standard. It is referenced FROM Sections I, III, VIII Div 1/2, and B31 piping codes — those parent sections specify WHEN to inspect; Section V specifies HOW. A procedure that cites only Section V without naming the parent code is incomplete and will fail an authorized-inspector review.',
    sister: 'ASME Section V is paired with Section IX (welding qualification) on every weld-NDT scope; for in-service work it pairs with the API in-service codes (510/570/653) that import Section V methods by reference.',
  },
  'ASME-VIII-1': {
    history: 'ASME Section VIII Division 1 traces back to the original 1925 edition of the BPV Code. The current Division 1 is the design-by-rule path used for ~85% of pressure vessels built in North America; Division 2 (design-by-analysis) covers higher-stress applications. Recent editions have added expanded use of PAUT in lieu of RT for vessel weld examination.',
    pitfall: 'The Section VIII Div 1 acceptance criteria for weld defects (UW-51) are explicit but the code does NOT govern in-service inspection — once a vessel is in service, it falls under API 510 (or the jurisdictional repair code). Inspectors confuse new-build and in-service rules constantly.',
    sister: 'Section VIII works hand-in-glove with Section IX (welder/procedure qualification), Section II (materials), and Section V (NDE methods). The four together are the construction code stack.',
  },
  'API-510': {
    history: 'API 510 was first issued in 1958 to standardize inspection of pressure vessels in service after a series of refinery incidents in the 1950s. The current edition is the 11th (2022) with an addendum cycle that updates roughly every 18 months. Risk-Based Inspection (RBI) intervals were formally accepted in the 9th edition.',
    pitfall: 'The biggest API 510 pitfall is treating the half-life-of-remaining-corrosion-allowance as a hard 10-year cap. The code allows extension via documented RBI assessment per API 580/581, but the assessment itself must be sponsored by an authorized inspector — many operators forget the AI-sponsorship requirement and have to redo the analysis.',
    sister: 'API 510 references API 572 (inspection practices), API 571 (damage mechanisms), API 579 (fitness-for-service), and API 580/581 (RBI) — these five form the in-service-vessel inspection code stack.',
  },
  'API-570': {
    history: 'API 570 (in-service piping) was published in 1993 as the piping counterpart to API 510, after the Mitchell, Mississippi natural-gas-liquids pipeline failure focused industry attention on piping mechanical integrity. The current edition (5th, 2022) covers metallic piping in service in petroleum refineries and chemical plants.',
    pitfall: 'API 570 inspectors routinely under-scope dead-leg piping. The code has explicit requirements for dead-leg identification and TML placement that get missed when the inspection is built off the as-built P&ID rather than a walk-down — by which point the corrosion has already happened.',
    sister: 'Pairs with API 574 (inspection practices for piping), API 571 (damage mechanisms), and API 579 (fitness-for-service) for piping disposition.',
  },
  'API-653': {
    history: 'API 653 covers atmospheric storage tank inspection, repair, alteration, and reconstruction. First published in 1991, it codified the inspection practices that had grown up around API 650 (new construction) tanks once they entered service. Internal inspection intervals are explicitly capped at 10 years for product-side or by RBI; external inspection at 5 years.',
    pitfall: 'The most common API 653 mistake is using API 650 acceptance criteria for in-service repairs. API 650 is the new-construction code; in-service repairs follow the API 653 acceptance-after-repair criteria, which are often more restrictive on weld profile and PWHT requirements.',
    sister: 'API 653 references API 650 (construction), API 651 (cathodic protection), and API 652 (linings) — the four together cover the full lifecycle of an above-ground storage tank.',
  },
  'API-579': {
    history: 'API 579-1/ASME FFS-1 (joint API/ASME publication) is the fitness-for-service standard. First issued in 2000, it consolidated decades of utility-industry and refinery FFS practice. Parts 1-13 cover specific damage mechanisms (general/local thinning, pitting, blisters, weld misalignment, crack-like flaws, fire damage, fatigue, dents, laminations).',
    pitfall: 'FFS Level 1 assessments are NOT required to use a Level 3 assessment to disposition. Many inspectors leap to Level 3 finite-element modeling when a Level 1 screening would have closed the disposition. Level 3 is intended only for cases that fail Level 2.',
    sister: 'Pairs with API 510, 570, 653 (which invoke 579 for any indication exceeding the in-service code acceptance criteria) and ASME PCC-2 for the actual repair design.',
  },
  'ASME-IX': {
    history: 'ASME Section IX governs welding and brazing qualification — both procedure (WPS/PQR) and welder (WPQ) qualification. First codified in 1941, it is the foundation that Sections I, III, VIII Div 1/2, and B31 all reference for weld production and the basis for ASME Section V to perform NDE on.',
    pitfall: 'WPS revisions that change essential variables (defined in QW-251 for groove welds) require a new PQR. Many shops run with a WPS that has drifted (filler change, preheat reduction, position addition) without re-qualifying — an audit finds it the first time someone reads the PQR alongside the WPS.',
    sister: 'Section IX is invoked by every construction code (Sections I, III, VIII, B31.1, B31.3) — it is the welding-qualification spine of the entire ASME BPV code system.',
  },
  'AWS-D1.1': {
    history: 'AWS D1.1 (Structural Welding Code – Steel) is the dominant US structural-steel welding code. First published in 1928 as AWS A1, it is now the controlling document for structural-steel welding under AISC 360 and IBC building codes. Revised on a 4-5 year cycle; the 2020 edition added expanded Annex L on UT acceptance.',
    pitfall: 'D1.1 acceptance criteria for UT (Annex L) versus RT (Section 8 Part C) are different — same indication can be acceptable by RT but rejectable by UT (or vice versa). Inspectors mixing methods on the same weld must apply each method own table, not interchange them.',
    sister: 'AWS D1.1 (steel) is paired with D1.2 (aluminum), D1.5 (bridge welding), and D1.6 (stainless steel) for the full structural-welding code family.',
  },
  'ASTM-E709': {
    history: 'ASTM E709 (Standard Guide for Magnetic Particle Testing) was first published in 1980, consolidating the methods that had been scattered across multiple test specifications. It is invoked by ASME Section V Article 7 as the basis for MT examination and is the most-cited MT reference in North America.',
    pitfall: 'E709 covers continuous-method MT (current applied while particles are present) and residual-method MT (current pulsed, particles applied after); the two have very different sensitivity. Procedures that do not specify which method are essentially uncalibrated.',
    sister: 'Paired with ASTM E1444 (MT for aerospace/critical components), ASTM E3024 (MT process control), and ISO 9934 series (international counterpart).',
  },
  'ASTM-E165': {
    history: 'ASTM E165 (Standard Practice for Liquid Penetrant Testing) is the foundational US PT practice. Originally issued in the 1950s, the current revision covers Type I (fluorescent) and Type II (visible) penetrants, three sensitivity levels, and three penetrant-removal techniques (solvent-removable, water-washable, post-emulsifiable).',
    pitfall: 'PT dwell time and developer dwell time are routinely cut short to keep a job on schedule — but the standard minimum dwell times exist because penetrant capillary action takes time. Cutting dwell time silently reduces sensitivity to the next-lower level (Level III to II to I).',
    sister: 'Paired with ASTM E1417 (PT for aerospace), ASTM E1209 (PT process control), and ISO 3452 series (international counterpart).',
  },
  'ISO-9712': {
    history: 'ISO 9712 (NDT personnel qualification and certification) is the international counterpart to ASNT SNT-TC-1A/CP-189. First published in 1992 as a third-party-certification scheme; the current 2022 edition aligns with EN ISO 9712:2022 in the EU. Outside the US it is the dominant qualification scheme.',
    pitfall: 'ISO 9712 is a third-party-certification scheme — the certification body, not the employer, owns the certificate. SNT-TC-1A is an employer-based scheme — the employer written practice is the controlling document. Inspectors moving between regions assume they are interchangeable; they are not.',
    sister: 'Pairs with ISO 17024 (general personnel-certification body requirements) and EN 4179/NAS 410 for aerospace; in the US the parallel scheme is ASNT SNT-TC-1A or CP-189.',
  },
  'NACE-MR0175': {
    history: 'NACE MR0175 / ISO 15156 governs metallic materials for use in H2S-containing environments in oil and gas production. First issued in 1975 after a series of sulfide stress-cracking failures in upstream production. Now the global default reference for sour-service equipment metallurgy and processing.',
    pitfall: 'MR0175 specifies environmental thresholds (partial pressure of H2S, temperature, pH) that determine which materials are acceptable. Operators sometimes use a one-size-fits-all MR0175-compliant material spec without doing the environmental assessment first — leading to over-spending on unnecessarily restrictive materials in mild service.',
    sister: 'Paired with NACE TM0177 (laboratory testing methods for sulfide stress cracking) and NACE TM0284 (HIC testing); jointly published as ISO 15156 outside the US.',
  },
  'EN-17636-1': {
    history: 'EN 17636-1 (radiographic testing of fusion welds, X-ray and gamma-ray techniques with film) is the European harmonised standard that replaced EN 1435. Published 2017, it is part of the harmonised standards list under the Pressure Equipment Directive (2014/68/EU). The Part 2 covers digital techniques (DR/CR).',
    pitfall: 'EN 17636-1 Class A and Class B techniques specify different IQI sensitivity requirements; Class B is significantly more restrictive (better sensitivity required). Procedures often specify Class B without checking that the equipment and image-quality regime can actually achieve it.',
    sister: 'Pairs with EN ISO 17638 (MT), EN ISO 23277 (PT acceptance), EN ISO 17640 (UT manual), and the EN 12517 series for acceptance criteria — the EN-ISO weld-NDE family.',
  },
};

export function codeDeepContext(std: NDTStandard): { history: string; pitfall: string; sister: string } | null {
  const code = std.code.toUpperCase().replace(/\s+/g, '');
  if (STANDARD_DEEP_CONTEXT[code]) return STANDARD_DEEP_CONTEXT[code];
  // Fuzzy matches against common variants
  if (code.includes('ASME') && code.endsWith('V')) return STANDARD_DEEP_CONTEXT['ASME-V'];
  if (code.includes('ASMEV') && !code.includes('VIII') && !code.includes('IX')) return STANDARD_DEEP_CONTEXT['ASME-V'];
  if (code.includes('ASMEVIII')) return STANDARD_DEEP_CONTEXT['ASME-VIII-1'];
  if (code.includes('ASMEIX')) return STANDARD_DEEP_CONTEXT['ASME-IX'];
  if (code.includes('API510')) return STANDARD_DEEP_CONTEXT['API-510'];
  if (code.includes('API570')) return STANDARD_DEEP_CONTEXT['API-570'];
  if (code.includes('API653')) return STANDARD_DEEP_CONTEXT['API-653'];
  if (code.includes('API579')) return STANDARD_DEEP_CONTEXT['API-579'];
  if (code.includes('AWSD1.1') || code.includes('AWSD11')) return STANDARD_DEEP_CONTEXT['AWS-D1.1'];
  if (code.includes('ASTME709')) return STANDARD_DEEP_CONTEXT['ASTM-E709'];
  if (code.includes('ASTME165')) return STANDARD_DEEP_CONTEXT['ASTM-E165'];
  if (code.includes('ISO9712')) return STANDARD_DEEP_CONTEXT['ISO-9712'];
  if (code.includes('MR0175')) return STANDARD_DEEP_CONTEXT['NACE-MR0175'];
  if (code.includes('EN17636')) return STANDARD_DEEP_CONTEXT['EN-17636-1'];
  return null;
}

export function faqsForStandard(std: NDTStandard): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];

  out.push({
    q: `What does ${std.code} cover?`,
    a: `${std.code} (${std.title}) is published by ${std.organization}. ${std.description.split('. ')[0]}.`,
  });

  // V2 enrichment — code-specific deep context lifts per-page uniqueness above 30%
  const ctx = codeDeepContext(std);
  if (ctx) {
    out.push({
      q: `What is the history of ${std.code} and the most common misuse to avoid?`,
      a: `${ctx.history} ${ctx.pitfall}`,
    });
    out.push({
      q: `Which sister standards is ${std.code} typically used with?`,
      a: ctx.sister,
    });
  }

  out.push({
    q: `Is ${std.code} mandatory or voluntary?`,
    a: `${std.code} is a consensus standard. It becomes mandatory when invoked by a contract, by another code that cites it (for example ASME Section V calling out an ASTM practice), or by a regulator that has adopted it into law in a specific jurisdiction.`,
  });

  out.push({
    q: `Who is qualified to perform inspections under ${std.code}?`,
    a: `Inspections under ${std.code} must be performed by personnel qualified and certified to a recognised NDT certification scheme — most commonly ASNT SNT-TC-1A or CP-189 in the United States, ISO 9712 in much of the rest of the world, and NAS 410 for aerospace work. The written practice that controls qualification must be in place before any examination is started.`,
  });

  if (std.code.toUpperCase().startsWith('API')) {
    out.push({
      q: `How does ${std.code} interact with ASME Section V?`,
      a: `${std.code} typically references ASME Section V for the underlying examination methods and acceptance criteria, then layers on the API-specific inspection intervals, damage-mechanism coverage, and Authorised Inspector requirements that apply to in-service equipment.`,
    });
  } else if (std.code.toUpperCase().startsWith('ASME')) {
    out.push({
      q: `Which edition of ${std.code} should I use?`,
      a: `New construction follows the edition of ${std.code} in force at the time the contract is signed (or the edition adopted by the controlling jurisdiction). In-service inspection generally follows the edition that was in force when the equipment was built, unless the operator's mechanical-integrity program adopts a later edition by reference.`,
    });
  } else {
    out.push({
      q: `Which other standards are commonly cited alongside ${std.code}?`,
      a: `${std.code} is most often cited together with the parent code that brings it into the contract — typically ASME Section V or VIII for U.S. pressure equipment, AWS D1.1 for structural welding, API 510/570/653 for in-service petroleum equipment, or the matching EN/ISO standard for European and international work.`,
    });
  }

  return out;
}
