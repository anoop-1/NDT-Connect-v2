"""Build per-URL rewrite priority CSV for ndt-connect.com.

Joins the full 3,558-URL sitemap against 30-day GSC pages.csv (resolving 301s)
and produces seo-analysis/output/rewrite-priority.csv with priority tiers
T1/T2/T3.
"""

from __future__ import annotations

import re
from pathlib import Path

import pandas as pd

REPO = Path(__file__).resolve().parent.parent
GSC_DIR = REPO / "seo-analysis" / "output" / "ndt-connect-30d"
SITEMAP = Path("/tmp/sitemap-root.xml")
REDIRECTS = Path("/tmp/gsc-redirects.tsv")
OUT_CSV = REPO / "seo-analysis" / "output" / "rewrite-priority.csv"


# ---- URL family classification ------------------------------------------------

def url_family(url: str) -> str:
    path = re.sub(r"^https?://[^/]+", "", url).strip("/")
    if not path:
        return "homepage"
    parts = path.split("/")
    head = parts[0]

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
    if head in ("blog", "glossary", "standards", "industries",
                "certifications", "services"):
        return head
    if head == "tools":
        return "tools/{tool}"
    return head


FAMILY_WEIGHT = {
    "homepage": 100.0,
    "blog": 25.0,
    "compare": 25.0,
    "free-tools": 20.0,
    "tools/{tool}": 20.0,
    "glossary": 12.0,
    "standards": 12.0,
    "industries": 12.0,
    "certifications": 10.0,
    "services": 10.0,
    "ndt-services": 8.0,
    "cost-guide": 8.0,
    "training": 8.0,
    "ndt-services/{city}": 6.0,
    "cost-guide/{city}": 6.0,
    "training/{city}": 5.0,
    "compare/{city}": 5.0,
    "free-tools/{city}": 5.0,
    # The huge templated city+method matrix gets the lowest base weight
    "ndt-services/{city}/{method}": 1.5,
    "cost-guide/{city}/{method}": 1.5,
    "training/{city}/{method}": 1.0,
    "free-tools/{city}/{method}": 1.0,
    "compare/{city}/{method}": 2.0,
    "careers": 5.0,
    "careers/{city}": 3.0,
    "careers/roles/{role}": 3.0,
    "about": 8.0,
    "contact": 6.0,
    "faq": 6.0,
    "find-providers": 15.0,
    "login": 0.0,
    "signup": 0.0,
    "privacy": 0.0,
    "terms": 0.0,
}


def family_weight(fam: str) -> float:
    return FAMILY_WEIGHT.get(fam, 4.0)


def normalise(u: str) -> str:
    u = u.strip()
    if u.endswith("/") and u.count("/") > 3:
        u = u[:-1]
    return u


def load_sitemap() -> list[str]:
    text = SITEMAP.read_text(encoding="utf-8", errors="ignore")
    return [u.strip() for u in re.findall(r"<loc>([^<]+)</loc>", text)]


def load_redirect_map() -> dict[str, str]:
    if not REDIRECTS.exists():
        return {}
    out = {}
    for line in REDIRECTS.read_text().splitlines():
        if "\t" not in line:
            continue
        src, dst = line.split("\t", 1)
        # Drop query-string variants so /find-providers?country=eg merges to /find-providers
        dst = dst.split("?")[0].split("#")[0]
        out[src.strip()] = dst.strip()
    return out


def main() -> int:
    pages = pd.read_csv(GSC_DIR / "pages.csv")

    # Resolve 301s so impressions land on the live sitemap URL
    redirect_map = load_redirect_map()
    pages["page_resolved"] = pages["page"].map(
        lambda u: redirect_map.get(u, u)
    )
    pages["url_norm"] = pages["page_resolved"].apply(normalise)
    pages.loc[
        pages["url_norm"] == "https://ndt-connect.com/", "url_norm"
    ] = "https://ndt-connect.com"

    gsc = pages.groupby("url_norm").agg(
        currentClicks30d=("clicks", "sum"),
        currentImpr30d=("impressions", "sum"),
        avgPosition=("position", "mean"),
        ctr=("ctr", "mean"),
    ).reset_index()

    sitemap_urls = load_sitemap()
    df = pd.DataFrame({"url": sitemap_urls})
    df["url_norm"] = df["url"].apply(normalise)
    df["family"] = df["url"].apply(url_family)

    df = df.merge(gsc, on="url_norm", how="left")
    df[["currentClicks30d", "currentImpr30d"]] = df[
        ["currentClicks30d", "currentImpr30d"]
    ].fillna(0).astype(int)
    df["avgPosition"] = df["avgPosition"].fillna(0.0).round(2)
    df["ctr"] = df["ctr"].fillna(0.0).round(4)
    df["indexed"] = df["currentImpr30d"] > 0

    # ---- Priority score ------------------------------------------------------
    # impressions / max(position, 5)  -> rewards near-page-1 high-impression URLs
    # nearmiss bonus -> position 11..30 with >=30 impressions (rewrite to win SERP)
    # family weight  -> bias toward formats Google indexes & links well
    # clicks bonus   -> proven intent

    def score(row) -> float:
        impr = row["currentImpr30d"]
        pos = row["avgPosition"] if row["avgPosition"] > 0 else 50.0
        base = impr / max(pos, 5.0)

        nearmiss = 0.0
        if 11 <= pos <= 30 and impr >= 30:
            nearmiss = impr * 0.5

        fw = family_weight(row["family"])

        if impr == 0:
            return fw

        clicks_bonus = row["currentClicks30d"] * 5.0
        return base + nearmiss + fw + clicks_bonus

    df["priorityScore"] = df.apply(score, axis=1).round(2)

    df = df.sort_values("priorityScore", ascending=False).reset_index(drop=True)
    df["rank"] = df.index + 1

    def tier(rank: int) -> str:
        if rank <= 200:
            return "T1"
        if rank <= 1000:
            return "T2"
        return "T3"

    df["tier"] = df["rank"].apply(tier)

    out = df[[
        "url", "family", "currentImpr30d", "currentClicks30d",
        "avgPosition", "ctr", "indexed", "priorityScore", "tier",
    ]]
    OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    out.to_csv(OUT_CSV, index=False)

    print(f"Wrote {OUT_CSV} with {len(out)} rows")
    print()
    print("Tier counts:")
    print(out["tier"].value_counts().sort_index().to_string())
    print()
    print("Top 20:")
    print(out.head(20).to_string(index=False))
    print()
    print("Family x tier breakdown:")
    print(out.groupby(["family", "tier"]).size().unstack(fill_value=0).to_string())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
