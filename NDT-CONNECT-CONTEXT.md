# NDT-Connect — Living Project Context

> **This is the single source of truth for the NDT-Connect SEO/growth project.**
> **READ THIS FILE FIRST at the start of every session.** Then continue with whatever task the user names next, or the top unchecked item in the **Task Queue** below.
> **UPDATE THIS FILE as work happens — do NOT create new plan/strategy `.md` files.** Fold every update in here: refresh *Current State*, tick the *Task Queue*, and append one line to the *Change Log*.

---

## 1. Product & goal
NDT-Connect.com — a free SaaS platform for the Non-Destructive Testing industry. Free tools (AI procedure generator, certificate & calibration **expiry email alerts**, equipment tracker), free signup. **Goal: 100,000 organic clicks/month.** Primary market: **United States**. Sister site `atlantisndt.com` (consulting/training) shares the keyword universe.

**Honest trajectory:** 100k/mo is an 18–30 month compounding goal, gated on **backlinks/authority + indexing**, not content volume. Realistic milestones: ~300–600/mo by 90 days, 2–4k by 6 months, 12–25k by 12 months. Clicks arrive on Google's crawl→index→rank clock (days-to-weeks per page); we control inputs, not timing.

## 2. Current State (update each session)
- **As of 2026-05-24** (GSC 90d window ending 2026-05-21): ~29 clicks/28d, 3,049 impressions (+47% vs prior 28d), avg position 11.3 (was 26.7), **227 / 4,031 URLs indexed (6%)**. US = 54% of impressions.
- **Git:** `main` @ `a503483` (first clean-building commit was `196c6e8`). Uncommitted in root: `register-seo-task.bat`, this context file.

## 3. Live automation (already running)
- **Windows Task `NDTConnectDailySEO`** — daily 9:00 AM → `seo-analysis/daily-seo-push.ps1` → **2000 URLs/day** to Google Indexing API + IndexNow + weekly sitemap. Runs interactively (only when logged in). This is the workhorse.
- **Cowork task `ndt-connect-daily-seo-sprint`** — daily 7:00 AM, **tracking only** (refreshes dashboard, reports 24h submission count + GSC deltas). Does NOT submit.
- **Cowork task `ndt-connect-weekly-seo`** — Mondays 8:00 AM, full GSC pull + week-over-week deltas.
- **Dashboard:** `GROWTH-PLAN-2026-05-24/dashboard.html` (regenerate with `python3 seo-analysis/gen_dashboard.py`).

## 4. Existing deliverables (reference — do NOT recreate)
- `GROWTH-PLAN-2026-05-24/NDT-Connect_SEO-Growth-Strategy_2026-05-24.docx` — full strategy/roadmap.
- `GROWTH-PLAN-2026-05-24/NDT-Connect_Keyword-Page-Opportunities_2026-05-24.xlsx` — opportunity data, 2,547-query demand pool, path-to-100k model.
- `GROWTH-PLAN-2026-05-24/dashboard.html` — live tracker.

## 5. Diagnosis (why traffic is low)
1. **CTR leak** — pages rank pos 3–8 but ~0% CTR. Titles already rewritten 2026-05-15; recovery pending data-lag + indexing.
2. **Indexing ceiling** — 227/4,031. Two causes: *"URL unknown to Google"* (crawl-budget/authority) and *"crawled, currently not indexed"* (thin). 80% of sitemap was 3 thin programmatic families.
3. **Narrow keyword footprint** — must own the informational NDT category. NDT-Connect ALREADY has deep content (8 method guides, 10 `/pillars`, 10 `/learn` how-tos, comparisons, standards, glossary in `lib/content/authored/`) — it's young/unindexed, not missing. So authority + indexing beat adding pages.

