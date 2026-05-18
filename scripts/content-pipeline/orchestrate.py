"""Daily content orchestrator.

Reads `daily-plan.json`, picks today's batch (auto-advances), generates each
page via Anthropic API, writes the TypeScript module, then commits + pushes
+ submits the new URLs to GSC + IndexNow.

Run daily via Windows Task Scheduler or Claude `/schedule`:
    python scripts/content-pipeline/orchestrate.py

Env vars:
    ANTHROPIC_API_KEY     — required
    CONTENT_MODEL          — model id, default 'claude-haiku-4-5'
    CONTENT_PAGES_PER_DAY  — override default 300
    CONTENT_DRY_RUN        — set to '1' to skip writes + commits
"""
from __future__ import annotations

import json
import logging
import os
import re
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

REPO_ROOT = Path(__file__).resolve().parents[2]
PIPELINE_DIR = REPO_ROOT / 'scripts' / 'content-pipeline'
PLAN_FILE = PIPELINE_DIR / 'daily-plan.json'
STATE_FILE = PIPELINE_DIR / 'state.json'
LOG_FILE = PIPELINE_DIR / 'orchestrate.log'

STYLE_GUIDE = REPO_ROOT / 'lib' / 'content' / 'authored' / 'STYLE_GUIDE.md'
TYPES_FILE = REPO_ROOT / 'lib' / 'content' / 'authored' / 'types.ts'
OUTPUT_BUCKET = REPO_ROOT / 'lib' / 'content' / 'authored' / 'topics'
OUTPUT_BUCKET.mkdir(parents=True, exist_ok=True)

DEFAULT_MODEL = 'claude-haiku-4-5'
ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages'
MAX_OUTPUT_TOKENS = 4096
PER_PAGE_TIMEOUT_S = 90
PARALLEL_WORKERS = 6  # concurrent API calls

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s  %(levelname)-7s %(message)s',
    datefmt='%H:%M:%S',
    handlers=[
        logging.FileHandler(LOG_FILE, encoding='utf-8'),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger('orchestrate')


# ---------- state ------------------------------------------------------------

def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {
        'current_day': 1,
        'completed_slugs': [],
        'failed_slugs': [],
        'last_run': None,
    }

def save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state, indent=2))

def load_plan() -> dict:
    return json.loads(PLAN_FILE.read_text())


# ---------- Anthropic API ----------------------------------------------------

def build_system_prompt() -> str:
    style = STYLE_GUIDE.read_text(encoding='utf-8')
    types = TYPES_FILE.read_text(encoding='utf-8')
    return (
        'You are an ASNT Level III certified NDT engineer authoring long-form '
        'inspection content for ndt-connect.com. Your output is a single '
        'TypeScript module that exports a default object matching the '
        '`CombinedTopicContent` interface (defined below). Output ONLY the '
        'TypeScript module — no markdown fences, no commentary.\n\n'
        '## Style guide (binding)\n\n' + style +
        '\n\n## CombinedTopicContent interface\n\n'
        'You may import shared types from `../types`. Use this shape:\n\n'
        '```ts\n'
        'import type { Section, Faq, Citation, InternalLink } from "../types";\n'
        'export interface CombinedTopicContent {\n'
        '  slug: string;\n'
        '  bucket: string;\n'
        '  metaTitle: string;        // ≤ 65 chars, no brand suffix\n'
        '  metaDescription: string;  // 130-160 chars\n'
        '  title: string;            // H1, ≤ 70 chars\n'
        '  audience: string;\n'
        '  heroLede: string;         // 2 paragraphs, joined with \\n\\n\n'
        '  sections: Section[];      // 5-8 H2 sections\n'
        '  faqs: Faq[];              // 4+, each answer ≥ 60 words\n'
        '  citations: Citation[];    // 6+ real codes/standards\n'
        '  internalLinks: InternalLink[]; // 8+\n'
        '}\n'
        '```\n\n'
        '## Output format\n\n'
        '```ts\n'
        'import type { Section, Faq, Citation, InternalLink } from "../types";\n'
        'export interface CombinedTopicContent { ... } // same as above\n'
        'const topic: CombinedTopicContent = {\n'
        '  slug: "...",\n'
        '  bucket: "...",\n'
        '  // ... all required fields\n'
        '};\n'
        'export default topic;\n'
        '```\n\n'
        'Target 1800-2500 words across heroLede + section paragraphs + FAQs.'
    )


