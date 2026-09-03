import Image from "next/image";
import Link from "next/link";

import { ActionLink, TextLink } from "@/components/ui/action";
import { Display, Eyebrow, Lead, Section } from "@/components/ui/section";
import { StatRow } from "@/components/ui/stat";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { method, services } from "@/lib/content/services";
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

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------
          Hero: nessuna foto di sfondo con testo sopra. Solo tipografia
          su carta e una scheda dati a lato. È la scelta che allontana
          di più il sito dall'estetica dei builder — ed è anche la più veloce.
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

            {/* Scheda tecnica: dichiara subito il perimetro. Chi non rientra
                se ne accorge qui, e va bene così. */}
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

      {/* Fascia clienti: wordmark tipografici, non loghi. */}
      <Section as="div" tone="deep" rhythm="tight" ruled>
        <div className="shell">
          <p className="eyebrow text-ink-faint">Portafogli seguiti</p>
          <ul className="mt-6 flex flex-wrap items-baseline gap-x-10 gap-y-4">
            {clients.map((client) => (
              <li key={client} className="display text-d4 text-ink-soft">
                {client}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          Diagnosi. Il lettore si riconosce prima che gli venda qualcosa.
      ---------------------------------------------------------------- */}
      <Section id="diagnosi" rhythm="vast" ruled>
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow numbered="01">Diagnosi</Eyebrow>
                <Display level={2} size="d2" className="mt-6">
                  Tre sintomi che trovo in quasi ogni portafoglio.
                </Display>
              </Reveal>
            </div>

            <Reveal stagger={0.08} className="lg:col-span-7 lg:col-start-6">
              {symptoms.map((item) => (
                <RevealItem key={item.index}>
                  <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-rule py-8 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr]">
                    <span className="eyebrow tnum pt-2 text-sage">{item.index}</span>
                    <div>
                      <h3 className="display text-d4">{item.title}</h3>
                      <p className="measure mt-3 text-ink-soft">{item.body}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          Servizi come indice di una monografia, non come tre card uguali.
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
              <RevealItem key={service.slug}>
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
          Risultati su fondo scuro: rottura di ritmo, e i numeri
          diventano l'unica cosa che si vede.
      ---------------------------------------------------------------- */}
      <Section id="risultati" tone="ink" rhythm="vast">
        <div className="shell">
          <Reveal>
            <Eyebrow numbered="03" className="text-paper-deep/70">
              Risultati
            </Eyebrow>
            <Display level={2} size="d2" className="mt-6 max-w-2xl">
              Tre portafogli, tre problemi diversi.
            </Display>
          </Reveal>

          <Reveal stagger={0.1} className="mt-16">
            {caseStudies.map((item) => (
              <RevealItem key={item.slug}>
                <article className="grid gap-8 border-t border-paper/15 py-12 last:border-b lg:grid-cols-12 lg:gap-8">
                  <header className="lg:col-span-3">
                    <p className="display text-d4">{item.client}</p>
                    <p className="eyebrow tnum mt-3 text-paper/50">
                      {item.units} unità · {item.market}
                    </p>
                    <p className="eyebrow mt-2 text-paper/50">Orizzonte {item.horizon}</p>
                  </header>

                  <div className="lg:col-span-5">
                    <p className="text-paper/85">{item.problem}</p>
                    <p className="mt-4 text-sm text-paper/60">{item.action}</p>
                  </div>

                  <dl className="grid grid-cols-3 gap-6 lg:col-span-4 lg:grid-cols-1 lg:gap-4">
                    {item.results.map((result) => (
                      <div key={result.label} className="lg:flex lg:items-baseline lg:gap-4">
                        <dd className="display tnum text-d4 leading-none text-paper lg:w-28">
                          {result.value}
                        </dd>
                        <dt className="mt-1 text-xs text-paper/55 lg:mt-0">{result.label}</dt>
                      </div>
                    ))}
                  </dl>
                </article>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal className="mt-14">
            <p className="text-xs text-paper/40">
              Dati aggregati e anonimizzati su richiesta dei clienti. Numeri di dettaglio
              disponibili in call.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          Metodo: quattro fasi, misura strettissima, foto full-bleed a lato.
      ---------------------------------------------------------------- */}
      <Section id="metodo" tone="deep" rhythm="vast">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow numbered="04">Metodo</Eyebrow>
                <Display level={2} size="d2" className="mt-6">
                  Dai dati al calendario, in quattro fasi.
                </Display>
                <Lead className="mt-6">
                  Nessuna tariffa cambia prima che il piano sia scritto, discusso e approvato.
                </Lead>
                <div className="mt-10">
                  <TextLink href="/metodo">Il metodo nel dettaglio</TextLink>
                </div>
              </Reveal>

              <Reveal delay={0.15} className="mt-14 hidden lg:block">
                <figure>
                  <Image
                    src="/images/appartamento-short-term-rental.jpg"
                    alt="Camera di un appartamento in gestione short-term rental"
                    width={1676}
                    height={2200}
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="h-[26rem] w-full object-cover"
                  />
                  <figcaption className="eyebrow mt-4 text-ink-faint">
                    Unità in gestione — Verona
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            <Reveal stagger={0.08} className="lg:col-span-6 lg:col-start-7">
              {method.map((phase) => (
                <RevealItem key={phase.index}>
                  <div className="border-t border-rule-strong/60 py-8 first:border-t-0 first:pt-0">
                    <div className="flex items-baseline justify-between gap-6">
                      <div className="flex items-baseline gap-4">
                        <span className="eyebrow tnum text-sage">{phase.index}</span>
                        <h3 className="display text-d3">{phase.title}</h3>
                      </div>
                      <span className="eyebrow shrink-0 text-ink-faint">{phase.duration}</span>
                    </div>
                    <p className="measure mt-4 text-ink-soft">{phase.body}</p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          Chi sono. Ritratto fuori asse, non centrato in un cerchio.
      ---------------------------------------------------------------- */}
      <Section id="chi-sono" rhythm="vast" ruled>
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <figure>
                <Image
                  src="/images/lucrezia-celeste-revenue-manager.jpg"
                  alt="Lucrezia Celeste, revenue manager specializzata in short-term rental"
                  width={1199}
                  height={1600}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="w-full object-cover"
                  priority={false}
                />
                <figcaption className="eyebrow mt-4 text-ink-faint">
                  Lucrezia Celeste — {site.role}
                </figcaption>
              </figure>
            </Reveal>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <Eyebrow numbered="05">Chi sono</Eyebrow>
                <Display level={2} size="d2" className="mt-6">
                  Ho pulito appartamenti prima di ottimizzare tariffe.
                </Display>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="measure-wide mt-8 space-y-5 text-ink-soft">
                  <p>
                    Sono entrata nel settore nel 2021 dall&apos;operatività: avvio di locazioni,
                    gestione ospiti, cura degli appartamenti, amministrazione. Poi la parte
                    analitica, su portafogli fino a 120 unità tra Verona, Milano e Londra.
                  </p>
                  <p>
                    Questo mi ha dato una cosa che i corsi non danno: so cosa comporta, a valle,
                    ogni decisione tariffaria. Un min stay cambiato il venerdì è una telefonata al
                    team delle pulizie il sabato.
                  </p>
                  <p className="text-ink">
                    Collaboro anche allo sviluppo di strumenti per il settore — booking engine, CRS,
                    integrazioni API con i channel manager. Conosco i sistemi anche da dentro, non
                    solo da utente.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-10">
                  <TextLink href="/chi-sono">Il percorso completo</TextLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          Testimonianze: una citazione grande, due di supporto. Nessun carosello.
      ---------------------------------------------------------------- */}
      <Section tone="surface" rhythm="loose" ruled>
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <figure>
                <blockquote className="display text-d3 text-balance italic">
                  &laquo;{testimonials[0].quote}&raquo;
                </blockquote>
                <figcaption className="eyebrow mt-8 text-ink-faint">
                  {testimonials[0].role} — {testimonials[0].detail}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal stagger={0.1} className="lg:col-span-4 lg:col-start-9">
              {testimonials.slice(1).map((item) => (
                <RevealItem key={item.detail}>
                  <figure className="border-t border-rule py-7 first:border-t-0 first:pt-0">
                    <blockquote className="text-sm text-ink-soft">
                      &laquo;{item.quote}&raquo;
                    </blockquote>
                    <figcaption className="eyebrow mt-4 text-ink-faint">
                      {item.role} — {item.detail}
                    </figcaption>
                  </figure>
                </RevealItem>
              ))}
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
