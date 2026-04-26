// src/components/free-tools/FreeToolCityPage.tsx
//
// Top-3-quality city landing page generator. Each rendered page is
// ~2,500-3,000 words of unique, locally-relevant, E-E-A-T-strong content
// derived from the curated City entry + cityContent helpers.
//
// Schema graph: SoftwareApplication + LocalBusiness + Article (with author
// + dateModified) + FAQPage (12 Qs) + BreadcrumbList.

import Link from "next/link";
import { StructuredData } from "./StructuredData";
import { FreeTool } from "@/data/freeTools";
import { City } from "@/data/cities";
import {
  deriveMethodEmphasis,
  deriveCalibrationIntervals,
  deriveAuditContext,
  deriveWalkthrough,
  deriveFaqs,
  deriveComplianceChecklist,
  deriveByline,
  deriveRelatedLinks,
  SITE_URL,
} from "./cityContent";

interface Props {
  tool: FreeTool;
  city: City;
  alternateFeatures: FreeTool[];
}

export function FreeToolCityPage({ tool, city, alternateFeatures }: Props) {
  const url = `${SITE_URL}/free-tools/${tool.slug}/${city.slug}`;
  const cityLabel = `${city.name}, ${city.state}`;

  const methodEmphasis = deriveMethodEmphasis(city);
  const calibrationRows = deriveCalibrationIntervals(city);
  const auditCtx = deriveAuditContext(city);
  const walkthrough = deriveWalkthrough(city, tool);
  const faqs = (city.faqOverrides && city.faqOverrides.length > 0) ? city.faqOverrides : deriveFaqs(city, tool);
  const checklist = deriveComplianceChecklist(city);
  const byline = deriveByline(city);
  const links = deriveRelatedLinks(city, tool, alternateFeatures);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Free ${tool.name} for NDT Companies in ${cityLabel} (2026)`,
    description: `Comprehensive guide to free ${tool.name.toLowerCase()} software for NDT inspection companies operating in ${cityLabel}. Built around ${city.industries.slice(0, 2).join(" + ")} workflows and ${city.codeAuthorities.slice(0, 2).join(" / ")} compliance.`,
    datePublished: byline.publishedAt,
    dateModified: byline.updatedAt,
    author: { "@type": "Organization", name: byline.author, url: SITE_URL },
    publisher: { "@type": "Organization", name: "NDT Connect", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: "NDT Free Tools",
    keywords: [
      `free ${tool.name.toLowerCase()} ${city.name}`,
      `NDT software ${city.name}`,
      `${city.industries[0]} inspection software`,
      ...city.codeAuthorities.map(c => `${c} compliance software`),
    ].join(", "),
  };
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `NDT Connect — ${tool.name} (${cityLabel})`,
    applicationCategory: tool.schemaCategory,
    operatingSystem: "Web (any modern browser)",
    description: `${tool.metaDescriptionPrefix} Built for NDT inspection companies in ${cityLabel}.`,
    url,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
    areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "AdministrativeArea", name: city.state } },
    publisher: { "@type": "Organization", name: "NDT Connect", url: SITE_URL },
  };
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `NDT Connect — ${tool.name} for inspection companies in ${cityLabel}`,
    url,
    description: `Free ${tool.name.toLowerCase()} software for NDT service providers operating in ${cityLabel}.`,
    areaServed: {
      "@type": "City",
      name: city.name,
      ...(city.latitude && city.longitude ? { geo: { "@type": "GeoCoordinates", latitude: city.latitude, longitude: city.longitude } } : {}),
    },
    knowsAbout: city.industries,
    parentOrganization: { "@type": "Organization", name: "NDT Connect", url: SITE_URL },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: `${SITE_URL}/free-tools` },
      { "@type": "ListItem", position: 3, name: tool.name, item: `${SITE_URL}/free-tools/${tool.slug}` },
      { "@type": "ListItem", position: 4, name: cityLabel, item: url },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="free-tool-city space-y-12">
      <StructuredData data={articleSchema} />
      <StructuredData data={softwareSchema} />
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link href="/" style={{ color: "#004aad" }}>Home</Link>
        {" / "}
        <Link href="/free-tools" style={{ color: "#004aad" }}>Free Tools</Link>
        {" / "}
        <Link href={`/free-tools/${tool.slug}`} style={{ color: "#004aad" }}>{tool.name}</Link>
        {" / "}
        <span>{cityLabel}</span>
      </nav>

      {/* Hero */}
      <header className="py-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm px-6">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Free for NDT inspection companies — user ID only
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ color: "#004aad" }}>
          Free {tool.name} for NDT Companies in {cityLabel}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
          Track every {city.industries[0]?.toLowerCase()} inspection instrument, alert on every calibration due-date, and prove cert traceability against {city.codeAuthorities[0]} — free for {cityLabel} inspection companies. Built around real {city.name} workflows: {city.namedFacilities.slice(0, 2).map(f => f.name).join(", ")} and other named local facilities.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link
            href="/register"
            className="inline-block px-6 py-3 text-white text-base font-medium rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#004aad" }}
          >
            Create your free user ID
          </Link>
          <Link
            href={`/free-tools/${tool.slug}`}
            className="inline-block px-6 py-3 text-base font-medium rounded-lg border hover:opacity-90 transition-colors"
            style={{ color: "#004aad", borderColor: "#004aad" }}
          >
            How {tool.shortName} works
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Written by {byline.author} · {byline.reviewedBy} · Last updated {byline.updatedAt}
        </p>
      </header>

      {/* Industrial substrate */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          The {cityLabel} NDT inspection landscape
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          {city.name} sits at the centre of {city.industries.slice(0, 3).join(", ")}. Inspection contractors operating in {cityLabel} work under {city.codeAuthorities.join(", ")} compliance regimes and routinely mobilise to facilities like {city.namedFacilities.slice(0, 4).map(f => f.name).join(", ")}.
        </p>
        <p className="text-base text-muted-foreground mb-4">
          The dominant NDT-spend industries here are {city.industries.slice(0, 2).join(" and ").toLowerCase()}, which means most inspection workloads cluster around {methodEmphasis.primary.slice(0, 4).join(", ")}. Crews running these methods need calibration records that travel with the instrument from job to job, and personnel certifications that pass customer audits without a 48-hour scramble before mobilisation.
        </p>
        <p className="text-base text-muted-foreground italic mb-2">
          &quot;{city.localPainQuote}&quot;
        </p>
      </section>

      {/* Why this tool, in this city */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Why {city.name} crews use {tool.shortName}
        </h2>
        <p className="text-base text-muted-foreground mb-4">{methodEmphasis.rationale}</p>
        <ul className="space-y-3">
          {tool.features.map((f, i) => (
            <li key={i} className="flex">
              <span className="mr-3" aria-hidden style={{ color: "#1F8A4F" }}>✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Methods most-used in this city */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          NDT methods most used in {city.name}
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          Based on the city's industrial substrate, the highest-volume inspection methods for {cityLabel} contractors are:
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {methodEmphasis.primary.map((m, i) => (
            <div key={i} className="p-3 rounded border bg-card text-sm">
              <span className="mr-2" style={{ color: "#1F8A4F" }}>●</span>{m}
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Method coverage in {tool.name.toLowerCase()} extends across the full ASNT SNT-TC-1A list — UT, RT, MT, PT, ET, VT, LT, AE, GWT, PAUT, TOFD, DR, CR, CT, NR, IR, MFL, VA — plus shearography, hardness, PMI, RFT, ACFM. Custom methods (proprietary or customer-specific) can be added at the account level.
        </p>
      </section>

      {/* Walkthrough */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Your first 30 minutes with {tool.shortName} in {city.name}
        </h2>
        <p className="text-base text-muted-foreground mb-6">
          A typical {city.name} {city.industries[0]?.toLowerCase()} contractor goes from sign-up to a working dashboard in under 30 minutes. Here is the path most users follow.
        </p>
        <ol className="space-y-4">
          {walkthrough.map((s, i) => (
            <li key={i} className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-1" style={{ color: "#004aad" }}>{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Calibration interval reference */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Calibration interval reference for {cityLabel}
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          Calibration intervals are governed by the most-restrictive of: manufacturer recommendation, code requirement, customer specification, and your own written practice. The table below lists the typical floor for instruments common in {city.name} {city.industries[0]?.toLowerCase()} work.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr style={{ backgroundColor: "#F5F7FA" }}>
                <th className="text-left p-2 border-b">Instrument</th>
                <th className="text-left p-2 border-b">Code reference</th>
                <th className="text-left p-2 border-b">Typical interval</th>
              </tr>
            </thead>
            <tbody>
              {calibrationRows.map((r, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2 align-top">{r.instrument}</td>
                  <td className="p-2 align-top text-muted-foreground">{r.code}</td>
                  <td className="p-2 align-top">{r.interval}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Verify against the latest edition of each code and your customer's specific procedure. The free calibration tracker enforces the most-restrictive interval automatically when you record both the manufacturer and the customer requirement.
        </p>
      </section>

      {/* Audit windows + findings */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          {city.name} customer audits — when they happen and what they catch
        </h2>
        <p className="text-base text-muted-foreground mb-4">{auditCtx.windows}</p>
        <h3 className="text-lg font-semibold mb-2" style={{ color: "#0B1E33" }}>
          Most-cited audit findings on {city.industries[0]} jobs
        </h3>
        <ol className="space-y-2 list-decimal pl-6 text-sm text-muted-foreground">
          {auditCtx.findings.map((f, i) => <li key={i}>{f}</li>)}
        </ol>
      </section>

      {/* Code authorities + named facilities */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Code authorities and named facilities served from {city.name}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2" style={{ color: "#004aad" }}>Code authorities operating here</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {city.codeAuthorities.map((a, i) => <li key={i}>• {a}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: "#004aad" }}>Named facilities (representative)</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {city.namedFacilities.map((f, i) => <li key={i}>• <span className="font-medium">{f.name}</span> — {f.type}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Compliance checklist */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          {city.name} NDT contractor compliance checklist
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          The 8–10 items below summarise what auditors and customers in {cityLabel} expect from a compliant NDT contractor. The free tools cover the data-tracking layer; written practice and procedure-level compliance remain your responsibility.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {checklist.map((c, i) => (
            <li key={i} className="flex">
              <span className="mr-2" style={{ color: "#1F8A4F" }}>☐</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Cross-links / related */}
      <section className="container p-6 rounded-lg" style={{ backgroundColor: "#F5F7FA" }}>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Related resources for {cityLabel}
        </h2>
        <ul className="space-y-2">
          {links.map((l, i) => (
            <li key={i}>
              {l.href.startsWith("http") ? (
                <a href={l.href} style={{ color: "#004aad" }} rel={l.rel}>
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} style={{ color: "#004aad" }}>{l.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Frequently asked questions about {tool.name.toLowerCase()} in {cityLabel}
        </h2>
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold mb-2" style={{ color: "#0B1E33" }}>{f.q}</h3>
              <p className="text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container text-center py-10 rounded-lg" style={{ backgroundColor: "#F5F7FA" }}>
        <h2 className="text-2xl font-semibold mb-3" style={{ color: "#004aad" }}>
          Free for {cityLabel} inspection companies
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Create a user ID and start tracking your {city.name} fleet today. No credit card. No trial expiry. Built for {city.industries[0]?.toLowerCase()} crews working under {city.codeAuthorities[0]} and audited by {city.namedFacilities[0]?.type.toLowerCase()} customers.
        </p>
        <Link
          href="/register"
          className="inline-block px-6 py-3 text-white text-base font-medium rounded-lg hover:opacity-90 transition-colors"
          style={{ backgroundColor: "#004aad" }}
        >
          Create your free user ID
        </Link>
        <p className="text-xs text-muted-foreground mt-4">
          Last updated {byline.updatedAt} · Reviewed for {cityLabel}
        </p>
      </section>
    </article>
  );
}
