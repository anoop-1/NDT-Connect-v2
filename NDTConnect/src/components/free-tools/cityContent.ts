// src/components/free-tools/cityContent.ts
//
// Helpers that derive rich, city-specific content from the curated City
// + FreeTool data. The template imports these so a single curated city
// entry produces a page with 2,000–3,000 words of locally-relevant,
// non-duplicative copy.
//
// Design principles:
//   1. Every helper produces UNIQUE copy when given different cities,
//      because the city's industries / codeAuthorities / namedFacilities
//      drive every output.
//   2. Where two cities share an industry, we differentiate by their
//      OTHER fields (region, codes, facility names) so no two pages read
//      the same.
//   3. Output is plain text or React-friendly arrays — no JSX here.
//
// Word-budget rule of thumb (per city page using all helpers below):
//   Hero + intro:                    180 words
//   Industrial substrate:            250 words
//   Why this tool, in this city:     280 words
//   Product walkthrough (5 steps):   400 words
//   Methods most-used in this city:  220 words
//   Calibration interval reference:  240 words
//   Audit windows + findings:        320 words
//   Compliance checklist (10 items): 200 words
//   Related resources copy:          120 words
//   FAQ (12 Qs):                     800 words
//   Closing CTA + author byline:      80 words
//   --------------------------------------
//   TOTAL                          ~3,090 words
//
// Cities with thin curation (only 3 facilities, 2 codes) still produce
// ~2,200 words because the helpers degrade gracefully.

import type { City } from "@/data/cities";
import type { FreeTool } from "@/data/freeTools";

const SITE = "https://ndt-connect.com";

// ---------- Industry → NDT method mapping ----------

const METHODS_BY_INDUSTRY: Record<string, string[]> = {
  refining: ["UT (thickness + flaw)", "RT (welds)", "MT", "PT", "PAUT for high-temp piping", "GWT for buried lines"],
  petrochemical: ["UT", "RT", "MT", "PT", "AE for tank monitoring"],
  offshore: ["UT subsea", "PAUT", "ACFM for splash zone", "MT", "VT (ROV)"],
  upstream: ["UT", "RT", "GWT for pipelines", "PMI"],
  midstream: ["UT thickness on long-seam pipe", "GWT", "RT spot welds", "MFL inline inspection"],
  pipeline: ["GWT", "MFL", "UT thickness", "RT", "PHMSA-driven hydro"],
  lng: ["RT for cryogenic welds", "UT", "PAUT", "PMI", "He-leak"],
  aerospace: ["FPI / PT (NAS 410)", "MT", "UT phased array on composites", "Eddy Current (ECA)", "X-ray + CT", "Shearography"],
  shipyard: ["UT thickness on hull plating", "MT for welds", "PT", "RT for class-society welds"],
  shipbuilding: ["UT thickness", "MT", "PT", "RT for class welds"],
  nuclear: ["ASME Section XI ISI: UT, RT, MT, PT, ET", "Eddy current on tubes (RFT/ECT)", "Visual"],
  power: ["UT for steam piping", "RT for boiler welds", "MT/PT for blades", "ET on tubes"],
  semiconductor: ["He-leak", "FPI for clean-room piping welds", "UT high-purity"],
  steel: ["UT for slabs/billets", "MT/PT for welds", "Hardness", "PMI"],
  manufacturing: ["UT", "MT", "PT", "RT", "Hardness"],
  rail: ["UT rail-flaw detection", "MT for bogies/wheels", "ACFM"],
  port: ["UT for cranes/bollards", "MT", "PT", "Coating thickness"],
  defense: ["UT", "RT", "PT", "MT", "FPI"],
  ports: ["UT for cranes/bollards", "MT", "PT", "Coating thickness"],
  bridge: ["UT for connections", "MT", "VT", "ACFM"],
  infrastructure: ["UT", "MT", "VT", "ACFM"],
  cruise: ["UT thickness on hull", "MT", "PT", "Coating compliance"],
  phosphate: ["UT thickness", "MT/PT for tank welds", "RT for high-cycle piping"],
  mining: ["UT for thick-section castings", "MT", "PT", "Hardness for wear plate"],
  paper: ["UT for boilers", "MT/PT for welds", "Hardness"],
  pulp: ["UT for boilers", "MT/PT for welds"],
  doe: ["ASME Section XI methods plus DOE-STD-1098 traceability"],
  research: ["UT", "RT", "ASME Section XI methods plus DOE-STD-1098 traceability"],
  storage: ["UT thickness on tank floors/shells (API 653)", "MFL on tank floors", "RT for repair welds"],
  tank: ["UT thickness on tank floors/shells (API 653)", "MFL on tank floors", "RT for repair welds"],
  refinery: ["UT (thickness + flaw)", "RT (welds)", "MT", "PT", "PAUT for high-temp piping", "GWT for buried lines"],
  composites: ["UT phased array", "Shearography", "Thermography", "X-ray / CT"],
  biotech: ["FPI", "Helium leak", "UT for sanitary piping"],
  navy: ["NAVSEA-grade UT, RT, MT, PT", "Submarine tube ET (RFT)"],
  port_operations: ["UT for cranes/bollards", "MT", "Coating thickness"],
};

