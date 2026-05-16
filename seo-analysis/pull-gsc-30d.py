"""One-off 30-day GSC pull for ndt-connect.com only.

Mirrors pull-gsc.py but with LOOKBACK_DAYS=30 and only the ndt-connect.com site.
Output goes to seo-analysis/output/ndt-connect-30d/.
"""

from __future__ import annotations

import logging
import sys
from dataclasses import dataclass
from datetime import date, timedelta
from pathlib import Path
from typing import Iterable

import pandas as pd
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

LOG_FMT = "%(asctime)s  %(levelname)-7s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FMT, datefmt="%H:%M:%S")
log = logging.getLogger("pull-gsc-30d")

REPO_ROOT = Path(__file__).resolve().parent.parent
CREDS_DIR = REPO_ROOT / "seo-analysis" / "credentials"
OUT_DIR = REPO_ROOT / "seo-analysis" / "output" / "ndt-connect-30d"

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

# Skip the atlantis-idx-* keys (they don't have ndt-connect access per task constraints)
EXCLUDE_PREFIXES = ("atlantis-idx-",)

SITE_VARIANTS = [
    "sc-domain:ndt-connect.com",
    "https://www.ndt-connect.com/",
    "https://ndt-connect.com/",
]

LOOKBACK_DAYS = 30
ROW_LIMIT_DEFAULT = 1000
ROW_LIMIT_QUERY_PAGE = 5000


def load_credential_files() -> list[Path]:
    files = sorted(
        p for p in CREDS_DIR.glob("*.json")
        if p.is_file() and not any(p.name.startswith(prefix) for prefix in EXCLUDE_PREFIXES)
    )
    log.info("Found %d usable credential file(s)", len(files))
    for p in files:
        log.info("  %s", p.name)
    return files


def build_service(cred_path: Path):
    creds = service_account.Credentials.from_service_account_file(
        str(cred_path), scopes=SCOPES
    )
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def date_range(days: int) -> tuple[str, str]:
    end = date.today() - timedelta(days=2)
    start = end - timedelta(days=days)
    return start.isoformat(), end.isoformat()


@dataclass
class CredPool:
    paths: list[Path]
    idx: int = 0

    def current(self) -> Path:
        return self.paths[self.idx]

    def rotate(self) -> bool:
        self.idx += 1
        return self.idx < len(self.paths)


def query_with_rotation(pool: CredPool, site_url: str, body: dict) -> list[dict]:
    while True:
        cred = pool.current()
        try:
            svc = build_service(cred)
            resp = svc.searchanalytics().query(siteUrl=site_url, body=body).execute()
            return resp.get("rows", [])
        except HttpError as e:
            status = getattr(e, "status_code", None) or (
                e.resp.status if getattr(e, "resp", None) else None
            )
            if status == 429:
                log.warning("429 on %s — rotating from %s", site_url, cred.name)
                if not pool.rotate():
                    raise RuntimeError("All credentials exhausted on 429") from e
                continue
            raise


def resolve_site_url(pool: CredPool) -> str | None:
    probe_body = {
        "startDate": date_range(7)[0],
        "endDate": date_range(7)[1],
        "rowLimit": 1,
    }
    for variant in SITE_VARIANTS:
        try:
            query_with_rotation(pool, variant, probe_body)
            log.info("Resolved property -> %s", variant)
            return variant
        except HttpError as e:
            log.debug("Variant %s failed: %s", variant, e)
        except Exception as e:
            log.debug("Variant %s error: %s", variant, e)
    return None


def rows_to_df(rows: Iterable[dict], dimensions: list[str]) -> pd.DataFrame:
    records = []
    for r in rows:
        keys = r.get("keys", [])
        rec = {dim: keys[i] if i < len(keys) else None for i, dim in enumerate(dimensions)}
        rec["clicks"] = r.get("clicks", 0)
        rec["impressions"] = r.get("impressions", 0)
        rec["ctr"] = r.get("ctr", 0.0)
        rec["position"] = r.get("position", 0.0)
        records.append(rec)
    return pd.DataFrame.from_records(records)


def pull_dimension(pool, site_url, dimensions, start, end, row_limit) -> pd.DataFrame:
    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": dimensions,
        "rowLimit": row_limit,
        "dataState": "final",
    }
    log.info("    query dims=%s rowLimit=%d %s..%s", dimensions, row_limit, start, end)
    rows = query_with_rotation(pool, site_url, body)
    df = rows_to_df(rows, dimensions)
    log.info("    -> %d rows", len(df))
    return df


def main() -> int:
    cred_paths = load_credential_files()
    if not cred_paths:
        log.error("No credentials found")
        return 1
    pool = CredPool(paths=cred_paths)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    site_url = resolve_site_url(pool)
    if not site_url:
        log.error("No accessible GSC property variant")
        return 1

    start, end = date_range(LOOKBACK_DAYS)
    log.info("=" * 70)
    log.info("30-day window: %s .. %s", start, end)
    log.info("=" * 70)

    queries = pull_dimension(pool, site_url, ["query"], start, end, ROW_LIMIT_DEFAULT)
    queries.to_csv(OUT_DIR / "queries.csv", index=False)

    pages = pull_dimension(pool, site_url, ["page"], start, end, ROW_LIMIT_DEFAULT)
    pages.to_csv(OUT_DIR / "pages.csv", index=False)

    pairs = pull_dimension(pool, site_url, ["query", "page"], start, end, ROW_LIMIT_QUERY_PAGE)
    pairs.to_csv(OUT_DIR / "query-page-pairs.csv", index=False)

    country = pull_dimension(pool, site_url, ["country"], start, end, ROW_LIMIT_DEFAULT)
    country.to_csv(OUT_DIR / "country.csv", index=False)

    if not queries.empty:
        near_miss = queries[
            (queries["position"] >= 11)
            & (queries["position"] <= 30)
            & (queries["impressions"] > 50)
        ].sort_values("impressions", ascending=False)
        near_miss.to_csv(OUT_DIR / "queries-near-miss.csv", index=False)
        log.info("    near-miss: %d", len(near_miss))

    if not pages.empty:
        low_ctr = pages[(pages["impressions"] > 500) & (pages["ctr"] < 0.01)].sort_values(
            "impressions", ascending=False
        )
        low_ctr.to_csv(OUT_DIR / "pages-high-impr-low-ctr.csv", index=False)
        log.info("    high-impr-low-ctr: %d", len(low_ctr))

        zero_clicks = pages[
            (pages["clicks"] == 0) & (pages["impressions"] > 0)
        ].sort_values("impressions", ascending=False)
        zero_clicks.to_csv(OUT_DIR / "pages-zero-clicks.csv", index=False)
        log.info("    zero-clicks: %d", len(zero_clicks))

    log.info("Done -> %s", OUT_DIR)
    return 0


if __name__ == "__main__":
    sys.exit(main())
