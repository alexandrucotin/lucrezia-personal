import Link from "next/link";
import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHeader } from "@/components/site/page-header";
import { Display, Eyebrow, Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { breadcrumbGraph, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { packages, services } from "@/lib/content";
import { serviziContenuto } from "@/lib/content";

const trail = [
  { name: "Home", path: "/" },
  { name: "Servizi", path: "/servizi" },
];

export const metadata: Metadata = pageMetadata({
  title: serviziContenuto.meta.titolo,
  description: serviziContenuto.meta.descrizione,
  path: "/servizi",
});

export default function ServiziPage() {
  return (
    <>
      <JsonLd data={breadcrumbGraph(trail)} />

      <PageHeader
        eyebrow={serviziContenuto.pagina.occhiello}
        title={serviziContenuto.pagina.titolo}
        lead={serviziContenuto.pagina.sottotitolo}
        trail={trail}
        aside={serviziContenuto.pagina.scheda}
      />

      <Section rhythm="loose" ruled>
        <div className="shell">
          <Reveal stagger={0.07}>
            {services.map((service) => (
              <RevealItem key={service.slug} from="left">
                <Link
                  href={`/servizi/${service.slug}`}
                  className="group grid gap-y-6 border-t border-rule py-12 transition-colors last:border-b hover:bg-surface sm:grid-cols-12 sm:gap-x-8"
                >
                  <div className="sm:col-span-4">
                    <span className="eyebrow tnum text-sage">{service.index}</span>
                    <h2 className="display mt-3 text-d3">{service.title}</h2>
                    <p className="eyebrow mt-4 text-ink-faint">{service.duration}</p>
                  </div>

                  <div className="sm:col-span-7 sm:col-start-6">
                    <p className="text-lead text-ink">{service.claim}</p>
                    <p className="measure mt-4 text-sm text-ink-soft">{service.summary}</p>
                    <span className="eyebrow mt-6 inline-flex items-center gap-2 text-ink">
                      Vedi il servizio
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 ease-editorial group-hover:translate-x-1.5"
                      >
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Mostrare una fascia di prezzo filtra i contatti non qualificati
          prima della call, invece che durante. */}
      <Section tone="deep" rhythm="loose" ruled>
        <div className="shell">
          <Reveal>
            <Eyebrow>{serviziContenuto.prezzi.occhiello}</Eyebrow>
            <Display level={2} size="d2" className="mt-6 max-w-2xl">
              {serviziContenuto.prezzi.titolo}
            </Display>
            <p className="measure mt-6 text-ink-soft">{serviziContenuto.prezzi.testo}</p>
          </Reveal>

          <Reveal stagger={0.08} className="mt-14 grid gap-px border-t border-rule bg-rule lg:grid-cols-3">
            {packages.map((item) => (
              <RevealItem key={item.name} className="bg-paper-deep">
                <div className={cn("flex h-full flex-col p-8", item.highlight && "bg-surface")}>
                  <p className="eyebrow text-sage">{item.name}</p>
                  <p className="display tnum mt-5 text-d3 leading-none">{item.price}</p>
                  <p className="eyebrow mt-3 text-ink-faint">
                    {item.unit} · {item.duration}
                  </p>
                  <p className="mt-6 text-sm text-ink-soft">{item.body}</p>
                  {item.items.length > 0 ? (
                    <ul className="mt-8 space-y-2.5 border-t border-rule pt-6 text-sm text-ink">
                      {item.items.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span aria-hidden="true" className="text-sage">
                          —
                        </span>
                        {line}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
