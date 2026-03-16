import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ndtconnect';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const services = await db.collection('ndt_services').find({}).toArray();
    return NextResponse.json(services);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch NDT services' }, { status: 500 });
  } finally {
    await client.close();
  }
}
