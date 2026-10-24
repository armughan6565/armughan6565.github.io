"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { domainOrder, domains, servicesByDomain } from "@/content/services";

const primaryNav = [
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const openSoon = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const solid = scrolled || megaOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[var(--dur-base)] ${
        solid ? "border-b border-line bg-white/90 backdrop-blur-md" : "border-b border-line bg-white" /* always opaque: heroes are dark photography */
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-small focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label="Data Fold — home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li onMouseEnter={openSoon} onMouseLeave={closeSoon}>
              <button
                ref={triggerRef}
                type="button"
                aria-expanded={megaOpen}
                aria-controls="mega-services"
                // Mouse: hover already opened it, so a click must not close it.
                // Keyboard (detail === 0): toggle.
                onClick={(e) => (e.detail === 0 ? setMegaOpen((o) => !o) : openSoon())}
                className={`flex h-10 items-center gap-1.5 px-3.5 text-small transition-colors hover:text-teal ${
                  isActive("/services") ? "text-teal" : "text-ink"
                }`}
              >
                Services
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className={`size-3.5 transition-transform duration-[var(--dur-base)] ${megaOpen ? "rotate-180" : ""}`}
                />
              </button>
            </li>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative flex h-10 items-center px-3.5 text-small transition-colors hover:text-teal ${
                    isActive(item.href) ? "text-teal" : "text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-teal transition-transform duration-[var(--dur-base)] ease-out ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <ButtonLink href="/contact" className="!h-10 !px-5">
              Start a Conversation
            </ButtonLink>
          </span>
          <button
            type="button"
            className="-mr-2 grid size-11 place-items-center text-ink lg:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
            onClick={() => dialogRef.current?.showModal()}
          >
            <Menu strokeWidth={1.5} className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ---------- Mega menu (desktop) ---------- */}
      <div
        id="mega-services"
        onMouseEnter={openSoon}
        onMouseLeave={closeSoon}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setMegaOpen(false);
        }}
        inert={!megaOpen}
        className={`absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-lg transition-[opacity,transform] duration-[var(--dur-base)] ease-out lg:block ${
          megaOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="container-x grid grid-cols-12 gap-10 py-10">
          <div className="col-span-3 flex flex-col justify-between border-r border-line pr-10">
            <div>
              <p className="eyebrow">Services</p>
              <p className="mt-4 text-h4 text-ink">
                Nine service lines across three disciplines — working on the same problem.
              </p>
            </div>
            <Link
              href="/services"
              className="group mt-8 inline-flex items-center gap-2 text-small text-teal"
            >
              <span className="link-underline">Explore the service ecosystem</span>
              <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          {domainOrder.map((d) => (
            <div key={d} className="col-span-3">
              <p className="eyebrow">
                <span className="text-ink">{domains[d].name}</span> — {domains[d].line}
              </p>
              <ul className="mt-5 space-y-1">
                {servicesByDomain(d).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group -mx-3 block rounded-sm px-3 py-2.5 transition-colors hover:bg-canvas"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-label text-subtle group-hover:text-teal">{s.number}</span>
                        <span className="text-body font-medium text-ink">{s.name}</span>
                      </span>
                      <span className="mt-1 block pl-8 text-caption text-muted">{s.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Mobile menu: native modal dialog gives focus trap + Esc ---------- */}
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        // Close on any link click (covers links to the current page, where pathname doesn't change)
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) dialogRef.current?.close();
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-white p-0 backdrop:bg-ink/30 open:flex open:flex-col"
      >
        <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line">
          <Link href="/" aria-label="Data Fold — home">
            <Logo />
          </Link>
          <button
            type="button"
            className="-mr-2 grid size-11 place-items-center"
            aria-label="Close menu"
            onClick={() => dialogRef.current?.close()}
          >
            <X strokeWidth={1.5} className="size-6" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto py-6">
          <details className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-h3 [&::-webkit-details-marker]:hidden">
              Services
              <ChevronDown aria-hidden="true" strokeWidth={1.5} className="size-5 transition-transform group-open:rotate-180" />
            </summary>
            <div className="space-y-6 pb-6">
              {domainOrder.map((d) => (
                <div key={d}>
                  <p className="eyebrow">{domains[d].name}</p>
                  <ul className="mt-2">
                    {servicesByDomain(d).map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="flex items-baseline gap-3 py-2 text-body">
                          <span className="font-mono text-label text-subtle">{s.number}</span>
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link href="/services" className="inline-flex items-center gap-2 text-small text-teal">
                All services <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </Link>
            </div>
          </details>
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-4 text-h3 ${isActive(item.href) ? "text-teal" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-x shrink-0 border-t border-line py-5">
          <ButtonLink href="/contact" className="w-full">
            Start a Conversation
          </ButtonLink>
        </div>
      </dialog>
    </header>
  );
}
