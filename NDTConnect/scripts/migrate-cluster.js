#!/usr/bin/env node
/**
 * One-shot migration script: copies collections from SOURCE Mongo cluster
 * to DESTINATION Mongo cluster. Skips docs that already exist by _id.
 *
 * Usage:
 *   SOURCE_URI="mongodb+srv://..." \
 *   DEST_URI="mongodb+srv://..." \
 *   SOURCE_DB=NDTConnect2 DEST_DB=NDTConnect2 \
 *   DRY_RUN=true node scripts/migrate-cluster.js
 *
 * Set DRY_RUN=false to actually write.
 * Run from VPS (whitelisted IPs) if local can't reach Atlas.
 */
const { MongoClient } = require('mongodb');

const COLLECTIONS = [
  'users',
  'servicerequests',
  'equipment',
  'notifications',
  'calibrationalerts',
  'skillmatrices',
  'predefinedlists',
  'files',
];

async function main() {
  const srcUri = process.env.SOURCE_URI;
  const dstUri = process.env.DEST_URI;
  const srcDb = process.env.SOURCE_DB || 'NDTConnect2';
  const dstDb = process.env.DEST_DB || 'NDTConnect2';
  const dry = process.env.DRY_RUN !== 'false';

  if (!srcUri || !dstUri) {
    console.error('Set SOURCE_URI and DEST_URI env vars');
    process.exit(1);
  }

  const src = new MongoClient(srcUri);
  const dst = new MongoClient(dstUri);

  try {
    await Promise.all([src.connect(), dst.connect()]);
    console.log(`Connected. DRY_RUN=${dry} SOURCE_DB=${srcDb} DEST_DB=${dstDb}`);

    const results = [];
    for (const coll of COLLECTIONS) {
      const srcCol = src.db(srcDb).collection(coll);
      const dstCol = dst.db(dstDb).collection(coll);
      const sourceCount = await srcCol.countDocuments();
      const destCountBefore = await dstCol.countDocuments();
      let copied = 0;
      let skipped = 0;

      if (sourceCount === 0) {
        results.push({ coll, sourceCount, destCountBefore, copied, skipped });
        continue;
      }
      if (!dry) {
        const cursor = srcCol.find({});
        let batch = [];
        for await (const doc of cursor) {
          const existing = await dstCol.findOne({ _id: doc._id }, { projection: { _id: 1 } });
          if (existing) { skipped++; continue; }
          batch.push(doc);
          if (batch.length >= 500) {
            const r = await dstCol.insertMany(batch, { ordered: false }).catch(e => ({ insertedCount: e?.result?.nInserted || 0 }));
            copied += r.insertedCount || batch.length;
            batch = [];
          }
        }
        if (batch.length) {
          const r = await dstCol.insertMany(batch, { ordered: false }).catch(e => ({ insertedCount: e?.result?.nInserted || 0 }));
          copied += r.insertedCount || batch.length;
        }
      }
      results.push({ coll, sourceCount, destCountBefore, copied, skipped });
      console.log(`${coll}: src=${sourceCount} dest(before)=${destCountBefore} copied=${copied} skipped=${skipped}`);
    }
    console.log('\nSummary:');
    console.table(results);
  } catch (e) {
    console.error('ERR:', e.message);
    process.exit(2);
  } finally {
    await Promise.allSettled([src.close(), dst.close()]);
  }
}

main();
