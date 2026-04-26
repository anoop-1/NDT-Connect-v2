# NDT Connect — Mobile + Web (Flutter)

Single Flutter codebase that ships to **Android, iOS, and the web**. Same screens, same business logic, same backend (`ndt-connect.com/api`). The web build is a Progressive Web App that installs from any modern browser; the mobile builds are native AAB / IPA artifacts for the Play Store and App Store.

## What's in this repo

```
mobile/
├── pubspec.yaml             ← deps (cross-platform — see plugin notes)
├── analysis_options.yaml    ← lints
├── vercel.json              ← web-build deploy config (Vercel)
├── lib/
│   ├── main.dart            ← native entry (Android/iOS)
│   ├── main_web.dart        ← web entry (sets URL strategy + Mapbox token)
│   ├── app.dart
│   ├── core/
│   │   ├── api/             ← dio + auth interceptor
│   │   ├── auth/            ← AuthRepository + Riverpod controller
│   │   ├── router/          ← go_router with auth-aware redirect
│   │   ├── storage/
│   │   │   ├── secure_storage.dart    ← cross-platform secrets
│   │   │   └── local_db.dart          ← sqflite (native) + sqflite_common_ffi_web
│   │   ├── maps/
│   │   │   ├── map_view.dart          ← cross-platform façade
│   │   │   ├── map_view_native.dart   ← mapbox_maps_flutter (mobile)
│   │   │   └── map_view_web.dart      ← mapbox-gl-js via interop (web)
│   │   └── theme/
│   └── features/
│       ├── auth/            ← login, register
│       ├── home/
│       ├── free_tools/      ← equipment, calibration, certifications
│       ├── marketplace/     ← find providers
│       ├── booking/         ← request-service, my-requests
│       ├── provider_dashboard/
│       └── settings/
└── web/
    ├── index.html           ← splash + flutter bootstrap
    ├── manifest.json        ← PWA manifest with shortcuts
    ├── logo-globe-animated.svg
    ├── favicon.png
    └── icons/
        ├── Icon-192.png
        ├── Icon-512.png
        ├── Icon-maskable-192.png
        └── Icon-maskable-512.png
```

---

## First-time setup

You need Flutter 3.22+ on the stable channel.

```bash
cd "E:\software\NDT Connect\mobile"

# 1) Generate platform host projects (android/ ios/) on top of this scaffold.
#    --platforms=android,ios,web ensures all three targets exist.
flutter create . --org com.ndtconnect --project-name ndt_connect_mobile --platforms=android,ios,web

# 2) Install pub deps.
flutter pub get

# 3) Run code generators (Freezed, json_serializable, Riverpod).
dart run build_runner build --delete-conflicting-outputs

# 4) Generate web icons (one-shot — see web/icons/README-icons.md).
#    Until icons exist, the PWA install prompt won't appear.

# 5) Run on the platform of choice.
flutter run -d chrome -t lib/main_web.dart \
  --dart-define=MAPBOX_PUBLIC_TOKEN=pk.eyJ.your.token \
  --dart-define=API_BASE_URL=http://localhost:3000

flutter run -d android
flutter run -d ios
```

---

## Per-platform build

### Android
```bash
flutter build appbundle --release \
  --dart-define=API_BASE_URL=https://ndt-connect.com
```
Sign with the upload key, upload AAB to Play Console → Internal testing → promote.

### iOS
```bash
flutter build ipa --release \
  --dart-define=API_BASE_URL=https://ndt-connect.com
```
Sign with the App Store distribution profile, upload via Xcode Organizer or `fastlane pilot`.

### Web (PWA)
```bash
flutter build web --release -t lib/main_web.dart \
  --dart-define=MAPBOX_PUBLIC_TOKEN=pk.eyJ.your.token \
  --dart-define=API_BASE_URL=https://ndt-connect.com
```
Output: `build/web/`. Deploy to any static host (Vercel, Netlify, Cloudflare Pages, S3+CloudFront).

---

## Deploying the web build

### Vercel (recommended — `vercel.json` is preconfigured)

