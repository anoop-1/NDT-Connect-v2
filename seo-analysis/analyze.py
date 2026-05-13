"""Analyze GSC + GA4 CSVs and produce quick-wins.md and funnel.md.

Reads everything from seo-analysis/output/{site}/ and writes:

    seo-analysis/output/quick-wins.md
    seo-analysis/output/funnel.md

Run from repo root:

    python seo-analysis/analyze.py
"""

from __future__ import annotations

import logging
import sys
from pathlib import Path

import pandas as pd

# --------------------------------------------------------------------------- config

LOG_FMT = "%(asctime)s  %(levelname)-7s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FMT, datefmt="%H:%M:%S")
log = logging.getLogger("analyze")

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = REPO_ROOT / "seo-analysis" / "output"

SITES = ["ndt-connect.com", "atlantisndt.com"]

# Industry-standard CTR-by-position benchmark (organic, desktop+mobile blended).
# Sources: Advanced Web Ranking / Sistrix / Backlinko meta-studies, 2023-2024.
# Used as the target CTR a page *should* hit at its current SERP position.
CTR_BENCHMARK = {
    1: 0.275, 2: 0.155, 3: 0.110, 4: 0.080, 5: 0.060,
    6: 0.045, 7: 0.038, 8: 0.032, 9: 0.027, 10: 0.024,
    11: 0.022, 12: 0.018, 13: 0.016, 14: 0.014, 15: 0.012,
    16: 0.011, 17: 0.010, 18: 0.009, 19: 0.008, 20: 0.007,
}
TAIL_CTR = 0.005  # positions 21+ benchmark


def benchmark_ctr(position: float) -> float:
    p = int(round(position))
    if p <= 0:
        return CTR_BENCHMARK[1]
    if p in CTR_BENCHMARK:
        return CTR_BENCHMARK[p]
    return TAIL_CTR


# --------------------------------------------------------------------------- loaders


def load_csv(path: Path) -> pd.DataFrame:
    if not path.exists():
        log.warning("Missing CSV: %s", path)
        return pd.DataFrame()
    return pd.read_csv(path)


# --------------------------------------------------------------------------- recommendations


def recommend_action(row: pd.Series) -> str:
    """Heuristic to label what action a page needs."""
    pos = row.get("position", 99.0)
    ctr = row.get("ctr", 0.0)
    impressions = row.get("impressions", 0)
    clicks = row.get("clicks", 0)
    bench = benchmark_ctr(pos)

    # Zero-click pages with significant impressions: title/meta failing hard.
    if clicks == 0 and impressions >= 100:
        if pos <= 10:
            return "rewrite-title"
        if pos <= 20:
            return "rewrite-title"
        return "consolidate"

    # Top-10 pages with sub-benchmark CTR: title/meta optimization.
    if pos <= 10 and ctr < bench * 0.6:
        return "rewrite-title"

    # Top-10 with mid CTR: meta description tweak.
    if pos <= 10 and ctr < bench:
        return "rewrite-meta"

    # Near-miss (pos 11-20) with real impressions: needs more content / internal links.
    if 10 < pos <= 20 and impressions >= 100:
        return "add-content"

    # Far pages with non-trivial impressions but no clicks: kill or consolidate.
    if pos > 30 and clicks == 0 and impressions >= 50:
        return "kill"

    # Pos 20-30 with low impressions: consolidate into stronger sibling.
    if 20 < pos <= 30:
        return "consolidate"

    return "rewrite-meta"


def expected_click_lift(row: pd.Series) -> float:
    """If CTR rose to the position benchmark, how many extra clicks would we get?"""
    impressions = row.get("impressions", 0)
    ctr = row.get("ctr", 0.0)
    bench = benchmark_ctr(row.get("position", 99.0))
    lift = max(bench - ctr, 0.0) * impressions
    return round(lift, 1)


# --------------------------------------------------------------------------- quick wins


def build_quick_wins(site: str) -> pd.DataFrame:
    site_dir = OUT_DIR / site
    pages = load_csv(site_dir / "pages.csv")
    pairs = load_csv(site_dir / "query-page-pairs.csv")

    if pages.empty:
        log.warning("No pages.csv for %s — skipping quick-wins build", site)
        return pd.DataFrame()

    # Determine top impression-driving query for each page.
    top_query_by_page: dict[str, str] = {}
    if not pairs.empty and "page" in pairs.columns and "query" in pairs.columns:
        # Group by page, pick the query with max impressions per page.
        idx = pairs.groupby("page")["impressions"].idxmax()
        top = pairs.loc[idx, ["page", "query"]]
        top_query_by_page = dict(zip(top["page"], top["query"]))

    pages = pages.copy()
    pages["site"] = site
    pages["top_query"] = pages["page"].map(top_query_by_page).fillna("")
    pages["benchmark_ctr"] = pages["position"].apply(benchmark_ctr)
    pages["expected_click_lift"] = pages.apply(expected_click_lift, axis=1)
    pages["action"] = pages.apply(recommend_action, axis=1)

    return pages


