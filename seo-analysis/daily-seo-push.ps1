# Daily SEO push for NDT Connect.
#
# Run from Windows Task Scheduler at 09:00 local. Submits a fresh batch of
# URLs to the Google Indexing API (up to 1000/day across 5 service
# accounts) and re-pings Bing IndexNow with the latest sitemap.
#
# Schedule once with:
#   schtasks /Create /TN "NDTConnectDailySEO" /TR `
#     "powershell -ExecutionPolicy Bypass -File E:\software\NDT Connect\seo-analysis\daily-seo-push.ps1" `
#     /SC DAILY /ST 09:00

$ErrorActionPreference = 'Continue'
$ProjectDir = 'E:\software\NDT Connect'
$LogDir = Join-Path $ProjectDir 'seo-analysis\output\daily-logs'
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
$Stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$Log = Join-Path $LogDir "$Stamp.log"

Set-Location $ProjectDir
"=== $(Get-Date -Format o) — daily SEO push ===" | Tee-Object -FilePath $Log -Append

# 1. Google Indexing API — 2000/day across 10 service accounts (200 each).
"--- Google Indexing API submit ---" | Tee-Object -FilePath $Log -Append
python seo-analysis/submit-urls.py --limit 2000 2>&1 | Tee-Object -FilePath $Log -Append

# 2. IndexNow — no quota, full sitemap each run.
"--- IndexNow submit ---" | Tee-Object -FilePath $Log -Append
python seo-analysis/submit-indexnow.py 2>&1 | Tee-Object -FilePath $Log -Append

# 3. Weekly: re-submit sitemap to GSC (every Monday).
if ((Get-Date).DayOfWeek -eq 'Monday') {
    "--- GSC sitemap re-submit (Mon) ---" | Tee-Object -FilePath $Log -Append
    python seo-analysis/resubmit-gsc-sitemap.py 2>&1 | Tee-Object -FilePath $Log -Append
}

"=== done $(Get-Date -Format o) ===" | Tee-Object -FilePath $Log -Append
