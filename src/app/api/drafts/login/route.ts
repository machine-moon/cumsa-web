import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { draftSessionOptions } from "@/lib/draftSession";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const password = String(formData.get("password") || "").trim();

    const baseUrl = process.env.NODE_ENV === "production" ? "https://cumsa.ca" : req.nextUrl.origin;

    if (!password) {
      return NextResponse.redirect(`${baseUrl}/extras/portals/drafts/login`);
    }

    const storedPassword = process.env.DRAFTS_PORTAL_PASSWORD;

    if (!storedPassword) {
      console.error("DRAFTS_PORTAL_PASSWORD environment variable is not set");
      return NextResponse.redirect(`${baseUrl}/extras/portals/drafts/login`);
    }

    if (password === storedPassword) {
      const response = NextResponse.redirect(`${baseUrl}/extras/portals/drafts/menu`);
      const session = await getIronSession<{ authorized?: boolean }>(
        req,
        response,
        draftSessionOptions,
      );
      session.authorized = true;
      await session.save();
      return response;
    }

    return NextResponse.redirect(`${baseUrl}/extras/portals/drafts/login`);
  } catch (error) {
    console.error("Drafts login error:", error);
    const baseUrl = process.env.NODE_ENV === "production" ? "https://cumsa.ca" : req.nextUrl.origin;
    return NextResponse.redirect(`${baseUrl}/extras/portals/drafts/login`);
  }
}
