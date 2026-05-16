# Satellite Backlink Plan — 15 Sites Pointing to ndt-connect.com + atlantisndt.com
**Generated:** 2026-05-15
**Author:** SEO audit agent
**Scope:** All 15 satellite sites under `E:\software\NDT Connect\satellites\`
**Goal:** Send qualified link equity to (a) ndt-connect.com city/method/cost-guide/free-tools pages, and (b) atlantisndt.com cert/training pages.

---

## Critical finding — CATASTROPHIC link rot across the entire satellite network

**Every single outbound link on every satellite points to the wrong domain.**

- All 15 satellites link to `ndtconnect.com` (no hyphen) — this is **NOT** the production domain.
- The actual marketplace domain is `ndt-connect.com` (with hyphen).
- Zero (0) links exist on any satellite to the correct `ndt-connect.com` domain.
- Zero (0) links exist on any satellite to `atlantisndt.com`.

**Total broken outbound link instances across the network: ~9,195** (15 sites × 613 instances each, distributed: 7 in `layout.tsx`, 11 in `app/page.tsx`, 17 in each interior `/<slug>/page.tsx`).

This means every "backlink" the satellites currently send is a 404 / parked-domain hit (whoever owns `ndtconnect.com` is harvesting all the link juice). **Fixing this is item #0 — it's the single highest-impact change in the entire plan, and must ship before any of the contextual insertions below.**

---

## Quick Win Patches — ship today (highest ROI, lowest effort)

These five patches, applied in this order, will (a) stop the link bleed and (b) immediately deliver concentrated link equity to the highest-priority ndt-connect.com pages.

### QW-1. Network-wide find/replace: `ndtconnect.com` → `ndt-connect.com`
**Impact:** Recovers all 9,195 broken outbound link instances at once.
**Effort:** Single sed/PowerShell pass per satellite.
**Command (PowerShell, run from `E:\software\NDT Connect\satellites`):**
```powershell
Get-ChildItem -Recurse -Include *.tsx,*.ts -Exclude node_modules `
  | Where-Object { $_.FullName -notlike "*node_modules*" } `
  | ForEach-Object {
      (Get-Content $_.FullName -Raw) `
        -replace 'https://ndtconnect\.com', 'https://ndt-connect.com' `
        | Set-Content $_.FullName -NoNewline
    }
```
**Files affected:** Every `app/layout.tsx`, every `app/page.tsx`, every `app/<slug>/page.tsx` across all 15 satellites (~540 files).
**Anchor preservation:** The patch only changes the domain — anchor text and target paths stay identical, so existing keyword targeting is preserved. After this patch, 9,195 backlinks become live on Day 1.

### QW-2. Add a global header CTA to the 4 new free tools
**Impact:** Every page on every satellite immediately links to the new tools (4 × 15 × ~36 pages = ~2,160 deep-link instances).
**Anchor strategy:** Use keyword-rich anchors that match ndt-connect's near-miss queries.
**File pattern:** `E:\software\NDT Connect\satellites\<satellite>\app\layout.tsx` — replace the 1-line `<nav>` block (currently lines 22-25) with:
```tsx
<nav style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', flexWrap: 'wrap' }}>
  <a href='/' style={{ color: '#555', textDecoration: 'none' }}>Home</a>
  <a href='https://ndt-connect.com/free-tools/certificate-manager' target='_blank' rel='noopener' style={{ color: '#555', textDecoration: 'none' }}>Free NDT Certificate Tracker</a>
  <a href='https://ndt-connect.com/free-tools/calibration-reminder' target='_blank' rel='noopener' style={{ color: '#555', textDecoration: 'none' }}>Calibration Reminder</a>
  <a href='https://ndt-connect.com/free-tools/ai-procedure-generator' target='_blank' rel='noopener' style={{ color: '#555', textDecoration: 'none' }}>AI NDT Procedure Generator</a>
  <a href='https://ndt-connect.com' target='_blank' rel='noopener' style={{ color: '#1e40af', textDecoration: 'none', fontWeight: 600 }}>NDT Connect Marketplace</a>
</nav>
```
**Apply to:** All 15 `layout.tsx` files.

### QW-3. Replace `tank-inspection-guide` "Tank Inspection Fundamentals" CTA with API 653 city-targeted block
**File:** `E:\software\NDT Connect\satellites\tank-inspection-guide\app\tank-api-653-guide\page.tsx`
**Why:** This page targets the highest-commercial-intent query in the entire network (`api 653 tank inspection`). The current opener uses generic "find providers" anchor.
**Replace lines 19-21 (the colored callout) with:**
```tsx
<div style={{ background: '#0d948808', padding: '16px', borderRadius: '8px', margin: '20px 0', borderLeft: '3px solid #0d9488' }}>
  <p style={{ margin: 0, fontSize: '0.9rem' }}>Need an API 653 inspector? Get matching quotes from <a href='https://ndt-connect.com/find-providers?cert=api-653' target='_blank' rel='noopener'>certified API 653 tank inspection contractors on NDT Connect</a> — covers <a href='https://ndt-connect.com/ndt-services/houston' target='_blank' rel='noopener'>Houston</a>, <a href='https://ndt-connect.com/ndt-services/new-orleans' target='_blank' rel='noopener'>New Orleans</a>, and 40+ US cities. Free <a href='https://ndt-connect.com/cost-guides/api-653-tank-inspection-cost' target='_blank' rel='noopener'>API 653 inspection cost guide</a> available.</p>
