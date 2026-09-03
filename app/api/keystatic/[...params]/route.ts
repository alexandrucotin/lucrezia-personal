import { makeRouteHandler } from "@keystatic/next/route-handler";

import config from "@/keystatic.config";
import { keystaticEnabled } from "@/lib/keystatic-access";

/* Costruito solo quando serve: `makeRouteHandler` va in errore appena viene
   creato se la modalita' e' `github` e mancano i segreti, e quello basterebbe
   a far fallire il build di chi non ha ancora configurato la GitHub App. */
const handler = keystaticEnabled ? makeRouteHandler({ config }) : null;

const bloccato = () => new Response("Not found", { status: 404 });

/* Le API vanno chiuse insieme al pannello: sono il pezzo che scrive davvero,
   e non stanno sotto il layout che fa il controllo. */
export const GET = handler?.GET ?? bloccato;
export const POST = handler?.POST ?? bloccato;
