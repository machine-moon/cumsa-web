import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
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
        aria-label="Facebook"
        href={LINKS.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <FaFacebookF size={size} />
      </a>
      <a
        aria-label="Twitter"
        href={LINKS.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <FaTwitter size={size} />
      </a>
      <a
        aria-label="Instagram"
        href={LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <FaInstagram size={size} />
      </a>
    </div>
  );
}
