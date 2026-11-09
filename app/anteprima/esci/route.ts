import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { percorsoInterno } from "@/lib/percorso-interno";

/** Esce dall'anteprima e torna ai testi pubblicati, sulla stessa pagina. */
export async function GET(request: Request) {
  (await draftMode()).disable();
  redirect(percorsoInterno(new URL(request.url).searchParams.get("percorso")));
}
