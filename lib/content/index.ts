/**
 * Punto unico di accesso ai testi del sito.
 *
 * I contenuti vivono nel database e si modificano dal pannello su /admin.
 * Qui vengono letti, validati e tipizzati: da questo momento in poi il resto
 * del codice non sa piu' da dove arrivano.
 *
 * Si leggono tutti insieme e una volta sola: sono poche pagine di testo, e
 * una lettura unica tiene coerenti fra loro le sezioni che si citano a
 * vicenda (il menu, i servizi nel piè di pagina...). Il risultato resta in
 * cache finche' qualcuno non pubblica dal pannello (vedi payload/rivalida.ts).
 *
 * In anteprima (draft mode, attivato da /anteprima) si leggono invece le
 * bozze, sempre fresche e mai in cache.
 */

import config from "@payload-config"
import { unstable_cache } from "next/cache"
import { draftMode } from "next/headers"
import { getPayload } from "payload"
import { cache } from "react"

import {
  chiSonoSchema,
  contattiSchema,
  generaleSchema,
  homeSchema,
  load,
  metodoSchema,
  risultatiSchema,
  serviziSchema,
} from "./schema"
import { creaSite } from "./site"
import { TAG_CONTENUTI } from "./tag"

async function leggiDalPannello(bozze: boolean) {
    const payload = await getPayload({ config })
    /* depth 1: le foto arrivano gia' risolte, con percorso e descrizione. */
    const leggi = (slug: Parameters<typeof payload.findGlobal>[0]["slug"]) =>
      payload.findGlobal({ slug, depth: 1, draft: bozze })

    const [generale, home, servizi, metodo, risultati, chiSono, contatti] = await Promise.all([
      leggi("generale"),
      leggi("home"),
      leggi("servizi"),
      leggi("metodo"),
      leggi("risultati"),
      leggi("chi-sono"),
      leggi("contatti"),
    ])

    return { generale, home, servizi, metodo, risultati, chiSono, contatti }
}

const leggiPubblicati = unstable_cache(() => leggiDalPannello(false), ["contenuti"], {
  tags: [TAG_CONTENUTI],
})

/** Tutti i testi del sito, validati. Una sola lettura per richiesta. */
export const getContenuti = cache(async () => {
  const { isEnabled: anteprima } = await draftMode()
  return costruisci(anteprima ? await leggiDalPannello(true) : await leggiPubblicati(), anteprima)
})

/**
 * Solo i testi pubblicati, senza guardare l'anteprima. Serve dove non c'e'
 * una richiesta da cui leggerla, come generateStaticParams al build.
 */
export const getContenutiPubblicati = cache(async () => costruisci(await leggiPubblicati(), false))

function costruisci(dati: Awaited<ReturnType<typeof leggiDalPannello>>, anteprima: boolean) {
  const generale = load("Generale e contatti", generaleSchema, dati.generale)
  const home = load("Home", homeSchema, dati.home)
  const serviziContenuto = load("Servizi", serviziSchema, dati.servizi)
  const metodoContenuto = load("Metodo", metodoSchema, dati.metodo)
  const risultatiContenuto = load("Risultati", risultatiSchema, dati.risultati)
  const contattiContenuto = load("Contatti", contattiSchema, dati.contatti)
  const chiSonoContenuto = load("Chi sono", chiSonoSchema, dati.chiSono)

  return {
    anteprima,
    generale,
    home,
    serviziContenuto,
    metodoContenuto,
    risultatiContenuto,
    contattiContenuto,
    chiSonoContenuto,

    /* Identita' del sito e menu, derivati da "Generale". */
    site: creaSite(generale),
    nav: generale.navigazione,

    /* Scorciatoie per i dati usati in piu' pagine. */
    services: serviziContenuto.elenco,
    packages: serviziContenuto.prezzi.pacchetti,
    method: metodoContenuto.fasi,
    stats: risultatiContenuto.numeri,
    caseStudies: risultatiContenuto.casi,
    testimonials: risultatiContenuto.testimonianze,
    clients: risultatiContenuto.clienti,
    faqs: contattiContenuto.faq,
    tools: generale.strumenti,
  }
}

export type Contenuti = Awaited<ReturnType<typeof getContenuti>>
export type { CaseStudy, Fase, Modulo, NavItem, Service, Site, Testimonial } from "./tipi"
