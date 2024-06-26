import { getMoviesList } from "@/tmdb/lib/movie";
import { getTVShowsList } from "@/tmdb/lib/tv";

import BannerSection from "@/components/BannerSection";
import MoviesCarousel from "@/components/ImageCarousel/MoviesCarousel";
import TVShowsCarousel from "@/components/ImageCarousel/TVShowsCarousel";
import type { Props as MoviesCarouselProp } from "@/components/ImageCarousel/MoviesCarousel";
import type { Props as TVShowsCarouselProp } from "@/components/ImageCarousel/TVShowsCarousel";

import { getMetadata } from "@/utils/seo/metadata";

export const revalidate = 86400;

export const metadata = getMetadata({
  title: "Home",
  description: `Discover the latest in entertainment on Metflix! Explore a vast library of TV shows and movies. Find detailed information about cast members, seasons, and more. Your ultimate guide to new and trending media content!`,
});

export default async function MoviesPage() {
  const movies = await getMoviesList(["trending", "top_rated"]);
  const tvShows = await getTVShowsList(["trending", "top_rated"]);

  const bannerItem = movies.trending[0];

  const moviesCarousel: MoviesCarouselProp[] = [
    {
      title: "Trending Movies",
      href: "/genre/movies/trending",
      movies: movies.trending,
    },
    {
      title: "Top Rated Movies",
      href: "/genre/movies/top_rated",
      movies: movies.top_rated,
    },
  ];

  const tvShowsCarousel: TVShowsCarouselProp[] = [
    {
      title: "Trending TV Shows",
      href: "/genre/tv-shows/trending",
      tvShows: tvShows.trending,
    },
    {
      title: "Top Rated TV Shows",
      href: "/genre/tv-shows/top_rated",
      tvShows: tvShows.top_rated,
    },
  ];

  return (
    <>
      <BannerSection bannerItem={bannerItem} />

      <ul className="flex flex-col gap-5 lg:gap-7">
        {moviesCarousel.map((movieCarousel, index) => (
          <li key={index}>
            <MoviesCarousel
              key={index}
              title={movieCarousel.title}
              href={movieCarousel.href}
              movies={movieCarousel.movies}
            />
          </li>
        ))}

        {tvShowsCarousel.map((tvShowCarousel, index) => (
          <li key={index}>
            <TVShowsCarousel
              title={tvShowCarousel.title}
              href={tvShowCarousel.href}
              tvShows={tvShowCarousel.tvShows}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
