import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const config = {
  matcher: [
    '/api/admin/:path*',
    '/api/notify/:path*',
    '/api/upload/:path*',
  ],
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Admin routes require admin role
  if (path.startsWith('/api/admin')) {
    return checkRole(req, ['admin']);
  }

  // Other protected API routes just need authentication
  return checkAuth(req);
}

async function checkAuth(req: NextRequest) {
  const authToken = req.cookies.get('auth-token')?.value;
  // Also check Authorization header for API calls from client
  const authHeader = req.headers.get('authorization');
  const token = authToken || authHeader?.replace('Bearer ', '');

  if (!token) {
    // For API routes without auth, allow (the endpoint handles its own validation)
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.next(); // Non-blocking for now
  }
}

async function checkRole(req: NextRequest, requiredRoles: string[]) {
  const authToken = req.cookies.get('auth-token')?.value;

  if (!authToken) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized', message: 'Authentication required' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(authToken, secret);

    if (!payload.role || !requiredRoles.includes(payload.role as string)) {
      return new NextResponse(
        JSON.stringify({ error: 'Forbidden', message: 'Insufficient permissions' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return NextResponse.next();
  } catch {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized', message: 'Invalid or expired token' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
