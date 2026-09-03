import { ChartFrame, type LegendKey } from "./chart-frame";

/**
 * La matrice del portafoglio: ogni punto e' un'unita', posizionata su
 * occupancy e ADR. Serve a rendere visibile il fatto che dentro una media
 * aggregata convivono appartamenti che finanziano l'azienda e appartamenti
 * che le costano.
 *
 * Schema concettuale: nessuna tacca numerica sugli assi, solo la direzione.
 */

const PLOT = { left: 64, right: 480, top: 44, bottom: 400 };
const MID = { x: 272, y: 222 };

/* Resto del portafoglio. */
const UNITS = [
  [120, 300],
  [150, 180],
  [196, 120],
  [210, 260],
  [250, 340],
  [300, 150],
  [330, 96],
  [360, 190],
  [410, 130],
  [440, 170],
] as const;

/* Quadrante in basso a destra: occupancy alta, ADR basso. Riempi il
   calendario e perdi margine — il caso che l'analisi fa emergere. */
const UNDERPRICED = [
  [320, 290],
  [355, 330],
  [400, 270],
  [430, 320],
] as const;

const QUADRANTS = [
  { x: 80, y: 66, anchor: "start", label: "Vuoto e caro" },
  { x: 464, y: 66, anchor: "end", label: "Ottimizzato" },
  { x: 80, y: 386, anchor: "start", label: "Da rivedere" },
  { x: 464, y: 386, anchor: "end", label: "Stai svendendo" },
] as const;

const legend: LegendKey[] = [
  { label: "Unità che erodono margine", mark: "dot", tone: "data" },
  { label: "Resto del portafoglio", mark: "dot", tone: "muted" },
];

export function PortfolioMatrix({ className }: { className?: string }) {
  return (
    <ChartFrame
      title="Matrice del portafoglio: ogni punto e' un'unita', posizionata secondo la sua occupancy sull'asse orizzontale e il suo ADR su quello verticale. I quattro quadranti sono: vuoto e caro in alto a sinistra, ottimizzato in alto a destra, da rivedere in basso a sinistra, stai svendendo in basso a destra. Le unita' nel quadrante in basso a destra riempiono il calendario erodendo il margine."
      legend={legend}
      minWidth="20rem"
      caption="Schema illustrativo. Nell'analisi ogni punto è un'unità reale del tuo portafoglio, posizionata sui suoi dati."
      className={className}
    >
      <svg viewBox="0 0 500 448" className="w-full" aria-hidden="true">
        <g stroke="var(--color-rule)" strokeWidth="1">
          <line x1={MID.x} y1={PLOT.top} x2={MID.x} y2={PLOT.bottom} />
          <line x1={PLOT.left} y1={MID.y} x2={PLOT.right} y2={MID.y} />
        </g>
        <g stroke="var(--color-rule-strong)" strokeWidth="1">
          <line x1={PLOT.left} y1={PLOT.top} x2={PLOT.left} y2={PLOT.bottom} />
          <line x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.right} y2={PLOT.bottom} />
        </g>

        {QUADRANTS.map((q) => (
          <text
            key={q.label}
            x={q.x}
            y={q.y}
            textAnchor={q.anchor}
            className="fill-ink-soft font-mono text-[11px] tracking-[0.14em]"
          >
            {q.label.toUpperCase()}
          </text>
        ))}

        {UNITS.map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="5"
            fill="var(--color-ink-soft)"
            stroke="var(--color-paper-deep)"
            strokeWidth="2"
          />
        ))}
        {UNDERPRICED.map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="5"
            fill="var(--color-ochre)"
            stroke="var(--color-paper-deep)"
            strokeWidth="2"
          />
        ))}

        <text
          x={PLOT.right}
          y="428"
          textAnchor="end"
          className="fill-ink-faint font-mono text-[11px] tracking-[0.16em]"
        >
          OCCUPANCY &rarr;
        </text>
        <text
          x="26"
          y={PLOT.bottom}
          transform={`rotate(-90 26 ${PLOT.bottom})`}
          className="fill-ink-faint font-mono text-[11px] tracking-[0.16em]"
        >
          ADR &rarr;
        </text>
      </svg>
    </ChartFrame>
  );
}
