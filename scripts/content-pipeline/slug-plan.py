"""Generate the 10-day, 3000-slug content plan.

Output: `scripts/content-pipeline/daily-plan.json` — keyed by day (1..10), each
value is a list of {bucket, slug, brief} entries.

The plan multiplies the seed slug space across method × geography × industry
× defect-mechanism × code combinations so we get 300 unique URLs per day for
10 days without duplicates.

Run once when setting up. Re-run to rebuild the plan after edits below.
"""
from __future__ import annotations

import json
import itertools
from pathlib import Path
from typing import Iterable

OUT = Path(__file__).parent / 'daily-plan.json'

# ---- seed dimensions ---------------------------------------------------------

METHODS_18 = [
    'ultrasonic-testing', 'radiographic-testing', 'magnetic-particle-testing',
    'penetrant-testing', 'eddy-current-testing', 'visual-testing',
    'phased-array-ut', 'tofd-testing', 'guided-wave-testing',
    'acoustic-emission-testing', 'magnetic-flux-leakage', 'corrosion-mapping',
    'computed-radiography', 'digital-radiography', 'ultrasonic-thickness-measurement',
    'leak-testing', 'infrared-thermography', 'hardness-testing',
]

INDUSTRIES_12 = [
    'oil-and-gas', 'aerospace', 'power-generation', 'manufacturing',
    'marine-and-offshore', 'construction', 'mining', 'nuclear',
    'automotive', 'rail', 'pipeline-transmission', 'lng',
]

STATES_25 = [
    'tx', 'la', 'ca', 'ok', 'ak', 'nd', 'pa', 'wv', 'wy', 'co',
    'nm', 'ks', 'oh', 'in', 'il', 'mi', 'ny', 'fl', 'ga', 'al',
    'ms', 'mt', 'nv', 'ar', 'ut',
]

DEFECTS_20 = [
    'fatigue-cracks', 'stress-corrosion-cracking', 'hydrogen-induced-cracking',
    'sulphide-stress-cracking', 'pitting-corrosion', 'corrosion-under-insulation',
    'lack-of-fusion', 'incomplete-penetration', 'porosity', 'slag-inclusions',
    'undercut', 'lamination', 'delamination', 'wall-thinning',
    'erosion-corrosion', 'hic-blistering', 'creep-cracking', 'thermal-fatigue',
    'weld-decay', 'micro-pitting',
]

ASSETS_15 = [
    'pressure-vessel', 'piping', 'storage-tank', 'pipeline', 'heat-exchanger',
    'reactor', 'boiler-tube', 'turbine-blade', 'flange', 'crane-pedestal',
    'mooring-chain', 'wind-turbine-blade', 'offshore-jacket-leg',
    'cryogenic-tank', 'spherical-tank',
]

CODES_15 = [
    'asme-section-v', 'asme-section-viii', 'asme-b31-1', 'asme-b31-3',
    'asme-b31-4', 'asme-b31-8', 'api-510', 'api-570', 'api-653',
    'api-579', 'api-1104', 'aws-d1-1', 'iso-9712', 'iso-17636', 'astm-e164',
]

EQUIPMENT_30 = [
    'epoch-650-vs-omniscan-x3', 'omniscan-x3-vs-topaz-pa',
    'epoch-650-uses-and-limits', 'sonatest-veo-plus-review',
    'gilardoni-bordeaux-450-buyers-guide', 'yxlon-mu60-review',
    'ir-192-source-management', 'co-60-source-changeout-procedure',
    'se-75-vs-ir-192-selection', 'parker-y8-yoke-vs-y6',
    'magnaflux-zb-200-deep-dive', 'sherwin-spotcheck-spd-review',
    'eddyfi-reddy-vs-mantis', 'baker-hughes-mentor-ut-pros-cons',
    'krautkramer-usm-go-plus-buyers-guide', 'rapidscan-3-automated-ut',
    'iiw-v1-vs-v2-calibration-blocks', 'astm-e164-block-selection',
    'eddyfi-ectane-2-review', 'paut-probe-selection-guide',
    'angle-beam-probe-selection', 'dual-element-probe-uses',
    'immersion-tank-setup-for-paut', 'corrosion-mapping-array-systems',
    'tofd-probe-array-selection', 'pamel-paut-encoder-comparison',
    'eddy-current-probe-selection', 'magnetic-flux-leakage-tools',
    'pipeline-pig-types-for-inline-inspection', 'phased-array-wedge-selection',
]

