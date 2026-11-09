import Image from "next/image"

import { cn } from "@/lib/utils"

/**
 * Un'immagine caricata dal pannello al posto di un grafico disegnato.
 *
 * Non si ritaglia: un grafico tagliato perde i dati ai bordi. Si mostra
 * intera, larga quanto lo spazio del grafico, nelle sue proporzioni.
 */
export function ImmagineGrafico({
  immagine,
  className,
}: {
  immagine: { url: string; alt: string; width: number; height: number }
  className?: string
}) {
  return (
    <figure
      className={cn("border border-rule bg-surface p-4 sm:p-6", className)}
    >
      <Image
        src={immagine.url}
        alt={immagine.alt}
        width={immagine.width}
        height={immagine.height}
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="h-auto w-full"
      />
    </figure>
  )
}
