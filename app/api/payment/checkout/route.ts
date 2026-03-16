/*import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { PaymentCheckoutSchema } from "../../../../lib/validation/payment";

// Fix Stripe API version to match installed types
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-05-28.basil" });

// Updated config for Next.js 14
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parse = PaymentCheckoutSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: "Invalid input", details: parse.error.errors }, { status: 400 });
  }
  const { providerServiceId, buyerId } = parse.data;

  // 1. Connect to DB
  const db = await dbConnect();

  // 2. Fetch service details
  const serviceDoc = await db.collection("providers").findOne({ "providerProfile.servicesOffered.id": providerServiceId }, {
    projection: { "providerProfile.servicesOffered.$": 1, email: 1, _id: 1 }
  });
  const baseService = serviceDoc?.providerProfile?.servicesOffered?.[0];
  if (!baseService) return NextResponse.json({ error: "Service not found" }, { status: 404 });

  // 3. Fetch margin from config
  const config = await db.collection("platformConfig").findOne({ _id: "global" });
  const margin = config?.providerMarginPercent ?? 0;

  // 4. Calculate price with margin
  const basePrice = Number(baseService.rate);
  const marginAmount = basePrice * (margin / 100);
  const priceWithMargin = basePrice + marginAmount;

  // 5. Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: baseService.currency.toLowerCase(),
        product_data: {
          name: baseService.name,
        },
        unit_amount: Math.round(priceWithMargin * 100),
      },
      quantity: 1,
    }],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
    metadata: {
      providerId: serviceDoc._id.toString(),
      serviceId: providerServiceId,
      marginPercent: margin,
      basePrice,
      marginAmount,
      buyerId,
      providerEmail: serviceDoc.email,
    },
  });

  return NextResponse.json({ url: session.url });
}

// Note: The webhook handler should be in a separate file (/api/payment/webhook/route.ts)
// with its own config settings
*/
