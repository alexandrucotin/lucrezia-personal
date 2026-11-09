/**
 * Identita' del sito (nome, contatti, dati fiscali) e menu.
 * Derivati dalla sezione "Generale e contatti" del pannello.
 */

import { getContenuti } from "@/lib/content"

export async function getSite() {
  return (await getContenuti()).site
}

export type { Site } from "@/lib/content/tipi"
