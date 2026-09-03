import { config, fields, singleton } from "@keystatic/core";

/**
 * Pannello di modifica dei testi.
 *
 * Scrive direttamente nei file content/*.json e fa un commit su GitHub: nessun
 * database, nessun server, nessun costo. Il sito legge quei file e non sa che
 * esiste un pannello — se un giorno Keystatic va rimosso, si cancella questo
 * file e il sito continua a funzionare identico.
 *
 * In sviluppo scrive sul disco locale. In produzione serve una GitHub App:
 * vedi il file LEGGIMI-TESTI.md.
 */

const testo = (label: string, description?: string) =>
  fields.text({ label, description, validation: { length: { min: 1 } } });

const paragrafo = (label: string, description?: string) =>
  fields.text({ label, description, multiline: true, validation: { length: { min: 1 } } });

const voceValore = fields.array(
  fields.object({
    voce: testo("Etichetta"),
    valore: testo("Valore"),
  }),
  { label: "Scheda", itemLabel: (props) => props.fields.voce.value },
);

const elencoTesti = (label: string, itemLabel: string) =>
  fields.array(fields.text({ label: itemLabel, multiline: true }), {
    label,
    itemLabel: (props) => props.value.slice(0, 70),
  });

const domande = fields.array(
  fields.object({
    q: testo("Domanda"),
    a: paragrafo("Risposta"),
  }),
  { label: "Domande frequenti", itemLabel: (props) => props.fields.q.value },
);

const meta = fields.object(
  {
    titolo: testo("Titolo per Google", "Compare come titolo blu nei risultati di ricerca"),
    descrizione: paragrafo(
      "Descrizione per Google",
      "Il testo grigio sotto il titolo nei risultati di ricerca. Circa 155 caratteri.",
    ),
  },
  { label: "Ricerca su Google" },
);

const repo = process.env.NEXT_PUBLIC_KEYSTATIC_REPO as `${string}/${string}` | undefined;

