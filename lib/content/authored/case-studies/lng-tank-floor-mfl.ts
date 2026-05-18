import type { CaseStudyContent } from '../types';

const study: CaseStudyContent = {
  slug: 'lng-tank-floor-mfl',
  metaTitle: 'LNG Storage Tank Floor MFL: Annular Plate Pitting Case',
  metaDescription:
    'A US Gulf LNG export terminal ran robotic MFL on a 240-ft full-containment LNG tank inner floor, found 18 pits ≥ 30% wall on the annular ring, and finalized a phased repair scope under API 653.',
  industry: 'LNG storage and export',
  regionLabel: 'US Gulf Coast (Louisiana)',
  assetType: 'Full-containment LNG storage tank, 240 ft diameter, 9% Ni inner shell with carbon steel annular plate',
  heroLede:
    'A US Gulf LNG export terminal pulled its 240-ft full-containment LNG storage tank out of service for a 10-year API 653 internal inspection. Robotic MFL on the 12,200 m² inner floor returned 4,180 MFL indications above the 20% wall-loss reporting threshold. Most were soil-side pitting on the inside of the annular plate ring — a region where chloride-bearing condensate accumulates and accelerated localized corrosion is the dominant damage mechanism. This is the survey scope, the dig-verification logic, and the repair scope that closed the inspection.',
  challenge:
    'A 240-ft full-containment LNG tank with a 9% Ni inner shell and 6 mm carbon steel annular plate ring (the perimeter plate at the shell-to-floor connection) was opened for its 10-year out-of-service API 653 internal inspection.[1] The tank had been in service for 22 years with one prior internal inspection at year 10. The inspection plan required: (a) 100% MFL of the inner floor and annular plate, (b) UT thickness verification of every MFL indication ≥ 30% wall loss, (c) VT and MT of the shell-to-bottom inside fillet weld, and (d) bottom-plate-to-grade VT of the outer surface where access via crawl-space hatches was possible. The campaign ran on a 45-day shutdown window — every day of overrun cost the terminal $720,000 in deferred LNG export ship loadings against contracted offtake commitments.',
  approach: [
    {
      heading: 'Method selection: robotic MFL for floor screening, PAUT and UT for verification',
      level: 2,
      paragraphs: [
        'API 653 §4.4 and API RP 575 §10.5 specify MFL as the standard screening method for atmospheric storage tank floors.[1][2] MFL on a 6 mm carbon steel floor plate gives roughly 90% POD on a 20% wall loss feature with the modern generation of robotic crawler tools (Silverwing RMS-PA, Aqualis FloorMap, Eddyfi VersaScan). The operator selected a Silverwing RMS-PA running 250 mm × 250 mm magnet head coverage and integrated UT confirmation, with onboard data logging tied to a tank-floor grid coordinate system.',
        'The floor coverage plan gridded the 12,200 m² floor into 245 lanes of 250 mm width. Robotic MFL throughput at the tool\'s rated 0.4 m/sec scan speed gave full-coverage time of 102 hours wall-clock, distributed across three 18-hour shifts. The annular plate ring — the 600 mm perimeter band at the shell-to-floor weld — required manual MFL with a hand-pushed scanner because the robotic tool could not maneuver into the corner geometry. Manual MFL on the annular ring added 16 hours.',
        'Verification of MFL indications ≥ 30% wall loss used PAUT corrosion mapping per ASME V Article 4 Mandatory Appendix IV on a 200 mm × 200 mm window centered on each MFL call.[3] The PAUT scan resolved actual pit depth and shape, plus identified whether the pit was soil-side (under-floor, the typical case for tank-floor pitting driven by chloride-bearing groundwater) or product-side (top-of-floor, much rarer on a clean LNG service). For the 9% Ni inner shell, separate UT thickness scans were run on the lower three courses by climbing scaffold — 9% Ni cannot use MT due to the alloy\'s low magnetic permeability, so MT was substituted with PT on critical welds per ASME V Article 6.[4]',
      ],
    },
    {
      heading: 'Procedure: robotic floor scan, manual annular ring, shell course UT',
      level: 2,
      paragraphs: [
        'The robotic crawler was deployed through the central manway after the tank was confirmed gas-free (LEL < 10%, O2 > 19.5%, target gases for LNG service < 1 ppm). Surface prep was minimal — the floor was washed with clean water and dried, with any loose debris removed by hand. MFL is tolerant of light surface contamination but heavy mill scale or paint > 2 mm causes signal attenuation. The 22-year-old floor had no remaining paint and a thin uniform mill-scale layer, well inside the MFL tolerance band.',
        'Each lane was scanned with the crawler running parallel to the previous lane at a 50 mm overlap. The MFL signal was streamed to the analysis station in real-time, with auto-flagging at the 20% wall-loss threshold. A Level III MFL analyst reviewed every flagged indication during acquisition, with hold points to spot-check the crawler navigation accuracy by re-locating fixed reference points (column footings, sump grates, manway).',
        'PAUT verification was performed on every MFL indication ≥ 30% wall loss — 312 of the 4,180 total MFL indications. PAUT scan time per indication averaged 18 minutes including setup. The PAUT C-scan was compared against the MFL indication shape and depth call, with a Unity Plot generated at the end of the campaign covering all 312 verified indications. Of the 312 PAUT-verified indications, 280 confirmed within MFL tolerance, 26 were over-called by MFL by > 10% wall, and 6 were under-called by > 10% wall — the under-calls were the priority for repair sentencing.',
      ],
    },
    {
      heading: 'Findings: 18 annular-plate pits drive the repair scope',
      level: 2,
      paragraphs: [
        'The deepest indication on the entire floor was an under-floor pit on the annular plate ring with a measured depth of 4.1 mm against a 6.0 mm nominal — 68% wall loss. 18 indications on the annular plate ring measured ≥ 30% wall loss; none of the floor-plate-proper indications (away from the perimeter) exceeded 30%. The damage signature on the annular ring was characteristic of chloride-driven soil-side pitting per API RP 651 §A.2 — discrete deep pits with no surrounding general thinning, concentrated in the 100 mm band closest to the shell-to-floor weld.[5]',
        'Two factors drove the annular-ring pattern: (1) chloride condensate accumulation in the slight depression where the annular ring overlaps the sand-pad foundation, exacerbated by the absence of an under-tank cathodic protection grid (the tank predated mandatory CP for LNG-service tanks under the operator\'s current asset standards); (2) micro-galvanic corrosion at the 9% Ni shell to carbon-steel annular plate weld, with the dissimilar-metal couple driving local accelerated corrosion on the carbon-steel side.',
        'The shell-to-floor inside fillet weld inspected clean — no surface cracking by PT, no UT-detected sub-surface defects. The 9% Ni lower shell courses inspected at 91-94% remaining wall against nominal — no significant corrosion of the cryogenic shell material. The campaign closed the floor inspection with 18 sentenced repair locations and a confirmed-clean shell.',
      ],
    },
    {
      heading: 'Disposition: localized inserts, CP retrofit, scope expanded for next interval',
      level: 2,
      paragraphs: [
        'Repair scope under API 653 §9.10 specified excavating each of the 18 pits and installing flush-patch inserts per API 653 §9.10.1.4.[1] Each insert was sized as a minimum 300 mm × 300 mm square plate with full-penetration welds inspected by RT and PT. Eight of the 18 pits were close enough to each other to consolidate into three larger insert plates, reducing total weld length and weld-related thermal stress on the annular ring. Welding used SMAW with E7018-equivalent electrodes, preheat 50°C, with the welds qualified per ASME IX and the post-weld inspection per API 653 §11.[1]',
        'The asset team specified a retrofit cathodic protection system under the tank — an under-floor impressed-current grid sized per NACE SP0193 for a 240-ft tank on sand-pad foundation.[6] Installation required removing a 1.5 m perimeter band of foundation soil and trenching for the CP anode strings. CP retrofit added 11 days to the outage but saved an estimated 40-50% reduction in annular-plate corrosion rate over the next 10-year interval based on industry CP-effectiveness data.',
        'The next-interval inspection plan tightened MFL coverage on the annular plate ring to 5-year semi-annual intervals using external rope-access UT through dedicated annular-ring inspection ports (cut into the tank during this outage), with the next full out-of-service inspection scheduled for 10 years out. Total inspection-and-repair cost: $3.8M. Avoided cost: a missed soil-side pit propagating through the annular plate to floor-failure releases LNG into the secondary containment annulus, with associated lost-product, terminal-shutdown, and regulatory-action costs that historically run $40-80M per incident in industry data.',
      ],
    },
  ],
  methodsUsed: [
    'Robotic Magnetic Flux Leakage (MFL) full-floor coverage',
    'Phased Array UT corrosion mapping (PAUT-CM) for MFL indication verification',
    'Manual MFL on annular plate ring perimeter (robotic-tool unreachable)',
    'Penetrant Testing (PT) on shell-to-floor weld and 9% Ni lower-course welds',
  ],
  defectsFound: [
    'Soil-side chloride-driven pitting on annular plate ring — 18 indications ≥ 30% wall loss, deepest at 68%',
    'No significant defects on floor plate proper, shell-to-floor weld, or 9% Ni lower shell courses',
  ],
  outcome:
    '18 flush-patch inserts installed and inspected per API 653 §9.10. Under-tank impressed-current cathodic protection retrofit installed per NACE SP0193. Annular-ring inspection ports cut for between-interval external UT. Next out-of-service inspection at 10-year interval, with semi-annual external annular-ring monitoring.',
  costAvoidance:
    '$40-80M against the worst-case annular-plate floor-failure scenario per industry incident data. Direct schedule cost avoidance: completed in 41 days against the 45-day budget, retaining 4 days of $720K/day buffer for export ship slot recovery = $2.88M.',
  durationDays: 41,
  techniciansDeployed: 8,
  certificationsNeeded: [
    'ASNT Level III MFL (procedure and data interpretation)',
    'ASNT Level II PAUT (corrosion mapping)',
    'API 653 Authorized Storage Tank Inspector',
    'ASNT Level II PT (penetrant on 9% Ni welds)',
    'NACE CP2 Cathodic Protection Technician (for CP retrofit oversight)',
  ],
  faqs: [
    {
      q: 'Why is the annular plate ring the highest-risk region of a tank floor inspection?',
      a: 'The annular plate ring is the 600-1,000 mm perimeter band of carbon steel that sits between the shell and the floor plate proper. It carries the shell load to the foundation and contains the highest stress on the floor, including the weld stress from the shell-to-floor inside fillet weld. Soil-side corrosion concentrates on the annular ring for three reasons: (1) the sand-pad foundation often has a slight depression at the ring overlap where chloride-bearing condensate accumulates; (2) the dissimilar-metal couple between the shell material (often 9% Ni for LNG service, or carbon steel for hydrocarbon service) and the annular plate drives micro-galvanic corrosion; (3) the elevated stress state combined with chloride exposure can drive both general corrosion and stress-corrosion cracking in susceptible materials. API 653 specifically calls for tightened inspection of the annular ring and recommends dedicated CP coverage.',
    },
    {
      q: 'When is robotic MFL the right call versus manual MFL on a storage tank floor?',
      a: 'Robotic MFL crawlers are the right choice on any floor over roughly 30 m diameter where the area-coverage time savings outweigh the rental and setup cost of the robotic system. A 240-ft (73 m) tank covered manually would take roughly 280 hours of single-operator pushing time at a sustainable scan rate — versus 102 hours of robotic scan time plus 16 hours of manual coverage on the annular ring where the robot cannot reach. Robotic systems also generate higher-quality data logs with automatic indication coordinates, which simplifies dig-verification planning and downstream reporting. Manual MFL stays the right call on small tanks (< 20 m diameter), in regions inaccessible to the robotic tool (around columns, sumps, edge geometry), and on irregular floor patterns where the robotic tool\'s navigation reliability is compromised.',
    },
    {
      q: 'Why use PT instead of MT on 9% Ni cryogenic shell welds?',
      a: '9% Ni steel is a low-carbon austenitic-ferritic alloy specifically engineered for cryogenic service down to -196°C (the boiling point of liquid nitrogen, with LNG service running at roughly -162°C). The alloy retains good fracture toughness at cryogenic temperatures because of its low-carbon, high-nickel composition — but the same composition gives 9% Ni a low magnetic permeability that makes magnetic particle testing unreliable. ASME V Article 6 (penetrant testing) is the alternative surface-NDT method for 9% Ni welds, with fluorescent PT giving the best sensitivity. The operator\'s welding procedure qualification for 9% Ni shell courses specified PT as the surface-NDT acceptance method, and the field inspection followed that procedure.',
    },
    {
      q: 'How does a retrofit impressed-current CP system change the next-interval inspection scope?',
      a: 'A properly designed and installed impressed-current CP system on a tank-floor sand-pad foundation typically reduces soil-side corrosion rates by 60-80% relative to an uncprotected baseline, per NACE SP0193 effectiveness data. That reduction extends the time-to-action-threshold for the annular ring and floor plate proper, which can justify a longer between-inspection interval — but API 653 §6.3.2 caps the maximum interval at 20 years for tanks with CP and online monitoring, and 10 years for tanks without continuous floor-condition monitoring. The operator stayed at the 10-year out-of-service interval but added semi-annual external annular-ring inspection ports — a defense-in-depth strategy that monitors the highest-risk region without requiring a full tank shutdown.',
    },
    {
      q: 'What does a flush-patch insert weld look like under API 653 acceptance criteria?',
      a: 'A flush-patch insert under API 653 §9.10.1 is a replacement plate welded into an excavated cutout in the floor plate, with the insert top surface flush with the existing floor (no overlay). Minimum insert size is 300 mm × 300 mm to keep the perimeter weld length manageable and to allow proper PT/RT access. The perimeter weld is a full-penetration butt weld with a backing strip or backing bar removed after welding. Acceptance NDT per API 653 §11 requires 100% PT on the root pass, 100% RT on the completed weld, and full visual inspection of the insert-to-existing-floor seam. Weld procedure must be qualified per ASME IX with the actual floor material and the insert material. After acceptance, the repaired area is recorded into the tank-history file and becomes a higher-priority CML for the next inspection.',
    },
  ],
  internalLinks: [
    {
      href: '/methods/mfl',
      label: 'Magnetic Flux Leakage Inspection',
      context: 'Robotic MFL is the standard screening method for atmospheric storage tank floors.',
    },
    {
      href: '/methods/paut',
      label: 'Phased Array UT',
      context: 'PAUT corrosion mapping verified every MFL indication ≥ 30% wall loss.',
    },
    {
      href: '/methods/pt',
      label: 'Penetrant Testing',
      context: 'PT is the surface-NDT method for 9% Ni shell welds (low magnetic permeability rules out MT).',
    },
    {
      href: '/standards/api-653',
      label: 'API 653 Tank Inspection',
      context: 'Out-of-service internal inspection follows API 653 §4.4 and repair §9.10.',
    },
    {
      href: '/industries/oil-gas',
      label: 'NDT for Oil & Gas',
      context: 'Tank-floor inspection across LNG, crude, and refined product storage.',
    },
    {
      href: '/glossary/cui',
      label: 'Soil-Side Corrosion',
      context: 'Chloride-driven pitting on the underside of tank floor plates.',
    },
    {
      href: '/free-tools/remaining-life-calculator',
      label: 'Remaining Life Calculator',
      context: 'Project tank-floor remaining life from MFL-derived corrosion rates.',
    },
    {
      href: '/free-tools/corrosion-rate-calculator',
      label: 'Corrosion Rate Calculator',
      context: 'Compare current-interval depths against 10-year-old baselines for rate.',
    },
    {
      href: '/ndt-services/houston/mfl',
      label: 'MFL services in Houston',
      context: 'Gulf Coast robotic-MFL vendors with LNG and crude-tank inspection experience.',
    },
    {
      href: '/standards/asme-section-v',
      label: 'ASME Section V',
      context: 'Article 4 Appendix IV (PAUT) and Article 6 (PT) procedure baselines.',
    },
  ],
  citations: [
    {
      id: 'api-653',
      source: 'API 653, 6th ed. (2024), Tank Inspection, Repair, Alteration, and Reconstruction',
    },
    {
      id: 'api-rp-575',
      source: 'API RP 575, 4th ed. (2020), Inspection Practices for Atmospheric and Low-Pressure Storage Tanks',
    },
    {
      id: 'asme-v-app-iv',
      source: 'ASME BPVC Section V (2023), Article 4 Mandatory Appendix IV — Phased Array UT',
    },
    {
      id: 'asme-v-art-6',
      source: 'ASME BPVC Section V (2023), Article 6 — Liquid Penetrant Examination',
    },
    {
      id: 'api-rp-651',
      source: 'API RP 651, 4th ed. (2014), Cathodic Protection of Aboveground Petroleum Storage Tanks',
    },
    {
      id: 'nace-sp0193',
      source: 'NACE SP0193-2016, External Cathodic Protection of On-Grade Carbon Steel Storage Tank Bottoms',
    },
    {
      id: 'asme-ix',
      source: 'ASME BPVC Section IX (2023), Welding, Brazing, and Fusing Qualifications',
    },
  ],
};

export default study;
