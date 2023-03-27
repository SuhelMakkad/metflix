import BannerSection from "@/components/BannerSection";
import TVShowsCarousel from "@/components/ImageCarousel/TVShowsCarousel";
import type { Props as TVShowsCarouselProp } from "@/components/ImageCarousel/TVShowsCarousel";
import { getTVShows, getTVShowsList } from "@/tmdb/lib/tv";
import { TVShows, TVType } from "@/tmdb/types/tv";

export async function generateMetadata() {
  const title = `TV Show - Metflix`;

  return {
    title,
    openGraph: {
      title,
      description: `A list of the TV Show`,
      siteName: "Metflix",
      locale: "en-US",
      type: "website",
    },
  };
}

export default async function TVShowsPage() {
  const tvShows = await getTVShowsList([
    "on_the_air",
    "popular",
    "trending",
    "top_rated",
  ]);

  const tvShowsCarousel: TVShowsCarouselProp[] = [
    {
      title: "New Releases",
      href: "/genre/tv-shows/on_the_air",
      tvShows: tvShows.on_the_air,
    },
    {
      title: "Popular",
      href: "/genre/tv-shows/popular",
      tvShows: tvShows.popular,
    },
    {
      title: "Trending Today",
      href: "/genre/tv-shows/trending",
      tvShows: tvShows.trending,
    },
    {
      title: "Top Rated",
      href: "/genre/tv-shows/top_rated",
      tvShows: tvShows.top_rated,
    },
  ];
  return (
    <>
      <BannerSection items={tvShows.popular} />

      <ul className="flex flex-col gap-5 lg:gap-7">
        {tvShowsCarousel.map((movieCarousel, index) => (
          <li key={index}>
            <TVShowsCarousel
              key={index}
              title={movieCarousel.title}
              href={movieCarousel.href}
              tvShows={movieCarousel.tvShows}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