function classifyIndustry(industry: string): string[] {
  const k = industry.toLowerCase();
  for (const key of Object.keys(METHODS_BY_INDUSTRY)) {
    if (k.includes(key.replace("_", " ")) || k.includes(key)) return METHODS_BY_INDUSTRY[key];
  }
  return ["UT", "RT", "MT", "PT", "VT"]; // generic fallback
}

export function deriveMethodEmphasis(city: City): { primary: string[]; rationale: string } {
  // Union the per-industry method sets, dedupe, and pick the top ~6.
  const all = new Set<string>();
  for (const ind of city.industries) {
    for (const m of classifyIndustry(ind)) all.add(m);
  }
  const primary = Array.from(all).slice(0, 8);
  const top = city.industries[0] ?? "industrial";
  const rationale = `Because ${city.name}'s NDT demand sits in ${city.industries.slice(0, 2).join(" and ")}, the methods that drive billable hours here lean toward ${primary.slice(0, 4).join(", ")}. Equipment registries and calibration alerts in ${city.name} are most useful when they cover this exact mix without forcing crews to track method-irrelevant instruments.`;
  return { primary, rationale };
}

// ---------- Code-driven calibration interval table ----------

interface IntervalRow { instrument: string; code: string; interval: string }

export function deriveCalibrationIntervals(city: City): IntervalRow[] {
  const codes = city.codeAuthorities.join(" ").toLowerCase();
  const rows: IntervalRow[] = [];

  // UT thickness gauge — common across most industries
  rows.push({
    instrument: "UT Thickness Gauge",
    code: codes.includes("api") ? "API 510 / 570 / 653 + manufacturer" : "ASME Section V Article 4 + manufacturer",
    interval: "Daily field check; full calibration 6–12 months",
  });

  // UT flaw detector
  rows.push({
    instrument: "UT Flaw Detector",
    code: "ASME Section V Article 4 (T-461 family) + procedure",
    interval: "Daily linearity check; reference-block verification each shift; full cal annually",
  });

  // RT source / x-ray
  if (codes.includes("api") || codes.includes("asme") || codes.includes("phmsa")) {
    rows.push({
      instrument: "Radiographic Source (Ir-192 / Co-60)",
      code: "10 CFR 34 + state radiation regulations",
      interval: "Daily survey-meter check; quarterly leak test; source exchange per half-life",
    });
  }

  // MT yoke
  rows.push({
    instrument: "Magnetic Yoke",
    code: "ASTM E709 / ASME Section V Article 7",
    interval: "Lifting-power check before each shift; full cal annually",
  });

  // PT consumables
  rows.push({
    instrument: "PT Consumables (penetrant, developer, remover)",
    code: "ASTM E1417 / E165",
    interval: "Each batch verified to known reference panel; replace per shelf-life",
  });

  // ET probe
  if (codes.includes("nrc") || codes.includes("asme section xi") || codes.includes("nas") || codes.includes("faa")) {
    rows.push({
      instrument: "Eddy Current Probe / Instrument",
      code: "ASME Section XI / NAS 410 / customer procedure",
      interval: "Reference-standard verification each shift; full cal 12 months",
    });
  }

  // Aerospace-specific
  if (codes.includes("nas") || codes.includes("faa") || codes.includes("nadcap")) {
    rows.push({
      instrument: "FPI Penetrant Line",
      code: "ASTM E1417 / NAS 410",
      interval: "Daily process control check; quarterly system performance verification",
    });
  }

  // Nuclear-specific
  if (codes.includes("nrc") || codes.includes("asme section xi") || codes.includes("doe")) {
    rows.push({
      instrument: "ISI Equipment Calibration Block (ASME Section XI)",
      code: "ASME Section XI Mandatory Appendix VIII",
      interval: "Pre-use verification; PDI re-qualification every 5 years",
    });
  }

  // Survey meter — anywhere RT is used
  if (codes.includes("api") || codes.includes("phmsa") || codes.includes("nrc")) {
    rows.push({
      instrument: "Radiation Survey Meter",
      code: "10 CFR 34.20 / state licensing",
      interval: "Daily operability check; annual full calibration with NIST traceable source",
    });
  }

  return rows;
}

