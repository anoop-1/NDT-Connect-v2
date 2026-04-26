// src/app/api/calibration-alerts/[id]/route.ts
//
// DELETE /api/calibration-alerts/:id  → remove an alert

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import dbConnect from "@/lib/mongodb";
import CalibrationAlert from "@/models/CalibrationAlert";
import { requireAuth, ApiAuthError, isOwner } from "@/lib/api-auth";
import { withCors, handlePreflight } from "@/lib/cors";

const METHODS = ["DELETE", "OPTIONS"];

export async function OPTIONS(req: NextRequest) {
  return handlePreflight(req, METHODS);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const auth = await requireAuth(req);

    if (!mongoose.isValidObjectId(params.id)) {
      return jsonCors(req, { error: "invalid_id" }, 400);
    }

    const existing = await CalibrationAlert.findById(params.id);
    if (!existing) return jsonCors(req, { error: "not_found" }, 404);

    if (!isOwner(auth, existing.ownerId.toString()) && auth.role !== "admin") {
      return jsonCors(req, { error: "forbidden" }, 403);
    }

    await existing.deleteOne();
    return jsonCors(req, { ok: true }, 200);
  } catch (err) {
    if (err instanceof ApiAuthError) {
      return jsonCors(req, { error: err.message }, err.status);
    }
    console.error("[/api/calibration-alerts/[id]] error:", err);
    return jsonCors(req, { error: "internal_error" }, 500);
  }
}

function jsonCors(req: NextRequest, body: any, status: number) {
  return withCors(NextResponse.json(body, { status }), req, METHODS);
}
