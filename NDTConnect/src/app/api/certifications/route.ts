// src/app/api/certifications/route.ts
//
// GET  /api/certifications?kind=personnel|company  → list (filtered)
// POST /api/certifications                          → create

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";

import dbConnect from "@/lib/mongodb";
import Certification, { CERTIFICATION_KINDS } from "@/models/Certification";
import { requireAuth, ApiAuthError } from "@/lib/api-auth";
import { withCors, handlePreflight } from "@/lib/cors";

const METHODS = ["GET", "POST", "OPTIONS"];

const dateString = z
  .string()
  .min(1)
  .refine((s) => !Number.isNaN(new Date(s).getTime()), {
    message: "Invalid date",
  })
  .transform((s) => new Date(s));

const optionalDateString = z
  .string()
  .nullable()
  .optional()
  .transform((v) =>
    v === undefined || v === null || v === ""
      ? null
      : !Number.isNaN(new Date(v).getTime())
        ? new Date(v)
        : null,
  );

const createSchema = z
  .object({
    kind: z.enum(CERTIFICATION_KINDS),
    personName: z.string().optional().default(""),
    method: z.string().optional().default(""),
    level: z.string().optional().default(""),
    body: z.string().optional().default(""),
    certName: z.string().optional().default(""),
    expiryDate: dateString,
    issuedDate: optionalDateString,
    notes: z.string().optional().default(""),
  })
  .superRefine((val, ctx) => {
    if (val.kind === "personnel" && !val.personName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["personName"],
        message: "personName is required for personnel certifications",
      });
    }
    if (val.kind === "company" && !val.certName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["certName"],
        message: "certName is required for company certifications",
      });
    }
  });

export async function OPTIONS(req: NextRequest) {
  return handlePreflight(req, METHODS);
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const auth = await requireAuth(req);

    const url = new URL(req.url);
    const kindParam = url.searchParams.get("kind");

    const filter: Record<string, any> =
      auth.role === "admin"
        ? {}
        : { ownerId: new mongoose.Types.ObjectId(auth.userId) };

    if (kindParam) {
      if (!(CERTIFICATION_KINDS as readonly string[]).includes(kindParam)) {
        return jsonCors(req, { error: "invalid_kind" }, 400);
      }
      filter.kind = kindParam;
    }

    const items = await Certification.find(filter)
      .sort({ expiryDate: 1 })
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

    const created = await Certification.create({
      ...parsed.data,
      ownerId: new mongoose.Types.ObjectId(auth.userId),
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
  console.error("[/api/certifications] error:", err);
  return jsonCors(req, { error: "internal_error" }, 500);
}
