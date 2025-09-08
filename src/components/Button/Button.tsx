import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  variant?: "primary" | "outline";
  className?: string;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ variant = "primary", className = "", children, ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const styles =
    variant === "primary"
      ? "bg-[var(--blue)] text-white hover:opacity-90 focus-visible:ring-[var(--blue)] ring-offset-[var(--surface)] px-4 py-2"
      : "border border-black/10 bg-[var(--surface)] text-[var(--foreground)] hover:bg-black/5 focus-visible:ring-[var(--blue)] ring-offset-[var(--surface)] px-4 py-2";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
