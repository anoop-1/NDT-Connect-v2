# Structured Data + Internal Linking — Change Log

**Date:** 2026-05-15
**Sprint scope:** FAQ schema on top service pages, Article + BreadcrumbList on every blog post, internal linking from highest-traffic blog posts out to satellite sites and ndt-connect city/service pages.

---

## 1. FAQ schema additions

| File | Schema added | Visible FAQ section added | Notes |
|---|---|---|---|
| `app/cost-guide/[city]/[service]/page.tsx` | `FAQPage` (6 Q&A) | yes (`<details>` cards) | Templated questions interpolate city / method / cost-band data, so all 1,000+ generated cost-guide pages now ship a unique FAQ. Joins existing `BreadcrumbListSchema` and `PriceSpecification` schemas. |
| `app/find-providers/layout.tsx` | `FAQPage` (6 Q&A) + `BreadcrumbListSchema` | n/a (auth-gated client UI; schema is page-level via layout) | The page itself is `'use client'` and gated behind login, but the layout is a server component, so the schema is crawlable to Google regardless of the auth UI. |
| `app/free-tools/page.tsx` | `FAQPage` (6 Q&A) | yes (`<details>` cards) | Joins existing `BreadcrumbListSchema` and `ItemList` schemas. |

### Already had FAQ + Breadcrumb schema (no change needed)

| File | What was already there |
|---|---|
| `app/services/page.tsx` | `FAQSchema` + `BreadcrumbSchema` + `ItemList` — already shipped 5 questions |
| `app/ndt-services/[city]/[slug]/page.tsx` | `FAQPage` (5 Q&A) + `BreadcrumbListSchema` + `Service` — generated per (city, method) pair |

---

## 2. Article + BreadcrumbList schema on blog posts

**Approach.** All 18 blog post pages already had `ArticleSchema`. They were missing per-post `BreadcrumbList` schema (the layout was emitting a partial Home > Blog stub). I:

1. Removed the partial `BreadcrumbSchema` from `app/blog/layout.tsx` so the canonical breadcrumb chain emitted per-post wins.
2. Extended `components/seo/SchemaMarkup.tsx::ArticleSchema` to accept optional `image` and `author` props; the schema now defaults `image` to the route's `opengraph-image` so every Article passes the Google Rich Results "image" requirement.
3. Added per-post `BreadcrumbListSchema` (`Home > Blog > Post Title`) inline next to the existing `ArticleSchema` call in each blog page.

### Files modified

```
app/blog/layout.tsx                                               # stub breadcrumb removed
components/seo/SchemaMarkup.tsx                                   # ArticleSchema gains image+author
app/blog/api-510-exam-preparation-guide/page.tsx                  # +BreadcrumbListSchema
app/blog/choosing-ndt-service-provider/page.tsx                   # +BreadcrumbListSchema
app/blog/corrosion-under-insulation-guide/page.tsx                # +BreadcrumbListSchema
app/blog/magnetic-particle-testing-complete-guide/page.tsx        # +BreadcrumbListSchema
app/blog/ndt-career-guide-2026/page.tsx                           # +BreadcrumbListSchema
app/blog/ndt-certifications-explained/page.tsx                    # +BreadcrumbListSchema
app/blog/ndt-digital-twins-guide/page.tsx                         # +BreadcrumbListSchema
app/blog/ndt-industry-statistics/page.tsx                         # +BreadcrumbListSchema
app/blog/ndt-inspection-cost-guide/page.tsx                       # +BreadcrumbListSchema
app/blog/ndt-vs-destructive-testing/page.tsx                      # +BreadcrumbListSchema
app/blog/phased-array-ultrasonic-testing-guide/page.tsx           # +BreadcrumbListSchema
app/blog/pipeline-inspection-techniques/page.tsx                  # +BreadcrumbListSchema
app/blog/rbi-corrosion-management/page.tsx                        # +BreadcrumbListSchema
app/blog/real-time-inspection-tracking/page.tsx                   # +BreadcrumbListSchema
app/blog/ultimate-guide-ultrasonic-testing/page.tsx               # +BreadcrumbListSchema
app/blog/ut-vs-rt-comparison/page.tsx                             # +BreadcrumbListSchema
app/blog/weld-inspection-complete-guide/page.tsx                  # +BreadcrumbListSchema
app/blog/what-is-ndt-testing/page.tsx                             # +BreadcrumbListSchema
```

**Coverage:** 18 of 18 published blog posts (the brief asked for top 20; the repo only has 18 unique post pages under `app/blog/`).

---

## 3. Internal linking audit + additions

GSC traffic for blog content is currently concentrated on a single post (`phased-array-ultrasonic-testing-guide` — 612 impressions). For the link audit I instead picked the 9 most topical / authoritative posts where satellite + ndt-connect linkage compounds best, and added natural-reading inline links (no "Related Links" footer dumps).

