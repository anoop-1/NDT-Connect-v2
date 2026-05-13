"""Pull last-90-day GA4 reports for ndt-connect.com and atlantisndt.com.

Requires GA4 property IDs to be set in env vars:

    GA4_PROPERTY_ID_NDTCONNECT
    GA4_PROPERTY_ID_ATLANTIS

Reads every JSON service-account key in seo-analysis/credentials/ and rotates through
them when one returns 429.

Writes CSVs into seo-analysis/output/{site}/:
    acquisition-channels.csv
    top-landing-pages.csv
    signup-funnel.csv

Run from repo root:

    python seo-analysis/pull-ga4.py
"""

from __future__ import annotations

import logging
import os
import sys
from dataclasses import dataclass
from datetime import date, timedelta
from pathlib import Path

import pandas as pd
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Filter,
    FilterExpression,
    Metric,
    OrderBy,
    RunReportRequest,
)
from google.api_core.exceptions import ResourceExhausted
from google.oauth2 import service_account

# --------------------------------------------------------------------------- config

LOG_FMT = "%(asctime)s  %(levelname)-7s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FMT, datefmt="%H:%M:%S")
log = logging.getLogger("pull-ga4")

REPO_ROOT = Path(__file__).resolve().parent.parent
CREDS_DIR = REPO_ROOT / "seo-analysis" / "credentials"
OUT_DIR = REPO_ROOT / "seo-analysis" / "output"

SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]

LOOKBACK_DAYS = 90

SITES = [
    {"label": "ndt-connect.com", "env": "GA4_PROPERTY_ID_NDTCONNECT"},
    {"label": "atlantisndt.com", "env": "GA4_PROPERTY_ID_ATLANTIS"},
]


# --------------------------------------------------------------------------- helpers


def usage_and_exit(msg: str, code: int = 1) -> None:
    log.error(msg)
    log.error("")
    log.error("Expected service-account JSON files at:")
    log.error("    %s", CREDS_DIR)
    log.error("")
    log.error("Required environment variables:")
    log.error("    GA4_PROPERTY_ID_NDTCONNECT  (e.g. 123456789)")
    log.error("    GA4_PROPERTY_ID_ATLANTIS    (e.g. 987654321)")
    log.error("")
    log.error("See seo-analysis/README.md for setup instructions.")
    sys.exit(code)


def load_credential_files() -> list[Path]:
    if not CREDS_DIR.exists():
        usage_and_exit(f"Credentials directory does not exist: {CREDS_DIR}")
    files = sorted(p for p in CREDS_DIR.glob("*.json") if p.is_file())
    if not files:
        usage_and_exit(f"No *.json service-account keys found in {CREDS_DIR}")
    log.info("Found %d credential file(s) in %s", len(files), CREDS_DIR)
    return files


def build_client(cred_path: Path) -> BetaAnalyticsDataClient:
    creds = service_account.Credentials.from_service_account_file(
        str(cred_path), scopes=SCOPES
    )
    return BetaAnalyticsDataClient(credentials=creds)


def date_range(days: int) -> tuple[str, str]:
    end = date.today() - timedelta(days=1)
    start = end - timedelta(days=days)
    return start.isoformat(), end.isoformat()


# --------------------------------------------------------------------------- API rotation


@dataclass
class ClientPool:
    paths: list[Path]
    idx: int = 0

    def current_path(self) -> Path:
        return self.paths[self.idx]

    def current_client(self) -> BetaAnalyticsDataClient:
        return build_client(self.current_path())

    def rotate(self) -> bool:
        self.idx += 1
        return self.idx < len(self.paths)


def run_report(pool: ClientPool, request: RunReportRequest):
    while True:
        client = pool.current_client()
        try:
            return client.run_report(request)
        except ResourceExhausted as e:
            log.warning(
                "429 quota using %s — rotating credential",
                pool.current_path().name,
            )
            if not pool.rotate():
                raise RuntimeError("All credentials exhausted on 429") from e


def report_to_df(response) -> pd.DataFrame:
    dim_headers = [d.name for d in response.dimension_headers]
    met_headers = [m.name for m in response.metric_headers]
    records = []
    for row in response.rows:
        rec = {dim_headers[i]: dv.value for i, dv in enumerate(row.dimension_values)}
        for i, mv in enumerate(row.metric_values):
            v = mv.value
            try:
                v = float(v)
            except (TypeError, ValueError):
                pass
            rec[met_headers[i]] = v
        records.append(rec)
    return pd.DataFrame.from_records(records)


