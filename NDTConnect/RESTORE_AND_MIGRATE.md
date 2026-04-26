# NDT Connect — Restore & Migrate Runbook

Root cause of missing admin-dashboard users: commit `11e3387` (2026-03-29) switched `MONGODB_URI` from the OLD Atlas cluster to a NEW one, and the admin info route filtered counts with `verified:true`, which hid every unverified user.

Additionally: the OLD cluster DNS (`cluster0.dtd6ixg.mongodb.net`) no longer resolves as of this investigation (2026-04-24) — cluster appears deleted. Option A rollback is therefore off the table; the restore path must work off the current NEW cluster only.

> Credentials are intentionally omitted from this file. Pull them from:
> - Vercel env vars (`vercel env pull .env.local` or Vercel dashboard)
> - Atlas console for the NEW cluster
> - VPS `.env` (if copied there for migration runs)

## Current clusters

| Cluster | Host | Status |
|---|---|---|
| OLD | `cluster0.dtd6ixg.mongodb.net` | SRV lookup fails — cluster deleted. |
| NEW (Atlas) | `ndtconnect.qpbvncb.mongodb.net` | **Stuck in "configuring MongoDB" state** since ≥2026-04-24 — all 3 replica IPs (159.41.79.69/96/112) unreachable on 27017. Atlas Data Explorer reports "Connection failure" on its own UI. No Resume/Restart option exposed; cluster actions locked during deploy. Likely cause: M0 auto-upgrade 7→8 stuck. |
| **VPS (new primary)** | `mail.atlantisndt.com:27017` (148.230.122.172) | Up 2026-04-24. MongoDB 7.0.25, auth + TLS (LE cert for mail.atlantisndt.com), bound 0.0.0.0. Users: `appAdmin` (root), `ndtApp` (rw NDTConnect/NDTConnect2). Local connection verified working. **Pending: port 27017 in Hostinger cloud firewall** to let Vercel reach it. |

## Current live state (2026-04-24)

- Vercel deployment `4ETVkXCig` (commit ba33a38) is Production Current and points at the stuck Atlas cluster.
- Homepage / static pages load fine. Any endpoint that touches the DB (e.g. `/api/lists/units`, admin dashboard, login) hangs until 504 because the Atlas nodes aren't answering.
- `NDTConnect FW` firewall config created in Hostinger hPanel with the name set but rules still pending — need to add Accept rules for 22, 80, 443, 465, 587, 993, 995, 27017 then enable.
- VPS now has nightly backups: `/opt/ndt-ops/mongo-backup.sh` runs at `0 0 * * *` (00:00 UTC), writes `/var/backups/mongodb/ndt-*.gz`, keeps last 14, logs to `/var/log/mongo-backup.log`. Restore via `/opt/ndt-ops/mongo-restore.sh`.

## Immediate next step

1. Deploy this branch to Vercel (auto on push to `main`).
2. Log into `/admin/dashboard`. With the `verified:true` filter removed, the real user count will now render. Most "missing" users were likely unverified signups.
3. If counts are still 0, the data never made it to NEW cluster — see Migration below.

## Migration (only if NEW cluster is truly empty)

Run from the VPS (`148.230.122.172`) which can already reach both Atlas clusters once its IP is whitelisted.

```bash
ssh -i ~/.ssh/atlantis_vps root@148.230.122.172

# one-time
cd /root && npm init -y && npm install mongodb

# copy script up
scp -i ~/.ssh/atlantis_vps NDTConnect/scripts/migrate-cluster.js root@148.230.122.172:/root/

# dry-run (prints counts, writes nothing)
SOURCE_URI='<OLD_URI>' \
DEST_URI='<NEW_URI>' \
SOURCE_DB=NDTConnect2 DEST_DB=NDTConnect2 \
DRY_RUN=true node /root/migrate-cluster.js

# real run
DRY_RUN=false node /root/migrate-cluster.js
```

Whitelist the VPS public IP in Atlas → Network Access for both clusters before running.

## Alternative — via `/api/admin/migrate`

Token-gated endpoint added. Set `MIGRATION_TOKEN` in Vercel env to a strong random string, redeploy, then:

```bash
curl -X POST https://ndt-connect.com/api/admin/migrate \
  -H "x-migration-token: $MIGRATION_TOKEN" \
  -H "content-type: application/json" \
  -d '{"sourceUri":"<SOURCE_URI>","sourceDbName":"NDTConnect2","destDbName":"NDTConnect2","dryRun":true}'

# real run: set dryRun:false
```

Remove the env var after migration.

## Fixes applied in this commit

- Resolved 5 bogus stash-pop merge conflicts in API routes (both sides were identical).
- `/api/admin/info` now counts ALL users with a verified/unverified breakdown instead of hiding unverified accounts.
- Untracked root `.env` — stops further leaks to the public GitHub repo on push.
- New `/api/admin/migrate` route (token-gated, middleware-bypassed) + `scripts/migrate-cluster.js` for VPS-run migration.

## Security items (flagged, not auto-fixed)

- Historical commits still expose old secrets on the public repo. Rotation recommended but deferred per instruction.
- `/api/admin/seed` hardcodes an admin password and bypasses middleware — plausible vector for an outside account takeover. Swap to a strong env-var token or remove the route.
- `app/api/auth/login/route.ts` uses a dev fallback JWT secret if env missing — will sign forgeable tokens. Make `JWT_SECRET` a required boot-time check.
- No rate limiting on `/api/auth/login` or `/api/auth/register`.
