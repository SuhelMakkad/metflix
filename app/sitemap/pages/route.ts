import { MOVIE_TYPES, TV_TYPES } from "@/tmdb/constants";
import { generateSitemap } from "@/utils/sitemap";

const staticPages = [
  { url: "/" },
  { url: "/search" },
  { url: "/legal/privacy" },
  { url: "/legal/termsofuse" },
  { url: "/genre/movies" },
  { url: "/genre/tv-shows" },
  ...MOVIE_TYPES.map((type) => ({
    url: `/genre/movies/${type}`,
  })),
  ...TV_TYPES.map((type) => ({
    url: `/genre/tv-shows/${type}`,
  })),
].map((site) => ({ ...site, timestamp: Date.now() }));

export async function GET(request: Request) {
  const sitemap = generateSitemap(staticPages);

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
