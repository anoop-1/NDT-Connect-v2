// Verify GSC Indexing API auth + ownership for ndt-connect.com.
// Submits ONE test URL per SA. Reports HTTP status + body.
// Run from NDTConnect/: node scripts/test-indexing-auth.mjs
import fs from 'node:fs';
import path from 'node:path';
import { JWT } from 'google-auth-library';

const SECRETS = path.join(process.cwd(), 'scripts', 'secrets');
const TEST_URL = 'https://ndt-connect.com/blog';

const sas = fs.readdirSync(SECRETS).filter(f => f.startsWith('sa-') && f.endsWith('.json'));
console.log(`Testing ${sas.length} service accounts against ${TEST_URL}\n`);

for (const f of sas) {
  const sa = JSON.parse(fs.readFileSync(path.join(SECRETS, f), 'utf-8'));
  try {
    const client = new JWT({
      email: sa.client_email,
      key: sa.private_key,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });
    const tok = await client.authorize();
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${tok.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: TEST_URL, type: 'URL_UPDATED' }),
    });
    const body = await res.text();
    console.log(`[${f}] ${sa.client_email} -> HTTP ${res.status}`);
    console.log(`  ${body.slice(0, 200).replace(/\n/g, ' ')}`);
  } catch (e) {
    console.log(`[${f}] ERROR: ${e.message}`);
  }
}
