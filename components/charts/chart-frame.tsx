import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type LegendKey = {
  label: string;
  /** "solid" e "dashed" per le linee, "dot" per i punti. */
  mark: "solid" | "dashed" | "dot";
  tone: "data" | "muted";
};

/* Anatomia condivisa: legenda, area del disegno, didascalia.
   La legenda sta fuori dall'SVG per restare testo selezionabile e ridimensionabile. */
export function ChartFrame({
  title,
  legend,
  caption,
  children,
  minWidth,
  className,
}: {
  /** Descrizione testuale per screen reader e per chi non vede l'immagine. */
  title: string;
  legend?: LegendKey[];
  caption: string;
  children: ReactNode;
  /** Larghezza minima del disegno, sotto la quale scorre in orizzontale. */
  minWidth: string;
  className?: string;
}) {
  return (
    <figure className={cn("flex min-w-0 flex-col gap-6", className)}>
      {legend && legend.length > 0 ? (
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {legend.map((key) => (
            <li key={key.label} className="flex items-center gap-2.5">
              <LegendMark mark={key.mark} tone={key.tone} />
              <span className="eyebrow text-ink-soft">{key.label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Il testo dentro un SVG si rimpicciolisce insieme al viewBox: sotto una
          certa larghezza le etichette diventano illeggibili. Meglio far scorrere
          il disegno che consegnare un grafico che non si legge. */}
      <div className="-mx-5 w-[calc(100%+2.5rem)] overflow-x-auto px-5 sm:mx-0 sm:w-full sm:px-0">
        <div role="img" aria-label={title} style={{ minWidth }}>
          {children}
        </div>
      </div>

      <figcaption className="max-w-sm font-mono text-xs leading-relaxed text-ink-faint">
        {caption}
      </figcaption>
    </figure>
  );
}

/* Il testo non indossa mai il colore del dato: l'identita' la porta
   il segno colorato accanto all'etichetta. */
function LegendMark({ mark, tone }: Pick<LegendKey, "mark" | "tone">) {
  const color = tone === "data" ? "var(--color-ochre)" : "var(--color-ink-soft)";

  if (mark === "dot") {
    return (
      <span
        aria-hidden="true"
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
    );
  }

  return (
    <svg aria-hidden="true" width="22" height="2" viewBox="0 0 22 2" className="shrink-0">
      <line
        x1="0"
        y1="1"
        x2="22"
        y2="1"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={mark === "dashed" ? "5 4" : undefined}
      />
    </svg>
  );
}
