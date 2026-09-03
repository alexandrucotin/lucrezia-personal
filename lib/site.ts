/**
 * Configurazione del sito.
 *
 * I valori marcati MOCK sono ipotesi mie, da sostituire con i dati reali.
 * Sono tutti concentrati qui e in lib/content/ per rendere la sostituzione
 * una modifica in un punto solo.
 */

export const site = {
  // MOCK — dominio ipotizzato
  url: "https://www.lucreziaceleste.it",
  name: "Lucrezia Celeste",
  monogram: "LuCe",
  role: "Revenue Manager Short-Term Rental",
  tagline: "Revenue & Strategy",

  // MOCK — email sul dominio invece della Gmail attuale
  email: "lucrezia@lucreziaceleste.it",
  phone: "+39 393 138 4561",
  phoneHref: "+393931384561",
  whatsapp: "393931384561",

  // MOCK — profilo LinkedIn
  linkedin: "https://www.linkedin.com/in/lucrezia-celeste",

  // MOCK — dati fiscali per footer e privacy policy
  legal: {
    entity: "Lucrezia Celeste",
    vat: "IT 0000000000",
    city: "Verona",
    country: "IT",
  },

  markets: ["Verona", "Milano", "Torino", "Lago di Garda", "Londra"],
} as const;

export const nav = [
  { href: "/servizi", label: "Servizi" },
  { href: "/metodo", label: "Metodo" },
  { href: "/risultati", label: "Risultati" },
  { href: "/chi-sono", label: "Chi sono" },
] as const;
