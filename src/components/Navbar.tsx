"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LINKS } from "@/lib/constants";
import { FaTree, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";

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
      { label: "New Muslims", href: "/services/new-muslims" },
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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const navRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [highlightProps, setHighlightProps] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (hoveredIdx !== null && navRefs.current[hoveredIdx]) {
      const el = navRefs.current[hoveredIdx]!;
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement!.getBoundingClientRect();
      setHighlightProps({ left: rect.left - parentRect.left, width: rect.width });
    }
  }, [hoveredIdx]);

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
            className="flex items-center select-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <motion.img
              src="/MSA.png"
              alt="Carleton University MSA logo"
              width={220}
              height={56}
              className="object-contain h-14 w-auto drop-shadow-md"
              whileHover={{ scaleX: 1.12, scaleY: 0.92 }}
              whileTap={{ scale: 1.18 }}
              transition={{ type: "spring", stiffness: 350, damping: 12, duration: 0.3 }}
              draggable={false}
            />
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

          <nav className="hidden md:flex items-center gap-6 relative">
            <motion.div
              className="absolute top-0 h-full bg-gradient-to-br from-blue-200/60 to-blue-400/30 rounded-lg pointer-events-none z-0"
              animate={
                hoveredIdx !== null
                  ? { left: highlightProps.left, width: highlightProps.width, opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{ type: "spring", stiffness: 400, damping: 30, duration: 0.25 }}
              style={{ left: highlightProps.left, width: highlightProps.width }}
            />
            {NAV.map((item, i) => (
              <div
                key={item.label}
                ref={(el) => {
                  navRefs.current[i] = el;
                }}
                className="relative z-10"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {"children" in item ? (
                  <>
                    <button
                      className={`flex items-center gap-1 px-2 py-1 rounded transition-colors duration-200 ${hoveredIdx === i ? "bg-blue-100/60 text-[var(--blue)] shadow" : "hover:bg-blue-50/60 hover:text-[var(--blue)]"}`}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown((d) => (d === item.label ? null : item.label));
                      }}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="menu"
                    >
                      {item.label}
                      <FaChevronDown
                        className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                        aria-hidden
                      />
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
                      className={`px-2 py-1 rounded transition-colors duration-200 ${hoveredIdx === i ? "bg-blue-100/60 text-[var(--blue)] shadow" : "hover:bg-blue-50/60 hover:text-[var(--blue)]"} ${pathname === item.href ? "text-[var(--blue)]" : ""}`}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            ))}
            <a
              href={LINKS.linktree}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linktree"
              className="ml-2 p-2 rounded-full hover:bg-green-100 transition-base text-green-700 hover:text-green-800 z-10"
            >
              <FaTree className="w-5 h-5" />
            </a>
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
                      <FaChevronDown
                        className="w-4 h-4 transition group-open:rotate-180"
                        aria-hidden
                      />
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
