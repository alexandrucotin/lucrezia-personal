import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Genera l'elenco delle foto già presenti nel progetto, per il menu a tendina
 * del pannello.
 *
 * Serve uno script perché keystatic.config.ts viene eseguito anche nel browser
 * e non può leggere il disco. Gira prima di ogni `dev` e `build`, quindi dopo
 * che qualcuno carica una foto nuova questa compare nell'elenco alla
 * pubblicazione successiva.
 */

const CARTELLA = "public/images";
const ESTENSIONI = /\.(jpe?g|png|webp|avif)$/i;

/* Ricorsivo: il pannello salva le foto caricate in sottocartelle che derivano
   dalla posizione del campo (per esempio images/chiSono/immagine/value.png).
   Guardando solo il primo livello, una foto appena caricata non sarebbe mai
   comparsa nell'elenco di quelle riutilizzabili. */
function cerca(cartella) {
  return readdirSync(cartella, { withFileTypes: true }).flatMap((voce) => {
    const percorso = join(cartella, voce.name);
    if (voce.isDirectory()) return cerca(percorso);
    return ESTENSIONI.test(voce.name) ? [percorso] : [];
  });
}

const file = cerca(CARTELLA)
  .map((percorso) => percorso.slice(CARTELLA.length + 1))
  .sort();

/* Le foto caricate si chiamano tutte "value": senza il percorso davanti
   sarebbero voci identiche e indistinguibili nel menu a tendina. */
const etichetta = (percorso) => {
  const senzaEstensione = percorso.replace(ESTENSIONI, "");
  const pezzi = senzaEstensione.split("/");
  return pezzi.length === 1
    ? pezzi[0].replace(/[-_]/g, " ").replace(/^./, (c) => c.toUpperCase())
    : `${pezzi.slice(0, -1).join(" / ")} — caricata`;
};

const contenuto = `// File generato da scripts/genera-elenco-foto.mjs — non modificare a mano.

export const fotoDisponibili = [
${file.map((n) => `  { label: ${JSON.stringify(etichetta(n))}, value: ${JSON.stringify("/images/" + n)} },`).join("\n")}
] as const;
`;

writeFileSync(join("lib", "foto-disponibili.ts"), contenuto);
console.log(`[foto] ${file.length} immagini trovate in ${CARTELLA}`);