def call_anthropic(system: str, user: str, model: str, api_key: str) -> str:
    body = json.dumps({
        'model': model,
        'max_tokens': MAX_OUTPUT_TOKENS,
        'system': system,
        'messages': [{'role': 'user', 'content': user}],
    }).encode('utf-8')
    req = Request(
        ANTHROPIC_ENDPOINT,
        data=body,
        method='POST',
        headers={
            'x-api-key': api_key,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
        },
    )
    with urlopen(req, timeout=PER_PAGE_TIMEOUT_S) as r:
        payload = json.loads(r.read().decode('utf-8'))
    parts = payload.get('content', [])
    text = ''.join(p.get('text', '') for p in parts if p.get('type') == 'text')
    return text


# ---------- generation -------------------------------------------------------

def extract_typescript(raw: str) -> str:
    """Strip markdown fences if the model produced them."""
    m = re.search(r'```(?:ts|typescript)?\n(.*?)```', raw, re.S)
    if m:
        return m.group(1).strip()
    return raw.strip()

def validate_output(ts: str, slug: str) -> tuple[bool, str]:
    """Cheap sanity checks before writing."""
    if 'export default' not in ts:
        return False, 'no default export'
    if 'CombinedTopicContent' not in ts:
        return False, 'CombinedTopicContent type missing'
    if f'"{slug}"' not in ts and f"'{slug}'" not in ts:
        return False, f'slug "{slug}" not present in module'
    if ts.count('faqs:') == 0:
        return False, 'no faqs field'
    word_count = sum(1 for _ in re.finditer(r'\b[a-zA-Z]+\b', ts))
    if word_count < 1200:
        return False, f'word count too low ({word_count})'
    return True, 'ok'

def gen_one(entry: dict, system: str, model: str, api_key: str) -> tuple[bool, str, str]:
    slug = entry['slug']
    bucket = entry['bucket']
    brief = entry['brief']
    user = (
        f'Slug: {slug}\nBucket: {bucket}\nBrief: {brief}\n\n'
        'Write the TypeScript module for this page. Lead with a concrete '
        'inspection scenario. Cite real standards (API, ASME, ASTM, ISO, '
        'ASNT) with section numbers where confident. Include real defect '
        'mechanisms, real equipment names, real salary ranges where '
        'relevant. No filler. No banned phrases.'
    )
    try:
        raw = call_anthropic(system, user, model, api_key)
    except HTTPError as e:
        try:
            err_body = e.read().decode('utf-8', errors='replace')[:400]
        except Exception:
            err_body = ''
        return False, slug, f'api {e.code}: {err_body}'
    except Exception as e:  # noqa: BLE001
        return False, slug, f'api error: {e}'

    ts = extract_typescript(raw)
    ok, msg = validate_output(ts, slug)
    if not ok:
        return False, slug, f'validation failed: {msg}'

    target = OUTPUT_BUCKET / f'{slug}.ts'
    target.write_text(ts, encoding='utf-8')
    return True, slug, str(target.relative_to(REPO_ROOT))


# ---------- post-batch: commit + push + submit -------------------------------

def run(cmd: list[str], cwd: Path = REPO_ROOT) -> tuple[int, str]:
    p = subprocess.run(cmd, cwd=str(cwd), capture_output=True, text=True)
    out = (p.stdout + p.stderr).strip()
    return p.returncode, out

def git_commit_push(day: int, generated: int) -> None:
    if os.environ.get('CONTENT_DRY_RUN') == '1':
        log.info('DRY RUN — skipping commit/push')
        return
    run(['git', 'add', 'lib/content/authored/topics/'])
    msg = f'content(day-{day:02d}): {generated} authored pages'
    rc, out = run(['git', 'commit', '-m', msg])
    if rc != 0:
        log.warning('git commit returned %d: %s', rc, out[:200])
        return
    rc, out = run(['git', 'push', 'origin', 'main'])
    if rc != 0:
        log.warning('git push returned %d: %s', rc, out[:200])