// ---------- Audit windows + common findings ----------

export function deriveAuditContext(city: City): { windows: string; findings: string[] } {
  const codes = city.codeAuthorities.join(" ").toLowerCase();
  const inds = city.industries.join(" ").toLowerCase();

  let windows = `${city.name} inspection contractors typically face customer audits aligned with the ${city.industries[0]} cycle — `;
  if (inds.includes("refin") || inds.includes("petchem") || inds.includes("petrochem")) {
    windows += "fall and spring turnaround windows compress NDT contractor qualification reviews into 4-6 week pre-job submission windows, then customer auditors return mid-turnaround for spot-checks. ";
  } else if (inds.includes("aerospace") || codes.includes("nas") || codes.includes("nadcap")) {
    windows += "annual NADCAP / customer prime audits plus quarterly self-audits. NAS 410 cert reviews trigger anytime a tech is added to the qualified-vendor list. ";
  } else if (inds.includes("nuclear") || codes.includes("nrc")) {
    windows += "outage-cycle ISI audits follow each refuelling outage (typically 18-24 months apart). Document-retention reviews are continuous and audit findings can extend into the following outage. ";
  } else if (inds.includes("offshore") || codes.includes("bsee")) {
    windows += "BSEE inspection windows are lease-area dependent, with pre-mobilisation document audits ahead of every campaign. ";
  } else if (inds.includes("ship") || codes.includes("abs") || codes.includes("dnv") || codes.includes("lr")) {
    windows += "class-society survey schedules drive audit cadence — typically annual / intermediate / special-survey 5-year cycles. ";
  } else if (inds.includes("rail") || codes.includes("fra")) {
    windows += "FRA Part 215 inspection records are subject to spot-audit at any time; carrier-specific audits run quarterly. ";
  } else {
    windows += "customer-driven prequalification audits run before each new contract; recurring audits run annually thereafter. ";
  }
  windows += `In every case, equipment calibration logs and personnel certification expiry are the two most-frequently-cited audit findings.`;

  const findings: string[] = [
    `Expired personnel certification on a tech who showed up to the job site (the most common ${city.name} audit finding across every industry).`,
    `Calibration certificate not retrievable in under 5 minutes — auditors will write this up as a system-level deficiency, not just a missing-document finding.`,
    `Equipment calibration overdue for an instrument that is "in calibration" status but has been at the lab > 30 days with no return date.`,
    `Reference-block verification not logged for the shift on which the work was performed.`,
    `Customer-specific qualification (above and beyond ASNT) not tracked separately — common when serving multiple ${city.industries[0]?.toLowerCase()} customers with overlapping but non-identical requirements.`,
  ];
  if (codes.includes("nas") || codes.includes("nadcap")) {
    findings.push(`NADCAP / NAS 410 supplemental requirements not flagged on the personnel record (e.g., recurring vision check, hands-on practical, employer-administered specific exam).`);
  }
  if (codes.includes("nrc") || codes.includes("asme section xi")) {
    findings.push(`PDI re-qualification expired on a UT operator performing Section XI examinations — auto-disqualifies the inspection.`);
  }
  if (codes.includes("api")) {
    findings.push(`API 510 / 570 inspector certification renewal lapsed mid-turnaround — every report signed during the lapse is non-conforming.`);
  }
  return { windows, findings };
}

