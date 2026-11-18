#!/usr/bin/env python3
"""NDT-Connect job & contact ingester.

Crawls public NDT job boards (sources.json), keeps ONLY postings that carry
contact information (email or phone), classifies the poster as buyer / seller,
de-duplicates, and upserts into MongoDB (`scraped_jobs`, `leads`) plus CSV.

Polite by design: honest User-Agent, obeys each site's robots.txt for that UA,
fixed delay between requests, stores facts + a link back to the source
(not full copies of the posting text).

Usage (run from your Mac or the VPS, not from a sandbox):
  pip install requests beautifulsoup4 lxml pymongo
  python3 jobbot.py probe ndt_org         # save listing + 3 detail pages to fixtures/ to tune sources.json
  python3 jobbot.py crawl ndt_org ndt_net # full crawl -> out/*.csv (+ Mongo if MONGODB_URI is set)
  python3 jobbot.py crawl --all --dry-run # parse + report counts, write nothing to Mongo
  python3 jobbot.py parse fixtures/x.html --source ndt_org   # test extractor on a saved page
Schedule daily with cron:  15 3 * * *  cd /opt/jobbot && python3 jobbot.py crawl --all
"""
from __future__ import annotations
import argparse, csv, hashlib, json, os, re, sys, time
from dataclasses import dataclass, asdict, field
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib import robotparser

HERE = Path(__file__).resolve().parent
UA = "NDT-Connect-JobBot/1.0 (+https://ndt-connect.com/bot; info@ndt-connect.com)"
DELAY = float(os.environ.get("JOBBOT_DELAY", "4"))   # seconds between requests per host

# ---------------------------------------------------------------- extraction
EMAIL_RE = re.compile(r"[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}")
OBFUSC_RE = re.compile(r"([A-Za-z0-9._%+\-]+)\s*[\[\(\{]?\s*(?:@|at)\s*[\]\)\}]?\s*([A-Za-z0-9\-]+(?:\s*[\[\(\{]?\s*(?:\.|dot)\s*[\]\)\}]?\s*[A-Za-z0-9\-]+)+)", re.I)
PHONE_RE = re.compile(r"(?:(?:\+|00)\d{1,3}[\s.\-]?)?(?:\(?\d{2,4}\)?[\s.\-]?){2,4}\d{3,4}")
JUNK_EMAIL = re.compile(r"(?i)(noreply|no-reply|donotreply|example\.|sentry|wixpress|@ndt\.net$|@ndt\.org$|\.(png|jpg|gif|webp)$)")

def extract_emails(text: str, hrefs: list[str]) -> list[str]:
    found = set(EMAIL_RE.findall(text))
    for h in hrefs:
        if h.lower().startswith("mailto:"):
            found.add(h[7:].split("?")[0])
    for user, dom in OBFUSC_RE.findall(text):
        d = re.sub(r"\s*[\[\(\{]?\s*(?:\.|dot)\s*[\]\)\}]?\s*", ".", dom, flags=re.I)
        if "." in d and not user.isdigit():
            found.add(f"{user}@{d}")
    out = []
    for e in found:
        e = e.strip(".,;:()<>[]").lower()
        if EMAIL_RE.fullmatch(e) and not JUNK_EMAIL.search(e):
            out.append(e)
    return sorted(set(out))

def extract_phones(text: str, hrefs: list[str]) -> list[str]:
    cands = [h[4:] for h in hrefs if h.lower().startswith("tel:")]
    for m in PHONE_RE.finditer(text):
        s = m.group(0)
        ctx = text[max(0, m.start()-25):m.start()].lower()
        if re.search(r"(phone|tel|mobile|cell|call|whatsapp|contact|ph\.?|\+)", ctx + s[:1]):
            cands.append(s)
    out = []
    for c in cands:
        digits = re.sub(r"\D", "", c)
        if 8 <= len(digits) <= 15 and not re.fullmatch(r"(19|20)\d{6}", digits):  # skip dates
            out.append(re.sub(r"\s+", " ", c.strip()))
    return sorted(set(out))

