#!/usr/bin/env bash
# One-command city hub deploy (run on the build VM from anywhere):
#   1) regenerate index + validate  2) sync into ~/erpbuild + build  3) ship release to VPS (:3002)
#   4) regenerate nginx slug snippet from data/*.json  5) smoke test  6) submit new URLs (Indexing API + IndexNow)
# Usage: VPS_KEY=~/work/vpskey scripts/city-hubs/deploy.sh <release-label> [slug ...to submit]
set -euo pipefail
R="$(cd "$(dirname "$0")/../.." && pwd)"; B=~/erpbuild; KEY=${VPS_KEY:-~/work/vpskey}; VPS=root@148.230.122.172
PHASE=${PHASE:-all}   # build | ship | all
LABEL=${1:?release label}; shift || true
if [ "$PHASE" != ship ]; then
cd "$R"; python3 scripts/city-hubs/gen-index.py; python3 scripts/city-hubs/validate.py
if ls lib/content/training-hubs/data/*.json >/dev/null 2>&1; then CITY_DIR=lib/content/training-hubs/data python3 scripts/city-hubs/validate.py; fi
rsync -a --delete "$R/lib/" $B/lib/; rsync -a --delete "$R/components/" $B/components/
for d in erp free-erp buyers-guide ndt-leaders ndt-locations; do rsync -a --delete "$R/app/$d/" $B/app/$d/; done
rsync -a --delete "$R/app/api/erp/" $B/app/api/erp/
rm -rf $B/app/ndt-services && cp -r "$R/sidecar-routes/ndt-services" $B/app/ndt-services
rm -rf $B/app/training && cp -r "$R/sidecar-routes/training" $B/app/training
find $B/lib -name '*.unused' -delete
cd $B && node node_modules/next/dist/bin/next build > /tmp/build.log 2>&1 || { tail -30 /tmp/build.log; exit 1; }
S=.next/standalone; rm -rf $S/.next/static $S/public; cp -r .next/static $S/.next/static; cp -r public $S/public; rm -f $S/.env*
(cd $S && tar czf /tmp/erp-release.tgz .)
fi
[ "$PHASE" = build ] && { echo built; exit 0; }
cd "$R"
SLUGS=$(python3 -c "import glob,json,os;print('|'.join(sorted(json.load(open(f))['slug'] for f in glob.glob('$R/lib/content/city-hubs/data/*.json'))))")
TSLUGS=$(python3 -c "import glob,json,os;print('|'.join(sorted(json.load(open(f))['slug'] for f in glob.glob('$R/lib/content/training-hubs/data/*.json'))) or 'none-yet')")
scp -i $KEY -q /tmp/erp-release.tgz $VPS:/root/erp-release.tgz
ssh -i $KEY $VPS "set -e; PREV=\$(readlink -f /var/www/ndt-erp); R=/var/www/ndt-erp-releases/$LABEL; rm -rf \$R; mkdir -p \$R && tar xzf /root/erp-release.tgz -C \$R && cp -p \$PREV/.env \$PREV/.env.production.local \$PREV/start.js \$R/
  sed -i -E 's#\^/ndt-services/\([^)]*\)#^/ndt-services/($SLUGS)#' /etc/nginx/snippets/ndt-sidecar-cities.conf
  sed -i -E 's#\^/training/\([^)]*\)#^/training/($TSLUGS)#' /etc/nginx/snippets/ndt-sidecar-training.conf
  nginx -t -q && ln -sfn \$R /var/www/ndt-erp && systemctl restart ndt-erp && sleep 6 && systemctl is-active ndt-erp && systemctl reload nginx && echo live: \$R prev: \$PREV"
fail=0; for s in $(echo $SLUGS | tr '|' ' '); do c=$(curl -s -o /dev/null -w '%{http_code}' https://ndt-connect.com/ndt-services/$s); [ "$c" = 200 ] || { echo "FAIL $s $c"; fail=1; }; done
for u in /ndt-locations /ndt-services/houston-tx /free-erp /erp; do printf "%-28s %s\n" $u $(curl -s -o /dev/null -w '%{http_code}' https://ndt-connect.com$u); done
for s in $(echo $TSLUGS | tr '|' ' '); do [ "$s" = none-yet ] && continue; c=$(curl -s -o /dev/null -w '%{http_code}' https://ndt-connect.com/training/$s); [ "$c" = 200 ] || { echo "FAIL training/$s $c"; fail=1; }; done
[ $fail = 0 ] && echo "all city + training hubs 200"
if [ $# -gt 0 ]; then
  URLS=(https://ndt-connect.com/ndt-locations); for s in "$@"; do case $s in t:*) URLS+=(https://ndt-connect.com/training/${s#t:});; /*) URLS+=(https://ndt-connect.com$s);; *) URLS+=(https://ndt-connect.com/ndt-services/$s);; esac; done
  cd "$R" && python3 seo-analysis/submit-urls.py --force "${URLS[@]}" 2>&1 | grep -v -i warn | tail -4 || true
  python3 - "${URLS[@]}" <<'PY'
import sys, json, urllib.request
body = json.dumps({"host": "ndt-connect.com", "key": "32f800ab00dfbec6d6a6904557be4e81", "keyLocation": "https://ndt-connect.com/32f800ab00dfbec6d6a6904557be4e81.txt", "urlList": sys.argv[1:]}).encode()
for ep in ["https://api.indexnow.org/indexnow", "https://www.bing.com/indexnow"]:
    try:
        r = urllib.request.urlopen(urllib.request.Request(ep, body, {"Content-Type": "application/json; charset=utf-8"}), timeout=30); print("IndexNow", ep, r.status)
    except Exception as e: print("IndexNow", ep, e)
PY
fi
