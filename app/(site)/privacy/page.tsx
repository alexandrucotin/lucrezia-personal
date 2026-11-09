import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/site/legal-page";
import { getSite } from "@/lib/site";

/**
 * Bozza costruita su cio' che il sito fa davvero: un modulo di contatto,
 * nessun cookie, nessun tracciamento. Va rivista da un consulente prima
 * della pubblicazione, e riscritta se in futuro si aggiunge analytics.
 */
export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Come vengono trattati i dati inviati tramite il modulo di contatto.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default async function PrivacyPage() {
  const site = await getSite();

  return (
    <LegalPage
      title="Privacy policy"
      updated="settembre 2026"
      trail={[
        { name: "Home", path: "/" },
        { name: "Privacy", path: "/privacy" },
      ]}
    >
      <p>
        Questo sito raccoglie dati personali solo attraverso il modulo di contatto. Non usa cookie
        di profilazione, non ospita strumenti pubblicitari e non condivide dati con terze parti a
        fini commerciali.
      </p>

      <h2>Titolare del trattamento</h2>
      <p>
        {site.legal.entity}, P. IVA {site.legal.vat}, {site.legal.city} (Italia). Per qualsiasi
        richiesta: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Quali dati raccolgo</h2>
      <ul>
        <li>Nome e cognome, indirizzo email, eventuale azienda</li>
        <li>Dimensione del portafoglio e mercato, se li indichi</li>
        <li>Il testo del messaggio che scrivi</li>
      </ul>
      <p>
        Non raccolgo dati particolari. Ti chiedo di non inserire nel messaggio informazioni
        riservate sui tuoi clienti o sui tuoi ospiti.
      </p>

      <h2>Perché li tratto</h2>
      <p>
        Per rispondere alla tua richiesta e valutare insieme un&apos;eventuale collaborazione. La
        base giuridica è il consenso che presti inviando il modulo, e l&apos;esecuzione di misure
        precontrattuali su tua richiesta.
      </p>

      <h2>Per quanto tempo</h2>
      <p>
        Conservo i messaggi per ventiquattro mesi dall&apos;ultimo contatto, poi li elimino. Se
        diventiamo clienti e fornitore, i dati contrattuali seguono i termini di legge.
      </p>

      <h2>Chi li vede</h2>
      <p>
        Solo io. Per il funzionamento tecnico del sito e della posta mi appoggio a fornitori che
        agiscono come responsabili del trattamento: l&apos;hosting del sito e il servizio di invio
        email. Non trasferisco dati fuori dallo Spazio economico europeo se non attraverso
        fornitori che adottano garanzie adeguate.
      </p>

      <h2>Cookie</h2>
      <p>
        Il sito non usa cookie di profilazione né strumenti di analisi che tracciano le persone.
        Vedi la <Link href="/cookie">cookie policy</Link>.
      </p>

      <h2>I tuoi diritti</h2>
      <p>
        Puoi chiedere in qualsiasi momento di accedere ai tuoi dati, correggerli, cancellarli,
        limitarne il trattamento o revocare il consenso, scrivendo a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Hai inoltre diritto di proporre reclamo
        al Garante per la protezione dei dati personali.
      </p>
    </LegalPage>
  );
}
