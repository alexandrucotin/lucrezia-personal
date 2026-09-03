import type { Metadata } from "next";

import { PickupCurve } from "@/components/charts/pickup-curve";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHeader } from "@/components/site/page-header";
import { Display, Eyebrow, Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { method } from "@/lib/content/services";
import { breadcrumbGraph, faqGraph, pageMetadata } from "@/lib/seo";
import { FaqList } from "@/components/site/faq-list";

const trail = [
  { name: "Home", path: "/" },
  { name: "Metodo", path: "/metodo" },
];

const faq = [
  {
    q: "Quando cambiate i primi prezzi?",
    a: "Non prima della quinta settimana, e solo dopo che il piano è stato approvato. Toccare le tariffe durante la diagnosi renderebbe impossibile capire cosa ha prodotto cosa: si perderebbe il confronto proprio nel momento in cui serve.",
  },
  {
    q: "Cosa succede se non siamo d'accordo sul piano?",
    a: "Si discute e si riscrive. Il piano è un documento che il tuo team deve poter contestare: se una regola non regge a voce, non entra nel calendario. Non ho interesse a difendere una strategia che non applicherete.",
  },
  {
    q: "Quanto tempo richiede al mio team?",
    a: "Un'ora per la call iniziale, un'ora per la presentazione della diagnosi, poi circa trenta minuti a settimana per il punto sul pick-up. Nella fase di trasferimento serve di più, perché è formazione.",
  },
  {
    q: "Posso fermarmi dopo la diagnosi?",
    a: "Sì, ed è il motivo per cui la diagnosi è un servizio a sé. Ricevi il report e le priorità, e decidi se eseguirle con me, internamente, o con qualcun altro.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Metodo | Come si svolge un progetto di revenue management",
  description:
    "Quattro fasi: diagnosi sui dati storici, piano tariffario approvato, esecuzione settimanale sul calendario, trasferimento delle competenze al team.",
  path: "/metodo",
});

export default function MetodoPage() {
  return (
    <>
      <JsonLd data={breadcrumbGraph(trail)} />
      <JsonLd data={faqGraph(faq)} />

      <PageHeader
        eyebrow="Metodo"
        title="Dai dati al calendario, in quattro fasi."
        lead="Nessuna tariffa cambia prima che il piano sia scritto, discusso e approvato. È una regola che rallenta l'inizio e rende leggibile tutto il resto."
        trail={trail}
        aside={[
          { k: "Prime settimane", v: "Solo lettura, nessuna modifica" },
          { k: "Piano tariffario", v: "Approvato prima dell'esecuzione" },
          { k: "Impegno del team", v: "Circa 30 minuti a settimana" },
        ]}
      />

      <Section rhythm="loose" ruled tone="surface">
        <div className="shell">
          <Reveal stagger={0.08}>
            {method.map((phase) => (
              <RevealItem key={phase.index}>
                <article className="grid gap-8 border-t border-rule py-14 last:border-b lg:grid-cols-12 lg:gap-10">
                  <header className="lg:col-span-3">
                    <span className="display tnum text-d2 leading-none text-sage">
                      {phase.index}
                    </span>
                    <h2 className="display mt-4 text-d3">{phase.title}</h2>
                    <p className="eyebrow mt-3 text-ink-faint">{phase.duration}</p>
                  </header>

                  <div className="lg:col-span-6">
                    <p className="text-lead text-ink">{phase.body}</p>
                    <p className="measure mt-5 text-ink-soft">{phase.detail}</p>
                  </div>

                  <div className="lg:col-span-3">
                    <p className="eyebrow text-ink-faint">In uscita</p>
                    <p className="mt-3 text-sm text-ink">{phase.output}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section rhythm="loose" ruled>
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>Su cosa si decide</Eyebrow>
                <Display level={2} size="d3" className="mt-6">
                  Il pick-up, non l&apos;occupancy.
                </Display>
                <p className="measure mt-6 text-ink-soft">
                  Un calendario pieno può voler dire che i prezzi erano giusti, oppure che erano
                  bassi. La differenza si legge nella velocità con cui le prenotazioni entrano
                  rispetto alla data di arrivo.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.08} className="lg:col-span-8">
              <PickupCurve />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section rhythm="loose" ruled tone="deep">
        <div className="shell">
          <FaqList items={faq} title="Domande sul modo di lavorare" />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
