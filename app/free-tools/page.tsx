// src/app/free-tools/page.tsx
// /free-tools — pillar landing for the three free SaaS tools.
// Server component (no "use client"). SEO-optimised via Metadata API.

import type { Metadata } from "next";
import Link from "next/link";
import { FREE_TOOLS } from "@/data/freeTools";
import { StructuredData } from "@/components/free-tools/StructuredData";
import { BreadcrumbListSchema, FAQSchema } from "@/components/seo/SchemaMarkup";

const SITE = "https://ndt-connect.com";

// Featured (above-the-fold) tools — the four newest free tools.
// These ship as standalone pages outside the FREE_TOOLS data table
// because they have richer landing-page copy and unique CTAs.
const FEATURED_TOOLS: Array<{
  slug: string;
  title: string;
  blurb: string;
  badge: string;
}> = [
  {
    slug: "certificate-manager",
    title: "Certification Expiry Tracker",
    blurb:
      "ASNT Level I/II/III, API 510/570/653, AWS CWI, ISO 9712 — free email & SMS alerts at 90/60/30/7 days.",
    badge: "Email + SMS alerts",
  },
  {
    slug: "equipment-tracker",
    title: "NDT Equipment Tracker",
    blurb:
      "UT, RT, MT, PT instruments, probes and cal blocks. Serial #, last cal, next cal, location, custodian.",
    badge: "Unlimited assets",
  },
  {
    slug: "calibration-reminder",
    title: "Calibration Reminder",
    blurb:
      "UT probes, gauges, IR sources, V1/V2/IIW blocks, hardness testers — ISO 17025-ready audit trail.",
    badge: "ISO 17025 ready",
  },
  {
    slug: "ai-procedure-generator",
    title: "AI Procedure Generator",
    blurb:
      "ASME Section V / API 510/570/653 / AWS D1.1 procedures in 60 seconds. Free with sign-in.",
    badge: "AI · sign-in",
  },
];

export const metadata: Metadata = {
  title: "Free Software for NDT Companies — Certs, Equipment, Calibration, AI Procedures",
  description:
    "Free tools for NDT service providers: certification expiry tracker (ASNT, API, AWS CWI, ISO 9712), equipment tracker, calibration reminder and AI procedure generator. No card.",
  alternates: { canonical: `${SITE}/free-tools` },
  openGraph: {
    title: "Free Software for NDT Companies — Certs, Equipment, Calibration, AI Procedures",
    description:
      "Free tools for NDT service providers: cert tracker, equipment tracker, calibration reminder, AI procedure generator. User ID only.",
    url: `${SITE}/free-tools`,
    siteName: "NDT Connect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Software for NDT Companies",
    description: "Cert tracker, equipment tracker, calibration reminder & AI procedure generator — free.",
  },
};

// FAQ — answers the procurement / IT-buyer questions that surface in GSC
// for /free-tools queries (e.g. "free ndt software", "calibration tracking
// free", "asnt cert tracker"). Wired to FAQPage schema below.
const freeToolsFaqs = [
  {
    question: "Are these tools really free for NDT companies?",
    answer:
      "Yes. Equipment registry, calibration alerts, and personnel + company certification tracking are free with no card, no trial expiry, and no seat caps. We give them away because the marketplace and ERP we build alongside benefit from a stronger network of professional providers using consistent traceability tooling.",
  },
  {
    question: "What can I track with the free calibration tool?",
    answer:
      "All instrument-level data needed for an audit: serial number, manufacturer, model, calibration date, calibration interval, due date, calibration certificate upload, and traceability to the issuing lab. Calibration alerts fire on a configurable lead time so a UT thickness gauge or RT crawler never goes on-site out of cert.",
  },
  {
    question: "Does the certificate manager handle ASNT, ISO 9712, and PCN?",
    answer:
      "Yes. Personnel certificates store the scheme (ASNT SNT-TC-1A, NAS 410, ISO 9712, PCN, CSWIP), level, method, issue and expiry dates, plus the certificate file itself. Company-level certificates (ISO/IEC 17020, 17025, ISO 9001, API Q1, Nadcap) are tracked the same way. Expiry alerts route to the responsible owner.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. Each user ID has its own private workspace — equipment, certificates, and calibration records are not shared, indexed, or surfaced to the marketplace. We do not aggregate your data into provider profiles unless you explicitly opt in.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. The free tools run in any modern browser on desktop or mobile — Chrome, Edge, Safari, Firefox. Field crews can update calibration status from a phone after a check is performed; back-office staff can run audit reports from a laptop.",
  },
  {
    question: "How does this compare to paid NDT software like NDT Manager or Inspector ERP?",
    answer:
      "The free tools cover the three modules every NDT shop needs first — equipment registry, calibration tracking, and certificate management. Paid platforms add scheduling, dispatch, invoicing, and procedure management. We charge for the marketplace and ERP layers built on top, but the underlying traceability tooling stays free.",
  },
];

