import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type StatItem = {
  value: string;
  label: string;
  note?: string;
};

/* I numeri sono l'elemento grafico portante del sito: grandi, in serif,
   a cifre tabellari. Fanno da prova e da identita' visiva insieme. */
export function Stat({ value, label, note, className }: StatItem & { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="display tnum text-d2 leading-none">{value}</span>
      <span className="text-sm font-medium text-ink">{label}</span>
      {note ? <span className="text-xs text-ink-faint">{note}</span> : null}
    </div>
  );
}

/* Riga di statistiche separate da filetti verticali da 1px.
   Su mobile diventa una griglia 2x2, i filetti si adattano. */
export function StatRow({ items, className }: { items: readonly StatItem[]; className?: string }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-8 gap-y-10 border-t border-rule pt-10 md:grid-cols-4 md:gap-x-0",
        className,
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cn("md:px-8", index === 0 ? "md:pl-0" : "md:border-l md:border-rule")}
        >
          <dd className="display tnum text-d2 leading-none">{item.value}</dd>
          <dt className="mt-3 text-sm font-medium text-ink">{item.label}</dt>
          {item.note ? <p className="mt-1 text-xs text-ink-faint">{item.note}</p> : null}
        </div>
      ))}
    </dl>
  );
}

/* Coppia etichetta/valore in monospace: il registro "scheda tecnica".
   Usata nelle specifiche dei servizi e nelle schede dei casi studio. */
export function DataRow({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[9rem_1fr] gap-4 border-b border-rule py-4 text-sm sm:grid-cols-[12rem_1fr]",
        className,
      )}
    >
      <dt className="eyebrow pt-1 text-ink-faint">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}
