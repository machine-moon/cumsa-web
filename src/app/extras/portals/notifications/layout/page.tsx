import Link from "next/link";

export default function NotificationsPortalLayoutPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Link href="/extras/portals/notifications/login" className="btn-cozy btn-outline">
          Login
        </Link>
        <Link href="/extras/portals/notifications/menu" className="btn-cozy btn-outline">
          Dashboard
        </Link>
        <a href="/api/notifications/logout" className="btn-cozy btn-outline">
          Logout
        </a>
      </div>
      <p className="text-sm text-slate-600">Use the links above to navigate the portal.</p>
    </div>
  );
}
