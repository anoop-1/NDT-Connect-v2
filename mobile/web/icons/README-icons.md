# Web app icons

Flutter's web build expects PNG icons at fixed sizes here. Generate them
once from your master logo and commit. They are NOT auto-created by
`flutter create .` for an existing project — you ship them yourself.

## Required files

| File | Size | Purpose |
|---|---|---|
| `Icon-192.png` | 192×192 | PWA install icon (Android Chrome, desktop Chrome) |
| `Icon-512.png` | 512×512 | PWA install icon, splash screen |
| `Icon-maskable-192.png` | 192×192 | Android adaptive icon (safe zone in centre 80%) |
| `Icon-maskable-512.png` | 512×512 | Android adaptive icon (large) |
| `favicon.png` (in `../web/`) | 32×32 | Browser tab icon |

## Quick generation

If you have ImageMagick installed:

```bash
# From the master logo (the colored NDT Connect logo file)
magick logo-master.png -resize 192x192 mobile/web/icons/Icon-192.png
magick logo-master.png -resize 512x512 mobile/web/icons/Icon-512.png

# Maskable: pad to give the safe zone, then resize
magick logo-master.png -resize 600x600 -gravity center -background "#004AAD" -extent 1000x1000 -resize 192x192 mobile/web/icons/Icon-maskable-192.png
magick logo-master.png -resize 600x600 -gravity center -background "#004AAD" -extent 1000x1000 -resize 512x512 mobile/web/icons/Icon-maskable-512.png

# Favicon
magick logo-master.png -resize 32x32 mobile/web/favicon.png
```

Or use https://www.pwabuilder.com/imageGenerator (web tool — upload once, download all sizes).

## Until icons exist

The `manifest.json` references the four `Icon-*.png` files. Until those are committed, `flutter run -d chrome` works but the install prompt won't show because Chrome rejects manifests with missing referenced icons.

For a quick stub: copy any 192×192 and 512×512 brand image into this folder with the four expected filenames. They can be polished later without changing the manifest.
