"""Build REWRITE-PRIORITY.csv from the 30-day GSC pull + sitemap counts."""

from __future__ import annotations

import re
from collections import defaultdict
from pathlib import Path

import pandas as pd

REPO_ROOT = Path(__file__).resolve().parent.parent
GSC_DIR = REPO_ROOT / "seo-analysis" / "output" / "ndt-connect-30d"
SITEMAP_BODY = REPO_ROOT / ".next" / "server" / "app" / "sitemap.xml.body"
OUT_CSV = REPO_ROOT / "seo-analysis" / "output" / "REWRITE-PRIORITY.csv"


def url_family(url: str) -> str:
    """Classify URL into a family bucket. Returns family slug."""
    # strip protocol/host
    path = re.sub(r"^https?://[^/]+", "", url).strip("/")
    if not path:
        return "homepage"
    parts = path.split("/")
    head = parts[0]

    # 2-level families with city + method (e.g. ndt-services/houston/ultrasonic-testing)
    if head in ("ndt-services", "cost-guide", "training", "compare", "free-tools"):
        if len(parts) >= 3:
            return f"{head}/{{city}}/{{method}}"
        elif len(parts) == 2:
            return f"{head}/{{city}}"
        return head
    if head == "careers":
        if len(parts) >= 2 and parts[1] == "roles":
            return "careers/roles/{role}"
        if len(parts) >= 2:
            return "careers/{city}"
        return "careers"
    if head in ("blog", "glossary", "standards", "industries", "certifications", "services"):
        return head
    if head == "tools":
        return "tools/{tool}"
    return head  # about, contact, faq, etc.


def load_sitemap_families() -> dict[str, int]:
    counts = defaultdict(int)
    if not SITEMAP_BODY.exists():
        print(f"WARN: sitemap body not found at {SITEMAP_BODY}")
        return counts
    text = SITEMAP_BODY.read_text(encoding="utf-8", errors="ignore")
    urls = re.findall(r"<loc>([^<]+)</loc>", text)
    for u in urls:
        counts[url_family(u)] += 1
    return counts


