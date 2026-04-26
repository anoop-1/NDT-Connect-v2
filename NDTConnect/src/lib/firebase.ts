// src/lib/firebase.ts
//
// 2026-04-26 — Firebase has been REMOVED from this project.
// All persistence is MongoDB on the Hostinger VPS via mongoose
// (see src/lib/mongodb.ts). Push notifications, when added, will be wired
// through a self-hosted backend webhook → email + (optional) Web Push using
// the standard Push API + service worker (no FCM).
//
// This stub remains only so that any stale `import "@/lib/firebase"` from
// pre-2026-04-26 code fails LOUDLY with a clear error instead of silently
// re-installing the firebase SDK.
//
// To delete safely:
//   1. Verify no other module imports from "@/lib/firebase".
//   2. Delete this file.
//   3. Run `npm uninstall firebase` (and any firebase-* packages) — already
//      removed from package.json on the same commit that deleted this file.

throw new Error(
  "Firebase has been removed from NDT Connect (2026-04-26). " +
  "All data lives on MongoDB at the Hostinger VPS. Update the calling code " +
  "to import from @/lib/mongodb or the relevant /api route instead."
);

export {};
