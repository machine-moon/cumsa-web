"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { NAV, NavItem } from "./navData";
import LinktreeIcon from "./LinktreeIcon";

function DesktopDropdown({
  item,
  isOpen,
  toggle,
  hovered,
  setHovered,
}: {
  item: NavItem;
  isOpen: boolean;
  toggle: () => void;
  hovered: boolean;
  setHovered: (v: boolean) => void;
}) {
  return (
    <div
      className="relative z-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        className={`flex items-center gap-1 px-2 py-1 rounded transition-colors duration-200 ${hovered ? "bg-blue-100/60 text-[var(--blue)] shadow" : "hover:bg-blue-50/60 hover:text-[var(--blue)]"}`}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {item.label}
        <FaChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-md bg-white text-[var(--navy)] shadow ring-1 ring-black/5 py-2">
          {(item.children ?? []).map((c) =>
            c.href.startsWith("http") ? (
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
    </div>
  );
}

function DesktopLink({
  item,
  active,
  hovered,
  setHovered,
}: {
  item: NavItem;
  active: boolean;
  hovered: boolean;
  setHovered: (v: boolean) => void;
}) {
  if (!item.href) return null;
  return (
    <div
      className="relative z-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={item.href}
        className={`px-2 py-1 rounded transition-colors duration-200 ${hovered ? "bg-blue-100/60 text-[var(--blue)] shadow" : "hover:bg-blue-50/60 hover:text-[var(--blue)]"} ${active ? "text-[var(--blue)]" : ""}`}
      >
        {item.label}
      </Link>
    </div>
  );
}

function MobileSection({ item }: { item: NavItem }) {
  if (item.children) {
    return (
      <details className="group">
        <summary className="list-none flex items-center justify-between py-2 cursor-pointer">
          <span>{item.label}</span>
          <FaChevronDown className="w-4 h-4 transition group-open:rotate-180" aria-hidden />
        </summary>
        <div className="pl-4 pb-2 space-y-1">
          {item.children.map((c) =>
            c.href.startsWith("http") ? (
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
              <Link key={c.href} href={c.href} className="block py-1 hover:text-[var(--blue)]">
                {c.label}
              </Link>
            ),
          )}
        </div>
      </details>
    );
  }
  if (item.href) {
    return (
      <Link href={item.href} className="block py-2 hover:text-[var(--blue)]">
        {item.label}
      </Link>
    );
  }
  return null;
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const navRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [highlightProps, setHighlightProps] = useState({ left: 0, width: 0 });

  const closeAll = useCallback(() => {
    setOpenDropdown(null);
    setHoveredIdx(null);
  }, []);

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
    closeAll();
  }, [pathname, closeAll]);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        closeAll();
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [closeAll]);

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
            {NAV.map((item, i) => {
              const hovered = hoveredIdx === i;
              const setHovered = (v: boolean) => setHoveredIdx(v ? i : null);
              const isOpen = openDropdown === item.label;
              if (item.children) {
                return (
                  <DesktopDropdown
                    key={item.label}
                    item={item}
                    isOpen={isOpen}
                    toggle={() => setOpenDropdown(isOpen ? null : item.label)}
                    hovered={hovered}
                    setHovered={setHovered}
                  />
                );
              }
              return (
                <DesktopLink
                  key={item.label}
                  item={item}
                  active={pathname === item.href}
                  hovered={hovered}
                  setHovered={setHovered}
                />
              );
            })}
            <LinktreeIcon />
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <div className="container-base py-2 space-y-1">
            {NAV.map((item) => (
              <MobileSection key={item.label} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
