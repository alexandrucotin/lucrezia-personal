import Image from "next/image"

/**
 * Una foto che riempie un riquadro di forma fissa e viene ritagliata
 * (object-cover) per entrarci.
 *
 * Il problema: quando la foto non ha la forma del riquadro, per coprirlo
 * va ingrandita e i lati escono fuori. Una foto orizzontale in un riquadro
 * verticale si mostra larga anche il doppio del riquadro. Se `sizes` dice
 * solo quanto e' largo il riquadro, il browser scarica una versione troppo
 * piccola e la stira: la foto si sgrana anche se l'originale e' nitido.
 *
 * Qui `sizes` si calcola dalla larghezza a cui la foto verra' davvero
 * disegnata dopo il ritaglio, usando le sue proporzioni.
 */

export type Riquadro = {
  /** Media query, per esempio "(min-width: 1024px)". Assente nell'ultimo. */
  media?: string
  /** Larghezza del riquadro, per esempio "38vw". */
  larghezza: string
} & (
  | /** Riquadro di proporzioni fisse (larghezza / altezza), per esempio 3 / 4. */
  { proporzione: number; altezza?: never }
  | /** Riquadro di altezza fissa, per esempio "34rem". */
  { altezza: string; proporzione?: never }
)

const arrotonda = (n: number) => Math.round(n * 1000) / 1000

/** Larghezza a cui la foto viene disegnata dentro un riquadro. */
function larghezzaDisegnata(riquadro: Riquadro, rapporto: number | null) {
  if (!rapporto) return riquadro.larghezza
  if (riquadro.proporzione === undefined) {
    /* Copre l'altezza: e' larga altezza x rapporto, o quanto il riquadro
       se e' piu' larga di cosi'. */
    return `max(${riquadro.larghezza}, calc(${riquadro.altezza} * ${arrotonda(rapporto)}))`
  }
  const ingrandimento = rapporto / riquadro.proporzione
  if (ingrandimento <= 1) return riquadro.larghezza
  return `calc(${riquadro.larghezza} * ${arrotonda(ingrandimento)})`
}

export function sizesRitaglio(riquadri: Riquadro[], width?: number | null, height?: number | null) {
  const rapporto = width && height ? width / height : null
  return riquadri
    .map((r) => [r.media, larghezzaDisegnata(r, rapporto)].filter(Boolean).join(" "))
    .join(", ")
}

export function FotoRitagliata({
  foto,
  alt,
  riquadri,
  className,
  priority,
}: {
  foto: { url: string; width?: number | null; height?: number | null }
  alt: string
  riquadri: Riquadro[]
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src={foto.url}
      alt={alt}
      fill
      sizes={sizesRitaglio(riquadri, foto.width, foto.height)}
      className={className}
      priority={priority}
    />
  )
}
