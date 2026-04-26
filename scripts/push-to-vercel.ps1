# scripts/push-to-vercel.ps1
#
# Push all NDT Connect changes (Next.js + mobile scaffold) to GitHub.
# Vercel is set up to auto-deploy from the main branch, so a push triggers:
#   - https://ndt-connect.com (Next.js root project)
#   - https://app.ndt-connect.com (mobile/ Flutter web build, separate Vercel project)
#
# Usage (from PowerShell, in E:\software\NDT Connect\):
#   .\scripts\push-to-vercel.ps1 -Message "feat: free-tools + city pages + login redesign + Flutter scaffold"
#
# Dry run (shows what will be committed without pushing):
#   .\scripts\push-to-vercel.ps1 -DryRun

param(
  [Parameter(Mandatory=$true)]
  [string]$Message,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$repoRoot = "E:\software\NDT Connect"

Write-Host "→ Repo: $repoRoot"
Set-Location $repoRoot

# Sanity check: is this a git repo and is the remote what we expect?
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
  Write-Error "No git remote found. Run 'git remote add origin <url>' first."
  exit 1
}
Write-Host "→ Remote: $remoteUrl"

# Show current status
Write-Host ""
Write-Host "→ Current status:"
git status --short
Write-Host ""

if ($DryRun) {
  Write-Host "[DRY RUN] Would run:"
  Write-Host "  git add ."
  Write-Host "  git commit -m `"$Message`""
  Write-Host "  git push origin main"
  exit 0
}

# Stage everything that matters. .gitignore should already exclude:
#   node_modules/, .next/, mobile/build/, mobile/.dart_tool/, *.aab, *.ipa, .env, .env.local
Write-Host "→ Staging changes..."
git add .

# Show staged diff summary
Write-Host ""
Write-Host "→ Staged changes:"
git diff --cached --stat | Select-Object -Last 20
Write-Host ""

# Commit
Write-Host "→ Committing..."
git commit -m "$Message"

# Push to main
Write-Host "→ Pushing to origin/main..."
git push origin main

Write-Host ""
Write-Host "✓ Pushed. Vercel deploy should start within 60 seconds:"
Write-Host "  - Watch: https://vercel.com/dashboard"
Write-Host "  - Live:  https://ndt-connect.com"
Write-Host "  - App:   https://app.ndt-connect.com (after the mobile/ Vercel project triggers)"
Write-Host ""
Write-Host "Post-deploy verification:"
Write-Host "  curl -I https://ndt-connect.com"
Write-Host "  curl -I https://ndt-connect.com/sitemap.xml"
Write-Host "  curl -I https://ndt-connect.com/free-tools/equipment-management/houston-tx"
Write-Host "  curl -I https://app.ndt-connect.com/manifest.json"