def write_quick_wins(all_pages: pd.DataFrame) -> None:
    out_path = OUT_DIR / "quick-wins.md"

    if all_pages.empty:
        out_path.write_text(
            "# Quick Wins\n\nNo data available — run pull-gsc.py first.\n",
            encoding="utf-8",
        )
        log.warning("Wrote empty quick-wins.md (no input data)")
        return

    # Rank by expected click lift, tiebreak on impressions.
    ranked = all_pages.sort_values(
        ["expected_click_lift", "impressions"], ascending=[False, False]
    ).head(50)

    lines: list[str] = []
    lines.append("# Quick Wins — Top 50 Pages to Fix This Month")
    lines.append("")
    lines.append(
        "Ranked by *expected click lift* if CTR rises to the median CTR for the "
        "page's current SERP position. Last 90 days of GSC data."
    )
    lines.append("")
    lines.append("**Action codes**")
    lines.append("")
    lines.append("- `rewrite-title` — title tag is undersized for SERP position; rewrite for click magnetism.")
    lines.append("- `rewrite-meta` — meta description not winning the click; rewrite with hook + CTA.")
    lines.append("- `add-content` — page is on page 2 (pos 11-20) with real demand; expand content + internal links.")
    lines.append("- `consolidate` — merge into stronger sibling page (canonical or 301).")
    lines.append("- `kill` — no demand, no clicks; remove and redirect to category root.")
    lines.append("")
    lines.append(
        "| # | Site | URL | Top query | Pos | CTR | Bench CTR | Impr | Clicks | "
        "Expected lift | Action |"
    )
    lines.append(
        "|---|------|-----|-----------|-----|-----|-----------|------|--------|"
        "---------------|--------|"
    )

    for i, (_, row) in enumerate(ranked.iterrows(), start=1):
        url = str(row.get("page", "")).replace("|", "\\|")
        top_q = str(row.get("top_query", "")).replace("|", "\\|")
        pos = row.get("position", 0.0)
        ctr = row.get("ctr", 0.0)
        bench = row.get("benchmark_ctr", 0.0)
        impr = int(row.get("impressions", 0))
        clicks = int(row.get("clicks", 0))
        lift = row.get("expected_click_lift", 0.0)
        action = row.get("action", "")
        site = row.get("site", "")
        lines.append(
            f"| {i} | {site} | {url} | {top_q} | {pos:.1f} | "
            f"{ctr * 100:.2f}% | {bench * 100:.2f}% | {impr} | {clicks} | "
            f"+{lift:.0f} | `{action}` |"
        )

    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Methodology")
    lines.append("")
    lines.append(
        "- **Expected lift** = `(benchmark_ctr_at_position - current_ctr) * impressions`."
    )
    lines.append(
        "- **Benchmark CTR** uses a published industry curve (AWR/Sistrix/Backlinko 2023-2024):"
    )
    lines.append("")
    lines.append("  | Position | CTR | Position | CTR |")
    lines.append("  |----------|-----|----------|-----|")
    for p in range(1, 11):
        right_p = p + 10
        lines.append(
            f"  | {p} | {CTR_BENCHMARK[p] * 100:.1f}% | "
            f"{right_p} | {CTR_BENCHMARK[right_p] * 100:.1f}% |"
        )
    lines.append(f"  | 21+ | {TAIL_CTR * 100:.1f}% | | |")
    lines.append("")
    lines.append("- Action heuristic: see code in `seo-analysis/analyze.py:recommend_action`.")
    lines.append("")

    out_path.write_text("\n".join(lines), encoding="utf-8")
    log.info("Wrote %s  (%d rows)", out_path, len(ranked))


# --------------------------------------------------------------------------- funnel


