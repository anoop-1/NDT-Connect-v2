// src/lib/api-client.ts
//
// Thin fetch wrapper for the NDT Connect REST API. Auth is delivered via the
// `ndt-token` httpOnly cookie set at login (see app/api/auth/login/route.ts),
// so we always send `credentials: 'include'`. As a defensive fallback we also
// attach an `Authorization: Bearer` header if a readable token is available
// (e.g. someone stored one in localStorage under `ndt-token`). On 401 we
// hard-redirect to /login so the user can re-authenticate.

"use client";

const BASE_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) ||
  (typeof window !== "undefined" ? window.location.origin : "");

export class ApiError extends Error {
  status: number;
  body?: unknown;
  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

/** Best-effort token fetch. The real session is in an httpOnly cookie, but if
 *  someone (test harness, mobile shell) writes a copy to localStorage we will
 *  still send it as a Bearer header. Returns null when nothing is available. */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const ls = window.localStorage.getItem("ndt-token");
    if (ls) return ls;
  } catch {
    /* localStorage may be disabled — fine */
  }
  // Look for a non-httpOnly cookie copy as a last resort.
  if (typeof document !== "undefined" && document.cookie) {
    const match = document.cookie.match(/(?:^|;\s*)ndt-token=([^;]+)/);
    if (match) return decodeURIComponent(match[1]);
  }
  return null;
}

function buildUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  if (!BASE_URL) return path;
  return path.startsWith("/") ? `${BASE_URL}${path}` : `${BASE_URL}/${path}`;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  signal?: AbortSignal,
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const token = getAuthToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(buildUrl(path), {
      method,
      headers,
      credentials: "include",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err: any) {
    if (err?.name === "AbortError") throw err;
    throw new ApiError(0, err?.message || "Network error");
  }

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new ApiError(401, "Unauthorized");
  }

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  let payload: any = null;
  const text = await res.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!res.ok) {
    const message =
      (payload && (payload.message || payload.error)) ||
      `Request failed with status ${res.status}`;
    throw new ApiError(res.status, message, payload);
  }

  return payload as T;
}

export function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  return request<T>("GET", path, undefined, signal);
}

export function apiPost<T>(path: string, body?: unknown): Promise<T> {
  return request<T>("POST", path, body ?? {});
}

export function apiPatch<T>(path: string, body?: unknown): Promise<T> {
  return request<T>("PATCH", path, body ?? {});
}

export function apiPut<T>(path: string, body?: unknown): Promise<T> {
  return request<T>("PUT", path, body ?? {});
}

export function apiDelete(path: string): Promise<void> {
  return request<void>("DELETE", path);
}
