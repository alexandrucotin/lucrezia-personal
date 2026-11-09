import type { Generale } from "./tipi"

/**
 * Identita' del sito, derivata dalla sezione "Generale e contatti".
 *
 * I valori marcati MOCK nel pannello sono ipotesi da sostituire con i dati
 * reali: dominio, email sul dominio, partita IVA, LinkedIn.
 */
export function creaSite(generale: Generale) {
  const { identita, contatti, legale } = generale

  return {
    url: identita.url,
    name: identita.nome,
    monogram: identita.monogramma,
    role: identita.ruolo,
    tagline: identita.tagline,
    description: identita.descrizione,

    email: contatti.email,
    phone: contatti.telefono,
    phoneHref: contatti.telefonoHref,
    linkedin: contatti.linkedin,

    legal: {
      entity: legale.entita,
      vat: legale.partitaIva,
      city: legale.citta,
      country: legale.paese,
    },

    markets: generale.mercati,
  } as const
}
