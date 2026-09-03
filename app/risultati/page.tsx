import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHeader } from "@/components/site/page-header";
import { Display, Eyebrow, Section } from "@/components/ui/section";
import { StatRow } from "@/components/ui/stat";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { caseStudies, clients, stats } from "@/lib/content/proof";
import { breadcrumbGraph, pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: "/" },
  { name: "Risultati", path: "/risultati" },
];

export const metadata: Metadata = pageMetadata({
  title: "Risultati e casi studio | Revenue management affitti brevi",
  description:
    "Tre portafogli seguiti a Verona, Milano e sul Lago di Garda: il problema di partenza, l'intervento e i numeri, con l'orizzonte temporale dichiarato.",
  path: "/risultati",
});

export default function RisultatiPage() {
  return (
    <>
      <JsonLd data={breadcrumbGraph(trail)} />

      <PageHeader
        eyebrow="Risultati"
        title="Tre portafogli, tre problemi diversi."
        lead="Ogni caso riporta il problema di partenza, cosa è stato cambiato e in quanto tempo. Senza l'orizzonte temporale una percentuale non vuol dire niente, quindi è sempre scritto."
        trail={trail}
        aside={[
          { k: "Portafogli", v: "Da 14 a 120 unità" },
          { k: "Mercati", v: "Verona · Milano · Garda" },
          { k: "Dati", v: "Aggregati e anonimizzati" },
        ]}
      />

      <Section rhythm="tight" ruled>
        <div className="shell">
          <Reveal>
            <StatRow items={stats} />
          </Reveal>
        </div>
      </Section>

      <Section rhythm="loose" ruled tone="surface">
        <div className="shell">
          <Reveal stagger={0.1}>
            {caseStudies.map((item) => (
              <RevealItem key={item.slug}>
                <article className="grid gap-10 border-t border-rule py-16 last:border-b lg:grid-cols-12 lg:gap-10">
                  <header className="lg:col-span-3">
                    <h2 className="display text-d3">{item.client}</h2>
                    <p className="eyebrow tnum mt-4 text-ink-faint">
                      {item.units} unità · {item.market}
                    </p>
                    <p className="eyebrow mt-1 text-ink-faint">Orizzonte {item.horizon}</p>
                  </header>

                  <div className="lg:col-span-5">
                    <p className="eyebrow text-ochre">Il problema</p>
                    <p className="measure mt-4 text-ink">{item.problem}</p>

                    <p className="eyebrow mt-10 text-sage">L&apos;intervento</p>
                    <p className="measure mt-4 text-ink-soft">{item.action}</p>

                    {item.quote ? (
                      <blockquote className="measure mt-10 border-l border-sage pl-6 text-ink italic">
                        &laquo;{item.quote}&raquo;
                      </blockquote>
                    ) : null}
                  </div>

                  <dl className="lg:col-span-3 lg:col-start-10">
                    <p className="eyebrow text-ink-faint">Risultato</p>
                    <div className="mt-5 border-t border-rule">
                      {item.results.map((result) => (
                        <div key={result.label} className="border-b border-rule py-5">
                          <dd className="display tnum text-d3 leading-none">{result.value}</dd>
                          <dt className="mt-2 text-xs text-ink-faint">{result.label}</dt>
                        </div>
                      ))}
                    </div>
                  </dl>
                </article>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section rhythm="loose" ruled tone="deep">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Come leggere questi numeri</Eyebrow>
                <Display level={2} size="d3" className="mt-6">
                  Una percentuale senza contesto non dimostra niente.
                </Display>
              </Reveal>
            </div>

            <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
              <div className="measure-wide space-y-5 text-ink-soft">
                <p>
                  I dati sono aggregati e anonimizzati su richiesta dei clienti: i numeri di
                  dettaglio, con il periodo esatto e la base di confronto, li mostro in call a chi
                  sta valutando un progetto.
                </p>
                <p>
                  Il confronto è sempre sullo stesso periodo dell&apos;anno precedente, a parità di
                  portafoglio. Quando il portafoglio è cambiato durante il periodo, il dato è
                  calcolato solo sulle unità presenti in entrambi gli anni.
                </p>
                <p className="text-ink">
                  Il terzo caso vale la pena di essere letto due volte: il fatturato è salito del
                  24% vendendo il 6% di notti in meno. È il tipo di risultato che l&apos;occupancy,
                  da sola, non avrebbe mai mostrato.
                </p>
              </div>

              <div className="mt-12">
                <p className="eyebrow text-ink-faint">Portafogli seguiti</p>
                <ul className="mt-5 flex flex-wrap items-baseline gap-x-10 gap-y-4">
                  {clients.map((client) => (
                    <li key={client.name} className="flex items-baseline gap-3">
                      <span className="display text-d4 text-ink">{client.name}</span>
                      <span className="eyebrow text-ink-faint">{client.city}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Il tuo portafoglio somiglia a uno di questi?"
        body="In trenta minuti capiamo se il problema è lo stesso e se i margini di recupero sono paragonabili."
      />
    </>
  );
}
