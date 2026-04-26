// src/app/free-tools/page.tsx
// /free-tools — pillar landing for the three free SaaS tools.
// Server component (no "use client"). SEO-optimised via Metadata API.

import type { Metadata } from "next";
import Link from "next/link";
import { FREE_TOOLS } from "@/data/freeTools";
import { StructuredData } from "@/components/free-tools/StructuredData";

const SITE = "https://ndt-connect.com";

export const metadata: Metadata = {
  title: "Free Software for NDT Companies — Equipment, Calibration, Certs",
  description:
    "Three free tools for NDT service providers: equipment registry, calibration alerts, and personnel + company certification tracking. User ID only.",
  alternates: { canonical: `${SITE}/free-tools` },
  openGraph: {
    title: "Free Software for NDT Companies — Equipment, Calibration, Certs",
    description:
      "Three free tools for NDT service providers: equipment registry, calibration alerts, and personnel + company certification tracking. User ID only.",
    url: `${SITE}/free-tools`,
    siteName: "NDT Connect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Software for NDT Companies",
    description: "Equipment, calibration, and certificate management — free for NDT companies.",
  },
};

export default function FreeToolsPillarPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: `${SITE}/free-tools` },
    ],
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free tools for NDT companies",
    itemListElement: FREE_TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/free-tools/${t.slug}`,
      name: `Free ${t.name}`,
    })),
  };

  return (
    <article className="space-y-12">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionSchema} />

      <header className="text-center py-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Free for inspection companies — no card, no trial expiry
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#004aad" }}>
          Free Tools for NDT Service Providers
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Track NDT equipment, calibration due-dates, and ASNT / ISO 9712 personnel certs free.
          All you need is a user ID.
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

      <section className="container">
        <div className="grid md:grid-cols-3 gap-6">
          {FREE_TOOLS.map(t => (
            <Link
              key={t.slug}
              href={`/free-tools/${t.slug}`}
              className="block p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2" style={{ color: "#004aad" }}>
                Free {t.name}
              </h2>
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
