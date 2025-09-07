import Link from "next/link";
import { NavItem } from "./navData";

interface NavbarItemProps {
  item: NavItem;
  active: boolean;
}

export default function NavbarItem({ item, active }: NavbarItemProps) {
  if (!item.href) return null;

  return (
    <div className="relative inline-block">
      <Link
        href={item.href}
        className={`px-3 py-2 rounded-lg transition-colors duration-150 relative z-10 font-medium ${active ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
      >
        {item.label}
      </Link>

      {/* active indicator */}
      {active && (
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-blue-600 z-20" />
      )}
    </div>
  );
}

interface MobileNavItemProps {
  item: NavItem;
}

export function MobileNavItem({ item }: MobileNavItemProps) {
  if (item.href) {
    return (
      <Link
        href={item.href}
        className="block py-2 px-4 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
      >
        {item.label}
      </Link>
    );
  }
  return null;
}
