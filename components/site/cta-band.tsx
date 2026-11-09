import { ActionLink } from "@/components/ui/action";
import { Display, Eyebrow, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { getContenuti } from "@/lib/content";

/** Chiusura ricorrente delle pagine interne. Un solo invito, sempre lo stesso. */
export async function CtaBand({ title, body }: { title?: string; body?: string }) {
  const { site, generale } = await getContenuti();

  return (
    <Section tone="sage" rhythm="loose">
      <div className="shell">
        <Reveal>
          <Eyebrow className="text-paper/60">{generale.invitoFinale.occhiello}</Eyebrow>
          <Display level={2} size="d2" className="mt-6 max-w-3xl">
            {title ?? generale.invitoFinale.titolo}
          </Display>
          <p className="measure mt-8 text-lead text-paper/80">
            {body ?? generale.invitoFinale.testo}
          </p>
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
    </Section>
  );
}