export default config({
  /*
   * La modalita' si decide da una variabile PUBBLICA, non dai segreti: la
   * configurazione viene letta sia dal server sia dal browser, e leggendo un
   * segreto lato client si otterrebbe "non definito" — cioe' due modalita'
   * diverse nei due ambienti.
   *
   * Senza NEXT_PUBLIC_KEYSTATIC_REPO il pannello lavora sui file locali, che
   * e' anche il modo giusto di usarlo in sviluppo.
   */
  storage: repo
    ? { kind: "github", repo }
    : { kind: "local" },

  ui: {
    brand: { name: "Testi del sito" },
    navigation: {
      Pagine: ["home", "servizi", "metodo", "risultati", "chiSono", "contatti"],
      Generale: ["generale"],
    },
  },

  singletons: {
    generale: singleton({
      label: "Generale e contatti",
      path: "content/generale",
      format: { data: "json" },
      schema: {
        identita: fields.object(
          {
            nome: testo("Nome"),
            monogramma: testo("Monogramma"),
            ruolo: testo("Ruolo"),
            tagline: testo("Sottotitolo del logo"),
            url: testo("Indirizzo del sito", "Per esempio https://www.lucreziaceleste.it"),
            descrizione: paragrafo("Descrizione dell'attività"),
          },
          { label: "Identità" },
        ),
        contatti: fields.object(
          {
            email: testo("Email"),
            telefono: testo("Telefono", "Come va mostrato, per esempio +39 393 138 4561"),
            telefonoHref: testo("Telefono senza spazi", "Per esempio +393931384561"),
            linkedin: testo("Indirizzo LinkedIn"),
          },
          { label: "Contatti" },
        ),
        legale: fields.object(
          {
            entita: testo("Intestazione"),
            partitaIva: testo("Partita IVA"),
            citta: testo("Città"),
            paese: testo("Paese", "Sigla di due lettere, per esempio IT"),
          },
          { label: "Dati fiscali" },
        ),
        mercati: fields.array(fields.text({ label: "Mercato" }), {
          label: "Mercati",
          itemLabel: (props) => props.value,
        }),
        strumenti: fields.array(fields.text({ label: "Strumento" }), {
          label: "Strumenti",
          itemLabel: (props) => props.value,
        }),
        navigazione: fields.array(
          fields.object({ href: testo("Indirizzo"), label: testo("Voce di menu") }),
          { label: "Menu", itemLabel: (props) => props.fields.label.value },
        ),
        footer: fields.object({ descrizione: paragrafo("Testo del piè di pagina") }, {
          label: "Piè di pagina",
        }),
        invitoFinale: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: testo("Titolo"),
            testo: paragrafo("Testo"),
            pulsante: testo("Pulsante"),
          },
          { label: "Invito finale", description: "Il riquadro verde in fondo a ogni pagina" },
        ),
        intestazione: fields.object({ pulsante: testo("Pulsante in alto a destra") }, {
          label: "Intestazione",
        }),
      },
    }),

    home: singleton({
      label: "Home",
      path: "content/home",
      format: { data: "json" },
      schema: {
        meta,
        hero: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo", "La prima parte, in nero"),
            titoloEvidenziato: paragrafo("Titolo evidenziato", "La seconda parte, in verde"),
            sottotitolo: paragrafo("Sottotitolo"),
            pulsantePrimario: testo("Pulsante principale"),
            pulsanteSecondario: testo("Pulsante secondario"),
            scheda: voceValore,
          },
          { label: "Apertura" },
        ),
        clienti: fields.object(
          { occhiello: testo("Occhiello"), nota: testo("Nota a destra") },
          { label: "Fascia clienti" },
        ),
        diagnosi: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            commentoGrafico: paragrafo("Commento accanto al grafico"),
            commentoGraficoSecondario: paragrafo("Seconda riga del commento"),
            sintomi: fields.array(
              fields.object({
                indice: testo("Numero"),
                titolo: testo("Titolo"),
                testo: paragrafo("Testo"),
              }),
              { label: "Sintomi", itemLabel: (props) => props.fields.titolo.value },
            ),
          },
          { label: "Diagnosi" },
        ),
        servizi: fields.object(
          { occhiello: testo("Occhiello"), titolo: paragrafo("Titolo"), link: testo("Link") },
          { label: "Sezione servizi" },
        ),
        risultati: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            istruzione: testo("Istruzione per lo scorrimento"),
            nota: paragrafo("Nota finale"),
          },
          { label: "Sezione risultati" },
        ),
        metodo: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            sottotitolo: paragrafo("Sottotitolo"),
            link: testo("Link"),
          },
          { label: "Sezione metodo" },
        ),
        chiSono: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            paragrafi: elencoTesti("Paragrafi", "Paragrafo"),
            testoFoto: testo("Descrizione della foto", "Letta da chi non vede l'immagine"),
          },
          { label: "Sezione chi sono" },
        ),
        contatti: fields.object({ passi: elencoTesti("Passi", "Passo") }, {
          label: "Cosa succede dopo",
        }),
      },
    }),

    servizi: singleton({
      label: "Servizi",
      path: "content/servizi",
      format: { data: "json" },
      schema: {
        meta,
        pagina: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            sottotitolo: paragrafo("Sottotitolo"),
            scheda: voceValore,
          },
          { label: "Apertura" },
        ),
        prezzi: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            testo: paragrafo("Testo"),
            pacchetti: fields.array(
              fields.object({
                name: testo("Nome"),
                price: testo("Prezzo"),
                unit: testo("Unità", "Per esempio: al mese"),
                duration: testo("Durata"),
                body: paragrafo("Descrizione"),
                items: elencoTesti("Cosa include", "Voce"),
                highlight: fields.checkbox({ label: "In evidenza" }),
              }),
              { label: "Pacchetti", itemLabel: (props) => props.fields.name.value },
            ),
          },
          { label: "Prezzi" },
        ),
        elenco: fields.array(
          fields.object({
            slug: testo("Indirizzo", "Parte finale dell'URL. Cambiarlo rompe i link esistenti."),
            index: testo("Numero"),
            eyebrow: testo("Occhiello"),
            title: testo("Titolo"),
            claim: paragrafo("Frase principale"),
            summary: paragrafo("Riassunto"),
            lead: paragrafo("Apertura della pagina dedicata"),
            deliverables: elencoTesti("Cosa ricevi", "Voce"),
            forWhom: elencoTesti("Per chi è", "Voce"),
            notFor: paragrafo("Per chi non è"),
            needs: elencoTesti("Cosa serve da te", "Voce"),
            diagram: fields.select({
              label: "Grafico",
              options: [
                { label: "Matrice del portafoglio", value: "matrix" },
                { label: "Calendario tariffario", value: "calendar" },
                { label: "Dashboard KPI", value: "kpi" },
              ],
              defaultValue: "matrix",
            }),
            keyword: testo("Parola chiave principale"),
            duration: testo("Durata"),
            metaTitle: testo("Titolo per Google"),
            metaDescription: paragrafo("Descrizione per Google"),
            faq: domande,
          }),
          { label: "Servizi", itemLabel: (props) => props.fields.title.value },
        ),
      },
    }),

    metodo: singleton({
      label: "Metodo",
      path: "content/metodo",
      format: { data: "json" },
      schema: {
        meta,
        pagina: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            sottotitolo: paragrafo("Sottotitolo"),
            scheda: voceValore,
          },
          { label: "Apertura" },
        ),
        grafico: fields.object(
          { occhiello: testo("Occhiello"), titolo: testo("Titolo"), testo: paragrafo("Testo") },
          { label: "Sezione del grafico" },
        ),
        fasi: fields.array(
          fields.object({
            index: testo("Numero"),
            title: testo("Titolo"),
            duration: testo("Durata"),
            body: paragrafo("Testo breve"),
            detail: paragrafo("Testo esteso"),
            output: paragrafo("Cosa esce da questa fase"),
          }),
          { label: "Fasi", itemLabel: (props) => props.fields.title.value },
        ),
        faq: domande,
      },
    }),

    risultati: singleton({
      label: "Risultati",
      path: "content/risultati",
      format: { data: "json" },
      schema: {
        meta,
        pagina: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            sottotitolo: paragrafo("Sottotitolo"),
            scheda: voceValore,
          },
          { label: "Apertura" },
        ),
        lettura: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            paragrafi: elencoTesti("Paragrafi", "Paragrafo"),
          },
          { label: "Come leggere i numeri" },
        ),
        invito: fields.object({ titolo: paragrafo("Titolo"), testo: paragrafo("Testo") }, {
          label: "Invito finale della pagina",
        }),
        numeri: fields.array(
          fields.object({
            value: testo("Numero"),
            label: testo("Etichetta"),
            note: fields.text({ label: "Nota", multiline: true }),
          }),
          { label: "Numeri in evidenza", itemLabel: (props) => props.fields.value.value },
        ),
        casi: fields.array(
          fields.object({
            slug: testo("Identificativo"),
            client: testo("Cliente"),
            units: fields.integer({ label: "Unità", validation: { min: 1 } }),
            market: testo("Mercato"),
            horizon: testo("Orizzonte temporale"),
            problem: paragrafo("Il problema"),
            action: paragrafo("L'intervento"),
            results: fields.array(
              fields.object({ value: testo("Valore"), label: testo("Etichetta") }),
              { label: "Risultati", itemLabel: (props) => props.fields.label.value },
            ),
            quote: fields.text({ label: "Citazione", multiline: true }),
          }),
          { label: "Casi studio", itemLabel: (props) => props.fields.client.value },
        ),
        testimonianze: fields.array(
          fields.object({
            quote: paragrafo("Citazione"),
            role: testo("Ruolo"),
            detail: testo("Dettaglio", "Per esempio: 42 unità, Verona"),
          }),
          { label: "Testimonianze", itemLabel: (props) => props.fields.role.value },
        ),
        clienti: fields.array(
          fields.object({ name: testo("Nome"), city: testo("Città") }),
          { label: "Portafogli seguiti", itemLabel: (props) => props.fields.name.value },
        ),
      },
    }),

    chiSono: singleton({
      label: "Chi sono",
      path: "content/chi-sono",
      format: { data: "json" },
      schema: {
        meta,
        pagina: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            sottotitolo: paragrafo("Sottotitolo"),
          },
          { label: "Apertura" },
        ),
        percorso: fields.object(
          {
            occhiello: testo("Occhiello"),
            tappe: fields.array(
              fields.object({
                anno: testo("Anno"),
                titolo: testo("Titolo"),
                testo: paragrafo("Testo"),
              }),
              { label: "Tappe", itemLabel: (props) => props.fields.anno.value },
            ),
          },
          { label: "Il percorso" },
        ),
        credenziali: voceValore,
        tecnologia: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            testo: paragrafo("Testo"),
            collaborazione: testo("Riga della collaborazione"),
            progetti: fields.array(
              fields.object({
                stato: testo("Stato", "Per esempio: Completato, In corso"),
                titolo: testo("Titolo"),
                testo: paragrafo("Testo"),
              }),
              { label: "Progetti", itemLabel: (props) => props.fields.titolo.value },
            ),
          },
          { label: "Tecnologia" },
        ),
        testimonianze: fields.object({ occhiello: testo("Occhiello") }, {
          label: "Sezione testimonianze",
        }),
        testoFoto: testo("Descrizione della foto"),
      },
    }),

    contatti: singleton({
      label: "Contatti",
      path: "content/contatti",
      format: { data: "json" },
      schema: {
        meta,
        pagina: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            sottotitolo: paragrafo("Sottotitolo"),
          },
          { label: "Apertura" },
        ),
        passi: elencoTesti("Cosa succede dopo", "Passo"),
        nota: paragrafo("Nota sui tempi di risposta"),
        modulo: fields.object(
          {
            etichette: fields.object(
              {
                nome: testo("Nome"),
                email: testo("Email"),
                azienda: testo("Azienda"),
                unita: testo("Unità gestite"),
                mercato: testo("Mercato"),
                messaggio: testo("Messaggio"),
              },
              { label: "Etichette dei campi" },
            ),
            segnaposto: fields.object(
              { email: testo("Esempio email"), messaggio: paragrafo("Esempio messaggio") },
              { label: "Testi di esempio nei campi" },
            ),
            dimensioni: elencoTesti("Fasce di dimensione", "Fascia"),
            consenso: paragrafo("Testo del consenso privacy"),
            invia: testo("Pulsante invia"),
            inviaInCorso: testo("Pulsante durante l'invio"),
          },
          { label: "Modulo" },
        ),
        faq: domande,
        grazie: fields.object(
          {
            occhiello: testo("Occhiello"),
            titolo: paragrafo("Titolo"),
            testo: paragrafo("Testo"),
          },
          { label: "Pagina di ringraziamento" },
        ),
      },
    }),
  },
});
