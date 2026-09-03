import type { Metadata } from "next";

import { PickupCurve } from "@/components/charts/pickup-curve";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHeader } from "@/components/site/page-header";
import { Display, Eyebrow, Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { breadcrumbGraph, faqGraph, pageMetadata } from "@/lib/seo";
import { FaqList } from "@/components/site/faq-list";
import { method } from "@/lib/content";
import { metodoContenuto } from "@/lib/content";

const trail = [
  { name: "Home", path: "/" },
  { name: "Metodo", path: "/metodo" },
];

const faq = metodoContenuto.faq;

export const metadata: Metadata = pageMetadata({
  title: metodoContenuto.meta.titolo,
  description: metodoContenuto.meta.descrizione,
  path: "/metodo",
});

export default function MetodoPage() {
  return (
    <>
      <JsonLd data={breadcrumbGraph(trail)} />
      <JsonLd data={faqGraph(faq)} />

      <PageHeader
        eyebrow={metodoContenuto.pagina.occhiello}
        title={metodoContenuto.pagina.titolo}
        lead={metodoContenuto.pagina.sottotitolo}
        trail={trail}
        aside={metodoContenuto.pagina.scheda}
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
                <Eyebrow>{metodoContenuto.grafico.occhiello}</Eyebrow>
                <Display level={2} size="d3" className="mt-6">
                  {metodoContenuto.grafico.titolo}
                </Display>
                <p className="measure mt-6 text-ink-soft">{metodoContenuto.grafico.testo}</p>
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
