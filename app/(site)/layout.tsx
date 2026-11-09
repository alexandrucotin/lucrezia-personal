import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";

import "../globals.css";
import { BarraAnteprima } from "@/components/site/barra-anteprima";
import { JsonLd } from "@/components/site/json-ld";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { getContenuti } from "@/lib/content";
import { rootGraph } from "@/lib/seo";

/* Fraunces come display: serif variabile con optical sizing reale,
   ha carattere senza scivolare nel decorativo. */
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

/* Il monospace porta il registro "analitico": eyebrow, etichette, dati. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContenuti();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.role}`,
      template: `%s — ${site.name}`,
    },
    description:
      "Consulenza di revenue management per property manager e aziende di short-term rental. Analisi del portafoglio, dynamic pricing e ottimizzazione OTA.",
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "it_IT",
      siteName: `${site.name} — ${site.tagline}`,
      url: site.url,
    },
    twitter: { card: "summary_large_image" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#f7f6f3",
  colorScheme: "light",
};

/**
 * Layout radice del sito pubblico. Sta in un gruppo di route perche' il
 * pannello su /admin ha un layout radice tutto suo (app/(payload)) e non
 * deve ereditare font, intestazione, piè di pagina e dati strutturati.
 */
export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const { anteprima, site, nav, generale } = await getContenuti();

  return (
    <html
      lang="it"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} antialiased`}
    >
      <body>
        <a
          href="#contenuto"
          className="eyebrow sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Salta al contenuto
        </a>
        {/* Entita' di base: chi e' Lucrezia, cosa vende, dove opera.
            Presenti una volta sola, valide per tutte le pagine del sito. */}
        <JsonLd data={await rootGraph()} />
        <Header
          site={site}
          nav={nav}
          pulsante={generale.intestazione.pulsante}
          pulsanteMobile={generale.invitoFinale.pulsante}
        />
        <main id="contenuto">{children}</main>
        <Footer />
        {anteprima ? <BarraAnteprima /> : null}
      </body>
    </html>
  );
}
