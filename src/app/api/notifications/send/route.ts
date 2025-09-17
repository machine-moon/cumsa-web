import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/eventSession";
import type { PushSubscriptionRecord } from "@/lib/notificationsDb";
import { listSubscriptionsByGroup } from "@/lib/notificationsDb";
import { webPush } from "@/lib/webPush";

type NotifSession = { authorized_notifications?: boolean };
function requireAdmin(session: NotifSession) {
  return !!session.authorized_notifications;
}

export async function POST(req: NextRequest) {
  const res = NextResponse.json({});
  const session = await getIronSession<NotifSession>(req, res, {
    ...sessionOptions,
    cookieName: "notif_session",
  });
  if (!requireAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { groupKey, payload } = await req.json().catch(() => ({}));
  if (!groupKey) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  if (groupKey !== "announcements") {
    return NextResponse.json(
      { error: "Manual pushes are allowed only for announcements" },
      { status: 400 },
    );
  }

  const subs = listSubscriptionsByGroup("announcements");

  const wp = webPush;
  if (!wp) {
    console.log(
      "[Notify] web-push not installed. Would send to:",
      subs.length,
      "subscribers.",
      payload,
    );
    return NextResponse.json({ success: true, queued: subs.length, simulated: true });
  }

  const sendPromises = subs.map(async (s: PushSubscriptionRecord) => {
    try {
      const subscription = {
        endpoint: s.endpoint,
        keys: { p256dh: s.p256dh, auth: s.auth },
      };
      const body = JSON.stringify({
        title: "CUMSA",
        body: String(payload?.message || "New announcement"),
        url: "/",
      });
      await wp.sendNotification(subscription, body);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  });

  await Promise.allSettled(sendPromises);
  return NextResponse.json({ success: true, queued: subs.length });
}
