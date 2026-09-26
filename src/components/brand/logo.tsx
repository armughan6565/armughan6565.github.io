/**
 * Data Fold mark: a flat plane (the data as it is) beside a plane folding
 * away in perspective (the same data, reduced into a new dimension).
 * The silhouette also reads as an abstract "D". Pure vector — see /public/brand.
 */
export function LogoMark({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect x="3" y="4" width="12" height="24" rx="1" fill={inverse ? "#ffffff" : "#0b1220"} />
      <path d="M17.5 4.2 29 9v14l-11.5 4.8a.4.4 0 0 1-.5-.4V4.6a.4.4 0 0 1 .5-.4Z" fill={inverse ? "#2dd4bf" : "#0f766e"} />
    </svg>
  );
}

export function Logo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="size-7 shrink-0" inverse={inverse} />
      <span
        className={`font-sans text-[15px] leading-none tracking-[0.16em] ${inverse ? "text-white" : "text-ink"}`}
      >
        <span className="font-semibold">DATA</span>
        <span className="font-normal"> FOLD</span>
      </span>
    </span>
  );
}
