
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import PredefinedList from '../../../../lib/models/PredefinedList';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const lists = await PredefinedList.find({});
    return NextResponse.json(lists.map(list => ({
      id: list._id,
      name: list.name,
      items: list.items,
      lastUpdated: list.lastUpdated
    })));
  } catch (error) {
    console.error('Error fetching lists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lists' },
      { status: 500 }
    );
  }
}
