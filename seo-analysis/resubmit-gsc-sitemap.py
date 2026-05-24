"""Re-submit sitemap.xml to Google Search Console.

Deleting + re-submitting the sitemap forces a fresh crawl pass, which is
useful after major content / title changes. Uses the first usable
credential in seo-analysis/credentials/.

Run:
    python seo-analysis/resubmit-gsc-sitemap.py
"""
from __future__ import annotations

import logging
from pathlib import Path
from google.oauth2 import service_account
from googleapiclient.discovery import build

logging.basicConfig(level=logging.INFO, format='%(asctime)s  %(levelname)-7s %(message)s', datefmt='%H:%M:%S')
log = logging.getLogger('gsc-sitemap')

CRED_DIR = Path(__file__).parent / 'credentials'
SCOPES = ['https://www.googleapis.com/auth/webmasters']
SITES = [
    ('https://ndt-connect.com/', 'https://ndt-connect.com/sitemap-index.xml'),
    ('sc-domain:ndt-connect.com', 'https://ndt-connect.com/sitemap-index.xml'),
]


def main() -> int:
    cred_files = sorted(CRED_DIR.glob('*.json'))
    if not cred_files:
        log.error('No credentials in %s', CRED_DIR)
        return 1
    for cred_path in cred_files:
        try:
            creds = service_account.Credentials.from_service_account_file(str(cred_path), scopes=SCOPES)
            svc = build('searchconsole', 'v1', credentials=creds, cache_discovery=False)
        except Exception as e:
            log.warning('Skip %s: %s', cred_path.name, e)
            continue
        for site_url, sitemap in SITES:
            try:
                # Delete first so re-submit is treated as fresh.
                try:
                    svc.sitemaps().delete(siteUrl=site_url, feedpath=sitemap).execute()
                    log.info('Deleted old sitemap: %s @ %s', sitemap, site_url)
                except Exception as e:
                    log.debug('Delete skipped (%s): %s', site_url, e)
                svc.sitemaps().submit(siteUrl=site_url, feedpath=sitemap).execute()
                log.info('Submitted: %s @ %s using %s', sitemap, site_url, cred_path.name)
                # Show current state
                info = svc.sitemaps().get(siteUrl=site_url, feedpath=sitemap).execute()
                log.info('State: lastSubmitted=%s contents=%s errors=%s warnings=%s',
                         info.get('lastSubmitted'), info.get('contents', []),
                         info.get('errors'), info.get('warnings'))
                return 0
            except Exception as e:
                log.debug('Site %s with cred %s failed: %s', site_url, cred_path.name, e)
                continue
    log.error('Could not submit sitemap with any credential / site variant')
    return 1


if __name__ == '__main__':
    raise SystemExit(main())
