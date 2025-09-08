import Link from "next/link";

export const dynamic = "force-dynamic";

export default function EventsPortalEntry() {
  return (
    <div className="text-center space-y-8">
      <div>
        <div className="text-8xl mb-6">🚪</div>
        <h1 className="text-4xl font-extrabold text-[var(--blue)] mb-4">Events Portal</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Welcome to the Events Management Portal. This is a secure area for authorized users to
          create, edit, and manage community events.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🔒</span>
          <h3 className="font-semibold text-amber-800">Authentication Required</h3>
        </div>
        <p className="text-sm text-amber-700 mb-4">
          You need valid credentials to access the portal management features.
        </p>
        <Link
          href="/extras/portals/events/login"
          className="btn-cozy btn-primary w-full inline-block text-center"
        >
          Login to Portal
        </Link>
      </div>

      <div className="pt-6">
        <p className="text-gray-500 text-sm mb-3">Not authorized?</p>
        <div className="flex gap-4 justify-center">
          <Link href="/events" className="btn-cozy btn-outline">
            View Public Events
          </Link>
          <Link
            href="/contact-us"
            className="text-[var(--blue)] hover:text-[var(--red)] underline text-sm py-3"
          >
            Request Access
          </Link>
        </div>
      </div>
    </div>
  );
}
