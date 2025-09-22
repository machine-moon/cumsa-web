import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import { getDraftEntries } from "@/lib/draftsIndex.server";

export default async function DraftsMenu() {
  const links = (await getDraftEntries()).map((e) => ({ label: e.label, href: e.href }));
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full max-w-4xl self-stretch">
        <a
          href="/api/drafts/logout"
          className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--navy)] bg-white/80 backdrop-blur-sm border border-[color:var(--navy)]/20 rounded-lg shadow-sm hover:bg-[color:var(--blue)]/10 hover:text-[var(--red)] hover:border-[color:var(--blue)]/40 hover:shadow-md transition-all duration-200 ease-in-out"
        >
          <IoLogOutOutline className="w-4 h-4" />
          Logout
        </a>
      </div>

      <div className="text-center max-w-xl animate-fade-in">
        <h2 className="text-3xl font-extrabold text-[var(--blue)] tracking-tight">Draft Pages</h2>
        <p className="mt-2 text-[var(--navy)]/80">Quick links to internal draft pages.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-2xl">
        {links.length === 0 && (
          <div className="text-center text-[var(--navy)]/70">No drafts configured.</div>
        )}
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="card p-4 hover:shadow transition-base">
            <span className="font-medium">{l.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
