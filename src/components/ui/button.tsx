import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse" | "text";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap font-medium transition-[color,background-color,border-color] duration-[var(--dur-fast)] ease-out disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Teal fill wipes in from the left on hover — the "fold" gesture.
  primary:
    "h-12 rounded-sm bg-ink px-6 text-small text-white before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-teal before:transition-transform before:duration-[var(--dur-base)] before:ease-out hover:before:scale-x-100",
  secondary:
    "h-12 rounded-sm border border-line-strong bg-white px-6 text-small text-ink hover:border-ink",
  inverse:
    "h-12 rounded-sm bg-white px-6 text-small text-ink before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-teal-soft before:transition-transform before:duration-[var(--dur-base)] before:ease-out hover:before:scale-x-100",
  text: "text-small text-ink hover:text-teal",
};

function Inner({ children, arrow }: { children: ReactNode; arrow: boolean }) {
  return (
    <>
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="relative size-4 transition-transform duration-[var(--dur-base)] ease-out group-hover:translate-x-1"
        />
      )}
    </>
  );
}

type Common = { variant?: Variant; arrow?: boolean; className?: string; children: ReactNode };

export function ButtonLink({
  href,
  variant = "primary",
  arrow = true,
  className = "",
  children,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function Button({
  variant = "primary",
  arrow = false,
  className = "",
  children,
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
