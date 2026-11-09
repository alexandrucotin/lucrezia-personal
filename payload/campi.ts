import type { Field } from "payload"

/**
 * Mattoncini per descrivere i testi del sito nel pannello.
 *
 * Ogni campo di testo e' obbligatorio, come lo era con Keystatic: il
 * pannello impedisce di salvare un titolo vuoto, invece di lasciare che sia
 * il sito a scoprirlo dopo.
 */

const descrizione = (description?: string) =>
  description ? { admin: { description } } : {}

export const testo = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: "text",
  required: true,
  ...descrizione(description),
})

export const paragrafo = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: "textarea",
  required: true,
  ...descrizione(description),
})

export const gruppo = (
  name: string,
  label: string,
  fields: Field[],
  description?: string
): Field => ({
  name,
  label,
  type: "group",
  fields,
  ...descrizione(description),
})

/**
 * Un elenco di voci riordinabili. `etichetta` e' il campo della voce che
 * compare come titolo della riga chiusa, cosi' chi scrive riconosce la voce
 * senza doverla aprire.
 */
export const elenco = (
  name: string,
  label: string,
  fields: Field[],
  { etichetta, minimo }: { etichetta: string; minimo?: number }
): Field => ({
  name,
  label,
  type: "array",
  minRows: minimo,
  fields,
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: {
        path: "/components/payload/etichetta-riga#EtichettaRiga",
        clientProps: { campo: etichetta },
      },
    },
  },
})

/**
 * Un elenco di testi semplici (paragrafi, passi, voci). Nel database ogni
 * voce e' una riga con un solo campo `testo`; lib/content lo riporta a un
 * semplice elenco di stringhe.
 */
export const elencoTesti = (
  name: string,
  label: string,
  voce: string,
  { multilinea = true }: { multilinea?: boolean } = {}
): Field =>
  elenco(
    name,
    label,
    [multilinea ? paragrafo("testo", voce) : testo("testo", voce)],
    { etichetta: "testo" }
  )

export const voceValore = (name = "scheda", label = "Scheda"): Field =>
  elenco(name, label, [testo("voce", "Etichetta"), testo("valore", "Valore")], {
    etichetta: "voce",
  })

export const domande = (): Field =>
  elenco(
    "faq",
    "Domande frequenti",
    [testo("q", "Domanda"), paragrafo("a", "Risposta")],
    { etichetta: "q" }
  )

export const meta = (): Field =>
  gruppo("meta", "Ricerca su Google", [
    testo("titolo", "Titolo per Google", "Compare come titolo blu nei risultati di ricerca"),
    paragrafo(
      "descrizione",
      "Descrizione per Google",
      "Il testo grigio sotto il titolo nei risultati di ricerca. Circa 155 caratteri."
    ),
  ])

/* La foto sta accanto al testo che accompagna, non in una sezione separata:
   chi scrive la cerca dov'e' nel sito, non dove sarebbe comodo al codice.
   Dalla stessa finestra si sceglie una foto gia' caricata o se ne carica
   una nuova. */
export const foto = (name: string, label = "Foto"): Field => ({
  name,
  label,
  type: "upload",
  relationTo: "media",
  required: true,
  admin: {
    description:
      "Scegli una foto già caricata o caricane una nuova. Va bene qualsiasi proporzione: la foto viene ritagliata, mai deformata.",
  },
})

export const descrizioneFoto = (name: string): Field => ({
  name,
  label: "Descrizione della foto (facoltativa)",
  type: "textarea",
  admin: {
    description:
      "Lascia vuoto per usare la descrizione salvata con la foto. Scrivila qui solo se in questo punto del sito la foto va descritta diversamente.",
  },
})
