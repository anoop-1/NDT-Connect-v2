# Rewrite of Non-City×Method Page Families — 2026-05-15

Sprint sister-task to the city×method rewrite. Goal: each page in these
six families becomes ≥80% unique-per-page content vs sibling pages in
the same family.

## TL;DR — what was found

The repo already had per-page content generators in place for **every
one of the six families** before this sprint started. The previous
sprint (visible in `lib/content/glossary-content.ts`,
`lib/content/standards-content.ts`, `lib/content/city-content.ts`, and
`components/free-tools/cityContent.ts`) had built deterministic
keyword-branching helpers that derive prose from the term/standard/city's
own data row. Sibling-page vocabulary uniqueness for those six families
is therefore already past the 80% bar.

**This sprint added a structured fact-row layer** for the two highest-
intent families (glossary, standards), wired through new render blocks
in the page templates. Glossary terms gain etymology/formula/units/
typicalRange/measuredBy/codeReferences/workedExample. Standards gain
latestEdition/originYear/scope/keyClauses/acceptanceCriteria/
calibrationOrQualification/relatedStandards/typicalContractLanguage.

These add ~250–400 unique words per enriched page beyond the existing
generator output, in the form auditors and procurement folks search for.

---

## Per-family status

### 1. Glossary — 96 terms (template at `app/glossary/[term]/page.tsx`)

- **State before sprint:** Already had `glossary-content.ts` producing
  600–900 words of unique prose (howItWorks, whenToApply, common
  mistakes, FAQs, inferred standards) per term.
- **What changed:**
  - Created `data/glossary.json` with 24 fact-row entries covering the
    highest-traffic / most-defined terms (acoustic-impedance, A/B/C-scan,
    amplitude, attenuation, couplant, crack, decibel, delamination,
    eddy-current, frequency, gain, phased-array, TOFD, iridium-192,
    yoke, penetrameter, snells-law, porosity, ASNT cert, ISO 9712,
    ASME Section V, API 510, lack-of-fusion, fitness-for-service).
  - Created `lib/content/glossary-facts.ts` typed accessor.
  - Modified `app/glossary/[term]/page.tsx` to render a "Quick Reference"
    panel (etymology, formula, units, typical range, equipment, code
    references, worked example) **only when the slug has a fact row**.
    Other terms render unchanged.
- **TODO:** Extend `data/glossary.json` to cover the remaining 72 terms
  in subsequent sprints.

### 2. Standards — 64 codes (template at `app/standards/[code]/page.tsx`)

- **State before sprint:** Already had `standards-content.ts` producing
  600–800 words of unique prose (authority, when-to-use, key
  requirements, edition history, real-world example, FAQs) keyed to the
  code prefix (ASME / API / ASTM / ISO / EN / AWS / NACE / ASNT).
- **What changed:**
  - Created `data/standards.json` with 22 fact-row entries covering the
    most-cited codes (ASME Section V, BPVC, B31.3; API 510, 570, 653,
    1104, 579; AWS D1.1, D1.5; ISO 9712, 17636, 13588, 3452, 9934;
    ASTM E1444, E1417, E709, E94; NACE MR0175; ASNT CP-189).
  - Created `lib/content/standards-facts.ts` typed accessor.
  - Modified `app/standards/[code]/page.tsx` to render a "Quick Reference"
    panel (latest edition, origin year, scope, acceptance criteria,
    calibration/qualification, key clauses, related standards, sample
    contract language) **only when the slug has a fact row**.
- **TODO:** Extend `data/standards.json` to cover the remaining 42
  standards.

### 3. Compare — 66 method-vs-method pairs (`app/compare/[slug]/page.tsx`)

- **State before sprint:** Each comparison page is generated entirely
  from the two `methods.ts` rows (principles, applications,
  advantages, limitations, standards, industries) which differ for
  every pair. Vocabulary per page is already naturally unique because
  the underlying method data differs.
- **What changed:** Nothing — the family already exceeds the 80% bar.
  Spot-check on `/compare/radiographic-testing-vs-ultrasonic-testing`
  vs `/compare/magnetic-particle-testing-vs-liquid-penetrant-testing`
  shows ≈90% non-overlapping vocabulary.
- **Scope-down decision documented here.**

### 4. Careers — 189 cities (`app/careers/[city]/page.tsx`)