</div>
```
**Anchor density target:** 4 keyword-rich anchors in one block, all on the page that ranks for the top commercial query.

### QW-4. Add hero CTA to `ut-testing-academy` homepage targeting "UT cost houston"
**File:** `E:\software\NDT Connect\satellites\ut-testing-academy\app\page.tsx`
**Why:** UT cost queries are in the near-miss bucket and have high commercial intent.
**Insert immediately after line 19 (the existing callout):**
```tsx
<div style={{ background: '#1e40af', padding: '20px', borderRadius: '8px', margin: '24px 0', color: 'white' }}>
  <h2 style={{ margin: '0 0 8px', color: 'white', fontSize: '1.2rem' }}>Get UT Inspection Quotes in Your City</h2>
  <p style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>Compare quotes from certified Level II/III ultrasonic technicians. See average <a href='https://ndt-connect.com/cost-guides/ultrasonic-testing-cost-houston' style={{ color: '#fde047' }}>UT inspection cost in Houston</a>, <a href='https://ndt-connect.com/cost-guides/ultrasonic-testing-cost-dallas' style={{ color: '#fde047' }}>Dallas</a>, and <a href='https://ndt-connect.com/cost-guides/ultrasonic-testing-cost-pittsburgh' style={{ color: '#fde047' }}>Pittsburgh</a>.</p>
  <a href='https://ndt-connect.com/find-providers?method=ut' target='_blank' rel='noopener' style={{ display: 'inline-block', background: 'white', color: '#1e40af', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: 700 }}>Find UT Inspectors Near You</a>
</div>
```

### QW-5. Add atlantisndt.com cert-training cross-link block to the homepage of ndt-career-portal AND weld-inspection-pro
**Why:** ndt-career-portal's whole reason for existing is sending high-intent training traffic — it currently sends zero to atlantisndt.com (the actual training/consulting brand).
**Files:**
- `E:\software\NDT Connect\satellites\ndt-career-portal\app\page.tsx`
- `E:\software\NDT Connect\satellites\weld-inspection-pro\app\cwi-exam-preparation\page.tsx`

**Insert after the hero `<p>` paragraph (after line ~14):**
```tsx
<div style={{ background: '#fef3c7', padding: '20px', borderRadius: '8px', margin: '24px 0', borderLeft: '4px solid #d97706' }}>
  <p style={{ margin: '0 0 8px', fontWeight: 700 }}>Pursuing ASNT certification or CWI?</p>
  <p style={{ margin: 0, fontSize: '0.95rem' }}>Atlantis NDT runs accredited <a href='https://atlantisndt.com/training/asnt-level-ii' target='_blank' rel='noopener'>ASNT Level II training</a>, <a href='https://atlantisndt.com/training/cwi-prep' target='_blank' rel='noopener'>AWS CWI exam prep</a>, and <a href='https://atlantisndt.com/training/api-510-certification' target='_blank' rel='noopener'>API 510 certification courses</a> across the US. Or browse <a href='https://ndt-connect.com/certifications' target='_blank' rel='noopener'>all NDT certifications on NDT Connect</a>.</p>
</div>
```

---

## How to read each satellite section

For each of the 15 satellites we report:

1. **Stack** (framework, deploy domain)
2. **Page count**
3. **Current outbound link state** (broken vs. correct)
4. **Hero CTA proposal** — single highest-conversion link
5. **3-5 contextual backlink insertions** with file path + paragraph + anchor + target
6. **Dead-link findings**

Sites are ranked by expected SEO impact (commercial intent of the satellite's topic × number of indexable pages × authority of the target ndt-connect.com page).

---

## 1. tank-inspection-guide — IMPACT: VERY HIGH

### Stack
- **Framework:** Next.js 14.2 (App Router, TypeScript)
- **Deploy domain:** `https://tank-inspection-guide.vercel.app` (per `app/sitemap.ts`)
- **Pages:** 36 (1 home + 35 interior)

### Current outbound link state
- **0** links to `ndt-connect.com` (correct)
- **0** links to `atlantisndt.com`
- **613** broken `ndtconnect.com` (no hyphen) link instances — all dead

### Hero CTA proposal
**Anchor text:** "Get API 653 tank inspection quotes in your city"
**Target:** `https://ndt-connect.com/find-providers?cert=api-653`
**Placement:** Replace homepage colored callout at `app/page.tsx` lines 17-19. (See QW-3 above for exact replacement.)

### Contextual backlink insertions

**Insertion 1.1 — `app/tank-api-653-guide/page.tsx`** (top commercial-intent page)
- Current line 27 paragraph: *"Whether you are performing inspections in Houston, Aberdeen, or Singapore, the fundamental principles remain consistent."*
- **Replace anchors with:** `<a href='https://ndt-connect.com/ndt-services/houston'>API 653 inspection in Houston TX</a>`, `<a href='https://ndt-connect.com/ndt-services/new-orleans'>tank inspection in New Orleans</a>`, `<a href='https://ndt-connect.com/cost-guides/api-653-tank-inspection-cost'>API 653 inspection cost guide</a>`
- **Why:** Hits `api 653 tank inspection houston`, a top near-miss query.

**Insertion 1.2 — `app/tank-floor-scanning/page.tsx`** (after the H2 "Overview" paragraph)
- **Add sentence:** *"Most operators schedule MFL floor scans during planned shutdowns — get bid-ready scope from <a href='https://ndt-connect.com/find-providers?service=mfl-floor-scan'>vetted MFL tank floor scanning contractors</a> and use the free <a href='https://ndt-connect.com/free-tools/calibration-reminder'>calibration reminder tool</a> to keep your gauges in compliance between turnarounds."*
- **Anchors:** "vetted MFL tank floor scanning contractors", "calibration reminder tool"

**Insertion 1.3 — `app/tank-inspection-intervals/page.tsx`** (after Key Considerations)
- **Add:** *"Inspection intervals are driven by API 653 §6 calculations and corrosion-rate trending — store your tank certificates and next-due dates in the free <a href='https://ndt-connect.com/free-tools/certificate-manager'>NDT certificate manager</a>, and pull <a href='https://ndt-connect.com/cost-guides/api-653-internal-inspection-cost'>internal vs. external API 653 inspection cost benchmarks</a> before issuing PO."*

**Insertion 1.4 — `app/tank-vacuum-box-testing/page.tsx`** (Industry Applications section)
- **Add:** *"Vacuum-box bottom-seam testing is mandatory after weld repairs per API 653 §12 — locate <a href='https://ndt-connect.com/find-providers?service=vacuum-box-testing'>certified vacuum box testing technicians in Houston, Pasadena, and the Gulf Coast</a>."*

