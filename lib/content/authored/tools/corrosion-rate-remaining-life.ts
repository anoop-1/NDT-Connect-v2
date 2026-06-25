import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'corrosion-rate-remaining-life',
  name: 'Corrosion Rate & Remaining Life Calculator',
  category: 'general',
  inputs: [
    { id: 't_initial', label: 'Initial / nominal thickness', unit: 'mm', type: 'number' },
    { id: 't_previous', label: 'Previous inspection thickness', unit: 'mm', type: 'number' },
    { id: 't_actual', label: 'Current (actual) thickness', unit: 'mm', type: 'number' },
    { id: 't_required', label: 'Required (minimum) thickness', unit: 'mm', type: 'number' },
    { id: 'years_long', label: 'Years: initial → current', unit: 'yr', type: 'number' },
    { id: 'years_short', label: 'Years: previous → current', unit: 'yr', type: 'number' },
  ],
  outputs: [
    { id: 'cr_long', label: 'Long-term corrosion rate', unit: 'mm/yr' },
    { id: 'cr_short', label: 'Short-term corrosion rate', unit: 'mm/yr' },
    { id: 'remaining_life', label: 'Remaining life', unit: 'yr' },
    { id: 'next_inspection', label: 'Max next inspection interval', unit: 'yr' },
  ],
  metaTitle: 'Corrosion Rate & Remaining Life Calculator (API 510 / 570 / 653)',
  metaDescription:
    'Calculate long-term and short-term corrosion rate, remaining life, and the maximum inspection interval for pressure vessels, piping and tanks per API 510, API 570 and API 653.',
  heroLede:
    'Every fixed-equipment inspection ends with the same three numbers: how fast is it corroding, how long until it hits minimum thickness, and when must it be inspected again. API 510 (vessels), API 570 (piping) and API 653 (tanks) all use the same arithmetic — this tool runs it, returning both the long-term and short-term corrosion rate, the remaining life, and the code-capped next inspection interval.',
  howItWorks:
    'Corrosion rate is the thickness lost divided by the time over which it was lost. The long-term rate uses the initial (or nominal) thickness over the full service life; the short-term rate uses the previous inspection thickness over the period since. API requires you to evaluate both and use the one that gives the shorter remaining life. Remaining life is the metal left above the required minimum divided by the governing corrosion rate. The next inspection is then capped at one-half the remaining life (API 510/570) up to the code maximum.',
  formula: 'CR_long = (t_initial − t_actual) / years_long ;  CR_short = (t_previous − t_actual) / years_short ;  Remaining life = (t_actual − t_required) / CR_governing ;  Next inspection ≤ Remaining life / 2',
  workedExample: {
    inputs: { t_initial: 12.7, t_previous: 11.0, t_actual: 10.2, t_required: 6.4, years_long: 15, years_short: 5 },
    outputs: { cr_long: '0.167', cr_short: '0.160', remaining_life: '22.8', next_inspection: '10.0' },
    explanation:
      'Long-term rate = (12.7 − 10.2) / 15 = 0.167 mm/yr. Short-term = (11.0 − 10.2) / 5 = 0.160 mm/yr. The long-term rate is higher, so it governs. Remaining life = (10.2 − 6.4) / 0.167 = 22.8 yr. API 510 caps the next internal/on-stream inspection at the lesser of half the remaining life (11.4 yr) or 10 yr — so 10 years.',
  },
  whenToUse:
    'Use at the close of any thickness-monitoring inspection on a pressure vessel, piping circuit or storage tank to set the remaining life and the next inspection date. Pair it with the required-thickness calculation (the t_min from the design code) and the damage-mechanism review (API 571).',
  limitations: [
    'Assumes a linear (constant) corrosion rate — localised pitting, MIC or accelerating mechanisms violate this and need statistical or worst-case treatment.',
    't_required must come from the governing design code (ASME VIII, B31.3, API 650) — this tool does not compute it.',
    'API 510 caps vessel intervals at 10 yr; API 570 piping at 5–10 yr by class; API 653 tanks at 20 yr external / per-RBI internal — always apply the code maximum.',
    'A negative or near-zero corrosion rate (thickness increased) usually means measurement scatter — re-grid and re-measure, do not report infinite life.',
    'Risk-based inspection (API 580/581) can override the half-life rule with a documented assessment.',
  ],
  relatedTools: [
    { slug: 'ut-thickness', name: 'UT Thickness' },
    { slug: 'inspection-interval', name: 'Inspection Interval' },
    { slug: 'inspection-cost-estimator', name: 'Inspection Cost Estimator' },
  ],
  faqs: [
    { q: 'What is the difference between long-term and short-term corrosion rate?', a: 'The long-term rate uses the original/nominal thickness over the equipment\'s full life; the short-term rate uses the previous inspection thickness over the most recent interval. API 510/570/653 require you to calculate both and use whichever gives the shorter remaining life, because a rising short-term rate is an early warning that a damage mechanism has accelerated.' },
    { q: 'How is remaining life calculated?', a: 'Remaining life = (current thickness − required minimum thickness) ÷ governing corrosion rate. The required minimum thickness comes from the construction code (ASME VIII, B31.3, API 650) including any pressure and structural minimums; the governing corrosion rate is the larger of the long-term and short-term rates.' },
    { q: 'How do I set the next inspection date?', a: 'For pressure vessels (API 510) and piping (API 570) the next internal/on-stream inspection is the lesser of one-half the remaining life or the code maximum (10 years for vessels, 5–10 years for piping by class). API 653 tanks use up to 20 years external and an RBI-driven internal interval. A formal RBI program can adjust these with documentation.' },
    { q: 'What if my corrosion rate comes out negative?', a: 'A negative rate means the current thickness reading is greater than the earlier one, which is physically impossible for corrosion — it indicates measurement scatter, a different CML location, or a calibration difference. Re-establish the condition monitoring location, re-measure with a calibrated gauge, and never report infinite remaining life from a negative rate.' },
    { q: 'Does this work for storage tanks under API 653?', a: 'Yes — the corrosion-rate and remaining-life arithmetic is identical. API 653 applies it separately to the floor, shell courses and roof, each with its own minimum thickness, and caps the external inspection interval at 5 years (or per RBI) and internal at up to 20 years depending on the calculated bottom remaining life.' },
  ],
  citations: [
    { id: 'api-510', source: 'API 510 — Pressure Vessel Inspection Code, 11th ed., §7 (Inspection Intervals) and §8 (Inspection Data Evaluation)' },
    { id: 'api-570', source: 'API 570 — Piping Inspection Code, 5th ed., §7 (Inspection Intervals)' },
    { id: 'api-653', source: 'API 653 — Tank Inspection, Repair, Alteration, and Reconstruction, 5th ed.' },
    { id: 'api-571', source: 'API RP 571 — Damage Mechanisms Affecting Fixed Equipment in the Refining Industry' },
  ],
};

export default tool;
