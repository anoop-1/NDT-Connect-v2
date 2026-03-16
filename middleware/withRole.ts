
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

export function withRole(requiredRoles: string[]) {
  return async function middleware(req: NextRequest) {
    console.log('🔔 Middleware running! (You should see this per request)');
    
    try {
      const authToken = req.cookies.get('auth-token')?.value;
      
      if (!authToken) {
        console.log('No auth token found');
        return unauthorizedResponse(req, 'No auth token found');
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(authToken, secret);
      
      if (typeof payload !== 'object' || payload === null) {
        console.log('Invalid token payload');
        return unauthorizedResponse(req, 'Invalid token payload');
      }

      if (!('role' in payload) || !requiredRoles.includes(payload.role as string)) {
        console.log('Missing or invalid role',);
        return unauthorizedResponse(req, 'Missing or invalid role');
      }

      if ('exp' in payload && payload.exp && Date.now() >= payload.exp * 1000) {
        console.log('Token expired');
        return unauthorizedResponse(req, 'Token expired');
      }

      return NextResponse.next();
    } catch (error: any) {
      console.error('Middleware error:', error);
      return unauthorizedResponse(req, JSON.stringify(error));
    }
  }
}

function unauthorizedResponse(req: NextRequest, reason: string) {
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Unauthorized',
        message: 'You do not have permission to access this resource',
        reason
      }),
      { 
        status: 401, 
        headers: { 
          'Content-Type': 'application/json',
          'WWW-Authenticate': 'Bearer realm="Access to admin resources", charset="UTF-8"'
        } 
      }
    );
  }
  
  const loginUrl = new URL('/login', req.url);
  loginUrl.searchParams.set('from', req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}
