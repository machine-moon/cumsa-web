import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/eventSession";

const PROTECTED_PREFIX = "/extras/portals/events";
const PUBLIC_PATHS = new Set(["/extras/portals/events/login"]);

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith(PROTECTED_PREFIX) &&
    !PUBLIC_PATHS.has(req.nextUrl.pathname)
  ) {
    try {
      const response = NextResponse.next();
      const session = await getIronSession<{ authorized?: boolean }>(req, response, sessionOptions);

      if (!session.authorized) {
        const url = new URL("/extras/portals/events/login", req.url);
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error("Session validation error:", error);
      const url = new URL("/extras/portals/events/login", req.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/extras/portals/events/:path*"] };
