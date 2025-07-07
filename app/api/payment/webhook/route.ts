import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Stripe from "stripe";

// New route config format for Next.js 14+
export const dynamic = "force-dynamic"; // Required for webhooks to work properly
export const runtime = "nodejs"; // Ensure Node.js runtime for webhook processing

export async function POST(req: NextRequest) {
  // Fix Stripe API version to match installed types
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
    apiVersion: "2025-05-28.basil" 
  });
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.arrayBuffer();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody), 
      sig!, 
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Webhook signature verification failed." }, 
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const metadata = session.metadata ?? {};
    const db = await dbConnect();
    
    // Register transaction in MongoDB
    await db.collection("transactions").insertOne({
      buyerId: metadata.buyerId ?? null,
      providerId: metadata.providerId ?? null,
      serviceId: metadata.serviceId ?? null,
      providerEmail: metadata.providerEmail ?? null,
      amount: session.amount_total ? session.amount_total / 100 : null,
      currency: session.currency ?? null,
      marginPercent: metadata.marginPercent ?? null,
      marginAmount: metadata.marginAmount ?? null,
      basePrice: metadata.basePrice ?? null,
      stripeSessionId: session.id,
      createdAt: new Date(),
      status: "completed"
    });
    
    // (Optional) Notify provider (e.g., send email)
  }
  
  return NextResponse.json({ received: true });
}