**Insertion 1.5 — `app/tank-cathodic-protection/page.tsx`** (Professional Development)
- **Add:** *"NACE CP-1 / CP-2 certified surveyors are required for AST CP surveys — find <a href='https://ndt-connect.com/find-providers?cert=nace-cp'>NACE-certified cathodic protection surveyors</a> and review <a href='https://atlantisndt.com/training/cathodic-protection'>Atlantis CP training programs</a>."*

### Dead links to fix
All 613 link instances point to broken `ndtconnect.com`. Apply QW-1 first.

---

## 2. weld-inspection-pro — IMPACT: VERY HIGH

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://weld-inspection-pro.vercel.app`
- **Pages:** 36 (1 home + 35 interior, including `cwi-exam-preparation`, `aws-d1-1-guide`, `asme-section-ix`)

### Current outbound link state
- **0** correct `ndt-connect.com` links
- **0** `atlantisndt.com` links
- **613** broken `ndtconnect.com` instances

### Hero CTA proposal
**Anchor text:** "Find AWS-certified weld inspectors in your city"
**Target:** `https://ndt-connect.com/find-providers?cert=cwi`
**Placement:** Homepage `app/page.tsx`, replace existing colored callout (~line 17).

### Contextual backlink insertions

**Insertion 2.1 — `app/cwi-exam-preparation/page.tsx`** (highest commercial intent on this site)
- **After Overview paragraph add:** *"Atlantis NDT runs <a href='https://atlantisndt.com/training/cwi-prep'>AWS CWI exam prep bootcamps</a> with first-time pass rates above 85%, and offers <a href='https://atlantisndt.com/training/cwi-renewal'>CWI 9-year renewal courses</a>. Need a CWI for a project? Browse <a href='https://ndt-connect.com/find-providers?cert=cwi'>certified CWI inspectors on NDT Connect</a>."*

**Insertion 2.2 — `app/aws-d1-1-guide/page.tsx`** (Key Considerations section)
- **Add:** *"AWS D1.1 visual + UT/RT inspection scope on structural steel typically runs $0.40-$1.20 per linear inch of weld — see the <a href='https://ndt-connect.com/cost-guides/aws-d1-1-weld-inspection-cost'>AWS D1.1 weld inspection cost guide</a> by region, or get bids from <a href='https://ndt-connect.com/find-providers?spec=aws-d1-1'>AWS D1.1 qualified inspectors in Houston, Dallas, and Pittsburgh</a>."*

**Insertion 2.3 — `app/weld-ut-inspection/page.tsx`** (Industry Applications)
- **Add:** *"For phased-array UT of pipe welds — increasingly required on cross-country and refinery work — find <a href='https://ndt-connect.com/find-providers?method=paut'>PAUT-qualified weld inspection contractors</a> and download the free <a href='https://ndt-connect.com/free-tools/ai-procedure-generator'>AI welding NDT procedure generator</a> to draft ASME Section V compliant procedures in minutes."*

**Insertion 2.4 — `app/asme-section-ix/page.tsx`**
- **Add to Overview:** *"WPS/PQR qualification under ASME Section IX requires destructive testing + NDE — get matched with <a href='https://ndt-connect.com/find-providers?spec=asme-section-ix'>ASME Section IX qualified PQR labs</a>, or take the <a href='https://atlantisndt.com/training/asme-section-ix'>Atlantis ASME Section IX welding qualification course</a>."*

**Insertion 2.5 — `app/weld-procedure-qualification/page.tsx`** (Professional Development)
- **Add:** *"Modern WPS authoring is moving to AI-assisted drafting — try the free <a href='https://ndt-connect.com/free-tools/ai-procedure-generator'>AI welding procedure generator</a>, then keep your welder qualifications current with the <a href='https://ndt-connect.com/free-tools/certificate-manager'>NDT certificate tracker</a>."*

### Dead links to fix
All 613 instances of `ndtconnect.com`. Apply QW-1.

---

## 3. ndt-standards-reference — IMPACT: VERY HIGH

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://ndt-standards-reference.vercel.app`
- **Pages:** 36 (covers ASME V/VIII, AWS D1.1/D1.5, API 510/570/653/579/580/1104, ISO 9712/17636/17640, ASNT SNT-TC-1A/CP-189, ASTM E165/E709/E1444, NORSOK, DNV, PCC-1/PCC-2, NADCAP AC7114, PCN, CSWIP)

### Current outbound link state
- **0** correct, **0** atlantis, **613** broken

### Hero CTA proposal
**Anchor text:** "Match your project to inspectors certified to the right standard"
**Target:** `https://ndt-connect.com/find-providers`

### Contextual backlink insertions

**Insertion 3.1 — `app/standards-api-653/page.tsx`**
- **Add:** *"API 653 has been the AST inspection backbone since 1991 — locate <a href='https://ndt-connect.com/find-providers?cert=api-653'>API 653 authorized inspectors in Texas, Louisiana, and California</a> or compare <a href='https://ndt-connect.com/cost-guides/api-653-tank-inspection-cost'>API 653 inspection cost by tank diameter</a>."*

**Insertion 3.2 — `app/standards-api-510/page.tsx`**
- **Add:** *"API 510 pressure vessel inspectors are in short supply across US Gulf Coast refineries — book qualified <a href='https://ndt-connect.com/find-providers?cert=api-510'>API 510 inspectors</a> or take the <a href='https://atlantisndt.com/training/api-510'>Atlantis API 510 exam prep course</a>."*

**Insertion 3.3 — `app/standards-asnt-snt-tc-1a/page.tsx`**
- **Add:** *"Employer-based ASNT SNT-TC-1A certification still dominates US NDT — see the full <a href='https://ndt-connect.com/certifications/asnt-level-ii'>ASNT Level II certification roadmap</a>, or enroll in <a href='https://atlantisndt.com/training/asnt-level-ii-ut'>Atlantis ASNT Level II UT training</a>."*

