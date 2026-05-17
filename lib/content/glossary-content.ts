// lib/content/glossary-content.ts
//
// Deterministic content generators for the /glossary/[term] family.
// Each helper produces UNIQUE per-term copy by composing sentences that
// pull the term's own slug, name, category, definition keywords, and
// related-terms list. The goal: ≥80% per-page unique vocabulary across
// 96 glossary entries.
//
// Design rules:
//  - Never invent technical claims. Sentence templates only restate the
//    term's own definition or reference well-known NDT facts (codes,
//    method names) that map cleanly to the slug.
//  - Branch on category AND on sub-keyword groups inside the definition
//    (e.g. "weld" → mention AWS D1.1; "pipe" → mention API 570).
//  - Word counts: sections sum to ~600-900 unique words depending on
//    how many keyword branches fire for the term.

import type { GlossaryTerm } from '@/lib/glossary-data';

// ---------- helpers ----------

function lower(s: string) { return s.toLowerCase(); }
function bare(term: GlossaryTerm) {
  // strip parenthetical clarifier from term name for in-sentence use
  return term.term.replace(/\s*\([^)]*\)\s*$/, '').trim();
}
function defHas(term: GlossaryTerm, ...kws: string[]) {
  const d = lower(term.definition);
  return kws.some(k => d.includes(k));
}
function termHas(term: GlossaryTerm, ...kws: string[]) {
  const t = lower(term.term);
  return kws.some(k => t.includes(k));
}

// Map each glossary term to the most relevant code references it should
// cite. Picks 1-3 codes per term so sibling pages don't all reference the
// same set.
export function inferStandardsForTerm(term: GlossaryTerm): { code: string; note: string }[] {
  const out: { code: string; note: string }[] = [];

  if (defHas(term, 'weld', 'fusion', 'arc') || termHas(term, 'weld')) {
    out.push({ code: 'AWS D1.1', note: 'Structural Welding Code — Steel; defines visual and NDE acceptance for static and dynamically loaded welds.' });
    out.push({ code: 'ASME Section IX', note: 'Welding, brazing, and fusing qualifications referenced by every U.S. pressure-equipment code.' });
  }
  if (defHas(term, 'ultrasonic', 'pulse-echo', 'transducer', 'couplant', 'a-scan', 'b-scan', 'c-scan', 'tofd', 'paut') || termHas(term, 'ultrason', 'a-scan', 'b-scan', 'c-scan')) {
    out.push({ code: 'ASME Section V Article 4', note: 'Ultrasonic examination methods for welds and components.' });
    out.push({ code: 'ASTM E114 / E164 / E2375', note: 'ASTM straight-beam, contact, and wrought-product UT practices.' });
    out.push({ code: 'ISO 16810 / ISO 16811', note: 'General principles and sensitivity setting for industrial UT.' });
  }
  if (defHas(term, 'radiograph', 'x-ray', 'gamma', 'iridium', 'cobalt') || termHas(term, 'radiograph', 'penetrameter', 'iqi', 'film')) {
    out.push({ code: 'ASME Section V Article 2', note: 'Radiographic examination requirements (penetrameter selection, IQI, density).' });
    out.push({ code: 'ASTM E94 / E1742', note: 'Standard guide for radiographic examination and film handling.' });
    out.push({ code: 'ISO 17636-1 / -2', note: 'Radiographic testing of fusion welds — film and digital detector arrays.' });
  }
  if (defHas(term, 'magnetic', 'ferromagnetic', 'flux leakage', 'yoke', 'prod') || termHas(term, 'magnet')) {
    out.push({ code: 'ASTM E709 / E1444', note: 'Standard guide and practice for magnetic-particle examination.' });
    out.push({ code: 'ISO 9934', note: 'Non-destructive testing — magnetic particle testing (general principles, media, equipment).' });
  }
  if (defHas(term, 'penetrant', 'capillary', 'fluorescent dye', 'developer') || termHas(term, 'penetrant', 'dye')) {
    out.push({ code: 'ASTM E165 / E1417', note: 'Standard practice for liquid penetrant testing.' });
    out.push({ code: 'ISO 3452', note: 'Non-destructive testing — penetrant testing (general principles).' });
  }
  if (defHas(term, 'eddy current', 'electromagnetic', 'impedance', 'lift-off') || termHas(term, 'eddy', 'electromagn')) {
    out.push({ code: 'ASTM E215 / E376 / E2884', note: 'Eddy-current testing of tubes, conductivity, and array probes.' });
    out.push({ code: 'ISO 15548-1', note: 'Equipment characterization for eddy-current examination.' });
  }
  if (defHas(term, 'pipe', 'pipeline', 'piping')) {
    out.push({ code: 'API 570', note: 'In-service piping inspection — drives the inspection-interval calculations behind on-stream NDT.' });
  }
  if (defHas(term, 'pressure vessel', 'vessel', 'shell', 'head', 'nozzle')) {
    out.push({ code: 'API 510', note: 'In-service pressure-vessel inspection code.' });
    out.push({ code: 'ASME BPVC Section VIII', note: 'Construction of pressure vessels — sets the design baseline being preserved by NDT.' });
  }
  if (defHas(term, 'tank', 'storage')) {
    out.push({ code: 'API 653', note: 'Tank inspection, repair, alteration and reconstruction.' });
  }
  if (defHas(term, 'aerospace', 'aircraft', 'composite')) {
    out.push({ code: 'NAS 410', note: 'Aerospace personnel qualification and certification standard for NDT.' });
  }
  if (defHas(term, 'asnt', 'level i', 'level ii', 'level iii', 'snt-tc', 'cp-189') || termHas(term, 'certif')) {
    out.push({ code: 'ASNT SNT-TC-1A', note: 'Recommended practice for personnel qualification and certification in NDT.' });
    out.push({ code: 'ASNT CP-189', note: 'Standard for qualification and certification of NDT personnel (employer-based).' });
    out.push({ code: 'ISO 9712', note: 'NDT qualification and certification of personnel (third-party scheme).' });
  }
  if (defHas(term, 'radiation', 'shielding', 'exclusion', 'roentgen', 'sievert', 'alara')) {
    out.push({ code: '10 CFR 34', note: 'NRC regulations on industrial radiography licensing and operating safety.' });
    out.push({ code: 'ANSI N43.3', note: 'General radiation safety for installations using non-medical X-ray and sealed gamma sources.' });
  }

  // de-duplicate by code
  const seen = new Set<string>();
  return out.filter(o => (seen.has(o.code) ? false : (seen.add(o.code), true))).slice(0, 4);
}

