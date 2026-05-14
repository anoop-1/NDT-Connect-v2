import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { resolveLegacyRedirect } from '../lib/legacy-slug-redirects';

export const config = {
  matcher: [
    // Auth-protected API surface.
    '/api/admin/:path*',
    '/api/notify/:path*',
    '/api/upload/:path*',
    // Legacy-slug 301s. Middleware-level redirect bypasses the Vercel
    // routes-cap (2048) that the previous next.config.js-based approach
    // blew past with 3,167 enumerated rules.
    '/ndt-services/:path*',
    '/cost-guide/:path*',
    '/training/:path*',
    '/careers/:path*',
  ],
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1) Legacy-slug 301 — fast object lookup. resolveLegacyRedirect returns
  //    null for canonical slugs (e.g. /ndt-services/houston-tx/...) and the
  //    new canonical path for legacy slugs (e.g. /ndt-services/houston/...).
  const dest = resolveLegacyRedirect(path);
  if (dest) {
    const target = new URL(dest, req.url);
    return NextResponse.redirect(target, 301);
  }

  // 2) Non-API public paths covered by the matcher (ndt-services, cost-guide,
  //    training, careers) — pass through, no auth required.
  if (!path.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Allow seed endpoints without auth (they verify credentials internally)
  if (path === '/api/admin/seed' || path === '/api/admin/seed-legacy-users') {
    return NextResponse.next();
  }

  // Admin routes require admin role
  if (path.startsWith('/api/admin')) {
    return checkRole(req, ['admin']);
  }

  // Other protected API routes just need authentication
  return checkAuth(req);
}

async function checkAuth(req: NextRequest) {
  const token = getToken(req);

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized', message: 'Authentication required' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized', message: 'Invalid or expired token' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function checkRole(req: NextRequest, requiredRoles: string[]) {
  const token = getToken(req);

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized', message: 'Authentication required' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    if (!payload.role || !requiredRoles.includes(payload.role as string)) {
      return new NextResponse(
        JSON.stringify({ error: 'Forbidden', message: 'Insufficient permissions' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return NextResponse.next();
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized', message: 'Invalid or expired token' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function getToken(req: NextRequest): string | null {
  // Check for ndt-token cookie first (new standard token)
  const ndtToken = req.cookies.get('ndt-token')?.value;
  if (ndtToken) return ndtToken;

  // Fall back to auth-token cookie for backward compatibility
  const authToken = req.cookies.get('auth-token')?.value;
  if (authToken) return authToken;

  // Check Authorization header
  const authHeader = req.headers.get('authorization');
  if (authHeader) {
    return authHeader.replace('Bearer ', '');
  }

  return null;
}
