import type { MetadataRoute } from "next";

import { getSite } from "@/lib/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSite();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* Pagine utili alle persone ma senza valore in un indice di ricerca. */
      disallow: ["/grazie", "/privacy", "/cookie", "/admin", "/api/", "/anteprima"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
