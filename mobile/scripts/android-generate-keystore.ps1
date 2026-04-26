#Requires -Version 5.1
<#
.SYNOPSIS
  Generate the Android upload keystore for NDT Connect non-interactively.

.DESCRIPTION
  Reads the keystore password from $env:NDT_KEYSTORE_PASS so the secret
  never lands in shell history or version control. Writes:
    mobile/android/upload-keystore.jks
    mobile/android/key.properties

.EXAMPLE
  $env:NDT_KEYSTORE_PASS = "<paste-from-1Password>"
  pwsh ./scripts/android-generate-keystore.ps1
#>
[CmdletBinding()]
param(
  [string]$Alias       = "ndtconnect-upload",
  [string]$Dname       = "CN=NDT Connect, O=Atlantis NDT, L=Houston, ST=TX, C=US",
  [int]   $ValidityDays = 10000,
  [int]   $KeySize      = 2048,
  [string]$KeyAlg       = "RSA"
)

$ErrorActionPreference = "Stop"

$pass = $env:NDT_KEYSTORE_PASS
if (-not $pass) {
  Write-Error "NDT_KEYSTORE_PASS env var not set. Aborting."
  exit 1
}
if ($pass.Length -lt 6) {
  Write-Error "NDT_KEYSTORE_PASS must be >=6 chars (Java keytool requirement)."
  exit 1
}

$mobileRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$androidDir = Join-Path $mobileRoot "android"
$keystore   = Join-Path $androidDir "upload-keystore.jks"
$keyProps   = Join-Path $androidDir "key.properties"

if (-not (Test-Path $androidDir)) {
  Write-Error "Android dir missing: $androidDir. Run 'flutter create .' first."
  exit 1
}

if (Test-Path $keystore) {
  Write-Error "Keystore already exists at $keystore. Refusing to overwrite. Move/rename it first."
  exit 1
}

$keytool = (Get-Command keytool -ErrorAction SilentlyContinue)?.Source
if (-not $keytool) {
  $jhome = $env:JAVA_HOME
  if ($jhome -and (Test-Path "$jhome\bin\keytool.exe")) {
    $keytool = "$jhome\bin\keytool.exe"
  } else {
    Write-Error "keytool not found. Install JDK 17 (Android Studio bundled JDK works) and ensure 'keytool' is on PATH or JAVA_HOME is set."
    exit 1
  }
}

Write-Host "Generating keystore..."
& $keytool -genkeypair `
  -alias       $Alias `
  -keyalg      $KeyAlg `
  -keysize     $KeySize `
  -validity    $ValidityDays `
  -keystore    $keystore `
  -storetype   PKCS12 `
  -dname       $Dname `
  -storepass   $pass `
  -keypass     $pass

if ($LASTEXITCODE -ne 0) {
  Write-Error "keytool failed (exit $LASTEXITCODE)"
  exit 1
}

# key.properties is read by android/app/build.gradle. Keep it OUT of git.
$keystoreForGradle = ($keystore -replace '\\','/')
@"
storePassword=$pass
keyPassword=$pass
keyAlias=$Alias
storeFile=$keystoreForGradle
"@ | Set-Content -Path $keyProps -Encoding ASCII -NoNewline

Write-Host ""
Write-Host "  Keystore : $keystore"
Write-Host "  Props    : $keyProps"
Write-Host ""
Write-Host "NEXT:"
Write-Host "  1. Confirm both files in mobile/android/.gitignore (do NOT commit)."
Write-Host "  2. Wire android/app/build.gradle signingConfigs to read key.properties."
Write-Host "  3. Back up upload-keystore.jks + the password to 1Password — losing it means losing Play Store update access forever."
