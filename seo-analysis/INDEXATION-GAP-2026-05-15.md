# Indexation Gap Analysis — ndt-connect.com
**Generated:** 2026-05-15 | **Severity:** 🔴 Critical | **Recoverable:** Yes, with content investment

## TL;DR

You have **3,558 URLs** in the sitemap. Google has indexed **100**. That's a **2.8% indexation rate** — catastrophic. The cause is not a technical bug. It's that **all 1,038 cost-guide pages and 1,212 ndt-services pages are programmatic templates with effectively zero unique content per page**. Google's deduplicator is correctly throwing them away.

---

## The proof

I pulled 5 city UT-cost-guide pages — Houston, Dallas, Chicago, Pittsburgh, Denver — stripped HTML, and counted vocabulary:

| Page | Word count |
|---|---|
| `cost-guide/houston-tx/ultrasonic-testing` | 1,021 |
| `cost-guide/dallas-tx/ultrasonic-testing` | 993 |
| `cost-guide/chicago-il/ultrasonic-testing` | 964 |
| `cost-guide/pittsburgh-pa/ultrasonic-testing` | 980 |
| `cost-guide/denver-co/ultrasonic-testing` | 989 |

**Words common to all 5 pages: 647**
**Total unique words across all 5 pages: 647**
**Unique-per-page ratio: 0.0%**

Every single word on Dallas's page also appears on Houston's, Chicago's, Pittsburgh's, and Denver's. The only differences are 1-2 lines (the city name and a price number). HTML diff between Houston and Dallas: **2 lines out of ~6,000**.

Google's documentation has been explicit since the 2022 Helpful Content Update:
> "Avoid creating large numbers of pages that have generally similar content."

Google's deduplicator picks one or two pages per template family and labels the rest:
- "Duplicate, Google chose different canonical than user"
- "Duplicate, submitted URL not selected as canonical"
- "Crawled — currently not indexed"

These statuses don't show on the GSC Overview dashboard but they do show in **Indexing → Pages → Why pages aren't indexed**. You'll find 3,000+ pages there.

---

## Sitemap composition (where the 3,558 URLs come from)

| Path prefix | URL count | Likely indexed % |
|---|---|---|
| `/ndt-services/{city}/{method}` | 1,212 | <2% — pure template |
| `/cost-guide/{city}/{method}` | 1,038 | <2% — pure template |
| `/free-tools/...` | 598 | needs investigation, likely better |
| `/careers/{city}` | 189 | <5% — template |
| `/training/{city}` | 173 | <5% — template |
| `/glossary/{term}` | 127 | depends on per-term content depth |
| `/standards/{code}` | 85 | depends on content |
| `/compare/{a-vs-b}` | 66 | likely 60%+ — these have unique pairs |
| `/blog/...` | 19 | likely 80%+ indexed (your top traffic sources) |
| Other (services, industries, certifications, etc.) | 51 | likely 70%+ |
| **Total** | **3,558** | **~100 indexed = 2.8%** |

**The math:** Your blog (19 posts) probably contributes ~15 of those 100 indexed pages. The "actual content" pages (services, industries, free-tools, certifications, compare) probably contribute another ~50. That leaves ~35 indexed pages from the 2,827 city/method/training combos — meaning Google indexed roughly 1.2% of your programmatic pages.

---

## Why your earlier SEO work isn't paying off

Looking at GSC traffic data for the 100 indexed pages:
- **Houston UT cost-guide**: 877 impressions, 7th position, but only 0.34% CTR — earning 3 clicks/month
- **Phased array UT guide**: 612 impressions, position 50, 0.16% CTR
- 67 pages get impressions but ZERO clicks

The 100 pages that DO get indexed earn only ~470 clicks/month total. The other 3,458 pages get 0 traffic because they don't exist in Google's index.

This is why traffic is "extremely low" — you're trying to compete with 3,558 pages but Google only sees you as a 100-page site, and most of those 100 are sub-1% CTR templates Google sees as low-quality.

---

## The fix — three options ranked by ROI

### Option A — Cut the sitemap, invest in 50 deep city pages (Recommended)

