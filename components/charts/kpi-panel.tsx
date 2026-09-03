import { ChartFrame } from "./chart-frame";

/**
 * Frammento della dashboard che viene consegnata: quattro tessere, ognuna
 * con valore, scostamento e sparkline.
 *
 * Costruito in HTML e non in SVG: il testo resta testo, quindi non si
 * rimpicciolisce col viewBox e resta selezionabile.
 *
 * Il valore e' in Inter e non in Fraunces, al contrario dei numeri del sito:
 * qui stiamo mostrando uno strumento, non un titolo, e la differenza di
 * carattere e' il modo piu' rapido di dirlo.
 */

type Tile = {
  label: string;
  value: string;
  delta: string;
  /** Dodici punti, il piu' recente per ultimo. */
  trend: number[];
};

/* MOCK — valori dimostrativi, servono a mostrare la forma del deliverable. */
const TILES: Tile[] = [
  { label: "RevPAR", value: "68 €", delta: "+14%", trend: [38, 41, 39, 44, 48, 46, 52, 57, 55, 61, 64, 68] },
  { label: "ADR", value: "112 €", delta: "+6%", trend: [96, 98, 97, 101, 104, 102, 106, 108, 107, 110, 111, 112] },
  { label: "Occupancy", value: "61%", delta: "+5 pt", trend: [40, 43, 41, 45, 47, 46, 50, 53, 52, 56, 58, 61] },
  { label: "Pick-up 30 gg", value: "74", delta: "+9%", trend: [52, 55, 51, 58, 61, 59, 64, 66, 63, 69, 71, 74] },
];

function Sparkline({ points }: { points: number[] }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const step = 120 / (points.length - 1);

  const coords = points.map((value, index) => ({
    x: index * step,
    y: 28 - ((value - min) / span) * 26,
  }));

  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ");
  const last = coords[coords.length - 1];
  const previous = coords[coords.length - 2];

  return (
    <svg viewBox="0 0 126 32" className="mt-4 h-8 w-full" aria-hidden="true">
      <path d={line} fill="none" stroke="var(--color-ink-faint)" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Il periodo corrente nell'accento: il resto della serie resta in secondo piano. */}
      <path
        d={`M ${previous.x.toFixed(1)} ${previous.y.toFixed(1)} L ${last.x.toFixed(1)} ${last.y.toFixed(1)}`}
        fill="none"
        stroke="var(--color-ochre)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx={last.x} cy={last.y} r="2.5" fill="var(--color-ochre)" />
    </svg>
  );
}

export function KpiPanel({ className }: { className?: string }) {
  return (
    <ChartFrame
      title="Frammento di dashboard con quattro indicatori: RevPAR 68 euro in crescita del 14 per cento, ADR 112 euro più 6 per cento, occupancy 61 per cento più 5 punti, pick-up a 30 giorni 74 notti più 9 per cento. Ogni indicatore mostra l'andamento degli ultimi dodici periodi."
      minWidth="18rem"
      caption="Esempio della dashboard consegnata a fine progetto. Valori dimostrativi, non risultati di un cliente."
      className={className}
    >
      <div className="grid grid-cols-2 gap-px bg-rule">
        {TILES.map((tile) => (
          <div key={tile.label} className="bg-surface p-5">
            <p className="eyebrow text-ink-faint">{tile.label}</p>
            <div className="mt-3 flex items-baseline gap-2.5">
              <span className="tnum text-2xl font-semibold tracking-tight text-ink">{tile.value}</span>
              {/* Freccia esplicita: la direzione non e' affidata al solo colore. */}
              <span className="tnum font-mono text-xs text-sage-deep">&#9650; {tile.delta}</span>
            </div>
            <Sparkline points={tile.trend} />
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}
