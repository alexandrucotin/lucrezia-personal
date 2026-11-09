import type { CollectionConfig } from "payload"

import { rivalidaDopoEliminazioneFoto, rivalidaDopoModificaFoto } from "./rivalida"

/** Chi puo' entrare nel pannello. Ci si registra solo su invito di un utente gia' presente. */
export const utenti: CollectionConfig = {
  slug: "users",
  labels: { singular: "Utente", plural: "Utenti" },
  admin: { useAsTitle: "email", group: "Impostazioni" },
  auth: true,
  fields: [],
}

/**
 * La libreria delle foto. I file vanno su Cloudflare R2 (vedi
 * payload.config.ts); qui restano descrizione e dimensioni.
 *
 * Le foto sono pubbliche per definizione: stanno sul sito.
 */
export const media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Foto", plural: "Foto" },
  admin: { group: "Impostazioni", useAsTitle: "alt" },
  access: { read: () => true },
  hooks: {
    afterChange: [rivalidaDopoModificaFoto],
    afterDelete: [rivalidaDopoEliminazioneFoto],
  },
  upload: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    /* Senza R2 configurato (in sviluppo) i file finiscono qui, fuori da git. */
    staticDir: "media",
    /* Il ritaglio lo fa il sito, con next/image: nel pannello non serve. */
    crop: false,
    focalPoint: false,
  },
  fields: [
    {
      name: "alt",
      label: "Descrizione della foto",
      type: "textarea",
      required: true,
      admin: {
        description:
          "Letta da chi non vede l'immagine e da Google. Descrivi cosa si vede, per esempio: Lucrezia Celeste sorridente su una terrazza.",
      },
    },
  ],
}