def submit_urls_to_gsc(slugs: list[str]) -> None:
    if os.environ.get('CONTENT_DRY_RUN') == '1':
        log.info('DRY RUN — skipping GSC submit')
        return
    if not slugs:
        return
    urls = '\n'.join(f'https://ndt-connect.com/topics/{s}' for s in slugs)
    tmp = PIPELINE_DIR / 'tmp-urls.txt'
    tmp.write_text(urls)
    log.info('Submitting %d URLs to Indexing API…', len(slugs))
    run([sys.executable, 'seo-analysis/submit-urls.py', '--file', str(tmp)])
    log.info('Submitting %d URLs to IndexNow…', len(slugs))
    run([sys.executable, 'seo-analysis/submit-indexnow.py', '--file', str(tmp)])
    tmp.unlink(missing_ok=True)


# ---------- main loop --------------------------------------------------------

def pick_today_batch(state: dict, plan: dict, max_per_day: int) -> tuple[int, list[dict]]:
    """Returns (day_number, list of entries to generate today)."""
    day = state['current_day']
    if day > 10:
        log.info('Plan complete — all 10 days processed.')
        return day, []
    key = f'day-{day:02d}'
    todays = plan.get(key, [])
    done = set(state['completed_slugs'])
    pending = [e for e in todays if e['slug'] not in done][:max_per_day]
    return day, pending


def main() -> int:
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if not api_key:
        log.error('ANTHROPIC_API_KEY not set')
        return 1
    model = os.environ.get('CONTENT_MODEL', DEFAULT_MODEL)
    max_per_day = int(os.environ.get('CONTENT_PAGES_PER_DAY', '300'))

    state = load_state()
    plan = load_plan()
    day, batch = pick_today_batch(state, plan, max_per_day)
    if not batch:
        log.info('Nothing pending for day %d. Exit clean.', day)
        return 0

    log.info('Day %d — generating %d pages with model=%s parallel=%d', day, len(batch), model, PARALLEL_WORKERS)
    system = build_system_prompt()

    generated_slugs: list[str] = []
    failed: list[tuple[str, str]] = []
    started = time.time()

    with ThreadPoolExecutor(max_workers=PARALLEL_WORKERS) as exe:
        futures = {exe.submit(gen_one, e, system, model, api_key): e for e in batch}
        for fut in as_completed(futures):
            ok, slug, msg = fut.result()
            if ok:
                generated_slugs.append(slug)
                if len(generated_slugs) % 25 == 0:
                    log.info('Progress: %d/%d', len(generated_slugs), len(batch))
            else:
                failed.append((slug, msg))
                log.warning('FAIL %s — %s', slug, msg)
    elapsed = time.time() - started
    log.info('Generated %d/%d in %ds (failed %d)', len(generated_slugs), len(batch), int(elapsed), len(failed))

    # Update state.
    state['completed_slugs'].extend(generated_slugs)
    state['failed_slugs'].extend(s for s, _ in failed)
    state['last_run'] = datetime.now(timezone.utc).isoformat()
    save_state(state)

    # Commit + push.
    git_commit_push(day, len(generated_slugs))

    # Submit to GSC + IndexNow.
    submit_urls_to_gsc(generated_slugs)

    # Advance day pointer if all of today's pending was processed (success or failure).
    todays = plan.get(f'day-{day:02d}', [])
    todays_done = set(state['completed_slugs']) | set(state['failed_slugs'])
    if all(e['slug'] in todays_done for e in todays):
        state['current_day'] = day + 1
        save_state(state)
        log.info('Day %d complete. Advanced to day %d.', day, state['current_day'])

    return 0 if not failed or len(generated_slugs) > 0 else 1


if __name__ == '__main__':
    raise SystemExit(main())
