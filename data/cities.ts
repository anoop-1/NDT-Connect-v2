// src/data/cities.ts
// Hand-curated city dataset for the /free-tools/[feature]/[city] generator.
// Each entry is a unique data row consumed by CityPage.tsx. Adding a new city
// here automatically generates one URL per free-tool feature in freeTools.ts.
//
// Curate every field. Avoid auto-generated filler — Google's helpful-content
// system will down-rank a "doorway" set of pages that share generic copy.
//
// Slug = kebab-case. Must be unique. Do not change a slug after launch
// (you would lose accumulated authority and create a 404).

export type CityTier = 1 | 2 | 3 | 4;

export interface City {
  slug: string;
  name: string;
  state: string;          // 2-letter for US/CA; full name elsewhere
  country: string;        // ISO 3166-1 alpha-2
  region: string;         // matches a region slug for the rollup page
  tier: CityTier;
  industries: string[];
  codeAuthorities: string[];
  namedFacilities: { name: string; type: string }[];
  localPainQuote: string;
  faqOverrides?: { q: string; a: string }[];
  latitude?: number;
  longitude?: number;
}

// Canonical type alias used by SEO routes. lat/long are the canonical names;
// latitude/longitude on the data rows are accepted and normalised by helpers
// in lib/seo-helpers.ts (see getCityLatLong).
export type CityData = City & { lat?: number; long?: number };

// Tier-1 cities are inlined in this file. Tier 2 / 3 / 4 live in dedicated
// extension files so the diff-per-PR stays reviewable. They are merged into
// the exported CITIES at module load.
import { CITIES_TIER_2 } from "./cities-tier2";
import { CITIES_TIER_3_4 } from "./cities-tier3-4";