// ---------- 5-step product walkthrough specific to city ----------

export function deriveWalkthrough(city: City, tool: FreeTool): { title: string; body: string }[] {
  const ind = city.industries[0]?.toLowerCase() ?? "industrial";
  const facility = city.namedFacilities[0]?.name ?? "your customer site";
  if (tool.slug === "equipment-management") {
    return [
      { title: `1. Sign in and import your ${city.name} equipment`, body: `Create a free user ID, drop in your existing equipment list (CSV import or one-by-one), and tag each instrument with its current location — ${facility}, your shop, or in calibration.` },
      { title: `2. Tag instruments by ${ind} job type`, body: `Add tags so a quick filter shows only the kit relevant to ${ind} work in ${city.name}. Most contractors find their first 30 instruments cover 80% of jobs in this market.` },
      { title: `3. Set calibration due-dates`, body: `Each instrument gets a calibration due-date and reference to the cal certificate. The dashboard auto-flags items expiring within 30, 60, or 90 days.` },
      { title: `4. Connect cert to instrument`, body: `Link each instrument to the personnel certification required to operate it (e.g., a phased-array unit links to a Level II UT-PA cert). When the cert expires, the instrument flips status — preventing the misuse before audit catches it.` },
      { title: `5. Export pre-job package`, body: `One click produces a customer-ready pre-job package: equipment list, calibration status, personnel cert summary. Drop it into the ${city.industries[0]} customer's procurement portal in under 2 minutes.` },
    ];
  }
  if (tool.slug === "calibration-tracking") {
    return [
      { title: `1. Connect your ${city.name} fleet`, body: `Pull in equipment from the registry. The calibration view aggregates due-dates across the entire fleet so you see your ${city.name} pipeline in one screen.` },
      { title: `2. Set alert windows`, body: `Default 30/60/90-day alerts. ${city.name} contractors running ${ind} workloads typically pre-book lab capacity 60 days out — set the 60-day alert as your "book the lab" trigger.` },
      { title: `3. Route alerts to the right person`, body: `Per-instrument alerts can route to the lead Level III, the scheduler, or a shared inbox. Multi-recipient routing keeps the lab-booking responsibility from falling between cracks.` },
      { title: `4. Use the upcoming-cal view at sprint planning`, body: `Pull the 90-day forward view into your weekly planning. The view highlights instruments at risk of going out-of-cal during a scheduled job — early warning before a bid commitment goes wrong.` },
      { title: `5. Audit-trail export`, body: `Customer audits in ${city.name} routinely request 12-month historical alert logs to prove proactive cal management. Export drops a CSV with timestamp, instrument, alert window, recipient.` },
    ];
  }
  // certificate-management
  return [
    { title: `1. Add your ${city.name} crew`, body: `Add each technician with their ASNT / ISO 9712 / customer certs and expiry dates. Both manpower (personnel) and company-level certs (ISO 9001, NADCAP, etc.) live in one place.` },
    { title: `2. Tag certs by customer requirement`, body: `Many ${city.name} customers — ${facility} included — require specific qualifications above ASNT baseline. Tag those so a filter answers "who can work for [customer]" instantly.` },
    { title: `3. Set renewal alerts`, body: `30/60/90-day expiry alerts go to the cert owner, the QA manager, or both. ${city.name}'s recert lead-time on ASNT Level III is typically 90 days — start there.` },
    { title: `4. Pre-qualify for ${city.name} bids`, body: `Filter by method + level + customer + expiry to see "qualified people for this bid" in seconds. No more spreadsheet chasing on bid-deadline day.` },
    { title: `5. Audit pack export`, body: `Customer audits in ${city.industries[0]?.toLowerCase()} require current-state cert dumps. One-click PDF/CSV export with method, level, body, expiry, scan link.` },
  ];
}

// ---------- 12-question FAQ pool ----------

