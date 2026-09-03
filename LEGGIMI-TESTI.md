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

La GitHub App si crea in automatico dal pannello al primo accesso. Le variabili
d'ambiente da impostare sull'hosting sono:

| Variabile | A cosa serve |
| --- | --- |
| `NEXT_PUBLIC_KEYSTATIC_REPO` | `utente/repository`. **Se manca, in produzione il pannello risponde 404.** |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Nome della GitHub App |
| `KEYSTATIC_GITHUB_CLIENT_ID` | Dalla GitHub App |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Dalla GitHub App |
| `KEYSTATIC_SECRET` | Stringa casuale: `openssl rand -hex 32` |

Se imposti `NEXT_PUBLIC_KEYSTATIC_REPO` ma dimentichi i tre segreti, **il build
fallisce** elencando le variabili mancanti. È voluto: meglio un errore evidente
in fase di pubblicazione che un pannello mezzo configurato online.

Per il modulo di contatto:

| Variabile | A cosa serve |
| --- | --- |
| `RESEND_API_KEY` | Invio delle email. Senza, in sviluppo il messaggio finisce in console; in produzione il modulo dichiara l'errore e rimanda alla mail diretta. |
| `CONTACT_TO` | Destinatario. Default: l'email in `content/generale.json`. |
| `CONTACT_FROM` | Mittente verificato su Resend. |

## Struttura dei file

| File | Contenuto |
| --- | --- |
| `content/generale.json` | Identità, contatti, dati fiscali, menu, invito finale |
| `content/home.json` | Tutta la home |
| `content/servizi.json` | Pagina servizi, prezzi, e i tre servizi con le loro pagine |
| `content/metodo.json` | Pagina metodo, le quattro fasi, le domande frequenti |
| `content/risultati.json` | Numeri, casi studio, testimonianze, clienti |
| `content/chi-sono.json` | Percorso, credenziali, progetti |
| `content/contatti.json` | Pagina contatti, modulo, domande frequenti, pagina di ringraziamento |

Gli schemi che validano questi file stanno in `lib/content/schema.ts`. Aggiungere
un campo significa toccare tre punti: il JSON, lo schema, e `keystatic.config.ts`.

**Keystatic è opzionale.** Il sito legge i JSON direttamente: se un giorno il
pannello va rimosso, si cancellano `keystatic.config.ts`, `app/keystatic/` e
`app/api/keystatic/` e tutto continua a funzionare. I testi si modificherebbero
dall'editor web di GitHub.
