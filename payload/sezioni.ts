import type { GlobalConfig } from "payload"

import { SEZIONI_HOME } from "@/lib/content/sezioni-home"

import {
  descrizioneFoto,
  domande,
  elenco,
  elencoTesti,
  foto,
  gruppo,
  meta,
  paragrafo,
  testo,
  testoRicco,
  voceValore,
} from "./campi"
import { rivalidaDopoSalvataggio } from "./rivalida"

/**
 * Le sezioni del pannello: una per pagina del sito, piu' "Generale".
 *
 * Ogni sezione e' un "global" di Payload: un unico documento, non un elenco
 * di articoli. La forma ricalca quella dei vecchi file content/*.json, cosi'
 * lib/content puo' consegnare alle pagine esattamente gli stessi dati.
 */

const sezione = (
  slug: string,
  label: string,
  group: "Pagine" | "Generale",
  /* La pagina del sito che mostra questa sezione, per l'anteprima. */
  percorso: string,
  fields: GlobalConfig["fields"]
): GlobalConfig => ({
  slug,
  label,
  admin: {
    group,
    /* "Anteprima" apre la pagina con le bozze al posto dei testi pubblicati. */
    preview: () => `/anteprima?percorso=${encodeURIComponent(percorso)}`,
  },
  /* Bozze: "Salva bozza" non tocca il sito, "Pubblica" lo aggiorna.
     Si tengono le ultime 30 versioni, per poter tornare indietro. */
  versions: { drafts: true, max: 30 },
  hooks: { afterChange: [rivalidaDopoSalvataggio] },
  fields,
})

const apertura = (conScheda: boolean) =>
  gruppo("pagina", "Apertura", [
    testo("occhiello", "Occhiello", "La scritta piccola in maiuscolo sopra il titolo"),
    paragrafo("titolo", "Titolo"),
    paragrafo("sottotitolo", "Sottotitolo"),
    ...(conScheda ? [voceValore()] : []),
  ])

export const generale = sezione("generale", "Generale e contatti", "Generale", "/", [
  gruppo("identita", "Identità", [
    testo("nome", "Nome"),
    testo("monogramma", "Monogramma"),
    testo("ruolo", "Ruolo"),
    testo("tagline", "Sottotitolo del logo"),
    testo("url", "Indirizzo del sito", "Per esempio https://www.lucreziaceleste.it"),
    paragrafo("descrizione", "Descrizione dell'attività"),
  ]),
  gruppo("contatti", "Contatti", [
    testo("email", "Email"),
    testo("telefono", "Telefono", "Come va mostrato, per esempio +39 393 138 4561"),
    testo("telefonoHref", "Telefono senza spazi", "Per esempio +393931384561"),
    testo("linkedin", "Indirizzo LinkedIn"),
  ]),
  gruppo("legale", "Dati fiscali", [
    testo("entita", "Intestazione"),
    testo("partitaIva", "Partita IVA"),
    testo("citta", "Città"),
    testo("paese", "Paese", "Sigla di due lettere, per esempio IT"),
  ]),
  elencoTesti("mercati", "Mercati", "Mercato", { multilinea: false }),
  elencoTesti("strumenti", "Strumenti", "Strumento", { multilinea: false }),
  elenco("navigazione", "Menu", [testo("href", "Indirizzo"), testo("label", "Voce di menu")], {
    etichetta: "label",
    minimo: 1,
  }),
  gruppo("footer", "Piè di pagina", [paragrafo("descrizione", "Testo del piè di pagina")]),
  gruppo(
    "invitoFinale",
    "Invito finale",
    [
      testo("occhiello", "Occhiello"),
      testo("titolo", "Titolo"),
      paragrafo("testo", "Testo"),
      testo("pulsante", "Pulsante"),
    ],
    "Il riquadro verde in fondo a ogni pagina"
  ),
  gruppo("intestazione", "Intestazione", [testo("pulsante", "Pulsante in alto a destra")]),
])

