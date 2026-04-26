// src/components/free-tools/FreeToolRegionPage.tsx
//
// Region rollup landing page generator. Each rendered page is ~1,800-2,200
// words of unique, regionally-relevant content aggregated from the constituent
// cities in the region. Targets multi-city SEO queries like
// "free NDT calibration software Gulf Coast".
//
// Schema graph: Article + ItemList (cities) + BreadcrumbList + Organization.

import Link from "next/link";
import { StructuredData } from "./StructuredData";
import { FreeTool, FREE_TOOLS } from "@/data/freeTools";
import { City } from "@/data/cities";

const SITE = "https://ndt-connect.com";
const UPDATED = "2026-04-26";
const PUBLISHED = "2026-01-15";
const AUTHOR = "NDT Connect Editorial";
const REVIEWER = "Atlantis NDT ASNT Level III";

interface Props {
  tool: FreeTool;
  regionSlug: string;
  regionName: string;
  citiesInRegion: City[];
}

// Aggregate + dedupe a string-array field across cities, preserving first-seen
// order so the highest-tier cities anchor the list.
function aggregateUnique(cities: City[], pick: (c: City) => string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const c of cities) {
    for (const v of pick(c)) {
      if (!seen.has(v)) {
        seen.add(v);
        out.push(v);
      }
    }
  }
  return out;
}

// Aggregate + dedupe named facilities by name across cities.
function aggregateFacilities(cities: City[]): { name: string; type: string; cityName: string; cityState: string }[] {
  const seen = new Set<string>();
  const out: { name: string; type: string; cityName: string; cityState: string }[] = [];
  for (const c of cities) {
    for (const f of c.namedFacilities) {
      if (!seen.has(f.name)) {
        seen.add(f.name);
        out.push({ name: f.name, type: f.type, cityName: c.name, cityState: c.state });
      }
    }
  }
  return out;
}

// Map an industry pattern to the high-volume NDT methods used there. Used to
// build the "Methods most used across [Region]" section.
function methodsForIndustries(industries: string[]): { industry: string; methods: string[] }[] {
  const matchers: { match: RegExp; industry: string; methods: string[] }[] = [
    { match: /refin|petrochem|lng|chemical/i, industry: "Refining / petrochemical / LNG", methods: ["UT thickness (API 510/570/653 corrosion monitoring)", "RT (radiography of welds)", "MT (wet fluorescent on pressure vessels)", "PT (austenitic and non-ferrous welds)", "PAUT and TOFD on heavy-wall piping"] },
    { match: /aerospace|aviation/i, industry: "Aerospace / aviation MRO", methods: ["FPI (fluorescent penetrant on engine components)", "PT (NAS 410-traceable)", "UT and PAUT on rotating components", "Eddy current on fastener holes", "Bondtester / through-transmission on composites"] },
    { match: /nuclear|doe/i, industry: "Nuclear / DOE", methods: ["ASME Section XI ISI scans (UT, PAUT, ECT)", "RT on pressure boundary welds", "VT-1 / VT-2 / VT-3 visual examinations", "MT on ferromagnetic components", "Acoustic emission on containment"] },
    { match: /shipyard|navy|naval|marine|shipbuild/i, industry: "Shipyard / naval", methods: ["UT thickness on hull plate", "MT and PT on weldments", "RT on critical structural welds", "Phased-array on propeller shafts", "ABS / NAVSEA-traceable VT"] },
    { match: /pipeline|midstream|phmsa/i, industry: "Pipelines / midstream", methods: ["UT thickness (PHMSA-driven intervals)", "AUT on girth welds", "MFL inline inspection support", "RT on tie-ins", "GWT (guided wave) on insulated pipe"] },
    { match: /power|nerc/i, industry: "Power generation", methods: ["UT and PAUT on turbine rotors", "RT on header welds", "MT and PT on steam-piping", "Eddy current tube inspection", "Replication metallurgy"] },
    { match: /rail|fra|aar/i, industry: "Rail", methods: ["UT axle and wheel inspection (FRA Part 215)", "MT on bogie components", "Rail-flaw UT", "Visual under AAR Rule 1", "PT on welds"] },
    { match: /automotive|steel|heavy manuf|manufacturing/i, industry: "Heavy manufacturing / steel", methods: ["UT plate inspection", "MT and PT on welds (AWS D1.1)", "Hardness testing", "PMI / chemistry verification", "RT on critical castings"] },
    { match: /upstream|shale|oil/i, industry: "Upstream / oilfield", methods: ["UT thickness on drilling tubulars", "MT on threaded connections", "EMI / electromagnetic on tubing", "PT on field welds", "Hardness on stress-sensitive service"] },
    { match: /port|cruise/i, industry: "Port / marine terminals", methods: ["UT on crane structures", "MT on lifting equipment", "VT on mooring hardware", "Hardness on chain", "Rope-access inspection support"] },
    { match: /semicond|biotech|pharma/i, industry: "Semiconductor / pharma / biotech", methods: ["Borescope on process piping", "UT on cleanroom utilities", "Surface PT on hygienic welds", "RT on critical assemblies", "Helium leak testing"] },
  ];
  const out: { industry: string; methods: string[] }[] = [];
  const used = new Set<string>();
  for (const ind of industries) {
    for (const m of matchers) {
      if (m.match.test(ind) && !used.has(m.industry)) {
        used.add(m.industry);
        out.push({ industry: m.industry, methods: m.methods });
        break;
      }
    }
  }
  // Fallback so we always emit at least one row.
  if (out.length === 0) {
    out.push({ industry: "General industrial NDT", methods: ["UT", "RT", "MT", "PT", "VT"] });
  }
  return out.slice(0, 5);
}

