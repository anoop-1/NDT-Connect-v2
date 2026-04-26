# Flutter app — Web target addendum
**Date:** 2026-04-26
**Companion to:** `flutter-app-architecture-2026-04-26.docx`

This addendum covers the web (PWA) target added to the Flutter scaffold at `E:\software\NDT Connect\mobile\`. The original architecture doc covered Android + iOS; the codebase is now structured to ship the same screens to **all three platforms from one codebase**.

---

## What changed in the scaffold

### New files

| File | Purpose |
|---|---|
| `web/index.html` | Bootstrap shell with brand-coloured splash that fades out on `flutter-first-frame` event. References `flutter_bootstrap.js` and `manifest.json`. |
| `web/manifest.json` | PWA manifest. Names, theme colour `#004AAD`, four PNG icons (192/512 × normal/maskable), three app shortcuts (Free tools, Find providers, My requests). |
| `web/logo-globe-animated.svg` | The same rotating-globe SVG used on the marketing site's login page, copied into the app for the splash. |
| `web/icons/README-icons.md` | One-shot icon generation instructions (ImageMagick + PWA Builder). |
| `lib/main_web.dart` | Web entry point. Sets `usePathUrlStrategy()`, initialises `LocalDb` with the IndexedDB-backed factory, injects the Mapbox public token into `window.mapboxgl.accessToken`. |
| `lib/core/maps/map_view.dart` | Cross-platform map façade. Conditional import via `dart.library.html`. |
| `lib/core/maps/map_view_native.dart` | Mapbox via `mapbox_maps_flutter` (Android/iOS). |
| `lib/core/maps/map_view_web.dart` | Mapbox via `mapbox-gl-js` loaded from CDN with `dart:js_util` interop. Mounts inside an `HtmlElementView`. |
| `lib/core/storage/local_db.dart` | sqflite on native + sqflite_common_ffi_web (IndexedDB) on web. Same SQL surface. |
| `vercel.json` | Web deploy config. SPA rewrites, long-cache for fingerprinted assets, short-cache for HTML + service worker. |

### Updated files

| File | Change |
|---|---|
| `pubspec.yaml` | Added `sqflite_common_ffi_web`, `flutter_svg`, `universal_io`. Comments document why each plugin needs platform-specific handling. |
| `README.md` | Replaced with a comprehensive setup, build, and deploy guide for all three platforms. |

---

## Cross-platform plugin matrix

| Plugin | Native | Web | Strategy |
|---|---|---|---|
| `dio` | ✅ | ✅ | No change. Browsers route through fetch. |
| `flutter_secure_storage` | ✅ Keychain / EncryptedSharedPrefs | ⚠️ IndexedDB (not actually secure) | Use, but rely on short-lived JWTs. Document the caveat. |
| `sqflite` | ✅ | ❌ | Wrap with `LocalDb.initForPlatform()` which switches to `databaseFactoryFfiWeb` when `kIsWeb`. |
| `mapbox_maps_flutter` | ✅ | ❌ | Conditional import; web uses mapbox-gl-js via interop. |
| `firebase_messaging` | ✅ APNs / FCM | ✅ FCM Web Push | Web requires VAPID key in Firebase Console. |
| `flutter_local_notifications` | ✅ | ✅ Notifications API | Web prompts for permission on first call. |
| `image_picker` | ✅ camera + gallery | ⚠️ file input only (no camera) | Document; native gets full UX. |
| `path_provider` | ✅ | ⚠️ returns paths but they're virtual on web | OK for sqflite shim, not for real filesystem ops. |
| `firebase_analytics` | ✅ | ✅ | No change. |
| `sentry_flutter` | ✅ | ✅ | No change; web uses sentry-browser under the hood. |
| `reactive_forms` | ✅ | ✅ | No change. |
| `google_fonts` | ✅ | ✅ | No change. Self-host fonts in production for offline support. |

---

## Build commands

