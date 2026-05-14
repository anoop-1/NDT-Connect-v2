// src/data/cities-tier3-4.ts
// Tier 3 (next 50 US cities) and Tier 4 (30 international cities) entries
// for the programmatic-SEO city-page generator. Append/merge into the main
// CITIES array exported from cities.ts.
//
// Each entry conforms to the City interface in cities.ts. Country is ISO
// alpha-2 for US/CA/AU/DE; the `state` field uses province/state code where
// idiomatic and the country name otherwise.

import type { City } from "./cities";

export const CITIES_TIER_3_4: City[] = [
  // ============================================================
  // ============== TIER 3 — NEXT 50 US CITIES ==================
  // ============================================================

  // ---------------- Tier 3 — Bakken / Williston Basin ----------------
  {
    slug: "williston-nd",
    name: "Williston", state: "ND", country: "US",
    region: "frontier-us", tier: 3,
    industries: ["Bakken shale upstream", "Midstream pipelines", "Crude-by-rail"],
    codeAuthorities: ["API 570", "API 653", "PHMSA"],
    namedFacilities: [
      { name: "Hess Tioga Gas Plant (regional)", type: "Gas processing" },
      { name: "ONEOK Bakken NGL infrastructure", type: "Midstream" },
      { name: "BNSF Williston rail terminal", type: "Crude-by-rail" },
    ],
    localPainQuote: "Bakken winter shutdowns push mobilisation windows into 30-day sprints — losing a Level II to an expired cert during a Williston freeze costs the entire job to a competitor in Dickinson.",
    latitude: 48.1470, longitude: -103.6180,
  },
  {
    slug: "dickinson-nd",
    name: "Dickinson", state: "ND", country: "US",
    region: "frontier-us", tier: 3,
    industries: ["Bakken upstream", "Midstream", "Sand and proppant logistics"],
    codeAuthorities: ["API 570", "PHMSA"],
    namedFacilities: [
      { name: "Dakota Prairie Refinery (Marathon)", type: "Refinery" },
      { name: "ONEOK Stateline gas plants (regional)", type: "Gas processing" },
    ],
    localPainQuote: "Dickinson NDT crews chase rig-count swings that flip 25% in a quarter — calibration scheduling has to flex with the rig count or instruments sit idle in cal labs.",
    latitude: 46.8792, longitude: -102.7896,
  },
  {
    slug: "mandan-nd",
    name: "Mandan", state: "ND", country: "US",
    region: "frontier-us", tier: 3,
    industries: ["Refining", "Pipelines"],
    codeAuthorities: ["API 510 / 570 / 653", "PHMSA"],
    namedFacilities: [
      { name: "Marathon Mandan Refinery", type: "Refinery" },
    ],
    localPainQuote: "A single-refinery town means one outage controls the whole inspection backlog — every UT thickness gauge has to be cal-current the week the unit comes down.",
    latitude: 46.8267, longitude: -100.8896,
  },

  // ---------------- Tier 3 — Permian / SE New Mexico ----------------
  {
    slug: "hobbs-nm",
    name: "Hobbs", state: "NM", country: "US",
    region: "permian-basin", tier: 3,
    industries: ["Permian shale upstream", "Midstream gas processing"],
    codeAuthorities: ["API 570", "PHMSA", "NMOCD"],
    namedFacilities: [
      { name: "Targa Resources Eunice gas plant (regional)", type: "Gas processing" },
      { name: "URENCO USA enrichment facility", type: "Nuclear fuel" },
    ],
    localPainQuote: "Hobbs sits on the New-Mexico side of the Permian — operators audit OCD piping records on a different cadence than Texas RRC, so cal traceability has to satisfy both at once.",
    latitude: 32.7026, longitude: -103.1360,
  },
  {
    slug: "carlsbad-nm",
    name: "Carlsbad", state: "NM", country: "US",
    region: "permian-basin", tier: 3,
    industries: ["Delaware Basin upstream", "Potash mining", "Nuclear waste (WIPP)"],
    codeAuthorities: ["API 570", "MSHA", "DOE/EM"],
    namedFacilities: [
      { name: "Waste Isolation Pilot Plant (WIPP)", type: "DOE nuclear waste repository" },
      { name: "Intrepid Potash Carlsbad", type: "Mining" },
    ],
    localPainQuote: "Delaware-Basin oilfield work overlaps with WIPP DOE inspection windows — NDT contractors juggling both have to keep two separate qualification matrices clean.",
    latitude: 32.4207, longitude: -104.2288,
  },
  {
    slug: "roswell-nm",
    name: "Roswell", state: "NM", country: "US",
    region: "permian-basin", tier: 3,
    industries: ["Upstream services", "Aerospace flight test"],
    codeAuthorities: ["API 570", "FAA Part 145"],
    namedFacilities: [
      { name: "Roswell Air Center (aerospace MRO)", type: "Aerospace MRO" },
    ],
    localPainQuote: "Mixed oilfield and aerospace MRO work in Roswell forces a single NDT shop to maintain ASNT and NAS 410 cert paths in parallel — the wrong cert at the wrong gate kills the day.",
    latitude: 33.3943, longitude: -104.5230,
  },
  {
    slug: "farmington-nm",
    name: "Farmington", state: "NM", country: "US",
    region: "frontier-us", tier: 3,
    industries: ["San Juan Basin gas", "Coal", "Power generation"],
    codeAuthorities: ["API 570", "PHMSA", "MSHA"],
    namedFacilities: [
      { name: "Four Corners Power Plant", type: "Coal-fired power" },
      { name: "San Juan Generating Station (regional)", type: "Power generation" },
    ],
    localPainQuote: "San Juan Basin gas-gathering inspection cycles run on PHMSA clocks while Four Corners power-gen runs on NERC clocks — a single calibration miss reverberates across both audits.",
    latitude: 36.7281, longitude: -108.2187,
  },

  // ---------------- Tier 3 — Wyoming / Frontier ----------------
  {
    slug: "gillette-wy",
    name: "Gillette", state: "WY", country: "US",
    region: "frontier-us", tier: 3,
    industries: ["Powder River Basin coal", "Coalbed methane", "Rail logistics"],
    codeAuthorities: ["MSHA", "API 570", "PHMSA"],
    namedFacilities: [
      { name: "Black Thunder Mine (Arch Resources)", type: "Coal mine" },
      { name: "North Antelope Rochelle Mine (Peabody)", type: "Coal mine" },
    ],
    localPainQuote: "Powder River coal trains run on tight loadout schedules — an out-of-cal UT shell-thickness gauge on a coal car repair stops a 130-car unit train at the loadout.",
    latitude: 44.2911, longitude: -105.5022,
  },
  {
    slug: "cheyenne-wy",
    name: "Cheyenne", state: "WY", country: "US",
    region: "frontier-us", tier: 3,
    industries: ["Refining", "Pipeline corridors", "Defense (F.E. Warren AFB)"],
    codeAuthorities: ["API 510 / 570 / 653", "PHMSA", "NAS 410"],
    namedFacilities: [
      { name: "HF Sinclair Cheyenne Refinery", type: "Refinery" },
      { name: "F.E. Warren Air Force Base", type: "Defense / ICBM ops" },
    ],
    localPainQuote: "Cheyenne sits on the I-25 pipeline corridor — Front-Range pipeline integrity audits demand UT thickness traceability at every river crossing between here and Casper.",
    latitude: 41.1400, longitude: -104.8202,
  },
  {
    slug: "rock-springs-wy",
    name: "Rock Springs", state: "WY", country: "US",
    region: "frontier-us", tier: 3,
    industries: ["Trona / soda ash mining", "Gas processing", "Pipelines"],
    codeAuthorities: ["MSHA", "API 570", "PHMSA"],
    namedFacilities: [
      { name: "Genesis Alkali (formerly Tronox) Granger", type: "Trona mine and processing" },
      { name: "Sisecam Wyoming trona operations", type: "Trona mining" },
      { name: "Jim Bridger Power Plant (regional)", type: "Coal-fired power" },
    ],
    localPainQuote: "Trona mines and coal-fired power plants both demand MSHA-compliant NDT — a single expired ASNT renewal blocks a contractor from both scopes the same week.",
    latitude: 41.5875, longitude: -109.2029,
  },
  {
    slug: "vernal-ut",
    name: "Vernal", state: "UT", country: "US",
    region: "mountain-west", tier: 3,
    industries: ["Uinta Basin upstream", "Gas processing", "Oil shale R&D"],
    codeAuthorities: ["API 570", "PHMSA", "Utah DOGM"],
    namedFacilities: [
      { name: "Crescent Point Uinta Basin operations", type: "Upstream operator" },
      { name: "QEP Resources / Ovintiv assets (regional)", type: "Upstream" },
    ],
    localPainQuote: "Uinta Basin waxy-crude piping runs hot — UT thickness intervals tighten in winter, and a single missed cal cycle can hide accelerated corrosion under wax deposition.",
    latitude: 40.4555, longitude: -109.5287,
  },

  // ---------------- Tier 3 — Idaho ----------------
  // idaho-falls-id: defined in cities-tier2.ts — duplicate removed.
  {
    slug: "pocatello-id",
    name: "Pocatello", state: "ID", country: "US",
    region: "mountain-west", tier: 3,
    industries: ["Phosphate mining and processing", "Rail logistics", "Manufacturing"],
    codeAuthorities: ["MSHA", "API 570", "ASME"],
    namedFacilities: [
      { name: "J.R. Simplot Don Plant (regional)", type: "Phosphate fertilizer" },
      { name: "Bayer Soda Springs (regional)", type: "Phosphorus chemicals" },
    ],
    localPainQuote: "Phosphate-acid piping in Pocatello degrades fast — UT cal cycles have to keep up with thinning rates that don't tolerate a slipped re-inspection date.",
    latitude: 42.8713, longitude: -112.4455,
  },
  // boise-id: defined in cities-tier2.ts — duplicate removed.
  {
    slug: "provo-ut",
    name: "Provo", state: "UT", country: "US",
    region: "mountain-west", tier: 3,
    industries: ["Steel", "Composite manufacturing", "Aerospace"],
    codeAuthorities: ["ASME", "AWS D1.1", "NAS 410"],
    namedFacilities: [
      { name: "Geneva Works site (legacy steel)", type: "Heavy industrial" },
      { name: "Northrop Grumman Bacchus / Promontory (regional, solid rocket motors)", type: "Aerospace propulsion" },
    ],
    localPainQuote: "Solid-rocket-motor work along the Wasatch Front demands NAS 410 Level II/III currency on every shift — a single lapsed cert stops a casing inspection cold.",
    latitude: 40.2338, longitude: -111.6585,
  },
  {
    slug: "pueblo-co",
    name: "Pueblo", state: "CO", country: "US",
    region: "mountain-west", tier: 3,
    industries: ["Steel (rail and long products)", "Defense", "Manufacturing"],
    codeAuthorities: ["AAR M-1003", "AWS D1.1", "ASME"],
    namedFacilities: [
      { name: "EVRAZ Rocky Mountain Steel (Pueblo)", type: "Rail and long-products steel mill" },
      { name: "Pueblo Chemical Depot (legacy)", type: "Defense / demilitarization" },
    ],
    localPainQuote: "Rail-mill UT inspection on long products is unforgiving — AAR M-1003 audits demand instrument cal traceability to the exact rail bundle inspected.",
    latitude: 38.2544, longitude: -104.6091,
  },

  // ---------------- Tier 3 — Mid-Continent / Kansas ----------------
  {
    slug: "el-dorado-ks",
    name: "El Dorado", state: "KS", country: "US",
    region: "mid-continent", tier: 3,
    industries: ["Refining", "Pipelines"],
    codeAuthorities: ["API 510 / 570 / 653", "PHMSA"],
    namedFacilities: [
      { name: "HF Sinclair El Dorado Refinery", type: "Refinery" },
    ],
    localPainQuote: "Mid-Kansas refinery turnarounds run lean on inspection capacity — a missed UT cal-cycle on a single phased-array unit reshuffles a week of weld scopes.",
    latitude: 37.8170, longitude: -96.8625,
  },
  {
    slug: "mcpherson-ks",
    name: "McPherson", state: "KS", country: "US",
    region: "mid-continent", tier: 3,
    industries: ["Refining", "Specialty chemicals"],
    codeAuthorities: ["API 510 / 570 / 653", "PHMSA"],
    namedFacilities: [
      { name: "CHS McPherson Refinery", type: "Refinery" },
      { name: "CVR Energy Coffeyville (regional)", type: "Refinery" },
    ],
    localPainQuote: "Co-op-owned refineries audit contractor NDT files on tighter member-equity cycles than the IOCs — an expired Level II cert reads as governance failure, not just a paperwork miss.",
    latitude: 38.3706, longitude: -97.6642,
  },
  {
    slug: "el-dorado-ar",
    name: "El Dorado", state: "AR", country: "US",
    region: "mid-continent", tier: 3,
    industries: ["Refining", "Specialty chemicals", "Lithium brine (emerging)"],
    codeAuthorities: ["API 510 / 570 / 653", "ADEQ"],
    namedFacilities: [
      { name: "Delek Refining El Dorado", type: "Refinery" },
      { name: "Lanxess El Dorado complex", type: "Specialty chemicals" },
    ],
    localPainQuote: "South Arkansas blends refining with bromine and lithium brine work — corrosion regimes are unique, and UT cal records have to hold up under both API and chemical-process scrutiny.",
    latitude: 33.2076, longitude: -92.6663,
  },

  // ---------------- Tier 3 — Ohio Valley / Appalachia ----------------
  {
    slug: "lima-oh",
    name: "Lima", state: "OH", country: "US",
    region: "great-lakes", tier: 3,
    industries: ["Refining", "Defense manufacturing", "Polymers"],
    codeAuthorities: ["API 510 / 570 / 653", "AWS D1.1", "MIL-STD"],
    namedFacilities: [
      { name: "Cenovus Lima Refinery", type: "Refinery" },
      { name: "Joint Systems Manufacturing Center (Lima Army Tank Plant)", type: "Defense manufacturing" },
      { name: "INEOS Lima", type: "Petrochemical" },
    ],
    localPainQuote: "Lima's refinery and the Abrams-tank plant share a contractor pool — tracking which Level II is current under API vs MIL-STD on which day is a daily scheduling problem.",
    latitude: 40.7426, longitude: -84.1052,
  },
  // toledo-oh: defined in cities-tier2.ts — duplicate removed.
  {
    slug: "findlay-oh",
    name: "Findlay", state: "OH", country: "US",
    region: "great-lakes", tier: 3,
    industries: ["Refining HQ (Marathon Petroleum)", "Pipelines", "Distribution"],
    codeAuthorities: ["API 510 / 570 / 653", "PHMSA"],
    namedFacilities: [
      { name: "Marathon Petroleum Corporation HQ", type: "Refining HQ" },
    ],
    localPainQuote: "Findlay-based refining majors push fleet-wide audit demands to every contractor at every site — local NDT shops carry corporate-grade documentation overhead.",
    latitude: 41.0442, longitude: -83.6499,
  },
  {
    slug: "lorain-oh",
    name: "Lorain", state: "OH", country: "US",
    region: "great-lakes", tier: 3,
    industries: ["Steel tubular", "OCTG", "Pipe mill"],
    codeAuthorities: ["API 5CT / 5L", "ASME", "AWS D1.1"],
    namedFacilities: [
      { name: "U.S. Steel Lorain Tubular Operations", type: "Tubular / OCTG mill" },
    ],
    localPainQuote: "OCTG pipe-mill UT and EMI inspection runs on every joint — a single calibration drift on the rotary UT head reads as a thousand suspect joints, not one.",
    latitude: 41.4528, longitude: -82.1824,
  },
  {
    slug: "mansfield-oh",
    name: "Mansfield", state: "OH", country: "US",
    region: "great-lakes", tier: 3,
    industries: ["Steel processing", "Manufacturing", "Defense"],
    codeAuthorities: ["AWS D1.1", "ASME", "MIL-STD"],
    namedFacilities: [
      { name: "AK Steel / Cleveland-Cliffs Mansfield Works", type: "Stainless / electrical steel" },
    ],
    localPainQuote: "Stainless and electrical-steel inspection runs on tighter surface-condition specs than carbon mills — a single PT consumable lot mismatch invalidates a shift's records.",
    latitude: 40.7584, longitude: -82.5154,
  },
  {
    slug: "steubenville-oh",
    name: "Steubenville", state: "OH", country: "US",
    region: "great-lakes", tier: 3,
    industries: ["Steel (legacy)", "Coal", "Power generation"],
    codeAuthorities: ["AWS D1.1", "ASME", "MSHA"],
    namedFacilities: [
      { name: "Cleveland-Cliffs Steubenville coke plant (regional)", type: "Coke / steel" },
      { name: "W.H. Sammis Power Plant (legacy regional)", type: "Power generation" },
    ],
    localPainQuote: "Ohio-Valley coke and power-gen work overlaps Steubenville and Weirton — tracking who can work which gate on which cert is a daily phone-tree exercise without a single source of truth.",
    latitude: 40.3698, longitude: -80.6339,
  },
  {
    slug: "weirton-wv",
    name: "Weirton", state: "WV", country: "US",
    region: "great-lakes", tier: 3,
    industries: ["Steel (tinplate)", "Manufacturing"],
    codeAuthorities: ["AWS D1.1", "ASME"],
    namedFacilities: [
      { name: "Cleveland-Cliffs Weirton (transitioning to electrical steel)", type: "Steel mill" },
    ],
    localPainQuote: "A steel town in transition — legacy tinplate work runs alongside new electrical-steel scopes, and inspection records have to satisfy both legacy and new product specs at audit.",
    latitude: 40.4187, longitude: -80.5895,
  },
  {
    slug: "charleston-wv",
    name: "Charleston", state: "WV", country: "US",
    region: "great-lakes", tier: 3,
    industries: ["Specialty chemicals", "Polymers", "Coal logistics"],
    codeAuthorities: ["API 570", "ASME Section VIII", "WVDEP"],
    namedFacilities: [
      { name: "Dow Institute Plant (regional)", type: "Specialty chemicals" },
      { name: "Covestro South Charleston", type: "Polyurethanes / specialty" },
    ],
    localPainQuote: "Kanawha-Valley specialty chemistry runs corrosive process streams that don't tolerate cal-interval slippage — a missed UT recert can mask a thinning shell on a reactor.",
    latitude: 38.3498, longitude: -81.6326,
  },
  {
    slug: "huntington-wv",
    name: "Huntington", state: "WV", country: "US",
    region: "great-lakes", tier: 3,
    industries: ["Rail manufacturing", "Specialty metals", "Transportation"],
    codeAuthorities: ["AAR M-1003", "AWS D1.1", "ASME"],
    namedFacilities: [
      { name: "Special Metals Corporation Huntington (nickel alloys)", type: "Specialty alloy" },
      { name: "CSX Huntington Locomotive Shop", type: "Rail MRO" },
    ],
    localPainQuote: "Nickel-alloy welds at Special Metals demand PT and UT records that hold up under the most exacting alloy-mill audits — instrument cal records have to map to specific heat numbers.",
    latitude: 38.4192, longitude: -82.4452,
  },
  {
    slug: "parkersburg-wv",
    name: "Parkersburg", state: "WV", country: "US",
    region: "great-lakes", tier: 3,
    industries: ["Specialty chemicals", "Polymers"],
    codeAuthorities: ["API 570", "ASME Section VIII", "WVDEP"],
    namedFacilities: [
      { name: "Chemours Washington Works", type: "Fluoropolymers" },
    ],
    localPainQuote: "Fluoropolymer process-piping inspection is a niche scope — UT and RT cal records have to defend against decades-long PFAS-related litigation discovery, not just the next turnaround.",
    latitude: 39.2667, longitude: -81.5615,
  },
  {
    slug: "beckley-wv",
    name: "Beckley", state: "WV", country: "US",
    region: "great-lakes", tier: 3,
    industries: ["Coal mining", "Mining services", "Rail"],
    codeAuthorities: ["MSHA", "AAR M-1003"],
    namedFacilities: [
      { name: "Central Appalachian metallurgical coal operations (regional)", type: "Coal mining" },
    ],
    localPainQuote: "Met-coal MSHA inspections in southern West Virginia run on weekly cycles — a contractor's NDT rope-access UT crew with an expired cal cert sends a section idle.",
    latitude: 37.7782, longitude: -81.1882,
  },

  // ---------------- Tier 3 — Illinois / Iowa ----------------
  {
    slug: "rockford-il",
    name: "Rockford", state: "IL", country: "US",
    region: "midwest", tier: 3,
    industries: ["Aerospace components", "Manufacturing", "Heavy fasteners and machined parts"],
    codeAuthorities: ["FAA Part 145", "NAS 410", "AS9100"],
    namedFacilities: [
      { name: "Collins Aerospace Rockford", type: "Aerospace systems" },
      { name: "Woodward Inc. Rockford", type: "Aerospace controls" },
    ],
    localPainQuote: "Rockford aerospace primes audit subcontractor NAS 410 Level II/III rosters quarterly — a single missing cert renewal removes the shop from the AVL for a fiscal year.",
    latitude: 42.2711, longitude: -89.0940,
  },
  {
    slug: "peoria-il",
    name: "Peoria", state: "IL", country: "US",
    region: "midwest", tier: 3,
    industries: ["Heavy equipment manufacturing (Caterpillar)", "Foundry", "Engines"],
    codeAuthorities: ["AWS D1.1", "ASME", "AS9100 (engines)"],
    namedFacilities: [
      { name: "Caterpillar Mapleton Foundry", type: "Foundry" },
      { name: "Caterpillar East Peoria", type: "Heavy equipment manufacturing" },
    ],
    localPainQuote: "Cat foundry castings run RT and UT on a per-pour basis — a film or instrument cal slip reads as a whole pour to be reinspected, not a single casting.",
    latitude: 40.6936, longitude: -89.5890,
  },
  {
    slug: "decatur-il",
    name: "Decatur", state: "IL", country: "US",
    region: "midwest", tier: 3,
    industries: ["Heavy equipment (Caterpillar)", "Agricultural processing", "Specialty chemicals"],
    codeAuthorities: ["AWS D1.1", "ASME", "API 570"],
    namedFacilities: [
      { name: "Caterpillar Decatur (mining trucks)", type: "Heavy equipment" },
      { name: "ADM Decatur complex", type: "Agricultural processing" },
    ],
    localPainQuote: "Mining-truck weld inspection at Cat Decatur is unforgiving — a single MT or UT cal slip on a haul-truck frame is a warranty-claim multiplier across every truck shipped that week.",
    latitude: 39.8403, longitude: -88.9548,
  },
  {
    slug: "bloomington-il",
    name: "Bloomington", state: "IL", country: "US",
    region: "midwest", tier: 3,
    industries: ["Manufacturing", "Pipelines", "Insurance HQs"],
    codeAuthorities: ["API 570", "PHMSA", "ASME"],
    namedFacilities: [
      { name: "Rivian Normal Plant (regional)", type: "EV manufacturing" },
    ],
    localPainQuote: "Central-Illinois pipeline ROW inspection runs to PHMSA's tightest 2.0 framework — every UT thickness gauge cal record has to map to a specific girth weld in the audit trail.",
    latitude: 40.4842, longitude: -88.9937,
  },
  {
    slug: "davenport-ia",
    name: "Davenport", state: "IA", country: "US",
    region: "midwest", tier: 3,
    industries: ["Aluminum", "Heavy manufacturing", "Agricultural equipment"],
    codeAuthorities: ["AWS D1.1", "ASME", "AS9100"],
    namedFacilities: [
      { name: "Arconic Davenport Works", type: "Aluminum rolling mill" },
    ],
    localPainQuote: "Aerospace aluminum plate from Davenport is qualified to plate-by-plate UT records — a single cal-slip on the immersion UT system can quarantine an entire heat treat lot.",
    latitude: 41.5236, longitude: -90.5776,
  },
  {
    slug: "quad-cities-ia",
    name: "Quad Cities", state: "IA", country: "US",
    region: "midwest", tier: 3,
    industries: ["Agricultural equipment (John Deere)", "Defense (Rock Island Arsenal)", "Heavy manufacturing"],
    codeAuthorities: ["AWS D1.1", "ASME", "MIL-STD"],
    namedFacilities: [
      { name: "John Deere Harvester Works (East Moline)", type: "Ag equipment manufacturing" },
      { name: "John Deere Davenport Works", type: "Ag equipment manufacturing" },
      { name: "Rock Island Arsenal", type: "US Army manufacturing" },
    ],
    localPainQuote: "Rock Island Arsenal MIL-STD work overlaps with Deere's commercial weld specs — a single contractor crew has to keep two qualification matrices clean to bid on both gates.",
    latitude: 41.5067, longitude: -90.5151,
  },
  {
    slug: "iowa-city-ia",
    name: "Iowa City", state: "IA", country: "US",
    region: "midwest", tier: 3,
    industries: ["Manufacturing", "Pharmaceuticals", "Higher-ed research"],
    codeAuthorities: ["ASME", "FDA", "AWS D1.1"],
    namedFacilities: [
      { name: "Procter & Gamble Iowa City", type: "Consumer manufacturing" },
    ],
    localPainQuote: "Pharma-grade and consumer-process piping in eastern Iowa runs to validation specs — a single UT cal-slip can void a piping qualification package and trigger a re-validation.",
    latitude: 41.6611, longitude: -91.5302,
  },

  // ---------------- Tier 3 — Southeast / Mid-Atlantic ----------------
  // mobile-al: defined in cities-tier2.ts — duplicate removed.
  // pascagoula-ms: defined in cities-tier2.ts — duplicate removed.
  // augusta-ga: defined in cities-tier2.ts — duplicate removed.
  // marietta-ga: defined in cities-tier2.ts — duplicate removed.
  {
    slug: "columbia-sc",
    name: "Columbia", state: "SC", country: "US",
    region: "southeast", tier: 3,
    industries: ["Nuclear fuel manufacturing", "Defense", "Manufacturing"],
    codeAuthorities: ["NRC", "ASME", "NAS 410"],
    namedFacilities: [
      { name: "Westinghouse Columbia Fuel Fabrication Facility", type: "Nuclear fuel manufacturing" },
      { name: "V.C. Summer Nuclear Station (regional)", type: "Nuclear power" },
    ],
    localPainQuote: "Nuclear-fuel-fab inspection lives under continuous NRC oversight — an instrument-cal trace gap reads as a quality-program finding, not a paperwork miss.",
    latitude: 34.0007, longitude: -81.0348,
  },
  {
    slug: "macon-ga",
    name: "Macon", state: "GA", country: "US",
    region: "southeast", tier: 3,
    industries: ["Aerospace MRO (Robins AFB)", "Manufacturing"],
    codeAuthorities: ["FAA Part 145", "NAS 410", "MIL-STD"],
    namedFacilities: [
      { name: "Robins Air Force Base / WR-ALC", type: "USAF depot MRO" },
    ],
    localPainQuote: "WR-ALC depot-level MRO at Robins runs to MIL-STD-2219 weld specs and NAS 410 cert paths — every contractor NDT roster has to map both at audit.",
    latitude: 32.8407, longitude: -83.6324,
  },
  // memphis-tn: defined in cities-tier2.ts — duplicate removed.
  {
    slug: "jackson-ms",
    name: "Jackson", state: "MS", country: "US",
    region: "southeast", tier: 3,
    industries: ["Power generation", "Manufacturing", "Pipelines"],
    codeAuthorities: ["ASME", "NERC", "PHMSA"],
    namedFacilities: [
      { name: "Entergy Mississippi operations HQ", type: "Power utility" },
    ],
    localPainQuote: "Mississippi-power-gen UT and PT inspection on boiler and HRSG components runs on NERC outage clocks — a cal slip that pushes the inspection past the outage window pushes the unit return-to-service.",
    latitude: 32.2988, longitude: -90.1848,
  },

  // ---------------- Tier 3 — Florida / Atlantic ----------------
  {
    slug: "melbourne-fl",
    name: "Melbourne", state: "FL", country: "US",
    region: "southeast", tier: 3,
    industries: ["Aerospace and defense", "Composites manufacturing", "Space launch operations (Space Coast)"],
    codeAuthorities: ["NAS 410", "AS9100", "FAA Part 145"],
    namedFacilities: [
      { name: "L3Harris Technologies Melbourne", type: "Defense electronics" },
      { name: "Embraer Executive Jets Melbourne", type: "Aerospace assembly" },
      { name: "Northrop Grumman Melbourne", type: "Aerospace / defense" },
    ],
    localPainQuote: "Space-Coast aerospace primes synchronise NAS 410 audit cycles — a single missed Level III renewal at one prime cascades to AVL removal across the corridor.",
    latitude: 28.0836, longitude: -80.6081,
  },
  // pensacola-fl: defined in cities-tier2.ts — duplicate removed.
  {
    slug: "mayport-fl",
    name: "Mayport", state: "FL", country: "US",
    region: "southeast", tier: 3,
    industries: ["US Navy", "Shipyard repair"],
    codeAuthorities: ["NAVSEA T9074", "ABS", "ASME"],
    namedFacilities: [
      { name: "Naval Station Mayport", type: "USN surface fleet base" },
    ],
    localPainQuote: "Mayport surface-ship availabilities run on tight NAVSEA windows — every UT and MT cal record has to defend the inspector's sign-off against a SUBSAFE-style traceability standard.",
    latitude: 30.3936, longitude: -81.4112,
  },
  {
    slug: "tallahassee-fl",
    name: "Tallahassee", state: "FL", country: "US",
    region: "southeast", tier: 3,
    industries: ["Power generation", "Pipelines", "Manufacturing"],
    codeAuthorities: ["ASME", "PHMSA", "NERC"],
    namedFacilities: [
      { name: "Tallahassee Hopkins Generating Station", type: "Gas-fired power" },
    ],
    localPainQuote: "North-Florida gas-fired plants on tight summer-peak schedules — UT cal slippage during a planned outage cascades into capacity-market penalties that dwarf the inspection cost.",
    latitude: 30.4383, longitude: -84.2807,
  },

  // ---------------- Tier 3 — Northeast / Mid-Atlantic ports & shipyards ----------------
  // newport-news-va: defined in cities-tier2.ts — duplicate removed.
  {
    slug: "portsmouth-va",
    name: "Portsmouth", state: "VA", country: "US",
    region: "northeast", tier: 3,
    industries: ["USN ship repair (nuclear)", "Commercial shipyard", "Coal export terminals"],
    codeAuthorities: ["NAVSEA T9074", "ABS", "AAR M-1003"],
    namedFacilities: [
      { name: "Norfolk Naval Shipyard (Portsmouth)", type: "USN ship repair / nuclear" },
      { name: "BAE Systems Norfolk Ship Repair (regional)", type: "Commercial / Navy ship repair" },
    ],
    localPainQuote: "Norfolk Naval Shipyard runs nuclear-submarine availabilities on the tightest NDT cal-traceability standards in the Navy — a missing cert kills a dry-dock day, not just a shift.",
    latitude: 36.8354, longitude: -76.2983,
  },
  {
    slug: "groton-ct",
    name: "Groton", state: "CT", country: "US",
    region: "northeast", tier: 3,
    industries: ["Submarine construction", "USN submarine base", "Pharmaceutical manufacturing"],
    codeAuthorities: ["NAVSEA SUBSAFE", "ABS", "ASME Section III"],
    namedFacilities: [
      { name: "General Dynamics Electric Boat", type: "Nuclear submarine builder (Virginia / Columbia class)" },
      { name: "Naval Submarine Base New London", type: "USN submarine base" },
    ],
    localPainQuote: "Electric Boat SUBSAFE work is the gold standard for NDT traceability — every UT and PT record has to defend against the Navy's most rigorous program audit.",
    latitude: 41.3501, longitude: -72.0788,
  },
  {
    slug: "bath-me",
    name: "Bath", state: "ME", country: "US",
    region: "northeast", tier: 3,
    industries: ["USN shipbuilding (destroyer construction)", "Heavy fabrication", "Defense supply chain"],
    codeAuthorities: ["NAVSEA T9074", "ABS", "AWS D1.1", "DCMA"],
    namedFacilities: [
      { name: "Bath Iron Works (General Dynamics)", type: "USN destroyer builder (DDG-51 / DDG-1000)" },
      { name: "Portsmouth Naval Shipyard (regional, Kittery)", type: "Submarine overhaul yard" },
    ],
    localPainQuote: "BIW destroyer construction packs NDT scopes into a tight Maine winter schedule — an out-of-cal UT unit during a pre-launch hull survey reshuffles the entire ship's delivery curve.",
    latitude: 43.9106, longitude: -69.8214,
  },

  // ---------------- Tier 3 — Pipeline ROW Kansas ----------------
  {
    slug: "liberal-ks",
    name: "Liberal", state: "KS", country: "US",
    region: "mid-continent", tier: 3,
    industries: ["Hugoton Basin gas", "Midstream", "Pipelines"],
    codeAuthorities: ["API 570", "PHMSA"],
    namedFacilities: [
      { name: "ONEOK Hugoton infrastructure", type: "Gas processing / midstream" },
    ],
    localPainQuote: "Hugoton-Basin gas-gathering pipelines criss-cross three states — PHMSA audit traceability has to map a single instrument cal cycle to specific weld locations across that ROW.",
    latitude: 37.0431, longitude: -100.9210,
  },
  {
    slug: "clay-center-ks",
    name: "Clay Center", state: "KS", country: "US",
    region: "mid-continent", tier: 3,
    industries: ["Pipeline ROW", "Agriculture-adjacent industrial"],
    codeAuthorities: ["API 570", "PHMSA"],
    namedFacilities: [
      { name: "Mid-Continent crude and NGL pipeline ROW (regional)", type: "Pipeline corridor" },
    ],
    localPainQuote: "Pipeline-ROW NDT crews staging out of central Kansas mobilise to four states — chain-of-custody on a calibrated UT thickness gauge is the difference between a clean PHMSA audit and a re-inspection.",
    latitude: 39.3736, longitude: -97.1242,
  },

  // ---------------- Tier 3 — Texas defense ----------------
  {
    slug: "greenville-tx",
    name: "Greenville", state: "TX", country: "US",
    region: "texas-triangle", tier: 3,
    industries: ["Defense aerospace MRO", "ISR aircraft modifications"],
    codeAuthorities: ["FAA Part 145", "NAS 410", "MIL-STD-2154"],
    namedFacilities: [
      { name: "L3Harris Greenville (Mission Systems)", type: "Defense aerospace mods / ISR" },
    ],
    localPainQuote: "L3Harris Greenville ISR work runs classified scopes — every NDT inspector cert and every instrument cal has to be audit-defensible without leaking program-sensitive data.",
    latitude: 33.1384, longitude: -96.1108,
  },

  // ============================================================
  // ============== TIER 4 — INTERNATIONAL (30) =================
  // ============================================================

  // ---------------- Tier 4 — Canada ----------------
  {
    slug: "calgary-ab",
    name: "Calgary", state: "AB", country: "CA",
    region: "frontier-us", tier: 4,
    industries: ["Oil and gas HQs", "Pipelines", "Oil sands services"],
    codeAuthorities: ["CSA Z662", "ABSA (Alberta Boilers Safety Association)", "API 510 / 570 / 653"],
    namedFacilities: [
      { name: "Cenovus Energy HQ", type: "Integrated oil HQ" },
      { name: "Suncor Energy HQ", type: "Integrated oil HQ" },
      { name: "Canadian Natural Resources HQ", type: "Upstream HQ" },
      { name: "Imperial Oil HQ", type: "Integrated oil HQ" },
      { name: "TC Energy HQ", type: "Pipeline HQ" },
    ],
    localPainQuote: "Calgary HQs run inspection programs that touch oil sands, conventional and pipelines simultaneously — ABSA audit traceability has to follow a Level II from a Fort Mac plant to a Sarnia refinery.",
    latitude: 51.0447, longitude: -114.0719,
  },
  {
    slug: "edmonton-ab",
    name: "Edmonton", state: "AB", country: "CA",
    region: "frontier-us", tier: 4,
    industries: ["Bitumen upgrading", "Refining", "Petrochemical (Industrial Heartland)"],
    codeAuthorities: ["ABSA", "CSA Z662", "API 510 / 570 / 653"],
    namedFacilities: [
      { name: "Imperial Oil Strathcona Refinery", type: "Refinery / upgrader" },
      { name: "Suncor Edmonton Refinery", type: "Refinery" },
      { name: "Shell Scotford Refinery / Upgrader", type: "Refinery / upgrader" },
      { name: "Dow Fort Saskatchewan", type: "Petrochemical" },
      { name: "Nutrien Redwater", type: "Fertilizer / industrial" },
    ],
    localPainQuote: "Edmonton's Industrial Heartland turnaround season collides ABSA pressure-equipment inspections with shutdown windows — every UT cal interval has to be defensible to a provincial inspector, not just an internal QA auditor.",
    latitude: 53.5461, longitude: -113.4938,
  },
  {
    slug: "fort-mcmurray-ab",
    name: "Fort McMurray", state: "AB", country: "CA",
    region: "frontier-us", tier: 4,
    industries: ["Oil sands mining and SAGD", "Bitumen upgrading and refining", "Pipelines (Athabasca / Trans Mountain)"],
    codeAuthorities: ["ABSA", "CSA Z662", "API 570 / 653"],
    namedFacilities: [
      { name: "Syncrude Mildred Lake", type: "Oil sands mine and upgrader" },
      { name: "Suncor Base Plant", type: "Oil sands mine and upgrader" },
      { name: "CNRL Horizon", type: "Oil sands mine and upgrader" },
      { name: "Imperial Kearl", type: "Oil sands mine" },
    ],
    localPainQuote: "Fort Mac fly-in/fly-out NDT crews work 14-and-7 rotations — a calibration cert that expires on day 8 of a 14-day hitch idles a Level II 600 km from his cal lab.",
    latitude: 56.7264, longitude: -111.3803,
  },
  {
    slug: "sarnia-on",
    name: "Sarnia", state: "ON", country: "CA",
    region: "great-lakes", tier: 4,
    industries: ["Refining", "Petrochemical (Chemical Valley)", "Pipelines and midstream"],
    codeAuthorities: ["TSSA (Technical Standards & Safety Authority)", "CSA B51", "API 510 / 570 / 653"],
    namedFacilities: [
      { name: "Imperial Oil Sarnia Refinery", type: "Refinery" },
      { name: "Suncor Sarnia Refinery", type: "Refinery" },
      { name: "Shell Corunna Refinery", type: "Refinery" },
      { name: "NOVA Chemicals Corunna", type: "Petrochemical" },
      { name: "Cabot Sarnia carbon black plant", type: "Specialty chemicals" },
    ],
    localPainQuote: "Chemical Valley turnarounds cluster every spring — TSSA pressure-equipment inspectors expect cal records on demand, not after a week of file-pulling.",
    latitude: 42.9994, longitude: -82.3089,
  },
  {
    slug: "montreal-qc",
    name: "Montreal", state: "QC", country: "CA",
    region: "northeast", tier: 4,
    industries: ["Aerospace (Bombardier, Pratt & Whitney Canada)", "Refining", "Port and rail logistics"],
    codeAuthorities: ["Transport Canada CAR 573", "NAS 410", "AS9100", "RBQ"],
    namedFacilities: [
      { name: "Bombardier Aerospace Mirabel / Dorval", type: "Business jet manufacturing" },
      { name: "Pratt & Whitney Canada Longueuil", type: "Aero engine manufacturing" },
      { name: "Suncor Montreal Refinery", type: "Refinery" },
      { name: "CAE Montreal", type: "Simulators / aerospace" },
    ],
    localPainQuote: "Greater-Montreal aerospace primes audit Level II/III rosters under both Transport Canada CAR 573 and NAS 410 — keeping a single technician's cert path clean across both regimes is a daily reconciliation problem.",
    latitude: 45.5017, longitude: -73.5673,
  },
  {
    slug: "toronto-on",
    name: "Toronto", state: "ON", country: "CA",
    region: "great-lakes", tier: 4,
    industries: ["Energy and engineering HQs", "Manufacturing", "Power generation"],
    codeAuthorities: ["TSSA", "CSA N285 (nuclear)", "ASME"],
    namedFacilities: [
      { name: "Ontario Power Generation HQ", type: "Power utility HQ" },
      { name: "Bruce Power head office (regional ops at Tiverton)", type: "Nuclear power" },
      { name: "Hatch Engineering HQ", type: "Industrial engineering" },
    ],
    localPainQuote: "Ontario's nuclear and industrial engineering HQs in Toronto demand pan-fleet NDT visibility — a single program-wide audit pulls cal records from Bruce, Pickering and Darlington in the same week.",
    latitude: 43.6532, longitude: -79.3832,
  },
  {
    slug: "vancouver-bc",
    name: "Vancouver", state: "BC", country: "CA",
    region: "pacific-northwest", tier: 4,
    industries: ["Port operations", "Shipbuilding", "LNG (Coastal GasLink terminus regional)"],
    codeAuthorities: ["Transport Canada Marine Safety", "ABS / LR / DNV", "CSA"],
    namedFacilities: [
      { name: "Seaspan Vancouver Shipyards (NSS prime)", type: "Shipbuilding" },
      { name: "Port of Vancouver", type: "Port" },
      { name: "Trans Mountain Westridge Marine Terminal", type: "Crude export terminal" },
    ],
    localPainQuote: "Seaspan's National Shipbuilding Strategy work runs to RCN-grade NDT specs in a city without a Gulf-Coast-style oilfield labour pool — cert tracking across a thin contractor pool is a single point of failure.",
    latitude: 49.2827, longitude: -123.1207,
  },

  // ---------------- Tier 4 — UK ----------------
  {
    slug: "london-uk",
    name: "London", state: "United Kingdom", country: "GB",
    region: "northeast", tier: 4,
    industries: ["Energy HQs", "Engineering and consulting", "Insurance / class HQs"],
    codeAuthorities: ["HSE PSSR / PSR", "PCN (BINDT)", "Lloyd's Register"],
    namedFacilities: [
      { name: "Shell plc HQ", type: "Integrated energy HQ" },
      { name: "BP plc HQ", type: "Integrated energy HQ" },
      { name: "Lloyd's Register Group HQ", type: "Class society HQ" },
    ],
    localPainQuote: "London-based supermajor HQs run global inspection programs — a single quarterly audit reaches across UKCS, Gulf of Mexico and West African asset NDT records simultaneously.",
    latitude: 51.5074, longitude: -0.1278,
  },
  {
    slug: "aberdeen-uk",
    name: "Aberdeen", state: "United Kingdom", country: "GB",
    region: "northeast", tier: 4,
    industries: ["North Sea offshore oil and gas", "Subsea engineering", "Offshore wind"],
    codeAuthorities: ["HSE Offshore Division", "PCN (BINDT)", "DNV", "API 570"],
    namedFacilities: [
      { name: "Harbour Energy Aberdeen operations", type: "Offshore operator" },
      { name: "TotalEnergies Aberdeen operations", type: "Offshore operator" },
      { name: "Wood plc HQ", type: "Engineering services HQ" },
      { name: "Bilfinger Salamis Aberdeen", type: "Offshore services" },
    ],
    localPainQuote: "North Sea winter weather windows compress offshore inspection slots into single-tide trips — a calibration cert that lapses mid-rotation strands a Level II on a platform until the next chopper window.",
    latitude: 57.1497, longitude: -2.0943,
  },
  {
    slug: "hull-uk",
    name: "Hull / Immingham", state: "United Kingdom", country: "GB",
    region: "northeast", tier: 4,
    industries: ["Refining", "Port operations", "Petrochemical"],
    codeAuthorities: ["HSE COMAH", "PCN (BINDT)", "API 510 / 570 / 653"],
    namedFacilities: [
      { name: "Phillips 66 Humber Refinery", type: "Refinery" },
      { name: "Prax Lindsey Oil Refinery", type: "Refinery" },
      { name: "Port of Immingham", type: "Port" },
    ],
    localPainQuote: "Humber-cluster COMAH sites run pressure-equipment inspection under HSE's tightest tier — a UT cal record gap is a regulator's first finding, not a paperwork foot-fault.",
    latitude: 53.6152, longitude: -0.1929,
  },

  // ---------------- Tier 4 — Norway ----------------
  {
    slug: "stavanger-no",
    name: "Stavanger", state: "Norway", country: "NO",
    region: "northeast", tier: 4,
    industries: ["North Sea offshore oil and gas", "Subsea", "Floating production"],
    codeAuthorities: ["PSA Norway (Petroleumstilsynet)", "DNV", "NORSOK", "API 570"],
    namedFacilities: [
      { name: "Equinor Forus HQ", type: "Integrated energy HQ" },
      { name: "Aker Solutions Stavanger", type: "Subsea / offshore engineering" },
      { name: "Aker BP Stavanger", type: "Offshore operator" },
    ],
    localPainQuote: "PSA Norway audits NDT records at the asset and corporate level simultaneously — Equinor and partner contractors run NORSOK-grade traceability where a cal-record gap reads as a safety-case deficiency.",
    latitude: 58.9700, longitude: 5.7331,
  },

  // ---------------- Tier 4 — Netherlands ----------------
  {
    slug: "rotterdam-nl",
    name: "Rotterdam", state: "Netherlands", country: "NL",
    region: "northeast", tier: 4,
    industries: ["Refining (largest in Europe)", "Petrochemical", "Port operations"],
    codeAuthorities: ["DCMR (regional regulator)", "EEMUA", "API 510 / 570 / 653", "PED 2014/68/EU"],
    namedFacilities: [
      { name: "Shell Pernis Refinery", type: "Refinery" },
      { name: "ExxonMobil Rotterdam Refinery", type: "Refinery" },
      { name: "BP Rotterdam Refinery", type: "Refinery" },
      { name: "Port of Rotterdam", type: "Port" },
      { name: "LyondellBasell Maasvlakte", type: "Petrochemical" },
    ],
    localPainQuote: "Rotterdam's refining cluster runs the densest turnaround calendar in Europe — DCMR and PED audits land back-to-back, and instrument cal traceability has to defend both at the same desk.",
    latitude: 51.9244, longitude: 4.4777,
  },

  // ---------------- Tier 4 — Germany ----------------
  {
    slug: "hamburg-de",
    name: "Hamburg", state: "HH", country: "DE",
    region: "northeast", tier: 4,
    industries: ["Aerospace (Airbus)", "Port operations", "Refining"],
    codeAuthorities: ["EASA Part 145", "NAS 410", "DGZfP", "PED"],
    namedFacilities: [
      { name: "Airbus Hamburg Finkenwerder (A320 family final assembly)", type: "Aerospace assembly" },
      { name: "Lufthansa Technik Hamburg", type: "Aerospace MRO" },
      { name: "Holborn Europa Raffinerie", type: "Refinery" },
      { name: "Port of Hamburg", type: "Port" },
    ],
    localPainQuote: "Airbus Hamburg and Lufthansa Technik share an NDT labour pool — keeping NAS 410 and EASA Part 145 cert paths current on the same Level II is a daily reconciliation, not a quarterly one.",
    latitude: 53.5511, longitude: 9.9937,
  },
  {
    slug: "frankfurt-de",
    name: "Frankfurt", state: "HE", country: "DE",
    region: "northeast", tier: 4,
    industries: ["Specialty chemicals (Industriepark Höchst)", "Aerospace MRO", "Manufacturing"],
    codeAuthorities: ["DGZfP", "PED 2014/68/EU", "EASA Part 145"],
    namedFacilities: [
      { name: "Industriepark Höchst (Infraserv)", type: "Chemical industrial park" },
      { name: "Lufthansa Technik Frankfurt", type: "Aerospace MRO" },
    ],
    localPainQuote: "Industriepark Höchst hosts dozens of operators behind one fence — TÜV inspectors expect contractor NDT cert files to differentiate by site within the park, not roll them up.",
    latitude: 50.1109, longitude: 8.6821,
  },
  {
    slug: "munich-de",
    name: "Munich", state: "BY", country: "DE",
    region: "northeast", tier: 4,
    industries: ["Aero engines (MTU)", "Aerospace and defense", "Manufacturing"],
    codeAuthorities: ["EASA Part 145", "NAS 410", "DGZfP", "AS9100"],
    namedFacilities: [
      { name: "MTU Aero Engines Munich", type: "Aero engine manufacturing and MRO" },
      { name: "Airbus Defence and Space Ottobrunn", type: "Aerospace / defense" },
    ],
    localPainQuote: "MTU's engine inspection floors run to the tightest EASA NDT specs in Europe — a DGZfP-credentialed Level III's currency record has to map to specific engine builds at audit.",
    latitude: 48.1351, longitude: 11.5820,
  },

  // ---------------- Tier 4 — UAE ----------------
  {
    slug: "dubai-ae",
    name: "Dubai", state: "United Arab Emirates", country: "AE",
    region: "southwest", tier: 4,
    industries: ["Port operations", "Aluminum", "Aerospace MRO"],
    codeAuthorities: ["GCAA", "ASNT SNT-TC-1A", "API", "DNV"],
    namedFacilities: [
      { name: "Emirates Global Aluminium (EGA) Jebel Ali", type: "Aluminum smelter" },
      { name: "Jebel Ali Port (DP World)", type: "Port" },
      { name: "Emirates Engineering (DXB)", type: "Aerospace MRO" },
    ],
    localPainQuote: "Jebel Ali's smelter and port together with Emirates Engineering MRO mean three NDT cert regimes (API, DNV, GCAA) on overlapping crews — a single cal-record gap can disqualify a contractor at three gates the same week.",
    latitude: 25.2048, longitude: 55.2708,
  },
  {
    slug: "abu-dhabi-ae",
    name: "Abu Dhabi", state: "United Arab Emirates", country: "AE",
    region: "southwest", tier: 4,
    industries: ["Integrated oil and gas (ADNOC)", "Refining", "Petrochemical"],
    codeAuthorities: ["ADNOC HSE Codes of Practice", "ADNOC Engineering Standards (AGES)", "API 510 / 570 / 653", "ASME"],
    namedFacilities: [
      { name: "ADNOC Ruwais Refinery Complex", type: "Refinery" },
      { name: "Borouge (ADNOC / Borealis) Ruwais", type: "Petrochemical" },
      { name: "ADNOC Onshore Habshan / Bab", type: "Upstream / gas processing" },
      { name: "ADNOC Offshore Das Island", type: "Offshore upstream / LNG" },
    ],
    localPainQuote: "ADNOC's contractor-qualification system audits NDT cert and instrument-cal traceability against AGES standards on every PO — a single gap blocks site access at the Ruwais gate.",
    latitude: 24.4539, longitude: 54.3773,
  },

  // ---------------- Tier 4 — Saudi Arabia ----------------
  {
    slug: "riyadh-sa",
    name: "Riyadh", state: "Saudi Arabia", country: "SA",
    region: "southwest", tier: 4,
    industries: ["Energy HQs (Saudi Aramco regional)", "EPC HQs", "Manufacturing"],
    codeAuthorities: ["Saudi Aramco SAES / SAEP", "ARAMCO 9COM / 9COE inspection codes", "ASME", "API"],
    namedFacilities: [
      { name: "Saudi Aramco regional offices", type: "Integrated energy HQ" },
      { name: "SABIC HQ", type: "Petrochemical HQ" },
    ],
    localPainQuote: "Aramco's 9COM/9COE inspector certification regime is jurisdictional, not advisory — a contractor without current 9COM-credentialed Level IIs cannot enter an Aramco asset, full stop.",
    latitude: 24.7136, longitude: 46.6753,
  },
  {
    slug: "dammam-sa",
    name: "Dammam", state: "Saudi Arabia", country: "SA",
    region: "southwest", tier: 4,
    industries: ["Aramco operations", "Upstream", "Industrial services"],
    codeAuthorities: ["Saudi Aramco SAES", "ARAMCO 9COM / 9COE", "API 510 / 570 / 653"],
    namedFacilities: [
      { name: "Saudi Aramco Dhahran HQ (regional)", type: "Integrated energy HQ" },
      { name: "Saudi Aramco Abqaiq plant (regional)", type: "Crude stabilisation / processing" },
    ],
    localPainQuote: "Eastern-Province Aramco assets audit contractor NDT records against SAEP-1135 on a per-PO basis — a single instrument cal-cert miss reads as a contractor-qualification failure, not a paperwork lapse.",
    latitude: 26.4207, longitude: 50.0888,
  },
  {
    slug: "jubail-sa",
    name: "Jubail", state: "Saudi Arabia", country: "SA",
    region: "southwest", tier: 4,
    industries: ["Petrochemical (Jubail Industrial City)", "Refining", "Steel"],
    codeAuthorities: ["RCJY (Royal Commission for Jubail and Yanbu)", "Saudi Aramco SAES", "API", "ASME"],
    namedFacilities: [
      { name: "SABIC Jubail complexes", type: "Petrochemical" },
      { name: "SATORP (Saudi Aramco / TotalEnergies) Jubail Refinery", type: "Refinery" },
      { name: "Sadara Chemical (Jubail-area)", type: "Petrochemical" },
      { name: "Hadeed (SABIC) Jubail", type: "Steel" },
    ],
    localPainQuote: "Jubail's industrial-city scale puts dozens of operators behind one Royal Commission gate — fleet-level NDT cal traceability across a single contractor's instruments is the only way to mobilise across sites without re-qualifying each day.",
    latitude: 27.0046, longitude: 49.6580,
  },

  // ---------------- Tier 4 — Qatar ----------------
  {
    slug: "doha-qa",
    name: "Doha", state: "Qatar", country: "QA",
    region: "southwest", tier: 4,
    industries: ["LNG (largest single-site in the world at Ras Laffan)", "Gas processing", "Petrochemical"],
    codeAuthorities: ["QatarEnergy specifications", "DNV", "API 510 / 570 / 653", "ASME"],
    namedFacilities: [
      { name: "QatarEnergy HQ Doha", type: "Integrated energy HQ" },
      { name: "Ras Laffan Industrial City (regional)", type: "LNG / petrochemical complex" },
      { name: "Qatargas / Qatar LNG trains", type: "LNG export" },
    ],
    localPainQuote: "Ras Laffan LNG mega-trains run inspection scopes that don't tolerate a single mis-routed cal cert — a contractor without QatarEnergy-spec traceability is locked out of the gate before mobilisation.",
    latitude: 25.2854, longitude: 51.5310,
  },

  // ---------------- Tier 4 — Oman ----------------
  {
    slug: "muscat-om",
    name: "Muscat", state: "Oman", country: "OM",
    region: "southwest", tier: 4,
    industries: ["Upstream oil and gas (PDO)", "Refining", "LNG"],
    codeAuthorities: ["PDO Engineering Standards (SP series)", "Shell DEP", "API 510 / 570 / 653"],
    namedFacilities: [
      { name: "Petroleum Development Oman (PDO) HQ Mina Al Fahal", type: "Integrated upstream HQ" },
      { name: "OQ Refineries (Sohar / Mina Al Fahal regional)", type: "Refining" },
      { name: "Oman LNG Qalhat (regional)", type: "LNG export" },
    ],
    localPainQuote: "PDO's SP-series engineering specs roll up Shell DEPs into Oman-specific inspection demands — a contractor's cert and cal records have to defend both PDO and DEP audit paths on the same scope.",
    latitude: 23.5880, longitude: 58.3829,
  },

  // ---------------- Tier 4 — Kuwait ----------------
  {
    slug: "kuwait-city-kw",
    name: "Kuwait City", state: "Kuwait", country: "KW",
    region: "southwest", tier: 4,
    industries: ["Upstream oil (KOC)", "Refining (KNPC)", "Petrochemical"],
    codeAuthorities: ["KOC Standards", "KNPC Standards", "API 510 / 570 / 653", "ASME"],
    namedFacilities: [
      { name: "Kuwait Oil Company (KOC) HQ Ahmadi", type: "Upstream operator HQ" },
      { name: "KNPC Mina Al Ahmadi Refinery", type: "Refinery" },
      { name: "KNPC Mina Abdullah Refinery", type: "Refinery" },
      { name: "KNPC Al-Zour Refinery", type: "Refinery" },
    ],
    localPainQuote: "KOC and KNPC each run their own contractor-qualification regimes — a Level II current at one is not automatically current at the other, and the cert reconciliation is a per-PO problem.",
    latitude: 29.3759, longitude: 47.9774,
  },

  // ---------------- Tier 4 — Singapore ----------------
  {
    slug: "singapore-sg",
    name: "Singapore", state: "Singapore", country: "SG",
    region: "southwest", tier: 4,
    industries: ["Refining (Jurong Island)", "Petrochemical", "Marine and offshore"],
    codeAuthorities: ["MOM (Ministry of Manpower) Pressure Vessel Regulations", "ABS / DNV / LR", "API 510 / 570 / 653"],
    namedFacilities: [
      { name: "ExxonMobil Singapore Refinery (Jurong / Pulau Ayer Chawan)", type: "Refinery" },
      { name: "Shell Energy and Chemicals Park Singapore (Pulau Bukom)", type: "Refinery / petrochemical" },
      { name: "Singapore Refining Company (SRC) Jurong Island", type: "Refinery" },
      { name: "Seatrium (formerly Keppel/Sembcorp Marine) yards", type: "Offshore / shipbuilding" },
    ],
    localPainQuote: "Jurong Island's MOM pressure-vessel inspection regime is one of the strictest in Asia — every UT cal record has to satisfy MOM, IOC and class-society auditors at the same yard gate.",
    latitude: 1.3521, longitude: 103.8198,
  },

  // ---------------- Tier 4 — Malaysia ----------------
  {
    slug: "kuala-lumpur-my",
    name: "Kuala Lumpur", state: "Malaysia", country: "MY",
    region: "southwest", tier: 4,
    industries: ["Energy HQ (Petronas)", "Refining", "Petrochemical"],
    codeAuthorities: ["PETRONAS Technical Standards (PTS)", "DOSH (Department of Occupational Safety and Health)", "API 510 / 570"],
    namedFacilities: [
      { name: "PETRONAS Twin Towers HQ", type: "Integrated energy HQ" },
      { name: "PETRONAS RAPID / PIC Pengerang (regional)", type: "Refining / petrochemical" },
    ],
    localPainQuote: "PETRONAS PTS audits roll up to the Twin Towers — a contractor's NDT cert and cal traceability is reviewed at corporate, not just at the asset, and a gap closes a vendor across the entire Petronas system.",
    latitude: 3.1390, longitude: 101.6869,
  },

  // ---------------- Tier 4 — India ----------------
  {
    slug: "mumbai-in",
    name: "Mumbai", state: "India", country: "IN",
    region: "southwest", tier: 4,
    industries: ["Refining", "Petrochemical", "Offshore (Mumbai High)"],
    codeAuthorities: ["PESO (Petroleum and Explosives Safety Organisation)", "OISD standards", "DGMS", "API 510 / 570 / 653"],
    namedFacilities: [
      { name: "BPCL Mumbai Refinery", type: "Refinery" },
      { name: "HPCL Mumbai Refinery", type: "Refinery" },
      { name: "ONGC Mumbai High offshore (regional)", type: "Offshore upstream" },
      { name: "Reliance Industries Corporate HQ", type: "Integrated energy HQ" },
    ],
    localPainQuote: "OISD-130 inspection cycles on Mumbai-coast refineries run alongside PESO licensing — a single missing cal record bridges into both regulator audits and a license-renewal hold.",
    latitude: 19.0760, longitude: 72.8777,
  },
  {
    slug: "chennai-in",
    name: "Chennai", state: "India", country: "IN",
    region: "southwest", tier: 4,
    industries: ["Port operations", "Refining", "Auto manufacturing"],
    codeAuthorities: ["PESO", "OISD", "IRS (Indian Register of Shipping)", "API 510 / 570"],
    namedFacilities: [
      { name: "Chennai Petroleum Corporation (CPCL) Manali Refinery", type: "Refinery" },
      { name: "Kamarajar (Ennore) Port", type: "Port" },
      { name: "Chennai Port Trust", type: "Port" },
    ],
    localPainQuote: "Chennai's mixed refinery and port-side fabrication scopes layer PESO and IRS audits onto the same crew — a Level II's cert needs to satisfy both, and the cal records have to map to the same instrument across both audits.",
    latitude: 13.0827, longitude: 80.2707,
  },
  {
    slug: "jamnagar-in",
    name: "Jamnagar", state: "India", country: "IN",
    region: "southwest", tier: 4,
    industries: ["Refining (largest single-site refining complex in the world)", "Petrochemical", "Pipelines and product export"],
    codeAuthorities: ["PESO", "OISD-130 / OISD-128", "API 510 / 570 / 653", "PNGRB"],
    namedFacilities: [
      { name: "Reliance Jamnagar Refinery (DTA)", type: "Refinery" },
      { name: "Reliance Jamnagar SEZ Refinery", type: "Export-oriented refinery" },
      { name: "Sikka Marine Terminal (Reliance)", type: "Crude / product import-export terminal" },
    ],
    localPainQuote: "Jamnagar runs the largest refining complex on Earth on tight OISD turnaround clocks — a single calibration miss at this scale ripples across hundreds of vessels and miles of piping.",
    latitude: 22.4707, longitude: 70.0577,
  },

  // ---------------- Tier 4 — Brazil ----------------
  {
    slug: "rio-de-janeiro-br",
    name: "Rio de Janeiro", state: "Brazil", country: "BR",
    region: "southeast", tier: 4,
    industries: ["Offshore oil and gas (Petrobras HQ)", "Pre-salt operations", "Naval"],
    codeAuthorities: ["ANP (Agência Nacional do Petróleo)", "ABNT NBR", "API 510 / 570", "DNV"],
    namedFacilities: [
      { name: "Petrobras HQ (Edifício Sede)", type: "Integrated energy HQ" },
      { name: "Petrobras CENPES research center", type: "R&D / inspection technology" },
      { name: "Petrobras Duque de Caxias Refinery (REDUC)", type: "Refinery" },
    ],
    localPainQuote: "Petrobras pre-salt FPSO inspection campaigns run on ANP audit windows — every UT cal cert and inspector qualification has to map to specific subsea-tieback PO scopes, not a generic asset.",
    latitude: -22.9068, longitude: -43.1729,
  },
  {
    slug: "macae-br",
    name: "Macaé", state: "Brazil", country: "BR",
    region: "southeast", tier: 4,
    industries: ["Offshore services hub (Campos / Santos basin)", "Subsea", "Helicopter logistics"],
    codeAuthorities: ["ANP", "DNV", "ABS", "ABNT NBR"],
    namedFacilities: [
      { name: "Petrobras UO-BC (Bacia de Campos operations base) Macaé", type: "Offshore ops base" },
      { name: "Macaé heliport (offshore logistics hub)", type: "Aviation / logistics" },
    ],
    localPainQuote: "Macaé is the staging base for the Campos basin — calibrated NDT kits move offshore on tight chopper schedules, and a missed cal cycle on a UT thickness gauge strands a Level II two days from his lab.",
    latitude: -22.3717, longitude: -41.7861,
  },

  // ---------------- Tier 4 — Mexico ----------------
  {
    slug: "villahermosa-mx",
    name: "Villahermosa", state: "Mexico", country: "MX",
    region: "gulf-coast", tier: 4,
    industries: ["Pemex upstream and gas processing", "Offshore services (Bay of Campeche)", "Refining (Dos Bocas / Olmeca)"],
    codeAuthorities: ["ASEA (Agencia de Seguridad, Energía y Ambiente)", "NOM standards", "API 510 / 570", "Pemex NRF"],
    namedFacilities: [
      { name: "Pemex Región Sur HQ Villahermosa", type: "Upstream regional HQ" },
      { name: "Pemex Ciudad PEMEX gas processing complex (regional)", type: "Gas processing" },
      { name: "Pemex Dos Bocas (Olmeca) Refinery (regional)", type: "Refinery" },
    ],
    localPainQuote: "ASEA audits Pemex contractor NDT records against NOM-027 and NRF-028 on the same scope — a calibration cert that doesn't map to the specific NRF requirement is a documentary finding before the inspection even starts.",
    latitude: 17.9892, longitude: -92.9281,
  },

  // ---------------- Tier 4 — Australia ----------------
  {
    slug: "perth-au",
    name: "Perth", state: "WA", country: "AU",
    region: "frontier-us", tier: 4,
    industries: ["Offshore oil and gas (NW Shelf)", "LNG", "Iron ore mining HQs"],
    codeAuthorities: ["NOPSEMA", "AICIP / AS 3788 (pressure equipment)", "API 510 / 570", "DNV"],
    namedFacilities: [
      { name: "Woodside Energy HQ", type: "Integrated energy HQ" },
      { name: "Chevron Australia Perth (Gorgon / Wheatstone operator)", type: "LNG operator HQ" },
      { name: "Rio Tinto Iron Ore HQ", type: "Mining HQ" },
      { name: "BHP WA Iron Ore HQ", type: "Mining HQ" },
    ],
    localPainQuote: "NOPSEMA inspections on the NW Shelf demand AS 3788 in-service inspection records on tight cyclone-season windows — a missed cal cycle compounds with weather to push a campaign into the next season.",
    latitude: -31.9505, longitude: 115.8605,
  },

  // ---------------- Tier 4 — South Korea ----------------
  {
    slug: "ulsan-kr",
    name: "Ulsan", state: "South Korea", country: "KR",
    region: "pacific-northwest", tier: 4,
    industries: ["Shipbuilding (largest in the world)", "Refining", "Petrochemical", "Auto manufacturing"],
    codeAuthorities: ["KR (Korean Register)", "DNV / ABS / LR", "KOSHA", "API 510 / 570 / 653"],
    namedFacilities: [
      { name: "HD Hyundai Heavy Industries Ulsan Shipyard", type: "Shipbuilding" },
      { name: "SK Energy Ulsan Refinery (Korea's largest)", type: "Refinery" },
      { name: "S-Oil Ulsan Refinery", type: "Refinery" },
      { name: "Hyundai Motor Ulsan Plant", type: "Auto manufacturing" },
    ],
    localPainQuote: "HD HHI Ulsan launches new hulls on a weekly cadence — class-society NDT records (KR, DNV, ABS, LR) layer onto each hull, and a single instrument-cal record gap reverberates across multiple class books.",
    latitude: 35.5384, longitude: 129.3114,
  },

  // ============================================================
  // Tier 4 — Gulf (filling legacy slug gaps)
  // ============================================================
  {
    slug: "manama-bh",
    name: "Manama", state: "Bahrain", country: "BH",
    region: "gulf-coast", tier: 4,
    industries: ["Refining", "Aluminum smelting", "Port and shipyard operations", "Banking and trading HQ for Gulf NDT firms"],
    codeAuthorities: ["API 510 / 570 / 653", "ASME", "ISO 9712", "AS 3788 (regional)"],
    namedFacilities: [
      { name: "BAPCO Sitra Refinery", type: "Refinery" },
      { name: "Alba (Aluminium Bahrain) Smelter", type: "Aluminum smelting (one of world's largest single-site smelters)" },
      { name: "ASRY (Arab Shipbuilding & Repair Yard)", type: "Drydock / ship repair (regional hub for Gulf tankers)" },
      { name: "Bahrain LNG Receiving Terminal", type: "LNG import / regas" },
    ],
    localPainQuote: "BAPCO modernization (BMP) runs alongside Alba's pot-line audits and ASRY's class-society survey rhythm — Bahrain NDT crews jump between API, IAEC, and ABS standards inside a single week, and one expired Level II disqualifies the same tech across all three gates.",
    latitude: 26.2285, longitude: 50.5860,
  },
  {
    slug: "yanbu-sa",
    name: "Yanbu", state: "Saudi Arabia", country: "SA",
    region: "gulf-coast", tier: 4,
    industries: ["Refining", "Petrochemical", "Port / terminal operations", "Pipelines (East-West)"],
    codeAuthorities: ["Saudi Aramco SAES / SAEP", "API 510 / 570 / 653", "ASME", "PESO (regional vendor)"],
    namedFacilities: [
      { name: "Saudi Aramco Yanbu Refinery", type: "Refinery" },
      { name: "YANSAB (SABIC Yanbu Petrochemicals)", type: "Petrochemical complex" },
      { name: "Yanbu Aramco Sinopec Refining Company (YASREF)", type: "Refinery (full-conversion 400 kbpd)" },
      { name: "Royal Commission Yanbu II Industrial City", type: "Industrial city operator (utilities + corridor)" },
    ],
    localPainQuote: "Yanbu's East-West Pipeline terminus drives full-bore turnaround clusters every Q4 — Aramco SAES NDT audit windows are tight, and a Level III not current with SAES requirements pulls an entire contractor off the AVL for the season.",
    latitude: 24.0895, longitude: 38.0618,
  },

  // ============================================================
  // Tier 4 — India (filling legacy slug gaps)
  // ============================================================
  {
    slug: "hyderabad-in",
    name: "Hyderabad", state: "India", country: "IN",
    region: "southwest", tier: 4,
    industries: ["Heavy manufacturing (BHEL)", "Defense research (DRDO)", "Pharmaceutical manufacturing", "Aerospace"],
    codeAuthorities: ["PESO", "IBR (Indian Boiler Regulations)", "ASME", "AS 9100 (aerospace shops)"],
    namedFacilities: [
      { name: "BHEL Ramachandrapuram (Hyderabad Unit)", type: "Boiler and turbine manufacturing" },
      { name: "DRDO Defence Research Labs (Kanchanbagh)", type: "Defense research" },
      { name: "Tata Advanced Systems Hyderabad (Boeing AH-64 / Lockheed C-130 fuselage)", type: "Aerospace structures" },
      { name: "Dr Reddy's / Aurobindo Hyderabad Plants", type: "Pharma manufacturing" },
    ],
    localPainQuote: "BHEL Hyderabad's boiler-drum NDT runs to IBR and ASME Section I in parallel — every UT shear-wave record has to survive a CIB and an AI inspection on the same drum, on schedules that don't allow a re-shoot.",
    latitude: 17.3850, longitude: 78.4867,
  },
  {
    slug: "bangalore-in",
    name: "Bangalore", state: "India", country: "IN",
    region: "southwest", tier: 4,
    industries: ["Aerospace (HAL / Boeing / Airbus)", "Defense electronics", "Aero-engine MRO", "Space launch hardware"],
    codeAuthorities: ["DGCA CAR 145", "NADCAP NDT", "AS 9100", "NAS 410"],
    namedFacilities: [
      { name: "Hindustan Aeronautics Limited (HAL) Bangalore Complex", type: "Aerospace manufacturing (Tejas, ALH, Sukhoi)" },
      { name: "Bharat Electronics Limited (BEL) Bangalore", type: "Defense electronics" },
      { name: "GE Aerospace Bangalore (J F Welch Technology Centre)", type: "Aero-engine engineering and MRO" },
      { name: "ISRO Satellite Centre (URSC)", type: "Spacecraft assembly" },
    ],
    localPainQuote: "HAL's Tejas line and the GE/Pratt engine MRO floors run NAS 410 Level II/III audits at NADCAP-grade cadence — a single missed renewal in the contractor's qualified-roster file forces a recheck of every aero-NDT signature on every part going through final acceptance.",
    latitude: 12.9716, longitude: 77.5946,
  },
  {
    slug: "delhi-in",
    name: "Delhi", state: "India", country: "IN",
    region: "southwest", tier: 4,
    industries: ["Pipelines and midstream (GAIL / IOCL)", "Auto manufacturing (Maruti, Honda)", "Aerospace MRO (IGI)", "Power generation"],
    codeAuthorities: ["PESO", "API 570", "DGCA CAR 145", "IBR"],
    namedFacilities: [
      { name: "IndianOil R&D Centre Faridabad (regional)", type: "Refining R&D / inspection methodology" },
      { name: "Maruti Suzuki Manesar Plant (regional)", type: "Auto manufacturing" },
      { name: "Honda Cars India Tapukara (regional)", type: "Auto manufacturing" },
      { name: "Indira Gandhi International Airport (IGI) — Air India / Vistara MRO bays", type: "Aviation MRO" },
    ],
    localPainQuote: "IGI's Part 145 MRO floor and the GAIL HVJ pipeline crews mobilise from the same Delhi NCR labour pool — DGCA and PNGRB audit windows almost never align, and a Level II current on one set can be expired on the other inside 30 days.",
    latitude: 28.6139, longitude: 77.2090,
  },
  {
    slug: "kolkata-in",
    name: "Kolkata", state: "India", country: "IN",
    region: "northeast", tier: 4,
    industries: ["Defense shipbuilding (GRSE)", "Refining (regional, Haldia)", "Heavy steel and engineering", "Port and inland waterways"],
    codeAuthorities: ["IRS (Indian Register of Shipping)", "ABS / DNV / LR", "API 510 / 570 / 653", "IBR"],
    namedFacilities: [
      { name: "Garden Reach Shipbuilders & Engineers (GRSE)", type: "Defense shipbuilder (frigates, ASW corvettes)" },
      { name: "IOCL Haldia Refinery (regional)", type: "Refinery" },
      { name: "Hindustan Aeronautics Barrackpore Helicopter MRO", type: "Helicopter overhaul" },
      { name: "Kolkata Port Trust (Syama Prasad Mookerjee Port)", type: "Port operations" },
    ],
    localPainQuote: "GRSE delivers Project 17A frigates to a Navy schedule that won't slip — every weld-NDT record runs to both IRS class and Indian Navy weapons-platform standards, and a missed cert breaks the chain on a hull that's already at sea trials.",
    latitude: 22.5726, longitude: 88.3639,
  },
  {
    slug: "pune-in",
    name: "Pune", state: "India", country: "IN",
    region: "southwest", tier: 4,
    industries: ["Auto manufacturing (Tata, Mercedes, VW)", "Heavy forging (Bharat Forge)", "Agriculture equipment (John Deere)", "Defense vehicles"],
    codeAuthorities: ["IBR", "ASME", "AIAG-VDA (auto)", "DGAQA (defense)"],
    namedFacilities: [
      { name: "Tata Motors Chinchwad / Pimpri Plant", type: "Commercial vehicle manufacturing" },
      { name: "Bharat Forge Mundhwa", type: "Heavy forging (crankshafts, defense)" },
      { name: "Mercedes-Benz India Chakan Plant", type: "Auto manufacturing" },
      { name: "John Deere Sanaswadi Plant", type: "Agriculture equipment / engines" },
      { name: "Force Motors Akurdi (defense vehicles)", type: "Defense vehicle manufacturing" },
    ],
    localPainQuote: "Bharat Forge's defense and crankshaft heat-lots run UT shear-wave at NADCAP-grade rigour for export — a single drift in the cal verification record on a forging lot can pull the entire shipment back to re-inspection three plants away.",
    latitude: 18.5204, longitude: 73.8567,
  },
  {
    slug: "ahmedabad-in",
    name: "Ahmedabad", state: "India", country: "IN",
    region: "southwest", tier: 4,
    industries: ["Petrochemical (Reliance Dahej / Hazira)", "Power generation (Torrent / Adani)", "Port logistics (Adani Mundra)", "Pharma"],
    codeAuthorities: ["PESO", "OISD", "API 510 / 570 / 653", "IBR"],
    namedFacilities: [
      { name: "Reliance Hazira Manufacturing Division (regional)", type: "Petrochemical / olefin cracker" },
      { name: "Adani Mundra Port (regional)", type: "Largest commercial port in India" },
      { name: "Torrent Power Sabarmati Plant", type: "Gas-fired power generation" },
      { name: "Reliance Dahej Manufacturing Division (regional)", type: "PVC / polymers" },
    ],
    localPainQuote: "Reliance Hazira's vapor recovery and olefins-train turnarounds run to OISD-130 audit tempo — Ahmedabad NDT crews mobilise to Hazira and Dahej on the same week, and a Level III cal record gap from Hazira surfaces at the Dahej gate inside 48 hours.",
    latitude: 23.0225, longitude: 72.5714,
  },
  {
    slug: "kochi-in",
    name: "Kochi", state: "India", country: "IN",
    region: "southwest", tier: 4,
    industries: ["Shipbuilding (Cochin Shipyard)", "Refining (BPCL Kochi)", "Naval MRO", "Port operations"],
    codeAuthorities: ["IRS (Indian Register of Shipping)", "ABS", "API 510 / 570 / 653", "Indian Navy NAVPRO"],
    namedFacilities: [
      { name: "Cochin Shipyard Limited (CSL)", type: "Shipbuilding (IAC-1 INS Vikrant, LNG carriers)" },
      { name: "BPCL Kochi Refinery (formerly BORL)", type: "Refinery (310 kbpd)" },
      { name: "Naval Ship Repair Yard (NSRY) Kochi", type: "Indian Navy MRO" },
      { name: "Cochin Port (Willingdon Island)", type: "Port operations" },
    ],
    localPainQuote: "Cochin Shipyard built INS Vikrant under IRS and Indian Navy NAVPRO oversight simultaneously — every weld-NDT record had to satisfy both class books, and the same dual-standard rhythm now applies to the LNG-carrier export hulls in the queue.",
    latitude: 9.9312, longitude: 76.2673,
  },
  {
    slug: "visakhapatnam-in",
    name: "Visakhapatnam", state: "India", country: "IN",
    region: "southwest", tier: 4,
    industries: ["Refining (HPCL Visakh)", "Shipbuilding (Hindustan Shipyard)", "Naval MRO (ENC HQ)", "Integrated steel (RINL)"],
    codeAuthorities: ["IRS", "API 510 / 570 / 653", "ABS", "Indian Navy NAVPRO", "IBR"],
    namedFacilities: [
      { name: "HPCL Visakh Refinery", type: "Refinery (15 MMTPA, post-VRMP expansion)" },
      { name: "Hindustan Shipyard Limited (HSL)", type: "Shipbuilding / submarine refit" },
      { name: "Naval Dockyard Visakhapatnam (Eastern Naval Command HQ)", type: "Submarine and surface ship MRO" },
      { name: "RINL / Visakhapatnam Steel Plant", type: "Integrated steel" },
    ],
    localPainQuote: "HSL's submarine refits and the HPCL Visakh expansion overlap quarter-on-quarter for the same NDT contractor base — submarine pressure-hull UT records run to Indian Navy NAVPRO classification, refinery vessels to API, and a single drift in cal traceability cascades to both audit chains within the week.",
    latitude: 17.6868, longitude: 83.2185,
  },

  // ============================================================
  // Tier 4 — Australia (filling legacy slug gaps)
  // ============================================================
  {
    slug: "sydney-au",
    name: "Sydney", state: "NSW", country: "AU",
    region: "frontier-us", tier: 4,
    industries: ["Defense shipbuilding and MRO", "Port and container operations", "Heavy rail maintenance", "Construction materials"],
    codeAuthorities: ["AICIP / AS 3788", "AS/NZS 1554 (welding)", "AS 4458 (pressure vessels)", "DefAust (defense)"],
    namedFacilities: [
      { name: "Garden Island Defence Precinct (HMAS Kuttabul)", type: "Royal Australian Navy fleet base / MRO" },
      { name: "Port Botany Container Terminal", type: "Port" },
      { name: "Sydney Trains Auburn Maintenance Centre", type: "Rail rolling-stock heavy maintenance" },
      { name: "Boral Sydney Cement and Aggregates", type: "Construction materials" },
    ],
    localPainQuote: "Garden Island runs RAN platform maintenance under DefAust standards while Sydney Trains cycles fleet through AS/NZS 1554 weld-NDT audits — same Sydney labour pool, two regulators, and one expired AINDT Level II forces a re-roster across both gates the same week.",
    latitude: -33.8688, longitude: 151.2093,
  },
  {
    slug: "melbourne-au",
    name: "Melbourne", state: "VIC", country: "AU",
    region: "frontier-us", tier: 4,
    industries: ["Refining (Viva Geelong, regional)", "Port operations", "Heavy rail and tram MRO", "Defense engineering"],
    codeAuthorities: ["AICIP / AS 3788", "AS/NZS 1554", "AS 4458", "DefAust"],
    namedFacilities: [
      { name: "Viva Energy Geelong Refinery (regional)", type: "Refinery (sole remaining Victorian refinery)" },
      { name: "Port of Melbourne", type: "Largest container port in Australia" },
      { name: "Metro Trains Melbourne Newport Workshops", type: "Rail rolling-stock heavy maintenance" },
      { name: "BAE Systems Australia Melbourne (Williamtown / RAAF support, regional HQ)", type: "Defense engineering" },
    ],
    localPainQuote: "Viva Geelong's API turnaround and the Newport tram-NDT audit window land in the same fortnight every year — Melbourne contractors juggle API 510 and AS/NZS 1554 rosters on the same crew, and a missed renewal pulls a Level II off both jobs simultaneously.",
    latitude: -37.8136, longitude: 144.9631,
  },
  {
    slug: "brisbane-au",
    name: "Brisbane", state: "QLD", country: "AU",
    region: "frontier-us", tier: 4,
    industries: ["LNG export (Curtis Island, regional Gladstone)", "Aluminum smelting (Boyne, regional)", "Defense aerospace (BDA Amberley)", "Port operations"],
    codeAuthorities: ["AICIP / AS 3788", "API 510 / 570 / 653", "AS 4458", "DASR (defense aviation regulator)"],
    namedFacilities: [
      { name: "Queensland Curtis LNG (QCLNG) — Gladstone (regional)", type: "LNG export" },
      { name: "Boyne Smelter (Rio Tinto), Gladstone (regional)", type: "Aluminum smelting" },
      { name: "Boeing Defence Australia, RAAF Base Amberley (regional)", type: "Defense aerospace sustainment (F/A-18, EA-18G, P-8A)" },
      { name: "Port of Brisbane", type: "Port operations" },
    ],
    localPainQuote: "QCLNG and Australia Pacific LNG run alternating outage windows on Curtis Island — Brisbane NDT contractors that hold both Aramco-style SAES-equivalent qualifications and DASR aerospace Level III are scarce, and a single cal record gap puts both shifts at risk.",
    latitude: -27.4698, longitude: 153.0251,
  },

  // ============================================================
  // Tier 4 — South Africa (filling legacy slug gaps)
  // ============================================================
  {
    slug: "cape-town-za",
    name: "Cape Town", state: "Western Cape", country: "ZA",
    region: "gulf-coast", tier: 4,
    industries: ["Refining (Astron Cape Town)", "Port operations", "Shipbuilding and repair", "Foundry"],
    codeAuthorities: ["SANS (South African National Standards)", "ASME", "API 510 / 570 / 653", "DNV / ABS / LR"],
    namedFacilities: [
      { name: "Astron Energy Cape Town Refinery", type: "Refinery" },
      { name: "Cape Town Container Terminal (TNPA)", type: "Port operations" },
      { name: "Damen Shipyards Cape Town", type: "Shipbuilding (Cape-class patrol boats)" },
      { name: "Atlantis Foundries", type: "Heavy iron casting (Daimler truck engine blocks)" },
    ],
    localPainQuote: "Astron's refinery turnaround and Damen's shipyard rebuild compete for the same SAIW Level III pool in any given quarter — SANS-aligned cert traceability is the only way to keep a tech available to both gates without losing audit-day visibility.",
    latitude: -33.9249, longitude: 18.4241,
  },
  {
    slug: "johannesburg-za",
    name: "Johannesburg", state: "Gauteng", country: "ZA",
    region: "gulf-coast", tier: 4,
    industries: ["Synfuels and petrochemical (Sasol Secunda, regional)", "Steel (ArcelorMittal Vanderbijlpark, regional)", "Power generation (Eskom)", "Platinum and gold mining"],
    codeAuthorities: ["SANS", "ASME", "API 510 / 570", "DMRE (mining regulator)", "OHSA"],
    namedFacilities: [
      { name: "Sasol Secunda Operations (regional)", type: "Synfuels / GTL (world's largest CTL complex)" },
      { name: "ArcelorMittal Vanderbijlpark Works (regional)", type: "Integrated steel" },
      { name: "Eskom Megawatt Park HQ + Kusile / Medupi (regional)", type: "Power generation utility HQ" },
      { name: "Anglo American Platinum Rustenburg (regional)", type: "Platinum mining and processing" },
    ],
    localPainQuote: "Sasol Secunda runs its CTL trains and Eskom's Kusile units share the same Highveld NDT contractor pool — Sasol SAES-style audit packs and Eskom's NSPSA cert matrices live in different systems, and a Level III who's current on one is almost never current on the other.",
    latitude: -26.2041, longitude: 28.0473,
  },
];
