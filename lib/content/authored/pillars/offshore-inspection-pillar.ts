import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'offshore-inspection-pillar',
  metaTitle: 'Offshore Inspection Hub: Subsea, Topsides, BSEE Compliance',
  metaDescription:
    'The full offshore inspection cluster — topsides production equipment, risers, subsea infrastructure, ROV inspection, BSEE 30 CFR 250, API 17 series.',
  heroLede:
    'Offshore inspection is the most logistically constrained and most safety-regulated NDT discipline in industry. Helicopter access, weather windows, and confined-space entry in marine atmospheres compress the inspection day to 6-8 productive hours; the regulatory regime under BSEE 30 CFR Part 250 and PHMSA 49 CFR Part 192 imposes documented compliance on every weld, flange, and corrosion measurement. This hub maps the full offshore inspection cluster: topsides production equipment inspection, riser and J-tube inspection, subsea infrastructure inspection by ROV, the BSEE-mandated periodic surveys, and the API 17-series standards for subsea systems.',
  topicOverview:
    'The offshore cluster covers four asset categories. (1) Topsides production — pressure vessels (separators, dehydration columns, scrubbers), process piping, structural steel, and fired equipment, inspected under API 510/570 and AWS D1.1 with offshore-specific damage mechanisms (chloride pitting, MIC in produced-water systems, CUI under salt-impregnated insulation). (2) Risers and J-tubes — flexible and rigid risers, pull-tubes, and the splash-zone interface where corrosion-fatigue dominates. (3) Subsea infrastructure — pipelines, manifolds, trees, jumpers, umbilicals, and the structural supports, inspected primarily by ROV with high-definition visual, cathodic protection potential surveys, and inspection-class ROV ultrasonic probes. (4) Structural — jackets, conductors, mooring lines, and the splash zone, inspected to API RP 2A-WSD/LRFD requirements and BSEE 30 CFR §250.901-§250.920. Sub-articles cover the inspection-class versus work-class ROV distinction, the API 17 series for subsea production systems, the BSEE periodic survey regime, and the FPSO/FLNG inspection layer that adds class-society (ABS, DNV, Lloyd\'s) inspection regimes on top.',
  subPages: [
    {
      href: '/industries/offshore',
      label: 'Offshore Industry Overview',
      description:
        'Industry sizing, GOM/North Sea/Brazil/West Africa operating regions, the BSEE/PHMSA/Class regulatory layering, and the inspection contractor ecosystem.',
    },
    {
      href: '/standards/bsee-30-cfr-250',
      label: 'BSEE 30 CFR 250 — Oil and Gas Operations',
      description:
        'The federal regulation for offshore oil and gas in US OCS waters. Subpart B production safety, Subpart H pipelines, Subpart I platforms, Subpart J structural.',
    },
    {
      href: '/standards/api-rp-2a-wsd',
      label: 'API RP 2A-WSD — Fixed Offshore Platforms',
      description:
        'The dominant design and inspection standard for fixed offshore platforms in the Gulf of Mexico. Section 17 in-service inspection requirements.',
    },
    {
      href: '/standards/api-17-series',
      label: 'API 17 Series — Subsea Production Systems',
      description:
        'The 17-series spec set (17A through 17V) for subsea production systems. 17B flexible pipe, 17D trees and wellheads, 17J/K unbonded/bonded flexible pipe.',
    },
    {
      href: '/methods/rov-visual-inspection',
      label: 'ROV Visual Inspection',
      description:
        'Inspection-class and work-class ROV deployment for subsea visual inspection — HD video, photogrammetry, and the GVI/CVI/DVI inspection-level hierarchy.',
    },
    {
      href: '/methods/automated-ultrasonic-testing',
      label: 'AUT for Offshore Pipeline Construction',
      description:
        'Encoded PAUT/TOFD for offshore lay-barge girth weld inspection — the schedule-driving inspection on a deep-water gas line at 1,000+ m depth.',
    },
    {
      href: '/methods/cathodic-protection-survey',
      label: 'Cathodic Protection Surveys (CP)',
      description:
        'CP potential measurements on platform legs, risers, and subsea structures — ROV-mounted Ag/AgCl reference cells, contact and proximity techniques.',
    },
    {
      href: '/methods/flooded-member-detection',
      label: 'Flooded Member Detection (FMD)',
      description:
        'Gamma-ray attenuation technique for detecting water flooding in jacket legs and braces — a sentinel indicator of structural cracking that conventional UT cannot reach.',
    },
    {
      href: '/learn/splash-zone-inspection',
      label: 'Splash Zone Inspection',
      description:
        'The wet-dry corrosion-fatigue zone between MWL and the tide range. The single highest-failure-rate location on a fixed platform — and the hardest to inspect.',
    },
    {
      href: '/learn/topsides-inspection-scope',
      label: 'Topsides Inspection Scope',
      description:
        'Production-deck pressure vessel and piping inspection — separators, scrubbers, glycol contactors, and the saltwater-corrosion-prone produced-water system.',
    },
    {
      href: '/learn/flexible-riser-inspection',
      label: 'Flexible Riser Inspection',
      description:
        'The unbonded flexible riser inspection regime per API 17B/17J — annulus testing, X-ray of the armor wires, and the vent gas analysis for water ingress.',
    },
    {
      href: '/industries/offshore-decommissioning',
      label: 'Offshore Decommissioning Inspection',
      description:
        'Plug and abandonment inspection — wellhead, conductor, and platform-leg integrity verification for the end-of-life removal sequence.',
    },
    {
      href: '/case-studies/aut-girth-weld-deep-water-lay-barge',
      label: 'Case Study: AUT on a Deep-Water Lay Barge',
      description:
        'A fully encoded AUT spread handled 14 girth welds per day on a 32-inch gas line at 1,400 m water depth — crew composition, rejection rate, schedule outcome.',
    },
    {
      href: '/case-studies/fmd-find-on-jacket-brace',
      label: 'Case Study: FMD Found Through-Wall Crack on a Jacket Brace',
      description:
        'A GOM platform 5-year API RP 2A inspection where FMD flagged a flooded brace that subsequent ROV CVI revealed as a 200 mm through-wall fatigue crack at a tubular K-joint.',
    },
  ],
  expertCommentary:
    'Offshore inspection economics live and die on weather windows. A planned 7-day platform inspection in the North Sea typically completes in 9-11 days because of weather standby, and the rate-card cost runs $35-60K per day for the inspection spread plus $80-200K per day for the support vessel. The dominant cost compression lever is not the inspection method — it is reducing setup and tear-down per task. A typical poorly planned campaign hits 30-40% productive time per day; a well-planned campaign hits 55-65%. The inspection contractor that wins repeat business builds the daily plan in hour-blocks, with each block having a primary task, a weather-fallback task, and a parallel task for the second crew. Second, ROV inspection is consistently underspec\'d at procurement time. The buyer specifies "CVI" (close visual inspection) on a 10-year subsea infrastructure inspection and gets 1080p video at 1.5 m standoff, which resolves coating breakdown but not millimetre-scale anomalies. The right spec for fatigue-critical subsea welds is high-definition photogrammetry at 0.3-0.5 m standoff with 4K imaging and overlapping coverage for 3D reconstruction. The cost difference between basic CVI and photogrammetry-class CVI is roughly 15-25% on the ROV day rate and 100-300% on the data-deliverable quality. Third, splash-zone inspection on fixed platforms is the location with the highest failure consequence and the lowest practical inspection coverage. Diver-deployed UT with caged scaffolding is the conventional approach; emerging techniques include scaffold-free UT crawlers on tubular legs and remote photogrammetry from a dedicated splash-zone tool. The inspection plan should explicitly call out the splash-zone coverage and the chosen technique — and the procedure should require coverage validation, not a single survey pass.',
  externalResources: [
    {
      label: 'BSEE — Offshore Inspection and Enforcement',
      url: 'https://www.bsee.gov/what-we-do/offshore-regulatory-programs',
    },
    {
      label: 'API — Offshore Standards',
      url: 'https://www.api.org/products-and-services/standards/whats-new/publication-updates/offshore',
    },
    {
      label: 'DNV — Offshore Standards Library',
      url: 'https://www.dnv.com/oilgas/download/dnv-standards/',
    },
    {
      label: 'IMCA — International Marine Contractors Association',
      url: 'https://www.imca-int.com/',
    },
    {
      label: 'ABS Rules for Building and Classing Offshore Installations',
      url: 'https://ww2.eagle.org/en/rules-and-resources.html',
    },
  ],
  faqs: [
    {
      q: 'What is the BSEE inspection requirement for fixed Gulf of Mexico platforms?',
      a: 'BSEE 30 CFR §250.901 incorporates API RP 2A-WSD by reference for fixed-platform structural inspection, requiring Level I (above-water visual) annually, Level II (above-water and splash-zone close visual) every 3-5 years, Level III (below-water CVI) every 5-10 years, and Level IV (NDT of fatigue-critical joints) when prior levels identify damage. The exposure category of the platform (low/medium/high consequence per API RP 2A §17) sets the actual intervals. BSEE inspection follows up with their own periodic audits and unannounced inspections under 30 CFR §250.108.',
    },
    {
      q: 'When is photogrammetry the right ROV inspection technique?',
      a: 'Photogrammetry is justified when (1) the subsequent inspection cycle needs to compare against the current condition with millimetre-scale resolution, (2) the asset has a known damage mechanism that produces millimetre-scale geometry change (corrosion pitting, gouge growth, crack tip advance), or (3) the structural integrity assessment requires 3D geometric input for finite element analysis. For coating-condition surveys, mooring-line general condition, or anode wastage screening, conventional 1080p HD video at 1.5 m standoff is sufficient and cheaper. Photogrammetry adds roughly 15-25% to the ROV day rate but produces a permanent 3D record that defeats the "we cannot find the previous inspection footage" problem.',
    },
    {
      q: 'How does AUT save schedule on offshore lay-barge welding?',
      a: 'On a typical 32-inch deep-water gas pipeline lay, the welding station produces 1 girth weld per 30-45 minutes. Manual UT or RT inspection on the firing line bottlenecks at 25-35 welds per shift and requires a hold between welding and inspection. Encoded AUT (PAUT + TOFD combination scanner) runs at 1 weld per 10-15 minutes for the inspection cycle and produces a permanent digital record. The crew composition for AUT is two technicians plus a Level III on call — versus three RT crews running back-to-back exposures with area control. The schedule saving on a 200-mile pipeline lay can be 10-15 days of vessel time, which at $300-500K per day is the economic case for AUT regardless of weld count.',
    },
    {
      q: 'What is flooded member detection and when is it required?',
      a: 'FMD uses gamma-ray attenuation through a tubular member to detect whether water has displaced air in the interior — the sentinel indicator that a through-wall crack has formed and seawater has flooded the member. API RP 2A §17 makes FMD optional but it is the de facto standard for high-consequence GOM platforms because conventional NDT cannot inspect the inside of a flooded brace and cannot detect a tight crack at a tubular K-joint until it has grown to substantial length. A typical platform FMD sweep covers 30-150 braces per day and costs $30-80K for the campaign, against the seven-figure consequence of a brace failure that propagates to a leg.',
    },
  ],
  internalLinks: [
    {
      href: '/learn/offshore-weather-window-planning',
      label: 'Offshore Weather Window Planning',
      context: 'Wave-height and wind limits for ROV and dive operations — the operational envelope that drives campaign duration.',
    },
    {
      href: '/learn/rov-classification-icoc-wcoc',
      label: 'ROV Classification (ICOC, WCOC)',
      context: 'Inspection-class versus work-class ROV capability bands, payload, and the inspection-task fit for each.',
    },
    {
      href: '/equipment/saab-seaeye-falcon-rov',
      label: 'Saab Seaeye Falcon ROV',
      context: 'The dominant inspection-class ROV in subsea inspection — payload, depth rating, and the typical sensor package.',
    },
    {
      href: '/standards/api-rp-2a-lrfd',
      label: 'API RP 2A-LRFD — Load and Resistance Factor Design',
      context: 'The LRFD design and inspection standard used in deepwater and high-consequence projects.',
    },
    {
      href: '/standards/dnv-os-c101',
      label: 'DNV-OS-C101 — Offshore Standard for Steel Structures',
      context: 'The DNV design and inspection standard widely adopted in North Sea and West Africa projects.',
    },
    {
      href: '/case-studies/subsea-pipeline-fmd-and-eca',
      label: 'Case Study: Subsea Pipeline FMD and ECA',
      context: 'A North Sea export line where FMD flagged a leak indication that engineering critical assessment showed was below the FFS rejection threshold.',
    },
    {
      href: '/tools/cp-potential-calculator',
      label: 'Cathodic Protection Potential Calculator',
      context: 'Convert ROV-measured CP potential to corrosion-state classification with reference cell correction.',
    },
    {
      href: '/careers/offshore-ndt-technician',
      label: 'Offshore NDT Technician Career',
      context: 'The offshore certification stack — BOSIET, MIST, plus the standard NDT certifications — and the rotation work pattern.',
    },
  ],
  citations: [
    {
      id: 'bsee-30-cfr-250',
      source: 'BSEE 30 CFR Part 250, Oil and Gas and Sulphur Operations in the Outer Continental Shelf',
    },
    {
      id: 'api-rp-2a-wsd',
      source: 'API RP 2A-WSD, 22nd ed., 2014, Planning, Designing, and Constructing Fixed Offshore Platforms — Working Stress Design',
    },
    {
      id: 'api-17a',
      source: 'API Spec 17A, 5th ed., 2017, Design and Operation of Subsea Production Systems — General Requirements and Recommendations',
    },
    {
      id: 'dnv-st-f101',
      source: 'DNV-ST-F101, 2021, Submarine Pipeline Systems',
    },
    {
      id: 'imca-r-006',
      source: 'IMCA R 006, 2019, Common ROV Service Schedule and Maintenance',
    },
  ],
};

export default pillar;
