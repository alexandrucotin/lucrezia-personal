# Come si cambiano i testi del sito

I testi e le foto del sito si modificano dal pannello su **`/admin`**. Stanno in
un database (Neon), le foto su Cloudflare R2.

## Per Lucrezia: il pannello

Vai su **`indirizzo-del-sito/admin`**, accedi con email e password e scegli la
pagina dal menu.

### Bozza, anteprima, pubblicazione

- **Salva bozza** tiene le modifiche nel pannello senza toccare il sito.
- **Anteprima** (l'icona con la freccia, accanto a "Salva bozza") apre la
  pagina del sito con le bozze al posto dei testi pubblicati. In basso compare
  una barra arancione: finché la vedi, stai guardando l'anteprima e non il
  sito vero. "Esci dall'anteprima" torna al sito pubblicato. L'anteprima mostra
  l'ultima bozza **salvata**: salva prima di aprirla.
- **Pubblica modifiche** manda online. La modifica compare alla prima visita
  della pagina.
- **Versioni** (in alto) elenca le ultime 30 versioni: da lì puoi rivedere una
  versione precedente e ripristinarla.

### Le sezioni della home

In _Home → Sezioni della home_ c'è l'elenco delle sezioni dopo l'apertura.
Trascinale per cambiare l'ordine; elimina una riga per nascondere una
sezione, aggiungi una riga per farla ricomparire. I numeri (01, 02…) si
aggiornano da soli.

### Grassetto, corsivo e link

I testi lunghi (risposte alle domande frequenti, paragrafi, "Per chi non è",
le fasi del metodo, il percorso) hanno una piccola barra: **B** grassetto,
_I_ corsivo, e il simbolo della catena per i link. Per un link a una pagina del
sito basta scrivere la parte finale, per esempio `/contatti`. Titoli e testi
brevi restano semplici di proposito: il loro aspetto lo decide la grafica.

Qualche nota utile:

- L'**occhiello** è la scritta piccola in maiuscolo sopra i titoli.
- I campi con l'asterisco non possono restare vuoti: se provi a salvarli vuoti,
  il pannello te lo impedisce.
- Le liste (sintomi, fasi, servizi, casi studio) si possono riordinare
  trascinandole, e si possono aggiungere o togliere voci.
- **Indirizzo**, dentro un servizio, è la parte finale dell'URL. Se lo cambi, i
  link già condivisi smettono di funzionare e si perde il posizionamento su
  Google: cambialo solo se serve davvero.
- **Titolo e descrizione per Google** sono quello che si legge nei risultati di
  ricerca. La descrizione funziona meglio intorno ai 155 caratteri.
- **Le foto**: nel campo foto puoi scegliere una foto già caricata oppure
  caricarne una nuova. Va bene qualsiasi proporzione: la foto viene ritagliata,
  mai deformata. Il limite è 5 MB per foto.
- **La descrizione della foto** la leggono Google e chi naviga con uno screen
  reader. Si scrive una volta sola, sulla foto nella libreria (_Impostazioni →
  Foto_). Accanto alla foto, nella pagina, puoi scriverne una diversa solo se in
  quel punto serve.

**Se sbagli qualcosa il sito non si rompe.** Nel peggiore dei casi la modifica
non compare e resta online la versione precedente della pagina.

## Per lo sviluppatore

### Come funziona

- `payload.config.ts` configura il pannello: database, foto, lingua italiana.
- `payload/sezioni.ts` definisce le sezioni del pannello, una per pagina più
  "Generale e contatti". La loro forma ricalca quella dei vecchi file
  `content/*.json` di Keystatic.
- `lib/content/` legge le sezioni dal database, le valida con zod
  (`schema.ts`) e le consegna alle pagine. Le pagine chiamano
  `await getContenuti()` e non sanno da dove arrivano i dati.
- Le pagine sono statiche: i testi si leggono al build e restano in cache.
  Quando qualcuno **pubblica** dal pannello, `payload/rivalida.ts` invalida la
  cache e la pagina si rigenera alla visita successiva. Le bozze non la toccano.
- Le sezioni hanno le bozze attive (`versions.drafts`). `/anteprima` attiva il
  draft mode di Next solo per chi ha fatto l'accesso al pannello; in draft mode
  `getContenuti()` legge le bozze, senza cache. `/anteprima/esci` lo spegne.
- I testi con formattazione sono campi `richText` (Lexical) con solo
  grassetto, corsivo e link (`payload/campi.ts`), disegnati da
  `components/site/testo-ricco.tsx`. Dove serve testo semplice (dati
  strutturati) si usa `lib/content/testo-semplice.ts`.
- L'ordine delle sezioni della home sta in `home.ordine`; l'elenco delle
  sezioni possibili in `lib/content/sezioni-home.ts`.
- Le foto le serve Payload da `/api/media/file/...`. Il bucket R2 resta
  privato.

### Variabili d'ambiente

Vanno impostate su Netlify. In locale stanno in `.env` (vedi `.env.example`).

| Variabile              | A cosa serve                                                           |
| ---------------------- | ---------------------------------------------------------------------- |
| `DATABASE_URL`         | Postgres su Neon. In produzione usa l'indirizzo **pooled** (`-pooler`) |
| `PAYLOAD_SECRET`       | Stringa casuale, firma i login: `openssl rand -hex 32`                 |
| `R2_BUCKET`            | Nome del bucket su Cloudflare R2                                       |
| `R2_ENDPOINT`          | `https://<account-id>.r2.cloudflarestorage.com`                        |
| `R2_ACCESS_KEY_ID`     | Dal token API di R2, limitato a quel bucket                            |
| `R2_SECRET_ACCESS_KEY` | Dal token API di R2                                                    |

Senza le quattro variabili R2 le foto caricate finiscono nella cartella
`media/`. In sviluppo va bene, in produzione no: su Netlify il disco non è
scrivibile.

Per il modulo di contatto:

| Variabile        | A cosa serve                                                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY` | Invio delle email. Senza, in sviluppo il messaggio finisce in console; in produzione il modulo dichiara l'errore e rimanda alla mail diretta. |
| `CONTACT_TO`     | Destinatario. Default: l'email in _Generale e contatti_.                                                                                      |
| `CONTACT_FROM`   | Mittente verificato su Resend.                                                                                                                |

### Il database

`npm run build` esegue prima `payload migrate`, che porta lo schema del
database alla versione del codice, e poi `next build`. Il build legge i testi
dal database, quindi `DATABASE_URL` deve esserci anche in fase di build.

In sviluppo (`npm run dev`) lo schema si allinea da solo a ogni modifica di
`payload/sezioni.ts`. Prima di pubblicare una modifica allo schema, crea la
migrazione:

```bash
npx payload migrate:create nome-della-modifica
```

e committala insieme al codice (cartella `payload/migrazioni/`).

### Lavorare in locale con i testi veri

I testi stanno solo nel database di produzione. Per averli in locale si copia
Neon in un database Postgres sul proprio computer (serve `pg_dump` della
stessa versione di Neon, oggi la 18):

```bash
createdb lucrezia_dev
pg_dump --no-owner --no-privileges --schema=public "$DATABASE_URL_NEON" | psql -d lucrezia_dev
```

con `DATABASE_URL_NEON` senza `-pooler`. Poi in `.env` si punta
`DATABASE_URL` a `postgres://utente@localhost:5432/lucrezia_dev`. Le foto
restano su R2: con le variabili R2 in `.env` si vedono anche in locale, ma
attenzione che quelle caricate in locale finiscono nello stesso bucket.

Prima di pubblicare una migrazione conviene provarla così, su una copia: è
come sono state provate quelle in `payload/migrazioni/`.

### Aggiungere un campo

Si tocca in due punti: la sezione in `payload/sezioni.ts` e lo schema in
`lib/content/schema.ts`. Poi si crea la migrazione.
