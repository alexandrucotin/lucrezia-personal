import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import Link from "next/link";

import { KpiPanel } from "@/components/charts/kpi-panel";
import { PickupCurve } from "@/components/charts/pickup-curve";
import { PortfolioMatrix } from "@/components/charts/portfolio-matrix";
import { PricingCalendar } from "@/components/charts/pricing-calendar";
import { CaseScroller } from "@/components/site/case-scroller";
import { FotoRitagliata } from "@/components/site/foto-ritagliata";
import { ImmagineGrafico } from "@/components/site/immagine-grafico";
import { MethodSticky } from "@/components/site/method-sticky";
import { TestoRicco } from "@/components/site/testo-ricco";
import { ActionLink, TextLink } from "@/components/ui/action";
import { Display, Eyebrow, Lead, Section } from "@/components/ui/section";
import { StatRow } from "@/components/ui/stat";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { getContenuti } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { SezioneHome } from "@/lib/content/sezioni-home";

/* Ogni fase del metodo porta il proprio diagramma. La terza no, di proposito:
   un diagramma per casella renderebbe la sezione meccanica. */
const methodDiagrams = [
  <PortfolioMatrix key="matrice" />,
  <PricingCalendar key="calendario" />,
  null,
  <KpiPanel key="kpi" />,
];

