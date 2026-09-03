"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";

import { site } from "@/lib/site";

export type FormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

const schema = z.object({
  nome: z.string().trim().min(2, "Scrivi il tuo nome.").max(120),
  email: z.email("Controlla l'indirizzo email.").max(200),
  azienda: z.string().trim().max(200).optional(),
  unita: z.string().trim().min(1, "Seleziona la dimensione del portafoglio.").max(60),
  mercato: z.string().trim().max(200).optional(),
  messaggio: z
    .string()
    .trim()
    .min(20, "Bastano due righe, ma servono: raccontami la situazione.")
    .max(4000),
  consenso: z.literal("on", { message: "Serve il consenso al trattamento dei dati." }),
});

export async function sendEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  /* Campo esca: invisibile agli umani, compilato quasi solo dai bot.
     Si risponde con un successo finto per non insegnare loro a evitarlo. */
  if (formData.get("sito")) {
    redirect("/grazie");
  }

  const parsed = schema.safeParse({
    nome: formData.get("nome"),
    email: formData.get("email"),
    azienda: formData.get("azienda") ?? undefined,
    unita: formData.get("unita"),
    mercato: formData.get("mercato") ?? undefined,
    messaggio: formData.get("messaggio"),
    consenso: formData.get("consenso"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors, message: "Controlla i campi segnalati." };
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  const body = [
    `Nome: ${data.nome}`,
    `Email: ${data.email}`,
    data.azienda ? `Azienda: ${data.azienda}` : null,
    `Unità gestite: ${data.unita}`,
    data.mercato ? `Mercato: ${data.mercato}` : null,
    "",
    data.messaggio,
  ]
    .filter(Boolean)
    .join("\n");

  if (!apiKey) {
    /* In sviluppo si stampa e si prosegue. In produzione non si finge:
       un contatto perso in silenzio e' il peggior esito possibile. */
    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        message: `Non riesco a inviare il messaggio in questo momento. Scrivimi direttamente a ${site.email}.`,
      };
    }
    console.info("[contatti] RESEND_API_KEY assente, messaggio non inviato:\n" + body);
    redirect("/grazie");
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "Sito <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? site.email,
      replyTo: data.email,
      subject: `Richiesta consulenza — ${data.nome} (${data.unita})`,
      text: body,
    });

    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("[contatti] invio fallito", error);
    return {
      ok: false,
      message: `Non riesco a inviare il messaggio in questo momento. Scrivimi direttamente a ${site.email}.`,
    };
  }

  redirect("/grazie");
}
