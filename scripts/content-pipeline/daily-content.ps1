# Daily content pipeline runner — invoked by Windows Task Scheduler.
# Schedule example (PowerShell, run as Administrator):
#
#   $action = New-ScheduledTaskAction -Execute 'powershell.exe' `
#       -Argument '-NoProfile -ExecutionPolicy Bypass -File "E:\software\NDT Connect\scripts\content-pipeline\daily-content.ps1"'
#   $trigger = New-ScheduledTaskTrigger -Daily -At 02:00am
#   $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RunOnlyIfNetworkAvailable
#   Register-ScheduledTask -TaskName 'NDTConnect-DailyContent' -Action $action -Trigger $trigger -Settings $settings -Description '300 authored NDT pages/day for 10 days'
#
# Requires ANTHROPIC_API_KEY set in machine env (System Properties → Environment Variables).

$ErrorActionPreference = 'Continue'

$Repo = 'E:\software\NDT Connect'
$Pipeline = Join-Path $Repo 'scripts\content-pipeline'
$LogFile = Join-Path $Pipeline ("daily-{0}.log" -f (Get-Date -Format 'yyyy-MM-dd'))

Set-Location $Repo

Write-Output "=== Daily content run @ $(Get-Date -Format 's') ===" | Tee-Object -FilePath $LogFile -Append

if (-not $env:ANTHROPIC_API_KEY) {
    Write-Output 'ANTHROPIC_API_KEY not set — abort.' | Tee-Object -FilePath $LogFile -Append
    exit 1
}

# Use python on PATH. If a venv exists at .\.venv, prefer it.
$Python = if (Test-Path '.\.venv\Scripts\python.exe') { '.\.venv\Scripts\python.exe' } else { 'python' }

& $Python "$Pipeline\orchestrate.py" 2>&1 | Tee-Object -FilePath $LogFile -Append

Write-Output "=== Daily content run done @ $(Get-Date -Format 's') ===" | Tee-Object -FilePath $LogFile -Append