export const home = sezione("home", "Home", "Pagine", "/", [
  meta(),
  {
    name: "ordine",
    label: "Sezioni della home",
    type: "array",
    admin: {
      initCollapsed: true,
      description:
        "Trascina le righe per cambiare l'ordine delle sezioni. Per nascondere una sezione elimina la sua riga; per farla ricomparire aggiungi una riga e sceglila. L'apertura resta sempre in cima.",
      components: {
        RowLabel: {
          path: "/components/payload/etichetta-riga#EtichettaRiga",
          clientProps: {
            campo: "sezione",
            etichette: Object.fromEntries(SEZIONI_HOME.map((s) => [s.value, s.label])),
          },
        },
      },
    },
    defaultValue: SEZIONI_HOME.map((s) => ({ sezione: s.value })),
    fields: [
      {
        name: "sezione",
        label: "Sezione",
        type: "select",
        required: true,
        options: SEZIONI_HOME.map((s) => ({ label: s.label, value: s.value })),
      },
    ],
    validate: (righe: unknown) => {
      const scelte = (Array.isArray(righe) ? righe : []).map((r) => (r as { sezione?: string }).sezione)
      const doppia = scelte.find((v, i) => v && scelte.indexOf(v) !== i)
      if (!doppia) return true
      const nome = SEZIONI_HOME.find((s) => s.value === doppia)?.label ?? doppia
      return `La sezione "${nome}" compare due volte: tienine una sola.`
    },
  },
  gruppo("hero", "Apertura", [
    testo("occhiello", "Occhiello"),
    paragrafo("titolo", "Titolo", "La prima parte, in nero"),
    {
      name: "titoloEvidenziato",
      label: "Titolo evidenziato",
      type: "textarea",
      admin: { description: "La seconda parte, in verde. Può restare vuota." },
    },
    paragrafo("sottotitolo", "Sottotitolo"),
    testo("pulsantePrimario", "Pulsante principale"),
    testo("pulsanteSecondario", "Pulsante secondario"),
    voceValore(),
  ]),
  gruppo("clienti", "Fascia clienti", [testo("occhiello", "Occhiello"), testo("nota", "Nota a destra")]),
  gruppo("diagnosi", "Diagnosi", [
    testo("occhiello", "Occhiello"),
    paragrafo("titolo", "Titolo"),
    paragrafo("commentoGrafico", "Commento accanto al grafico"),
    paragrafo("commentoGraficoSecondario", "Seconda riga del commento"),
    elenco(
      "sintomi",
      "Sintomi",
      [testo("indice", "Numero"), testo("titolo", "Titolo"), paragrafo("testo", "Testo")],
      { etichetta: "titolo", minimo: 1 }
    ),
  ]),
  gruppo("servizi", "Sezione servizi", [
    testo("occhiello", "Occhiello"),
    paragrafo("titolo", "Titolo"),
    testo("link", "Link"),
  ]),
  gruppo("risultati", "Sezione risultati", [
    testo("occhiello", "Occhiello"),
    paragrafo("titolo", "Titolo"),
    testo("istruzione", "Istruzione per lo scorrimento"),
    paragrafo("nota", "Nota finale"),
  ]),
  gruppo("metodo", "Sezione metodo", [
    testo("occhiello", "Occhiello"),
    paragrafo("titolo", "Titolo"),
    paragrafo("sottotitolo", "Sottotitolo"),
    testo("link", "Link"),
  ]),
  gruppo("chiSono", "Sezione chi sono", [
    testo("occhiello", "Occhiello"),
    paragrafo("titolo", "Titolo"),
    elencoTesti("paragrafi", "Paragrafi", "Paragrafo", { ricco: true }),
    foto("immagine"),
    descrizioneFoto("immagineDescrizione"),
  ]),
  gruppo("contatti", "Cosa succede dopo", [elencoTesti("passi", "Passi", "Passo")]),
])

export const servizi = sezione("servizi", "Servizi", "Pagine", "/servizi", [
  meta(),
  apertura(true),
  gruppo("prezzi", "Prezzi", [
    testo("occhiello", "Occhiello"),
    paragrafo("titolo", "Titolo"),
    testoRicco("testo", "Testo"),
    elenco(
      "pacchetti",
      "Pacchetti",
      [
        testo("name", "Nome"),
        testo("price", "Prezzo"),
        testo("unit", "Unità", "Per esempio: al mese"),
        testo("duration", "Durata"),
        paragrafo("body", "Descrizione"),
        elencoTesti("items", "Cosa include", "Voce"),
        { name: "highlight", label: "In evidenza", type: "checkbox", defaultValue: false },
      ],
      { etichetta: "name", minimo: 1 }
    ),
  ]),
  elenco(
    "elenco",
    "Servizi",
    [
      testo("slug", "Indirizzo", "Parte finale dell'URL. Cambiarlo rompe i link esistenti."),
      testo("index", "Numero"),
      testo("eyebrow", "Occhiello"),
      testo("title", "Titolo"),
      paragrafo("claim", "Frase principale"),
      paragrafo("summary", "Riassunto"),
      paragrafo("lead", "Apertura della pagina dedicata"),
      elencoTesti("deliverables", "Cosa ricevi", "Voce"),
      elencoTesti("forWhom", "Per chi è", "Voce"),
      testoRicco("notFor", "Per chi non è"),
      elencoTesti("needs", "Cosa serve da te", "Voce"),
      {
        name: "diagram",
        label: "Grafico",
        type: "select",
        options: [
          { label: "Matrice del portafoglio", value: "matrix" },
          { label: "Calendario tariffario", value: "calendar" },
          { label: "Dashboard KPI", value: "kpi" },
        ],
      },
      testo("keyword", "Parola chiave principale"),
      testo("duration", "Durata"),
      testo("metaTitle", "Titolo per Google"),
      paragrafo("metaDescription", "Descrizione per Google"),
      domande(),
    ],
    { etichetta: "title", minimo: 1 }
  ),
])

