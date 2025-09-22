import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { draftSessionOptions } from "@/lib/draftSession";

export async function GET(req: NextRequest) {
  const baseUrl = process.env.NODE_ENV === "production" ? "https://cumsa.ca" : req.nextUrl.origin;
  const response = NextResponse.redirect(`${baseUrl}/extras/portals/drafts/login`);
  try {
    const session = await getIronSession<{ authorized?: boolean }>(
      req,
      response,
      draftSessionOptions,
    );
    if (session) {
      session.authorized = false;
      await session.destroy();
    }
  } catch (e) {
    console.error("Drafts logout error:", e);
  }
  return response;
}