// "How it Works" — composes a 180-260 word technical paragraph that
// branches off the category AND off keywords in the definition. The
// resulting prose is per-term-unique because the keyword branches differ.
export function howItWorks(term: GlossaryTerm): string {
  const t = bare(term);
  const tl = lower(t);
  const parts: string[] = [];

  // Lead sentence varies by category
  switch (term.category) {
    case 'methods':
      parts.push(`From the inspector's bench, ${t} is run as a defined sequence: equipment verification on a known reference, scan setup against the procedure, scanning the part, and writing the indications into the report.`);
      break;
    case 'equipment':
      parts.push(`On the job, ${t} sits between the procedure and the indication — its calibration record, serial number, and condition all flow into the inspection report and the audit trail.`);
      break;
    case 'defects':
      parts.push(`In service, ${t} starts as a discontinuity that may or may not breach the acceptance criteria of the governing code; the NDT method's job is to detect it, characterise it, and size it so an engineer can decide whether to repair, monitor, or accept.`);
      break;
    case 'physics':
      parts.push(`As a physical principle, ${t} dictates how energy interacts with the test piece — and that interaction is what an NDT instrument reads out as a signal, image, or measurement.`);
      break;
    case 'standards':
      parts.push(`As a written standard, ${t} translates physical inspection know-how into auditable rules: who is qualified, what equipment is acceptable, how the procedure must be written, and what counts as a rejectable indication.`);
      break;
    case 'materials':
      parts.push(`From a materials standpoint, ${t} affects how an NDT signal propagates, scatters, or returns — which is why method selection, frequency, and reference blocks are tied so tightly to material specification.`);
      break;
    case 'certifications':
      parts.push(`As a credential, ${t} is the gate between an inspector and chargeable hours on a job site; the underlying scheme dictates the training hours, exam format, and recertification cycle.`);
      break;
    case 'safety':
      parts.push(`On a live site, ${t} is enforced by a written radiation/safety procedure, a designated safety officer, monitored exposure limits, and a barrier or exclusion zone that the rest of the crew respects without exception.`);
      break;
  }

  // Keyword-driven sentences (each branch adds 25-50 unique words)
  if (defHas(term, 'transducer', 'piezo')) {
    parts.push(`A piezoelectric element converts the electrical pulse into a mechanical wave at the chosen frequency, transmits it into the part through couplant, and then converts the returning echo back into a voltage that the flaw detector digitises and displays on the screen.`);
  }
  if (defHas(term, 'frequency', 'mhz')) {
    parts.push(`Frequency selection is a deliberate trade-off: higher MHz buys resolution and small-flaw sensitivity but loses penetration in coarse-grained or attenuative material, while lower MHz reaches deeper at the cost of resolution.`);
  }
  if (defHas(term, 'gain', 'decibel', 'db')) {
    parts.push(`Gain is set in decibels referenced to a known reflector — a side-drilled hole, flat-bottom hole, or notch on a reference block — so two operators on two instruments can produce comparable amplitudes from the same indication.`);
  }
  if (defHas(term, 'couplant')) {
    parts.push(`A couplant film displaces the air gap at the wedge-to-part interface, raising the transmitted acoustic energy by orders of magnitude; without it the impedance mismatch between transducer and steel would reflect almost the entire pulse back to the probe face.`);
  }
  if (defHas(term, 'magnetic', 'flux', 'yoke', 'prod')) {
    parts.push(`The magnetising current creates a field that runs continuous through the part; at a discontinuity the lines of flux squeeze around the gap and break the surface as a leakage field, where dry powder or wet-suspension particles cluster and outline the flaw to the inspector's eye.`);
  }
  if (defHas(term, 'penetrant', 'capillary', 'developer')) {
    parts.push(`Capillary action draws the penetrant into surface-breaking openings during the dwell; emulsifier or solvent removes the surface excess; the developer then provides a contrasting blotter that pulls the trapped penetrant back out, broadening the indication so it becomes visible to the inspector.`);
  }
  if (defHas(term, 'eddy current', 'impedance', 'lift-off')) {
    parts.push(`As the alternating coil approaches the conductive surface it drives circulating eddy currents; any change in the part — a crack, a thickness change, a permeability shift — perturbs those currents and registers as a phase-and-amplitude shift on the impedance plane.`);
  }
  if (defHas(term, 'radiograph', 'x-ray', 'gamma', 'film', 'detector')) {
    parts.push(`Radiation passes through the part and a dense region (more material, more attenuation) records as a lighter band on film or digital detector, while a void, lack of fusion, or porosity records as a darker area; an image quality indicator (IQI) verifies that the technique was sensitive enough to be trusted.`);
  }
  if (defHas(term, 'pipe', 'pipeline', 'piping')) {
    parts.push(`On piping, the inspection is usually a circumferential band of UT thickness readings, a girth-weld RT or PAUT shot, and a follow-up MT/PT on the toes — each method picking up a different failure mode at the same weld.`);
  }
  if (defHas(term, 'pressure vessel', 'vessel')) {
    parts.push(`On a pressure vessel, the procedure follows the API 510 inspection plan: thickness monitoring on shell and head, internal visual on a cycle, NDE on nozzle welds, and a fitness-for-service review whenever a reading falls below a calculated minimum.`);
  }
  if (defHas(term, 'composite', 'delamination', 'disbond')) {
    parts.push(`In a composite, the layered structure means impedance changes at every ply boundary; a true delamination registers as a strong reflector at a depth that the C-scan can map across the part to size the affected area for an engineering disposition.`);
  }
  if (defHas(term, 'corrosion', 'erosion', 'wall thickness')) {
    parts.push(`Wall-loss measurements are compared against the recorded baseline, and a corrosion rate (mils/year) is back-calculated; that rate sets the next inspection interval and the trigger for any fitness-for-service or repair decision.`);
  }
  if (defHas(term, 'crack')) {
    parts.push(`Crack sizing is the high-stakes call: amplitude alone is not enough, so techniques such as TOFD, tip-diffraction, or 6dB drop are stacked to bound the height and length used in the engineering critical assessment.`);
  }

  // Closing sentence — tied to category
  switch (term.category) {
    case 'methods':
      parts.push(`Procedure writing, inspector qualification, and the reference block establish the chain that lets a remote engineer trust an indication called a kilometre away from the office.`);
      break;
    case 'equipment':
      parts.push(`Calibration certificates, condition logs, and traceable serial numbers are what make the difference between an instrument that shows a number and an instrument whose number stands up in court or in front of an auditor.`);
      break;
    case 'defects':
      parts.push(`The fitness-for-service decision typically pairs the NDT call with material data and stress information; the inspector's job is to give the engineer a clean characterisation rather than to make the keep-or-reject call alone.`);
      break;
    case 'physics':
      parts.push(`Every parameter on the instrument front panel — frequency, gain, range, gate — is ultimately a physical lever on the same underlying interaction, which is why understanding the physics is what turns a button-pusher into a Level II.`);
      break;
    case 'standards':
      parts.push(`A standard's strength is that two independent crews can reach the same disposition on the same indication; that consistency is the entire point of the document and why audit findings cite paragraph numbers rather than opinions.`);
      break;
    case 'certifications':
      parts.push(`Certifications carry a quietly large operational weight — an expired Level II card on the morning of a turnaround can pull a whole crew off-site and rebuild the schedule from the next available qualified inspector.`);
      break;
    case 'safety':
      parts.push(`The safety procedure is treated as a non-negotiable: deviation triggers a stop-work, the regulator gets notified for any over-exposure, and the inspector's dosimetry record follows them to every future job.`);
      break;
    case 'materials':
      parts.push(`Material specification, heat treatment, and manufacturing route all leave fingerprints in the NDT signal; reference blocks cut from the same heat as the part are used wherever those fingerprints might be confused with a real flaw.`);
      break;
  }

  return parts.join(' ');
}