## 6. KEY TECHNICAL GOTCHAS (read before editing code)
- **The Edit/Write tools TRUNCATE large files on this Windows mount** (silently broke the build on `lib/seo-data.ts` ~594 lines and the free-tools route files). For any file >~150 lines: do NOT use Edit/Write. Instead `git show HEAD:path > /tmp/f`, patch in `/tmp` with python/sed, then `cat /tmp/f > path`. **ALWAYS verify after writing:** `wc -l`, brace balance (`grep -o '{' f|wc -l` vs `}`), and `tail`.
- **Git working tree has massive pre-existing CRLF/LF churn (489 files).** NEVER `git add -A`. Stage only intended files by path. Strip CR to match committed LF: `sed -i 's/\r$//' file` (check first: `git show HEAD:file | head -1 | grep -q $'\r'`).
- **Mounted FS blocks `unlink`**, so git leaves stale `.git/*.lock`. Clear before EACH git op: `for L in $(find .git -maxdepth 2 -name "*.lock"); do mv "$L" "$L.x$(date +%s%N)"; done` (rename works, delete doesn't).
- Commit: `git -c user.name="Anoop" -c user.email="anu.anoop485@gmail.com" commit ...`. Push: `git push "https://<GITHUB_TOKEN>@github.com/anoop-1/NDT-Connect-v2.git" main` (**token is in `Tokens.docx`, gitignored — never paste it into tracked files**). Vercel auto-deploys `main` and only promotes builds that compile, so a broken push fails safely.
- Sandbox python deps: `pip install --break-system-packages google-api-python-client google-auth google-analytics-data pandas openpyxl`. **Never name a script `inspect.py`** (shadows stdlib).

## 7. SEO pipeline map (`seo-analysis/`)
- `credentials/` — 10 GSC service-account keys (200 Indexing-API calls/key/day = 2000/day). `submit-urls.py` checkpoints state every 5 submissions; 7-day per-URL recrawl guard.
- Scripts: `pull-gsc.py`, `gen_dashboard.py`, `submit-urls.py`, `submit-indexnow.py`, `daily-seo-push.ps1`.
- GSC property = **URL-prefix `https://ndt-connect.com/`** (NOT sc-domain). atlantis = `sc-domain:atlantisndt.com`.
- Content lives in `lib/content/authored/{methods,pillars,learn,comparisons,standards,glossary,industries,...}` (typed, high quality). **Certifications** are enriched in `lib/seo-data.ts`. Routes: `/methods/[slug]`, `/pillars/[slug]`, `/learn/[slug]`, `/certifications/[slug]`, `/compare/[slug]`, `/blog/<slug>`.

## 8. CONTENT QUALITY BAR (non-negotiable)
Match the existing authored content: **1,500+ words, real citations [1][2], physics + procedure depth, genuinely unique per page.** NEVER ship thin/templated pages — that is exactly what got 3,454 pages deindexed. Quality over quantity, always. Verify facts via web search; do not fabricate fees, pass rates, or code clauses.

## 9. TASK QUEUE (work top-down; check off + log when done)
- [x] **API 653 tank-inspection deep guide** — DONE 2026-05-24 (commit 3291563): /pillars/tank-inspection-pillar — highest post-cert demand (api 653 = 379 impr, tank inspection = 221, certification = 168). Likely a `/blog` or `/pillars` cornerstone or enrich existing.
- [x] **CWI cert page DONE 2026-05-24 (36fb1bb). [ ] next: **CWI deeper /  (AWS Certified Welding Inspector) guide** — high demand, currently only a blog stub.
- [x] **Eddy-current / heat-exchanger tube inspection** — DONE 2026-05-24 (b50aca4): /pillars/heat-exchanger-tube-inspection-pillar — "eddy current testing" 712 impr on atlantis at pos 52; huge headroom.
- [ ] **MFL pipeline inspection content** — "mfl pipeline inspection service" 315 impr.
- [ ] Expand method/comparison hubs; tighten internal-link graph (every cornerstone links 3 siblings + the relevant tool).
- [ ] **Backlink / authority program** — NDT.org, ASNT & AWS directories; pitch the free tools + a salary/statistics report. (This is the true gate on indexing & ranking.)

## 10. CHANGE LOG (append one line per session)
- **2026-05-24** — Initial context file created. Shipped: canonical domain fix (`a52834f`), free-tool geo noindex + de-sitemap (`d28ab70`→fixed `196c6e8`), ASNT (`d43de3b`) + API 510/570/653 (`a503483`) cert enrichment. Set up Windows 2000/day task + cowork tracking/weekly tasks + dashboard.
- **2026-05-24 (cont.)** — Added living context file + pointed CLAUDE.md to it. Authored API 653 / storage-tank inspection pillar hub (`3291563`) -> /pillars/tank-inspection-pillar; submitted to Indexing API.

## 11. ROOT CAUSE FOUND 2026-05-24 — why the 3,500 weren't crawled
GSC had the WRONG sitemap registered: `/sitemap.xml` (which 404s/returns empty under the split-sitemap layout) — GSC showed errors=1, indexed=0, lastDownloaded 2026-05-17. The WORKING sitemap is `/sitemap-index.xml` (per app/sitemap-index.xml/route.ts and robots.txt). Sitemap discovery is a SEPARATE channel from the Indexing API, so 3 months of Indexing-API pushes never compensated for the broken sitemap. FIXED: submitted /sitemap-index.xml to GSC + deleted broken /sitemap.xml (now pending, errors=0). Also added missing `city-industries` bucket to the index route (commit after 36fb1bb). Secondary gates remain: low domain authority => small crawl budget; Indexing API is only a weak hint for non-JobPosting pages. Real levers now: (1) fixed sitemap [done], (2) backlinks/authority, (3) prove value on a core set to grow crawl budget.
- **2026-05-24 (cont.)** — Added CWI cert page (36fb1bb). FOUND+FIXED root-cause sitemap mis-registration (broken /sitemap.xml -> working /sitemap-index.xml in GSC) + added city-industries to index. This is the likely primary reason discovery stalled 3 months.
- **2026-05-24 (cont.)** — Authored heat-exchanger tube inspection pillar (b50aca4) -> /pillars/heat-exchanger-tube-inspection-pillar; submitted to Indexing API. Confirmed crawl timeline expectation for the 4,031 (discovery days; indexing weeks-months, partial, gated on authority).

## 12. SATELLITE BACKLINK NETWORK (audited 2026-05-24)
15 satellite sites in `satellites/<name>/` (Next.js 14, ~36 pages each), deployed as separate Vercel projects under team `team_RvIKW6PFuuliC77dktstAJmQ` on `<name>.vercel.app`. Sites: tank-inspection-guide, weld-inspection-pro, ndt-standards-reference, pressure-vessel-inspection, pipeline-integrity-hub, aerospace-ndt-center, corrosion-engineering-guide, offshore-ndt-guide, ut-testing-academy, rt-testing-hub, ndt-career-portal, industrial-coating-inspection, ndt-equipment-reviews, ndt-safety-compliance, ndt-digital-technology. (13 have .vercel/project.json; ndt-equipment-reviews + ndt-safety-compliance do NOT.)

**Audit findings:** (1) ALL outbound links pointed to the WRONG domain `ndtconnect.com` (no hyphen) — 12,870 dead-404 instances; the entire network was contributing ZERO authority. FIXED 2026-05-24 (commit d8c179d): network-wide `ndtconnect.com`->`ndt-connect.com` across 555 files. (2) Deployed once in March via CLI (actor=claude); NOT git-linked, so a GitHub push does NOT redeploy them — they need an explicit `vercel --prod` per satellite. So the live sites still show old/broken links UNTIL redeployed. (3) `live:false` on projects; only 1 deployment each since March.

**Deploy mechanism:** run `deploy-all-satellites.ps1` (repo root, uncommitted, holds Vercel token) on the PC — loops `npx vercel --prod` over each satellite dir using its .vercel link. (Sandbox can't deploy: CLI install + remote build exceed the 45s shell cap.) BETTER long-term: git-link each Vercel project to repo anoop-1/NDT-Connect-v2 with rootDirectory=satellites/<name> so pushes auto-deploy.

**PBN caveat:** a same-owner keyword-domain network all linking to the money site is a classic PBN footprint; Google may discount or penalize. Fixing dead links is correct hygiene, but durable authority = genuinely useful sites + third-party editorial links.

**Next on satellites:** add links to NEW cornerstones (/pillars/tank-inspection-pillar, /pillars/heat-exchanger-tube-inspection-pillar, /certifications/cwi-certification) from the topically-matched satellites; then redeploy.
- **2026-05-24 (cont.)** — Audited satellite network: all 15 had dead ndtconnect.com links (12,870 instances). Fixed network-wide (d8c179d, pushed). Live sites need redeploy via deploy-all-satellites.ps1 (not git-linked). Documented in section 12.
- **2026-05-24 (cont.)** — Launched deploy-all-satellites.ps1 on the PC; confirmed first deploy (tank-inspection-guide dpl_C1sWQu9q, commit d8c179d) QUEUED on Vercel. All 15 redeploying with fixed links (~30 min). Verify: Vercel dashboard or list_deployments per project should show a new READY deploy dated 2026-05-24. To re-run anytime: the .ps1 in repo root.

## 13. VERCEL FREE-TIER FIX (2026-05-24)
Overage seen: ISR Reads 2.1M/1M, Fast Origin Transfer 16.26GB/10GB. ROOT CAUSE: every dynamic route had `dynamicParams` unset (default true) → URLs not in generateStaticParams were generated ON-DEMAND at request time = ISR reads + origin transfer; with Googlebot + 2,000/day Indexing pings crawling thousands of pages this ballooned. NOTE: this is a RUNTIME serving cost, NOT a deploy cost — git-vs-CLI deploy does not affect it.
FIX (commit 175739e): added `export const dynamicParams = false;` to all 26 programmatic routes (cost-guide, ndt-services, ndt-services/industries, free-tools geo, careers, training, glossary, standards, compare, methods, pillars, learn, certifications, etc.). Pages now serve as pure static from CDN → ~zero ISR reads, minimal origin transfer. SAFE: verified generateStaticParams == sitemap (cost-guide/ndt-services method lists == the 6 cityMethods exactly); all routes are data-driven from the same canonical sources as the sitemap, so no valid URL 404s. Main app is git-linked → push auto-rebuilds static.
FOLLOW-UP if still over: apply the same `dynamicParams=false` to satellite app/[slug] routes (smaller contributor: 540 pages vs main 4,031).

## 14. SATELLITE CORNERSTONE LINKS + AUTO-DEPLOY (2026-05-24)
- commit ddeaefe: added topically-matched cornerstone links (to /pillars/tank-inspection-pillar, /pillars/heat-exchanger-tube-inspection-pillar, /certifications/cwi|asnt|api-*, /methods/*) on all 15 satellite homepages with varied anchors; committed .vercel/project.json for all 13 linked projects; added .github/workflows/deploy-satellites.yml (auto-deploys all satellites on push to satellites/**, needs repo secret VERCEL_TOKEN).
- USER ACTION NEEDED: add GitHub repo secret VERCEL_TOKEN (Settings -> Secrets and variables -> Actions) = the Vercel token in Tokens.docx, so the Action can deploy. Until then, deploy via deploy-all-satellites.ps1 on the PC.

## GIT/FS NOTE (additional)
The mounted FS corrupts the git index during large multi-file `git add` (bad signature 0x00000000). Mitigations: use `git -c gc.auto=0 add/commit` (disables auto-gc that triggers the FS-unlink failures); stage in modest batches. To recover a corrupt index: `mv .git/index .git/index.bad; git read-tree HEAD` (working tree is unaffected).
- **2026-05-24 (cont.)** — Satellite cornerstone links + GitHub auto-deploy workflow (ddeaefe). Vercel free-tier fix: dynamicParams=false on 26 routes -> fully static, kills on-demand ISR (175739e). Action item: add VERCEL_TOKEN GitHub secret.
- **2026-05-24 (cont.)** — Verified rendering split per user spec: SEO content routes STATIC (dynamicParams=false 175739e), user dashboard/app routes DYNAMIC (untouched — no generateStaticParams; the 2 [id] routes in 175739e were EOL-churn only, NOT statified). Satellites confirmed ALREADY fully static (individual static route files, 0 revalidate/force-dynamic/dynamic-fns) — no change needed; they never drove ISR reads. The over-limit ISR Reads + Fast Origin Transfer were 100% main-app on-demand ISR, now fixed.
- **2026-05-24 (cont.)** — Found repo had 0 Actions secrets (VERCEL_TOKEN was NOT configured despite token being in docs). Added VERCEL_TOKEN repo secret via GitHub API (sealed-box encrypted, value = Vercel token from NDT Connect/Tokens.docx). Triggered deploy-satellites workflow_dispatch: all 15 matrix jobs running (prior push run had failed for missing secret). Satellite auto-deploy on push to satellites/** is now LIVE. Note: ndt-equipment-reviews + ndt-safety-compliance lacked .vercel/project.json so CI may create new projects for them — verify/relink if duplicates appear.
- **2026-05-24 (cont.)** — Verified main-app fix LIVE: ndt-connect-v2 prod deploy = commit 175739e (dynamicParams=false), state READY. So new ISR reads from main app ~0. KEY: Vercel usage is CUMULATIVE per billing cycle — the 2.1M ISR reads / 16GB already accrued this cycle won't drop until reset; fix prevents FUTURE overage only. ALSO DISCOVERED: ~50 Vercel projects on team (15 repo satellites + main app + ~33 older satellite-style sites NOT in repo, created Feb-Mar). Free/Hobby tier aggregates usage across all 50 + prohibits commercial use → inherent tension with 50 sites + 2000/day crawl. Options: wait for cycle reset, pause/delete unused projects (user decision), reduce crawl, or upgrade to Pro. Static fix shifts main-app load from ISR-reads(over) to Edge-Requests(was 615K/1M).

- **2026-05-25** — VERIFICATION PASS (no code changes). (1) Confirmed `dynamicParams=false` present on all 26 programmatic SEO/content routes; the two interactive routes (provider-dashboard/requests/[id], track-request/[id]) are `"use client"` and correctly left dynamic — none wrongly statified. (2) All 15 satellites confirmed fully static (0 revalidate/force-dynamic/dynamic-fns). (3) Vercel: all 15 satellite projects exist on team_RvIKW6PFuuliC77dktstAJmQ; project IDs match committed .vercel/project.json (incl. ndt-equipment-reviews + ndt-safety-compliance, which now have valid linkage and did NOT spawn duplicate projects). Each has a READY production deployment from the 2026-05-24 deploy-satellites Action run (single ~30-min matrix window). Projects auto-deploy via the GitHub Action (`vercel deploy --prod`, VERCEL_TOKEN secret confirmed present), NOT native Vercel git-link — this is the intended mechanism (option a). No native git-link/rootDirectory needed. Main ndt-connect.com Vercel config untouched.
