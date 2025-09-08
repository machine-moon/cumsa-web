import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";

async function verifyPassword(formData: FormData): Promise<void> {
  "use server";
  const pwd = String(formData.get("password") || "");
  const f = path.join(process.cwd(), ".secrets", "event_pwd.txt");
  let stored = "";
  try {
    stored = fs.readFileSync(f, "utf8").trim();
  } catch {}
  if (pwd && stored && pwd === stored) {
    (await cookies()).set("evt_auth", "1", { path: "/", httpOnly: true });
    redirect("/extras/portals/events/menu");
  }
  // fallback: stay on page silently
}

export default function LoginPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-3xl font-extrabold text-[var(--blue)] mb-2">Events Portal</h1>
          <p className="text-gray-600">Authorized access only</p>
        </div>

        <form
          action={verifyPassword}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Portal Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="Enter access password"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
              />
              <p className="text-xs text-gray-500 mt-2">
                Contact the admin if you need access credentials
              </p>
            </div>

            <button className="btn-cozy btn-primary w-full text-lg py-3" type="submit">
              Access Portal
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <a
            href="/events"
            className="text-sm text-[var(--blue)] hover:text-[var(--red)] underline"
          >
            ← Back to Public Events
          </a>
        </div>
      </div>
    </div>
  );
}
