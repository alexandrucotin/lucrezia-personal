import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/site/breadcrumbs";
import { Display, Section } from "@/components/ui/section";

/** Impaginazione sobria per i testi legali: misura stretta, niente decorazione. */
export function LegalPage({
  title,
  updated,
  trail,
  children,
}: {
  title: string;
  updated: string;
  trail: Crumb[];
  children: ReactNode;
}) {
  return (
    <Section rhythm="loose" className="pt-10 sm:pt-12">
      <div className="shell">
        <Breadcrumbs trail={trail} />
        <Display level={1} size="d2" className="mt-12 max-w-2xl">
          {title}
        </Display>
        <p className="eyebrow mt-6 text-ink-faint">Ultimo aggiornamento: {updated}</p>

        <div className="measure mt-14 space-y-8 text-ink-soft [&_a]:underline [&_a]:underline-offset-4 [&_h2]:display [&_h2]:mt-14 [&_h2]:text-d4 [&_h2]:text-ink [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </Section>
  );
}
