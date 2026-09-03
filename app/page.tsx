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
import { services } from "@/lib/content/services";
import { caseStudies, clients, stats, testimonials, tools } from "@/lib/content/proof";
import { site } from "@/lib/site";

/* Tre sintomi diagnostici: il lettore deve riconoscersi in almeno uno
   entro i primi dieci secondi. Vale più di qualsiasi elenco di feature. */
const symptoms = [
  {
    index: "01",
    title: "Il calendario è pieno, il fatturato non sale.",
    body: "Occupancy al 90% e RevPAR fermo significa una cosa sola: stai comprando notti con lo sconto invece di venderle al prezzo che il mercato pagherebbe.",
  },
  {
    index: "02",
    title: "Il pricing è dinamico solo di nome.",
    body: "Il tool è attivo, i parametri sono quelli di default dal giorno dell'installazione. Il prezzo lo decide un algoritmo che nessuno ha tarato sul tuo portafoglio.",
  },
  {
    index: "03",
    title: "Nessuno sa dire quale unità perde soldi.",
    body: "Il conto economico è aggregato. Dentro la media ci sono appartamenti che ti finanziano e appartamenti che ti costano, e non sai quali.",
  },
];

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
                <Eyebrow>Revenue management · Short-term rental</Eyebrow>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="display mt-7 text-d1">
                  Il tuo portafoglio lascia revenue sul tavolo.
                  <span className="text-sage"> Il mio lavoro è trovare dove.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <Lead className="mt-8">
                  Affianco property manager e aziende di short-term rental con 10-150 unità. Leggo i
                  dati che hai già, ricostruisco la strategia di pricing e la eseguo sui canali.
                  Sul tuo gestionale, senza migrazioni.
                </Lead>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ActionLink href="/contatti">Prenota una call conoscitiva</ActionLink>
                  <ActionLink href="/servizi" variant="ghost">
                    Come lavoro
                  </ActionLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.24} className="lg:col-span-4 lg:pl-8">
              <dl className="border-t border-rule lg:border-t-0 lg:border-l lg:border-rule lg:pl-8">
                {[
                  { k: "Perimetro", v: "Portafogli da 10 a 150 unità" },
                  { k: "Mercati", v: site.markets.join(" · ") },
                  { k: "Strumenti", v: tools.slice(0, 3).join(" · ") },
                  { k: "Formato", v: "Audit una tantum o continuativo" },
                ].map((row) => (
                  <div key={row.k} className="border-b border-rule py-5 first:pt-6 lg:first:pt-0">
                    <dt className="eyebrow text-ink-faint">{row.k}</dt>
                    <dd className="mt-2 text-sm text-ink">{row.v}</dd>
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
            <p className="eyebrow text-ink-faint">Portafogli seguiti</p>
            <p className="eyebrow text-ink-faint">Da 14 a 120 unità</p>
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
            <Eyebrow numbered="01">Diagnosi</Eyebrow>
            <Display level={2} size="d2" className="mt-6 max-w-3xl">
              Il calendario è pieno. Allora perché il fatturato non sale?
            </Display>
          </Reveal>

          <Reveal delay={0.08} className="mt-16 grid gap-12 lg:grid-cols-12">
            <PickupCurve className="lg:col-span-8" />
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-ink-soft">
                Una tariffa che non si muove nei quattro mesi che precedono l&apos;arrivo
                intercetta le prenotazioni sbagliate: perde chi avrebbe pagato di più sotto data,
                e poi recupera notti con lo sconto quando non c&apos;è più tempo per farne prezzo.
              </p>
              <p className="mt-5 text-sm text-ink-faint">
                Il calendario risulta pieno comunque. È per questo che il problema non si vede.
              </p>
            </div>
          </Reveal>

          <Reveal stagger={0.08} className="mt-24 grid gap-px border-t border-rule bg-rule sm:grid-cols-3">
            {symptoms.map((item) => (
              <RevealItem key={item.index} className="bg-paper sm:px-8 sm:first:pl-0">
                <div className="py-10">
                  <span className="eyebrow tnum text-sage">{item.index}</span>
                  <h3 className="display mt-4 text-d4">{item.title}</h3>
                  <p className="mt-3 text-sm text-ink-soft">{item.body}</p>
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
              <Eyebrow numbered="02">Aree di intervento</Eyebrow>
              <Display level={2} size="d2" className="mt-6 max-w-xl">
                Tre modi di lavorare sul tuo revenue.
              </Display>
            </Reveal>
            <Reveal delay={0.1}>
              <TextLink href="/servizi">Tutti i servizi</TextLink>
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
              Risultati
            </Eyebrow>
            <Display level={2} size="d2" className="mt-6 max-w-2xl">
              Tre portafogli, tre problemi diversi.
            </Display>
            <p className="eyebrow mt-8 text-paper/45">Trascina o usa le frecce</p>
          </Reveal>
        </div>

        <Reveal className="shell-start mt-12">
          <CaseScroller items={caseStudies} />
        </Reveal>

        <div className="shell mt-14">
          <p className="text-xs text-paper/40">
            Dati aggregati e anonimizzati su richiesta dei clienti. Numeri di dettaglio disponibili
            in call.
          </p>
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
            <Eyebrow numbered="04">Metodo</Eyebrow>
            <Display level={2} size="d2" className="mt-6">
              Dai dati al calendario, in quattro fasi.
            </Display>
          </div>
          <MethodSticky diagrams={methodDiagrams} />
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          Chi sono: la foto esce dal bordo sinistro dello schermo, il testo
          resta su misura stretta. Nessuna griglia simmetrica.
      ---------------------------------------------------------------- */}
      <Section id="chi-sono" tone="surface" rhythm="vast" ruled>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <figure>
              <Image
                src="/images/lucrezia-celeste-revenue-manager.jpg"
                alt="Lucrezia Celeste, revenue manager specializzata in short-term rental"
                width={1199}
                height={1600}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-[26rem] w-full object-cover object-top sm:h-[34rem] lg:h-[42rem]"
              />
            </figure>
          </Reveal>

          <div className="px-5 sm:px-8 lg:col-span-6 lg:col-start-7 lg:pr-[clamp(1.25rem,5vw,4rem)] lg:pl-0">
            <Reveal>
              <Eyebrow numbered="05">Chi sono</Eyebrow>
              <Display level={2} size="d2" className="mt-6 max-w-xl">
                Ho pulito appartamenti prima di ottimizzare tariffe.
              </Display>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="measure-wide mt-8 space-y-5 text-ink-soft">
                <p>
                  Sono entrata nel settore nel 2021 dall&apos;operatività: avvio di locazioni,
                  gestione ospiti, cura degli appartamenti, amministrazione. Poi la parte analitica,
                  su portafogli fino a 120 unità tra Verona, Milano e Londra.
                </p>
                <p className="text-ink">
                  Collaboro anche allo sviluppo di strumenti per il settore — booking engine, CRS,
                  integrazioni API con i channel manager. Conosco i sistemi anche da dentro, non
                  solo da utente.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <figure className="measure-wide mt-12 border-l border-sage pl-6">
                <blockquote className="display text-d4 italic">
                  &laquo;{testimonials[0].quote}&raquo;
                </blockquote>
                <figcaption className="eyebrow mt-4 text-ink-faint">
                  {testimonials[0].role} — {testimonials[0].detail}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.22}>
              <dl className="mt-12 max-w-lg border-t border-rule">
                {[
                  { k: "Formazione", v: "Laurea in Economia" },
                  { k: "Nel settore", v: "Dal 2021, prima operativa" },
                  { k: "Portafoglio più grande", v: "120 unità" },
                  { k: "Strumenti", v: tools.slice(0, 3).join(" · ") },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="flex items-baseline justify-between gap-6 border-b border-rule py-3.5"
                  >
                    <dt className="eyebrow text-ink-faint">{row.k}</dt>
                    <dd className="text-sm text-ink">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10">
                <TextLink href="/chi-sono">Il percorso completo</TextLink>
              </div>
            </Reveal>
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
                <Eyebrow className="text-paper/60">Inizia da qui</Eyebrow>
                <Display level={2} size="d2" className="mt-6">
                  Trenta minuti, e sai se ha senso lavorare insieme.
                </Display>
                <p className="measure mt-8 text-lead text-paper/80">
                  Raccontami quante unità gestisci, in quale mercato e cosa ti sta dando problemi.
                  Se dai numeri non emerge margine sufficiente te lo dico in call, senza proposta.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ActionLink href="/contatti" variant="inverse">
                    Prenota la call
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
                {[
                  "Mi scrivi due righe sul portafoglio.",
                  "Ci sentiamo trenta minuti, senza slide.",
                  "Ti mando una nota con le prime tre leve che vedo.",
                  "Se ha senso, ti propongo un formato di lavoro.",
                ].map((step, index) => (
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
