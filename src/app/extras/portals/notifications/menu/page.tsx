import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/eventSession";
import { redirect } from "next/navigation";
import LevelManagement from "@/components/Notifications/LevelManagement";
import NotificationForm from "@/components/Notifications/NotificationForm";
import type { NotificationGroup } from "@/types/notifications";

async function isAuthorized() {
  const cookieStore = await cookies();
  const session = await getIronSession<{ authorized_notifications?: boolean }>(cookieStore, {
    ...sessionOptions,
    cookieName: "notif_session",
  });
  return !!session.authorized_notifications;
}

async function getGroups(): Promise<NotificationGroup[]> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === "production" ? "https://cumsa.ca" : "http://localhost:3000");
  const res = await fetch(`${base}/api/notifications/levels`, { cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()) as NotificationGroup[];
}

export default async function NotificationsMenu() {
  const authed = await isAuthorized();
  if (!authed) redirect("/extras/portals/notifications/login");

  const groups = await getGroups();

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[var(--blue)]">Notifications Dashboard</h1>
        <p className="text-slate-600">Manage groups and send announcements.</p>
      </header>

      <section className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Send Announcement</h2>
        <NotificationForm groups={groups} />
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Groups</h2>
        <LevelManagement />
      </section>
    </div>
  );
}
