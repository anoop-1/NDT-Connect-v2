import crypto from 'crypto';
import dbConnect from './mongodb';
import { RateLimit } from './models/RateLimit';

/**
 * MongoDB-backed sliding-window rate limiting for the public AI Procedure
 * Writer endpoint. Three scopes:
 *   - anon   : 1 request / IP / 24h
 *   - user   : 5 / day, 30 / month
 *   - global : token bucket — 20 req / min and 5000 req / day across all callers
 *
 * Records are pruned in place: every call drops any timestamp older than the
 * widest window we care about before evaluating the window we're checking.
 */

const ANON_WINDOW_MS = 24 * 60 * 60 * 1000; // 24h
const ANON_LIMIT = 1;

const USER_DAY_MS = 24 * 60 * 60 * 1000;
const USER_MONTH_MS = 30 * 24 * 60 * 60 * 1000;
const USER_DAY_LIMIT = 5;
const USER_MONTH_LIMIT = 30;

const GLOBAL_MIN_MS = 60 * 1000;
const GLOBAL_DAY_MS = 24 * 60 * 60 * 1000;
const GLOBAL_MIN_LIMIT = 20;
const GLOBAL_DAY_LIMIT = 5000;

const GLOBAL_KEY = 'global';

/**
 * Hash an IP address with an optional user-agent suffix using SHA-256.
 * We keep IPs out of the database in raw form — only the digest is stored.
 */
export function hashIp(ip: string, userAgent?: string | null): string {
  const ua = (userAgent ?? '').slice(0, 200);
  return crypto.createHash('sha256').update(`${ip}::${ua}`).digest('hex');
}

/** Drop timestamps older than `cutoff` and return the trimmed array. */
function trimOlderThan(requests: Date[], cutoff: Date): Date[] {
  const cutoffMs = cutoff.getTime();
  return requests.filter((d) => new Date(d).getTime() >= cutoffMs);
}

async function loadOrCreate(scope: 'anon' | 'user' | 'global', key: string) {
  await dbConnect();
  let doc = await RateLimit.findOne({ scope, key });
  if (!doc) {
    doc = await RateLimit.create({ scope, key, requests: [], updatedAt: new Date() });
  }
  return doc;
}

export interface AnonRateResult {
  allowed: boolean;
  resetAt: Date;
}

export async function checkAnonRate(ipHash: string): Promise<AnonRateResult> {
  const doc = await loadOrCreate('anon', ipHash);
  const now = new Date();
  const windowStart = new Date(now.getTime() - ANON_WINDOW_MS);

  const recent = trimOlderThan(doc.requests as Date[], windowStart);
  const allowed = recent.length < ANON_LIMIT;
  const oldest = recent[0] ? new Date(recent[0]) : now;
  const resetAt = new Date(oldest.getTime() + ANON_WINDOW_MS);

  // Persist the trim so the array doesn't grow unbounded.
  if (recent.length !== doc.requests.length) {
    doc.requests = recent;
    doc.updatedAt = now;
    await doc.save();
  }

  return { allowed, resetAt };
}

export interface UserRateResult {
  allowed: boolean;
  dayRemaining: number;
  monthRemaining: number;
  resetAt: Date;
}

export async function checkUserRate(userId: string): Promise<UserRateResult> {
  const doc = await loadOrCreate('user', userId);
  const now = new Date();
  const dayStart = new Date(now.getTime() - USER_DAY_MS);
  const monthStart = new Date(now.getTime() - USER_MONTH_MS);

  // Keep only entries within the wider (monthly) window in storage.
  const withinMonth = trimOlderThan(doc.requests as Date[], monthStart);
  const withinDay = trimOlderThan(withinMonth, dayStart);

  const dayRemaining = Math.max(0, USER_DAY_LIMIT - withinDay.length);
  const monthRemaining = Math.max(0, USER_MONTH_LIMIT - withinMonth.length);
  const allowed = dayRemaining > 0 && monthRemaining > 0;

  // Reset = whichever exhausted window will free up first.
  const oldestDay = withinDay[0] ? new Date(withinDay[0]) : now;
  const oldestMonth = withinMonth[0] ? new Date(withinMonth[0]) : now;
  const dayReset = new Date(oldestDay.getTime() + USER_DAY_MS);
  const monthReset = new Date(oldestMonth.getTime() + USER_MONTH_MS);
  const resetAt =
    dayRemaining === 0
      ? monthRemaining === 0
        ? new Date(Math.min(dayReset.getTime(), monthReset.getTime()))
        : dayReset
      : monthRemaining === 0
        ? monthReset
        : dayReset;

  if (withinMonth.length !== doc.requests.length) {
    doc.requests = withinMonth;
    doc.updatedAt = now;
    await doc.save();
  }

  return { allowed, dayRemaining, monthRemaining, resetAt };
}

export interface GlobalRateResult {
  allowed: boolean;
  queueDepth: number;
}

export async function checkGlobalRate(): Promise<GlobalRateResult> {
  const doc = await loadOrCreate('global', GLOBAL_KEY);
  const now = new Date();
  const dayStart = new Date(now.getTime() - GLOBAL_DAY_MS);
  const minuteStart = new Date(now.getTime() - GLOBAL_MIN_MS);

  const withinDay = trimOlderThan(doc.requests as Date[], dayStart);
  const withinMinute = trimOlderThan(withinDay, minuteStart);

  const allowed =
    withinMinute.length < GLOBAL_MIN_LIMIT && withinDay.length < GLOBAL_DAY_LIMIT;
  const queueDepth = withinMinute.length;

  if (withinDay.length !== doc.requests.length) {
    doc.requests = withinDay;
    doc.updatedAt = now;
    await doc.save();
  }

  return { allowed, queueDepth };
}

/**
 * Record a single consumed request. Should be called only AFTER a successful
 * generation so a failure doesn't burn the user's quota.
 */
export async function recordUsage(
  scope: 'anon' | 'user' | 'global',
  key: string
): Promise<void> {
  await dbConnect();
  const now = new Date();
  await RateLimit.updateOne(
    { scope, key },
    {
      $push: { requests: now },
      $set: { updatedAt: now },
    },
    { upsert: true }
  );
}

/** Helper for the API route — record both the caller scope and the global bucket. */
export async function recordSuccessfulCall(
  callerScope: 'anon' | 'user',
  callerKey: string
): Promise<void> {
  await Promise.all([
    recordUsage(callerScope, callerKey),
    recordUsage('global', GLOBAL_KEY),
  ]);
}
