# Product expansion — 2026-04-26 Round 2

This addendum covers the changes made in the second round of work on
2026-04-26: comprehensive NDT methods + certification standards, per-user
custom-list capability, and the login-page logo replacement.

It complements `SEO-IMPLEMENTATION-NOTES.md` (round 1 — the city-page
generator and sitemap/robots).

## What was added

### 1. Comprehensive NDT method + certification reference data

| File | Purpose |
|---|---|
| `src/data/ndtMethods.ts` | All ASNT SNT-TC-1A methods (UT, RT, MT, PT, ET, VT, LT, AE, GWT, PAUT, TOFD, DR, CR, CT, NR, IR, MFL, VA, LM, MW, Shearography, Hardness, PMI, RFT, ACFM, Metallography). Plus a comprehensive `NDT_EQUIPMENT_TYPES` list covering 45+ instrument classes. |
| `src/data/ndtCertifications.ts` | Personnel cert bodies — ASNT SNT-TC-1A, ASNT CP-189, ACCP, ISO 9712, EN 4179, PCN/BINDT, CSWIP, CGSB / NRCan, NAS 410, NADCAP, AINDT, ACS, JSNDI, KSNT, CCS / CSNDT, ABENDI, AAEND, GOST, ISNT, plus 12 personnel levels and 40+ company certifications (ISO 9001/14001/45001/17020/17024/17025/29001, API Q1/Q2/Monogram, AS9100/9110/9120, Nadcap variants, classification societies, aerospace primes, ASME stamps, FAA/EASA Part 145, etc.). |

### 2. Per-user custom-list infrastructure

| File | Purpose |
|---|---|
| `src/hooks/useUserPredefinedLists.ts` | `useUserPredefinedList(listKey)` returns `{ items, builtin, userItems, addItem, removeItem }`. `items` is the merged (built-in + user-custom) list, ready to drop into a Select. List keys: `ndtMethods`, `equipmentTypes`, `personnelCertBodies`, `personnelLevels`, `companyCertifications`. |
| `src/components/shared/EditableSelect.tsx` | Drop-in `<Select>` replacement. Renders the merged list and exposes an "Add custom (only visible to you)" button that pops a small inline text input. New entries persist in localStorage scoped to the logged-in user-id, then immediately reappear in every other dropdown the same user opens. |

**Storage today:** localStorage keyed by `ndtconnect.predefined.<userId>.<listKey>`.
**Backend migration path:** when `/api/user/predefined-lists` ships, replace
the localStorage `read()` / `write()` calls in `useUserPredefinedLists.ts`
with fetches. The hook surface stays identical so no consumer needs to
change.

### 3. Wired into Equipment management

`src/app/provider-dashboard/equipment/page.tsx` — the equipment-type Select
in the create/edit dialog is now powered by `<EditableSelect listKey="equipmentTypes">`.

The hardcoded `EQUIPMENT_TYPES` constant at the top of the file is left in
place as a fallback (and to keep the file diff small) but is no longer
referenced by the form. It can be deleted in a follow-up clean-up commit.

### 4. Two-pane login + white globe logo

| File | Status | Purpose |
|---|---|---|
| `src/components/shared/NdtConnectLogo.tsx` | NEW | SVG component. `variant="color"` for white backgrounds, `variant="white"` for dark/blue. Renders globe + wordmark; `showWordmark={false}` for icon-only. |
| `public/logo-white.svg` | NEW | Static white-on-transparent SVG asset for any `<img>` consumer. |
| `src/app/login/page.tsx` | REWRITTEN | Two-pane layout: left dark-blue brand panel with `<NdtConnectLogo variant="white">` + "Welcome Back" headline + 3 feature bullets, right white form pane with the existing `LoginViewManager`. Replaces the empty white box with the proper logo. |

**The form behaviour itself is unchanged** — `LoginViewManager` and
`LoginForm` from `@/components/auth/*` are reused as-is. Only the
surrounding chrome is new.

## What still needs to be done (optional follow-ups)

- **Wire EditableSelect into the certifications page.** The
  `/provider-dashboard/certifications` page reads `personnelQualifications`
  and `certifications` from the user object. The actual *editing* of those
  arrays happens in `provider-profile` (which lives in the root project,
  not in NDTConnect/). Once the canonical edit path is identified, swap in
  `<EditableSelect listKey="personnelCertBodies">` for the cert-body field
  and `<EditableSelect listKey="companyCertifications">` for the company
  cert field.
- **Wire EditableSelect into `find-providers` filters.** Filtering by NDT
  method and by certification body should also draw from the same
  predefined lists, so a custom method a provider added on their profile
  becomes available as a filter option for clients searching for them.
- **Mirror `NdtConnectLogo` into `Header.tsx` and `Footer.tsx`.** Both
  currently render text-only "NDT Connect" — replacing those with
  `<NdtConnectLogo variant="color" height={32} />` will tighten brand
  consistency.
- **Update `src/app/admin/manage-predefined-lists/page.tsx`** to seed its
  `BUILT_IN_DEFAULTS` from `NDT_METHODS` / `PERSONNEL_CERT_BODIES` /
  `COMPANY_CERTIFICATIONS` instead of the abbreviated literals it has now.
  This way admin-curated and user-curated lists stay in sync.
- **Backend persistence for custom lists.** Add a `customPredefinedLists`
  field to the user document and a `PUT /api/user/predefined-lists` route
  so custom items survive cache clears and follow the user across devices.
- **Mobile app parity.** The Flutter scaffold at `mobile/` should consume
  the same `/api/user/predefined-lists` endpoint when it lands.

## Mirroring to the root project (`E:\software\NDT Connect\src\...`)

The root project at `src/app/` is a near-clone of `NDTConnect/src/app/`
without the equipment/calibration/certifications routes. If both folders
deploy independently, mirror the login + logo files into the root:

```
src/app/login/page.tsx
src/components/shared/NdtConnectLogo.tsx
public/logo-white.svg
```

The `EditableSelect` / hooks / data files are only needed where the
free-tools pages live (i.e. `NDTConnect/`), so they do not need to be
mirrored.

## Verification

After deploy, confirm:

1. `/login` shows the new two-pane layout with the white globe-and-wordmark logo (no empty white box).
2. Sign in as a provider → `/provider-dashboard/equipment` → "Add equipment" — the type dropdown lists 45+ instrument classes; "Add custom (only visible to you)" works; refreshing the page persists the custom item.
3. Open the dropdown again on the same browser session — the custom item appears.
4. Sign out and back in as a different provider — the custom item DOES NOT appear (it is per-user).
5. Existing equipment records continue to display normally.

## Rollback plan

If anything regresses on `/login`, restore the previous file from git:

```bash
git checkout HEAD~1 -- src/app/login/page.tsx
```

If the equipment page misbehaves, restore:

```bash
git checkout HEAD~1 -- src/app/provider-dashboard/equipment/page.tsx
```

Both files were the only ones modified; the new files (data/hooks/components/svg)
are pure additions and can be safely left in place even if the rollback
above is needed.
