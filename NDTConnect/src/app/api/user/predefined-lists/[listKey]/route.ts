// src/app/api/user/predefined-lists/[listKey]/route.ts
//
// GET  /api/user/predefined-lists/:listKey  → user's custom items (defaults to [])
// PUT  /api/user/predefined-lists/:listKey  → replace items array
// POST /api/user/predefined-lists/:listKey  → add a single item
//
// listKey ∈ { ndtMethods, equipmentTypes, personnelCertBodies, personnelLevels, companyCertifications }

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";

import dbConnect from "@/lib/mongodb";
import UserPredefinedList, {
  PREDEFINED_LIST_KEYS,
  type PredefinedListKey,
} from "@/models/UserPredefinedList";
import { requireAuth, ApiAuthError } from "@/lib/api-auth";
import { withCors, handlePreflight } from "@/lib/cors";

const METHODS = ["GET", "PUT", "POST", "OPTIONS"];

const putSchema = z.object({
  items: z.array(z.string().trim().min(1)).max(500),
});

const postSchema = z.object({
  item: z.string().trim().min(1).max(200),
});

function isValidKey(k: string): k is PredefinedListKey {
  return (PREDEFINED_LIST_KEYS as readonly string[]).includes(k);
}

export async function OPTIONS(req: NextRequest) {
  return handlePreflight(req, METHODS);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { listKey: string } },
) {
  try {
    await dbConnect();
    const auth = await requireAuth(req);

    if (!isValidKey(params.listKey)) {
      return jsonCors(req, { error: "invalid_listKey" }, 400);
    }

    const ownerId = new mongoose.Types.ObjectId(auth.userId);
    const doc = await UserPredefinedList.findOne({
      ownerId,
      listKey: params.listKey,
    }).lean<any>();

    return jsonCors(
      req,
      { listKey: params.listKey, items: doc?.items ?? [] },
      200,
    );
  } catch (err) {
    return handleError(err, req);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { listKey: string } },
) {
  try {
    await dbConnect();
    const auth = await requireAuth(req);

    if (!isValidKey(params.listKey)) {
      return jsonCors(req, { error: "invalid_listKey" }, 400);
    }

    const body = await req.json().catch(() => ({}));
    const parsed = putSchema.safeParse(body);
    if (!parsed.success) {
      return jsonCors(
        req,
        { error: "validation_error", issues: parsed.error.issues },
        400,
      );
    }

    // Dedupe (case-insensitive), keep insertion order.
    const seen = new Set<string>();
    const dedup: string[] = [];
    for (const raw of parsed.data.items) {
      const key = raw.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        dedup.push(raw);
      }
    }

    const ownerId = new mongoose.Types.ObjectId(auth.userId);
    const doc = await UserPredefinedList.findOneAndUpdate(
      { ownerId, listKey: params.listKey },
      { $set: { items: dedup }, $setOnInsert: { ownerId, listKey: params.listKey } },
      { new: true, upsert: true },
    ).lean<any>();

    return jsonCors(
      req,
      { listKey: params.listKey, items: doc?.items ?? dedup },
      200,
    );
  } catch (err) {
    return handleError(err, req);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { listKey: string } },
) {
  try {
    await dbConnect();
    const auth = await requireAuth(req);

    if (!isValidKey(params.listKey)) {
      return jsonCors(req, { error: "invalid_listKey" }, 400);
    }

    const body = await req.json().catch(() => ({}));
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) {
      return jsonCors(
        req,
        { error: "validation_error", issues: parsed.error.issues },
        400,
      );
    }

    const ownerId = new mongoose.Types.ObjectId(auth.userId);
    const doc = await UserPredefinedList.findOne({
      ownerId,
      listKey: params.listKey,
    });

    const incoming = parsed.data.item;
    const incomingLower = incoming.toLowerCase();

    if (!doc) {
      const created = await UserPredefinedList.create({
        ownerId,
        listKey: params.listKey,
        items: [incoming],
      });
      return jsonCors(
        req,
        { listKey: params.listKey, items: created.items, added: true },
        201,
      );
    }

    if (doc.items.some((x) => x.toLowerCase() === incomingLower)) {
      return jsonCors(
        req,
        { listKey: params.listKey, items: doc.items, added: false, reason: "duplicate" },
        200,
      );
    }

    doc.items.push(incoming);
    await doc.save();

    return jsonCors(
      req,
      { listKey: params.listKey, items: doc.items, added: true },
      200,
    );
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
  console.error("[/api/user/predefined-lists/[listKey]] error:", err);
  return jsonCors(req, { error: "internal_error" }, 500);
}
