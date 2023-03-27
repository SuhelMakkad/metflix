import BannerSection from "@/components/BannerSection";
import MoviesCarousel from "@/components/ImageCarousel/MoviesCarousel";
import type { Props as MoviesCarouselProp } from "@/components/ImageCarousel/MoviesCarousel";
import TVShowsCarousel from "@/components/ImageCarousel/TVShowsCarousel";
import type { Props as TVShowsCarouselProp } from "@/components/ImageCarousel/TVShowsCarousel";
import { getMovies, getMoviesList } from "@/tmdb/lib/movie";
import { Movies, MovieType } from "@/tmdb/types/movie";
import { TVShows, TVType } from "@/tmdb/types/tv";
import { getTVShows, getTVShowsList } from "@/tmdb/lib/tv";

export async function generateMetadata() {
  const title = `Home - Metflix`;

  return {
    title,
    openGraph: {
      title,
      description: `Metflix home page`,
      siteName: "Metflix",
      locale: "en-US",
      type: "website",
    },
  };
}

export default async function MoviesPage() {
  const movies = await getMoviesList(["trending", "top_rated"]);
  const tvShows = await getTVShowsList(["trending", "top_rated"]);

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
      <BannerSection items={movies.trending} />

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

export const revalidate = 86400;
