import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { RichText } from "@payloadcms/richtext-lexical/react"

import { cn } from "@/lib/utils"

/**
 * Testo scritto nel pannello con grassetto, corsivo e link.
 *
 * Ogni paragrafo diventa un <p>; `className` va sul contenitore e porta le
 * stesse classi che prima stavano sul <p> unico (colore, misura, margini),
 * cosi' un testo di un solo paragrafo resta identico a prima.
 */
export function TestoRicco({
  data,
  className,
}: {
  data: SerializedEditorState
  className?: string
}) {
  return (
    <div
      className={cn(
        "[&_p+p]:mt-4 [&_strong]:font-medium [&_strong]:text-ink",
        "[&_a]:underline [&_a]:decoration-rule-strong [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:decoration-current",
        className
      )}
    >
      <RichText data={data} disableContainer />
    </div>
  )
}