const TIER_1_CITIES: City[] = [
  // ---------------- TIER 1 — US Gulf Coast ----------------
  {
    slug: "houston-tx",
    name: "Houston", state: "TX", country: "US",
    region: "gulf-coast", tier: 1,
    industries: ["Petrochemical refining", "Offshore oil and gas", "LNG export", "Port operations", "Aerospace (Johnson Space Center)"],
    codeAuthorities: ["API 510 / 570 / 653", "ASME Section VIII / IX / XI", "BSEE for offshore", "TCEQ for environmental"],
    namedFacilities: [
      { name: "ExxonMobil Baytown Refinery", type: "Refinery" },
      { name: "LyondellBasell Channelview Complex", type: "Petrochemical" },
      { name: "Port of Houston", type: "Port" },
      { name: "Shell Deer Park", type: "Refinery" },
      { name: "Cheniere Sabine Pass LNG (regional)", type: "LNG export" },
    ],
    localPainQuote: "Turnaround season in Houston compresses every NDT contractor's calibration and certification window — losing a Level II UT tech to an expired cert can cost a six-figure shift.",
    latitude: 29.7604, longitude: -95.3698,
  },
  {
    slug: "beaumont-tx",
    name: "Beaumont", state: "TX", country: "US",
    region: "gulf-coast", tier: 1,
    industries: ["Refining", "Petrochemical", "Pipelines"],
    codeAuthorities: ["API 510 / 570 / 653", "TCEQ", "ASME Section VIII"],
    namedFacilities: [
      { name: "ExxonMobil Beaumont Refinery", type: "Refinery" },
      { name: "Motiva Port Arthur (regional)", type: "Refinery" },
      { name: "Total Port Arthur (regional)", type: "Refinery" },
    ],
    localPainQuote: "Two refinery majors in 30 miles means two pre-job qualification systems running in parallel — the only way to avoid double-tracking certs is a single private vault.",
  },
  {
    slug: "corpus-christi-tx",
    name: "Corpus Christi", state: "TX", country: "US",
    region: "gulf-coast", tier: 1,
    industries: ["Refining", "LNG export", "Offshore terminals"],
    codeAuthorities: ["API 510 / 570 / 653", "PHMSA for pipelines", "USCG for marine terminals"],
    namedFacilities: [
      { name: "Cheniere Corpus Christi LNG", type: "LNG export" },
      { name: "Flint Hills Resources Corpus Christi", type: "Refinery" },
      { name: "Valero Bill Greehey Refinery", type: "Refinery" },
    ],
    localPainQuote: "LNG export construction projects burn through inspection capacity — a missed RT source recertification stops the clock on a $2M weld inspection package.",
  },
  {
    slug: "midland-tx",
    name: "Midland", state: "TX", country: "US",
    region: "permian-basin", tier: 1,
    industries: ["Permian shale upstream", "Midstream pipelines", "Oilfield services"],
    codeAuthorities: ["API 570 for piping", "PHMSA"],
    namedFacilities: [
      { name: "Permian Basin Petroleum Museum (regional context)", type: "Industrial heritage" },
      { name: "Diamondback Energy operations", type: "Upstream operator" },
      { name: "Pioneer Natural Resources", type: "Upstream operator" },
    ],
    localPainQuote: "Permian rig counts swing 30% quarter-over-quarter — calibration scheduling has to flex with the rig count or your fleet sits idle in cal labs while jobs are awarded to competitors.",
  },
  {
    slug: "odessa-tx",
    name: "Odessa", state: "TX", country: "US",
    region: "permian-basin", tier: 1,
    industries: ["Permian shale upstream", "Refining", "Midstream pipelines"],
    codeAuthorities: ["API 510 / 570", "PHMSA"],
    namedFacilities: [
      { name: "Energy Transfer assets (regional)", type: "Midstream" },
      { name: "Delek Big Spring Refinery (regional)", type: "Refinery" },
    ],
    localPainQuote: "Mobilising NDT crews from Odessa across West Texas means tracking equipment at five client sites simultaneously without losing chain-of-custody on any single instrument.",
  },
  {
    slug: "baton-rouge-la",
    name: "Baton Rouge", state: "LA", country: "US",
    region: "gulf-coast", tier: 1,
    industries: ["Refining", "Petrochemical", "Specialty chemicals"],
    codeAuthorities: ["API 510 / 570 / 653", "LDEQ"],
    namedFacilities: [
      { name: "ExxonMobil Baton Rouge Refinery", type: "Refinery" },
      { name: "Shell Geismar Plant (regional)", type: "Petrochemical" },
      { name: "Dow Plaquemine (regional)", type: "Petrochemical" },
    ],
    localPainQuote: "Mississippi-river-corridor turnarounds cluster from October to February — keeping every Level II's recert current ahead of that window is a six-month planning exercise.",
  },
  {
    slug: "lake-charles-la",
    name: "Lake Charles", state: "LA", country: "US",
    region: "gulf-coast", tier: 1,
    industries: ["LNG export", "Petrochemical", "Refining"],
    codeAuthorities: ["API 510 / 570 / 653", "PHMSA"],
    namedFacilities: [
      { name: "Sasol Lake Charles", type: "Petrochemical" },
      { name: "Cameron LNG", type: "LNG export" },
      { name: "Cheniere Sabine Pass LNG", type: "LNG export" },
      { name: "Phillips 66 Lake Charles Refinery", type: "Refinery" },
    ],
    localPainQuote: "LNG plant inspections run on rigid contractor-qualification matrices — a single expired ASNT Level II disqualifies a 10-person crew.",
  },
  {
    slug: "new-orleans-la",
    name: "New Orleans", state: "LA", country: "US",
    region: "gulf-coast", tier: 1,
    industries: ["Offshore oil and gas operations", "Marine inspection", "Shipyard repair"],
    codeAuthorities: ["BSEE", "USCG", "ABS / DNV / LR"],
    namedFacilities: [
      { name: "Avondale Marine (regional)", type: "Shipyard" },
      { name: "Bollinger Shipyards (regional)", type: "Shipyard" },
      { name: "Port of New Orleans", type: "Port" },
    ],
    localPainQuote: "Crew-boat and supply-vessel inspection windows overlap with refinery turnarounds — a missing UT thickness gauge calibration cert delays a vessel's class survey.",
  },
  {
    slug: "oklahoma-city-ok",
    name: "Oklahoma City", state: "OK", country: "US",
    region: "mid-continent", tier: 1,
    industries: ["Midstream pipelines", "Crude storage", "Aerospace MRO (Tinker AFB)"],
    codeAuthorities: ["API 570", "PHMSA", "FAA Part 145 for aerospace MRO"],
    namedFacilities: [
      { name: "Tinker Air Force Base", type: "Aerospace MRO" },
      { name: "Cushing tank farm (regional)", type: "Crude storage hub" },
    ],
    localPainQuote: "Pipeline operators in the OK midstream require API 570 calibration traceability on every UT thickness gauge — losing the audit trail loses the contract.",
  },
  {
    slug: "tulsa-ok",
    name: "Tulsa", state: "OK", country: "US",
    region: "mid-continent", tier: 1,
    industries: ["Midstream", "Refining", "Energy services HQs"],
    codeAuthorities: ["API 510 / 570 / 653", "PHMSA"],
    namedFacilities: [
      { name: "HollyFrontier Tulsa Refinery", type: "Refinery" },
      { name: "ONEOK HQ (gas processing)", type: "Midstream" },
    ],
    localPainQuote: "Tulsa-based midstream majors run nationwide pipeline fleets — Tulsa NDT contractors mobilise calibrated kits to four time zones without losing track of which instrument is where.",
  },
  // ---------------- TIER 1 — Mountain West ----------------
  {
    slug: "denver-co",
    name: "Denver", state: "CO", country: "US",
    region: "mountain-west", tier: 1,
    industries: ["Oil and gas (Niobrara Basin)", "Aerospace HQs", "Manufacturing"],
    codeAuthorities: ["API 570", "ASME", "FAA Part 145"],
    namedFacilities: [
      { name: "Suncor Commerce City Refinery", type: "Refinery" },
      { name: "Lockheed Martin Denver", type: "Aerospace" },
    ],
    localPainQuote: "Front Range NDT inspection windows are short — the high-altitude calibration interval drift on portable UT equipment has to be tracked tighter than coastal benchmarks.",
  },
  {
    slug: "casper-wy",
    name: "Casper", state: "WY", country: "US",
    region: "mountain-west", tier: 1,
    industries: ["Oil and gas upstream (Powder River Basin)", "Refining", "Pipelines and midstream"],
    codeAuthorities: ["API 510 / 570", "PHMSA", "ASME B31.4 / B31.8"],
    namedFacilities: [
      { name: "Sinclair Casper Refinery", type: "Refinery" },
      { name: "Sinclair Wyoming Refining (Sinclair, regional)", type: "Refinery" },
    ],
    localPainQuote: "Wyoming winters extend equipment turnaround for repair and recalibration — the planning lead time on a single phased-array unit can run 60 days, and Powder River midstream operators want PHMSA-defensible weld-NDT records ahead of every freeze season.",
  },
  {
    slug: "salt-lake-city-ut",
    name: "Salt Lake City", state: "UT", country: "US",
    region: "mountain-west", tier: 1,
    industries: ["Refining", "Mining", "Aerospace"],
    codeAuthorities: ["API 510 / 570", "ASME", "MSHA"],
    namedFacilities: [
      { name: "Marathon Salt Lake City Refinery", type: "Refinery" },
      { name: "Chevron Salt Lake Refinery", type: "Refinery" },
      { name: "Hill Air Force Base", type: "Aerospace MRO" },
    ],
    localPainQuote: "Wasatch-front refining clusters with aerospace MRO — NDT crews crossing both worlds need cert traceability across ASNT and FAA Part 145 systems.",
  },
  // ---------------- TIER 1 — California / West Coast ----------------
  {
    slug: "bakersfield-ca",
    name: "Bakersfield", state: "CA", country: "US",
    region: "west-coast", tier: 1,
    industries: ["Oil and gas upstream", "Refining", "Pipelines and midstream"],
    codeAuthorities: ["CalGEM", "API 570"],
    namedFacilities: [
      { name: "Kern River Field", type: "Upstream" },
      { name: "Phillips 66 Wilmington (regional)", type: "Refinery" },
    ],
    localPainQuote: "California's CalGEM compliance windows require granular instrument-level audit trails — manual spreadsheets break under regulator scrutiny.",
  },
  {
    slug: "los-angeles-ca",
    name: "Los Angeles", state: "CA", country: "US",
    region: "west-coast", tier: 1,
    industries: ["Refining", "Ports", "Aerospace"],
    codeAuthorities: ["API 510 / 570 / 653", "FAA Part 145", "USCG"],
    namedFacilities: [
      { name: "Marathon Los Angeles Refinery", type: "Refinery" },
      { name: "Phillips 66 Wilmington", type: "Refinery" },
      { name: "Port of Los Angeles", type: "Port" },
      { name: "Northrop Grumman El Segundo", type: "Aerospace" },
    ],
    localPainQuote: "South Bay aerospace primes audit subcontractor NDT files quarterly — a missing NAS 410 cert renewal disqualifies a vendor from the prime list for 12 months.",
  },
  {
    slug: "san-francisco-ca",
    name: "San Francisco", state: "CA", country: "US",
    region: "west-coast", tier: 1,
    industries: ["Refining (Bay Area)", "Aerospace", "Biotech infrastructure"],
    codeAuthorities: ["API 510 / 570", "BAAQMD"],
    namedFacilities: [
      { name: "Chevron Richmond Refinery", type: "Refinery" },
      { name: "Marathon Martinez Refinery", type: "Refinery" },
      { name: "PBF Martinez Refinery", type: "Refinery" },
    ],
    localPainQuote: "BAAQMD requires inspection records to be defensible at unannounced audits — every instrument calibration certificate has to be retrievable in minutes.",
  },
  {
    slug: "san-diego-ca",
    name: "San Diego", state: "CA", country: "US",
    region: "west-coast", tier: 1,
    industries: ["US Navy", "Aerospace", "Shipbuilding"],
    codeAuthorities: ["NAVSEA", "ABS", "FAA Part 145"],
    namedFacilities: [
      { name: "Naval Base San Diego", type: "Navy" },
      { name: "General Dynamics NASSCO", type: "Shipbuilding" },
      { name: "Northrop Grumman Rancho Bernardo", type: "Aerospace" },
    ],
    localPainQuote: "Navy contracts demand single-point traceability from technician cert to instrument calibration to inspection record — fragmented spreadsheets fail SUBSAFE-style audits.",
  },
  {
    slug: "seattle-wa",
    name: "Seattle", state: "WA", country: "US",
    region: "pacific-northwest", tier: 1,
    industries: ["Aerospace (Boeing)", "Shipbuilding", "Maritime"],
    codeAuthorities: ["FAA Part 145", "NAS 410", "ABS"],
    namedFacilities: [
      { name: "Boeing Renton (737)", type: "Aerospace" },
      { name: "Boeing Everett (777, 767, 747)", type: "Aerospace" },
      { name: "Vigor Industrial Shipyard", type: "Shipbuilding" },
    ],
    localPainQuote: "Boeing's NAS 410 compliance requires up-to-date Level II/III certification visibility for every contractor inspector on every shift — a gap shuts the work centre down.",
  },
  {
    slug: "everett-wa",
    name: "Everett", state: "WA", country: "US",
    region: "pacific-northwest", tier: 1,
    industries: ["Aerospace (Boeing 787, 777, 747)", "Composites inspection", "Naval operations"],
    codeAuthorities: ["FAA Part 145", "NAS 410", "AS9100", "NAVSEA"],
    namedFacilities: [
      { name: "Boeing Everett Factory", type: "Aerospace" },
      { name: "Naval Station Everett", type: "USN homeport (DDG / CG)" },
    ],
    localPainQuote: "Composite inspection crews at Boeing Everett need real-time visibility on UT phased-array calibration status — a single uncalibrated instrument fails composite PA scans across an entire shift.",
  },
  {
    slug: "portland-or",
    name: "Portland", state: "OR", country: "US",
    region: "pacific-northwest", tier: 1,
    industries: ["Aerospace composites", "Manufacturing", "Steel"],
    codeAuthorities: ["FAA Part 145", "ASME"],
    namedFacilities: [
      { name: "Daimler Trucks North America", type: "Manufacturing" },
      { name: "Boeing Portland", type: "Aerospace" },
    ],
    localPainQuote: "Pacific Northwest aerospace composite inspection contractors have to keep level-of-effort visibility across small crews — losing a single Level II to an expired cert breaks a job.",
  },
  // ---------------- TIER 1 — Southwest ----------------
  {
    slug: "phoenix-az",
    name: "Phoenix", state: "AZ", country: "US",
    region: "southwest", tier: 1,
    industries: ["Aerospace", "Semiconductor manufacturing", "Nuclear power generation"],
    codeAuthorities: ["FAA Part 145", "NAS 410", "SEMI standards"],
    namedFacilities: [
      { name: "Honeywell Aerospace Phoenix", type: "Aerospace" },
      { name: "Intel Chandler Fab", type: "Semiconductor" },
      { name: "TSMC Phoenix Fab (regional)", type: "Semiconductor" },
    ],
    localPainQuote: "Semiconductor and aerospace primes both audit NDT subcontractors quarterly — the cost of an audit miss is permanent removal from the qualified vendor list.",
  },
  {
    slug: "tucson-az",
    name: "Tucson", state: "AZ", country: "US",
    region: "southwest", tier: 1,
    industries: ["Aerospace and defense", "Mining (copper)", "Military aviation MRO"],
    codeAuthorities: ["FAA Part 145", "NAS 410", "DCMA", "MSHA"],
    namedFacilities: [
      { name: "Raytheon Tucson (RTX Missiles and Defense)", type: "Defense missiles" },
      { name: "Davis-Monthan AFB (AMARG aircraft boneyard)", type: "Military aviation storage / MRO" },
      { name: "Asarco Mission Mine (regional)", type: "Copper mining" },
    ],
    localPainQuote: "Defense primes apply DCMA-style audit standards to NDT subcontractors — an expired ASNT cert on file is treated as a non-conformance, and AMARG returns aircraft to service on the same audit-grade NDT records.",
  },
  // ---------------- TIER 1 — Texas Triangle (non-Houston) ----------------
  {
    slug: "dallas-tx",
    name: "Dallas", state: "TX", country: "US",
    region: "texas-triangle", tier: 1,
    industries: ["Aerospace and defense", "Heavy manufacturing", "Pipelines and midstream"],
    codeAuthorities: ["FAA Part 145", "NAS 410", "ASME", "PHMSA"],
    namedFacilities: [
      { name: "Bell Textron Hurst (regional)", type: "Rotorcraft manufacturing" },
      { name: "Lockheed Martin Missiles and Fire Control (Grand Prairie, regional)", type: "Defense manufacturing" },
      { name: "Raytheon McKinney (regional)", type: "Defense electronics" },
    ],
    localPainQuote: "Dallas-based NDT shops support Texas-wide rotor-craft and aerospace MRO — chain-of-custody on instrument calibration across multiple state-line jobs is the operational pain.",
  },
  {
    slug: "fort-worth-tx",
    name: "Fort Worth", state: "TX", country: "US",
    region: "texas-triangle", tier: 1,
    industries: ["Aerospace (Lockheed F-35, Bell)", "Heavy manufacturing", "Rail and logistics"],
    codeAuthorities: ["FAA Part 145", "NAS 410", "DCMA"],
    namedFacilities: [
      { name: "Lockheed Martin Fort Worth", type: "Aerospace" },
      { name: "Bell Textron Fort Worth", type: "Aerospace" },
    ],
    localPainQuote: "F-35 program audits NDT subcontractors against DCMA standards — single-instrument cert traceability is the difference between a passing and failing audit.",
  },
  {
    slug: "san-antonio-tx",
    name: "San Antonio", state: "TX", country: "US",
    region: "texas-triangle", tier: 1,
    industries: ["Oil and gas support", "Aerospace MRO", "USAF"],
    codeAuthorities: ["FAA Part 145", "NAS 410"],
    namedFacilities: [
      { name: "Joint Base San Antonio", type: "Military" },
      { name: "Boeing San Antonio Aerospace MRO", type: "Aerospace MRO" },
    ],
    localPainQuote: "Mid-continent gas processing and USAF MRO both use NDT subcontractors — bridging the two compliance frameworks requires unified cert and equipment records.",
  },
  // ---------------- TIER 1 — Midwest ----------------
  {
    slug: "kansas-city-mo",
    name: "Kansas City", state: "MO", country: "US",
    region: "midwest", tier: 1,
    industries: ["Manufacturing", "Rail", "Aerospace defense"],
    codeAuthorities: ["FRA", "AAR", "ASME"],
    namedFacilities: [
      { name: "Honeywell FM&T Kansas City", type: "Defense" },
      { name: "BNSF Railway Kansas City Hub", type: "Rail" },
    ],
    localPainQuote: "Rail wheel and bogie inspections fall under FRA Part 215 audit cycles — instrument calibration logs are inspected at every audit.",
  },
  {
    slug: "chicago-il",
    name: "Chicago", state: "IL", country: "US",
    region: "midwest", tier: 1,
    industries: ["Rail", "Power generation", "Manufacturing"],
    codeAuthorities: ["FRA", "ASME Section XI for nuclear", "NRC"],
    namedFacilities: [
      { name: "Argonne National Laboratory (regional)", type: "Research" },
      { name: "Exelon Braidwood Nuclear (regional)", type: "Nuclear" },
    ],
    localPainQuote: "Midwest nuclear utilities audit ISI contractor cert chains every outage — gaps detected during the outage cost six-figure schedule slips.",
  },
  {
    slug: "detroit-mi",
    name: "Detroit", state: "MI", country: "US",
    region: "great-lakes", tier: 1,
    industries: ["Automotive", "Steel", "Heavy manufacturing"],
    codeAuthorities: ["AWS D1.1", "ASME"],
    namedFacilities: [
      { name: "Ford Rouge Complex", type: "Automotive" },
      { name: "Stellantis Detroit Assembly", type: "Automotive" },
      { name: "AK Steel Dearborn (regional)", type: "Steel" },
    ],
    localPainQuote: "Automotive weld-quality programs audit ASNT certs annually — keeping every weld inspector's recert current on a fast turnover line is the persistent challenge.",
  },
  {
    slug: "cleveland-oh",
    name: "Cleveland", state: "OH", country: "US",
    region: "great-lakes", tier: 1,
    industries: ["Steel", "Heavy manufacturing", "Power generation"],
    codeAuthorities: ["ASME", "AWS D1.1"],
    namedFacilities: [
      { name: "Cleveland-Cliffs Cleveland Works", type: "Steel" },
      { name: "FirstEnergy Davis-Besse (regional)", type: "Nuclear" },
    ],
    localPainQuote: "Steel-mill PT and MT cycles run continuously — calibration on consumables and reference materials has to be tracked daily, not weekly.",
  },
  {
    slug: "pittsburgh-pa",
    name: "Pittsburgh", state: "PA", country: "US",
    region: "great-lakes", tier: 1,
    industries: ["Steel", "Nuclear services", "Heavy manufacturing"],
    codeAuthorities: ["ASME Section XI", "NRC", "AWS"],
    namedFacilities: [
      { name: "U.S. Steel Mon Valley Works", type: "Steel" },
      { name: "Westinghouse Cranberry HQ", type: "Nuclear services" },
    ],
    localPainQuote: "ASME Section XI nuclear inspections demand multi-decade traceability of every instrument calibration — paper logs no longer pass NRC reviews.",
  },
  // ---------------- TIER 1 — Northeast ----------------
  {
    slug: "philadelphia-pa",
    name: "Philadelphia", state: "PA", country: "US",
    region: "northeast", tier: 1,
    industries: ["Refining (legacy + biofuels)", "Pharma manufacturing", "Commercial shipbuilding"],
    codeAuthorities: ["API 510 / 570", "FDA cGMP", "ABS", "Jones Act"],
    namedFacilities: [
      { name: "Monroe Energy Trainer Refinery (regional)", type: "Refinery" },
      { name: "Philly Shipyard (Aker Philadelphia)", type: "Commercial shipbuilder (Jones Act vessels)" },
    ],
    localPainQuote: "Northeast refinery contractors juggle API and pharma-cGMP compliance frameworks — neither permits expired-cert technicians on site, and Philly Shipyard adds an ABS weld-NDT layer on top.",
  },
  {
    slug: "newark-nj",
    name: "Newark", state: "NJ", country: "US",
    region: "northeast", tier: 1,
    industries: ["Port operations", "Refining", "Pipelines"],
    codeAuthorities: ["USCG", "API 570", "PHMSA"],
    namedFacilities: [
      { name: "Phillips 66 Bayway Refinery (regional)", type: "Refinery" },
      { name: "Port Newark", type: "Port" },
    ],
    localPainQuote: "Mid-Atlantic refinery and port-tankage inspections cluster around marine schedules — NDT crews need lab-cal turnaround predictability that matches tide windows.",
  },
  {
    slug: "new-york-ny",
    name: "New York", state: "NY", country: "US",
    region: "northeast", tier: 1,
    industries: ["Construction QA", "Bridge inspection", "Infrastructure"],
    codeAuthorities: ["ASME", "AASHTO bridge inspection", "ASNT SNT-TC-1A"],
    namedFacilities: [
      { name: "MTA bridges and tunnels", type: "Infrastructure" },
      { name: "Port Authority of NY/NJ", type: "Infrastructure" },
    ],
    localPainQuote: "NYC infrastructure inspections operate under multi-decade audit retention — every cert and every cal record is subpoena-bound.",
  },
  {
    slug: "boston-ma",
    name: "Boston", state: "MA", country: "US",
    region: "northeast", tier: 1,
    industries: ["Aerospace", "Biotech infrastructure", "Naval"],
    codeAuthorities: ["FAA Part 145", "NAS 410", "ABS"],
    namedFacilities: [
      { name: "General Electric Aviation Lynn", type: "Aerospace" },
      { name: "BAE Systems Hingham (regional)", type: "Defense" },
    ],
    localPainQuote: "GE Aviation Lynn audits subcontractor NDT records every jet-engine campaign — a single missed Level III recert removes a vendor from rotation.",
  },
  {
    slug: "hartford-ct",
    name: "Hartford", state: "CT", country: "US",
    region: "northeast", tier: 1,
    industries: ["Aerospace (Pratt & Whitney)", "Defense (Sikorsky)", "Nuclear ISI services"],
    codeAuthorities: ["FAA Part 145", "NAS 410"],
    namedFacilities: [
      { name: "Pratt & Whitney East Hartford", type: "Aerospace" },
      { name: "Sikorsky Stratford (regional)", type: "Aerospace" },
    ],
    localPainQuote: "Pratt & Whitney engine inspections require Level III sign-off on every UT report — losing a single Level III to an expired recert stalls the line.",
  },
  // ---------------- TIER 1 — Southeast ----------------
  {
    slug: "charlotte-nc",
    name: "Charlotte", state: "NC", country: "US",
    region: "southeast", tier: 1,
    industries: ["Power generation (Duke Energy)", "Gas turbine manufacturing", "Nuclear ISI services"],
    codeAuthorities: ["NERC", "ASME Section XI for nuclear", "NRC"],
    namedFacilities: [
      { name: "Duke Energy Charlotte HQ", type: "Power generation operator" },
      { name: "Siemens Energy Charlotte", type: "Gas turbine manufacturing" },
      { name: "Duke Energy McGuire Nuclear Station (regional, Huntersville)", type: "Nuclear power plant" },
    ],
    localPainQuote: "Duke Energy nuclear and fossil ISI contracts demand single-source-of-truth instrument and personnel traceability across multiple plant outages.",
  },
  {
    slug: "atlanta-ga",
    name: "Atlanta", state: "GA", country: "US",
    region: "southeast", tier: 1,
    industries: ["Power generation", "Aerospace", "Manufacturing"],
    codeAuthorities: ["NERC", "FAA Part 145"],
    namedFacilities: [
      { name: "Southern Company HQ (Plant Vogtle, regional)", type: "Power generation" },
      { name: "Lockheed Martin Marietta", type: "Aerospace" },
    ],
    localPainQuote: "Plant Vogtle ISI campaigns demand NRC-grade record-keeping — Atlanta-based NDT support contractors have to mirror utility-grade traceability standards.",
  },
  {
    slug: "savannah-ga",
    name: "Savannah", state: "GA", country: "US",
    region: "southeast", tier: 1,
    industries: ["Aerospace (Gulfstream)", "Port operations", "EV / auto manufacturing"],
    codeAuthorities: ["FAA Part 145", "NAS 410", "USCG", "AS9100"],
    namedFacilities: [
      { name: "Gulfstream Aerospace Savannah", type: "Aerospace" },
      { name: "Port of Savannah", type: "Port" },
      { name: "Hyundai Metaplant America (Bryan County, regional)", type: "EV manufacturing" },
    ],
    localPainQuote: "Gulfstream business-jet inspections require FAA-traceable cert and cal records on every shift — the cost of an audit miss is the contract, and Hyundai's new metaplant adds an AS9100-adjacent auto-quality regime on the same labour pool.",
  },
  {
    slug: "jacksonville-fl",
    name: "Jacksonville", state: "FL", country: "US",
    region: "southeast", tier: 1,
    industries: ["US Navy", "Port operations", "Shipyard repair"],
    codeAuthorities: ["NAVSEA", "ABS", "USCG"],
    namedFacilities: [
      { name: "Naval Station Mayport", type: "Navy" },
      { name: "BAE Systems Jacksonville Ship Repair", type: "Shipbuilding" },
    ],
    localPainQuote: "Navy ship-repair contracts demand single-point traceability from technician cert to instrument cal to inspection record — fragmentation fails SUBSAFE-style audits.",
  },
  {
    slug: "miami-fl",
    name: "Miami", state: "FL", country: "US",
    region: "southeast", tier: 1,
    industries: ["Petchem midstream", "Port operations", "Cruise lines"],
    codeAuthorities: ["USCG", "API 570"],
    namedFacilities: [
      { name: "Port Miami", type: "Port" },
      { name: "PortMiami cruise terminal", type: "Cruise" },
    ],
    localPainQuote: "Cruise-line dry-dock inspection windows are non-negotiable — UT thickness gauge calibration delays cost six-figure berth reservations.",
  },
  {
    slug: "tampa-fl",
    name: "Tampa", state: "FL", country: "US",
    region: "southeast", tier: 1,
    industries: ["Phosphate", "Power generation", "Port operations"],
    codeAuthorities: ["NERC", "API 570"],
    namedFacilities: [
      { name: "Mosaic Fertilizer Tampa", type: "Phosphate" },
      { name: "Port Tampa Bay", type: "Port" },
    ],
    localPainQuote: "Phosphate fertilizer plants run continuous-process operations — calibration intervals on PT and MT consumables compress under high-cycle workloads.",
  },
  // ---------------- TIER 1 — Mid-South ----------------
  {
    slug: "wichita-ks",
    name: "Wichita", state: "KS", country: "US",
    region: "midwest", tier: 1,
    industries: ["Aerospace (Spirit, Textron, Bombardier)", "Composites manufacturing", "Military aircraft sustainment"],
    codeAuthorities: ["FAA Part 145", "NAS 410", "AS9100", "Mil-STD-2154"],
    namedFacilities: [
      { name: "Spirit AeroSystems Wichita", type: "Aerospace structures" },
      { name: "Textron Aviation (Cessna / Beechcraft)", type: "Aerospace" },
      { name: "Bombardier Learjet Wichita", type: "Aerospace" },
      { name: "McConnell AFB (KC-46 main operating base)", type: "Military aviation" },
    ],
    localPainQuote: "Wichita is the densest aerospace cluster in the country — qualified-vendor lists rotate aggressively and an expired NAS 410 cert removes a contractor for a year.",
  },
  // ---------------- TIER 1 — Nuclear corridor ----------------
  {
    slug: "knoxville-tn",
    name: "Knoxville / Oak Ridge", state: "TN", country: "US",
    region: "southeast", tier: 1,
    industries: ["Nuclear power generation", "DOE research and weapons", "Power generation (TVA HQ)"],
    codeAuthorities: ["10 CFR 50", "ASME Section XI", "NRC"],
    namedFacilities: [
      { name: "Oak Ridge National Laboratory", type: "DOE research" },
      { name: "TVA Watts Bar Nuclear (regional)", type: "Nuclear" },
    ],
    localPainQuote: "Nuclear ISI contracts demand multi-decade record retention — anything less than digital, exportable, audit-grade traceability fails the next NRC review.",
  },
  {
    slug: "greenville-sc",
    name: "Greenville", state: "SC", country: "US",
    region: "southeast", tier: 1,
    industries: ["Nuclear services", "Gas turbine manufacturing", "Automotive heavy manufacturing"],
    codeAuthorities: ["10 CFR 50", "ASME Section XI", "NRC", "ASME B31.3"],
    namedFacilities: [
      { name: "GE Vernova Greenville (gas turbine manufacturing)", type: "Power generation equipment" },
      { name: "BMW Spartanburg (regional)", type: "Automotive manufacturing" },
      { name: "Westinghouse Newington (regional)", type: "Nuclear services" },
    ],
    localPainQuote: "Greenville nuclear-services contractors mobilise to multiple utility outages per year — cert and cal traceability has to follow the technician, not the home base, and GE Vernova's heavy-rotor inspection runs to its own ASME audit chain.",
  },
  {
    slug: "aiken-sc",
    name: "Aiken", state: "SC", country: "US",
    region: "southeast", tier: 1,
    industries: ["Nuclear weapons site operations (DOE Savannah River)", "Nuclear research (SRNL)", "Tritium production"],
    codeAuthorities: ["10 CFR 50", "10 CFR 830", "ASME Section XI", "NRC", "DOE-STD"],
    namedFacilities: [
      { name: "Savannah River Site (DOE)", type: "DOE nuclear" },
      { name: "Savannah River National Laboratory (SRNL)", type: "DOE national lab" },
    ],
    localPainQuote: "DOE Savannah River audit standards exceed commercial NRC standards — every instrument cal record is subpoena-grade, and SRNL research articles run NDT under both 10 CFR 830 and ASME jurisdictions.",
  },
  {
    slug: "richland-wa",
    name: "Richland (Tri-Cities)", state: "WA", country: "US",
    region: "pacific-northwest", tier: 1,
    industries: ["Nuclear weapons site cleanup (DOE Hanford)", "Nuclear power generation", "Research and laboratory operations"],
    codeAuthorities: ["10 CFR 50", "DOE-STD"],
    namedFacilities: [
      { name: "Hanford Site", type: "DOE nuclear" },
      { name: "Pacific Northwest National Laboratory (regional)", type: "DOE research" },
    ],
    localPainQuote: "Hanford site work runs under DOE-grade traceability requirements — record-keeping gaps trigger stop-work orders.",
  },
  // ---------------- TIER 1 — Frontier US ----------------
  {
    slug: "anchorage-ak",
    name: "Anchorage", state: "AK", country: "US",
    region: "frontier-us", tier: 1,
    industries: ["Pipelines (Trans-Alaska)", "Oil and gas upstream", "Air cargo logistics"],
    codeAuthorities: ["PHMSA", "API 570"],
    namedFacilities: [
      { name: "Trans-Alaska Pipeline System (TAPS)", type: "Pipeline" },
      { name: "ConocoPhillips Alaska (Prudhoe Bay support)", type: "Upstream" },
    ],
    localPainQuote: "TAPS pipeline integrity inspections operate on rigid PHMSA timelines — a calibration miss in Alaska's logistics window costs an entire inspection cycle.",
  },
  {
    slug: "honolulu-hi",
    name: "Honolulu", state: "HI", country: "US",
    region: "frontier-us", tier: 1,
    industries: ["US Navy shipyard", "Port operations", "Aviation MRO"],
    codeAuthorities: ["NAVSEA", "USCG", "FAA Part 145"],
    namedFacilities: [
      { name: "Pearl Harbor Naval Shipyard", type: "Navy fleet maintenance" },
      { name: "Joint Base Pearl Harbor-Hickam", type: "USAF / USN joint base" },
    ],
    localPainQuote: "Pacific-fleet ship-repair work demands SUBSAFE-grade NDT records — every cert and cal entry is auditable indefinitely, and Joint Base Pearl Harbor-Hickam's aviation MRO crews answer to FAA Part 145 on top.",
  },
  {
    slug: "billings-mt",
    name: "Billings", state: "MT", country: "US",
    region: "mountain-west", tier: 1,
    industries: ["Refining", "Pipelines and midstream", "Power generation"],
    codeAuthorities: ["API 510 / 570", "PHMSA"],
    namedFacilities: [
      { name: "ExxonMobil Billings Refinery", type: "Refinery" },
      { name: "Phillips 66 Billings Refinery", type: "Refinery" },
    ],
    localPainQuote: "Northern-tier refinery turnarounds compete for limited NDT contractor capacity — losing a Level II to an expired cert removes a crew from rotation for weeks.",
  },
  {
    slug: "fargo-nd",
    name: "Fargo", state: "ND", country: "US",
    region: "midwest", tier: 1,
    industries: ["Bakken oil and gas support", "Agriculture equipment manufacturing", "Pipelines"],
    codeAuthorities: ["API 570", "PHMSA", "ASME"],
    namedFacilities: [
      { name: "Bobcat Company HQ Fargo (Doosan)", type: "Heavy equipment manufacturing" },
      { name: "John Deere Fargo Works", type: "Agriculture equipment manufacturing" },
      { name: "Bakken support yards (regional)", type: "Oilfield services" },
    ],
    localPainQuote: "Bakken-support NDT crews mobilise across three states from Fargo while local heavy-equipment OEMs run weld-NDT on production lines — equipment chain-of-custody breaks down without a single live registry.",
  },
];

