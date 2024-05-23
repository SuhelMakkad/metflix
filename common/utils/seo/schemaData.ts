import { BASE_URL } from "@/utils/constants";

export const indexPageSchemas = [
  {
    id: "website-schema",
    value: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: `${BASE_URL}`,
      potentialAction: {
        "@type": "SearchAction",
        "query-input": "required name=search_term_string",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
        },
      },
    },
  },
];
