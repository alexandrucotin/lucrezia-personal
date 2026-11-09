import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/site/legal-page";
import { getSite } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "Il sito non utilizza cookie di profilazione né strumenti di tracciamento.",
  alternates: { canonical: "/cookie" },
  robots: { index: false, follow: true },
};

export default async function CookiePage() {
  const site = await getSite();

  return (
    <LegalPage
      title="Cookie policy"
      updated="settembre 2026"
      trail={[
        { name: "Home", path: "/" },
        { name: "Cookie", path: "/cookie" },
      ]}
    >
      <p>
        Questo sito <strong>non installa cookie di profilazione</strong>, non usa pixel
        pubblicitari e non condivide dati di navigazione con piattaforme terze. Per questo non
        vedi un banner di consenso: non c&apos;è niente da acconsentire.
      </p>

      <h2>Cosa viene comunque memorizzato</h2>
      <p>
        Il fornitore di hosting può registrare dati tecnici necessari a servire le pagine e a
        proteggere il sito da abusi, come l&apos;indirizzo IP e il tipo di browser. Sono log
        tecnici, conservati per periodi brevi e non usati per profilare le persone.
      </p>

      <h2>Se in futuro cambierà</h2>
      <p>
        Se venisse aggiunto uno strumento di statistica, la scelta ricadrà su soluzioni senza
        cookie e senza dati personali identificabili. Questa pagina verrebbe aggiornata prima
        dell&apos;attivazione.
      </p>

      <h2>Contatti</h2>
      <p>
        Per qualsiasi chiarimento: <a href={`mailto:${site.email}`}>{site.email}</a>. Vedi anche la{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
