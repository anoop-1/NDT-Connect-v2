
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongo';
import PredefinedList from '../../../lib/models/PredefinedList';

export async function GET(request: Request) {
  try {
    const { db } = await dbConnect();
    return NextResponse.json({
      data: await db.collection("sys").find({}).toArray()
    });
  } catch (error: any) {
    console.error('Error getting systemsettings:', error);
    return NextResponse.json(
      { error: 'Failed to get systemsettings' },
      { status: 500 }
    );
  }
}
