import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/site/breadcrumbs";
import { Display, Eyebrow, Lead, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

/**
 * Apertura delle pagine interne. Una scheda dati opzionale a lato tiene il
 * ritmo asimmetrico della home senza ripeterne il layout: le pagine interne
 * partono piu' strette e piu' dense.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  trail,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  trail: Crumb[];
  aside?: { k: string; v: string }[];
}) {
  return (
    <Section as="div" rhythm="loose" className="pt-10 sm:pt-12">
      <div className="shell">
        <Reveal>
          <Breadcrumbs trail={trail} />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal delay={0.04}>
              <Eyebrow>{eyebrow}</Eyebrow>
              <Display level={1} size="d2" className="mt-6">
                {title}
              </Display>
            </Reveal>
            {lead ? (
              <Reveal delay={0.1}>
                <Lead className="mt-8">{lead}</Lead>
              </Reveal>
            ) : null}
          </div>

          {aside ? (
            <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
              <dl className="border-t border-rule">
                {aside.map((row) => (
                  <div key={row.k} className="border-b border-rule py-4">
                    <dt className="eyebrow text-ink-faint">{row.k}</dt>
                    <dd className="mt-2 text-sm text-ink">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`measure-wide space-y-5 text-ink-soft ${className ?? ""}`}>{children}</div>;
}
