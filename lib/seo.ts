import type { Metadata } from "next";

import { site } from "@/lib/site";

/**
 * Metadati e dati strutturati.
 *
 * Il JSON-LD non serve solo ai rich result: e' il modo in cui i motori e
 * i modelli linguistici capiscono *chi e' l'entita'* e cosa vende. Su una
 * consulenza personale e' il fattore che decide se, alla domanda "chi mi
 * consigli per il revenue management degli affitti brevi", il nome esce.
 */

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "it_IT",
      url,
      title,
      description,
      siteName: `${site.name} — ${site.tagline}`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const person = {
  "@type": "Person",
  "@id": `${site.url}/#lucrezia`,
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: site.email,
  sameAs: [site.linkedin],
  knowsAbout: [
    "Revenue management",
    "Short-term rental",
    "Dynamic pricing",
    "Distribuzione OTA",
    "PriceLabs",
    "Smartpricing",
  ],
  worksFor: { "@id": `${site.url}/#business` },
};

const business = {
  "@type": "ProfessionalService",
  "@id": `${site.url}/#business`,
  name: `${site.name} — ${site.tagline}`,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description:
    "Consulenza di revenue management per property manager e aziende di short-term rental: analisi del portafoglio, dynamic pricing e ottimizzazione OTA.",
  founder: { "@id": `${site.url}/#lucrezia` },
  areaServed: site.markets.map((market) => ({ "@type": "City", name: market })),
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.legal.city,
    addressCountry: site.legal.country,
  },
};

const website = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: `${site.name} — ${site.tagline}`,
  inLanguage: "it-IT",
  publisher: { "@id": `${site.url}/#business` },
};

/** Entita' di base, incluse una volta sola nel layout. */
export function rootGraph() {
  return { "@context": "https://schema.org", "@graph": [person, business, website] };
}

export function serviceGraph({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    serviceType: "Revenue management per short-term rental",
    provider: { "@id": `${site.url}/#business` },
    areaServed: site.markets.map((market) => ({ "@type": "City", name: market })),
    audience: {
      "@type": "BusinessAudience",
      name: "Property manager e aziende di short-term rental con 10-150 unità",
    },
  };
}

export function faqGraph(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbGraph(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: `${site.url}${step.path}`,
    })),
  };
}
