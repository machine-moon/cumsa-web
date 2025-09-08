import Link from "next/link";

const links = [
  { href: "/extras/portals/events/add", label: "Add Event", emoji: "✨" },
  { href: "/extras/portals/events/edit", label: "Edit Event", emoji: "🖋️" },
  { href: "/extras/portals/events/remove", label: "Remove Event", emoji: "🗑️" },
  { href: "/extras/portals/events/upload-image", label: "Upload Image", emoji: "🖼️" },
];

export default function EventsMenu() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center max-w-xl">
        <h2 className="text-3xl font-extrabold text-[var(--blue)] tracking-tight">Manage Events</h2>
        <p className="mt-2 text-gray-600">Create, edit, curate and keep the events board fresh.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-xl bg-white/80 backdrop-blur border border-black/10 p-6 shadow hover:shadow-lg transition flex flex-col items-center text-center"
          >
            <span className="font-semibold text-[var(--foreground)]">{l.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