// "When to Apply / Use Cases" — 130-200 words, branches on category +
// keywords. Avoids the generic "oil and gas, aerospace, manufacturing"
// listing that the old template repeated for every term.
export function whenToApply(term: GlossaryTerm): string {
  const t = bare(term);
  const out: string[] = [];

  switch (term.category) {
    case 'methods':
      out.push(`${t} is selected when the failure mode the engineer cares about — surface crack, internal void, wall loss, lack of fusion — lines up with what the technique is physically capable of detecting.`);
      break;
    case 'defects':
      out.push(`The decision tree around ${t} runs: detect, characterise, size, and refer to the acceptance table in the governing code; only the last step decides repair, accept-as-is, or fitness-for-service review.`);
      break;
    case 'equipment':
      out.push(`The instrument's inspection scope is set by its OEM specification, its current calibration certificate, and any customer-specific qualifications that have been logged against it; a ${t} that is in calibration but unqualified for a customer's procedure is still off the job.`);
      break;
    case 'physics':
      out.push(`Inspectors apply the principle of ${t} every time they pick a frequency, gain, or probe — even when they are not consciously thinking of the underlying physics.`);
      break;
    case 'standards':
      out.push(`${t} is invoked by a contract, a purchase order, or a regulator; once invoked, it controls procedure, personnel, and acceptance criteria for the entire scope of work.`);
      break;
    case 'materials':
      out.push(`Material data drives method selection long before the inspector arrives on site: a coarse-grained austenitic weld and a clean ferritic plate produce very different ultrasonic responses and demand very different setups.`);
      break;
    case 'certifications':
      out.push(`A ${t} unlocks the inspector's right to interpret results, sign reports, and supervise lower levels; that authority is what the customer is buying when they specify a Level II or Level III on a procurement document.`);
      break;
    case 'safety':
      out.push(`${t} controls how the work is staged: barriers go up, dosimetry is verified, and the rest of the contractor crews are scheduled around the radiation window so the source can be cranked safely.`);
      break;
  }

  if (defHas(term, 'weld')) out.push(`On welded fabrication it is most often paired with VT and one volumetric method (RT or UT) so surface and internal defects are both addressed.`);
  if (defHas(term, 'pipe', 'pipeline')) out.push(`On in-service piping the inspection is scheduled against an API 570 corrosion monitoring plan rather than a one-off; trend data is what matters.`);
  if (defHas(term, 'aerospace', 'composite')) out.push(`On aerospace components, NAS 410 personnel qualifications and tighter acceptance criteria mean the same indication may be flagged that would be passed on a structural weld.`);
  if (defHas(term, 'storage tank', 'tank')) out.push(`On storage tanks the work is sequenced into an API 653 internal/external inspection cycle with floor MFL and shell UT-thickness as the workhorse measurements.`);
  if (defHas(term, 'crack')) out.push(`Whenever a crack is suspected the inspection plan upgrades from screening to characterisation — TOFD, MT, or tip-diffraction sizing — because the engineering critical assessment needs height and length, not just a yes/no.`);

  return out.join(' ');
}

