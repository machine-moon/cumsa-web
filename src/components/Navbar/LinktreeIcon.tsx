import { FaTree } from "react-icons/fa";
import { LINKS } from "@/lib/constants";

export default function LinktreeIcon() {
  return (
    <a
      href={LINKS.linktree}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Linktree"
      className="ml-2 p-2 rounded-full hover:bg-green-100 transition-base text-green-700 hover:text-green-800 z-10"
    >
      <FaTree className="w-5 h-5" />
    </a>
  );
}
