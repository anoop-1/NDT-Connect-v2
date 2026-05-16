# NDT-Connect Content Rewrite Strategy — 2026-05-15

**Data window:** GSC 30-day (2026-04-13 → 2026-05-13). GA4 30-day (2026-04-14 → 2026-05-14, property `528251886`).
**Sitemap:** 3,557 URLs across 26 family buckets.
**Indexation reality:** Only **75 URLs** earned any GSC impressions in the last 30 days — roughly **2.1%** of the sitemap is "alive" in Google. The rest is either crawled-not-indexed, discovered-not-crawled, or simply ignored.

---

## 1. Headline diagnosis

The site has a classic **programmatic-SEO indexation gap**: huge templated families (cost-guide, ndt-services) shipped, but Google has only sampled ~2% of each family. Of the URLs Google did pick up, **average position is 5–18** — meaning the templates DO rank when indexed, they just aren't getting indexed at scale. This means the rewrite plan should target two outcomes simultaneously:

1. **Lift the already-indexed pages from pos 5–10 → pos 3–5** (immediate click upside)
2. **Strengthen each template enough that Google re-crawls and indexes the un-indexed siblings** (long-tail compound upside)

Ranking distribution of indexed pages (30d):
- Pos 1–3:  6 pages  (8%)
- Pos 4–10: 33 pages (44%)
- Pos 11–20: 24 pages (32%)
- Pos 21+:  12 pages (16%)

GA4 confirms search is the only meaningful organic acquisition channel: **19 organic search sessions vs 100 direct vs 8 referral** in 30d. Direct is dominated by team/internal traffic. Real organic floor is ~19 sessions/month — there is nowhere to go but up.

---

## 2. Top 5 highest-ROI URL families (rewrite first)

Estimates use a CTR curve of pos1=28%, pos2=15%, pos3=11%, pos4=8%, pos5=7%, pos6=5%, pos7=4%, pos8=3%, pos9=2.5%, pos10=2%, pos11+=1%.

### P1 — `cost-guide/{city}/{method}` (1,038 URLs, 18 indexed)
- **Current:** 1,015 impressions, 2 clicks, avg pos **5.22** in 30d
- **Top-earner:** `/cost-guide/houston/ultrasonic-testing` — 633 impr at pos 6.9, 0.3% CTR
- **Why P1:** Highest impression family on the entire site. Pages ALREADY rank in striking distance (pos 5). The CTR is broken (0.3% vs the 5–7% expected at pos 5) — meaning title/meta are not winning the click. A title rewrite alone (commercial intent + USD price range + city) should triple CTR before any content work.
- **Modeled upside (rewrite indexed pages only):** 1,015 impr × (7% target CTR − 0.3% current) = **+68 clicks/mo**
- **Modeled upside (if Google indexes 50% of remaining 1,020 siblings at similar density):** 1,015 / 18 × 510 × 0.5 = ~14,400 projected impr × 6% CTR = **+860 clicks/mo at maturity (3-6 mo)**

### P2 — `ndt-services/{city}/{method}` (1,038 URLs, 33 indexed)
- **Current:** 420 impressions, 4 clicks, avg pos **9.96** in 30d
- **Top-earner:** `/ndt-services/los-angeles/ultrasonic-testing` — 109 impr at pos 33 (terrible — needs intent rebuild)
- **Why P2:** Largest indexed footprint (33 URLs already ranking). Position is borderline page-2 — a content depth pass + internal linking from cost-guide siblings should pull these to page 1.
- **Modeled upside (indexed pages, lift pos 10 → pos 5):** 420 × (7% − 2%) = **+21 clicks/mo immediate**
- **Modeled upside (full family at maturity):** 420 / 33 × 519 × 0.5 = ~3,300 projected impr × 5% CTR = **+165 clicks/mo at maturity**

### P3 — `compare/{method-vs-method}` (66 URLs, 4 indexed)
- **Current:** 246 impressions, 0 clicks, avg pos **10.39** in 30d
- **Top-earner:** `/compare/radiographic-testing-vs-phased-array-ut` — 171 impr at pos 10, **0% CTR**
- **Why P3:** Comparison queries have very high commercial intent and the family is small enough to fully rewrite this sprint. 0 clicks at 246 impressions = title is invisible. This is the cheapest fix per click on the whole site.
- **Modeled upside:** 246 × 7% (target pos 5) = **+17 clicks/mo** with another **+25/mo** when remaining 62 pages get indexed.

### P4 — `glossary/{term}` (127 URLs, 5 indexed)
- **Current:** 65 impressions, 0 clicks, avg pos **11.72** in 30d
- **Why P4:** Definitional queries are easy wins (low competition, schema-eligible — `DefinedTerm`). Adding FAQ schema + a 200-word "Quick answer" box gets these into featured snippets.
- **Modeled upside:** **+10 clicks/mo immediate, +50/mo at family maturity**

### P5 — `standards/{code}` (85 URLs, 2 indexed)
- **Current:** 51 impressions, 1 click, avg pos **6.96** in 30d
- **Why P5:** Already on page 1. Pages target high-intent procurement keywords ("AWS D1.5", "ASME V"). Best-in-class structured data + a downloadable checklist will close the gap to pos 3.
- **Modeled upside:** **+8 clicks/mo immediate, +40/mo at family maturity**

### Total modeled recovery (P1–P5)
- **30-day quick wins (rewrite indexed pages only):** ~120 clicks/mo
- **3–6 month maturity (assuming Google indexes 50% of remaining siblings):** ~1,150 clicks/mo
- That's a **~60×** lift from the current 19 organic sessions/month baseline

