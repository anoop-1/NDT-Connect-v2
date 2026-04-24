export const dynamic = 'force-dynamic';
export const maxDuration = 300;

import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const ALLOWED_COLLECTIONS = [
  'users',
  'servicerequests',
  'equipment',
  'notifications',
  'calibrationalerts',
  'skillmatrices',
  'predefinedlists',
  'files',
];

type CopyResult = {
  collection: string;
  sourceCount: number;
  copied: number;
  skipped: number;
  errors: string[];
};

export async function POST(request: NextRequest) {
  const token = request.headers.get('x-migration-token');
  if (!token || token !== process.env.MIGRATION_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const sourceUri = body.sourceUri as string | undefined;
  const sourceDbName = (body.sourceDbName as string | undefined) || 'NDTConnect2';
  const destDbName = (body.destDbName as string | undefined) || 'NDTConnect2';
  const collections: string[] = Array.isArray(body.collections) && body.collections.length
    ? body.collections.filter((c: string) => ALLOWED_COLLECTIONS.includes(c))
    : ALLOWED_COLLECTIONS;
  const dryRun = body.dryRun !== false;

  if (!sourceUri || !sourceUri.startsWith('mongodb')) {
    return NextResponse.json({ error: 'Missing or invalid sourceUri' }, { status: 400 });
  }
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'Destination MONGODB_URI not configured' }, { status: 500 });
  }

  const srcClient = new MongoClient(sourceUri);
  const dstClient = new MongoClient(process.env.MONGODB_URI);
  const results: CopyResult[] = [];

  try {
    await Promise.all([srcClient.connect(), dstClient.connect()]);

    for (const coll of collections) {
      const result: CopyResult = { collection: coll, sourceCount: 0, copied: 0, skipped: 0, errors: [] };
      try {
        const srcCol = srcClient.db(sourceDbName).collection(coll);
        const dstCol = dstClient.db(destDbName).collection(coll);
        result.sourceCount = await srcCol.countDocuments();

        if (result.sourceCount === 0) {
          results.push(result);
          continue;
        }
        if (dryRun) {
          results.push(result);
          continue;
        }

        const cursor = srcCol.find({});
        const batch: any[] = [];
        const BATCH = 500;

        for await (const doc of cursor) {
          const existing = await dstCol.findOne({ _id: doc._id }, { projection: { _id: 1 } });
          if (existing) {
            result.skipped++;
            continue;
          }
          batch.push(doc);
          if (batch.length >= BATCH) {
            await dstCol.insertMany(batch, { ordered: false }).catch((e: any) => {
              if (e?.writeErrors) result.errors.push(`batch-write: ${e.writeErrors.length} errors`);
              else result.errors.push(String(e?.message || e));
            });
            result.copied += batch.length;
            batch.length = 0;
          }
        }
        if (batch.length) {
          await dstCol.insertMany(batch, { ordered: false }).catch((e: any) => {
            if (e?.writeErrors) result.errors.push(`batch-write: ${e.writeErrors.length} errors`);
            else result.errors.push(String(e?.message || e));
          });
          result.copied += batch.length;
        }
      } catch (e: any) {
        result.errors.push(String(e?.message || e));
      }
      results.push(result);
    }

    return NextResponse.json({ success: true, dryRun, results });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: String(e?.message || e), results }, { status: 500 });
  } finally {
    await Promise.allSettled([srcClient.close(), dstClient.close()]);
  }
}
