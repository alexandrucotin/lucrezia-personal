import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { z } from "zod"

import { SEZIONI_HOME } from "./sezioni-home"

/**
 * Schemi dei testi che arrivano dal pannello (Payload).
 *
 * Qui si valida la FORMA: che le chiavi ci siano, che i tipi siano giusti,
 * che i testi non siano stringhe vuote. Non si valida la *completezza*: che
 * un elenco abbia almeno una voce lo controlla il pannello, dove chi scrive
 * se ne accorge subito. Una validazione che vive solo nel log di build e'
 * una trappola, non una difesa: blocca la pubblicazione senza dire niente a
 * chi ha fatto la modifica.
 *
 * Il pannello impedisce gia' di salvare un campo obbligatorio vuoto: questi
 * schemi sono la rete di sicurezza, e in piu' riportano i dati alla forma che
 * le pagine si aspettano. Nel database un elenco di testi e' un elenco di
 * righe { testo }, una foto e' un riferimento alla libreria: qui tornano a
 * essere un elenco di stringhe e un percorso.
 *
 * Se un testo non passa, la pagina non viene rigenerata e resta online
 * l'ultima versione buona. Il caso peggiore e' "la modifica non e' comparsa",
 * non "il sito e' rotto".
 */

const testo = z.string().min(1, "non può restare vuoto")

/* Elenco di testi semplici: nel database ogni voce e' una riga { testo }. */
const testi = z
  .array(z.object({ testo }))
  .transform((righe) => righe.map((riga) => riga.testo))

/* Testo con grassetto, corsivo e link: arriva come albero di nodi (Lexical)
   e si disegna con <TestoRicco>. Vuoto se non contiene nemmeno un carattere. */
const haTesto = (nodo: unknown): boolean => {
  if (!nodo || typeof nodo !== "object") return false
  const n = nodo as { text?: unknown; children?: unknown[] }
  if (typeof n.text === "string" && n.text.trim()) return true
  return (n.children ?? []).some(haTesto)
}
const ricco = z
  .object({ root: z.object({ children: z.array(z.unknown()) }).loose() })
  .loose()
  .refine((v) => haTesto(v.root), "non può restare vuoto")
  .transform((v) => v as unknown as SerializedEditorState)

/* Elenco di paragrafi con formattazione: righe { testo } come sopra. */
const testiRicchi = z
  .array(z.object({ testo: ricco }))
  .transform((righe) => righe.map((riga) => riga.testo))

/* Campo facoltativo: Payload salva `null` quando resta vuoto. */
const facoltativo = z
  .string()
  .nullish()
  .transform((v) => v ?? undefined)

/* La foto arriva come documento della libreria (con descrizione propria);
   la descrizione scritta accanto, se c'e', vince su quella della libreria.
   Le pagine ricevono la foto (percorso e misure) e un testo alternativo.
   Le misure servono a scaricarla abbastanza grande quando viene ritagliata. */
const foto = z.object({
  url: testo,
  alt: testo,
  width: z.number().nullish(),
  height: z.number().nullish(),
})
const descrizioneFoto = z.string().nullish()

/* Foto facoltativa: Payload manda null quando non c'e'. Serve anche la
   misura, per disegnarla nelle sue proporzioni senza ritagliarla. */
const fotoFacoltativa = z
  .object({
    url: testo,
    alt: testo,
    width: z.number().nullish(),
    height: z.number().nullish(),
  })
  .nullish()
  .transform((v) =>
    v ? { url: v.url, alt: v.alt, width: v.width ?? 1600, height: v.height ?? 900 } : null
  )

/* Interruttore: assente o null vale "spento". */
const interruttore = z.boolean().nullish().transform(Boolean)
const conDescrizione = (immagine: z.infer<typeof foto>, descrizione?: string | null) => ({
  immagine: { url: immagine.url, width: immagine.width, height: immagine.height },
  descrizione: descrizione?.trim() || immagine.alt,
})

