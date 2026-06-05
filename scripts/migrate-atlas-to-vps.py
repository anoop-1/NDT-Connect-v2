#!/usr/bin/env python3
"""
One-shot migration: copy all NDTConnect2 data from MongoDB Atlas -> self-hosted
MongoDB on the VPS, then cut Vercel over to the VPS and redeploy.

No secrets are stored on disk. They are read at runtime:
  - Atlas URI   : from ../.env  (MONGODB_URI=...)
  - VPS app pw  : fetched live over SSH from /opt/mongo/.secrets
  - Vercel token: from env var VERCEL_TOKEN

Run:  VERCEL_TOKEN=... python scripts/migrate-atlas-to-vps.py [--wait-min 30]
"""
import os, re, sys, time, json, subprocess, urllib.request, urllib.error
from pathlib import Path

VPS_IP = "148.230.122.172"
VPS_PORT = "47017"
DB = "NDTConnect2"
SSH_KEY = r"C:\Users\anuan\.ssh\atlantis_vps"
VERCEL_TEAM = "team_RvIKW6PFuuliC77dktstAJmQ"
VERCEL_PROJECT = "prj_GB8CvnLDNFOkLVXrnnRzyTtnKZHR"
VERCEL_ENV_ID = "chghDW0qndinKLsz"
WAIT_MIN = 30
if "--wait-min" in sys.argv:
    WAIT_MIN = int(sys.argv[sys.argv.index("--wait-min") + 1])

def atlas_uri():
    env = (Path(__file__).resolve().parent.parent / ".env").read_text(encoding="utf-8")
    m = re.search(r"^MONGODB_URI=(.+)$", env, re.M)
    if not m:
        sys.exit("MONGODB_URI not found in .env")
    return m.group(1).strip().strip('"').strip("'")

def vps_pw():
    out = subprocess.check_output(
        ["ssh", "-i", SSH_KEY, "-o", "BatchMode=yes", f"root@{VPS_IP}",
         "source /opt/mongo/.secrets; echo $APPPW"], text=True).strip()
    if not out:
        sys.exit("could not read VPS app password")
    return out

CA_PATH = Path(__file__).resolve().parent.parent / "certs" / "vps-mongo-ca.pem"

def copy_uri(pw):
    # local migration connection — CA-verified (no invalid-cert flag)
    return (f"mongodb://ndtapp:{pw}@{VPS_IP}:{VPS_PORT}/{DB}"
            f"?tls=true&authSource={DB}&tlsCAFile={CA_PATH.as_posix()}")

def prod_uri(pw):
    # value stored in Vercel — TLS verified via MONGO_CA_PEM env (set by cutover)
    return f"mongodb://ndtapp:{pw}@{VPS_IP}:{VPS_PORT}/{DB}?tls=true&authSource={DB}"

def wait_for_atlas(uri):
    from pymongo import MongoClient
    deadline = time.time() + WAIT_MIN * 60
    while time.time() < deadline:
        try:
            c = MongoClient(uri, serverSelectionTimeoutMS=5000)
            c.admin.command("ping")
            print("Atlas reachable.")
            return c
        except Exception as e:
            print(f"Atlas not ready ({type(e).__name__}); retrying in 15s...")
            time.sleep(15)
    sys.exit("Atlas did not come online within the wait window.")

def copy_data(src, dst_uri):
    from pymongo import MongoClient
    dst = MongoClient(dst_uri, serverSelectionTimeoutMS=10000)
    sdb, ddb = src[DB], dst[DB]
    cols = sdb.list_collection_names()
    print("collections to copy:", cols)
    report = {}
    for name in cols:
        docs = list(sdb[name].find({}))
        if docs:
            ddb[name].delete_many({})   # idempotent re-runs
            ddb[name].insert_many(docs, ordered=False)
        # copy indexes (skip the default _id_)
        for ix in sdb[name].list_indexes():
            if ix["name"] == "_id_":
                continue
            keys = list(ix["key"].items())
            opts = {k: v for k, v in ix.items() if k in ("unique", "sparse", "expireAfterSeconds", "name")}
            try:
                ddb[name].create_index(keys, **opts)
            except Exception as e:
                print(f"  index {ix['name']} on {name}: {type(e).__name__}")
        report[name] = {"src": sdb[name].count_documents({}), "dst": ddb[name].count_documents({})}
    return report

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
    """Create or update a Vercel env var across all targets."""
    targets = ["production", "preview", "development"]
    existing = vercel(f"/v9/projects/{VERCEL_PROJECT}/env")
    match = next((e for e in existing.get("envs", []) if e["key"] == key), None)
    if match:
        vercel(f"/v9/projects/{VERCEL_PROJECT}/env/{match['id']}", "PATCH",
               {"value": value, "target": targets})
    else:
        vercel(f"/v10/projects/{VERCEL_PROJECT}/env", "POST",
               {"key": key, "value": value, "type": "encrypted", "target": targets})

def cutover(dst_uri):
    print("setting MONGO_CA_PEM (CA pin) ...")
    upsert_env("MONGO_CA_PEM", CA_PATH.read_text(encoding="utf-8"))
    print("switching Vercel MONGODB_URI -> VPS ...")
    vercel(f"/v9/projects/{VERCEL_PROJECT}/env/{VERCEL_ENV_ID}", "PATCH",
           {"value": dst_uri, "target": ["production", "preview", "development"]})
    print("env updated; redeploying ...")
    dl = vercel(f"/v6/deployments?projectId={VERCEL_PROJECT}&target=production&limit=1")
    latest = dl["deployments"][0]
    rd = vercel("/v13/deployments", "POST",
                {"name": latest.get("name", "ndt-connect-v2-x8ra"),
                 "deploymentId": latest["uid"], "target": "production"})
    print("redeploy started:", rd.get("url") or rd.get("id"))

def main():
    src_uri = atlas_uri()
    pw = vps_pw()
    print("waiting for Atlas (up to %d min)..." % WAIT_MIN)
    src = wait_for_atlas(src_uri)
    report = copy_data(src, copy_uri(pw))
    print("COPY REPORT:")
    for k, v in report.items():
        flag = "OK" if v["src"] == v["dst"] else "MISMATCH"
        print(f"  {k}: src={v['src']} dst={v['dst']} [{flag}]")
    if any(v["src"] != v["dst"] for v in report.values()):
        sys.exit("Count mismatch — NOT cutting over. Investigate.")
    total = sum(v["dst"] for v in report.values())
    # Safety: never cut prod over to an empty DB (e.g. if the wedged cluster lost data).
    if total == 0 or "users" not in report or report.get("users", {}).get("dst", 0) == 0:
        sys.exit(f"Source has no usable data (total docs={total}, users={report.get('users')}). "
                 "NOT cutting over — Atlas data may be missing. Investigate before switching.")
    cutover(prod_uri(pw))
    print("DONE. Migration + cutover complete.")

if __name__ == "__main__":
    main()
