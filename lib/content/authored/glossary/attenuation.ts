import type { GlossaryLongFormContent } from '../types';

const term: GlossaryLongFormContent = {
  slug: 'attenuation',
  term: 'Attenuation',
  category: 'Ultrasonic Testing',
  metaTitle: 'Attenuation in Ultrasonic Testing: Causes, Units, and dB/mm Values',
  metaDescription:
    'Attenuation is the loss of UT signal strength with distance. Learn dB/mm values for steel, austenitic welds, and composites — plus how to compensate via TCG, DAC, and DGS.',
  heroLede:
    'Attenuation is the progressive loss of ultrasonic signal amplitude as the wave propagates through a material, expressed in decibels per millimetre (dB/mm) or nepers per metre. Every UT inspector compensates for it daily — through DAC curves, time-corrected gain, DGS sizing, and gain offsets between calibration block and component. Ignoring attenuation gives undersized flaws and missed back-wall echoes.',
  preciseDefinition:
    'Attenuation is the loss of acoustic energy per unit distance travelled in a material, caused by absorption, scattering, and beam divergence, quantified in dB/mm or dB/m at a stated frequency.[1]',
  alternateNames: ['Sound attenuation', 'Ultrasonic damping', 'Acoustic absorption coefficient', 'Material damping'],
  history:
    'The attenuation coefficient α as used in NDT was formalised by Krautkrämer and Krautkrämer in Ultrasonic Testing of Materials (1958), where it is decomposed into absorption (true energy conversion to heat) and scattering (re-radiation by grain boundaries). The unit dB/m, borrowed from telecommunications, was adopted by ASTM E317 in the early 1970s as the standard for instrument and material characterisation.',
  technicalDetail: [
    {
      heading: 'Sources of attenuation',
      level: 2,
      paragraphs: [
        'Absorption converts mechanical energy directly to heat through internal friction. It scales linearly with frequency in homogeneous metals and dominates in viscoelastic materials like polymers and rubber. For carbon steel longitudinal waves, absorption is small — a few hundredths of a dB per mm at 5 MHz.',
        'Scattering arises when wavelength approaches grain size. The wave reflects diffusely off grain boundaries and second-phase particles, converting forward energy into incoherent backscatter (the "grass" on the A-scan baseline). Scattering scales with the cube of frequency in Rayleigh regime (grain ≪ λ) and with the first power in stochastic regime (grain ≈ λ). Austenitic stainless welds with elongated columnar grains are the canonical worst case — 0.4-1.2 dB/mm at 5 MHz.[2]',
        'Beam divergence is geometric, not material — energy spreads over a wider area as the wave travels, reducing on-axis amplitude. DAC and DGS curves bake this in. Strictly, "true attenuation" excludes divergence; in practice many field measurements lump both.',
      ],
    },
    {
      heading: 'Typical α values at 5 MHz (one-way)',
      level: 2,
      paragraphs: [
        'Wrought carbon steel: 0.005-0.02 dB/mm. Forged or normalised, fine-grain — the workhorse material UT was developed for. A 50 mm wall absorbs barely 1 dB round-trip.',
        'Wrought low-alloy steel: 0.01-0.04 dB/mm. Slightly higher than carbon due to alloying and heavier grain.',
        'Austenitic stainless cladding (welded): 0.4-1.2 dB/mm. Coarse columnar grains scatter and skew the beam — UT through clad welds is famously unreliable below 2.25 MHz, and PAUT TFM with dual-matrix arrays is often the only viable technique.[3]',
        'Cast iron: 0.1-0.5 dB/mm. Graphite flakes are huge scatterers.',
        'Aluminium (wrought): 0.005-0.02 dB/mm. Comparable to steel.',
        'CFRP composite (through-thickness): 0.05-0.3 dB/mm at 5 MHz, anisotropic — much higher across plies than along fibres.',
        'Polymers (HDPE, PVC): 0.5-5 dB/mm. UT on plastic pipe runs at 1-2.25 MHz to manage attenuation.',
      ],
    },
    {
      heading: 'Compensating for attenuation in inspection',
      level: 2,
      paragraphs: [
        'Transfer correction (also called transfer loss): the difference in attenuation between the calibration block and the actual component. Measured by comparing back-wall amplitudes of equal-thickness paths on cal block vs. component, then offsetting gain by the difference. ASME V T-462.4 requires the technician to document this offset on every record. A typical transfer correction is 2-6 dB.',
        'DAC and DGS curves: built-in attenuation compensation. The DAC is drawn from reference reflectors at multiple depths in a cal block, so its slope already includes block attenuation plus divergence. DGS curves separate divergence (geometry) from attenuation (material), letting the operator dial in α for the specific component.',
        'Frequency selection: dropping from 5 MHz to 2.25 MHz reduces scattering attenuation by roughly an order of magnitude in coarse-grain materials, at the cost of lateral resolution. This is the standard move for austenitic and Inconel welds.',
        'TCG (time-corrected gain) on digital flaw detectors applies a programmable gain ramp with depth, automatically compensating both divergence and attenuation. Required per ASME V Article 4 Mandatory Appendix VIII for digital instruments doing distance-amplitude techniques.',
      ],
    },
  ],
  workedExample: {
    setup:
      'Pulse-echo UT on a 150 mm thick austenitic stainless steel weld with 5 MHz angle-beam probe. Measured material attenuation α = 0.6 dB/mm (one-way). Calibration on V1 carbon-steel block, α ≈ 0.01 dB/mm.',
    calculation:
      'Round-trip path through the component back-wall = 2 × 150 mm = 300 mm. Total attenuation loss = 300 mm × 0.6 dB/mm = 180 dB. The same path in carbon steel cal block would lose only 300 × 0.01 = 3 dB. Difference = 177 dB — clearly impossible to compensate with gain alone (most flaw detectors max around 100-110 dB).',
    result:
      'Conventional UT at 5 MHz is infeasible. Action: drop frequency to 2.25 MHz (reduces α by ~4×, to ~0.15 dB/mm one-way, total round-trip loss ~45 dB — recoverable); use DGS sizing with explicit α-correction; or switch to PAUT dual-matrix TFM, which handles coarse-grain austenitic welds at frequencies down to 1.5 MHz with acceptable noise floor.',
  },
  whereItAppears: [
    {
      context: 'Refinery hydrocracker reactor weld inspection',
      explanation:
        'The 2.25 Cr–1 Mo–V vessel has stainless cladding over a low-alloy backing wall. Inspectors at the construction stage do conventional UT on the backing wall (low attenuation), but in-service inspection through cladding requires PAUT dual-matrix or TOFD at 2 MHz with custom DGS curves that account for the cladding\'s 0.7 dB/mm attenuation. Ignoring this gives a 20-30 dB sensitivity loss and routinely misses near-clad cracks.',
    },
    {
      context: 'CMM-driven thickness gauging on heat exchanger tube bundle',
      explanation:
        'Eddyfi/Olympus tube inspection probes encounter increasing attenuation as deposit thickness on the OD grows. The thickness gauge\'s internal TCG ramp compensates only the steel attenuation; operators add a transfer-correction gain offset (measured on a clean reference tube) to keep back-wall echoes above 80% FSH along the full tube length.',
    },
    {
      context: 'Composite bond inspection on aircraft control surface',
      explanation:
        'A 5 MHz immersion probe scanning a CFRP-aluminium honeycomb panel sees through-thickness attenuation of 0.2-0.3 dB/mm in the skin. To get a back-wall echo through 8 mm of skin plus core, the operator runs at 2.25 MHz and increases gain by ~12 dB above the cal-block reference. Without the gain bump, debonds at the far skin appear as false losses driven by attenuation, not flaws.',
    },
  ],
  relatedTerms: [
    { term: 'A-Scan', slug: 'a-scan' },
    { term: 'DAC Curve', slug: 'dac-curve' },
    { term: 'Calibration Block', slug: 'calibration-block' },
    { term: 'Couplant', slug: 'couplant' },
  ],
  faqs: [
    {
      q: 'Why does attenuation matter more in austenitic stainless steel welds than in carbon steel?',
      a: 'Austenitic welds solidify with coarse columnar grains running roughly perpendicular to the weld surface. These grains can be several millimetres across and strongly anisotropic — the longitudinal sound velocity differs across vs. along the grain, so the beam refracts and scatters at every grain boundary. At 5 MHz the wavelength in steel is ~1.2 mm, comparable to grain size, putting attenuation in the stochastic-to-diffuse regime where loss can reach 1 dB per millimetre one-way. The same 5 MHz beam through fine-grained carbon steel loses ~0.01 dB/mm — two orders of magnitude less. This is why austenitic weld UT is performed at 1.5-2.25 MHz with low-frequency angle probes or dual-matrix PAUT arrays designed for clad and dissimilar-metal joints.',
    },
    {
      q: 'How is transfer correction measured and applied?',
      a: 'Place a normal-incidence probe on the calibration block, record the back-wall echo amplitude in dB. Move to the component at the same path length (or as close as practical) and record the back-wall again. The difference is transfer loss — typically 2-6 dB for industrial steels. Add this difference as a gain offset before scanning so reflectors in the component give the same response as equivalent reflectors in the block. ASME V Article 4 T-462.4 requires this measurement and its documentation on every inspection record. Practical tip: take at least three transfer-loss readings across the component (start, middle, end) and use the worst case; surface roughness and acoustic coupling vary between locations.',
    },
    {
      q: 'Can attenuation be measured directly during a UT inspection?',
      a: 'Yes. The simplest method is the back-wall echo decay technique on parallel-walled material: measure successive back-wall echoes B1, B2, B3 (the first, second, third multiple). The dB ratio (B1−B2)/path = the round-trip attenuation per unit distance. Subtract divergence (calculable from beam geometry) for the true material α. ASTM E664 specifies the procedure and acceptance ranges. Modern flaw detectors with DGS can fit α automatically from a single back-wall amplitude vs. an analytical reference curve. Material acceptance specifications for forgings (AMS 2630, EN 10228-3) often quote a maximum allowed back-wall loss in dB across the thickness — a practical attenuation cap that prevents acceptance of overly coarse-grain material.',
    },
    {
      q: 'Does increasing frequency always improve inspection sensitivity?',
      a: 'No — higher frequency improves spatial resolution and near-surface flaw detection but increases scattering attenuation roughly with f or f³ depending on grain regime. In wrought carbon steel where attenuation is low, 5-10 MHz is the sweet spot. In coarse-grain stainless, Inconel, or thick cast material, going from 5 to 10 MHz can wipe out the back-wall echo entirely — there is no signal left to interpret. Practical rule: start at the highest frequency that still gives a back-wall echo at least 30 dB above the noise floor on the actual component (not just the cal block). For most field UT this is 2.25 MHz on austenitic and 5 MHz on carbon steel; aerospace immersion work routinely runs 10-15 MHz on fine-grain alloys.',
    },
  ],
  internalLinks: [
    {
      href: '/services/ultrasonic-testing',
      label: 'Ultrasonic Testing',
      context: 'Attenuation governs sensitivity setup and frequency choice for every UT inspection',
    },
    {
      href: '/services/phased-array-ut',
      label: 'Phased Array UT',
      context: 'PAUT dual-matrix arrays manage attenuation in coarse-grain austenitic welds',
    },
    {
      href: '/services/tofd-testing',
      label: 'TOFD',
      context: 'TOFD signals are weaker than pulse-echo — attenuation budgeting is critical',
    },
    {
      href: '/glossary/dac-curve',
      label: 'DAC curve',
      context: 'DAC compensates for the combined effect of beam spread and attenuation',
    },
    {
      href: '/glossary/a-scan',
      label: 'A-scan',
      context: 'Attenuation manifests as falling echo amplitude with depth on the A-scan',
    },
    {
      href: '/glossary/calibration-block',
      label: 'calibration block',
      context: 'Transfer correction quantifies the attenuation gap between block and component',
    },
    {
      href: '/standards/asme-bpvc-section-v',
      label: 'ASME BPVC Section V',
      context: 'Article 4 T-462.4 mandates transfer correction documentation',
    },
    {
      href: '/free-tools/ai-procedure-generator',
      label: 'AI procedure generator',
      context: 'Generate UT procedures that specify attenuation measurement and compensation steps',
    },
    {
      href: '/industries/oil-and-gas',
      label: 'oil and gas refining',
      context: 'Hydroprocessing reactor inspections push UT against the attenuation limits of clad walls',
    },
  ],
  citations: [
    {
      id: 'astm-e664',
      source: 'ASTM E664/E664M-22, Standard Practice for Measurement of the Apparent Attenuation of Longitudinal Ultrasonic Waves',
      url: 'https://www.astm.org/e0664_e0664m-22.html',
    },
    {
      id: 'krautkramer',
      source: 'Krautkrämer, J. & Krautkrämer, H., Ultrasonic Testing of Materials, 4th ed., Springer-Verlag, 1990, Chapter 6 — Attenuation in solids',
    },
    {
      id: 'iso-22232-1',
      source: 'ISO 22232-1:2020, NDT — Characterisation and verification of ultrasonic test equipment — Instruments',
    },
    {
      id: 'asme-v-t462',
      source: 'ASME BPVC Section V, 2023 Edition, Article 4, T-462.4 — Transfer correction',
    },
    {
      id: 'astm-e1316-att',
      source: 'ASTM E1316-23, Standard Terminology for Nondestructive Examinations — Attenuation, attenuation coefficient',
    },
  ],
};

export default term;
