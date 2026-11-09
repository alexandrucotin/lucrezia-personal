import config from "@payload-config";
import { draftMode, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";

import { percorsoInterno } from "@/lib/percorso-interno";

/**
 * Anteprima delle bozze: la apre il pulsante "Anteprima" del pannello.
 *
 * Solo chi ha fatto l'accesso al pannello puo' entrare. Da qui in poi, nello
 * stesso browser, il sito mostra le bozze invece dei testi pubblicati,
 * finche' non si esce da /anteprima/esci o si chiude il browser.
 */
export async function GET(request: Request) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });

  if (!user) {
    return new Response("Per vedere l'anteprima accedi prima al pannello, su /admin.", {
      status: 401,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  (await draftMode()).enable();
  redirect(percorsoInterno(new URL(request.url).searchParams.get("percorso")));
}