def build_funnel_narrative() -> None:
    out_path = OUT_DIR / "funnel.md"

    lines: list[str] = []
    lines.append("# Signup Funnel Analysis")
    lines.append("")
    lines.append(
        "Approximate funnel reconstructed from GA4 `signup-funnel.csv` (page views + "
        "events on URLs containing `register`)."
    )
    lines.append("")

    for site in SITES:
        site_dir = OUT_DIR / site
        funnel_df = load_csv(site_dir / "signup-funnel.csv")
        landing_df = load_csv(site_dir / "top-landing-pages.csv")
        channels_df = load_csv(site_dir / "acquisition-channels.csv")

        lines.append(f"## {site}")
        lines.append("")

        if funnel_df.empty:
            lines.append("_No signup funnel data — make sure GA4 is wired and the property ID is set._")
            lines.append("")
            continue

        # Page view event totals on /register paths.
        page_views = funnel_df[funnel_df["eventName"] == "page_view"]
        signup_events = funnel_df[
            funnel_df["eventName"].astype(str).str.contains("sign_up", case=False, na=False)
        ]

        total_register_views = page_views["eventCount"].astype(float).sum() if not page_views.empty else 0.0
        total_register_users = (
            page_views["totalUsers"].astype(float).sum() if not page_views.empty else 0.0
        )
        total_signups = (
            signup_events["eventCount"].astype(float).sum() if not signup_events.empty else 0.0
        )

        conv = (total_signups / total_register_views * 100.0) if total_register_views else 0.0

        lines.append(f"- `/register` page views (last 90d): **{int(total_register_views):,}**")
        lines.append(f"- Unique users on `/register`: **{int(total_register_users):,}**")
        lines.append(f"- Signup completion events (`sign_up*`): **{int(total_signups):,}**")
        lines.append(f"- View -> signup conversion rate: **{conv:.2f}%**")
        lines.append("")

        # Top register paths by event count.
        if not page_views.empty:
            top_paths = (
                page_views.groupby("pagePath")["eventCount"]
                .sum()
                .sort_values(ascending=False)
                .head(10)
            )
            lines.append("### Top `/register*` paths")
            lines.append("")
            lines.append("| Path | Views |")
            lines.append("|------|-------|")
            for path, views in top_paths.items():
                lines.append(f"| {path} | {int(views):,} |")
            lines.append("")

        # Where do these users come from? Channel mix.
        if not channels_df.empty:
            lines.append("### Acquisition channel mix (sessions, all pages)")
            lines.append("")
            lines.append("| Channel | Sessions | Conversions |")
            lines.append("|---------|----------|-------------|")
            channels_df_sorted = channels_df.sort_values("sessions", ascending=False)
            for _, r in channels_df_sorted.head(10).iterrows():
                lines.append(
                    f"| {r.get('sessionDefaultChannelGroup', '?')} | "
                    f"{int(float(r.get('sessions', 0))):,} | "
                    f"{int(float(r.get('conversions', 0))):,} |"
                )
            lines.append("")

        # Drop-off narrative.
        lines.append("### Where users drop off")
        lines.append("")
        if total_register_views == 0:
            lines.append("- No `/register` traffic detected — either GA4 is not firing on the page, or no one is reaching it. Check that the page-view event includes `register` in `page_path`.")
        elif total_signups == 0:
            lines.append("- Users *are* hitting `/register` but **zero** signup events fire. Most likely causes:")
            lines.append("  - `sign_up` GA4 event not implemented in the registration form submit handler.")
            lines.append("  - Form submit is breaking client-side (validation, CORS, 500).")
            lines.append("  - Conversion is happening on a different URL (e.g. `/welcome`) that we're not capturing.")
        elif conv < 5:
            lines.append(f"- Conversion rate of {conv:.2f}% is well below the 8-15% B2B SaaS norm. Investigate:")
            lines.append("  - Form length / required fields — drop optional fields above the fold.")
            lines.append("  - Social proof above the form (logos, testimonials).")
            lines.append("  - Email verification friction.")
        else:
            lines.append(f"- Conversion of {conv:.2f}% is healthy; focus on *driving more traffic to* `/register` rather than fixing the form.")

        # Compare register traffic vs total traffic.
        if not landing_df.empty:
            try:
                total_sessions = landing_df["sessions"].astype(float).sum()
                share = (
                    total_register_views / total_sessions * 100.0
                    if total_sessions
                    else 0.0
                )
                lines.append(
                    f"- `/register` views are **{share:.2f}%** of all landing-page sessions "
                    f"(`{int(total_register_views):,} / {int(total_sessions):,}`)."
                )
            except Exception:  # noqa: BLE001
                pass

        lines.append("")

    lines.append("---")
    lines.append("")
    lines.append("_Generated by `seo-analysis/analyze.py`._")

    out_path.write_text("\n".join(lines), encoding="utf-8")
    log.info("Wrote %s", out_path)


# --------------------------------------------------------------------------- main


def main() -> int:
    if not OUT_DIR.exists():
        log.error("Output dir does not exist: %s", OUT_DIR)
        log.error("Run pull-gsc.py and pull-ga4.py first.")
        return 1

    frames = []
    for site in SITES:
        df = build_quick_wins(site)
        if not df.empty:
            frames.append(df)

    all_pages = pd.concat(frames, ignore_index=True) if frames else pd.DataFrame()
    write_quick_wins(all_pages)
    build_funnel_narrative()

    log.info("Done. See %s", OUT_DIR)
    return 0


if __name__ == "__main__":
    sys.exit(main())