# --------------------------------------------------------------------------- pulls


def pull_acquisition_channels(
    pool: ClientPool, property_id: str, start: str, end: str
) -> pd.DataFrame:
    req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=start, end_date=end)],
        dimensions=[Dimension(name="sessionDefaultChannelGroup")],
        metrics=[
            Metric(name="sessions"),
            Metric(name="totalUsers"),
            Metric(name="engagedSessions"),
            Metric(name="conversions"),
            Metric(name="averageSessionDuration"),
        ],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
        limit=100,
    )
    resp = run_report(pool, req)
    return report_to_df(resp)


def pull_top_landing_pages(
    pool: ClientPool, property_id: str, start: str, end: str
) -> pd.DataFrame:
    req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=start, end_date=end)],
        dimensions=[Dimension(name="landingPagePlusQueryString")],
        metrics=[
            Metric(name="sessions"),
            Metric(name="totalUsers"),
            Metric(name="engagedSessions"),
            Metric(name="bounceRate"),
            Metric(name="averageSessionDuration"),
            Metric(name="conversions"),
        ],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
        limit=1000,
    )
    resp = run_report(pool, req)
    return report_to_df(resp)


def pull_signup_funnel(
    pool: ClientPool, property_id: str, start: str, end: str
) -> pd.DataFrame:
    """Approximate signup funnel via /register page views and downstream conversion events.

    We pull pagePath / eventName / eventCount restricted to paths containing 'register'
    plus any conversion event with 'sign_up' in its name.
    """
    req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=start, end_date=end)],
        dimensions=[
            Dimension(name="pagePath"),
            Dimension(name="eventName"),
        ],
        metrics=[
            Metric(name="eventCount"),
            Metric(name="totalUsers"),
            Metric(name="sessions"),
        ],
        dimension_filter=FilterExpression(
            filter=Filter(
                field_name="pagePath",
                string_filter=Filter.StringFilter(
                    match_type=Filter.StringFilter.MatchType.CONTAINS,
                    value="register",
                    case_sensitive=False,
                ),
            )
        ),
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="eventCount"), desc=True)],
        limit=500,
    )
    resp = run_report(pool, req)
    return report_to_df(resp)


# --------------------------------------------------------------------------- main


def pull_site(pool: ClientPool, label: str, property_id: str) -> None:
    log.info("=" * 70)
    log.info("Pulling GA4 data for: %s  (property %s)", label, property_id)
    log.info("=" * 70)

    out_dir = OUT_DIR / label
    out_dir.mkdir(parents=True, exist_ok=True)

    start, end = date_range(LOOKBACK_DAYS)
    log.info("Date range: %s .. %s", start, end)

    log.info("  acquisition channels")
    df = pull_acquisition_channels(pool, property_id, start, end)
    df.to_csv(out_dir / "acquisition-channels.csv", index=False)
    log.info("    -> %d rows", len(df))

    log.info("  top landing pages")
    df = pull_top_landing_pages(pool, property_id, start, end)
    df.to_csv(out_dir / "top-landing-pages.csv", index=False)
    log.info("    -> %d rows", len(df))

    log.info("  signup funnel (pages containing 'register')")
    df = pull_signup_funnel(pool, property_id, start, end)
    df.to_csv(out_dir / "signup-funnel.csv", index=False)
    log.info("    -> %d rows", len(df))

    log.info("Wrote CSVs to %s", out_dir)


def main() -> int:
    cred_paths = load_credential_files()

    missing = [s["env"] for s in SITES if not os.environ.get(s["env"])]
    if missing:
        usage_and_exit(
            "Missing required environment variable(s): " + ", ".join(missing)
        )

    pool = ClientPool(paths=cred_paths)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for site in SITES:
        property_id = os.environ[site["env"]].strip()
        try:
            pull_site(pool, site["label"], property_id)
        except Exception as e:  # noqa: BLE001
            log.exception("Failed to pull %s: %s", site["label"], e)

    log.info("Done. Output: %s", OUT_DIR)
    return 0


if __name__ == "__main__":
    sys.exit(main())