export const metodo = sezione("metodo", "Metodo", "Pagine", "/metodo", [
  meta(),
  apertura(true),
  gruppo("grafico", "Sezione del grafico", [
    testo("occhiello", "Occhiello"),
    testo("titolo", "Titolo"),
    testoRicco("testo", "Testo"),
  ]),
  elenco(
    "fasi",
    "Fasi",
    [
      testo("index", "Numero"),
      testo("title", "Titolo"),
      testo("duration", "Durata"),
      paragrafo("body", "Testo breve"),
      testoRicco("detail", "Testo esteso"),
      paragrafo("output", "Cosa esce da questa fase"),
    ],
    { etichetta: "title", minimo: 1 }
  ),
  domande(),
])

export const risultati = sezione("risultati", "Risultati", "Pagine", "/risultati", [
  meta(),
  apertura(true),
  gruppo("lettura", "Come leggere i numeri", [
    testo("occhiello", "Occhiello"),
    paragrafo("titolo", "Titolo"),
    elencoTesti("paragrafi", "Paragrafi", "Paragrafo", { ricco: true }),
  ]),
  gruppo("invito", "Invito finale della pagina", [paragrafo("titolo", "Titolo"), paragrafo("testo", "Testo")]),
  elenco(
    "numeri",
    "Numeri in evidenza",
    [
      testo("value", "Numero"),
      testo("label", "Etichetta"),
      { name: "note", label: "Nota", type: "textarea" },
    ],
    { etichetta: "value", minimo: 1 }
  ),
  elenco(
    "casi",
    "Casi studio",
    [
      testo("slug", "Identificativo"),
      testo("client", "Cliente"),
      { name: "units", label: "Unità", type: "number", required: true, min: 1 },
      testo("market", "Mercato"),
      testo("horizon", "Orizzonte temporale"),
      paragrafo("problem", "Il problema"),
      paragrafo("action", "L'intervento"),
      elenco("results", "Risultati", [testo("value", "Valore"), testo("label", "Etichetta")], {
        etichetta: "label",
        minimo: 1,
      }),
      { name: "quote", label: "Citazione", type: "textarea" },
    ],
    { etichetta: "client", minimo: 1 }
  ),
  elenco(
    "testimonianze",
    "Testimonianze",
    [
      paragrafo("quote", "Citazione"),
      testo("role", "Ruolo"),
      testo("detail", "Dettaglio", "Per esempio: 42 unità, Verona"),
    ],
    { etichetta: "role" }
  ),
  elenco("clienti", "Portafogli seguiti", [testo("name", "Nome"), testo("city", "Città")], {
    etichetta: "name",
  }),
])

export const chiSono = sezione("chi-sono", "Chi sono", "Pagine", "/chi-sono", [
  meta(),
  apertura(false),
  gruppo("foto", "Foto", [foto("immagine"), descrizioneFoto("descrizione")]),
  gruppo("percorso", "Il percorso", [
    testo("occhiello", "Occhiello"),
    elenco(
      "tappe",
      "Tappe",
      [testo("anno", "Anno"), testo("titolo", "Titolo"), testoRicco("testo", "Testo")],
      { etichetta: "anno", minimo: 1 }
    ),
  ]),
  voceValore("credenziali", "Credenziali"),
  gruppo("tecnologia", "Tecnologia", [
    testo("occhiello", "Occhiello"),
    paragrafo("titolo", "Titolo"),
    testoRicco("testo", "Testo"),
    testo("collaborazione", "Riga della collaborazione"),
    elenco(
      "progetti",
      "Progetti",
      [
        testo("stato", "Stato", "Per esempio: Completato, In corso"),
        testo("titolo", "Titolo"),
        paragrafo("testo", "Testo"),
      ],
      { etichetta: "titolo", minimo: 1 }
    ),
  ]),
  gruppo("testimonianze", "Sezione testimonianze", [testo("occhiello", "Occhiello")]),
])

export const contatti = sezione("contatti", "Contatti", "Pagine", "/contatti", [
  meta(),
  apertura(false),
  elencoTesti("passi", "Cosa succede dopo", "Passo"),
  paragrafo("nota", "Nota sui tempi di risposta"),
  gruppo("modulo", "Modulo", [
    gruppo("etichette", "Etichette dei campi", [
      testo("nome", "Nome"),
      testo("email", "Email"),
      testo("azienda", "Azienda"),
      testo("unita", "Unità gestite"),
      testo("mercato", "Mercato"),
      testo("messaggio", "Messaggio"),
    ]),
    gruppo("segnaposto", "Testi di esempio nei campi", [
      testo("email", "Esempio email"),
      paragrafo("messaggio", "Esempio messaggio"),
    ]),
    elencoTesti("dimensioni", "Fasce di dimensione", "Fascia", { multilinea: false }),
    paragrafo("consenso", "Testo del consenso privacy"),
    testo("invia", "Pulsante invia"),
    testo("inviaInCorso", "Pulsante durante l'invio"),
  ]),
  domande(),
  gruppo("grazie", "Pagina di ringraziamento", [
    testo("occhiello", "Occhiello"),
    paragrafo("titolo", "Titolo"),
    paragrafo("testo", "Testo"),
  ]),
])

/* L'ordine e' quello del menu del pannello. */
export const sezioni = [home, servizi, metodo, risultati, chiSono, contatti, generale]
