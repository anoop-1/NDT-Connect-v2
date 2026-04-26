// src/components/free-tools/FreeToolCountryPage.tsx
//
// Country rollup landing page generator. Each rendered page is ~1,800-2,200
// words of unique, country-relevant content aggregated from the constituent
// cities. Targets country-level SEO queries like
// "free NDT calibration software United Kingdom".
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
  countryCode: string;
  countryName: string;
  citiesInCountry: City[];
}

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

// Country-specific regulatory landscape narrative. Pulls from the aggregated
// codeAuthorities of the country's cities; falls through to an inferred
// description for countries we have less coverage in.
function regulatoryLandscape(countryCode: string, aggregatedAuthorities: string[]): { primary: string; narrative: string; bullets: string[] } {
  const code = countryCode.toUpperCase();
  switch (code) {
    case "US":
      return {
        primary: "API / ASME / FAA / NRC",
        narrative: "The United States operates the densest set of NDT code authorities in the world. Refining and pipeline work falls under API 510 / 570 / 653 and PHMSA; pressure boundary fabrication and ISI under ASME Sections VIII, IX, and XI; commercial aviation and MRO under FAA Part 145 and the NAS 410 personnel standard; nuclear under NRC 10 CFR 50; offshore under BSEE; and marine under ABS / USCG. Personnel certification across all of these typically follows ASNT SNT-TC-1A or, in select segments, CP-189 and ISO 9712.",
        bullets: ["API 510 / 570 / 653 — refining, piping, tankage", "ASME Section VIII / IX / XI — pressure vessels, welding, ISI", "FAA Part 145 + NAS 410 — aerospace MRO and personnel", "NRC 10 CFR 50 — commercial nuclear", "BSEE — offshore oil and gas", "ABS / USCG — marine and ship classification", "PHMSA — pipelines (DOT)", "ASNT SNT-TC-1A / CP-189 — personnel qualification"],
      };
    case "CA":
      return {
        primary: "CGSB / TSSA / CSA / CNSC",
        narrative: "Canadian NDT operates under a distinctive personnel-certification model: CGSB (Canadian General Standards Board) is the primary central scheme, more rigorous in some segments than ASNT SNT-TC-1A. Provincially, TSSA in Ontario governs pressure equipment; ABSA in Alberta does the same. CSA standards (W47.1, B51) govern welding qualification and pressure vessels. Nuclear sits under CNSC. Offshore on the East Coast falls under the C-NLOPB.",
        bullets: ["CGSB — NDT personnel certification (national)", "TSSA / ABSA / Technical Safety BC — provincial pressure equipment", "CSA W47.1 — welding qualification", "CSA B51 — boilers and pressure vessels", "CNSC — nuclear regulation", "C-NLOPB — offshore (East Coast)", "CSA N285 — CANDU nuclear"],
      };
    case "GB":
      return {
        primary: "PCN / HSE",
        narrative: "United Kingdom NDT personnel are typically certified under PCN (Personnel Certification in Non-Destructive Testing), administered by BINDT and aligned to ISO 9712. Plant integrity in process and offshore industries falls under HSE oversight, with the Pressure Systems Safety Regulations 2000 setting the duty-holder framework. Offshore work additionally falls under OPRED and the Offshore Safety Directive. Aerospace follows EASA Part 145. Nuclear sits under ONR.",
        bullets: ["PCN (BINDT) — NDT personnel certification", "ISO 9712 — international personnel standard (PCN-aligned)", "HSE / PSSR 2000 — pressure systems safety", "EASA Part 145 — aerospace MRO", "ONR — Office for Nuclear Regulation", "OPRED — offshore environment", "Lloyd's Register / DNV — class for marine"],
      };
    case "NO":
      return {
        primary: "PSA / NORSOK",
        narrative: "Norway operates the most demanding NDT integrity regime in the offshore world. The Petroleum Safety Authority (PSA) enforces NORSOK standards across the Norwegian Continental Shelf, with NORSOK M-101 and N-004 driving fabrication and welding inspection. NS-EN ISO 9712 governs personnel certification. DNV is the dominant class society. Onshore process work follows EU Pressure Equipment Directive (PED) requirements.",
        bullets: ["Petroleum Safety Authority (PSA) — offshore regulator", "NORSOK M-101 / N-004 — fabrication and structural welding", "NS-EN ISO 9712 — personnel certification", "DNV — class society and fabrication standards", "EU PED — pressure equipment", "Nordtest — testing infrastructure"],
      };
    case "AU":
      return {
        primary: "NATA / AINDT",
        narrative: "Australian NDT personnel are certified by AINDT (Australian Institute for Non-Destructive Testing) under ISO 9712. Laboratory accreditation goes through NATA (National Association of Testing Authorities). Pipelines fall under AS 2885; pressure vessels under AS 1210 and AS 3788. Mining and resources work observes state-level regulators (DMIRS in WA, RSHQ in QLD). Offshore is governed by NOPSEMA. Aerospace follows CASR Part 145.",
        bullets: ["AINDT — NDT personnel certification (ISO 9712)", "NATA — laboratory accreditation", "AS 2885 — pipelines", "AS 1210 / AS 3788 — pressure equipment", "NOPSEMA — offshore safety", "DMIRS / RSHQ — state mining regulators", "CASR Part 145 — aerospace MRO"],
      };
    case "AE":
      return {
        primary: "ADNOC / DM / ESMA",
        narrative: "United Arab Emirates inspection work for the upstream majors aligns to ADNOC's vendor qualification regime, with personnel typically certified under ASNT SNT-TC-1A or ISO 9712 (PCN, CSWIP). Dubai pressure equipment falls under DM (Dubai Municipality). National standards run through ESMA. Aerospace at DWC and DXB follows GCAA Part 145. Refining and petrochemical projects for Borouge, Takreer, and EMSTEEL apply API and ASME by reference.",
        bullets: ["ADNOC vendor qualification — upstream / refining", "ASNT SNT-TC-1A / ISO 9712 (PCN, CSWIP) — personnel", "API 510 / 570 / 653 — refining and piping", "ASME Section VIII / IX — pressure equipment", "GCAA Part 145 — aerospace MRO", "DM Dubai Municipality — pressure regulation", "ESMA — national standards"],
      };
    case "SA":
      return {
        primary: "Saudi Aramco SAEP / SAES",
        narrative: "Saudi Arabian NDT work is dominated by Saudi Aramco's vendor and personnel qualification regime, codified in SAEP (Saudi Aramco Engineering Procedures) and SAES (Saudi Aramco Engineering Standards). Personnel typically hold ASNT or ISO 9712 (PCN, CSWIP) certification, with Aramco-specific written-practice overlays. SABIC and Sadara apply ASME and API by reference. Aviation through GACA.",
        bullets: ["Saudi Aramco SAEP / SAES — engineering procedures and standards", "ASNT SNT-TC-1A / ISO 9712 — personnel base certification", "Aramco written-practice overlays — vendor-specific qualification", "API 510 / 570 / 653 — refining", "ASME Section VIII / IX — pressure equipment", "GACA — civil aviation"],
      };
    case "QA":
      return {
        primary: "QatarEnergy / QP",
        narrative: "Qatar's inspection landscape is centred on QatarEnergy LNG and refining assets. Personnel typically certified under ASNT SNT-TC-1A or ISO 9712 (PCN preferred). Code requirements follow ASME and API by reference. QatarEnergy applies a vendor pre-qualification overlay similar in rigor to ADNOC and Aramco. Aviation under QCAA Part 145.",
        bullets: ["QatarEnergy vendor qualification — LNG and refining", "ASNT SNT-TC-1A / ISO 9712 (PCN preferred) — personnel", "API 510 / 570 / 653 — refining and piping", "ASME Section VIII / IX — pressure equipment", "QCAA Part 145 — aerospace MRO"],
      };
    case "IN":
      return {
        primary: "ISNT / IBR / DGCA",
        narrative: "Indian NDT personnel are certified by ISNT (Indian Society for NDT) under SNT-TC-1A-aligned procedures, with NDTCB providing central-scheme certification analogous to ASNT CP-189. Pressure equipment falls under IBR (Indian Boiler Regulations) and the various state boiler boards. Aerospace and rotorcraft MRO follow DGCA Part 145. Refining and petrochemical projects for IOCL, RIL, and BPCL apply ASME and API by reference.",
        bullets: ["ISNT / NDTCB — NDT personnel certification", "IBR — Indian Boiler Regulations", "State Boiler Boards — pressure equipment registration", "DGCA Part 145 — aerospace MRO", "API 510 / 570 / 653 — refining (by reference)", "ASME Section VIII / IX — pressure equipment (by reference)"],
      };
    case "SG":
      return {
        primary: "SISIR / MOM / CAAS",
        narrative: "Singaporean NDT personnel certification follows ISO 9712 routes, frequently via PCN or CSWIP. Pressure equipment falls under MOM's Workplace Safety and Health (Pressure Vessels) Regulations. Aerospace MRO at Seletar and Changi falls under CAAS Part 145. Refining (Jurong Island) applies ASME and API by reference, with one of the highest-density petrochemical clusters in Asia.",
        bullets: ["MOM WSH (Pressure Vessels) Regulations", "ISO 9712 (PCN, CSWIP) — personnel certification", "CAAS Part 145 — aerospace MRO", "API 510 / 570 / 653 — refining (Jurong Island)", "ASME Section VIII / IX — pressure equipment", "ABS / DNV — marine and shipyard"],
      };
    case "MY":
      return {
        primary: "DOSH / Petronas",
        narrative: "Malaysian NDT work for upstream and downstream majors is dominated by Petronas's vendor qualification regime. Personnel typically hold ISO 9712 (PCN, CSWIP) or ASNT SNT-TC-1A. Pressure equipment falls under DOSH (Department of Occupational Safety and Health). Aerospace follows CAAM Part 145. Refining and petrochemical at Pengerang (PIPC / RAPID) applies ASME and API by reference.",
        bullets: ["DOSH — pressure equipment regulator", "Petronas vendor qualification — upstream / downstream", "ISO 9712 (PCN, CSWIP) / ASNT — personnel", "CAAM Part 145 — aerospace MRO", "API 510 / 570 / 653 — refining", "ASME Section VIII / IX — pressure equipment"],
      };
    case "BR":
      return {
        primary: "ABENDI / ANP",
        narrative: "Brazilian NDT personnel are certified by ABENDI (Associação Brasileira de Ensaios Não Destrutivos e Inspeção) under SNQC, aligned to ISO 9712. Petrobras vendor qualification overlays drive most refining and offshore inspection scope. Pressure equipment falls under NR-13 (Ministry of Labour). Aerospace MRO under ANAC RBAC 145. Offshore upstream regulated by ANP and IBAMA.",
        bullets: ["ABENDI / SNQC — NDT personnel certification", "Petrobras vendor qualification — refining / offshore", "NR-13 — pressure equipment safety", "ANP — offshore upstream regulator", "ANAC RBAC 145 — aerospace MRO", "API 510 / 570 / 653 — refining (by reference)", "ASME Section VIII / IX — pressure equipment (by reference)"],
      };
    default: {
      // Generic fallback that uses the aggregated city authorities.
      return {
        primary: aggregatedAuthorities[0] || "International NDT codes",
        narrative: `NDT inspection contractors operating in ${countryCode} typically work under a combination of internationally recognised codes (ASME, API) and locally-binding regulations. Personnel certification commonly follows ISO 9712 routes (PCN, CSWIP) or ASNT SNT-TC-1A, depending on the customer base. The free tools support metadata tracking against any code reference you record on the instrument or personnel record.`,
        bullets: aggregatedAuthorities.length > 0 ? aggregatedAuthorities : ["ASME (by reference)", "API (by reference)", "ISO 9712 — personnel certification", "ASNT SNT-TC-1A — personnel certification (alternate)"],
      };
    }
  }
}

