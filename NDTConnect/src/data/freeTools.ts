// src/data/freeTools.ts
// Single source of truth for the 3 free-tool features. Adding a 4th feature
// here will automatically generate a feature landing page and one city page
// per city in cities.ts. Keep this file alphabetised by slug.

export type FreeToolSlug =
  | "calibration-tracking"
  | "certificate-management"
  | "equipment-management";

export interface FreeTool {
  slug: FreeToolSlug;
  // Headline name used in H1s.
  name: string;
  // Short noun used in body copy ("the equipment registry", etc.).
  shortName: string;
  // ≤ 60 chars title prefix. The city/region suffix is appended at render.
  titlePrefix: string;
  // ≤ 155 char meta description prefix. The city/region intro is appended.
  metaDescriptionPrefix: string;
  // 5 feature bullets used on the feature page and the city page.
  features: string[];
  // 4 named use-cases used on the feature and city pages.
  useCases: { title: string; body: string }[];
  // 6 evergreen FAQ items rendered as schema=FAQPage on the feature page.
  faqs: { q: string; a: string }[];
  // Path on the existing auth-gated tool, used in CTAs.
  appPath: string;
  // Schema-org SoftwareApplication category.
  schemaCategory: string;
}

export const FREE_TOOLS: FreeTool[] = [
  {
    slug: "equipment-management",
    name: "Equipment Management",
    shortName: "the equipment registry",
    titlePrefix: "Free NDT Equipment Management Software",
    metaDescriptionPrefix:
      "Free registry for ultrasonic flaw detectors, RT sources, MT yokes, PT kits, ET instruments. Track serials, calibration due-dates, status. User ID only.",
    features: [
      "Equipment registry with serial numbers, manufacturer, model, status — covers UT, RT, MT, PT, ET, VT, hardness, borescope, and reference-block hardware.",
      "Calibration due-date tracking on every instrument, with status badges (Active, In Calibration, Out of Service, Retired).",
      "Notes field per instrument — log repair history, customer-specific qualifications, and on-job assignments.",
      "Export the full equipment register for client audits and pre-job submissions.",
      "Cross-link instruments to live calibration alerts so a single change propagates to your scheduling.",
    ],
    useCases: [
      {
        title: "Refinery turnaround mobilisation",
        body: "Compile a 60-instrument equipment list with current calibration status in 10 minutes for an API 510/570/653 turnaround pre-job submission.",
      },
      {
        title: "Offshore platform pre-job package",
        body: "Auto-generate a status report of every UT/RT/MT instrument due to ship to the platform, including calibration certificates and OEM authorisations.",
      },
      {
        title: "Multi-site visibility",
        body: "See which instruments are at which job site, which are in calibration, and which are coming up for renewal — all from one screen.",
      },
      {
        title: "Audit-ready instrument history",
        body: "Maintain a permanent record of every calibration event, repair, and assignment for ASME / ISO 17025 / customer audit traceability.",
      },
    ],
    faqs: [
      { q: "Is the equipment management tool really free?", a: "Yes. Create a user ID and the equipment registry is fully usable. There is no card-on-file requirement, no trial expiry, and no per-instrument fee." },
      { q: "How many instruments can I track?", a: "There is no hard cap. Larger inspection companies running 200+ instruments use the same tool as solo Level III consultants tracking a single UT-1." },
      { q: "Does this replace my existing calibration certificates?", a: "No. The tool tracks the metadata (serial, due-date, status, location) and links each instrument to its source-of-truth calibration certificate. We do not generate the certificates themselves." },
      { q: "Can I export to Excel or PDF?", a: "Yes. The full registry exports to CSV for Excel; per-instrument records export to PDF for client packages." },
      { q: "Is data stored in the cloud or locally?", a: "Today, equipment data is stored locally in your browser (localStorage) so it never leaves your machine. Cloud-sync is on the roadmap and will remain optional and free for the basic tier." },
      { q: "What instrument types are supported?", a: "Ultrasonic flaw detector, ultrasonic thickness gauge, phased array, TOFD, Ir-192 / Co-60 sources, X-ray generator, magnetic yoke, MT bench, PT kit, eddy current, borescope, hardness tester, calibration blocks (V1/V2/IIW), step wedge, densitometer, light meter, UV-A meter, thermometer, and more." },
    ],
    appPath: "/provider-dashboard/equipment",
    schemaCategory: "BusinessApplication",
  },
  {
    slug: "calibration-tracking",
    name: "Calibration Tracking",
    shortName: "the calibration tracker",
    titlePrefix: "Free NDT Calibration Tracking & Alerts",
    metaDescriptionPrefix:
      "Never miss a calibration due-date again. Free alerts 30 / 60 / 90 days before expiry for every UT, RT, MT, PT, ET instrument. User ID only.",
    features: [
      "Email alerts at 7, 14, 30, 60, or 90 days before any calibration due-date.",
      "One alert rule per instrument or one master rule across the fleet — your choice.",
      "Multiple recipient emails per alert (lab manager + Level III + scheduler).",
      "Status dashboard: Valid (green), Expiring Soon (amber), Expired (red).",
      "Auto-tied to the equipment registry — change a due-date once, every alert updates.",
    ],
    useCases: [
      {
        title: "Avoid the audit-day surprise",
        body: "Catch an out-of-cal UT-1 60 days out — not the night before mobilisation, when calibration labs are booked four weeks ahead.",
      },
      {
        title: "Lab capacity planning",
        body: "See your next-90-day calibration pipeline at a glance and pre-book lab slots before competitors squeeze your turnaround.",
      },
      {
        title: "Multi-site lead notification",
        body: "Route the alert to the regional Level III responsible for each instrument, not a central inbox that gets ignored.",
      },
      {
        title: "Client-confidence reporting",
        body: "Show prospective customers a live dashboard of zero expired instruments — a closing differentiator on bids.",
      },
    ],
    faqs: [
      { q: "How do alerts get delivered?", a: "By email, today. The alert engine fires the configured day-window before the due-date and sends to all configured recipients." },
      { q: "Can I integrate with my calendar?", a: "Calendar (.ics) export is on the roadmap. Today, alerts are email-only." },
      { q: "What happens after expiry?", a: "The instrument flips to Expired (red) status in the dashboard and the alert continues firing daily until the due-date is updated to a new calibration record." },
      { q: "Is there a fee per alert?", a: "No. Alerts are unlimited and free." },
      { q: "Can I disable alerts on a single instrument?", a: "Yes. Use the alert toggle on the calibration page for any instrument." },
      { q: "Will the tool email me when an instrument is calibrated?", a: "On the roadmap. Today, you record the new calibration date manually and the next alert window starts from that date." },
    ],
    appPath: "/provider-dashboard/calibration",
    schemaCategory: "BusinessApplication",
  },
  {
    slug: "certificate-management",
    name: "Certificate Management",
    shortName: "the certificate vault",
    titlePrefix: "Free Certificate Tracking — Manpower & Company Certs",
    metaDescriptionPrefix:
      "Free tracking for ASNT SNT-TC-1A, ISO 9712, ISO 17025, and OEM certifications. Personnel + company certs in one dashboard. User ID only.",
    features: [
      "Personnel qualifications (manpower) — ASNT SNT-TC-1A and ISO 9712 Level I / II / III for UT, RT, MT, PT, ET, VT.",
      "Company certifications — ISO 9712 procedure, ISO 17025 lab accreditation, OEM authorisations, customer-specific qualifications.",
      "Expiry status: Valid, Expiring (within 30 days), Expired — colour-coded in one view.",
      "Per-person and per-cert detail with renewal dates, exam dates, and audit notes.",
      "Filter by method, by expiry window, by Level — answer 'who's qualified for this job' in seconds.",
    ],
    useCases: [
      {
        title: "Pre-bid manpower validation",
        body: "Confirm in 30 seconds that you have N qualified Level II UT operators with valid certs before bidding on a turnaround.",
      },
      {
        title: "Customer audit pack",
        body: "Generate a current-status export of all personnel and company certs for an oil-major prequalification audit.",
      },
      {
        title: "Renewal forecast",
        body: "See the 90-day renewal pipeline so you can pre-schedule recerts and avoid losing billable hours to expired techs.",
      },
      {
        title: "Lost-bid root-cause",
        body: "Track which qualifications you lacked when you missed a tender — and prioritise the recert spend that closes that gap.",
      },
    ],
    faqs: [
      { q: "Do I have to upload the certificate scans?", a: "No. The tool tracks the metadata (cert type, level, method, issuing body, issue date, expiry date). You can attach a scan if you want, but it isn't required." },
      { q: "Are personnel and company certs in the same view?", a: "They share a single dashboard but are filtered separately. You see totals across both, then drill down by tab." },
      { q: "Does the tool email cert holders directly?", a: "Today, alerts route to the account owner. Per-tech notification is on the roadmap." },
      { q: "Can I track training-only records (not certs)?", a: "Yes — record any qualification with an issue and expiry date. Many users track customer-specific training (e.g. site-specific safety) alongside ASNT certs." },
      { q: "What happens to my data if I cancel?", a: "There's nothing to cancel — there's no paid tier on this tool. Your data lives in your account until you delete the account." },
      { q: "Is this connected to ASNT or ISO databases?", a: "No. It is a private record-keeping tool for your company. Sharing with auditors is via export." },
    ],
    appPath: "/provider-dashboard/certifications",
    schemaCategory: "BusinessApplication",
  },
];

export const findFreeTool = (slug: string): FreeTool | undefined =>
  FREE_TOOLS.find(t => t.slug === slug);
