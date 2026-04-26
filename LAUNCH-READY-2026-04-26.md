# NDT Connect — launch readiness (2026-04-26)

This is the single source of truth for what's done, what's pending, and the
exact steps to take this from "code in the repo" to "real users using it."

---

## What's done in code (this session)

### Web — `https://ndt-connect.com` (Next.js)
- Two-pane login with **animated rotating-globe SVG** (Y-axis rotation) at `/public/logo-globe-animated.svg`
- Per-route metadata + Organization/WebSite JSON-LD
- Source-controlled `app/sitemap.ts` + `app/robots.ts`
- 4 free-tools pages (`/free-tools` pillar + 3 features) wired to MongoDB
- 567+ programmatic city pages (Tier 1+2+3+4 = 189 cities × 3 features)
- 39 region rollup pages + 36 country rollup pages
- 6 evergreen blog posts at `/blog/*`
- `/privacy` + `/terms`
- Footer with logo, no broken links
- Sitemap reconciliation script (prevents losing legacy URLs on deploy)
- Indexing API submission script (multi-account, drip-feed)
- CORS rule for `app.ndt-connect.com` in `next.config.js`
- Firebase removed; all persistence is MongoDB on the Hostinger VPS
- API routes: `/api/equipment`, `/api/calibration-alerts`, `/api/certifications`, `/api/user/predefined-lists/[listKey]` — full CRUD, JWT-protected, owner-scoped
- `/provider-dashboard/{equipment,calibration,certifications}` migrated from localStorage to API
- `useUserPredefinedLists` hook migrated to API
- Admin manage-predefined-lists wired to comprehensive NDT methods + cert standards
- Two-pane login + Footer mirrored to root project

### Mobile + Web app — `https://app.ndt-connect.com` (Flutter)
- Single Flutter codebase, three targets (Android + iOS + web PWA)
- Real screens (no stubs): login, register, home, free-tools, equipment list+form, calibration (due dates + alert rules), certifications (manpower + company), find providers, provider detail, request-service wizard, my requests, track request, settings
- Cross-platform plugin shims: sqflite ↔ sqflite_common_ffi_web, mapbox_maps_flutter ↔ mapbox-gl-js
- Auth: dio + JWT bearer + refresh interceptor
- Riverpod state management throughout
- go_router URL routing (clean URLs on web)
- PWA manifest with install shortcuts
- vercel.json for web deploy
- Firebase fully removed — telemetry via Sentry only
- README with build/deploy instructions

### Documents
- `seo-audit-ndt-connect-2026-04-26.docx` (E:\software\Atlantis)
- `seo-execution-plan-2026-04-26.docx`
- `flutter-app-architecture-2026-04-26.docx`
- `flutter-app-web-addendum-2026-04-26.md`
- `gsc-submission-2026-04-26/` — 633 URLs across 7 priority files
- `store-listing/play-store-listing.md` — copy + categorization + content rating answers
- `store-listing/app-store-listing.md` — copy + Apple-specific gotchas + ship checklist

---

## What ONLY YOU can do (the human steps)

### 1. Hostinger VPS — provision MongoDB user + database
On the VPS at `148.230.122.172`:

```bash
ssh -i C:\Users\anuan\.ssh\atlantis_vps root@148.230.122.172
mongosh "mongodb://localhost:27017"
> use ndtconnect
> db.createUser({
    user: "ndtconnect_app",
    pwd: passwordPrompt(),
    roles: [{ role: "readWrite", db: "ndtconnect" }]
  })
> exit
```

Confirm the existing nginx-stream SNI proxy still routes 443 → mongod. Test from your laptop:

```powershell
mongosh "mongodb://ndtconnect_app:PASSWORD@148.230.122.172:443/ndtconnect?tls=true&tlsAllowInvalidHostnames=true&authSource=admin"
```

### 2. Vercel — set production env vars
Vercel Dashboard → ndt-connect.com project → Settings → Environment Variables. Paste:

