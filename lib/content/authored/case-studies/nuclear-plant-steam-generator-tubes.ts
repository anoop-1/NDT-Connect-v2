import type { CaseStudyContent } from '../types';

const study: CaseStudyContent = {
  slug: 'nuclear-plant-steam-generator-tubes',
  metaTitle: 'PWR Steam Generator Tube ECT: 14 Tubes Plugged Case Study',
  metaDescription:
    'A US PWR plant ran multi-frequency eddy current on 12,580 steam generator tubes in a 21-day outage, plugged 14 tubes for ODSCC, and re-baselined the IGSCC monitoring program against EPRI guidelines.',
  industry: 'Nuclear power generation (PWR)',
  regionLabel: 'US Southeast (PWR fleet site)',
  assetType: 'PWR replacement steam generator, Alloy 690TT U-tubes, 12,580 tubes per SG',
  heroLede:
    'A US Southeast PWR operator ran multi-frequency eddy current on 12,580 Alloy 690TT U-tubes in a single replacement steam generator during a planned 21-day refueling outage. The campaign found 47 indications, sentenced 14 tubes for plugging under EPRI NEI 97-06 §3.4 acceptance criteria, and produced the dataset that re-baselined the IGSCC monitoring program for the rest of the fuel cycle. The work happened on the outage critical path — every hour of slip cost the operator $1.4M in replacement power.',
  challenge:
    'A 1,150 MWe pressurized-water reactor on a 21-day refueling outage runs steam generator (SG) tube inspection as a critical-path activity. The Technical Specifications under 10 CFR §50.55a require eddy current testing (ECT) of SG tubes per the plant\'s Steam Generator Program, which is administered to EPRI NEI 97-06 and the ASME XI IWB-3520 acceptance framework.[1][2] The outage scope on this campaign called for 100% bobbin-coil ECT of all 12,580 tubes in one SG (Channel head A), plus rotating coil follow-up on a 20% sample and on any bobbin-flagged indications, plus plus-point or array probe re-inspection of the tube-to-tubesheet expansion transitions where outside-diameter stress-corrosion cracking (ODSCC) had been seen in prior outages. The entire SG inspection had to fit inside 96 hours of the outage timeline. Any tubes failing acceptance had to be plugged, with the plugging count fed into the operating-cycle leakage analysis before reactor restart.',
  approach: [
    {
      heading: 'Method selection: bobbin coil for screen, plus-point and array for characterization',
      level: 2,
      paragraphs: [
        'Bobbin-coil ECT is the screening workhorse for steam generator tubes per ASME XI IWA-2233 — fast (typical 1.0-1.5 m/sec pull speed), full-tube coverage, and sensitive to volumetric wall loss and circumferential cracking.[3] On Alloy 690TT tubing with 1.07 mm wall thickness, multi-frequency bobbin at 100 kHz / 400 kHz / 600 kHz / 100+400 kHz mix gives good discrimination between true defects and benign signals (sludge, support-plate edges, U-bend transitions). POD for ODSCC ≥ 20% throughwall is typically > 90% with a qualified bobbin examination per the operator\'s site-specific qualification per EPRI ETSS 96910.[4]',
        'Bobbin is weak on circumferential cracking and on shallow axial cracking in expansion transitions and U-bends — those defect classes need rotating probe or array probe follow-up. The operator\'s Steam Generator Program specified plus-point rotating coil per EPRI ETSS 96008 for all bobbin-flagged indications and for 100% of the hot-leg expansion transitions, where ODSCC has the highest historical incidence on Alloy 600 mill-annealed tubing and is monitored as a precaution on the Alloy 690TT replacement tubing.[4][5]',
        'Array-probe (eight-element rotating array) was specified as the third tier for any plus-point indications that exceeded the bobbin-to-plus-point sizing correlation tolerance, and for the periodic re-baseline of the U-bend regions where stress geometry differs from straight-tube sections. Array gives full circumferential coverage in a single pull, with C-scan output that maps defect length, width, and depth — the inputs needed for EPRI 97-06 §3.4 acceptance sentencing.[2]',
      ],
    },
    {
      heading: 'Procedure: 96-hour campaign with three crews on rotating shifts',
      level: 2,
      paragraphs: [
        'The campaign was structured around three 12-hour shifts of two-technician crews running ECT acquisition from the SG channel head platform, with data acquisition pulled to a centralized data-analysis room where four certified Level III analysts worked in parallel. Bobbin acquisition rate ran at 14 tubes/hour per probe head, with two heads running simultaneously — total bobbin throughput 336 tubes per 12-hour shift, completing the full 12,580 tubes in 38 hours wall clock.',
        'Analysis followed the EPRI bobbin-coil analysis guideline with two independent analysts per tube and a third analyst resolving any disagreement.[4] Indications were flagged into three buckets: (1) confirmed defects requiring plus-point characterization, (2) ambiguous indications requiring plus-point characterization, (3) benign signals (sludge, support plate, MBM) dispositioned and recorded but not flagged for follow-up. Bobbin pass surfaced 198 flagged indications in 142 tubes.',
        'Plus-point follow-up on the 142 flagged tubes plus 100% of expansion transitions on a 20% random sample (2,516 transitions) ran on a single shift with one probe pull per tube section. Plus-point detected 47 indications — 31 in the bobbin-flagged tubes, 16 in expansion transitions not flagged by bobbin (small circumferential ODSCC undersized by bobbin). Array follow-up on the 16 small ODSCC indications confirmed defect dimensions and produced the C-scan records for sentencing.',
      ],
    },
    {
      heading: 'Findings: 14 tubes for plugging, 33 monitored for next outage',
      level: 2,
      paragraphs: [
        'Of the 47 plus-point and array-confirmed indications, 14 exceeded the EPRI 97-06 §3.4 acceptance threshold of 40% throughwall depth on a stress-corrosion-cracking-classified defect, and were sentenced for plugging.[2] All 14 were ODSCC at the hot-leg expansion transition — consistent with the historical damage mechanism on this SG model, where residual stress from the hydraulic-expansion fabrication step combines with the primary-water chemistry and operating temperature to drive ODSCC initiation.',
        'The remaining 33 indications were between 20% and 40% throughwall and were sentenced as "monitored" — recorded into the operating-cycle leakage analysis and flagged for re-inspection at the next outage. None of the indications were in the U-bend region, which is the secondary concern on Alloy 690TT. No primary-side IGSCC was detected — Alloy 690TT was specifically selected as a replacement-SG material for its IGSCC resistance, and 14 outage cycles in, the fleet experience continues to validate that selection.',
        'The 14 plugs were installed using mechanical-expansion plugs per the operator\'s plugging procedure, which is qualified to ASME XI IWB-3120 and the plug-manufacturer\'s technical specification.[3] Plug installation took 4 hours wall-clock for all 14, with leak-test verification at 1.1× normal operating pressure. The operating-cycle leakage analysis showed total plug count for both SGs (current campaign + historical plugs) at 0.31% of original tube count — well inside the 18% plugging limit at which the Tech Specs require an SG replacement evaluation.',
      ],
    },
    {
      heading: 'Disposition: cycle-leakage analysis cleared, monitoring program updated',
      level: 2,
      paragraphs: [
        'The post-inspection cycle-leakage analysis per NEI 97-06 §6.3 considered the 33 monitored indications, projected their growth over the 18-month operating cycle using EPRI degradation-growth-rate data for Alloy 690TT ODSCC, and confirmed that the projected end-of-cycle leakage stayed below the 150 gallons-per-day Technical Specification limit even under the worst-case growth scenario.[1][6] Reactor restart was authorized.',
        'The integrity-management team updated the Steam Generator Program for the next outage based on this campaign: (1) bobbin coverage stays at 100% of the inspected SG; (2) plus-point coverage on expansion transitions expands from 20% to 50% based on the small-ODSCC findings; (3) array-probe re-baseline of all 14 plugged-tube neighbors during the next outage to confirm no propagation to adjacent tubes.',
        'The campaign closed on the outage critical path — 92.4 hours actual against the 96-hour budget. Total inspection cost: $1.9M including equipment, labor, and data analysis. Avoided cost: a single hour of outage slip on this reactor costs $1.4M in replacement power purchased on the day-ahead market, so the 3.6-hour buffer represented $5M in retained margin against the outage budget.',
      ],
    },
  ],
  methodsUsed: [
    'Multi-frequency bobbin-coil Eddy Current Testing (ECT) — 100% screening',
    'Plus-point rotating-coil ECT — follow-up on flagged indications and 20% expansion transitions',
    'Eight-element array-probe ECT — defect characterization and U-bend re-baseline',
    'Visual Testing (VT) of plug installations and channel-head sludge condition',
  ],
  defectsFound: [
    'Outside-diameter stress-corrosion cracking (ODSCC) at hot-leg expansion transitions — 14 tubes ≥ 40% TW (plugged), 33 tubes 20-40% TW (monitored)',
  ],
  outcome:
    '14 tubes plugged per EPRI NEI 97-06 §3.4 acceptance, 33 tubes monitored to next outage. Cycle-leakage analysis cleared at < 150 gpd limit. Reactor restart authorized on schedule. Steam Generator Program updated with expanded plus-point coverage for next outage.',
  costAvoidance:
    '$5M against the outage budget (3.6-hour buffer against $1.4M/hr replacement-power cost). Beyond the schedule, the avoided cost scenario of an unplanned mid-cycle SG tube leak — historical industry events run $20-40M in unplanned outage and replacement power per NRC INPO event data.',
  durationDays: 21,
  techniciansDeployed: 14,
  certificationsNeeded: [
    'ASNT Level II ECT (bobbin and plus-point acquisition)',
    'ASNT Level III ECT (data analysis and indication sentencing)',
    'EPRI ETSS site-specific qualification for steam generator tube examination',
    'ASME XI Section IWA-2300 personnel qualification',
    'NRC-licensed radiation worker (containment access)',
  ],
  faqs: [
    {
      q: 'Why does Alloy 690TT replace Alloy 600 in modern steam generators, and what damage mechanisms remain?',
      a: 'Alloy 600 mill-annealed (Alloy 600MA) was the original SG tubing material in most US PWRs built in the 1970s and 1980s, and it proved susceptible to primary-water stress-corrosion cracking (PWSCC) and outside-diameter SCC at expansion transitions, U-bends, and tube-to-tubesheet crevices. Alloy 690 in the thermally-treated condition (690TT) has a higher chromium content (~30% vs ~16%) and a heat-treatment that improves grain-boundary chromium carbide distribution — both of which dramatically improve SCC resistance. Fleet experience over 30+ years shows Alloy 690TT essentially eliminates PWSCC and dramatically reduces ODSCC incidence, but does not eliminate ODSCC entirely, especially at expansion transitions where residual fabrication stress combines with crevice chemistry. ECT monitoring remains required, just at lower expected indication rates.',
    },
    {
      q: 'What is the difference between bobbin coil, plus-point, and array-probe ECT, and when is each used?',
      a: 'Bobbin coil is a co-axial coil that travels the inside of the tube and senses impedance changes as it passes wall thinning or cracking. It is fast (1-1.5 m/sec pull rate) and sensitive to circumferentially-oriented defects (wall loss, ODSCC, support-plate corrosion) but weak on axial cracking and on small defects in expansion transitions where geometry-induced signals mask defect signals. Plus-point is a rotating cross-wound coil that scans the tube ID in a helical pattern, sensitive to both circumferential and axial cracking with high sizing accuracy. Array probe is an eight-element rotating coil that covers the full tube circumference in a single non-rotating pull, faster than plus-point but with similar sensitivity. Standard SG inspection runs bobbin for screening, plus-point for follow-up on flagged indications and for 100% coverage of expansion transitions, and array for characterization of borderline indications or for full re-baseline of high-risk regions.',
    },
    {
      q: 'How does the 40% throughwall plugging threshold get derived?',
      a: 'The 40% TW threshold in EPRI NEI 97-06 §3.4 is a defense-in-depth limit chosen to ensure that any indication left in service has adequate margin against tube rupture under both normal operating loads and design-basis accident loads (main steam line break, locked-rotor accident). The structural-integrity analysis behind the 40% threshold considers tube material properties, normal operating differential pressure, accident-condition differential pressure, and ECT sizing uncertainty. The threshold is conservative — actual burst pressure for an Alloy 690TT tube with a 40% TW ODSCC is several times the accident-condition pressure — but the conservatism provides margin against undersizing, growth between inspections, and unmodeled load cases. Tubes ≥ 40% TW are plugged; tubes between 20% and 40% are monitored; tubes < 20% TW are typically not reported as actionable indications.',
    },
    {
      q: 'Why does plugging count get capped at 18% of original tubes before triggering an SG replacement evaluation?',
      a: 'Each plugged tube reduces SG heat-transfer surface area. The thermohydraulic design of a PWR steam generator includes margin for tube plugging up to a limit defined in the plant\'s licensing basis and Technical Specifications — typically 15-20% per SG, with 18% being a common value. Beyond that, the SG can no longer transfer the design thermal duty at full reactor power, and the operator must either de-rate the plant (lower steam pressure, lower turbine output) or evaluate SG replacement. SG replacement is a major capital project — typically $300-500M per unit including replacement components, outage extension, and engineering — so the integrity-management goal is to keep plugging rates low through aggressive ECT monitoring and degradation-mitigation programs (water chemistry control, foreign material exclusion, lay-up procedures).',
    },
    {
      q: 'What drives the schedule pressure on SG tube inspection during a refueling outage?',
      a: 'A PWR refueling outage runs roughly 21-35 days and includes many concurrent activities: refueling, primary-system component inspections, secondary-system maintenance, turbine overhauls, electrical bus work. SG tube ECT is on the critical path because the SG channel head is opened, drained, and decontaminated for ECT access — and the same access window is needed for tubesheet inspection, channel-head bowl repair, and primary-side maintenance. Any slip on ECT pushes back every downstream activity. Outage slip costs the operator on two fronts: replacement power (the unit is not generating, so power must be purchased on the day-ahead market — typically $50-80/MWh × 1,150 MWe × 24 hours = ~$1.4-2.2M/day) and fixed-cost overhead (the outage crew of 1,500-2,500 contractors continues to bill). Inspection vendors are selected and contracted with explicit schedule SLAs.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/eddy-current',
      label: 'Eddy Current Testing (ECT)',
      context: 'Multi-frequency bobbin and plus-point ECT are the standard for SG tube inspection.',
    },
    {
      href: '/methods/vt',
      label: 'Visual Testing',
      context: 'Channel-head VT confirmed plug installation and sludge condition.',
    },
    {
      href: '/standards/asme-section-xi',
      label: 'ASME Section XI',
      context: 'IWB-3520 acceptance framework for in-service inspection of nuclear components.',
    },
    {
      href: '/industries/nuclear',
      label: 'NDT for Nuclear Power',
      context: 'PWR fleet inspection programs administered to NRC and EPRI requirements.',
    },
    {
      href: '/glossary/odscc',
      label: 'Outside-Diameter Stress Corrosion Cracking',
      context: 'Dominant Alloy 690TT degradation mechanism at expansion transitions.',
    },
    {
      href: '/glossary/igscc',
      label: 'Intergranular Stress Corrosion Cracking',
      context: 'Historical Alloy 600 degradation mechanism — addressed by Alloy 690TT replacement.',
    },
    {
      href: '/free-tools/eddy-current-conductivity',
      label: 'Eddy Current Conductivity Calculator',
      context: 'Estimate standard depth of penetration for ECT inspection planning.',
    },
    {
      href: '/careers/eddy-current-technician',
      label: 'Eddy Current Technician Career Guide',
      context: 'EPRI ETSS-qualified ECT analysts are in high demand across the US nuclear fleet.',
    },
    {
      href: '/ndt-services/charlotte/eddy-current',
      label: 'ECT services in Charlotte',
      context: 'Southeast US nuclear ECT vendors with PWR fleet experience.',
    },
    {
      href: '/standards/asme-section-v',
      label: 'ASME Section V',
      context: 'Article 8 (Eddy Current Examination) procedure-qualification baseline.',
    },
  ],
  citations: [
    {
      id: 'cfr-50-55a',
      source: '10 CFR §50.55a, Codes and standards (incorporates ASME XI for in-service inspection)',
    },
    {
      id: 'nei-97-06',
      source: 'NEI 97-06, Rev 3 (2011), Steam Generator Program Guidelines',
    },
    {
      id: 'asme-xi-iwb',
      source: 'ASME BPVC Section XI (2023), Subsection IWB — Inspection of Class 1 Components',
    },
    {
      id: 'epri-etss-96910',
      source: 'EPRI Examination Technique Specification Sheet 96910, Bobbin Coil Examination of Steam Generator Tubing',
    },
    {
      id: 'epri-etss-96008',
      source: 'EPRI Examination Technique Specification Sheet 96008, Plus-Point Probe Examination of Steam Generator Tubing',
    },
    {
      id: 'epri-degradation-growth',
      source: 'EPRI Report 1019044 (2009), Steam Generator Degradation Specific Management Flaw Handbook',
    },
    {
      id: 'asme-v-art-8',
      source: 'ASME BPVC Section V (2023), Article 8 — Eddy Current Examination',
    },
  ],
};

export default study;
