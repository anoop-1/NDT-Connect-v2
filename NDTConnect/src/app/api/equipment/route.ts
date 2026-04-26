// src/app/api/equipment/route.ts
//
// GET  /api/equipment  → list current user's equipment (admin: all)
// POST /api/equipment  → create one

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";

import dbConnect from "@/lib/mongodb";
import Equipment, { EQUIPMENT_STATUSES } from "@/models/Equipment";
import { requireAuth, ApiAuthError } from "@/lib/api-auth";
import { withCors, handlePreflight } from "@/lib/cors";

const METHODS = ["GET", "POST", "OPTIONS"];

const createSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  manufacturer: z.string().optional().default(""),
  model: z.string().optional().default(""),
  serialNumber: z.string().min(1),
  calibrationDueDate: z
    .string()
    .optional()
    .nullable()
    .transform((v) => (v ? new Date(v) : null)),
  status: z.enum(EQUIPMENT_STATUSES).default("Active"),
  notes: z.string().optional().default(""),
});

export async function OPTIONS(req: NextRequest) {
  return handlePreflight(req, METHODS);
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const auth = await requireAuth(req);

    const filter =
      auth.role === "admin" ? {} : { ownerId: new mongoose.Types.ObjectId(auth.userId) };

    const items = await Equipment.find(filter).sort({ createdAt: -1 }).lean();

    return withCors(NextResponse.json({ items }), req, METHODS);
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
      return withCors(
        NextResponse.json(
          { error: "validation_error", issues: parsed.error.issues },
          { status: 400 },
        ),
        req,
        METHODS,
      );
    }

    const created = await Equipment.create({
      ...parsed.data,
      ownerId: new mongoose.Types.ObjectId(auth.userId),
    });

    return withCors(
      NextResponse.json({ item: created.toObject() }, { status: 201 }),
      req,
      METHODS,
    );
  } catch (err) {
    return handleError(err, req);
  }
}

function handleError(err: unknown, req: NextRequest) {
  if (err instanceof ApiAuthError) {
    return withCors(
      NextResponse.json({ error: err.message }, { status: err.status }),
      req,
      METHODS,
    );
  }
  console.error("[/api/equipment] error:", err);
  return withCors(
    NextResponse.json({ error: "internal_error" }, { status: 500 }),
    req,
    METHODS,
  );
}
