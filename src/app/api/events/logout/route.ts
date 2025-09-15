import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/eventSession";

export async function GET(req: NextRequest) {
  const baseUrl = process.env.NODE_ENV === "production" ? "https://cumsa.ca" : req.nextUrl.origin;
  const response = NextResponse.redirect(`${baseUrl}/extras/portals/events/login`);
  try {
    const session = await getIronSession<{ authorized?: boolean }>(req, response, sessionOptions);
    if (session) {
      session.authorized = false;
      await session.destroy();
    }
  } catch (e) {
    console.error("Logout error:", e);
  }
  return response;
}
