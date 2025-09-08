import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIX = "/extras/portals/events";
const PUBLIC_PATHS = new Set(["/extras/portals/events/login"]);

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith(PROTECTED_PREFIX) &&
    !PUBLIC_PATHS.has(req.nextUrl.pathname)
  ) {
    const authorized = req.cookies.get("evt_auth")?.value === "1";
    if (!authorized) {
      const url = new URL("/extras/portals/events/login", req.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/extras/portals/events/:path*"] };
