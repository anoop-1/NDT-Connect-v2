import type { PillarHubContent } from '../types';

const pillar: PillarHubContent = {
  slug: 'radiographic-testing-complete-guide',
  metaTitle: 'Radiographic Testing Hub: Gamma, X-Ray, CR, DR, CT',
  metaDescription:
    'The full RT cluster — Ir-192 and Se-75 gamma, X-ray crawlers, computed and digital radiography, CT. Codes, exposure math, safety, and field workflows.',
  heroLede:
    'Radiography is the only volumetric method that produces an image a regulatory inspector trained 40 years ago will instantly read — which is why it still dominates ASME pressure vessel and API piping construction. It is also the method most regulated, most expensive to mobilize at night, and most aggressively targeted for replacement by PAUT and digital radiography. This hub maps the entire RT cluster on NDT Connect: film and digital workflows, source selection (Ir-192 vs Se-75 vs Co-60 vs X-ray), shielding math, NRC 10 CFR 34 and 10 CFR 20 compliance, and the cost-per-shot economics that drive whether a refinery TA crew is shooting at 2 AM or running PAUT in daylight.',
  topicOverview:
    'The RT cluster on NDT Connect covers four production modalities: film radiography (Class 1 and Class 2 fine-grain industrial films under ASTM E1815), computed radiography (CR with photostimulable phosphor plates), digital radiography (DR with flat-panel detectors), and computed tomography (CT) for high-value forgings and castings. It also covers the two source families — gamma isotopes (Ir-192, Se-75, Co-60, Yb-169) and X-ray (portable constant-potential up to 300 kV, crawler tubes for pipeline mainline). Supporting articles cover exposure calculations, IQI selection per ASTM E1742 and ASME Section V Article 2, source-to-film geometry, double-wall single-image and double-wall double-image techniques for pipe, and the radiation safety regime (10 CFR 34 transport, posting and surveys, dosimetry under 10 CFR 20). Procedure qualification, AIA acceptance, and the digital pathway transition under ASME Section V Article 2 Mandatory Appendix VIII are addressed as separate articles.',
  subPages: [
    {
      href: '/methods/radiographic-testing',
      label: 'Conventional Film RT',
      description:
        'The baseline. Class 1 and Class 2 fine-grain films, lead screens, IQIs, density and contrast acceptance under ASME Section V Article 2 and ASTM E1742.',
    },
    {
      href: '/methods/computed-radiography',
      label: 'Computed Radiography (CR)',
      description:
        'Photostimulable phosphor plates and laser scanners. The transitional digital pathway — same exposure geometry as film with a reusable image plate. ASME Section V Article 2 Mandatory Appendix V applies.',
    },
    {
      href: '/methods/digital-radiography',
      label: 'Digital Radiography (DR)',
      description:
        'Flat-panel amorphous silicon and CMOS detectors. Real-time exposure, dose reduction, and the basis for crawler-based pipeline RT on new construction.',
    },
    {
      href: '/methods/industrial-ct',
      label: 'Industrial Computed Tomography',
      description:
        'High-resolution 3D imaging of castings, additive manufactured parts, and aerospace forgings. ASTM E1441 governs the procedure standard.',
    },
    {
      href: '/methods/gamma-ray-sources',
      label: 'Gamma Sources: Ir-192, Se-75, Co-60, Yb-169',
      description:
        'Half-life, photon energy, practical thickness range, and the licensing regime under NRC 10 CFR 34 or equivalent Agreement State authority.',
    },
    {
      href: '/methods/x-ray-equipment',
      label: 'Portable and Crawler X-Ray',
      description:
        'Constant-potential portable tubes (100-300 kV) for thinner sections, and battery-powered crawlers for pipeline mainline shooting double-wall single-image at field-controlled exposure.',
    },
    {
      href: '/standards/asme-section-v-article-2',
      label: 'ASME Section V, Article 2 — RT Examination',
      description:
        'The governing code article. Penetrameter selection, density, geometric unsharpness, and the digital pathway via Mandatory Appendices V (CR) and VIII (DR).',
    },
    {
      href: '/standards/asme-section-viii-uw-51',
      label: 'ASME Section VIII UW-51 — RT Acceptance',
      description:
        'The acceptance criteria for full radiography of pressure vessel welds. Linear indication limits, slag inclusion sizing, porosity counting under UW-51(b).',
    },
    {
      href: '/standards/nrc-10-cfr-34',
      label: 'NRC 10 CFR Part 34 — Industrial Radiography',
      description:
        'Federal licensing, certified radiographer requirements, source security, transport, and the surveys mandated before and after each exposure.',
    },
    {
      href: '/learn/rt-exposure-calculation',
      label: 'RT Exposure Calculation Worked Examples',
      description:
        'Source strength, source-to-film distance, film speed, and material thickness — three worked examples for Ir-192 on carbon steel.',
    },
    {
      href: '/tools/rt-exposure-calculator',
      label: 'RT Exposure Time Calculator',
      description:
        'Compute exposure time for any isotope, source strength, geometry, and material thickness. Includes IQI sensitivity check.',
    },
    {
      href: '/tools/shielding-thickness-calculator',
      label: 'Shielding Thickness Calculator',
      description:
        'Tenth-value layer math for lead, steel, and concrete. Boundary calculations to keep restricted area below NRC 10 CFR 20 limits.',
    },
    {
      href: '/compare/rt-vs-paut',
      label: 'RT vs PAUT — Which One Wins',
      description:
        'The migration is real but uneven. Where PAUT replaces RT, where RT still wins on porosity, and where regulator preference or AIA acceptance forces RT regardless.',
    },
    {
      href: '/industries/pipeline',
      label: 'RT for Pipeline Mainline Construction',
      description:
        'Crawler X-ray under API 1104 §11, double-wall single-image and panoramic exposure, IQI placement, and the night-shift economics that drive crew scheduling.',
    },
  ],
  expertCommentary:
    'The film-to-digital transition in RT is not a one-way street, and we see fabricators back-port to film for the wrong reasons. The right framing: film is dead for new infrastructure, alive for legacy procedure qualifications, and required when the AIA refuses to accept CR or DR images on a particular project. Almost every major piping spec written in the last five years authorizes CR — the holdouts are in regulated nuclear work and a few legacy refinery owner specs. Where we audit recurring problems is exposure technique. CR especially is forgiving on dose, and crews routinely overexpose to chase shorter shoot times, which collapses contrast and forces re-shoots when the IQI sensitivity check fails. The economic cliff: a typical Ir-192 isotope job at 100 Ci with a 12-hour exposure capacity costs roughly $1,200-1,800 per shift to mobilize when night work and area control are factored in. DR cuts that to roughly half on a per-shot basis once the detector is amortized over 6,000 exposures, but only if the crew is trained on dose-area-product optimization rather than maximum mA. The replacement narrative — "PAUT replaces RT" — collapses on porosity. Round volumetric flaws ring weakly in PAUT, and the area-based ASME UW-51 acceptance still favors a radiographic image where porosity is the dominant defect mechanism. Specify the method by mechanism, not by the salesperson presenting at the kickoff.',
  externalResources: [
    {
      label: 'NRC — Industrial Radiography (10 CFR Part 34)',
      url: 'https://www.nrc.gov/reading-rm/doc-collections/cfr/part034/',
    },
    {
      label: 'NRC — Standards for Protection Against Radiation (10 CFR Part 20)',
      url: 'https://www.nrc.gov/reading-rm/doc-collections/cfr/part020/',
    },
    {
      label: 'ASNT — Radiographic Testing Method',
      url: 'https://www.asnt.org/learn/the-nde-technician/ndt-methods/radiographic-testing',
    },
    {
      label: 'IAEA Safety Standards — Radiation Safety in Industrial Radiography (SSG-11)',
      url: 'https://www.iaea.org/publications/8511/radiation-safety-in-industrial-radiography',
    },
    {
      label: 'ASTM E1742 — Standard Practice for Radiographic Examination',
      url: 'https://www.astm.org/e1742-18.html',
    },
  ],
  faqs: [
    {
      q: 'When should I use Ir-192 versus Se-75 versus X-ray?',
      a: 'Practical thickness range governs source selection. X-ray (constant potential 200-300 kV) is the lowest-dose option for 6-50 mm carbon steel and the only practical choice when geometry forces a long exposure with the source close to people. Se-75 (320 keV mean) is the night-shift sweet spot for 5-30 mm — finer image quality than Ir-192 with lower shielding burden. Ir-192 (380 keV mean) handles 12-65 mm efficiently and is the workhorse for refinery work above ½ inch. Co-60 (1.25 MeV) is for thick sections above 60 mm — limited to nuclear and heavy fabrication because of its shielding demand.',
    },
    {
      q: 'What is the practical exposure time difference between film and DR?',
      a: 'For an Ir-192 source at 20 Ci shooting 25 mm carbon steel at 600 mm SFD, Class 2 film requires roughly 8-12 minutes per exposure to land in the 2.0-3.5 density window per ASME Section V Article 2 T-282. The same geometry on a CMOS DR panel acquires in 15-30 seconds at the same source strength, with image-quality verification by IQI in software. CR sits in between — typically 60-90 seconds for the same shot, with a 2-3 minute plate-scan cycle. The DR speed advantage compounds on crawler-based mainline pipeline work where setup time is the bottleneck rather than exposure.',
    },
    {
      q: 'How does the NRC license framework affect RT crew composition?',
      a: '10 CFR 34.42 requires every exposure be performed under the supervision of a Radiation Safety Officer and witnessed by an assistant — the "two-person rule" — except in narrowly defined Type B device situations. Practical crews run as Radiographer + Radiographer Assistant or two Radiographers, with the RSO available remotely. The Radiographer certification requires passing the NRC-recognized program (ASNT or equivalent) plus the company\'s written and field practical exam. Agreement States (Texas, Louisiana, California, and 38 others) administer equivalent regulations through state radiation control programs.',
    },
    {
      q: 'When is CT inspection worth the cost versus 2D radiography?',
      a: 'When the part justifies it and the defect is volumetric. Industrial CT for an aerospace turbine blade or a high-value casting reveals porosity distribution, wall thickness uniformity, and bonded-interface integrity that no 2D projection resolves. The economic cutover is roughly $20,000-50,000 per part scanned in a service bureau, falling to $5-15 per part in production CT for additive manufactured medical implants. For a typical pipe weld, CT is overkill — 2D RT or PAUT sized at fitness-for-service tolerances handles the defect population. CT enters the picture when the part has internal channels, complex geometry, or rejection cost above $10,000 per scrap.',
    },
  ],
  internalLinks: [
    {
      href: '/learn/iqi-selection-asme-v',
      label: 'IQI Selection under ASME Section V',
      context: 'Penetrameter type, thickness, and placement requirements per ASME V Article 2 T-276 — the most-cited finding in RT audits.',
    },
    {
      href: '/learn/film-density-troubleshooting',
      label: 'Film Density Troubleshooting',
      context: 'Common density failures (too light, too dark, mottled) traced back to development chemistry, exposure technique, or screen condition.',
    },
    {
      href: '/equipment/gammamat-tse-tu',
      label: 'GammaMat TSE/TU Exposure Devices',
      context: 'The dominant Ir-192 and Se-75 device family in field use — operational features and source-change procedure.',
    },
    {
      href: '/equipment/teledyne-dxr-250-detector',
      label: 'Teledyne DXR-250 Flat Panel',
      context: 'The mid-range industrial DR detector for portable field work — resolution, sensitivity, and dose performance.',
    },
    {
      href: '/standards/asme-section-v-article-2',
      label: 'ASME Section V Article 2 — Radiographic Examination',
      context: 'The full code article reference with sub-section maps and IQI tables.',
    },
    {
      href: '/case-studies/dr-replacement-of-film-rt-pipeline-spread',
      label: 'Case Study: DR Replacing Film on a Mainline Spread',
      context: 'A 240-mile gas line construction that replaced film with crawler DR — shot rate, rework rate, and overall schedule effect.',
    },
    {
      href: '/learn/area-control-and-survey-procedure',
      label: 'Area Control and Survey Procedure',
      context: 'The pre-shot survey, restricted area posting, and post-shot survey under 10 CFR 34.45 — the procedure inspectors audit first.',
    },
    {
      href: '/tools/rt-source-decay-calculator',
      label: 'Source Decay Calculator',
      context: 'Compute current source strength from the original certificate date and isotope half-life — required for accurate exposure planning.',
    },
  ],
  citations: [
    {
      id: 'asme-v-art-2',
      source: 'ASME BPVC Section V, 2023 ed., Article 2 — Radiographic Examination',
    },
    {
      id: 'nrc-10-cfr-34',
      source: 'U.S. NRC 10 CFR Part 34, Licenses for Industrial Radiography and Radiation Safety Requirements',
    },
    {
      id: 'nrc-10-cfr-20',
      source: 'U.S. NRC 10 CFR Part 20, Standards for Protection Against Radiation',
    },
    {
      id: 'astm-e1742',
      source: 'ASTM E1742/E1742M-18, Standard Practice for Radiographic Examination',
    },
    {
      id: 'asme-viii-uw-51',
      source: 'ASME BPVC Section VIII Div. 1, 2023 ed., UW-51 — Radiographic Examination',
    },
  ],
};

export default pillar;
