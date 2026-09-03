/**
 * Il pannello e' raggiungibile solo quando ha davvero un'autenticazione.
 *
 * Keystatic ha due modalita':
 *
 * - `local` scrive sul disco e NON autentica nessuno. Va bene su `npm run dev`,
 *   dove il server ascolta solo sulla tua macchina.
 * - `github` richiede l'accesso con GitHub e permette di salvare solo a chi ha
 *   permesso di scrittura sul repository.
 *
 * Senza NEXT_PUBLIC_KEYSTATIC_REPO la configurazione ricade su `local`. In
 * produzione questo significherebbe un pannello di amministrazione aperto a
 * chiunque ne indovini l'indirizzo, quindi li' le route rispondono 404.
 *
 * Non ci si affida al fatto che l'hosting abbia il filesystem in sola lettura:
 * e' un dettaglio dell'infrastruttura, non un controllo di accesso.
 */
export const keystaticEnabled =
  process.env.NODE_ENV !== "production" || Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_REPO);
