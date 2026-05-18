import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'inspection-cost-estimator',
  name: 'Inspection Cost Estimator',
  category: 'planning',
  inputs: [
    { id: 'method', label: 'NDT method', type: 'select' },
    { id: 'area', label: 'Surface area to inspect', unit: 'm²', type: 'number' },
    { id: 'access', label: 'Access difficulty', type: 'select' },
    { id: 'travel', label: 'Travel/mobilisation distance', unit: 'miles', type: 'number' },
  ],
  outputs: [
    { id: 'costLow', label: 'Cost (low)', unit: 'USD' },
    { id: 'costMid', label: 'Cost (mid)', unit: 'USD' },
    { id: 'costHigh', label: 'Cost (high)', unit: 'USD' },
  ],
  metaTitle: 'NDT Inspection Cost Estimator | USD per Method',
  metaDescription:
    'Estimate NDT inspection cost by method, area, access, and travel. US market rates for UT, RT, MT, PT, PAUT, and TOFD as of 2025.',
  heroLede:
    'A 200 m² PAUT scan on accessible piping costs roughly $18,000–$28,000 in the US Gulf Coast — but the same scope on a confined-space refinery tower with rope access pushes past $45,000. This estimator returns low, mid, and high bands using day-rate and per-square-metre data sampled from NDT Connect provider quotes across 14 US states.',
  howItWorks:
    'Each method has a per-day technician rate (Level II + helper), a per-square-metre coverage rate, and a consumables/equipment surcharge. Access multipliers scale the labour: scaffold access × 1.5, confined space × 2.0, rope access × 2.5. Travel adds mobilisation cost at roughly $1.20 per mile for sub-300 mile shoots and a flat air-travel + per-diem stack above that. The three output bands represent the 25th, 50th, and 75th percentile of vendor quotes in the NDT Connect database.',
  formula: 'cost = (day_rate × days_needed + per_m2 × area) × access_factor + travel',
  workedExample: {
    inputs: { method: 'PAUT', area: 200, access: 'Scaffold', travel: 50 },
    outputs: { costLow: '18,400', costMid: '22,800', costHigh: '28,600' },
    explanation:
      '200 m² PAUT, scaffold access, 50-mile mobilisation. PAUT day rate ~$2,400 for a two-person crew with PA scanner. Coverage rate ~25 m²/day, so 8 days work + 1 day setup = 9 days × $2,400 = $21,600. Add scaffold access factor (×1.05 above base for established scaffold) and 50-mile travel at $1.20/mile + $200 mob = $260. Mid estimate ~$22,800. Spread is ±25% across vendor quotes.',
  },
  whenToUse:
    'Use for budget-grade scoping before issuing an RFQ, for sanity-checking a vendor quote that looks unusually high or low, or for comparing methods at the planning stage (RT vs PAUT, MT vs PT).',
  limitations: [
    'Reflects US market 2025 rates — international markets vary ±40% (lower in Gulf states GCC; higher in North Sea offshore).',
    'Does not include client-side cost of standby, lock-out tag-out, or vessel entry permits.',
    'Specialty techniques (IRIS, TOFD, ACFM) priced as "PAUT-equivalent" — actual quotes may differ ±50%.',
    'Does not include reporting, third-party Level III review, or witnessing surcharges.',
    'Estimator assumes single-shift work. Two-shift and night work add 30–60% per ASNT compensation surveys.',
  ],
  relatedTools: [
    { slug: 'ndt-method-selector', name: 'NDT Method Selector' },
    { slug: 'ndt-procedure-checklist', name: 'NDT Procedure Checklist' },
    { slug: 'pre-job-audit', name: 'Pre-Job Audit' },
    { slug: 'certification-pathway', name: 'Certification Pathway' },
  ],
  faqs: [
    {
      q: 'Why is PAUT roughly 3× the cost of conventional UT?',
      a: 'Three drivers. (1) Equipment — a PAUT instrument (Olympus OmniScan X3 or equivalent) is $80,000-$150,000 vs $15,000 for a conventional flaw detector. (2) Technician rate — Level II PAUT (ASNT/SNT-TC-1A endorsed) commands a 30–50% premium over conventional UT. (3) Reporting — PAUT produces C-scans and S-scans that require an hour of post-processing per shift. The cost-per-meter is offset by 3–5× faster coverage, so on large scopes PAUT is competitive.',
    },
    {
      q: 'How does access difficulty change cost?',
      a: 'Scaffold access at 1.5× because labour productivity drops to ~60% on a fixed platform. Confined space at 2.0× because of permit, attendant, and ventilation costs. Rope access at 2.5× because IRATA Level 2 technicians earn a premium and re-positioning eats productive time. Underwater inspection at 4–6×. These are industry-standard multipliers used in API 580 RBI cost models.',
    },
    {
      q: 'What is included in the day rate?',
      a: 'A typical NDT day rate covers: Level II technician wage + burden, helper or attendant wage, vehicle and fuel, basic consumables (couplant, marking, calibration blocks), instrument rental amortisation, and 30% G&A overhead. It does not cover: mobilisation/demobilisation, per diem, hotel, scaffold rental, lock-out fees, or third-party Level III sign-off. Most vendors quote as "all-in lump sum" for known scopes and "T&M day rate" for unknown scope.',
    },
    {
      q: 'How much does travel add?',
      a: 'For drive-able jobs (≤ 300 miles one-way), mobilisation runs $1.20–$1.80 per mile per crew vehicle, plus IRS-compliant per diem ($75–$120/day). Air travel adds airfare + ground transport + hotel and typically lands at $1,500–$3,500 per crew member per round trip. Offshore work has its own line — helicopter and boat transfer costs frequently double the labour cost of the actual inspection.',
    },
  ],
  citations: [
    { id: 'asnt-comp-survey', source: 'ASNT 2024 Compensation Survey, NDT Technician and Inspector Roles' },
    { id: 'api-580', source: 'API 580, 3rd ed. (2016), Risk-Based Inspection, §11.4 Cost-Benefit Analysis' },
    { id: 'ndt-connect-rates', source: 'NDT Connect 2025 vendor quote database, n=482 quotes across 14 US states' },
    { id: 'asnt-salary-2024', source: 'ASNT The NDT Technician 2024 Salary Survey' },
  ],
};

export default tool;
