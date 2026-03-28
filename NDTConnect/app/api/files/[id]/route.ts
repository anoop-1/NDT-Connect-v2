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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const file = await FileModel.findById(params.id);

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return new NextResponse(file.data, {
      headers: {
        'Content-Type': file.contentType,
        'Content-Disposition': `inline; filename="${file.filename}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to retrieve file" }, { status: 500 });
  }
}
