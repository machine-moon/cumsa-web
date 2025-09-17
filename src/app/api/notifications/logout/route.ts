import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/eventSession";

export async function GET(req: NextRequest) {
  const baseUrl = process.env.NODE_ENV === "production" ? "https://cumsa.ca" : req.nextUrl.origin;
  const response = NextResponse.redirect(`${baseUrl}/extras/portals/notifications/login`);
  try {
    const session = await getIronSession<{ authorized_notifications?: boolean }>(req, response, {
      ...sessionOptions,
      cookieName: "notif_session",
    });
    if (session) {
      session.authorized_notifications = false;
      await session.destroy();
    }
  } catch (e) {
    console.error("Notifications logout error:", e);
  }
  return response;
}
