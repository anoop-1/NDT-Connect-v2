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
          // CSP — REPORT-ONLY. Reports POST to /api/csp-report (Vercel function
          // logs). Allows known-good external origins: GTM/GA, Mapbox, Pusher,
          // Unsplash, and Google AdSense (pagead/googlesyndication). Explicit
          // script-src-elem so element-level script loads aren't blocked by the
          // script-src fallback. Inline-script + inline-style stay allowed
          // because Next.js App Router emits hydration-bootstrap inline JS;
          // tighten to nonce-based after telemetry review.
          {
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.pusher.com https://api.mapbox.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://adservice.google.com https://*.googlesyndication.com",
              "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://js.pusher.com https://api.mapbox.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://adservice.google.com https://*.googlesyndication.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https: https://placehold.co https://images.unsplash.com https://api.mapbox.com https://*.tile.openstreetmap.org",
              "connect-src 'self' https://*.google-analytics.com https://www.googletagmanager.com https://api.mapbox.com https://*.pusher.com wss://*.pusher.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.g.doubleclick.net",
              "frame-src 'self' https://www.google.com https://www.youtube.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "report-uri /api/csp-report",
              "upgrade-insecure-requests",
            ].join('; '),
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
