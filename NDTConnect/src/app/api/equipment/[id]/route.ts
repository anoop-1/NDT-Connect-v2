// src/app/api/equipment/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";

import dbConnect from "@/lib/mongodb";
import Equipment, { EQUIPMENT_STATUSES } from "@/models/Equipment";
import {
  requireAuth,
  ApiAuthError,
  canAccessOwner,
  isOwner,
} from "@/lib/api-auth";
import { withCors, handlePreflight } from "@/lib/cors";

const METHODS = ["GET", "PATCH", "DELETE", "OPTIONS"];

const patchSchema = z.object({
  name: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().min(1).optional(),
  calibrationDueDate: z
    .string()
    .nullable()
    .optional()
    .transform((v) => (v === undefined ? undefined : v ? new Date(v) : null)),
  status: z.enum(EQUIPMENT_STATUSES).optional(),
  notes: z.string().optional(),
});

export async function OPTIONS(req: NextRequest) {
  return handlePreflight(req, METHODS);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const auth = await requireAuth(req);

    if (!mongoose.isValidObjectId(params.id)) {
      return jsonCors(req, { error: "invalid_id" }, 400);
    }
    const item = await Equipment.findById(params.id).lean<any>();
    if (!item) return jsonCors(req, { error: "not_found" }, 404);

    if (!canAccessOwner(auth, item.ownerId.toString())) {
      return jsonCors(req, { error: "forbidden" }, 403);
    }
    return jsonCors(req, { item }, 200);
  } catch (err) {
    return handleError(err, req);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const auth = await requireAuth(req);

    if (!mongoose.isValidObjectId(params.id)) {
      return jsonCors(req, { error: "invalid_id" }, 400);
    }

    const body = await req.json().catch(() => ({}));
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return jsonCors(
        req,
        { error: "validation_error", issues: parsed.error.issues },
        400,
      );
    }

    const existing = await Equipment.findById(params.id);
    if (!existing) return jsonCors(req, { error: "not_found" }, 404);

    if (!isOwner(auth, existing.ownerId.toString()) && auth.role !== "admin") {
      return jsonCors(req, { error: "forbidden" }, 403);
    }

    Object.assign(existing, parsed.data);
    await existing.save();

    return jsonCors(req, { item: existing.toObject() }, 200);
  } catch (err) {
    return handleError(err, req);
  }
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

    const existing = await Equipment.findById(params.id);
    if (!existing) return jsonCors(req, { error: "not_found" }, 404);

    if (!isOwner(auth, existing.ownerId.toString()) && auth.role !== "admin") {
      return jsonCors(req, { error: "forbidden" }, 403);
    }

    await existing.deleteOne();
    return jsonCors(req, { ok: true }, 200);
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
  console.error("[/api/equipment/[id]] error:", err);
  return jsonCors(req, { error: "internal_error" }, 500);
}
