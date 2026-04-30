import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-change-me');

async function authedUserId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('authorization');
  const cookieToken = req.cookies.get('ndt-token')?.value;
  const token = authHeader?.replace('Bearer ', '') ?? cookieToken;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return (payload.userId as string) || null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const user = await User.findById(params.id).select('-password');

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const obj = user.toObject();
    obj.id = obj._id.toString();

    // Map profileData to the expected nested structure for frontend compatibility
    const result: any = {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      role: obj.role,
      providerProfile: obj.profileData || {},
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const callerId = await authedUserId(req);
    if (!callerId || callerId !== params.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { name, profileData } = body;
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    if (typeof name === 'string' && name.trim()) user.name = name.trim();
    if (profileData && typeof profileData === 'object') {
      user.profileData = { ...(user.profileData || {}), ...profileData };
      user.markModified('profileData');
    }
    user.updatedAt = new Date();
    await user.save();
    const obj = user.toObject() as any;
    delete obj.password;
    delete obj.verificationToken;
    delete obj.resetPasswordToken;
    obj.id = obj._id.toString();
    return NextResponse.json({
      success: true,
      data: {
        id: obj.id,
        name: obj.name,
        email: obj.email,
        role: obj.role,
        providerProfile: obj.profileData || {},
      },
    });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
  }
}
