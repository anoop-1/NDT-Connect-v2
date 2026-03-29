export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { ServiceRequest } from '@/lib/models/ServiceRequest';
import { Equipment } from '@/lib/models/Equipment';

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Get all users data
    const totalUsers = await User.countDocuments({ verified: true });
    const totalClients = await User.countDocuments({ verified: true, role: 'client' });
    const totalProviders = await User.countDocuments({ verified: true, role: 'provider' });
    const totalInspectors = await User.countDocuments({ verified: true, role: 'inspector' });
    const totalAdmins = await User.countDocuments({ verified: true, role: 'admin' });

    // Active vs inactive users
    const activeUsers = await User.countDocuments({ verified: true, isActive: true });
    const inactiveUsers = await User.countDocuments({ verified: true, isActive: false });

    // Equipment stats
    const totalEquipment = await Equipment.countDocuments();
    const activeEquipment = await Equipment.countDocuments({ status: 'Active' });
    const equipmentInCalibration = await Equipment.countDocuments({ status: 'In Calibration' });

    // Expiring certifications - equipment with calibration due within 30 days
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const expiringCertifications = await Equipment.countDocuments({
      calibrationDueDate: {
        $lt: thirtyDaysFromNow,
        $gt: new Date()
      }
    });

    // Recent registrations (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentRegistrations = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
      verified: true
    });

    // Get recent signups (last 10) with details
    const recentSignups = await User.find(
      { createdAt: { $gte: sevenDaysAgo }, verified: true },
      { email: 1, name: 1, role: 1, createdAt: 1 }
    )
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Service requests by status
    const serviceRequestStats = await ServiceRequest.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const requestStatsByStatus = {
      pending: 0,
      confirmed: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0
    };

    serviceRequestStats.forEach((stat: any) => {
      const statusKey = stat._id.toLowerCase().replace(/\s+/g, '');
      if (statusKey === 'pending') requestStatsByStatus.pending = stat.count;
      else if (statusKey === 'confirmed') requestStatsByStatus.confirmed = stat.count;
      else if (statusKey === 'inprogress') requestStatsByStatus.inProgress = stat.count;
      else if (statusKey === 'completed') requestStatsByStatus.completed = stat.count;
      else if (statusKey === 'cancelled') requestStatsByStatus.cancelled = stat.count;
    });

    const totalServiceRequests = Object.values(requestStatsByStatus).reduce((a: number, b: number) => a + b, 0);

    const responseData = {
      totalUsers,
      usersByRole: {
        clients: totalClients,
        providers: totalProviders,
        inspectors: totalInspectors,
        admins: totalAdmins
      },
      userStatus: {
        active: activeUsers,
        inactive: inactiveUsers
      },
      equipment: {
        total: totalEquipment,
        active: activeEquipment,
        inCalibration: equipmentInCalibration,
        expiringCertifications
      },
      serviceRequests: {
        total: totalServiceRequests,
        byStatus: requestStatsByStatus
      },
      recentRegistrations: {
        lastSevenDays: recentRegistrations,
        recentSignups: recentSignups
      },
      systemStatus: 'Operational'
    };

    return NextResponse.json({ success: true, data: responseData });
  } catch (error: any) {
    console.error('Error getting admin info:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get admin info', message: error.message },
      { status: 500 }
    );
  }
}
