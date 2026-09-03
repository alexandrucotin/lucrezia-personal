"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Reveal allo scroll.
 *
 * La transizione e' in CSS (vedi globals.css). Qui si decide solo *quando*
 * nascondere e quando mostrare. Tre scelte deliberate, tutte pagate con dei
 * bug in questo progetto:
 *
 * - Il server rende visibile. Nasconde il client, dopo il mount, e solo cio'
 *   che sta sotto la piega. Se il bundle non carica, la pagina resta
 *   leggibile invece di restare bianca.
 * - Nessun IntersectionObserver: la prima verifica e' sincrona al mount.
 * - Nessun requestAnimationFrame: se i fotogrammi non arrivano, il controllo
 *   non verrebbe mai eseguito. Sono letture di geometria, e ogni elemento
 *   smette di ascoltare appena e' comparso.
 */
const THRESHOLD = 0.88;

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"open" | "hidden" | "revealed">("open");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const isInside = () => {
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight * THRESHOLD && rect.bottom > 0;
    };

    /* Gia' a schermo: resta com'e', senza animazione di ingresso. */
    if (isInside()) return;

    setState("hidden");

    const stop = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    function check() {
      if (isInside()) {
        setState("revealed");
        stop();
      }
    }

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return stop;
  }, []);

  return {
    ref,
    hidden: state !== "open" ? "" : undefined,
    visible: state === "revealed" ? "" : undefined,
  };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Ritardo in secondi, per sfalsare blocchi vicini. */
  delay?: number;
  /** Attiva lo stagger sui figli diretti <RevealItem>. */
  stagger?: number;
};

export function Reveal({ children, className, delay = 0, stagger = 0 }: RevealProps) {
  const { ref, hidden, visible } = useReveal();

  if (stagger > 0) {
    return (
      <div
        ref={ref}
        data-reveal-group=""
        data-hidden={hidden}
        data-visible={visible}
        className={className}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-reveal=""
      data-hidden={hidden}
      data-visible={visible}
      className={className}
      style={delay ? { transitionDelay: `${Math.round(delay * 1000)}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/** Figlio diretto di un <Reveal stagger>. Il ritardo lo assegna il CSS. */
export function RevealItem({
  children,
  className,
  from,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left";
}) {
  return (
    <div data-reveal="" data-from={from} className={className}>
      {children}
    </div>
  );
}
