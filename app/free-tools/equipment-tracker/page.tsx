// src/app/free-tools/equipment-tracker/page.tsx
// Free NDT Equipment Tracker — UT machines, RT cameras/sources, MT yokes,
// PT kits, calibration blocks, probes. Server component, SEO-optimised.

import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/free-tools/StructuredData";
import { BreadcrumbListSchema } from "@/components/seo/SchemaMarkup";

const SITE = "https://ndt-connect.com";
const URL = `${SITE}/free-tools/equipment-tracker`;

const TITLE =
  "Free NDT Equipment Tracking & Asset Management — UT, RT, MT, PT Inventory";
const DESCRIPTION =
  "Free NDT shop inventory tool. Track UT machines, RT cameras and Ir-192/Co-60 sources, MT yokes, PT kits, calibration blocks and probes. Serial #, last cal, next cal, location, custodian.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "NDT Connect",
    type: "website",
    images: [`${SITE}/og/free-tools-equipment-tracker.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free NDT Equipment Tracking",
    description:
      "Track UT, RT, MT, PT instruments, cal blocks and probes. Serial, location, custodian, next cal due.",
    images: [`${SITE}/og/free-tools-equipment-tracker.png`],
  },
  keywords: [
    "free ndt equipment tracking",
    "ut probe inventory software",
    "ndt asset management tool",
    "rt camera tracking",
    "calibration block register",
    "ndt shop inventory",
  ],
};

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What equipment categories are supported?",
    a: "Ultrasonic flaw detectors, ultrasonic thickness gauges, phased-array (PAUT) units, TOFD scanners, Ir-192 and Co-60 gamma sources and projectors, X-ray generators (constant potential and pulsed), magnetic-particle yokes and benches, PT (penetrant) kits, eddy-current instruments, borescopes, hardness testers, all UT probes (straight beam, angle beam, dual-element, immersion, PA arrays), V1/V2/IIW calibration blocks, step wedges, IQIs, densitometers, light meters, UV-A meters and reference standards.",
  },
  {
    q: "What metadata is tracked per item?",
    a: "Serial number, manufacturer, model, equipment category, asset tag, current location, custodian (assigned technician), status (Active, In Calibration, Out of Service, Retired, On Loan), last calibration date, next calibration due date, calibration certificate reference, purchase date, OEM repair history, customer-specific qualifications, and free-form notes for repair logs and on-job assignments.",
  },
  {
    q: "Is this really free or is there a per-item fee?",
    a: "Free, with no per-item fee and no instrument cap. Solo Level III consultants tracking a single UT-1 use the same tool as inspection houses tracking 200+ UT, RT and PA assets across multiple branches.",
  },
  {
    q: "Can I export the register for client pre-job submissions?",
    a: "Yes. Export the full register to CSV for Excel, or generate a per-asset PDF (current calibration status, certificate reference, custodian) for an oil-major pre-job package or an API 510/570/653 turnaround mobilisation pack.",
  },
  {
    q: "How is this different from the calibration reminder tool?",
    a: "The equipment tracker is the asset register — every UT probe, RT camera and cal block in one place. The calibration reminder layers on the alerts (90/60/30/7-day email and SMS) and the renewal forecast. Use both together: the tracker tells you what you own, the reminder tells you when to renew it.",
  },
  {
    q: "Can multiple shop locations or branches share one register?",
    a: "Yes. Tag every asset with a location (e.g. Houston, Aberdeen, Edmonton). Filter by location, by custodian or by status. Move an asset between branches and the history is preserved with timestamp and operator.",
  },
  {
    q: "Does this satisfy ISO 17025 or ASME Section V instrument-traceability requirements?",
    a: "It captures the metadata you need to demonstrate traceability. The actual calibration certificates remain the source of truth — the tracker holds the reference, due-date and chain-of-custody. Auditors typically accept the export plus original certificates.",
  },
];

const SOFTWARE_APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NDT Connect — Equipment Tracker",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web (any modern browser), iOS, Android",
  description: DESCRIPTION,
  url: URL,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  publisher: { "@type": "Organization", name: "NDT Connect", url: SITE },
  featureList: [
    "UT, RT, MT, PT, ET, VT, hardness and borescope instrument tracking",
    "PAUT and TOFD equipment with probe register",
    "Ir-192 and Co-60 source tracking with decay calculator",
    "V1/V2/IIW calibration block and reference standard tracking",
    "Per-asset serial, custodian, location, status, calibration due-date",
    "Multi-branch / multi-shop visibility",
    "CSV and PDF export for client pre-job packages",
    "Repair history and customer-qualification log per asset",
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function EquipmentTrackerPage() {
  return (
    <article className="space-y-12">
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: SITE },
          { name: "Free Tools", url: `${SITE}/free-tools` },
          { name: "Equipment Tracker", url: URL },
        ]}
      />
      <StructuredData data={SOFTWARE_APP_SCHEMA} />
      <StructuredData data={FAQ_SCHEMA} />

      <header className="text-center py-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Free for inspection companies — no card, no trial expiry
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#004aad" }}>
          Free NDT Equipment Tracking Tool
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Track every UT machine, RT camera, gamma source, MT yoke, PT kit, probe and
          calibration block in your shop. Serial #, last cal, next cal, location, custodian.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/register?redirect=/free-tools/equipment-tracker"
            className="inline-block px-6 py-3 text-white text-base font-medium rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#004aad" }}
          >
            Create your free account
          </Link>
          <Link
            href="/free-tools"
            className="inline-block px-6 py-3 text-base font-medium rounded-lg border hover:opacity-90 transition-colors"
            style={{ color: "#004aad", borderColor: "#004aad" }}
          >
            See all free tools
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">All you need is a user ID. No credit card. No instrument cap.</p>
      </header>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: "#0B1E33" }}>
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold mb-2" style={{ color: "#004aad" }}>1</div>
            <h3 className="font-semibold mb-2">Add your assets</h3>
            <p className="text-sm text-muted-foreground">
              Type each instrument in or bulk-import from CSV. Pick a category
              (UT flaw detector, RT camera, PA probe, V1 block, etc.) and fill the
              serial, OEM, model, asset tag.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold mb-2" style={{ color: "#004aad" }}>2</div>
            <h3 className="font-semibold mb-2">Assign location & custodian</h3>
            <p className="text-sm text-muted-foreground">
              Tag every item with its current shop or job-site location and
              assigned technician. Move it between sites in one click and the
              chain-of-custody log captures the change.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold mb-2" style={{ color: "#004aad" }}>3</div>
            <h3 className="font-semibold mb-2">Export for clients & audits</h3>
            <p className="text-sm text-muted-foreground">
              Generate a CSV for a turnaround mobilisation pack, a PDF per asset
              for an ISO 17025 surveillance, or a filtered list of every calibration
              block at the Houston shop.
            </p>
          </div>
        </div>
      </section>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#0B1E33" }}>
          Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { t: "Every NDT instrument category", d: "UT, UTT, PAUT, TOFD, Ir-192, Co-60, X-ray, MT yokes, MT benches, PT kits, ET, borescopes, hardness, plus all probes, blocks (V1/V2/IIW), step wedges and IQIs." },
            { t: "Per-asset chain of custody", d: "Every move, every reassignment, every status change is timestamped and operator-stamped. Pull the history for any asset for an audit." },
            { t: "Multi-branch register", d: "Houston shop. Aberdeen warehouse. Field truck #4. Tag and filter by location. See who has what across the whole company in one screen." },
            { t: "Calibration due-date dashboard", d: "Status badges (Active, Due Soon, In Calibration, Expired, Out of Service, Retired) with one-click filter to the assets needing attention." },
            { t: "OEM and repair log", d: "Notes field per asset captures repair history, dropped-instrument incidents, replaced cables, and customer-specific qualification events." },
            { t: "CSV import / export", d: "Bulk-import an existing register from your spreadsheet in 60 seconds. Export to CSV or per-asset PDF for client pre-job packages." },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2" style={{ color: "#004aad" }}>{f.t}</h3>
              <p className="text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#0B1E33" }}>
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          {FAQS.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold mb-2" style={{ color: "#0B1E33" }}>{f.q}</h3>
              <p className="text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#0B1E33" }}>
          Related reading
        </h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <ul className="space-y-2">
            <li><a href="https://ut-testing-academy.com/ut-equipment-guide" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>UT equipment guide →</a></li>
            <li><a href="https://ndt-equipment-reviews.com" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>NDT equipment reviews →</a></li>
            <li><a href="https://rt-testing-hub.com/rt-equipment-maintenance" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>RT equipment maintenance →</a></li>
          </ul>
          <ul className="space-y-2">
            <li><Link href="/services/ultrasonic-testing" className="hover:underline" style={{ color: "#004aad" }}>UT inspection services →</Link></li>
            <li><Link href="/services/radiographic-testing" className="hover:underline" style={{ color: "#004aad" }}>RT inspection services →</Link></li>
          </ul>
          <ul className="space-y-2">
            <li><a href="https://atlantisndt.com/ndt-certifications" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>Atlantis NDT certifications →</a></li>
            <li><Link href="/free-tools/calibration-reminder" className="hover:underline" style={{ color: "#004aad" }}>Pair with the calibration reminder →</Link></li>
          </ul>
        </div>
      </section>

      <section className="container text-center py-12 rounded-lg" style={{ backgroundColor: "#F5F7FA" }}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#004aad" }}>
          Outgrow the free tier?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          NDT Connect paid plans turn the equipment register into a full operations cockpit:
          job dispatch, calibration scheduling against lab partners, marketplace listing of
          your shop, and ERP-grade invoicing. Your asset register comes with you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 text-white text-base font-medium rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#004aad" }}
          >
            See paid plans
          </Link>
          <Link
            href="/register?redirect=/free-tools/equipment-tracker"
            className="inline-block px-6 py-3 text-base font-medium rounded-lg border hover:opacity-90 transition-colors"
            style={{ color: "#004aad", borderColor: "#004aad" }}
          >
            Stay on free tier
          </Link>
        </div>
      </section>
    </article>
  );
}
