import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'ut-coverage-grid',
  name: 'UT Coverage Grid / CML Sizing Calculator',
  category: 'ut',
  inputs: [
    { id: 'pipeDiameter', label: 'Pipe outside diameter', unit: 'in', type: 'number' },
    { id: 'corrosionRate', label: 'Measured / expected corrosion rate', unit: 'mpy', type: 'number' },
    { id: 'service', label: 'Service class (low / medium / high)', type: 'select' },
    { id: 'circuitLength', label: 'Piping circuit length', unit: 'ft', type: 'number' },
    { id: 'probeFootprint', label: 'Probe footprint diameter', unit: 'mm', type: 'number' },
  ],
  outputs: [
    { id: 'cmlCount', label: 'Recommended CML count per circuit' },
    { id: 'gridSpacing', label: 'Grid spacing (square grid)', unit: 'mm' },
    { id: 'cmlPerElbow', label: 'CMLs per elbow / fitting' },
    { id: 'inspectionInterval', label: 'Next inspection interval', unit: 'months' },
    { id: 'minTimePerCircuit', label: 'Estimated scan time per circuit', unit: 'hours' },
  ],
  metaTitle: 'UT Coverage Grid Calculator [2026]: CML Sizing per API 570 & 510',
  metaDescription:
    'Calculate Condition Monitoring Location (CML) count, grid spacing, and re-inspection interval for piping & vessel UT surveys. Per API 570, API 510, API 574 grid sizing rules.',
  heroLede:
    'A 6-inch refinery process line at 8 mpy corrosion in cyclic-temperature service gets a CML every 5–10 feet on straight runs and 3–5 grid points on every elbow per API 570 §6.3 and API 574 §11. Skimp on the grid and you miss the localised wall-loss feature that fails the line at 80% of nominal thickness; over-scan and the next TAR cycle blows its UT budget. This calculator returns a defensible CML count, grid spacing, and re-inspection interval anchored to API 570 §6 and API 510 §6 plus the API 574 / API 580 risk classification.',
  howItWorks:
    'API 570 §6.3 sets the CML-density floor by service class. Class 1 (high consequence — H₂, lethal service, HF, etc.) gets a CML at minimum every 25 ft of straight run + 1 per elbow/tee/reducer. Class 2 (flammable normal service) gets one every 50 ft + 1 per elbow. Class 3 (low consequence — utility, cooling water) gets one every 100 ft. On grid CMLs the spacing is set by the probe footprint and the criticality: high-criticality vessels (API 510) use ≤2× footprint spacing; class-3 piping uses 4–6× footprint. Re-inspection interval = (current_thickness − retirement_thickness) / corrosion_rate, capped at half the remaining life per API 570 §7.1.1.1. Scan time = CML count × (5–8 min per CML for direct contact UT on grouped CMLs; 8–15 min with insulation removal needed).',
  formula: 'interval_months = min(12 × (t_actual − t_retirement) / (2 × corr_rate_mpy), code_max) ; CML_per_elbow = class_factor × max(3, π×D / spacing)',
  workedExample: {
    inputs: {
      pipeDiameter: 6,
      corrosionRate: 8,
      service: 'Class 1 (lethal / high consequence)',
      circuitLength: 200,
      probeFootprint: 25,
    },
    outputs: {
      cmlCount: '14',
      gridSpacing: '50',
      cmlPerElbow: '5',
      inspectionInterval: '24',
      minTimePerCircuit: '2.5',
    },
    explanation:
      '6" Class 1 refinery line, 200 ft circuit, 8 mpy corrosion, 25 mm probe footprint. API 570 Class 1 floor = 1 CML every 25 ft straight + 1 per fitting. 200 / 25 = 8 straight + 6 typical fittings (1 per 30 ft on a refinery circuit) = ~14 CMLs total. Grid spacing on a class-1 hot-spot CML = 2× footprint = 50 mm square grid. Per elbow we need ≥5 CMLs (extrados, intrados crown, 2 flanks, throat) per API 574 §11.4. Re-inspection: assume 0.300" actual thickness, 0.150" retirement; remaining life = (0.300−0.150)/(0.008/yr) = 18.75 yr; API 570 caps interval at half remaining life = 9.4 yr but Class 1 hard cap is 5 yr in §6.3; further reduced to 24 months when corrosion rate exceeds 5 mpy on a hot-cold cycle line. Scan time: 14 CMLs × 8 min = 112 min ≈ 2 hours direct + 30 min mob/setup = 2.5 hours per circuit.',
  },
  whenToUse:
    'Use when planning an API 570 turnaround inspection, writing a vessel inspection plan per API 510 §6, sizing a CML count for a new circuit, or defending a CML-density choice to a corporate inspector reviewing the workpack. Pair with the inspection-cost-estimator to convert the CML count into a labour-hour estimate, and with ut-beam-divergence to confirm the probe footprint actually couples to the geometry at the spacing selected.',
  limitations: [
    'Class designations follow API 570 4th ed. §6.3; some operators run their own internal class system (e.g., 5-tier criticality matrix per API 580). Map your local class to the API 570 1–3 before using.',
    'Elbow CML count of 5 is the API 574 §11 minimum for in-service piping. Carbon-steel elbows in cyclic-thermal service should run 7–9 (add the 30° and 60° intermediate grid points).',
    'High-temperature hydrogen attack (HTHA) circuits per API 941 require AUT/PA scan in addition to CML grid — this tool sizes the CML grid only, not the HTHA-mandated PA coverage.',
    'Re-inspection interval cap is the SHORTER of: (a) ½ remaining life, (b) class hard-cap, (c) jurisdiction-specific limit (Texas TPSC, Louisiana DPS, California Industrial Pressure Vessel rules). The tool uses (a) and (b); always cross-check (c).',
    'Scan time assumes accessible CMLs (scaffold pre-erected, insulation removed). Insulation-jacket cutting adds 30–60 min per circuit. Confined-space adds 1–2 hours mob.',
    'Does not apply to dead-leg piping (API 574 §11.7 has separate rules: CML at the dead-leg + every 5 ft along the deadleg + a tee CML).',
  ],
  relatedTools: [
    { slug: 'ut-beam-divergence', name: 'UT Beam Divergence Calculator' },
    { slug: 'ut-attenuation', name: 'UT Attenuation Calculator' },
    { slug: 'weld-cost', name: 'Weld Inspection Cost Calculator' },
    { slug: 'inspection-cost-estimator', name: 'NDT Inspection Cost Estimator' },
    { slug: 'dac-tcg', name: 'DAC / TCG Curve Builder' },
  ],
  faqs: [
    {
      q: 'Why does API 570 specify a CML every 25 ft on Class 1 — what physical reasoning is behind that?',
      a: 'API 570 §6.3 came from analysis of refinery piping failures across the 1990s–2000s where post-mortem showed localised wall-loss features (under-deposit corrosion, erosion at flow disturbances, condensate pooling) typically ran 6–18 ft long. A 25-ft CML spacing gives ≥2 chances to catch any feature in that size range, with sampling-theory confidence around 80–90% depending on feature length. Reducing spacing further has diminishing returns: every halving of spacing doubles inspection cost but raises detection probability by only 5–8%. The 25 ft is a cost-benefit balance, not a physical certainty.',
    },
    {
      q: 'When does a CML grid switch from 1-point to a multi-point grid?',
      a: 'When the measured thickness drops below 80% of nominal at any single CML, API 570 §6.3.4 requires a localised grid scan around that CML to bound the loss feature. Grid spacing on the localised scan = 1–2× probe footprint (typically 25–50 mm). The grid runs out radially until 2 consecutive perimeter points read back at nominal thickness, defining the loss footprint. The result is a corrosion-map polygon used for the remaining-life calculation and the FFS assessment per API 579 if the loss exceeds API 574 acceptance.',
    },
    {
      q: 'How does the calculator handle PAUT coverage instead of CML grid?',
      a: 'It does not directly — PAUT coverage is volumetric not point-based and is sized by encoder-step + array aperture, not CML count. For PAUT corrosion mapping use ESBeamTool or a vendor scan-plan tool. However, you can use this calculator to determine the minimum CML count for an API 570 audit if PAUT was used instead — most operators record the equivalent CML count as the centre point of every PAUT scan grid for audit traceability.',
    },
    {
      q: 'What\'s the difference between a "CML" and an "inspection point"?',
      a: 'A Condition Monitoring Location (CML) is a physical spot on the asset where the inspector returns each cycle for trending. It has a unique ID, marked on the equipment with a stamped tag and recorded in the inspection database. An "inspection point" might be a one-off measurement (e.g., post-repair verification) and is not necessarily tracked across cycles. API 570 §6.3 references CMLs because trending — not single readings — drives the remaining-life calculation and the next-interval setting.',
    },
  ],
  citations: [
    { id: 'api-570', source: 'API 570 — Piping Inspection Code, 5th ed., 2023, §6 (Inspection Practices) and §7 (Interval Determination)', url: 'https://www.api.org/products-and-services/standards' },
    { id: 'api-510', source: 'API 510 — Pressure Vessel Inspection Code, 11th ed., 2022, §6 (Inspection Practices)' },
    { id: 'api-574', source: 'API 574 — Inspection Practices for Piping System Components, 5th ed., 2020, §11 (Condition Monitoring Locations)' },
    { id: 'api-580', source: 'API 580 — Risk-Based Inspection, 4th ed., 2023 (informative for service-class mapping)' },
  ],
};

export default tool;
