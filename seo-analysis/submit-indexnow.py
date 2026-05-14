"""IndexNow submitter — Bing, Yandex, DuckDuckGo, Naver.

IndexNow is free, has no per-day quota, and accepts up to 10,000 URLs per
POST. Complements the Google Indexing API which only Google honors.

Key host: ndt-connect.com
Key:      32f800ab00dfbec6d6a6904557be4e81
Key file: https://ndt-connect.com/32f800ab00dfbec6d6a6904557be4e81.txt

Run:
    python seo-analysis/submit-indexnow.py                 # all sitemap URLs
    python seo-analysis/submit-indexnow.py --file urls.txt
"""

from __future__ import annotations

import argparse
import json
import logging
import sys
import xml.etree.ElementTree as ET
from urllib.request import Request, urlopen
import urllib.error

INDEXNOW_HOST = 'ndt-connect.com'
INDEXNOW_KEY = '32f800ab00dfbec6d6a6904557be4e81'
KEY_LOCATION = f'https://{INDEXNOW_HOST}/{INDEXNOW_KEY}.txt'
SITEMAP_URL = f'https://{INDEXNOW_HOST}/sitemap.xml'
BATCH = 10000  # IndexNow per-POST limit

# Submit to Bing — it shares with Yandex, DuckDuckGo, Naver via the
# IndexNow consortium so we only need one POST.
ENDPOINT = 'https://api.indexnow.org/IndexNow'

logging.basicConfig(level=logging.INFO, format='%(asctime)s  %(levelname)-7s %(message)s', datefmt='%H:%M:%S')
log = logging.getLogger('indexnow')


def fetch_sitemap_urls() -> list[str]:
    log.info('Fetching sitemap: %s', SITEMAP_URL)
    req = Request(SITEMAP_URL, headers={'User-Agent': 'NDT-Connect-IndexNow/1.0'})
    with urlopen(req, timeout=30) as r:
        body = r.read()
    root = ET.fromstring(body)
    ns = ''
    if root.tag.startswith('{'):
        ns = root.tag.split('}')[0].strip('{')
    locs: list[str] = []
    tag = f'{{{ns}}}loc' if ns else 'loc'
    for loc in root.findall(f'.//{tag}'):
        if loc.text:
            locs.append(loc.text.strip())
    log.info('Sitemap returned %d URLs', len(locs))
    return locs


def submit_batch(urls: list[str]) -> tuple[int, str]:
    payload = json.dumps({
        'host': INDEXNOW_HOST,
        'key': INDEXNOW_KEY,
        'keyLocation': KEY_LOCATION,
        'urlList': urls,
    }).encode('utf-8')
    req = Request(
        ENDPOINT,
        data=payload,
        method='POST',
        headers={'Content-Type': 'application/json; charset=utf-8'},
    )
    try:
        with urlopen(req, timeout=60) as r:
            return r.status, r.read().decode('utf-8', errors='replace')[:200]
    except urllib.error.HTTPError as e:
        try:
            body = e.read().decode('utf-8', errors='replace')[:400]
        except Exception:
            body = ''
        return e.code, body
    except Exception as e:
        return 0, str(e)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--file', help='File with one URL per line')
    args = ap.parse_args()

    if args.file:
        with open(args.file, 'r', encoding='utf-8') as f:
            urls = [ln.strip() for ln in f if ln.strip() and not ln.startswith('#')]
    else:
        urls = fetch_sitemap_urls()

    if not urls:
        log.error('No URLs to submit')
        return 1

    total = 0
    for i in range(0, len(urls), BATCH):
        chunk = urls[i:i + BATCH]
        code, body = submit_batch(chunk)
        if 200 <= code < 300:
            total += len(chunk)
            log.info('OK  batch %d-%d (%d URLs) -> HTTP %d', i, i + len(chunk), len(chunk), code)
        else:
            log.error('FAIL batch %d-%d -> HTTP %d %s', i, i + len(chunk), code, body[:160])
    log.info('=== submitted %d / %d URLs ===', total, len(urls))
    return 0 if total else 1


if __name__ == '__main__':
    sys.exit(main())
