import type { ToolMeta } from '../types';

const tool: ToolMeta = {
  slug: 'ut-temperature-correction',
  name: 'UT Thickness Temperature Correction',
  category: 'ut',
  inputs: [
    { id: 'measured', label: 'Measured (displayed) thickness', unit: 'mm', type: 'number' },
    { id: 't_cal', label: 'Calibration temperature', unit: '°C', type: 'number' },
    { id: 't_op', label: 'Surface / operating temperature', unit: '°C', type: 'number' },
    { id: 'material', label: 'Material', type: 'select' },
  ],
  outputs: [
    { id: 'corrected', label: 'Corrected thickness', unit: 'mm' },
    { id: 'error_pct', label: 'Uncorrected error', unit: '%' },
  ],
  metaTitle: 'UT Thickness Temperature Correction Calculator | High-Temp Ultrasonic',
  metaDescription:
    'Correct ultrasonic thickness readings for high-temperature surfaces. Sound velocity in steel falls ~1% per 55°C, so a gauge calibrated at ambient reads thick on hot equipment. Per ASME V and Olympus/Evident field practice.',
  heroLede:
    'A UT thickness gauge calibrated on a room-temperature block reads too thick when you put it on a 300°C line — because the speed of sound in steel drops as it heats, and the gauge assumes the cold velocity. The error is roughly 1% per 55°C, which on a 12 mm wall at 300°C is over 0.5 mm of phantom metal. This tool applies the standard velocity-temperature correction so your remaining-life numbers are honest.',
  howItWorks:
    'A thickness gauge measures time-of-flight and multiplies by half the calibrated velocity to display thickness. When the part is hotter than the calibration block, the actual sound velocity is lower, so the same echo arrives later and the gauge over-reads. The correction divides the displayed reading by a factor of (1 + k·ΔT), where k is the material\'s fractional velocity change per degree and ΔT is the temperature above the calibration temperature. The widely used field value for carbon steel is about 1% per 55°C (1% per 100°F).',
  formula: 'corrected = measured / (1 + (coeff/100) × (T_op − T_cal) / 100) ;  coeff = % apparent-thickness change per 100°C',
  workedExample: {
    inputs: { measured: 12.0, t_cal: 20, t_op: 300, material: 'Carbon steel' },
    outputs: { corrected: '11.40', error_pct: '5.3' },
    explanation:
      'ΔT = 300 − 20 = 280°C. Carbon steel changes ~1.9% per 100°C, so the correction factor is 1 + 0.019 × 2.80 = 1.053. Corrected thickness = 12.0 / 1.053 = 11.40 mm. The uncorrected reading was 5.3% (0.6 mm) too thick — enough to mask real wall loss on a remaining-life calculation.',
  },
  whenToUse:
    'Use whenever you take UT thickness on equipment significantly hotter (or colder) than the calibration block — live process lines, steam systems, hot vessels — and you did not calibrate on a hot reference block at the operating temperature.',
  limitations: [
    'The correction assumes the calibration was done at t_cal with the gauge velocity set for that temperature; if you calibrated on a heated block at operating temperature, no correction is needed.',
    'The velocity coefficient varies by alloy and is approximate — for critical work use a manufacturer hot-block calibration rather than a generic factor.',
    'High-temperature couplant and a delay-line or dual-element high-temp probe are still required above ~150°C; the correction does not remove the need for proper hot-surface technique.',
    'Above ~540°C special procedures apply and standard pulse-echo UT may not be valid.',
    'Coatings, scale and probe contact pressure introduce additional error independent of temperature.',
  ],
  relatedTools: [
    { slug: 'ut-thickness', name: 'UT Thickness' },
    { slug: 'corrosion-rate-remaining-life', name: 'Corrosion Rate & Remaining Life' },
    { slug: 'ut-attenuation', name: 'UT Attenuation' },
  ],
  faqs: [
    { q: 'Why does a UT thickness gauge read high on hot surfaces?', a: 'The gauge converts the echo time-of-flight to thickness using the sound velocity you calibrated at room temperature. As steel heats, its sound velocity falls, so the echo takes longer to return and the gauge — still using the cold velocity — displays a thickness greater than the true wall. The error grows roughly 1% for every 55°C above the calibration temperature.' },
    { q: 'How much correction does carbon steel need?', a: 'About 1% per 55°C (1% per 100°F), or roughly 1.8–1.9% per 100°C. On a line running 280°C above the calibration temperature that is around 5% — for a 12 mm nominal wall, about 0.6 mm of apparent over-thickness that must be subtracted before computing corrosion rate.' },
    { q: 'Can I avoid the correction entirely?', a: 'Yes — calibrate on a reference block heated to the operating temperature, or use an instrument that performs automatic temperature compensation with a measured surface temperature. When you calibrate hot, the velocity is already correct for that temperature and no arithmetic correction is required.' },
    { q: 'Does the correction apply to cold service too?', a: 'Yes, in the opposite direction. On equipment colder than the calibration temperature the sound velocity is higher, so the gauge under-reads and the correction increases the displayed thickness. Cryogenic and refrigerated lines need the same treatment.' },
    { q: 'Is temperature correction required by code?', a: 'Inspection codes such as API 510/570 require thickness data to be accurate for remaining-life calculations, and good practice (and equipment manufacturer guidance) calls for temperature compensation on hot surfaces. The correction itself is an instrument/technique matter; the codes care that the reported thickness is true.' },
  ],
  citations: [
    { id: 'asme-v-art4', source: 'ASME BPVC Section V, Article 4 — Ultrasonic Examination Methods for Welds (and Article 23 thickness methods)' },
    { id: 'evident-hot', source: 'Evident/Olympus Application Note — Ultrasonic Thickness Gaging at High Temperature' },
    { id: 'api-570', source: 'API 570 — Piping Inspection Code (thickness measurement and remaining-life basis)' },
  ],
};

export default tool;
