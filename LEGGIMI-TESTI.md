# Come si cambiano i testi del sito

Tutti i testi vivono in file dentro la cartella `content/`. Il sito li legge da
lì: non esiste un database, e non c'è niente da mantenere.

## Per Lucrezia — il pannello

Vai su **`indirizzo-del-sito/keystatic`**, accedi con GitHub, scegli la pagina
nel menu a sinistra, cambia il testo e premi **Save**.

Il sito si aggiorna da solo in un paio di minuti.

Qualche nota utile:

- **Occhiello** è la scritta piccola in maiuscolo sopra i titoli.
- I campi con l'asterisco rosso non possono restare vuoti. Se provi a salvarli
  vuoti il pannello te lo impedisce.
- Le liste (sintomi, fasi, servizi, casi studio) si possono riordinare
  trascinandole, e si possono aggiungere o togliere voci.
- **Indirizzo** dentro un servizio è la parte finale dell'URL. Cambiarlo rompe i
  link già condivisi e fa perdere il posizionamento su Google: cambialo solo se
  serve davvero.
- **Titolo e descrizione per Google** sono quello che si legge nei risultati di
  ricerca. La descrizione funziona meglio intorno ai 155 caratteri.
- **La foto** si cambia da _Generale e contatti → Immagini_. Va bene qualsiasi
  proporzione: viene ritagliata, non deformata. Meglio restare sotto i 2 MB,
  perché ogni foto caricata resta per sempre nella cronologia del progetto.
  Ricordati di aggiornare anche la _Descrizione della foto_: la leggono Google e
  chi naviga con uno screen reader.

**Se sbagli qualcosa il sito non si rompe.** Nel peggiore dei casi la modifica
non viene pubblicata e resta online la versione precedente.

## Per lo sviluppatore — accesso e configurazione

Keystatic ha due modalità, e da quale è attiva dipende chi può entrare.

**In sviluppo** (`npm run dev`) la modalità è `local`: scrive sui file del disco
e **non autentica nessuno**. Va bene perché il server sta sulla tua macchina —
ma `next dev` si espone anche sull'indirizzo di rete locale, quindi su una Wi-Fi
condivisa chiunque sia sulla stessa rete potrebbe aprire il pannello. Su reti non
fidate usa `npm run dev -- -H 127.0.0.1`.

**In produzione** la modalità `local` non è accettabile: sarebbe un pannello di
amministrazione senza login. Per questo `/keystatic` e `/api/keystatic/*`
**rispondono 404** finché non è configurato l'accesso con GitHub. Non ci si
affida al filesystem in sola lettura dell'hosting: è un dettaglio
dell'infrastruttura, non un controllo di accesso.

Configurato l'accesso GitHub, può salvare **solo chi ha permesso di scrittura sul
repository**. Aggiungere o togliere Lucrezia si fa dalle impostazioni del
repository, non da qui.

Il repository è `alexandrucotin/lucrezia-personal`, scritto in
`keystatic.config.ts`: non è una variabile d'ambiente, così non si può
dimenticare. Se il repository viene rinominato, si cambia quella riga.

### Creare la GitHub App

Keystatic ha una procedura guidata che crea l'App al posto tuo e scrive i segreti
nel file `.env`. Si esegue **in locale**, prima di pubblicare.

1. Crea `.env.local` con **una riga sola**:

   ```
   NEXT_PUBLIC_KEYSTATIC_MODE=github
   ```

   Serve solo a forzare la modalità GitHub in sviluppo, dove normalmente il
   pannello lavora sui file locali. In produzione non ha effetto.

   > ⚠️ Non copiare `.env.example` dentro `.env.local`. In Next.js `.env.local`
   > ha priorità su `.env`, e una variabile lasciata **vuota** lì sovrascrive
   > quella vera. Al passo 6 Keystatic scrive i segreti in `.env`: se le stesse
   > chiavi esistono vuote in `.env.local`, vincono le vuote e il pannello
   > risponde 404 senza spiegare perché.

