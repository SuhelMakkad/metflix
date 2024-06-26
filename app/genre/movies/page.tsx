import { getMoviesList } from "@/tmdb/lib/movie";

import BannerSection from "@/components/BannerSection";
import MoviesCarousel from "@/components/ImageCarousel/MoviesCarousel";

import type { Props as MoviesCarouselProp } from "@/components/ImageCarousel/MoviesCarousel";
import { getMetadata } from "@/utils/seo/metadata";

export const revalidate = 86400;

export const metadata = getMetadata({
  title: "Movies",
  description: `Browse the latest movies and all-time classics on Metflix. From blockbuster hits to indie gems, find detailed movie information, cast lists, and exclusive content. Whether you're a film buff or looking for a weekend flick, Metflix is your go-to destination for cinema!`,
});

export default async function MoviesPage() {
  const movies = await getMoviesList([
    "now_playing",
    "upcoming",
    "popular",
    "trending",
    "top_rated",
  ]);

  const bannerItem = movies.popular[0];

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
      </ul>
    </>
  );
}
