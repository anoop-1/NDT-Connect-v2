// One-shot: push the correct MONGODB_URI (read from local .env) to the Vercel
// production project and trigger a redeploy so the new value takes effect.
// Secrets are never passed on the command line — URI is read from .env, the
// Vercel token from the VERCEL_TOKEN environment variable.
import { readFileSync } from 'node:fs';

const TOKEN = process.env.VERCEL_TOKEN;
const TEAM = 'team_RvIKW6PFuuliC77dktstAJmQ';
const PROJECT = 'prj_GB8CvnLDNFOkLVXrnnRzyTtnKZHR'; // ndt-connect-v2-x8ra -> ndt-connect.com
const ENV_ID = 'chghDW0qndinKLsz'; // existing MONGODB_URI var

if (!TOKEN) throw new Error('Set VERCEL_TOKEN in the environment first.');

// Read MONGODB_URI from .env (authoritative correct value).
const env = readFileSync(new URL('../.env', import.meta.url), 'utf8');
const m = env.match(/^MONGODB_URI=(.+)$/m);
if (!m) throw new Error('MONGODB_URI not found in .env');
const URI = m[1].trim().replace(/^["']|["']$/g, '');
if (!URI.startsWith('mongodb')) throw new Error('MONGODB_URI in .env looks invalid');

const h = { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };
const api = (p) => `https://api.vercel.com${p}${p.includes('?') ? '&' : '?'}teamId=${TEAM}`;

// 1) Update the env var (all targets).
const patch = await fetch(api(`/v9/projects/${PROJECT}/env/${ENV_ID}`), {
  method: 'PATCH',
  headers: h,
  body: JSON.stringify({ value: URI, target: ['production', 'preview', 'development'] }),
});
const pj = await patch.json();
if (!patch.ok) throw new Error('env PATCH failed: ' + JSON.stringify(pj));
console.log('env updated OK; host:', URI.replace(/:\/\/[^@]*@/, '://***@').slice(0, 60) + '...');

// 2) Find the latest production deployment and redeploy it (picks up new env).
const list = await fetch(api(`/v6/deployments?projectId=${PROJECT}&target=production&limit=1`), { headers: h });
const lj = await list.json();
const latest = lj.deployments?.[0];
if (!latest) throw new Error('no production deployment found to redeploy');
console.log('redeploying from:', latest.uid, latest.url);

const redeploy = await fetch(api('/v13/deployments'), {
  method: 'POST',
  headers: h,
  body: JSON.stringify({
    name: latest.name || 'ndt-connect-v2-x8ra',
    deploymentId: latest.uid,
    target: 'production',
  }),
});
const rj = await redeploy.json();
if (!redeploy.ok) throw new Error('redeploy failed: ' + JSON.stringify(rj));
console.log('redeploy started:', rj.url || rj.id);
