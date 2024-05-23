import { BASE_URL } from "./constants";
import { getIsoFormattedDate } from "./date";

export type PageType = { url: string; timestamp: string | number };

export const generateSitemap = (pages: PageType[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        ${pages
          .map(
            ({ url, timestamp }) => `
            <url>
              <loc>${`${BASE_URL}${url}`}</loc>
              <lastmod>${getIsoFormattedDate(timestamp)}</lastmod>
              <priority>${url === "/" ? 1 : 0.8}</priority>
            </url>
          `
          )
          .join("")}
      </urlset>
    `;
};

export const generateSitemapIndex = (sitemaps: string[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps
        .map(
          (sitemap) => `
          <sitemap>
            <loc>${BASE_URL}${sitemap}</loc>
          </sitemap>
        `
        )
        .join("")}
    </sitemapindex>
  `;
};
