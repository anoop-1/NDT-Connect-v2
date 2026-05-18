import type { LearnArticleContent } from '../types';

const article: LearnArticleContent = {
  slug: 'how-to-perform-thickness-survey-piping',
  category: 'how-to',
  metaTitle: 'How to Perform a Piping Thickness Survey (API 570 / API 574)',
  metaDescription:
    'Step-by-step UT thickness survey on process piping: TML selection, dual-element probe setup, data recording, corrosion rate calculation, and remaining life per API 570.',
  heroLede:
    "A 6-inch sch. 80 carbon-steel line at a Gulf Coast refinery loses ~0.3 mm/year to sour-service corrosion. Miss a thickness measurement location (TML) on the elbow extrados and the next turnaround discovers a leak the inspection should have caught two cycles ago. Below is the API 570 / API 574 sequence — TML selection, dual-element probe calibration, scanning vs spot readings, and the math that turns raw thicknesses into a remaining-life number the asset manager can use.",
  audience:
    'API 570 certified piping inspectors and Level II UT technicians performing thickness surveys on in-service process piping per API 570 §5.5 and API 574 §6.',
  prerequisiteKnowledge: [
    'API 570 piping inspector certification or equivalent owner-spec qualification',
    'Level II UT certification with dual-element probe experience',
    'Reading P&ID and ISO drawings for line identification and stress level',
    'Understanding of corrosion rate and remaining-life calculations',
  ],
  sections: [
    {
      heading: 'TML selection per API 570 §5.5 and 5.6',
      level: 2,
      paragraphs: [
        'TML count and location come from API 570 §5.5 and the owner\'s piping integrity management plan. Minimum: one TML per line every change of direction (elbows, tees), one per straight run between fittings, and additional TMLs at known high-corrosion-rate locations (HCR areas).[1]',
        'High-priority TMLs: elbows (extrados and intrados), tees (run and branch), reducers (small end), valves (upstream), bottoms of horizontal lines (water accumulation), top of vertical lines (gas-phase corrosion), injection points (turbulence and chemical attack).',
        'Mark TMLs permanently with paint or low-stress steel stamp. The asset record needs the GPS location, the elevation, the orientation (clock position on horizontal lines), and a photograph. Re-finding TMLs from prior surveys is half the inspection time on legacy piping.',
      ],
      callout: {
        kind: 'spec',
        title: 'Minimum readings per TML',
        body: 'API 570 §5.5.3 requires a minimum of 4 readings at each TML (typically a 50 mm x 50 mm grid at 12 o\'clock, 3 o\'clock, 6 o\'clock, 9 o\'clock for circumferential coverage). Single-point readings miss localized corrosion.',
      },
    },
    {
      heading: 'Step 1: Probe and instrument selection',
      level: 2,
      paragraphs: [
        'Dual-element probe: 5 MHz, 6-12 mm diameter, V-path angle 5-10°. Standard choice for thickness gauging where the back-wall is the target reflector. Dual-element rejects the dead-zone near-surface signal that plagues single-element probes on thin walls.',
        'Single-element probe: 2.25-5 MHz, 12-25 mm diameter, used for thicker walls (> 25 mm) where dual-element V-path drift becomes significant. Less common on standard piping surveys.',
        'Thickness gauge: dedicated unit (Olympus 38DL Plus, GE DMS Go+, Tritex Multigauge) or a flaw detector running thickness mode. Calibration must be within 12 months and the daily response check on a step block must agree within ±0.1 mm.[2]',
      ],
    },
    {
      heading: 'Step 2: Calibration on step block and verification',
      level: 2,
      paragraphs: [
        'Calibrate on a step block matching the production material — carbon steel step block for carbon-steel piping, stainless for stainless. ASTM E797 §6.2 requires the step block to bracket the production thickness range.[2] Typical block: 1.27 mm to 25.4 mm in 1-2 mm steps.',
        'Two-point calibration: peak the echo on the thinnest step (e.g., 2.5 mm), set zero/velocity until the reading matches; peak on the thickest step (e.g., 25 mm), adjust velocity for match. Both readings must agree within 0.1 mm of stamped step thickness.',
        'Daily verification: at start-of-shift, every 4 hours, and at end-of-shift. Document on the cal sheet. Failure triggers immediate recalibration and re-measurement of any TMLs since last good verification.',
      ],
    },
    {
      heading: 'Step 3: Surface prep and scanning technique',
      level: 2,
      paragraphs: [
        'Surface prep: wire-brush or sand to remove loose scale, paint, and corrosion product. ASTM E797 §10.1 limits surface roughness to a level that allows consistent coupling — practical limit 250 µin Ra for dual-element probes.[2] Heavily corroded surfaces require grinding to a smooth patch (50 mm x 50 mm minimum) at each TML.',
        'Apply couplant (water-based gel for ambient, propylene-glycol blend for cold weather, silicone for high-temp). Couple the probe and watch for stable back-wall echo.',
        'Spot readings: take 4-5 readings within a 25 mm radius of the marked TML center; record the minimum. Scanning readings: sweep the probe slowly across the TML area in two orthogonal patterns, watching the digital readout for minimum thickness — captures localized pitting that spot readings miss.',
      ],
      list: {
        title: 'Reading types and when to use each',
        items: [
          'Spot reading: 4-5 measurements in 25 mm radius, record minimum — standard TML monitoring',
          'Scanning reading: continuous probe movement across grid, watch for minimum — pitting and localized corrosion',
          'Grid scan: 25 mm spacing across 50 mm x 50 mm area, full coverage — HCR areas and FFS evaluations',
          'High-temp survey: same technique with silicone couplant, recalibrate at production temp',
        ],
      },
    },
    {
      heading: 'Step 4: Corrosion rate and remaining-life calculation',
      level: 2,
      paragraphs: [
        'Short-term corrosion rate (ST CR): (Tprevious − Tcurrent) / (years between surveys). Long-term corrosion rate (LT CR): (Tinitial − Tcurrent) / (years from installation). API 570 §7.1.1 requires both rates calculated; the higher rate drives remaining-life.[1]',
        'Remaining life: (Tcurrent − Tminimum) / CR. Tminimum is the lower of design minimum or owner-specified retire-by thickness. For carbon-steel piping under ASME B31.3, design minimum is calculated from pressure, temperature, allowance, and joint efficiency per B31.3 §304.[3]',
        'Inspection interval: API 570 §6.3 sets the maximum interval at half the remaining life or 10 years, whichever is less. Class 1 piping (high consequence): max 5 years. Class 2: max 10 years. Class 3: max 10 years or remaining life half, whichever shorter.[1]',
      ],
    },
    {
      heading: 'Step 5: Reporting and integrity data integration',
      level: 2,
      paragraphs: [
        'Inspection report: line number, service, design pressure and temperature, TML list with current thickness, prior thickness, calculated CR (ST and LT), remaining life, next inspection date, anomalies (significant decreases, missing TMLs, surface condition issues), and the inspector\'s API 570 stamp.',
        'Integrity database: feed the readings into the owner\'s integrity management system (Bentley AssetWise, Antea, OneVizion, Maximo IIH, or a custom Excel tracker for smaller sites). Trend the thickness over time — a step-change reading (sudden drop > 1 mm between cycles) flags localized accelerated corrosion and triggers a closer look.',
        'Anomaly response: thickness below retirement threshold → immediate FFS evaluation per API 579 or piping replacement.[4] Corrosion rate increase > 50% from prior trend → root-cause investigation (process change, mechanical damage, MIC). All anomalies documented and reviewed with the unit engineer before the next operating cycle.',
      ],
    },
  ],
  commonMistakes: [
    'Reading on rough scale without removing it. Mill scale and paint contribute 0.2-1.5 mm of false thickness, hiding real wall loss. Always remove scale and paint at the TML to a clean metal surface before reading.',
    'Skipping the 4-point grid and taking single-point readings. Localized pitting can take 2-3 mm off the wall in a 10 mm spot; a single reading 15 mm away shows nominal thickness and the pit goes undetected. The 4-point grid (or scanning) is required by API 570 §5.5.3.',
    'Forgetting to recalibrate after temperature change. Probe velocity in carbon steel shifts ~1.5 m/s per °C. A 20°C temperature swing between morning calibration and afternoon survey produces a 0.3 mm reading error on a 25 mm wall — enough to push a marginal reading into the unacceptable range.',
    'Using stamped or marked TML locations without verifying with the prior survey GPS coordinates. Painted TML marks fade and steel stamps fill with corrosion product — a "TML 12" measured this cycle may not be the same physical point as "TML 12" from five years ago. Verify location against the integrity database before reading.',
  ],
  relatedFaqs: [
    {
      q: 'How often does API 570 require thickness surveys?',
      a: 'API 570 §6.3 sets the maximum thickness-survey interval based on piping class and remaining life. Class 1 piping (services with potential for serious safety, environmental, or business impact — typically LPG, H₂S, acid, high-temperature hydrocarbon): max 5 years. Class 2 (most refinery and chemical process piping): max 10 years. Class 3 (low-consequence services, utility): max 10 years. In every case, the interval cannot exceed half the calculated remaining life. So a Class 2 line with 12-year remaining life would be re-surveyed at 6 years, not 10. The owner integrity management plan sets the actual schedule; the API code is the upper limit.',
    },
    {
      q: 'When do I use a dual-element probe vs single-element probe?',
      a: 'Dual-element probes (5 MHz, 6-12 mm diameter, V-path angle 5-10°) are the default for thickness gauging on in-service piping. The dual-element design rejects the near-surface dead-zone signal that masks back-wall echoes on thin walls (below 5 mm). Dual-element handles thickness range from ~1 mm to 25 mm reliably. Single-element probes (2.25-5 MHz, 12-25 mm) are used for thicker walls (> 25 mm) where dual-element V-path drift becomes significant — the V-path geometry assumes parallel surfaces, and on thick or strongly curved sections the V-path skews the reading. For tanks, vessels, and heavy-wall piping above 25 mm, single-element straight beam delivers more consistent thickness readings.',
    },
    {
      q: 'How do I calculate remaining life from two thickness readings?',
      a: 'Short-term corrosion rate (CR) = (T_previous − T_current) / years between surveys. Long-term CR = (T_initial − T_current) / years from installation. Use the higher of the two for remaining-life calculation. Remaining life = (T_current − T_minimum) / CR. T_minimum is the design minimum thickness calculated per ASME B31.3 §304 (pressure, temperature, allowance, joint efficiency) or the owner-specified retire-by thickness if more conservative. Example: 25 mm wall at install, 22.5 mm now after 10 years, T_min = 15 mm, LT CR = 0.25 mm/year, remaining life = (22.5 − 15) / 0.25 = 30 years. API 570 §6.3 then sets the inspection interval at half that or the code maximum, whichever is less.',
    },
    {
      q: 'What is an HCR (high corrosion rate) area and how do I monitor it?',
      a: 'High Corrosion Rate areas are line segments with measured CR exceeding 0.25 mm/year (10 mpy) — typically downstream of injection points, after process changes that introduce water or sour service, at low spots where water accumulates, at thread engagements with mismatched materials, and at locations with known MIC (microbiologically influenced corrosion). API 570 §5.5 requires HCR areas to have additional TMLs and shorter inspection intervals than the rest of the line. Monitoring: TML density 2-3x the standard, ultrasonic scanning across a 100 mm x 100 mm grid instead of spot readings, and consideration of corrosion mapping (PAUT C-scan) to image the actual corrosion pattern. Trend the HCR readings every cycle and adjust the inspection interval as the rate evolves.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/ultrasonic-testing',
      label: 'Ultrasonic Testing method overview',
      context: 'Thickness gauging is a UT subset using dual-element probes.',
    },
    {
      href: '/standards/api-570',
      label: 'API 570 piping inspection code',
      context: 'API 570 §5.5 and §6.3 govern TML selection and survey intervals.',
    },
    {
      href: '/learn/how-to-perform-cui-inspection-procedure',
      label: 'CUI inspection procedure',
      context: 'CUI surveys layer onto thickness surveys for insulated piping.',
    },
    {
      href: '/learn/how-to-perform-corrosion-mapping',
      label: 'Corrosion mapping procedure',
      context: 'C-scan mapping covers HCR areas where spot readings miss localized loss.',
    },
    {
      href: '/learn/how-to-perform-couplant-selection',
      label: 'Couplant selection',
      context: 'Couplant choice affects reading repeatability across hundreds of TMLs.',
    },
    {
      href: '/learn/faq-defect-types-in-pipelines',
      label: 'Pipeline defect types FAQ',
      context: 'CUI, sour service, and MIC are the dominant corrosion mechanisms behind thickness loss.',
    },
    {
      href: '/free-tools/corrosion-rate-calculator',
      label: 'Corrosion rate calculator',
      context: 'Calculate short- and long-term CR from prior thickness data.',
    },
    {
      href: '/learn/troubleshooting-ut-no-back-wall-echo',
      label: 'Troubleshooting: no back-wall echo',
      context: 'Lost back-wall during thickness gauging usually means severe pitting or coupling failure.',
    },
  ],
  citations: [
    {
      id: 'api-570',
      source: 'API 570, 5th ed. (2022) — Piping Inspection Code: In-Service Inspection, Rating, Repair, and Alteration of Piping Systems',
    },
    {
      id: 'astm-e797',
      source: 'ASTM E797/E797M-21 — Standard Practice for Measuring Thickness by Manual Ultrasonic Pulse-Echo Contact Method',
    },
    {
      id: 'asme-b31-3',
      source: 'ASME B31.3-2022 — Process Piping, §304 Pressure Design of Components',
    },
    {
      id: 'api-579',
      source: 'API 579-1/ASME FFS-1, 4th ed. (2021) — Fitness-for-Service',
    },
    {
      id: 'api-574',
      source: 'API 574, 4th ed. (2016) — Inspection Practices for Piping System Components',
    },
  ],
};

export default article;
