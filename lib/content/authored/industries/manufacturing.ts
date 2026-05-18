import type { IndustryContent } from '../types';

const industry: IndustryContent = {
  slug: 'manufacturing',
  name: 'Manufacturing',
  metaTitle: 'Manufacturing NDT: Welding QC, Castings, Forgings, AM',
  metaDescription:
    'NDT for general manufacturing — weld QC under AWS D1.1 and ASME IX, casting inspection per ASTM E155, forging UT per AMS 2154, and additive manufacturing CT.',
  heroLede:
    "On a heavy-equipment frame line at a Caterpillar plant in East Peoria, every D11 dozer track frame goes through MT on the cast-and-machined trunnion area before subassembly. AWS D1.1 §6 governs the weld quality bar on the structural fabrication; ASME IX governs the welder qualifications; the OEM's internal NDT procedure layers on top. Get the inspection scope wrong and you ship frames with toe-of-weld cracks that fail at 800 hours instead of 12,000.[1][2] U.S. Census Bureau data tracks roughly $2.5 trillion in manufacturing shipments annually, and a meaningful slice of that flows through fabricated weldments, castings, and forgings that require code-based NDT.[3]\n\nThis guide is for the QA engineer specifying inspection on a fabricated product, the Level II technician running MT or UT on a welding line, and the supply chain lead vetting a Tier 2 or Tier 3 vendor against AWS, ASME, and ASTM expectations.",
  marketContext:
    "Manufacturing NDT covers a broad span — structural steel fabrication under AWS D1.1, pressure equipment under ASME VIII Div 1/2, heavy machinery castings and forgings under ASTM specifications, and high-mix low-volume precision work for medical, defense, and aerospace tier suppliers. The applicable standards stack varies by end-market: AWS D1.1 dominates structural and yellow-iron OEM work; AWS D1.5 covers bridges; AWS D1.6 covers stainless; ASME IX governs welder qualification across most pressure-equipment work; ISO 9001:2015 and ISO 9606-1 cover much of the European and global automotive supply chain. Forgings move under AMS 2154 (aerospace) or ASTM A388 (general industrial); castings under ASTM E155 (aluminum), E446/E186/E280 (steel film standards), or E2422 (digital reference images).[4] The market is fragmented — thousands of regional shops compete on local price and quality, while larger Tier 1 suppliers consolidate around ISO 9001 plus customer-specific NDT requirements. Additive manufacturing inspection is the fastest-growing segment, pulling industrial CT into shops that previously only ran MT/PT/RT.",
  commonAssets: [
    'Structural weldments — heavy equipment frames, crane booms, off-highway truck beds, pressure vessel components',
    'Steel and iron castings — engine blocks, gear cases, valve bodies, pump housings (ASTM A216, A352, A395)',
    'Forgings — crankshafts, connecting rods, gears, large-bore pump shafts, custom alloy steel forgings (ASTM A668)',
    'Pipe and tubing — ERW, seamless, longitudinally welded for industrial fluid systems',
    'Additively manufactured parts — LPBF stainless, Inconel, and Ti-6Al-4V components for tooling, aerospace, and medical',
    'Composite tooling, bonded structures, and bonded honeycomb assemblies for tooling and aerospace tier work',
  ],
  dominantDefectMechanisms: [
    {
      mechanism: 'Weld Discontinuities — Lack of Fusion, Lack of Penetration, Porosity, Slag',
      explanation:
        "AWS D1.1 Table 6.1 defines acceptance criteria for cyclically loaded versus statically loaded weldments. Lack of fusion at the root or sidewall is the highest-consequence weld discontinuity because it acts as a planar stress riser. Detection methods are RT (still the default for code-credited acceptance), PAUT (replacing RT in higher-volume shops), MT for surface and near-surface, and PT for non-ferrous. AWS D1.1 Clause 8 covers UT acceptance criteria for statically loaded structures, and the cyclic-load criteria in Table 6.2 are tighter.[1]",
    },
    {
      mechanism: 'Casting Shrinkage, Hot Tears, and Gas Porosity',
      explanation:
        "Steel and aluminum sand castings develop shrinkage cavities at thermal hot spots, hot tears at hot-spot intersections during solidification cooling, and gas porosity from inadequate venting. ASTM E155 (aluminum), E446 (≤2 in. steel), E186 (2-4.5 in. steel), and E280 (4.5-12 in. steel) provide film reference radiographs for severity classification. ASTM E2422 provides digital reference images for digital radiography acceptance. Industrial CT increasingly replaces film for high-value castings.[4]",
    },
    {
      mechanism: 'Forging Laps, Bursts, and Inclusions',
      explanation:
        "Open-die and closed-die forgings can develop laps at flow-line discontinuities, internal bursts in upset operations, and stringer inclusions from primary melt practice. AMS 2154 (aerospace forgings) and ASTM A388 (industrial) provide UT acceptance methodologies including straight-beam, angle-beam, and contact/immersion options. Surface defects are caught by MT on ferromagnetic forgings and PT on non-ferromagnetic; volumetric defects require UT, with frequencies typically 2.25-5 MHz on heavy forgings.",
    },
    {
      mechanism: 'Lack of Fusion and Porosity in Additively Manufactured Components',
      explanation:
        "LPBF parts develop layer-to-layer lack of fusion if the melt pool is undersized, gas porosity from incomplete shielding or trapped argon, and keyhole porosity from excessive laser power. CT per ASTM E1570 is the dominant volumetric NDT method because the defects are internal and three-dimensional. First-article qualification typically includes full CT scan plus destructive metallography; serial production may shift to statistical CT sampling plus in-process melt-pool monitoring.[5]",
    },
    {
      mechanism: 'Heat-Affected Zone Cracking in High-Strength Steel Welds',
      explanation:
        "High-strength low-alloy steel weldments (A514, T-1, ASTM A572 Gr 65, structural plate above ~70 ksi yield) develop hydrogen-induced cracking in the heat-affected zone if preheat is inadequate or if welding hydrogen is uncontrolled. AWS D1.1 §4 mandates preheat and interpass temperature controls; QC catches missed preheats via MT inspection of the HAZ after sufficient hydrogen diffusion time (typically 48 hours after welding for thick sections). Delayed cracking is the technician's nightmare — the weld passes inspection at 4 hours and cracks at 24.",
    },
  ],
  methodsUsed: [
    {
      method: 'Magnetic Particle Testing (MT) — wet visible and wet fluorescent',
      reason:
        "Workhorse for surface and near-surface crack detection on ferromagnetic weldments, castings, and forgings. AWS D1.1 §6.10 and ASME V Article 7 govern technique. Field-portable yokes plus benchtop wet fluorescent units cover the workflow.",
    },
    {
      method: 'Liquid Penetrant Testing (PT)',
      reason:
        "Surface crack and porosity detection on non-ferromagnetic materials — aluminum, stainless, copper alloys, titanium. ASME V Article 6 and ASTM E165 govern technique. Used on stainless weldments per AWS D1.6 and on aluminum castings per ASTM E1417.",
    },
    {
      method: 'Radiographic Testing (RT) — film, CR, DR',
      reason:
        "Code-default volumetric NDT for pressure-retaining welds and high-consequence structural welds under ASME IX, ASME VIII, and AWS D1.1. Film per ASTM E94, CR per ASTM E2033, DR per ASTM E2698. Acceptance per the construction code.",
    },
    {
      method: 'Ultrasonic Testing (UT) — straight beam and shear wave',
      reason:
        "Volumetric inspection of forgings (AMS 2154, ASTM A388), wall thickness on pipe and pressure equipment, weld inspection under AWS D1.1 Clause 8. PAUT extends UT coverage to more complex geometries and provides permanent records.",
    },
    {
      method: 'Visual Testing (VT) — direct, remote, and weld inspection',
      reason:
        "First-line acceptance for every weld. AWS QC1 / CWI (Certified Welding Inspector) governs the personnel certification, AWS D1.1 §6 the acceptance criteria. Borescope and remote visual cover internal surfaces of vessels, piping, and castings.",
    },
    {
      method: 'Industrial CT for AM and Complex Castings',
      reason:
        "Acceptance NDT for additive manufacturing and complex sand castings with intricate internal geometry. ASTM E1570 and E2737 govern technique. Detects volumetric porosity, lack of fusion, and inclusions that defeat 2D radiography.",
    },
  ],
  regulatoryFramework: [
    {
      id: 'aws-d1-1',
      source: 'AWS D1.1/D1.1M:2020, Structural Welding Code — Steel',
    },
    {
      id: 'asme-ix',
      source: 'ASME BPVC Section IX: Welding, Brazing, and Fusing Qualifications, 2023 ed.',
    },
    {
      id: 'asme-viii',
      source: 'ASME BPVC Section VIII Division 1: Rules for Construction of Pressure Vessels, 2023 ed.',
    },
    {
      id: 'iso-9001',
      source: 'ISO 9001:2015, Quality management systems — Requirements',
    },
    {
      id: 'iso-3834',
      source: 'ISO 3834-2:2021, Quality requirements for fusion welding of metallic materials — Comprehensive quality requirements',
    },
    {
      id: 'osha-1910-252',
      source: '29 CFR 1910.252, Welding, cutting, and brazing — General requirements',
      url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.252',
    },
    {
      id: 'astm-e155',
      source: 'ASTM E155-20, Standard Reference Radiographs for Inspection of Aluminum and Magnesium Castings',
    },
  ],
  caseScenarios: [
    {
      title: 'Heavy-equipment OEM — track frame fatigue cracking after 4,000 hours',
      body: "A heavy-equipment OEM saw field returns on a large mining-class dozer track frame with fatigue cracks initiating at the toe of a fillet weld between the cast trunnion and the welded frame plate. Root cause analysis traced the cracks to a combination of weld undercut beyond AWS D1.1 §6.9 acceptance limits plus a missing post-weld grind specified in the QC procedure. The OEM revised the inspection protocol to include MT on every trunnion-to-plate weld after grind, added a visual gauge for the radius blend, and back-fitted MT to inspect 100% of suspect serialized frames in the field over an 18-month campaign. Out-of-warranty repair cost was $3.8 million; the engineering fix prevented an estimated $18 million in further field returns plus reputational damage on the flagship product line.",
    },
    {
      title: 'Pressure vessel fabricator — RT versus PAUT cost-benefit on heavy-wall ASME VIII work',
      body: "A Texas pressure vessel fabricator built a portfolio of ASME Section VIII Division 1 reactors at 75-125 mm wall thickness for petrochemical end-users. Traditional Ir-192 RT required 8-12 minute exposures per weld plus radiation exclusion zone management, creating a bottleneck on the production schedule. The shop qualified a PAUT procedure to ASME V Article 4 Mandatory Appendix VII covering the wall-thickness range with a TFM imaging mode. Production throughput on the heavy-wall welds increased 40%, RT film and processing costs dropped 65%, and the permanent digital record displaced the film file archive for new orders. The PAUT procedure qualification cost was $42,000; payback was achieved on the third heavy-wall vessel order.",
    },
    {
      title: 'Aerospace tier supplier — LPBF Inconel 718 bracket CT qualification',
      body: "A Tier 2 aerospace supplier producing LPBF Inconel 718 mounting brackets for an engine OEM needed first-article CT acceptance to release production. The CT system was qualified to ASTM E1570 with 30 µm voxel size on the 80 mm bracket envelope. First-article CT on the first 50 builds revealed inconsistent lack-of-fusion patterns correlated to build-plate position; corner positions showed elevated porosity rates compared to center positions. The supplier remapped the build plate to use only the validated build envelope, dropped build yield from 24 parts per plate to 18, but achieved 99.4% CT acceptance rate on the smaller validated plate layout. Serial production launched within the OEM-required quality envelope and the supplier transitioned to statistical CT sampling at 1-in-50 after 1,000 build hours of stable production.",
    },
  ],
  costDrivers: [
    'Welder and inspector certification — AWS CWI exam preparation and recurring 9-year renewal, plus ASME IX welder qualifications for each procedure',
    'Volume of code-credited NDT (typically 5-100% RT or UT on pressure-equipment welds; 100% MT/PT on cyclically loaded structural welds)',
    'Procedure qualification and PQR documentation — first-time procedure $5,000-15,000, with full PQR test plate destructive testing',
    'CT capital cost for AM acceptance ($1-3M depending on energy and resolution) — increasingly required for aerospace and medical tier work',
    'Customer-specific requirements layered on top of code — automotive PPAP, aerospace AS9100, medical ISO 13485 add audit and documentation burden',
    'Field versus shop work — field NDT carries higher labor cost per hour due to mobilization, rigging, and weather impact on RT and surface methods',
  ],
  vendorSelection:
    "For general manufacturing NDT, the table-stakes are ASNT SNT-TC-1A or CP-189 written practice, AWS CWI on staff for code-credited weld inspection, and ASME IX welder qualifications for any pressure-equipment work. For automotive Tier 1 work, ISO 9001:2015 and IATF 16949 certification are baseline. For aerospace tier work, AS9100D plus Nadcap accreditation in the specific NDT commodity is required (see aerospace industry guide). For medical device manufacturing, ISO 13485 plus FDA QSR compliance applies. Pre-qualify vendors by requesting procedure qualification records (PQR) for the specific code class and material family of your scope — generic procedures are a red flag. For new vendor selection, ask for a 30-day audit of recent inspection records on similar scopes; quality lives in the documentation discipline, not the equipment list. NDT Connect's marketplace flags AWS CWI staff counts, code-class qualifications, and customer-specific approvals on vendor profiles.",
  faqs: [
    {
      q: 'What does AWS D1.1 require for weld NDT on a structural weldment?',
      a: "AWS D1.1:2020 (Structural Welding Code — Steel) requires 100% visual inspection of all welds (Clause 6.9) by a qualified inspector — typically an AWS Certified Welding Inspector (CWI) under AWS QC1. Volumetric NDT (RT or UT) percentage is specified by the engineer in the contract documents — typical scopes are 25% RT on cyclically loaded structural welds, 10-25% on statically loaded primary members, and 100% on bridge welds under AWS D1.5. Surface NDT (MT for ferromagnetic, PT for non-ferromagnetic) is typically called out on specific weld categories — corner welds, partial penetration welds at fatigue-critical details, and post-grind verification on cosmetic surfaces.[1]",
    },
    {
      q: 'How does ASME Section IX welder qualification work?',
      a: "ASME Section IX governs welder, brazer, and welding-operator qualification for pressure equipment construction. A welder is qualified by welding a coupon under a Welding Procedure Specification (WPS) that has itself been qualified via a Procedure Qualification Record (PQR) showing successful destructive testing of a test plate. Variables (essential, non-essential, supplementary essential) are defined in QW-250 by process — changes to essential variables require re-qualification. Welder qualification is method-and-position specific; the qualification record (WPQ) shows what positions, processes, and materials the welder can run. Most pressure vessel fabricators maintain active WPQs on the order of 50-200 welders across SMAW, GTAW, GMAW, SAW, and FCAW.[2]",
    },
    {
      q: 'When should I require industrial CT instead of film/digital radiography?',
      a: "Specify CT when the part has complex 3D internal geometry that defeats 2D RT interpretation — additively manufactured parts with internal lattices, complex investment castings with internal cooling passages, and assemblies with internal features. CT is also justified when defect sizing matters more than detection — CT gives true 3D defect dimensions and volumes, where RT gives a 2D projection. For simple geometry (forged plates, simple sand castings, pipe welds), digital radiography or even film RT remains faster and cheaper per part. The crossover happens at unit values around $1,000-$5,000 per part where the cost of a missed defect or a false reject exceeds the CT scan cost.[5]",
    },
    {
      q: 'What is PPAP and how does it affect NDT?',
      a: "PPAP (Production Part Approval Process) is the automotive industry's part-qualification protocol issued by the AIAG (Automotive Industry Action Group). PPAP requires the supplier to submit a defined documentation package proving that the production process consistently produces parts meeting customer specifications — typical elements are Design FMEA, Process FMEA, Process Flow, Control Plan, Measurement System Analysis (MSA), Initial Process Studies, qualification samples, and sample inspection records. NDT enters PPAP at the Control Plan and inspection-records level — the supplier must document which NDT is performed at which station, the acceptance criteria, the sample frequency, and the operator certification. PPAP Level 3 (the most common) requires submission of all elements plus sample parts.",
    },
    {
      q: 'What is the difference between ISO 9001 and ISO 3834 for welded fabrication?',
      a: "ISO 9001:2015 is the general quality management system standard applicable to any industry — it sets requirements for documented processes, management review, internal audit, and corrective action without specifying welding-specific requirements. ISO 3834 layers welding-specific quality requirements on top: ISO 3834-2 (comprehensive) is required for high-risk welded fabrications such as pressure equipment and load-bearing structures; ISO 3834-3 (standard) and ISO 3834-4 (elementary) apply to lower-risk products. ISO 3834-2 mandates documented Welding Procedure Specifications (WPS) with supporting Welding Procedure Qualification Records (WPQR), qualified welders per ISO 9606-1, qualified welding coordinators per ISO 14731, and traceability of welding consumables. European fabricators serving the EN 1090 structural market are required to hold ISO 3834-2 certification.",
    },
  ],
  internalLinks: [
    {
      href: '/ndt-methods/magnetic-particle-testing',
      label: 'Magnetic Particle Testing (MT)',
      context: 'MT is the workhorse for surface crack detection on structural and pressure-equipment weldments.',
    },
    {
      href: '/ndt-methods/radiographic-testing',
      label: 'Radiographic Testing (RT)',
      context: 'RT remains the default volumetric NDT for code-credited pressure equipment and structural welds.',
    },
    {
      href: '/ndt-methods/ultrasonic-testing',
      label: 'Ultrasonic Testing (UT)',
      context: 'UT covers forging volumetric inspection and weld inspection under AWS D1.1 Clause 8.',
    },
    {
      href: '/standards/aws-d1-1',
      label: 'AWS D1.1 Structural Welding Code — Steel',
      context: 'AWS D1.1 sets the acceptance baseline for structural steel weldments.',
    },
    {
      href: '/standards/asme-section-ix',
      label: 'ASME Section IX Welding Qualifications',
      context: 'ASME Section IX governs welder and procedure qualification for pressure equipment.',
    },
    {
      href: '/industries/aerospace',
      label: 'Aerospace NDT',
      context: 'Aerospace tier work layers AS9100 and Nadcap on top of general manufacturing NDT.',
    },
    {
      href: '/industries/automotive',
      label: 'Automotive NDT',
      context: 'Automotive Tier 1 NDT runs under IATF 16949 and PPAP on top of ISO 9001.',
    },
    {
      href: '/free-tools/certificate-manager',
      label: 'NDT Certificate Manager',
      context: 'Track CWI, ASME IX welder, and ASNT Level II certifications with expiry alerts.',
    },
  ],
  citations: [
    {
      id: 'aws-d1-1',
      source: 'AWS D1.1/D1.1M:2020, Structural Welding Code — Steel, American Welding Society',
    },
    {
      id: 'asme-ix',
      source: 'ASME Boiler and Pressure Vessel Code, Section IX: Welding, Brazing, and Fusing Qualifications, 2023 ed.',
    },
    {
      id: 'census-mfg',
      source: 'U.S. Census Bureau, Annual Survey of Manufactures, 2023',
      url: 'https://www.census.gov/programs-surveys/asm.html',
    },
    {
      id: 'astm-e155',
      source: 'ASTM E155-20, Standard Reference Radiographs for Inspection of Aluminum and Magnesium Castings',
    },
    {
      id: 'astm-e1570',
      source: 'ASTM E1570-19, Standard Practice for Computed Tomographic (CT) Examination',
    },
    {
      id: 'asme-viii',
      source: 'ASME BPVC Section VIII Division 1: Rules for Construction of Pressure Vessels, 2023 ed.',
    },
    {
      id: 'iso-3834-2',
      source: 'ISO 3834-2:2021, Quality requirements for fusion welding of metallic materials — Part 2: Comprehensive quality requirements',
    },
    {
      id: 'aws-cwi',
      source: 'AWS QC1:2016, Standard for AWS Certification of Welding Inspectors',
    },
  ],
};

export default industry;
