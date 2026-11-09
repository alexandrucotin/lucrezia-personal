import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { KpiPanel } from "@/components/charts/kpi-panel";
import { PortfolioMatrix } from "@/components/charts/portfolio-matrix";
import { PricingCalendar } from "@/components/charts/pricing-calendar";
import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/site/json-ld";
import { PageHeader } from "@/components/site/page-header";
import { TextLink } from "@/components/ui/action";
import { Display, Eyebrow, Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { breadcrumbGraph, faqGraph, pageMetadata, serviceGraph } from "@/lib/seo";
import { getContenuti } from "@/lib/content";

const diagrams = {
  matrix: PortfolioMatrix,
  calendar: PricingCalendar,
  kpi: KpiPanel,
};

export async function generateStaticParams() {
  const { services } = await getContenuti();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: PageProps<"/servizi/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const { services } = await getContenuti();
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/servizi/${service.slug}`,
  });
}

export default async function ServizioPage(props: PageProps<"/servizi/[slug]">) {
  const { slug } = await props.params;
  const { services } = await getContenuti();
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const Diagram = service.diagram ? diagrams[service.diagram] : null;
  const others = services.filter((item) => item.slug !== service.slug);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Servizi", path: "/servizi" },
    { name: service.title, path: `/servizi/${service.slug}` },
  ];

  return (
    <>
      <JsonLd data={await breadcrumbGraph(trail)} />
      <JsonLd
        data={await serviceGraph({
          name: service.title,
          description: service.metaDescription,
          path: `/servizi/${service.slug}`,
        })}
      />
      <JsonLd data={faqGraph(service.faq)} />

      <PageHeader
        eyebrow={`${service.index} · ${service.eyebrow}`}
        title={service.claim}
        lead={service.lead}
        trail={trail}
        aside={[
          { voce: "Servizio", valore: service.title },
          { voce: "Durata", valore: service.duration },
          { voce: "Perimetro", valore: "10-150 unità" },
        ]}
      />

      {/* Cosa consegna, prima di qualsiasi altra cosa. */}
      <Section rhythm="loose" ruled tone="surface">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow numbered="01">Cosa ricevi</Eyebrow>
                <Display level={2} size="d3" className="mt-6">
                  In concreto, cosa ti resta in mano.
                </Display>
              </Reveal>
            </div>

            <Reveal stagger={0.06} className="lg:col-span-7 lg:col-start-6">
              <ol className="border-t border-rule">
                {service.deliverables.map((item, index) => (
                  <RevealItem key={item}>
                    <li className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-rule py-6">
                      <span className="eyebrow tnum pt-1 text-sage">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-ink">{item}</span>
                    </li>
                  </RevealItem>
                ))}
              </ol>
            </Reveal>
          </div>

          {Diagram ? (
            <Reveal className="mt-20">
              <Diagram />
            </Reveal>
          ) : null}
        </div>
      </Section>

      {/* Per chi è e per chi non è, sulla stessa riga: dire di no rende
          credibile il sì. */}
      <Section rhythm="loose" ruled>
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <Eyebrow numbered="02">Per chi è</Eyebrow>
              <ul className="mt-8 border-t border-rule">
                {service.forWhom.map((item) => (
                  <li key={item} className="border-b border-rule py-5 text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
              <Eyebrow className="text-ochre">Per chi non è</Eyebrow>
              <p className="measure mt-8 text-lead text-ink">{service.notFor}</p>

              <div className="mt-12">
                <Eyebrow className="text-ink-faint">Cosa serve da te</Eyebrow>
                <ul className="mt-6 space-y-3 text-sm text-ink-soft">
                  {service.needs.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="text-sage">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section rhythm="loose" ruled tone="deep">
        <div className="shell">
          <FaqList items={service.faq} />
        </div>
      </Section>

      <Section rhythm="normal" ruled>
        <div className="shell">
          <Reveal>
            <Eyebrow>Gli altri servizi</Eyebrow>
          </Reveal>
          <Reveal stagger={0.08} className="mt-8">
            {others.map((item) => (
              <RevealItem key={item.slug} from="left">
                <Link
                  href={`/servizi/${item.slug}`}
                  className="group flex flex-wrap items-baseline justify-between gap-4 border-t border-rule py-8 last:border-b"
                >
                  <span className="display text-d3">{item.title}</span>
                  <span className="eyebrow flex items-center gap-3 text-ink-faint">
                    {item.duration}
                    <span
                      aria-hidden="true"
                      className="text-ink transition-transform duration-300 ease-editorial group-hover:translate-x-1.5"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
          <div className="mt-10">
            <TextLink href="/metodo">Come si svolge un progetto</TextLink>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