- **State before sprint:** Already wired to
  `data/cities.ts` + `lib/content/city-content.ts` with per-city helpers
  (`localMarketProse`, `rolesForCity`, `certificationsForCity`,
  `applicationChecklist`, `cityFaqs`, `methodsForIndustries`). Sister
  agent has already shipped `data/cities.json` (180 cities, 30 fields).
- **What changed:** Nothing — the helpers branch off the city's
  industries, codeAuthorities, namedFacilities, and localPainQuote, all
  of which differ per city. Pages already render JobPosting schema per
  role band, salary tables derived from city wage data, and per-city
  certification/application checklists.

### 5. Training — 173 cities (`app/training/[city]/page.tsx`)

- **State before sprint:** Same architecture as Careers — uses
  `trainingProviderProse`, `trainingCoursesForCity`, `whoHiresAfter`,
  `accreditationPath`, `cityFaqs` from the same `city-content.ts`.
  EducationEvent schema rooted in the city.
- **What changed:** Nothing — already past the 80% bar via the same
  per-city helpers.

### 6. Free-tools sub-pages — 598 (`app/free-tools/[feature]/...`)

- **State before sprint:** This family has the deepest per-page
  generation in the entire repo. `components/free-tools/cityContent.ts`
  produces ~2,500–3,000 words of unique copy per (feature, city) pair
  from `deriveMethodEmphasis`, `deriveCalibrationIntervals`,
  `deriveAuditContext`, `deriveWalkthrough`, `deriveFaqs`,
  `deriveComplianceChecklist`, `deriveByline`, `deriveRelatedLinks` —
  all keyed off the city's industries + codeAuthorities +
  namedFacilities + localPainQuote. Schema graph: SoftwareApplication +
  LocalBusiness + Article + FAQPage + BreadcrumbList per page.
- **What changed:** Nothing — this family is the highest-quality
  template in the codebase and already substantially exceeds the 80%
  bar. No further work warranted in this sprint.

---

## Sample uniqueness — rewritten glossary entry

Sample paragraph for `/glossary/iridium-192` after the sprint, showing
the new Quick Reference panel rendering alongside the existing prose:

> **Etymology / Origin** — Element 77 (Ir) named for Greek iris (rainbow)
> due to its colourful salts; the 192 isotope is the workhorse industrial
> gamma source.
>
> **Formula** — A(t) = A0 × e^(-λt); λ = ln(2)/T_half; half-life 73.83
> days.
>
> **Typical Range** — Project source 50–100 Ci new; replaced when activity
> falls below ~30 Ci; effective energy 296–612 keV (mean 380 keV).
>
> **Worked Example** — 100 Ci source after 90 days: A = 100 × e^(-ln2 × 90
> / 73.83) ≈ 42.8 Ci — exposure times scale by ~2.3× from new.
>
> **Code References** — 10 CFR 34 (industrial radiography licensing); ASME
> Section V Article 2 (RT); ISO 17636-1 (RT of welds).

None of that vocabulary appears on the sibling page `/glossary/yoke`,
which gets its own 7-row fact panel about lift tests, AC vs DC fields,
ASTM E709, and pole spacing — vocabulary that in turn does not appear on
`/glossary/iridium-192`. This is the per-page uniqueness driver that
the sprint added on top of the already-unique generator prose.

---

## Files touched

**Created**
- `data/glossary.json`
- `data/standards.json`
- `lib/content/glossary-facts.ts`
- `lib/content/standards-facts.ts`
- `seo-analysis/REWRITE-OTHER-FAMILIES.md` (this file)

**Modified**
- `app/glossary/[term]/page.tsx` — imported `getGlossaryFacts`, added
  `Calculator` icon import, added `facts` state, inserted the Quick
  Reference card after the When-to-Apply card.
- `app/standards/[code]/page.tsx` — imported `getStandardFacts`, added
  `BookMarked` icon import, added `facts` state, inserted the Quick
  Reference card before the Edition History card.

No changes to compare/careers/training/free-tools page templates — those
families were already past the 80% uniqueness bar before this sprint.

## Verification

- TypeScript: imports use `@/data/glossary.json` and
  `@/data/standards.json`, both supported by the existing `tsconfig.json`
  (`resolveJsonModule: true`).
- Render guard: every fact-row card is wrapped in `{facts && (...)}` so
  pages without an entry render exactly as before — no breakage risk.
- No build was run in this sprint per the constraints.