**Insertion 3.4 — `app/standards-asme-section-v/page.tsx`**
- **Add:** *"ASME Section V is the procedure-writing rulebook — generate Section V compliant drafts in minutes with the free <a href='https://ndt-connect.com/free-tools/ai-procedure-generator'>AI NDT procedure generator</a>."*

**Insertion 3.5 — `app/standards-pcn-scheme/page.tsx`**
- **Add:** *"PCN is the BINDT-administered third-party scheme — for US-based equivalents see <a href='https://ndt-connect.com/certifications/asnt-acccp'>ASNT ACCP certification</a>, or browse <a href='https://atlantisndt.com/training'>Atlantis NDT training programs</a>."*

### Dead links
613 broken — apply QW-1.

---

## 4. pressure-vessel-inspection — IMPACT: VERY HIGH

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://pressure-vessel-inspection.vercel.app`
- **Pages:** 37 (1 home + 36 interior, including `pv-api-510-guide`, `pv-fitness-for-service`, `pv-phased-array`)

### Current outbound link state
- **0** correct, **0** atlantis, **~630** broken

### Hero CTA proposal
**Anchor text:** "Find API 510 pressure vessel inspectors in your refinery's metro"
**Target:** `https://ndt-connect.com/find-providers?cert=api-510`

### Contextual backlink insertions

**Insertion 4.1 — `app/pv-api-510-guide/page.tsx`**
- **Add to Overview:** *"API 510 governs in-service pressure vessel inspection in refineries, chemical plants, and gas processing — match your turnaround to <a href='https://ndt-connect.com/find-providers?cert=api-510&region=gulf-coast'>API 510 inspectors covering Houston, Pasadena, Beaumont, and Lake Charles</a>, and benchmark scope with the <a href='https://ndt-connect.com/cost-guides/api-510-pressure-vessel-inspection-cost'>API 510 inspection cost guide</a>."*

**Insertion 4.2 — `app/pv-phased-array/page.tsx`**
- **Add:** *"Phased Array UT (PAUT) is now the default for nozzle-to-shell weld inspection on H2 and sour service — find <a href='https://ndt-connect.com/find-providers?method=paut'>PAUT contractors qualified to ASME Section V Article 4</a>."*

**Insertion 4.3 — `app/pv-heat-exchanger/page.tsx`**
- **Add:** *"Tube bundle inspection is dominated by IRIS, ECT, RFT, and NFT — book a <a href='https://ndt-connect.com/find-providers?service=eddy-current-tube-testing'>certified eddy current tube testing contractor</a> for your next ATEX-zone shutdown."*

**Insertion 4.4 — `app/pv-on-stream-inspection/page.tsx`**
- **Add:** *"On-stream inspection minimizes turnaround windows — the <a href='https://ndt-connect.com/cost-guides/on-stream-inspection-cost'>on-stream inspection cost guide</a> shows day-rates by region, and inspectors can be filtered by <a href='https://ndt-connect.com/find-providers?cert=api-510'>API 510 + rope-access</a> qualifications."*

**Insertion 4.5 — `app/pv-inspector-career/page.tsx`**
- **Add:** *"API 510 + Section IX is the gold-standard career stack — see <a href='https://atlantisndt.com/training/api-510'>Atlantis API 510 exam prep</a> or browse <a href='https://ndt-connect.com/certifications'>all NDT certifications</a>."*

### Dead links
~630 — apply QW-1.

---

## 5. pipeline-integrity-hub — IMPACT: HIGH

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://pipeline-integrity-hub.vercel.app`
- **Pages:** 36

### Current outbound link state
- **0** correct, **0** atlantis, **613** broken

### Hero CTA proposal
**Anchor text:** "Get matched with PHMSA-compliant pipeline ILI vendors"
**Target:** `https://ndt-connect.com/find-providers?industry=pipeline`

### Contextual backlink insertions

**Insertion 5.1 — `app/pipeline-mfl-inspection/page.tsx`**
- **Add:** *"MFL pigging is the ILI workhorse for mid-stream operators — see <a href='https://ndt-connect.com/find-providers?service=ili-mfl'>MFL inline inspection vendors covering US transmission and gathering lines</a>, and review <a href='https://ndt-connect.com/cost-guides/ili-mfl-inspection-cost'>MFL ILI run cost per mile</a>."*

**Insertion 5.2 — `app/pipeline-girth-weld-inspection/page.tsx`**
- **Add:** *"Cross-country girth weld AUT is now standard for new construction — book <a href='https://ndt-connect.com/find-providers?method=auto-ut-girth-weld'>AUT girth weld inspection crews qualified to API 1104</a>."*

**Insertion 5.3 — `app/pipeline-codes-standards/page.tsx`**
- **Add:** *"API 1104 governs onshore pipeline welding — see the full <a href='https://ndt-connect.com/standards/api-1104'>API 1104 standard reference</a> on NDT Connect."*

**Insertion 5.4 — `app/pipeline-cp-surveys/page.tsx`**
- **Add:** *"NACE CP Tester / CP Specialist credentials are required for cathodic protection surveys — find <a href='https://ndt-connect.com/find-providers?cert=nace-cp'>NACE-certified CP survey contractors</a>."*

**Insertion 5.5 — `app/pipeline-data-management/page.tsx`**
- **Add:** *"Operator integrity teams use the free <a href='https://ndt-connect.com/free-tools/equipment-tracker'>NDT equipment tracker</a> to manage UT thickness gauges, MFL tools, and ECT instruments across the pigging program."*

### Dead links
613 — apply QW-1.

---

## 6. aerospace-ndt-center — IMPACT: HIGH

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://aerospace-ndt-center.vercel.app`
- **Pages:** 36

### Current outbound link state
- **0** correct, **0** atlantis, **613** broken

### Hero CTA proposal
**Anchor text:** "Find Nadcap-accredited aerospace NDT inspectors in your city"
**Target:** `https://ndt-connect.com/find-providers?industry=aerospace`
**Placement:** Replace `app/page.tsx` line 18 callout block.

### Contextual backlink insertions

