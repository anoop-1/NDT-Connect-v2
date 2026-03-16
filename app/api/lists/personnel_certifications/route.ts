import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ndtconnect';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const certs = await db.collection('personnel_certifications').find({}).toArray();
    return NextResponse.json(certs);
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch personnel certifications' }, { status: 500 });
  } finally {
    await client.close();
  }
}
