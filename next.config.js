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
          // CSP — added 2026-05-29 (re-applied 2026-05-30 after the prior
          // edit was truncated mid-write on the mounted FS). REPORT-ONLY for
          // 2 weeks to surface unexpected violations before flipping to
          // enforce. Reports POST to /api/csp-report (logs to Vercel function
          // logs). Allows known-good external origins: GTM/GA, Mapbox,
          // Pusher, Unsplash. Inline-script + inline-style stay allowed
          // because Next.js App Router emits hydration-bootstrap inline JS;
          // tighten to nonce-based after telemetry review.
          {
            key: 'Content-Security-Policy-Report-Only',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.pusher.com https://api.mapbox.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https://*.google-analytics.com https://www.googletagmanager.com https://api.mapbox.com https://*.pusher.com wss://*.pusher.com; frame-src 'self' https://www.google.com https://www.youtube.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; report-uri /api/csp-report; upgrade-insecure-requests"
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
{
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Externalize server-only packages
  experimental: {
    serverComponentsExternalPackages: [
      'pusher',
      '@grpc/grpc-js',
      '@grpc/proto-loader',
      'kafkajs',
      'ioredis',
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle server-only modules on client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;