SELLER_KW = r"inspection services|ndt services|testing services|inspection company|testing laborator|ndt company|service provider|inspection contractor|staffing|recruit|manpower|consultan"
BUYER_KW = r"refiner|airline|aerospace manufactur|power (plant|station)|utility|operator|petrochemical plant|shipyard|manufactur|oem|pipeline operator|chemical plant|nuclear|fabricat"
def classify(company: str, text: str) -> str:
    blob = f"{company} {text[:3000]}".lower()
    s, b = len(re.findall(SELLER_KW, blob)), len(re.findall(BUYER_KW, blob))
    return "seller" if s > b else "buyer" if b > s else "unknown"

METHODS = {"UT": r"\b(ut|ultrasonic)", "PAUT": r"\b(paut|phased.array)", "TOFD": r"\btofd\b", "RT": r"\b(rt|radiograph)",
           "MT": r"\b(mt|magnetic particle)", "PT": r"\b(pt|penetrant)", "ET": r"\b(et|eddy current)", "VT": r"\b(vt|visual)",
           "CWI": r"\bcwi\b", "API": r"\bapi (510|570|653)"}
LEVEL_RE = re.compile(r"(?i)level\s*(iii|ii|i|3|2|1)\b")

@dataclass
class Job:
    source: str; url: str; title: str; company: str = ""; location: str = ""
    emails: list = field(default_factory=list); phones: list = field(default_factory=list)
    methods: list = field(default_factory=list); levels: list = field(default_factory=list)
    party: str = "unknown"; summary: str = ""; posted: str = ""
    fingerprint: str = ""; scraped_at: str = ""

def _sel(soup, css):
    if not css: return ""
    el = soup.select_one(css)
    return el.get_text(" ", strip=True) if el else ""

def parse_detail(html: str, url: str, source: str, selectors: dict) -> Job | None:
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, "lxml")
    for t in soup(["script", "style", "noscript", "nav", "footer", "header"]):
        t.decompose()
    hrefs = [a.get("href", "") for a in soup.find_all("a")]
    body_el = soup.select_one(selectors.get("body")) if selectors.get("body") else None
    text = (body_el or soup.body or soup).get_text(" ", strip=True)
    og = soup.find("meta", property="og:title")
    title = _sel(soup, selectors.get("title")) or (soup.h1.get_text(" ", strip=True) if soup.h1 else "") \
        or (og.get("content", "") if og else "") or (soup.title.get_text(strip=True) if soup.title else "")
    company = _sel(soup, selectors.get("company"))
    if not company:
        m = re.search(r"(?i)(company|employer|organi[sz]ation)\s*[:\-]\s*([^\n|•]{2,80})", text)
        company = m.group(2).strip() if m else ""
    location = _sel(soup, selectors.get("location"))
    if not location:
        m = re.search(r"(?i)(location|city|country)\s*[:\-]\s*([^\n|•]{2,80})", text)
        location = m.group(2).strip() if m else ""
    emails, phones = extract_emails(text, hrefs), extract_phones(text, hrefs)
    if not emails and not phones:
        return None                                  # contact-less postings are dropped by design
    lt = text.lower()
    job = Job(source=source, url=url, title=title[:200], company=company[:120], location=location[:120],
              emails=emails, phones=phones,
              methods=[k for k, rx in METHODS.items() if re.search(rx, lt)],
              levels=sorted({l.upper().replace("3", "III").replace("2", "II").replace("1", "I") for l in LEVEL_RE.findall(text)}),
              party=classify(company, text), summary=text[:280],
              scraped_at=datetime.now(timezone.utc).isoformat(timespec="seconds"))
    key = re.sub(r"\W+", "", f"{job.title}|{job.company}|{(emails or phones)[0]}".lower())
    job.fingerprint = hashlib.sha1(key.encode()).hexdigest()
    return job