// "Common Mistakes / Misconceptions" — 80-130 words.
export function commonMistakes(term: GlossaryTerm): string {
  const t = bare(term);
  const out: string[] = [];
  switch (term.category) {
    case 'methods':
      out.push(`The most expensive mistake with ${t} is treating it as a yes/no test rather than a characterisation — an indication called without a sizing strategy forces a repair where a fitness-for-service review might have left the part in service.`);
      break;
    case 'defects':
      out.push(`Confusing ${lower(t)} with a generic "indication" is a recurring error; the term carries an engineering implication, and the report should distinguish the discontinuity (what was seen) from the disposition (what code says about it).`);
      break;
    case 'physics':
      out.push(`Operators sometimes treat ${lower(t)} as a black-box instrument behaviour rather than a physical lever; the knock-on effect is that they do not realise when a knob change has invalidated the calibration.`);
      break;
    case 'standards':
      out.push(`A common misreading of ${t} is to apply the latest edition's acceptance criteria to a part fabricated under a previous edition; contracts usually freeze the edition, and the audit trail must reflect that.`);
      break;
    case 'equipment':
      out.push(`A frequent finding in audits is a ${lower(t)} marked "in-cal" on the spreadsheet but with a current condition (damaged cable, missing cap) that would have invalidated the calibration if checked physically.`);
      break;
    case 'certifications':
      out.push(`Certification scope is often misunderstood: a Level II in UT is not a Level II in PAUT, and signing a PAUT report without the specific endorsement is grounds for revocation under most schemes.`);
      break;
    case 'safety':
      out.push(`The classic ${lower(t)} miss is the "just one more shot" radiograph after the calculated end-of-day exposure budget; even a small over-exposure goes on the inspector's lifetime record and is a reportable event.`);
      break;
    case 'materials':
      out.push(`Treating a material as if it were homogeneous when its grain or heat-treat condition says otherwise is the cause of false calls and missed flaws far more often than equipment failure.`);
      break;
  }
  return out.join(' ');
}

