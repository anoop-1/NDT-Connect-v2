import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'inspection-interval',
  name: 'Inspection Interval & Remaining Life Calculator (API)',
  category: 'planning',
  inputs: [
    { id: 'tActual', label: 'Current thickness (t actual)', unit: 'mm', type: 'number' },
    { id: 'tMin', label: 'Minimum required thickness (t min)', unit: 'mm', type: 'number' },
    { id: 'corrosionRate', label: 'Corrosion rate', unit: 'mm/yr', type: 'number' },
    { id: 'code', label: 'Governing code', type: 'select' },
  ],
  outputs: [
    { id: 'remaining_life', label: 'Remaining life', unit: 'yr' },
    { id: 'next_interval', label: 'Next inspection (½-life, capped)', unit: 'yr' },
  ],
  metaTitle: 'Inspection Interval & Remaining Life Calculator | API 510/570/653',
  metaDescription:
    'Calculate equipment remaining life and the next inspection interval from thickness and corrosion rate, applying the API half-life rule and code maximums (510, 570, 653).',
  heroLede:
    'Fixed-equipment integrity hinges on two numbers: how long until the wall reaches minimum thickness (remaining life), and when to inspect next. API codes set the next interval at half the remaining life, capped by a code maximum. This tool runs both so inspectors and planners can set defensible intervals straight from thickness data.',
  howItWorks:
    'Remaining life RL = (t_actual − t_min) / corrosion rate. The API half-life rule sets the next internal/on-stream inspection at the lesser of RL/2 and the code maximum: API 510 (pressure vessels) and API 570 (piping) cap at 10 years for internal/on-stream; API 653 (storage tanks) caps internal inspection at 20 years (external at 5). Corrosion rate is the governing (greater of short-term and long-term) rate from successive thickness readings.',
  formula: 'RL = (t_actual − t_min) / CR ;  Next interval = min( RL / 2 , code max )',
  workedExample: {
    inputs: { tActual: 12.0, tMin: 6.0, corrosionRate: 0.25, code: 'API 510 (pressure vessel)' },
    outputs: { remaining_life: '24.0', next_interval: '10.0' },
    explanation:
      'A vessel at 12.0 mm with t_min 6.0 mm corroding at 0.25 mm/yr: RL = (12.0 − 6.0)/0.25 = 24 years. Half-life = 12 years, but API 510 caps internal/on-stream inspection at 10 years — so the next inspection is due in 10 years. If the corrosion rate were 0.6 mm/yr, RL = 10 yr, half-life = 5 yr, and the 5-year interval (below the cap) would govern.',
  },
  whenToUse:
    'Use to set the next inspection date from thickness monitoring, prioritise an inspection schedule by remaining life, justify an interval in an integrity report, or screen equipment approaching t_min.',
  limitations: [
    'Uses general/uniform corrosion; localised corrosion, pitting, cracking, or HTHA are not interval-from-CR problems — use RBI or fitness-for-service (API 579).',
    'Corrosion rate must be the governing rate per the code (greater of short-term and long-term); a single reading pair can mislead.',
    'Code maximums are simplified; the actual code has class- and service-specific rules (e.g., API 570 piping class, RBI intervals up to 10 yr only with a valid assessment).',
    't_min must be the code/spec minimum (pressure design + structural), not the nominal or as-built thickness.',
  ],
  relatedTools: [
    { slug: 'ut-thickness', name: 'UT Thickness' },
    { slug: 'inspection-cost-estimator', name: 'Inspection Cost Estimator' },
  ],
  faqs: [
    {
      q: 'What is the API half-life rule?',
      a: 'API inspection codes (510, 570, 653) set the next inspection interval at one-half of the calculated remaining life, subject to a code maximum. Halving builds in a safety margin so the equipment is re-inspected well before it could reach minimum thickness, accounting for uncertainty in the corrosion rate.',
    },
    {
      q: 'What are the maximum inspection intervals?',
      a: 'API 510 (pressure vessels): internal/on-stream not to exceed 10 years. API 570 (piping): internal/on-stream up to 10 years (class-dependent; longer only with RBI). API 653 (storage tanks): external every 5 years, internal not to exceed 20 years (often shortened by RBI or RBI-derived corrosion rates). RBI per API 580/581 can extend intervals within the code maximum when justified.',
    },
    {
      q: 'Which corrosion rate do I use?',
      a: 'Use the governing rate — the greater of the long-term rate (from original/installation thickness over total service time) and the short-term rate (between the two most recent inspections). Taking the larger value is conservative and required by the codes, because an accelerating corrosion mechanism would otherwise be masked by a low long-term average.',
    },
  ],
  citations: [
    { id: 'api-510', source: 'API 510 — Pressure Vessel Inspection Code (remaining life, inspection intervals).' },
    { id: 'api-570', source: 'API 570 — Piping Inspection Code.' },
    { id: 'api-653', source: 'API 653 — Tank Inspection, Repair, Alteration, and Reconstruction.' },
    { id: 'api-579', source: 'API 579-1/ASME FFS-1 — Fitness-For-Service (for localised damage beyond simple CR).' },
  ],
};

export default tool;
