import Link from "next/link";
import BrandLogo from "../BrandLogo/BrandLogo";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services/prayer", label: "Prayers" },
  { href: "/services/chaplaincy", label: "Chaplaincy" },
  { href: "/services/roommate", label: "Roommate" },
  { href: "/services/new-muslims", label: "New Muslims" },
  { href: "/documents", label: "Documents" },
  { href: "/donate", label: "Donate" },
  { href: "/contact-us", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="w-full bg-white/90 backdrop-blur border-b border-black/10 sticky top-0 z-50">
      <div className="container-base flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo className="h-8 w-auto" />
        </Link>
        <ul className="flex gap-4 items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-[var(--navy)] hover:text-[var(--blue)] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
