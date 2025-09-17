import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/eventSession";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const password = String(formData.get("password") || "").trim();

    const baseUrl = process.env.NODE_ENV === "production" ? "https://cumsa.ca" : req.nextUrl.origin;

    if (!password) {
      return NextResponse.redirect(`${baseUrl}/extras/portals/notifications/login`);
    }

    const storedPassword = process.env.NOTIFICATION_PORTAL_PASSWORD;

    if (!storedPassword) {
      console.error("NOTIFICATION_PORTAL_PASSWORD environment variable is not set");
      return NextResponse.redirect(`${baseUrl}/extras/portals/notifications/login`);
    }

    if (password === storedPassword) {
      const response = NextResponse.redirect(`${baseUrl}/extras/portals/notifications/menu`);
      const session = await getIronSession<{ authorized_notifications?: boolean }>(req, response, {
        ...sessionOptions,
        cookieName: "notif_session",
      });
      session.authorized_notifications = true;
      await session.save();
      return response;
    }

    return NextResponse.redirect(`${baseUrl}/extras/portals/notifications/login`);
  } catch (error) {
    console.error("Notifications login error:", error);
    const baseUrl = process.env.NODE_ENV === "production" ? "https://cumsa.ca" : req.nextUrl.origin;
    return NextResponse.redirect(`${baseUrl}/extras/portals/notifications/login`);
  }
}