```bash
# Android
flutter build appbundle --release --dart-define=API_BASE_URL=https://ndt-connect.com

# iOS
flutter build ipa --release --dart-define=API_BASE_URL=https://ndt-connect.com

# Web (PWA)
flutter build web --release -t lib/main_web.dart \
  --dart-define=MAPBOX_PUBLIC_TOKEN=pk.eyJ.your.token \
  --dart-define=API_BASE_URL=https://ndt-connect.com
```

---

## Deployment topology

```
┌────────────────────────────────────────────────────────────────────────┐
│ ndt-connect.com (apex)                                                  │
│   Next.js 14 marketing + SEO                                            │
│   Server-rendered + crawlable HTML                                      │
│   /free-tools/*, /blog/*, /find-providers, /privacy, /terms             │
│   Public APIs at /api/*                                                 │
└────────────────┬───────────────────────────────────────────────────────┘
                 │ "Open the app" links + CORS-allowed API
                 │
┌────────────────▼───────────────────────────────────────────────────────┐
│ app.ndt-connect.com   ──── This Flutter web build (PWA)                 │
│   Single-page Flutter app                                               │
│   Auth-gated; service worker; installable                               │
│   build/web/ deployed via Vercel (vercel.json shipped)                  │
└────────────────────────────────────────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────────────────────┐
│ Apple App Store + Google Play Store                                     │
│   Native AAB (Android) + IPA (iOS) from the same codebase               │
│   FCM push, native camera, deep linking via universal links             │
└────────────────────────────────────────────────────────────────────────┘
```

The marketing site stays on the apex domain so SEO city pages keep ranking. The app moves to a subdomain so the Flutter SPA doesn't cannibalise the crawlable surface. Cross-link with explicit `Open the app` CTAs from the marketing surface.

---

## CORS — required change on the Next.js side

The Next.js API at `ndt-connect.com/api/*` must allow the `app.ndt-connect.com` origin. Add to `NDTConnect/next.config.js` (or root `next.config.js`):

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

For Vercel deployments specifically, the same can be set in `vercel.json` of the Next.js project.

---

## What still has to ship before web v1 launches

Same backend prerequisites as the native v1, plus three web-specifics:

1. Backend MongoDB migration of the localStorage-backed free tools (equipment, calibration, certifications). **Blocker for all platforms.**
2. `/api/auth/refresh` endpoint confirmed to exist with the cookie/header shape `auth_repository.dart` expects. **Blocker for opportunistic refresh on all platforms.**
3. Image-upload endpoint at `/api/upload` returning S3 presigned PUT URLs. Web cannot natively access local files outside `<input type="file">`, so this is the same code path on web as on native. **Nice-to-have for v1.**
4. CORS rule on `/api/*` allowing `https://app.ndt-connect.com`. **Blocker for web.**
5. Firebase project Web push config + VAPID key. **Blocker for web push only — not a launch blocker.**
6. Web icons committed to `mobile/web/icons/`. **Blocker for PWA install prompt — not the app itself.**

---

## Test plan additions for web

| Surface | What to verify |
|---|---|
| First-load size | Initial bundle < 2 MB gzipped (Flutter web's `--release` with tree-shaking is typically 1.6–1.9 MB). |
| Lighthouse PWA score | ≥ 90 (manifest, service-worker, HTTPS, viewport, theme-color). |
| Install prompt | Chrome desktop and Chrome Android both show "Install app" when manifest icons exist and SW serves successfully. |
| iOS Safari "Add to Home Screen" | Page metadata renders; standalone display mode works. (Apple does not show an automatic prompt — user-initiated only.) |
| Cold-start time | < 3s on broadband (LCP). |
| Offline behaviour | Service worker caches the shell; offline navigation to previously-visited routes works; data calls degrade gracefully with a "you're offline" banner. |
| Mapbox tiles | Map renders within 2s of `app.ndt-connect.com/find-providers/map` first paint. |
| File upload | Equipment photo upload via `<input type="file">` succeeds on Chrome / Safari / Firefox. |
| Notification permission | Asked at the user's first action that needs it (calibration alert subscribe), not on first load. |
| URL routing | Direct hits to `/free-tools/equipment`, `/find-providers`, `/login` all resolve (not 404 on refresh — `vercel.json` rewrites handle this). |
