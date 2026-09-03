import { JsonLd } from "@/components/site/json-ld";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { rootGraph } from "@/lib/seo";

/**
 * Struttura del sito pubblico. Sta in un gruppo di route perche' il pannello
 * di modifica dei testi su /keystatic non deve ereditare intestazione,
 * piè di pagina e dati strutturati.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#contenuto"
        className="eyebrow sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        Salta al contenuto
      </a>
      {/* Entita' di base: chi e' Lucrezia, cosa vende, dove opera.
          Presenti una volta sola, valide per tutte le pagine del sito. */}
      <JsonLd data={rootGraph()} />
      <Header />
      <main id="contenuto">{children}</main>
      <Footer />
    </>
  );
}
