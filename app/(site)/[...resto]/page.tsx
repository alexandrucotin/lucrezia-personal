import { notFound } from "next/navigation";

/**
 * Ogni indirizzo che non corrisponde a una pagina arriva qui e mostra la 404
 * del sito, dentro intestazione e piè di pagina.
 *
 * Serve perche' il sito e il pannello hanno due layout radice separati: senza
 * questa pagina un indirizzo sbagliato mostrerebbe la 404 grezza di Next.
 */
export default function PaginaInesistente() {
  notFound();
}