const voceValore = z.object({ voce: testo, valore: testo })
const domanda = z.object({ q: testo, a: ricco })
const meta = z.object({ titolo: testo, descrizione: testo })

export const generaleSchema = z.object({
  identita: z.object({
    nome: testo,
    monogramma: testo,
    ruolo: testo,
    tagline: testo,
    url: z.url(
      "deve essere un indirizzo completo, per esempio https://esempio.it"
    ),
    descrizione: testo,
  }),
  contatti: z.object({
    email: z.email("deve essere un indirizzo email valido"),
    telefono: testo,
    telefonoHref: testo,
    linkedin: z.url("deve essere un indirizzo completo"),
  }),
  legale: z.object({
    entita: testo,
    partitaIva: testo,
    citta: testo,
    paese: testo,
  }),
  mercati: testi,
  strumenti: testi,
  navigazione: z.array(z.object({ href: testo, label: testo })),
  footer: z.object({ descrizione: testo }),
  invitoFinale: z.object({
    occhiello: testo,
    titolo: testo,
    testo: testo,
    pulsante: testo,
  }),
  intestazione: z.object({ pulsante: testo }),
})

const sezioniHome = SEZIONI_HOME.map((s) => s.value) as [
  (typeof SEZIONI_HOME)[number]["value"],
  ...(typeof SEZIONI_HOME)[number]["value"][],
]

export const homeSchema = z.object({
  meta,
  /* Quali sezioni mostrare e in che ordine. Doppioni ignorati. */
  ordine: z
    .array(z.object({ sezione: z.enum(sezioniHome) }))
    .transform((righe) => [...new Set(righe.map((r) => r.sezione))]),
  hero: z.object({
    occhiello: testo,
    titolo: testo,
    titoloEvidenziato: z.string().nullish().transform((v) => v ?? ""),
    sottotitolo: testo,
    pulsantePrimario: testo,
    pulsanteSecondario: testo,
    scheda: z.array(voceValore),
    sfondo: fotoFacoltativa,
  }),
  clienti: z.object({ occhiello: testo, nota: testo }),
  diagnosi: z.object({
    occhiello: testo,
    titolo: testo,
    commentoGrafico: testo,
    commentoGraficoSecondario: testo,
    immagineGrafico: fotoFacoltativa,
    sintomi: z.array(z.object({ indice: testo, titolo: testo, testo })),
  }),
  servizi: z.object({ occhiello: testo, titolo: testo, link: testo }),
  risultati: z.object({
    occhiello: testo,
    titolo: testo,
    istruzione: testo,
    nota: testo,
  }),
  metodo: z.object({
    occhiello: testo,
    titolo: testo,
    sottotitolo: testo,
    link: testo,
  }),
  chiSono: z
    .object({
      occhiello: testo,
      titolo: testo,
      paragrafi: testiRicchi,
      immagine: foto,
      immagineDescrizione: descrizioneFoto,
    })
    .transform(({ immagine, immagineDescrizione, ...resto }) => {
      const scelta = conDescrizione(immagine, immagineDescrizione)
      return { ...resto, immagine: scelta.immagine, immagineDescrizione: scelta.descrizione }
    }),
  contatti: z.object({ passi: testi }),
})

const servizio = z.object({
  slug: testo,
  index: testo,
  eyebrow: testo,
  title: testo,
  claim: testo,
  summary: testo,
  lead: testo,
  deliverables: testi,
  forWhom: testi,
  mostraPerChiNonE: interruttore,
  notFor: ricco,
  needs: testi,
  diagram: z
    .enum(["matrix", "calendar", "kpi"])
    .nullish()
    .transform((v) => v ?? null),
  keyword: testo,
  duration: testo,
  metaTitle: testo,
  metaDescription: testo,
  faq: z.array(domanda),
})

