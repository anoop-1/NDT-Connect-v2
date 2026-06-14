#!/usr/bin/env python3
"""Pre-create 'claim your listing' provider stubs in the VPS Mongo from the
filtered Odoo provider list, each with a unique claim token. Outputs a
claim-links CSV (company,email,claim_url) for outreach.

Idempotent: skips emails that already exist as users. CA-verified TLS;
VPS password read via SSH at runtime. Stubs are inactive until claimed.

Run:  python scripts/seed-claim-providers.py [--limit N] [--csv path]
"""
import sys, csv, secrets, subprocess, datetime
from pathlib import Path

VPS_IP, VPS_PORT, DB = "148.230.122.172", "47017", "NDTConnect2"
SSH_KEY = r"C:\Users\anuan\.ssh\atlantis_vps"
ROOT = Path(__file__).resolve().parent.parent
CA = (ROOT / "certs" / "vps-mongo-ca.pem").as_posix()
SRC = ROOT / "seo-analysis" / "output" / "odoo-filtered" / "provider.csv"
BASE = "https://ndt-connect.com/claim/"

LIMIT = None
if "--limit" in sys.argv: LIMIT = int(sys.argv[sys.argv.index("--limit")+1])
OUT = ROOT / "seo-analysis" / "output" / "odoo-filtered" / "claim-links.csv"
if "--csv" in sys.argv: OUT = Path(sys.argv[sys.argv.index("--csv")+1])

def vps_pw():
    return subprocess.check_output(["ssh","-i",SSH_KEY,"-o","BatchMode=yes",f"root@{VPS_IP}",
        "source /opt/mongo/.secrets; echo $APPPW"], text=True).strip()

def main():
    import bcrypt
    from pymongo import MongoClient
    pw = vps_pw()
    users = MongoClient(
        f"mongodb://ndtapp:{pw}@{VPS_IP}:{VPS_PORT}/{DB}?tls=true&authSource={DB}&tlsCAFile={CA}",
        serverSelectionTimeoutMS=10000)[DB]["users"]
    now = datetime.datetime.now(datetime.timezone.utc)
    unusable = bcrypt.hashpw(secrets.token_hex(16).encode(), bcrypt.gensalt(10)).decode()

    rows = list(csv.DictReader(open(SRC, encoding="utf-8")))
    made = skipped = 0
    with open(OUT, "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh); w.writerow(["company","email","claim_url"])
        for r in rows:
            email = (r.get("email") or "").strip().lower()
            company = (r.get("company") or "").strip()
            if "@" not in email or not company:
                skipped += 1; continue
            if users.find_one({"email": email}):
                skipped += 1; continue
            token = secrets.token_urlsafe(24)
            users.insert_one({
                "email": email, "name": company[:120], "role": "provider",
                "password": unusable, "isActive": False, "verified": False,
                "claimed": False, "mustResetPassword": False, "claimToken": token,
                "source": "odoo-claim",
                "profileData": {"company": company, "website": r.get("website",""),
                                "phone": r.get("phone",""), "city": r.get("city",""),
                                "country": r.get("country","")},
                "createdAt": now, "updatedAt": now,
            })
            w.writerow([company, email, BASE + token])
            made += 1
            if LIMIT and made >= LIMIT: break
    print(f"created {made} provider stubs, skipped {skipped} (no-email/dup).")
    print(f"claim links -> {OUT}")
    print(f"total provider users now: {users.count_documents({'role':'provider'})}")

if __name__ == "__main__":
    main()