// Merged export: Tier 1 (inline) + Tier 2 (extension) + Tier 3+4 (extension).
// Order is preserved so Tier 1 still wins on slug ties (slugs must be unique
// across tiers; build-time should fail if any duplicate appears).
export const CITIES: City[] = [
  ...TIER_1_CITIES,
  ...CITIES_TIER_2,
  ...CITIES_TIER_3_4,
];

// Build-time guard against duplicate slugs across tier files.
if (process.env.NODE_ENV !== "production") {
  const seen = new Set<string>();
  for (const c of CITIES) {
    if (seen.has(c.slug)) {
      // eslint-disable-next-line no-console
      console.warn(`[cities.ts] duplicate slug detected: ${c.slug}`);
    }
    seen.add(c.slug);
  }
}

/**
 * Quality gate. A City is publishable only if it has enough substrate to
 * generate a non-thin programmatic SEO page that survives Google's
 * helpful-content review. Three checks:
 *
 *   - At least 3 named local industries (so the page can talk about a real
 *     industrial mix, not a single generic vertical).
 *   - At least 2 named facilities/operators (so the page can cite real
 *     operators by name — the strongest local-SEO signal we have).
 *   - A non-empty localPainQuote (the hand-authored hook that makes the page
 *     read like local trade journalism rather than a doorway).
 *
 * Rows that fail the gate are excluded from sitemap.xml and from
 * generateStaticParams. They stay in CITIES so future curation can fill the
 * gaps without re-issuing slugs.
 */
