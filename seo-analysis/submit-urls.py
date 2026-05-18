"""Per-URL submission to Google Indexing API.

Rules:
- 200 URLs / service account / 24 h (Google quota).
- Round-robin across all credential JSONs in seo-analysis/credentials/.
- Persistent state in seo-analysis/output/submitted-urls.json — skip URLs
  submitted in the last 7 days.
- URL source priority:
    1. URLs passed on the CLI (one per line in --file or as positional args)
    2. Live sitemap fetch from PROPERTY (default: https://ndt-connect.com)
    3. Fallback: local app/sitemap.ts build output (next-build sitemap.xml)
- Submission order: city × method > city > cost-guide > free-tool city >
  procedure examples > everything else. High-intent geo pages first.
- Each URL gets type=URL_UPDATED. URL_DELETED is supported but not used here.

Quota guard:
- Tracks per-credential count in a daily-rolling window.
- Stops submitting from that credential once 200 in last 24 h.
- Stops the whole script when every credential is at quota.

Run:
    python seo-analysis/submit-urls.py                # auto-discover URLs
    python seo-analysis/submit-urls.py --limit 1000   # cap daily total
    python seo-analysis/submit-urls.py --dry-run      # print what would submit
    python seo-analysis/submit-urls.py --file urls.txt
    python seo-analysis/submit-urls.py https://ndt-connect.com/foo

Auth: each service account must be a *verified owner* (not just user) of the
GSC property. Service accounts the user listed are already verified.

Notes:
- Indexing API officially supports JobPosting + BroadcastEvent schemas. Other
  page types are accepted and recrawled but without the priority guarantee.
  Still useful — it's a strong recrawl signal Google honors at high rate.
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import random
import re
import sys
import time
import xml.etree.ElementTree as ET
from dataclasses import dataclass, field, asdict
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Iterable
from urllib.request import Request, urlopen

from google.oauth2 import service_account
import google.auth.transport.requests as gauth_req
import urllib.error

# ----------------------------- config -----------------------------------------

SCOPES = ['https://www.googleapis.com/auth/indexing']
INDEXING_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish'

CRED_DIR = Path(__file__).parent / 'credentials'
STATE_FILE = Path(__file__).parent / 'output' / 'submitted-urls.json'
DEFAULT_PROPERTY = 'https://ndt-connect.com'
PER_ACCOUNT_DAILY_QUOTA = 200
RECRAWL_GUARD_DAYS = 7  # don't re-submit the same URL more than once a week

# Submission priority — higher number = submit first.
PRIORITY_PATTERNS: list[tuple[re.Pattern[str], int]] = [
    (re.compile(r'/ndt-services/[^/]+/[^/]+$'), 100),       # city × method
    (re.compile(r'/cost-guide/[^/]+/[^/]+$'), 95),
    (re.compile(r'/ndt-services/[^/]+$'), 90),               # city root
    (re.compile(r'/free-tools/[^/]+/[a-z0-9-]+$'), 85),      # free-tool × city
    (re.compile(r'/tools/ndt-procedure-generator/examples/'), 80),
    (re.compile(r'/tools/ndt-procedure-generator'), 78),
    (re.compile(r'/free-tools/[^/]+$'), 75),
    (re.compile(r'/services/[^/]+$'), 70),
    (re.compile(r'/training/[^/]+$'), 65),
    (re.compile(r'/careers/[^/]+$'), 60),
    (re.compile(r'/standards/[^/]+$'), 55),
    (re.compile(r'/compare/[^/]+$'), 55),
    (re.compile(r'/blog/[^/]+$'), 50),
    (re.compile(r'/glossary/[^/]+$'), 40),
    (re.compile(r'/$'), 30),                                 # home
]
DEFAULT_PRIORITY = 10


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s  %(levelname)-7s %(message)s',
    datefmt='%H:%M:%S',
)
log = logging.getLogger('submit-urls')


# ----------------------------- state ------------------------------------------


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def parse_iso(s: str) -> datetime:
    return datetime.fromisoformat(s.replace('Z', '+00:00'))


def load_state() -> dict:
    if STATE_FILE.exists():
        try:
            with STATE_FILE.open('r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:  # noqa: BLE001
            log.warning('State file unreadable, starting fresh: %s', e)
    return {'urls': {}, 'credentials': {}}


def save_state(state: dict) -> None:
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    tmp = STATE_FILE.with_suffix('.tmp')
    with tmp.open('w', encoding='utf-8') as f:
        json.dump(state, f, indent=2)
    tmp.replace(STATE_FILE)


def credential_daily_count(state: dict, cred_id: str, now: datetime) -> int:
    rec = state['credentials'].get(cred_id, {})
    entries: list[str] = rec.get('submissions', [])
    cutoff = now - timedelta(hours=24)
    return sum(1 for s in entries if parse_iso(s) > cutoff)


def record_submission(state: dict, cred_id: str, url: str, now: datetime) -> None:
    state['urls'][url] = {'lastSubmitted': now.isoformat(), 'credential': cred_id}
    rec = state['credentials'].setdefault(cred_id, {'submissions': []})
    rec['submissions'].append(now.isoformat())
    # Trim to last 48 h to keep file small.
    cutoff = (now - timedelta(hours=48)).isoformat()
    rec['submissions'] = [s for s in rec['submissions'] if s > cutoff]


# ----------------------------- credentials ------------------------------------


@dataclass
class Credential:
    path: Path
    creds: service_account.Credentials
    cred_id: str  # filename
    daily_count: int = 0
    exhausted: bool = False


def load_credentials() -> list[Credential]:
    files = sorted(CRED_DIR.glob('*.json'))
    if not files:
        log.error('No credentials in %s', CRED_DIR)
        sys.exit(1)
    out: list[Credential] = []
    for f in files:
        try:
            c = service_account.Credentials.from_service_account_file(
                str(f), scopes=SCOPES
            )
            out.append(Credential(path=f, creds=c, cred_id=f.name))
        except Exception as e:  # noqa: BLE001
            log.warning('Skipping %s: %s', f.name, e)
    log.info('Loaded %d credential(s) for Indexing API', len(out))
    return out


# ----------------------------- URL sources ------------------------------------


def _fetch_loc_tags(sitemap_url: str) -> tuple[str, list[str]]:
    """Returns (root_tag_localname, list_of_loc_strings). root_tag tells us
    whether this is a <sitemapindex> (loc = sub-sitemap URLs) or <urlset>
    (loc = page URLs)."""
    req = Request(sitemap_url, headers={'User-Agent': 'NDT-Connect-Indexer/1.0'})
    with urlopen(req, timeout=30) as r:
        body = r.read()
    root = ET.fromstring(body)
    ns = ''
    if root.tag.startswith('{'):
        ns = root.tag.split('}')[0].strip('{')
    local_name = root.tag.split('}', 1)[-1]
    locs: list[str] = []
    finder = f'.//{{{ns}}}loc' if ns else './/loc'
    for loc in root.findall(finder):
        if loc.text:
            locs.append(loc.text.strip())
    return local_name, locs


def fetch_sitemap_urls(property_url: str) -> list[str]:
    """Fetch all page URLs. Auto-detects <sitemapindex> and recurses into each
    sub-sitemap. Handles the Next.js generateSitemaps split layout."""
    root_url = property_url.rstrip('/') + '/sitemap-index.xml'
    log.info('Fetching sitemap: %s', root_url)
    root_kind, root_locs = _fetch_loc_tags(root_url)

    if root_kind == 'urlset':
        log.info('Sitemap (urlset) returned %d URLs', len(root_locs))
        return root_locs

    if root_kind != 'sitemapindex':
        log.warning('Unknown sitemap root <%s>; treating as urlset', root_kind)
        return root_locs

    log.info('Sitemap index with %d sub-sitemaps; fetching each', len(root_locs))
    all_urls: list[str] = []
    for sub in root_locs:
        try:
            kind, locs = _fetch_loc_tags(sub)
            log.info('  %s -> %d URLs', sub, len(locs))
            all_urls.extend(locs)
        except Exception as e:  # noqa: BLE001
            log.warning('  %s failed: %s', sub, e)
    log.info('Sitemap index returned %d URLs total', len(all_urls))
    return all_urls


def url_priority(url: str) -> int:
    path = url.split('//', 1)[-1].split('/', 1)[-1]
    path = '/' + path
    for pat, score in PRIORITY_PATTERNS:
        if pat.search(path):
            return score
    return DEFAULT_PRIORITY


def filter_eligible(urls: Iterable[str], state: dict, force: bool) -> list[str]:
    now = utc_now()
    cutoff = now - timedelta(days=RECRAWL_GUARD_DAYS)
    seen: set[str] = set()
    out: list[str] = []
    for u in urls:
        if u in seen:
            continue
        seen.add(u)
        rec = state['urls'].get(u)
        if rec and not force:
            last = parse_iso(rec['lastSubmitted'])
            if last > cutoff:
                continue
        out.append(u)
    out.sort(key=lambda u: (-url_priority(u), u))
    return out


# ----------------------------- API call ---------------------------------------


def publish(cred: Credential, url: str) -> tuple[bool, str]:
    """Returns (ok, message_or_error). On 429 returns (False, 'quota')."""
    if not cred.creds.valid:
        cred.creds.refresh(gauth_req.Request())
    token = cred.creds.token
    body = json.dumps({'url': url, 'type': 'URL_UPDATED'}).encode('utf-8')
    req = Request(
        INDEXING_ENDPOINT,
        data=body,
        method='POST',
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json',
        },
    )
    try:
        with urlopen(req, timeout=20) as resp:
            payload = resp.read().decode('utf-8', errors='replace')
        return True, payload[:160]
    except urllib.error.HTTPError as e:
        try:
            err_body = e.read().decode('utf-8', errors='replace')[:400]
        except Exception:  # noqa: BLE001
            err_body = ''
        if e.code == 429:
            return False, 'quota'
        if e.code == 403 and 'PERMISSION_DENIED' in err_body:
            return False, f'permission_denied: {err_body[:200]}'
        if e.code == 404:
            return False, f'not_found: {err_body[:200]}'
        return False, f'http_{e.code}: {err_body[:200]}'
    except Exception as e:  # noqa: BLE001
        return False, f'error: {e}'


# ----------------------------- main loop --------------------------------------


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('urls', nargs='*', help='URLs to submit (positional)')
    ap.add_argument('--file', help='File with one URL per line')
    ap.add_argument('--property', default=DEFAULT_PROPERTY, help='GSC property root URL')
    ap.add_argument('--limit', type=int, default=2000, help='Max total submissions this run (default 2000)')
    ap.add_argument('--dry-run', action='store_true', help='Show plan, do not submit')
    ap.add_argument('--force', action='store_true', help='Re-submit even if within 7-day guard')
    args = ap.parse_args()

    # 1. Source URLs.
    urls: list[str] = list(args.urls)
    if args.file:
        with open(args.file, 'r', encoding='utf-8') as f:
            urls.extend(line.strip() for line in f if line.strip() and not line.startswith('#'))
    if not urls:
        urls = fetch_sitemap_urls(args.property)
    if not urls:
        log.error('No URLs to submit. Exit.')
        return 1

    # 2. Credentials + state.
    creds = load_credentials()
    state = load_state()
    now = utc_now()

    # Hydrate credential daily counts from state.
    for c in creds:
        c.daily_count = credential_daily_count(state, c.cred_id, now)
        if c.daily_count >= PER_ACCOUNT_DAILY_QUOTA:
            c.exhausted = True
    log.info(
        'Per-credential 24h counts: %s',
        ', '.join(f'{c.cred_id[:18]}={c.daily_count}/{PER_ACCOUNT_DAILY_QUOTA}' for c in creds),
    )

    # 3. Filter eligible.
    eligible = filter_eligible(urls, state, force=args.force)
    log.info('URLs eligible after dedup + 7d guard: %d', len(eligible))
    if not eligible:
        log.info('Nothing to submit. Exit clean.')
        return 0

    # 4. Submit.
    total_quota_remaining = sum(
        max(0, PER_ACCOUNT_DAILY_QUOTA - c.daily_count) for c in creds
    )
    plan = min(args.limit, len(eligible), total_quota_remaining)
    log.info(
        'Plan: submit %d URLs (limit=%d, eligible=%d, quota remaining=%d)',
        plan, args.limit, len(eligible), total_quota_remaining,
    )
    if args.dry_run:
        for u in eligible[:plan]:
            log.info('DRY  pri=%d  %s', url_priority(u), u)
        return 0

    submitted = 0
    failed = 0
    quota_errors = 0
    perm_errors = 0
    cred_cycle = list(creds)
    random.shuffle(cred_cycle)
    cred_idx = 0

    save_every = 5
    for u in eligible[:plan]:
        # Pick next non-exhausted credential.
        attempts = 0
        chosen: Credential | None = None
        while attempts < len(cred_cycle):
            c = cred_cycle[cred_idx % len(cred_cycle)]
            cred_idx += 1
            attempts += 1
            if not c.exhausted and c.daily_count < PER_ACCOUNT_DAILY_QUOTA:
                chosen = c
                break
        if chosen is None:
            log.warning('All credentials exhausted. Stopping at %d submissions.', submitted)
            break

        ok, msg = publish(chosen, u)
        if ok:
            submitted += 1
            chosen.daily_count += 1
            record_submission(state, chosen.cred_id, u, utc_now())
            log.info('OK   [%s]  %s', chosen.cred_id[:18], u)
        else:
            if msg == 'quota':
                chosen.exhausted = True
                chosen.daily_count = PER_ACCOUNT_DAILY_QUOTA
                quota_errors += 1
                log.warning('QUOTA  [%s] hit 429; marking exhausted. Retrying URL.', chosen.cred_id[:18])
                # Retry the same URL with a different credential — don't lose it.
                ok2, msg2 = (False, 'all-exhausted')
                while not ok2 and not all(c.exhausted for c in creds):
                    fallback = next((c for c in creds if not c.exhausted), None)
                    if fallback is None:
                        break
                    ok2, msg2 = publish(fallback, u)
                    if ok2:
                        submitted += 1
                        fallback.daily_count += 1
                        record_submission(state, fallback.cred_id, u, utc_now())
                        log.info('OK*  [%s]  %s', fallback.cred_id[:18], u)
                    elif msg2 == 'quota':
                        fallback.exhausted = True
                        fallback.daily_count = PER_ACCOUNT_DAILY_QUOTA
                if not ok2:
                    failed += 1
            elif 'permission_denied' in msg:
                perm_errors += 1
                log.error('PERM [%s] %s -> %s', chosen.cred_id[:18], u, msg[:120])
                # Mark credential dead for this run.
                chosen.exhausted = True
            else:
                failed += 1
                log.warning('FAIL [%s] %s -> %s', chosen.cred_id[:18], u, msg[:160])

        # Be polite — small jitter.
        time.sleep(0.15 + random.random() * 0.15)

        if submitted and submitted % save_every == 0:
            save_state(state)

    save_state(state)
    log.info(
        '=== done. submitted=%d  failed=%d  quota_429=%d  permission=%d ===',
        submitted, failed, quota_errors, perm_errors,
    )
    log.info('State: %s', STATE_FILE)
    return 0 if submitted > 0 else 1


if __name__ == '__main__':
    sys.exit(main())
