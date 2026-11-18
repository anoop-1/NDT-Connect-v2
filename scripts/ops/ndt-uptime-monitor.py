#!/usr/bin/env python3
"""NDT-Connect / Atlantis uptime monitor (runs on the VPS from cron).
  */5 * * * *  ndt-uptime-monitor.py          -> check; alert on 2 consecutive failures, re-alert every 6 h, recovery mail
  0 5 * * *    ndt-uptime-monitor.py --daily  -> daily status summary (08:00 Riyadh)
Alerts go to ALERT_TO. Local postfix (sendmail) is used, so a TOTAL VPS outage cannot be reported from here —
pair with an external monitor."""
import json, os, ssl, subprocess, sys, time, urllib.request
from datetime import datetime, timezone

ALERT_TO = "info@atlantisndt.com"
FROM = "NDT-Connect Monitor <sales@ndt-connect.com>"
STATE = "/var/lib/ndt-uptime/state.json"
LOG = "/var/lib/ndt-uptime/samples.csv"
FAILS_BEFORE_ALERT = 2
REALERT_SECONDS = 6 * 3600
DISK_LIMIT = 90

def http(url, expect=200, contains=None, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": "NDT-Connect-Monitor/1.0"})
    t = time.time()
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ssl.create_default_context()) as r:
            body = r.read(200000).decode("utf-8", "ignore"); code = r.status
    except urllib.error.HTTPError as e:
        code, body = e.code, ""
    except Exception as e:
        return False, f"unreachable ({type(e).__name__}: {str(e)[:80]})"
    ms = int((time.time() - t) * 1000)
    if code != expect: return False, f"HTTP {code} (expected {expect}), {ms} ms"
    if contains and contains not in body: return False, f"HTTP {code} but expected content missing, {ms} ms"
    return True, f"HTTP {code}, {ms} ms"

def sh(cmd):
    try: return subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=20).stdout.strip()
    except Exception: return ""

def unit(name):
    s = sh(f"systemctl is-active {name}"); return s == "active", f"systemd: {s or 'unknown'}"

def container(name):
    s = sh(f"docker inspect -f '{{{{.State.Status}}}}' {name} 2>/dev/null"); return s == "running", f"docker: {s or 'missing'}"

def disk():
    p = int(sh("df --output=pcent / | tail -1 | tr -dc '0-9'") or 0); return p < DISK_LIMIT, f"{p}% used (alert at {DISK_LIMIT}%)"

CHECKS = [
    ("ndt-connect.com home page",            lambda: http("https://ndt-connect.com/", contains="NDT")),
    ("ndt-connect.com database (providers API)", lambda: http("https://ndt-connect.com/api/providers?limit=1", contains='"success":true')),
    ("ndt-connect.com login page",           lambda: http("https://ndt-connect.com/login")),
    ("ndt-connect.com ERP (/erp)",           lambda: http("https://ndt-connect.com/erp")),
    ("ndt-connect.com ERP API",              lambda: http("https://ndt-connect.com/api/erp/summary", expect=401)),
    ("ndt-connect.com Buyer's Guide",        lambda: http("https://ndt-connect.com/buyers-guide")),
    ("atlantisndt.com",                      lambda: http("https://atlantisndt.com/")),
    ("portal.atlantisndt.com (Odoo)",        lambda: http("https://portal.atlantisndt.com/web/login")),
    ("service ndt-connect",                  lambda: unit("ndt-connect")),
    ("service ndt-erp",                      lambda: unit("ndt-erp")),
    ("MongoDB container (ndt-mongo)",        lambda: container("ndt-mongo")),
    ("Odoo container (odoo18_app)",          lambda: container("odoo18_app")),
    ("VPS disk space",                       disk),
]

def send(subject, body):
    msg = f"From: {FROM}\nTo: {ALERT_TO}\nSubject: {subject}\nContent-Type: text/plain; charset=utf-8\n\n{body}\n"
    subprocess.run(["/usr/sbin/sendmail", "-t", "-f", "sales@ndt-connect.com"], input=msg, text=True, timeout=30)

def load():
    try: return json.load(open(STATE))
    except Exception: return {}

def save(s):
    os.makedirs(os.path.dirname(STATE), exist_ok=True); json.dump(s, open(STATE, "w"))

