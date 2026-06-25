import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'weld-metal-weight',
  name: 'Weld Metal Weight & Filler Calculator',
  category: 'planning',
  inputs: [
    { id: 'joint', label: 'Joint type', type: 'select' },
    { id: 'thickness', label: 'Plate thickness / fillet leg', unit: 'mm', type: 'number' },
    { id: 'angle', label: 'Included groove angle', unit: '°', type: 'number' },
    { id: 'root_gap', label: 'Root gap', unit: 'mm', type: 'number' },
    { id: 'length', label: 'Weld length', unit: 'mm', type: 'number' },
    { id: 'process', label: 'Welding process (efficiency)', type: 'select' },
  ],
  outputs: [
    { id: 'area_mm2', label: 'Weld cross-section area', unit: 'mm²' },
    { id: 'deposit_kg', label: 'Deposited weld metal', unit: 'kg' },
    { id: 'filler_kg', label: 'Filler required', unit: 'kg' },
  ],
  metaTitle: 'Weld Metal Weight & Filler Calculator | Deposit Weight, Consumables',
  metaDescription:
    'Estimate deposited weld metal weight and filler-metal consumption for single-V butt and fillet welds. Cross-section × length × steel density ÷ deposition efficiency (SMAW, GMAW, FCAW, SAW).',
  heroLede:
    'Before a fabrication job is quoted, someone has to know how many kilograms of wire or rod the weld will eat. Deposited weld metal weight comes straight from the joint geometry — cross-sectional area times length times steel density — and the filler you actually buy is that figure divided by the process deposition efficiency. This tool runs both for single-V butt and fillet welds so estimators and QC can size consumables and weld-cost.',
  howItWorks:
    'The deposited weight is the weld cross-sectional area multiplied by the weld length and the density of steel (7.85 g/cm³). For a single-V butt the area is the root gap times the thickness plus the triangular groove area t²·tan(θ/2), with a small reinforcement allowance. For a fillet the area is half the leg length squared plus a convexity allowance. Because not all filler ends up in the joint — some is lost to spatter, slag and stub ends — the filler purchased is the deposited weight divided by the process deposition efficiency (about 0.65 for SMAW, 0.90 for GMAW, 0.85 for FCAW, 0.95 for SAW).',
  formula: 'Single-V area = root_gap·t + t²·tan(θ/2) + reinforcement ;  Fillet area = 0.5·leg² × 1.1 ;  Deposit (kg) = area·length·7.85e-6 ;  Filler = Deposit / efficiency',
  workedExample: {
    inputs: { joint: 'Single-V butt', thickness: 12, angle: 60, root_gap: 2, length: 1000, process: 'GMAW (0.90)' },
    outputs: { area_mm2: '108', deposit_kg: '0.85', filler_kg: '0.94' },
    explanation:
      'Groove area = root_gap·t + t²·tan(30°) + reinforcement = 2×12 + 144×0.577 + ~0.1×width ≈ 24 + 83 + 1 ≈ 108 mm². Over a 1 m weld: deposit = 108 × 1000 × 7.85e-6 = 0.85 kg. At 90% GMAW efficiency the filler to purchase is 0.85 / 0.90 = 0.94 kg.',
  },
  whenToUse:
    'Use when estimating a fabrication job, sizing a consumable order, or building a weld-cost model — pair it with the weld-cost tool to turn kilograms into labour and material dollars.',
  limitations: [
    'Geometry is idealised — actual deposit varies with fit-up, reinforcement height, and weaving technique.',
    'Density 7.85 g/cm³ is carbon/low-alloy steel; stainless (~8.0) and nickel alloys differ slightly.',
    'Deposition efficiencies are typical ranges — use the consumable manufacturer\'s figure for precise jobs.',
    'Does not include tack welds, run-on/run-off tabs, or repair allowance.',
    'For double-V, U, and J grooves the area formula differs — this tool covers single-V butt and fillet only.',
  ],
  relatedTools: [
    { slug: 'weld-cost', name: 'Weld Cost Estimator' },
    { slug: 'inspection-cost-estimator', name: 'Inspection Cost Estimator' },
  ],
  faqs: [
    { q: 'How is deposited weld metal weight calculated?', a: 'Deposited weight = weld cross-sectional area × weld length × steel density (7.85 g/cm³). The cross-section comes from the joint geometry — for a single-V butt it is the root-gap rectangle plus the triangular groove area t²·tan(half-angle) plus a reinforcement allowance; for a fillet it is roughly half the leg squared plus convexity.' },
    { q: 'What is the difference between deposited weight and filler purchased?', a: 'Deposited weight is the metal that ends up in the joint. Filler purchased is larger because some consumable is lost to spatter, slag, and stub ends. Divide the deposited weight by the process deposition efficiency — about 0.65 for SMAW, 0.90 for GMAW, 0.85 for FCAW, and 0.95 for SAW — to get the quantity to buy.' },
    { q: 'Which welding process has the best deposition efficiency?', a: 'Submerged arc welding (SAW) is highest at around 0.95, followed by solid-wire GMAW at ~0.90 and flux-cored FCAW at ~0.85. Stick welding (SMAW) is lowest at ~0.65 because of stub-end loss and slag. Higher efficiency means less filler purchased for the same deposited weight.' },
    { q: 'Does this calculator handle stainless steel?', a: 'The geometry is identical; only the density changes — austenitic stainless is about 8.0 g/cm³ versus 7.85 for carbon steel, roughly a 2% difference. For most estimating the carbon-steel figure is close enough, but use the alloy density for precise consumable orders.' },
    { q: 'Why estimate weld metal weight at all?', a: 'It drives consumable purchasing, welding time (deposition rate × weight), and cost estimating. Underestimating starves a job of wire; overestimating ties up cash in inventory. It is also the basis for the weld-cost calculation that turns kilograms into labour and material dollars.' },
  ],
  citations: [
    { id: 'aws-whb', source: 'AWS Welding Handbook, Vol. 1 — Welding Science and Technology (joint geometry and deposition)' },
    { id: 'aws-d11', source: 'AWS D1.1/D1.1M — Structural Welding Code, Steel (groove and fillet weld geometry)' },
    { id: 'lincoln-procedure', source: 'Lincoln Electric / Procedure Handbook of Arc Welding — deposition efficiency tables' },
  ],
};

export default tool;