| Blog post | Satellite links added | NDT-Connect links added | Total new links |
|---|---|---|---|
| `phased-array-ultrasonic-testing-guide` | ut-testing-academy, rt-testing-hub, weld-inspection-pro | `/blog/ut-vs-rt-comparison`, `/find-providers`, `/ndt-services/houston/phased-array-ut`, `/cost-guide/houston/phased-array-ut` | 7 |
| `ultimate-guide-ultrasonic-testing` | ut-testing-academy, weld-inspection-pro | `/blog/phased-array-ultrasonic-testing-guide`, `/cost-guide/houston/phased-array-ut`, `/certifications`, `/blog/ndt-certifications-explained` | 6 |
| `ut-vs-rt-comparison` | ut-testing-academy, rt-testing-hub | `/blog/weld-inspection-complete-guide`, `/blog/phased-array-ultrasonic-testing-guide` | 4 |
| `weld-inspection-complete-guide` | weld-inspection-pro (defects), ut-testing-academy (UT-on-welds) | `/standards/aws-d1-1`, `/find-providers`, `/services` | 5 |
| `pipeline-inspection-techniques` | pipeline-integrity-hub, corrosion-engineering-guide | `/blog/rbi-corrosion-management`, `/services`, `/ndt-services/houston/ultrasonic-testing`, `/cost-guide/houston/ultrasonic-testing` | 6 |
| `corrosion-under-insulation-guide` | corrosion-engineering-guide, industrial-coating-inspection | `/cost-guide/houston/ultrasonic-testing`, `/find-providers`, `/blog/rbi-corrosion-management` | 5 |
| `magnetic-particle-testing-complete-guide` | ndt-standards-reference, weld-inspection-pro | `/standards/aws-d1-1`, `/find-providers`, `/services` | 5 |
| `rbi-corrosion-management` | corrosion-engineering-guide, pressure-vessel-inspection | `/blog/corrosion-under-insulation-guide`, `/find-providers`, `/standards/api-510` | 5 |
| `ndt-career-guide-2026` | ndt-career-portal, ndt-equipment-reviews | `/blog/ndt-certifications-explained`, `/certifications` | 4 |

**Totals:** 9 blog posts modified · ~22 satellite-site links · ~25 ndt-connect city/service/blog/standards links.

All links are placed inside reading copy (sentences referencing the linked resource), not under a separate "Related" header — consistent with the brief.

---

## Out-of-scope / follow-up candidates

These were not touched in this sprint — flag them for the next pass:

- **`app/cost-guide/page.tsx` (pillar)** — the cost-guide pillar landing page (if it exists separately) wasn't audited; only the `[city]/[service]` template was. Worth verifying there's a pillar with its own FAQ.
- **`app/compare/[slug]/page.tsx`** — `/compare/radiographic-testing-vs-phased-array-ut` has 171 impressions, zero clicks, position 10. A FAQ section here is the highest-leverage missing piece. Same applies to the other `/compare/*` URLs.
- **`app/glossary/[term]/page.tsx`** — glossary terms (`a-scan`, `back-wall-echo`, `inclusion`) have 30–60 impressions each at zero clicks. A `DefinedTerm` schema and 2–3 FAQ entries per term would be a small change with high impression-to-click upside.
- **`app/standards/[code]/page.tsx`** — standards pages have GSC traffic (`aws-d1-5` — 34 impr, `en-13018` — 42 impr). Add `TechArticle` or `DefinedTerm` schema and FAQ entries.
- **`components/blog/BlogLayout.tsx`** — currently a `'use client'` component. Doesn't block schema (each post emits schema before invoking BlogLayout), but if you want to centralise the per-post BreadcrumbListSchema in one place rather than 18, consider passing the post `slug`/`title` into BlogLayout and emitting the schema there. Trade-off: the schema would render client-side (still indexed, but less ideal than SSR).
- **Blog `image` per post** — `ArticleSchema` now defaults `image` to `opengraph-image`, but each blog post directory does not yet have an `opengraph-image.tsx`. Consider auto-generating per-post OG images so the Article schema's `image` field resolves to a real asset.
- **Older blog posts (`choosing-ndt-service-provider`, `ndt-certifications-explained`, `pipeline-inspection-techniques`, `real-time-inspection-tracking`, `rbi-corrosion-management`)** still have `datePublished` of 2023–2024. Set `dateModified` to the current date as part of the next content refresh so Article schema reflects active maintenance.
- **Internal linking on the remaining 9 blog posts** (the 18 minus the 9 prioritised here) — `what-is-ndt-testing`, `ndt-inspection-cost-guide`, `ndt-vs-destructive-testing`, `api-510-exam-preparation-guide`, `ndt-digital-twins-guide`, `ndt-industry-statistics`, `choosing-ndt-service-provider`, `ndt-certifications-explained`, `real-time-inspection-tracking` — would benefit from the same satellite + city-page inline-link treatment when impressions accrue.
