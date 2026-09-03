/**
 * Il pannello e' raggiungibile solo quando ha davvero un'autenticazione.
 *
 * Keystatic ha due modalita':
 *
 * - `local` scrive sul disco e NON autentica nessuno. Va bene su `npm run dev`,
 *   dove il server sta sulla propria macchina.
 * - `github` richiede l'accesso con GitHub e lascia salvare solo a chi ha
 *   permesso di scrittura sul repository.
 *
 * In produzione la modalita' e' sempre `github`, ma senza i segreti della
 * GitHub App l'autenticazione non puo' funzionare: in quel caso /keystatic e
 * /api/keystatic/* rispondono 404, invece di mostrare un pannello a meta'.
 *
 * Non ci si affida al fatto che l'hosting abbia il filesystem in sola lettura:
 * e' un dettaglio dell'infrastruttura, non un controllo di accesso.
 *
 * ATTENZIONE: legge variabili segrete, quindi va importato SOLO da codice che
 * gira sul server. Sul client varrebbe sempre false.
 */
export const keystaticEnabled =
  process.env.NODE_ENV !== "production" ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET,
  );
