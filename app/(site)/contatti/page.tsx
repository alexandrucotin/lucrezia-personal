import type { Metadata } from "next";

import { ContactForm } from "@/components/site/contact-form";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/site/json-ld";
import { PageHeader } from "@/components/site/page-header";
import { Eyebrow, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { breadcrumbGraph, faqGraph, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { faqs } from "@/lib/content";
import { contattiContenuto } from "@/lib/content";

const trail = [
  { name: "Home", path: "/" },
  { name: "Contatti", path: "/contatti" },
];

const steps = contattiContenuto.passi;

export const metadata: Metadata = pageMetadata({
  title: contattiContenuto.meta.titolo,
  description: contattiContenuto.meta.descrizione,
  path: "/contatti",
});

export default function ContattiPage() {
  return (
    <>
      <JsonLd data={breadcrumbGraph(trail)} />
      <JsonLd data={faqGraph(faqs)} />

      <PageHeader
        eyebrow={contattiContenuto.pagina.occhiello}
        title={contattiContenuto.pagina.titolo}
        lead={contattiContenuto.pagina.sottotitolo}
        trail={trail}
      />

      <Section rhythm="loose" ruled tone="surface">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow numbered="01">Scrivimi</Eyebrow>
                <div className="mt-10">
                  <ContactForm />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.1}>
                <Eyebrow className="text-ink-faint">Cosa succede dopo</Eyebrow>
                <ol className="mt-6 border-t border-rule">
                  {steps.map((step, index) => (
                    <li
                      key={step}
                      className="grid grid-cols-[2rem_1fr] gap-4 border-b border-rule py-5"
                    >
                      <span className="eyebrow tnum pt-1 text-sage">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-ink">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-12">
                  <Eyebrow className="text-ink-faint">In alternativa</Eyebrow>
                  <div className="mt-5 space-y-2 text-sm">
                    <p>
                      <a
                        href={`mailto:${site.email}`}
                        className="underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-ink"
                      >
                        {site.email}
                      </a>
                    </p>
                    <p>
                      <a
                        href={`tel:${site.phoneHref}`}
                        className="tnum underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-ink"
                      >
                        {site.phone}
                      </a>
                    </p>
                    <p>
                      <a
                        href={site.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-ink"
                      >
                        LinkedIn
                      </a>
                    </p>
                  </div>
<p className="mt-6 text-xs text-ink-faint">{contattiContenuto.nota}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <Section rhythm="loose" ruled tone="deep">
        <div className="shell">
          <FaqList items={faqs} />
        </div>
      </Section>
    </>
  );
}
