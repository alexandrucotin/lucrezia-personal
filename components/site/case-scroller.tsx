"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { CaseStudy } from "@/lib/content/proof";

/**
 * I casi studio su un asse orizzontale. Sono elementi pari fra loro, quindi
 * la lettura laterale e' quella giusta — ed e' l'unico punto del sito che
 * si legge in orizzontale, il che e' esattamente il motivo per cui c'e'.
 *
 * Due vincoli imparati rompendoli:
 *
 * 1. La scheda e' larga meta' traccia, non una misura fissa. Con una misura
 *    fissa, su schermi larghi l'eccedenza scendeva sotto la larghezza di una
 *    scheda: i pulsanti avanzavano di un passo e si bloccavano, e lo snap
 *    obbligatorio non aveva una posizione raggiungibile su cui agganciarsi.
 *    A meta' traccia l'eccedenza e' sempre esattamente una scheda, a
 *    qualsiasi larghezza di schermo.
 *
 * 2. L'avanzamento si misura sullo scorrimento, non contando le schede. Con
 *    tre schede e due visibili esistono due posizioni, non tre: un indicatore
 *    a tre segmenti non poteva mai riempirsi.
 */
export function CaseScroller({ items }: { items: CaseStudy[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(true);

  const read = useCallback(() => {
    const node = track.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setScrollable(max > 4);
    setProgress(max > 0 ? node.scrollLeft / max : 0);
    setAtStart(node.scrollLeft <= 1);
    setAtEnd(node.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    const node = track.current;
    if (!node) return;

    /* Nessun throttling con requestAnimationFrame: sono tre letture di
       proprieta' gia' calcolate, e se rAF non gira i pulsanti resterebbero
       bloccati sullo stato iniziale mentre la traccia si e' gia' mossa. */
    read();
    node.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);

    return () => {
      node.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [read]);

  /**
   * Il comando calcola una posizione assoluta e si assicura di arrivarci.
   *
   * `scrollBy` con `behavior: "smooth"` puo' non fare assolutamente nulla:
   * con lo snap obbligatorio, con reduced-motion attivo, o in contesti
   * automatizzati. Su un comando primario un no-op silenzioso e' peggio di
   * un movimento brusco, quindi l'animazione e' un di piu': se dopo 400ms
   * la posizione non e' quella richiesta, ci si arriva di scatto.
   */
  const go = (direction: -1 | 1) => {
    const node = track.current;
    if (!node) return;

    const card = node.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 32 : node.clientWidth;
    const max = node.scrollWidth - node.clientWidth;
    const target = Math.min(max, Math.max(0, node.scrollLeft + direction * step));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.scrollLeft = target;
      read();
      return;
    }

    node.scrollTo({ left: target, behavior: "smooth" });
    window.setTimeout(() => {
      if (Math.abs(node.scrollLeft - target) > 4) node.scrollLeft = target;
      read();
    }, 400);
  };

  /* Trascinamento col mouse: dito e touchpad scorrono gia' da soli. */
  const drag = useRef<{ x: number; left: number } | null>(null);

  return (
    <div>
      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-label="Casi studio, scorrimento orizzontale"
        className="flex cursor-grab snap-x snap-mandatory gap-8 overflow-x-auto pb-2 active:cursor-grabbing [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper/60 [&::-webkit-scrollbar]:hidden"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") return;
          drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft };
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          event.currentTarget.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerLeave={() => {
          drag.current = null;
        }}
      >
        {items.map((item) => (
          <article
            key={item.slug}
            className="w-[85vw] shrink-0 snap-start border-t border-paper/25 pt-8 sm:w-[calc(50%-1rem)]"
          >
            {/* Il contenuto resta su misura leggibile anche quando la scheda
                diventa larga su schermi grandi. */}
            <div className="max-w-[32rem]">
              <p className="display text-d3">{item.client}</p>
              <p className="eyebrow tnum mt-4 text-paper/50">
                {item.units} unità · {item.market}
              </p>
              <p className="eyebrow mt-1 text-paper/50">Orizzonte {item.horizon}</p>

              <p className="mt-8 text-paper/85">{item.problem}</p>
              <p className="mt-4 text-sm text-paper/55">{item.action}</p>

              {item.quote ? (
                <blockquote className="mt-8 border-l border-paper/30 pl-5 text-sm text-paper/70 italic">
                  &laquo;{item.quote}&raquo;
                </blockquote>
              ) : null}

              <dl className="mt-10 border-t border-paper/15 pt-6">
                {item.results.map((result) => (
                  <div
                    key={result.label}
                    className="flex items-baseline justify-between gap-6 border-b border-paper/15 py-3"
                  >
                    <dt className="text-xs text-paper/55">{result.label}</dt>
                    <dd className="display tnum text-d4 leading-none text-paper">{result.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>

      {scrollable ? (
        <div className="mt-10 flex items-center justify-between gap-8 pr-[clamp(1.25rem,5vw,4rem)]">
          <div className="h-px flex-1 bg-paper/25" aria-hidden="true">
            <div
              className="h-px bg-paper transition-[width] duration-200 ease-out"
              style={{ width: `${Math.max(8, progress * 100)}%` }}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={atStart}
              aria-label="Caso precedente"
              className="flex size-11 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-paper disabled:opacity-30"
            >
              <span aria-hidden="true">&larr;</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={atEnd}
              aria-label="Caso successivo"
              className="flex size-11 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-paper disabled:opacity-30"
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