export default function FreeToolsPillarPage() {
  const featuredItems = FEATURED_TOOLS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE}/free-tools/${t.slug}`,
    name: `Free ${t.title}`,
  }));
  const legacyOffset = FEATURED_TOOLS.length;
  const legacyItems = FREE_TOOLS.map((t, i) => ({
    "@type": "ListItem",
    position: legacyOffset + i + 1,
    url: `${SITE}/free-tools/${t.slug}`,
    name: `Free ${t.name}`,
  }));
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free tools for NDT companies",
    itemListElement: [...featuredItems, ...legacyItems],
  };

  return (
    <article className="space-y-12">
      <BreadcrumbListSchema items={[
        { name: "Home", url: SITE },
        { name: "Free Tools", url: `${SITE}/free-tools` },
      ]} />
      <StructuredData data={collectionSchema} />
      <FAQSchema questions={freeToolsFaqs} />

      <header className="text-center py-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Free for inspection companies — no card, no trial expiry
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#004aad" }}>
          Free Tools for NDT Service Providers
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Track ASNT / API / AWS CWI / ISO 9712 certifications, manage equipment and
          calibration due-dates, and generate ASME / API / AWS-compliant procedures with AI.
          All free. All you need is a user ID.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/register"
            className="inline-block px-6 py-3 text-white text-base font-medium rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#004aad" }}
          >
            Create your free user ID
          </Link>
        </div>
      </header>

      {/* ── Featured (newest) tools — above-the-fold ─────────────────── */}
      <section className="container">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: "#0B1E33" }}>
            New free tools for 2026
          </h2>
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Built from feedback from 100+ inspection houses
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_TOOLS.map(t => (
            <Link
              key={t.slug}
              href={`/free-tools/${t.slug}`}
              className="block p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
            >
              <span
                className="inline-block text-xs font-semibold uppercase tracking-wider rounded px-2 py-1 mb-3"
                style={{ backgroundColor: "#E8F0FE", color: "#004aad" }}
              >
                {t.badge}
              </span>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#004aad" }}>
                {t.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{t.blurb}</p>
              <span className="text-sm font-medium" style={{ color: "#004aad" }}>
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Original three free tools ─────────────────────────────────── */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#0B1E33" }}>
          Core free tools
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {FREE_TOOLS.map(t => (
            <Link
              key={t.slug}
              href={`/free-tools/${t.slug}`}
              className="block p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2" style={{ color: "#004aad" }}>
                Free {t.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{t.metaDescriptionPrefix}</p>
              <span className="text-sm font-medium" style={{ color: "#004aad" }}>Learn more →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: "#0B1E33" }}>
          Why we give it away
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-center">
          NDT inspection companies — solo Level III consultants, mid-size shops, and 100+ technician majors —
          all need the same instrument-and-cert traceability. Most software vendors charge $30–$200/seat/month for
          tools that should be table-stakes. We provide them free so the marketplace and ERP we build alongside
          have a stronger network of professional providers. Your data is private to your account.
        </p>
      </section>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: "#0B1E33" }}>
          Frequently asked questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {freeToolsFaqs.map((f, idx) => (
            <details
              key={idx}
              className="rounded-lg border bg-card p-4 open:shadow-sm"
            >
              <summary className="font-semibold cursor-pointer text-sm" style={{ color: "#004aad" }}>
                {f.question}
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container text-center py-12 rounded-lg" style={{ backgroundColor: "#F5F7FA" }}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#004aad" }}>
          Start in 60 seconds
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Create a user ID, choose your tool, and start tracking. No credit card. No trial expiry.
        </p>
        <Link
          href="/register"
          className="inline-block px-6 py-3 text-white text-base font-medium rounded-lg hover:opacity-90 transition-colors"
          style={{ backgroundColor: "#004aad" }}
        >
          Create your free user ID
        </Link>
      </section>
    </article>
  );
}
