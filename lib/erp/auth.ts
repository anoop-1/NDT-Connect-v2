import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '@/lib/jwt';
import { getUserByEmail } from '@/lib/auth-service';

export interface ErpUser { id: string; email: string; name?: string; role?: string; companyName?: string }

/** Resolve the signed-in user from the session cookie / Bearer token. Owner id is NEVER taken from the request body. */
export async function getErpUser(req: NextRequest): Promise<ErpUser | null> {
  const token = req.headers.get('authorization')?.replace('Bearer ', '') ?? req.cookies.get('ndt-token')?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const user: any = await getUserByEmail(String(payload.email));
    if (!user) return null;
    return { id: String(user._id ?? user.id), email: user.email, name: user.name, role: user.role, companyName: user.companyName };
  } catch {
    return null;
  }
}

export const unauthorized = () => NextResponse.json({ success: false, message: 'Please sign in' }, { status: 401 });
export const notFound = (what = 'Record') => NextResponse.json({ success: false, message: `${what} not found` }, { status: 404 });
export const bad = (message: string | string[]) =>
  NextResponse.json({ success: false, message: Array.isArray(message) ? message.join('; ') : message }, { status: 400 });
export const serverError = (e: unknown) => {
  console.error('[erp]', e);
  return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 });
};
