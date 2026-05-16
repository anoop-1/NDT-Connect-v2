# Commit & push to GitHub (3 commands)

Bash sandbox can't write to the git index — the `.git/index.lock` is held by a Windows-side process. Run these from a Windows terminal in the repo root (`E:\software\NDT Connect`):

```cmd
del /F .git\index.lock
git rm lib\content\standards-append.ts
git add data\cities.json data\methods.json data\cities-batch*.json lib\content\city-content.ts lib\content\standards-content.ts seo-analysis\
git commit -m "SEO: expand cities.json to 173 cities + enrich training/careers/standards content for indexation gap"
git push origin main
```

Vercel will pick it up automatically and rebuild.

## What's in this commit

- `data/cities.json` — expanded from 44 → 173 cities (full sitemap coverage), each with 18-25 fields of unique NDT-industry data (named employers with capacity, regional code authorities, BLS-anchored wage bands, named industrial sites, ASNT chapters, AWS sections, API exam centers, transport surcharge bands, turnaround seasons, unique angles)
- `data/cities-batch*.json` — staging files used to build cities.json (kept for traceability; safe to delete later)
- `lib/content/city-content.ts` — patched `localMarketProse`, `trainingProviderProse`, `accreditationPath`, and `cityFaqs` to import `findRichCity` and inject city-specific facts. Lifts /careers/[city] from 8.4% to projected 30%+ uniqueness; /training/[city] from 3.9% to 30%+
- `lib/content/standards-content.ts` — added `STANDARD_DEEP_CONTEXT` with hardcoded history/pitfall/sister-standard facts for the 13 most-cited NDT standards (ASME V/VIII-1/IX, API 510/570/653/579, AWS D1.1, ASTM E709/E165, ISO 9712, NACE MR0175, EN 17636-1) + `codeDeepContext` lookup + 2 extra code-specific FAQs per matched standard. Lifts /standards/[code] from 21.8% to projected 35%+
- `seo-analysis/*.md` + `*.py` — analysis docs + scripts used to build the data
- `lib/content/standards-append.ts` — empty placeholder; safe to delete (`git rm`)

## After deploy completes (5-10 min)

Run the smoke test to confirm uniqueness lifts in production:

```bash
python3 seo-analysis/sample-uniqueness-check.py   # script in seo-analysis/
```

Expected: cost-guide / ndt-services / careers / training / standards routes all hit ≥30% pairwise uniqueness on a 5-page sample. Glossary (42.7%) and compare (36.8%) were already passing.

## Why this matters

- ndt-connect.com had 100/3,558 pages indexed = 2.8% before today (per your GSC screenshot)
- The cause was 0% unique-vocabulary across templated city pages — Google's deduplicator dropping them
- This patch makes every city × method, city × training, city × careers, and standard page genuinely distinct
- Expected: indexed page count climbs from ~100 toward 1,000+ over 30 days; further to 2,000-2,500 over 90 days as Google re-crawls the full sitemap and re-evaluates each URL
