#!/usr/bin/env bash
# Build + deploy the NDT ERP side-car to the VPS WITHOUT touching the main ndt-connect release.
# The side-car is a trimmed Next.js build containing only /erp, /api/erp and /free-erp,
# served on :3002 (ndt-erp.service). nginx routes ONLY those paths (+ /buyers-guide, /erp-assets) to it;
# every other URL stays on the main app (:3001). Same domain => same login cookie.
#
# Usage:  VPS_KEY=~/path/to/key ./scripts/deploy-erp-sidecar.sh          (run from repo root)
# Rollback: ssh root@VPS 'ln -sfn /var/www/ndt-erp-releases/<previous> /var/www/ndt-erp && systemctl restart ndt-erp'
set -euo pipefail
VPS=root@148.230.122.172
KEY=${VPS_KEY:?set VPS_KEY to the VPS ssh private key path}
B=$(mktemp -d)
git archive HEAD | tar -x -C "$B"
cp package-lock.json "$B/" 2>/dev/null || true
cd "$B"
rm -rf mobile satellites NDTConnect seo-analysis GROWTH-PLAN-* store-listing __tests__ docs scripts src/app src/pages src/middleware.ts middleware.ts
( cd app && for x in *; do case "$x" in layout.tsx|globals.css|favicon.ico|not-found.tsx|erp|free-erp|buyers-guide|ndt-leaders|api) ;; *) rm -rf "$x";; esac; done
  cd api && for x in *; do [ "$x" = erp ] || rm -rf "$x"; done )
# assets under /erp-assets so they never collide with the main app's /_next
sed -i.bak "s#  output: 'standalone',#  output: 'standalone',\n  assetPrefix: '/erp-assets',#" next.config.js
scp -i "$KEY" -q "$VPS:/var/www/ndt-connect/.env.production.local" .env.production.local   # build-time env (JWT_SECRET etc.)
npm install --no-audit --no-fund --ignore-scripts --loglevel=error
NEXT_TELEMETRY_DISABLED=1 npx next build
S=.next/standalone; cp -r .next/static "$S/.next/static"; cp -r public "$S/public"; rm -f "$S"/.env*
( cd "$S" && tar czf /tmp/erp-release.tgz . )
scp -i "$KEY" -q /tmp/erp-release.tgz "$VPS:/root/erp-release.tgz"
ssh -i "$KEY" "$VPS" 'set -e; PREV=$(readlink -f /var/www/ndt-erp); R=/var/www/ndt-erp-releases/$(date +%Y%m%d%H%M)-erp
  mkdir -p $R && tar xzf /root/erp-release.tgz -C $R && cp -p $PREV/.env $PREV/.env.production.local $PREV/start.js $R/
  ln -sfn $R /var/www/ndt-erp && systemctl restart ndt-erp && sleep 5 && systemctl is-active ndt-erp && echo "live: $R (previous: $PREV)"'
for u in /free-erp /erp /api/erp/summary /; do printf "%-18s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' https://ndt-connect.com$u)"; done
rm -rf "$B"
