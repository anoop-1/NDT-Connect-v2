# Rewrite Priority Brief — ndt-connect.com

Window: **2026-04-13 to 2026-05-13** (30-day GSC pull). Source CSV: `seo-analysis/output/rewrite-priority.csv` (3,558 URLs).

## (a) What the 30-day GSC tells us

- **Indexation is the headline problem.** Only **60 / 3,558 URLs (1.7%)** earned at least one impression in the last 30 days. The site is producing 2,411 impressions and just **22 clicks** at an average position of ~10. Three URLs alone (homepage, `cost-guide/houston-tx/ultrasonic-testing`, `cost-guide/dubai-ae/radiographic-testing`) account for over **47% of all impressions**.
- **Stale URLs were masking real performers.** GSC reports old slugs (e.g. `/cost-guide/houston/...`) that 301 to the new state-suffixed URLs in the sitemap (`/cost-guide/houston-tx/...`). The build script follows redirects via `/tmp/gsc-redirects.tsv`, so impressions land on the live URL.
- **Near-miss pool is small.** Only **6 URLs** sit at position 11-30 with ≥30 impressions — meaning quick "page-2 to page-1" wins are limited until indexation improves.
- GA4 data was successfully pulled (`pull-ga4-30d.py` ran cleanly) — 61 landing pages tracked, mostly aligned with the GSC top performers.

## (b) Ranking logic

`priorityScore = impressions / max(position, 5) + nearmiss_bonus + family_weight + clicks_bonus`

- `nearmiss_bonus` = `impressions × 0.5` when position is 11-30 and impressions ≥ 30.
- `family_weight`: blog/compare = 25; free-tools/tools = 20; find-providers = 15; glossary/standards/industries = 12; about/ndt-services/cost-guide hubs = 8; templated city pages = 6; the giant city+method matrices = 1.0-1.5.
- `clicks_bonus` = `clicks × 5` (proven intent).
- For zero-impression URLs the score collapses to family weight, so quality formats (blog, compare, free-tools) still rank above templated city/method pages.

Tiering: **T1 = top 200**, **T2 = ranks 201-1000**, **T3 = the remaining 2,558**.

## (c) Five URL families to attack first

1. **Top-impression cost-guide cities (T1, ~3 URLs)** — Houston, Dubai, San Francisco are already on page 1 with 4-figure impressions but <1% CTR. Title/snippet rewrite + add real pricing tables = immediate click lift.
2. **Blog (19 URLs, all in T1)** — only 1 of 19 posts is indexed. These are the highest-CTR, most linkable format. Rewrite for topical depth + internal-link them from the indexed cost-guides to push crawlers in.
3. **Glossary (118 in T1)** — small entries, easy to make distinct, strong for long-tail "what is X" queries. Currently 96% un-indexed.
4. **Standards (29 T1, 56 T2)** — high-intent search terms (`asnt-snt-tc-1a`, `iso-9712`). Rewrite as authoritative reference pages with citations and outbound links — Google rewards them in the standards niche.
5. **Compare pages (1 T1, 65 T2)** — `compare/radiographic-testing-vs-phased-array-ut` already pulls 172 impressions at zero clicks; the format is high-CTR by nature. Rewrite all 66 with side-by-side tables and a verdict block.

## (d) Noindex / consolidation candidates

The three big templated matrices are the obvious risk:

| Family | URLs | % zero-impr | Recommendation |
|---|---|---|---|
| `cost-guide/{city}/{method}` | 1,038 | 98.6% | Keep top ~50 indexable; `noindex` the long tail until they earn impressions, **or** consolidate to one page per city with method as anchors. |
| `ndt-services/{city}/{method}` | 1,038 | 98.8% | Same approach. The ~10 indexed pages prove the template works for tier-1 cities only. |
| `free-tools/{city}/{method}` | 594 | 99.5% | Strong candidate to **noindex entirely** — these are tool landing pages with no proven query demand; keep parent `/free-tools` and `/free-tools/{tool}` indexed. |
| `careers/{city}` | 173 | 100% | Noindex; keep one `/careers` hub. |

This trims the indexable surface from 3,558 → ~1,000 high-quality URLs and lets crawl budget concentrate on T1/T2.
