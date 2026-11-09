"use client"

import { useRowLabel } from "@payloadcms/ui"

/**
 * Titolo delle righe chiuse negli elenchi del pannello: mostra il contenuto
 * di un campo della voce (il titolo, la domanda...) invece di "Riga 01".
 */
export function EtichettaRiga({ campo }: { campo: string }) {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const valore = data?.[campo]

  if (typeof valore === "string" && valore.trim()) {
    const testo = valore.trim()
    return <span>{testo.length > 70 ? `${testo.slice(0, 70)}…` : testo}</span>
  }

  return <span>Nuova voce {String((rowNumber ?? 0) + 1).padStart(2, "0")}</span>
}
