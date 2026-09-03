/** Aree di intervento, metodo e pacchetti. Una pagina indicizzabile per servizio. */

export type Service = {
  slug: string;
  index: string;
  eyebrow: string;
  title: string;
  claim: string;
  summary: string;
  /** Apertura della pagina dedicata. */
  lead: string;
  /** Cosa consegna, in concreto. Nessun beneficio astratto. */
  deliverables: string[];
  /** Dire per chi non è vale quanto dire per chi è. */
  forWhom: string[];
  notFor: string;
  /** Che cosa serve da parte del cliente perché il lavoro parta. */
  needs: string[];
  /** Quale diagramma illustra questo servizio. */
  diagram: "matrix" | "calendar" | "kpi" | null;
  keyword: string;
  duration: string;
  metaTitle: string;
  metaDescription: string;
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "analisi-portafoglio",
    index: "01",
    eyebrow: "Diagnosi",
    title: "Analisi del portafoglio",
    claim: "Prima di toccare una tariffa, guardo i numeri che hai già.",
    summary:
      "Ventiquattro mesi di storico, unità per unità: dove hai svenduto, dove hai tenuto il prezzo troppo alto e per quante notti, quali competitor ti stanno battendo e su quale finestra di prenotazione.",
    lead: "Quasi tutti i portafogli che analizzo hanno già i dati per capire dove stanno perdendo. Il problema è che sono aggregati, sparsi su tre sistemi diversi e nessuno ha il tempo di guardarli. Questo è il lavoro che li rende una decisione.",
    deliverables: [
      "Audit dei KPI storici: RevPAR, ADR, occupancy, lead time, lunghezza media del soggiorno",
      "Benchmark sul competitor set reale, non sulla media di città",
      "Mappa del potenziale inespresso per singola unità, con stima in euro",
      "Analisi del mix canali e del costo di distribuzione effettivo",
      "Report con le prime cinque azioni ordinate per impatto",
    ],
    forWhom: [
      "Hai fra le 10 e le 150 unità e almeno dodici mesi di storico",
      "Sospetti di lasciare margine sul tavolo ma non sai dove",
      "Devi decidere se vale la pena assumere un revenue manager interno",
      "Stai per prendere in gestione un nuovo blocco di immobili",
    ],
    notFor:
      "Se gestisci meno di dieci unità, il margine di manovra è troppo stretto perché l'analisi si ripaghi. Preferisco dirlo prima che dopo.",
    needs: [
      "Accesso in sola lettura al gestionale, o export degli ultimi 24 mesi",
      "Accesso agli extranet OTA in lettura",
      "Un'ora del tuo tempo per la call iniziale, un'ora per la presentazione",
    ],
    diagram: "matrix",
    keyword: "analisi portafoglio affitti brevi",
    duration: "3 settimane",
    metaTitle: "Analisi del portafoglio affitti brevi | Audit revenue e benchmark",
    metaDescription:
      "Audit dei KPI storici, benchmark sul competitor set e mappa del potenziale inespresso unità per unità. Per property manager con 10-150 unità.",
    faq: [
      {
        q: "Quanto storico serve?",
        a: "Dodici mesi sono il minimo per avere un confronto stagionale sensato, ventiquattro sono l'ideale perché permettono di distinguere una tendenza da un anno anomalo. Con meno di dodici mesi si può fare comunque, ma il report sarà più prudente nelle conclusioni.",
      },
      {
        q: "Che differenza c'è rispetto ai report che mi dà già il mio tool?",
        a: "I tool di pricing riportano quello che è successo. Qui la domanda è un'altra: quanto avresti potuto incassare, unità per unità, e quale decisione ha prodotto lo scarto. È un lavoro di interpretazione, non di estrazione.",
      },
      {
        q: "Il report resta mio anche se non proseguiamo?",
        a: "Sì. È un lavoro chiuso in sé: paghi l'analisi, ricevi il documento e le priorità, e sei libero di eseguirle da solo o con chiunque preferisca.",
      },
    ],
  },
  {
    slug: "revenue-e-pricing",
    index: "02",
    eyebrow: "Esecuzione",
    title: "Revenue & pricing",
    claim: "La strategia non vale niente se non arriva sul calendario.",
    summary:
      "Costruisco il piano tariffario e lo eseguo: prezzi dinamici, restrizioni, min stay, gestione della bassa stagione e dei buchi di calendario. Sul tuo gestionale, senza migrazioni.",
    lead: "Il piano tariffario più intelligente del mondo non serve a niente se resta in un documento. Questo è il servizio in cui la strategia diventa il prezzo che l'ospite vede stanotte su Booking, e resta tarata settimana dopo settimana.",
    deliverables: [
      "Setup e taratura dello strumento di dynamic pricing (PriceLabs, Smartpricing)",
      "Calendario tariffario stagionale, con eventi e finestre di domanda locale",
      "Politica di min stay, restrizioni e regole di last minute",
      "Ottimizzazione dei contenuti e del posizionamento sulle OTA",
      "Revisione settimanale del pick-up e correzioni in corsa",
      "Report mensile con scostamento su budget e anno precedente",
    ],
    forWhom: [
      "Hai un tool di pricing attivo ma nessuno lo tara davvero",
      "Il tuo team è bravo sull'operativo e non ha tempo per il revenue",
      "Vuoi una figura responsabile del risultato, non un consiglio una tantum",
      "Sei sopra le trenta unità e il pricing manuale non regge più",
    ],
    notFor:
      "Se cerchi qualcuno che imposti tutto una volta e sparisca, questo non è il formato giusto: il revenue è una manutenzione, non un'installazione.",
    needs: [
      "Accesso operativo al gestionale e al channel manager",
      "Un referente interno per le decisioni che toccano l'operativo",
      "Un impegno minimo di sei mesi, perché prima non si vede una stagione intera",
    ],
    diagram: "calendar",
    keyword: "consulenza dynamic pricing affitti brevi",
    duration: "Continuativo",
    metaTitle: "Consulenza dynamic pricing affitti brevi | Revenue e OTA",
    metaDescription:
      "Piano tariffario, dynamic pricing, restrizioni e ottimizzazione OTA eseguiti sul tuo gestionale. Revisione settimanale del pick-up e report mensile.",
    faq: [
      {
        q: "Devo cambiare channel manager o PMS?",
        a: "No. Lavoro sugli strumenti che hai già. Se durante il lavoro emerge che il tuo stack ti sta costando opportunità te lo dico con i numeri, ma la migrazione non è mai una condizione per iniziare.",
      },
      {
        q: "Chi decide i prezzi, tu o io?",
        a: "La strategia si approva insieme, all'inizio e a ogni cambio di stagione. Dentro quei paletti le correzioni settimanali le faccio io, altrimenti servirebbe la tua firma su ogni singolo giorno di calendario e il vantaggio del dinamico sparirebbe.",
      },
      {
        q: "Come si misura se sta funzionando?",
        a: "Su RevPAR e sul confronto con lo stesso periodo dell'anno precedente, non sull'occupancy. Il report mensile mostra lo scostamento e cosa l'ha prodotto, incluse le settimane andate peggio.",
      },
    ],
  },
  {
    slug: "formazione-e-affiancamento",
    index: "03",
    eyebrow: "Autonomia",
    title: "Formazione e affiancamento",
    claim: "Deve funzionare anche nelle settimane in cui non ci sono io.",
    summary:
      "Se il revenue dipende da una persona sola, è un rischio. Metto il tuo team in condizione di leggere i dati e prendere decisioni tariffarie da solo, con processi scritti e una dashboard che si guarda in cinque minuti.",
    lead: "Alcuni portafogli non hanno bisogno di un revenue manager esterno a tempo indeterminato: hanno bisogno che qualcuno metta ordine, scriva i processi e insegni al team a leggerli. Poi si toglie di mezzo.",
    deliverables: [
      "Setup da zero dello stack di revenue management",
      "Processi documentati: chi guarda cosa, quando, e con quale soglia di intervento",
      "Quattro sessioni di formazione sul portafoglio reale, non su casi teorici",
      "Dashboard KPI con le sole metriche su cui si decide",
      "Tre mesi di supporto asincrono dopo la consegna",
    ],
    forWhom: [
      "Hai già una persona interna che potrebbe occuparsi di revenue",
      "Vuoi ridurre la dipendenza da consulenti esterni",
      "Il know-how oggi è nella testa di una persona sola",
      "Stai strutturando l'azienda e ti servono processi scritti",
    ],
    notFor:
      "Se non c'è nessuno in azienda che possa dedicare qualche ora a settimana al revenue, la formazione non attecchisce. Meglio il formato continuativo.",
    needs: [
      "Una o due persone del team disponibili per le sessioni",
      "Accesso agli strumenti che userete davvero",
      "La volontà di cambiare qualche processo, non solo di aggiungere un tool",
    ],
    diagram: "kpi",
    keyword: "formazione revenue management affitti brevi",
    duration: "6-8 settimane",
    metaTitle: "Formazione revenue management affitti brevi | Setup e affiancamento",
    metaDescription:
      "Setup dello stack di revenue management, processi documentati e formazione del team sul portafoglio reale. PriceLabs, Smartpricing, dashboard KPI.",
    faq: [
      {
        q: "La formazione è in presenza o da remoto?",
        a: "Da remoto per impostazione, in presenza a Verona o Milano se preferisci e il calendario lo permette. Le sessioni si fanno sul vostro portafoglio, con i vostri dati aperti davanti: non sono lezioni.",
      },
      {
        q: "Cosa resta al team alla fine?",
        a: "I processi scritti, la dashboard configurata, le registrazioni delle sessioni e tre mesi in cui potete scrivermi. L'obiettivo dichiarato è che dopo non vi serva più.",
      },
    ],
  },
];

