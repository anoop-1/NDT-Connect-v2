import type { BuyerGuide } from './types';

const guide: BuyerGuide = {
  slug: 'permian-basin-midstream-pipeline-ndt',
  title: 'Permian Basin & Midstream Pipeline NDT: Girth Welds, Tie-Ins and In-Service Integrity',
  metaTitle: 'Permian & Midstream Pipeline NDT Buyer’s Guide — Girth Welds, AUT vs RT',
  description: 'How pipeline operators in Midland, Odessa, Oklahoma and the midstream network should choose NDT for girth welds, tie-ins and in-service integrity under 49 CFR 192/195.',
  region: 'Permian Basin & Mid-Continent midstream',
  states: ['Texas', 'New Mexico', 'Oklahoma'],
  cities: [
    { name: 'Midland, TX', href: '/ndt-services/midland-tx' },
    { name: 'Odessa, TX', href: '/ndt-services/odessa-tx' },
    { name: 'Oklahoma City, OK', href: '/ndt-services/oklahoma-city-ok' },
    { name: 'Tulsa, OK', href: '/ndt-services/tulsa-ok' },
    { name: 'Houston, TX', href: '/ndt-services/houston-tx' },
  ],
  industry: 'Pipelines & midstream',
  updated: '2026-11-18',
  quickAnswer:
    'For new construction, the federal pipeline rules decide how many girth welds you must examine and the API 1104 standard decides what is acceptable; the method is your choice, as long as it clearly shows defects and follows a written procedure run by qualified people. Radiography remains the default on small spreads, tie-ins and short crossings. Automated ultrasonic testing (AUT) wins on long, high-production spreads and is effectively required if you want to use engineering-critical-assessment (ECA) acceptance criteria, because those depend on measured flaw height. For lines already in service, in-line inspection, direct assessment and targeted field NDT at digs do the work, not girth-weld radiography.',
  sections: [
    {
      id: 'why-permian',
      h2: 'Why pipeline NDT buying in the Permian is its own discipline',
      paragraphs: [
        'The Permian Basin of West Texas and south-east New Mexico, together with the gathering and transmission networks that carry its oil and gas to Cushing, the Gulf Coast and beyond, generates a steady stream of pipeline construction: gathering laterals, compressor-station piping, crude and NGL trunklines, and replacement and reroute projects. Midland and Odessa are the field hubs, with Oklahoma City and Tulsa anchoring much of the Mid-Continent midstream workforce. The work is spread over long distances, often remote, and schedule pressure on construction spreads is intense — a welding spread that waits for NDT results is burning money every hour.',
        'Unlike in-plant inspection, much of pipeline NDT is driven directly by federal regulation. The Pipeline and Hazardous Materials Safety Administration (PHMSA) rules in 49 CFR Part 192 (gas) and Part 195 (hazardous liquids) set minimum examination percentages and record-keeping, and both incorporate API Standard 1104 for weld acceptance. Get the regulatory baseline right first, then choose the method that delivers it fastest and most reliably.',
      ],
    },
    {
      id: 'gas-192',
      h2: 'Gas lines (49 CFR Part 192): how many welds you must examine',
      paragraphs: [
        'Under §192.243, nondestructive testing of welds may be performed by any process other than trepanning that clearly indicates defects that may affect the integrity of the weld, and it must be done in accordance with written procedures by persons trained and qualified in those procedures and with the equipment used [1]. That wording is deliberately method-neutral: radiography, manual UT, and automated UT can all comply if the procedure demonstrates they find the relevant defects.',
        'Where NDT is required, the rule sets a minimum percentage of each day’s field butt welds, selected at random by the operator, that must be tested over their entire circumference [1]:',
      ],
      table: {
        caption: 'Minimum girth-weld NDT on gas transmission construction (49 CFR §192.243(d))',
        head: ['Location', 'Minimum share of each day’s field butt welds'],
        rows: [
          ['Class 1 locations (except offshore)', 'At least 10%'],
          ['Class 2 locations', 'At least 15%'],
          ['Class 3 and 4 locations, major or navigable river crossings, offshore, and within railroad or public highway rights-of-way', '100% if practicable, but not less than 90%; NDT must be impracticable for each weld not tested'],
          ['Pipeline tie-ins, including tie-ins of replacement sections', '100%'],
        ],
      },
      bullets: [
        'The NDT requirement applies to welds on pipelines operated at a hoop stress of 20% or more of SMYS, with narrow exceptions for limited numbers of welds on lower-stress lines where testing is impractical [2][3].',
        'Operators must keep, for the life of the pipeline, a record of the number of girth welds made, the number tested, the number rejected and their disposition, located by milepost, station or geographic feature [3].',
        'Weld acceptability is judged against Section 9 of API Standard 1104 [4].',
        'PHMSA has stated that a hydrostatic test is not an adequate substitute for radiographic examination of girth welds, because a pressure test cannot detect all unacceptable weld defects [5].',
      ],
    },
    {
      id: 'liquids-195',
      h2: 'Liquid lines (49 CFR Part 195): a tighter rule in sensitive locations',
      paragraphs: [
        'Hazardous-liquid pipelines follow §195.234. NDT must again be performed to written procedures by qualified personnel. In listed locations — such as populated areas, river and road crossings — all girth welds installed each day must be tested over their entire circumference, except that up to 10% of that day’s welds may go untested where testing is genuinely impracticable [6]. When used pipe is installed, 100% of the old girth welds must be examined, and 100% of tie-in welds must be examined [6].',
        'For a crude or NGL project crossing the Permian’s highways, farm-to-market roads and draws, this means your NDT contractor must be able to keep pace with near-100% coverage at every crossing and tie-in, not just the 10% random sample typical of open Class 1 country.',
      ],
    },
    {
      id: 'rt-vs-aut',
      h2: 'Radiography or automated UT? Matching method to spread',
      paragraphs: [
        'Radiography — increasingly computed or digital rather than film — is still the workhorse for pipeline girth welds. It is familiar to inspectors and regulators, produces a permanent image that is easy to audit against API 1104 Section 9, and it scales down well: a single crew can cover tie-ins, short laterals and station piping without bespoke calibration blocks. Its constraints are radiation safety in populated or busy areas, slower throughput on large-diameter spreads, and the fact that a radiograph does not measure flaw height.',
        'Automated ultrasonic testing uses mechanised scanners to drive UT probes around the weld, producing encoded, repeatable data. It is a standard approach for cross-country girth welds under API 1104, with mechanised UT addressed in Annex S as an alternative to radiography [7]. Most systems use zone discrimination, dividing the weld into root, fill and cap zones each covered by a dedicated channel, which allows high production rates on long spreads [7]. AUT gives results within minutes of the scan, which lets the welding crew correct a problem before it repeats across dozens of welds.',
        'The decisive factor is often acceptance criteria. API 1104 Annex A lets the company accept girth-weld imperfections on a fitness-for-purpose basis using fracture mechanics — measured toughness, applied stress and flaw dimensions — instead of the conservative workmanship limits of Section 9. Because Annex A acceptance turns on flaw height as much as length, it requires an ultrasonic technique with demonstrated sizing accuracy [8]. PHMSA-funded research has published guidance for quantifying AUT systems — equipment, procedures and operators — for new-construction girth welds, which is a useful benchmark when you evaluate a contractor’s technical justification [9][10].',
      ],
      table: {
        caption: 'Choosing between RT and AUT for girth welds',
        head: ['Project profile', 'Usually the better buy', 'Reason'],
        rows: [
          ['Long, large-diameter trunkline with high daily weld counts', 'AUT', 'Throughput, immediate feedback to welders, encoded data'],
          ['Project using API 1104 Annex A (ECA) acceptance', 'AUT with qualified sizing', 'Annex A requires measured flaw height'],
          ['Tie-ins, short laterals, station and facility piping', 'RT (CR/DR)', 'Low set-up cost per weld, flexible geometry'],
          ['Crossings in populated areas or near other crews', 'AUT or PAUT where qualified; RT with tight exclusion control', 'Avoids or limits radiation exclusion zones'],
          ['Small-diameter gathering lines', 'RT', 'AUT set-up and calibration rarely pay back on small, short jobs'],
        ],
      },
    },
    {
      id: 'in-service',
      h2: 'Lines already in service: integrity, not construction NDT',
      paragraphs: [
        'Once a line is operating, girth-weld radiography stops being the main tool. Integrity programs rely on in-line inspection (ILI) — magnetic flux leakage for metal loss, ultrasonic tools for wall thickness and cracks, and geometry tools for dents — plus direct assessment and pressure testing where pigging is not possible. Field NDT then verifies what ILI reports at excavation sites: UT thickness and corrosion mapping, phased-array or TOFD for crack-like features and dents with metal loss, magnetic particle testing for surface-breaking cracks, and laser or structured-light profilometry for external corrosion.',
        'For a buyer, the key is that dig-site NDT must report in a format that lets your integrity engineers compare it directly with the ILI call: same feature identifiers, same reference girth welds, and dimensions measured the same way. Specify this in the contract, or you will pay twice to reconcile data.',
      ],
    },
    {
      id: 'field-realities',
      h2: 'Permian field realities that change the quote',
      paragraphs: [
        'Distance and access dominate cost. A crew based in Midland or Odessa can reach most of the Delaware and Midland sub-basins within a day, but remote right-of-way, lease-road conditions and weather windows drive standby charges. Ask contractors to price mobilisation, per-diem and standby explicitly and to say where the crew will be based.',
        'Radiography on spreads also carries licensing and safety obligations. In Texas, industrial radiography is regulated under 25 TAC §289.255, which covers both company licensing and radiographer certification [11]. New Mexico and Oklahoma have their own radiation-control programs, so a multi-state project needs a contractor licensed where each spread is working. Ask for licence numbers and radiographer cards before the first shot.',
        'Finally, sour service changes material and weld requirements and may add hardness testing and stricter acceptance limits. If the line will carry H₂S-bearing product, make sure the NDT scope includes whatever hardness surveys and additional examinations your specification calls for.',
      ],
    },
    {
      id: 'scoping',
      h2: 'Scoping a pipeline NDT request',
      paragraphs: [
        'Pipeline NDT quotes differ wildly because scopes are written loosely. A request that answers these questions lets you compare contractors like for like:',
      ],
      bullets: [
        'Pipeline type and rule: gas (Part 192) or liquid (Part 195); operating stress as a percentage of SMYS; class locations along the route.',
        'Pipe data: diameter, wall thickness, grade, coating and the welding process (manual SMAW, mechanised GMAW, etc.).',
        'Expected daily weld count per spread and number of spreads.',
        'Required examination percentages by location, including crossings and tie-ins.',
        'Method and technique: RT (film, CR or DR), AUT (zone discrimination, phased array, TOFD) or a mix, with the API 1104 edition and any Annex A ECA.',
        'Personnel: method certifications, AUT operator qualification and, for radiography, state licences and radiographer certification.',
        'Turnaround: how quickly results must reach the welding foreman and the inspector, and the reporting format for the weld map.',
        'Records: who maintains the life-of-pipeline NDT records required by the rule and in what format.',
      ],
    },
    {
      id: 'mistakes',
      h2: 'Mistakes that cost pipeline operators money',
      paragraphs: [
        'Treating the regulatory percentages as targets rather than minimums is the most common. A 10% random sample in Class 1 country is a floor; if the first days of production show a repeating defect, increasing coverage early is far cheaper than cutting out welds later. Second, choosing AUT for its speed but forgetting to qualify the system and procedure for the actual pipe and weld bevel; without that qualification, the speed is meaningless. Third, losing the weld records: the rule requires them for the life of the pipeline, and reconstructing them after an incident or audit is painful.',
        'And do not assume hydrotesting covers you. A successful pressure test is essential, but PHMSA has been clear that it does not replace girth-weld examination [5].',
      ],
    },
  ],
  faqs: [
    { q: 'What percentage of pipeline girth welds must be X-rayed?', a: 'Under 49 CFR §192.243, at least 10% of each day’s field butt welds in Class 1 locations, 15% in Class 2, and 100% where practicable (not less than 90%) in Class 3 and 4 locations, major river crossings, offshore and road or rail rights-of-way, with 100% at tie-ins. Any qualified NDT process — not only radiography — can be used. Liquid lines under Part 195 have their own, generally stricter location rules.' },
    { q: 'Can automated ultrasonic testing replace radiography on a pipeline?', a: 'Yes. The federal rules allow any process that clearly indicates defects, performed to written procedures by qualified people, and API 1104 includes mechanised UT as an alternative to radiography. AUT is required in practice if you want to use API 1104 Annex A ECA acceptance, because it depends on measured flaw height.' },
    { q: 'Does a hydrostatic test replace girth weld NDT?', a: 'No. PHMSA has stated that a hydrostatic test is not an adequate substitute for radiographic examination of girth welds, because pressure testing cannot detect all unacceptable weld defects.' },
    { q: 'Which standard sets acceptance criteria for pipeline welds?', a: 'API Standard 1104, Section 9 for NDT acceptance, with Annex A providing alternative fitness-for-purpose (ECA) criteria when the company elects to use them and their prerequisites are met.' },
    { q: 'What NDT is used on pipelines that are already operating?', a: 'In-line inspection tools (MFL, ultrasonic and geometry), direct assessment and pressure testing, with field NDT — UT mapping, phased array, TOFD, magnetic particle and profilometry — used at excavations to verify and size ILI features.' },
  ],
  references: [
    { title: '49 CFR §192.243 — Nondestructive testing (Cornell LII)', url: 'https://www.law.cornell.edu/cfr/text/49/192.243' },
    { title: '49 CFR §192.241(b) — welds requiring NDT at ≥20% SMYS (regulatory text)', url: 'https://www.customsmobile.com/regulations/expand/title49_chapterI-i1_part192_subpartE_section192.227' },
    { title: '49 CFR Part 192 Subpart E — welding of steel in pipelines (record-keeping)', url: 'https://chanrobles.com/usa/uslaws/cfr/title49/49-3.1.1.1.3.5.php' },
    { title: '49 CFR §192.241(c) — acceptability per API Standard 1104 Section 9 (GPO)', url: 'https://www.gpo.gov/fdsys/pkg/CFR-2011-title49-vol3/pdf/CFR-2011-title49-vol3-sec192-245.pdf' },
    { title: 'PHMSA interpretation PI-91-031 — hydrostatic testing not a substitute for girth-weld radiography', url: 'https://www.phmsa.dot.gov/regulations/title49/interp/PI-91-031' },
    { title: '49 CFR §195.234 — Welds: nondestructive testing (Cornell LII)', url: 'https://www.law.cornell.edu/cfr/text/49/195.234' },
    { title: 'What is AUT? Automated ultrasonic testing of girth welds (Project Materials)', url: 'https://www.blog.projectmaterials.com/quick-answers/epc/what-is-aut/' },
    { title: 'API 1104 Annex A (ECA) alternative acceptance standards — study guide', url: 'https://open-exam-prep.com/study-guides/aws-cwi-endorsement-api-1104/acceptance-standards/cracks-and-aoi' },
    { title: 'PHMSA/EWI — Guidance for quantification of AUT systems for pipeline girth welds', url: 'https://primis.phmsa.dot.gov/rd/FileGet/6587/Appendix_V_for_DTPH56-07-T000002_Final_Report.pdf' },
    { title: 'PHMSA/EWI — AUT technical justification methodology', url: 'https://primis.phmsa.dot.gov/rd/FileGet/6566/Appendix_A_for_DTPH56-07-T000002_Final_Report.pdf' },
    { title: '25 TAC §289.255 — Texas industrial radiography rule (Cornell LII)', url: 'https://www.law.cornell.edu/regulations/texas/25-Tex-Admin-Code-SS-289-255' },
  ],
  related: [
    { label: 'Pipeline inspection pillar guide', href: '/pillars/pipeline-inspection-pillar' },
    { label: 'MFL pipeline inspection guide', href: '/pillars/mfl-pipeline-inspection-pillar' },
    { label: 'Pipeline inspection techniques', href: '/blog/pipeline-inspection-techniques' },
    { label: 'Weld inspection pillar guide', href: '/pillars/weld-inspection-pillar' },
    { label: 'Radiography vs TOFD', href: '/compare/radiographic-testing-vs-tofd-testing' },
    { label: 'UT vs magnetic flux leakage', href: '/compare/ultrasonic-testing-vs-magnetic-flux-leakage' },
    { label: 'RT exposure time calculator', href: '/tools/rt-exposure-time' },
    { label: 'Texas NDT market guide', href: '/states/tx' },
  ],
};
export default guide;
