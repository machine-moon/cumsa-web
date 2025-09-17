import { NextRequest, NextResponse } from "next/server";
import {
  upsertSubscription,
  updateSubscriptionFlag,
  getPrefs as getDbPrefs,
} from "@/lib/notificationsDb";

const COOKIE_NAME = "subs";

function readCookieSubs(req: NextRequest): Record<string, boolean> {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) return {};
  try {
    return JSON.parse(cookie);
  } catch {
    return {};
  }
}

function writeCookieSubs(res: NextResponse, subs: Record<string, boolean>) {
  res.cookies.set(COOKIE_NAME, JSON.stringify(subs), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const endpoint = url.searchParams.get("endpoint") || undefined;
  const cookieSubs = readCookieSubs(req);
  if (!endpoint) return NextResponse.json(cookieSubs);
  const serverPrefs = getDbPrefs(endpoint);
  return NextResponse.json({ ...cookieSubs, ...serverPrefs });
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    groupKey?: string;
    subscribe?: boolean;
    endpoint?: string;
    keys?: { p256dh: string; auth: string };
  };
  const groupKey = String(body.groupKey || "").trim();
  const subscribe = !!body.subscribe;
  const endpoint = body.endpoint ? String(body.endpoint) : undefined;

  if (!groupKey) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const subs = readCookieSubs(req);
  subs[groupKey] = subscribe;

  if (endpoint && body.keys?.p256dh && body.keys?.auth) {
    upsertSubscription({ endpoint, p256dh: body.keys.p256dh, auth: body.keys.auth }, subs);
  } else if (endpoint) {
    updateSubscriptionFlag({ endpoint, p256dh: "", auth: "" }, groupKey, subscribe);
  }

  const res = NextResponse.json(subs);
  writeCookieSubs(res, subs);
  return res;
}
