# Google Play Store listing — NDT Connect

Paste these into Play Console → App content → Store listing. Where Play asks
for "your" copy, the values below are the canonical wording. Edit only with
purpose — every change resets review.

---

## App details

**App name** (max 30 chars):
```
NDT Connect
```

**Short description** (max 80 chars):
```
Free tools + marketplace for NDT inspection companies. User ID only.
```

**Full description** (max 4,000 chars — pasted as-is below, ~1,800 chars):
```
NDT Connect is the free SaaS platform built for non-destructive testing companies — from solo Level III consultants to 100+ technician inspection majors.

WHAT YOU GET, FREE:
• Equipment management — track every UT, RT, MT, PT, ET, VT, GWT, PAUT, TOFD instrument with serials, manufacturer, model, status, and calibration due dates. Export an audit-ready inventory in seconds.
• Calibration tracking — automatic alerts at 30, 60, or 90 days before any calibration expires. Email and in-app reminders. Pre-book lab capacity ahead of every turnaround.
• Certificate management — manpower (ASNT SNT-TC-1A, CP-189, ACCP, ISO 9712, NAS 410, EN 4179, PCN, CGSB, AINDT, NADCAP) and company (ISO 9001, ISO 17025, API Q1, AS9100, classification societies, aerospace primes). One dashboard.

PLUS: a verified marketplace where clients find inspection providers by method and city, request quotes, and track the work end-to-end.

ALL YOU NEED IS A USER ID. No credit card. No trial expiry. No per-instrument fees.

NDT Connect is built and operated by Atlantis NDT — an ASNT Level III–led inspection-services group. The free tools are committed indefinitely; we monetize the marketplace and an enterprise tier, not the table-stakes traceability that every shop needs.

WHO USES NDT CONNECT:
• Refinery and petrochemical inspection contractors (API 510 / 570 / 653)
• Aerospace MRO suppliers (NAS 410, EN 4179, NADCAP audits)
• Shipyard and class-society contractors (ABS, DNV, LR, BV)
• Power-generation and nuclear ISI contractors (ASME Section XI, NRC)
• Pipeline integrity teams (PHMSA, DOT)
• Manufacturing weld inspection (AWS D1.1, ASME Section IX)

DATA YOUR DATA:
• Stored on our private MongoDB infrastructure (no third-party data sharing)
• Full export to CSV / PDF on demand
• Account deletion removes all your data within 30 days

GET STARTED IN 60 SECONDS:
1. Create a free user ID
2. Add your equipment and certs (CSV import supported)
3. Set calibration alerts
4. Use it forever

Questions? info@ndt-connect.com
```

---

## Categorization

- **App category**: Business
- **Tags** (Play allows up to 5):
  - Inspection
  - Calibration
  - Certification tracking
  - NDT software
  - Asset management

- **Target audience**: 18+ (industrial / B2B audience). NOT children-targeted.

---

## Content rating questionnaire answers

Run the IARC questionnaire in Play Console with these answers:

| Question | Answer |
|---|---|
| Does the app contain violence? | No |
| Sexual content? | No |
| Profanity? | No |
| Drugs / alcohol / tobacco? | No |
| User-generated content (chat, posts, profiles)? | YES — provider profiles + service-request descriptions are user-generated. We moderate via report-and-review on first detection of abuse. |
| Real-money gambling? | No |
| User location collected? | YES — coarse location (city) is collected and shown to potential service-request matches. Precise location is NOT collected. |
| Personal info collected? | YES — name, email, phone (provider-side optional), company name, certifications. |
| Web browsing access? | No |
| Social interaction features? | YES — in-app messaging between client and assigned provider once a service request is matched. |
| Digital purchases? | No (free tier today; paid add-ons may come later — declare at that time) |

**Expected rating**: PEGI 3 / ESRB Everyone / IARC 3+. Business app, no objectionable content.

---

## Data safety form

Play requires this. Answer truthfully:

