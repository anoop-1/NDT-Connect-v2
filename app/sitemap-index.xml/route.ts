// Manual sitemap-index. Next.js 14.2 generateSitemaps emits sub-sitemaps at
// /sitemap/<id>.xml but does NOT auto-emit the index. This route handler
// produces the <sitemapindex> XML that lists every bucket the build wrote.
//
// Submit THIS URL to GSC, Bing, IndexNow, etc. — not /sitemap.xml (which
// returns 404 under the split layout) and not the individual chunks.

import { readdirSync } from 'fs';
import path from 'path';

const BASE_URL = 'https://ndt-connect.com';

// IMPORTANT: keep in sync with the BUCKETS keys in app/sitemap.ts.
// We can't `import` them at module load (the sitemap module runs at build
// time only), so we mirror the list here. If you rename a bucket in
// sitemap.ts, mirror it here too.
const STATIC_BUCKETS = [
  'static',
  'city-hubs',
  'city-methods',
  'cost-guides',
  'careers-cities',
  'careers-roles',
  'training',
  'methods',
  'industries',
  'certifications',
  'blog',
  'comparisons',
  'glossary',
  'standards',
  'tools',
  'free-tools-landing',
  'free-tools-features',
  'free-tools-standalone',
  'free-tools-cities',
  'free-tools-regions',
  'free-tools-countries',
  'procedure-generator',
];

// Authored buckets are dynamic — only listed if their folder exists with
// at least one .ts file.
const AUTHORED_BUCKETS: { bucket: string; folder: string }[] = [
  { bucket: 'authored-methods',       folder: 'methods' },
  { bucket: 'authored-industries',    folder: 'industries' },
  { bucket: 'authored-standards',     folder: 'standards' },
  { bucket: 'authored-states',        folder: 'states' },
  { bucket: 'authored-careers',       folder: 'careers' },
  { bucket: 'authored-equipment',     folder: 'equipment' },
  { bucket: 'authored-case-studies',  folder: 'case-studies' },
  { bucket: 'authored-comparisons',   folder: 'comparisons' },
  { bucket: 'authored-learn',         folder: 'learn' },
  { bucket: 'authored-glossary',      folder: 'glossary' },
  { bucket: 'authored-pillars',       folder: 'pillars' },
  { bucket: 'authored-tools',         folder: 'tools' },
  { bucket: 'authored-topics',        folder: 'topics' },
];

function hasContent(folder: string): boolean {
  try {
    const dir = path.join(process.cwd(), 'lib', 'content', 'authored', folder);
    return readdirSync(dir).some((f) => f.endsWith('.ts') && !f.startsWith('_'));
  } catch {
    return false;
  }
}

export const dynamic = 'force-static';

export function GET() {
  const buckets: string[] = [...STATIC_BUCKETS];
  for (const { bucket, folder } of AUTHORED_BUCKETS) {
    if (hasContent(folder)) buckets.push(bucket);
  }

  const lastmod = new Date().toISOString();
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    buckets
      .map(
        (b) =>
          `  <sitemap><loc>${BASE_URL}/sitemap/${b}.xml</loc><lastmod>${lastmod}</lastmod></sitemap>`,
      )
      .join('\n') +
    '\n</sitemapindex>\n';

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
