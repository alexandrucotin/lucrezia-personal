"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { CaseStudy } from "@/lib/content/proof";
import { cn } from "@/lib/utils";

/**
 * I casi studio su un asse orizzontale. Sono elementi pari fra loro, quindi
 * la lettura laterale e' quella giusta — ed e' l'unico punto del sito che
 * si legge in orizzontale, il che e' esattamente il motivo per cui c'e'.
 *
 * Scorrimento nativo con snap: trascinamento e tasti sono aggiunte, non
 * la base. Senza JavaScript la fascia resta comunque scorribile.
 */
export function CaseScroller({ items }: { items: CaseStudy[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const step = useCallback(() => {
    const node = track.current;
    if (!node) return 0;
    const first = node.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + 32 : node.clientWidth;
  }, []);

  useEffect(() => {
    const node = track.current;
    if (!node) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const size = step();
        if (size > 0) setIndex(Math.round(node.scrollLeft / size));
      });
    };

    node.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("scroll", onScroll);
    };
  }, [step]);

  const go = (direction: -1 | 1) => {
    const node = track.current;
    if (!node) return;
    node.scrollBy({ left: direction * step(), behavior: "smooth" });
  };

  /* Trascinamento col mouse: il touchpad e il dito scorrono gia' da soli. */
  const drag = useRef<{ x: number; left: number } | null>(null);

  return (
    <div>
      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-label="Casi studio, scorrimento orizzontale"
        className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper/60 [&::-webkit-scrollbar]:hidden"
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
            className="w-[85vw] shrink-0 snap-start border-t border-paper/25 pt-8 sm:w-[34rem]"
          >
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
          </article>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between gap-8 pr-[clamp(1.25rem,5vw,4rem)]">
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {items.map((item, position) => (
            <span
              key={item.slug}
              className={cn(
                "h-px flex-1 transition-colors duration-300",
                position === index ? "bg-paper" : "bg-paper/25",
              )}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Caso precedente"
            className="flex size-11 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-paper disabled:opacity-30"
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === items.length - 1}
            aria-label="Caso successivo"
            className="flex size-11 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-paper disabled:opacity-30"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