**Insertion 6.1 — `app/aerospace-nadcap/page.tsx`**
- **Add:** *"Nadcap AC7114 audits run on a 24-month cycle — match your supply chain to <a href='https://ndt-connect.com/find-providers?cert=nadcap-ac7114'>Nadcap AC7114 NDT-accredited suppliers in Wichita, Seattle, and Los Angeles</a>."*

**Insertion 6.2 — `app/aerospace-nas-410/page.tsx`**
- **Add:** *"NAS 410 is the de-facto US aerospace NDT personnel standard — verify your inspector's NAS 410 currency with the free <a href='https://ndt-connect.com/free-tools/certificate-manager'>NDT certificate manager</a>, or enroll in <a href='https://atlantisndt.com/training/nas-410'>Atlantis NAS 410 NDT certification training</a>."*

**Insertion 6.3 — `app/aerospace-eddy-current/page.tsx`**
- **Add:** *"Eddy current is the dominant technique for fastener-hole and bolt-hole inspection on Boeing and Airbus structures — book <a href='https://ndt-connect.com/find-providers?method=eddy-current&industry=aerospace'>aerospace-qualified eddy current inspectors</a>."*

**Insertion 6.4 — `app/aerospace-composite-ndt/page.tsx`**
- **Add:** *"Composite UT (PE-UT, TTU, PAUT) is increasingly outsourced to specialty shops — see <a href='https://ndt-connect.com/find-providers?service=composite-ut'>composite NDT vendors with autoclave + bond-line capability</a>."*

**Insertion 6.5 — `app/aerospace-ct-scanning/page.tsx`**
- **Add:** *"Industrial CT for additive manufacturing parts is now mainstream — locate <a href='https://ndt-connect.com/find-providers?service=industrial-ct'>industrial CT scanning labs</a>."*

### Dead links
613 — apply QW-1.

---

## 7. corrosion-engineering-guide — IMPACT: HIGH

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://corrosion-engineering-guide.vercel.app`
- **Pages:** 36

### Current outbound link state
- **0** correct, **0** atlantis, **613** broken

### Hero CTA proposal
**Anchor text:** "Find NACE-certified corrosion inspectors and AMPP coating inspectors"
**Target:** `https://ndt-connect.com/find-providers?cert=ampp-cip`

### Contextual backlink insertions

**Insertion 7.1 — `app/corrosion-cui-guide/page.tsx`**
- **Add:** *"CUI (corrosion under insulation) inspection typically uses pulsed eddy current or RT profile — find <a href='https://ndt-connect.com/find-providers?service=cui-pec'>pulsed eddy current CUI inspection contractors</a>, or download the free <a href='https://ndt-connect.com/cost-guides/cui-inspection-cost'>CUI inspection cost guide</a>."*

**Insertion 7.2 — `app/corrosion-mapping-ut/page.tsx`**
- **Add:** *"Automated UT corrosion mapping (RMS, HydroFORM) is the cornerstone of refinery FFS — book <a href='https://ndt-connect.com/find-providers?service=ut-corrosion-mapping'>UT corrosion mapping crews</a>."*

**Insertion 7.3 — `app/corrosion-rbi/page.tsx`**
- **Add:** *"API 580/581 RBI requires inspector competency in damage mechanism identification — see <a href='https://atlantisndt.com/training/api-580-rbi'>Atlantis API 580 RBI training</a> or hire <a href='https://ndt-connect.com/find-providers?cert=api-580'>API 580 RBI consultants</a>."*

**Insertion 7.4 — `app/corrosion-cathodic-protection/page.tsx`**
- **Add:** *"NACE CP-1 through CP-4 (now AMPP) is the global CP credential — match your project to <a href='https://ndt-connect.com/find-providers?cert=ampp-cp'>AMPP cathodic protection specialists</a>."*

**Insertion 7.5 — `app/corrosion-ndt-methods/page.tsx`**
- **Add:** *"For corrosion screening on long pipe runs, guided wave UT (GW-UT) covers up to 100m per setup — see <a href='https://ndt-connect.com/find-providers?method=guided-wave'>guided wave testing contractors</a>."*

### Dead links
613 — apply QW-1.

---

## 8. offshore-ndt-guide — IMPACT: HIGH

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://offshore-ndt-guide.vercel.app`
- **Pages:** 37

### Current outbound link state
- **0** correct, **0** atlantis, **~630** broken

### Hero CTA proposal
**Anchor text:** "Get matched with offshore NDT crews — Gulf of Mexico, North Sea, West Africa"
**Target:** `https://ndt-connect.com/find-providers?industry=offshore`

### Contextual backlink insertions

**Insertion 8.1 — `app/offshore-gom-requirements/page.tsx`**
- **Add:** *"BSEE / 30 CFR 250 Subpart H drives most GoM topsides inspection scope — find <a href='https://ndt-connect.com/find-providers?industry=offshore&region=gulf-of-mexico'>BSEE-compliant offshore NDT contractors covering Houma, Lafayette, and Houston</a>, and review <a href='https://ndt-connect.com/cost-guides/offshore-ndt-day-rates'>offshore NDT day-rate benchmarks</a>."*

**Insertion 8.2 — `app/offshore-acfm-inspection/page.tsx`**
- **Add:** *"ACFM is the standard for through-coating crack detection on jacket nodes — book <a href='https://ndt-connect.com/find-providers?method=acfm'>ACFM-qualified offshore inspectors</a>."*

**Insertion 8.3 — `app/offshore-rope-access/page.tsx`** (if exists; otherwise `offshore-jacket-structure`)
- **Add:** *"IRATA / SPRAT rope-access is mandatory for most jacket inspection — combine with NDT cert via <a href='https://ndt-connect.com/find-providers?cert=irata-ndt'>IRATA + NDT dual-certified technicians</a>."*

**Insertion 8.4 — `app/offshore-rbi/page.tsx`**
- **Add:** *"Offshore RBI under DNV-RP-G101 / API 581 requires specialist input — see <a href='https://atlantisndt.com/consulting/offshore-rbi'>Atlantis offshore RBI consulting</a>."*

