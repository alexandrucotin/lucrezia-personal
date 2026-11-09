"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ActionLink } from "@/components/ui/action";
import { cn } from "@/lib/utils";
import type { NavItem, Site } from "@/lib/content/tipi";

export function Header({
  site,
  nav,
  pulsante,
  pulsanteMobile,
}: {
  site: Pick<Site, "name" | "tagline" | "email" | "phone" | "phoneHref">;
  nav: NavItem[];
  pulsante: string;
  pulsanteMobile: string;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-paper/85 backdrop-blur-md transition-colors duration-300",
        scrolled ? "border-b border-rule" : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-20 items-center justify-between gap-8">
        <Link href="/" className="group flex items-baseline gap-3" aria-label={site.name}>
          <span className="display text-[1.375rem] leading-none tracking-tight">{site.name}</span>
          <span className="eyebrow hidden text-ink-faint transition-colors group-hover:text-sage sm:block">
            {site.tagline}
          </span>
        </Link>

        <nav aria-label="Navigazione principale" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "eyebrow py-2 transition-colors",
                  active ? "text-sage" : "text-ink hover:text-sage",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ActionLink href="/contatti" className="hidden px-6 py-3 lg:inline-flex">
            {pulsante}
          </ActionLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="eyebrow -mr-2 flex h-11 items-center gap-2 px-2 text-ink lg:hidden"
          >
            {open ? "Chiudi" : "Menu"}
            <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
              <span
                className={cn(
                  "h-px w-full bg-ink transition-transform duration-300 ease-editorial",
                  open && "translate-y-[2px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-ink transition-transform duration-300 ease-editorial",
                  open && "-translate-y-[2px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Overlay mobile: pagina piena, niente drawer che scivola. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 z-40 flex flex-col justify-between overflow-y-auto bg-paper lg:hidden"
      >
        <nav aria-label="Navigazione principale" className="shell flex flex-col pt-6">
          {nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-5 border-b border-rule py-6"
            >
              <span className="eyebrow tnum text-ink-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="display text-d3">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="shell space-y-6 py-10">
          <ActionLink href="/contatti" onClick={() => setOpen(false)} className="w-full">
            {pulsanteMobile}
          </ActionLink>
          <div className="space-y-1 text-sm text-ink-soft">
            <p>
              <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                {site.email}
              </a>
            </p>
            <p>
              <a href={`tel:${site.phoneHref}`} className="underline underline-offset-4">
                {site.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
