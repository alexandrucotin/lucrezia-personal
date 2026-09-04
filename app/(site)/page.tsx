import Image from "next/image";
import Link from "next/link";

import { KpiPanel } from "@/components/charts/kpi-panel";
import { PickupCurve } from "@/components/charts/pickup-curve";
import { PortfolioMatrix } from "@/components/charts/portfolio-matrix";
import { PricingCalendar } from "@/components/charts/pricing-calendar";
import { CaseScroller } from "@/components/site/case-scroller";
import { MethodSticky } from "@/components/site/method-sticky";
import { ActionLink, TextLink } from "@/components/ui/action";
import { Display, Eyebrow, Lead, Section } from "@/components/ui/section";
import { StatRow } from "@/components/ui/stat";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { site } from "@/lib/site";
import { caseStudies, clients, home, services, stats, tools } from "@/lib/content";
import { generale } from "@/lib/content";

/* Ogni fase del metodo porta il proprio diagramma. La terza no, di proposito:
   un diagramma per casella renderebbe la sezione meccanica. */
const methodDiagrams = [
  <PortfolioMatrix key="matrice" />,
  <PricingCalendar key="calendario" />,
  null,
  <KpiPanel key="kpi" />,
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------
          Hero: nessuna foto di sfondo con testo sopra. Solo tipografia
          su carta e una scheda dati a lato.
      ---------------------------------------------------------------- */}
      <Section as="div" rhythm="loose" className="pt-12 sm:pt-16">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <Reveal>
                <Eyebrow>{home.hero.occhiello}</Eyebrow>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="display mt-7 text-d1">
                  {home.hero.titolo}
                  <span className="text-sage"> {home.hero.titoloEvidenziato}</span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
<Lead className="mt-8">{home.hero.sottotitolo}</Lead>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ActionLink href="/contatti">{home.hero.pulsantePrimario}</ActionLink>
                  <ActionLink href="/servizi" variant="ghost">
                    {home.hero.pulsanteSecondario}
                  </ActionLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.24} className="lg:col-span-4 lg:pl-8">
              <dl className="border-t border-rule lg:border-t-0 lg:border-l lg:border-rule lg:pl-8">
                {[
                  home.hero.scheda[0],
                  { voce: "Mercati", valore: site.markets.join(" · ") },
                  { voce: "Strumenti", valore: tools.slice(0, 3).join(" · ") },
                  home.hero.scheda[1],
                ].map((row) => (
                  <div key={row.voce} className="border-b border-rule py-5 first:pt-6 lg:first:pt-0">
                    <dt className="eyebrow text-ink-faint">{row.voce}</dt>
                    <dd className="mt-2 text-sm text-ink">{row.valore}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal className="mt-20 sm:mt-28">
            <StatRow items={stats} />
          </Reveal>
        </div>
      </Section>

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

      {/* ---------------------------------------------------------------
          Diagnosi. Il grafico apre la sezione: e' il soggetto, non un
          allegato. I sintomi scendono sotto in tre colonne a filetto.
      ---------------------------------------------------------------- */}
      <Section id="diagnosi" rhythm="vast" ruled>
        <div className="shell">
          <Reveal>
            <Eyebrow numbered="01">{home.diagnosi.occhiello}</Eyebrow>
            <Display level={2} size="d2" className="mt-6 max-w-3xl">
              {home.diagnosi.titolo}
            </Display>
          </Reveal>

          <Reveal delay={0.08} className="mt-16 grid gap-12 lg:grid-cols-12">
            <PickupCurve className="lg:col-span-8" />
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

      {/* ---------------------------------------------------------------
          Servizi: indice di una monografia. Ingresso laterale, non dal basso.
      ---------------------------------------------------------------- */}
      <Section id="servizi" tone="surface" rhythm="vast" ruled>
        <div className="shell">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <Reveal>
              <Eyebrow numbered="02">{home.servizi.occhiello}</Eyebrow>
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

      {/* ---------------------------------------------------------------
          Risultati: unico punto del sito che si legge in orizzontale.
          Le schede corrono fino al bordo destro dello schermo.
      ---------------------------------------------------------------- */}
      <Section id="risultati" tone="ink" rhythm="vast">
        <div className="shell">
          <Reveal>
            <Eyebrow numbered="03" className="text-paper/60">
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

      {/* ---------------------------------------------------------------
          Metodo: indice fisso a sinistra che segue lo scroll, fasi a destra
          con il proprio diagramma dentro.
      ---------------------------------------------------------------- */}
      <Section id="metodo" tone="deep" rhythm="vast">
        <div className="shell">
          {/* Il titolo compare qui solo sotto lg: sopra lo porta la colonna fissa. */}
          <div className="mb-4 lg:hidden">
            <Eyebrow numbered="04">{home.metodo.occhiello}</Eyebrow>
            <Display level={2} size="d2" className="mt-6">
              {home.metodo.titolo}
            </Display>
          </div>
          <MethodSticky diagrams={methodDiagrams} />
        </div>
      </Section>

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
                <Image
                  src={generale.immagini.ritratto}
                  alt={generale.immagini.ritrattoDescrizione}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-top"
                />
              </figure>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <Eyebrow numbered="05">{home.chiSono.occhiello}</Eyebrow>
                <Display level={2} size="d2" className="mt-6 max-w-xl">
                  {home.chiSono.titolo}
                </Display>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="measure-wide mt-8 space-y-5 text-ink-soft">
                  {home.chiSono.paragrafi.map((paragrafo, index) => (
                    <p key={paragrafo} className={index > 0 ? "text-ink" : undefined}>
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

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
  );
}
