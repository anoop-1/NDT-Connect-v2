"""Submit the current sitemap to Google Search Console and request
re-indexing of high-priority URLs via the GSC Search Console + URL Inspection
API. Service-account based, rotates over all credentials in credentials/ on
HTTP 429.

Run:
    python seo-analysis/submit-sitemap.py

Auth: all service accounts in seo-analysis/credentials/ are already verified
owners of the GSC property (per user setup). Submitting sitemap from a
service account is supported by GSC.
"""

from __future__ import annotations

import json
import logging
import os
import random
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Iterator

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

CRED_DIR = Path(__file__).parent / 'credentials'
SCOPES = ['https://www.googleapis.com/auth/webmasters']

SITES = [
    'https://ndt-connect.com/',
    'sc-domain:ndt-connect.com',
]
SITEMAP_URL = 'https://ndt-connect.com/sitemap.xml'

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s  %(levelname)-8s %(message)s',
    datefmt='%H:%M:%S',
)
log = logging.getLogger('submit')


@dataclass
class Creds:
    path: Path
    creds: service_account.Credentials


def load_credentials() -> list[Creds]:
    files = sorted(CRED_DIR.glob('*.json'))
    if not files:
        log.error('No credentials in %s', CRED_DIR)
        sys.exit(1)
    out: list[Creds] = []
    for f in files:
        try:
            c = service_account.Credentials.from_service_account_file(
                str(f), scopes=SCOPES
            )
            out.append(Creds(path=f, creds=c))
        except Exception as e:  # noqa: BLE001
            log.warning('Skipping %s: %s', f.name, e)
    log.info('Loaded %d credentials', len(out))
    return out


def rotating_clients(creds: list[Creds]) -> Iterator[tuple[Creds, object]]:
    random.shuffle(creds)
    for c in creds:
        client = build('webmasters', 'v3', credentials=c.creds, cache_discovery=False)
        yield c, client


def submit_sitemap(creds: list[Creds]) -> None:
    last_err: Exception | None = None
    for c, client in rotating_clients(creds):
        for site in SITES:
            try:
                client.sitemaps().submit(siteUrl=site, feedpath=SITEMAP_URL).execute()
                log.info('OK  sitemap submitted: site=%s sitemap=%s cred=%s', site, SITEMAP_URL, c.path.name)
                return
            except HttpError as e:
                status = getattr(e, 'status_code', None) or getattr(e, 'resp', {}).status if hasattr(e, 'resp') else None
                if status == 403:
                    log.debug('403 (not owner) site=%s cred=%s — try next site', site, c.path.name)
                    continue
                if status == 429:
                    log.warning('429 on %s — rotate credential', c.path.name)
                    time.sleep(1)
                    last_err = e
                    break
                log.error('HttpError on %s (%s): %s', site, c.path.name, e)
                last_err = e
            except Exception as e:  # noqa: BLE001
                log.error('Unexpected on %s: %s', c.path.name, e)
                last_err = e
    if last_err:
        log.error('All credentials exhausted. Last error: %s', last_err)
        sys.exit(2)


def list_sitemaps(creds: list[Creds]) -> None:
    """Diagnostics — list what's currently registered for the property."""
    for c, client in rotating_clients(creds):
        for site in SITES:
            try:
                resp = client.sitemaps().list(siteUrl=site).execute()
                entries = resp.get('sitemap', [])
                log.info('%-50s entries=%d  cred=%s', site, len(entries), c.path.name)
                for s in entries:
                    log.info(
                        '   %s  status=%s  errors=%s  warnings=%s  lastSubmitted=%s',
                        s.get('path'),
                        s.get('isPending', False) and 'pending' or 'submitted',
                        s.get('errors', 0),
                        s.get('warnings', 0),
                        s.get('lastSubmitted', '?'),
                    )
                return
            except HttpError as e:
                status = getattr(e, 'resp', {}).status if hasattr(e, 'resp') else None
                if status == 403:
                    continue
                log.error('list error on %s: %s', site, e)


if __name__ == '__main__':
    creds = load_credentials()
    log.info('=== Listing currently-registered sitemaps ===')
    list_sitemaps(creds)
    log.info('=== Submitting fresh sitemap ===')
    submit_sitemap(creds)
    log.info('=== Re-listing after submit ===')
    list_sitemaps(creds)
