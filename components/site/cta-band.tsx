import { ActionLink } from "@/components/ui/action";
import { Display, Eyebrow, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";
import { generale } from "@/lib/content";

/** Chiusura ricorrente delle pagine interne. Un solo invito, sempre lo stesso. */
export function CtaBand({
  title = generale.invitoFinale.titolo,
  body = generale.invitoFinale.testo,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Section tone="sage" rhythm="loose">
      <div className="shell">
        <Reveal>
          <Eyebrow className="text-paper/60">{generale.invitoFinale.occhiello}</Eyebrow>
          <Display level={2} size="d2" className="mt-6 max-w-3xl">
            {title}
          </Display>
          <p className="measure mt-8 text-lead text-paper/80">{body}</p>
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