export function isCityPublishable(city: City): boolean {
  if (!Array.isArray(city.industries) || city.industries.length < 3) return false;
  if (!Array.isArray(city.namedFacilities) || city.namedFacilities.length < 2) return false;
  if (typeof city.localPainQuote !== 'string' || city.localPainQuote.trim() === '') return false;
  return true;
}

export const PUBLISHABLE_CITIES: City[] = CITIES.filter(isCityPublishable);

// Build-time visibility into how many cities were pruned by the quality gate.
// Surfaces in `next build` logs (and `next dev` first compile). We log
// unconditionally so the production build output also confirms the count
// — silent prunes are how thin pages sneak back in.
{
  const pruned = CITIES.length - PUBLISHABLE_CITIES.length;
  // eslint-disable-next-line no-console
  console.log(
    `[cities] quality gate: ${PUBLISHABLE_CITIES.length}/${CITIES.length} publishable` +
      (pruned > 0
        ? ` (${pruned} pruned for missing industries/facilities/localPainQuote)`
        : ` (no rows pruned)`),
  );
}

export const findCity = (slug: string): City | undefined =>
  CITIES.find(c => c.slug === slug);

export const findPublishableCity = (slug: string): City | undefined =>
  PUBLISHABLE_CITIES.find(c => c.slug === slug);

export const citiesByRegion = (region: string): City[] =>
  CITIES.filter(c => c.region === region);

export const citiesByCountry = (country: string): City[] =>
  CITIES.filter(c => c.country === country);

export const REGIONS: { slug: string; name: string }[] = [
  { slug: "gulf-coast", name: "Gulf Coast" },
  { slug: "permian-basin", name: "Permian Basin" },
  { slug: "mid-continent", name: "Mid-Continent" },
  { slug: "mountain-west", name: "Mountain West" },
  { slug: "west-coast", name: "West Coast" },
  { slug: "pacific-northwest", name: "Pacific Northwest" },
  { slug: "southwest", name: "Southwest" },
  { slug: "texas-triangle", name: "Texas Triangle" },
  { slug: "midwest", name: "Midwest" },
  { slug: "great-lakes", name: "Great Lakes" },
  { slug: "northeast", name: "Northeast" },
  { slug: "southeast", name: "Southeast" },
  { slug: "frontier-us", name: "Frontier US" },
];

export const COUNTRIES: { code: string; name: string }[] = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "QA", name: "Qatar" },
  { code: "NO", name: "Norway" },
  { code: "IN", name: "India" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "BR", name: "Brazil" },
];
