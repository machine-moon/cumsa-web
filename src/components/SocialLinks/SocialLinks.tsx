import { FaInstagram, FaYoutube, FaDiscord } from "react-icons/fa";
import { LINKS } from "@/lib/constants";

type Props = {
  className?: string;
  linkClassName?: string;
  size?: number;
};

export default function SocialLinks({
  className = "",
  linkClassName = "hover:text-[var(--blue)] transition-base",
  size = 18,
}: Props) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        aria-label="Instagram"
        href={LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <FaInstagram size={size} />
      </a>
      <a
        aria-label="YouTube"
        href={LINKS.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <FaYoutube size={size} />
      </a>
      <a
        aria-label="Discord"
        href={LINKS.discord}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <FaDiscord size={size} />
      </a>
    </div>
  );
}
