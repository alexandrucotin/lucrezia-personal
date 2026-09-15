import { Display, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

/**
 * FAQ con <details> nativo: nessun JavaScript, apre e chiude sempre, e il
 * contenuto e' nel DOM anche da chiuso — quindi indicizzabile e cercabile
 * con la ricerca del browser.
 */
export function FaqList({
  items,
  title = "Domande che mi fanno prima di iniziare",
  eyebrow = "Domande",
}: {
  items: readonly { q: string; a: string }[];
  title?: string;
  eyebrow?: string;
}) {
  /* Nessuna domanda: sparisce tutto il blocco, titolo compreso. */
  if (items.length === 0) return null;

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display level={2} size="d3" className="mt-6">
            {title}
          </Display>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
        <div className="border-t border-rule">
          {items.map((item) => (
            <details key={item.q} className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <span className="display text-d4">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-ink-faint transition-transform duration-300 ease-editorial group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="measure pb-7 text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
