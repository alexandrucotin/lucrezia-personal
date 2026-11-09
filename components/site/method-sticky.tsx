"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Display, Eyebrow, Lead } from "@/components/ui/section";
import { TextLink } from "@/components/ui/action";
import { cn } from "@/lib/utils";
import type { Fase } from "@/lib/content/tipi";

/**
 * Metodo: colonna sinistra fissa che fa da indice e segue lo scroll,
 * fasi che scorrono a destra con il proprio diagramma dentro.
 *
 * Il numero grande e l'indice cambiano mentre si legge: e' l'unico punto
 * del sito in cui il layout reagisce alla posizione, ed e' la ragione per
 * cui questa sezione non somiglia a nessun'altra.
 */

const ACTIVE_LINE = 0.42;

export function MethodSticky({
  method,
  diagrams,
}: {
  method: Fase[];
  diagrams: (ReactNode | null)[];
}) {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      const line = window.innerHeight * ACTIVE_LINE;
      let current = 0;
      blocks.current.forEach((block, index) => {
        if (block && block.getBoundingClientRect().top <= line) current = index;
      });
      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-12">
      {/* Su mobile diventa una barra compatta in cima, con lo stesso ruolo. */}
      <div className="sticky top-20 z-20 -mx-5 border-b border-rule bg-paper-deep px-5 py-4 sm:-mx-8 sm:px-8 lg:top-28 lg:col-span-4 lg:mx-0 lg:self-start lg:border-b-0 lg:px-0 lg:py-0">
        <div className="hidden lg:block">
          <Eyebrow numbered="04">Metodo</Eyebrow>
          <Display level={2} size="d2" className="mt-6">
            Dai dati al calendario, in quattro fasi.
          </Display>
          <Lead className="mt-6">
            Nessuna tariffa cambia prima che il piano sia scritto, discusso e approvato.
          </Lead>
        </div>

        <div className="flex items-center gap-5 lg:mt-12 lg:block">
          <span
            aria-hidden="true"
            className="display tnum text-4xl leading-none text-sage lg:text-6xl"
          >
            {method[active].index}
          </span>

          <ol className="flex-1 lg:mt-8">
            {method.map((phase, index) => (
              <li key={phase.index} className="lg:border-t lg:border-rule-strong/50 lg:first:border-t-0">
                <span
                  className={cn(
                    "eyebrow hidden py-3 transition-colors duration-300 lg:flex lg:justify-between",
                    index === active ? "text-ink" : "text-ink-faint",
                  )}
                >
                  <span>{phase.title}</span>
                  <span>{index === active ? "in lettura" : ""}</span>
                </span>
              </li>
            ))}
          </ol>

          {/* Su mobile l'indice testuale non ci sta: resta il titolo di fase
              piu' una barra di avanzamento. */}
          <div className="flex-1 lg:hidden">
            <p className="display text-lg leading-tight">{method[active].title}</p>
            <div className="mt-2 flex gap-1">
              {method.map((phase, index) => (
                <span
                  key={phase.index}
                  className={cn(
                    "h-0.5 flex-1 transition-colors duration-300",
                    index <= active ? "bg-sage" : "bg-rule-strong",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 hidden lg:block">
          <TextLink href="/metodo">Il metodo nel dettaglio</TextLink>
        </div>
      </div>

      <ol className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
        {method.map((phase, index) => (
          <li
            key={phase.index}
            ref={(node) => {
              blocks.current[index] = node;
            }}
            className="border-t border-rule-strong/50 py-14 first:border-t-0 first:pt-0 lg:py-20"
          >
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="display text-d3">{phase.title}</h3>
              <span className="eyebrow shrink-0 text-ink-faint">{phase.duration}</span>
            </div>
            <p className="measure mt-4 text-ink-soft">{phase.body}</p>
            {diagrams[index] ? <div className="mt-12">{diagrams[index]}</div> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
