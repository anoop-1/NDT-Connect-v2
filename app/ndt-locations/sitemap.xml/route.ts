import { CITY_HUBS } from '@/lib/content/city-hubs';
const BASE = 'https://ndt-connect.com';
export const dynamic = 'force-static';
export function GET() {
  const urls = [{ loc: `${BASE}/ndt-locations`, lastmod: CITY_HUBS.reduce((m, c) => (c.updated > m ? c.updated : m), '2026-11-23') },
    ...CITY_HUBS.map(c => ({ loc: `${BASE}/ndt-services/${c.slug}`, lastmod: c.updated }))];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
