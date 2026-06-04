// Single source of truth for the JWT signing secret.
// Fail closed: never fall back to a hardcoded secret. A missing JWT_SECRET in
// production would otherwise let anyone forge tokens signed with the public
// default ('fallback-secret-change-me') -> full auth bypass.
const secret = process.env.JWT_SECRET;

if (!secret || secret.length < 32) {
  throw new Error(
    'JWT_SECRET is missing or too short (need >=32 chars). Set a strong random secret in the environment.'
  );
}

export const JWT_SECRET = new TextEncoder().encode(secret);
