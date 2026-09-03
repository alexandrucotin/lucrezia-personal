import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { keystaticEnabled } from "@/lib/keystatic-access";

export const metadata: Metadata = {
  title: "Testi del sito",
  robots: { index: false, follow: false },
};

/** Il pannello si disegna da solo: niente intestazione, piè di pagina o stili del sito. */
export default function KeystaticLayout({ children }: LayoutProps<"/keystatic">) {
  /* Senza autenticazione GitHub configurata, in produzione qui non c'è niente. */
  if (!keystaticEnabled) notFound();

  return children;
}
