import { BUYER_GUIDES } from '@/lib/content/buyers-guide';

export const dynamic = 'force-static';

export function GET() {
  const B = 'https://ndt-connect.com';
  const latest = BUYER_GUIDES.map(g => g.updated).sort().pop();
  const urls = [`<url><loc>${B}/buyers-guide</loc><lastmod>${latest}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${B}/free-erp</loc><lastmod>${latest}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    ...BUYER_GUIDES.map(g => `<url><loc>${B}/buyers-guide/${g.slug}</loc><lastmod>${g.updated}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