def main() -> int:
    pages = pd.read_csv(GSC_DIR / "pages.csv")
    pages["family"] = pages["page"].apply(url_family)

    fam_counts = load_sitemap_families()
    print(f"Sitemap families: {len(fam_counts)} buckets, {sum(fam_counts.values())} URLs")

    # Aggregate per family
    agg = pages.groupby("family").agg(
        sample_url=("page", "first"),
        urls_indexed=("page", "nunique"),
        sum_impressions_30d=("impressions", "sum"),
        sum_clicks_30d=("clicks", "sum"),
        avg_position=("position", "mean"),
    ).reset_index().rename(columns={"family": "url_family"})

    # Add families that have NO indexed pages but exist in sitemap
    indexed_families = set(agg["url_family"])
    rows = []
    for fam, cnt in fam_counts.items():
        if fam not in indexed_families:
            rows.append({
                "url_family": fam,
                "sample_url": "",
                "urls_indexed": 0,
                "sum_impressions_30d": 0,
                "sum_clicks_30d": 0,
                "avg_position": 0.0,
            })
    if rows:
        agg = pd.concat([agg, pd.DataFrame(rows)], ignore_index=True)

    # Add count_in_family
    agg["count_in_family"] = agg["url_family"].map(lambda f: fam_counts.get(f, 0))
    agg["is_indexed"] = agg["urls_indexed"] > 0

    # Round
    agg["avg_position"] = agg["avg_position"].round(2)
    agg["sum_impressions_30d"] = agg["sum_impressions_30d"].astype(int)
    agg["sum_clicks_30d"] = agg["sum_clicks_30d"].astype(int)

    # Traffic upside score
    # Goal: estimate clicks if family pages move from current position to position 4 (avg)
    # CTR curve (rough Google avg): pos1=28%, pos2=15%, pos3=11%, pos4=8%, pos5=7%, pos6=5%, pos7=4%, pos8=3%, pos9=2.5%, pos10=2%, pos11+=1%
    CTR_CURVE = {1: 0.28, 2: 0.15, 3: 0.11, 4: 0.08, 5: 0.07, 6: 0.05, 7: 0.04, 8: 0.03, 9: 0.025, 10: 0.02}

    def ctr_at(pos: float) -> float:
        if pos < 1: return 0.28
        i = int(round(pos))
        if i in CTR_CURVE: return CTR_CURVE[i]
        if i > 10: return 0.01
        return 0.02

    def upside(row) -> float:
        # If indexed: model lift from current position to position 4
        # If not indexed: project potential = (avg impressions per indexed sibling) * count_in_family * ctr@5
        # Use per-URL impression density to extrapolate to non-indexed siblings.
        if row["is_indexed"]:
            per_url_impr = row["sum_impressions_30d"] / max(row["urls_indexed"], 1)
            # Project across full family if many siblings still un-indexed (showing slow indexation)
            # Use a discount: assume 50% of un-indexed siblings would draw similar impressions if indexed
            unindexed = max(row["count_in_family"] - row["urls_indexed"], 0)
            projected_impr = row["sum_impressions_30d"] + (per_url_impr * unindexed * 0.5)
            target_ctr = ctr_at(4)
            current_ctr = ctr_at(row["avg_position"])
            # Lift = projected_impr * (target_ctr - current_ctr)
            lift = projected_impr * max(target_ctr - current_ctr, 0)
            # Add a small bonus for already-earned clicks (sustained value)
            return float(lift + row["sum_clicks_30d"] * 2)
        else:
            # No GSC impressions at all — speculative; weight by family size
            return float(row["count_in_family"] * 0.05)

    agg["traffic_upside_score"] = agg.apply(upside, axis=1).round(1)

    # Priority bucketing
    # 1 = top-decile upside AND already partially indexed (rewrite first)
    # 2 = strong upside (indexed) OR very large family with some indexation
    # 3 = mid upside
    # 4 = low upside but worth eventually
    # 5 = skip / consider noindex (zero impressions, large family, hard to make unique)

    def assign_priority(row) -> int:
        score = row["traffic_upside_score"]
        if not row["is_indexed"] and row["count_in_family"] >= 100:
            # Big un-indexed family — likely thin content, candidate for noindex/consolidation
            return 5
        if not row["is_indexed"]:
            return 4
        if score >= 50:
            return 1
        if score >= 15:
            return 2
        if score >= 5:
            return 3
        return 4

    agg["rewrite_priority"] = agg.apply(assign_priority, axis=1)

    def rationale(row) -> str:
        score = row["traffic_upside_score"]
        impr = row["sum_impressions_30d"]
        pos = row["avg_position"]
        cnt = row["count_in_family"]
        idx = row["urls_indexed"]
        if row["rewrite_priority"] == 1:
            return f"{impr} impr at avg pos {pos} across {idx}/{cnt} indexed; rewrite + intent-match unlocks top-3 CTR (~{score:.0f} click upside)."
        if row["rewrite_priority"] == 2:
            return f"{impr} impr/{idx} indexed pages; pos {pos} is winnable to top-5 with stronger on-page (~{score:.0f} click upside)."
        if row["rewrite_priority"] == 3:
            return f"Modest demand ({impr} impr, pos {pos}); refresh after P1/P2 families."
        if row["rewrite_priority"] == 4:
            if not row["is_indexed"]:
                return f"Not indexed yet ({cnt} URLs in family); investigate crawl / submit before rewriting."
            return f"Low traffic potential ({impr} impr); deprioritize."
        return f"Large unindexed family ({cnt} URLs, 0 impressions in 30d) — risk of thin content; consider noindex or aggressive consolidation."

    agg["rationale"] = agg.apply(rationale, axis=1)

    # Reorder
    cols = [
        "url_family", "sample_url", "count_in_family", "urls_indexed", "is_indexed",
        "sum_impressions_30d", "sum_clicks_30d", "avg_position",
        "traffic_upside_score", "rewrite_priority", "rationale",
    ]
    agg = agg[cols].sort_values(
        ["rewrite_priority", "traffic_upside_score"], ascending=[True, False]
    )

    OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    agg.to_csv(OUT_CSV, index=False)
    print(f"Wrote {OUT_CSV} with {len(agg)} families")
    print()
    print(agg.to_string(index=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
