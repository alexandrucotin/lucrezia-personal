/**
 * Etichetta della cache dei testi. Le pagine leggono i testi una volta e li
 * tengono in cache; quando qualcuno salva dal pannello, Payload invalida
 * questa etichetta e le pagine si rigenerano con il testo nuovo.
 *
 * Sta in un file a parte perche' la importa anche la configurazione di
 * Payload, che non deve trascinarsi dietro il resto di lib/content.
 */
export const TAG_CONTENUTI = "contenuti"
