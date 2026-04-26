// src/lib/cors.ts
//
// Shared CORS helpers for App Router /api/* route handlers.
// Allows the production app domain and the marketing domain.

import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = new Set<string>([
  "https://app.ndt-connect.com",
  "https://ndt-connect.com",
]);

const DEFAULT_ALLOW_ORIGIN = "https://app.ndt-connect.com";

/**
 * Build the CORS header bag for a given origin and the methods this route serves.
 */
export function corsHeaders(
  origin: string | null,
  methods: string[] = ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
): Record<string, string> {
  const allowOrigin =
    origin && ALLOWED_ORIGINS.has(origin) ? origin : DEFAULT_ALLOW_ORIGIN;

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": methods.join(", "),
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  };
}

/**
 * Mutates a NextResponse to attach CORS headers, then returns it.
 * Use this to wrap every JSON response so cross-origin browser fetches work.
 */
export function withCors(
  res: NextResponse,
  req: NextRequest,
  methods: string[] = ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
): NextResponse {
  const headers = corsHeaders(req.headers.get("origin"), methods);
  for (const [k, v] of Object.entries(headers)) {
    res.headers.set(k, v);
  }
  return res;
}

/**
 * Standard OPTIONS preflight handler. Routes can re-export this directly:
 *
 *     export const OPTIONS = (req: NextRequest) =>
 *       handlePreflight(req, ["GET", "POST", "OPTIONS"]);
 */
export function handlePreflight(
  req: NextRequest,
  methods: string[] = ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(req.headers.get("origin"), methods),
  });
}