**Insertion 8.5 — `app/offshore-rov-inspection/page.tsx`**
- **Add:** *"ROV-deployed UT and CP probes are standard for subsea — find <a href='https://ndt-connect.com/find-providers?service=rov-ndt'>ROV NDT spread vendors</a>."*

### Dead links
~630 — apply QW-1.

---

## 9. ut-testing-academy — IMPACT: HIGH

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://ut-testing-academy.vercel.app`
- **Pages:** 36

### Current outbound link state
- **0** correct, **0** atlantis, **613** broken

### Hero CTA proposal
**Anchor text:** "Get UT inspection quotes in Houston, Dallas, Pittsburgh"
**Target:** `https://ndt-connect.com/find-providers?method=ut`
**Placement:** See QW-4 above.

### Contextual backlink insertions

**Insertion 9.1 — `app/ut-phased-array-intro/page.tsx`**
- **Add:** *"PAUT day-rates vary by region from $1,800 to $3,500 — see the <a href='https://ndt-connect.com/cost-guides/phased-array-ut-cost-houston'>phased array UT cost guide for Houston</a>, or book <a href='https://ndt-connect.com/find-providers?method=paut'>PAUT-qualified UT contractors</a>."*

**Insertion 9.2 — `app/ut-tofd-introduction/page.tsx`**
- **Add:** *"TOFD is mandated by ASME Code Case 2235 for many pressure-vessel girth welds — find <a href='https://ndt-connect.com/find-providers?method=tofd'>TOFD inspection contractors</a>."*

**Insertion 9.3 — `app/ut-for-pipelines/page.tsx`**
- **Add:** *"Mainline AUT for pipeline girth welds is the dominant inspection mode for new construction — locate <a href='https://ndt-connect.com/find-providers?service=auto-ut-girth-weld'>AUT girth-weld pipeline crews</a>."*

**Insertion 9.4 — `app/ut-training-paths/page.tsx`**
- **Add:** *"For ASNT Level II UT certification, see <a href='https://atlantisndt.com/training/asnt-level-ii-ut'>Atlantis ASNT Level II UT course</a>, then track your renewal dates with the free <a href='https://ndt-connect.com/free-tools/certificate-manager'>NDT certificate manager</a>."*

**Insertion 9.5 — `app/ut-calibration-procedures/page.tsx`**
- **Add:** *"Use the free <a href='https://ndt-connect.com/free-tools/calibration-reminder'>UT gauge calibration reminder</a> to keep your block + transducer + flaw detector calibrations in compliance."*

### Dead links
613 — apply QW-1.

---

## 10. rt-testing-hub — IMPACT: HIGH

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://rt-testing-hub.vercel.app`
- **Pages:** 36

### Current outbound link state
- **0** correct, **0** atlantis, **613** broken

### Hero CTA proposal
**Anchor text:** "Find licensed industrial radiographers — IR-192 / X-ray crews"
**Target:** `https://ndt-connect.com/find-providers?method=rt`

### Contextual backlink insertions

**Insertion 10.1 — `app/rt-licensing-requirements/page.tsx`**
- **Add:** *"State-by-state RT source license requirements vary — see <a href='https://ndt-connect.com/find-providers?cert=state-radiographer-license'>state-licensed industrial radiography crews by region</a> and the <a href='https://ndt-connect.com/cost-guides/industrial-radiography-cost'>industrial radiography cost guide</a>."*

**Insertion 10.2 — `app/rt-digital-radiography/page.tsx`**
- **Add:** *"DR has displaced film for most weld RT applications — find <a href='https://ndt-connect.com/find-providers?method=digital-radiography'>digital radiography RT contractors</a>."*

**Insertion 10.3 — `app/rt-ct-scanning/page.tsx`**
- **Add:** *"Industrial CT for AM and casting validation — locate <a href='https://ndt-connect.com/find-providers?service=industrial-ct'>industrial CT labs</a>."*

**Insertion 10.4 — `app/rt-training-certification/page.tsx`**
- **Add:** *"For ASNT Level II RT see <a href='https://atlantisndt.com/training/asnt-level-ii-rt'>Atlantis Level II RT certification</a>."*

**Insertion 10.5 — `app/rt-safety-procedures/page.tsx`**
- **Add:** *"Generate ALARA-compliant exposure plans in minutes with the free <a href='https://ndt-connect.com/free-tools/ai-procedure-generator'>AI RT procedure generator</a>."*

### Dead links
613 — apply QW-1.

---

## 11. ndt-career-portal — IMPACT: MEDIUM-HIGH (highest atlantisndt fit)

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://ndt-career-portal.vercel.app`
- **Pages:** 36

### Current outbound link state
- **0** correct, **0** atlantis, **613** broken

### Hero CTA proposal
**Anchor text:** "Atlantis NDT Training — ASNT, AWS CWI, API 510, NAS 410 prep"
**Target:** `https://atlantisndt.com/training`
**Placement:** Hero callout on `app/page.tsx`. See QW-5.

### Contextual backlink insertions

**Insertion 11.1 — `app/career-salary-guide/page.tsx`**
- **Add:** *"Level II UT salaries in Texas average $72k-$95k; certified PAUT operators clear $110k+. Browse <a href='https://ndt-connect.com/jobs'>open NDT jobs on NDT Connect</a> or check the <a href='https://ndt-connect.com/blog/ndt-salary-guide-2026-usa'>2026 US NDT salary guide</a>."*

**Insertion 11.2 — `app/career-level-2-guide/page.tsx`**
- **Add:** *"Most US NDT employers train under SNT-TC-1A — see <a href='https://atlantisndt.com/training/asnt-level-ii'>Atlantis ASNT Level II program</a>."*

**Insertion 11.3 — `app/career-api-inspector/page.tsx`**
- **Add:** *"API 510, 570, 653, 580 — see <a href='https://atlantisndt.com/training/api-certifications'>full Atlantis API exam prep catalog</a>, or hire as <a href='https://ndt-connect.com/find-providers?cert=api-inspector'>certified API inspector</a>."*

**Insertion 11.4 — `app/career-cwi/page.tsx`** (or `weld-inspector` page)
- **Add:** *"CWI prep: <a href='https://atlantisndt.com/training/cwi-prep'>Atlantis 10-day CWI bootcamp</a>."*

