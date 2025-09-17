import SubscriptionToggle from "@/components/Notifications/SubscriptionToggle";

export const dynamic = "force-dynamic";

const GROUPS: { key: string; label: string }[] = [
  { key: "events", label: "New posted events (title, date)" },
  { key: "jummah", label: "Jummah prayer updates (location, time)" },
  { key: "announcements", label: "Announcements / PSA / alerts" },
];

export default function NotificationsApp() {
  return (
    <div className="space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-[var(--blue)]">Notifications</h1>
        <p className="text-slate-600">Choose what to hear about. Toggle ON to subscribe.</p>
      </header>

      <div className="space-y-3 max-w-2xl mx-auto">
        {GROUPS.map((g) => (
          <SubscriptionToggle key={g.key} groupKey={g.key} label={g.label} />
        ))}
      </div>
    </div>
  );
}
