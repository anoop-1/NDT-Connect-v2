# Apple App Store listing — NDT Connect

Paste these into App Store Connect → My Apps → NDT Connect → App Information / Version Info / App Privacy.

Apple is stricter than Play. Two consistent failure modes for B2B apps in this category:
1. **"App is not useful or only includes login screens"** — make sure the marketing screenshots show the populated free-tools dashboards, not the empty state.
2. **"Account deletion not in-app"** — Apple requires a *Delete account* button inside the app (not just an email-to-support flow). The Settings screen must have it. Plan accordingly.

---

## App information

**App name** (max 30 chars):
```
NDT Connect
```

**Subtitle** (max 30 chars):
```
Free tools for NDT companies
```

**Bundle ID**:
```
com.ndtconnect.mobile
```

**SKU** (your internal identifier — never visible to users):
```
NDT-CONNECT-001
```

**Primary language**: English (U.S.)

**Categories**:
- Primary: **Business**
- Secondary: **Productivity**

---

## Pricing & availability

- **Price**: Free
- **Availability**: All territories (default). Manually exclude any Apple-flagged sanctioned regions.

---

## App privacy

Same data inventory as Play's data-safety form. Apple's labels:

- **Data Linked to You**:
  - Contact Info: Email Address, Name, Phone Number
  - User Content: Photos / Videos (equipment), Other User Content (cert scans, equipment notes)
  - Identifiers: User ID
  - Usage Data: Product Interaction
  - Diagnostics: Crash Data, Performance Data

- **Data Used to Track You**: NONE.

- **Privacy policy URL**: `https://ndt-connect.com/privacy`

---

## Version info (per release)

**Promotional text** (max 170 chars — can be edited without re-review):
```
Free equipment, calibration, and certificate management for NDT inspection companies. Verified marketplace. ASNT, ISO 9712, PCN, NAS 410, NADCAP supported.
```

**Description** (max 4,000 chars — submitted with review):
```
NDT Connect is the free SaaS platform built for non-destructive testing companies — from solo Level III consultants to 100+ technician inspection majors.

WHAT YOU GET, FREE:
• Equipment management — track every UT, RT, MT, PT, ET, VT, GWT, PAUT, TOFD instrument with serials, manufacturer, model, status, and calibration due dates. Export an audit-ready inventory in seconds.
• Calibration tracking — automatic alerts at 30, 60, or 90 days before any calibration expires. Email and in-app reminders. Pre-book lab capacity ahead of every turnaround.
• Certificate management — manpower (ASNT SNT-TC-1A, CP-189, ACCP, ISO 9712, NAS 410, EN 4179, PCN, CGSB, AINDT, NADCAP) and company (ISO 9001, ISO 17025, API Q1, AS9100, classification societies, aerospace primes). One dashboard.

PLUS: a verified marketplace where clients find inspection providers by method and city, request quotes, and track the work end-to-end.

ALL YOU NEED IS A USER ID. No credit card. No trial expiry. No per-instrument fees.

NDT Connect is built and operated by Atlantis NDT — an ASNT Level III–led inspection-services group. The free tools are committed indefinitely; we monetize the marketplace and an enterprise tier, not the table-stakes traceability every shop needs.

WHO USES NDT CONNECT:
• Refinery and petrochemical inspection contractors (API 510/570/653)
• Aerospace MRO suppliers (NAS 410, EN 4179, NADCAP audits)
• Shipyard and class-society contractors (ABS, DNV, LR, BV)
• Power-generation and nuclear ISI contractors (ASME Section XI, NRC)
• Pipeline integrity teams (PHMSA, DOT)
• Manufacturing weld inspection (AWS D1.1, ASME Section IX)

YOUR DATA:
• Stored on our private MongoDB infrastructure (no third-party data sharing)
• Full export to CSV / PDF on demand
• In-app account deletion: Settings → Delete account

GET STARTED IN 60 SECONDS:
1. Create a free user ID
2. Add your equipment and certs (CSV import supported)
3. Set calibration alerts
4. Use it forever

Questions? info@ndt-connect.com
```