1. Connect this `mobile/` folder as a Vercel project.
2. Add env vars: `MAPBOX_PUBLIC_TOKEN`, `API_BASE_URL=https://ndt-connect.com`.
3. Set the custom domain to `app.ndt-connect.com` (or whatever subdomain you prefer).
4. Push. Vercel runs `flutter build web` and serves the resulting bundle.

The `vercel.json` already handles SPA rewrites (every URL → `/index.html`), long-cache headers for fingerprinted assets, and short-cache for the entry HTML + service worker.

### Netlify / Cloudflare Pages
Same idea — they don't need `vercel.json`. Just set the build command to `flutter build web --release -t lib/main_web.dart` and the output directory to `build/web`. SPA fallback rule:

```
/*    /index.html    200
```

---

## Subdomain split — recommended

| Subdomain | Hosts |
|---|---|
| `ndt-connect.com` | Existing Next.js marketing + SEO city pages (already deployed). Public crawlable. |
| `app.ndt-connect.com` | This Flutter web build. Auth-gated app. PWA installable. |
| Apple App Store | iOS native build of this same codebase. |
| Google Play Store | Android native build. |

Reasons to split: the marketing site needs Next.js for server-rendered SEO; the app is a single-page Flutter shell that doesn't render to crawlable HTML and would dilute the SEO surface if served from the apex domain. Cross-link from the marketing site's "Open the app" buttons to `app.ndt-connect.com`.

---

## Web-specific concerns (and how this scaffold handles them)

| Concern | Handling |
|---|---|
| `mapbox_maps_flutter` is mobile-only | `map_view.dart` uses a conditional `dart.library.html` import to load `map_view_web.dart` (mapbox-gl-js via interop) on web, `map_view_native.dart` on Android/iOS. |
| `sqflite` doesn't compile to web | `sqflite_common_ffi_web` is included; `local_db.dart` swaps `databaseFactory` to the FFI-Web factory when `kIsWeb`. Same SQL surface, IndexedDB underneath. |
| `flutter_secure_storage` on web is not actually secure | We document this and rely on short-lived JWTs (15 min access token, refresh on 401). Long-lived secrets never touch browser storage. |
| FCM web push needs a VAPID key | Add the VAPID key in Firebase Console → Cloud Messaging → Web push certs. Pass to `firebase_messaging` in `main_web.dart` via `getToken(vapidKey: ...)`. |
| Image picker on web needs HTTPS for camera | Web build uses `<input type="file">` (no camera). Camera capture available only on the native builds. |
| Service-worker caching can serve stale assets | Flutter's bundled SW invalidates on `version.json` change. The `vercel.json` short-caches the SW + index.html so deploys propagate within seconds. |

---

## Auth API contract

Same as native — `lib/core/auth/auth_repository.dart` calls:

```
POST /api/auth/login       { email, password } → { accessToken, refreshToken, user }
POST /api/auth/register    { email, password, role, companyName? } → { accessToken, refreshToken, user }
POST /api/auth/refresh     { refreshToken } → { accessToken, refreshToken }
POST /api/auth/logout      → 200
GET  /api/me               → user
```

Web build attaches the same Bearer token; CORS must allow the `app.ndt-connect.com` origin from the Next.js API at `ndt-connect.com`.

Add to `next.config.js` (root project):

```js
async headers() {
  return [{
    source: '/api/:path*',
    headers: [
      { key: 'Access-Control-Allow-Origin', value: 'https://app.ndt-connect.com' },
      { key: 'Access-Control-Allow-Credentials', value: 'true' },
      { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PATCH,DELETE,OPTIONS' },
      { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
    ],
  }];
}
```

---

## What is intentionally left out of this scaffold

- Generated code (`*.g.dart`, `*.freezed.dart`) — run `dart run build_runner build` after `flutter pub get`.
- `android/` and `ios/` host projects — created by `flutter create .`.
- Web icons (PNG) — see `web/icons/README-icons.md` for the one-shot generation step.
- `firebase_options.dart` — generated by `flutterfire configure`.
- Real screen implementations — the scaffold ships with stubs marked with TODO comments showing exactly which API endpoint to wire.

---

## Architecture deep-dive

See `flutter-app-architecture-2026-04-26.docx` in the project root for stack rationale, state-management patterns, API contract details, screen inventory with tablet adaptations, pre-launch backend work, release pipeline, 15-week timeline, and risk register.
