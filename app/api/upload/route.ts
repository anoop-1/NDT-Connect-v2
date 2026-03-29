import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  size: Number,
  data: Buffer,
  folder: String,
  createdAt: { type: Date, default: Date.now },
});

const FileModel = mongoose.models?.File || mongoose.model('File', FileSchema);

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File too large. Max 10MB." }, { status: 400 });
    }

    const allowedTypes = [
      'application/pdf', 'image/jpeg', 'image/png', 'image/webp',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: "File type not allowed" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const savedFile = await FileModel.create({
      filename: file.name,
      contentType: file.type,
      size: file.size,
      data: buffer,
      folder,
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ndt-connect.com';
    const url = `${baseUrl}/api/files/${savedFile._id}`;

    return NextResponse.json({ success: true, url, fileId: savedFile._id.toString() });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}