**Keywords** (max 100 chars total, comma-separated):
```
NDT,inspection,calibration,certification,ASNT,ultrasonic,radiographic,API510,API570,NADCAP
```

**Support URL**: `https://ndt-connect.com/about` (or build /support before submit)
**Marketing URL**: `https://ndt-connect.com`

---

## Screenshots required

Apple requires screenshots for at least one device size. Recommend submitting:

| Device size | Resolution | Required? |
|---|---|---|
| 6.9" iPhone (16 Pro Max / 15 Pro Max) | 1320×2868 | Yes |
| 6.5" iPhone (11 Pro Max / XS Max) | 1242×2688 | Yes (Apple may demote if missing) |
| 12.9" iPad Pro (6th gen) | 2048×2732 | Yes if you opt-in to iPad |

Same screen list as Play (login → home → free tools → equipment list → equipment edit → calibration → certs → find providers → provider detail → request wizard → my requests). Capture from a real device.

---

## App preview video (optional)

15–30 sec, captured from a real device. Same beat list as Play.

---

## App Review notes (the box at submission time)

Paste this, verbatim:

```
Test account for review:
  Email: applereview@ndt-connect.com
  Password: (provided in the Demo Account field)

Steps to reach all functionality:
1. Launch the app — login screen with rotating-globe brand panel.
2. Sign in with the test account (which is provider-role).
3. Tap "Equipment" → list with 8+ pre-populated instruments. Tap "+" to add. Tap a row to edit.
4. Tap "Calibration" → tab 1 shows due-soon items, tab 2 shows alert rules. Add a rule via "+" to demonstrate notification scheduling.
5. Tap "Certifications" → manpower + company tabs, with pre-populated certs.
6. Tap "Find providers" → marketplace list, tap any row → detail.
7. From a provider, tap "Request a quote" → 4-step wizard. Submit → "My requests" shows the new entry.
8. Settings → Delete account is the in-app deletion path required by App Store Review Guideline 5.1.1(v).

Notes:
• The app uses HTTPS (TLS 1.2+) for all network calls. Backend is api at https://ndt-connect.com/api/* (CORS-allowed for the app subdomain).
• No third-party SDKs collect data outside Sentry (crash reporting only). No advertising trackers.
• No in-app purchases at v1.
```

---

## Common Apple review rejections and the fixes

| Rejection reason | Fix |
|---|---|
| 5.1.1(v) Account deletion not in-app | Settings → Delete account. Confirms with a typed "DELETE", calls DELETE /api/me. |
| 4.2 Minimum functionality (just login wrapper) | Make sure the test account has rich pre-populated data. Empty equipment list = rejection. |
| 2.3.10 Misleading metadata | Match keywords and screenshots to actual functionality. |
| 5.1.1(i) Privacy practices not declared | App Privacy section completed; privacy URL working. |
| 4.7 HTML5 / web-only app | Flutter apps with native shell pass; just confirm no `WKWebView` is hosting the entire UX. |

---

## Ship checklist (before clicking Submit)

- [ ] App icon set in Xcode → all sizes generated by `flutter_launcher_icons`
- [ ] Bundle version + build number incremented (Info.plist or pubspec)
- [ ] Code-signed with App Store distribution profile
- [ ] Test on a real device (not just simulator) — at least one iPhone and one iPad
- [ ] Privacy URL returns 200
- [ ] Test account works from a clean install
- [ ] App Privacy form submitted and matches behavior
- [ ] All required screenshots uploaded
- [ ] Description, keywords, promo text checked for typos
- [ ] In-app account deletion flow works
- [ ] No deprecated APIs flagged by Xcode at build time

Typical review window: 24–48 hours, sometimes faster, sometimes 5+ days during launch surges.
