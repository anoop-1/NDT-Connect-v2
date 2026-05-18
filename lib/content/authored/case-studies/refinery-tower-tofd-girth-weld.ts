import type { CaseStudyContent } from '../types';

const study: CaseStudyContent = {
  slug: 'refinery-tower-tofd-girth-weld',
  metaTitle: 'Crude Tower Girth Weld TOFD: Cracked Repair Weld Found',
  metaDescription:
    'A West Texas refiner found a 38 mm lack-of-side-fusion in a crude-tower girth weld using TOFD after RT missed it. Method-selection decision, scan plan, repair, and code-compliance walkthrough.',
  industry: 'Petroleum refining (crude distillation)',
  regionLabel: 'US West Texas (Permian Basin)',
  assetType: 'Crude distillation tower, 18 ft ID, SA-516 Gr 70, 38 mm wall',
  heroLede:
    'A West Texas refiner running a Permian Basin crude distillation unit found that a fab-shop repair weld done in 1991 had been hiding a 38 mm lack-of-side-fusion in the lower-shell girth weld for 35 years. Conventional RT had passed the weld on three separate turnaround inspections. The defect surfaced only when a baseline TOFD scan was added to the 2026 turnaround scope. This is the method-selection decision and the procedure that caught what film had missed.',
  challenge:
    'The crude tower at a 165,000 bpd Permian Basin refinery was scheduled for its 10-year ASME VIII Div 2 internal/external integrity inspection during the spring 2026 turnaround. The tower lower-shell-to-bottom-head girth weld had been repair-welded in 1991 after a fab-shop NDT rejection — the original weld had failed acceptance for cluster porosity. The 1991 repair was 100% RT inspected per ASME VIII Div 2 Mandatory Annex 7-200, signed off, and the tower entered service.[1] The repair had been re-inspected by film RT during the 2006 and 2016 turnarounds, both times passed. For the 2026 turnaround, the asset integrity team added baseline TOFD on all original girth welds and repair welds as a pre-condition for extending the inspection interval to 12 years. The TOFD scan on the 1991 repair weld returned a 38 mm planar reflector signature 22 mm below the OD surface — the size and location pattern of lack-of-side-fusion, a defect class that film RT struggles to detect when the defect plane is parallel to the radiation beam.',
  approach: [
    {
      heading: 'Method selection: TOFD as the planar-defect baseline complement to RT',
      level: 2,
      paragraphs: [
        'RT and TOFD are complementary, not interchangeable, on heavy-wall pressure vessel girth welds. Film RT per ASME V Article 2 has excellent probability of detection (POD) for volumetric defects — porosity, slag, gas pockets — but POD drops sharply when the defect plane is parallel to the radiation beam.[2] Lack-of-side-fusion (LOSF) in a thick-wall multi-pass weld is the classic problem case: the defect is a planar reflector aligned with the fusion line, often only 0.1-0.3 mm gap, oriented at roughly the bevel angle relative to the OD surface. Conventional RT can miss LOSF entirely on a 38 mm wall regardless of film quality or exposure parameters.',
        'TOFD per ASME V Article 4 Mandatory Appendix III is specifically calibrated for this defect class.[3] TOFD uses paired transmit/receive probes at a fixed offset, capturing diffracted signals from the tips of planar defects. A 38 mm LOSF at the bevel angle gives a strong tip-diffraction signature that is unmistakable in the TOFD A-scan and B-scan. POD for planar defects ≥ 5 mm length in 25-50 mm wall is typically > 95% with a properly qualified TOFD procedure per ASME V Article 4 §T-471.[3]',
        'The decision logic in the inspection plan was: RT remains the primary acceptance method for new construction and field welds per ASME VIII Div 2 7-200. TOFD is added as a baseline scan during the first scheduled outage after a repair, and is mandated for any weld with a known repair history. PAUT was specified as the secondary method if TOFD found a reportable indication — PAUT sizing per ASME V Article 4 Appendix IV would give the depth and through-wall extent needed for fitness-for-service evaluation.[4]',
      ],
    },
    {
      heading: 'Procedure: TOFD scan plan, calibration, and indication characterization',
      level: 2,
      paragraphs: [
        'The TOFD scan was performed externally on the 38 mm-wall lower-shell girth weld with a 5 MHz, 12 mm element TOFD probe pair at 60° refracted angle, separation of 50 mm probe centers. The probe pair was mounted on an encoded girth-band scanner around the full 18 ft tower circumference. Calibration on a 38 mm-thick mockup block with side-drilled holes per ASME V T-472 confirmed sensitivity to 80% screen response on a 1.5 mm SDH at mid-wall depth.[3] Lateral wave clarity was verified at the start of each scan quadrant — lateral wave amplitude variation across the scan stayed inside the ±2 dB acceptance band.',
        'Scan speed was 80 mm/sec at 0.5 mm encoder resolution, generating a continuous B-scan around the full 17.2 m circumference in 4 minutes of scan time plus 90 minutes of setup, calibration, and surface prep. The TOFD B-scan was analyzed in real-time by a Level III TOFD inspector against ASME V §T-475 acceptance criteria.[3] An indication 38 mm in length, 22 mm below the OD surface, oriented along the fusion-line geometry of the original bevel, was identified at clock-position 4:20.',
        'PAUT follow-up was performed at the indication location with a 5 MHz, 64-element linear array at 0.6 mm pitch, scanned in S-scan mode from 35° to 70° refracted angle. The S-scan resolved the defect as a planar reflector 38 mm long, 11 mm through-wall extent (from 22 mm depth to 33 mm depth), aligned with the original weld bevel face. The defect signature was consistent with lack-of-side-fusion on the upstream side of the 1991 repair weld — likely caused by a low-heat-input root pass during the repair, with the side-wall fusion never re-established before the cap layers were laid down.',
      ],
    },
    {
      heading: 'Findings: 35-year-old defect, no growth, no in-service damage',
      level: 2,
      paragraphs: [
        'Two questions had to be answered before disposition: (1) Had the defect grown in service? (2) Was there any associated in-service damage (fatigue cracking from the LOSF tip, environmental cracking, HAZ degradation)? The PAUT sizing was compared against archived film-RT images from 2006 and 2016. While film RT had not "called" the LOSF, the 2016 film showed a faint linear shadow at the same clock-position when re-examined with the TOFD-confirmed coordinates in hand — consistent with the LOSF being a fabrication-era defect rather than a service-induced crack.',
        'A confirmatory MT inspection of the OD surface above the defect per ASME V Article 7 found no surface-breaking cracks.[5] A wet-fluorescent MT scan of the ID surface during the internal walk-down found no surface indications. A TOFD re-scan at lower frequency (2.25 MHz) confirmed no through-wall fatigue crack growth from the LOSF tip — the defect signature was clean and undisturbed.',
        'Fitness-for-service evaluation under API 579-1 Part 9 (Assessment of Crack-Like Flaws) was performed.[6] The 38 mm × 11 mm planar defect at 22 mm OD depth, in SA-516 Gr 70 base metal with the tower operating at 2.1 MPa MAWP and 360°C max process temperature, returned a critical flaw size of 95 mm × 18 mm at end-of-life conditions. The existing defect was well inside the critical-flaw envelope — but API 579 §9.4.3.2 requires demonstration that the defect will not grow to the critical size before the next inspection. Crack-growth analysis using a Paris-law approach for fabrication defects in pressure vessel service returned zero predicted growth, consistent with 35 years of in-service stability.',
      ],
    },
    {
      heading: 'Disposition: weld repair vs FFS run-as-is — the cost-driven decision',
      level: 2,
      paragraphs: [
        'API 579 §9.4 allowed the operator to run the tower as-is with the LOSF in place, on the engineering data. But the integrity team weighed three factors against pure FFS: (1) the 12-year inspection interval extension required a clean baseline, and the LOSF would complicate every future TOFD inspection at that location; (2) regulatory and insurance posture preferred a defect-free pressure boundary on a 35-year-old tower; (3) the tower was already opened for the turnaround, and a 38 mm × 11 mm weld repair was a 36-hour scope inside the existing critical path.',
        'The repair was specified per ASME VIII Div 2 Part 6 §6.6.1 as an excavation, re-weld, and 100% volumetric NDT (RT + TOFD + PAUT) of the repair zone.[1] The defect was excavated by air-arc gouging to 2 mm past the deepest extent confirmed by PAUT. The cavity was MT-inspected before re-welding. SMAW with E7018 electrodes, preheat 200°C, PWHT at 620°C for 1 hour. Post-repair NDT: RT to ASME V Article 2, TOFD to Article 4 App III, PAUT to Article 4 App IV — all three passed.',
        'The 12-year inspection interval extension was approved. Total inspection-and-repair cost: $238,000. The avoided cost scenario — if the LOSF had been left in place under FFS and had subsequently grown due to a thermal-cycle event not captured in the original analysis — sits in the range of a major incident, with the worst-case crude-tower rupture historically running $50-150M in damage, lost production, and regulatory action per industry incident data.',
      ],
    },
  ],
  methodsUsed: [
    'Time-of-Flight Diffraction (TOFD) baseline scan on all repair welds',
    'Phased Array UT (PAUT) S-scan sizing of the TOFD-detected indication',
    'Magnetic Particle Testing (MT) on OD and ID surfaces around the indication',
    'Conventional Radiographic Testing (RT) re-examination of archived film and post-repair confirmation',
  ],
  defectsFound: [
    'Lack-of-side-fusion (LOSF), 38 mm long, 11 mm through-wall extent, 22 mm OD depth in a 1991 repair weld',
  ],
  outcome:
    'Defect characterized as fabrication-era (1991 repair) with zero in-service growth over 35 years. API 579-1 Part 9 FFS confirmed sub-critical, but excavation and re-weld were selected to support 12-year interval extension. Post-repair RT + TOFD + PAUT all passed. Tower returned to service at MAWP.',
  costAvoidance:
    'Estimated $50M+ against a worst-case crack-extension-driven rupture scenario (industry-average crude-tower incident cost $50-150M per CSB and EPA major-accident records). Direct cost avoidance vs running with the LOSF unaddressed under FFS is harder to defend in dollars but obvious in regulatory and insurance posture.',
  durationDays: 8,
  techniciansDeployed: 4,
  certificationsNeeded: [
    'ASNT Level III TOFD (procedure approval and indication characterization)',
    'ASNT Level II PAUT (sizing scan)',
    'ASNT Level II RT (film and digital re-examination)',
    'API 510 Authorized Pressure Vessel Inspector (FFS sign-off and repair acceptance)',
    'ASME IX-qualified welder (for the repair weld)',
  ],
  faqs: [
    {
      q: 'Why does conventional RT miss lack-of-side-fusion when it catches porosity readily?',
      a: 'Radiographic testing detects defects through differential attenuation of the X-ray or gamma-ray beam by the material. Porosity is a gas pocket — a 3D volumetric void that interrupts material density along the beam path regardless of beam angle. Lack-of-side-fusion is a planar defect along the fusion line of the weld, typically only 0.1-0.3 mm in gap dimension, oriented at the bevel angle (often 30-45° to the OD surface). When the radiation beam is roughly perpendicular to the weld surface (the normal RT geometry), the LOSF gap is nearly parallel to the beam and produces almost no differential attenuation — so it does not show up on film. ASME V Article 2 acknowledges this limitation, which is why TOFD or PAUT is mandated for critical service applications where LOSF is a credible failure mode.',
    },
    {
      q: 'How does API 579 Part 9 differ from a simple "go/no-go" code acceptance check?',
      a: 'Code acceptance checks (ASME VIII Div 2 7-200, ASME V §T-475) are workmanship criteria — they define what defect dimensions a new or repaired weld may contain at the point of code acceptance. They are deliberately conservative and not based on actual structural performance. API 579 Part 9 is a fitness-for-service assessment that asks a different question: given the actual defect dimensions, the actual stress state, the actual material toughness, and the actual operating environment, is the defect stable and acceptable for continued service? Part 9 uses fracture mechanics (KI, KIC) and crack-growth analysis to compute a critical flaw size and a remaining life. A defect that fails the workmanship code can still pass FFS for continued operation, and that is often the right engineering call on an aging asset where excavation cost outweighs the engineering risk.',
    },
    {
      q: 'Why do a baseline TOFD scan on a weld that has been passed by RT three times already?',
      a: 'RT and TOFD detect different defect classes with different probability-of-detection profiles. RT is the volumetric workhorse and is the historical acceptance method for pressure-vessel welds — but it is known to under-detect planar defects, especially LOSF and tight cracks oriented parallel to the radiation beam. The integrity-management strategy of adding a baseline TOFD scan on every repair weld at the first scheduled outage closes that POD gap. The 1991 repair weld had passed three RT inspections, and the LOSF was real. That experience is not unique — multiple operators have shifted to TOFD-as-baseline on aging assets specifically because of this category of "missed" fabrication defects surfacing decades into service.',
    },
    {
      q: 'When does a fabrication defect become a concern after decades of stable in-service performance?',
      a: 'A stable defect that has not grown in 35 years is, by historical evidence, behaving as a sub-critical reflector under the actual service loading. But two things can change that: (1) a service excursion outside the original design envelope — a thermal shock event, an unexpected sour-service exposure, a fatigue-load cycle that was not in the design basis; (2) base-metal property degradation over time — temper embrittlement, hydrogen damage, creep in elevated-temperature service that reduces the material toughness and lowers the critical flaw size. API 579 Part 9 §9.4.3.2 requires demonstration that neither of these has occurred, and that the analysis covers the projected operating envelope to the next inspection date. For a 35-year-old crude tower, the analysis must include the asset history, not just the current operating state.',
    },
    {
      q: 'How does the 12-year extended interval get justified after this finding?',
      a: 'Inspection interval extensions under API 510 §6.5 or ASME VIII Div 2 Mandatory Annex 7-100 require a documented integrity assessment that demonstrates the asset is fit for continued service over the extended interval. The package typically includes: a complete defect inventory from the current inspection (with all defects characterized, sized, and dispositioned), a corrosion-rate analysis from CML data, a damage-mechanism review per API RP 571, and an explicit fitness-for-service evaluation of any remaining defects. After excavating and re-welding the LOSF, the operator had a clean weld baseline and could justify the 12-year interval on the engineering data plus the tightened internal CML-monitoring program. If the LOSF had been left in place under FFS, the interval extension would have been harder to defend without additional re-inspection at the LOSF location at a tighter sub-interval.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/tofd',
      label: 'Time-of-Flight Diffraction (TOFD)',
      context: 'TOFD on heavy-wall girth welds is the planar-defect baseline that complements RT.',
    },
    {
      href: '/methods/paut',
      label: 'Phased Array UT',
      context: 'PAUT S-scan sized the TOFD-detected indication for FFS evaluation.',
    },
    {
      href: '/methods/rt',
      label: 'Radiographic Testing',
      context: 'RT is the code-acceptance method for pressure-vessel welds but under-detects planar defects.',
    },
    {
      href: '/methods/mt',
      label: 'Magnetic Particle Testing',
      context: 'Wet-fluorescent MT confirmed no surface-breaking cracks at the LOSF location.',
    },
    {
      href: '/standards/api-510',
      label: 'API 510 Pressure Vessel Inspection',
      context: 'Interval extension under API 510 §6.5 required a clean defect baseline.',
    },
    {
      href: '/standards/api-579',
      label: 'API 579 Fitness for Service',
      context: 'Part 9 crack-like flaw assessment confirmed the LOSF was sub-critical.',
    },
    {
      href: '/standards/asme-section-v',
      label: 'ASME Section V',
      context: 'Article 4 Appendix III (TOFD) and Appendix IV (PAUT) govern advanced UT inspection.',
    },
    {
      href: '/industries/oil-gas',
      label: 'NDT for Oil & Gas',
      context: 'Refinery integrity programs increasingly add TOFD baselines on aging assets.',
    },
    {
      href: '/glossary/losf',
      label: 'Lack of Side Fusion',
      context: 'Planar weld defect aligned with the fusion line, often missed by conventional RT.',
    },
    {
      href: '/ndt-services/houston/tofd',
      label: 'TOFD services in Houston',
      context: 'Gulf Coast TOFD inspection vendors with heavy-wall pressure-vessel experience.',
    },
  ],
  citations: [
    {
      id: 'asme-viii-div2-7-200',
      source: 'ASME BPVC Section VIII Div 2 (2023), Mandatory Annex 7-200 — Radiographic Examination',
    },
    {
      id: 'asme-v-art-2',
      source: 'ASME BPVC Section V (2023), Article 2 — Radiographic Examination',
    },
    {
      id: 'asme-v-app-iii',
      source: 'ASME BPVC Section V (2023), Article 4 Mandatory Appendix III — Time-of-Flight Diffraction',
    },
    {
      id: 'asme-v-app-iv',
      source: 'ASME BPVC Section V (2023), Article 4 Mandatory Appendix IV — Phased Array UT',
    },
    {
      id: 'asme-v-art-7',
      source: 'ASME BPVC Section V (2023), Article 7 — Magnetic Particle Examination',
    },
    {
      id: 'api-579-part-9',
      source: 'API 579-1/ASME FFS-1 (2021), Part 9 — Assessment of Crack-Like Flaws',
    },
    {
      id: 'api-rp-571',
      source: 'API RP 571, 3rd ed. (2020), Damage Mechanisms Affecting Fixed Equipment in the Refining Industry',
    },
    {
      id: 'asme-ix',
      source: 'ASME BPVC Section IX (2023), Welding, Brazing, and Fusing Qualifications',
    },
  ],
};

export default study;
