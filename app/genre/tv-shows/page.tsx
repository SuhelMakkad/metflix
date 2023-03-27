import BannerSection from "@/components/BannerSection";
import TVShowsCarousel from "@/components/ImageCarousel/TVShowsCarousel";
import type { Props as TVShowsCarouselProp } from "@/components/ImageCarousel/TVShowsCarousel";
import { getTVShows } from "@/tmdb/lib/tv";

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
  const popularMovies = (await getTVShows("popular"))?.results ?? [];

  const tvShowsCarousel: TVShowsCarouselProp[] = [
    {
      title: "New Releases",
      href: "/genre/tv-shows/on_the_air",
      type: "on_the_air",
    },
    {
      title: "Popular",
      href: "/genre/tv-shows/popular",
      type: "popular",
    },
    {
      title: "Trending Today",
      href: "/genre/tv-shows/trending",
      type: "trending",
    },
    {
      title: "Top Rated",
      href: "/genre/tv-shows/top_rated",
      type: "top_rated",
    },
  ];
  return (
    <>
      <BannerSection items={popularMovies} />

      <ul className="flex flex-col gap-5 lg:gap-7">
        {tvShowsCarousel.map((movieCarousel, index) => (
          <li key={index}>
            <TVShowsCarousel
              key={index}
              title={movieCarousel.title}
              href={movieCarousel.href}
              type={movieCarousel.type}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
