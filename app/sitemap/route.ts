export async function GET(request: Request) {
  const httpType = "https";
  const host = request.headers.get("host");
  const baseUrl = `${httpType}://${host}`;

  const sitemaps = ["/sitemap/pages"];

  // const propertiesCount = await getPropertiesCount();
  // const propertiesSiteMapCount = Math.ceil(propertiesCount / propertiesPerSiteMap);
  // const propertiesSitemaps = new Array(propertiesSiteMapCount)
  //   .fill()
  //   .map((_, index) => `/api/sitemaps/properties/${index + 1}/sitemap.xml`);
  const propertiesSitemaps: string[] = [];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[...sitemaps, ...propertiesSitemaps].map(
      (sitemap) => `
        <sitemap>
          <loc>${baseUrl}${sitemap}</loc>
        </sitemap>
      `
    )}
  </sitemapindex>
`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
