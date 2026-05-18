import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'half-value-layer',
  name: 'Half-Value Layer (HVL) Calculator',
  category: 'rt',
  inputs: [
    { id: 'source', label: 'Radiation source', type: 'select' },
    { id: 'material', label: 'Shielding material', type: 'select' },
  ],
  outputs: [
    { id: 'hvl_mm', label: 'Half-value layer', unit: 'mm' },
    { id: 'tvl_mm', label: 'Tenth-value layer', unit: 'mm' },
  ],
  metaTitle: 'Half-Value Layer (HVL) Calculator | Ir-192, Co-60, Se-75',
  metaDescription:
    'Calculate half-value and tenth-value layers for Ir-192, Co-60, and Se-75 gamma sources through lead, steel, and concrete. Per ANSI N43.3 shielding tables.',
  heroLede:
    'HVL is the thickness of a given material that drops the gamma intensity by half. It is the number a radiographer pencils on a survey map when laying out boundaries, and it is the same number a regulator audits when reviewing a posted dose-rate. This tool tabulates published HVL and TVL values for the three sources in everyday industrial use — Ir-192, Co-60, and Se-75 — across lead, steel, tungsten, and concrete.',
  howItWorks:
    'Gamma attenuation through a uniform absorber follows I = I₀ × e^(-μx) where μ is the linear attenuation coefficient. Setting I/I₀ = 0.5 and solving gives HVL = ln(2)/μ. The same algebra with I/I₀ = 0.1 gives the tenth-value layer (TVL). μ depends on photon energy and absorber atomic number, so each source-material pair has its own HVL. Industry shielding design uses tabulated values from NCRP Report 49 and ANSI N43.3 rather than re-deriving from cross-sections.',
  formula: 'HVL = ln(2) / μ ;  TVL = ln(10) / μ',
  workedExample: {
    inputs: { source: 'Ir-192', material: 'Lead' },
    outputs: { hvl_mm: '4.8', tvl_mm: '16.0' },
    explanation:
      'Iridium-192 emits an average gamma energy of 380 keV. The linear attenuation coefficient in lead at that energy is ~1.44 cm⁻¹, giving HVL = ln(2)/1.44 = 0.48 cm = 4.8 mm. Ten HVLs (48 mm) drops intensity to ~0.1% — which is why a 50 mm lead pot is the working benchmark for an Ir-192 source projector storage container.',
  },
  whenToUse:
    'Use when laying out a radiography boundary, sizing a temporary lead blanket wall, sanity-checking a shielding calculation submitted by a vendor, or briefing a permit-issuing authority on dose rates outside a controlled area.',
  limitations: [
    'Values assume narrow-beam, mono-energetic gamma — broad-beam scatter buildup adds 10-40% to required thickness.',
    'Ir-192 spectrum has 8 distinct gamma lines (296–612 keV). Tabulated HVL is the effective average.',
    'Concrete HVL assumes density 2.35 g/cm³; barite or heavy concrete differs significantly.',
    'Does not account for source decay over time — pair with the source-decay calculator for current activity.',
    'For X-ray tubes the HVL depends on tube kV and inherent filtration; use a kV-specific table from NCRP 49.',
  ],
  relatedTools: [
    { slug: 'radiation-safe-distance', name: 'Radiation Safe Distance' },
    { slug: 'source-decay', name: 'Source Activity Decay' },
    { slug: 'rt-exposure-time', name: 'RT Exposure Time' },
    { slug: 'astm-e94-exposure-lookup', name: 'ASTM E94 Exposure Lookup' },
  ],
  faqs: [
    {
      q: 'Why is HVL different for Ir-192 versus Co-60?',
      a: 'Cobalt-60 emits at 1.17 and 1.33 MeV — much higher energy than the 296–612 keV spread of Ir-192. Higher-energy photons interact less per centimetre of lead, so HVL in lead rises from ~4.8 mm for Ir-192 to ~12 mm for Co-60. The practical consequence: a Co-60 source projector needs roughly 2.5× the lead shielding of an Ir-192 unit, which is why portable Co-60 cameras are rare and most fieldwork uses Ir-192 or Se-75.',
    },
    {
      q: 'Can I add HVL values to design a shield from multiple materials?',
      a: 'For first-cut estimates yes — convert each layer to its own HVL count and sum them. A 25 mm steel plate plus a 10 mm lead sheet for Ir-192 is roughly 1.7 HVL (steel) + 2.1 HVL (lead) = 3.8 HVL total, which is about a 14× attenuation. For permit-grade calculations you must apply buildup factors per NCRP 49 because scattered photons from an upstream layer behave differently than primary photons entering the next layer.',
    },
    {
      q: 'How many HVLs do I need for a controlled-area boundary?',
      a: '10 CFR 20.1301 limits public dose to 2 mrem in any one hour outside a restricted area. Starting from a 100 Ci Ir-192 source the unshielded dose rate at 1 m is ~50 R/h = 50,000 mrem/h. To reach 2 mrem/h at 1 m you need ~14 HVLs (50,000 / 2¹⁴ ≈ 3). In practice the radiographer combines distance (inverse square) with shielding, so the HVL count drops; the safe-distance calculator handles the inverse-square half.',
    },
    {
      q: 'Why list both HVL and TVL?',
      a: 'HVL is convenient for verbal communication ("two more HVLs and we are good") but design calculations using percent attenuation are easier in tenth-value layers — each TVL is a factor of 10. A 4-TVL shield drops intensity to 0.01% which is most regulators\' boundary criterion. Field log sheets often track both: HVL for quick sign-off, TVL for the engineered shielding letter that goes in the permit packet.',
    },
  ],
  citations: [
    { id: 'ncrp-49', source: 'NCRP Report No. 49 (1976), Structural Shielding Design and Evaluation for Medical Use of X Rays and Gamma Rays of Energies up to 10 MeV' },
    { id: 'ansi-n43-3', source: 'ANSI N43.3-2008 General Radiation Safety for Installations Using Non-Medical X-Ray and Sealed Gamma-Ray Sources' },
    { id: 'asnt-cp-189', source: 'ASNT CP-189 (2020), Standard for Qualification and Certification of NDT Personnel — Radiographic Testing' },
    { id: 'cfr-10-20-1301', source: '10 CFR 20.1301 — Dose Limits for Individual Members of the Public' },
    { id: 'iaea-srs-13', source: 'IAEA Safety Reports Series No. 13 (1999), Radiation Protection and Safety in Industrial Radiography' },
  ],
};

export default tool;
