import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find({
      role: { $in: ["provider", "inspector"] },
      isActive: true,
    }).select("-password");

    const providers = users.map((user) => ({
      id: user._id.toString(),
      name: user.profileData?.companyName || user.name || "Unnamed Provider",
      location: user.profileData?.location || "Location not set",
      services: user.profileData?.servicesOffered || [],
      specialization:
        user.profileData?.specialization || "General NDT Services",
      rating: user.profileData?.rating || 4.0,
      description:
        user.profileData?.description || "No description available.",
      imageUrl: user.profileData?.companyLogoUrl,
      isVerified: user.profileData?.isVerified || false,
      contactNumber: user.profileData?.contactNumber,
      email: user.email,
      availableDocuments: user.profileData?.availableDocuments || [],
    }));

    return NextResponse.json({ success: true, data: providers });
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch providers" },
      { status: 500 }
    );
  }
}
