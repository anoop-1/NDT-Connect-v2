import type { CaseStudyContent } from '../types';

const study: CaseStudyContent = {
  slug: 'gulf-coast-fcc-reactor-h2s-attack',
  metaTitle: 'FCC Reactor H2S Attack: Gulf Coast PAUT Case Study',
  metaDescription:
    'A Gulf Coast refiner found 6.8 mm wall loss on an FCC reactor shell from high-temperature H2S attack. PAUT corrosion mapping, fitness-for-service, and a $4.2M shutdown avoided.',
  industry: 'Petroleum refining',
  regionLabel: 'US Gulf Coast (Texas)',
  assetType: 'FCC reactor shell, 14 ft ID, 1¼Cr-½Mo, 28-year service',
  heroLede:
    'A Gulf Coast major refiner caught a 6.8 mm wall-loss patch on the FCC reactor shell during a routine external UT survey — 41% loss against nominal, sitting directly under a stripping steam ring. The crew had four working days before catalyst-fill restart, and the API 510 inspector needed defensible numbers to justify either repair, FFS, or run-to-turnaround. This is the procedure they ran and the calls they made.',
  challenge:
    'The 28-year-old fluid catalytic cracking (FCC) reactor at a 240,000 bpd Gulf Coast refinery was three months into its 5-year inspection interval when a Level II UT technician flagged anomalous thickness readings on the lower shell course. Spot UT showed 9.8 mm remaining wall against a nominal 16.6 mm — a 41% loss concentrated in a 600 mm band roughly 1.2 m above the reactor cone-to-shell weld. The unit was scheduled to restart in 96 hours. The operator needed an inspection that could (a) map the full extent of wall loss, (b) characterize whether this was internal high-temperature H2S/H2 attack or external CUI, and (c) give the API 510 inspector enough data to file a fitness-for-service determination under API 579-1/ASME FFS-1 §5.[1][2]',
  approach: [
    {
      heading: 'Method selection: why PAUT corrosion mapping won over conventional UT',
      level: 2,
      paragraphs: [
        'Conventional 0° UT with a 2.25 MHz dual-element probe is the workhorse for spot thickness checks, and it is what flagged the anomaly. But spot UT cannot bound a corrosion patch — it only tells you what is under the probe. With 96 hours on the clock and a need to defend the wall-loss footprint to a third-party API 510 inspector, the inspection lead called for phased-array corrosion mapping (PAUT-CM) using encoded raster scanning per ASME V Article 4 Mandatory Appendix IV and API RP 577 §11.[3][4]',
        'PAUT-CM gives full-volumetric coverage of the scan footprint at a typical 1 mm × 1 mm resolution, with C-scan output that maps minimum remaining wall directly onto the shell. The crew specified a 5 MHz, 64-element linear-array probe with 0.6 mm pitch — selected because the 32 mm aperture clears the resolution requirements in ASME V T-451.1 for the 16.6 mm nominal wall.[3] The probe was paired with an Olympus OmniScan X3 64 channel unit and a wireless scanner crawler rated for 80°C surface temperature, which mattered because the shell was still at 71°C four hours after steam-out.',
        'A secondary call was made to deploy TOFD on the shell-to-cone girth weld in parallel. The wall-loss patch was inside the heat-affected-zone band of the most recent weld repair (2019 turnaround), and TOFD under ASME V Article 4 Mandatory Appendix III gives the highest probability of detection for HAZ cracking driven by high-temperature hydrogen attack (HTHA) — a damage mechanism specifically called out in API RP 941 §5 for 1¼Cr steel above 232°C.[5][6]',
      ],
    },
    {
      heading: 'Procedure: raster scan, gridding, and reference points',
      level: 2,
      paragraphs: [
        'Surface prep was the first time-sink. The external shell carried 3-4 mm of intumescent fireproofing under cladding. The crew cut a 1.2 m × 1.5 m inspection window centered on the spot-UT anomaly, removed cladding, scraped fireproofing to bare steel, and abraded to a 3.2 µm Ra surface finish per the procedure qualification under SNT-TC-1A §6.4.[7] Surface temperature at start of scan was 64°C; the procedure was qualified up to 80°C contact, so no cooling delay was needed.',
        'The scan plan gridded the window into six 200 mm × 250 mm tiles. Each tile was raster-scanned with the probe in linear electronic scanning mode at 32-element aperture, 8-element step, generating a C-scan at 1 mm encoder resolution. Total scan time per tile: 7 minutes. Calibration was performed on a step-wedge block traceable to NIST per ASME V T-462, with 80% screen-height response verified on a 1.5 mm flat-bottom hole side-drilled reference reflector.[3]',
        'A 250 mm × 250 mm overlap zone between tiles was scanned twice to verify positional repeatability. Drift between repeat scans came in under 0.2 mm at the deepest pit — well inside the ±0.5 mm acceptance criterion the procedure called for. The crew completed all six tiles plus the TOFD girth-weld scan in a single 11-hour shift.',
      ],
    },
    {
      heading: 'Findings: a high-temperature H2S attack signature, not CUI',
      level: 2,
      paragraphs: [
        'The C-scan composite showed a 480 mm × 320 mm patch of internal-side wall loss with minimum remaining wall of 9.4 mm — slightly worse than the spot-UT had indicated. The loss profile was smooth, dish-shaped, and concentrated on the inside diameter. No external pitting was visible after fireproofing removal, and no moisture or chloride contamination was found behind the cladding. This rules out CUI per NACE SP0198 §A2.2 — CUI signatures are external-side, irregular, and chloride-stained.[8]',
        'The damage signature matched high-temperature sulfidic corrosion per API RP 939-C §4.2: smooth, broad, internal-side metal loss in 1¼Cr-½Mo above 260°C in a hydrogen-bearing sour stream.[9] Operating temperature at this band was 312°C and H2S partial pressure was 0.18 MPa — well inside the corrosion envelope mapped in the McConomy curves. The 2019 weld repair likely disturbed the chromium-enriched sulfide scale, accelerating local thinning in the HAZ.',
        'TOFD on the girth weld came back clean — no HTHA cracking, no HAZ cracks, no lack-of-fusion. This was critical: HTHA would have forced an immediate shutdown under API RP 941 §6.3, regardless of remaining wall.[5] With cracking ruled out and the corrosion mechanism characterized, the path forward was a fitness-for-service Level 2 assessment under API 579-1 §5.4 using the local thin-area (LTA) method.[2]',
      ],
    },
    {
      heading: 'Disposition: FFS Level 2, run-to-turnaround with monitored intervals',
      level: 2,
      paragraphs: [
        'API 579-1 Level 2 FFS on a 480 mm × 320 mm LTA with 9.4 mm minimum remaining wall, against an MAWP of 2.4 MPa and a t_min of 7.8 mm calculated per ASME VIII Div 1 UG-27, returned a remaining strength factor (RSF) of 0.91. API 579 §5.4.2.2 allows continued operation at MAWP when RSF ≥ 0.90, with periodic re-inspection.[2][10] The unit was cleared to restart at full MAWP with a 12-month PAUT-CM re-inspection interval written into the integrity operating window (IOW).',
        'The inspector also wrote three corrective actions into the next turnaround scope: (1) replace the affected shell section with 347H stainless (sulfidation-resistant per API RP 939-C Table 1) on a 1.5 m × 1.5 m insert plate; (2) install three permanent UT sensors at the LTA centroid for between-turnaround monitoring; (3) revise the corrosion control document to flag the post-weld region as a higher-priority CML.[9]',
        'Total inspection cost: $47,500. Avoided cost: a 5-day unplanned shutdown at this FCC unit averages $2.1M/day in lost throughput and a further $1.1M in catalyst replacement if the unit comes down hot. Conservative cost avoidance was $4.2M against the worst-case scenario where the spot-UT reading was treated as a shutdown trigger without further characterization.',
      ],
    },
  ],
  methodsUsed: [
    'Phased Array UT corrosion mapping (PAUT-CM, encoded raster)',
    'Time-of-Flight Diffraction (TOFD) on shell-to-cone girth weld',
    'Conventional 0° UT thickness (2.25 MHz dual-element, baseline)',
    'Visual Testing (VT) for external CUI screening per NACE SP0198',
  ],
  defectsFound: [
    'Internal high-temperature sulfidic corrosion patch, 480 mm × 320 mm, max depth 7.2 mm (41% wall loss)',
    'Localized thinning in 2019 weld-repair HAZ, consistent with chromium-scale disturbance',
  ],
  outcome:
    'Fitness-for-service Level 2 assessment under API 579-1 §5.4 returned RSF = 0.91. Reactor cleared to restart at full MAWP with 12-month PAUT re-inspection. Repair scoped into next turnaround as 347H insert plate. Avoided 5-day unplanned shutdown.',
  costAvoidance:
    '$4.2M against worst-case unplanned shutdown ($2.1M/day FCC throughput loss × 2 days + $1.1M hot-catalyst replacement, per the operator\'s 2023 reliability planning data)',
  durationDays: 4,
  techniciansDeployed: 3,
  certificationsNeeded: [
    'ASNT Level II PAUT (per SNT-TC-1A or CP-189)',
    'ASNT Level II TOFD',
    'API 510 Authorized Pressure Vessel Inspector (for FFS sign-off)',
    'ASNT Level II UT (thickness)',
  ],
  faqs: [
    {
      q: 'Why use PAUT corrosion mapping instead of a denser conventional UT grid?',
      a: 'A 1 mm × 1 mm conventional UT thickness grid over a 480 mm × 320 mm patch would require roughly 150,000 spot readings — impossible inside a 96-hour window with manual encoding. PAUT corrosion mapping delivers the same resolution with full encoded C-scan output in roughly 45 minutes of scan time per tile, plus the C-scan itself is a defensible record for the API 510 inspector and any subsequent fitness-for-service evaluation. ASME V Article 4 Mandatory Appendix IV codifies PAUT-CM specifically for this corrosion-monitoring use case, and API RP 577 §11 endorses it for refinery LTA characterization.',
    },
    {
      q: 'How do you tell high-temperature H2S attack from CUI when both can appear under cladding?',
      a: 'The signatures separate cleanly when you actually look. High-temperature sulfidic corrosion (API RP 939-C) is internal-side, smooth, dish-shaped, and broad — driven by the hot sour stream eroding the protective sulfide scale from inside. CUI (NACE SP0198) is external-side, irregular, often pitted, and almost always accompanied by chloride staining, rust bloom, or water ingress paths visible behind the cladding. In this case, removing the cladding showed no moisture, no chloride, no external pitting — and the UT C-scan showed loss on the ID surface only. That combination is diagnostic.',
    },
    {
      q: 'What triggered the decision to run TOFD on the girth weld in parallel?',
      a: 'The LTA sat directly inside the heat-affected zone of a 2019 weld repair, and the operating envelope (312°C, 0.18 MPa H2S partial pressure, 1¼Cr-½Mo) puts the reactor inside the high-temperature hydrogen attack (HTHA) susceptibility window mapped in API RP 941 Figure 1. HTHA would have forced an immediate shutdown regardless of remaining wall. TOFD under ASME V Article 4 Mandatory Appendix III gives the highest probability of detection for HAZ cracking and is the recommended method per API RP 941 §6.2. Running it in parallel let the inspection team rule out the worst-case mechanism inside the same shift.',
    },
    {
      q: 'How does the API 579-1 RSF of 0.91 translate to a real-world re-inspection interval?',
      a: 'API 579-1 §5.4.2.2 allows continued operation at MAWP when the remaining strength factor is ≥ 0.90, but the standard requires the user to set a re-inspection interval based on the projected corrosion rate. The operator measured short-term and long-term thinning rates from this LTA against historical CML data and projected another 0.8 mm of loss per year worst-case. At that rate, the RSF would degrade to 0.85 (the action threshold) in roughly 18 months. A 12-month PAUT-CM re-inspection with three permanent UT sensors for continuous monitoring was written into the IOW — conservative against the 18-month projection.',
    },
    {
      q: 'Could a Long Range UT (LRUT) screening have caught this earlier between turnarounds?',
      a: 'Marginally. LRUT (guided wave per ASTM E2775) is excellent for screening long, inaccessible pipe runs for general wall loss but performs poorly on heavy-wall pressure-vessel shells. A 16.6 mm wall reactor course has too high a wall-thickness-to-wavelength ratio for typical 25-50 kHz LRUT modes to give useful sensitivity, and the geometric features (nozzles, support saddles, stripping steam ring) generate too many coherent reflections to cleanly resolve an LTA. The right between-turnaround tool here is permanent UT thickness sensors at known high-risk CMLs, not LRUT.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/paut',
      label: 'Phased Array Ultrasonic Testing (PAUT)',
      context: 'The crew called for phased-array corrosion mapping (PAUT-CM) using encoded raster scanning.',
    },
    {
      href: '/methods/tofd',
      label: 'Time-of-Flight Diffraction (TOFD)',
      context: 'A secondary call was made to deploy TOFD on the shell-to-cone girth weld in parallel.',
    },
    {
      href: '/methods/ut',
      label: 'Conventional Ultrasonic Testing',
      context: 'Conventional 0° UT with a 2.25 MHz dual-element probe is the workhorse for spot thickness checks.',
    },
    {
      href: '/standards/api-510',
      label: 'API 510 Pressure Vessel Inspection',
      context: 'The API 510 inspector needed defensible numbers to justify either repair, FFS, or run-to-turnaround.',
    },
    {
      href: '/standards/api-579',
      label: 'API 579-1/ASME FFS-1 Fitness for Service',
      context: 'A fitness-for-service Level 2 assessment under API 579-1 §5.4 using the local thin-area method.',
    },
    {
      href: '/standards/asme-section-v',
      label: 'ASME Section V Article 4',
      context: 'PAUT-CM per ASME V Article 4 Mandatory Appendix IV with calibration per T-462.',
    },
    {
      href: '/industries/oil-gas',
      label: 'NDT for Oil & Gas',
      context: 'Refinery integrity programs balance API 510 intervals against operating-window risk.',
    },
    {
      href: '/free-tools/remaining-life-calculator',
      label: 'Remaining Life Calculator',
      context: 'Project remaining wall life from short-term and long-term corrosion rates.',
    },
    {
      href: '/ndt-services/houston/paut',
      label: 'PAUT services in Houston',
      context: 'Gulf Coast PAUT inspection providers with FCC and reactor experience.',
    },
    {
      href: '/glossary/htha',
      label: 'High-Temperature Hydrogen Attack',
      context: 'HTHA would have forced an immediate shutdown under API RP 941 §6.3.',
    },
  ],
  citations: [
    {
      id: 'api-510-6-4-1',
      source: 'API 510, 11th ed. (2022), §6.4.1 Inspection Plan',
      url: 'https://www.api.org/products-and-services/standards/important-standards-announcements/standard-510',
    },
    {
      id: 'api-579-5-4',
      source: 'API 579-1/ASME FFS-1 (2021), Part 5 Assessment of Local Thin Areas',
    },
    {
      id: 'asme-v-art-4',
      source: 'ASME BPVC Section V (2023), Article 4 Mandatory Appendix III (TOFD) and Appendix IV (PAUT-E)',
    },
    {
      id: 'api-rp-577',
      source: 'API RP 577, 3rd ed. (2020), §11 Phased Array Ultrasonic Testing of Welds and Corrosion',
    },
    {
      id: 'api-rp-941',
      source: 'API RP 941, 8th ed. (2016), Steels for Hydrogen Service at Elevated Temperatures and Pressures',
    },
    {
      id: 'api-rp-941-fig-1',
      source: 'API RP 941, Figure 1 — Nelson Curves for HTHA susceptibility',
    },
    {
      id: 'asnt-snt-tc-1a',
      source: 'ASNT SNT-TC-1A (2020), Personnel Qualification and Certification in NDT',
    },
    {
      id: 'nace-sp0198',
      source: 'NACE SP0198-2017, Control of Corrosion Under Thermal Insulation and Fireproofing',
    },
    {
      id: 'api-rp-939c',
      source: 'API RP 939-C, 2nd ed. (2019), Guidelines for Avoiding Sulfidation (Sulfidic) Corrosion Failures',
    },
    {
      id: 'asme-viii-ug-27',
      source: 'ASME BPVC Section VIII Div 1 (2023), UG-27 Thickness of Shells under Internal Pressure',
    },
  ],
};

export default study;