ROLES_20 = [
    'ndt-technician-level-1', 'ndt-technician-level-2', 'ndt-technician-level-3',
    'ndt-inspector', 'radiographic-technician', 'ultrasonic-technician',
    'welding-inspector', 'corrosion-engineer', 'ndt-supervisor', 'ndt-manager',
    'quality-assurance-manager', 'pipeline-inspector', 'offshore-ndt-technician',
    'aerospace-ndt-specialist', 'ndt-trainer', 'phased-array-specialist',
    'mt-inspector', 'pt-inspector', 'eddy-current-specialist', 'ndt-consultant',
]


# ---- bucket generators -------------------------------------------------------
# Each yields (slug, brief).  Brief = one-paragraph guide to the LLM about
# what the page should cover, before the STYLE_GUIDE rules kick in.

def gen_method_x_industry() -> Iterable[tuple[str, str, str]]:
    for m, i in itertools.product(METHODS_18, INDUSTRIES_12):
        yield (
            'method-x-industry',
            f'{m}-for-{i}',
            f'Long-form: how {m.replace("-", " ")} is specifically applied in {i.replace("-", " ")} — assets covered, dominant defects, governing codes, contractor selection, cost drivers.',
        )

def gen_method_x_state() -> Iterable[tuple[str, str, str]]:
    for m, s in itertools.product(METHODS_18, STATES_25):
        yield (
            'method-x-state',
            f'{m}-in-{s}',
            f'State-level guide: {m.replace("-", " ")} market in {s.upper()} — top metros, asset owners, demand by sector, salary bands, certification availability.',
        )

def gen_industry_x_state() -> Iterable[tuple[str, str, str]]:
    for i, s in itertools.product(INDUSTRIES_12, STATES_25):
        yield (
            'industry-x-state',
            f'{i}-inspection-in-{s}',
            f'How {i.replace("-", " ")} inspection works in {s.upper()} — major facilities, regulatory bodies, dominant methods, hiring climate.',
        )

def gen_defect_x_method() -> Iterable[tuple[str, str, str]]:
    for d, m in itertools.product(DEFECTS_20, METHODS_18):
        yield (
            'defect-x-method',
            f'detecting-{d}-with-{m}',
            f'How to detect {d.replace("-", " ")} using {m.replace("-", " ")} — detection physics, procedure, sensitivity limits, acceptance criteria, false-positive avoidance.',
        )

def gen_asset_x_method() -> Iterable[tuple[str, str, str]]:
    for a, m in itertools.product(ASSETS_15, METHODS_18):
        yield (
            'asset-x-method',
            f'{m}-of-{a}',
            f'{m.replace("-", " ")} applied to {a.replace("-", " ")} — geometry constraints, dominant defects, procedure outline, governing standard.',
        )

def gen_code_x_industry() -> Iterable[tuple[str, str, str]]:
    for c, i in itertools.product(CODES_15, INDUSTRIES_12):
        yield (
            'code-x-industry',
            f'{c}-applied-to-{i}',
            f'How {c.upper().replace("-", " ")} is invoked in {i.replace("-", " ")} — scope, key clauses, audit findings, where it intersects other codes.',
        )

def gen_role_x_industry() -> Iterable[tuple[str, str, str]]:
    for r, i in itertools.product(ROLES_20, INDUSTRIES_12):
        yield (
            'role-x-industry',
            f'{r}-in-{i}',
            f'Career deep-dive: working as a {r.replace("-", " ")} in {i.replace("-", " ")} — day-in-the-life, cert pathway, salary band, hiring outlook.',
        )

