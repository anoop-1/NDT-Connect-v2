// src/lib/api-auth.ts
//
// requireAuth(req): verifies the bearer JWT (or ndt-token / auth-token cookie)
// using jose, returns { userId, role }. Throws ApiAuthError(401) on failure.
//
// JWT shape (matches existing middleware + auth flow):
//   {
//     sub: string  // user._id
//     role: 'client' | 'provider' | 'admin' | 'inspector'
//     email?: string
//     iat, exp
//   }

import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export type AuthRole = "client" | "provider" | "admin" | "inspector";

export interface AuthContext {
  userId: string;
  role: AuthRole;
  email?: string;
}

export class ApiAuthError extends Error {
  status: number;
  constructor(message: string, status = 401) {
    super(message);
    this.name = "ApiAuthError";
    this.status = status;
  }
}

function getToken(req: NextRequest): string | null {
  // Cookie-based auth (preferred when same-site)
  const ndtToken = req.cookies.get("ndt-token")?.value;
  if (ndtToken) return ndtToken;

  const authToken = req.cookies.get("auth-token")?.value;
  if (authToken) return authToken;

  // Authorization: Bearer <token>
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (match) return match[1].trim();
    return authHeader.replace(/^Bearer\s+/i, "").trim() || null;
  }

  return null;
}

export async function requireAuth(req: NextRequest): Promise<AuthContext> {
  const secretEnv = process.env.JWT_SECRET;
  if (!secretEnv) {
    throw new ApiAuthError("Server misconfigured: JWT_SECRET missing", 500);
  }

  const token = getToken(req);
  if (!token) {
    throw new ApiAuthError("Unauthorized: missing token", 401);
  }

  let payload: any;
  try {
    const secret = new TextEncoder().encode(secretEnv);
    const verified = await jwtVerify(token, secret);
    payload = verified.payload;
  } catch {
    throw new ApiAuthError("Unauthorized: invalid or expired token", 401);
  }

  const userId =
    (payload.sub as string | undefined) ||
    (payload.userId as string | undefined) ||
    (payload.id as string | undefined);

  const role = payload.role as AuthRole | undefined;

  if (!userId || !role) {
    throw new ApiAuthError("Unauthorized: token missing sub/role", 401);
  }

  return {
    userId,
    role,
    email: typeof payload.email === "string" ? payload.email : undefined,
  };
}

/**
 * Helper used by routes that allow admins to read any owner's data.
 * Returns true if the caller can act on a record owned by `ownerId`.
 */
export function canAccessOwner(auth: AuthContext, ownerId: string): boolean {
  if (auth.role === "admin") return true;
  return auth.userId === ownerId;
}

/**
 * Stricter variant: only the owner (no admin override) — used for writes.
 */
export function isOwner(auth: AuthContext, ownerId: string): boolean {
  return auth.userId === ownerId;
}