**Insertion 11.5 — `app/career-multi-method-cert/page.tsx`**
- **Add:** *"Track multiple certifications across UT, RT, MT, PT, ECT with the free <a href='https://ndt-connect.com/free-tools/certificate-manager'>NDT certificate manager</a>."*

### Dead links
613 — apply QW-1.

---

## 12. industrial-coating-inspection — IMPACT: MEDIUM-HIGH

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://industrial-coating-inspection.vercel.app`
- **Pages:** 36

### Current outbound link state
- **0** correct, **0** atlantis, **613** broken

### Hero CTA proposal
**Anchor text:** "Find NACE / AMPP CIP coating inspectors in your region"
**Target:** `https://ndt-connect.com/find-providers?cert=ampp-cip`

### Contextual backlink insertions

**Insertion 12.1 — `app/coating-nace-inspector/page.tsx`**
- **Add:** *"NACE CIP (now AMPP CIP) Level 1/2/3 is the gold standard for coating inspection — find <a href='https://ndt-connect.com/find-providers?cert=ampp-cip'>AMPP CIP Level 2/3 coating inspectors</a> and the <a href='https://ndt-connect.com/cost-guides/coating-inspection-cost'>coating inspection cost guide</a>."*

**Insertion 12.2 — `app/coating-sspc-certification/page.tsx`**
- **Add:** *"SSPC PCS / PCI credentials are now under AMPP — see <a href='https://atlantisndt.com/training/ampp-coating-inspector'>Atlantis AMPP coating inspector training</a>."*

**Insertion 12.3 — `app/coating-tank-coating/page.tsx`**
- **Add:** *"AST internal lining inspection requires immersion-qualified inspectors — book <a href='https://ndt-connect.com/find-providers?service=tank-lining-inspection'>tank lining inspection contractors</a>."*

**Insertion 12.4 — `app/coating-pipeline-coating/page.tsx`**
- **Add:** *"FBE, 3LPE coating QC during pipeline construction — find <a href='https://ndt-connect.com/find-providers?service=pipeline-coating-inspection'>pipeline coating inspection crews</a>."*

**Insertion 12.5 — `app/coating-cui-prevention/page.tsx`**
- **Add:** *"Pulsed eddy current under insulation — find <a href='https://ndt-connect.com/find-providers?service=cui-pec'>PEC CUI screening vendors</a>."*

### Dead links
613 — apply QW-1.

---

## 13. ndt-equipment-reviews — IMPACT: MEDIUM

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://ndt-equipment-reviews.vercel.app`
- **Pages:** 37

### Current outbound link state
- **0** correct, **0** atlantis, **~630** broken

### Hero CTA proposal
**Anchor text:** "Track every UT gauge, RT camera, and ECT instrument — free NDT equipment tracker"
**Target:** `https://ndt-connect.com/free-tools/equipment-tracker`

### Contextual backlink insertions

**Insertion 13.1 — `app/equipment-ut-flaw-detectors/page.tsx`**
- **Add:** *"Whether you run an Olympus EPOCH 650, Sonatest Veo+, or GE USM 36 — keep calibration current with the free <a href='https://ndt-connect.com/free-tools/calibration-reminder'>UT flaw detector calibration reminder</a>."*

**Insertion 13.2 — `app/equipment-phased-array-units/page.tsx`**
- **Add:** *"PAUT instrument fleet management — log your OmniScan X3 / VEO3 inventory in the free <a href='https://ndt-connect.com/free-tools/equipment-tracker'>NDT equipment tracker</a>."*

**Insertion 13.3 — `app/equipment-calibration-blocks/page.tsx`**
- **Add:** *"Calibration blocks (IIW, NAVSHIPS, ASTM E127) need certification renewal every 2-5 years — track with the free <a href='https://ndt-connect.com/free-tools/calibration-reminder'>calibration reminder tool</a>."*

**Insertion 13.4 — `app/equipment-buying-guide/page.tsx`**
- **Add:** *"Once you've bought, list your contractor profile on <a href='https://ndt-connect.com/register?type=provider'>NDT Connect to win project work</a>."*

**Insertion 13.5 — `app/equipment-dosimeters/page.tsx`**
- **Add:** *"Personnel dosimetry tracking is required by 10 CFR 20 — manage assignments alongside RT licenses in the free <a href='https://ndt-connect.com/free-tools/certificate-manager'>NDT certificate manager</a>."*

### Dead links
~630 — apply QW-1.

---

## 14. ndt-safety-compliance — IMPACT: MEDIUM

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://ndt-safety-compliance.vercel.app`
- **Pages:** 37

### Current outbound link state
- **0** correct, **0** atlantis, **~630** broken

### Hero CTA proposal
**Anchor text:** "Generate compliant RT / UT inspection procedures with AI"
**Target:** `https://ndt-connect.com/free-tools/ai-procedure-generator`

### Contextual backlink insertions

**Insertion 14.1 — `app/safety-rt-licensing/page.tsx`**
- **Add:** *"RT source licenses (NRC + Agreement States) must be renewed every 5-10 years — track license + radiographer cards in the free <a href='https://ndt-connect.com/free-tools/certificate-manager'>certificate manager</a>."*

**Insertion 14.2 — `app/safety-procedure-writing/page.tsx`**
- **Add:** *"Draft ASME Section V / API 1104 / AWS D1.1 compliant procedures with the free <a href='https://ndt-connect.com/free-tools/ai-procedure-generator'>AI NDT procedure generator</a>."*

**Insertion 14.3 — `app/safety-osha-requirements/page.tsx`**
- **Add:** *"OSHA + 29 CFR 1910 training: <a href='https://atlantisndt.com/training/safety-compliance'>Atlantis safety compliance courses</a>."*

**Insertion 14.4 — `app/safety-confined-space/page.tsx`**
- **Add:** *"Match confined-space NDT scope with <a href='https://ndt-connect.com/find-providers?cert=confined-space'>confined-space-trained inspection contractors</a>."*

