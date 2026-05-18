import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'pt-dwell-time',
  name: 'PT Dwell Time Calculator',
  category: 'pt',
  inputs: [
    { id: 'temperature', label: 'Surface temperature', unit: '°F', type: 'number' },
    { id: 'surface', label: 'Surface condition', type: 'select' },
    { id: 'defect', label: 'Defect type', type: 'select' },
  ],
  outputs: [
    { id: 'penetrantDwell_min', label: 'Penetrant dwell', unit: 'min' },
    { id: 'developerDwell_min', label: 'Developer dwell', unit: 'min' },
  ],
  metaTitle: 'PT Dwell Time Calculator | ASTM E165 / E1417',
  metaDescription:
    'Look up correct penetrant and developer dwell times for liquid penetrant inspection per ASTM E165 §10.5 / E1417 Table 2 and ASME V Article 6.',
  heroLede:
    'Too little penetrant dwell and a tight crack never fills; too much and the penetrant dries on the surface and rejects the developer. ASTM E165 Table 2 gives the working dwell range — 5 min for forgings at 60 °F, 10 min for grinding cracks on a casting at 40 °F, 30 min for stress corrosion in stainless. This tool returns the table value plus the developer dwell, which is usually half the penetrant time but never less than 7 minutes per ASME V T-672.',
  howItWorks:
    'Penetrant dwell is the minimum time for capillary action to fill a candidate discontinuity. ASTM E165/E1417 publish minimums for each combination of material form (casting, forging, weld) and defect type (porosity, cold shut, fatigue crack, stress corrosion). Lower surface temperature slows capillary draw — below 50 °F the dwell roughly doubles. Developer dwell controls how long the developer pulls penetrant back to the surface to form an indication; ASME V Art. 6 T-672 sets minimum 7 minutes, with practical upper limit at 60 minutes before the indication bleeds out.',
  formula: 'dwell_eff = base_dwell × temperature_factor (lookup table)',
  workedExample: {
    inputs: { temperature: 70, surface: 'Weld', defect: 'Fatigue crack' },
    outputs: { penetrantDwell_min: '15', developerDwell_min: '10' },
    explanation:
      'Routine weld inspection for fatigue cracks at 70 °F. ASTM E165 Table 2 lists 10 minutes minimum penetrant dwell for welds at standard temperature. Stepping up to fatigue-crack target (tight discontinuity) bumps the dwell to 15 min per E1417 §6.3.5. Developer dwell is then minimum 7 min, target ~10 min per ASME V §T-672. Below 50 °F or above 125 °F the procedure must be qualified separately per ASTM E165 §6.4.',
  },
  whenToUse:
    'Use before every PT shot to confirm dwell time meets the relevant code, to plan multi-stage inspections across temperature swings, and to write procedure-specific time-on-tools sheets for crew planning.',
  limitations: [
    'Default table values apply only between 50 °F and 125 °F (10–52 °C) per ASTM E165 §6.4.',
    'Highly viscous solvent-removable penetrants need 50% longer dwell than water-washable types — code does not always reflect this.',
    'Tight stress-corrosion cracks may require 60+ min dwell with a Method C non-aqueous wet developer; field practice diverges from the table minimums.',
    'Surface roughness above 250 RMS micro-inch makes developer dwell longer — soak indications can take 20+ min to bleed out.',
    'Does not replace procedure qualification; this is a planning aid, not a sign-off.',
  ],
  relatedTools: [
    { slug: 'mt-field-strength', name: 'MT Field Strength' },
    { slug: 'ndt-method-selector', name: 'NDT Method Selector' },
    { slug: 'ndt-procedure-checklist', name: 'NDT Procedure Checklist' },
    { slug: 'cal-block-selector', name: 'Cal Block Selector' },
  ],
  faqs: [
    {
      q: 'Why does dwell time change with temperature?',
      a: 'Capillary draw drives penetrant into a discontinuity. Penetrant viscosity rises ~3% per °C drop, slowing draw. ASTM E165 §6.4 splits dwell into three temperature bands: 50–125 °F use the table directly; below 50 °F or above 125 °F the procedure must be qualified by running a TAM (test panel) shot showing comparable sensitivity. Most cold-weather work uses heated penetrant sprays or warming blankets to keep the part above 50 °F rather than re-qualify.',
    },
    {
      q: 'What is the minimum developer dwell?',
      a: 'ASME V T-672 sets 7 minutes minimum for any developer type. ASTM E165 Table 2 puts the minimum at 10 minutes for non-aqueous wet developers (Method d) and 7 minutes for dry powder developers (Method a). Practical max is 60 minutes before the indication bleeds wide and shape is lost. Most procedures land at 10–15 minutes for routine work and 20–30 minutes for stress-corrosion inspection of sensitized stainless.',
    },
    {
      q: 'Can I shortcut dwell by spraying more penetrant?',
      a: 'No — re-application during dwell is explicitly prohibited by ASME V T-633 and ASTM E165 §10.5.1. Doing it dilutes the penetrant inside any partially-filled discontinuity and washes out the high-concentration leading edge that drives capillary action. The dwell starts when the last drop of penetrant is applied and the timer cannot reset.',
    },
    {
      q: 'How long can a part sit between developer application and inspection?',
      a: 'Inspection must occur between 7 and 60 minutes after developer application per ASME V T-676. Beyond 60 minutes the indication has bled to roughly twice its original size, distorting both length measurement and rejection calls. If inspection cannot be completed in that window the part must be reprocessed from the cleaning step — dwell cannot be paused or extended.',
    },
  ],
  citations: [
    { id: 'astm-e165', source: 'ASTM E165/E165M-23 Standard Practice for Liquid Penetrant Examination' },
    { id: 'astm-e1417', source: 'ASTM E1417/E1417M-21 Standard Practice for Liquid Penetrant Testing' },
    { id: 'asme-v-art-6', source: 'ASME BPVC Section V (2023), Article 6 Liquid Penetrant Examination' },
    { id: 'asnt-snt-tc-1a', source: 'ASNT SNT-TC-1A (2020), PT Personnel Qualification' },
  ],
};

export default tool;
