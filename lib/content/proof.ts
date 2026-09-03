/**
 * Prove: numeri, casi studio, testimonianze, clienti.
 *
 * I dati biografici sono reali (presi dal sito attuale).
 * Tutto quello marcato MOCK è un'ipotesi plausibile per il settore,
 * da sostituire con i dati veri prima della pubblicazione.
 */

import type { StatItem } from "@/components/ui/stat";

export const stats: StatItem[] = [
  { value: "120", label: "unità gestite", note: "nel portafoglio più grande seguito" },
  { value: "4", label: "mercati", note: "Verona, Milano, Lago di Garda, Londra" },
  { value: "2021", label: "nel settore", note: "prima operativa, poi revenue" },
  // MOCK
  { value: "+18%", label: "RevPAR medio", note: "sui portafogli seguiti, primi 12 mesi" },
];

export type CaseStudy = {
  slug: string;
  client: string;
  units: number;
  market: string;
  horizon: string;
  problem: string;
  action: string;
  results: { value: string; label: string }[];
  quote?: string;
};

/** MOCK — tre casi costruiti su dinamiche reali del settore. */
export const caseStudies: CaseStudy[] = [
  {
    slug: "verona-centro",
    client: "Property manager",
    units: 42,
    market: "Verona, centro storico",
    horizon: "8 mesi",
    problem:
      "Tariffa fissa per stagione e min stay identico su tutte le unità. I bilocali venivano svenduti nei weekend di fiera, i monolocali restavano vuoti in settimana.",
    action:
      "Segmentazione del portafoglio in tre cluster tariffari, calendario eventi locale, min stay differenziato per taglia e giorno della settimana.",
    results: [
      { value: "+19%", label: "RevPAR" },
      { value: "+7 pt", label: "occupancy" },
      { value: "-11%", label: "notti sotto costo" },
    ],
    quote:
      "Avevamo i dati, non sapevamo leggerli. In due mesi abbiamo capito quali unità stavamo svendendo.",
  },
  {
    slug: "milano-business",
    client: "Azienda short-term rental",
    units: 115,
    market: "Milano, zona Fiera e Navigli",
    horizon: "11 mesi",
    problem:
      "Il 78% delle notti arrivava da un solo canale. Nessun controllo sul mix, cancellazioni alte e ADR schiacciato in bassa stagione.",
    action:
      "Riequilibrio del mix canali, politiche di cancellazione differenziate per finestra di prenotazione, tariffe corporate per i soggiorni lunghi.",
    results: [
      { value: "+12%", label: "ADR bassa stagione" },
      { value: "-22%", label: "cancellazioni" },
      { value: "54%", label: "dipendenza dal canale principale, da 78%" },
    ],
  },
  {
    slug: "lago-di-garda",
    client: "Gestore boutique",
    units: 14,
    market: "Lago di Garda",
    horizon: "una stagione",
    problem:
      "Sconti aggressivi da aprile e a ottobre per riempire il calendario. Il calendario si riempiva, il fatturato no.",
    action:
      "Stop agli sconti a tappeto, prezzi minimi per unità, apertura graduale delle disponibilità e last minute solo sotto i sette giorni.",
    results: [
      { value: "+24%", label: "fatturato" },
      { value: "-6%", label: "notti vendute" },
      { value: "+32%", label: "ADR di spalla" },
    ],
    quote: "Vendere meno notti e incassare di più è stato controintuitivo. Ha funzionato.",
  },
];

export type Testimonial = {
  quote: string;
  role: string;
  detail: string;
};

/** MOCK — testimonianze anonimizzate per ruolo, dimensione e mercato. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "La differenza è che Lucrezia è stata operativa. Sa cosa succede davvero quando cambi un min stay il venerdì pomeriggio.",
    role: "Founder",
    detail: "azienda STR, 115 unità, Milano",
  },
  {
    quote:
      "Non ci ha venduto un software. Ci ha insegnato a usare quello che avevamo già pagato e che stavamo usando al trenta per cento.",
    role: "Revenue specialist",
    detail: "60 unità, Lago di Garda",
  },
  {
    quote:
      "Il report iniziale ci ha messo davanti a due anni di decisioni sbagliate, con i numeri. Scomodo e utilissimo.",
    role: "Property manager",
    detail: "42 unità, Verona",
  },
];

/** MOCK — nomi di fantasia, resi come wordmark tipografici e non come loghi finti. */
export const clients = [
  "Adige Stay",
  "Casa Verona Suites",
  "Milano Host Lab",
  "Garda Rooms",
  "Borgo Collection",
] as const;

/** Strumenti reali con cui lavora, dal sito attuale. */
export const tools = [
  "PriceLabs",
  "Smartpricing",
  "KrossBooking",
  "Booking.com",
  "Airbnb",
  "Vrbo",
] as const;
