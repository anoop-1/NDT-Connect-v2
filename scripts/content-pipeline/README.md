# Content Pipeline — Daily Authored Content

Generates 300 hand-authored long-form pages per day for 10 days, totalling 3000 new authored URLs alongside the existing programmatic SEO corpus.

## How it works

1. **`slug-plan.py`** generates `daily-plan.json` — 3000 unique slugs across 12 combinatorial buckets (method × industry, method × state, defect × method, code × industry, etc.). Each slug has a one-paragraph brief.

2. **`orchestrate.py`** is the daily runner. Each invocation:
   - Reads `state.json` to find today's pending slugs.
   - For each slug, calls Anthropic API (default model: `claude-haiku-4-5`) with the binding `STYLE_GUIDE.md` + the `CombinedTopicContent` type definition as system prompt.
   - Parses the returned TypeScript, validates (slug match, word count ≥ 1200, faqs present, default export).
   - Writes `lib/content/authored/topics/{slug}.ts`.
   - Runs 6 generations in parallel.
   - When the day's batch is done: `git add`, `commit`, `push`. Then submits new URLs to Google Indexing API and IndexNow.
   - Advances `state.json.current_day` only when every slug in the day's plan has resolved (success or recorded failure).

3. **`daily-content.ps1`** is the Windows Task Scheduler entrypoint. Sets up Python, logs to `daily-YYYY-MM-DD.log`, calls `orchestrate.py`.

## Setup

1. Set `ANTHROPIC_API_KEY` in machine environment (System Properties → Environment Variables).
2. Generate the plan once: `python scripts/content-pipeline/slug-plan.py`.
3. (Recommended) Dry-run for a few pages first:
   ```
   $env:CONTENT_DRY_RUN='1'
   $env:CONTENT_PAGES_PER_DAY='5'
   python scripts/content-pipeline/orchestrate.py
   ```
4. Schedule the daily task (see header of `daily-content.ps1` for the exact `Register-ScheduledTask` command).

## Cost estimate

- Default model `claude-haiku-4-5`, ~3000 output tokens/page × 300 pages/day × 10 days = 9M output tokens.
- At ~$5/M output tokens, total ≈ $45 across the run.
- Sonnet upgrade for better voice: ~$210 total.

## Quality gates

`orchestrate.py` rejects pages that fail any of:
- No `export default`
- Slug string not present in module
- Missing `faqs:` field
- Total word count below 1200

Rejected slugs go to `state.failed_slugs` and can be retried by clearing them from state and re-running.

## What gets generated

Each page conforms to `CombinedTopicContent` (defined inline in the system prompt). They render through the new `/topics/[slug]/page.tsx` route via the shared `ContentPage` shell. Schema: `Article` + `FAQPage`.

## Why this is not programmatic SEO

- Each page is uniquely written by an LLM with a unique brief targeting a real distinct user query.
- Word count floor 1200 (most land 1800-2400).
- Cites real codes with section numbers, real equipment names, real damage mechanisms.
- Renders through the same authored-content shell as the hand-built day-1 pages.
- Voice rules in `STYLE_GUIDE.md` reject filler.

Programmatic SEO substitutes variables in a template; this substitutes prompts in a model. The output is structurally different per page.

## Manual run

```powershell
# Force a specific day (debug only)
$env:CONTENT_PAGES_PER_DAY='10'
python scripts\content-pipeline\orchestrate.py

# Reset day pointer
# Edit state.json: { "current_day": 1, "completed_slugs": [], "failed_slugs": [], "last_run": null }
```
