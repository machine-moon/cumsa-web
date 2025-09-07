"use client";
import { useEffect, useRef, useState } from "react";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import SecretMenu from "./SecretMenu";

export default function Footer() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <footer className="relative mt-12 border-t border-black/10">
      <div className="bg-white">
        <div className="container-base py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex items-center gap-3">
            <span
              aria-hidden
              className="logo-mask-blue rounded-sm"
              style={{ width: 28, height: 28 }}
            />
            <div className="text-sm text-gray-700">
              <a
                ref={triggerRef}
                href="/release-notes"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen((o) => !o);
                }}
                className="hover:underline focus:underline outline-none cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={open}
              >
                © {new Date().getFullYear()} CUMSA
              </a>
            </div>
            {open && <SecretMenu anchorRef={triggerRef} onClose={() => setOpen(false)} />}
          </div>
          <SocialLinks className="text-[var(--navy)]" />
        </div>
      </div>
    </footer>
  );
}
