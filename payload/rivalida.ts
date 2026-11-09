import { revalidateTag } from "next/cache"
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload"

import { TAG_CONTENUTI } from "@/lib/content/tag"

/**
 * Dopo un salvataggio dal pannello le pagine vanno rigenerate.
 *
 * `expire: 0` scade la cache subito: la prima visita dopo il salvataggio
 * mostra gia' il testo nuovo. Con il profilo "max" consigliato da Next la
 * prima visita mostrerebbe ancora quello vecchio, e chi ha appena salvato
 * penserebbe che la modifica non sia andata.
 *
 * Fuori da Next (lo script di importazione, i comandi `payload`) non c'e'
 * nessuna cache da invalidare: chi scrive lo segnala con
 * `context.senzaRivalidazione`.
 */
function rivalida(context: Record<string, unknown>) {
  if (context.senzaRivalidazione) return
  revalidateTag(TAG_CONTENUTI, { expire: 0 })
}

export const rivalidaDopoSalvataggio: GlobalAfterChangeHook = ({ doc, req }) => {
  rivalida(req.context)
  return doc
}

export const rivalidaDopoModificaFoto: CollectionAfterChangeHook = ({ doc, req }) => {
  rivalida(req.context)
  return doc
}

export const rivalidaDopoEliminazioneFoto: CollectionAfterDeleteHook = ({ doc, req }) => {
  rivalida(req.context)
  return doc
}