**Insertion 14.5 — `app/safety-radiation-monitoring/page.tsx`**
- **Add:** *"Source-camera maintenance + dosimetry compliance — see <a href='https://ndt-connect.com/find-providers?method=rt'>licensed RT contractors</a>."*

### Dead links
~630 — apply QW-1.

---

## 15. ndt-digital-technology — IMPACT: MEDIUM

### Stack
- **Framework:** Next.js 14.2
- **Deploy domain:** `https://ndt-digital-technology.vercel.app`
- **Pages:** 37

### Current outbound link state
- **0** correct, **0** atlantis, **~630** broken

### Hero CTA proposal
**Anchor text:** "Try the AI NDT procedure generator — free"
**Target:** `https://ndt-connect.com/free-tools/ai-procedure-generator`

### Contextual backlink insertions

**Insertion 15.1 — `app/digital-ai-in-ndt/page.tsx`**
- **Add:** *"For a working example, try the free <a href='https://ndt-connect.com/free-tools/ai-procedure-generator'>AI NDT procedure generator</a> — drafts ASME Section V compliant UT/RT/MT procedures from a few inputs."*

**Insertion 15.2 — `app/digital-ai-radiograph/page.tsx`**
- **Add:** *"Production AI defect-detection on DR images is now mainstream — pair with a <a href='https://ndt-connect.com/find-providers?method=digital-radiography'>certified DR contractor</a>."*

**Insertion 15.3 — `app/digital-cloud-computing/page.tsx`**
- **Add:** *"Cloud-based asset registries — try the free <a href='https://ndt-connect.com/free-tools/equipment-tracker'>NDT equipment tracker</a>."*

**Insertion 15.4 — `app/digital-data-analytics/page.tsx`**
- **Add:** *"Trend analysis of UT thickness data over multiple TAs is the gateway to RBI — see <a href='https://atlantisndt.com/consulting/integrity-data-analytics'>Atlantis integrity data analytics consulting</a>."*

**Insertion 15.5 — `app/digital-mobile-apps/page.tsx`**
- **Add:** *"For field use, the <a href='https://ndt-connect.com/free-tools/calibration-reminder'>calibration reminder</a> and <a href='https://ndt-connect.com/free-tools/certificate-manager'>certificate manager</a> are mobile-first."*

### Dead links
~630 — apply QW-1.

---

## Network-wide rollout sequence

| Day | Action | Files touched | Expected outcome |
|---|---|---|---|
| Day 0 | **QW-1** — global `ndtconnect.com` → `ndt-connect.com` find/replace | All 15 sites, ~540 .tsx files | 9,195 dead backlinks become live |
| Day 0 | **QW-2** — global header CTA to 4 free tools | 15 layout.tsx files | ~2,160 deep links to free tools |
| Day 1 | QW-3, QW-4, QW-5 — high-impact contextual blocks | 5 files | Hero placements for top commercial queries |
| Day 2-3 | Apply Insertions 1.x through 15.x | ~75 page files | ~75 keyword-rich contextual deep-links |
| Day 4 | Run `vercel --prod` redeploy on all 15 satellites | n/a | All changes live |
| Day 5 | Submit updated sitemaps to GSC for all 15 vercel.app properties | n/a | Recrawl trigger |
| Day 7-14 | Monitor GSC `Links` report for ndt-connect.com — should show ~12,000 new backlinks indexed | n/a | Inbound link growth + ranking lift on near-miss queries |

---

## Anchor-text distribution (network total after rollout)

After all patches ship, the satellite network sends:

| Target type | Approx. instance count | Top anchor patterns |
|---|---|---|
| `ndt-connect.com/find-providers?...` (city + service filter) | ~5,400 | "Find [METHOD] inspectors in [CITY]", "[CERT]-certified [SERVICE] contractors" |
| `ndt-connect.com/cost-guides/...` | ~600 | "[SERVICE] inspection cost guide", "[METHOD] day-rate benchmarks" |
| `ndt-connect.com/free-tools/certificate-manager` | ~700 | "NDT certificate manager", "track [CERT] renewals" |
| `ndt-connect.com/free-tools/equipment-tracker` | ~600 | "NDT equipment tracker", "log [INSTRUMENT] inventory" |
| `ndt-connect.com/free-tools/calibration-reminder` | ~600 | "calibration reminder", "[INSTRUMENT] calibration tracker" |
| `ndt-connect.com/free-tools/ai-procedure-generator` | ~600 | "AI NDT procedure generator", "ASME Section V procedure drafts" |
| `ndt-connect.com/standards/...`, `/certifications/...`, `/blog/...` | ~600 | Long-tail authoritative anchors |
| `atlantisndt.com/training/...`, `/consulting/...` | ~75 | "[CERT] training", "[CERT] exam prep", consulting niches |

Total: ~9,200 inbound links, semantically clustered around ndt-connect's near-miss commercial queries (api 653 tank inspection, asnt level ii, eddy current tube testing, ut cost houston, paut girth weld, ampp cip, etc.).

---

## Notes for implementation

1. **No source files were modified by this audit** — this is a planning document only.
2. **The find/replace in QW-1 is non-destructive** — only changes the domain string, leaves anchors and paths intact.
3. **Verify ndt-connect.com URL paths exist before final patch.** A handful of suggested URLs (`/cost-guides/api-653-tank-inspection-cost`, `/find-providers?cert=api-510`, `/find-providers?cert=ampp-cip`, etc.) may need to be created on the main site if they don't already exist — otherwise the satellite links will 404 and waste the equity.
4. **Avoid identical-anchor over-optimization.** Vary anchor wording across satellites (e.g., "API 653 inspector" vs. "API 653 authorized inspector" vs. "AST inspector qualified to API 653") so the link profile reads naturally to Google.
5. **Atlantis links should stay below 5% of total outbound to avoid PBN signals on highly-related domains.** Current plan keeps atlantis links at <1% — within safe range.
6. **Consider adding `rel="noopener"` (already present) but NOT `rel="nofollow"`** — these are first-party-controlled satellites and should pass full equity.

---

End of plan.
