import type { Metadata } from "next";

import { ActionLink, TextLink } from "@/components/ui/action";
import { Display, Eyebrow, Lead, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";
import { contattiContenuto } from "@/lib/content";

export const metadata: Metadata = {
  title: "Richiesta inviata",
  description: "La richiesta è arrivata. Rispondo entro un giorno lavorativo.",
  /* Pagina di conversione: utile a te, inutile in un indice di ricerca. */
  robots: { index: false, follow: true },
};

export default function GraziePage() {
  return (
    <Section rhythm="vast">
      <div className="shell">
        <Reveal>
          <Eyebrow>{contattiContenuto.grazie.occhiello}</Eyebrow>
          <Display level={1} size="d1" className="mt-6 max-w-3xl">
            {contattiContenuto.grazie.titolo}
          </Display>
          <Lead className="mt-8">{contattiContenuto.grazie.testo}</Lead>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <ActionLink href="/metodo" variant="outline">
              Come si svolge un progetto
            </ActionLink>
            <TextLink href="/risultati">Guarda i casi studio</TextLink>
          </div>

          <p className="mt-14 text-sm text-ink-faint">
            Serve prima?{" "}
            <a
              href={`tel:${site.phoneHref}`}
              className="tnum underline decoration-rule-strong underline-offset-4 hover:decoration-ink"
            >
              {site.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
