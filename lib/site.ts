/**
 * Identita' del sito, derivata dai testi in content/generale.json.
 *
 * I valori marcati MOCK nel file JSON sono ipotesi da sostituire con i dati
 * reali: dominio, email sul dominio, partita IVA, LinkedIn.
 */

import { generale } from "@/lib/content";

const { identita, contatti, legale } = generale;

export const site = {
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
} as const;

export const nav = generale.navigazione;
