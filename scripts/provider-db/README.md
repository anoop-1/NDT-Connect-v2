# US inspection-provider database (outreach pipeline)

Compliant discovery → crawl → workbook. **Contact data is never committed** (`outreach/` is git-ignored).

1. `parse_gov.py` — parse public city/county special-inspection agency PDFs (gov_*.bin) → gov_rows.json
2. `crawl.py in.json out.json` — fetch each company's own site (robots.txt honored, 1 req/s/site, no bypass of bot protection); extracts business emails (role-based preferred), phones, address, services, accreditations
3. `build_xlsx.py` — merge, dedupe, add region / claim token / outreach columns → outreach/US-Inspection-Providers-Batch*.xlsx
4. `email_template.txt` — SES one-time notice (CAN-SPAM footer; street address TBD). **Do not send until SES + SPF/DKIM/DMARC + /unsubscribe + /claim?token= are live and the owner approves.**

Excluded sources: LinkedIn, NDT.net, rented lists (Inspectioneering, Quality Magazine).