export type Phase = {
  index: string;
  title: string;
  duration: string;
  body: string;
  /** Dettaglio per la pagina metodo. */
  detail: string;
  output: string;
};

export const method: Phase[] = [
  {
    index: "01",
    title: "Diagnosi",
    duration: "Settimane 1-3",
    body: "Accesso in lettura ai tuoi dati: gestionale, channel manager, estratti OTA. Ricostruisco lo storico e lo confronto con il mercato. Alla fine sai quanto stai lasciando sul tavolo e dove.",
    detail:
      "La prima cosa che faccio non è guardare i prezzi, è guardare cosa è successo quando li avete cambiati. Ricostruisco due anni di storico per unità, isolo le settimane in cui il calendario si è riempito troppo in fretta — quasi sempre significa prezzo basso — e quelle in cui è rimasto vuoto oltre la finestra utile. Poi confronto tutto con il competitor set reale, che non è la media della città ma le venti unità che ti tolgono davvero le prenotazioni.",
    output: "Report con la mappa del portafoglio e le prime cinque azioni per impatto",
  },
  {
    index: "02",
    title: "Strategia",
    duration: "Settimane 4-5",
    body: "Piano tariffario per stagione e per unità, politica di restrizioni, priorità sui canali. Documento condiviso, discusso e approvato prima di toccare qualsiasi prezzo.",
    detail:
      "Il piano si scrive prima e si approva insieme. Contiene le fasce tariffarie per stagione e per cluster di unità, la politica di min stay e restrizioni, il calendario degli eventi locali che spostano la domanda, e le regole di last minute. È un documento che il tuo team deve poter leggere e contestare: se una regola non è difendibile a voce, non entra.",
    output: "Piano tariffario approvato, con le regole scritte in modo verificabile",
  },
  {
    index: "03",
    title: "Esecuzione",
    duration: "Continuativa",
    body: "Implementazione sugli strumenti che usi già. Controllo settimanale del pick-up, correzioni sulle finestre scoperte, gestione della bassa stagione. Report mensile.",
    detail:
      "Ogni settimana guardo il pick-up: quante prenotazioni sono entrate, per quali date, a che prezzo. Le finestre che restano scoperte oltre la soglia si correggono subito, quelle che si riempiono troppo in fretta si alzano. Non è un'attività creativa, è manutenzione: il valore sta nel farla ogni settimana e non ogni tanto.",
    output: "Report mensile con scostamento su anno precedente e sulle azioni fatte",
  },
  {
    index: "04",
    title: "Trasferimento",
    duration: "Dal terzo mese",
    body: "Processi scritti e formazione del team. L'obiettivo dichiarato è che tu possa fare a meno di me sulla routine, e chiamarmi sulle decisioni.",
    detail:
      "Dal terzo mese comincio a scrivere quello che faccio e a insegnarlo. Non per generosità: un portafoglio in cui il revenue dipende da una persona sola è fragile, e se quella persona sono io il rischio ce l'hai comunque. Alla fine il tuo team gestisce la routine e mi chiama sulle decisioni di stagione.",
    output: "Processi documentati, dashboard KPI e team autonomo sulla gestione ordinaria",
  },
];

/** MOCK — struttura e fasce di prezzo ipotizzate, da validare con Lucrezia. */
export const packages = [
  {
    name: "Audit",
    price: "da 1.200 €",
    unit: "una tantum",
    duration: "3 settimane",
    body: "Analisi completa del portafoglio, benchmark e report con le priorità. Si chiude con una call di presentazione dei risultati.",
    items: ["Audit KPI 24 mesi", "Benchmark competitor set", "Report + call"],
    highlight: false,
  },
  {
    name: "Revenue continuativo",
    price: "da 900 €",
    unit: "al mese",
    duration: "minimo 6 mesi",
    body: "Gestione operativa di pricing e canali. È il formato che scelgono i portafogli sopra le trenta unità.",
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
