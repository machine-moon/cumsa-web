"use client";
import { useEffect, useRef } from "react";
import { SECRET_SECTIONS } from "./footerData";

interface SecretMenuProps {
  anchorRef: React.RefObject<HTMLElement | HTMLAnchorElement | null>;
  onClose: () => void;
}

export default function SecretMenu({ anchorRef, onClose }: SecretMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      if (anchorRef.current && anchorRef.current.contains(e.target as Node)) return;
      onClose();
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [onClose, anchorRef]);

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Secret footer menu"
      className="absolute z-50 bottom-10 left-0 w-72 max-h-[70vh] overflow-y-auto rounded-lg border border-black/10 bg-white shadow-lg p-3 flex flex-col gap-4 text-sm animate-fadeIn"
    >
      {SECRET_SECTIONS.map((section) => (
        <div key={section.title} className="space-y-2">
          <div className="font-semibold text-[var(--navy)] text-xs uppercase tracking-wide opacity-80">
            {section.title}
          </div>
          <div className="space-y-1">
            {section.links?.map((l) => (
              <MenuLink key={l.href} {...l} />
            ))}
            {section.groups?.map((g) => (
              <DetailsGroup key={g.label} label={g.label} links={g.links} />
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={onClose}
        className="mt-1 self-end text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
      >
        Close
      </button>
    </div>
  );
}

function MenuLink({ label, href, external }: { label: string; href: string; external?: boolean }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded px-2 py-1 hover:bg-[var(--blue)]/10 hover:text-[var(--blue)]"
      >
        {label}
      </a>
    );
  }
  return (
    <a
      href={href}
      className="block rounded px-2 py-1 hover:bg-[var(--blue)]/10 hover:text-[var(--blue)]"
    >
      {label}
    </a>
  );
}

function DetailsGroup({
  label,
  links,
}: {
  label: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <details className="group border rounded">
      <summary className="list-none cursor-pointer select-none px-2 py-1 flex items-center justify-between">
        <span>{label}</span>
        <span className="transition group-open:rotate-90 text-xs">▶</span>
      </summary>
      <div className="pb-2">
        {links.map((l) => (
          <MenuLink key={l.href} {...l} />
        ))}
      </div>
    </details>
  );
}
