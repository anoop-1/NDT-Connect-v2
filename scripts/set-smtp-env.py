#!/usr/bin/env python3
"""Push SMTP_* values from local .env to the Vercel prod project + redeploy.
Reads secrets from .env at runtime (none embedded). VERCEL_TOKEN from env."""
import os, re, json, urllib.request
from pathlib import Path

TEAM = "team_RvIKW6PFuuliC77dktstAJmQ"
PROJECT = "prj_GB8CvnLDNFOkLVXrnnRzyTtnKZHR"
KEYS = ["SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASS"]

env_text = (Path(__file__).resolve().parent.parent / ".env").read_text(encoding="utf-8")
vals = {}
for k in KEYS:
    m = re.search(rf"^{k}=(.*)$", env_text, re.M)
    if m:
        vals[k] = m.group(1).strip()

def vercel(path, method="GET", body=None):
    token = os.environ["VERCEL_TOKEN"]
    sep = "&" if "?" in path else "?"
    url = f"https://api.vercel.com{path}{sep}teamId={TEAM}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

existing = {e["key"]: e["id"] for e in vercel(f"/v9/projects/{PROJECT}/env").get("envs", [])}
targets = ["production", "preview", "development"]
for k, v in vals.items():
    if k in existing:
        vercel(f"/v9/projects/{PROJECT}/env/{existing[k]}", "PATCH", {"value": v, "target": targets})
        print(f"updated {k}")
    else:
        vercel(f"/v10/projects/{PROJECT}/env", "POST",
               {"key": k, "value": v, "type": "encrypted", "target": targets})
        print(f"created {k}")

dl = vercel(f"/v6/deployments?projectId={PROJECT}&target=production&limit=1")
latest = dl["deployments"][0]
rd = vercel("/v13/deployments", "POST",
            {"name": latest.get("name", "ndt-connect-v2-x8ra"),
             "deploymentId": latest["uid"], "target": "production"})
print("redeploy started:", rd.get("url") or rd.get("id"))
