// src/components/free-tools/FreeToolFeaturePage.tsx
// Server component that renders the marketing landing for a single free-tool
// feature (equipment-management | calibration-tracking | certificate-management).
// Used by /free-tools/[feature]/page.tsx.

import Link from "next/link";
import { StructuredData } from "./StructuredData";
import { FreeTool } from "@/data/freeTools";

const SITE = "https://ndt-connect.com";

interface Props {
  tool: FreeTool;
}

export function FreeToolFeaturePage({ tool }: Props) {
  const url = `${SITE}/free-tools/${tool.slug}`;
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `NDT Connect — ${tool.name}`,
    applicationCategory: tool.schemaCategory,
    operatingSystem: "Web (any modern browser)",
    description: tool.metaDescriptionPrefix,
    url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: undefined, // populate when we have user-review data
    publisher: {
      "@type": "Organization",
      name: "NDT Connect",
      url: SITE,
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: `${SITE}/free-tools` },
      { "@type": "ListItem", position: 3, name: tool.name, item: url },
    ],
  };

  return (
    <article className="free-tool-feature space-y-12">
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />

      <header className="text-center py-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Free for inspection companies — no card, no trial expiry
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#004aad" }}>
          Free {tool.name} Software for NDT Companies
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {tool.metaDescriptionPrefix}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/register"
            className="inline-block px-6 py-3 text-white text-base font-medium rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#004aad" }}
          >
            Create your free user ID
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
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#0B1E33" }}>
          What you get
        </h2>
        <ul className="space-y-3">
          {tool.features.map((f, i) => (
            <li key={i} className="flex">
              <span className="mr-3" aria-hidden style={{ color: "#1F8A4F" }}>✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#0B1E33" }}>
          Built for these workflows
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {tool.useCases.map((u, i) => (
            <div key={i} className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2" style={{ color: "#004aad" }}>{u.title}</h3>
              <p className="text-sm text-muted-foreground">{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#0B1E33" }}>
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          {tool.faqs.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold mb-2" style={{ color: "#0B1E33" }}>{f.q}</h3>
              <p className="text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container text-center py-12 rounded-lg" style={{ backgroundColor: "#F5F7FA" }}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#004aad" }}>
          Ready to start?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Create a free user ID and start using {tool.shortName} in under a minute. No credit card. No trial expiry.
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
