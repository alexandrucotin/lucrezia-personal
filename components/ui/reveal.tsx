"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

/* Un solo gesto di movimento in tutto il sito: 12px verso l'alto piu' opacita'.
   Niente parallax, niente scale, niente blur: il movimento da' ritmo alla
   lettura, non si fa notare. */
const EASE = [0.16, 1, 0.3, 1] as const;
const DISTANCE = 12;
const THRESHOLD = 0.88;

const variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Rilevamento della visibilita' fatto a mano invece di IntersectionObserver.
 *
 * Con `whileInView` il contenuto parte a opacita' 0 e resta invisibile se
 * l'observer non emette mai eventi. Qui la prima verifica e' sincrona al
 * mount, quindi cio' che e' già a schermo compare sempre.
 */
function useInViewport(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;

    const isInside = () => {
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight * THRESHOLD && rect.bottom > 0;
    };

    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onScroll);
    };

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (isInside()) {
          setVisible(true);
          stop();
        }
      });
    }

    if (isInside()) {
      setVisible(true);
      return;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      stop();
    };
  }, [ref]);

  return visible;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Ritardo progressivo tra i figli <RevealItem>, in secondi. */
  stagger?: number;
};

export function Reveal({ children, className, delay = 0, stagger = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInViewport(ref);
  const animate = !useReducedMotion();

  if (stagger > 0) {
    return (
      <motion.div
        ref={ref}
        data-reveal
        className={className}
        initial={animate ? "hidden" : false}
        animate={visible || !animate ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial={animate ? "hidden" : false}
      animate={visible || !animate ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Figlio di un <Reveal stagger>: eredita il timing dal genitore. */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const animate = !useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={className}
      initial={animate ? "hidden" : false}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
