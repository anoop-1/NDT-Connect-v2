"""Pull last-90-day Google Search Console data for ndt-connect.com and atlantisndt.com.

Reads every JSON service-account key in seo-analysis/credentials/ and rotates through
them when one returns 429. Writes raw + filtered CSVs into seo-analysis/output/{site}/.

Run from repo root:

    python seo-analysis/pull-gsc.py
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

# --------------------------------------------------------------------------- config

LOG_FMT = "%(asctime)s  %(levelname)-7s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FMT, datefmt="%H:%M:%S")
log = logging.getLogger("pull-gsc")

REPO_ROOT = Path(__file__).resolve().parent.parent
CREDS_DIR = REPO_ROOT / "seo-analysis" / "credentials"
OUT_DIR = REPO_ROOT / "seo-analysis" / "output"

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

# Each "site" is a logical label; we will probe several GSC property URL variants
# until one of them responds successfully.
SITES = ["ndt-connect.com", "atlantisndt.com"]
SITE_VARIANTS: dict[str, list[str]] = {
    "ndt-connect.com": [
        "sc-domain:ndt-connect.com",
        "https://www.ndt-connect.com/",
        "https://ndt-connect.com/",
    ],
    "atlantisndt.com": [
        "sc-domain:atlantisndt.com",
        "https://www.atlantisndt.com/",
        "https://atlantisndt.com/",
    ],
}

LOOKBACK_DAYS = 90
ROW_LIMIT_DEFAULT = 1000
ROW_LIMIT_QUERY_PAGE = 5000


# --------------------------------------------------------------------------- helpers


def usage_and_exit(msg: str, code: int = 1) -> None:
    log.error(msg)
    log.error("")
    log.error("Expected service-account JSON files at:")
    log.error("    %s", CREDS_DIR)
    log.error("")
    log.error("See seo-analysis/README.md for setup instructions.")
    sys.exit(code)


def load_credential_files() -> list[Path]:
    if not CREDS_DIR.exists():
        usage_and_exit(
            f"Credentials directory does not exist: {CREDS_DIR}"
        )
    files = sorted(p for p in CREDS_DIR.glob("*.json") if p.is_file())
    if not files:
        usage_and_exit(
            f"No *.json service-account keys found in {CREDS_DIR}"
        )
    log.info("Found %d credential file(s) in %s", len(files), CREDS_DIR)
    return files


def build_service(cred_path: Path):
    creds = service_account.Credentials.from_service_account_file(
        str(cred_path), scopes=SCOPES
    )
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def date_range(days: int) -> tuple[str, str]:
    end = date.today() - timedelta(days=2)  # GSC has ~2-day reporting lag
    start = end - timedelta(days=days)
    return start.isoformat(), end.isoformat()


# --------------------------------------------------------------------------- API rotation


@dataclass
class CredPool:
    paths: list[Path]
    idx: int = 0

    def current(self) -> Path:
        return self.paths[self.idx]

    def rotate(self) -> bool:
        """Move to next credential. Returns False if exhausted."""
        self.idx += 1
        return self.idx < len(self.paths)


def query_with_rotation(pool: CredPool, site_url: str, body: dict) -> list[dict]:
    """Run searchanalytics.query, rotating creds on 429. Returns rows list."""
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
                log.warning(
                    "429 quota on %s using %s — rotating credential",
                    site_url,
                    cred.name,
                )
                if not pool.rotate():
                    raise RuntimeError("All credentials exhausted on 429") from e
                continue
            raise


def resolve_site_url(pool: CredPool, label: str) -> str | None:
    """Probe each variant until one returns a successful 1-row query."""
    probe_body = {
        "startDate": date_range(7)[0],
        "endDate": date_range(7)[1],
        "rowLimit": 1,
    }
    for variant in SITE_VARIANTS[label]:
        try:
            query_with_rotation(pool, variant, probe_body)
            log.info("Resolved %s -> %s", label, variant)
            return variant
        except HttpError as e:
            log.debug("Variant %s failed: %s", variant, e)
        except Exception as e:  # noqa: BLE001
            log.debug("Variant %s error: %s", variant, e)
    log.error("Could not resolve any GSC property variant for %s", label)
    return None


# --------------------------------------------------------------------------- pulls


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


def pull_dimension(
    pool: CredPool,
    site_url: str,
    dimensions: list[str],
    start: str,
    end: str,
    row_limit: int,
) -> pd.DataFrame:
    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": dimensions,
        "rowLimit": row_limit,
        "dataState": "final",
    }
    log.info(
        "    query dims=%s rowLimit=%d range=%s..%s",
        dimensions,
        row_limit,
        start,
        end,
    )
    rows = query_with_rotation(pool, site_url, body)
    df = rows_to_df(rows, dimensions)
    log.info("    -> %d rows", len(df))
    return df


def pull_site(pool: CredPool, label: str) -> None:
    log.info("=" * 70)
    log.info("Pulling GSC data for: %s", label)
    log.info("=" * 70)

    site_url = resolve_site_url(pool, label)
    if not site_url:
        log.error("Skipping %s — no accessible GSC property", label)
        return

    out_dir = OUT_DIR / label
    out_dir.mkdir(parents=True, exist_ok=True)

    start, end = date_range(LOOKBACK_DAYS)

    # 1. Top queries
    queries = pull_dimension(pool, site_url, ["query"], start, end, ROW_LIMIT_DEFAULT)
    queries.to_csv(out_dir / "queries.csv", index=False)

    # 2. Top pages
    pages = pull_dimension(pool, site_url, ["page"], start, end, ROW_LIMIT_DEFAULT)
    pages.to_csv(out_dir / "pages.csv", index=False)

    # 3. Top query x page pairs
    pairs = pull_dimension(
        pool, site_url, ["query", "page"], start, end, ROW_LIMIT_QUERY_PAGE
    )
    pairs.to_csv(out_dir / "query-page-pairs.csv", index=False)

    # 4. Country breakdown
    country = pull_dimension(pool, site_url, ["country"], start, end, ROW_LIMIT_DEFAULT)
    country.to_csv(out_dir / "country.csv", index=False)

    # 5. Derived filters
    if not queries.empty:
        near_miss = queries[
            (queries["position"] >= 11)
            & (queries["position"] <= 30)
            & (queries["impressions"] > 50)
        ].sort_values("impressions", ascending=False)
        near_miss.to_csv(out_dir / "queries-near-miss.csv", index=False)
        log.info("    queries-near-miss: %d rows", len(near_miss))

    if not pages.empty:
        low_ctr = pages[(pages["impressions"] > 500) & (pages["ctr"] < 0.01)].sort_values(
            "impressions", ascending=False
        )
        low_ctr.to_csv(out_dir / "pages-high-impr-low-ctr.csv", index=False)
        log.info("    pages-high-impr-low-ctr: %d rows", len(low_ctr))

        zero_clicks = pages[
            (pages["clicks"] == 0) & (pages["impressions"] > 0)
        ].sort_values("impressions", ascending=False)
        zero_clicks.to_csv(out_dir / "pages-zero-clicks.csv", index=False)
        log.info("    pages-zero-clicks: %d rows", len(zero_clicks))

    log.info("Wrote CSVs to %s", out_dir)


# --------------------------------------------------------------------------- main


def main() -> int:
    cred_paths = load_credential_files()
    pool = CredPool(paths=cred_paths)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for label in SITES:
        try:
            pull_site(pool, label)
        except Exception as e:  # noqa: BLE001
            log.exception("Failed to pull %s: %s", label, e)

    log.info("Done. Output: %s", OUT_DIR)
    return 0


if __name__ == "__main__":
    sys.exit(main())
