import path from "node:path"
import { fileURLToPath } from "node:url"

import { postgresAdapter } from "@payloadcms/db-postgres"
import { s3Storage } from "@payloadcms/storage-s3"
import { it } from "@payloadcms/translations/languages/it"
import { buildConfig } from "payload"

import { media, utenti } from "./payload/raccolte"
import { sezioni } from "./payload/sezioni"

/**
 * Pannello di modifica dei testi, su /admin.
 *
 * I testi stanno in un database Postgres (Neon), le foto su Cloudflare R2.
 * Il sito li legge da lib/content e non sa che esiste un pannello.
 *
 * Variabili d'ambiente: vedi .env.example e LEGGIMI-TESTI.md.
 */

const dirname = path.dirname(fileURLToPath(import.meta.url))

/* Cloudflare mostra l'endpoint con il nome del bucket in fondo
   (.../lucrezia-media). Copiato cosi', ogni foto finirebbe in una
   sottocartella con il nome del bucket: lo si toglie qui. */
const r2Endpoint = process.env.R2_ENDPOINT?.replace(
  new RegExp(`/${process.env.R2_BUCKET ?? ""}/?$`),
  ""
)

/* Senza le chiavi di R2 le foto caricate restano sul disco locale: va bene
   in sviluppo, non in produzione, dove il disco non e' scrivibile. */
const r2Configurato = Boolean(
  process.env.R2_BUCKET &&
    process.env.R2_ENDPOINT &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY
)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? "",

  admin: {
    user: utenti.slug,
    meta: { titleSuffix: " — Testi del sito" },
    importMap: { baseDir: dirname },
  },

  i18n: {
    supportedLanguages: { it },
    fallbackLanguage: "it",
  },

  /* Il plugin di R2 aggiunge alle foto la colonna `_objectKey`. Senza R2 la
     si aggiunge a mano, nascosta: cosi' lo schema del database e' lo stesso
     con o senza R2, e una migrazione creata in locale non la cancella. */
  collections: [
    utenti,
    r2Configurato
      ? media
      : {
          ...media,
          fields: [...media.fields, { name: "_objectKey", type: "text", admin: { hidden: true } }],
        },
  ],
  globals: sezioni,

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    migrationDir: path.resolve(dirname, "payload/migrazioni"),
    /* In sviluppo lo schema del database segue la configurazione da solo.
       In produzione cambia solo con le migrazioni, eseguite al build. */
    push: process.env.NODE_ENV !== "production",
  }),

  /* Netlify accetta richieste fino a circa 6 MB: oltre, il caricamento
     fallirebbe con un errore poco chiaro. */
  upload: { limits: { fileSize: 5_000_000 } },

  plugins: [
    s3Storage({
      enabled: r2Configurato,
      collections: { media: true },
      bucket: process.env.R2_BUCKET ?? "",
      config: {
        endpoint: r2Endpoint,
        region: "auto",
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
        },
      },
    }),
  ],

  typescript: { outputFile: path.resolve(dirname, "payload/payload-types.ts") },
})
