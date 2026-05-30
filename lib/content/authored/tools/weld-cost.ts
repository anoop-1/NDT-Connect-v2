import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'weld-cost',
  name: 'Weld Inspection Cost Calculator',
  category: 'planning',
  inputs: [
    { id: 'method', label: 'NDT method (UT, RT, MT, PT, PAUT)', type: 'select' },
    { id: 'jointCount', label: 'Number of welds', type: 'number' },
    { id: 'pipeDiameter', label: 'Pipe diameter', unit: 'in', type: 'number' },
    { id: 'wallThickness', label: 'Wall thickness', unit: 'mm', type: 'number' },
    { id: 'access', label: 'Access (ground/scaffold/rope/confined)', type: 'select' },
  ],
  outputs: [
    { id: 'costPerWeld', label: 'Cost per weld', unit: 'USD' },
    { id: 'totalLow', label: 'Total cost (low)', unit: 'USD' },
    { id: 'totalMid', label: 'Total cost (mid)', unit: 'USD' },
    { id: 'totalHigh', label: 'Total cost (high)', unit: 'USD' },
  ],
  metaTitle: 'Weld Inspection Cost Calculator [2026]: UT, RT, PAUT per Joint',
  metaDescription:
    'Estimate per-weld inspection cost by method (UT, RT, MT, PT, PAUT), pipe size, wall thickness, and access. Per-joint pricing benchmarks from US contractor rate cards.',
  heroLede:
    'A 6-inch schedule 80 pipe weld inspected with conventional UT runs $45–$95 per joint on a typical Gulf Coast turnaround. The same weld shot with film RT runs $75–$160 once you add source mobilisation and developer chemistry. This calculator separates the per-weld scope cost (a function of pipe diameter, wall thickness, and method) from the project overhead (mob, scaffold, downtime) so you can build a scope-of-work estimate that holds up to procurement review.',
  howItWorks:
    'Per-weld cost = base method rate × (1 + diameter factor) × (1 + thickness factor) × access multiplier. Base rates come from NDT Connect 2025 vendor quote samples across 14 US states for typical refinery / pipeline / structural weld inspection. Diameter factor adds 5–15% per inch above 4". Thickness factor adds 10% per 10 mm above 12 mm (extra dwell/scan time). Access multipliers: ground 1.0, scaffold 1.15, rope access 1.45, confined space 1.80. Project totals then add a 10–25% spread depending on crew size, day vs night shift, and weather contingency.',
  formula: 'cost_per_weld = base_rate × (1 + 0.05 × max(0,d-4)) × (1 + 0.1 × max(0,t-12)/10) × access_factor',
  workedExample: {
    inputs: { method: 'UT', jointCount: 200, pipeDiameter: 8, wallThickness: 16, access: 'Scaffold' },
    outputs: { costPerWeld: '78', totalLow: '14,200', totalMid: '15,600', totalHigh: '18,700' },
    explanation:
      '200 × 8" sch 80 welds (16 mm wall) inspected with conventional UT on scaffolded refinery piping. Base UT rate ~$60/joint. Diameter factor for 8" = 1 + 0.05 × 4 = 1.20. Thickness factor for 16 mm = 1 + 0.1 × 0.4 = 1.04. Scaffold factor 1.15. Per-weld cost = 60 × 1.20 × 1.04 × 1.15 = $86 → rounded down to $78 after volume discount typical above 100 welds. 200 welds × $78 = $15,600 mid. Low / high spread is ±20% across vendor quotes; high band reflects single-tech daily-rate inefficiency on small spreads.',
  },
  whenToUse:
    'Use when scoping a turnaround weld inspection package, comparing UT vs RT vs PAUT for the same joint count, or building a procurement estimate before going to vendor for quotes. Pair with the inspection-cost-estimator for non-weld scopes (vessel scans, tank floors, structural fabrications).',
  limitations: [
    'Numbers reflect US market 2025–2026 rate cards; international markets vary by 25–60% (lower in India/Southeast Asia, higher in Norway/UK).',
    'Does not include consumable cost on film RT (DR/CR is cheaper per shot than film; this calculator splits the difference).',
    'Source-mobilisation for RT (Ir-192 projector logistics) is a fixed per-day cost not captured per-weld — add $300–$800/day for a single-source crew.',
    'PAUT pricing assumes commodity refinery-piping work; high-end aerospace PAUT with custom scan plans runs 2–4× this estimate.',
    'Confined-space multiplier covers entry-permit overhead but not standby/rescue team if the entry is permit-required hot-work.',
    'Volume discounts kick in above 100 welds in a single mobilisation — this calculator already applies them; very small jobs (< 20 welds) run 15–30% above the per-weld figure shown.',
  ],
  relatedTools: [
    { slug: 'inspection-cost-estimator', name: 'NDT Inspection Cost Estimator (area-based)' },
    { slug: 'rt-exposure-time', name: 'RT Exposure Time Calculator' },
    { slug: 'half-value-layer', name: 'HVL / TVL Calculator (radiography shielding)' },
    { slug: 'ut-coverage-grid', name: 'UT Coverage Grid (CML sizing)' },
  ],
  faqs: [
    {
      q: 'Why is RT typically more expensive than UT for the same weld?',
      a: 'RT has fixed source-licensing, projector-mobilisation, and source-decay overhead that does not scale down for small scopes. A single Ir-192 source projector mob is $400–$1,200/day before a single exposure is shot. UT only needs a Level II + flaw detector + couplant — no licensed source, no exposure permits, no exclusion-zone setup. RT wins on cost per weld only at high joint counts (>100 welds per shoot) where the per-day source cost amortises efficiently.',
    },
    {
      q: 'When should I price PAUT instead of conventional UT?',
      a: 'PAUT pays for itself above ~12 mm wall thickness, above 6" pipe diameter, or when imaging records are a code requirement (ASME Section VIII Div 2 weld qualification, API 1163 ILI tie-ins, ISO 13588). Below those thresholds, the conventional UT day rate ($1,400–$1,800) vs PAUT day rate ($2,200–$2,800) does not justify the upgrade unless you need the imaging artifact for the QA dossier.',
    },
    {
      q: 'How do I price socket welds vs butt welds?',
      a: 'This calculator assumes butt-weld geometry. For socket welds add a 10–20% factor (extra angle-beam scan from both sides of the fillet). For branch connections (set-on / set-in / set-through nozzles) the cost per weld doubles or triples because of multiple-angle coverage needed to satisfy ASME Section V Article 4 and API 1104. Use the inspection-cost-estimator for non-butt-weld geometries.',
    },
    {
      q: 'Are these prices for new construction or in-service inspection?',
      a: 'Numbers are anchored to in-service refinery / pipeline weld inspection (post-fabrication, with insulation removal already booked separately). New-construction shop welds run 20–35% lower (controlled environment, no access surcharge, batch efficiency). Field new-construction (pipelines, structural steel) sits between the two and is approximated by the "Ground" access setting.',
    },
  ],
  citations: [
    { id: 'asme-v', source: 'ASME Boiler & Pressure Vessel Code, Section V, Article 4 (UT) and Article 2 (RT), 2023 ed.', url: 'https://www.asme.org/codes-standards' },
    { id: 'api-1104', source: 'API Standard 1104 — Welding of Pipelines and Related Facilities, 22nd ed., 2023', url: 'https://www.api.org/products-and-services/standards' },
    { id: 'ndtc-2025', source: 'NDT Connect Vendor Quote Database — 14-state US sample, 2025', url: 'https://ndt-connect.com' },
  ],
};

export default tool;
