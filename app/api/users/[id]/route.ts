import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/lib/models/User";

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
