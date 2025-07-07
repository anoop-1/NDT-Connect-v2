
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '../../../..//lib/mongo';
import PredefinedList from '../../../../lib/models/PredefinedList';

export async function GET(request: Request) {
  try {
    const { db } = await dbConnect();
    return NextResponse.json({
      data: await db.collection("sys").find({}).toArray()
    });
  } catch (error) {
    console.error('Error getting systemsettings:', error);
    return NextResponse.json(
      { error: 'Failed to get systemsettings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await dbConnect();
    const { id, data } = await request.json();

    if (!id || !data) {
      return NextResponse.json(
        { error: 'Setting ID and DATA are required' },
        { status: 400 }
      );
    }

    console.log(await db.collection("sys").updateOne(
      { id: id },
      { $set: { data : data } },
      { upsert: true } 
    ));
    
    return NextResponse.json({ 'true' : true });
    
  } catch (error) {
    console.error('Error updating systemsettings:', error);
    return NextResponse.json(
      { error: 'Failed to update systemsettings' },
      { status: 500 }
    );
  }
}