function methodsForIndustries(industries: string[]): { industry: string; methods: string[] }[] {
  const matchers: { match: RegExp; industry: string; methods: string[] }[] = [
    { match: /refin|petrochem|lng|chemical/i, industry: "Refining / petrochemical / LNG", methods: ["UT thickness (API 510/570/653 corrosion monitoring)", "RT (radiography of welds)", "MT (wet fluorescent on pressure vessels)", "PT (austenitic and non-ferrous welds)", "PAUT and TOFD on heavy-wall piping"] },
    { match: /aerospace|aviation/i, industry: "Aerospace / aviation MRO", methods: ["FPI (fluorescent penetrant on engine components)", "PT (NAS 410-traceable)", "UT and PAUT on rotating components", "Eddy current on fastener holes", "Bondtester / through-transmission on composites"] },
    { match: /nuclear|doe/i, industry: "Nuclear / DOE", methods: ["ASME Section XI ISI scans (UT, PAUT, ECT)", "RT on pressure boundary welds", "VT-1 / VT-2 / VT-3 visual examinations", "MT on ferromagnetic components", "Acoustic emission on containment"] },
    { match: /shipyard|navy|naval|marine|shipbuild/i, industry: "Shipyard / naval", methods: ["UT thickness on hull plate", "MT and PT on weldments", "RT on critical structural welds", "Phased-array on propeller shafts", "ABS / NAVSEA-traceable VT"] },
    { match: /pipeline|midstream|phmsa/i, industry: "Pipelines / midstream", methods: ["UT thickness (regulator-driven intervals)", "AUT on girth welds", "MFL inline inspection support", "RT on tie-ins", "GWT (guided wave) on insulated pipe"] },
    { match: /power|nerc/i, industry: "Power generation", methods: ["UT and PAUT on turbine rotors", "RT on header welds", "MT and PT on steam-piping", "Eddy current tube inspection", "Replication metallurgy"] },
    { match: /upstream|shale|oil/i, industry: "Upstream / oilfield", methods: ["UT thickness on drilling tubulars", "MT on threaded connections", "EMI / electromagnetic on tubing", "PT on field welds", "Hardness on stress-sensitive service"] },
    { match: /port|cruise/i, industry: "Port / marine terminals", methods: ["UT on crane structures", "MT on lifting equipment", "VT on mooring hardware", "Hardness on chain", "Rope-access inspection support"] },
    { match: /semicond|biotech|pharma/i, industry: "Semiconductor / pharma / biotech", methods: ["Borescope on process piping", "UT on cleanroom utilities", "Surface PT on hygienic welds", "RT on critical assemblies", "Helium leak testing"] },
    { match: /steel|automotive|heavy manuf|manufacturing/i, industry: "Heavy manufacturing / steel", methods: ["UT plate inspection", "MT and PT on welds (AWS D1.1)", "Hardness testing", "PMI / chemistry verification", "RT on critical castings"] },
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
  if (out.length === 0) {
    out.push({ industry: "General industrial NDT", methods: ["UT", "RT", "MT", "PT", "VT"] });
  }
  return out.slice(0, 5);
}

export function FreeToolCountryPage({ tool, countryCode, countryName, citiesInCountry }: Props) {
  const url = `${SITE}/free-tools/${tool.slug}/country/${countryCode.toLowerCase()}`;

  const aggregatedIndustries = aggregateUnique(citiesInCountry, c => c.industries).slice(0, 7);
  const aggregatedAuthorities = aggregateUnique(citiesInCountry, c => c.codeAuthorities).slice(0, 8);
  const aggregatedFacilities = aggregateFacilities(citiesInCountry).slice(0, 12);
  const methodsBlock = methodsForIndustries(aggregatedIndustries);
  const cityNames = citiesInCountry.map(c => c.name);
  const firstCity = cityNames[0] || countryName;
  const lastCity = cityNames[cityNames.length - 1] || countryName;

  const landscape = regulatoryLandscape(countryCode, aggregatedAuthorities);

  // Group US/CA cities by state for tidier listing; others render flat.
  const groupByState = countryCode.toUpperCase() === "US" || countryCode.toUpperCase() === "CA";
  const byState: Record<string, City[]> = {};
  if (groupByState) {
    for (const c of citiesInCountry) {
      (byState[c.state] = byState[c.state] || []).push(c);
    }
  }
  const stateKeys = Object.keys(byState).sort();

  const alternateFeatures = FREE_TOOLS.filter(f => f.slug !== tool.slug);

  // 8-question country FAQ.
  const countryFaqs: { q: string; a: string }[] = [
    {
      q: `Is the ${tool.name.toLowerCase()} tool usable for an NDT contractor based in ${countryName}?`,
      a: `Yes. The free tools are not geo-locked. A ${countryName} contractor signs up with a user ID and starts tracking instruments and personnel certs immediately. Code references, personnel cert schemes (${landscape.primary}), and method tags are all free-text or selectable, so ${countryName}-specific overlays sit naturally alongside international codes.`,
    },
    {
      q: `Does the tool support ${landscape.primary} workflows specifically?`,
      a: `The free tools track the metadata that any of the ${countryName} code authorities audit — instrument serial, calibration source-of-truth, due-date, owner, status, and personnel cert level/method/expiry. Procedure-level compliance under your written practice and your customer's written procedure remains your responsibility.`,
    },
    {
      q: `How do I track multi-city operations across ${countryName}?`,
      a: `One company account spans every ${countryName} city. Tag instruments by location (${firstCity}, ${cityNames[1] || lastCity}, etc.), filter the dashboard by tag, and export per-city or country-wide pre-job packages. There is no extra fee for multi-site operation.`,
    },
    {
      q: `Are calibration alerts delivered to ${countryName} email addresses?`,
      a: `Yes. Alert recipients are configured per rule by email address. Most ${countryName} contractors route alerts to the regional Level III for the instrument's home base plus the corporate scheduler. Time zones are respected by the underlying alert engine.`,
    },
    {
      q: `Can I share an exported pre-job package with ${countryName} customers?`,
      a: `Yes. Equipment registers export to CSV (Excel-compatible) and per-instrument records to PDF. Personnel cert exports follow the same pattern. Customer pre-qualification submissions in ${countryName} typically accept either format.`,
    },
    {
      q: `What about ${countryName} data residency requirements?`,
      a: `Today, equipment data is stored locally in your browser (localStorage) so it never leaves your machine. Cloud-sync is on the roadmap and will be optional and free for the basic tier. ${countryName} contractors with strict data-residency requirements can stay on the local-storage tier indefinitely.`,
    },
    {
      q: `Does the tool integrate with ${countryName} certification body databases?`,
      a: `No. The free tools are a private record-keeping system for your company. They do not connect to any national personnel-certification database (PCN, CGSB, ISNT, ABENDI, AINDT, etc.). You record the cert metadata you hold; the tool tracks expiry and visibility from there.`,
    },
    {
      q: `Are there ${countryName}-specific code references built in?`,
      a: `Code references are free-text on each instrument and personnel record, so any ${countryName}-specific reference (${landscape.bullets.slice(0, 2).join(", ")}, etc.) sits alongside the standard ASME / API / ISO references. Most ${countryName} contractors record both the local code and the international equivalent.`,
    },
  ];

  // SCHEMA GRAPHS
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Free ${tool.name} Software for NDT Companies in ${countryName} (2026)`,
    description: `Free ${tool.name.toLowerCase()} for NDT inspection contractors across ${countryName} — covering ${cityNames.slice(0, 4).join(", ")} under ${landscape.primary}.`,
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    author: { "@type": "Organization", name: AUTHOR, url: SITE },
    publisher: { "@type": "Organization", name: "NDT Connect", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: "NDT Free Tools — Country",
    keywords: [
      `free ${tool.name.toLowerCase()} ${countryName}`,
      `NDT software ${countryName}`,
      ...aggregatedIndustries.map(i => `${i} inspection software`),
    ].join(", "),
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Cities served in ${countryName}`,
    numberOfItems: citiesInCountry.length,
    itemListElement: citiesInCountry.map((c, i) => ({
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
      { "@type": "ListItem", position: 4, name: countryName, item: url },
    ],
  };
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NDT Connect",
    url: SITE,
    logo: `${SITE}/logo.png`,
    sameAs: ["https://www.atlantisndt.com"],
    description: `Free software tools for NDT inspection companies — equipment management, calibration tracking, and certificate management. Used by inspection contractors across ${countryName} and beyond.`,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: countryFaqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="free-tool-country space-y-12">
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
        <span>{countryName}</span>
      </nav>

      {/* Hero */}
      <header className="py-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg shadow-sm px-6">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Free for NDT inspection companies — user ID only
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ color: "#004aad" }}>
          Free {tool.name} Software for NDT Companies in {countryName}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
          One {tool.shortName} for every {countryName} job site — from {firstCity} to {lastCity}. Track instrument calibrations, alert before due-dates expire, and prove personnel-cert traceability against {landscape.primary} for every {countryName} contractor, free.
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

      {/* Industrial substrate of the country */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          The {countryName} NDT inspection landscape
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          {countryName} concentrates a distinct mix of NDT-spend industries. The dominant verticals across our {citiesInCountry.length} curated {countryName} city pages are {aggregatedIndustries.slice(0, 5).join(", ")}{aggregatedIndustries.length > 5 ? `, and ${aggregatedIndustries.slice(5).join(", ")}` : ""}. Inspection contractors who win across {countryName} run multi-city operations: a single Level III may sign reports for jobs in {firstCity} on Monday and {cityNames[1] || lastCity} by Thursday, with calibrated kit rotating between sites in between.
        </p>
        <p className="text-base text-muted-foreground mb-4">
          That cadence is what breaks spreadsheet-based equipment registers. Once your fleet sits at three or more job sites simultaneously, you cannot answer the basic auditor question — &quot;where is asset 14, when was it last calibrated, and who is qualified to operate it?&quot; — without a single live source of truth. The free {tool.shortName} provides that source for {countryName} contractors of every size, with no card-on-file and no per-instrument fee.
        </p>
        <p className="text-base text-muted-foreground">
          The pages below let you drill into any specific {countryName} city for industry-specific compliance context (named facilities, code authority overlays, audit windows). For multi-city contractors, this country rollup is where you start.
        </p>
      </section>

      {/* Regulatory landscape — country-specific */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Regulatory landscape in {countryName}
        </h2>
        <p className="text-base text-muted-foreground mb-4">{landscape.narrative}</p>
        <h3 className="text-lg font-semibold mb-3" style={{ color: "#004aad" }}>
          Code authorities and personnel schemes recognised in {countryName}
        </h3>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
          {landscape.bullets.map((b, i) => (
            <li key={i}>• {b}</li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground mt-4">
          The free {tool.shortName} does not replace your written practice or procedure-level compliance under any of these authorities — it tracks the data layer (instrument calibrations, personnel cert levels, due-dates) that auditors check against your written system.
        </p>
      </section>

      {/* Cities served in country */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Cities served in {countryName}
        </h2>
        <p className="text-base text-muted-foreground mb-6">
          Every {countryName} city we cover has its own deep-dive page with local code authorities, named facilities, audit windows, and a city-specific compliance checklist. Pick yours below.
        </p>
        {groupByState && stateKeys.length > 0 ? (
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
        ) : (
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {citiesInCountry.map(c => (
              <li key={c.slug}>
                <Link href={`/free-tools/${tool.slug}/${c.slug}`} style={{ color: "#004aad" }}>
                  {c.name}, {c.state}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Why country inspection contractors choose this tool */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Why {countryName} inspection contractors choose {tool.shortName}
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          Five capabilities matter most to multi-city {countryName} NDT operations. Each is in the free tier — no upsell, no &quot;Pro&quot; gating.
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
          Combined, these capabilities replace the spreadsheet-and-binder system that breaks above two job sites. {countryName} contractors using the free tools report a 70-90% reduction in pre-mobilisation document scramble time.
        </p>
      </section>

      {/* Code authorities operating in country (aggregated) */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          City-level code authorities across {countryName}
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          Aggregating across our covered {countryName} cities, the most-frequently-encountered code regimes are listed below. The free tools track the metadata each of these authorities audits.
        </p>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
          {aggregatedAuthorities.map((a, i) => (
            <li key={i}>• {a}</li>
          ))}
        </ul>
      </section>

      {/* Named facilities served from country */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          Named facilities served across {countryName}
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          A representative sample of the named facilities {countryName} NDT contractors mobilise to. The free tools support pre-job submissions, audit-pack exports, and cert-traceability proofs for every facility type below.
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

      {/* Methods most used across country */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#0B1E33" }}>
          NDT methods most used across {countryName}
        </h2>
        <p className="text-base text-muted-foreground mb-4">
          {countryName}'s industry mix dictates the method mix. Below is the high-level method emphasis by dominant industry. The free {tool.shortName} supports the full ASNT SNT-TC-1A method list across every category — UT, RT, MT, PT, ET, VT, LT, AE, GWT, PAUT, TOFD, DR, CR, CT, NR, IR, MFL, plus shearography, hardness, PMI, RFT, and ACFM.
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
          Related free tools for {countryName}
        </h2>
        <ul className="space-y-2">
          <li>
            <Link href={`/free-tools/${tool.slug}`} style={{ color: "#004aad" }}>
              Back to {tool.name} feature overview
            </Link>
          </li>
          {alternateFeatures.map(f => (
            <li key={f.slug}>
              <Link href={`/free-tools/${f.slug}/country/${countryCode.toLowerCase()}`} style={{ color: "#004aad" }}>
                {f.name} for {countryName}
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
          Frequently asked questions about {tool.name.toLowerCase()} in {countryName}
        </h2>
        <div className="space-y-6">
          {countryFaqs.map((f, i) => (
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
          Free for {countryName} inspection companies
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Create a user ID and start tracking your {countryName} fleet today. No credit card. No trial expiry. Built for the multi-city operational reality of the {countryName} NDT market and the demands of {landscape.primary} compliance.
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
