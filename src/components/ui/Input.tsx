import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { className?: string };

export default function Input({ className = "", ...props }: Props) {
  return (
    <input
      className={`w-full rounded-md border border-black/10 bg-[var(--surface)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] ${className}`}
      {...props}
    />
  );
}
