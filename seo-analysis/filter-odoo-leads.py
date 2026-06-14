#!/usr/bin/env python3
"""Pull all crm.lead from Odoo, classify by NDT Connect ICP (provider / inspector
/ buyer / junk) using existing tags + keyword heuristics, write filtered CSVs of
the genuinely relevant prospects only. Email channel is dead -> keep leads with
ANY reachable handle (phone / website / linkedin), not just email."""
import sys, re, csv, xmlrpc.client
from pathlib import Path

URL="https://odoo.atlantisndt.com"; DB="atlantis"; USER="anu.anoop485@gmail.com"
PW=sys.argv[1]
OUT=Path(__file__).resolve().parent / "output" / "odoo-filtered"
OUT.mkdir(parents=True, exist_ok=True)

common=xmlrpc.client.ServerProxy(f"{URL}/xmlrpc/2/common")
uid=common.authenticate(DB,USER,PW,{})
models=xmlrpc.client.ServerProxy(f"{URL}/xmlrpc/2/object")
def x(m,meth,args=None,**k): return models.execute_kw(DB,uid,PW,m,meth,args if args is not None else [],k)

# tag id -> name
tags={t["id"]:t["name"] for t in x("crm.tag","search_read",[[]],fields=["name"])}

FIELDS=["partner_name","contact_name","email_from","phone","website","city",
        "country_id","description","function","tag_ids","stage_id"]
n=x("crm.lead","search_count",[[]]); print(f"total leads: {n}")
rows=[]; off=0
while off<n:
    batch=x("crm.lead","search_read",[[]],fields=FIELDS,limit=500,offset=off,order="id")
    rows.extend(batch); off+=500
    print(f"  pulled {len(rows)}/{n}")
print("pulled all.")

# dedup by email / website / name
seen=set(); dedup=[]
for r in rows:
    key=((r.get("email_from") or "").lower().strip() or (r.get("website") or "").lower().strip()
         or (r.get("partner_name") or "").lower().strip())
    if key and key not in seen:
        seen.add(key); dedup.append(r)
rows=dedup
print("after dedup:",len(rows))

# --- classification -------------------------------------------------------
NDT=r"\b(ndt|nde|non[- ]?destructive|radiograph|ultrasonic|phased array|paut|tofd|eddy current|magnetic particle|dye penet|\bmt\b|\bpt\b|\but\b|\brt\b|asnt|aws cwi|\bcwi\b|inspection|testing|integrity|corrosion)\b"
INSPECTOR=r"\b(inspector|level ii|level iii|level 2|level 3|technician|cwi|asnt|aci|api 510|api 570|api 653|qa/qc|qaqc)\b"
BUYER=r"\b(oil|gas|refiner|petrochem|\bepc\b|pipeline|power|nuclear|fabricat|weld|steel|manufactur|plant|shipyard|marine|aerospace|energy|chemical|offshore|drilling|boiler|pressure vessel|tank|mining|cement|automotive|foundry)\b"
JUNKNAME=re.compile(r"^[\s\d\+\(\)\-\.]+$|mon[–\-]|^\d|am[–\-]|street|^\s*$|call us|services and segments|^https?:|@", re.I)

def text(r):
    parts=[r.get("partner_name") or "", r.get("website") or "", r.get("description") or "",
           r.get("function") or "", r.get("contact_name") or "",
           " ".join(tags.get(t,"") for t in r.get("tag_ids",[]))]
    return " ".join(parts).lower()

def has_email(r): return "@" in (r.get("email_from") or "")
def has_web(r):
    w=(r.get("website") or "").strip().lower()
    return w.startswith("http") or ("." in w and " " not in w and len(w)>4 and not w.startswith("tel:"))

def quality(r):
    """Real, reachable business: proper name + a website or email (not phone-only scrape)."""
    name=(r.get("partner_name") or "").strip()
    if not name or len(name)<3 or JUNKNAME.match(name): return False
    return has_email(r) or has_web(r)

# Equipment/supply/media/academia — NOT marketplace providers or buyers.
EXCLUDE=re.compile(r"\b(instrument|equipment|supplies|supply|supplier|manufactur|software|systems?|sensor|probe|device|magazine|journal|associat|society|academy|universit|institute|college|distribut|trading|machinery|consumable|gauge|calibrat\w*\s+lab)\b", re.I)
# Genuine NDT inspection SERVICE firm signal.
SERVICE=re.compile(r"\b(ndt|nde|inspection|inspect|testing|integrity|radiograph|ultrasonic|inspec)\b", re.I)

def classify(r):
    if not quality(r): return "junk"
    name=(r.get("partner_name") or "").lower(); web=(r.get("website") or "").lower()
    nw=name+" "+web
    tagnames=" ".join(tags.get(i,"") for i in r.get("tag_ids",[])).lower()
    fn=(r.get("function") or "").lower()
    if "not a prospect" in tagnames: return "junk"
    if EXCLUDE.search(nw): return "vendor"   # equipment/supply/media — wrong ICP
    if fn and re.search(INSPECTOR, fn) and r.get("contact_name"): return "inspector"
    if SERVICE.search(nw): return "provider"  # genuine inspection-service firm
    if re.search(BUYER, nw): return "buyer"    # end-user industry, not equipment
    if "end user" in tagnames or ("client" in tagnames and "provider" not in tagnames): return "buyer"
    return "review"

buckets={"provider":[],"inspector":[],"buyer":[],"vendor":[],"review":[],"junk":[]}
for r in rows:
    buckets[classify(r)].append(r)

print("\n=== CLASSIFICATION ===")
for k in ["provider","inspector","buyer","vendor","review","junk"]:
    print(f"  {k:9s}: {len(buckets[k])}")
relevant=len(buckets['provider'])+len(buckets['inspector'])+len(buckets['buyer'])
print(f"  RELEVANT (provider+inspector+buyer): {relevant} of {n}")

def write(name, recs):
    with open(OUT/f"{name}.csv","w",newline="",encoding="utf-8") as fh:
        w=csv.writer(fh); w.writerow(["company","contact","email","phone","website","city","country","title","tags"])
        for r in recs:
            w.writerow([r.get("partner_name",""),r.get("contact_name",""),r.get("email_from",""),
                        r.get("phone",""),r.get("website",""),r.get("city",""),
                        (r.get("country_id") or ["",""])[1] if r.get("country_id") else "",
                        r.get("function",""),
                        " | ".join(tags.get(i,"") for i in r.get("tag_ids",[]))])
for k in ["provider","inspector","buyer","review"]:
    write(k, buckets[k])
print(f"\nWrote filtered CSVs to {OUT}")
