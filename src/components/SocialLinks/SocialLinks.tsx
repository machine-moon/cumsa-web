import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

const socials = [
  {
    href: "https://instagram.com/cumsacarleton",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://facebook.com/cumsacarleton",
    label: "Facebook",
    icon: FaFacebook,
  },
  {
    href: "mailto:info@cumsa.ca",
    label: "Email",
    icon: FaEnvelope,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-4">
      {socials.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-2xl text-[var(--blue)] hover:text-[var(--navy)] transition-colors"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
