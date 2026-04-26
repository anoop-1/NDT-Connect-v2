# scripts/android-generate-keystore.ps1
#
# Generate the upload keystore for Google Play. Run ONCE, then back up the
# resulting .jks to a password manager. If you lose this keystore, you
# cannot publish updates to the same app — you'd have to publish a new one.
#
# Prereq: keytool (ships with the JDK; if missing, install Microsoft OpenJDK).
#
# Usage (from PowerShell, in E:\software\NDT Connect\mobile\):
#   .\..\scripts\android-generate-keystore.ps1

$ErrorActionPreference = "Stop"

$keystorePath = "E:\software\NDT Connect\mobile\android\upload-keystore.jks"
$alias = "ndtconnect-upload"

if (Test-Path $keystorePath) {
  Write-Error "Keystore already exists at $keystorePath. Delete it first if you really want to regenerate (this will break Play updates)."
  exit 1
}

# Generate
keytool -genkey -v `
  -keystore $keystorePath `
  -alias $alias `
  -keyalg RSA `
  -keysize 2048 `
  -validity 10000 `
  -storetype JKS

Write-Host ""
Write-Host "✓ Keystore generated at:"
Write-Host "    $keystorePath"
Write-Host ""
Write-Host "Now create mobile\android\key.properties (do NOT commit):"
Write-Host ""
Write-Host "    storePassword=YOUR_STORE_PASSWORD"
Write-Host "    keyPassword=YOUR_KEY_PASSWORD"
Write-Host "    keyAlias=$alias"
Write-Host "    storeFile=upload-keystore.jks"
Write-Host ""
Write-Host "Both files (.jks and key.properties) MUST be in your .gitignore."
Write-Host "Back up upload-keystore.jks + the passwords to a password manager NOW."