---

## 3. Families to noindex / consolidate

These should be removed from sitemap or `<meta name="robots" content="noindex">`'d — they're either thin programmatic content with no demand, or they dilute crawl budget away from P1–P5:

| Family | URLs | Why noindex |
|---|---|---|
| `free-tools/{city}/{method}` | 594 | 30d data: 4 impressions across 594 URLs. Demand is essentially zero on the city × method matrix. Keep `/free-tools/{tool}` hub pages, noindex the city/method explosions. |
| `careers/{city}` past index 1 | 172 of 173 | 1 page indexed (italy) earned 15 impr; the other 172 are not getting picked up. Better to consolidate into `/careers` with city filtering than to keep 173 thin pages. |
| `training/{city}` past index 3 | 170 of 173 | Same dynamic — 10 impressions across 173 URLs. Consolidate or noindex tail. |
| Long-tail city pages with no commercial NDT market | ~50–80 | E.g. small US/Canadian metros without any local NDT shops. Run a local-business-density check; noindex everything below 5 indexable providers. |

**Crawl budget reclaimed:** ~900 URLs — that capacity should redirect to the cost-guide and ndt-services rewrites where every additional indexed sibling is worth ~$$.

---

## 4. One-week sprint plan

**Goal:** Ship rewrites for the entire P3 family + the top-30 highest-impression URLs of P1 + P2.

### Day 1 (Mon) — Setup + P3 (compare pages)
- Lock template structure: H1 (intent-mirroring), 60-char title with comparison + use-case, 155-char meta with price/speed contrast, intro 75 words, comparison table, "When to choose A" / "When to choose B" sections, FAQ schema
- Rewrite all 4 indexed compare pages + the next 20 highest-priority compare URLs (ship 24 total)
- Resubmit sitemap; submit URLs to IndexNow

### Day 2 (Tue) — P1 cost-guide top-20
- Pull the 20 cost-guide URLs with highest 30-day impressions
- Rewrite titles to format: `{Method} Cost in {City} 2026 | $X-$Y per Foot/Hour`
- Add price-range table (per-foot, per-hour, per-square-foot), regional cost drivers, "Typical project size" examples, GeoCoordinates + Service schema
- Internal-link each cost-guide to its sibling `/ndt-services/{city}/{method}`

### Day 3 (Wed) — P2 ndt-services top-20
- Same 20 city/method pairs as Day 2, but the services side
- Add LocalBusiness schema with city geo, list of 3–5 nearby providers from `/find-providers`, equipment/standards section, "Get a quote" CTA above the fold
- Cross-link to cost-guide twin

### Day 4 (Thu) — P4 glossary + P5 standards
- Glossary (5 indexed + 25 high-search-volume terms): add `DefinedTerm` JSON-LD, "Quick answer" 50-word block, "Related methods" links
- Standards (2 indexed + 10 highest-volume codes): add downloadable checklist (PDF), TechArticle schema, side-by-side standard comparison links

### Day 5 (Fri) — Noindex sweep + monitoring
- Push `<meta robots="noindex,follow">` on the 4 families flagged in Section 3 (free-tools city/method, careers tail, training tail, low-density city pages)
- Update sitemap to drop noindexed URLs
- Submit ~60 priority URLs (rewritten this week) to GSC Inspect → Request Indexing manually + IndexNow
- Set up a weekly GSC re-pull cron to track movement

### Day 6–7 (weekend) — Buffer / QA
- Lighthouse + Rich Results test on every rewritten URL
- Verify internal-link graph: every cost-guide should link to its services twin and 3 nearby city siblings

---

## 5. Tracking & success metrics

Re-pull GSC weekly with `pull-gsc-30d.py`. Success thresholds at +30 days:
- **Indexed URL count:** 75 → **150+** (a doubling, by indexing siblings of rewritten templates)
- **Avg position of P1+P2 families:** 5.2 / 9.96 → **3.5 / 6.0**
- **Total 30d clicks:** ~17 → **80+**
- **CTR on cost-guide family:** 0.3% → **3%+**

If after 30 days the indexation count hasn't moved, the rewrite isn't differentiating enough — escalate to per-page unique data (real provider counts, real price ranges sourced from quotes).

---

## Appendix — Files produced this run

- `seo-analysis/output/ndt-connect-30d/queries.csv` (85 queries)
- `seo-analysis/output/ndt-connect-30d/pages.csv` (75 pages)
- `seo-analysis/output/ndt-connect-30d/query-page-pairs.csv` (92 pairs)
- `seo-analysis/output/ndt-connect-30d/country.csv` (96 countries)
- `seo-analysis/output/ndt-connect-30d/queries-near-miss.csv` (0 — explained: nothing is in the pos 11–30 + 50+ impr sweet spot at the moment, the long-tail isn't deep enough yet)
- `seo-analysis/output/ndt-connect-30d/pages-high-impr-low-ctr.csv` (1 row: the cost-guide/houston/ultrasonic-testing page — confirms P1 priority)
- `seo-analysis/output/ndt-connect-30d/pages-zero-clicks.csv` (63 pages — the rewrite worklist)
- `seo-analysis/output/ndt-connect-30d/acquisition-channels.csv` (GA4)
- `seo-analysis/output/ndt-connect-30d/top-landing-pages.csv` (GA4)
- `seo-analysis/output/REWRITE-PRIORITY.csv` (this strategy's source-of-truth ranking)
- `seo-analysis/pull-gsc-30d.py`, `seo-analysis/pull-ga4-30d.py`, `seo-analysis/build-priority.py` (the scripts)
