import { generateSitemapIndex } from "@/utils/sitemap";

export async function GET(request: Request) {
  const sitemaps = ["/sitemap/pages"];
  const sitemapIndex = generateSitemapIndex(sitemaps);

  return new Response(sitemapIndex, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
