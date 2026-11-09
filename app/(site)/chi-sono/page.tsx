import Image from "next/image";
import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHeader } from "@/components/site/page-header";
import { Display, Eyebrow, Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { breadcrumbGraph, pageMetadata } from "@/lib/seo";
import { getContenuti } from "@/lib/content";

const trail = [
  { name: "Home", path: "/" },
  { name: "Chi sono", path: "/chi-sono" },
];

export async function generateMetadata(): Promise<Metadata> {
  const { chiSonoContenuto } = await getContenuti();
  return pageMetadata({
    title: chiSonoContenuto.meta.titolo,
    description: chiSonoContenuto.meta.descrizione,
    path: "/chi-sono",
  });
}

export default async function ChiSonoPage() {
  const { chiSonoContenuto, site, testimonials, tools } = await getContenuti();

  /* Il percorso: la sequenza conta piu' dei titoli, perche' e' l'ordine
     che spiega perche' l'analisi arriva dopo l'operativo e non prima. */
  const timeline = chiSonoContenuto.percorso.tappe;
  const projects = chiSonoContenuto.tecnologia.progetti;

  /* Alle credenziali scritte a mano si aggiungono mercati e strumenti, che
     vivono in "Generale" ed evitano di doverli aggiornare in due posti. */
  const credentials = [
    ...chiSonoContenuto.credenziali,
    { voce: "Mercati", valore: site.markets.join(" · ") },
    { voce: "Strumenti", valore: tools.join(" · ") },
  ];

  return (
    <>
      <JsonLd data={await breadcrumbGraph(trail)} />

      <PageHeader
        eyebrow={chiSonoContenuto.pagina.occhiello}
        title={chiSonoContenuto.pagina.titolo}
        lead={chiSonoContenuto.pagina.sottotitolo}
        trail={trail}
        aside={credentials.slice(0, 3)}
      />

      <Section rhythm="loose" ruled tone="surface">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <figure>
                {/* Proporzione fissa 3:4: qualunque foto caricata dal pannello
                    entra nello stesso spazio, ritagliata e non deformata. */}
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={chiSonoContenuto.foto.immagine}
                    alt={chiSonoContenuto.foto.descrizione}
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <figcaption className="eyebrow mt-4 text-ink-faint">
                  {site.name} — {site.role}
                </figcaption>
              </figure>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <Eyebrow numbered="01">{chiSonoContenuto.percorso.occhiello}</Eyebrow>
              </Reveal>

              <Reveal stagger={0.08} className="mt-8">
                {timeline.map((step) => (
                  <RevealItem key={step.anno}>
                    <div className="grid grid-cols-[4.5rem_1fr] gap-5 border-t border-rule py-7 first:border-t-0 first:pt-0">
                      <span className="eyebrow tnum pt-1.5 text-sage">{step.anno}</span>
                      <div>
                        <h2 className="display text-d4">{step.titolo}</h2>
                        <p className="measure mt-3 text-sm text-ink-soft">{step.testo}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </Reveal>

              <Reveal delay={0.12}>
                <dl className="mt-14 border-t border-rule">
                  {credentials.map((row) => (
                    <div
                      key={row.voce}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4"
                    >
                      <dt className="eyebrow text-ink-faint">{row.voce}</dt>
                      <dd className="text-sm text-ink">{row.valore}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* La parte tecnologica: fuori dal percorso di vendita, dentro quello
          di credibilita'. E' cio' che la distingue dagli altri consulenti. */}
      <Section rhythm="loose" ruled>
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow numbered="02">{chiSonoContenuto.tecnologia.occhiello}</Eyebrow>
                <Display level={2} size="d3" className="mt-6">
                  {chiSonoContenuto.tecnologia.titolo}
                </Display>
                <p className="measure mt-6 text-ink-soft">{chiSonoContenuto.tecnologia.testo}</p>
                <p className="eyebrow mt-8 text-ink-faint">
                  {chiSonoContenuto.tecnologia.collaborazione}
                </p>
              </Reveal>
            </div>

            <Reveal stagger={0.08} className="lg:col-span-7 lg:col-start-6">
              {projects.map((project) => (
                <RevealItem key={project.titolo}>
                  <div className="grid gap-2 border-t border-rule py-7 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <span className="eyebrow pt-1.5 text-sage">{project.stato}</span>
                    <div>
                      <h3 className="display text-d4">{project.titolo}</h3>
                      <p className="measure mt-2 text-sm text-ink-soft">{project.testo}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      <Section rhythm="loose" ruled tone="deep">
        <div className="shell">
          <Reveal>
            <Eyebrow numbered="03">{chiSonoContenuto.testimonianze.occhiello}</Eyebrow>
          </Reveal>
          <Reveal stagger={0.1} className="mt-12 grid gap-px border-t border-rule bg-rule lg:grid-cols-3">
            {testimonials.map((item) => (
              <RevealItem key={item.detail} className="bg-paper-deep">
                <figure className="flex h-full flex-col justify-between p-8">
                  <blockquote className="text-ink italic">&laquo;{item.quote}&raquo;</blockquote>
                  <figcaption className="eyebrow mt-8 text-ink-faint">
                    {item.role} — {item.detail}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
