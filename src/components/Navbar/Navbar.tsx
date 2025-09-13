"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { NAV } from "./navData";
import NavbarItem, { MobileNavItem } from "./NavbarItem";
import NavbarDropdown, { MobileDropdown } from "./NavbarDropdown";
import LinktreeIcon from "./LinktreeIcon";
import { useClickOutside, useNavbarState, NAV_Z_INDEX } from "./helpers";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { navRef, navRefs } = useNavbarState();

  const activeIndex = NAV.findIndex((item) => {
    if (item.href && pathname === item.href) return true;
    if (item.children) {
      return item.children.some((c) => pathname === c.href || pathname.startsWith(c.href));
    }
    return false;
  });

  const closeAll = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  useClickOutside(navRef, closeAll);

  useEffect(() => {
    setMobileOpen(false);
    closeAll();
  }, [pathname, closeAll]);

  return (
    <div
      ref={navRef}
      style={{ zIndex: NAV_Z_INDEX }}
      className="sticky top-0 shadow-sm bg-white/95 backdrop-blur-md border-b border-gray-200"
    >
      <div className="text-slate-800 relative z-10">
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
              className="object-contain h-14 w-auto drop-shadow-sm"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 340, damping: 18, mass: 0.6 }}
              draggable={false}
            />
          </Link>

          <div className="md:hidden flex items-center gap-3">
            <LinktreeIcon />
            <button
              aria-label="Toggle menu"
              type="button"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="block w-6 h-0.5 bg-slate-600 mb-1" />
              <span className="block w-6 h-0.5 bg-slate-600 mb-1" />
              <span className="block w-6 h-0.5 bg-slate-600" />
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-1 relative">
            {/* Simple highlight background */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-lg pointer-events-none z-0 bg-blue-100/60"
              animate={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {NAV.map((item, i) => {
              const isOpen = openDropdown === item.label;

              return (
                <div
                  key={item.label}
                  ref={(el) => {
                    navRefs.current[i] = el;
                  }}
                  className="relative z-10"
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                >
                  {item.children ? (
                    <NavbarDropdown
                      item={item}
                      isOpen={isOpen}
                      active={i === activeIndex}
                      onToggle={() => setOpenDropdown(isOpen ? null : item.label)}
                    />
                  ) : (
                    <NavbarItem item={item} active={i === activeIndex} />
                  )}
                </div>
              );
            })}

            <div
              ref={(el) => {
                navRefs.current[NAV.length] = el;
              }}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
              className="relative z-10 ml-2"
            >
              <LinktreeIcon />
            </div>
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          className="md:hidden border-t border-gray-200 bg-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container-base py-4 space-y-1">
            {NAV.map((item) => (
              <div key={item.label}>
                {item.children ? <MobileDropdown item={item} /> : <MobileNavItem item={item} />}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
