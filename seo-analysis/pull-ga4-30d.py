"""One-off 30-day GA4 pull for ndt-connect.com only (property 528251886)."""

from __future__ import annotations

import logging
import sys
from dataclasses import dataclass
from datetime import date, timedelta
from pathlib import Path

import pandas as pd
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    OrderBy,
    RunReportRequest,
)
from google.api_core.exceptions import ResourceExhausted, PermissionDenied
from google.oauth2 import service_account

LOG_FMT = "%(asctime)s  %(levelname)-7s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FMT, datefmt="%H:%M:%S")
log = logging.getLogger("pull-ga4-30d")

REPO_ROOT = Path(__file__).resolve().parent.parent
CREDS_DIR = REPO_ROOT / "seo-analysis" / "credentials"
OUT_DIR = REPO_ROOT / "seo-analysis" / "output" / "ndt-connect-30d"

SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]
PROPERTY_ID = "528251886"
LOOKBACK_DAYS = 30
EXCLUDE_PREFIXES = ("atlantis-idx-",)


def load_credential_files() -> list[Path]:
    return sorted(
        p for p in CREDS_DIR.glob("*.json")
        if p.is_file() and not any(p.name.startswith(prefix) for prefix in EXCLUDE_PREFIXES)
    )


def build_client(cred_path: Path) -> BetaAnalyticsDataClient:
    creds = service_account.Credentials.from_service_account_file(str(cred_path), scopes=SCOPES)
    return BetaAnalyticsDataClient(credentials=creds)


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


def find_working_client(pool: ClientPool) -> BetaAnalyticsDataClient | None:
    """Probe each credential until one has access to the property."""
    while True:
        cred = pool.current_path()
        try:
            client = pool.current_client()
            req = RunReportRequest(
                property=f"properties/{PROPERTY_ID}",
                date_ranges=[DateRange(start_date="7daysAgo", end_date="yesterday")],
                metrics=[Metric(name="sessions")],
                limit=1,
            )
            client.run_report(req)
            log.info("Credential %s has access", cred.name)
            return client
        except PermissionDenied:
            log.warning("%s: no GA4 access — trying next", cred.name)
            if not pool.rotate():
                return None
        except Exception as e:
            log.warning("%s: %s — trying next", cred.name, e)
            if not pool.rotate():
                return None


def run_report(client, request):
    return client.run_report(request)


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


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    pool = ClientPool(paths=load_credential_files())
    client = find_working_client(pool)
    if not client:
        log.error("No credential has access to GA4 property %s", PROPERTY_ID)
        return 2

    end = date.today() - timedelta(days=1)
    start = end - timedelta(days=LOOKBACK_DAYS)
    s, e = start.isoformat(), end.isoformat()
    log.info("Date range: %s..%s", s, e)

    # Acquisition channels
    req = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        date_ranges=[DateRange(start_date=s, end_date=e)],
        dimensions=[Dimension(name="sessionDefaultChannelGroup")],
        metrics=[
            Metric(name="sessions"),
            Metric(name="totalUsers"),
            Metric(name="engagedSessions"),
            Metric(name="averageSessionDuration"),
        ],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
        limit=100,
    )
    df = report_to_df(run_report(client, req))
    df.to_csv(OUT_DIR / "acquisition-channels.csv", index=False)
    log.info("acquisition-channels: %d rows", len(df))

    # Top landing pages
    req = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        date_ranges=[DateRange(start_date=s, end_date=e)],
        dimensions=[Dimension(name="landingPagePlusQueryString")],
        metrics=[
            Metric(name="sessions"),
            Metric(name="totalUsers"),
            Metric(name="engagedSessions"),
            Metric(name="bounceRate"),
            Metric(name="averageSessionDuration"),
        ],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
        limit=1000,
    )
    df = report_to_df(run_report(client, req))
    df.to_csv(OUT_DIR / "top-landing-pages.csv", index=False)
    log.info("top-landing-pages: %d rows", len(df))

    log.info("Done -> %s", OUT_DIR)
    return 0


if __name__ == "__main__":
    sys.exit(main())
