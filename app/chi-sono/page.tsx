import Image from "next/image";
import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHeader } from "@/components/site/page-header";
import { Display, Eyebrow, Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { testimonials, tools } from "@/lib/content/proof";
import { breadcrumbGraph, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const trail = [
  { name: "Home", path: "/" },
  { name: "Chi sono", path: "/chi-sono" },
];

/* Il percorso: la sequenza conta piu' dei titoli, perche' e' l'ordine
   che spiega perche' l'analisi arriva dopo l'operativo e non prima. */
const timeline = [
  {
    year: "2021",
    title: "L'operativo",
    body: "Entro nel settore dalla gestione quotidiana: avvio di locazioni, accoglienza ospiti, cura degli appartamenti, pratiche amministrative. È il periodo in cui imparo cosa comporta davvero, a valle, ogni decisione presa a monte.",
  },
  {
    year: "2022",
    title: "I primi portafogli",
    body: "Passo dalla singola unità alla gestione di gruppi di immobili. Comincio a lavorare sui canali, sui contenuti degli annunci e sulle prime politiche tariffarie strutturate.",
  },
  {
    year: "2023",
    title: "La specializzazione",
    body: "Revenue management come mestiere: pricing dinamico, restrizioni, distribuzione. Lavoro su Verona e Milano, poi su Londra, e imparo quanto cambiano le regole passando da un mercato all'altro.",
  },
  {
    year: "Oggi",
    title: "La consulenza",
    body: "Affianco property manager e aziende di short-term rental come revenue manager esterno, su portafogli da 10 a 150 unità, e collaboro allo sviluppo di strumenti per il settore.",
  },
];

const credentials = [
  { k: "Formazione", v: "Laurea in Economia" },
  { k: "Nel settore", v: "Dal 2021, prima operativa" },
  { k: "Portafoglio più grande", v: "120 unità" },
  { k: "Mercati", v: site.markets.join(" · ") },
  { k: "Strumenti", v: tools.join(" · ") },
];

const projects = [
  {
    status: "Completato",
    title: "Booking engine e CRS",
    body: "Motore di prenotazione personalizzabile collegato a un CRS per la gestione dei contenuti, a sua volta integrato con il channel manager.",
  },
  {
    status: "Completato",
    title: "Integrazione API con KrossBooking",
    body: "L'integrazione via API permette di sviluppare soluzioni complementari al channel manager, disegnate sulle esigenze specifiche dell'azienda.",
  },
  {
    status: "In corso",
    title: "Chat unificata",
    body: "OTA, WhatsApp e Gmail in un'unica casella, per togliere al team il costo di saltare fra tre interfacce.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Lucrezia Celeste, revenue manager short-term rental a Verona",
  description:
    "Revenue manager specializzata in short-term rental dal 2021. Portafogli fino a 120 unità tra Verona, Milano e Londra, con un percorso partito dall'operatività.",
  path: "/chi-sono",
});

export default function ChiSonoPage() {
  return (
    <>
      <JsonLd data={breadcrumbGraph(trail)} />

      <PageHeader
        eyebrow="Chi sono"
        title="Ho pulito appartamenti prima di ottimizzare tariffe."
        lead="Non è un aneddoto simpatico: è la ragione per cui le strategie che propongo si possono eseguire davvero. So cosa succede al team delle pulizie il sabato quando cambio un min stay il venerdì."
        trail={trail}
        aside={credentials.slice(0, 3)}
      />

      <Section rhythm="loose" ruled tone="surface">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <figure>
                <Image
                  src="/images/lucrezia-celeste-revenue-manager.jpg"
                  alt="Lucrezia Celeste, revenue manager specializzata in short-term rental"
                  width={1199}
                  height={1600}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="w-full object-cover"
                  priority
                />
                <figcaption className="eyebrow mt-4 text-ink-faint">
                  {site.name} — {site.role}
                </figcaption>
              </figure>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <Eyebrow numbered="01">Il percorso</Eyebrow>
              </Reveal>

              <Reveal stagger={0.08} className="mt-8">
                {timeline.map((step) => (
                  <RevealItem key={step.year}>
                    <div className="grid grid-cols-[4.5rem_1fr] gap-5 border-t border-rule py-7 first:border-t-0 first:pt-0">
                      <span className="eyebrow tnum pt-1.5 text-sage">{step.year}</span>
                      <div>
                        <h2 className="display text-d4">{step.title}</h2>
                        <p className="measure mt-3 text-sm text-ink-soft">{step.body}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </Reveal>

              <Reveal delay={0.12}>
                <dl className="mt-14 border-t border-rule">
                  {credentials.map((row) => (
                    <div
                      key={row.k}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4"
                    >
                      <dt className="eyebrow text-ink-faint">{row.k}</dt>
                      <dd className="text-sm text-ink">{row.v}</dd>
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
                <Eyebrow numbered="02">Tecnologia</Eyebrow>
                <Display level={2} size="d3" className="mt-6">
                  Conosco i sistemi anche da dentro.
                </Display>
                <p className="measure mt-6 text-ink-soft">
                  Collaboro allo sviluppo di strumenti per il settore. Non è il mio mestiere
                  principale, ma cambia il modo in cui leggo i limiti di un gestionale: so quali
                  sono scelte di prodotto e quali sono vincoli veri.
                </p>
                <p className="eyebrow mt-8 text-ink-faint">In collaborazione con CodeByAlex</p>
              </Reveal>
            </div>

            <Reveal stagger={0.08} className="lg:col-span-7 lg:col-start-6">
              {projects.map((project) => (
                <RevealItem key={project.title}>
                  <div className="grid gap-2 border-t border-rule py-7 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <span className="eyebrow pt-1.5 text-sage">{project.status}</span>
                    <div>
                      <h3 className="display text-d4">{project.title}</h3>
                      <p className="measure mt-2 text-sm text-ink-soft">{project.body}</p>
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
            <Eyebrow numbered="03">Cosa dicono</Eyebrow>
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