def gen_equipment_deep_dives() -> Iterable[tuple[str, str, str]]:
    for e in EQUIPMENT_30:
        yield (
            'equipment-deep',
            e,
            f'Long-form equipment piece on {e.replace("-", " ")} — spec, real-world performance notes, alternatives, buying advice.',
        )

def gen_role_x_state() -> Iterable[tuple[str, str, str]]:
    for r, s in itertools.product(ROLES_20[:10], STATES_25):
        yield (
            'role-x-state',
            f'{r}-in-{s}',
            f'Career page: {r.replace("-", " ")} jobs and pay in {s.upper()} — employer base, salary band, certification availability locally.',
        )

def gen_code_x_method() -> Iterable[tuple[str, str, str]]:
    for c, m in itertools.product(CODES_15, METHODS_18):
        yield (
            'code-x-method',
            f'{c}-procedures-using-{m}',
            f'How {c.upper().replace("-", " ")} governs {m.replace("-", " ")} procedures — required qualifications, technique sheets, acceptance criteria, audit triggers.',
        )

def gen_defect_x_asset() -> Iterable[tuple[str, str, str]]:
    for d, a in itertools.product(DEFECTS_20, ASSETS_15):
        yield (
            'defect-x-asset',
            f'{d}-in-{a}',
            f'How {d.replace("-", " ")} manifests in {a.replace("-", " ")} — root cause physics, detection difficulty, recommended NDT methods, code references.',
        )

def gen_defect_x_industry() -> Iterable[tuple[str, str, str]]:
    for d, i in itertools.product(DEFECTS_20, INDUSTRIES_12):
        yield (
            'defect-x-industry',
            f'{d}-in-{i}',
            f'Prevalence and management of {d.replace("-", " ")} in {i.replace("-", " ")} — incident history, monitoring strategies, regulatory drivers, vendor selection.',
        )


# ---- assemble plan -----------------------------------------------------------

def build_plan(target_per_day: int = 300, days: int = 10) -> dict:
    """Round-robin pull from each generator, dedup by slug, pack into N days."""
    generators = [
        gen_method_x_industry,    # 18 × 12 = 216
        gen_method_x_state,       # 18 × 25 = 450
        gen_industry_x_state,     # 12 × 25 = 300
        gen_defect_x_method,      # 20 × 18 = 360
        gen_asset_x_method,       # 15 × 18 = 270
        gen_code_x_industry,      # 15 × 12 = 180
        gen_role_x_industry,      # 20 × 12 = 240
        gen_role_x_state,         # 10 × 25 = 250
        gen_equipment_deep_dives, # 30
        gen_code_x_method,        # 15 × 18 = 270
        gen_defect_x_asset,       # 20 × 15 = 300
        gen_defect_x_industry,    # 20 × 12 = 240
    ]
    streams = [g() for g in generators]
    seen: set[str] = set()
    pool: list[tuple[str, str, str]] = []
    while True:
        progress = False
        for s in streams:
            try:
                bucket, slug, brief = next(s)
                if slug in seen:
                    continue
                seen.add(slug)
                pool.append((bucket, slug, brief))
                progress = True
                if len(pool) >= target_per_day * days:
                    break
            except StopIteration:
                continue
        if len(pool) >= target_per_day * days or not progress:
            break
    # Pack into days
    plan: dict[str, list[dict]] = {}
    for i in range(days):
        start = i * target_per_day
        chunk = pool[start:start + target_per_day]
        plan[f'day-{i + 1:02d}'] = [
            {'bucket': b, 'slug': s, 'brief': br} for (b, s, br) in chunk
        ]
    return plan


def main() -> int:
    plan = build_plan()
    OUT.write_text(json.dumps(plan, indent=2))
    print(f'Wrote plan: {OUT}')
    total = sum(len(v) for v in plan.values())
    print(f'Total slugs: {total}')
    print('Per-day counts:')
    for k, v in plan.items():
        print(f'  {k}: {len(v)}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