export const serviziSchema = z.object({
  meta,
  pagina: z.object({
    occhiello: testo,
    titolo: testo,
    sottotitolo: testo,
    scheda: z.array(voceValore),
  }),
  prezzi: z.object({
    occhiello: testo,
    titolo: testo,
    testo: ricco,
    pacchetti: z.array(
      z.object({
        name: testo,
        price: testo,
        unit: testo,
        duration: testo,
        body: testo,
        items: testi,
        highlight: z.boolean().nullish().transform(Boolean),
      })
    ),
  }),
  elenco: z.array(servizio),
})

export const metodoSchema = z.object({
  meta,
  pagina: z.object({
    occhiello: testo,
    titolo: testo,
    sottotitolo: testo,
    scheda: z.array(voceValore),
  }),
  grafico: z.object({ occhiello: testo, titolo: testo, testo: ricco, immagine: fotoFacoltativa }),
  fasi: z.array(
    z.object({
      index: testo,
      title: testo,
      duration: testo,
      body: testo,
      detail: ricco,
      output: testo,
    })
  ),
  faq: z.array(domanda),
})

export const risultatiSchema = z.object({
  meta,
  pagina: z.object({
    occhiello: testo,
    titolo: testo,
    sottotitolo: testo,
    scheda: z.array(voceValore),
  }),
  lettura: z.object({
    mostra: interruttore,
    occhiello: testo,
    titolo: testo,
    paragrafi: testiRicchi,
  }),
  invito: z.object({ titolo: testo, testo }),
  numeri: z.array(
    z.object({ value: testo, label: testo, note: facoltativo })
  ),
  casi: z.array(
    z.object({
      slug: testo,
      client: testo,
      units: z.number(),
      market: testo,
      horizon: testo,
      problem: testo,
      action: testo,
      results: z.array(z.object({ value: testo, label: testo })),
      quote: facoltativo,
    })
  ),
  testimonianze: z.array(
    z.object({ quote: testo, role: testo, detail: testo })
  ),
  clienti: z.array(z.object({ name: testo, city: testo })),
})

export const contattiSchema = z.object({
  meta,
  pagina: z.object({ occhiello: testo, titolo: testo, sottotitolo: testo }),
  passi: testi,
  nota: testo,
  modulo: z.object({
    etichette: z.object({
      nome: testo,
      email: testo,
      azienda: testo,
      unita: testo,
      mercato: testo,
      messaggio: testo,
    }),
    segnaposto: z.object({ email: testo, messaggio: testo }),
    dimensioni: testi,
    consenso: testo,
    invia: testo,
    inviaInCorso: testo,
  }),
  faq: z.array(domanda),
  grazie: z.object({ occhiello: testo, titolo: testo, testo }),
})

export const chiSonoSchema = z.object({
  meta,
  pagina: z.object({ occhiello: testo, titolo: testo, sottotitolo: testo }),
  foto: z
    .object({ immagine: foto, descrizione: descrizioneFoto })
    .transform(({ immagine, descrizione }) => conDescrizione(immagine, descrizione)),
  percorso: z.object({
    occhiello: testo,
    tappe: z.array(z.object({ anno: testo, titolo: testo, testo: ricco })),
  }),
  credenziali: z.array(voceValore),
  tecnologia: z.object({
    occhiello: testo,
    titolo: testo,
    testo: ricco,
    collaborazione: testo,
    progetti: z.array(z.object({ stato: testo, titolo: testo, testo })),
  }),
  testimonianze: z.object({ occhiello: testo }),
})

/** Valida una sezione del pannello e dice con precisione quale campo non va. */
export function load<T extends z.ZodType>(
  sezione: string,
  schema: T,
  data: unknown
): z.infer<T> {
  const result = schema.safeParse(data)

  if (!result.success) {
    const dettagli = result.error.issues
      .map((issue) => {
        const campo = issue.path.length
          ? issue.path.join(" → ")
          : "(intera sezione)"
        return `  • ${campo}: ${issue.message}`
      })
      .join("\n")

    throw new Error(
      `\n\nErrore nei testi della sezione "${sezione}" del pannello\n\n${dettagli}\n\n` +
        `Correggi il campo dal pannello e salva. Fino ad allora resta online la versione precedente della pagina.\n`
    )
  }

  return result.data
}
