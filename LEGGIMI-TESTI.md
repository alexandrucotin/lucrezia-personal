# Come si cambiano i testi del sito

I testi e le foto del sito si modificano dal pannello su **`/admin`**. Stanno in
un database (Neon), le foto su Cloudflare R2.

## Per Lucrezia: il pannello

Vai su **`indirizzo-del-sito/admin`**, accedi con email e password, scegli la
pagina dal menu, cambia il testo e premi **Salva**.

La modifica compare sul sito subito, alla prima visita della pagina.

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
  `content/*.json`.
- `lib/content/` legge le sezioni dal database, le valida con zod
  (`schema.ts`) e le consegna alle pagine. Le pagine chiamano
  `await getContenuti()` e non sanno da dove arrivano i dati.
- Le pagine sono statiche: i testi si leggono al build e restano in cache.
  Quando qualcuno salva dal pannello, `payload/rivalida.ts` invalida la cache e
  la pagina si rigenera alla visita successiva.
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

### Primo avvio su un database nuovo

1. Imposta le variabili d'ambiente.
2. `npx payload migrate` crea le tabelle.
3. `npm run importa-testi` copia nel database i testi di `content/*.json` e le
   foto di `public/images`. Non lanciarlo quando il pannello è già in uso:
   sovrascrive i testi.
4. Apri `/admin`: la prima volta chiede di creare il primo utente. Gli altri si
   aggiungono da _Impostazioni → Utenti_.

I file `content/*.json` servono solo per questa importazione: una volta
importati in produzione si possono cancellare.

### Aggiungere un campo

Si tocca in due punti: la sezione in `payload/sezioni.ts` e lo schema in
`lib/content/schema.ts`. Poi si crea la migrazione.
