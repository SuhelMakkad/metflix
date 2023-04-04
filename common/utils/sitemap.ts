import { getIsoFormattedDate } from ".";

export type PageType = { url: string; timestamp: string | number };

export const generateSitemap = (baseUrl: string, pages: PageType[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        ${pages
          .map(
            ({ url, timestamp }) => `
            <url>
              <loc>${`${baseUrl}${url}`}</loc>
              <lastmod>${getIsoFormattedDate(timestamp)}</lastmod>
              <priority>${url === "/" ? 1 : 0.8}</priority>
            </url>
          `
          )
          .join("")}
      </urlset>
    `;
};