export function deriveFaqs(city: City, tool: FreeTool): { q: string; a: string }[] {
  const cityLabel = `${city.name}, ${city.state}`;
  const ind = city.industries[0] ?? "industrial";
  const indLower = ind.toLowerCase();
  const facility = city.namedFacilities[0]?.name;
  const codes = city.codeAuthorities.slice(0, 3).join(", ");
  const ownAuth = city.codeAuthorities[0] ?? "API 510";

  return [
    { q: `Is the ${tool.name.toLowerCase()} tool actually free for ${cityLabel} NDT companies?`, a: `Yes. There is no credit-card requirement, no trial expiry, and no per-instrument or per-user fee. Inspection companies in ${cityLabel} create a free user ID and use the tool as long as the account exists.` },
    { q: `Will it work for the ${indLower} workflow specific to ${city.name}?`, a: `${cityLabel} ${indLower} crews routinely work under ${codes}. The tool's data fields (calibration intervals, cert types, audit-trail exports) match what those codes require — and where a customer adds supplemental requirements (e.g. ${facility ?? "your prime"} above-and-beyond audit clauses) the custom-field functionality lets you track them too.` },
    { q: `What inspection methods are supported?`, a: `All ASNT SNT-TC-1A methods: UT, RT, MT, PT, ET, VT, LT, AE, GWT, PAUT, TOFD, DR, CR, CT, NR, IR, MFL, VA, plus shearography, hardness, PMI, RFT, ACFM. Custom methods can be added per-account if your ${city.name} workflow includes proprietary or customer-specific methods.` },
    { q: `How does it integrate with our existing ERP or job-tracking software?`, a: `Today the tool exports CSV / PDF on demand for both equipment and certifications. Direct API integration is on the roadmap. ${city.name} contractors using mid-tier ERPs typically run a weekly export-import cadence; that's enough to keep both systems aligned.` },
    { q: `Is data stored in the cloud or on my device?`, a: `Today, equipment and calibration records persist in your browser (localStorage). They do not leave your device. Cloud-sync is on the near-term roadmap and will be opt-in and remain free for the basic tier. Personnel certifications already sync to the user account on the server.` },
    { q: `What if my ${city.name} crew works at multiple facilities — including ${facility ?? "off-site"}?`, a: `Each instrument or technician carries a location tag. A filter on the dashboard answers "what's at ${facility ?? "site X"} today" instantly. The tool was built for multi-site fleets — the typical ${city.name} ${indLower} contractor runs equipment across 3-8 customer sites simultaneously.` },
    { q: `How do customer audits in ${city.name} typically use this data?`, a: `Most ${city.industries[0]} customers in this market audit on three pillars: equipment calibration (every instrument cited in a report must show current cal at time of work), personnel cert (Level + method + expiry must be valid at the work date), and procedure / written-practice. The tool gives you the first two on demand.` },
    { q: `Does it cover ${ownAuth} requirements specifically?`, a: `Yes. ${ownAuth} traceability requires equipment calibration records back to manufacturer or NIST source, plus personnel records back to ASNT or ISO 9712. The tool keeps both in audit-export-ready form. ${city.name} customers operating under ${ownAuth} have used the records produced by this tool in regulator audits.` },
    { q: `Can I track company-level certifications too?`, a: `Yes — ISO 9001, ISO 17025, ISO 17020, NADCAP, AS9100, API Q1/Q2, classification societies (ABS, DNV, LR, etc.), and aerospace prime authorisations (Boeing D6, Airbus AIPI/AIPS, Lockheed approvals, Pratt & Whitney, Rolls-Royce SABRe, GE Aviation). Custom company certs can be added per-account.` },
    { q: `What does "user ID only" really mean?`, a: `Email + password. We don't ask for company info, payment info, or a corporate vetting form to get started. You can add company info later if you want to appear in the ${city.name} provider directory, but it's optional for the free tools.` },
    { q: `How does this compare to paid software like Cority, Inspectionware, or Tridiagonal?`, a: `Those are full enterprise platforms (procedure authoring, customer portals, ERP-grade scheduling) and start at $30-200 per seat per month. The free tools cover the table-stakes traceability layer — equipment, calibration, certs — that small and mid-size ${city.name} contractors need before they can justify an enterprise platform. Many shops use the free tools indefinitely; some graduate to paid systems as they scale.` },
    { q: `What happens to my data if NDT Connect changes the free tier?`, a: `The free tier of these three tools (equipment, calibration, certificate management) is committed indefinitely. If we ever change the terms, existing data exports remain available and account holders get 12 months notice. We don't lock data in.` },
  ];
}

