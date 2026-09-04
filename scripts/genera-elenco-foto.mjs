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

const file = readdirSync(CARTELLA)
  .filter((nome) => ESTENSIONI.test(nome))
  .sort();

const etichetta = (nome) =>
  nome
    .replace(ESTENSIONI, "")
    .replace(/[-_]/g, " ")
    .replace(/^./, (c) => c.toUpperCase());

const contenuto = `// File generato da scripts/genera-elenco-foto.mjs — non modificare a mano.

export const fotoDisponibili = [
${file.map((n) => `  { label: ${JSON.stringify(etichetta(n))}, value: ${JSON.stringify("/images/" + n)} },`).join("\n")}
] as const;
`;

writeFileSync(join("lib", "foto-disponibili.ts"), contenuto);
console.log(`[foto] ${file.length} immagini trovate in ${CARTELLA}`);
