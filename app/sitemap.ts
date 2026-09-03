import type { MetadataRoute } from "next";

import { services } from "@/lib/content/services";
import { site } from "@/lib/site";

/* Priorita' assegnate per intento commerciale, non per profondita' di URL:
   le pagine servizio valgono quanto la home perche' e' li' che atterrano
   le ricerche a intento alto. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/servizi", priority: 0.9, changeFrequency: "monthly" },
    ...services.map((service) => ({
      path: `/servizi/${service.slug}`,
      priority: 0.9,
      changeFrequency: "monthly" as const,
    })),
    { path: "/metodo", priority: 0.7, changeFrequency: "yearly" },
    { path: "/risultati", priority: 0.8, changeFrequency: "monthly" },
    { path: "/chi-sono", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contatti", priority: 0.8, changeFrequency: "yearly" },
  ];

  return pages.map((page) => ({
    url: `${site.url}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