2. `npm run dev`, poi apri **`http://127.0.0.1:3000/keystatic/setup`**.
   L'indirizzo è `127.0.0.1` e non `localhost`: è quello che GitHub accetta
   come callback OAuth, e Keystatic ci reindirizza da solo.

3. Compila due campi:
   - **Deployed App URL**: l'indirizzo di produzione, per esempio
     `https://lucreziaceleste.it`. Se non lo sai ancora, lascialo vuoto e lo
     aggiungi dopo dalle impostazioni dell'App.
   - **GitHub organization**: lascialo vuoto, il repository è su un account
     personale.

4. **Create GitHub App** ti porta su GitHub con l'App già compilata. Il nome
   proposto è `alexandrucotin Keystatic`. I permessi richiesti sono:
   _contents: write_ (scrivere i file dei testi), _metadata: read_,
   _pull requests: read_. Sono i minimi per fare commit sul repository.

5. Conferma, e quando GitHub lo chiede **installa l'App sul repository**
   `lucrezia-personal`.

6. Vieni riportato indietro e Keystatic scrive da solo `KEYSTATIC_GITHUB_CLIENT_ID`,
   `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` e
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` nel file `.env`.

7. Copia quelle quattro variabili nelle impostazioni di Netlify.

> Se al primo login locale GitHub rifiuta il callback, aggiungi
> `http://127.0.0.1:3000/api/keystatic/github/oauth/callback` fra i _Callback URL_
> nelle impostazioni dell'App: la procedura ne registra una senza numero di porta.

Finito il setup puoi togliere `NEXT_PUBLIC_KEYSTATIC_MODE` da `.env.local` per
tornare a lavorare sui file locali, oppure lasciarlo per provare il login vero
da locale.

### Le variabili

Le variabili d'ambiente da impostare sull'hosting sono quattro:

| Variabile                               | A cosa serve                            |
| --------------------------------------- | --------------------------------------- |
| `KEYSTATIC_GITHUB_CLIENT_ID`            | Dalla GitHub App                        |
| `KEYSTATIC_GITHUB_CLIENT_SECRET`        | Dalla GitHub App                        |
| `KEYSTATIC_SECRET`                      | Stringa casuale: `openssl rand -hex 32` |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Nome della GitHub App                   |

**Finché le prime tre mancano, in produzione `/keystatic` risponde 404** e il
build passa comunque: si può pubblicare il sito prima di configurare il pannello,
senza lasciare online una porta aperta.

Per il modulo di contatto:

| Variabile        | A cosa serve                                                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY` | Invio delle email. Senza, in sviluppo il messaggio finisce in console; in produzione il modulo dichiara l'errore e rimanda alla mail diretta. |
| `CONTACT_TO`     | Destinatario. Default: l'email in `content/generale.json`.                                                                                    |
| `CONTACT_FROM`   | Mittente verificato su Resend.                                                                                                                |

## Struttura dei file

| File                     | Contenuto                                                            |
| ------------------------ | -------------------------------------------------------------------- |
| `content/generale.json`  | Identità, contatti, dati fiscali, menu, invito finale                |
| `content/home.json`      | Tutta la home                                                        |
| `content/servizi.json`   | Pagina servizi, prezzi, e i tre servizi con le loro pagine           |
| `content/metodo.json`    | Pagina metodo, le quattro fasi, le domande frequenti                 |
| `content/risultati.json` | Numeri, casi studio, testimonianze, clienti                          |
| `content/chi-sono.json`  | Percorso, credenziali, progetti                                      |
| `content/contatti.json`  | Pagina contatti, modulo, domande frequenti, pagina di ringraziamento |

Gli schemi che validano questi file stanno in `lib/content/schema.ts`. Aggiungere
un campo significa toccare tre punti: il JSON, lo schema, e `keystatic.config.ts`.

**Keystatic è opzionale.** Il sito legge i JSON direttamente: se un giorno il
pannello va rimosso, si cancellano `keystatic.config.ts`, `app/keystatic/` e
`app/api/keystatic/` e tutto continua a funzionare. I testi si modificherebbero
dall'editor web di GitHub.
