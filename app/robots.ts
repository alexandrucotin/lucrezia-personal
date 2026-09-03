import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* Pagine utili alle persone ma senza valore in un indice di ricerca. */
      disallow: ["/grazie", "/privacy", "/cookie", "/keystatic", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
