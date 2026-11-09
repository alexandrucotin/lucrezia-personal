/**
 * Le sezioni della home che si possono riordinare o nascondere dal
 * pannello. L'apertura (titolo e numeri) resta sempre in cima e non e' qui.
 *
 * Sta in lib/content perche' la usano sia il pannello sia la pagina.
 */
export const SEZIONI_HOME = [
  { value: "clienti", label: "Fascia clienti" },
  { value: "diagnosi", label: "Diagnosi" },
  { value: "servizi", label: "Servizi" },
  { value: "risultati", label: "Risultati (casi studio)" },
  { value: "metodo", label: "Metodo" },
  { value: "chiSono", label: "Chi sono" },
  { value: "contatti", label: "Invito finale e prossimi passi" },
] as const

export type SezioneHome = (typeof SEZIONI_HOME)[number]["value"]
