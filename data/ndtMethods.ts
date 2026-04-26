// src/data/ndtMethods.ts
//
// Comprehensive NDT methods list aligned to ASNT SNT-TC-1A (latest edition,
// covering all 15+ recognised methods). Each method has a code (used in
// equipment / cert dropdowns) and a display name.
//
// Users can add custom methods at runtime via useUserPredefinedLists; those
// additions are merged with this list at render time and appear in every
// dropdown across Equipment, Calibration, and Certifications pages for that
// user only.

export interface NdtMethod {
  code: string;        // short code, used as the canonical identifier
  name: string;        // full display name
  category?: string;   // optional grouping (Volumetric, Surface, etc.)
}

// Ordered ASNT SNT-TC-1A list (mainline methods first, specialty after).
export const NDT_METHODS: NdtMethod[] = [
  { code: "UT",   name: "Ultrasonic Testing (UT)",                 category: "Volumetric" },
  { code: "RT",   name: "Radiographic Testing (RT)",               category: "Volumetric" },
  { code: "MT",   name: "Magnetic Particle Testing (MT)",          category: "Surface" },
  { code: "PT",   name: "Liquid Penetrant Testing (PT)",           category: "Surface" },
  { code: "ET",   name: "Electromagnetic / Eddy Current Testing (ET)", category: "Surface / Subsurface" },
  { code: "VT",   name: "Visual Testing (VT)",                     category: "Surface" },
  { code: "LT",   name: "Leak Testing (LT)",                       category: "Other" },
  { code: "AE",   name: "Acoustic Emission Testing (AE)",          category: "Other" },
  { code: "GWT",  name: "Guided Wave Testing (GWT)",               category: "Volumetric" },
  { code: "PAUT", name: "Phased Array Ultrasonic Testing (PAUT)",  category: "Volumetric" },
  { code: "TOFD", name: "Time-of-Flight Diffraction (TOFD)",       category: "Volumetric" },
  { code: "DR",   name: "Digital Radiography (DR)",                category: "Volumetric" },
  { code: "CR",   name: "Computed Radiography (CR)",               category: "Volumetric" },
  { code: "CT",   name: "Computed Tomography (CT)",                category: "Volumetric" },
  { code: "NR",   name: "Neutron Radiographic Testing (NR)",       category: "Volumetric" },
  { code: "IR",   name: "Thermal / Infrared Testing (IR)",         category: "Surface / Subsurface" },
  { code: "MFL",  name: "Magnetic Flux Leakage (MFL)",             category: "Surface / Subsurface" },
  { code: "VA",   name: "Vibration Analysis (VA)",                 category: "Other" },
  { code: "LM",   name: "Laser Testing Methods (LM)",              category: "Other" },
  { code: "MW",   name: "Microwave Testing (MW)",                  category: "Other" },
  { code: "SH",   name: "Shearography",                            category: "Surface / Subsurface" },
  { code: "HT",   name: "Hardness Testing",                        category: "Surface" },
  { code: "PMI",  name: "Positive Material Identification (PMI)",  category: "Other" },
  { code: "RFT",  name: "Remote Field Testing (RFT)",              category: "Surface / Subsurface" },
  { code: "ACFM", name: "Alternating Current Field Measurement (ACFM)", category: "Surface" },
  { code: "MPT",  name: "Metallography / Replication",             category: "Surface" },
];

// Common NDT instrument types for the equipment registry. These are
// instrument-class labels (not the same as method codes) — a single method
// (e.g. UT) maps to several instrument types (flaw detector, thickness gauge,
// PA system, TOFD system, ...).
export const NDT_EQUIPMENT_TYPES: { type: string; method?: string }[] = [
  { type: "Ultrasonic Flaw Detector",                  method: "UT" },
  { type: "Ultrasonic Thickness Gauge",                method: "UT" },
  { type: "Phased Array Ultrasonic System",            method: "PAUT" },
  { type: "TOFD System",                               method: "TOFD" },
  { type: "Guided Wave Testing System",                method: "GWT" },
  { type: "Radiographic Source (Ir-192)",              method: "RT" },
  { type: "Radiographic Source (Co-60)",               method: "RT" },
  { type: "Radiographic Source (Se-75)",               method: "RT" },
  { type: "X-Ray Generator (constant potential)",      method: "RT" },
  { type: "X-Ray Generator (pulsed)",                  method: "RT" },
  { type: "Digital Radiography Detector Panel",        method: "DR" },
  { type: "Computed Radiography Scanner",              method: "CR" },
  { type: "Computed Tomography System",                method: "CT" },
  { type: "Magnetic Yoke (AC)",                        method: "MT" },
  { type: "Magnetic Yoke (DC / Permanent)",            method: "MT" },
  { type: "MT Bench Unit",                             method: "MT" },
  { type: "Coil Magnetisation Unit",                   method: "MT" },
  { type: "Penetrant (PT) Kit — Solvent Removable",    method: "PT" },
  { type: "Penetrant (PT) Kit — Water Washable",       method: "PT" },
  { type: "Penetrant (PT) Kit — Post-Emulsifiable",    method: "PT" },
  { type: "Eddy Current Instrument (Single-Frequency)",method: "ET" },
  { type: "Eddy Current Instrument (Multi-Frequency)", method: "ET" },
  { type: "Eddy Current Array (ECA) System",           method: "ET" },
  { type: "Remote Field Testing Probe",                method: "RFT" },
  { type: "ACFM Instrument",                           method: "ACFM" },
  { type: "Borescope / Videoscope",                    method: "VT" },
  { type: "Boroscope Camera",                          method: "VT" },
  { type: "Light Meter / Lux Meter",                   method: "VT" },
  { type: "UV-A Light Meter",                          method: "PT" },
  { type: "Hardness Tester (Portable)",                method: "HT" },
  { type: "Hardness Tester (Bench)",                   method: "HT" },
  { type: "PMI Analyser (XRF)",                        method: "PMI" },
  { type: "PMI Analyser (LIBS)",                       method: "PMI" },
  { type: "Thermal Imaging Camera",                    method: "IR" },
  { type: "Acoustic Emission Sensor / System",         method: "AE" },
  { type: "Leak Test Kit (Vacuum Box)",                method: "LT" },
  { type: "Helium Mass Spectrometer Leak Detector",    method: "LT" },
  { type: "Vibration Analyser",                        method: "VA" },
  { type: "Calibration Block (V1)",                    method: "UT" },
  { type: "Calibration Block (V2)",                    method: "UT" },
  { type: "Calibration Block (IIW)",                   method: "UT" },
  { type: "Reference Standard (Step Wedge)",           method: "RT" },
  { type: "Reference Standard (IQI)",                  method: "RT" },
  { type: "Densitometer",                              method: "RT" },
  { type: "Survey Meter (Radiation)",                  method: "RT" },
  { type: "Thermometer / Pyrometer",                   method: "VT" },
  { type: "Datalogger / Recorder",                                   },
  { type: "Other",                                                   },
];