export function FreeToolRegionPage({ tool, regionSlug, regionName, citiesInRegion }: Props) {
  const url = `${SITE}/free-tools/${tool.slug}/region/${regionSlug}`;

  const aggregatedIndustries = aggregateUnique(citiesInRegion, c => c.industries).slice(0, 7);
  const aggregatedAuthorities = aggregateUnique(citiesInRegion, c => c.codeAuthorities).slice(0, 8);
  const aggregatedFacilities = aggregateFacilities(citiesInRegion).slice(0, 12);
  const methodsBlock = methodsForIndustries(aggregatedIndustries);
  const cityNames = citiesInRegion.map(c => c.name);
  const firstCity = cityNames[0] || regionName;
  const lastCity = cityNames[cityNames.length - 1] || regionName;

  // Group US cities by state for a tidier listing; non-US render flat.
  const usCities = citiesInRegion.filter(c => c.country === "US");
  const nonUsCities = citiesInRegion.filter(c => c.country !== "US");
  const byState: Record<string, City[]> = {};
  for (const c of usCities) {
    (byState[c.state] = byState[c.state] || []).push(c);
  }
  const stateKeys = Object.keys(byState).sort();

  const alternateFeatures = FREE_TOOLS.filter(f => f.slug !== tool.slug);

  // 8-question regional FAQ.
  const regionalFaqs: { q: string; a: string }[] = [
    {
      q: `Can I track instruments and certs across multiple ${regionName} cities from one account?`,
      a: `Yes. The free tools are organised by company account, not by city. A single ${regionName} contractor running crews in ${firstCity}, ${cityNames[1] || lastCity}, and ${lastCity} sees one fleet view, one calibration alert pipeline, and one cert dashboard. Per-city tags let you filter without splitting accounts.`,
    },
    {
      q: `How does the ${tool.shortName} handle instruments that move between ${regionName} job sites?`,
      a: `Each instrument has a free-text location field. Update it when the kit ships. The audit history retains every previous location and date — useful for chain-of-custody questions during ${aggregatedAuthorities[0] || "code"} audits and customer prequalification reviews.`,
    },
    {
      q: `Are alerts routed differently for each ${regionName} sub-region?`,
      a: `You can configure multiple recipients per alert rule. Most multi-city ${regionName} contractors route the alert to (a) the corporate scheduler and (b) the regional Level III responsible for the instrument's home base. That way a calibration coming due in ${firstCity} reaches the ${firstCity} lead, not just the head office inbox.`,
    },
    {
      q: `Does the tool support ${aggregatedAuthorities.slice(0, 2).join(" and ")} workflows specifically?`,
      a: `The free tools track the metadata that those code regimes audit — instrument serial, calibration source-of-truth, due-date, owner, status, and personnel cert level/method/expiry. Procedure-level compliance (your written practice, your customer-specific procedure deviations) sits outside the free tier; it remains your responsibility under your QA manual.`,
    },
    {
      q: `Can I generate a per-city pre-job package from one ${regionName}-wide registry?`,
      a: `Yes. Filter by location, export the resulting equipment register and personnel-cert summary to CSV or PDF, and attach to your pre-job submission. ${regionName} oil-major and aerospace prime customers typically expect this artefact within 48 hours of mobilisation notice.`,
    },
    {
      q: `How does this differ from running spreadsheets per ${regionName} city?`,
      a: `Spreadsheets fragment as soon as you have crews in two locations. The free tools enforce a single source of truth — change a calibration due-date once and every alert, every dashboard, and every export reflects the new value. ${regionName}-wide visibility falls out of the data model rather than depending on a manual roll-up call every Monday.`,
    },
    {
      q: `Is there a limit on how many ${regionName} cities or job sites I can tag?`,
      a: `No hard limit. Whether you are a single-city ${firstCity} consultancy or a ${regionName}-wide contractor running 200 instruments across ten cities, the free tools scale to the same usage limits — there is no per-site fee.`,
    },
    {
      q: `What's the on-ramp for a ${regionName} crew currently using paper or a binder?`,
      a: `Plan one afternoon. Most ${regionName} contractors transcribe their existing equipment register and personnel cert binder in 2-3 hours. From that point forward the calibration alerts and audit-export functionality replace the need for the paper system entirely. The next customer audit becomes a 5-minute filter-and-export, not a two-day file hunt.`,
    },
  ];

  // SCHEMA GRAPHS
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Free ${tool.name} Software for NDT Companies in the ${regionName} (2026)`,
    description: `Free ${tool.name.toLowerCase()} for NDT inspection contractors operating across ${regionName} — covering ${cityNames.slice(0, 4).join(", ")} and ${cityNames.length - 4 > 0 ? `${cityNames.length - 4} more cities` : "more"}.`,
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    author: { "@type": "Organization", name: AUTHOR, url: SITE },
    publisher: { "@type": "Organization", name: "NDT Connect", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: "NDT Free Tools — Regional",
    keywords: [
      `free ${tool.name.toLowerCase()} ${regionName}`,
      `NDT software ${regionName}`,
      ...aggregatedIndustries.map(i => `${i} inspection software`),
    ].join(", "),
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Cities served in ${regionName}`,
    numberOfItems: citiesInRegion.length,
    itemListElement: citiesInRegion.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/free-tools/${tool.slug}/${c.slug}`,
      name: `${c.name}, ${c.state}`,
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: `${SITE}/free-tools` },
      { "@type": "ListItem", position: 3, name: tool.name, item: `${SITE}/free-tools/${tool.slug}` },
      { "@type": "ListItem", position: 4, name: regionName, item: url },
    ],
  };
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NDT Connect",
    url: SITE,
    logo: `${SITE}/logo.png`,
    sameAs: ["https://www.atlantisndt.com"],
    description: `Free software tools for NDT inspection companies — equipment management, calibration tracking, and certificate management. Used by inspection contractors across ${regionName} and beyond.`,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: regionalFaqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="free-tool-region space-y-12">
      <StructuredData data={articleSchema} />
      <StructuredData data={itemListSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={orgSchema} />
      <StructuredData data={faqSchema} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link href="/" style={{ color: "#004aad" }}>Home</Link>
        {" / "}
        <Link href="/free-tools" style={{ color: "#004aad" }}>Free Tools</Link>
        {" / "}
        <Link href={`/free-tools/${tool.slug}`} style={{ color: "#004aad" }}>{tool.name}</Link>
        {" / "}
        <span>{regionName}</span>
      </nav>

      {/* Hero */}
      <header className="py-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm px-6">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Free for NDT inspection companies — user ID only
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ color: "#004aad" }}>
          Free {tool.name} Software for NDT Companies in the {regionName}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
          One {tool.shortName} for every {regionName} job site — from {firstCity} to {lastCity}. Track instrument calibrations, alert before due-dates expire, and prove personnel-cert traceability across all {citiesInRegion.length} {regionName} cities we serve, free.
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
          Written by {AUTHOR} — Reviewed by {REVIEWER} — Last updated {UPDATED}
        </p>
      </header>

      {/* Industrial substrate of the region */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          The {regionName} NDT inspection landscape
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          The {regionName} concentrates a distinct mix of NDT-spend industries. The dominant verticals across our {citiesInRegion.length} curated {regionName} city pages are {aggregatedIndustries.slice(0, 5).join(", ")}{aggregatedIndustries.length > 5 ? `, and ${aggregatedIndustries.slice(5).join(", ")}` : ""}. Inspection contractors who win in this region run multi-city operations: a single Level III may sign reports for jobs in {firstCity} on Monday and {cityNames[1] || lastCity} by Thursday, with calibrated kit rotating between sites in between.
        </p>
        <p className="text-base text-muted-foreground mb-4">
          That cadence is what breaks spreadsheet-based equipment registers. Once your fleet sits at three or more job sites simultaneously, you cannot answer the basic auditor question — &quot;where is asset 14, when was it last calibrated, and who is qualified to operate it?&quot; — without a single live source of truth. The free {tool.shortName} provides that source for {regionName} contractors of every size, with no card-on-file and no per-instrument fee.
        </p>
        <p className="text-base text-muted-foreground">
          The pages below let you drill into any specific {regionName} city for industry-specific compliance context (named facilities, code authority overlays, audit windows). For multi-city contractors, this region rollup is where you start: it is the planning view that the city pages serve underneath.
        </p>
      </section>

      {/* Cities served in region */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Cities served in the {regionName}
        </h2>
        <p className="text-base text-muted-foreground mb-6">
          Every {regionName} city we cover has its own deep-dive page with local code authorities, named facilities, audit windows, and a city-specific compliance checklist. Pick yours below.
        </p>
        {stateKeys.length > 0 && (
          <div className="space-y-6">
            {stateKeys.map(state => (
              <div key={state}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "#004aad" }}>{state}</h3>
                <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {byState[state].map(c => (
                    <li key={c.slug}>
                      <Link href={`/free-tools/${tool.slug}/${c.slug}`} style={{ color: "#004aad" }}>
                        {c.name}, {c.state}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {nonUsCities.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: "#004aad" }}>International</h3>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {nonUsCities.map(c => (
                <li key={c.slug}>
                  <Link href={`/free-tools/${tool.slug}/${c.slug}`} style={{ color: "#004aad" }}>
                    {c.name}, {c.state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Why region inspection contractors choose this tool */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Why {regionName} inspection contractors choose {tool.shortName}
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          Five capabilities matter most to multi-city {regionName} NDT operations. Each is in the free tier — no upsell, no &quot;Pro&quot; gating.
        </p>
        <ul className="space-y-3">
          {tool.features.map((f, i) => (
            <li key={i} className="flex">
              <span className="mr-3" aria-hidden style={{ color: "#1F8A4F" }}>✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground mt-4">
          Combined, these capabilities replace the spreadsheet-and-binder system that breaks above two job sites. {regionName} contractors using the free tools report a 70-90% reduction in pre-mobilisation document scramble time.
        </p>
      </section>

      {/* Code authorities operating in region */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Code authorities operating in the {regionName}
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          NDT contractors working across the {regionName} typically operate under the following code regimes. Coverage of any single city may include a subset; the free tools track the metadata each of these authorities audits.
        </p>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
          {aggregatedAuthorities.map((a, i) => (
            <li key={i}>• {a}</li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground mt-4">
          The free {tool.shortName} does not replace your written practice or procedure-level compliance under any of these authorities — it tracks the data layer (instrument calibrations, personnel cert levels, due-dates) that auditors check against your written system.
        </p>
      </section>

      {/* Named facilities served from region */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Named facilities served from the {regionName}
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          A representative sample of the named facilities {regionName} NDT contractors mobilise to. The free tools support pre-job submissions, audit-pack exports, and cert-traceability proofs for every facility type below.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {aggregatedFacilities.map((f, i) => (
            <div key={i} className="p-3 rounded border bg-card text-sm">
              <div className="font-medium" style={{ color: "#0B1E33" }}>{f.name}</div>
              <div className="text-xs text-muted-foreground">{f.type} — {f.cityName}, {f.cityState}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Methods most used across region */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          NDT methods most used across the {regionName}
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          The {regionName}'s industry mix dictates the method mix. Below is the high-level method emphasis by dominant industry. The free {tool.shortName} supports the full ASNT SNT-TC-1A method list across every category — UT, RT, MT, PT, ET, VT, LT, AE, GWT, PAUT, TOFD, DR, CR, CT, NR, IR, MFL, plus shearography, hardness, PMI, RFT, and ACFM.
        </p>
        <div className="space-y-4">
          {methodsBlock.map((m, i) => (
            <div key={i} className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2" style={{ color: "#004aad" }}>{m.industry}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {m.methods.map((mm, j) => (
                  <li key={j}>• {mm}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-links / related */}
      <section className="container p-6 rounded-lg" style={{ backgroundColor: "#F5F7FA" }}>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Related free tools for the {regionName}
        </h2>
        <ul className="space-y-2">
          <li>
            <Link href={`/free-tools/${tool.slug}`} style={{ color: "#004aad" }}>
              Back to {tool.name} feature overview
            </Link>
          </li>
          {alternateFeatures.map(f => (
            <li key={f.slug}>
              <Link href={`/free-tools/${f.slug}/region/${regionSlug}`} style={{ color: "#004aad" }}>
                {f.name} for the {regionName}
              </Link>
            </li>
          ))}
          {alternateFeatures.map(f => (
            <li key={`alt-feat-${f.slug}`}>
              <Link href={`/free-tools/${f.slug}`} style={{ color: "#004aad" }}>
                {f.name} — feature overview
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Frequently asked questions about {tool.name.toLowerCase()} across the {regionName}
        </h2>
        <div className="space-y-6">
          {regionalFaqs.map((f, i) => (
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
          Free for {regionName} inspection companies
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Create a user ID and start tracking your {regionName} fleet today. No credit card. No trial expiry. Built for the multi-city operational reality of the {regionName} NDT market.
        </p>
        <Link
          href="/register"
          className="inline-block px-6 py-3 text-white text-base font-medium rounded-lg hover:opacity-90 transition-colors"
          style={{ backgroundColor: "#004aad" }}
        >
          Create your free user ID
        </Link>
        <p className="text-xs text-muted-foreground mt-4">
          Written by {AUTHOR} — Reviewed by {REVIEWER} — Last updated {UPDATED}
        </p>
      </section>
    </article>
  );
}
