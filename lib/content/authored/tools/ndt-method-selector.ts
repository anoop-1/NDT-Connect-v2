import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'ndt-method-selector',
  name: 'NDT Method Selector',
  category: 'planning',
  inputs: [
    { id: 'material', label: 'Material type', type: 'select' },
    { id: 'defect', label: 'Suspected defect type', type: 'select' },
    { id: 'access', label: 'Access', type: 'select' },
    { id: 'thickness', label: 'Wall thickness', unit: 'mm', type: 'number' },
  ],
  outputs: [
    { id: 'primaryMethod', label: 'Primary recommended method' },
    { id: 'secondaryMethod', label: 'Secondary / confirmatory method' },
  ],
  metaTitle: 'NDT Method Selector | Decision Tree by Material & Defect',
  metaDescription:
    'Pick the right NDT method for the material, defect type, and access constraints. Logic follows ASNT recommended practice and API 510/570/653.',
  heroLede:
    'Surface crack on a ferromagnetic weld with both sides accessible? MT wins. Embedded lack of fusion in a 50 mm pipe with insulation on one side? PAUT or RT — and the cost calculator should tell you which. This selector runs the decision tree that an experienced Level III walks through every time a procedure is written.',
  howItWorks:
    'Each method has a sweet spot defined by three axes: what defect types it detects (surface vs sub-surface, planar vs volumetric), what materials it works on (ferromagnetic, non-ferromagnetic, magnetic stainless, composite), and what access it needs (one-sided, two-sided, immersion). The selector cross-references the inputs against a method-suitability matrix derived from ASNT Handbook Vol. 4 (UT), Vol. 3 (RT), and Vol. 6 (MT/PT) chapter tables. Primary returned is the method with highest sensitivity; secondary is the next-best for confirmation or for parts that fall outside the primary\'s envelope.',
  formula: 'method = lookup(material × defect × access × thickness)',
  workedExample: {
    inputs: { material: 'Carbon steel', defect: 'Surface crack', access: 'One-sided', thickness: 25 },
    outputs: { primaryMethod: 'MT (wet fluorescent)', secondaryMethod: 'PT or ECA' },
    explanation:
      'Ferromagnetic, surface defect, one-sided access. MT wet-fluorescent particles are the highest-sensitivity surface method for ferromagnetic steel. PT works but loses to MT on speed for ferromagnetic substrates. ECA is the confirmatory choice when paint or coating prevents the MT prep step. RT and UT are rejected — RT is volumetric, UT angle-beam needs a wedge contact path the access constraint may not allow.',
  },
  whenToUse:
    'Use at procedure-writing time, during job estimation, and as a training aid for inspection engineers learning method selection. Not a substitute for the formal procedure qualification record (PQR).',
  limitations: [
    'Selector returns conventional methods only. Specialised techniques (TOFD, IRIS, AUBT, RFT) require Level III review.',
    'Does not account for cost — pair with the inspection cost estimator.',
    'Does not consider regulator or code constraints — some standards mandate a specific method regardless of suitability.',
    'Thickness thresholds are typical; specific procedures may push limits with custom calibration.',
    'Material classifications are coarse (ferromagnetic vs non) — for austenitic-clad ferromagnetic substrates a Level III decision is needed.',
  ],
  relatedTools: [
    { slug: 'inspection-cost-estimator', name: 'Inspection Cost Estimator' },
    { slug: 'cal-block-selector', name: 'Cal Block Selector' },
    { slug: 'probe-angle-selector', name: 'Probe Angle Selector' },
    { slug: 'ndt-procedure-checklist', name: 'NDT Procedure Checklist' },
  ],
  faqs: [
    {
      q: 'When should I pick MT over PT?',
      a: 'For any ferromagnetic surface, MT is faster, more sensitive to tight cracks, and works through thin paint and oil films that defeat PT. PT wins on non-ferromagnetic materials (aluminum, copper, austenitic stainless, titanium) and on parts where the field cannot be applied (small thin sections, complex geometry that cannot be magnetised uniformly). ASTM E165 §1.3 and ASTM E709 §1.3 give the explicit guidance.',
    },
    {
      q: 'When does UT beat RT?',
      a: 'UT beats RT for planar defects (lack of fusion, cracks) parallel to the inspection surface — RT misses anything within ±15° of the radiation beam. UT also beats RT when access is one-sided, when thickness exceeds ~75 mm steel (RT exposure times become prohibitive), and on safety-sensitive work where radiation boundaries shut down adjacent operations. RT beats UT for volumetric defects (porosity, inclusions, slag) on welds where both sides are accessible and the geometry is favourable for film placement.',
    },
    {
      q: 'Where does PAUT fit?',
      a: 'Phased-array UT is the modern replacement for conventional UT on welds 6 mm and thicker. ASME V Art. 4 §T-451 allows PAUT instead of RT for most code construction work. PAUT excels at electronic angle steering (no wedge change for 45/60/70°), real-time S-scan visualisation, and through-coating inspection of insulated piping. It is overkill — and over-cost — for spot thickness or simple weld coverage where conventional 0° UT or angle-beam pulse-echo suffices.',
    },
    {
      q: 'What about eddy current?',
      a: 'EC is the right choice for surface and near-surface flaws in non-ferromagnetic conductive materials — aluminum aerospace structure, brass and cupro-nickel tubing, austenitic stainless welds. It runs at sensor speed (no couplant, no consumables, fast scan rates) and outputs a phase-versus-amplitude plot that distinguishes lift-off from crack signal. For ferromagnetic steel, conventional EC is replaced by ECA with saturation or by RFT for tubular work.',
    },
  ],
  citations: [
    { id: 'asnt-handbook-vol4', source: 'ASNT Nondestructive Testing Handbook, 3rd ed., Vol. 4 Radiographic Testing (2002)' },
    { id: 'asnt-handbook-vol6', source: 'ASNT Nondestructive Testing Handbook, 3rd ed., Vol. 6 MT/PT (2008)' },
    { id: 'api-510', source: 'API 510, 11th ed. (2022), Pressure Vessel Inspection Code' },
    { id: 'api-570', source: 'API 570, 5th ed. (2020), Piping Inspection Code' },
    { id: 'asme-v', source: 'ASME BPVC Section V (2023), Nondestructive Examination' },
  ],
};

export default tool;
