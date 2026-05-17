// src/app/free-tools/calibration-reminder/page.tsx
// Free Calibration Reminder — UT probes, gauges, IR sources, cal blocks, hardness testers.
// Server component, SEO-optimised.

import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/free-tools/StructuredData";
import { BreadcrumbListSchema } from "@/components/seo/SchemaMarkup";

const SITE = "https://ndt-connect.com";
const URL = `${SITE}/free-tools/calibration-reminder`;

const TITLE =
  "Free NDT Calibration Reminder App — UT Probes, IR Sources, Cal Blocks";
const DESCRIPTION =
  "Free calibration reminders for UT probes, thickness gauges, Ir-192/Co-60 sources, V1/V2/IIW calibration blocks and hardness testers. Email and SMS alerts at 90, 60, 30, 7 days. ISO 17025 ready.";

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
    images: [`${SITE}/og/free-tools-calibration-reminder.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free NDT Calibration Reminder App",
    description:
      "UT probes, gauges, IR sources, cal blocks, hardness testers — never miss a due-date.",
    images: [`${SITE}/og/free-tools-calibration-reminder.png`],
  },
  keywords: [
    "ndt calibration reminder app",
    "ut probe calibration tracker free",
    "iso 17025 calibration schedule tool",
    "calibration block due date",
    "ir-192 leak test reminder",
    "hardness tester calibration",
  ],
};

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What instruments can I track for calibration?",
    a: "UT flaw detectors, UT thickness gauges, phased-array (PAUT) units, all UT probes (straight beam, angle beam, dual element, immersion, PA arrays), Ir-192 and Co-60 source half-life and leak-test schedules, X-ray generators, magnetic-particle yokes (lift test) and benches, MT bath ammeter and gauss meter, PT pressure pots, eddy-current instruments, hardness testers (Brinell, Rockwell, Vickers, Leeb, UCI), V1/V2/IIW calibration blocks, step wedges, IQIs, densitometers, light meters and UV-A meters.",
  },
  {
    q: "How do the alerts work?",
    a: "For each instrument you set the next calibration due-date. The reminder engine fires an email at 90, 60, 30 and 7 days before the due-date, plus a final on-the-day reminder. Optional SMS alerts attach to any recipient. After the due-date passes the instrument flips to Expired (red) and a daily reminder continues until you log the new calibration.",
  },
  {
    q: "Can I have different reminder windows per instrument type?",
    a: "Yes. UT probes might use 90/60/30/7. Ir-192 sources typically use a leak-test window every 6 months — set 30/14/7 days. PT consumables can use a single 30-day window. Each instrument inherits its category's default but you can override per-asset.",
  },
  {
    q: "Does this comply with ISO 17025 calibration intervals?",
    a: "ISO 17025 requires calibration intervals to be documented and reviewed; this tool stores the interval, the calibration certificate reference, the recall date and the technician notification log — all of the records an assessor will ask for during a surveillance. Combined with the equipment tracker it gives you the full register-and-recall picture.",
  },
  {
    q: "Can I export a calendar (.ics) of upcoming due-dates?",
    a: "Calendar export is on the roadmap. Today, the dashboard shows the next 30 / 60 / 90-day pipeline as a sortable list, and recipients receive direct email notifications.",
  },
  {
    q: "Who receives the alerts?",
    a: "You configure recipients per instrument: typically the lab manager, the responsible Level III, the scheduler and the assigned technician. Multiple recipients per alert. SMS alerts use the phone number on each recipient's profile.",
  },
  {
    q: "What about Ir-192 source decay calculations?",
    a: "The tool stores the source serial, activity at reference date, and reference date. The dashboard shows current calculated activity using Ir-192 (74-day) or Co-60 (1925-day) half-life. A separate reminder fires for the 6-monthly leak test.",
  },
];

const SOFTWARE_APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NDT Connect — Calibration Reminder",
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
    "Email alerts at 90, 60, 30 and 7 days before calibration due-date",
    "Optional SMS alerts per recipient",
    "Per-instrument reminder windows (UT, RT, MT, PT, ET, hardness)",
    "Ir-192 and Co-60 source decay tracking",
    "6-monthly source leak-test reminder",
    "Calibration block / reference standard recall scheduling",
    "Multi-recipient routing (Level III, scheduler, technician)",
    "ISO 17025 surveillance-ready audit log",
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

export default function CalibrationReminderPage() {
  return (
    <article className="space-y-12">
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: SITE },
          { name: "Free Tools", url: `${SITE}/free-tools` },
          { name: "Calibration Reminder", url: URL },
        ]}
      />
      <StructuredData data={SOFTWARE_APP_SCHEMA} />
      <StructuredData data={FAQ_SCHEMA} />

      <header className="text-center py-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Free for inspection companies — no card, no trial expiry
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#004aad" }}>
          Free NDT Calibration Reminder App
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Reminders for UT probes, thickness gauges, Ir-192/Co-60 sources,
          V1/V2/IIW calibration blocks and hardness testers. Free email and SMS alerts at
          90, 60, 30 and 7 days. ISO 17025 ready.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/register?redirect=/free-tools/calibration-reminder"
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
        <p className="mt-4 text-sm text-muted-foreground">All you need is a user ID. No credit card. Unlimited reminders.</p>
      </header>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: "#0B1E33" }}>
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold mb-2" style={{ color: "#004aad" }}>1</div>
            <h3 className="font-semibold mb-2">Add your instruments</h3>
            <p className="text-sm text-muted-foreground">
              UT probes, thickness gauges, IR sources, cal blocks, hardness testers,
              MT yokes — type them in or import from CSV. Set the next calibration
              due-date for each.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold mb-2" style={{ color: "#004aad" }}>2</div>
            <h3 className="font-semibold mb-2">Set recipients & windows</h3>
            <p className="text-sm text-muted-foreground">
              Default windows are 90/60/30/7 days. Override per instrument category.
              Add multiple recipients per alert (lab manager, Level III, scheduler).
              SMS optional.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold mb-2" style={{ color: "#004aad" }}>3</div>
            <h3 className="font-semibold mb-2">Never miss a due-date</h3>
            <p className="text-sm text-muted-foreground">
              Recipients get email (and SMS if enabled) at each window. The status
              dashboard shows Valid / Due Soon / Expired in colour. Log the renewal
              and the cycle restarts.
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
            { t: "Multi-window email and SMS alerts", d: "Default 90/60/30/7-day pattern. Day-before reminder. Daily nag after expiry until renewal logged. Multiple recipients per instrument." },
            { t: "Instrument-class reminder defaults", d: "UT probes 90/60/30/7. Ir-192 leak tests 30/14/7. PT consumable batches 30/0. Override at any time per asset." },
            { t: "Ir-192 / Co-60 source decay", d: "Real-time activity calculation using radioisotope half-life. Separate 6-monthly leak-test reminder. Compatible with US NRC and IAEA-aligned source-management requirements." },
            { t: "Calibration block recall", d: "V1, V2, IIW, step wedges, reference standards — all on the same reminder schedule. Track block dimensional verification and surface-condition reviews." },
            { t: "ISO 17025 audit log", d: "Every reminder, acknowledgement and renewal is timestamped and operator-stamped. Export the trail for an ISO 17025 surveillance assessor." },
            { t: "Cross-linked to the equipment tracker", d: "Update an asset's next-cal date in the tracker and every reminder window updates automatically. One source of truth." },
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
            <li><a href="https://ut-testing-academy.com/ut-calibration-procedures" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>UT calibration procedures →</a></li>
            <li><a href="https://rt-testing-hub.com/rt-safety-procedures" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>RT safety & source procedures →</a></li>
            <li><a href="https://ndt-standards-reference.com/iso-17025" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>ISO 17025 reference →</a></li>
          </ul>
          <ul className="space-y-2">
            <li><Link href="/services/ultrasonic-testing" className="hover:underline" style={{ color: "#004aad" }}>UT inspection services →</Link></li>
            <li><Link href="/services/radiographic-testing" className="hover:underline" style={{ color: "#004aad" }}>RT inspection services →</Link></li>
          </ul>
          <ul className="space-y-2">
            <li><a href="https://atlantisndt.com/ndt-certifications" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>Atlantis NDT certifications →</a></li>
            <li><Link href="/free-tools/equipment-tracker" className="hover:underline" style={{ color: "#004aad" }}>Pair with the equipment tracker →</Link></li>
          </ul>
        </div>
      </section>

      <section className="container text-center py-12 rounded-lg" style={{ backgroundColor: "#F5F7FA" }}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#004aad" }}>
          When you're ready for the paid plan
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          NDT Connect paid plans connect calibration scheduling to your lab partners,
          add the marketplace listing for your shop, full ERP, customer portal and
          real-time job dispatch. Your reminder data carries over.
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
            href="/register?redirect=/free-tools/calibration-reminder"
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
