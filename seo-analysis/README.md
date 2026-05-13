# SEO Analysis Tooling

Local Python tooling that pulls the last 90 days of Google Search Console (GSC) and
Google Analytics 4 (GA4) data for **ndt-connect.com** and **atlantisndt.com**, then
produces analysis CSVs and a ranked quick-wins report.

All credentials and outputs are gitignored — nothing in `credentials/` or `output/` is
committed.

---

## 1. Install

Python 3.10+ required.

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r seo-analysis/requirements.txt
```

---

## 2. Drop service account credentials

Create the credentials directory if it doesn't exist and drop one or more service
account JSON files into it:

```
seo-analysis/credentials/<any-name>.json
```

The scripts will pick up **every** `*.json` file in that directory and rotate through
them when one hits a 429 quota error.

### Service accounts available

The following service accounts already have access to GSC for both properties (request
the JSON keys from Anoop if you don't have them locally):

- `atlantismarketing@x-jigsaw-293515.iam.gserviceaccount.com`  (primary)
- `gsc-indexer@atlantis-gsc-2.iam.gserviceaccount.com`
- `gsc-indexer@atlantis-gsc-3.iam.gserviceaccount.com`
- `gsc-indexer@atlantis-gsc-4.iam.gserviceaccount.com`
- `gsc-indexer@atlantis-gsc-5.iam.gserviceaccount.com`
- `gsc-indexer@atlantis-gsc-6.iam.gserviceaccount.com`
- `gsc-indexer@atlantis-gsc-7.iam.gserviceaccount.com`
- `gsc-indexer@atlantis-gsc-8.iam.gserviceaccount.com`
- `gsc-indexer@atlantis-gsc-9.iam.gserviceaccount.com`
- `gsc-indexer@atlantis-gsc-10.iam.gserviceaccount.com`

Drop any/all of their JSON keys into `seo-analysis/credentials/`.

### GSC permissions

Each service account must be added as a **Restricted user** (read access is enough) on
both Search Console properties:

- `https://www.ndt-connect.com/`  (or whichever variant is verified)
- `https://www.atlantisndt.com/`

### GA4 permissions

For `pull-ga4.py`, each service account must be added as a **Viewer** on both GA4
properties.

Set the GA4 property IDs as environment variables before running:

```bash
# Windows PowerShell
$env:GA4_PROPERTY_ID_NDTCONNECT = "123456789"
$env:GA4_PROPERTY_ID_ATLANTIS    = "987654321"

# macOS/Linux
export GA4_PROPERTY_ID_NDTCONNECT=123456789
export GA4_PROPERTY_ID_ATLANTIS=987654321
```

To find each property ID: GA4 → Admin → Property Settings → top-right "Property ID".

---

## 3. Run the pulls

All commands are run from the repo root (`e:/software/NDT Connect`).

```bash
# Pull last 90 days from GSC for both sites
python seo-analysis/pull-gsc.py

# Pull last 90 days from GA4 for both sites
python seo-analysis/pull-ga4.py

# Analyze and produce quick-wins.md + funnel.md
python seo-analysis/analyze.py
```

---

## 4. Outputs

After both pull scripts succeed you'll have:

```
seo-analysis/output/
  ndt-connect.com/
    queries.csv                 # top 1000 queries
    pages.csv                   # top 1000 pages
    query-page-pairs.csv        # top 5000 query×page pairs
    country.csv                 # country breakdown
    queries-near-miss.csv       # pos 11-30, impressions > 50
    pages-high-impr-low-ctr.csv # impr > 500 AND ctr < 1%
    pages-zero-clicks.csv       # clicks == 0 AND impressions > 0
    acquisition-channels.csv    # GA4 default channel grouping
    top-landing-pages.csv       # GA4 top 1000 landing pages
    signup-funnel.csv           # /register page views
  atlantisndt.com/
    (same layout)
  quick-wins.md                 # ranked top 50 pages to fix
  funnel.md                     # narrative on signup drop-off
```

---

## 5. Site URL conventions

GSC properties are usually verified in one of these formats:

- Domain property: `sc-domain:ndt-connect.com`
- URL-prefix property: `https://www.ndt-connect.com/`

`pull-gsc.py` tries the domain-property form first and falls back to the
`https://www.<site>/` URL-prefix form automatically. If your verified property uses a
different host (e.g. apex without `www`), edit the `SITE_VARIANTS` list at the top of
`pull-gsc.py`.

---

## 6. Troubleshooting

| Symptom                                | Fix                                                                 |
| -------------------------------------- | ------------------------------------------------------------------- |
| `FileNotFoundError: credentials/`      | Create `seo-analysis/credentials/` and drop a service account JSON  |
| `HttpError 403: User does not have…`   | Add the SA email as a Restricted user in GSC / Viewer in GA4        |
| `HttpError 429: Quota exceeded`        | Add more SA JSONs — the script auto-rotates on 429                   |
| `GA4_PROPERTY_ID_NDTCONNECT is unset`  | Export the env var (see step 2)                                     |
| `Site not found in GSC`                | Edit `SITE_VARIANTS` in `pull-gsc.py` to match your verified format |