```
MONGODB_URI = mongodb://ndtconnect_app:...@148.230.122.172:443/ndtconnect?tls=true&tlsAllowInvalidHostnames=true&authSource=admin
JWT_SECRET = <generate 64 hex chars>
NEXT_PUBLIC_BASE_URL = https://ndt-connect.com
SMTP_HOST = smtp.hostinger.com
SMTP_PORT = 465
SMTP_SECURE = true
SMTP_USER = info@ndt-connect.com
SMTP_PASS = <smtp password>
GEMINI_API_KEY = <gemini key>
NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
MAPBOX_PUBLIC_TOKEN = pk.eyJ.<your token>
```

Generate JWT_SECRET:
```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Push to git → Vercel auto-deploys the web

```powershell
cd "E:\software\NDT Connect"
.\scripts\push-to-vercel.ps1 -Message "feat: production launch — free tools + city pages + Flutter app + globe login"
```

Vercel rebuilds within 60s. Watch at `https://vercel.com/dashboard`.

After deploy, run reconciliation to make sure no legacy URL was lost:

```powershell
cd "E:\software\NDT Connect\NDTConnect"
node scripts\sitemap-reconcile.mjs --local https://ndt-connect.com
```

If at-risk URLs exist, add them to `next.config.js` `redirects()` and re-deploy.

### 4. Add second Vercel project for `app.ndt-connect.com`

In Vercel Dashboard:
- New Project → Import the same repo
- Set the **Root Directory** to `mobile`
- Set the build command and output (already in `mobile/vercel.json`)
- Add env vars: `MAPBOX_PUBLIC_TOKEN`, `API_BASE_URL=https://ndt-connect.com`
- Add custom domain: `app.ndt-connect.com`
- DNS: add a CNAME from `app` to `cname.vercel-dns.com`

First deploy takes 5–8 minutes (Flutter SDK clone + build).

### 5. Generate web icons (one-time)

```powershell
cd "E:\software\NDT Connect\mobile"
# Use https://www.pwabuilder.com/imageGenerator → upload your master logo PNG
# Drop the four resulting PNGs into mobile\web\icons\
git add mobile/web/icons
git commit -m "chore: PWA icons"
git push
```

The PWA install prompt won't appear in browsers until these exist.

### 6. Android — generate keystore + build AAB

ONE-TIME keystore generation:
```powershell
cd "E:\software\NDT Connect"
.\scripts\android-generate-keystore.ps1
# Save the generated upload-keystore.jks AND its passwords to a password manager
```

Then create `mobile\android\key.properties` (gitignored):
```
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=ndtconnect-upload
storeFile=upload-keystore.jks
```

Build the AAB:
```powershell
cd "E:\software\NDT Connect\mobile"
flutter pub get
dart run build_runner build --delete-conflicting-outputs
flutter build appbundle --release `
  --dart-define=API_BASE_URL=https://ndt-connect.com `
  --dart-define=MAPBOX_PUBLIC_TOKEN=pk.eyJ.your.token
```

**Output**: `mobile\build\app\outputs\bundle\release\app-release.aab`

This is what you upload to Play Console.

### 7. iOS — Xcode on a Mac (you cannot do this on Windows)

You need a Mac with Xcode 15+, signed in to your Apple Developer account ($99/yr).

```bash
cd "/path/to/NDT Connect/mobile"
flutter pub get
dart run build_runner build --delete-conflicting-outputs

# Configure signing
open ios/Runner.xcworkspace
# Xcode → Signing & Capabilities → Team = your Apple Dev team
# Bundle ID = com.ndtconnect.mobile

flutter build ipa --release \
  --dart-define=API_BASE_URL=https://ndt-connect.com \
  --dart-define=MAPBOX_PUBLIC_TOKEN=pk.eyJ.your.token
