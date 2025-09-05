"use client";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Donate", href: "/donate" },
  {
    label: "About Us",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Land Acknowledgment", href: "/land-acknowledgement" },
      { label: "Documents", href: "/documents" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Prayer Services", href: "/services/prayer" },
      { label: "Chaplaincy Services", href: "/services/chaplaincy" },
      { label: "Roommate Services", href: "/services/roommate" },
      { label: "Equity Services", href: "/services/equity" },
      { label: "Your Masjid", href: "/services/your-masajid" },
      {
        label: "Linktree",
        href: "https://linktr.ee/Carletonmsa?utm_source=linktree_profile_share&ltsid=86b6ac54-9966-4522-981f-6babdf7b9681",
      },
    ],
  },
  { label: "Join Us", href: "/join-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={navRef} className="sticky top-0 z-50 shadow">
      {}
      <div className="bg-white text-[var(--navy)]">
        <div className="container-base h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-semibold tracking-wide transition-base hover:text-[var(--red)]"
          >
            <BrandLogo size={44} />
            <span className="hidden sm:inline">Carleton University MSA</span>
          </Link>

          <button
            aria-label="Toggle menu"
            type="button"
            className="md:hidden p-2 rounded hover:bg-white/10 transition-base"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="block w-6 h-0.5 bg-[var(--navy)] mb-1" />
            <span className="block w-6 h-0.5 bg-[var(--navy)] mb-1" />
            <span className="block w-6 h-0.5 bg-[var(--navy)]" />
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((item) => (
              <div key={item.label} className="relative">
                {"children" in item ? (
                  <>
                    <button
                      className="flex items-center gap-1 hover:text-[var(--blue)] transition-base"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown((d) => (d === item.label ? null : item.label));
                      }}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="menu"
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.116l3.71-3.885a.75.75 0 1 1 1.08 1.04l-4.24 4.44a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" />
                      </svg>
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute left-0 mt-2 w-56 rounded-md bg-white text-[var(--navy)] shadow ring-1 ring-black/5 py-2">
                        {(item.children ?? []).map((c: { label: string; href: string }) =>
                          c.href?.startsWith("http") ? (
                            <a
                              key={c.href}
                              href={c.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 hover:bg-[var(--blue)] hover:text-white transition-base"
                            >
                              {c.label}
                            </a>
                          ) : (
                            <Link
                              key={c.href}
                              href={c.href}
                              className="block px-4 py-2 hover:bg-[var(--blue)] hover:text-white transition-base"
                            >
                              {c.label}
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  "href" in item &&
                  item.href && (
                    <Link
                      href={item.href}
                      className={`hover:text-[var(--blue)] transition-base ${pathname === item.href ? "text-[var(--blue)]" : ""}`}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <div className="container-base py-2 space-y-1">
            {NAV.map((item) => (
              <div key={item.label} className="">
                {"children" in item ? (
                  <details className="group">
                    <summary className="list-none flex items-center justify-between py-2 cursor-pointer">
                      <span>{item.label}</span>
                      <svg
                        className="w-4 h-4 transition group-open:rotate-180"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.116l3.71-3.885a.75.75 0 1 1 1.08 1.04l-4.24 4.44a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" />
                      </svg>
                    </summary>
                    <div className="pl-4 pb-2 space-y-1">
                      {(item.children ?? []).map((c: { label: string; href: string }) =>
                        c.href?.startsWith("http") ? (
                          <a
                            key={c.href}
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-1 hover:text-[var(--blue)]"
                          >
                            {c.label}
                          </a>
                        ) : (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="block py-1 hover:text-[var(--blue)]"
                          >
                            {c.label}
                          </Link>
                        ),
                      )}
                    </div>
                  </details>
                ) : (
                  "href" in item &&
                  item.href && (
                    <Link href={item.href} className="block py-2 hover:text-[var(--blue)]">
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