# ---------------------------------------------------------------- fetching
class Fetcher:
    def __init__(self):
        import requests
        self.s = requests.Session(); self.s.headers["User-Agent"] = UA
        self.robots: dict[str, robotparser.RobotFileParser] = {}; self.last: dict[str, float] = {}
    def allowed(self, url: str) -> bool:
        host = urlparse(url).scheme + "://" + urlparse(url).netloc
        if host not in self.robots:
            rp = robotparser.RobotFileParser()
            try:
                r = self.s.get(host + "/robots.txt", timeout=20)
                rp.parse(r.text.splitlines() if r.status_code == 200 else [])
            except Exception:
                rp.parse([])
            self.robots[host] = rp
        return self.robots[host].can_fetch(UA, url)
    def get(self, url: str) -> str | None:
        if not self.allowed(url):
            print(f"  robots.txt disallows {url} — skipped"); return None
        host = urlparse(url).netloc
        wait = DELAY - (time.time() - self.last.get(host, 0))
        if wait > 0: time.sleep(wait)
        self.last[host] = time.time()
        try:
            r = self.s.get(url, timeout=30)
        except Exception as e:
            print(f"  fetch error {url}: {e}"); return None
        if r.status_code != 200:
            print(f"  HTTP {r.status_code} {url}"); return None
        return r.text

def links(html: str, base: str, pattern: str) -> list[str]:
    if not pattern: return []
    rx = re.compile(pattern); out = []
    for h in re.findall(r"""href=["']([^"']+)["']""", html):
        if rx.search(h):
            u = urljoin(base, h).split("#")[0]
            if urlparse(u).netloc == urlparse(base).netloc and u not in out:
                out.append(u)
    return out

