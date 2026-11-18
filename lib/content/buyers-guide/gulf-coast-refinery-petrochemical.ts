import type { BuyerGuide } from './types';

const guide: BuyerGuide = {
  slug: 'gulf-coast-refinery-petrochemical-ndt',
  title: 'Gulf Coast Refinery & Petrochemical NDT: Which Inspection Method Fits Which Problem',
  metaTitle: 'Gulf Coast Refinery NDT Buyer’s Guide — CUI, HTHA, Weld & Piping Methods',
  description: 'Buyer’s guide to NDT for Houston, Baton Rouge, Lake Charles, Corpus Christi and Beaumont plants: CUI, HTHA, welds and piping — which method, why, and how to scope it.',
  region: 'US Gulf Coast',
  states: ['Texas', 'Louisiana'],
  cities: [
    { name: 'Houston, TX', href: '/ndt-services/houston-tx' },
    { name: 'Beaumont, TX', href: '/ndt-services/beaumont-tx' },
    { name: 'Port Arthur, TX', href: '/ndt-services/port-arthur-tx' },
    { name: 'Corpus Christi, TX', href: '/ndt-services/corpus-christi-tx' },
    { name: 'Baton Rouge, LA', href: '/ndt-services/baton-rouge-la' },
    { name: 'Lake Charles, LA', href: '/ndt-services/lake-charles-la' },
  ],
  industry: 'Refining & petrochemical',
  updated: '2026-11-18',
  quickAnswer:
    'On the Gulf Coast the method follows the damage mechanism, not habit. Screen insulated carbon-steel lines for corrosion under insulation (CUI) with pulsed eddy current, profile radiography or guided wave, then confirm hot spots by stripping and UT thickness. For high-temperature hydrogen attack (HTHA), use TOFD as a fast screen and focused phased-array (PAUT) or FMC/TFM to characterise what it finds. For new and repair welds, encoded PAUT/TOFD usually beats film radiography on turnaround schedules because it removes the radiation exclusion zone. Whatever you buy, the scope must tie back to your mechanical-integrity program, because OSHA expects inspections to follow recognized and generally accepted good engineering practice (RAGAGEP).',
  sections: [
    {
      id: 'why-the-gulf-coast-is-different',
      h2: 'Why buying NDT on the Gulf Coast is different',
      paragraphs: [
        'The refining and chemical corridor from Corpus Christi through Houston, Beaumont–Port Arthur, Lake Charles and up the Mississippi to Baton Rouge is one of the densest concentrations of process equipment in the world. That density works in a buyer’s favour: there are more qualified inspection contractors, more advanced-UT crews and more equipment within a short drive than almost anywhere else. It also creates two problems. First, everyone schedules turnarounds in the same spring and autumn windows, so the best crews are booked months ahead. Second, the climate is hard on equipment. Hot, humid, salt-laden air and frequent heavy rain push water into insulation systems, which is exactly the condition that drives corrosion under insulation.',
        'For a plant owner, the practical consequence is that you rarely have the luxury of choosing an NDT method by price alone. You need the method that finds the specific damage mechanism your risk-based inspection (RBI) study flags, delivered by a crew that can work inside your outage window, and documented in a way your mechanical-integrity (MI) program can defend. This guide walks through the damage mechanisms that dominate Gulf Coast inspection budgets and, for each one, which method to buy, why, and what to put in the purchase order.',
      ],
    },
    {
      id: 'regulatory-frame',
      h2: 'The regulatory frame: PSM mechanical integrity and RAGAGEP',
      paragraphs: [
        'Most refineries and many chemical plants in Texas and Louisiana are covered by OSHA’s Process Safety Management standard, 29 CFR 1910.119. Mechanical integrity is one of its elements, and it is the one that drives inspection spending. The standard requires that inspections and tests on covered process equipment follow recognized and generally accepted good engineering practices, and that they are performed on a schedule consistent with manufacturers’ recommendations and good engineering practice — more often if operating experience says so [1][2].',
        'In practice, “RAGAGEP” for refinery equipment means the API inspection codes and recommended practices: API 510 for pressure vessels, API 570 for piping, API 653 for aboveground storage tanks, and supporting documents such as API RP 571 (damage mechanisms), API RP 583 (CUI) and API RP 941 (HTHA). OSHA has stated that investigators should cite employers who fail to follow RAGAGEP in inspection and testing or who inspect less often than good practice requires [1]. For a buyer, that turns method selection into a compliance decision: if your inspection plan says “PAUT per an API-referenced procedure,” a cheaper substitute that cannot detect the same flaw size is not a saving — it is a finding waiting to happen.',
        'Two documentation points follow. Keep the written NDT procedure, the personnel certifications and the equipment calibration records with every report, because the MI element also requires inspection records to identify the date, the inspector, the equipment, the test performed and the results [2]. And make sure your contractor’s procedures reference the same code edition your plant’s inspection program uses.',
      ],
    },
    {
      id: 'cui',
      h2: 'Corrosion under insulation (CUI): screen wide, confirm narrow',
      paragraphs: [
        'CUI is external corrosion that develops when moisture gets under insulation or fireproofing and stays against carbon or low-alloy steel. Industry training material based on API RP 571 puts the susceptible operating range at roughly 10°F to 350°F, with the most aggressive attack between about 212°F and 250°F [3]. On the Gulf Coast, add cyclic service, damaged jacketing from storms and chloride-bearing insulation and you have the single largest source of unplanned piping leaks in many units.',
        'The buying mistake is to treat CUI as a single inspection. It is a program. Stripping all insulation and visually inspecting is the reference method, but it is expensive and slow, and reinstating insulation badly can create the next CUI site. Effective programs combine a screening method that looks through insulation with a confirmatory method on the indications [4]. API RP 583 provides the industry framework for CUI risk assessment and inspection planning [5].',
      ],
      table: {
        caption: 'CUI methods compared from a buyer’s point of view',
        head: ['Method', 'What it tells you', 'Best use on the Gulf Coast', 'Watch-outs'],
        rows: [
          ['Pulsed eddy current (PEC)', 'Average remaining wall over a footprint, through insulation and jacketing', 'Screening long runs of insulated piping and vessel shells without stripping', 'Averages over the probe footprint, so it can understate small, deep pits; needs a confirmatory method'],
          ['Profile radiography (RT/CR/DR)', 'Wall-thickness profile and external metal loss at the tangent', 'Small-bore piping, dead legs and complex fittings', 'Radiation exclusion zones affect other crafts; practical limits on larger diameters'],
          ['Guided wave UT (GWT)', 'Locates zones of metal loss along tens of metres of pipe from one location', 'Pipe racks, road crossings and lines that are hard to access', 'Screening only; sensitivity drops at bends, branches and heavy coatings'],
          ['Visual + UT after stripping', 'Direct confirmation of morphology and exact remaining wall', 'Confirming every significant screening indication', 'Cost of scaffolding and insulation removal; quality of re-insulation matters'],
        ],
      },
      bullets: [
        'Ask for PEC to be reported against a stated calibration reference and footprint size, so you know how small a defect it can resolve on your line sizes.',
        'Profile radiography and guided wave UT are recognized in API 581-based RBI programs as alternatives to insulation removal for some circuits [6]; confirm how your RBI vendor credits each one before you buy it.',
        'Pulsed eddy current is now covered by the ASME Boiler and Pressure Vessel Code (2021 edition) and an ISO standard, which makes it easier to reference in a procedure [7].',
        'Put the confirmation rule in the PO: for example, “any PEC reading below X% of nominal triggers stripping and UT grid at that location within the same mobilisation.”',
      ],
    },
    {
      id: 'htha',
      h2: 'High-temperature hydrogen attack (HTHA): screen with TOFD, characterise with advanced UT',
      paragraphs: [
        'HTHA occurs in carbon and low-alloy steels exposed to hydrogen at elevated temperature and pressure. It typically starts in welds and heat-affected zones, often in material that never received post-weld heat treatment, and early damage consists of microscopic fissures and methane voids that conventional UT is not designed to find [8]. Hydroprocessing units, reformers and hydrogen plants along the coast all carry HTHA-susceptible equipment, and API RP 941 is the governing recommended practice.',
        'The revised API RP 941 approach uses a combination of techniques rather than a single method. Time-of-flight diffraction (TOFD) is highly sensitive and fast, so it is used as a screening tool, with other methods used to confirm and characterise indications [9]. Focused phased-array UT is widely recognized as one of the best techniques for HTHA, and full matrix capture with the total focusing method (FMC/TFM) adds the resolution needed to see clusters of small voids and micro-fissures [8][10].',
        'This is the area where buying on day rate goes most wrong. HTHA detection depends heavily on probe design, focusing, encoding and — above all — on analysts who have seen real HTHA data. When you issue an RFQ, ask the contractor to describe the specific techniques they will deploy (TOFD, TULA, beam-formed PAUT, FMC/TFM), how they will tell HTHA apart from manufacturing flaws, and whether their analysts have worked to the current API RP 941 inspection approach. Ask for encoded, archived data so a second analyst — or a future inspection — can compare results.',
      ],
    },
    {
      id: 'welds',
      h2: 'New and repair welds during turnarounds: PAUT/TOFD vs radiography',
      paragraphs: [
        'Turnarounds generate thousands of new welds on piping and vessels, and the code (ASME B31.3 for most process piping, ASME VIII for vessels) usually allows volumetric examination by radiography or ultrasonic methods. Film or digital radiography produces an easy-to-audit image and is excellent for volumetric flaws such as porosity and slag. Its drawback on a congested Gulf Coast site is the radiation exclusion zone: shots are often scheduled at night or during breaks, and every exposure stops other work in the area.',
        'Encoded PAUT, often combined with TOFD, examines the weld without ionising radiation, so other crafts can keep working nearby, and it gives through-wall height information that radiography does not. That height information matters when a fitness-for-service engineer needs to decide whether to repair. The trade-off is that PAUT procedures and personnel must be qualified for the specific geometry and thickness, and data interpretation demands more skill. For thin-wall, small-bore piping, radiography or conventional UT may still be the practical answer.',
      ],
      table: {
        caption: 'Weld examination: when each method is the better buy',
        head: ['Situation', 'Usually the better buy', 'Why'],
        rows: [
          ['Large volumes of carbon-steel butt welds during a turnaround', 'Encoded PAUT (+ TOFD on thicker sections)', 'No exclusion zone, faster throughput, archived data, flaw height for FFS'],
          ['Small-bore (≤2 in.) socket and butt welds', 'RT (CR/DR) or targeted UT', 'Geometry limits PAUT coverage; RT is simpler to qualify'],
          ['Austenitic or dissimilar-metal welds', 'Specialist PAUT/TFM with qualified procedure, or RT', 'Coarse-grained welds scatter ultrasound; needs a demonstrated technique'],
          ['Repairs needing quick release back to operations', 'PAUT or conventional UT', 'Avoids night-shift radiography scheduling'],
        ],
      },
    },
    {
      id: 'tanks-and-piping',
      h2: 'Tanks, piping circuits and vessels: matching the API codes',
      paragraphs: [
        'For in-service piping under API 570 and vessels under API 510, the bulk of routine work is thickness measurement at condition-monitoring locations, supplemented by advanced methods where general corrosion is not the main threat. For localised corrosion — erosion at elbows, injection-point corrosion, or under-deposit attack — UT corrosion mapping with automated scanners produces a thickness C-scan that is far more reliable than spot readings. Where your inspection plan calls for spot UT, ask the contractor to report the exact location and gridding so readings can be trended over time.',
        'Aboveground storage tanks under API 653 need different tools: magnetic flux leakage (MFL) floor scanning to find underside corrosion, UT to prove up indications, shell thickness surveys and weld examination for repairs. The tank inspection program also needs an API 653-certified inspector to own the findings. On the Gulf Coast, tank farms around Houston and Beaumont–Port Arthur are large enough that robotic and crawler systems can be cost-effective; ask for coverage percentages and data formats, not just a day rate.',
      ],
    },
    {
      id: 'radiation-licensing',
      h2: 'Radiography on site: licensing and safety questions to ask',
      paragraphs: [
        'If your scope includes radiography, the contractor’s licence and their radiographers’ certifications are your compliance exposure as well as theirs. In Texas, 25 TAC §289.255 sets the radiation safety requirements, licensing procedures and radiographer certification requirements for industrial radiography [11]. Radiographers must complete a radiation safety course of at least 40 hours on the subjects the rule specifies, plus documented on-the-job training under an authorised trainer, before they can be certified [12]. Louisiana sites follow Louisiana’s own radiation-control program, so confirm the contractor holds the right licence for the state where the work is performed.',
        'Before mobilisation, ask for the licence number, the names and certification cards of the radiographers and trainees who will be on site, the source type and activity, and the proposed exclusion-zone plan. Coordinate shot schedules with your permit-to-work system so other crafts are not exposed — this is also where the case for switching suitable welds to PAUT is strongest.',
      ],
    },
    {
      id: 'scoping-the-rfq',
      h2: 'How to scope a Gulf Coast NDT request so quotes are comparable',
      paragraphs: [
        'Most quote-comparison headaches come from vague scopes. Two contractors pricing “PAUT on the hydrotreater” may be pricing completely different coverage, data deliverables and staffing. A tight request takes an hour to write and saves days of clarification.',
      ],
      bullets: [
        'Equipment list with tag numbers, material, nominal thickness, diameter, operating temperature and insulation status.',
        'Damage mechanism you are targeting (from your RBI or corrosion study) and the code or RP that governs the inspection.',
        'Required method(s) and technique detail (e.g. “PAUT sectorial + TOFD, encoded, per a written procedure demonstrated on a representative block”).',
        'Coverage: percentage of welds or area, CML count, scan increments.',
        'Personnel: ASNT SNT-TC-1A or CP-189 level for each method, API 510/570/653 inspector where required, and HTHA-experienced analysts if applicable.',
        'Access and support: scaffolding, insulation removal and reinstatement, surface preparation and permits — state who provides each.',
        'Deliverables: report format, raw encoded data, turnaround time for preliminary and final reports, and how findings are uploaded to your inspection database.',
        'Commercials: day rates vs unit rates, standby, mobilisation and night-shift premiums.',
      ],
    },
    {
      id: 'common-mistakes',
      h2: 'Common buying mistakes we see on the coast',
      paragraphs: [
        'The first is using conventional manual UT where the risk is a crack-like or micro-damage mechanism such as HTHA or stress-corrosion cracking. Manual shear-wave UT can be excellent for weld examination, but it is not a substitute for a demonstrated advanced technique where the flaws are tiny and clustered. The second is buying CUI screening without a confirmation budget: a screening survey that finds 200 suspect locations is of little use if there is no plan or money to strip and prove them up. The third is ignoring data. If the report is a PDF summary without the encoded data, the next inspection cannot trend change, and you will pay to rediscover the same indications.',
        'Finally, do not let the turnaround calendar choose the method. If you know a unit has HTHA-susceptible welds or extensive CUI, book the specialist crew early — the spring and autumn windows fill quickly across the corridor.',
      ],
    },
  ],
  faqs: [
    { q: 'What is the best NDT method for corrosion under insulation on Gulf Coast piping?', a: 'There is no single best method. Use a through-insulation screening technique — pulsed eddy current for general wall loss, profile radiography for small-bore piping, or guided wave UT for long runs — and confirm significant indications by removing insulation and measuring with UT. API RP 583 is the framework for planning the program.' },
    { q: 'Is TOFD enough to inspect for HTHA?', a: 'TOFD is a sensitive screening tool, but under the current API RP 941 approach it is used to find suspect areas, which are then characterised with techniques such as focused phased-array UT or FMC/TFM by experienced analysts.' },
    { q: 'Should I replace radiography with PAUT during a turnaround?', a: 'For many carbon-steel butt welds, yes: encoded PAUT avoids radiation exclusion zones, speeds up release and provides flaw height for fitness-for-service decisions. Small-bore welds, some austenitic welds and jobs where the code or client specifies radiography may still call for RT.' },
    { q: 'What certifications should a refinery NDT contractor have?', a: 'Technicians certified to the employer’s written practice under ASNT SNT-TC-1A or ANSI/ASNT CP-189 for each method, API 510, 570 or 653 inspectors where the inspection code requires them, and — for radiography in Texas — a state licence and certified radiographers under 25 TAC §289.255.' },
    { q: 'How far ahead should I book NDT for a Gulf Coast turnaround?', a: 'For specialist advanced-UT, HTHA or large CUI programs, book as early as your scope allows — ideally a full season ahead — because spring and autumn turnaround windows across the corridor compete for the same crews.' },
  ],
  references: [
    { title: 'OSHA memorandum on RAGAGEP in PSM enforcement (summary, Haynes Boone, 2016)', url: 'https://www.haynesboone.com/news/publications/osha-provides-new-guidance-on-good-engineering-practices.pdf' },
    { title: '29 CFR 1910.119(j)(4) mechanical integrity inspection and testing (EHS Daily Advisor summary of OSHA memo)', url: 'https://ehsdailyadvisor.com/2015/10/ragagep-osha-defines-critical-psm-term/' },
    { title: 'Corrosion under insulation & nozzle interfaces — API RP 571-based study guide', url: 'https://open-exam-prep.com/study-guides/api-653/corrosion-damage-mechanisms/cui-insulation-nozzle-interfaces' },
    { title: 'Eddyfi: Corrosion under insulation — 7 inspection methods', url: 'https://blog.eddyfi.com/corrosion-under-insulation-the-7-inspection-methods-you-must-know-about' },
    { title: 'API RP 583 as the framework for CUI risk assessment (iFactory overview)', url: 'https://ifactoryapp.com/industries/oil-and-gas/corrosion-under-insulation-cui-detection-techniques' },
    { title: 'Corrosionpedia: CUI inspection without insulation removal (API 581 alternatives)', url: 'https://www.corrosionpedia.com/?p=81786' },
    { title: 'Quality Magazine: How pulsed eddy current technology helps uncover corrosion', url: 'https://qualitymag.com/articles/97354-how-pulsed-eddy-current-technology-helps-uncover-corrosion' },
    { title: 'Eddyfi: Detecting high temperature hydrogen attack before it is too late', url: 'https://www.eddyfi.com/en/appnote/detecting-high-temperature-hydrogen-attack-htha-before-its-too-late' },
    { title: 'New inspection approach by revised API 941 (technical presentation)', url: 'https://cdn.fs.pathlms.com/4Sl9BX0RQUattcQEBQy3' },
    { title: 'Evident: Advanced phased array inspection for early detection of HTHA', url: 'https://ims.evidentscientific.com/en/learn/white-papers/advanced-phased-array-inspection-early-detection-htha' },
    { title: 'Texas DSHS — 25 TAC §289.255 industrial radiography rule', url: 'https://www.dshs.texas.gov/sites/default/files/radiation/pdffiles/Rules/289.255%20Radiation%20Safety%20Requirements%20and%20Licensing%20and%20Registration%20Procedures%20for%20Industrial%20Radiography.pdf' },
    { title: 'Texas DSHS — Industrial radiographer certification requirements', url: 'https://www.dshs.state.tx.us/radiation/ir.shtm' },
  ],
  related: [
    { label: 'Refinery inspection pillar guide', href: '/pillars/refinery-inspection-pillar' },
    { label: 'Corrosion under insulation guide', href: '/blog/corrosion-under-insulation-guide' },
    { label: 'Pulsed eddy current for CUI screening', href: '/blog/pulsed-eddy-current-cui-screening' },
    { label: 'Hydrogen service inspection planning', href: '/blog/ndt-hydrogen-service-inspection-planning' },
    { label: 'Radiography vs phased-array UT', href: '/compare/radiographic-testing-vs-phased-array-ut' },
    { label: 'API 570 piping inspector certification', href: '/certifications/api-570' },
    { label: 'Texas NDT market guide', href: '/states/tx' },
    { label: 'Louisiana NDT market guide', href: '/states/la' },
  ],
};
export default guide;
