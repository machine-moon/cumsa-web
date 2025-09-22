import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/eventSession";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const session = await getIronSession<{ authorized_notifications?: boolean }>(cookieStore, {
    ...sessionOptions,
    cookieName: "notif_session",
  });
  if (session.authorized_notifications) {
    redirect("/extras/portals/notifications/menu");
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[var(--blue)] mb-2">Notifications Portal</h1>
          <p className="text-[var(--navy)]/80">Authorized access only</p>
        </div>

        <form
          method="POST"
          action="/api/notifications/login"
          className="bg-white/80 rounded-2xl p-8 shadow-lg border border-[color:var(--navy)]/15 backdrop-blur"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[var(--navy)] mb-2">
                Portal Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="Enter access password"
                className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
              />
              <p className="text-xs text-[var(--navy)]/70 mt-2">Contact admin for access</p>
            </div>

            <button className="btn-cozy btn-primary w-full text-lg py-3" type="submit">
              Access Portal
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <BackButton href="/extras/apps/notifications" label="Back to Public Subscriptions" />
        </div>
      </div>
    </div>
  );
}
