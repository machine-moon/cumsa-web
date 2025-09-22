import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/eventSession";
import { draftSessionOptions } from "@/lib/draftSession";

function normalizePath(p: string) {
  if (p.length > 1 && p.endsWith("/")) return p.replace(/\/+$/, "");
  return p;
}

const PROTECTED_EVENTS_PREFIX = "/extras/portals/events";
const PUBLIC_EVENTS_PATHS = new Set(["/extras/portals/events/login"]);

const PROTECTED_DRAFTS_PREFIX = "/extras/portals/drafts";
const PUBLIC_DRAFTS_PATHS = new Set(["/extras/portals/drafts/login"]);

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith(PROTECTED_EVENTS_PREFIX) &&
    !PUBLIC_EVENTS_PATHS.has(req.nextUrl.pathname)
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

  const pathname = normalizePath(req.nextUrl.pathname);
  if (pathname.startsWith("/drafts/")) {
    try {
      const response = NextResponse.next();
      const session = await getIronSession<{ authorized?: boolean }>(
        req,
        response,
        draftSessionOptions,
      );
      if (!session.authorized) {
        const url = new URL("/extras/portals/drafts/login", req.url);
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error("Drafts page access validation error:", error);
      const url = new URL("/extras/portals/drafts/login", req.url);
      return NextResponse.redirect(url);
    }
  }

  if (
    req.nextUrl.pathname.startsWith(PROTECTED_DRAFTS_PREFIX) &&
    !PUBLIC_DRAFTS_PATHS.has(req.nextUrl.pathname)
  ) {
    try {
      const response = NextResponse.next();
      const session = await getIronSession<{ authorized?: boolean }>(
        req,
        response,
        draftSessionOptions,
      );
      if (!session.authorized) {
        const url = new URL("/extras/portals/drafts/login", req.url);
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error("Drafts session validation error:", error);
      const url = new URL("/extras/portals/drafts/login", req.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/extras/portals/events/:path*",
    "/extras/portals/drafts/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
