import type { LearnArticleContent } from '../types';

const article: LearnArticleContent = {
  slug: 'how-to-perform-rt-source-changeout',
  category: 'how-to',
  metaTitle: 'How to Perform an Ir-192 Source Changeout (NRC 10 CFR 34)',
  metaDescription:
    'Step-by-step Ir-192 industrial radiography source changeout procedure: shipping cask handling, transfer, wipe test, leak test, and survey requirements per 10 CFR 34.',
  heroLede:
    "The depleted Ir-192 source is reading 18 Ci, the new source ships at 96 Ci, and your RAM 3 changer is rented for a 4-hour window. Source changeout is the single highest-dose-rate task in industrial radiography — the procedure below is built around 10 CFR Part 34 §34.31 transfer requirements and the ANSI N432 shipping cask checklist. Miss a step and the dose to your hands climbs from 5 mrem to 5 rem in under a minute.",
  audience:
    'Certified Radiographer-In-Charge (RIC) and Radiation Safety Officers managing Ir-192 source exchange operations under NRC 10 CFR 34 or Agreement-State equivalent.',
  prerequisiteKnowledge: [
    'NRC-licensed Radiographer and current ALARA training',
    'Operation of source-changer devices (RAM 3, Sentinel 880, QSA Global cask)',
    'Survey meter operation (Ludlum 19 or equivalent) with current calibration',
    'Sealed source leak-test procedures per ANSI N432',
  ],
  sections: [
    {
      heading: 'Pre-changeout planning (24 hours before)',
      level: 2,
      paragraphs: [
        'Confirm the new source shipment paperwork: USDOT 7A Type B(U) certificate, NRC Form 540 or 540A (depending on Agreement State), and the manufacturer\'s leak-test certificate dated within 6 months. NRC 10 CFR 34.31 requires the leak-test cert to be on file before the source is moved.[1]',
        'Schedule the changeout in a posted Restricted Area with access control. Survey the area before staging — background should read < 0.5 mR/hr. The Radiation Safety Officer (RSO) approves the work plan and signs the daily ALARA review.',
        'Calibrate two survey meters (one primary, one backup). The primary meter\'s last full-calibration sticker must be within 12 months and the daily response-check on a check source must agree within ±20% before the changeout starts.[2]',
      ],
      callout: {
        kind: 'warn',
        title: 'Two-person rule',
        body: 'NRC 10 CFR 34.41(b) requires at least two qualified radiographers present whenever a source is unsecured. Solo source changeouts are a hard violation, even for "quick swaps".',
      },
    },
    {
      heading: 'Step 1: Stage the changer and exposure device',
      level: 2,
      paragraphs: [
        'Position the new-source changer cask 0.5 m from the depleted exposure device, with both inlet/outlet ports facing each other and the connect-disconnect axis aligned. The standard RAM 3 changer cask weighs ~22 kg with a fresh 100 Ci source; verify the lifting strap and the tie-down.',
        'Place the survey meter on a tripod 1 m from the changer at a height matching the source channel. Confirm baseline reading — depleted device should show < 200 mR/hr at 1 m with the source locked; the new-source changer should show < 100 mR/hr at 1 m with the shutter closed.[3]',
        'Stage the source connector tool, the lock keys, the chip pin (for the depleted source), the new-source lock pin, and the wipe-test kit within arm\'s reach. No radiographer leaves the staging area mid-procedure.',
      ],
    },
    {
      heading: 'Step 2: Disconnect and transfer the depleted source',
      level: 2,
      paragraphs: [
        'Verify the lock is engaged on the exposure device. Connect the source-transfer guide tube between the exposure device output and the changer cask inlet. Confirm both ends are seated and the locking collar is rotated to "locked".',
        'Unlock the exposure device. Using the manual crank or remote control, drive the depleted source out of the exposure device, through the guide tube, and into the changer cask. The transit time at 1 m crank speed is approximately 8-12 seconds for a 1.2 m guide tube. Survey continuously — peak dose rate at 1 m during transit is typically 300-500 mR/hr for an 18 Ci depleted source.[4]',
        'When the depleted source seats in the changer, the survey reading drops to background plus the new-source shutter leakage. Engage the changer lock pin, verify the source is locked (audible click or visual indicator), then disconnect and stow the depleted source\'s exposure device.',
      ],
    },
    {
      heading: 'Step 3: Transfer the new source into the exposure device',
      level: 2,
      paragraphs: [
        'Connect the guide tube between the new-source changer port and the empty exposure device. Verify both connectors are locked.',
        'Unlock the changer port. Crank the new source out of the changer, through the guide tube, and into the exposure device. Transit dose rate at 1 m peaks around 1.5-2 R/hr for a 96 Ci source — your stand-off distance during transit is critical. Step back to 2 m if any pause is needed; never reach across the guide tube while a source is in transit.',
        'When the source seats in the exposure device, the survey reading falls back to shielded leakage (< 10 mR/hr at 1 m for a properly seated source). Engage the exposure-device lock, remove the key, and verify with a key-out lock check.',
      ],
    },
    {
      heading: 'Step 4: Wipe test the new source and document',
      level: 2,
      paragraphs: [
        'Within 1 hour of the new source being seated, perform a wipe test on the exposure device output port using a 47 mm filter paper and 70% isopropanol. Wipe the accessible surfaces around the source channel (not the source itself — the wipe collects external removable contamination only). Count the wipe on a calibrated counter; result must be < 0.005 µCi removable activity per ANSI N432 §6.3 and 10 CFR 34.27.[5]',
        'A wipe-test result above the limit triggers immediate notification to the RSO, lockout of the exposure device, and notification of the NRC or Agreement State within 5 days. Do not proceed with shoots on a failed wipe test.',
        'Document on NRC Form 313 or the licensee equivalent: source serial numbers (depleted and new), activity, leak-test date, wipe-test result, transit dose rates, surveyors\' names and badge IDs, exposure device serial, and the changer serial. Retain for 3 years per 10 CFR 34.27(c).',
      ],
    },
    {
      heading: 'Step 5: Final survey and post-changeout audit',
      level: 2,
      paragraphs: [
        'Run a full-perimeter survey at 1 m from the exposure device and 1 m from the changer cask. Both must read below their respective transport limits: 200 mR/hr at the surface and 10 mR/hr at 2 m for a Type B(U) package per 49 CFR 173.441.[6]',
        'Reconcile the dosimetry — every radiographer present submits their pocket dosimeter or electronic personal dosimeter (EPD) reading. Typical chest dose for a clean changeout is 1-5 mrem; anything above 25 mrem triggers an ALARA review with the RSO.',
        'Mark the depleted source for return shipment using the same shipping cask. The shipping paperwork (NRC Form 540 return, USDOT manifest, manufacturer return authorization) goes with the cask. The exposure device with the new source enters service after the daily walk-around and Form 313 entry.',
      ],
    },
  ],
  commonMistakes: [
    'Skipping the source-transit survey because the changer "shouldn\'t leak." Guide-tube hangs and source-stops outside the cask are the most common cause of unexpected hand dose. Surveyor watches the dose-rate meter continuously during every transit, not just at start and end.',
    'Performing the wipe test on the source pigtail or the source itself. The wipe test is for external removable contamination — wiping the active surface of a sealed source can dislodge the active material and cause a real contamination event. Wipe only the accessible exposure-device output port surfaces.',
    'Using an expired or recently-dropped survey meter. A meter that fell off a truck bed last week may read 20% low and still pass the daily response check on a low-activity check source. Calibration is annual; response check is daily. If the meter has been dropped, route to cal lab before use.',
    'Letting the second radiographer step back to "give space" during the actual transfer. The two-person rule means continuous observation by two qualified radiographers — one operates, one monitors the survey meter and the lock indicators. Both stay within the controlled area for the entire transit.',
  ],
  relatedFaqs: [
    {
      q: 'What activity is considered "depleted" for an Ir-192 source?',
      a: 'Industrial Ir-192 sources are typically replaced when their activity falls below the threshold that gives a practical exposure time on standard work — usually around 20-30 Ci for general field shooting, lower for thin-wall pipe work. With a 74-day half-life, an Ir-192 source drops from 100 Ci to 25 Ci in roughly 148 days (two half-lives). Some users push to 15 Ci on thin-wall work where exposure times remain manageable; below 10 Ci, the exposure times grow so long that ALARA and productivity both suffer, and the source returns for replacement. The decision is documented in the licensee\'s Operating and Emergency Procedures.',
    },
    {
      q: 'Why is the two-person rule required during source changeout?',
      a: 'NRC 10 CFR 34.41(b) requires at least two qualified radiographers when a source is unsecured because the operator handling the crank or remote cannot simultaneously read the survey meter, watch the lock indicators, and react to a stuck source. The second radiographer is the dedicated safety observer — survey meter in hand, eyes on the guide tube and the source-position indicator. If the source hangs in the guide tube or fails to fully seat, the observer calls the abort and initiates the recovery procedure. A solo radiographer who notices the problem already has hand dose by the time they pick up the meter; the two-person system catches the problem before dose accumulates.',
    },
    {
      q: 'How is the wipe test counted and what is the limit?',
      a: 'The wipe is counted on a calibrated proportional counter or scintillation counter with efficiency known for Ir-192 (typically 5-15% efficiency on a 47 mm filter). The instrument reads counts per minute, converted to disintegrations per minute using the efficiency factor, then to microcuries. NRC 10 CFR 34.27 and ANSI N432 §6.3 set the limit at 0.005 µCi (185 Bq) removable activity. A reading above the limit indicates a damaged source or a contaminated changer port — the source goes out of service, the area is isolated, and the licensee notifies the NRC or Agreement State within 5 days. Wipe tests are required every 6 months for sealed sources in storage and after every changeout.',
    },
    {
      q: 'What survey-meter readings during transit indicate a stuck source?',
      a: 'A normal transit shows dose rate climb smoothly as the source moves through the guide tube, peak when the source is closest to the meter, then drop as the source seats in the receiving device. A stuck source shows the dose rate climb and then plateau — the source is in the guide tube but not advancing. If the dose rate plateaus for more than 5 seconds with the crank turning, stop cranking, retreat to 2 m or behind shielding, and initiate the stuck-source recovery procedure. Do not reverse the crank without consulting the operating and emergency procedures — reverse cranking on a kinked guide tube can fail the source assembly and result in a much worse exposure scenario.',
    },
    {
      q: 'Do I need to notify the NRC for every source changeout?',
      a: 'No. Routine source exchange under an existing NRC or Agreement State license is documented on the licensee\'s internal records (NRC Form 313 or equivalent) and the receipt/transfer is reported on the NRC Form 540 series. The NRC reviews the records during the periodic inspection cycle. Notification is required only for incidents: lost or stolen sources (immediately, 10 CFR 20.2201), overexposure (within 24 hours, 10 CFR 20.2202), leak-test failure (within 5 days, 10 CFR 34.27), or any event meeting the reporting thresholds in 10 CFR 20.2202. Maintain the changeout records for 3 years; the NRC inspector will ask for them during the audit.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/radiographic-testing',
      label: 'Radiographic Testing (RT) method overview',
      context: 'Full RT method overview covers source physics, exposure technique, and film/digital workflows.',
    },
    {
      href: '/standards/10-cfr-34',
      label: 'NRC 10 CFR 34 industrial radiography rule',
      context: '10 CFR Part 34 is the federal regulation governing source handling and changeout.',
    },
    {
      href: '/learn/how-to-perform-source-decay-calculation',
      label: 'Source decay calculation walkthrough',
      context: 'Decide whether your current source is at depletion threshold using exact decay math.',
    },
    {
      href: '/learn/how-to-perform-half-value-layer-calculation',
      label: 'Half-value layer calculation',
      context: 'HVL drives the shielding thickness for the changer cask and the storage container.',
    },
    {
      href: '/learn/how-to-perform-survey-meter-calibration',
      label: 'Survey meter calibration procedure',
      context: 'The daily response check before changeout follows this calibration logic.',
    },
    {
      href: '/learn/faq-radiographic-safety-distance-rules',
      label: 'Radiographic safety distance rules',
      context: 'Stand-off and barrier distance calculations protect the surveyor during transit.',
    },
    {
      href: '/free-tools/source-decay-calculator',
      label: 'Ir-192 source decay calculator',
      context: 'Calculate current activity from initial activity and elapsed days.',
    },
    {
      href: '/learn/troubleshooting-rt-film-fogging',
      label: 'Troubleshooting RT film fogging',
      context: 'Source-handling errors during changeout can fog film stored nearby — diagnosis below.',
    },
  ],
  citations: [
    {
      id: '10-cfr-34',
      source: '10 CFR Part 34 — Licenses for Industrial Radiography and Radiation Safety Requirements for Industrial Radiographic Operations, §34.27 and §34.31',
    },
    {
      id: 'ansi-n432',
      source: 'ANSI N432-1980 (R2010) — Radiological Safety for the Design and Construction of Apparatus for Gamma Radiography',
    },
    {
      id: 'iso-3999',
      source: 'ISO 3999:2004 — Radiation protection — Apparatus for industrial gamma radiography — Specifications for performance, design and tests',
    },
    {
      id: '10-cfr-20',
      source: '10 CFR Part 20 — Standards for Protection Against Radiation, Subpart M Reports, §20.2201 and §20.2202',
    },
    {
      id: '49-cfr-173',
      source: '49 CFR §173.441 — Radiation level limitations for Type A and Type B packages',
    },
  ],
};

export default article;
