"""Smoke-test page uniqueness across the live site after a deploy.

Hits real URLs, strips HTML, and computes pairwise vocabulary uniqueness
across same-family pages. Targets ≥30% pairwise — Google's deduplicator
threshold below which pages get tagged "Duplicate, Google chose different
canonical than user".

Usage:
    python seo-analysis/sample-uniqueness-check.py             # full sweep
    python seo-analysis/sample-uniqueness-check.py --family training
    python seo-analysis/sample-uniqueness-check.py --base http://localhost:3000

Exit code 0 = all families ≥30%; 1 = at least one family below threshold.
"""
from __future__ import annotations

import argparse
import re
import ssl
import sys
import urllib.request
from itertools import combinations

DEFAULT_BASE = "https://ndt-connect.com"
PASS_THRESHOLD = 30.0  # %

# Three sample URLs per family — cities chosen to span tiers/regions so any
# template artefacts show up clearly. These are the URLs the deploy is
# expected to render uniquely after the cities.json + city-content.ts +
# standards-content.ts patches in this repo.
SAMPLES = {
    "cost-guide/{city}/{method}": [
        "/cost-guide/houston-tx/ultrasonic-testing",
        "/cost-guide/aberdeen-uk/ultrasonic-testing",
        "/cost-guide/jubail-sa/ultrasonic-testing",
    ],
    "ndt-services/{city}/{method}": [
        "/ndt-services/mumbai-in/radiographic-testing",
        "/ndt-services/perth-au/radiographic-testing",
        "/ndt-services/dallas-tx/radiographic-testing",
    ],
    "training/{city}": [
        "/training/houston-tx",
        "/training/dubai-ae",
        "/training/aberdeen-uk",
    ],
    "careers/{city}": [
        "/careers/calgary-ab",
        "/careers/jamnagar-in",
        "/careers/pittsburgh-pa",
    ],
    "standards/{code}": [
        "/standards/api-510",
        "/standards/asme-section-v",
        "/standards/api-653",
    ],
    "glossary/{term}": [
        "/glossary/a-scan",
        "/glossary/calibration-block",
        "/glossary/dye-penetrant",
    ],
    "compare/{slug}": [
        "/compare/radiographic-testing-vs-phased-array-ut",
        "/compare/ultrasonic-testing-vs-tofd-testing",
        "/compare/magnetic-particle-testing-vs-penetrant-testing",
    ],
}


def fetch(url: str) -> str | None:
    try:
        ctx = ssl.create_default_context()
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (uniqueness-bot)"})
        return urllib.request.urlopen(req, timeout=15, context=ctx).read().decode("utf-8", "replace")
    except Exception as exc:  # noqa: BLE001
        print(f"  fetch error: {url} -> {exc}", file=sys.stderr)
        return None


def text_only(html: str | None) -> str:
    if not html:
        return ""
    text = re.sub(r"<script[^>]*>.*?</script>", "", html, flags=re.DOTALL)
    text = re.sub(r"<style[^>]*>.*?</style>", "", text, flags=re.DOTALL)
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def pairwise_uniqueness(texts: list[str]) -> tuple[float, list[int]]:
    sets = [set(t.split()) for t in texts if t]
    if len(sets) < 2:
        return 0.0, [len(s) for s in sets]
    pairs = []
    for a, b in combinations(sets, 2):
        union = a | b
        if not union:
            continue
        pairs.append(len(a ^ b) / len(union) * 100)
    return (sum(pairs) / len(pairs)) if pairs else 0.0, [len(s) for s in sets]


def run(base: str, family_filter: str | None) -> int:
    print(f"\n{'Route family':45s}{'Avg pairwise uniq%':>22s}{'Status':>10s}  Word counts")
    print("-" * 100)
    failures = 0
    for family, paths in SAMPLES.items():
        if family_filter and family_filter not in family:
            continue
        urls = [base.rstrip("/") + p for p in paths]
        texts = [text_only(fetch(u)) for u in urls]
        score, wcs = pairwise_uniqueness(texts)
        status = "OK" if score >= PASS_THRESHOLD else "POOR"
        if status == "POOR":
            failures += 1
        print(f"{family:45s}{score:>22.1f}{status:>10s}  {wcs}")
    print()
    if failures == 0:
        print(f"All sampled families ≥ {PASS_THRESHOLD:.0f}% pairwise uniqueness.")
    else:
        print(f"{failures} family/families below {PASS_THRESHOLD:.0f}% — investigate the listed routes.")
    return 1 if failures else 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", default=DEFAULT_BASE, help="Base URL (default %(default)s)")
    parser.add_argument("--family", help="Filter to one family (substring match)")
    args = parser.parse_args()
    return run(args.base, args.family)


if __name__ == "__main__":
    sys.exit(main())
