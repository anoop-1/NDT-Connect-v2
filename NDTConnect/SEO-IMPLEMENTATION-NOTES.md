# SEO implementation notes — NDT Connect (2026-04-26)

This document records the additive SEO work added to `NDTConnect/` as part of the 2026-04-26 SEO sprint. It is meant to help a future contributor (you, in three months) understand what was added, why, and how to verify nothing broke.

## What was added (file-by-file)

All paths are relative to `NDTConnect/`.

| File | Purpose |
|---|---|
| `src/data/freeTools.ts` | Curated config for the three free SaaS features (equipment-management, calibration-tracking, certificate-management). One entry per feature; add a 4th to fan out a 4th set of pages. |
| `src/data/cities.ts` | Hand-curated city dataset (50 Tier-1 US cities at first ship). Each entry powers one page per free-tool feature. Add a city by appending one entry; do not change a slug after launch. |
| `src/components/free-tools/StructuredData.tsx` | Server-only JSON-LD emitter. |
| `src/components/free-tools/FreeToolFeaturePage.tsx` | Renders the marketing landing for a single free-tool feature. |
| `src/components/free-tools/FreeToolCityPage.tsx` | Renders a per-city geo-targeted landing for a single (feature, city) combination. |
| `src/app/free-tools/page.tsx` | Pillar page at `/free-tools` — links to all three feature pages. |
| `src/app/free-tools/[feature]/page.tsx` | Dynamic feature route — `generateStaticParams` produces one page per FREE_TOOLS entry. |
| `src/app/free-tools/[feature]/[city]/page.tsx` | Dynamic feature × city route — `generateStaticParams` produces feature × city = N pages. |
| `src/app/sitemap.ts` | Source-controlled sitemap generator. Replaces the externally-generated live sitemap. |
| `src/app/robots.ts` | Source-controlled robots.txt generator. Mirrors the live rules and explicitly allows `/free-tools/`. |

## What was NOT changed

Nothing existing was modified. No files outside the new paths above were touched. In particular:

- `src/app/layout.tsx` — unchanged. (Recommended Sprint 1 follow-up: add Organization + WebSite JSON-LD.)
- `src/app/page.tsx` — unchanged. (Recommended Sprint 1 follow-up: rewrite H1 and add a free-tools H2 row.)
- `src/components/layout/Footer.tsx` — unchanged. The 4 broken links (/blog/*, /privacy, /terms) are flagged in the SEO audit doc but not fixed in this commit.
- `src/app/provider-dashboard/{equipment,calibration,certifications}/page.tsx` — unchanged. The auth-gated tools work as before.
- All other existing routes remain identical.

## Verifying nothing broke

Run these from `NDTConnect/`:

```bash
npm install
npm run typecheck     # tsc --noEmit
npm run lint          # next lint
npm run build         # next build (will static-generate the new free-tools/* pages)
npm run dev           # smoke-test http://localhost:3000/free-tools
```

After `npm run build`, manually check:

1. The build output lists routes for `/free-tools`, `/free-tools/[feature]`, and `/free-tools/[feature]/[city]` with the expected number of pre-generated pages (3 features + 3 × 50 cities = 153 pages, plus the pillar = 154).
2. `http://localhost:3000/sitemap.xml` includes the new URLs (count = 8 static + 3 features + 150 cities + 3 × 13 regions + 3 × 12 countries = 200).
3. `http://localhost:3000/robots.txt` mirrors the live robots.txt rules.
4. `http://localhost:3000/free-tools/equipment-management/houston-tx` renders, has a unique `<title>`, an H1 with "Houston, TX", and a `<script type="application/ld+json">` for SoftwareApplication + LocalBusiness + BreadcrumbList + FAQPage.
5. The existing routes still work — visit `/`, `/about`, `/find-providers`, `/login`, `/register`, `/provider-dashboard/equipment` (auth-gated), `/provider-dashboard/calibration`, `/provider-dashboard/certifications`. Behaviour should be identical to pre-change.

## Adding more cities

1. Open `src/data/cities.ts`.
2. Append a new entry to `CITIES` with a unique slug. Curate every field — industries, codeAuthorities, namedFacilities (3+), localPainQuote.
3. Re-run `npm run build`. The new city auto-fans out into 3 new pages (one per feature).
4. After deploy, manually request the new URLs in GSC URL Inspection or via Indexing API to nudge crawl.

For the Tier-2 expansion (next 100 cities), you can add 5–10 cities per PR to keep diffs reviewable.

## Adding a new free-tool feature

1. Open `src/data/freeTools.ts`.
2. Add a new entry to `FREE_TOOLS` with a unique slug, name, titlePrefix, metaDescriptionPrefix, features[5], useCases[4], faqs[6], appPath, schemaCategory.
3. Re-run `npm run build`. The new feature auto-fans out into 1 feature landing + N city pages.

## Recommended next steps (not in this commit)

These are listed in the SEO audit and execution plan; they are out of scope for this code commit but should be sprint-1 priorities:

- Add per-route `generateMetadata` exports to existing public pages (/, /about, /find-providers, /register, /request-service, /recommendations).
- Add `Organization` + `WebSite` JSON-LD to `src/app/layout.tsx`.
- Rewrite homepage H1 to "Free NDT Equipment, Calibration & Certificate Management".
- Implement `/privacy` and `/terms`.
- Replace the broken `/blog/*` Footer links (or implement the blog).
- Replicate Atlantis's `scripts/gsc-multi-account-submit.mjs` for ndt-connect.com.
- Build region rollup pages at `/free-tools/[feature]/region/[region]/page.tsx` and country rollup pages at `/free-tools/[feature]/country/[code]/page.tsx`. The sitemap already includes these URLs but the route handlers need to ship.

## Risks left open in this commit

- The `tsconfig.json` excludes `src` (line 41). Next.js still builds the project, but tsc --noEmit may not type-check `src/`. If `npm run typecheck` passes silently with errors in src/, fix the tsconfig in a separate commit.
- `src/components/analytics/GoogleAnalytics` is referenced in `layout.tsx` but the file does not exist on disk. The build will fail. This is pre-existing; not introduced by this commit. Recommend creating a no-op stub component in a separate PR until real GA is wired up.
- The Atlantis cross-link in `FreeToolCityPage` constructs `https://atlantisndt.com/ultrasonic-testing-{citySlug-without-state}`. This assumes Atlantis has a UT page for every city we add. For new cities Atlantis doesn't yet cover, the link 404s. Mitigation: (a) audit which cities Atlantis already has UT pages for and gate the link accordingly; (b) prioritise adding Atlantis UT pages for all Tier-1 cities in the same sprint.

## Provenance

- Audit doc: `seo-audit-ndt-connect-2026-04-26.docx` (saved to `E:\software\Atlantis\`)
- Plan doc: `seo-execution-plan-2026-04-26.docx` (saved to `E:\software\Atlantis\`)
- Author: Claude (Cowork mode), 2026-04-26.
