import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/eventSession";
import type { NotificationGroup } from "@/types/notifications";
import { addGroup, getAllGroups, updateGroup } from "@/lib/notificationsDb";

function requireAdmin(session: { authorized_notifications?: boolean }) {
  return !!session.authorized_notifications;
}

export async function GET() {
  const groups = getAllGroups();
  return NextResponse.json(groups);
}

export async function POST(req: NextRequest) {
  const res = NextResponse.json({});
  const session = await getIronSession<{ authorized_notifications?: boolean }>(req, res, {
    ...sessionOptions,
    cookieName: "notif_session",
  });
  if (!requireAdmin(session)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const fields = Array.isArray(body.fields) ? body.fields.map(String) : [];
  if (!name) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const group: NotificationGroup = addGroup(name, fields);
  return NextResponse.json(group);
}

export async function PATCH(req: NextRequest) {
  const res = NextResponse.json({});
  const session = await getIronSession<{ authorized_notifications?: boolean }>(req, res, {
    ...sessionOptions,
    cookieName: "notif_session",
  });
  if (!requireAdmin(session)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const key = String(body.key || "").trim();
  if (!key) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const updated = updateGroup(key, body.name, Array.isArray(body.fields) ? body.fields : undefined);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}
