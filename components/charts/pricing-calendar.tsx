import { ChartFrame } from "./chart-frame";

/**
 * Il calendario tariffario come heatmap: dodici mesi in riga, i giorni in
 * colonna, la cella tinta per fascia di prezzo.
 *
 * Rampa sequenziale a tinta unica, quattro passi, validata: luminosita'
 * monotona, salti visibili, estremo chiaro che stacca dal fondo.
 * Quattro fasce invece di cinque perche' su un calendario "bassa, media,
 * alta, picco" e' anche il modo in cui si ragiona davvero.
 */

const RAMP = ["#cea877", "#bd8a4b", "#a56a28", "#7d4d1c"];

const MONTHS = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];

/* Stagionalita' di riferimento per Verona e Lago di Garda. */
const SEASON = [0, 0, 1, 1, 2, 2, 3, 3, 2, 1, 0, 0];

const CELL = 12;
const PITCH = 14;
const GUTTER = 30;
const TOP = 20;

/**
 * Fascia di prezzo di un singolo giorno. Funzione pura: il grafico e'
 * generato al build e resta identico a ogni render.
 */
function band(month: number, day: number): number {
  let value = SEASON[month];

  /* Venerdi' e sabato salgono di una fascia. Anno di riferimento 2026. */
  const weekday = new Date(2026, month, day).getDay();
  if (weekday === 5 || weekday === 6) value += 1;

  /* Due finestre di domanda locale: Vinitaly ad aprile, mercatini a dicembre. */
  if (month === 3 && day >= 12 && day <= 16) value = 3;
  if (month === 11 && day >= 20) value = Math.max(value, 2);
  if (month === 7 && day <= 20) value = 3;

  return Math.min(value, RAMP.length - 1);
}

function daysIn(month: number): number {
  return new Date(2026, month + 1, 0).getDate();
}

export function PricingCalendar({ className }: { className?: string }) {
  const width = GUTTER + 31 * PITCH;
  const height = TOP + 12 * PITCH + 6;

  return (
    <ChartFrame
      title="Calendario tariffario su dodici mesi: ogni cella e' un giorno, tinta secondo la fascia di prezzo, dalla bassa stagione al picco. Le fasce alte si concentrano in luglio e agosto, sui weekend di tutto l'anno, nella settimana del Vinitaly ad aprile e nell'ultima decade di dicembre."
      scale={{ colors: RAMP, low: "Bassa", high: "Picco" }}
      minWidth="30rem"
      caption="Schema illustrativo su stagionalità di Verona e Lago di Garda. Il calendario reale si costruisce sui dati del portafoglio."
      className={className}
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" aria-hidden="true">
        {[1, 10, 20, 31].map((day) => (
          <text
            key={day}
            x={GUTTER + (day - 1) * PITCH + CELL / 2}
            y="12"
            textAnchor="middle"
            className="fill-ink-faint font-mono text-[10px]"
          >
            {day}
          </text>
        ))}

        {MONTHS.map((month, monthIndex) => (
          <g key={month}>
            <text
              x="0"
              y={TOP + monthIndex * PITCH + CELL - 2}
              className="fill-ink-faint font-mono text-[10px]"
            >
              {month}
            </text>
            {Array.from({ length: daysIn(monthIndex) }, (_, dayIndex) => (
              <rect
                key={dayIndex}
                x={GUTTER + dayIndex * PITCH}
                y={TOP + monthIndex * PITCH}
                width={CELL}
                height={CELL}
                fill={RAMP[band(monthIndex, dayIndex + 1)]}
              />
            ))}
          </g>
        ))}
      </svg>
    </ChartFrame>
  );
}
