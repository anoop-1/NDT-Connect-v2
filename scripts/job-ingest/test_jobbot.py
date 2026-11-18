"""Offline tests for jobbot extraction (synthetic pages, no network). Run: python3 test_jobbot.py"""
from jobbot import parse_detail, extract_emails, extract_phones, links

SELLER = """<html><head><title>x</title></head><body><h1>UT Level II Technician - Houston</h1>
<p>Company: Gulf Coast Inspection Services LLC</p><p>Location: Houston, TX</p>
<p>Leading NDT services contractor seeks ASNT Level II UT / PAUT tech. API 570 a plus.</p>
<p>Send CV to hr [at] gulfcoastinspect [dot] com or call Tel: +1 (713) 555-0142</p>
<a href="mailto:jobs@gulfcoastinspect.com">apply</a></body></html>"""
BUYER = """<html><body><h1>Senior Inspection Engineer</h1><p>Employer: Bayview Refinery</p>
<p>Our refinery operator team needs a CWI with RT film interpretation, Level III preferred.</p>
<p>Contact: recruiting@bayviewrefinery.com</p></body></html>"""
NOCONTACT = """<html><body><h1>MT Technician</h1><p>Apply via our portal. Posted 20250102.</p></body></html>"""

def test_seller():
    j = parse_detail(SELLER, "u1", "t", {})
    assert j and j.party == "seller", j
    assert {"hr@gulfcoastinspect.com", "jobs@gulfcoastinspect.com"} <= set(j.emails)
    assert j.phones and "713" in j.phones[0]
    assert {"UT", "PAUT", "API"} <= set(j.methods) and "II" in j.levels
    assert j.company.startswith("Gulf Coast") and "Houston" in j.location

def test_buyer():
    j = parse_detail(BUYER, "u2", "t", {})
    assert j and j.party == "buyer" and j.emails == ["recruiting@bayviewrefinery.com"]
    assert "CWI" in j.methods and "RT" in j.methods and "III" in j.levels

def test_drop_no_contact():
    assert parse_detail(NOCONTACT, "u3", "t", {}) is None

def test_junk_filtered():
    assert extract_emails("a@ndt.net logo@2x.png noreply@site.com real@acme.co", []) == ["real@acme.co"]
    assert extract_phones("Posted 20250102", []) == []

def test_links_same_host():
    html = '<a href="/jobs/123">a</a><a href="https://other.com/jobs/9">b</a><a href="/about">c</a>'
    assert links(html, "https://www.ndt.org/jobs.asp", r"/jobs/\d+") == ["https://www.ndt.org/jobs/123"]

if __name__ == "__main__":
    for n, f in list(globals().items()):
        if n.startswith("test_"): f(); print("PASS", n)
