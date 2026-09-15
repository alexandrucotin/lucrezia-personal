import { z } from "zod"

/**
 * Schemi dei file in content/.
 *
 * Qui si valida la FORMA: che le chiavi ci siano, che i tipi siano giusti,
 * che i testi non siano stringhe vuote. Non si valida la *completezza*: che
 * un elenco abbia almeno una voce lo controlla il pannello, dove chi scrive
 * se ne accorge subito. Una validazione che vive solo nel log di build e'
 * una trappola, non una difesa: blocca la pubblicazione senza dire niente a
 * chi ha fatto la modifica.
 *
 * Girano al build: se un testo viene svuotato o una virgoletta salta, la
 * pubblicazione si ferma con un messaggio che dice quale file e quale campo.
 * Su Netlify e Vercel un build fallito non manda giu' il sito: resta online
 * l'ultima versione buona. Il caso peggiore e' "la modifica non e' comparsa",
 * non "il sito e' rotto".
 */

const testo = z.string().min(1, "non può restare vuoto")

/* Il campo foto del pannello e' condizionale — "scegli fra quelle del sito"
   oppure "caricane una nuova" — quindi arriva come { discriminant, value }.
   Entrambi i rami producono un percorso, percio' si appiattisce subito a
   stringa: le pagine non devono sapere come e' stata scelta la foto. */
const foto = z
  .object({ discriminant: z.enum(["esistente", "nuova"]), value: testo })
  .transform((v) => v.value)
const voceValore = z.object({ voce: testo, valore: testo })
const domanda = z.object({ q: testo, a: testo })
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
  mercati: z.array(testo),
  strumenti: z.array(testo),
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

export const homeSchema = z.object({
  meta,
  hero: z.object({
    occhiello: testo,
    titolo: testo,
    titoloEvidenziato: z.string(),
    sottotitolo: testo,
    pulsantePrimario: testo,
    pulsanteSecondario: testo,
    scheda: z.array(voceValore),
  }),
  clienti: z.object({ occhiello: testo, nota: testo }),
  diagnosi: z.object({
    occhiello: testo,
    titolo: testo,
    commentoGrafico: testo,
    commentoGraficoSecondario: testo,
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
  chiSono: z.object({
    occhiello: testo,
    titolo: testo,
    paragrafi: z.array(testo),
    immagine: foto,
    immagineDescrizione: testo,
  }),
  contatti: z.object({ passi: z.array(testo) }),
})

const servizio = z.object({
  slug: testo,
  index: testo,
  eyebrow: testo,
  title: testo,
  claim: testo,
  summary: testo,
  lead: testo,
  deliverables: z.array(testo),
  forWhom: z.array(testo),
  notFor: testo,
  needs: z.array(testo),
  diagram: z.enum(["matrix", "calendar", "kpi"]).nullable(),
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
    testo,
    pacchetti: z.array(
      z.object({
        name: testo,
        price: testo,
        unit: testo,
        duration: testo,
        body: testo,
        items: z.array(testo),
        highlight: z.boolean(),
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
  grafico: z.object({ occhiello: testo, titolo: testo, testo }),
  fasi: z.array(
    z.object({
      index: testo,
      title: testo,
      duration: testo,
      body: testo,
      detail: testo,
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
    occhiello: testo,
    titolo: testo,
    paragrafi: z.array(testo),
  }),
  invito: z.object({ titolo: testo, testo }),
  numeri: z.array(
    z.object({ value: testo, label: testo, note: z.string().optional() })
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
      quote: z.string().optional(),
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
  passi: z.array(testo),
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
    dimensioni: z.array(testo),
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
  foto: z.object({ immagine: foto, descrizione: testo }),
  percorso: z.object({
    occhiello: testo,
    tappe: z.array(z.object({ anno: testo, titolo: testo, testo })),
  }),
  credenziali: z.array(voceValore),
  tecnologia: z.object({
    occhiello: testo,
    titolo: testo,
    testo,
    collaborazione: testo,
    progetti: z.array(z.object({ stato: testo, titolo: testo, testo })),
  }),
  testimonianze: z.object({ occhiello: testo }),
})

/** Valida un file di contenuto e ferma il build con un messaggio leggibile. */
export function load<T extends z.ZodType>(
  file: string,
  schema: T,
  data: unknown
): z.infer<T> {
  const result = schema.safeParse(data)

  if (!result.success) {
    const dettagli = result.error.issues
      .map((issue) => {
        const campo = issue.path.length
          ? issue.path.join(" → ")
          : "(radice del file)"
        return `  • ${campo}: ${issue.message}`
      })
      .join("\n")

    throw new Error(
      `\n\nErrore nel file dei testi: content/${file}.json\n\n${dettagli}\n\n` +
        `Correggi il file e ripubblica. Fino ad allora resta online la versione precedente del sito.\n`
    )
  }

  return result.data
}
