/**
 * Importa nel pannello i testi e le foto che stavano in content/*.json.
 *
 * Si lancia una volta per database (in locale, poi in produzione):
 *
 *   npm run importa-testi
 *
 * Usa le variabili d'ambiente di .env: DATABASE_URL decide in quale
 * database scrive, le chiavi R2 (se ci sono) dove finiscono le foto.
 *
 * ATTENZIONE: i testi del database vengono SOVRASCRITTI con quelli dei file
 * JSON, e ogni lancio completo ricarica le foto nella libreria. Non lanciarlo
 * dopo che il pannello e' in uso.
 *
 * Per reimportare solo alcune sezioni (senza toccare le foto):
 *
 *   SEZIONI=generale,servizi npm run importa-testi
 */

import { createHash } from "node:crypto"
import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"

import config from "@payload-config"
import { getPayload, type GlobalSlug, type Payload } from "payload"

const radice = process.cwd()

const soloAlcune = process.env.SEZIONI?.split(",").map((s) => s.trim()).filter(Boolean)

/* Sezione del pannello → file di partenza. */
const SEZIONI: [GlobalSlug, string][] = [
  ["generale", "generale"],
  ["home", "home"],
  ["servizi", "servizi"],
  ["metodo", "metodo"],
  ["risultati", "risultati"],
  ["chi-sono", "chi-sono"],
  ["contatti", "contatti"],
]

/* La descrizione che accompagnava ogni foto nei JSON diventa la
   descrizione della foto nella libreria. */
type Sezione = {
  chiSono?: { immagineDescrizione?: string | null }
  foto?: { descrizione?: string | null }
}

const DESCRIZIONI_FOTO: Partial<Record<GlobalSlug, (dati: Sezione) => string>> = {
  home: (d) => d.chiSono?.immagineDescrizione ?? "",
  "chi-sono": (d) => d.foto?.descrizione ?? "",
}

type Foto = { discriminant: "esistente" | "nuova"; value: string }

const eFoto = (v: unknown): v is Foto =>
  typeof v === "object" &&
  v !== null &&
  "discriminant" in v &&
  "value" in v &&
  Object.keys(v).length === 2

async function importaFoto(payload: Payload, percorso: string, alt: string, cache: Map<string, number | string>) {
  const contenuto = readFileSync(path.join(radice, "public", percorso))
  /* Due percorsi con la stessa foto (succedeva con Keystatic) diventano una
     sola foto nella libreria. */
  const impronta = createHash("sha1").update(contenuto).digest("hex")
  const giaFatta = cache.get(impronta)
  if (giaFatta) return giaFatta

  /* Le foto caricate con Keystatic si chiamavano tutte "value.png": il nome
     del file nella libreria lo prende dalla cartella, per distinguerle. */
  const pezzi = percorso.replace(/^\/images\//, "").split("/")
  const estensione = path.extname(percorso)
  const nome =
    pezzi.length > 1 ? `${pezzi.slice(0, -1).join("-")}${estensione}`.toLowerCase() : pezzi[0]

  const esistente = await payload.find({
    collection: "media",
    where: { filename: { equals: nome } },
    limit: 1,
  })

  const id =
    esistente.docs[0]?.id ??
    (
      await payload.create({
        collection: "media",
        data: { alt },
        file: {
          data: contenuto,
          mimetype: estensione === ".png" ? "image/png" : "image/jpeg",
          name: nome,
          size: contenuto.length,
        },
        context: { senzaRivalidazione: true },
      })
    ).id

  payload.logger.info(`[foto] ${percorso} → ${nome}`)
  cache.set(impronta, id)
  return id
}

/**
 * Riporta i dati dei JSON alla forma del pannello:
 * - un elenco di stringhe diventa un elenco di righe { testo }
 * - una foto { discriminant, value } diventa il riferimento alla libreria
 * - le descrizioni delle foto si svuotano, perche' ora stanno sulla foto
 */
async function converti(valore: unknown, foto: (f: Foto) => Promise<number | string>): Promise<unknown> {
  if (Array.isArray(valore)) {
    if (valore.every((v) => typeof v === "string")) return valore.map((testo) => ({ testo }))
    return Promise.all(valore.map((v) => converti(v, foto)))
  }
  if (eFoto(valore)) return foto(valore)
  if (typeof valore === "object" && valore !== null) {
    const risultato: Record<string, unknown> = {}
    for (const [chiave, v] of Object.entries(valore)) risultato[chiave] = await converti(v, foto)
    return risultato
  }
  return valore
}

const payload = await getPayload({ config })
const fotoImportate = new Map<string, number | string>()

for (const [slug, file] of SEZIONI) {
  if (soloAlcune && !soloAlcune.includes(slug)) continue
  const json = JSON.parse(readFileSync(path.join(radice, "content", `${file}.json`), "utf8"))
  const descrizione = DESCRIZIONI_FOTO[slug]?.(json) ?? ""

  const dati = (await converti(json, (f) =>
    importaFoto(payload, f.value, descrizione, fotoImportate)
  )) as Sezione & Record<string, unknown>

  if (dati.chiSono) dati.chiSono.immagineDescrizione = null
  if (dati.foto) dati.foto.descrizione = null

  await payload.updateGlobal({ slug, data: dati as never, context: { senzaRivalidazione: true } })
  payload.logger.info(`[testi] ${slug} importata`)
}

/* Le altre foto del sito finiscono in libreria, cosi' restano fra quelle
   che si possono scegliere. La descrizione si ricava dal nome del file:
   va riletta dal pannello. */
for (const file of soloAlcune ? [] : readdirSync(path.join(radice, "public/images"))) {
  if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) continue
  const alt = file
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/^./, (c) => c.toUpperCase())
  await importaFoto(payload, `/images/${file}`, alt, fotoImportate)
}

payload.logger.info("Fatto. Apri /admin per controllare.")
process.exit(0)
