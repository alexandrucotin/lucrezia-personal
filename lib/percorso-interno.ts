/* Solo indirizzi del sito: un link di anteprima non deve poter mandare
   altrove. */
export function percorsoInterno(percorso: string | null) {
  return percorso?.startsWith("/") && !percorso.startsWith("//") ? percorso : "/";
}
