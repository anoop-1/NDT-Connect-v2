# GSC Ownership Finishing Runbook

Generated 2026-05-15 after a long automation session. This documents what's done and what you need to click through manually. Total remaining time: ~15–20 min.

## What's already done (updated 2026-05-15 04:00 UTC)

- All 10 service-account JSON keys are in `seo-analysis/credentials/`
  - 5 old: `atlantis-gsc-2-*.json` (×2), `atlantis-gsc-3-*.json`, `atlantis-gsc-5-*.json`, `bustling-joy-492106-s3-*.json`
  - 5 new: `atlantis-idx-6.json` through `atlantis-idx-10.json` (created via Cloud Shell)
- Web Search Indexing API + Search Console API enabled on the 5 new projects (`atlantis-idx-6` through `atlantis-idx-10`)
- **GSC ownership status:**
  - `atlantisndt.com`: 5 OLD SAs already Owner (atlantismarketing, gsc-2, gsc-3, bustling-joy, gsc-5). Need to add 5 NEW idx-* SAs.
  - `ndt-connect.com`: 5 OLD SAs added as Owner this session (atlantismarketing was already there; added/converted gsc-2, gsc-3, bustling-joy, gsc-5). Need to add 5 NEW idx-* SAs.
  - **Current capacity: 1000 URLs/day on each property (5 SAs × 200/day)**
  - **Target after adding 5 NEW: 2000 URLs/day on each property**
- GSC `atlantisndt.com` (sc-domain): 5 existing SAs are already Owner
- GSC `ndt-connect.com` (sc-domain):
  - `atlantismarketing@x-jigsaw-293515` is Owner (existing)
  - `gsc-indexer@atlantis-gsc-2` is Owner (added today)
  - `gsc-indexer@atlantis-gsc-3` is Owner (added today)
  - `gsc-indexer@bustling-joy-492106-s3` is Full (still needs convert)
  - `gsc-indexer@atlantis-gsc-5` is Full (still needs convert)

## The 10 SA emails you're dealing with

```
atlantismarketing@x-jigsaw-293515.iam.gserviceaccount.com   (already Owner on both)
gsc-indexer@atlantis-gsc-2.iam.gserviceaccount.com
gsc-indexer@atlantis-gsc-3.iam.gserviceaccount.com
gsc-indexer@bustling-joy-492106-s3.iam.gserviceaccount.com
gsc-indexer@atlantis-gsc-5.iam.gserviceaccount.com
gsc-indexer@atlantis-idx-6.iam.gserviceaccount.com    (new — needs propagation)
gsc-indexer@atlantis-idx-7.iam.gserviceaccount.com    (new — needs propagation)
gsc-indexer@atlantis-idx-8.iam.gserviceaccount.com    (new — needs propagation)
gsc-indexer@atlantis-idx-9.iam.gserviceaccount.com    (new — needs propagation)
gsc-indexer@atlantis-idx-10.iam.gserviceaccount.com   (new — needs propagation)
```

## What you need to finish

### Step 1 — Convert two Full → Owner on ndt-connect.com (2 min, do now)

Go to https://search.google.com/search-console/users?resource_id=sc-domain%3Andt-connect.com

For each of these two rows: click the kebab `⋮` → Change permissions → click the Permission dropdown → pick **Owner** → SAVE
- `gsc-indexer@bustling-joy-492106-s3.iam.gserviceaccount.com`
- `gsc-indexer@atlantis-gsc-5.iam.gserviceaccount.com`

(Tip: If the dropdown gets weird, just click the **Owner** text twice — once to highlight, once to confirm. The "Updating permissions" progress bar means it took.)

### Step 2 — Wait for new SAs to propagate (~15 min total wait from creation)

The 5 new SAs (`atlantis-idx-6..10`) were created in Cloud Shell at ~02:55 UTC and need Google's identity directory to propagate them before GSC will accept them. If you hit "Failed to add user: email not found", wait another 5 min and retry.

### Step 3 — Add the 5 new SAs as Owner on BOTH properties (10 min after propagation)

For each of the 5 new emails, on each of the 2 properties (10 ops total):

1. Go to the property's Users and permissions page
2. Click **ADD USER**
3. Paste the email
4. Click the Permission dropdown → pick **Owner**
5. Click **ADD**

Properties to add to:
- https://search.google.com/search-console/users?resource_id=sc-domain%3Aatlantisndt.com
- https://search.google.com/search-console/users?resource_id=sc-domain%3Andt-connect.com

If "Owner" in the dropdown is finicky (it was during this session), use the fallback: ADD as Full first, then click the row's kebab → Change permissions → Owner → SAVE.

### Step 4 — Verify all 10 SAs work (1 min)

```powershell
cd "E:\software\NDT Connect"
python seo-analysis\pull-gsc.py
```

Expected: pulls 90 days of data for both properties. If a key fails 403, that SA isn't yet an Owner — fix in GSC and re-run.

### Step 5 — Bing Webmaster + IndexNow (15 min)

1. Open https://www.bing.com/webmasters/ → sign in with the same Google account (anu.anoop485@gmail.com)
2. Click **Import** at the top → choose **Google Search Console** → grant access
3. Both properties (`atlantisndt.com` and `ndt-connect.com`) come in pre-verified
4. Submit the same sitemaps you have in GSC
5. Settings → API access → generate an **IndexNow API key**
6. Save the key file at `app/<KEY>.txt` in your Vercel project, deploy, then use the key with `seo-analysis/submit-indexnow.py` (already exists in repo)

That's it. With all 10 SAs as Owner, you've got 2,000 Indexing API calls/day total (200 per SA) for fast Google indexing of new pages, plus IndexNow for Bing.

## Why the manual finish

The GSC UI dropdown has a Material Design Web Component that doesn't always register browser-driven clicks reliably for the "Owner" option specifically. Manual clicks land it every time. The propagation wait is just Google's distributed identity system catching up to the brand-new service accounts — there's no way around it.