export default async function HomePage() {
  const { caseStudies, clients, generale, home, method, services, site, stats } =
    await getContenuti();

  /* Il titolo puo' avere o non avere una seconda parte evidenziata. Se c'e' e
     comincia con punteggiatura, lo spazio prima non ci va. */
  const evidenziato = home.hero.titoloEvidenziato.trim();
  const sfondo = home.hero.sfondo;
  const separatoreTitolo = /^[.,;:!?]/.test(evidenziato) ? "" : " ";

  /* Le sezioni dopo l'apertura, nell'ordine e con le assenze decise dal
     pannello. I numeri (01, 02...) seguono l'ordine scelto: contano solo le
     sezioni che hanno un numero, e solo quelle visibili. */
  const numerate: SezioneHome[] = ["diagnosi", "servizi", "risultati", "metodo", "chiSono"];
  const inOrdine = home.ordine.filter((sezione) => numerate.includes(sezione));
  const numero = (sezione: SezioneHome) =>
    String(inOrdine.indexOf(sezione) + 1).padStart(2, "0");

  const sezioni: Record<SezioneHome, ReactNode> = {
    clienti: (
      <>
        <Section as="div" tone="deep" rhythm="tight" ruled>
          <div className="shell">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="eyebrow text-ink-faint">{home.clienti.occhiello}</p>
              <p className="eyebrow text-ink-faint">{home.clienti.nota}</p>
            </div>
            <ul className="mt-6 flex flex-wrap items-baseline gap-x-12 gap-y-5">
              {clients.map((client) => (
                <li key={client.name} className="flex items-baseline gap-3">
                  <span className="display text-d4 text-ink">{client.name}</span>
                  <span className="eyebrow text-ink-faint">{client.city}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </>
    ),
    diagnosi: (
      <>
        {/* ---------------------------------------------------------------
            Diagnosi. Il grafico apre la sezione: e' il soggetto, non un
            allegato. I sintomi scendono sotto in tre colonne a filetto.
        ---------------------------------------------------------------- */}
        <Section id="diagnosi" rhythm="vast" ruled>
          <div className="shell">
            <Reveal>
              <Eyebrow numbered={numero("diagnosi")}>{home.diagnosi.occhiello}</Eyebrow>
              <Display level={2} size="d2" className="mt-6 max-w-3xl">
                {home.diagnosi.titolo}
              </Display>
            </Reveal>

            <Reveal delay={0.08} className="mt-16 grid gap-12 lg:grid-cols-12">
              {home.diagnosi.immagineGrafico ? (
                <ImmagineGrafico immagine={home.diagnosi.immagineGrafico} className="lg:col-span-8" />
              ) : (
                <PickupCurve className="lg:col-span-8" />
              )}
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="text-ink-soft">{home.diagnosi.commentoGrafico}</p>
                <p className="mt-5 text-sm text-ink-faint">
                  {home.diagnosi.commentoGraficoSecondario}
                </p>
              </div>
            </Reveal>

            <Reveal stagger={0.08} className="mt-24 grid gap-px border-t border-rule bg-rule sm:grid-cols-3">
              {home.diagnosi.sintomi.map((item) => (
                <RevealItem key={item.indice} className="bg-paper sm:px-8 sm:first:pl-0">
                  <div className="py-10">
                    <span className="eyebrow tnum text-sage">{item.indice}</span>
                    <h3 className="display mt-4 text-d4">{item.titolo}</h3>
                    <p className="mt-3 text-sm text-ink-soft">{item.testo}</p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </Section>
      </>
    ),
    servizi: (
      <>
        {/* ---------------------------------------------------------------
            Servizi: indice di una monografia. Ingresso laterale, non dal basso.
        ---------------------------------------------------------------- */}
        <Section id="servizi" tone="surface" rhythm="vast" ruled>
          <div className="shell">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <Reveal>
                <Eyebrow numbered={numero("servizi")}>{home.servizi.occhiello}</Eyebrow>
                <Display level={2} size="d2" className="mt-6 max-w-xl">
                  {home.servizi.titolo}
                </Display>
              </Reveal>
              <Reveal delay={0.1}>
                <TextLink href="/servizi">{home.servizi.link}</TextLink>
              </Reveal>
            </div>

            <Reveal stagger={0.07} className="mt-16">
              {services.map((service) => (
                <RevealItem key={service.slug} from="left">
                  <Link
                    href={`/servizi/${service.slug}`}
                    className="group grid grid-cols-1 gap-y-4 border-t border-rule py-10 transition-colors last:border-b hover:bg-paper sm:grid-cols-12 sm:gap-x-8"
                  >
                    <div className="flex items-baseline gap-4 sm:col-span-4">
                      <span className="eyebrow tnum text-sage">{service.index}</span>
                      <h3 className="display text-d3">{service.title}</h3>
                    </div>

                    <p className="measure text-ink-soft sm:col-span-6">{service.claim}</p>

                    <div className="flex items-baseline gap-4 sm:col-span-2 sm:justify-end">
                      <span className="eyebrow text-ink-faint">{service.duration}</span>
                      <span
                        aria-hidden="true"
                        className="text-ink transition-transform duration-300 ease-editorial group-hover:translate-x-1.5"
                      >
                        &rarr;
                      </span>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </Section>
      </>
    ),
    risultati: (
      <>
        {/* ---------------------------------------------------------------
            Risultati: unico punto del sito che si legge in orizzontale.
            Le schede corrono fino al bordo destro dello schermo.
        ---------------------------------------------------------------- */}
        <Section id="risultati" tone="ink" rhythm="vast">
          <div className="shell">
            <Reveal>
              <Eyebrow numbered={numero("risultati")} className="text-paper/60">
                {home.risultati.occhiello}
              </Eyebrow>
              <Display level={2} size="d2" className="mt-6 max-w-2xl">
                {home.risultati.titolo}
              </Display>
              <p className="eyebrow mt-8 text-paper/45">{home.risultati.istruzione}</p>
            </Reveal>
          </div>

          <Reveal className="shell-start mt-12">
            <CaseScroller items={caseStudies} />
          </Reveal>

          <div className="shell mt-14">
    <p className="text-xs text-paper/40">{home.risultati.nota}</p>
          </div>
        </Section>
      </>
    ),
    metodo: (
      <>
        {/* ---------------------------------------------------------------
            Metodo: indice fisso a sinistra che segue lo scroll, fasi a destra
            con il proprio diagramma dentro.
        ---------------------------------------------------------------- */}
        <Section id="metodo" tone="deep" rhythm="vast">
          <div className="shell">
            {/* Il titolo compare qui solo sotto lg: sopra lo porta la colonna fissa. */}
            <div className="mb-4 lg:hidden">
              <Eyebrow numbered={numero("metodo")}>{home.metodo.occhiello}</Eyebrow>
              <Display level={2} size="d2" className="mt-6">
                {home.metodo.titolo}
              </Display>
            </div>
            <MethodSticky
              method={method}
              diagrams={methodDiagrams}
              numero={numero("metodo")}
              occhiello={home.metodo.occhiello}
              titolo={home.metodo.titolo}
              sottotitolo={home.metodo.sottotitolo}
              link={home.metodo.link}
            />
          </div>
        </Section>
      </>
    ),
    chiSono: (
      <>
        {/* ---------------------------------------------------------------
            Chi sono: breve, dentro il contenitore. Il percorso completo sta
            sulla pagina dedicata, qui basta la persona e due frasi.
        ---------------------------------------------------------------- */}
        <Section id="chi-sono" tone="surface" rhythm="vast" ruled>
          <div className="shell">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                {/* `fill` dentro un contenitore di altezza nota: la foto si puo'
                    sostituire dal pannello con una di proporzioni qualsiasi e
                    viene ritagliata, mai deformata. */}
                <figure className="relative h-[24rem] w-full sm:h-[30rem] lg:h-[34rem]">
                  <FotoRitagliata
                    foto={home.chiSono.immagine}
                    alt={home.chiSono.immagineDescrizione}
                    riquadri={[
                      { media: "(min-width: 1024px)", larghezza: "38vw", altezza: "34rem" },
                      { media: "(min-width: 640px)", larghezza: "100vw", altezza: "30rem" },
                      { larghezza: "100vw", altezza: "24rem" },
                    ]}
                    className="object-cover object-top"
                  />
                </figure>
              </Reveal>

              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal>
                  <Eyebrow numbered={numero("chiSono")}>{home.chiSono.occhiello}</Eyebrow>
                  <Display level={2} size="d2" className="mt-6 max-w-xl">
                    {home.chiSono.titolo}
                  </Display>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="measure-wide mt-8 space-y-5 text-ink-soft">
                    {home.chiSono.paragrafi.map((paragrafo, index) => (
                      <TestoRicco
                        key={index}
                        data={paragrafo}
                        className={index > 0 ? "text-ink" : undefined}
                      />
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Section>
      </>
    ),
    contatti: (
      <>
        {/* ---------------------------------------------------------------
            Chiusura. Un solo invito, e cosa succede dopo averlo accettato.
        ---------------------------------------------------------------- */}
        <Section id="contatti" tone="sage" rhythm="vast">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <Eyebrow className="text-paper/60">{generale.invitoFinale.occhiello}</Eyebrow>
                  <Display level={2} size="d2" className="mt-6">
                    {generale.invitoFinale.titolo}
                  </Display>
                  <p className="measure mt-8 text-lead text-paper/80">
                    {generale.invitoFinale.testo}
                  </p>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <ActionLink href="/contatti" variant="inverse">
                      {generale.invitoFinale.pulsante}
                    </ActionLink>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-sm text-paper/80 underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-paper"
                    >
                      {site.email}
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
                <ol className="border-t border-paper/20">
                  {home.contatti.passi.map((step, index) => (
                    <li
                      key={step}
                      className="grid grid-cols-[2rem_1fr] gap-4 border-b border-paper/20 py-5"
                    >
                      <span className="eyebrow tnum pt-1 text-paper/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-paper/85">{step}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </Section>
      </>
    ),
  };

  return (
    <>
      {/* ---------------------------------------------------------------
          Hero. Di base solo tipografia su carta e una scheda dati a lato.
          Se dal pannello arriva una foto di sfondo, la si mostra molto
          sfocata sotto un velo scuro e il testo passa in chiaro: sfocata,
          anche una foto non nitidissima regge, e il testo resta leggibile.
      ---------------------------------------------------------------- */}
      <Section as="div" rhythm="loose" className={cn("pt-12 sm:pt-16", sfondo && "pt-0 sm:pt-0")}>
        {/* Fondo color terra e non nero: ai bordi la foto sfocata sfuma nel
            fondo, e un bruno caldo si confonde con la foto invece di fare
            da cornice scura. */}
        <div className={cn(sfondo && "relative isolate overflow-hidden bg-terra py-24 sm:py-32")}>
          {sfondo ? (
            <>
              {/* Decorativa: alt vuoto. Sfocata, una risoluzione bassa
                  basta e pesa meno. */}
              <Image
                src={sfondo.url}
                alt=""
                fill
                priority
                sizes="50vw"
                className="-z-20 scale-105 object-cover blur-lg"
              />
              {/* Il velo scurisce solo dove serve: piu' denso a sinistra,
                  sotto il testo bianco, quasi trasparente a destra. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-r from-ink/55 via-ink/30 to-ink/5"
              />
            </>
          ) : null}

          <div className="shell">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-8">
                <Reveal>
                  <Eyebrow className={cn(sfondo && "text-paper/80")}>{home.hero.occhiello}</Eyebrow>
                </Reveal>

                <Reveal delay={0.06}>
                  <h1 className={cn("display mt-7 text-d1", sfondo && "text-paper")}>
                    {home.hero.titolo}
                    {evidenziato ? (
                      <span className={sfondo ? "text-sage-tint" : "text-sage"}>
                        {separatoreTitolo}
                        {evidenziato}
                      </span>
                    ) : null}
                  </h1>
                </Reveal>

                <Reveal delay={0.12}>
                  <Lead className={cn("mt-8", sfondo && "text-paper/85")}>
                    {home.hero.sottotitolo}
                  </Lead>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <ActionLink href="/contatti" variant={sfondo ? "inverse" : "solid"}>
                      {home.hero.pulsantePrimario}
                    </ActionLink>
                    <ActionLink
                      href="/servizi"
                      variant="ghost"
                      className={cn(
                        sfondo &&
                          "border-paper/40 text-paper hover:border-paper hover:bg-paper/10"
                      )}
                    >
                      {home.hero.pulsanteSecondario}
                    </ActionLink>
                  </div>
                </Reveal>
              </div>

              {/* La scheda mostra esattamente le voci che stanno nel pannello, e
                  sparisce se non ce ne sono: e' contenuto che si puo' svuotare. */}
              {home.hero.scheda.length > 0 ? (
                <Reveal delay={0.24} className="lg:col-span-4 lg:pl-8">
                  <dl
                    className={cn(
                      "border-t border-rule lg:border-t-0 lg:border-l lg:border-rule lg:pl-8",
                      sfondo && "border-paper/25 lg:border-paper/25"
                    )}
                  >
                    {home.hero.scheda.map((row) => (
                      <div
                        key={row.voce}
                        className={cn(
                          "border-b border-rule py-5 first:pt-6 lg:first:pt-0",
                          sfondo && "border-paper/25"
                        )}
                      >
                        <dt className={cn("eyebrow", sfondo ? "text-paper/70" : "text-ink-faint")}>
                          {row.voce}
                        </dt>
                        <dd className={cn("mt-2 text-sm", sfondo ? "text-paper" : "text-ink")}>
                          {row.valore}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              ) : null}
            </div>
          </div>
        </div>

        <div className="shell">
          <Reveal className={sfondo ? "mt-16 sm:mt-20" : "mt-20 sm:mt-28"}>
            <StatRow items={stats} />
          </Reveal>
        </div>
      </Section>

      {home.ordine.map((sezione) => (
        <Fragment key={sezione}>{sezioni[sezione]}</Fragment>
      ))}
    </>
  );
}
