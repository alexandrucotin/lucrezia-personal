import Link from "next/link";

import { nav, site } from "@/lib/site";
import { services } from "@/lib/content";
import { generale } from "@/lib/content";

const legalNav = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookie", label: "Cookie" },
];

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper-deep">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="display text-d3 leading-none">{site.name}</p>
            <p className="eyebrow mt-4 text-sage">{site.role}</p>
            <p className="measure mt-6 text-sm text-ink-soft">
              {generale.footer.descrizione} {site.markets.slice(0, 3).join(", ")} e remoto.
            </p>
          </div>

          <nav aria-label="Pagine" className="text-sm">
            <p className="eyebrow text-ink-faint">Sito</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink transition-colors hover:text-sage">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contatti" className="text-ink transition-colors hover:text-sage">
                  Contatti
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Servizi" className="text-sm">
            <p className="eyebrow text-ink-faint">Servizi</p>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servizi/${service.slug}`}
                    className="text-ink transition-colors hover:text-sage"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-rule pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1 text-sm">
            <p>
              <a
                href={`mailto:${site.email}`}
                className="underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-ink"
              >
                {site.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${site.phoneHref}`}
                className="tnum underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-ink"
              >
                {site.phone}
              </a>
            </p>
            <p>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-ink"
              >
                LinkedIn
              </a>
            </p>
          </div>

          <div className="space-y-2 text-xs text-ink-faint sm:text-right">
            <p className="tnum">
              {site.legal.entity} — P. IVA {site.legal.vat} — {site.legal.city}
            </p>
            <p className="flex gap-4 sm:justify-end">
              {legalNav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              ))}
              <span>&copy; {new Date().getFullYear()}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