def now_str(): return datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

def run():
    st = load(); results = []
    for name, fn in CHECKS:
        try: ok, detail = fn()
        except Exception as e: ok, detail = False, f"check error: {e}"
        results.append((name, ok, detail))
    os.makedirs(os.path.dirname(LOG), exist_ok=True)
    with open(LOG, "a") as f:
        f.write(f"{int(time.time())},{sum(1 for r in results if not r[1])},{'|'.join(n for n, ok, _ in results if not ok)}\n")
    t = time.time(); newly, recovered, still = [], [], []
    for name, ok, detail in results:
        c = st.setdefault(name, {"fails": 0, "alerted": 0, "since": 0})
        if ok:
            if c["alerted"]: recovered.append((name, detail, c["since"]))
            st[name] = {"fails": 0, "alerted": 0, "since": 0}
        else:
            c["fails"] += 1
            if not c["since"]: c["since"] = t
            if c["fails"] >= FAILS_BEFORE_ALERT:
                if not c["alerted"]: newly.append((name, detail)); c["alerted"] = t
                elif t - c["alerted"] >= REALERT_SECONDS: still.append((name, detail, c["since"])); c["alerted"] = t
    save(st)
    summary = "\n".join(f"  {'OK  ' if ok else 'DOWN'}  {n}: {d}" for n, ok, d in results)
    if newly or still:
        items = [n for n, _ in newly] + [n for n, _, _ in still]
        send(f"[DOWN] {', '.join(items)[:150]}",
             f"NDT-Connect monitor detected a problem at {now_str()}.\n\n" +
             "".join(f"DOWN: {n}\n   {d}\n" for n, d in newly) +
             "".join(f"STILL DOWN ({int((t - s) / 60)} min): {n}\n   {d}\n" for n, d, s in still) +
             f"\nFull check:\n{summary}\n\nServer: 148.230.122.172  ·  Quick fixes: systemctl restart ndt-connect | ndt-erp ;  docker start ndt-mongo ;  df -h /\n")
    if recovered:
        send(f"[RECOVERED] {', '.join(n for n, _, _ in recovered)[:150]}",
             f"Back to normal at {now_str()}.\n\n" + "".join(f"RECOVERED: {n} (down ~{int((t - s) / 60)} min)\n   {d}\n" for n, d, s in recovered) + f"\nFull check:\n{summary}\n")

def daily():
    cutoff = time.time() - 86400; total = bad = 0; incidents = {}
    try:
        for line in open(LOG):
            ts, nfail, names = line.rstrip("\n").split(",", 2)
            if int(ts) < cutoff: continue
            total += 1
            if int(nfail): bad += 1
            for n in filter(None, names.split("|")): incidents[n] = incidents.get(n, 0) + 1
    except FileNotFoundError: pass
    up = 100.0 * (total - bad) / total if total else 100.0
    results = [(n, *fn()) for n, fn in CHECKS]
    status = "ALL SYSTEMS OK" if all(ok for _, ok, _ in results) else "ATTENTION NEEDED"
    body = (f"Daily status for ndt-connect.com and Atlantis services — {now_str()}\n\n" +
            (f"Current: {status}\nChecks in last 24 h: {total} (every 5 min)  ·  all-green: {up:.2f}%\n\n" if total
             else f"Current: {status}\nMonitoring has just started — uptime figures appear from tomorrow.\n\n") +
            ("Failures in last 24 h (count of 5-min checks):\n" + "".join(f"  {n}: {c}\n" for n, c in sorted(incidents.items(), key=lambda x: -x[1])) + "\n" if incidents else "No failures in the last 24 hours.\n\n") +
            "Current check:\n" + "\n".join(f"  {'OK  ' if ok else 'DOWN'}  {n}: {d}" for n, ok, d in results) + "\n")
    send(f"[Daily status] {status}" + (f" — {up:.1f}% all-green last 24 h" if total else " — monitoring started"), body)
    # keep the log to 8 days
    try:
        keep = [l for l in open(LOG) if int(l.split(",", 1)[0]) >= time.time() - 8 * 86400]; open(LOG, "w").writelines(keep)
    except Exception: pass

if __name__ == "__main__":
    daily() if "--daily" in sys.argv else run()
