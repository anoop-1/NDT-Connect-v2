import { NDT_LEADERS } from '@/lib/content/ndt-leaders';

export const dynamic = 'force-static';

export function GET() {
  const B = 'https://ndt-connect.com';
  const latest = NDT_LEADERS.map(l => l.updated).sort().pop();
  const urls = [`<url><loc>${B}/ndt-leaders</loc><lastmod>${latest}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    ...NDT_LEADERS.map(l => `<url><loc>${B}/ndt-leaders/${l.slug}</loc><lastmod>${l.updated}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
