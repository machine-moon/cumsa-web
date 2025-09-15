import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";

const links = [
  { href: "/extras/portals/events/add", label: "Add Event" },
  { href: "/extras/portals/events/edit", label: "Edit Event" },
  { href: "/extras/portals/events/remove", label: "Remove Event" },
  { href: "/extras/portals/events/upload-image", label: "Upload Image" },
];

export default function EventsMenu() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full max-w-4xl self-stretch">
        <a
          href="/api/events/logout"
          className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--navy)] bg-white/80 backdrop-blur-sm border border-[color:var(--navy)]/20 rounded-lg shadow-sm hover:bg-[color:var(--blue)]/10 hover:text-[var(--red)] hover:border-[color:var(--blue)]/40 hover:shadow-md transition-all duration-200 ease-in-out"
        >
          <IoLogOutOutline className="w-4 h-4" />
          Logout
        </a>
      </div>

      <div className="text-center max-w-xl animate-fade-in">
        <h2 className="text-3xl font-extrabold text-[var(--blue)] tracking-tight">Manage Events</h2>
        <p className="mt-2 text-[var(--navy)]/80">
          Create, edit, curate and keep the events board fresh.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
        {links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            className={`card p-6 transition-base hover:shadow ${i % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"} flex flex-col items-center text-center`}
          >
            <span className="font-semibold">{l.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
