import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/eventSession";
import dotenv from 'dotenv';

dotenv.config();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const password = String(formData.get("password") || "").trim();

    const baseUrl = process.env.NODE_ENV === "production" ? "https://cumsa.ca" : req.nextUrl.origin;

    if (!password) {
      return NextResponse.redirect(`${baseUrl}/extras/portals/events/login`);
    }

    const storedPassword = process.env.EVENT_PORTAL_PASSWORD;

    if (!storedPassword) {
      console.error("EVENT_PORTAL_PASSWORD environment variable is not set");
      return NextResponse.redirect(`${baseUrl}/extras/portals/events/login`);
    }

    if (password === storedPassword) {
      const response = NextResponse.redirect(`${baseUrl}/extras/portals/events/menu`);
      const session = await getIronSession<{ authorized?: boolean }>(req, response, sessionOptions);
      session.authorized = true;
      await session.save();
      return response;
    }

    return NextResponse.redirect(`${baseUrl}/extras/portals/events/login`);
  } catch (error) {
    console.error("Login error:", error);
    const baseUrl = process.env.NODE_ENV === "production" ? "https://cumsa.ca" : req.nextUrl.origin;
    return NextResponse.redirect(`${baseUrl}/extras/portals/events/login`);
  }
}
