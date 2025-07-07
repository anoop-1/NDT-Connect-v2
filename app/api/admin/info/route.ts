export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '../../../..//lib/mongo';
import PredefinedList from '../../../../lib/models/PredefinedList';

export async function GET(request: Request) {
  try {
    const { db } = await dbConnect();

    const totalUsers = await db.collection("users").countDocuments({ verified: true });
    const activeProviders = await db.collection("users").countDocuments({ verified: true, role: "provider" });
    
    const responseData = {
      total_users: totalUsers,
      active_providers: activeProviders,
      open_requests: 0, 
      system_status: "Operational"
    };
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error getting system settings:', error);
    return NextResponse.json(
      { error: 'Failed to get system settings' },
      { status: 500 }
    );
  }
}
