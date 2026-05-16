# Free Tools Deployment — 2026-05-15

Four new SEO landing pages shipped under `/free-tools/`. Marketing landing only — UI shells. No DB writes, no live alerts, no live AI generation. All pages are server components with embedded `SoftwareApplication` + `FAQPage` JSON-LD, optimised metadata (title, description, canonical, OG, Twitter, keywords) and 6+ internal links each (3+ to satellite sites, 2+ to ndt-connect service pages, 1+ to atlantisndt cert page).

The `/free-tools` index page (`app/free-tools/page.tsx`) was updated to feature the four new tools in a 4-up grid above the fold under the heading **New free tools for 2026**, with the existing three legacy tools moved under **Core free tools**. Hero copy, metadata title/description, and ItemList schema also updated to include the new tools.

---

## 1. Certificate Manager

- **URL:** https://ndt-connect.com/free-tools/certificate-manager
- **File:** `app/free-tools/certificate-manager/page.tsx`
- **Target keywords:**
  - asnt certification expiry tracker
  - ndt cert renewal reminder
  - free api inspector cert manager
  - aws cwi expiry alert
  - iso 9712 renewal tracker
  - asnt level iii expiry
- **Schemas embedded:** BreadcrumbList, SoftwareApplication, FAQPage (7 Qs)
- **Internal links:** ndt-career-portal (ASNT guide), ndt-standards-reference (SNT-TC-1A), ut-testing-academy (training paths), ndt-connect/services/ultrasonic-testing, ndt-connect/tools/certification-pathway, atlantisndt.com/ndt-certifications

## 2. Equipment Tracker

- **URL:** https://ndt-connect.com/free-tools/equipment-tracker
- **File:** `app/free-tools/equipment-tracker/page.tsx`
- **Target keywords:**
  - free ndt equipment tracking
  - ut probe inventory software
  - ndt asset management tool
  - rt camera tracking
  - calibration block register
  - ndt shop inventory
- **Schemas embedded:** BreadcrumbList, SoftwareApplication, FAQPage (7 Qs)
- **Internal links:** ut-testing-academy (equipment guide), ndt-equipment-reviews, rt-testing-hub (equipment maintenance), ndt-connect/services/ultrasonic-testing, ndt-connect/services/radiographic-testing, atlantisndt.com/ndt-certifications

## 3. Calibration Reminder

- **URL:** https://ndt-connect.com/free-tools/calibration-reminder
- **File:** `app/free-tools/calibration-reminder/page.tsx`
- **Target keywords:**
  - ndt calibration reminder app
  - ut probe calibration tracker free
  - iso 17025 calibration schedule tool
  - calibration block due date
  - ir-192 leak test reminder
  - hardness tester calibration
- **Schemas embedded:** BreadcrumbList, SoftwareApplication, FAQPage (7 Qs)
- **Internal links:** ut-testing-academy (UT cal procedures), rt-testing-hub (RT safety), ndt-standards-reference (ISO 17025), ndt-connect/services/ultrasonic-testing, ndt-connect/services/radiographic-testing, atlantisndt.com/ndt-certifications

## 4. AI Procedure Generator (sign-in gated)

- **URL:** https://ndt-connect.com/free-tools/ai-procedure-generator
- **File:** `app/free-tools/ai-procedure-generator/page.tsx`
- **Target keywords:**
  - ndt procedure generator
  - free ndt procedure template
  - ai weld inspection procedure
  - asme section v procedure generator
  - api 510 inspection procedure
  - aws d1.1 ut procedure
- **Schemas embedded:** BreadcrumbList, SoftwareApplication, FAQPage (7 Qs)
- **Internal links:** weld-inspection-pro (ASME Section IX, AWS D1.1), ndt-standards-reference (API 510), ndt-connect/services/ultrasonic-testing, ndt-connect/services/radiographic-testing, ndt-connect/tools/ndt-procedure-generator/examples, atlantisndt.com/ndt-certifications
- **Note:** Sign-in CTAs route to `/register?redirect=/tools/ndt-procedure-generator` and `/login?redirect=/tools/ndt-procedure-generator`. Generation flow itself is the existing `/tools/ndt-procedure-generator` page — no new gating logic written.

---

## Top 3 priority follow-ups

1. **Wire calendar (.ics) export from certificate-manager and calibration-reminder.** Both landing pages tell users that calendar export is "on the roadmap"; the FAQ entry on calibration-reminder explicitly mentions it. Build a per-account `/api/ics?type=cert|cal` endpoint that returns a webcal subscription so Outlook / Google / Apple calendars stay in sync without a manual export. This is the single highest-value add because it converts the email-alert tool from a notification stream into a calendar primitive — a much stickier integration. Estimated 2–3 days; meaningful Pro-tier upsell hook (multi-recipient ICS feeds, customer-branded calendar names).

2. **Connect Stripe paid tier on ai-procedure-generator and gate the generation cap.** The landing references "free monthly generation cap" and paid plans for customer-branded templates / multi-Level-III approval / ERP push, but no Stripe SKU exists yet. Provision the SKU (Solo Level III $39/mo, Shop $149/mo, Enterprise on quote), wire `/pricing`, and enforce the cap in the existing `ProcedureGeneratorClient`. Without this, every "See paid plans" CTA on the four new pages dead-ends — and ai-procedure-generator is the most monetisable of the four.

3. **Build OG images for the four new tools.** Metadata references `${SITE}/og/free-tools-{tool}.png` for each page; those PNGs do not yet exist. Without them LinkedIn / X / Slack previews fall back to a generic favicon. Use the existing brand template (NDT Connect blue #004aad on white, tool name + one-line value prop). Recommend 1200x630 PNG with the tool name, the cert/instrument families covered, and "Free — no card" badge. Drop into `/public/og/`. Estimated half-day for all four.

### Secondary follow-ups (post-priority three)

- Add the four URLs to `app/sitemap.ts` (or wherever the sitemap is generated) so they get indexed alongside the FREE_TOOLS dynamic pages.
- Submit the four URLs via IndexNow + GSC (`seo-analysis/submit-urls.py`) on the next daily push.
- Consider migrating the four new tools into the `data/freeTools.ts` table so they auto-generate per-city SEO pages via the existing `/free-tools/[feature]/[city]` infrastructure — would multiply the long-tail coverage by ~50x.
- Wire SMS provider (Twilio or Telnyx) for the certificate-manager and calibration-reminder alert claims to stop being aspirational; required before paid-tier launch.
- Build the actual cert / equipment / calibration models in the user dashboard (`/provider-dashboard/`) — landing pages CTA into `/register` but the post-signup flow needs the create-record forms to exist.