# ---------------------------------------------------------------- storage
def store(jobs: list[Job], dry: bool):
    outdir = HERE / "out"; outdir.mkdir(exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d-%H%M")
    with open(outdir / f"jobs-{stamp}.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(asdict(jobs[0]).keys()) if jobs else ["url"]); w.writeheader()
        for j in jobs:
            d = asdict(j); d.update({k: "; ".join(v) for k, v in d.items() if isinstance(v, list)}); w.writerow(d)
    leads = {}
    for j in jobs:
        for e in j.emails or [""]:
            k = e or (j.phones[0] if j.phones else j.fingerprint)
            L = leads.setdefault(k, {"email": e, "phones": set(), "company": j.company, "party": j.party,
                                     "methods": set(), "locations": set(), "sources": set(), "job_urls": set()})
            L["phones"].update(j.phones); L["methods"].update(j.methods); L["locations"].add(j.location)
            L["sources"].add(j.source); L["job_urls"].add(j.url)
    with open(outdir / f"leads-{stamp}.csv", "w", newline="") as f:
        cols = ["email", "phones", "company", "party", "methods", "locations", "sources", "job_urls"]
        w = csv.DictWriter(f, fieldnames=cols); w.writeheader()
        for L in leads.values():
            w.writerow({k: "; ".join(sorted(x for x in v if x)) if isinstance(v, set) else v for k, v in L.items()})
    print(f"wrote out/jobs-{stamp}.csv ({len(jobs)}) and out/leads-{stamp}.csv ({len(leads)})")
    uri = os.environ.get("MONGODB_URI")
    if dry or not uri:
        print("Mongo: skipped (dry-run or MONGODB_URI unset)"); return
    from pymongo import MongoClient, UpdateOne
    db = MongoClient(uri, tlsCAFile=os.environ.get("MONGO_CA_PEM") or None).get_default_database()
    now = datetime.now(timezone.utc)
    if jobs:
        db.scraped_jobs.bulk_write([UpdateOne({"fingerprint": j.fingerprint},
            {"$set": {**asdict(j), "last_seen": now, "active": True}, "$setOnInsert": {"first_seen": now}}, upsert=True) for j in jobs])
        db.scraped_jobs.create_index("fingerprint", unique=True)
    ops = []
    for k, L in leads.items():
        doc = {k2: sorted(x for x in v if x) if isinstance(v, set) else v for k2, v in L.items()}
        ops.append(UpdateOne({"key": k}, {"$set": {"company": doc["company"], "party": doc["party"], "email": doc["email"], "last_seen": now},
            "$addToSet": {f: {"$each": doc[f]} for f in ("phones", "methods", "locations", "sources", "job_urls")},
            "$setOnInsert": {"first_seen": now, "outreach_status": "new", "unsubscribed": False}}, upsert=True))
    if ops:
        db.leads.bulk_write(ops); db.leads.create_index("key", unique=True)
    print(f"Mongo: upserted {len(jobs)} jobs, {len(ops)} leads")

# ---------------------------------------------------------------- commands
def load_sources():
    return {k: v for k, v in json.loads((HERE / "sources.json").read_text()).items() if not k.startswith("_")}

def cmd_probe(name: str):
    src = load_sources()[name]; f = Fetcher(); fx = HERE / "fixtures"; fx.mkdir(exist_ok=True)
    for lu in src["list_urls"]:
        html = f.get(lu)
        if not html: continue
        (fx / f"{name}-list.html").write_text(html)
        found = links(html, lu, src["link_pattern"])
        print(f"{lu}: {len(found)} detail links match link_pattern"); [print("   ", u) for u in found[:10]]
        for i, u in enumerate(found[:3]):
            d = f.get(u)
            if d:
                (fx / f"{name}-detail{i}.html").write_text(d)
                j = parse_detail(d, u, name, src.get("selectors", {}))
                print(f"   detail{i}: {'KEEP ' + str(j.emails + j.phones) if j else 'dropped (no contact)'}")

def cmd_crawl(names: list[str], dry: bool):
    srcs = load_sources(); f = Fetcher(); jobs: dict[str, Job] = {}
    for name in names:
        src = srcs[name]; queue = list(src["list_urls"]); seen_pages = set(); details = []
        while queue and len(seen_pages) < src.get("max_pages", 30):
            lu = queue.pop(0)
            if lu in seen_pages: continue
            seen_pages.add(lu); html = f.get(lu)
            if not html: continue
            details += [u for u in links(html, lu, src["link_pattern"]) if u not in details]
            queue += [u for u in links(html, lu, src.get("next_pattern", "")) if u not in seen_pages]
        kept = 0
        print(f"[{name}] {len(seen_pages)} index pages, {len(details)} postings")
        for u in details:
            html = f.get(u)
            j = parse_detail(html, u, name, src.get("selectors", {})) if html else None
            if j and j.fingerprint not in jobs:
                jobs[j.fingerprint] = j; kept += 1
        print(f"[{name}] kept {kept} with contact info, dropped {len(details) - kept}")
    store(list(jobs.values()), dry)

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("probe"); p.add_argument("source")
    c = sub.add_parser("crawl"); c.add_argument("sources", nargs="*"); c.add_argument("--all", action="store_true"); c.add_argument("--dry-run", action="store_true")
    t = sub.add_parser("parse"); t.add_argument("file"); t.add_argument("--source", default="test")
    a = ap.parse_args()
    if a.cmd == "probe": cmd_probe(a.source)
    elif a.cmd == "crawl":
        names = [k for k, v in load_sources().items() if v.get("enabled")] if a.all else a.sources
        if not names: sys.exit("name sources or pass --all")
        cmd_crawl(names, a.dry_run)
    else:
        sel = load_sources().get(a.source, {}).get("selectors", {})
        j = parse_detail(Path(a.file).read_text(errors="ignore"), "file://" + a.file, a.source, sel)
        print(json.dumps(asdict(j), indent=2) if j else "dropped: no contact info")

if __name__ == "__main__":
    main()
