/** Aree di intervento, metodo e pacchetti. Una pagina indicizzabile per servizio. */

export type Service = {
  slug: string;
  index: string;
  eyebrow: string;
  title: string;
  claim: string;
  summary: string;
  /** Cosa consegna, in concreto. Nessun beneficio astratto. */
  deliverables: string[];
  /** Keyword primaria della pagina dedicata. */
  keyword: string;
  duration: string;
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "analisi-portafoglio",
    index: "01",
    eyebrow: "Diagnosi",
    title: "Analisi del portafoglio",
    claim: "Prima di toccare una tariffa, guardo i numeri che hai già.",
    summary:
      "Ventiquattro mesi di storico, unità per unità: dove hai svenduto, dove hai tenuto il prezzo troppo alto e per quante notti, quali competitor ti stanno battendo e su quale finestra di prenotazione.",
    deliverables: [
      "Audit dei KPI storici: RevPAR, ADR, occupancy, lead time, lunghezza media del soggiorno",
      "Benchmark sul competitor set reale, non sulla media di città",
      "Mappa del potenziale inespresso per singola unità, con stima in euro",
      "Analisi del mix canali e del costo di distribuzione effettivo",
      "Report con le prime cinque azioni ordinate per impatto",
    ],
    keyword: "analisi portafoglio affitti brevi",
    duration: "3 settimane",
    metaTitle: "Analisi del portafoglio affitti brevi | Audit revenue e benchmark",
    metaDescription:
      "Audit dei KPI storici, benchmark sul competitor set e mappa del potenziale inespresso unità per unità. Per property manager con 10-150 unità.",
  },
  {
    slug: "revenue-e-pricing",
    index: "02",
    eyebrow: "Esecuzione",
    title: "Revenue & pricing",
    claim: "La strategia non vale niente se non arriva sul calendario.",
    summary:
      "Costruisco il piano tariffario e lo eseguo: prezzi dinamici, restrizioni, min stay, gestione della bassa stagione e dei buchi di calendario. Sul tuo gestionale, senza migrazioni.",
    deliverables: [
      "Setup e taratura dello strumento di dynamic pricing (PriceLabs, Smartpricing)",
      "Calendario tariffario stagionale, con eventi e finestre di domanda locale",
      "Politica di min stay, restrizioni e regole di last minute",
      "Ottimizzazione dei contenuti e del posizionamento sulle OTA",
      "Revisione settimanale del pick-up e correzioni in corsa",
      "Report mensile con scostamento su budget e anno precedente",
    ],
    keyword: "consulenza dynamic pricing affitti brevi",
    duration: "Continuativo",
    metaTitle: "Consulenza dynamic pricing affitti brevi | Revenue e OTA",
    metaDescription:
      "Piano tariffario, dynamic pricing, restrizioni e ottimizzazione OTA eseguiti sul tuo gestionale. Revisione settimanale del pick-up e report mensile.",
  },
  {
    slug: "formazione-e-affiancamento",
    index: "03",
    eyebrow: "Autonomia",
    title: "Formazione e affiancamento",
    claim: "Deve funzionare anche nelle settimane in cui non ci sono io.",
    summary:
      "Se il revenue dipende da una persona sola, è un rischio. Metto il tuo team in condizione di leggere i dati e prendere decisioni tariffarie da solo, con processi scritti e una dashboard che si guarda in cinque minuti.",
    deliverables: [
      "Setup da zero dello stack di revenue management",
      "Processi documentati: chi guarda cosa, quando, e con quale soglia di intervento",
      "Quattro sessioni di formazione sul portafoglio reale, non su casi teorici",
      "Dashboard KPI con le sole metriche su cui si decide",
      "Tre mesi di supporto asincrono dopo la consegna",
    ],
    keyword: "formazione revenue management affitti brevi",
    duration: "6-8 settimane",
    metaTitle: "Formazione revenue management affitti brevi | Setup e affiancamento",
    metaDescription:
      "Setup dello stack di revenue management, processi documentati e formazione del team sul portafoglio reale. PriceLabs, Smartpricing, dashboard KPI.",
  },
];

export const method = [
  {
    index: "01",
    title: "Diagnosi",
    duration: "Settimane 1-3",
    body: "Accesso in lettura ai tuoi dati: gestionale, channel manager, estratti OTA. Ricostruisco lo storico e lo confronto con il mercato. Alla fine sai quanto stai lasciando sul tavolo e dove.",
  },
  {
    index: "02",
    title: "Strategia",
    duration: "Settimane 4-5",
    body: "Piano tariffario per stagione e per unità, politica di restrizioni, priorità sui canali. Documento condiviso, discusso e approvato prima di toccare qualsiasi prezzo.",
  },
  {
    index: "03",
    title: "Esecuzione",
    duration: "Continuativa",
    body: "Implementazione sugli strumenti che usi già. Controllo settimanale del pick-up, correzioni sulle finestre scoperte, gestione della bassa stagione. Report mensile.",
  },
  {
    index: "04",
    title: "Trasferimento",
    duration: "Dal terzo mese",
    body: "Processi scritti e formazione del team. L'obiettivo dichiarato è che tu possa fare a meno di me sulla routine, e chiamarmi sulle decisioni.",
  },
] as const;

/** MOCK — struttura e fasce di prezzo ipotizzate, da validare con Lucrezia. */
export const packages = [
  {
    name: "Audit",
    price: "da 1.200 €",
    unit: "una tantum",
    duration: "3 settimane",
    body: "Analisi completa del portafoglio, benchmark e report con le priorità. Si chiude con una call di presentazione dei risultati.",
    items: ["Audit KPI 24 mesi", "Benchmark competitor set", "Report + call"],
    highlight: false,
  },
  {
    name: "Revenue continuativo",
    price: "da 900 €",
    unit: "al mese",
    duration: "minimo 6 mesi",
    body: "Gestione operativa di pricing e canali. È il formato che scelgono i portafogli sopra le trenta unità.",
    items: [
      "Tutto l'Audit, incluso",
      "Pricing e restrizioni gestiti",
      "Revisione settimanale",
      "Report mensile",
    ],
    highlight: true,
  },
  {
    name: "Affiancamento team",
    price: "da 2.500 €",
    unit: "a progetto",
    duration: "6-8 settimane",
    body: "Per chi vuole la competenza in casa. Setup, processi e formazione, poi il team cammina da solo.",
    items: ["Setup stack completo", "Processi documentati", "4 sessioni di formazione"],
    highlight: false,
  },
] as const;
