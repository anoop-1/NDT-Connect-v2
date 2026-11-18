import type { BuyerGuide } from './types';

const guide: BuyerGuide = {
  slug: 'aerospace-ndt-seattle-everett-wichita',
  title: 'Aerospace NDT in Seattle–Everett and Wichita: Choosing Methods and Qualified Suppliers',
  metaTitle: 'Aerospace NDT Buyer’s Guide — Seattle, Everett & Wichita (NAS 410, Nadcap)',
  description: 'Buyer’s guide to aerospace NDT in Seattle, Everett and Wichita: FPI, MT, UT and composite methods, NAS 410 personnel, Nadcap accreditation and how to qualify a supplier.',
  region: 'Pacific Northwest & Kansas aerospace corridors',
  states: ['Washington', 'Kansas'],
  cities: [
    { name: 'Seattle, WA', href: '/ndt-services/seattle-wa' },
    { name: 'Everett, WA', href: '/ndt-services/everett-wa' },
    { name: 'Wichita, KS', href: '/ndt-services/wichita-ks' },
  ],
  industry: 'Aerospace manufacturing & MRO',
  updated: '2026-11-18',
  quickAnswer:
    'In aerospace you rarely “choose” an NDT method from scratch: the engineering drawing, the customer’s process specification and the OEM approval list usually name it. Your job as a buyer is to make sure the supplier is approved for that exact method and specification, that its personnel are certified to NAS 410 (or EN 4179), and — where your customer requires it — that it holds Nadcap NDT accreditation for the method. Technically, fluorescent penetrant (ASTM E1417) and wet fluorescent magnetic particle (ASTM E1444) dominate surface inspection of metal parts, ultrasonic and radiographic methods cover volumetric inspection of forgings, castings and welds, and composite structures rely on ultrasonic C-scan, bond testing and thermography.',
  sections: [
    {
      id: 'why-aerospace-differs',
      h2: 'Why buying aerospace NDT is unlike industrial NDT',
      paragraphs: [
        'The Puget Sound corridor around Seattle and Everett and the Wichita area in Kansas are two of the largest concentrations of aerospace manufacturing in the United States: final assembly, aerostructures, machined and formed parts, composites and a large supply chain of special-process houses and maintenance, repair and overhaul (MRO) shops. Both regions support many NDT suppliers, from in-house OEM labs to independent shops that process parts for dozens of customers.',
        'What sets aerospace apart is that NDT is a controlled special process. In industrial work a buyer and contractor often agree on a method and a code together. In aerospace the method, technique, acceptance criteria and sometimes even the penetrant family or magnetisation technique are flowed down through drawings, purchase-order clauses and customer process specifications. A supplier who performs a technically excellent inspection to the wrong revision of the specification has still produced a nonconforming part. For buyers, qualification and paperwork are as important as technique.',
      ],
    },
    {
      id: 'personnel',
      h2: 'Personnel: NAS 410 and EN 4179 certification',
      paragraphs: [
        'NAS 410, “NAS Certification & Qualification of Nondestructive Test Personnel,” is the de facto personnel standard across the aerospace industry and the civilian successor to MIL-STD-410; it is maintained by the Aerospace Industries Association [1]. Its European counterpart is EN 4179, and the two are closely aligned [2]. Under NAS 410 the employer, not a central body, establishes and runs the certification program: the employer develops and maintains a written procedure for qualifying and certifying its NDT personnel, covering training, experience, examinations and recertification [1][3]. That program is typically overseen by a responsible NAS 410 Level 3.',
        'For a buyer this has two consequences. First, an ASNT certificate on its own does not demonstrate NAS 410 compliance; ask for the supplier’s written practice and the individual certification records for the people who will inspect your parts. Second, certifications are method-specific and often technique-specific, so check that the inspector is certified for the exact method (for example, fluorescent penetrant rather than visible dye) at Level 2 or above for acceptance decisions.',
      ],
    },
    {
      id: 'nadcap',
      h2: 'Supplier accreditation: Nadcap NDT',
      paragraphs: [
        'Many aerospace primes require their NDT suppliers to hold Nadcap accreditation, administered by the Performance Review Institute. The baseline audit criteria for NDT accreditation are published as AC7114, supplemented by method-specific audit criteria and subscriber supplemental checklists that capture individual primes’ requirements [4]. AC7114 references NAS 410 for personnel qualification, so a supplier’s written practice is reviewed as part of the audit [4][5].',
        'Accreditation is granted per method. A shop accredited for penetrant and magnetic particle is not thereby accredited for ultrasonic or radiography. When you qualify a supplier, check the Nadcap certificate scope against every method on your parts, confirm it is current, and confirm the supplier is also on your customer’s approved-supplier list for those methods where the customer maintains one. Many quality systems also expect ISO/IEC 17025 for laboratory competence; check what your own contracts flow down.',
      ],
    },
    {
      id: 'metal-surface',
      h2: 'Surface inspection of metal parts: penetrant and magnetic particle',
      paragraphs: [
        'Fluorescent penetrant inspection (FPI) is the most widely used aerospace NDT method for surface-breaking discontinuities. ASTM E1417 establishes the minimum requirements for liquid penetrant examination of nonporous metal and nonmetal components and replaced MIL-STD-6866; it applies to in-process, final and in-service examinations [6]. Specifications built on E1417 control the penetrant type, method (water-washable, post-emulsifiable lipophilic or hydrophilic), sensitivity level and developer form, so the shop must use exactly the system the drawing calls for. Aerospace manufacturers looking for very fine discontinuities may impose higher sensitivity levels [7].',
        'For ferromagnetic parts, magnetic particle testing is often preferred because it can find slightly subsurface as well as surface discontinuities. ASTM E1444 is the aerospace practice, intended for the wet fluorescent method; it replaced MIL-STD-1949 and covers cracks, laps, seams and inclusions in raw material, billets, finished parts, welds and in-service parts [8]. It is not applicable to non-ferromagnetic alloys such as austenitic stainless steels [8], which is why stainless and aluminium parts go to penetrant instead. Industrial (non-aerospace) magnetic particle work is covered by a different practice, ASTM E3024 [8].',
      ],
      table: {
        caption: 'Picking the surface method for aerospace metal parts',
        head: ['Material / part', 'Typical method', 'Governing practice', 'Buyer checks'],
        rows: [
          ['Aluminium, titanium, nickel alloys, austenitic stainless', 'Fluorescent penetrant', 'ASTM E1417 + customer spec', 'Penetrant type, method and sensitivity level match the drawing; process control records'],
          ['High-strength and ferromagnetic steels', 'Wet fluorescent magnetic particle', 'ASTM E1444 + customer spec', 'Magnetising technique and field verification; demagnetisation; part not plated before MT if prohibited'],
          ['Composite or painted surfaces', 'Usually not penetrant; use visual, UT or thermography', 'Customer spec', 'Confirm the method is approved for the material'],
        ],
      },
    },
    {
      id: 'volumetric',
      h2: 'Volumetric inspection: forgings, castings and welds',
      paragraphs: [
        'Rotating parts, structural forgings and plate are commonly inspected ultrasonically — immersion C-scan for high-value forgings and plate, and contact or phased-array UT for machined features and welds. Castings and complex welded assemblies frequently go to radiography, increasingly digital, and to computed tomography where internal geometry must be measured as well as inspected. As with surface methods, the technique details — frequency, scan plan, reference standards and acceptance class — come from the customer specification, and the supplier must be approved for that specific technique.',
        'If you are buying new capability rather than processing existing part numbers, involve the customer’s NDT Level 3 early. Proposing a different method (for example, phased-array UT instead of radiography on a weld) usually requires technique approval and sometimes a capability demonstration before it can be used on production hardware.',
      ],
    },
    {
      id: 'composites',
      h2: 'Composite structures: UT, bond testing and thermography',
      paragraphs: [
        'Both the Puget Sound and Wichita supply chains build and repair large carbon-fibre composite structures. The defects that matter — delaminations, porosity, disbonds, foreign-object inclusions and impact damage — are internal, so surface methods do not apply. Ultrasonic C-scan, in pulse-echo or through-transmission configurations and increasingly with phased-array probes, is the primary production method for laminates. Bond testers (pitch-catch, resonance and mechanical impedance techniques) are used for bonded joints and honeycomb sandwich structures, and active thermography provides fast area coverage for disbonds and impact damage, particularly in MRO.',
        'For production parts, the inspection technique and its reference standards are usually defined and approved by the OEM. For repairs, the structural repair manual or the approved repair data specifies the inspection. Ask suppliers which composite techniques they are approved for, what reference standards they hold for your laminate types and thicknesses, and how they store and deliver C-scan data.',
      ],
    },
    {
      id: 'mro',
      h2: 'In-service and MRO inspection: buying to the manual',
      paragraphs: [
        'Maintenance, repair and overhaul work follows a different logic from production. The inspection to be performed, the method, the probe or penetrant system and the reject criteria normally come from the aircraft or engine manufacturer’s NDT manual, a service bulletin, an airworthiness directive or approved repair data. The supplier’s job is to perform exactly that procedure; the buyer’s job is to make sure the supplier has the current revision of the source document, the specific equipment and reference standards it calls for, and inspectors certified for that technique.',
        'Eddy current is the workhorse of in-service metallic inspection: high-frequency surface probes for cracks at radii and edges, rotating bolt-hole probes for cracks at fastener holes, and low-frequency techniques for second-layer cracking and corrosion in lap joints, all without removing paint in many cases. Ultrasonic thickness and phased-array techniques cover corrosion and disbond mapping, and fluorescent penetrant remains common on removed engine and landing-gear parts. Because MRO inspections are frequently driven by a deadline — an aircraft waiting on the ground — ask suppliers about on-wing capability, travel crews and how quickly they can turn around a report signed by an authorised inspector.',
        'One practical tip for buyers in both corridors: keep a short list of pre-qualified suppliers for each method you buy repeatedly, re-check their certificates and approvals annually, and share forecast volumes. Suppliers who know your demand can hold capacity for you when an urgent aircraft-on-ground (AOG) job arrives.',
      ],
    },
    {
      id: 'qualifying',
      h2: 'How to qualify an aerospace NDT supplier: a buyer’s checklist',
      paragraphs: [
        'Use this list when adding a new NDT source in either corridor. It mirrors what your own customer’s auditors will ask about the supplier during your next source inspection.',
      ],
      bullets: [
        'Customer approval: is the supplier on the prime’s approved list for each method and specification you need?',
        'Nadcap: current NDT accreditation, with each required method in scope (AC7114 plus method checklists).',
        'Personnel: written practice to NAS 410 / EN 4179; certification records for the inspectors assigned, at the right level and technique.',
        'Specifications: the supplier holds the current revision of every customer specification on your purchase order and has a process to flow down revisions.',
        'Process control: daily and periodic checks for penetrant and magnetic particle systems, UV-A intensity, ambient light, and equipment calibration records.',
        'Traceability: how parts are identified, how accept/reject is marked, and how certificates of conformance reference the specification and revision.',
        'Capacity and turnaround: shifts, queue times and expedite options, especially for long parts and large composite panels.',
        'Data: report and certificate formats, retention period, and delivery of digital data (radiographs, C-scans).',
      ],
    },
    {
      id: 'mistakes',
      h2: 'Mistakes that create nonconformances',
      paragraphs: [
        'The most frequent is assuming that an industrial certification covers aerospace work. An inspector with ASNT certification under an industrial written practice may be highly skilled, but unless the employer’s program meets NAS 410 the inspection may not be acceptable to the prime. The second is method substitution without approval — using visible-dye penetrant where fluorescent is specified, or a different sensitivity level, to save time. The third is losing the link between the inspection and the specification revision on the certificate of conformance.',
        'Finally, do not choose suppliers on price alone in a constrained market. Both regions periodically experience NDT capacity crunches when production rates rise. A slightly more expensive supplier with spare capacity and a clean audit history usually costs less than a cheaper one that misses ship dates or triggers an escape investigation.',
      ],
    },
  ],
  faqs: [
    { q: 'What certification do aerospace NDT inspectors need?', a: 'They are normally certified by their employer under a written practice that meets NAS 410 (or the European EN 4179). NAS 410 is maintained by the Aerospace Industries Association and is the de facto aerospace standard; the employer runs the program, typically overseen by a responsible Level 3.' },
    { q: 'Is Nadcap accreditation required for aerospace NDT suppliers?', a: 'Many aerospace primes require it in their purchase orders. Nadcap NDT accreditation is audited against AC7114 and method-specific criteria, and it is granted per method, so check the certificate scope against every method on your parts.' },
    { q: 'Which standard governs fluorescent penetrant inspection in aerospace?', a: 'ASTM E1417, which sets minimum requirements for liquid penetrant examination of nonporous metal and nonmetal components and replaced MIL-STD-6866. Customer specifications then define the exact penetrant type, method and sensitivity level.' },
    { q: 'Can magnetic particle testing be used on stainless steel aircraft parts?', a: 'Not on austenitic stainless steels or other non-ferromagnetic alloys. ASTM E1444 aerospace magnetic particle testing applies only to ferromagnetic materials, so stainless, aluminium and titanium parts are usually inspected with fluorescent penetrant.' },
    { q: 'What NDT methods are used on composite aircraft structures?', a: 'Ultrasonic C-scan (pulse-echo or through-transmission, often phased array) for laminates, bond testing for bonded joints and honeycomb, and thermography for fast area coverage, with techniques and reference standards defined by the OEM or repair data.' },
  ],
  references: [
    { title: 'AviationPros: NDT certification — NAS 410, the standard that matters', url: 'https://www.aviationpros.com/home/article/10383234/ndt-certification' },
    { title: 'EN 4179 — Aerospace series: qualification and approval of personnel for NDT', url: 'https://www.evs.ee/en/evs-en-4179-2026' },
    { title: 'NAS 410 — Certification & qualification of NDT personnel (standard text excerpt)', url: 'https://www.scribd.com/document/432067624/NAS-410' },
    { title: 'Nadcap AC7114 — NDT audit criteria (excerpt)', url: 'https://www.scribd.com/document/615537083/AC7114-Rev-M-1' },
    { title: 'AC7114 written-practice checklist referencing NAS 410 / EN 4179', url: 'https://public-library.safetyculture.io/products/written-practice-accreditation-program-ac7114' },
    { title: 'ASTM E1417/E1417M-21e1 — Standard practice for liquid penetrant testing (ANSI webstore)', url: 'https://webstore.ansi.org/standards/astm/astme1417e1417m21e1' },
    { title: 'ASTM Standardization News: Testing without destruction (E1417 and E1444)', url: 'https://sn.astm.org/node/5226/printable/print' },
    { title: 'ASTM E1444/E1444M — Standard practice for magnetic particle testing for aerospace (ANSI webstore)', url: 'https://webstore.ansi.org/standards/astm/astme1444e1444m22a' },
  ],
  related: [
    { label: 'Composite NDT method selection', href: '/blog/composite-ndt-method-selection' },
    { label: 'Magnetic particle testing complete guide', href: '/blog/magnetic-particle-testing-complete-guide' },
    { label: 'Magnetic particle vs penetrant testing', href: '/compare/magnetic-particle-testing-vs-penetrant-testing' },
    { label: 'Industrial CT vs radiography for castings', href: '/blog/industrial-ct-vs-radiography-castings' },
    { label: 'UT vs phased-array UT', href: '/compare/ultrasonic-testing-vs-phased-array-ut' },
    { label: 'Aerospace NDT supplier buying (career practice)', href: '/learn/career-practice-aerospace-ndt-supplier-buying' },
  ],
};
export default guide;
