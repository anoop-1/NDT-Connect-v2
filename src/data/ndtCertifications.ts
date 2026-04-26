// src/data/ndtCertifications.ts
//
// Comprehensive list of personnel certification bodies / schemes and company
// certifications recognised in the NDT industry worldwide. User-added custom
// items are merged at render time via useUserPredefinedLists.

export interface CertBody {
  code: string;
  name: string;
  region: string;
}

// Personnel qualification schemes — global coverage.
export const PERSONNEL_CERT_BODIES: CertBody[] = [
  // ASNT family (USA)
  { code: "SNT-TC-1A", name: "ASNT SNT-TC-1A",                       region: "USA — recommended practice" },
  { code: "CP-189",    name: "ASNT CP-189 (Standard for Qualification & Certification)", region: "USA" },
  { code: "ACCP",      name: "ASNT ACCP (Central Certification Program)", region: "USA" },
  { code: "ASNT-3",    name: "ASNT NDT Level III",                   region: "USA" },

  // ISO and European
  { code: "ISO-9712",  name: "ISO 9712 (Personnel Qualification & Certification)", region: "International" },
  { code: "EN-4179",   name: "EN 4179 (European Aerospace Personnel Qualification)", region: "Europe — Aerospace" },
  { code: "DIN-EN-473",name: "DIN EN 473 (legacy German / European)",  region: "Europe (legacy)" },

  // UK
  { code: "PCN",       name: "PCN (Personal Certification in NDT) — BINDT, UK", region: "UK" },
  { code: "BINDT",     name: "BINDT (British Institute of NDT)",      region: "UK" },
  { code: "CSWIP",     name: "CSWIP (TWI Certification Scheme)",      region: "UK / International" },

  // North America - non-USA
  { code: "CGSB",      name: "CGSB (Canadian General Standards Board)",region: "Canada" },
  { code: "NRCAN",     name: "Natural Resources Canada (NRCan) NDT Certification", region: "Canada" },

  // Aerospace
  { code: "NAS-410",   name: "NAS 410 (US Aerospace Personnel Qualification)", region: "USA — Aerospace" },
  { code: "NADCAP",    name: "NADCAP (Aerospace Prime Audit)",        region: "Aerospace — primes" },

  // Australia / NZ
  { code: "AINDT",     name: "AINDT (Australian Institute for NDT)",  region: "Australia" },
  { code: "ACS",       name: "ACS (NDT Certification Services — Australia)", region: "Australia / NZ" },

  // Asia-Pacific
  { code: "JSNDI",     name: "JSNDI (Japanese Society for NDI)",      region: "Japan" },
  { code: "KSNT",      name: "KSNT (Korean Society for NDT)",         region: "South Korea" },
  { code: "CCS",       name: "CCS (China Classification Society) NDT",region: "China" },
  { code: "CSNDT",     name: "CSNDT (Chinese Society for NDT)",       region: "China" },

  // Latin America
  { code: "ABENDI",    name: "ABENDI (Brazilian Association of NDT)", region: "Brazil" },
  { code: "AAEND",     name: "AAEND (Argentine Association of NDT)",  region: "Argentina" },

  // Russia / CIS
  { code: "GOST",      name: "GOST R / GOST ISO 9712",                region: "Russia / CIS" },

  // Middle East / India
  { code: "ISNT",      name: "ISNT (Indian Society for NDT)",         region: "India" },
  { code: "QCSNDT",    name: "Qatar / GCC NDT Certification",         region: "Middle East" },

  // International generic
  { code: "ACFM-LV",   name: "ACFM Operator Certificate",             region: "International" },
];

// Personnel qualification levels (universal — same across schemes).
export const PERSONNEL_LEVELS: string[] = [
  "Trainee",
  "Limited / Restricted",
  "Level I",
  "Level II",
  "Level III",
  "Senior NDT Engineer",
];

// Company-level certifications and accreditations.
export const COMPANY_CERTIFICATIONS: string[] = [
  "ISO 9001 (Quality Management)",
  "ISO 14001 (Environmental Management)",
  "ISO 45001 (Occupational Health & Safety)",
  "ISO/IEC 17020 (Inspection Bodies)",
  "ISO/IEC 17024 (Personnel Certification)",
  "ISO/IEC 17025 (Testing & Calibration Laboratories)",
  "ISO 29001 (Petroleum, Petrochemical & Natural Gas)",
  "API Q1 (Manufacturing)",
  "API Q2 (Service Supply Organizations)",
  "API Monogram",
  "AS9100 (Aerospace QMS)",
  "AS9110 (Aerospace MRO)",
  "AS9120 (Aerospace Distributors)",
  "Nadcap NDT Accreditation",
  "Nadcap Heat Treatment",
  "Nadcap Welding",
  "NAS 410 (Company Procedure)",
  // Classification societies
  "ABS (American Bureau of Shipping)",
  "BV (Bureau Veritas)",
  "CCS (China Classification Society)",
  "CRS (Croatian Register of Shipping)",
  "DNV",
  "IRS (Indian Register of Shipping)",
  "KR (Korean Register of Shipping)",
  "LR (Lloyd's Register)",
  "ClassNK (Nippon Kaiji Kyokai)",
  "PRS (Polski Rejestr Statków)",
  "RINA",
  "RS (Russian Maritime Register of Shipping)",
  // Aerospace primes
  "Boeing D6-82479",
  "Airbus AIPI / AIPS",
  "Lockheed Martin Approval",
  "Pratt & Whitney Approval",
  "Rolls-Royce SABRe / RRES",
  "GE Aviation Approval",
  // Industry-specific
  "ASME Stamp (S, U, R, NPT, NA, etc.)",
  "ASME N-Stamp (Nuclear)",
  "FAA Part 145 Repair Station",
  "EASA Part 145 Repair Organisation",
  "ENAC ISO 17025 Accreditation",
  "UKAS ISO 17025 Accreditation",
  "A2LA ISO 17025 Accreditation",
  "PED 2014/68/EU Compliance",
  "AWS Accredited Test Facility",
];
