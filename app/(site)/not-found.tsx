import { ActionLink, TextLink } from "@/components/ui/action";
import { Display, Eyebrow, Lead, Section } from "@/components/ui/section";
import { getContenuti } from "@/lib/content";

/* Gira dentro il layout del sito: intestazione e piè di pagina ci sono gia'. */
export default async function NotFound() {
  const { services } = await getContenuti();

  return (
    <>
      <Section as="div" rhythm="vast">
      <div className="shell">
        <Eyebrow>Errore 404</Eyebrow>
        <Display level={1} size="d1" className="mt-6 max-w-3xl">
          Questa pagina non esiste.
        </Display>
        <Lead className="mt-8">
          Può darsi che l&apos;indirizzo sia cambiato. Da qui si arriva a tutto il resto.
        </Lead>

        <div className="mt-12 max-w-2xl border-t border-rule">
          {services.map((service) => (
            <TextLink
              key={service.slug}
              href={`/servizi/${service.slug}`}
              className="flex justify-between border-b border-rule py-5 no-underline"
            >
              {service.title}
            </TextLink>
          ))}
        </div>

          <div className="mt-12">
            <ActionLink href="/">Torna alla home</ActionLink>
          </div>
        </div>
      </Section>
    </>
  );
}
