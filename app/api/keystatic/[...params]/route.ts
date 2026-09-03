import { makeRouteHandler } from "@keystatic/next/route-handler";

import config from "@/keystatic.config";
import { keystaticEnabled } from "@/lib/keystatic-access";

const handler = makeRouteHandler({ config });

/* Le API vanno chiuse insieme al pannello: sono il pezzo che scrive davvero,
   e non stanno sotto il layout che fa il controllo. */
const bloccato = () => new Response("Not found", { status: 404 });

export const GET = keystaticEnabled ? handler.GET : bloccato;
export const POST = keystaticEnabled ? handler.POST : bloccato;
