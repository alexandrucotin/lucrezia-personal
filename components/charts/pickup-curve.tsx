import { ChartFrame, type LegendKey } from "./chart-frame";

/**
 * La curva del pick-up: come si muove la tariffa avvicinandosi alla data
 * di arrivo, su un calendario gestito contro uno a tariffa piatta.
 *
 * E' uno SCHEMA, non una misura: per questo gli assi non portano tacche
 * numeriche. Mettere dei valori suggerirebbe una precisione che non c'e'.
 * La forma delle due curve va validata da Lucrezia prima della pubblicazione.
 */

const PLOT = { left: 52, right: 600, top: 44, bottom: 254 };

/* Asse x lineare, da 120 giorni all'arrivo fino al giorno stesso. */
const TICKS = [
  { x: 52, label: "120 gg" },
  { x: 189, label: "90" },
  { x: 326, label: "60" },
  { x: 463, label: "30" },
  { x: 600, label: "arrivo" },
];

const GRID = [96, 148, 200];

const MANAGED =
  "M 52 204 C 120 199, 175 191, 230 176 C 300 157, 355 134, 415 110 C 480 84, 540 68, 600 60";
const FLAT = "M 52 180 L 527 175 C 550 175, 566 196, 578 215 C 587 229, 594 236, 600 240";

const legend: LegendKey[] = [
  { label: "Calendario gestito", mark: "solid", tone: "data" },
  { label: "Tariffa piatta, poi sconto", mark: "dashed", tone: "muted" },
];

export function PickupCurve({ className }: { className?: string }) {
  return (
    <ChartFrame
      title="Schema del comportamento della tariffa nei 120 giorni che precedono l'arrivo. Su un calendario gestito la tariffa cresce progressivamente avvicinandosi alla data. Su un calendario a tariffa piatta resta ferma per mesi e crolla nelle ultime due settimane. La distanza fra le due curve sotto data e' il revenue lasciato sul tavolo."
      legend={legend}
      minWidth="34rem"
      caption="Schema illustrativo del comportamento delle tariffe. Non sono i dati di un portafoglio reale."
      className={className}
    >
      <svg viewBox="0 0 640 320" className="w-full" aria-hidden="true">
        {/* Griglia e assi: filetti da 1px pieni, un passo sopra il fondo. */}
        <g stroke="var(--color-rule)" strokeWidth="1">
          {GRID.map((y) => (
            <line key={y} x1={PLOT.left} y1={y} x2={PLOT.right} y2={y} />
          ))}
        </g>
        <g stroke="var(--color-rule-strong)" strokeWidth="1">
          <line x1={PLOT.left} y1={PLOT.top} x2={PLOT.left} y2={PLOT.bottom} />
          <line x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.right} y2={PLOT.bottom} />
        </g>

        {/* Serie di riferimento: tratteggiata e neutra, non deve competere
            cromaticamente con il comportamento corretto. */}
        <path
          d={FLAT}
          fill="none"
          stroke="var(--color-ink-soft)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 5"
        />
        <path
          d={MANAGED}
          fill="none"
          stroke="var(--color-ochre)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Il divario sotto data e' il punto dell'intero grafico:
            e' letteralmente il titolo del sito, disegnato. */}
        <g stroke="var(--color-ink)" strokeWidth="1">
          <line x1="560" y1="68" x2="560" y2="199" />
          <line x1="555" y1="68" x2="565" y2="68" />
          <line x1="555" y1="199" x2="565" y2="199" />
        </g>
        <text x="546" y="122" textAnchor="end" className="fill-ink font-mono text-[11px]">
          revenue lasciato
        </text>
        <text x="546" y="136" textAnchor="end" className="fill-ink font-mono text-[11px]">
          sul tavolo
        </text>

        {/* Marcatori finali con anello nel colore del fondo, cosi' restano
            leggibili dove si sovrappongono alle linee. */}
        <circle cx="600" cy="60" r="4" fill="var(--color-ochre)" stroke="var(--color-paper)" strokeWidth="2" />
        <circle cx="600" cy="240" r="4" fill="var(--color-ink-soft)" stroke="var(--color-paper)" strokeWidth="2" />

        {TICKS.map((tick) => (
          <text
            key={tick.label}
            x={tick.x}
            y="276"
            textAnchor={tick.x === PLOT.left ? "start" : tick.x === PLOT.right ? "end" : "middle"}
            className="fill-ink-faint font-mono text-[11px]"
          >
            {tick.label}
          </text>
        ))}

        <text x={PLOT.left} y="306" className="fill-ink-faint font-mono text-[11px] tracking-[0.16em]">
          GIORNI ALL&apos;ARRIVO
        </text>
        <text
          x="20"
          y={PLOT.bottom}
          transform={`rotate(-90 20 ${PLOT.bottom})`}
          className="fill-ink-faint font-mono text-[11px] tracking-[0.16em]"
        >
          TARIFFA
        </text>
      </svg>
    </ChartFrame>
  );
}
