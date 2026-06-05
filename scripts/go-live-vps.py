#!/usr/bin/env python3
"""
Go live on the self-hosted VPS MongoDB (Atlas region is down / data unrecoverable
for now). Steps:
  1. Seed/refresh an admin user in the VPS NDTConnect2.users collection.
  2. Point Vercel MONGODB_URI at the VPS + set MONGO_CA_PEM (CA pin) + redeploy.

Old Atlas data can be mongorestored on top later without re-running this.
Secrets are read at runtime (VPS pw via SSH, Vercel token from env). Nothing
sensitive is written to disk.

Run:  VERCEL_TOKEN=... python scripts/go-live-vps.py
"""
import os, sys, json, secrets, subprocess, urllib.request
from pathlib import Path

VPS_IP, VPS_PORT, DB = "148.230.122.172", "47017", "NDTConnect2"
SSH_KEY = r"C:\Users\anuan\.ssh\atlantis_vps"
CA_PATH = Path(__file__).resolve().parent.parent / "certs" / "vps-mongo-ca.pem"
VERCEL_TEAM = "team_RvIKW6PFuuliC77dktstAJmQ"
VERCEL_PROJECT = "prj_GB8CvnLDNFOkLVXrnnRzyTtnKZHR"
VERCEL_ENV_ID = "chghDW0qndinKLsz"
ADMIN_EMAIL = "anoop@atlantisinspection.com"
ADMIN_NAME = "Anoop R"

def vps_pw():
    out = subprocess.check_output(
        ["ssh", "-i", SSH_KEY, "-o", "BatchMode=yes", f"root@{VPS_IP}",
         "source /opt/mongo/.secrets; echo $APPPW"], text=True).strip()
    if not out:
        sys.exit("could not read VPS app password")
    return out

def uri(pw, with_ca_path=False):
    base = f"mongodb://ndtapp:{pw}@{VPS_IP}:{VPS_PORT}/{DB}?tls=true&authSource={DB}"
    return base + (f"&tlsCAFile={CA_PATH.as_posix()}" if with_ca_path else "")

def seed_admin(pw, plain):
    import bcrypt
    from pymongo import MongoClient
    c = MongoClient(uri(pw, with_ca_path=True), serverSelectionTimeoutMS=10000)
    users = c[DB]["users"]
    hashed = bcrypt.hashpw(plain.encode(), bcrypt.gensalt(10)).decode()
    users.update_one(
        {"email": ADMIN_EMAIL},
        {"$set": {"role": "admin", "name": ADMIN_NAME, "password": hashed,
                  "isActive": True, "verified": True, "mustResetPassword": False,
                  "profileData": {}, "updatedAt": __import__("datetime").datetime.utcnow()},
         "$setOnInsert": {"createdAt": __import__("datetime").datetime.utcnow()}},
        upsert=True)
    print(f"admin seeded: {ADMIN_EMAIL}  (users count now: {users.count_documents({})})")

def vercel(path, method="GET", body=None):
    token = os.environ["VERCEL_TOKEN"]
    sep = "&" if "?" in path else "?"
    url = f"https://api.vercel.com{path}{sep}teamId={VERCEL_TEAM}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

def upsert_env(key, value):
    targets = ["production", "preview", "development"]
    existing = vercel(f"/v9/projects/{VERCEL_PROJECT}/env")
    match = next((e for e in existing.get("envs", []) if e["key"] == key), None)
    if match:
        vercel(f"/v9/projects/{VERCEL_PROJECT}/env/{match['id']}", "PATCH",
               {"value": value, "target": targets})
    else:
        vercel(f"/v10/projects/{VERCEL_PROJECT}/env", "POST",
               {"key": key, "value": value, "type": "encrypted", "target": targets})

def cutover(pw):
    print("setting MONGO_CA_PEM ...")
    upsert_env("MONGO_CA_PEM", CA_PATH.read_text(encoding="utf-8"))
    print("switching MONGODB_URI -> VPS ...")
    vercel(f"/v9/projects/{VERCEL_PROJECT}/env/{VERCEL_ENV_ID}", "PATCH",
           {"value": uri(pw), "target": ["production", "preview", "development"]})
    dl = vercel(f"/v6/deployments?projectId={VERCEL_PROJECT}&target=production&limit=1")
    latest = dl["deployments"][0]
    rd = vercel("/v13/deployments", "POST",
                {"name": latest.get("name", "ndt-connect-v2-x8ra"),
                 "deploymentId": latest["uid"], "target": "production"})
    print("redeploy started:", rd.get("url") or rd.get("id"))

def main():
    pw = vps_pw()
    plain = "Atlantis9$" + secrets.token_hex(3)  # strong, unique
    seed_admin(pw, plain)
    cutover(pw)
    print("\n=== GO-LIVE COMPLETE ===")
    print(f"Admin login -> email: {ADMIN_EMAIL}   password: {plain}")
    print("Change this password after first login.")

if __name__ == "__main__":
    main()