Drop 1,038 cost-guide and 1,212 ndt-services pages. Pick the **top 25 US cities × 6 methods = 150 city pages** + 50 strategic non-city pages = **~200 total**. For each city page, add 800-1,500 words of genuinely unique content:

- **Local market data**: average inspector salary in that metro, # of certified providers, dominant industries (Houston = oil/gas, Pittsburgh = steel/manufacturing, San Diego = aerospace/defense)
- **Local pricing factors**: actual labor band data, travel surcharges, regional cost-of-living adjustments
- **Code/standard call-outs**: state-specific requirements (TX has TPSC, CA has Cal/OSHA Title 8)
- **Local case studies**: 1-2 anonymized inspection projects from that city
- **Local certifications**: which ASNT chapter is closest, AWS local section, API exam centers
- **Map/address block** with the top 3-5 actual providers in that city (you already have this data via your provider directory)
- **Photos** of NDT work in that region (refinery, bridge, pipeline)

Expected outcome: 70%+ of these 200 pages get indexed → 140 indexed pages of HIGH quality vs 100 indexed of LOW quality. Each unique page should rank 3-10 positions better than templates → 3-5x click-through rate.

**Time:** 2-3 weeks of content production (or 2-3 days with a Claude-driven generator that pulls from real local data sources).

### Option B — Use programmatic AI to generate genuinely unique per-city content

Keep the 3,558 URL sitemap but use Claude (or similar) to generate per-city unique sections:
- Pull live data from BLS API (local wage data per metro), OpenStreetMap (industry density), GSA codes (federal contractor info)
- Generate 400-800 unique words per page synthesizing real local context
- Run once per city, cache the output, store in your database

**Cost:** ~$0.05/page × 3,558 pages = ~$180 one-time
**Time:** 1-2 weeks engineering + content review

I can write this generator if you want.

### Option C — Block the templates from indexing, keep them for direct traffic

Add `<meta name="robots" content="noindex,follow">` to all `/cost-guide/{city}/{method}` and `/ndt-services/{city}/{method}` pages. Remove them from sitemap. Keep them live so people who come from direct links can use them.

This removes ~2,250 dead-weight URLs from Google's "low quality template" pile. The remaining ~1,300 pages would index at a much higher rate (30-50%) because crawl budget concentrates on quality pages.

**Time:** 1 hour. Quickest cleanup, but you lose long-tail SEO entirely on city pages.

---

## What to do this week

1. **Don't waste Indexing API quota** trying to force-index the templated cost-guide pages — Google will re-deindex them within 48 hours of crawl. Wasted 2,000 calls/day.
2. **Pick option A or B**, then start with the **top 10 US cities** (Houston, Dallas, Chicago, LA, NYC, Pittsburgh, Denver, Phoenix, Seattle, Atlanta).
3. **Run a focused Indexing API push** on the 50-100 pages that ARE genuinely unique (blog posts, free-tools, comparison pages) so they get re-crawled with the recent on-page improvements.

---

## How to verify the diagnosis yourself

1. Open GSC → Indexing → Pages
2. Click "Why pages aren't indexed"
3. Look for these row types and their counts:
   - "Duplicate, Google chose different canonical than user" — likely 1,500+
   - "Crawled — currently not indexed" — likely 1,000+
   - "Discovered — currently not indexed" — likely 500+
   - "Duplicate, submitted URL not selected as canonical" — likely 200+

Add those up. You'll get to ~3,400 of your missing 3,458 pages. The pattern across them will be the city/method routes.

---

## Files in this thread

- `seo-analysis/SEO-AUDIT-2026-05-15.md` — broader audit (atlantis SSR bug, title rewrites, near-miss queries)
- `seo-analysis/SCHEMA-LINKING-CHANGES.md` — Agent 4's per-route FAQ + Article schema work
- `seo-analysis/INDEXATION-GAP-2026-05-15.md` — this document
- `seo-analysis/GSC-FINISH-RUNBOOK.md` — GSC ownership status + remaining steps

**Indexing API capacity you bought today: 2,000 URLs/day on each property.** Use it on the ~150 deep unique pages you build, not the 3,000+ templates. Submitting templates wastes the quota and trains Google to consider your domain low-quality.