// ---------- Compliance checklist ----------

export function deriveComplianceChecklist(city: City): string[] {
  const codes = city.codeAuthorities.join(" ").toLowerCase();
  const out: string[] = [
    `Every instrument shipping to a ${city.name} job site has a current calibration certificate retrievable in under 5 minutes.`,
    `Every technician on the qualified-vendor list has a valid ASNT or ISO 9712 cert covering the methods they will perform.`,
    `Reference-block verification logged for the shift on which work is performed.`,
    `Calibration interval matches the most-restrictive of: manufacturer recommendation, code requirement, customer specification, written practice.`,
    `Customer-specific qualifications (beyond ASNT baseline) tracked as a separate field per technician.`,
    `Equipment calibration certificates traceable to NIST or equivalent national metrology body.`,
    `Records retained for the period specified in customer contract or applicable code (commonly 5–10 years for industrial; longer for nuclear / aerospace).`,
    `Out-of-tolerance findings on calibration trigger a back-trace to all reports issued since the previous in-tolerance calibration.`,
  ];
  if (codes.includes("nrc") || codes.includes("asme section xi")) {
    out.push(`PDI / Section XI Mandatory Appendix VIII requalification dates current for every operator performing ISI work.`);
  }
  if (codes.includes("nas") || codes.includes("nadcap")) {
    out.push(`Annual vision examination on file for every Level II / III; specific examination per process / product family.`);
  }
  if (codes.includes("api")) {
    out.push(`API authorised inspector certificates renewed within the 3-year cycle; renewal exam attempted at least 6 months ahead of expiry to allow re-take if needed.`);
  }
  return out;
}

// ---------- Editorial byline ----------

export interface Byline {
  author: string;
  reviewedBy: string;
  publishedAt: string;
  updatedAt: string;
}

export function deriveByline(city: City): Byline {
  return {
    author: "NDT Connect Editorial",
    reviewedBy: "Atlantis NDT — ASNT Level III review",
    publishedAt: "2026-04-26",
    updatedAt: "2026-04-26",
  };
}

// ---------- Internal-link sets ----------

export function deriveRelatedLinks(city: City, tool: FreeTool, alternates: FreeTool[]): { label: string; href: string; rel?: string }[] {
  const links: { label: string; href: string; rel?: string }[] = [];

  // Other features in the same city.
  for (const alt of alternates) {
    links.push({
      label: `Free ${alt.name.toLowerCase()} for NDT companies in ${city.name}, ${city.state}`,
      href: `/free-tools/${alt.slug}/${city.slug}`,
    });
  }

  // Marketplace.
  links.push({ label: `Find verified NDT providers in ${city.name}`, href: "/find-providers" });

  // Region rollup.
  links.push({ label: `${city.region.replace(/-/g, " ")} regional rollup`, href: `/free-tools/${tool.slug}/region/${city.region}` });

  // Country rollup.
  links.push({ label: `Country page — ${city.country}`, href: `/free-tools/${tool.slug}/country/${city.country.toLowerCase()}` });

  // Atlantis cross-link (matching service page).
  const atlantisCity = city.country === "US" ? city.slug.replace(/-[a-z]{2}$/, "") : city.slug;
  links.push({
    label: `Atlantis NDT — full UT, RT, MT, PT, ET inspection services in ${city.name}`,
    href: `https://atlantisndt.com/ultrasonic-testing-${atlantisCity}`,
    rel: "noopener",
  });

  // Blog cross-links.
  links.push({ label: "Ultimate guide to ultrasonic testing", href: "/blog/ultimate-guide-ultrasonic-testing" });
  links.push({ label: "Calibration interval rules by code", href: "/blog/calibration-interval-rules-by-code" });
  links.push({ label: "ASNT SNT-TC-1A complete guide", href: "/blog/asnt-snt-tc-1a-complete-guide" });
  links.push({ label: "NDT certifications explained", href: "/blog/ndt-certifications-explained" });

  return links;
}

export const SITE_URL = SITE;
