"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { sendEnquiry, type FormState } from "@/lib/actions/contatti";
import { ActionButton } from "@/components/ui/action";
import { cn } from "@/lib/utils";
import { contattiContenuto } from "@/lib/content";

const initial: FormState = { ok: true };

const field =
  "mt-2 w-full border border-rule-strong bg-surface px-4 py-3.5 text-ink transition-colors placeholder:text-ink-faint focus:border-sage focus:outline-none";

/* Il campo dimensione portafoglio qualifica il contatto prima della call:
   sotto le dieci unita' il servizio non si ripaga, ed e' meglio saperlo qui. */
const { etichette, segnaposto, dimensioni: sizes } = contattiContenuto.modulo;

export function ContactForm() {
  const [state, action] = useActionState(sendEnquiry, initial);

  return (
    <form action={action} className="max-w-xl" noValidate>
      {state.message && !state.ok ? (
        <p role="alert" className="mb-8 border-l-2 border-ochre bg-surface px-5 py-4 text-sm text-ink">
          {state.message}
        </p>
      ) : null}

      <Field name="nome" label={etichette.nome} error={state.fieldErrors?.nome}>
        <input id="nome" name="nome" type="text" autoComplete="name" required className={field} />
      </Field>

      <Field name="email" label={etichette.email} error={state.fieldErrors?.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={segnaposto.email}
          className={field}
        />
      </Field>

      <Field name="azienda" label={etichette.azienda} hint="Facoltativo">
        <input
          id="azienda"
          name="azienda"
          type="text"
          autoComplete="organization"
          className={field}
        />
      </Field>

      <Field name="unita" label={etichette.unita} error={state.fieldErrors?.unita}>
        <select id="unita" name="unita" required defaultValue="" className={field}>
          <option value="" disabled>
            Seleziona
          </option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </Field>

      <Field name="mercato" label={etichette.mercato} hint="Città o zona, facoltativo">
        <input id="mercato" name="mercato" type="text" className={field} />
      </Field>

      <Field
        name="messaggio"
        label={etichette.messaggio}
        error={state.fieldErrors?.messaggio}
      >
        <textarea
          id="messaggio"
          name="messaggio"
          rows={5}
          required
          placeholder={segnaposto.messaggio}
          className={cn(field, "resize-y")}
        />
      </Field>

      {/* Campo esca per i bot: nascosto agli umani e agli screen reader. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="sito">Non compilare</label>
        <input id="sito" name="sito" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 border-t border-rule pt-6">
        <label htmlFor="consenso" className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
          <input
            id="consenso"
            name="consenso"
            type="checkbox"
            required
            className="mt-1 size-4 shrink-0 accent-[var(--color-sage)]"
          />
          <span>
            {contattiContenuto.modulo.consenso}{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-ink">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {state.fieldErrors?.consenso ? (
          <p className="mt-2 text-sm text-ochre">{state.fieldErrors.consenso}</p>
        ) : null}
      </div>

      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <ActionButton type="submit" disabled={pending} className="mt-8 w-full sm:w-auto">
      {pending ? contattiContenuto.modulo.inviaInCorso : contattiContenuto.modulo.invia}
    </ActionButton>
  );
}

function Field({
  name,
  label,
  hint,
  error,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7 first:mt-0">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={name} className="eyebrow text-ink">
          {label}
        </label>
        {hint ? <span className="eyebrow text-ink-faint">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p className="mt-2 text-sm text-ochre" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
