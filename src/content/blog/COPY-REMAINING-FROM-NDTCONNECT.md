# Finish mirroring the blog content

Three blog markdown files were not mirrored from `NDTConnect/src/content/blog/`
to the root project's `src/content/blog/` because of context-budget limits on
the agent that did the mirroring sweep.

The 3 missing files are byte-identical to their canonical copies, so a one-shot
copy is the correct operation:

## PowerShell (run from `E:\software\NDT Connect\`)

```powershell
Copy-Item -Path "NDTConnect\src\content\blog\calibration-interval-rules-by-code.md" -Destination "src\content\blog\calibration-interval-rules-by-code.md"
Copy-Item -Path "NDTConnect\src\content\blog\free-vs-paid-ndt-software.md"          -Destination "src\content\blog\free-vs-paid-ndt-software.md"
Copy-Item -Path "NDTConnect\src\content\blog\asnt-snt-tc-1a-complete-guide.md"      -Destination "src\content\blog\asnt-snt-tc-1a-complete-guide.md"
```

Or as a single line:

```powershell
@('calibration-interval-rules-by-code','free-vs-paid-ndt-software','asnt-snt-tc-1a-complete-guide') | ForEach-Object { Copy-Item "NDTConnect\src\content\blog\$_.md" "src\content\blog\$_.md" }
```

After running, delete this `COPY-REMAINING-FROM-NDTCONNECT.md` file.

## What's already mirrored to `src/content/blog/`

- ultimate-guide-ultrasonic-testing.md (done)
- rbi-corrosion-management.md (done)
- ndt-certifications-explained.md (done)

## Verification

```powershell
Get-ChildItem "src\content\blog\*.md" | Select-Object Name, Length
# Should show 6 .md files
```