// 3-question FAQ. Each question is built off the term and category so
// no two pages produce identical FAQ text.
export function faqsForTerm(term: GlossaryTerm): { q: string; a: string }[] {
  const t = bare(term);
  const tl = lower(t);
  const cat = term.category;

  const faqs: { q: string; a: string }[] = [];

  faqs.push({
    q: `What does "${t}" mean in NDT?`,
    a: term.definition.split('. ').slice(0, 2).join('. ') + (term.definition.endsWith('.') ? '' : '.'),
  });

  if (cat === 'methods' || cat === 'equipment') {
    faqs.push({
      q: `Which standards govern the use of ${t}?`,
      a: `${t} is most often referenced under ASME Section V together with the relevant ASTM practice or the matching ISO standard for the method; the contract or purchase order will name the controlling document and edition for any specific job.`,
    });
  } else if (cat === 'defects') {
    faqs.push({
      q: `Is ${tl} always rejectable?`,
      a: `No. Whether a ${tl} indication is rejectable depends on the acceptance criteria of the governing code (AWS D1.1, ASME Section VIII, API 1104, etc.), the size and orientation of the indication, and any fitness-for-service evaluation the engineer chooses to apply.`,
    });
  } else if (cat === 'physics' || cat === 'materials') {
    faqs.push({
      q: `Why does ${tl} matter to an inspector?`,
      a: `It directly influences the inspection parameters — frequency, probe choice, gain, scanning pattern — that decide whether a small flaw is caught or missed. Inspectors who treat the underlying physics as background detail tend to misset their instruments under unusual conditions.`,
    });
  } else if (cat === 'standards') {
    faqs.push({
      q: `Who enforces ${t}?`,
      a: `Enforcement comes from the contract (the purchaser cites the standard), the regulator (where the jurisdiction has adopted the standard into law), and the third-party inspection body or owner-user inspection group performing audit oversight.`,
    });
  } else if (cat === 'certifications') {
    faqs.push({
      q: `How long is a ${t} valid?`,
      a: `Most NDT certifications run on a fixed cycle — five years is typical for ASNT Level II/III and ISO 9712 — with mandated continuing experience or recertification examinations to renew. Vision and physical examinations are usually annual.`,
    });
  } else if (cat === 'safety') {
    faqs.push({
      q: `What happens if ${tl} procedure is breached?`,
      a: `The immediate response is a stop-work; depending on severity, the dosimetry record is reviewed, the regulator may be notified, and the inspector's lifetime exposure record is updated. The procedure is then re-trained and the cause investigated before work resumes.`,
    });
  }

  if (term.relatedTerms.length > 0) {
    faqs.push({
      q: `What other NDT concepts should I read alongside ${t}?`,
      a: `The most directly related entries in this glossary are ${term.relatedTerms.slice(0, 3).map(r => '"' + r.replace(/-/g, ' ') + '"').join(', ')}; reading those together gives you the surrounding vocabulary used in inspection reports and procedures.`,
    });
  } else {
    faqs.push({
      q: `Where would I see ${t} used in a real inspection report?`,
      a: `${t} most often appears in the inspection-summary, indication, or limitations sections of an NDT report — the specific phrasing varies by inspection company and the controlling code, but the term is used consistently within the industry.`,
    });
  }

  return faqs.slice(0, 3);
}
