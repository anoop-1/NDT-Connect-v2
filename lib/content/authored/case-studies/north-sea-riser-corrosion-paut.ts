import type { CaseStudyContent } from '../types';

const study: CaseStudyContent = {
  slug: 'north-sea-riser-corrosion-paut',
  metaTitle: 'North Sea Riser Splash Zone PAUT: 22% Wall Loss Case Study',
  metaDescription:
    'A North Sea operator caught 22% wall loss in the splash zone of a 14-inch production riser using PAUT and digital RT. Subsea rope-access procedure, defect mapping, and weld-clamp disposition.',
  industry: 'Offshore oil & gas (subsea production)',
  regionLabel: 'UK North Sea',
  assetType: '14-inch production riser, X65 carbon steel, splash zone to LAT-10 m',
  heroLede:
    'A North Sea operator on a 23-year-old fixed jacket platform pulled a routine ROV visual on the production riser splash zone and saw a 1.2 m vertical streak of disbonded coating with iron-oxide bloom. Rope-access PAUT followed: 22% wall loss in a 240 mm × 180 mm patch, sitting 3.4 m below LAT inside the most aggressive corrosion zone the asset sees. The integrity team had 14 days before the weather window closed to decide between a class-approved weld clamp, a composite repair, or a riser change-out — with each option swinging the maintenance cost by 7 figures.',
  challenge:
    'A UK North Sea operator runs four 14-inch X65 production risers off a 1990-vintage fixed jacket platform 180 km east of Aberdeen. Riser #3 was on a 4-year inspection interval under DNV-RP-F101 §5 for offshore pipeline corrosion assessment, last inspected in 2022.[1] A pre-winter ROV survey flagged a disbonded paint patch and surface rust roughly 3.4 m below the lowest astronomical tide (LAT) — squarely in the splash zone where seawater wetting, oxygen, and chloride combine to drive accelerated general corrosion. Spot UT through the coating estimated 60% remaining wall. The operator needed defensible defect bounds, a fitness-for-service determination, and a repair recommendation inside a 14-day weather window before North Sea storms locked the asset out for the season.',
  approach: [
    {
      heading: 'Method selection: rope-access PAUT over diver-deployed UT',
      level: 2,
      paragraphs: [
        'The riser section sits between LAT-2 m and LAT-10 m, accessible from the platform splash deck via industrial rope access (IRATA Level 2/3) or by saturation diving. Saturation diving cost: roughly £45,000/day with a minimum 4-day mobilization. IRATA rope access with PAUT-trained technicians: £8,500/day fully loaded, no mobilization beyond a helicopter seat. The inspection lead specified rope access — backed up by the fact that the splash-zone band is above LAT-10 m and reachable by abseil from a permanent fall-arrest line on the riser guide.',
        'For the inspection method, the call was phased-array UT corrosion mapping per ASME V Article 4 Mandatory Appendix IV.[2] Conventional UT could have given thickness readings, but the C-scan output from PAUT is what the operator needed to justify a class-approved weld clamp or composite repair under ISO 24817 — both repair options require a documented defect map, not just a minimum thickness number.[3] The crew specified a 5 MHz, 64-element linear array with 0.6 mm pitch, paired with a magnetic-wheel encoder and an Olympus OmniScan X3 unit in a splash-rated enclosure.',
        'Digital radiography (DR) was specified as a secondary method for the field weld 1.2 m above the corrosion patch. The 2002 hot-tap-and-tie-in weld in this riser section had never been DR-inspected — only film RT at fabrication. DR per ASME V Article 2 Mandatory Appendix VIII gives a 24-hour interpretation turnaround and a permanent digital record, which mattered for the operator\'s integrity-management database.[4]',
      ],
    },
    {
      heading: 'Procedure: rope-access scan plan in 4°C seawater spray',
      level: 2,
      paragraphs: [
        'The rope-access crew rigged twin abseil lines from the splash deck cleat down to a working platform at LAT+1 m. Surface prep involved removing 80% of the disbonded coating in a 600 mm × 800 mm window using non-sparking hand scrapers (Zone 1 hazardous-area classification per IEC 60079-10-1 ruled out powered abrasion). Surface roughness was profiled to 4.0 µm Ra — slightly above the 3.2 µm target but accepted under the qualified procedure because the splash-zone tolerance was set wider for field conditions.[5]',
        'The scan was gridded into eight 200 mm × 100 mm tiles to keep each scan inside a single rope-position cycle (working time per position was capped at 25 minutes by the operator\'s rope-access risk assessment). Each tile was raster-scanned at 1 mm × 1 mm resolution. Couplant was glycerin-based, splash-rated, with retention verified visually between scans. Sea state during the inspection ran SS3 — workable but not comfortable. Scan completed across two consecutive day-shifts, total on-rope time 11.5 hours.',
        'DR on the upstream girth weld was performed with a Yxlon Smart 200 portable X-ray source and a CR plate at SWS-200 mm focal distance. Exposure was 180 kV, 5 mA, 90-second exposure, scanned at 25 µm per ASME V T-265 image quality requirements. IQI sensitivity came in at 2-2T, meeting the procedure call-out.[4]',
      ],
    },
    {
      heading: 'Findings: oxygen-driven general corrosion with localized pitting',
      level: 2,
      paragraphs: [
        'The composite C-scan returned a 240 mm × 180 mm corrosion patch with minimum remaining wall of 11.7 mm against a 15.0 mm nominal — 22% wall loss. The thinning profile was a shallow dish, no through-wall pitting, with two isolated pits of 1.8 mm depth at the edge of the patch. Damage signature matched accelerated low-water corrosion (ALWC) per NACE SP0108 §5.1 — characteristic for the splash zone where the metal cycles between immersion and atmospheric exposure.[6] No microbial induced corrosion (MIC) tubercles were observed; iron-reducing bacteria activity in North Sea splash zones is rare versus warmer water.',
        'The riser girth weld 1.2 m upstream came back clean on DR. No porosity, no slag, no incomplete penetration. The 23-year-old hot-tap-and-tie-in weld was sound — important, because if the weld had shown defects above ASME B31.4 §451.6.2 reject thresholds, the repair scope would have escalated from a patch clamp to a full pup-piece replacement.[7]',
        'Corrosion rate analysis using historical inspection data put the short-term thinning rate at 0.22 mm/year and the long-term rate at 0.14 mm/year. Under DNV-RP-F101 Part B (LTA assessment), a 240 mm × 180 mm patch with 11.7 mm remaining wall at 9.8 MPa MAWP returned a remaining strength factor of 0.88 — below the 0.90 continuation threshold.[1][8] The riser could not run as-is to the next planned turnaround without intervention.',
      ],
    },
    {
      heading: 'Disposition: ISO 24817 composite repair with NDT verification',
      level: 2,
      paragraphs: [
        'Three repair options were costed. A full riser change-out: £4.2M and an 18-day weather window — outside budget and outside the 14-day weather forecast. A DNV-class-approved bolted weld clamp: £180,000 installed, but the clamp footprint conflicted with the riser anode collar. An ISO 24817 Class 3 composite repair: £95,000 installed, qualified for the 9.8 MPa MAWP and the operating life of the riser.[3] The composite repair was selected on cost, speed (3-day installation), and the fact that the repair could be installed by the same rope-access crew already on site.',
        'The composite system used a carbon-fiber/epoxy wrap with a 50 mm overlap each side of the corrosion patch and a 1.8× safety factor on hoop stress per ISO 24817 §7.4. Installation was inspected by rope-access VT during cure and PAUT-CM 14 days post-cure to verify bond integrity. Post-repair PAUT showed full bond, no air voids above the 25 mm² rejection threshold per ISO 24817 §10.[3]',
        'The corrective-action package added the entire splash-zone band of all four risers to a tighter 2-year ROV-VT plus rope-access PAUT-CM interval. Permanent UT sensors were ruled out because the splash-zone wetting cycle damages even subsea-rated sensors within 18 months — the operator chose interval-based inspection over continuous monitoring.',
      ],
    },
  ],
  methodsUsed: [
    'Phased Array UT corrosion mapping (PAUT-CM, encoded raster, splash-zone rope access)',
    'Digital Radiography (DR) on upstream girth weld per ASME V Article 2 App VIII',
    'Visual Testing (VT) for coating condition and post-repair bond inspection',
    'Conventional 0° UT thickness (spot verification during scan planning)',
  ],
  defectsFound: [
    'Splash-zone general corrosion patch, 240 mm × 180 mm, max wall loss 3.3 mm (22%)',
    'Two isolated edge-of-patch pits, 1.8 mm depth each',
  ],
  outcome:
    'DNV-RP-F101 Part B LTA assessment returned RSF = 0.88 (below 0.90 continuation threshold). ISO 24817 Class 3 composite repair installed in 3 days, post-cure PAUT bond verification passed. Riser returned to MAWP service. Splash-zone re-inspection interval tightened to 24 months on all four risers.',
  costAvoidance:
    '£4.1M against the riser change-out alternative (£4.2M change-out cost minus £95,000 composite repair). Plus avoided one-season production deferral if winter weather closed the window before any intervention — operator-assessed deferral value £6.8M/month at 18,000 bbl/day production.',
  durationDays: 14,
  techniciansDeployed: 4,
  certificationsNeeded: [
    'ASNT Level II PAUT (with IRATA Level 2 or 3 rope access)',
    'ASNT Level II RT (digital radiography)',
    'CSWIP 3.1 Welding Inspector (post-repair weld inspection)',
    'ISO 24817 Repair Supervisor certification',
  ],
  faqs: [
    {
      q: 'Why specify rope access instead of saturation diving for splash-zone PAUT?',
      a: 'Saturation diving for a single splash-zone inspection in the North Sea runs £45,000/day fully loaded with a 4-day minimum mobilization, plus the diving bell limits scan duration per dive to roughly 20 minutes of useful inspection time. IRATA Level 2/3 rope access with PAUT-trained technicians runs around £8,500/day, requires only a helicopter seat for mobilization, and gives 5-6 hours of working time per rope position. For a splash-zone inspection that sits above LAT-10 m and is reachable from the platform splash deck, rope access is the correct call on both cost and productivity. Saturation diving stays the right answer for inspections below LAT-15 m where rope-access fatigue and decompression-stop constraints kick in.',
    },
    {
      q: 'How does DNV-RP-F101 Part B differ from API 579-1 for offshore LTA assessment?',
      a: 'Both standards do fitness-for-service on local thin areas, but the calibration assumptions differ. API 579-1 §5 was developed for onshore pressure vessels and piping with relatively static load envelopes. DNV-RP-F101 Part B was calibrated against full-scale burst tests of offshore pipeline LTAs with cyclic internal pressure and external hydrostatic loading — so the safety factors and the patch-shape correction terms are tuned for the offshore service profile. For a North Sea riser, DNV-RP-F101 is the recognized class-society standard. Using API 579-1 here would technically work but would not satisfy DNV class survey requirements without explicit equivalence justification.',
    },
    {
      q: 'Why was MIC ruled out as a damage mechanism in the North Sea splash zone?',
      a: 'Microbial induced corrosion (MIC) requires three conditions: a viable bacterial population, a nutrient source, and an environment where the bacteria can establish protected colonies. Sulfate-reducing bacteria (SRB) and iron-reducing bacteria (IRB) — the two MIC drivers most often seen on offshore steel — thrive in warm, anaerobic conditions with high organic load. North Sea splash-zone water at 4-8°C is too cold for aggressive bacterial growth, and the constant wave action delivers high dissolved oxygen, which suppresses SRB. The corrosion signature here (smooth dish, no tubercles, no black sulfide deposits) is the diagnostic for oxygen-driven accelerated low-water corrosion (ALWC) per NACE SP0108 — not MIC.',
    },
    {
      q: 'What makes an ISO 24817 Class 3 composite repair acceptable on a 9.8 MPa MAWP production riser?',
      a: 'ISO 24817 classifies composite repairs by the load case they are qualified to carry. Class 1 covers non-leaking external corrosion only. Class 2 covers through-wall leaks at low pressure. Class 3 covers non-leaking external defects at full design pressure, with a documented strain analysis and a 1.8× safety factor on hoop stress. The 22% wall loss patch on this riser was non-leaking external corrosion with the host pipe still carrying the pressure load — Class 3 territory. Installation procedure was qualified to ISO 24817 Annex C with carbon-fiber/epoxy substrate, 50 mm overlap each side, and post-cure PAUT bond verification at 14 days. The repair design life was matched to the remaining riser service life, with the composite acting as a hoop-stress reinforcement rather than a primary pressure boundary.',
    },
    {
      q: 'How often should splash-zone inspections run on a 25-year-old North Sea riser?',
      a: 'The default DNV-RP-F101 interval for splash-zone external inspection is 4 years on a riser with no active integrity threats. Once an active threat is identified — accelerated low-water corrosion, coating disbondment, mechanical damage — the interval should be re-baselined based on the measured corrosion rate and the time-to-action-threshold projection. In this case, with a measured short-term corrosion rate of 0.22 mm/year and a Class 3 composite repair installed, the operator tightened the interval on all four risers to 24 months: 12-month ROV-VT for coating condition, and 24-month rope-access PAUT-CM for any newly disbonded patches. Tighter than this rarely pays off on operating cost; longer than this on an aging riser is hard to defend.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/paut',
      label: 'Phased Array Ultrasonic Testing',
      context: 'Rope-access PAUT corrosion mapping with encoded raster per ASME V App IV.',
    },
    {
      href: '/methods/rt',
      label: 'Radiographic Testing',
      context: 'Digital radiography on the upstream girth weld gave 24-hour interpretation turnaround.',
    },
    {
      href: '/methods/vt',
      label: 'Visual Testing',
      context: 'Post-cure rope-access VT verified the composite-wrap installation.',
    },
    {
      href: '/standards/api-579',
      label: 'API 579 Fitness for Service',
      context: 'Onshore equivalent for LTA assessment — DNV-RP-F101 is the offshore call.',
    },
    {
      href: '/industries/offshore',
      label: 'Offshore NDT',
      context: 'Rope-access and diver-deployed inspection across North Sea, GoM, and West Africa assets.',
    },
    {
      href: '/industries/oil-gas',
      label: 'Oil & Gas NDT',
      context: 'Riser and platform integrity inspection across the upstream lifecycle.',
    },
    {
      href: '/free-tools/corrosion-rate-calculator',
      label: 'Corrosion Rate Calculator',
      context: 'Project short-term and long-term thinning rates from inspection history.',
    },
    {
      href: '/free-tools/remaining-life-calculator',
      label: 'Remaining Life Calculator',
      context: 'Project years-to-action-threshold from current wall and measured corrosion rate.',
    },
    {
      href: '/glossary/alwc',
      label: 'Accelerated Low-Water Corrosion',
      context: 'Splash-zone damage mechanism characterized by NACE SP0108.',
    },
    {
      href: '/ndt-services/aberdeen/paut',
      label: 'PAUT services in Aberdeen',
      context: 'North Sea PAUT inspection vendors with rope-access and offshore experience.',
    },
  ],
  citations: [
    {
      id: 'dnv-rp-f101',
      source: 'DNV-RP-F101 (2021), Corroded Pipelines — Recommended Practice',
    },
    {
      id: 'asme-v-app-iv',
      source: 'ASME BPVC Section V (2023), Article 4 Mandatory Appendix IV — Phased Array E-Scan and S-Scan',
    },
    {
      id: 'iso-24817',
      source: 'ISO 24817:2017, Petroleum, petrochemical and natural gas industries — Composite repairs for pipework',
    },
    {
      id: 'asme-v-app-viii',
      source: 'ASME BPVC Section V (2023), Article 2 Mandatory Appendix VIII — Digital Radiography',
    },
    {
      id: 'irata-icop',
      source: 'IRATA International Code of Practice (2020), Rope Access Methods for Industrial Inspection',
    },
    {
      id: 'nace-sp0108',
      source: 'NACE SP0108-2008, Corrosion Control of Offshore Structures by Protective Coatings',
    },
    {
      id: 'asme-b31-4',
      source: 'ASME B31.4 (2022), Pipeline Transportation Systems for Liquids and Slurries, §451.6.2',
    },
    {
      id: 'dnv-rp-f101-part-b',
      source: 'DNV-RP-F101 (2021), Part B — Allowable Stress Design (LTA assessment)',
    },
  ],
};

export default study;
