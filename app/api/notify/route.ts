import { NextRequest, NextResponse } from "next/server";
import { sendServiceRequestNotification, sendRequestStatusUpdate } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (type === "new-request") {
      const { providerEmail, providerName, serviceType, location, description, clientName, requestId } = body;
      if (!providerEmail || !providerName) {
        return NextResponse.json({ error: "Missing provider email or name" }, { status: 400 });
      }
      await sendServiceRequestNotification(providerEmail, providerName, {
        serviceType, location, description, clientName, requestId,
      });
      return NextResponse.json({ success: true, message: "Notification sent" });
    }

    if (type === "status-update") {
      const { clientEmail, clientName, serviceType, status, providerName, requestId } = body;
      if (!clientEmail) {
        return NextResponse.json({ error: "Missing client email" }, { status: 400 });
      }
      await sendRequestStatusUpdate(clientEmail, clientName, {
        serviceType, status, providerName, requestId,
      });
      return NextResponse.json({ success: true, message: "Status update sent" });
    }

    return NextResponse.json({ error: "Unknown notification type" }, { status: 400 });
  } catch (error: any) {
    console.error("Email notification error:", error);
    return NextResponse.json({ error: "Failed to send notification", details: error.message }, { status: 500 });
  }
}
