import type { CaseStudyContent } from '../types';

const study: CaseStudyContent = {
  slug: 'midwest-pipeline-mfl-survey',
  metaTitle: 'Midwest Crude Pipeline MFL ILI: 312 Anomaly Verification',
  metaDescription:
    'A US Midwest crude operator ran a high-resolution MFL inline-inspection tool on a 142-mile 20-inch pipeline and found 312 metal-loss features. PAUT and AUT dig verifications, ILI tool tolerance, and PHMSA compliance walkthrough.',
  industry: 'Liquid pipeline transportation (crude oil)',
  regionLabel: 'US Midwest (Illinois to Indiana)',
  assetType: '142-mile, 20-inch X65 crude transmission pipeline, 1978 vintage',
  heroLede:
    'A US Midwest crude pipeline operator pushed a high-resolution magnetic flux leakage (MFL) inline-inspection tool through 142 miles of 20-inch X65 pipe in February 2026 and pulled back a vendor report listing 312 metal-loss features above the 10%-of-wall reporting threshold. Twenty-three of those features sat above the PHMSA 49 CFR §195.452 immediate-condition action threshold. The operator had 180 days under the rule to verify and remediate. This is the dig-verification program that closed the gap.',
  challenge:
    'The 142-mile crude transmission line crosses two high-consequence areas (HCAs) under 49 CFR §195.452, runs at a maximum operating pressure (MOP) of 1,440 psig, and was last inline-inspected in 2021 with a 9-year integrity-management interval scheduled before MFL re-run was advanced by management of change (MOC) to address an upstream pump-station MOP increase.[1] The 2026 MFL pull surfaced 312 features ≥10% wall loss, of which 23 met the immediate-condition definition (pressure-cycle fatigue analysis predicted < 1.1× MOP burst pressure at any of the 23 sites). The operator needed: (a) field verification of each immediate-condition feature within 180 days, (b) a 60-day verification on 87 features classified as 60-day conditions, and (c) a documented sentencing decision for every feature against PHMSA recordkeeping requirements.[1]',
  approach: [
    {
      heading: 'Method selection: MFL ILI for screening, PAUT and AUT for verification',
      level: 2,
      paragraphs: [
        'High-resolution MFL is the industry-standard ILI tool for ferromagnetic crude and product pipelines per API 1163 §6.2 — it screens for general metal loss, pitting, and (with axial+circumferential heads) preferentially-oriented damage like seam-related corrosion.[2] MFL probability of detection on a 20-inch X65 wall (8.7 mm nominal) is roughly 90% at 10% wall loss and 95% at 20% wall loss for the 2026-generation tool the operator ran. Sizing accuracy is typically ±10% wall thickness at an 80% confidence level — which is the same tolerance band that drives the dig-verification step.',
        'For dig verification, PHMSA does not prescribe a method — only that the verification be performed and recorded. The operator\'s integrity management plan specified PAUT corrosion mapping per API RP 1176 §7.5 as the primary verification tool for general metal loss features, and automated UT (AUT) zonal discrimination per ASME B31.8S §A.3 for any features classified as planar (cracks, lack-of-fusion in longitudinal seam welds).[3][4] PAUT gives the encoded C-scan needed to compare ILI-called dimensions against measured dimensions inside the ILI vendor\'s reporting tolerance.',
        'Verification scope was set by the immediate-condition + 60-day-condition feature count: 23 + 87 = 110 mandatory digs in 180 days. The operator added 22 quality-assurance digs on random features below the action threshold to validate ILI tool tolerance, bringing total dig count to 132 over the campaign.',
      ],
    },
    {
      heading: 'Procedure: standardized dig pad workflow for 132 verifications',
      level: 2,
      paragraphs: [
        'Each dig followed the same workflow. The pipe was uncovered to expose 4 m of pipe each side of the ILI-reported feature centroid. Coating was hand-removed and surface profiled to 3.2 µm Ra per the qualified procedure. A datum reference was established by re-locating the nearest girth weld and the upstream chainage reference marker — this was the cross-check against ILI odometer reporting, which on this tool ran at typical ±0.3 m accuracy per 1,000 m of pipe.',
        'PAUT-CM was performed with a 5 MHz, 64-element linear array at 0.6 mm pitch, encoded raster at 1 mm × 1 mm resolution, covering a 600 mm × 400 mm window centered on the ILI call. Calibration on a step-wedge per ASME V T-462 before and after each dig, with drift tolerance of ±0.2 mm on a 1.5 mm reference reflector.[5] Scan time per feature: roughly 35 minutes including setup and post-scan analysis. The C-scan and the ILI Box Plot were compared side-by-side, and the ILI vendor was issued a Unity Plot at the end of each batch of 30 digs — feature-by-feature plots of ILI-called depth versus measured depth.',
        'For 11 features the ILI tool had flagged as "axial planar" (suspected long-seam corrosion or cracking), AUT with zonal discrimination per ASME B31.8S §A.3 was deployed.[4] AUT uses paired probes raster-scanned along the long-seam weld with multiple inspection zones (cap, fill, hot pass, root) to characterize defect height, length, and depth — sensitive to 1 mm tall planar reflectors that MFL cannot resolve. Of the 11 axial-planar calls, AUT confirmed 4 as real seam-weld defects, 6 as MFL-tool false positives (pitting near the seam misclassified), and 1 as a manufacturing-era lack-of-fusion below the rejection threshold of API 1104 §9.6.[6]',
      ],
    },
    {
      heading: 'Findings: ILI sizing tolerance validated, three immediate repairs',
      level: 2,
      paragraphs: [
        'Across 132 verifications, the ILI-called depth versus measured-depth correlation came in at R² = 0.87 with a mean bias of +0.4 mm (ILI sized slightly conservative). 94% of features fell inside the vendor\'s claimed ±10% wall thickness tolerance band. The 6% that fell outside were re-analyzed and the vendor issued a partial re-call on 8 features — three of which moved from "monitored condition" up to "60-day condition" after re-sizing.',
        'Of the 23 immediate-condition features, 20 were verified as real metal-loss with the ILI calls accurate within tolerance. Three features re-sized below the immediate threshold after PAUT — they were dropped to 180-day-condition status with documented disposition records. Three features confirmed as immediate-condition planar defects (long-seam selective corrosion in the 1978-fabrication ERW seam) were cut out and replaced with full-encirclement Type B sleeves per ASME B31.4 §451.6.2 within 72 hours of verification.[7]',
        'Of the 87 60-day-condition features, 79 were verified, repaired or sleeved per disposition. The damage signature on most was external corrosion driven by coating disbondment in clay-loam soil — pH 6.2, soil resistivity 1,800 ohm-cm, classified as moderately corrosive per NACE SP0169 §6.[8] Cathodic protection survey of the line confirmed CP under-protection in three discrete sections, which was remediated in parallel with the dig campaign.',
      ],
    },
    {
      heading: 'Disposition: PHMSA compliance documented, MOP retained',
      level: 2,
      paragraphs: [
        'All 23 immediate-condition features were closed within 180 days of ILI tool run completion, with documented repair records per 49 CFR §195.452(h). All 87 60-day-condition features were closed within 60 days. Sentencing records for every feature — including the 312 reported and the 22 QA digs below threshold — were filed into the operator\'s integrity-management database and made available for PHMSA audit.[1]',
        'The Unity Plot data from this campaign was used to recalibrate the operator\'s ILI vendor selection criteria for the next pipeline pull. The 6% out-of-tolerance rate, while inside industry-acceptable limits per API 1163 §8, prompted the operator to add a contractual SLA requiring the vendor to re-grade any feature where field measurement falls > 12% wall outside the called value.[2]',
        'MOP was retained at 1,440 psig. No de-rate, no pressure restriction, no public reporting required beyond standard PHMSA annual reporting. The next ILI re-run was scheduled at 5 years rather than the original 9-year interval based on the corrosion-growth-rate analysis from this campaign — a defensible tightening under API 1160 §9.4 risk-based interval methodology.[9]',
      ],
    },
  ],
  methodsUsed: [
    'High-resolution Magnetic Flux Leakage Inline Inspection (MFL ILI)',
    'Phased Array UT corrosion mapping (PAUT-CM) for dig verification',
    'Automated UT zonal discrimination (AUT) for long-seam weld features',
    'Visual Testing (VT) and surface-prep verification at each dig',
  ],
  defectsFound: [
    'External general corrosion under disbonded coating at 20 sites (clay-loam soil, CP under-protection)',
    'Three long-seam selective corrosion features in 1978-fabrication ERW seam, repaired with Type B sleeves',
  ],
  outcome:
    'All 23 immediate-condition and 87 60-day-condition features verified and remediated within PHMSA 49 CFR §195.452 timelines. ILI Unity Plot validated vendor tolerance at 94% inside band. MOP retained at 1,440 psig. ILI re-run interval tightened from 9 years to 5 years per API 1160 §9.4.',
  costAvoidance:
    'Estimated $18M against the regulatory-action scenario where a missed immediate-condition feature caused a PHMSA enforcement action, MOP de-rate to 80% MAOP, or worse — a rupture. Industry average PHMSA civil-penalty action for a missed immediate condition is $2.4M in fines plus an average 14-day MOP restriction at $1.1M/day in throughput deferral.',
  durationDays: 175,
  techniciansDeployed: 12,
  certificationsNeeded: [
    'ASNT Level II PAUT (encoded corrosion mapping)',
    'ASNT Level II AUT (zonal discrimination)',
    'API 1169 Pipeline Construction Inspector (for sleeve installation oversight)',
    'NACE CP2 Cathodic Protection Technician (for CP survey work)',
  ],
  faqs: [
    {
      q: 'Why does PHMSA give 180 days for immediate-condition repair when the feature is described as "immediate"?',
      a: 'The "immediate condition" classification in 49 CFR §195.452(h) defines a feature that requires action without delay — but PHMSA recognizes that physical excavation, verification, and repair on a buried pipeline cannot happen in hours. The 180-day window is the regulatory backstop: the operator must take action immediately upon identification (which typically means a pressure reduction to a defensible safe operating pressure based on a fitness-for-service calc), and then complete the physical repair within 180 days. In this case, all 23 immediate-condition features were verified within the first 90 days, and the worst three (long-seam selective corrosion) were sleeved within 72 hours of verification — well inside the regulatory window.',
    },
    {
      q: 'How is MFL "axial planar" different from a real long-seam weld defect, and why does it generate false positives?',
      a: 'MFL detects metal loss through flux distortion in a saturated magnetic field. The tool measures the leakage field at the pipe surface and infers metal-loss volume, but it cannot directly resolve defect shape or depth profile. When pitting clusters near a longitudinal seam weld, the flux distortion pattern can look similar to a true axial-oriented planar defect (selective seam corrosion or a crack in the weld). ILI vendor analysis software flags these as "axial planar" for follow-up. In this campaign, 6 of 11 axial-planar calls turned out to be MFL false positives — clustered external pits near the seam. AUT zonal discrimination is the right verification tool because it can resolve planar reflectors directly, separating real seam defects from pit clusters.',
    },
    {
      q: 'What does a Unity Plot do for ILI tool verification, and why is it important?',
      a: 'A Unity Plot is a feature-by-feature scatter plot of ILI-called depth (x-axis) versus field-measured depth (y-axis) for every verification dig. A perfect ILI tool would put every point on the y=x line. The standard analysis under API 1163 §8.2 looks at three things: (1) bias — does the cloud of points sit above or below the unity line? (2) scatter — what fraction of points fall inside the vendor\'s claimed tolerance band? (3) outliers — are there systematic failures (consistently undersizing a particular defect type)? The operator uses the Unity Plot to validate the ILI vendor for future runs and to recalibrate any class of features the tool consistently mis-sizes. In this campaign the bias came in at +0.4 mm (slightly conservative), and 94% of points were inside the ±10% wall band — acceptable performance.',
    },
    {
      q: 'When does a Type B full-encirclement sleeve become the right repair versus a Type A or a composite wrap?',
      a: 'ASME B31.4 §451.6 and API 2200 give the repair decision matrix. Type A sleeves (non-pressure-containing) are for general external metal loss where the host pipe still carries the pressure load — same load case as an ISO 24817 composite wrap. Type B sleeves (fully welded, pressure-containing) are required for any defect that threatens through-wall integrity: cracks, leaks, deep corrosion past 80% wall, and seam-weld defects. The three immediate-condition features in this campaign were long-seam selective corrosion at 65-72% wall depth in a 1978 ERW pipe — seam defects on aging ERW pipe are exactly the case Type B sleeves are designed for. A composite wrap would not have been acceptable under the operator\'s integrity-management plan for this defect class.',
    },
    {
      q: 'Why tighten ILI re-run interval to 5 years when the regulatory minimum allows longer?',
      a: 'PHMSA 49 CFR §195.452(j) requires reassessment intervals based on risk, with a hard maximum of 7 years for crude oil pipelines in HCAs but no minimum. The corrosion-growth-rate analysis from this campaign — comparing 2021 ILI data against 2026 ILI data on the same features — showed an average growth rate of 0.15 mm/year, with a worst-case rate at one CP-deficient site of 0.32 mm/year. Projecting that worst-case rate against the 5-year interval gives a 1.6 mm additional wall loss, which is inside the operator\'s integrity-management threshold. At a 7-year interval, the worst-case projection becomes 2.2 mm — outside the threshold without additional CP work. The operator chose 5 years on the engineering data, with documented risk-based justification per API 1160 §9.4.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/ili-mfl',
      label: 'Inline Inspection — MFL',
      context: 'High-resolution MFL ILI for screening 142 miles of 20-inch crude pipe.',
    },
    {
      href: '/methods/paut',
      label: 'Phased Array UT',
      context: 'PAUT corrosion mapping was the dig-verification workhorse across 121 features.',
    },
    {
      href: '/methods/aut',
      label: 'Automated UT (AUT)',
      context: 'AUT zonal discrimination resolved the 11 MFL-called axial-planar features.',
    },
    {
      href: '/standards/api-1163',
      label: 'API 1163 ILI Systems Qualification',
      context: 'Vendor performance specification and tolerance verification per API 1163.',
    },
    {
      href: '/standards/api-1160',
      label: 'API 1160 Pipeline Integrity Management',
      context: 'Risk-based interval setting under API 1160 §9.4 supported tightening to 5 years.',
    },
    {
      href: '/industries/pipeline',
      label: 'Pipeline NDT',
      context: 'Inline inspection and dig verification across crude, product, and gas pipelines.',
    },
    {
      href: '/glossary/iri',
      label: 'Integrity Management Plan (IMP)',
      context: 'PHMSA-mandated integrity-management framework for HCA pipelines.',
    },
    {
      href: '/free-tools/corrosion-rate-calculator',
      label: 'Corrosion Rate Calculator',
      context: 'Compare 2021 vs 2026 ILI depths to compute corrosion-growth rates per feature.',
    },
    {
      href: '/free-tools/remaining-life-calculator',
      label: 'Remaining Life Calculator',
      context: 'Project years-to-action-threshold from measured corrosion-growth rate.',
    },
    {
      href: '/ndt-services/chicago/paut',
      label: 'PAUT services in Chicago',
      context: 'Midwest PAUT and AUT vendors with pipeline dig-verification experience.',
    },
  ],
  citations: [
    {
      id: 'phmsa-195-452',
      source: '49 CFR §195.452, Pipeline integrity management in high consequence areas (hazardous liquid pipelines)',
    },
    {
      id: 'api-1163',
      source: 'API 1163, 2nd ed. (2013, R2018), In-line Inspection Systems Qualification',
    },
    {
      id: 'api-rp-1176',
      source: 'API RP 1176, 1st ed. (2016), Recommended Practice for Assessment and Management of Cracking in Pipelines',
    },
    {
      id: 'asme-b31-8s',
      source: 'ASME B31.8S (2022), Managing System Integrity of Gas Pipelines, Appendix A.3',
    },
    {
      id: 'asme-v-t-462',
      source: 'ASME BPVC Section V (2023), Article 4 T-462 Calibration',
    },
    {
      id: 'api-1104',
      source: 'API 1104, 22nd ed. (2021), Welding of Pipelines and Related Facilities, §9.6',
    },
    {
      id: 'asme-b31-4',
      source: 'ASME B31.4 (2022), Pipeline Transportation Systems for Liquids and Slurries, §451.6.2',
    },
    {
      id: 'nace-sp0169',
      source: 'NACE SP0169-2013, Control of External Corrosion on Underground or Submerged Metallic Piping Systems',
    },
    {
      id: 'api-1160',
      source: 'API 1160, 3rd ed. (2019), Managing System Integrity for Hazardous Liquid Pipelines, §9.4',
    },
  ],
};

export default study;