| Data type | Collected? | Shared with third party? | Required? | Purpose |
|---|---|---|---|---|
| Email address | Yes | No | Yes (account creation) | Account management, alerts |
| User name | Yes | No | Yes | Account display |
| Phone number | Yes (providers only) | No | No | Match clients to providers |
| Approximate location | Yes (city, providers only) | No | No | Marketplace matching |
| Photos / videos | Yes (equipment photos, optional) | No | No | Equipment registry |
| Files / documents | Yes (cert scans, optional) | No | No | Certification records |
| App activity (in-app actions) | Yes | No (analytics aggregated only) | No | Product improvement |
| Crash logs | Yes | Yes (Sentry) | No | Stability monitoring |
| Diagnostics | Yes | Yes (Sentry) | No | Stability monitoring |

- **Data is encrypted in transit?** Yes (TLS 1.2+ on every connection).
- **Data is encrypted at rest?** Yes (MongoDB at-rest encryption + Hostinger disk encryption).
- **Users can request data deletion?** Yes — email info@ndt-connect.com or self-service from /settings → Delete account.

---

## Privacy policy URL

```
https://ndt-connect.com/privacy
```

---

## App access

Play asks if any feature requires login or other restriction. Answer:

- **All app features require login** — yes
- Provide test account credentials in the Play Console form so reviewers can log in:
  - Email: `playreview@ndt-connect.com`
  - Password: (set during the review-account creation step)
  - Role: provider (so reviewers see all features including provider dashboard)

---

## Ads

No ads. Confirm this in the "Ads" section to set the no-ads label on the listing.

---

## Screenshots required

Play requires PNG / JPEG, 16:9 or 9:16, between 320–3840 px on the longer edge. Capture from a real device or emulator running release-signed AAB:

| Screen | Phone (1080×1920) | 7" tablet (1200×1920) | 10" tablet (1920×1200) |
|---|---|---|---|
| Login (with rotating globe) | ✓ | ✓ | ✓ |
| Home dashboard (signed-in provider) | ✓ | ✓ | ✓ |
| Free tools pillar | ✓ | optional | optional |
| Equipment list (with at least 8 items) | ✓ | ✓ | ✓ |
| Equipment edit sheet | ✓ | optional | optional |
| Calibration due-dates tab | ✓ | ✓ | optional |
| Certifications — manpower tab | ✓ | optional | optional |
| Find providers list | ✓ | optional | optional |
| Provider detail | ✓ | optional | optional |
| Request service wizard step 1 | ✓ | optional | optional |
| My requests | ✓ | optional | optional |

**Minimum**: 2 phone screenshots. **Recommended**: 8 phone + 4 tablet.

---

## Feature graphic

1024×500 PNG/JPEG. Required.

Suggested composition: dark-blue gradient background (matches app brand), white globe-and-wordmark logo on the left, three feature pills on the right ("Equipment", "Calibration", "Certificates"), tagline "Free for NDT inspection companies" at bottom.

---

## App icon

512×512 PNG with transparent corners. Use the same icon source as `mobile/web/icons/Icon-512.png`.

---

## App preview video (optional but recommended)

15–30 seconds, 720p+. Hits: launch → login → free-tools pillar → add an equipment item → see the calibration alert → "user ID only" tagline.

---

## Store presence countries

Default to **all countries**. Then exclude any sanctioned territories Play surfaces a warning on (Iran, North Korea, etc.). Primary market is US; secondary EN-speaking + Gulf.

---

## Pricing

Free, with in-app purchases disabled at v1 (will declare paid tiers when they ship).

---

## Review submission

After uploading the AAB, screenshots, feature graphic, app icon, and filling in everything above, hit Send for review. Typical review: 24–48 hours. Common rejection reasons in this category:

1. **Test account not provided / not working** — verify the playreview account works before submit.
2. **Privacy policy URL missing or 404** — confirm /privacy resolves.
3. **Data safety form mismatched with actual collection** — must match.
4. **Crashes on review device** — pre-test on a low-end Android (API 26+).

Re-submission: just hit "Send for review" again after fixing.
