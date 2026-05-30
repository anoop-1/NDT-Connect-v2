// /app/api/csp-report/route.ts
// Receives Content-Security-Policy-Report-Only violation reports posted from
// browsers and logs them to the Vercel function log. View at:
//   Vercel dashboard → Project → Logs → Filter by /api/csp-report
// Use this telemetry for ~2 weeks before flipping the CSP header from
// "Content-Security-Policy-Report-Only" → "Content-Security-Policy" enforce mode.
//
// CSP reports come in two formats:
//   - Legacy "report-uri" format: { "csp-report": {...} } as application/csp-report
//   - Modern Reporting API: array of { type: "csp-violation", body: {...} } as application/reports+json
// Handle both.

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // edge is fine — we only need to log + 204

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    const body = await request.text();

    let parsed: unknown;
    try {
      parsed = JSON.parse(body);
    } catch {
      parsed = body.slice(0, 2000); // truncate huge bodies
    }

    const userAgent = request.headers.get('user-agent') ?? 'unknown';
    const referrer = request.headers.get('referer') ?? 'unknown';

    // eslint-disable-next-line no-console
    console.log(JSON.stringify({
      tag: 'csp-violation',
      contentType,
      userAgent,
      referrer,
      report: parsed,
      receivedAt: new Date().toISOString(),
    }));

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('csp-report endpoint error:', err);
    return new NextResponse(null, { status: 204 });
  }
}

// Also handle preflight / OPTIONS for browsers that send it
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type',
    },
  });
}
