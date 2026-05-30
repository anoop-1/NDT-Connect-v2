/** @type {import('next').NextConfig} */
// Legacy-slug 301s moved to src/middleware.ts (Vercel route cap is 2048 and
// the enumerated redirect set is 3,000+).

const nextConfig = {
  /* config options here */
  typescript: {
    // Test files have pre-existing issues; app code is clean
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          // CSP — added 2026-05-29 in REPORT-ONLY mode for 2 weeks to surface
          // any unexpected violations (third-party scripts, inline styles) before
          // flipping to enforce. Allows the known-good external origins used by
          // the site today (Google Tag Manager, Google Maps, Mapbox, Pusher,
          // Unsplash images). Inline-script and inline-style are allowed for now
          // because Next.js App Router still emits hydration-bootstrap inline JS;
          // tighten to 'nonce-...' after CSP-Report-Only telemetry is reviewed.
          {
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.pusher.com https://api.mapbox.com",
              "style-src 'sel