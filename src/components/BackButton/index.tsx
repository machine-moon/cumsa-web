import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

interface BackButtonProps {
  href: string;
  label?: string;
}

export default function BackButton({ href, label = "Back to Menu" }: BackButtonProps) {
  return (
    <div className="mb-6">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 hover:shadow-md transition-all duration-200 ease-in-out"
      >
        <IoArrowBack className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
        {label}
      </Link>
    </div>
  );
}
