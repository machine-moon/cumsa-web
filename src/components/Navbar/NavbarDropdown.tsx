import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { NavItem } from "./navData";
import { NAV_Z_INDEX } from "./helpers";

interface NavbarDropdownProps {
  item: NavItem;
  isOpen: boolean;
  active?: boolean;
  onToggle: () => void;
}

export default function NavbarDropdown({ item, isOpen, active, onToggle }: NavbarDropdownProps) {
  return (
    <div className="relative">
      {/* show a small blue block when active */}
      {active && (
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-blue-600 z-0" />
      )}

      <button
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 relative z-20 font-medium
          ${isOpen ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}
        `}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span>{item.label}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FaChevronDown className="w-3 h-3" aria-hidden />
        </motion.div>
      </button>

      {isOpen && (
        <motion.div
          className="absolute left-0 top-full mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black/5 py-1 border border-gray-100"
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          style={{ zIndex: NAV_Z_INDEX + 1 }}
        >
          {(item.children ?? []).map((child) => (
            <DropdownItem key={child.href} child={child} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

interface DropdownItemProps {
  child: { label: string; href: string };
}

function DropdownItem({ child }: DropdownItemProps) {
  const itemClass =
    "block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 rounded-md mx-2 my-1";

  if (child.href.startsWith("http")) {
    return (
      <a href={child.href} target="_blank" rel="noopener noreferrer" className={itemClass}>
        {child.label}
      </a>
    );
  }

  return (
    <Link href={child.href}>
      <div className={itemClass}>{child.label}</div>
    </Link>
  );
}

interface MobileDropdownProps {
  item: NavItem;
}

export function MobileDropdown({ item }: MobileDropdownProps) {
  return (
    <details className="group">
      <summary className="list-none flex items-center justify-between py-2 cursor-pointer">
        <span>{item.label}</span>
        <FaChevronDown className="w-4 h-4 transition group-open:rotate-180" aria-hidden />
      </summary>
      <div className="pl-4 pb-2 space-y-1">
        {(item.children ?? []).map((child) => (
          <MobileDropdownItem key={child.href} child={child} />
        ))}
      </div>
    </details>
  );
}

function MobileDropdownItem({ child }: { child: { label: string; href: string } }) {
  if (child.href.startsWith("http")) {
    return (
      <a
        href={child.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-1 hover:text-[var(--blue)]"
      >
        {child.label}
      </a>
    );
  }

  return (
    <Link href={child.href} className="block py-1 hover:text-[var(--blue)]">
      {child.label}
    </Link>
  );
}
