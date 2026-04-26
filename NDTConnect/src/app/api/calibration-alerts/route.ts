// src/app/api/calibration-alerts/route.ts
//
// GET  /api/calibration-alerts  → list current user's alerts
// POST /api/calibration-alerts  → create one

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";

import dbConnect from "@/lib/mongodb";
import CalibrationAlert from "@/models/CalibrationAlert";
import Equipment from "@/models/Equipment";
import { requireAuth, ApiAuthError, isOwner } from "@/lib/api-auth";
import { withCors, handlePreflight } from "@/lib/cors";

const METHODS = ["GET", "POST", "OPTIONS"];

const createSchema = z.object({
  equipmentId: z.string().min(1),
  emailTo: z.string().email(),
  daysBefore: z.number().int().min(1).max(365).default(30),
  enabled: z.boolean().default(true),
});

export async function OPTIONS(req: NextRequest) {
  return handlePreflight(req, METHODS);
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const auth = await requireAuth(req);

    const filter =
      auth.role === "admin"
        ? {}
        : { ownerId: new mongoose.Types.ObjectId(auth.userId) };

    const items = await CalibrationAlert.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return jsonCors(req, { items }, 200);
  } catch (err) {
    return handleError(err, req);
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const auth = await requireAuth(req);

    const body = await req.json().catch(() => ({}));
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return jsonCors(
        req,
        { error: "validation_error", issues: parsed.error.issues },
        400,
      );
    }

    if (!mongoose.isValidObjectId(parsed.data.equipmentId)) {
      return jsonCors(req, { error: "invalid_equipmentId" }, 400);
    }

    // Confirm caller owns the referenced equipment.
    const eq = await Equipment.findById(parsed.data.equipmentId).lean<any>();
    if (!eq) return jsonCors(req, { error: "equipment_not_found" }, 404);

    if (!isOwner(auth, eq.ownerId.toString()) && auth.role !== "admin") {
      return jsonCors(req, { error: "forbidden" }, 403);
    }

    const created = await CalibrationAlert.create({
      ownerId: new mongoose.Types.ObjectId(auth.userId),
      equipmentId: new mongoose.Types.ObjectId(parsed.data.equipmentId),
      emailTo: parsed.data.emailTo,
      daysBefore: parsed.data.daysBefore,
      enabled: parsed.data.enabled,
    });

    return jsonCors(req, { item: created.toObject() }, 201);
  } catch (err) {
    return handleError(err, req);
  }
}

function jsonCors(req: NextRequest, body: any, status: number) {
  return withCors(NextResponse.json(body, { status }), req, METHODS);
}

function handleError(err: unknown, req: NextRequest) {
  if (err instanceof ApiAuthError) {
    return jsonCors(req, { error: err.message }, err.status);
  }
  console.error("[/api/calibration-alerts] error:", err);
  return jsonCors(req, { error: "internal_error" }, 500);
}
