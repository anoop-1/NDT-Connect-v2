import type { CaseStudyContent } from '../types';

const study: CaseStudyContent = {
  slug: 'gas-pipeline-cui-discovery',
  metaTitle: 'Gas Pipeline CUI Discovery: Pulsed Eddy Current Survey',
  metaDescription:
    'A Northeast US gas midstream operator screened 4.2 miles of insulated 24-inch gas pipe with pulsed eddy current, found 38 CUI hot spots, and verified the worst at 71% wall loss using PAUT.',
  industry: 'Natural gas transmission and midstream',
  regionLabel: 'US Northeast (Pennsylvania to New Jersey)',
  assetType: '24-inch X52 cryogenically-cooled natural gas transmission pipe, 75 mm calcium-silicate insulation, 1992 vintage',
  heroLede:
    'A Northeast US midstream operator running a 4.2-mile insulated 24-inch natural gas trunk line at 70 bar between a compressor station and a city-gate metering point ran a pulsed eddy current (PEC) screening campaign in 2026 and surfaced 38 corrosion-under-insulation (CUI) hot spots above the 20% wall-loss threshold. PAUT verification on the worst 12 indications confirmed up to 71% wall loss in two pits adjacent to a pipe support. The campaign closed inside a 6-week window with no operational shutdown — gas flow continued throughout. This is the screening procedure, the verification logic, and the spot-repair scope.',
  challenge:
    'A 34-year-old 24-inch X52 natural gas transmission pipeline runs 4.2 miles of above-ground insulated pipe between a compressor station and a downstream metering station. The pipe carries gas at 70 bar and an outlet temperature of -3°C after Joule-Thomson cooling — a temperature band that puts the pipe inside the API RP 583 CUI susceptibility envelope.[1] The line was on a 10-year API 570 inspection interval, last inspected by spot UT at insulation removal points in 2016.[2] The 2026 inspection scope called for a screening method that could survey the full 4.2 miles without removing the bulk of the calcium-silicate insulation — full insulation removal across that distance would have cost an estimated $2.1M and required a 12-week shutdown. The operator needed: (a) a non-intrusive screening method covering 100% of the insulated pipe, (b) verification of any flagged indications with quantitative wall-loss measurement, (c) targeted spot repairs without taking the line out of service if at all possible.',
  approach: [
    {
      heading: 'Method selection: pulsed eddy current for screening, PAUT for verification',
      level: 2,
      paragraphs: [
        'Pulsed eddy current (PEC) is the modern non-intrusive screening tool for CUI. PEC uses a low-frequency electromagnetic pulse that penetrates non-conductive insulation and aluminum or stainless steel jacketing, induces eddy currents in the underlying carbon steel, and measures the decay characteristic of the induced field — which is directly correlated to remaining wall thickness. PEC was specified per API RP 583 §10.4 and the operator\'s site procedure qualification.[1] Throughput on a 24-inch insulated pipe is typically 30-50 measurements per hour with a handheld probe (Eddyfi Lyft, Innospection PECA, GE Reuter-Stokes), giving a 4.2-mile screening time of roughly 12-15 working days at 1 m grid spacing.',
        'PEC limitations were factored into the procedure. PEC measures an average wall thickness under the probe footprint — typically a 100 mm × 100 mm or 150 mm × 150 mm area depending on probe and standoff distance — so it under-detects small isolated pits. Detection threshold for general wall loss is roughly 10%; pitting detection requires the pit to be larger than the PEC footprint or to occupy enough of the footprint to shift the averaged signal. The procedure required dense grid spacing (300 mm × 1 m raster on the lower pipe quadrant where CUI risk is highest, 1 m × 1 m on the upper quadrants) and follow-up PAUT verification on any indication ≥ 20% PEC-reported wall loss.',
        'PAUT verification used a standard 5 MHz, 64-element linear array at 0.6 mm pitch, with the insulation locally removed at the indication site to give probe access. Each PAUT scan covered a 400 mm × 400 mm window centered on the PEC indication, resolving pitting depth and pattern at 1 mm × 1 mm raster. Where PAUT confirmed wall loss ≥ 50% — the operator\'s action threshold under their integrity-management procedure — a fitness-for-service evaluation was triggered per API 579-1.[3]',
      ],
    },
    {
      heading: 'Procedure: 4.2 miles in three phases, no operational shutdown',
      level: 2,
      paragraphs: [
        'The PEC campaign ran in three phases. Phase 1 was full-line screening with the handheld probe at the prescribed grid spacing. Two technicians worked in parallel from a service truck towing a small generator and the PEC instrument, with insulation jacket cut-outs limited to small 50 mm probe-access holes that were resealed with foam tape at the end of each day. Phase 1 took 14 working days, generated 6,800 individual PEC measurements, and surfaced 38 indications above the 20% wall-loss threshold.',
        'Phase 2 was indication clustering analysis. The 38 indications mapped to 24 discrete locations along the line — most clusters were at pipe support saddles, where the original installation had used un-coated steel saddle plates that channeled rainwater and atmospheric moisture into the insulation. Other clusters appeared at expansion-loop low points, valve flanges, and one section where bird damage to the insulation jacket had been recorded but not repaired in the 2016 inspection. Clustering analysis prioritized verification — the worst 12 clusters by PEC-reported wall loss went to PAUT first.',
        'Phase 3 was PAUT verification on 12 priority clusters over 6 working days. Two PAUT crews worked in parallel, removing local insulation in 600 mm × 600 mm windows for each scan. The PEC-to-PAUT comparison matched well on average loss (within 3% wall) but PEC had under-called pit depth — the worst PEC indication at 42% averaged wall loss resolved by PAUT to 71% peak pit depth in a 25 mm × 18 mm pit, with surrounding general loss at 28%.',
      ],
    },
    {
      heading: 'Findings: support-saddle CUI dominates, two repair priorities',
      level: 2,
      paragraphs: [
        'The 12 PAUT-verified clusters returned the following: 2 clusters at ≥ 50% peak pit depth requiring immediate repair, 4 clusters at 30-50% peak depth requiring scheduled repair, 6 clusters at 20-30% peak depth requiring monitoring. The damage signature on every cluster was classic CUI per API RP 583 §6.2 — pitting under wet insulation at points of water ingress, with chloride-bearing condensate driving accelerated localized corrosion on the carbon-steel surface.[1]',
        'The deepest cluster (71% pit depth, 28% surrounding general loss) was at a support saddle where the saddle plate was un-coated and had rusted into the insulation. The second-deepest cluster (58% pit depth) was at an expansion-loop low point where water collection had been identified in the 2016 inspection but not addressed in the corrective-action package. Both clusters were on the lower 180° of the pipe — the high-risk quadrant where gravity-driven moisture accumulation drives CUI risk.[1]',
        'No defects were found on the upper 180° of the pipe — consistent with the API RP 583 risk model that CUI risk concentrates on the bottom of horizontal pipe where water sits. The PEC campaign\'s extensive upper-quadrant coverage produced thousands of measurements all in the "no significant loss" band. Future PEC campaigns could potentially de-prioritize the upper quadrants and concentrate the inspection budget on lower quadrants and support saddles — a refinement the operator added to the corrective-action package.',
      ],
    },
    {
      heading: 'Disposition: hot-tap clamp repairs, insulation system upgrade',
      level: 2,
      paragraphs: [
        'The 2 immediate-repair clusters were addressed with type-approved composite-wrap repairs per ASME PCC-2 Article 4.1 — fiber-reinforced polymer repair sleeves engineered for the pipe operating pressure and the measured defect geometry.[4] Composite-wrap installation does not require taking the line out of service and could be installed in 8-12 hours per cluster. Both immediate-repair clusters were closed within 5 working days. The 4 scheduled-repair clusters were similarly addressed with composite wraps over the following 3 weeks. The 6 monitored clusters were re-baselined with PAUT at the inspection-closure date and entered the operator\'s integrity database for re-inspection in 24 months.',
        'The corrective-action package added an insulation-system upgrade to the next planned outage. Original calcium-silicate insulation with un-coated steel saddles was replaced with closed-cell polyisocyanurate insulation under aluminum jacketing, with PTFE thermal-break pads at all pipe supports and corrosion-resistant coated saddles. The upgrade did not happen in the inspection campaign — it was scoped for a 2027 maintenance shutdown — but the design and procurement started immediately. Cost of the insulation upgrade: $1.6M across 4.2 miles.',
        'Total campaign cost: $580,000 including PEC, PAUT, composite repairs, and engineering. Cost avoidance against the alternative scenario of full insulation removal for direct UT inspection: $2.1M plus the deferred-production cost of a 12-week shutdown. Avoided cost against a worst-case scenario where the 71% pit had propagated to through-wall during the next 5 years of operation: a 24-inch natural gas pipeline through-wall failure in a populated Northeast corridor would have triggered a PHMSA enforcement action, evacuation costs, and lost-product claims — historically running $25-50M in industry incident data.',
      ],
    },
  ],
  methodsUsed: [
    'Pulsed Eddy Current (PEC) — full-line non-intrusive screening',
    'Phased Array UT corrosion mapping (PAUT-CM) — verification of PEC indications',
    'Visual Testing (VT) — insulation-jacket condition survey',
    'Conventional 0° UT thickness — baseline spot checks at insulation removal points',
  ],
  defectsFound: [
    'Support-saddle CUI pit cluster — 71% peak wall loss in 25 mm × 18 mm pit, 28% surrounding general loss',
    'Expansion-loop low-point CUI cluster — 58% peak wall loss with general loss 22%',
    '10 additional CUI clusters between 20% and 50% wall loss, monitored or scheduled-repair',
  ],
  outcome:
    '12 PAUT-verified CUI clusters dispositioned: 2 immediate composite-wrap repairs, 4 scheduled composite-wrap repairs, 6 monitored. Insulation-system upgrade scoped for 2027 shutdown. All 4.2 miles re-baselined for next PEC interval at 5 years.',
  costAvoidance:
    '$2.1M against full insulation removal for direct UT, plus $25-50M against the worst-case through-wall-failure scenario in a populated Northeast corridor.',
  durationDays: 28,
  techniciansDeployed: 6,
  certificationsNeeded: [
    'ASNT Level II PEC (per ISO 9712 or SNT-TC-1A site qualification)',
    'ASNT Level II PAUT (corrosion mapping)',
    'API 570 Authorized Piping Inspector (for FFS sign-off)',
    'ASME PCC-2 Repair Engineer (for composite-wrap design)',
  ],
  faqs: [
    {
      q: 'Why does pulsed eddy current under-call pit depth compared to PAUT?',
      a: 'PEC measures the average wall thickness within the probe footprint, which is typically 100-150 mm in diameter. A pit that occupies only a small fraction of the footprint area gets diluted in the average — a 71% deep pit covering 18 mm × 25 mm inside a 150 mm × 150 mm PEC footprint averages to roughly 40-45% reported wall loss because the rest of the footprint is at much lower loss. PAUT, with a 1 mm × 1 mm raster resolution, resolves the actual pit depth directly. The right way to use PEC is as a screening tool that flags regions worthy of higher-resolution follow-up, with the understanding that any PEC indication > 20% averaged loss likely contains pits worse than the averaged number suggests. The operator\'s procedure that triggers PAUT at the 20% PEC threshold captures this correctly.',
    },
    {
      q: 'Why is the bottom of horizontal insulated pipe the high-risk CUI zone?',
      a: 'CUI requires three conditions: water under the insulation, an operating temperature in the CUI susceptibility band (typically -12°C to 175°C for carbon steel), and chloride or other corrosive contaminants in the wet environment. On a horizontal insulated pipe, gravity pulls any water that gets through the jacket downward, so any water bridge between the jacket and the pipe surface concentrates on the lower 180° — the so-called "6 o\'clock" position. API RP 583 §6.2 and NACE SP0198 both call out the lower quadrant as the priority inspection target for horizontal pipe. Vertical pipe has different CUI dynamics — water can travel down from a jacket damage point and the pitting can appear anywhere along the run — and elbows, expansion loops, and any geometry where water can pool deserve elevated risk weighting.',
    },
    {
      q: 'How does a composite-wrap repair compare to a Type B sleeve or full pipe replacement on a gas pipeline?',
      a: 'Composite-wrap repairs under ASME PCC-2 Article 4.1 or ISO 24817 are engineered for non-leaking external defects where the host pipe still carries the pressure load. They install while the line stays in service, take 8-12 hours per repair, and cost roughly $25,000-50,000 per cluster on a 24-inch pipe. Type B full-encirclement welded sleeves are the next level up — they install over the existing pipe with full-penetration longitudinal seam welds and pressure-test as part of the line. Type B requires welding on a pressurized line (acceptable under qualified procedures with hot-tap methods) or a brief pressure reduction, and costs typically $100,000-200,000 per repair. Full pipe replacement (cutting out the damaged section and welding in a replacement) requires taking the line out of service, blow-down, purge, weld qualification, and re-commissioning — typically $400,000-800,000 per cluster on a 24-inch line plus the deferred-throughput cost. Composite wraps are the right answer for shallow-to-medium CUI defects with the right engineering data backing the design.',
    },
    {
      q: 'What is the realistic re-inspection interval for an insulated pipeline after a CUI campaign like this?',
      a: 'API 570 §6.2 sets the upper-bound interval for piping inspection at 10 years for low-risk circuits and 5 years for high-risk circuits. A pipeline that has produced a confirmed CUI campaign with multiple clusters at ≥ 50% wall loss qualifies as high-risk under any reasonable risk-based-inspection methodology, so the maximum interval would be 5 years. Most operators tighten further to 3-4 years for the next interval to capture any post-repair degradation or new CUI initiation, then return to 5 years once the corrective actions (insulation upgrade, support-saddle replacement, CP if applicable) have demonstrated effectiveness over one or two cycles. The right approach is data-driven: re-inspect, compare the new findings against the prior campaign, and adjust the interval based on the measured corrosion rate.',
    },
    {
      q: 'Could you skip PEC and just do PAUT on every insulation removal point?',
      a: 'You could, but the economics rarely work. PAUT requires removing insulation in 600 mm × 600 mm windows at every inspection point, which on a 4.2-mile line at typical CML spacing means hundreds of insulation cut-and-restore operations costing $400-800 each. The total insulation removal cost alone for a comparable PAUT-only campaign would be $1.5-2M, plus the PAUT scan-time cost. PEC screens at $80-120 per measurement with only small (50 mm) jacket access holes, and the campaign cost from the data acquired is much lower per square foot of pipe inspected. The hybrid approach — PEC for screening, PAUT for verification on flagged indications only — is the cost-optimal strategy for any insulated pipeline over roughly 1 mile in length.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/pec',
      label: 'Pulsed Eddy Current (PEC)',
      context: 'Non-intrusive screening for CUI through insulation and jacketing.',
    },
    {
      href: '/methods/paut',
      label: 'Phased Array UT',
      context: 'PAUT corrosion mapping verified PEC indications at 1 mm × 1 mm resolution.',
    },
    {
      href: '/methods/ut',
      label: 'Conventional UT',
      context: 'Baseline spot UT at insulation removal points before the PEC pass.',
    },
    {
      href: '/standards/api-570',
      label: 'API 570 Piping Inspection',
      context: '10-year inspection interval for low-risk piping under API 570 §6.2.',
    },
    {
      href: '/standards/api-579',
      label: 'API 579 Fitness for Service',
      context: 'Triggered for any indication at or above the operator\'s 50% wall-loss action threshold.',
    },
    {
      href: '/industries/pipeline',
      label: 'Pipeline NDT',
      context: 'Inspection across gas transmission, midstream, and distribution networks.',
    },
    {
      href: '/glossary/cui',
      label: 'Corrosion Under Insulation',
      context: 'Dominant damage mechanism on insulated piping in the -12°C to 175°C band.',
    },
    {
      href: '/free-tools/cui-risk-assessment',
      label: 'CUI Risk Assessment Tool',
      context: 'Screen pipe segments by temperature, insulation type, age, and water-ingress history.',
    },
    {
      href: '/free-tools/remaining-life-calculator',
      label: 'Remaining Life Calculator',
      context: 'Project remaining wall life from CUI corrosion-rate measurements.',
    },
    {
      href: '/ndt-services/pittsburgh/pec',
      label: 'PEC services in Pittsburgh',
      context: 'Northeast pulsed eddy current vendors with insulated-pipe CUI experience.',
    },
  ],
  citations: [
    {
      id: 'api-rp-583',
      source: 'API RP 583, 2nd ed. (2022), Corrosion Under Insulation and Fireproofing',
    },
    {
      id: 'api-570',
      source: 'API 570, 5th ed. (2023), Piping Inspection Code',
    },
    {
      id: 'api-579-5',
      source: 'API 579-1/ASME FFS-1 (2021), Part 5 — Assessment of Local Thin Areas',
    },
    {
      id: 'asme-pcc-2-art-4',
      source: 'ASME PCC-2 (2022), Article 4.1 — Non-metallic Composite Repair Systems',
    },
    {
      id: 'nace-sp0198',
      source: 'NACE SP0198-2017, Control of Corrosion Under Thermal Insulation and Fireproofing',
    },
    {
      id: 'phmsa-192',
      source: '49 CFR Part 192, Transportation of Natural and Other Gas by Pipeline: Minimum Federal Safety Standards',
    },
  ],
};

export default study;
