// src/app/free-tools/certificate-manager/page.tsx
// Free Certificate Manager — Track ASNT, API, AWS CWI, ISO 9712 expiries
// with email/SMS alerts at 90/60/30/7 days. Server component, SEO-optimised.

import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/free-tools/StructuredData";
import { BreadcrumbListSchema } from "@/components/seo/SchemaMarkup";

const SITE = "https://ndt-connect.com";
const URL = `${SITE}/free-tools/certificate-manager`;

const TITLE =
  "Free NDT Certification Expiry Tracker — ASNT, API 510/570/653, AWS CWI, ISO 9712";
const DESCRIPTION =
  "Free certificate manager for NDT inspectors. Track ASNT Level I/II/III, API 510/570/653, AWS CWI and ISO 9712 expiries with email and SMS alerts at 90, 60, 30 and 7 days.";

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
    images: [`${SITE}/og/free-tools-certificate-manager.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free NDT Certification Expiry Tracker",
    description:
      "Track ASNT, API, AWS CWI & ISO 9712 expiries with free 90/60/30/7-day email and SMS alerts.",
    images: [`${SITE}/og/free-tools-certificate-manager.png`],
  },
  keywords: [
    "asnt certification expiry tracker",
    "ndt cert renewal reminder",
    "free api inspector cert manager",
    "aws cwi expiry alert",
    "iso 9712 renewal tracker",
    "asnt level iii expiry",
  ],
};

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Which NDT certification bodies are supported?",
    a: "ASNT (SNT-TC-1A and CP-189) Level I/II/III for UT, RT, MT, PT, ET, VT and LT; API 510 (Pressure Vessel Inspector), API 570 (Piping Inspector), API 653 (Above-Ground Storage Tank Inspector), API 580/581 (RBI), API 936, API 1169 (Pipeline Construction); AWS CWI / SCWI / CAWI; ISO 9712 Level 1/2/3 across all NDT methods; ACCP, PCN and CGSB are tracked under custom certification types.",
  },
  {
    q: "Are the email and SMS alerts really free?",
    a: "Yes. There is no per-alert fee, no credit card required, and no trial expiry. Alerts fire 90, 60, 30 and 7 days before each certificate expires, plus a final on-the-day reminder. SMS alerts use phone numbers you add to each inspector's profile.",
  },
  {
    q: "How is this different from spreadsheets?",
    a: "A spreadsheet does not page you the night before a tech rolls onto a turnaround with an expired ASNT Level II UT cert. This tool does — by email and SMS. It also gives you a fleet-wide expiry dashboard, exportable audit packs for ISO 9712 and customer prequalification, and a renewal forecast so you can pre-book recert exams before lab capacity tightens.",
  },
  {
    q: "Can I track company certifications too?",
    a: "Yes. Alongside personnel certs you can track ISO 9712 written-procedure approvals, ISO 17025 lab accreditation, OEM authorisations, customer-specific qualifications and Stage 2 / Stage 3 audit dates. Both personnel and company records share a single expiry dashboard.",
  },
  {
    q: "What happens after a certificate expires?",
    a: "The record flips to 'Expired' (red) on the dashboard, daily reminder emails continue until you record the new expiry date, and the inspector is automatically excluded from any pre-job qualified-personnel exports until renewed. Audit traceability is preserved — the historical certificate record stays attached to the inspector profile.",
  },
  {
    q: "Can I import my existing certificate list?",
    a: "Yes. CSV import accepts the columns (inspector name, cert type, level, method, issue date, expiry date, certifying body, certificate number). We also accept the ASNT Central Certification Program (CP-106) export format. Bulk imports of 200+ certs typically complete in under a minute.",
  },
  {
    q: "Is there a paid tier I should know about?",
    a: "The certificate manager itself is free forever. Paid NDT Connect plans add the marketplace listing, real-time job dispatch, and the ERP modules (job costing, invoicing, customer portal). The cert data carries over — nothing to migrate.",
  },
];

const SOFTWARE_APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NDT Connect — Certificate Manager",
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
    "ASNT SNT-TC-1A and CP-189 expiry tracking",
    "API 510 / 570 / 653 / 580 / 1169 inspector cert tracking",
    "AWS CWI / SCWI expiry alerts",
    "ISO 9712 Level 1 / 2 / 3 method-by-method tracking",
    "Email and SMS alerts at 90, 60, 30 and 7 days before expiry",
    "Personnel and company certificate dashboard",
    "ISO 17025 lab accreditation tracking",
    "CSV import and audit-pack export",
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

export default function CertificateManagerPage() {
  return (
    <article className="space-y-12">
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: SITE },
          { name: "Free Tools", url: `${SITE}/free-tools` },
          { name: "Certificate Manager", url: URL },
        ]}
      />
      <StructuredData data={SOFTWARE_APP_SCHEMA} />
      <StructuredData data={FAQ_SCHEMA} />

      <header className="text-center py-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Free for inspection companies — no card, no trial expiry
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#004aad" }}>
          Free NDT Certification Expiry Tracker
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Track ASNT Level I/II/III, API 510/570/653, AWS CWI and ISO 9712 expiries.
          Free email and SMS alerts at 90, 60, 30 and 7 days.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/register?redirect=/free-tools/certificate-manager"
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
        <p className="mt-4 text-sm text-muted-foreground">All you need is a user ID. No credit card. Start in 60 seconds.</p>
      </header>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: "#0B1E33" }}>
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold mb-2" style={{ color: "#004aad" }}>1</div>
            <h3 className="font-semibold mb-2">Add your inspectors and certs</h3>
            <p className="text-sm text-muted-foreground">
              Type them in or import from a CSV. Each cert gets a type
              (ASNT, API, AWS CWI, ISO 9712), method, level, issue date and expiry date.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold mb-2" style={{ color: "#004aad" }}>2</div>
            <h3 className="font-semibold mb-2">Configure alert recipients</h3>
            <p className="text-sm text-muted-foreground">
              Add an email and (optionally) phone number per inspector and per
              cert-program owner. Choose the 90/60/30/7-day reminder pattern or
              customise it.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold mb-2" style={{ color: "#004aad" }}>3</div>
            <h3 className="font-semibold mb-2">Get alerted before audits</h3>
            <p className="text-sm text-muted-foreground">
              You and the inspector get an email (and SMS if enabled) at every
              window. The dashboard shows expiry status fleet-wide.
              Renewals propagate instantly.
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
            {
              t: "All major NDT certifying bodies",
              d: "ASNT SNT-TC-1A & CP-189, API 510/570/653/580/1169/936, AWS CWI/SCWI/CAWI, ISO 9712, ACCP, PCN, CGSB. Custom cert types supported.",
            },
            {
              t: "90 / 60 / 30 / 7-day alerts",
              d: "Email by default. Add SMS for any inspector. The day-before reminder fires automatically — and a daily nag continues after expiry until you log the renewal.",
            },
            {
              t: "Personnel + company certs in one dashboard",
              d: "Track ISO 17025 lab accreditation, ISO 9712 procedure approvals, OEM authorisations and customer prequalifications alongside individual inspector certs.",
            },
            {
              t: "Method-and-level filtering",
              d: "Answer 'who's qualified ASNT Level II UT this week' in 5 seconds. Export the qualified-personnel list straight to a customer pre-job submission.",
            },
            {
              t: "Audit-pack export",
              d: "Generate a current-status PDF for an oil-major prequalification, an ISO 17025 surveillance, or an ASME Section V customer audit.",
            },
            {
              t: "Renewal forecast",
              d: "See the next 90 days of recert windows so you can pre-book exam slots before NDT training centres tighten capacity.",
            },
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
            <li><a href="https://ndt-career-portal.com/asnt-certification-guide" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>ASNT Certification Guide →</a></li>
            <li><a href="https://ndt-standards-reference.com/snt-tc-1a-overview" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>SNT-TC-1A overview →</a></li>
            <li><a href="https://ut-testing-academy.com/ut-training-paths" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>UT Level I → III training paths →</a></li>
          </ul>
          <ul className="space-y-2">
            <li><Link href="/services/ultrasonic-testing" className="hover:underline" style={{ color: "#004aad" }}>NDT Connect — Ultrasonic Testing services →</Link></li>
            <li><Link href="/tools/certification-pathway" className="hover:underline" style={{ color: "#004aad" }}>Certification pathway tool →</Link></li>
          </ul>
          <ul className="space-y-2">
            <li><a href="https://atlantisndt.com/ndt-certifications" target="_blank" rel="noopener" className="hover:underline" style={{ color: "#004aad" }}>Atlantis NDT certifications →</a></li>
            <li><Link href="/free-tools" className="hover:underline" style={{ color: "#004aad" }}>All free tools →</Link></li>
          </ul>
        </div>
      </section>

      <section className="container text-center py-12 rounded-lg" style={{ backgroundColor: "#F5F7FA" }}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#004aad" }}>
          Ready for the paid plan when you outgrow the free tier?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          NDT Connect paid plans add marketplace listing, customer portal, real-time job dispatch,
          and full ERP — invoicing, job costing, multi-site equipment register. Your certificate
          data carries over.
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
            href="/register?redirect=/free-tools/certificate-manager"
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
