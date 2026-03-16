import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/api/',
          '/settings/',
          '/my-requests/',
          '/provider-dashboard/',
          '/provider-profile/',
          '/provider-requests/',
          '/track-request/',
        ],
      },
    ],
    sitemap: 'https://ndt-connect.com/sitemap.xml',
  };
}