```

**Output**: `mobile/build/ios/ipa/ndt_connect_mobile.ipa`

Upload via Xcode → Window → Organizer → Distribute App → App Store Connect.

If no Mac available, alternatives:
- **MacStadium / MacInCloud** — rent a Mac in the cloud, ~$30/month
- **Codemagic** — CI/CD that includes a Mac runner; free tier covers ~500 build minutes/month
- **Bitrise** — same idea
- Borrow a Mac from a friend for one afternoon

### 8. Play Console — submit

- Go to Play Console → Create app → fill out per `store-listing\play-store-listing.md`
- Upload `app-release.aab` to Internal testing
- Add tester emails (yourself + a couple of trusted users)
- Get the link, install on your Android, smoke-test
- Capture screenshots on the real device (you said you'd do this)
- Promote to Closed → Open → Production

### 9. App Store Connect — submit

- App Store Connect → My Apps → New App → fill out per `store-listing\app-store-listing.md`
- Upload IPA via Xcode Organizer
- Add to TestFlight Internal → External → submit for review

### 10. Submit to Google Search Console

Submit the new sitemap and the priority-1 URL list:

- GSC → Sitemaps → submit `https://ndt-connect.com/sitemap.xml`
- GSC → URL Inspection → paste each URL from `gsc-submission-2026-04-26\priority-1-static-and-pillars.txt` → "Request indexing"
- Once that's flowing, run the Indexing API script for the rest:
  ```powershell
  cd "E:\software\NDT Connect\NDTConnect"
  node scripts\indexing-api-submit.mjs --urls ..\..\Atlantis\gsc-submission-2026-04-26\all-urls-flat.txt --rate 100
  ```
  (Requires service account JSONs at `scripts/secrets/sa-1.json` etc.)

---

## Pre-launch smoke test (before going public)

Run all of these. Anything failing = blocker.

```powershell
# Web
curl -I https://ndt-connect.com/
curl -I https://ndt-connect.com/sitemap.xml
curl -I https://ndt-connect.com/robots.txt
curl -I https://ndt-connect.com/free-tools
curl -I https://ndt-connect.com/free-tools/equipment-management/houston-tx
curl -I https://ndt-connect.com/blog/ultimate-guide-ultrasonic-testing
curl -I https://ndt-connect.com/privacy
curl -I https://ndt-connect.com/login

# API (with a fresh JWT from /api/auth/login)
$token = "PASTE_JWT_HERE"
curl -H "Authorization: Bearer $token" https://ndt-connect.com/api/equipment
curl -H "Authorization: Bearer $token" https://ndt-connect.com/api/me

# CORS preflight
curl -X OPTIONS -H "Origin: https://app.ndt-connect.com" `
  -H "Access-Control-Request-Method: GET" `
  -i https://ndt-connect.com/api/equipment
# Should return 204 + Access-Control-Allow-Origin: https://app.ndt-connect.com

# PWA
curl -I https://app.ndt-connect.com/
curl -I https://app.ndt-connect.com/manifest.json

# Mobile builds
flutter build appbundle --release  # → outputs/bundle/release/app-release.aab
flutter build ipa --release        # → outputs/ios/ipa/ (Mac only)
```

---

## What's still v1.1, NOT v1.0

These are flagged in the code with TODO comments. None block launch:

- In-app realtime chat between client and provider (currently a placeholder card on track-request screen)
- File attachments on service requests (placeholder note in the request wizard)
- AI procedure writer (out of scope for v1)
- Web push notifications (email push works; web push needs a self-hosted Push API + service worker setup)
- Spanish + Portuguese translations

---

## Readiness summary

| Surface | Code ready | Deployable | Live for users |
|---|---|---|---|
| `ndt-connect.com` (Next.js) | ✓ | ✓ — push & let Vercel build | After step 3 above |
| `app.ndt-connect.com` (Flutter PWA) | ✓ | ✓ — second Vercel project | After step 4 above |
| Android (Play Store) | ✓ | After step 6 (keystore + AAB) | After step 8 (you submit + Play approves, 1–2 days) |
| iOS (App Store) | ✓ | After step 7 (Mac + Xcode) | After step 9 (you submit + Apple approves, 1–7 days) |

The web is genuinely 1 push away. The mobile apps need the human/Mac/screenshot steps you said you'll do.
