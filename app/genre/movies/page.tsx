import BannerSection from "@/components/BannerSection";
import MoviesCarousel from "@/components/ImageCarousel/MoviesCarousel";

import type { Props as MoviesCarouselProp } from "@/components/ImageCarousel/MoviesCarousel";
import { getMovies } from "@/tmdb/lib/movie";
import { Movie, Movies, MovieType } from "@/tmdb/types/movie";

export async function generateMetadata() {
  const title = `Movies - Metflix`;

  return {
    title,
    openGraph: {
      title,
      description: `A list of the Movies`,
      siteName: "Metflix",
      locale: "en-US",
      type: "website",
    },
  };
}

export default async function MoviesPage() {
  const moviesToGet = [
    "now_playing",
    "upcoming",
    "popular",
    "trending",
    "top_rated",
  ] satisfies MovieType[];
  const movies = {} as Record<(typeof moviesToGet)[number], Movies>;

  const moviePromises = moviesToGet.map((movieType) => getMovies(movieType));
  const moviesRes = await Promise.allSettled(moviePromises);
  const moviesList = moviesRes.map(
    (movieRes) =>
      (movieRes.status === "fulfilled" && movieRes.value?.results) || []
  );

  moviesToGet.forEach((movieType, index) => {
    movies[movieType] = moviesList[index];
  });

  const moviesCarousel: MoviesCarouselProp[] = [
    {
      title: "Now Playing",
      href: "/genre/movies/now_playing",
      movies: movies.now_playing,
    },
    {
      title: "Upcoming",
      href: "/genre/movies/upcoming",
      movies: movies.upcoming,
    },
    {
      title: "Popular",
      href: "/genre/movies/popular",
      movies: movies.popular,
    },
    {
      title: "Trending Today",
      href: "/genre/movies/trending",
      movies: movies.trending,
    },
    {
      title: "Top Rated",
      href: "/genre/movies/top_rated",
      movies: movies.top_rated,
    },
  ];
  return (
    <>
      <BannerSection items={movies.popular} />

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
      </ul>
    </>
  );
}
