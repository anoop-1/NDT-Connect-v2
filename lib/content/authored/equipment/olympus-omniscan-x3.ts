import type { EquipmentContent } from '../types';

const equipment: EquipmentContent = {
  slug: 'olympus-omniscan-x3',
  make: 'Olympus (Evident)',
  model: 'OmniScan X3',
  category: 'phased-array',
  metaTitle: 'Olympus OmniScan X3 Review: 32/64-Channel PAUT & TFM',
  metaDescription:
    'OmniScan X3 64 review — 32:128 / 64:128 PA channels, native Total Focusing Method (TFM), TOFD, AWS D1.5, ~$60-90k. Real specs, honest limits.',
  heroLede:
    'The OmniScan X3 (and the bigger X3 64) is Evident\'s flagship portable phased-array flaw detector and the most-specified PA box on Gulf Coast refinery turnaround work since launch in 2019. The headline feature versus the older OmniScan MX2 is native Total Focusing Method (TFM) and Plane Wave Imaging — Full Matrix Capture data acquired and reconstructed in real time, not a post-processing afterthought. With 32:128 (X3) or 64:128 (X3 64) channel architecture, native TOFD, and AWS D1.1 / D1.5 / ASME V Article 4 weld-coverage software, this is the box you spec when a single instrument has to cover code-compliant PA weld inspection, corrosion mapping, and forensic TFM in one shift [1].',
  msrpUSD: 75000,
  rentalPerWeekUSD: 2400,
  specs: {
    caption: 'Olympus OmniScan X3 64 — key specs (manufacturer datasheet, 2023) [1]',
    headers: ['Parameter', 'Value'],
    rows: [
      ['PA channels (X3 / X3 64)', '32:128 / 64:128 parallel'],
      ['UT (conventional) channels', '2 (TOFD or pulse-echo)'],
      ['Imaging modes', 'A-scan, S-scan, L-scan, C-scan, TFM, PWI (Plane Wave)'],
      ['Pulser voltage', '40 – 115 V (bipolar)'],
      ['Frequency range', '0.2 – 25 MHz (–3 dB)'],
      ['Display', '10.4 in (264 mm) sunlight-readable touchscreen, 1024 × 768'],
      ['PRF (max)', '20 kHz effective'],
      ['Weight', '5.5 kg (12.1 lb) with battery'],
      ['IP rating', 'IP65 dust/water'],
      ['Battery life', '~8 hr typical (Li-ion, hot-swap)'],
      ['Operating temperature', '–10 °C to +45 °C'],
      ['Storage', '64 GB SSD + SD card + USB 3.0'],
      ['Connectivity', 'WiFi, Ethernet (Gigabit), USB 3.0, HDMI'],
      ['Encoder inputs', '2-axis quadrature'],
      ['Software', 'OmniPC, WeldSight, AWS D1.1/D1.5/ASME V codes built in'],
    ],
  },
  pros: [
    'Native real-time TFM with up to 4 envelopes simultaneously — competitors typically reconstruct TFM offline; X3 shows it live on screen during scan.',
    'Code-compliant AWS D1.1/D1.5 PA weld inspection software with auto-generated reports — saves 30-45 min per weld vs manual spreadsheet workflow.',
    'TOFD on the same box, same probes if you have the dual-element setup — no separate TOFD instrument required.',
    'WeldSight cloud-sync allows scan data to push from site to office reviewer within minutes — major productivity win for remote turnarounds.',
    '10.4 in touchscreen is genuinely usable outdoors with gloves on (transflective, 800 nits) — most competitors at this size are indoor-readable only.',
    'Resale value holds up: 3-year-old X3 64 units trade at 65-75% of new MSRP — top of category.',
  ],
  cons: [
    'Sticker price: $60k-$90k delivered depending on PA channel count, software, probes, and scanner accessories. PA wedge and probe kit alone is $8k-$15k.',
    'Weight: 5.5 kg with battery is awkward for hours of manual scanning — most field crews use a chest harness or scan trolley.',
    'Battery life of ~8 hr is shorter than the conventional EPOCH 650 (15.5 hr) — plan two batteries minimum for a 12-hour shift.',
    'Software licensing model: AWS D1.5, ASME V, and TFM are unlocked separately — be careful at quote time. Full unlock can add $15k.',
    'Steep learning curve: a Level II PA tech needs 40+ hours of bench training before running production scans on X3 vs ~8 hr for EPOCH 650.',
    'Service turnaround if it goes down: typically 3-4 weeks to Evident service center — keep a backup unit on critical project schedules.',
  ],
  bestFor: [
    'Refinery turnaround weld inspection where one tech must cover code-compliant PA scans on 80-200 welds per shift with AWS or ASME V acceptance criteria.',
    'Pipeline girth-weld inspection with encoded PA C-scans for fitness-for-service documentation and ILI correlation.',
    'Forensic TFM examination of suspect indications — small sub-surface fatigue cracks or HIC where conventional PA undercalls.',
    'High-volume corrosion mapping on pressure-vessel shells using encoded PA C-scan with linear scanner attachments.',
  ],
  notIdealFor: [
    'Quick single-spot thickness checks on tank shells — overkill, use a pocket thickness gauge.',
    'Operations where total instrument budget is under $40k — the conventional EPOCH 650 or USM Go+ is the right starting point.',
    'High-temperature scanning above 150 °C — needs HT probes and the X3 baseline software is not optimized for HT correction.',
    'Field operations with no power for 12+ hours and no charger access — battery life is the binding constraint.',
  ],
  alternatives: [
    { make: 'Zetec', model: 'Topaz PA', reason: '32:128 PA with strong TOFD imaging and slightly lighter form factor (~4.5 kg). Less polished UI than X3 but lower entry price (~$55k).' },
    { make: 'Sonatest', model: 'Veo+', reason: '16:64 or 32:128 PA + conventional UT in one box at $28-45k street — best value for mid-volume PA shops not needing native TFM.' },
    { make: 'Baker Hughes / Waygate', model: 'Mentor UT (Phasor-class PA)', reason: 'Compact 16-channel PA with cloud-first workflow integration — best for IoT-style inspection programs.' },
  ],
  certificationCompatibility: [
    'ASME BPVC Section V, Article 4 — UT including PA (Mandatory Appendix IV) and TOFD (Mandatory Appendix III)',
    'ASME B31.3 — process piping inspection requirements',
    'AWS D1.1/D1.5 — structural / bridge welding code, PA-specific Annex K',
    'API 1104 — pipeline girth weld inspection (PA + AUT)',
    'EN ISO 13588 — UT of welds using PA techniques',
    'EN ISO 10863 — TOFD of welds',
    'ASTM E2700 — practice for contact UT testing using PA',
    'ASTM E2491 — guide for evaluating PA instrument performance',
  ],
  faqs: [
    {
      q: 'Is the OmniScan X3 64 worth the price premium over the X3 32?',
      a: 'If you regularly scan welds thicker than 50 mm or you do large-area encoded C-scans where wider aperture matters, the 64:128 channel architecture pays back fast — you cover more elements per shot and get cleaner image reconstruction at depth. For weld thicknesses under 25 mm and standard groove geometries, the X3 32 is plenty. The price delta is roughly $20k between the two ($60k vs $80k typical street), and the 64 also takes longer scan files. Most refinery contractors run X3 64 fleets because of the flexibility on thick-wall vessel work; offshore subsea contractors often spec X3 32 for weight and battery reasons [1].',
    },
    {
      q: 'What does real-time TFM on the X3 actually do that I cannot do on an older OmniScan MX2?',
      a: 'TFM (Total Focusing Method) reconstructs every pixel in the imaged region using the full set of Full Matrix Capture (FMC) data — every transmitter-receiver pair. The MX2 could acquire FMC but reconstruction was offline (OmniPC, minutes per scan). The X3 reconstructs TFM live on the instrument at scan speed. Practical effect: a tech can spot a 1.5 mm sub-surface crack indication, adjust the wave-mode (LL, TT, LT-LT) on the fly, and confirm whether it is a real crack or geometric reflector before leaving the weld. That iteration loop, which used to take an hour back at the office, now happens on the scaffold in 90 seconds [1].',
    },
    {
      q: 'Does the X3 do TOFD, or do I need a separate TOFD instrument?',
      a: 'Yes, the X3 has 2 conventional UT channels that drive a pair of TOFD probes (pitch-catch) and reconstruct the parallel-scan TOFD B-scan natively, with lateral wave and back-wall tracking, per EN ISO 10863. You can run TOFD + PA simultaneously on a single encoded weld scan, which is the standard ASME V Article 4 Appendix III + Mandatory Appendix IV combined coverage scope. The TOFD probe kit and wedges are sold separately (~$3.5k for a 5 MHz pair plus wedges). Most refinery turnaround scopes spec PA+TOFD combined, so this is a real workflow win versus carrying two instruments [2][3].',
    },
    {
      q: 'How long does it take to certify a Level II PAUT technician on the OmniScan X3?',
      a: 'For an inspector already Level II conventional UT, the typical PA add-on certification path is 80 hours of formal training (40 classroom + 40 practical), 1,200 hours of documented PA experience, plus written and practical exams per SNT-TC-1A or CP-189. Most reputable schools (e.g. Lavender International, MISTRAS Academy) offer a 5-day intensive OmniScan-specific course at $3,500-$4,500. Plan on 6-12 months from first day of training to fully signed-off PA Level II depending on how much production scan time you can get. The X3 UI is more intuitive than the MX2, but the underlying physics knowledge requirement does not change [4].',
    },
  ],
  internalLinks: [
    { href: '/methods/phased-array-ultrasonic-testing', label: 'Phased array UT method guide', context: 'How PA works and when to spec it; the X3 is the reference instrument for the method.' },
    { href: '/methods/tofd', label: 'TOFD method overview', context: 'The OmniScan X3 runs PA and TOFD on the same encoder pass.' },
    { href: '/equipment/olympus-epoch-650', label: 'Olympus EPOCH 650', context: 'When you do not need PA, the conventional EPOCH 650 is half the price.' },
    { href: '/equipment/zetec-topaz-pa', label: 'Zetec Topaz PA', context: 'Closest direct competitor to the X3 — lighter, slightly cheaper, less polished TFM.' },
    { href: '/equipment/sonatest-veo-plus', label: 'Sonatest Veo+ review', context: 'Mid-budget alternative for shops not needing native TFM.' },
    { href: '/standards/asme-bpvc-section-v', label: 'ASME BPVC Section V', context: 'The X3 is compliant with Article 4 Mandatory Appendix IV (PA) and III (TOFD).' },
    { href: '/standards/api-1104', label: 'API 1104 pipeline welding', context: 'PA + AUT pipeline girth weld inspection per API 1104 Annex E.' },
    { href: '/learn/paut-scan-plan', label: 'Writing a PAUT scan plan', context: 'Scan-plan template tested against OmniScan X3 software requirements.' },
    { href: '/methods/ultrasonic-testing', label: 'Ultrasonic testing overview', context: 'Foundational UT concepts before stepping up to PA on the X3.' },
  ],
  citations: [
    { id: 'olympus-omniscan-x3-datasheet', source: 'Evident (Olympus), OmniScan X3 / X3 64 Phased Array Flaw Detector datasheet, Rev. 2023-09', url: 'https://www.olympus-ims.com/en/omniscan-x3/' },
    { id: 'asme-v-art-4-app-iv', source: 'ASME BPVC Section V, Article 4, Mandatory Appendix IV (2023), Phased Array UT' },
    { id: 'iso-13588', source: 'EN ISO 13588:2019, Non-destructive testing of welds — Ultrasonic testing — Use of automated phased array technology' },
    { id: 'snt-tc-1a', source: 'ASNT SNT-TC-1A (2020), Recommended Practice for Personnel Qualification and Certification in Nondestructive Testing' },
    { id: 'iso-10863', source: 'EN ISO 10863:2020, Non-destructive testing of welds — Ultrasonic testing — Use of time-of-flight diffraction technique (TOFD)' },
  ],
};

export default equipment;
