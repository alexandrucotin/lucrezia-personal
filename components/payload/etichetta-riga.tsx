"use client"

import { useRowLabel } from "@payloadcms/ui"

/* I testi con grassetto e link arrivano come albero di nodi: per il titolo
   della riga basta il testo, senza formattazione. */
function testoDi(valore: unknown): string {
  if (typeof valore === "string") return valore
  if (!valore || typeof valore !== "object") return ""
  const nodo = valore as { text?: unknown; children?: unknown[]; root?: unknown }
  if (typeof nodo.text === "string") return nodo.text
  if (nodo.root) return testoDi(nodo.root)
  return (nodo.children ?? []).map(testoDi).join(" ")
}

/**
 * Titolo delle righe chiuse negli elenchi del pannello: mostra il contenuto
 * di un campo della voce (il titolo, la domanda...) invece di "Riga 01".
 */
export function EtichettaRiga({
  campo,
  etichette,
}: {
  campo: string
  /* Per i campi a scelta: valore salvato → nome da mostrare. */
  etichette?: Record<string, string>
}) {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const grezzo = testoDi(data?.[campo]).replace(/\s+/g, " ").trim()
  const testo = etichette?.[grezzo] ?? grezzo

  if (testo) {
    return <span>{testo.length > 70 ? `${testo.slice(0, 70)}…` : testo}</span>
  }

  return <span>Nuova voce {String((rowNumber ?? 0) + 1).padStart(2, "0")}</span>
}
